import { WeeklySchedule } from '@/constants/professionals'
import { Booking } from '@/lib/firestore'

export const generateWeeklySlots = (schedule: WeeklySchedule): Record<string, string[]> => {
  const slots: Record<string, string[]> = {}
  
  const today = new Date()
  
  const dayNames: (keyof WeeklySchedule)[] = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
  
  for (let i = 0; i < 7; i++) {
    const currentDate = new Date(today)
    currentDate.setDate(today.getDate() + i)
    const dayOfWeek = dayNames[currentDate.getDay()]
    
    const dateString = currentDate.toISOString().split('T')[0]
    
    const daySchedule = schedule[dayOfWeek]
    
    if (daySchedule && daySchedule.length > 0) {
      const availableTimes = daySchedule
        .filter(slot => slot.isAvailable)
        .map(slot => slot.startTime)
      
      if (availableTimes.length > 0) {
        slots[dateString] = availableTimes
      }
    }
  }
  
  return slots
}

export const generateSlotsBySessionType = (schedule: WeeklySchedule, sessionType: 'Online' | 'Presencial'): Record<string, string[]> => {
  const slots: Record<string, string[]> = {}
  
  const today = new Date()
  
  const dayNames: (keyof WeeklySchedule)[] = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
  
  for (let i = 0; i < 7; i++) {
    const currentDate = new Date(today)
    currentDate.setDate(today.getDate() + i)
    const dayOfWeek = dayNames[currentDate.getDay()]
    
    const dateString = currentDate.toISOString().split('T')[0]
    
    const daySchedule = schedule[dayOfWeek]
    
    if (daySchedule && daySchedule.length > 0) {
      const availableTimes = daySchedule
        .filter(slot => slot.isAvailable && slot.sessionType === sessionType)
        .map(slot => slot.startTime)
      
      if (availableTimes.length > 0) {
        slots[dateString] = availableTimes
      }
    }
  }
  
  return slots
}

export const getAvailableSlotsForDate = (schedule: WeeklySchedule, date: string, sessionType?: 'Online' | 'Presencial'): string[] => {
  const [year, month, day] = date.split('-').map(Number)
  const targetDate = new Date(year, month - 1, day) 
  const dayNames: (keyof WeeklySchedule)[] = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
  const dayOfWeek = dayNames[targetDate.getDay()]
  const daySchedule = schedule[dayOfWeek]
  
  if (!daySchedule || daySchedule.length === 0) {
    return []
  }
  
  let availableSlots = daySchedule.filter(slot => slot.isAvailable)

  if (sessionType) {
    availableSlots = availableSlots.filter(slot => slot.sessionType === sessionType)
  }
  
  return availableSlots.map(slot => slot.startTime)
}

export const isTimeSlotBooked = (bookings: Booking[], date: string, time: string, sessionType?: 'Online' | 'Presencial'): boolean => {
  if (!bookings || !Array.isArray(bookings) || bookings.length === 0) {
    return false
  }
  
  return bookings.some(booking => 
    booking.date === date && 
    booking.time === time && 
    booking.status === 'confirmed' &&
    (!sessionType || booking.sessionType === sessionType)
  )
}

export const isTimePassed = (date: string, time: string): boolean => {
  const now = new Date()
  const bookingDateTime = new Date(`${date}T${time}`)
  return bookingDateTime < now
} 