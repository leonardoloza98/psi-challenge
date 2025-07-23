import { Booking } from '../entities/Booking'
import { CreateBookingRequest } from '../entities/Booking'

export interface BookingRepository {
  getAll(): Promise<Booking[]>
  getById(id: string): Promise<Booking | null>
  getByProfessionalId(professionalId: string): Promise<Booking[]>
  getByPatientEmail(patientEmail: string): Promise<Booking[]>
  create(bookingData: CreateBookingRequest): Promise<Booking>
  update(id: string, updates: Partial<Booking>): Promise<void>
  delete(id: string): Promise<void>
  cancel(id: string): Promise<void>
  isTimeSlotAvailable(professionalId: string, date: string, time: string): Promise<boolean>
} 