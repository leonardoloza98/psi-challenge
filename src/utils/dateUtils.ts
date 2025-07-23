const dayNames = {
  monday: "Lunes",
  tuesday: "Martes", 
  wednesday: "Miércoles",
  thursday: "Jueves",
  friday: "Viernes",
  saturday: "Sábado",
  sunday: "Domingo"
}

export function getDayIndex(dayName: string): number {
  const dayIndex = Object.keys(dayNames).indexOf(dayName)
  return dayIndex === 6 ? 0 : dayIndex + 1
}

export function isDateOnDay(date: string, dayName: string): boolean {
  const bookingDate = new Date(date)
  const bookingDay = bookingDate.getDay()
  const targetDayIndex = getDayIndex(dayName)

  return bookingDay === targetDayIndex
}

export function isTimeSlotBooked(
  bookings: Array<{ date: string; time: string }>,
  targetDate: string,
  targetTime: string
): boolean {
  return false
} 