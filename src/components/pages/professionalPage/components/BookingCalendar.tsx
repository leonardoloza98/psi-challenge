import { Professional, WeeklySchedule } from "@/constants/professionals"
import { UseFormReturn } from "react-hook-form"
import { BookingFormData } from "@/schemas/bookingSchema"
import { getAvailableSlotsForDate } from "@/utils/dateUtils"

interface CalendarDay {
  date: string
  dayName: string
  dayNumber: number
  hasSlots: boolean
}

interface BookingCalendarProps {
  professional: Professional
  form: UseFormReturn<BookingFormData>
}

export function BookingCalendar({ professional, form }: BookingCalendarProps) {
  const { setValue, watch, formState: { errors } } = form
  const selectedDate = watch("selectedDate")

  const generateCalendarDays = (): CalendarDay[] => {
    const days: CalendarDay[] = []
    const today = new Date()

    for (let i = 0; i < 7; i++) {
      const date = new Date(today)
      date.setDate(today.getDate() + i)
      const dateString = date.toISOString().split("T")[0]
      const dayName = date.toLocaleDateString("es-ES", { weekday: "short" })
      const dayNumber = date.getDate()

      const availableTimes = getAvailableSlotsForDate(professional.weeklySchedule, dateString)
      const hasSlots = availableTimes.length > 0

      days.push({
        date: dateString,
        dayName: dayName.charAt(0).toUpperCase() + dayName.slice(1),
        dayNumber,
        hasSlots,
      })
    }

    return days
  }
  const calendarDays = generateCalendarDays()

  return (
    <div>
      <h4 className="font-medium mb-3">Fecha (Próxima Semana)</h4>
      <div className="grid grid-cols-7 gap-2">
        {calendarDays.map((day) => (
          <button
            key={day.date}
            type="button"
            onClick={() => setValue("selectedDate", day.date, { shouldTouch: true })}
            className={`p-2 rounded-lg text-sm transition-colors ${
              selectedDate === day.date
                ? "bg-violet-600 text-white"
                : day.hasSlots
                ? "bg-violet-100 text-violet-700 hover:bg-violet-200"
                : "bg-gray-100 text-gray-400 cursor-not-allowed"
            }`}
            disabled={!day.hasSlots}
          >
            <div className="text-xs">{day.dayName}</div>
            <div className="font-medium">{day.dayNumber}</div>
          </button>
        ))}
      </div>
      {errors.selectedDate && (
        <p className="text-red-500 text-xs mt-1">
          {errors.selectedDate.message}
        </p>
      )}
    </div>
  )
} 