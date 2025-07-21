// Mapeo de días de la semana
const dayNames = {
  monday: "Lunes",
  tuesday: "Martes", 
  wednesday: "Miércoles",
  thursday: "Jueves",
  friday: "Viernes",
  saturday: "Sábado",
  sunday: "Domingo"
}

// Convertir el nombre del día a índice de JavaScript (0=domingo, 1=lunes, etc.)
export function getDayIndex(dayName: string): number {
  const dayIndex = Object.keys(dayNames).indexOf(dayName)
  return dayIndex === 6 ? 0 : dayIndex + 1 // monday=1, tuesday=2, etc.
}

// Verificar si una fecha corresponde a un día específico de la semana
export function isDateOnDay(date: string, dayName: string): boolean {
  const bookingDate = new Date(date)
  const bookingDay = bookingDate.getDay()
  const targetDayIndex = getDayIndex(dayName)
  
  console.log('🔍 isDateOnDay - Checking:', {
    date,
    dayName,
    bookingDay,
    targetDayIndex,
    matches: bookingDay === targetDayIndex
  })
  
  return bookingDay === targetDayIndex
}

// Verificar si un horario está reservado para una fecha específica
export function isTimeSlotBooked(
  bookings: Array<{ date: string; time: string }>,
  targetDate: string,
  targetTime: string
): boolean {
  return bookings.some(booking => 
    booking.date === targetDate && booking.time === targetTime
  )
} 