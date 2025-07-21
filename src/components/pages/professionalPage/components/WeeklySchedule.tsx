import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Video } from "lucide-react"
import { Professional, TimeSlot } from "@/constants"
import { useBookings } from "@/hooks/useBookings"

interface WeeklyScheduleProps {
  professional: Professional
}

const dayNames = {
  monday: "Lunes",
  tuesday: "Martes", 
  wednesday: "Miércoles",
  thursday: "Jueves",
  friday: "Viernes",
  saturday: "Sábado",
  sunday: "Domingo"
}

const sessionTypeIcons = {
  Online: Video
}

const sessionTypeLabels = {
  Online: "Online"
}

export function WeeklySchedule({ professional }: WeeklyScheduleProps) {
  const schedule = professional.weeklySchedule
  const { bookings, isTimePassed } = useBookings()
  
  // Filtrar las reservas del profesional directamente
  const professionalBookings = bookings.filter(booking => booking.professionalId === professional.id)

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-violet-100">
      <CardHeader>
        <CardTitle className="text-violet-900 flex items-center">
          <Clock className="h-5 w-5 mr-2" />
          Horario Semanal
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {Object.entries(schedule).map(([day, slots]) => {
            const availableSlots = slots.filter((slot: TimeSlot) => slot.isAvailable)
            const isAvailable = availableSlots.length > 0
            
            return (
              <div key={day} className="border-b border-violet-100 pb-3 last:border-b-0">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-violet-900">
                    {dayNames[day as keyof typeof dayNames]}
                  </h4>
                </div>
                
                {isAvailable ? (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {availableSlots.map((slot: TimeSlot, index: number) => {
                      const Icon = sessionTypeIcons[slot.sessionType]
                      
                      // Verificar si este horario está reservado para hoy o en el futuro
                      const today = new Date()
                      const isToday = today.getDay() === Object.keys(dayNames).indexOf(day)
                      const isPast = isToday && isTimePassed(today.toISOString().split('T')[0], slot.startTime)
                      
                      // Verificar si está reservado
                      const isBooked = professionalBookings.some(booking => {
                        const bookingDate = new Date(booking.date)
                        const bookingDay = bookingDate.getDay()
                        const currentDay = Object.keys(dayNames).indexOf(day)
                        return bookingDay === currentDay && booking.time === slot.startTime
                      })
                      
                      const isDisabled = isPast || isBooked
                      
                      return (
                        <div 
                          key={index}
                          className={`flex items-center justify-between p-2 rounded-lg text-sm ${
                            isDisabled 
                              ? isBooked 
                                ? "bg-red-50 border border-red-200" 
                                : "bg-gray-50 border border-gray-200"
                              : "bg-violet-50"
                          }`}
                        >
                          <span className={`font-medium ${
                            isDisabled 
                              ? isBooked 
                                ? "text-red-700" 
                                : "text-gray-500"
                              : "text-violet-700"
                          }`}>
                            {slot.startTime}
                          </span>
                          <div className="flex items-center">
                            {isBooked ? (
                              <Badge variant="destructive" className="text-xs">
                                Reservado
                              </Badge>
                            ) : isPast ? (
                              <Badge variant="secondary" className="text-xs">
                                Pasado
                              </Badge>
                            ) : (
                              <>
                                <Icon className="h-3 w-3 text-violet-500 mr-1" />
                                <span className="text-xs text-violet-600">
                                  {sessionTypeLabels[slot.sessionType]}
                                </span>
                              </>
                            )}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                ) : (
                  <p className="text-gray-500 text-sm italic">
                    No hay horarios disponibles
                  </p>
                )}
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
} 