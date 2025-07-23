import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { bookingService } from '@/application/services/BookingService'
import { scheduleService } from '@/application/services/ScheduleService'
import { CreateBookingRequest } from '@/domain/entities/Booking'

export function useProfessionalBookings(professionalId: string, userId?: string) {
  return useQuery({
    queryKey: ['bookings', 'professional', professionalId, userId],
    queryFn: () => bookingService.getByProfessionalId(professionalId, userId),
    enabled: !!professionalId,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    staleTime: 0,
  })
}

export function useProfessionalAvailability(professionalId: string) {
  return useQuery({
    queryKey: ['bookings', 'availability', professionalId],
    queryFn: () => bookingService.getByProfessionalId(professionalId),
    enabled: !!professionalId,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    staleTime: 0,
  })
}

export function useProfessionalSchedule(professionalId: string) {
  return useQuery({
    queryKey: ['schedule', 'professional', professionalId],
    queryFn: () => scheduleService.getAvailableSchedule(professionalId),
    enabled: !!professionalId,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    staleTime: 0,
  })
}

export function useCreateBooking() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (bookingData: CreateBookingRequest) => 
      bookingService.create(bookingData),
    onSuccess: (newBooking) => {
      queryClient.invalidateQueries({
        queryKey: ['bookings', 'professional', newBooking.professionalId]
      })
      
      queryClient.invalidateQueries({
        queryKey: ['bookings', 'user', newBooking.userId]
      })
      
      queryClient.invalidateQueries({
        queryKey: ['bookings', 'patient', newBooking.patientEmail]
      })
      
      queryClient.invalidateQueries({
        queryKey: ['schedule', 'professional', newBooking.professionalId]
      })
    },
  })
}

export function useDeleteBooking() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (bookingId: string) => bookingService.delete(bookingId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookings'] })
      queryClient.invalidateQueries({ queryKey: ['schedule'] })
    },
  })
}
