import { BookingRepository } from '../repositories/BookingRepository'
import { Booking } from '../entities/Booking'

export class GetBookingsByProfessionalId {
  constructor(private bookingRepo: BookingRepository) {}

  async execute(professionalId: number): Promise<Booking[]> {
    return this.bookingRepo.getByProfessionalId(professionalId)
  }
} 