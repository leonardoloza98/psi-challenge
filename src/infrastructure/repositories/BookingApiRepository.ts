import { Booking } from '@/domain/entities/Booking'
import { CreateBookingRequest } from '@/domain/entities/Booking'

export class BookingApiRepository {
  private baseUrl = '/api/bookings'

  async getAll(): Promise<Booking[]> {
    const response = await fetch(this.baseUrl)
    if (!response.ok) {
      throw new Error('Failed to fetch bookings')
    }
    const data = await response.json()
    return data.data || []
  }

  async getById(id: string): Promise<Booking | null> {
    const response = await fetch(`${this.baseUrl}/${id}`)
    if (!response.ok) {
      return null
    }
    const data = await response.json()
    return data.data
  }

  async getByProfessionalId(professionalId: string, userId?: string): Promise<Booking[]> {
    const response = await fetch(`${this.baseUrl}?professionalId=${professionalId}&userId=${userId}`)
    if (!response.ok) {
      throw new Error('Failed to fetch professional bookings')
    }
    const data = await response.json()
    return data.data || []
  }

  async getByPatientEmail(patientEmail: string): Promise<Booking[]> {
    const response = await fetch(`${this.baseUrl}?patientEmail=${patientEmail}`)
    if (!response.ok) {
      throw new Error('Failed to fetch patient bookings')
    }
    const data = await response.json()
    return data.data || []
  }

  async create(bookingData: CreateBookingRequest): Promise<Booking> {
    const response = await fetch(this.baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bookingData),
    })
    
    if (!response.ok) {
      throw new Error('Failed to create booking')
    }
    
    const data = await response.json()
    return data.data
  }

  async update(id: string, updates: Partial<Booking>): Promise<void> {
    const response = await fetch(`${this.baseUrl}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updates),
    })
    
    if (!response.ok) {
      throw new Error('Failed to update booking')
    }
  }

  async delete(id: string): Promise<void> {
    const response = await fetch(`${this.baseUrl}?id=${id}`, {
      method: 'DELETE',
    })
    
    if (!response.ok) {
      throw new Error('Failed to delete booking')
    }
  }

  async cancel(id: string): Promise<void> {
    const response = await fetch(`${this.baseUrl}/${id}/cancel`, {
      method: 'PATCH',
    })
    
    if (!response.ok) {
      throw new Error('Failed to cancel booking')
    }
  }

  async isTimeSlotAvailable(professionalId: string, date: string, time: string): Promise<boolean> {
    const response = await fetch(`${this.baseUrl}/availability?professionalId=${professionalId}&date=${date}&time=${time}`)
    if (!response.ok) {
      throw new Error('Failed to check availability')
    }
    const data = await response.json()
    return data.available
  }
} 