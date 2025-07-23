import { BookingRepository } from '../repositories/BookingRepository'
import { Booking } from '../entities/Booking'

export class CreateBooking {
  constructor(private bookingRepo: BookingRepository) {}

  async execute(booking: Booking): Promise<Booking> {
    return this.bookingRepo.create(booking)
  }
} 