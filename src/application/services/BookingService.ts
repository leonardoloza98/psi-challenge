import { Booking, CreateBookingRequest } from '@/domain/entities/Booking'

const STORAGE_KEY = 'bookings'

const getBookingsFromStorage = (): Booking[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (!stored) return []
    
    const parsed = JSON.parse(stored)
    return Array.isArray(parsed) ? parsed : []
  } catch (error) {
    console.error('Error reading bookings from localStorage:', error)
    return []
  }
}

const saveBookingsToStorage = (bookings: Booking[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings))
  } catch (error) {
    console.error('Error saving bookings to localStorage:', error)
  }
}

export const bookingService = {
  getAll: async (): Promise<Booking[]> => {
    await new Promise(resolve => setTimeout(resolve, 200))
    return getBookingsFromStorage()
  },

  getByProfessionalId: async (professionalId: number): Promise<Booking[]> => {
    await new Promise(resolve => setTimeout(resolve, 200))
    
    const allBookings = getBookingsFromStorage()
    return allBookings.filter(booking => booking.professionalId === professionalId)
  },

  create: async (bookingData: CreateBookingRequest): Promise<Booking> => {
    await new Promise(resolve => setTimeout(resolve, 300))
    
    const allBookings = getBookingsFromStorage()
    
    const newBooking: Booking = {
      ...bookingData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    }
    
    const updatedBookings = [...allBookings, newBooking]
    saveBookingsToStorage(updatedBookings)
    
    return newBooking
  },

  delete: async (id: string): Promise<boolean> => {
    await new Promise(resolve => setTimeout(resolve, 200))
    
    const allBookings = getBookingsFromStorage()
    const updatedBookings = allBookings.filter(booking => booking.id !== id)
    
    if (updatedBookings.length === allBookings.length) {
      return false 
    }
    
    saveBookingsToStorage(updatedBookings)
    return true
  },

  checkAvailability: async (professionalId: number, date: string, time: string): Promise<boolean> => {
    const allBookings = getBookingsFromStorage()
    
    return !allBookings.some(booking => 
      booking.professionalId === professionalId && 
      booking.date === date && 
      booking.time === time
    )
  }
} 