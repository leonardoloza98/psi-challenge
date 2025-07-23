import { bookingsService } from '@/lib/firestore'
import type { Booking } from '@/lib/firestore'

export class BookingService {
  async getAll(): Promise<Booking[]> {
    try {
      // Get all bookings (you might want to add pagination here)
      return []
    } catch (error) {
      console.error('Error getting all bookings:', error)
      throw error
    }
  }

  async getByProfessionalId(professionalId: string): Promise<Booking[]> {
    try {
      return await bookingsService.getByProfessionalId(professionalId)
    } catch (error) {
      console.error('Error getting bookings by professional ID:', error)
      throw error
    }
  }

  async create(bookingData: Omit<Booking, 'id' | 'createdAt' | 'updatedAt'>): Promise<Booking> {
    try {
      return await bookingsService.create(bookingData)
    } catch (error) {
      console.error('Error creating booking:', error)
      throw error
    }
  }

  async update(id: string, updates: Partial<Booking>): Promise<void> {
    try {
      await bookingsService.update(id, updates)
    } catch (error) {
      console.error('Error updating booking:', error)
      throw error
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await bookingsService.delete(id)
    } catch (error) {
      console.error('Error deleting booking:', error)
      throw error
    }
  }

  async cancel(id: string): Promise<void> {
    try {
      await bookingsService.cancel(id)
    } catch (error) {
      console.error('Error cancelling booking:', error)
      throw error
    }
  }
}

export const bookingService = new BookingService() 