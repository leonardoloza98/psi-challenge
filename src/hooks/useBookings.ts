import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { bookingsService } from '@/lib/firestore'
import type { Booking } from '@/lib/firestore'

// Get bookings by professional ID
export function useProfessionalBookings(professionalId: string) {
  return useQuery({
    queryKey: ['bookings', 'professional', professionalId],
    queryFn: () => bookingsService.getByProfessionalId(professionalId),
    enabled: !!professionalId,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    staleTime: 0,
  })
}

// Get bookings by patient email
export function usePatientBookings(patientEmail: string) {
  return useQuery({
    queryKey: ['bookings', 'patient', patientEmail],
    queryFn: () => bookingsService.getByPatientEmail(patientEmail),
    enabled: !!patientEmail,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    staleTime: 0,
  })
}

// Create new booking
export function useCreateBooking() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (bookingData: Omit<Booking, 'id' | 'createdAt' | 'updatedAt'>) => 
      bookingsService.create(bookingData),
    onSuccess: (newBooking) => {
      // Invalidate and refetch bookings for the professional
      queryClient.invalidateQueries({
        queryKey: ['bookings', 'professional', newBooking.professionalId]
      })
      
      // Invalidate and refetch bookings for the patient
      queryClient.invalidateQueries({
        queryKey: ['bookings', 'patient', newBooking.patientEmail]
      })
    },
  })
}

// Update booking
export function useUpdateBooking() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: Partial<Booking> }) =>
      bookingsService.update(id, updates),
    onSuccess: () => {
      // Invalidate all booking queries to refetch
      queryClient.invalidateQueries({ queryKey: ['bookings'] })
    },
  })
}

// Cancel booking
export function useCancelBooking() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (bookingId: string) => bookingsService.cancel(bookingId),
    onSuccess: () => {
      // Invalidate all booking queries to refetch
      queryClient.invalidateQueries({ queryKey: ['bookings'] })
    },
  })
}

// Delete booking
export function useDeleteBooking() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (bookingId: string) => bookingsService.delete(bookingId),
    onSuccess: () => {
      // Invalidate all booking queries to refetch
      queryClient.invalidateQueries({ queryKey: ['bookings'] })
    },
  })
}

// Check time slot availability
export function useTimeSlotAvailability(professionalId: string, date: string, time: string) {
  return useQuery({
    queryKey: ['timeSlotAvailability', professionalId, date, time],
    queryFn: () => bookingsService.isTimeSlotAvailable(professionalId, date, time),
    enabled: !!professionalId && !!date && !!time,
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
} 