import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getBookings, createBooking, deleteBooking, type Booking } from '@/api/bookings'
import { type BookingRequest } from '@/models/models'
import { queryKeys } from '@/api/query-keys'

const STORAGE_KEY = 'bookings'

function getBookingsFromStorage() {
  if (typeof window !== 'undefined') {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      return stored ? JSON.parse(stored) : []
    } catch (error) {
      console.error('Error reading from localStorage:', error)
      return []
    }
  }
  return []
}

function saveBookingsToStorage(bookings: Booking[]) {
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings))
    } catch (error) {
      console.error('Error writing to localStorage:', error)
    }
  }
}

export function useBookings() {
  return useQuery({
    queryKey: queryKeys.bookings.list(),
    queryFn: async () => {
      return await getBookings()
    },
  })
}

export function useCreateBooking() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (bookingData: BookingRequest) => {
      const newBooking = {
        id: `${bookingData.professionalId}-${bookingData.date}-${bookingData.time}`,
        professionalId: bookingData.professionalId,
        professionalName: bookingData.professionalName,
        date: bookingData.date,
        time: bookingData.time,
        sessionType: bookingData.sessionType,
        patientName: bookingData.patientName,
        patientEmail: bookingData.patientEmail,
        patientPhone: bookingData.patientPhone,
        notes: bookingData.notes,
        createdAt: new Date().toISOString()
      }

      const currentBookings = getBookingsFromStorage()
      const updatedBookings = [...currentBookings, newBooking]
      saveBookingsToStorage(updatedBookings)

      // Simular API call
      const response = await createBooking(bookingData)
      
      return response
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.bookings.list() })
    },
  })
}

// Hook for deleting bookings
export function useDeleteBooking() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (bookingId: string) => {
      const currentBookings = getBookingsFromStorage()
      const updatedBookings = currentBookings.filter((booking: Booking) => booking.id !== bookingId)
      saveBookingsToStorage(updatedBookings)

      // Simular API call
      const response = await deleteBooking(bookingId)
      
      return response
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.bookings.list() })
    },
  })
} 