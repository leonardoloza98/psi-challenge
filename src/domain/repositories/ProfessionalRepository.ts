import { Professional } from '../entities/Professional'

export interface ProfessionalRepository {
  getAll(searchTerm?: string): Promise<Professional[]>
  getById(id: number): Promise<Professional | null>
  searchByName(name: string): Promise<Professional[]>
} 