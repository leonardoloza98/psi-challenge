import { useState, useEffect } from 'react'

export interface Booking {
  id: string
  professionalId: number
  professionalName: string
  date: string
  time: string
  createdAt: string
}

export function useBookings() {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(false)

  // Cargar reservas desde la API al inicializar
  const loadBookings = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/bookings')
      const result = await response.json()
      
      if (result.success) {
        setBookings(result.data)
      } else {
        console.error('Error loading bookings:', result.message)
        setBookings([])
      }
    } catch (error) {
      console.error('Error loading bookings:', error)
      setBookings([])
    } finally {
      setLoading(false)
    }
  }

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
        // Actualizar estado local inmediatamente
        setBookings(prev => [...prev, result.data])
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
        setBookings(prev => prev.filter(booking => booking.id !== bookingId))
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

  return {
    bookings,
    loading,
    addBooking,
    removeBooking,
    isTimeBooked,
    getProfessionalBookings,
    isTimePassed,
    loadBookings
  }
} 