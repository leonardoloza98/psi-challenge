import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { professionalService } from '@/application/services/ProfessionalService'
import { Professional } from '@/domain/entities/Professional'

export function useProfessionals(searchTerm: string = ''): UseQueryResult<Professional[], Error> {
  return useQuery({
    queryKey: ['professionals', 'search', searchTerm],
    queryFn: () => professionalService.getAll(searchTerm),
  })
}

export function useProfessional(id: number): UseQueryResult<Professional | null, Error> {
  return useQuery({
    queryKey: ['professional', id],
    queryFn: () => professionalService.getById(id),
    enabled: !!id,
  })
} 