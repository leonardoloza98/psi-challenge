import { useState, useEffect } from 'react'
import { apiService, ProfessionalsResponse, ProfessionalResponse, BookingRequest, BookingResponse } from '@/services/api'

// Hook for fetching professionals
export function useProfessionals(params: {
  search?: string
  category?: string
  page?: number
  limit?: number
} = {}) {
  const [data, setData] = useState<ProfessionalsResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchProfessionals = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await apiService.getProfessionals(params)
      setData(response)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProfessionals()
  }, [params.search, params.category, params.page, params.limit])

  return {
    data,
    loading,
    error,
    refetch: fetchProfessionals
  }
}

// Hook for fetching a single professional
export function useProfessional(id: number) {
  const [data, setData] = useState<ProfessionalResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchProfessional = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await apiService.getProfessionalById(id)
      setData(response)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (id) {
      fetchProfessional()
    }
  }, [id])

  return {
    data,
    loading,
    error,
    refetch: fetchProfessional
  }
}

// Hook for creating bookings
export function useCreateBooking() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [data, setData] = useState<BookingResponse | null>(null)

  const createBooking = async (bookingData: BookingRequest) => {
    try {
      setLoading(true)
      setError(null)
      setData(null)
      
      const response = await apiService.createBooking(bookingData)
      setData(response)
      return response
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error desconocido'
      setError(errorMessage)
      throw new Error(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  return {
    createBooking,
    loading,
    error,
    data
  }
} 