import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getBookings, createBooking, deleteBooking } from '@/api/bookings'
import { queryKeys } from '@/api/query-keys'

// Hook for fetching bookings
export function useBookings() {
  return useQuery({
    queryKey: queryKeys.bookings.list(),
    queryFn: async () => {
      const response = await getBookings()
      return response.map((booking: any) => ({
        id: booking.id,
        professionalId: booking.professionalId,
        professionalName: booking.professionalName,
        date: booking.date,
        time: booking.time,
        patientName: booking.patientName,
        patientEmail: booking.patientEmail,
        patientPhone: booking.patientPhone,
        notes: booking.notes,
        createdAt: booking.createdAt
      }))
    },
    staleTime: 0, // Siempre considerar los datos como stale para forzar refetch
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  })
}

// Hook for creating bookings
export function useCreateBooking() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: createBooking,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.bookings.list() })
    },
  })
}

// Hook for deleting bookings
export function useDeleteBooking() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteBooking,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.bookings.list() })
    },
  })
} 