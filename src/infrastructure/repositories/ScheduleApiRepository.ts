import { ScheduleRepository } from '@/domain/repositories/ScheduleRepository'
import { Schedule } from '@/domain/entities/Schedule'

export class ScheduleApiRepository implements ScheduleRepository {
  async getAvailableSchedule(professionalId: string): Promise<Schedule | null> {
    try {
      const response = await fetch(`/api/schedules/${professionalId}/available`)
      
      if (!response.ok) {
        throw new Error('Failed to fetch available schedule')
      }
      
      const data = await response.json()
      return data.success ? data.data : null
    } catch (error) {
      console.error('Error fetching available schedule:', error)
      throw error
    }
  }
} 