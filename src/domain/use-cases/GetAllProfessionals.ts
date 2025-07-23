import { ProfessionalRepository } from '../repositories/ProfessionalRepository'
import { Professional } from '../entities/Professional'

export class GetAllProfessionals {
  constructor(private professionalRepo: ProfessionalRepository) {}

  async execute(searchTerm?: string): Promise<Professional[]> {
    return this.professionalRepo.getAll(searchTerm)
  }
} 