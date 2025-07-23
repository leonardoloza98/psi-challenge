import { BookingApiRepository } from '@/infrastructure/repositories/BookingApiRepository'
import { GetBookingsByProfessionalId } from '@/domain/use-cases/GetBookingsByProfessionalId'
import { CreateBooking } from '@/domain/use-cases/CreateBooking'
import { DeleteBooking } from '@/domain/use-cases/DeleteBooking'
import { CancelBooking } from '@/domain/use-cases/CancelBooking'
import { CreateBookingRequest } from '@/domain/entities/Booking'

const bookingRepo = new BookingApiRepository()

export const bookingService = {
  getByProfessionalId: (professionalId: string) => 
    new GetBookingsByProfessionalId(bookingRepo).execute(professionalId),
  
  create: (bookingData: CreateBookingRequest) => 
    new CreateBooking(bookingRepo).execute(bookingData),
  
  delete: (id: string) => 
    new DeleteBooking(bookingRepo).execute(id),
  
  cancel: (id: string) => 
    new CancelBooking(bookingRepo).execute(id),
} 