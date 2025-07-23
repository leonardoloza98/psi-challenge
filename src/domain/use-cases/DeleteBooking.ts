import { BookingRepository } from '@/domain/repositories/BookingRepository'

export class DeleteBooking {
  constructor(private bookingRepository: BookingRepository) {}

  async execute(id: string): Promise<void> {
    return await this.bookingRepository.delete(id)
  }
} 