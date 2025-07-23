import { ScheduleApiRepository } from '@/infrastructure/repositories/ScheduleApiRepository'
import { GetAvailableSchedule } from '@/domain/use-cases/GetAvailableSchedule'

const scheduleRepo = new ScheduleApiRepository()

export const scheduleService = {
  getAvailableSchedule: (professionalId: string) => 
    new GetAvailableSchedule(scheduleRepo).execute(professionalId),
} 