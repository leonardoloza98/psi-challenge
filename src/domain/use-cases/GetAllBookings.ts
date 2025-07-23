import { BookingRepository } from '../repositories/BookingRepository'
import { Booking } from '../entities/Booking'

export class GetAllBookings {
  constructor(private bookingRepo: BookingRepository) {}

  async execute(): Promise<Booking[]> {
    return this.bookingRepo.getAll()
  }
} 