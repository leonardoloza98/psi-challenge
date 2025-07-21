import { BookingRequest } from '@/models/models'

export async function getBookings(): Promise<any[]> {
  const res = await fetch('/api/bookings')
  if (!res.ok) throw new Error('Error al obtener las reservas')
  const response = await res.json()
  return response.data || []
}

export async function createBooking(bookingData: BookingRequest): Promise<any> {
  const res = await fetch('/api/bookings', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(bookingData),
  })
  if (!res.ok) throw new Error('Error al crear la reserva')
  const response = await res.json()
  return response.data
}

export async function deleteBooking(bookingId: string): Promise<any> {
  const res = await fetch(`/api/bookings?id=${bookingId}`, {
    method: 'DELETE',
  })
  if (!res.ok) throw new Error('Error al eliminar la reserva')
  const response = await res.json()
  return response.data
} 