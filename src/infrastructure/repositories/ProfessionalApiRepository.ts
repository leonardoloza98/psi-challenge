import { ProfessionalRepository } from '@/domain/repositories/ProfessionalRepository'
import { Professional } from '@/domain/entities/Professional'
import { ProfessionalsResponse, ProfessionalResponse } from '@/infrastructure/dto/ProfessionalResponse'

export class ProfessionalApiRepository implements ProfessionalRepository {
  async getAll(searchTerm?: string): Promise<Professional[]> {
    const res = await fetch(`/api/professionals?search=${searchTerm ?? ''}`)
    if (!res.ok) throw new Error('Error al obtener profesionales')
    const data: ProfessionalsResponse = await res.json()
    return data.data.professionals || []
  }

  async getById(id: number): Promise<Professional | null> {
    const res = await fetch(`/api/professionals/${id}`)
    if (!res.ok) return null
    const data: ProfessionalResponse = await res.json()
    return data.data || null
  }

  async searchByName(name: string): Promise<Professional[]> {
    const res = await fetch(`/api/professionals?name=${encodeURIComponent(name)}`)
    if (!res.ok) throw new Error('Error al buscar profesionales')
    const data: ProfessionalsResponse = await res.json()
    return data.data.professionals || []
  }
} 