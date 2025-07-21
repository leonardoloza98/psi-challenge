"use client"

import { createContext, useContext, ReactNode } from 'react'
import { useBookings, useCreateBooking, useDeleteBooking } from '@/hooks/useBookings'

interface Booking {
  id: string
  professionalId: number
  professionalName?: string
  date: string
  time: string
  patientName?: string
  patientEmail?: string
  patientPhone?: string
  notes?: string
  createdAt: string
}

interface BookingsContextType {
  bookings: Booking[]
  loading: boolean
  error: Error | null
  addBooking: (bookingData: any) => Promise<void>
  removeBooking: (bookingId: string) => Promise<void>
  getProfessionalBookings: (professionalId: number) => Booking[]
  isTimeBooked: (professionalId: number, date: string, time: string) => boolean
  isTimePassed: (date: string, time: string) => boolean
}

const BookingsContext = createContext<BookingsContextType | undefined>(undefined)

export function BookingsProvider({ children }: { children: ReactNode }) {
  const { data: bookings = [], isLoading: loading, error } = useBookings()
  const createBookingMutation = useCreateBooking()
  const deleteBookingMutation = useDeleteBooking()

  const addBooking = async (bookingData: any) => {
    await createBookingMutation.mutateAsync(bookingData)
  }

  const removeBooking = async (bookingId: string) => {
    await deleteBookingMutation.mutateAsync(bookingId)
  }

  const getProfessionalBookings = (professionalId: number) => {
    return bookings.filter(booking => booking.professionalId === professionalId)
  }

  const isTimeBooked = (professionalId: number, date: string, time: string) => {
    return bookings.some(booking => 
      booking.professionalId === professionalId && 
      booking.date === date && 
      booking.time === time
    )
  }

  const isTimePassed = (date: string, time: string) => {
    const now = new Date()
    const today = now.toISOString().split('T')[0]
    if (date < today) return true
    if (date > today) return false
    
    const currentTime = now.toTimeString().split(' ')[0]
    return time <= currentTime
  }

  const value = {
    bookings,
    loading,
    error,
    addBooking,
    removeBooking,
    getProfessionalBookings,
    isTimeBooked,
    isTimePassed
  }

  return (
    <BookingsContext.Provider value={value}>
      {children}
    </BookingsContext.Provider>
  )
}

export function useBookingsContext() {
  const context = useContext(BookingsContext)
  if (context === undefined) {
    throw new Error('useBookingsContext must be used within a BookingsProvider')
  }
  return context
} 