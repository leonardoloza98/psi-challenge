import { BookingRepository } from '@/domain/repositories/BookingRepository'
import { Booking } from '@/domain/entities/Booking'

export class GetBookingsByProfessionalId {
  constructor(private bookingRepository: BookingRepository) {}

  async execute(professionalId: string, userId?: string): Promise<Booking[]> {
    return await this.bookingRepository.getByProfessionalId(professionalId, userId)
  }
} 