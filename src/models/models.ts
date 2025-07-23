import { Professional } from "@/constants/professionals"

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
  professionalName: string
  date: string
  time: string
  sessionType: 'Online' | 'Presencial'
  patientName: string
  patientEmail: string
  patientPhone: string
  notes?: string
}

export interface Booking {
  id: string
  professionalId: number
  professionalName?: string
  date: string
  time: string
  sessionType: 'Online' | 'Presencial'
  patientName?: string
  patientEmail?: string
  patientPhone?: string
  notes?: string
  createdAt: string
}