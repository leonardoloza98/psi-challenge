import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Professional } from "@/constants/professionals"
import { DaySchedule } from "./DaySchedule"
import { useProfessionalBookings } from "@/hooks/useBookings"
import { isTimePassed } from "@/utils/dateUtils"
import { Calendar } from "lucide-react"

interface WeeklyScheduleProps {
  professional: Professional
}

export function WeeklySchedule({ professional }: WeeklyScheduleProps) {
  const { data: professionalBookings } = useProfessionalBookings(professional.id.toString())
  const days = [
    { name: "Lunes", key: "monday" as keyof typeof professional.weeklySchedule },
    { name: "Martes", key: "tuesday" as keyof typeof professional.weeklySchedule },
    { name: "Miércoles", key: "wednesday" as keyof typeof professional.weeklySchedule },
    { name: "Jueves", key: "thursday" as keyof typeof professional.weeklySchedule },
    { name: "Viernes", key: "friday" as keyof typeof professional.weeklySchedule },
    { name: "Sábado", key: "saturday" as keyof typeof professional.weeklySchedule },
    { name: "Domingo", key: "sunday" as keyof typeof professional.weeklySchedule },
  ]

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-violet-100">
      <CardHeader>
        <CardTitle className="text-violet-900 flex items-center">
          <Calendar className="h-5 w-5 mr-2" />
          Horarios Disponibles
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {days.map((day) => (
            <DaySchedule
              key={day.key}
              day={day.key}
              dayName={day.name}
              slots={professional.weeklySchedule[day.key]}
              selectedSessionType="Todos"
              professionalBookings={professionalBookings || []}
              isTimePassed={isTimePassed}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  )
} 