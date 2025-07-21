"use client"

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
export interface Booking {
  id: string
  professionalId: number
  professionalName: string
  date: string
  time: string
  createdAt: string
}

interface BookingsContextType {
  bookings: Booking[]
  loading: boolean
  addBooking: (booking: Omit<Booking, 'id' | 'createdAt'>) => Promise<Booking>
  removeBooking: (bookingId: string) => Promise<boolean>
  isTimeBooked: (professionalId: number, date: string, time: string) => boolean
  getProfessionalBookings: (professionalId: number) => Booking[]
  isTimePassed: (date: string, time: string) => boolean
  loadBookings: () => Promise<void>
}

const BookingsContext = createContext<BookingsContextType | undefined>(undefined)

export function BookingsProvider({ children }: { children: ReactNode }) {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(false)

  // Cargar reservas desde localStorage y sincronizar con la API
  const loadBookings = async () => {
    setLoading(true)
    try {
      // Primero cargar desde localStorage
      const localBookings = localStorage.getItem('bookings')
      if (localBookings) {
        const parsedBookings = JSON.parse(localBookings)
        setBookings(parsedBookings)
      }

      // Luego sincronizar con la API
      const response = await fetch('/api/bookings')
      const result = await response.json()
      
      if (result.success) {
        // Si hay datos en la API, usarlos (en caso de que localStorage esté desactualizado)
        if (result.data.length > 0) {
          setBookings(result.data)
          localStorage.setItem('bookings', JSON.stringify(result.data))
        }
      } else {
        console.error('Error loading bookings from API:', result.message)
      }
    } catch (error) {
      console.error('Error loading bookings:', error)
      // Si falla la API, mantener los datos de localStorage
    } finally {
      setLoading(false)
    }
  }

  // Cargar reservas al inicializar
  useEffect(() => {
    loadBookings()
  }, [])

  // Agregar nueva reserva
  const addBooking = async (booking: Omit<Booking, 'id' | 'createdAt'>) => {
    setLoading(true)
    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(booking),
      })

      const result = await response.json()
      
      if (result.success) {
        setBookings(prev => {
          const newBookings = [...prev, result.data]

          // Guardar en localStorage
          localStorage.setItem('bookings', JSON.stringify(newBookings))
          return newBookings
        })
        return result.data
      } else {
        throw new Error(result.message)
      }
    } catch (error) {
      console.error('Error adding booking:', error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  // Eliminar reserva
  const removeBooking = async (bookingId: string) => {
    setLoading(true)
    try {
      const response = await fetch(`/api/bookings?id=${bookingId}`, {
        method: 'DELETE',
      })

      const result = await response.json()
      
      if (result.success) {
        // Actualizar estado local inmediatamente
        setBookings(prev => {
          const newBookings = prev.filter(booking => booking.id !== bookingId)
          // Guardar en localStorage
          localStorage.setItem('bookings', JSON.stringify(newBookings))
          return newBookings
        })
        return result.data
      } else {
        throw new Error(result.message)
      }
    } catch (error) {
      console.error('Error removing booking:', error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  // Verificar si un horario está reservado
  const isTimeBooked = (professionalId: number, date: string, time: string) => {
    return bookings.some(booking => 
      booking.professionalId === professionalId && 
      booking.date === date && 
      booking.time === time
    )
  }

  // Obtener reservas de un profesional
  const getProfessionalBookings = (professionalId: number) => {
    return bookings.filter(booking => booking.professionalId === professionalId)
  }

  // Verificar si un horario ya pasó
  const isTimePassed = (date: string, time: string) => {
    const now = new Date()
    const bookingDateTime = new Date(`${date}T${time}:00`)
    return bookingDateTime <= now
  }

  const value = {
    bookings,
    loading,
    addBooking,
    removeBooking,
    isTimeBooked,
    getProfessionalBookings,
    isTimePassed,
    loadBookings
  }

  return (
    <BookingsContext.Provider value={value}>
      {children}
    </BookingsContext.Provider>
  )
}

export function useBookings() {
  const context = useContext(BookingsContext)
  if (context === undefined) {
    throw new Error('useBookings must be used within a BookingsProvider')
  }
  return context
} 