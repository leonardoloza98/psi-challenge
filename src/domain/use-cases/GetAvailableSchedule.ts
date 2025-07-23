import { ScheduleRepository } from '@/domain/repositories/ScheduleRepository'
import { Schedule } from '@/domain/entities/Schedule'

export class GetAvailableSchedule {
  constructor(private scheduleRepository: ScheduleRepository) {}

  async execute(professionalId: string): Promise<Schedule | null> {
    return this.scheduleRepository.getAvailableSchedule(professionalId)
  }
} 