import { Professional } from '@/domain/entities/Professional'

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