import { useQuery, useMutation, useQueryClient, UseQueryResult } from '@tanstack/react-query'
import { bookingService } from '@/application/services/BookingService'
import { type Booking } from '@/domain/entities/Booking'

// Hook para obtener todas las reservas
export function useBookings() {
  return useQuery({
    queryKey: ['bookings'],
    queryFn: bookingService.getAll,
  })
}

// Hook para obtener reservas de un profesional específico
export function useProfessionalBookings(professionalId: number): UseQueryResult<Booking[], Error> {
  return useQuery({
    queryKey: ['bookings', 'professional', professionalId],
    queryFn: () => bookingService.getByProfessionalId(professionalId),
    enabled: !!professionalId,
  })
}

// Hook para crear una reserva
export function useCreateBooking() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: bookingService.create,
    onSuccess: () => {
      // Invalidar queries relacionadas con reservas
      queryClient.invalidateQueries({ queryKey: ['bookings'] })
    },
  })
}

// Hook para eliminar una reserva
export function useDeleteBooking() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: bookingService.delete,
    onSuccess: () => {
      // Invalidar queries relacionadas con reservas
      queryClient.invalidateQueries({ queryKey: ['bookings'] })
    },
  })
}

// Hook para verificar disponibilidad
export function useCheckAvailability() {
  return useMutation({
    mutationFn: ({ professionalId, date, time }: { professionalId: number; date: string; time: string }) =>
      bookingService.checkAvailability(professionalId, date, time),
  })
}

// Hook para verificar si un horario está reservado (versión síncrona para componentes)
export function useIsTimeBookedSync(
  professionalId: number, 
  date: string, 
  time: string, 
  sessionType?: 'Online' | 'Presencial'
) {
  const { data: bookings } = useProfessionalBookings(professionalId)
  
  if (!bookings || !Array.isArray(bookings) || bookings.length === 0) {
    return false
  }
  
  return bookings.some(booking => 
    booking.date === date && 
    booking.time === time && 
    (!sessionType || booking.sessionType === sessionType)
  )
}

// Hook para verificar si un horario ya pasó (versión síncrona para componentes)
export function useIsTimePassedSync(date: string, time: string) {
  const now = new Date()
  const bookingDateTime = new Date(`${date}T${time}`)
  return bookingDateTime < now
} 