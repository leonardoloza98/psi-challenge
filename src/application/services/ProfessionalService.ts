import { ProfessionalApiRepository } from '@/infrastructure/repositories/ProfessionalApiRepository'
import { GetAllProfessionals } from '@/domain/use-cases/GetAllProfessionals'
import { GetProfessionalById } from '@/domain/use-cases/GetProfessionalById'
import { SearchProfessionalsByName } from '@/domain/use-cases/SearchProfessionalsByName'

const professionalRepo = new ProfessionalApiRepository()

export const professionalService = {
  getAll: (searchTerm?: string) => new GetAllProfessionals(professionalRepo).execute(searchTerm),
  getById: (id: number) => new GetProfessionalById(professionalRepo).execute(id),
  searchByName: (name: string) => new SearchProfessionalsByName(professionalRepo).execute(name),
} 