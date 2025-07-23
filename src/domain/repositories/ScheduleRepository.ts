import { Schedule } from '@/domain/entities/Schedule'

export interface ScheduleRepository {
  getAvailableSchedule(professionalId: string): Promise<Schedule | null>
} 