"use client"

import React, { createContext, useContext, ReactNode, useState, useEffect } from 'react'
import { useBookings } from '@/hooks/useBookings'

export interface Booking {
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
  isTimeBooked: (professionalId: number, date: string, time: string) => boolean
  getProfessionalBookings: (professionalId: number) => Booking[]
  isTimePassed: (date: string, time: string) => boolean
  refetch: () => Promise<any>
  removeBooking: (bookingId: string) => void
}

const BookingsContext = createContext<BookingsContextType | undefined>(undefined)

const STORAGE_KEY = 'bookings'

function getBookingsFromStorage(): Booking[] {
  if (typeof window !== 'undefined') {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      return stored ? JSON.parse(stored) : []
    } catch (error) {
      console.error('Error reading from localStorage:', error)
      return []
    }
  }
  return []
}

function saveBookingsToStorage(bookings: Booking[]): void {
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings))
    } catch (error) {
      console.error('Error writing to localStorage:', error)
    }
  }
}

export function BookingsProvider({ children }: { children: ReactNode }) {
  const [localBookings, setLocalBookings] = useState<Booking[]>([])
  const { data: apiBookings = [], isLoading: loading, refetch } = useBookings()

  useEffect(() => {
    const storedBookings = getBookingsFromStorage()
    setLocalBookings(storedBookings)
  }, [])

  useEffect(() => {
    saveBookingsToStorage(localBookings)
  }, [localBookings])

  useEffect(() => {
    if (apiBookings.length > 0 && JSON.stringify(apiBookings) !== JSON.stringify(localBookings)) {
      setLocalBookings(apiBookings)
    }
  }, [apiBookings])

  const removeBooking = (bookingId: string) => {
    const updatedBookings = localBookings.filter(booking => booking.id !== bookingId)
    setLocalBookings(updatedBookings)
  }

  const isTimeBooked = (professionalId: number, date: string, time: string) => {
    const result = localBookings.some(booking => 
      booking.professionalId === professionalId && 
      booking.date === date && 
      booking.time === time
    )
    return result
  }

  const getProfessionalBookings = (professionalId: number) => {
    return localBookings.filter(booking => booking.professionalId === professionalId)
  }

  const isTimePassed = (date: string, time: string) => {
    const now = new Date()
    const today = now.toISOString().split('T')[0]
    
    if (date < today) {
      return true
    }
    
    if (date > today) {
      return false
    }
    
    const currentTime = now.toTimeString().split(' ')[0]
    return time <= currentTime
  }

  const value = {
    bookings: localBookings,
    loading,
    isTimeBooked,
    getProfessionalBookings,
    isTimePassed,
    refetch,
    removeBooking
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