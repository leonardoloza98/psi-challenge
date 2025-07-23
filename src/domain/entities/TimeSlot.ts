export interface TimeSlot {
  startTime: string
  endTime: string
  isAvailable: boolean
  sessionType: 'Online' | 'Presencial'
} 