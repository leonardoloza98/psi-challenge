import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy,
  limit,
  startAfter,
  DocumentData,
  QueryDocumentSnapshot
} from 'firebase/firestore';
import { db } from './firebase';

// Types
export interface Professional {
  id: string;
  name: string;
  specialty: string;
  categories: string[];
  rating: number;
  reviews: number;
  location: string;
  phone: string;
  email: string;
  experience: string;
  image: string;
  about: string;
  education: string[];
  certifications: string[];
  languages: string[];
  pricing: { price: number };
  status: string;
  consultationAreas: string[];
  therapeuticApproaches: string[];
  insuranceAccepted: string[];
  sessionTypes: string[];
  officeAddress?: string;
  createdAt: Date;
}

export interface Schedule {
  professionalId: string;
  weeklySchedule: {
    monday: TimeSlot[];
    tuesday: TimeSlot[];
    wednesday: TimeSlot[];
    thursday: TimeSlot[];
    friday: TimeSlot[];
    saturday: TimeSlot[];
    sunday: TimeSlot[];
  };
  updatedAt: Date;
}

export interface TimeSlot {
  startTime: string;
  endTime: string;
  isAvailable: boolean;
  sessionType: 'Online' | 'Presencial';
}

export interface Booking {
  id: string;
  userId: string;
  professionalId: string;
  professionalName: string;
  date: string;
  time: string;
  sessionType: 'Online' | 'Presencial';
  patientName: string;
  patientEmail: string;
  patientPhone: string;
  notes?: string;
  status: 'confirmed' | 'cancelled' | 'completed';
  createdAt: Date;
  updatedAt: Date;
}

// Professionals Service
export const professionalsService = {
  // Get all professionals with pagination
  async getAll(limitCount: number = 10, lastDoc?: QueryDocumentSnapshot<DocumentData>) {
    try {
      let q = query(
        collection(db, 'professionals'),
        where('status', '==', 'active'),
        orderBy('name'),
        limit(limitCount)
      );

      if (lastDoc) {
        q = query(q, startAfter(lastDoc));
      }

      const snapshot = await getDocs(q);
      const professionals: Professional[] = [];
      
      snapshot.forEach((doc) => {
        professionals.push({ id: doc.id, ...doc.data() } as Professional);
      });

      return {
        professionals,
        lastDoc: snapshot.docs[snapshot.docs.length - 1],
        hasMore: snapshot.docs.length === limitCount
      };
    } catch (error) {
      console.error('Error getting professionals:', error);
      throw error;
    }
  },

  // Get professional by ID
  async getById(id: string): Promise<Professional | null> {
    try {
      const docRef = doc(db, 'professionals', id);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() } as Professional;
      }
      
      return null;
    } catch (error) {
      console.error('Error getting professional:', error);
      throw error;
    }
  },

  // Get professionals by specialty
  async getBySpecialty(specialty: string) {
    try {
      const q = query(
        collection(db, 'professionals'),
        where('specialty', '==', specialty),
        where('status', '==', 'active')
      );
      
      const snapshot = await getDocs(q);
      const professionals: Professional[] = [];
      
      snapshot.forEach((doc) => {
        professionals.push({ id: doc.id, ...doc.data() } as Professional);
      });

      return professionals;
    } catch (error) {
      console.error('Error getting professionals by specialty:', error);
      throw error;
    }
  },

  // Get professionals by category
  async getByCategory(category: string) {
    try {
      const q = query(
        collection(db, 'professionals'),
        where('categories', 'array-contains', category),
        where('status', '==', 'active')
      );
      
      const snapshot = await getDocs(q);
      const professionals: Professional[] = [];
      
      snapshot.forEach((doc) => {
        professionals.push({ id: doc.id, ...doc.data() } as Professional);
      });

      return professionals;
    } catch (error) {
      console.error('Error getting professionals by category:', error);
      throw error;
    }
  }
};

// Schedules Service
export const schedulesService = {
  // Get schedule by professional ID
  async getByProfessionalId(professionalId: string): Promise<Schedule | null> {
    try {
      const docRef = doc(db, 'schedules', professionalId);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        return { professionalId: docSnap.id, ...docSnap.data() } as Schedule;
      }
      
      return null;
    } catch (error) {
      console.error('Error getting schedule:', error);
      throw error;
    }
  },

  // Update schedule
  async update(professionalId: string, schedule: Partial<Schedule>) {
    try {
      const docRef = doc(db, 'schedules', professionalId);
      await updateDoc(docRef, {
        ...schedule,
        updatedAt: new Date()
      });
    } catch (error) {
      console.error('Error updating schedule:', error);
      throw error;
    }
  },

  // Get real-time available schedule based on bookings
  async getAvailableSchedule(professionalId: string): Promise<Schedule | null> {
    try {
      const [schedule, bookings] = await Promise.all([
        this.getByProfessionalId(professionalId),
        bookingsService.getByProfessionalId(professionalId)
      ]);

      if (!schedule) {
        return null;
      }

      const confirmedBookings = bookings.filter(booking => booking.status === 'confirmed');
      const updatedSchedule = { ...schedule };

      confirmedBookings.forEach(booking => {
        const [year, month, day] = booking.date.split('-').map(Number);
        const bookingDate = new Date(year, month - 1, day);
        const dayNames: (keyof Schedule['weeklySchedule'])[] = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
        const dayOfWeek = dayNames[bookingDate.getDay()];
        
        const daySchedule = updatedSchedule.weeklySchedule[dayOfWeek];
        if (daySchedule) {
          const slotIndex = daySchedule.findIndex(slot => 
            slot.startTime === booking.time && slot.sessionType === booking.sessionType
          );
          
          if (slotIndex !== -1) {
            daySchedule[slotIndex] = {
              ...daySchedule[slotIndex],
              isAvailable: false
            };
          }
        }
      });

      return updatedSchedule;
    } catch (error) {
      console.error('Error getting available schedule:', error);
      throw error;
    }
  }
};

// Bookings Service
export const bookingsService = {
  // Get bookings by professional ID and user ID
  async getByProfessionalId(professionalId: string, userId?: string): Promise<Booking[]> {
    try {
      let q = query(
        collection(db, 'bookings'),
        where('professionalId', '==', professionalId),
        orderBy('date', 'desc')
      );

      // If userId is provided, filter by user
      if (userId) {
        q = query(
          collection(db, 'bookings'),
          where('professionalId', '==', professionalId),
          where('userId', '==', userId),
          orderBy('date', 'desc')
        );
      }
      
      const snapshot = await getDocs(q);
      const bookings: Booking[] = [];
      
      snapshot.forEach((doc) => {
        bookings.push({ id: doc.id, ...doc.data() } as Booking);
      });

      return bookings;
    } catch (error) {
      console.error('Error getting bookings:', error);
      throw error;
    }
  },

  // Get bookings by user ID
  async getByUserId(userId: string): Promise<Booking[]> {
    try {
      const q = query(
        collection(db, 'bookings'),
        where('userId', '==', userId),
        orderBy('date', 'desc')
      );
      
      const snapshot = await getDocs(q);
      const bookings: Booking[] = [];
      
      snapshot.forEach((doc) => {
        bookings.push({ id: doc.id, ...doc.data() } as Booking);
      });

      return bookings;
    } catch (error) {
      console.error('Error getting bookings by user:', error);
      throw error;
    }
  },

  // Get bookings by patient email
  async getByPatientEmail(email: string): Promise<Booking[]> {
    try {
      const q = query(
        collection(db, 'bookings'),
        where('patientEmail', '==', email),
        orderBy('date', 'desc')
      );
      
      const snapshot = await getDocs(q);
      const bookings: Booking[] = [];
      
      snapshot.forEach((doc) => {
        bookings.push({ id: doc.id, ...doc.data() } as Booking);
      });

      return bookings;
    } catch (error) {
      console.error('Error getting bookings by email:', error);
      throw error;
    }
  },

  async create(bookingData: Omit<Booking, 'id' | 'createdAt' | 'updatedAt'>): Promise<Booking> {
    try {
      const now = new Date();
      const booking = {
        ...bookingData,
        createdAt: now,
        updatedAt: now
      };

      const docRef = await addDoc(collection(db, 'bookings'), booking);
      
      return {
        id: docRef.id,
        ...booking
      } as Booking;
    } catch (error) {
      console.error('Error creating booking:', error);
      throw error;
    }
  },

  // Update booking
  async update(id: string, updates: Partial<Booking>) {
    try {
      const docRef = doc(db, 'bookings', id);
      await updateDoc(docRef, {
        ...updates,
        updatedAt: new Date()
      });
    } catch (error) {
      console.error('Error updating booking:', error);
      throw error;
    }
  },

  // Cancel booking
  async cancel(id: string) {
    try {
      const docRef = doc(db, 'bookings', id);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        const bookingData = docSnap.data() as Booking;
        
        // Update booking status
        await updateDoc(docRef, {
          status: 'cancelled',
          updatedAt: new Date()
        });
      }
    } catch (error) {
      console.error('Error cancelling booking:', error);
      throw error;
    }
  },

  // Delete booking
  async delete(id: string) {
    try {
      const docRef = doc(db, 'bookings', id);
      await deleteDoc(docRef);
    } catch (error) {
      console.error('Error deleting booking:', error);
      throw error;
    }
  },

  // Check if time slot is available
  async isTimeSlotAvailable(professionalId: string, date: string, time: string): Promise<boolean> {
    try {
      const q = query(
        collection(db, 'bookings'),
        where('professionalId', '==', professionalId),
        where('date', '==', date),
        where('time', '==', time),
        where('status', '==', 'confirmed')
      );
      
      const snapshot = await getDocs(q);
      return snapshot.empty;
        } catch (error) {
      console.error('Error checking time slot availability:', error);
      throw error;
    }
  }
}; 