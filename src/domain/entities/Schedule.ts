export interface TimeSlot {
  startTime: string
  endTime: string
  isAvailable: boolean
  sessionType: 'Online' | 'Presencial'
}

export interface Schedule {
  professionalId: string
  weeklySchedule: {
    monday: TimeSlot[]
    tuesday: TimeSlot[]
    wednesday: TimeSlot[]
    thursday: TimeSlot[]
    friday: TimeSlot[]
    saturday: TimeSlot[]
    sunday: TimeSlot[]
  }
  updatedAt: string
} 