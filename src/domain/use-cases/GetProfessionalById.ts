import { ProfessionalRepository } from '../repositories/ProfessionalRepository'
import { Professional } from '../entities/Professional'

export class GetProfessionalById {
  constructor(private professionalRepo: ProfessionalRepository) {}

  async execute(id: number): Promise<Professional | null> {
    return this.professionalRepo.getById(id)
  }
} 