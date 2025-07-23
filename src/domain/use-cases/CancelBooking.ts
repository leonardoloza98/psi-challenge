import { BookingRepository } from '@/domain/repositories/BookingRepository'

export class CancelBooking {
  constructor(private bookingRepository: BookingRepository) {}

  async execute(id: string): Promise<void> {
    return await this.bookingRepository.cancel(id)
  }
} 