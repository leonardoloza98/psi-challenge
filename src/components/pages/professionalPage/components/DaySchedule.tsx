import { Badge } from "@/components/ui/badge"
import { Video, Building2 } from "lucide-react"
import { TimeSlot } from "@/constants"
import { isTimeSlotBooked } from "@/utils/dateUtils"

interface DayScheduleProps {
  day: string
  dayName: string
  slots: TimeSlot[]
  selectedSessionType: 'Online' | 'Presencial' | 'Todos'
  professionalBookings: any[]
  isTimePassed: (date: string, time: string) => boolean
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

const config = {
  sessionTypes: {
    Online: { icon: Video, label: "Online" },
    Presencial: { icon: Building2, label: "Presencial" }
  },
  states: {
    available: { container: "bg-violet-50", text: "text-violet-700" },
    booked: { container: "bg-red-50 border border-red-200", text: "text-red-700", badge: { variant: "destructive", text: "Reservado" } },
    past: { container: "bg-gray-50 border border-gray-200", text: "text-gray-500", badge: { variant: "secondary", text: "No disponible" } }
  }
} as const

export function DaySchedule({ 
  day, 
  dayName, 
  slots, 
  selectedSessionType, 
  professionalBookings, 
  isTimePassed 
}: DayScheduleProps) {
  let availableSlots = slots.filter((slot: TimeSlot) => slot.isAvailable)
  if (selectedSessionType !== 'Todos') {
    availableSlots = availableSlots.filter((slot: TimeSlot) => slot.sessionType === selectedSessionType)
  }
  
  const isAvailable = availableSlots.length > 0
  
  return (
    <div className="border-b border-violet-100 pb-3 last:border-b-0">
      <div className="flex items-center justify-between mb-2">
        <h4 className="font-medium text-violet-900">
          {dayName}
        </h4>
      </div>
      
      {isAvailable ? (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {availableSlots.map((slot: TimeSlot, index: number) => {
            const session = config.sessionTypes[slot.sessionType]
            const Icon = session.icon
            
            const today = new Date()
            const dayIndex = Object.keys(dayNames).indexOf(day)
            const jsDayIndex = dayIndex === 6 ? 0 : dayIndex + 1
            const isToday = today.getDay() === jsDayIndex
            
            let targetDate: string
            if (isToday) {
              targetDate = today.toISOString().split('T')[0]
            } else {
              const daysUntilTarget = (jsDayIndex - today.getDay() + 7) % 7
              const targetDateObj = new Date(today)
              targetDateObj.setDate(today.getDate() + daysUntilTarget)
              targetDate = targetDateObj.toISOString().split('T')[0]
            }
            
            const isPast = isToday && isTimePassed(targetDate, slot.startTime)
            const isBooked = isTimeSlotBooked(professionalBookings, targetDate, slot.startTime)
            
            const state = isBooked ? 'booked' : isPast ? 'past' : 'available'
            const stateConfig = config.states[state]
            
            return (
              <div 
                key={index}
                className={`flex items-center justify-between p-2 rounded-lg text-sm ${stateConfig.container}`}
              >
                <span className={`font-medium ${stateConfig.text}`}>
                  {slot.startTime}
                </span>
                <div className="flex items-center">
                  {'badge' in stateConfig ? (
                    <Badge variant={stateConfig.badge.variant} className="text-xs">
                      {stateConfig.badge.text}
                    </Badge>
                  ) : (
                    <>
                      <Icon className="h-3 w-3 text-violet-500 mr-1" />
                      <span className="text-xs text-violet-600">
                        {session.label}
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
} 