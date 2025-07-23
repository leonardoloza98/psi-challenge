import { ProfessionalRepository } from '../repositories/ProfessionalRepository'
import { Professional } from '../entities/Professional'

export class SearchProfessionalsByName {
  constructor(private professionalRepo: ProfessionalRepository) {}

  async execute(name: string): Promise<Professional[]> {
    return this.professionalRepo.searchByName(name)
  }
} 