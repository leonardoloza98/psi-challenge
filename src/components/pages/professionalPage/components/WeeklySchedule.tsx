import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Video, Building2 } from "lucide-react"
import { Professional, TimeSlot } from "@/constants"
import { useBookingsContext } from "@/contexts/BookingsContext"
import { isTimeSlotBooked } from "@/utils/dateUtils"
import { useState } from "react"

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
  Online: Video,
  Presencial: Building2
}

const sessionTypeLabels = {
  Online: "Online",
  Presencial: "Presencial"
}

export function WeeklySchedule({ professional }: WeeklyScheduleProps) {
  const schedule = professional.weeklySchedule
  const { getProfessionalBookings, isTimePassed } = useBookingsContext()
  const [selectedSessionType, setSelectedSessionType] = useState<'Online' | 'Presencial' | 'Todos'>('Todos')
  
  // Filtrar las reservas del profesional directamente
  const professionalBookings = getProfessionalBookings(professional.id)

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-violet-100">
      <CardHeader>
        <CardTitle className="text-violet-900 flex items-center justify-between">
          <div className="flex items-center">
            <Clock className="h-5 w-5 mr-2" />
            Horario Semanal
          </div>
          {professional.sessionTypes.length > 1 && (
            <div className="flex gap-2">
              <button
                onClick={() => setSelectedSessionType('Todos')}
                className={`px-3 py-1 text-xs rounded-full transition-colors ${
                  selectedSessionType === 'Todos'
                    ? 'bg-violet-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Todos
              </button>
              {professional.sessionTypes.includes('Online') && (
                <button
                  onClick={() => setSelectedSessionType('Online')}
                  className={`px-3 py-1 text-xs rounded-full transition-colors flex items-center gap-1 ${
                    selectedSessionType === 'Online'
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <Video className="h-3 w-3" />
                  Online
                </button>
              )}
              {professional.sessionTypes.includes('Presencial') && (
                <button
                  onClick={() => setSelectedSessionType('Presencial')}
                  className={`px-3 py-1 text-xs rounded-full transition-colors flex items-center gap-1 ${
                    selectedSessionType === 'Presencial'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <Building2 className="h-3 w-3" />
                  Presencial
                </button>
              )}
            </div>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {Object.entries(schedule).map(([day, slots]) => {
            let availableSlots = slots.filter((slot: TimeSlot) => slot.isAvailable)
            
            // Filtrar por tipo de sesión seleccionado
            if (selectedSessionType !== 'Todos') {
              availableSlots = availableSlots.filter((slot: TimeSlot) => slot.sessionType === selectedSessionType)
            }
            
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
                      
                      // Calcular la fecha específica para este día de la semana
                      const today = new Date()
                      const dayIndex = Object.keys(dayNames).indexOf(day)
                      const jsDayIndex = dayIndex === 6 ? 0 : dayIndex + 1
                      const isToday = today.getDay() === jsDayIndex
                      
                      // Calcular la fecha para este día (si es hoy, usar hoy; si es futuro, calcular la próxima ocurrencia)
                      let targetDate: string
                      if (isToday) {
                        targetDate = today.toISOString().split('T')[0]
                      } else {
                        // Calcular la próxima fecha que corresponda a este día de la semana
                        const daysUntilTarget = (jsDayIndex - today.getDay() + 7) % 7
                        const targetDateObj = new Date(today)
                        targetDateObj.setDate(today.getDate() + daysUntilTarget)
                        targetDate = targetDateObj.toISOString().split('T')[0]
                      }
                      
                      const isPast = isToday && isTimePassed(targetDate, slot.startTime)
                      
                      // Verificar si está reservado usando la fecha específica
                      const isBooked = isTimeSlotBooked(professionalBookings, targetDate, slot.startTime)
                      
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