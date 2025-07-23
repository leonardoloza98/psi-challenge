import { useQuery, useMutation, useQueryClient, UseQueryResult } from '@tanstack/react-query'
import { bookingService } from '@/application/services/BookingService'
import { type Booking } from '@/domain/entities/Booking'

export function useBookings() {
  return useQuery({
    queryKey: ['bookings'],
    queryFn: bookingService.getAll,
  })
}

export function useProfessionalBookings(professionalId: number): UseQueryResult<Booking[], Error> {
  return useQuery({
    queryKey: ['bookings', 'professional', professionalId],
    queryFn: () => bookingService.getByProfessionalId(professionalId),
    enabled: !!professionalId,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    staleTime: 0,
  })
}

export function useCreateBooking() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: bookingService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookings'] })
    },
  })
}

export function useDeleteBooking() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: bookingService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookings'] })
    },
  })
} 