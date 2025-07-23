import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { bookingsService } from '@/lib/firestore'
import type { Booking } from '@/lib/firestore'

// Get bookings by professional ID (with optional userId filter)
export function useProfessionalBookings(professionalId: string, userId?: string) {
  return useQuery({
    queryKey: ['bookings', 'professional', professionalId, userId],
    queryFn: () => bookingsService.getByProfessionalId(professionalId, userId),
    enabled: !!professionalId,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    staleTime: 0,
  })
}

export function useProfessionalAvailability(professionalId: string) {
  return useQuery({
    queryKey: ['bookings', 'availability', professionalId],
    queryFn: () => bookingsService.getByProfessionalId(professionalId), // No userId filter
    enabled: !!professionalId,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    staleTime: 0,
  })
}

export function useUserBookings(userId: string) {
  return useQuery({
    queryKey: ['bookings', 'user', userId],
    queryFn: () => bookingsService.getByUserId(userId),
    enabled: !!userId,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    staleTime: 0,
  })
}

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
      
      // Invalidate and refetch bookings for the user
      queryClient.invalidateQueries({
        queryKey: ['bookings', 'user', newBooking.userId]
      })
      
      // Invalidate and refetch bookings for the patient
      queryClient.invalidateQueries({
        queryKey: ['bookings', 'patient', newBooking.patientEmail]
      })
    },
  })
}

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
