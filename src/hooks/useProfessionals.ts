import { useQuery } from '@tanstack/react-query'
import { getProfessionals, getProfessionalById } from '@/api/professionals'
import { queryKeys } from '@/api/query-keys'

// Hook for fetching professionals
export function useProfessionals(params: {
  search?: string
  category?: string
  page?: number
  limit?: number
} = {}) {
  return useQuery({
    queryKey: queryKeys.professionals.list(params),
    queryFn: () => getProfessionals(params),
  })
}

export function useProfessional(id: number) {
  return useQuery({
    queryKey: queryKeys.professionals.detail(id),
    queryFn: () => getProfessionalById(id),
    enabled: !!id,
  })
} 