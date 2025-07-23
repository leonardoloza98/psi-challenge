import { Professional } from "@/constants/professionals"
import { UseFormReturn } from "react-hook-form"
import { BookingFormData } from "@/schemas/bookingSchema"
import { useProfessionalBookings } from "@/hooks/useBookings"
import { getAvailableSlotsForDate, isTimeSlotBooked, isTimePassed } from "@/utils/dateUtils"

interface TimeSlotsProps {
  professional: Professional
  form: UseFormReturn<BookingFormData>
  selectedSessionType?: 'Online' | 'Presencial'
}

export function TimeSlots({ professional, form, selectedSessionType }: TimeSlotsProps) {
  const { setValue, watch, formState: { errors } } = form
  const selectedDate = watch("selectedDate")
  const selectedTime = watch("selectedTime")
  const { data: professionalBookings } = useProfessionalBookings(professional.id)
  
  if (!selectedDate) return null

  const availableTimes = getAvailableSlotsForDate(professional.weeklySchedule, selectedDate, selectedSessionType)
  
  return (
    <div>
      <h4 className="font-medium mb-3">Hora</h4>
      <div className="grid grid-cols-3 gap-2">
        {availableTimes.map((time) => {
          const isBooked = isTimeSlotBooked(professionalBookings || [], selectedDate, time, selectedSessionType)
          const isPassed = isTimePassed(selectedDate, time)
          const isDisabled = isBooked || isPassed || !selectedSessionType
          
          return (
            <button
              key={time}
              type="button"
              onClick={() => !isDisabled && setValue("selectedTime", time, { shouldTouch: true })}
              disabled={isDisabled}
              className={`p-2 rounded-lg text-sm transition-colors ${
                selectedTime === time
                  ? "bg-violet-600 text-white"
                  : isDisabled
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-violet-100 text-violet-700 hover:bg-violet-200"
              }`}
            >
              <div>{time}</div>
              {isBooked && <div className="text-xs text-red-500">Reservado</div>}
              {isPassed && <div className="text-xs text-gray-500">No disponible</div>}
            </button>
          )
        })}
      </div>
      {errors.selectedTime && (
        <p className="text-red-500 text-xs mt-1">
          {errors.selectedTime.message}
        </p>
      )}
    </div>
  )
} 