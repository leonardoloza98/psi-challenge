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
    staleTime: 1000 * 60 * 5, // 5 minutes
  })
}

// Hook for fetching a single professional
export function useProfessional(id: number) {
  return useQuery({
    queryKey: queryKeys.professionals.detail(id),
    queryFn: () => getProfessionalById(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 10, // 10 minutes for individual professionals
  })
} 