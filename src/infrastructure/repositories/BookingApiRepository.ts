import { BookingRepository } from '@/domain/repositories/BookingRepository'
import { Booking } from '@/domain/entities/Booking'

export class BookingApiRepository implements BookingRepository {
  async getAll(): Promise<Booking[]> {
    const res = await fetch('/api/bookings')
    if (!res.ok) throw new Error('Error al obtener reservas')
    return res.json()
  }

  async getById(id: string): Promise<Booking | null> {
    const res = await fetch(`/api/bookings/${id}`)
    if (!res.ok) return null
    return res.json()
  }

  async getByProfessionalId(professionalId: number): Promise<Booking[]> {
    const res = await fetch(`/api/bookings?professionalId=${professionalId}`)
    if (!res.ok) throw new Error('Error al obtener reservas del profesional')
    return res.json()
  }

  async create(booking: Booking): Promise<Booking> {
    const res = await fetch('/api/bookings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(booking),
    })
    if (!res.ok) throw new Error('Error al crear la reserva')
    return res.json()
  }

  async delete(id: string): Promise<void> {
    const res = await fetch(`/api/bookings/${id}`, { method: 'DELETE' })
    if (!res.ok) throw new Error('Error al eliminar la reserva')
  }
} 