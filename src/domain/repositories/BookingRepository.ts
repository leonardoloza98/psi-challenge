import { Booking } from '../entities/Booking'

export interface BookingRepository {
  getAll(): Promise<Booking[]>
  getById(id: string): Promise<Booking | null>
  getByProfessionalId(professionalId: number): Promise<Booking[]>
  create(booking: Booking): Promise<Booking>
  delete(id: string): Promise<void>
} 