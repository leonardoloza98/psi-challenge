import { Booking } from '@/domain/entities/Booking'

const STORAGE_KEY = 'bookings'

// Función helper para obtener bookings del localStorage
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

// Función helper para guardar bookings en localStorage
const saveBookingsToStorage = (bookings: Booking[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings))
  } catch (error) {
    console.error('Error saving bookings to localStorage:', error)
  }
}

export const bookingService = {
  // Obtener todas las bookings
  getAll: async (): Promise<Booking[]> => {
    // Simular delay de API
    await new Promise(resolve => setTimeout(resolve, 200))
    return getBookingsFromStorage()
  },

  // Obtener bookings por professionalId
  getByProfessionalId: async (professionalId: number): Promise<Booking[]> => {
    // Simular delay de API
    await new Promise(resolve => setTimeout(resolve, 200))
    
    const allBookings = getBookingsFromStorage()
    return allBookings.filter(booking => booking.professionalId === professionalId)
  },

  // Crear nueva booking
  create: async (bookingData: Omit<Booking, 'id' | 'createdAt'>): Promise<Booking> => {
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

  // Eliminar booking
  delete: async (id: string): Promise<boolean> => {
    // Simular delay de API
    await new Promise(resolve => setTimeout(resolve, 200))
    
    const allBookings = getBookingsFromStorage()
    const updatedBookings = allBookings.filter(booking => booking.id !== id)
    
    if (updatedBookings.length === allBookings.length) {
      return false // No se encontró la booking
    }
    
    saveBookingsToStorage(updatedBookings)
    return true
  },

  // Verificar disponibilidad
  checkAvailability: async (professionalId: number, date: string, time: string): Promise<boolean> => {
    const allBookings = getBookingsFromStorage()
    
    return !allBookings.some(booking => 
      booking.professionalId === professionalId && 
      booking.date === date && 
      booking.time === time
    )
  }
} 