import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Video, MapPin } from "lucide-react"
import { Professional, TimeSlot } from "@/constants"

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
                      return (
                        <div 
                          key={index}
                          className="flex items-center justify-between p-2 bg-violet-50 rounded-lg text-sm"
                        >
                          <span className="font-medium text-violet-700">
                            {slot.startTime}
                          </span>
                          <div className="flex items-center">
                            <Icon className="h-3 w-3 text-violet-500 mr-1" />
                            <span className="text-xs text-violet-600">
                              {sessionTypeLabels[slot.sessionType]}
                            </span>
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