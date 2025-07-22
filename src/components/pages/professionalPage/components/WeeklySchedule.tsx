import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock } from "lucide-react"
import { Professional } from "@/constants"
import { useBookingsContext } from "@/contexts/BookingsContext"
import { useState } from "react"
import { SessionTypeSelector } from "./SessionTypeSelector"
import { DaySchedule } from "./DaySchedule"

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

export function WeeklySchedule({ professional }: WeeklyScheduleProps) {
  const schedule = professional.weeklySchedule
  const { getProfessionalBookings, isTimePassed } = useBookingsContext()
  const [selectedSessionType, setSelectedSessionType] = useState<'Online' | 'Presencial' | 'Todos'>('Todos')
  
  const professionalBookings = getProfessionalBookings(professional.id)

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-violet-100">
      <CardHeader>
        <CardTitle className="text-violet-900 flex items-center justify-between">
          <div className="flex items-center">
            <Clock className="h-5 w-5 mr-2" />
            Horario Semanal
          </div>
          <SessionTypeSelector
            professional={professional}
            selectedSessionType={selectedSessionType}
            onSessionTypeChange={setSelectedSessionType}
          />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {Object.entries(schedule).map(([day, slots]) => (
            <DaySchedule
              key={day}
              day={day}
              dayName={dayNames[day as keyof typeof dayNames]}
              slots={slots}
              selectedSessionType={selectedSessionType}
              professionalBookings={professionalBookings}
              isTimePassed={isTimePassed}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  )
} 