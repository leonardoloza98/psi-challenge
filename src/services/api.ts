// API Service for handling all API calls

export interface Professional {
  id: number
  name: string
  specialty: string
  rating: number
  reviews: number
  location: string
  phone: string
  email: string
  experience: string
  categories: string[]
  image?: string
}

export interface PaginationInfo {
  page: number
  limit: number
  total: number
  totalPages: number
  hasNextPage: boolean
  hasPrevPage: boolean
}

export interface ProfessionalsResponse {
  success: boolean
  data: {
    professionals: Professional[]
    pagination: PaginationInfo
    filters: {
      search: string
      category: string
      availableCategories: string[]
    }
  }
}

export interface ProfessionalResponse {
  success: boolean
  data: Professional
}

export interface BookingRequest {
  professionalId: number
  date: string
  time: string
  sessionType: 'Presencial' | 'Online'
  patientName: string
  patientEmail: string
  patientPhone: string
  notes?: string
}

export interface BookingResponse {
  success: boolean
  data: {
    id: string
    professionalId: number
    professionalName: string
    date: string
    time: string
    sessionType: 'Presencial' | 'Online'
    patientName: string
    patientEmail: string
    patientPhone: string
    notes: string
    status: string
    createdAt: string
    price: number
    duration: string
  }
  message: string
}

class ApiService {
  private baseUrl = '/api'

  private async request<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`
    
    try {
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          ...options?.headers,
        },
        ...options,
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error(`API Error (${endpoint}):`, error)
      throw error
    }
  }

  // Get professionals with filters and pagination
  async getProfessionals(params: {
    search?: string
    category?: string
    page?: number
    limit?: number
  } = {}): Promise<ProfessionalsResponse> {
    const searchParams = new URLSearchParams()
    
    if (params.search) searchParams.append('search', params.search)
    if (params.category) searchParams.append('category', params.category)
    if (params.page) searchParams.append('page', params.page.toString())
    if (params.limit) searchParams.append('limit', params.limit.toString())

    const queryString = searchParams.toString()
    const endpoint = `/professionals${queryString ? `?${queryString}` : ''}`
    
    return this.request<ProfessionalsResponse>(endpoint)
  }

  // Get professional by ID
  async getProfessionalById(id: number): Promise<ProfessionalResponse> {
    return this.request<ProfessionalResponse>(`/professionals/${id}`)
  }

  // Create booking
  async createBooking(bookingData: BookingRequest): Promise<BookingResponse> {
    return this.request<BookingResponse>('/bookings', {
      method: 'POST',
      body: JSON.stringify(bookingData),
    })
  }
}

// Export singleton instance
export const apiService = new ApiService() 