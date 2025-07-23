import { BookingRepository } from '@/domain/repositories/BookingRepository'
import { Booking, CreateBookingRequest } from '@/domain/entities/Booking'

export class CreateBooking {
  constructor(private bookingRepository: BookingRepository) {}

  async execute(bookingData: CreateBookingRequest): Promise<Booking> {
    return await this.bookingRepository.create(bookingData)
  }
} 