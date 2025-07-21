import { Professional } from "@/constants"
import { useBookings } from "@/hooks/useBookings"

interface TimeSlotsProps {
  professional: Professional
  selectedDate: string
  selectedTime: string
  setSelectedTime: (time: string) => void
}

export function TimeSlots({ professional, selectedDate, selectedTime, setSelectedTime }: TimeSlotsProps) {
  const { isTimeBooked, isTimePassed } = useBookings()
  
  if (!selectedDate) return null

  const availableTimes = professional.availableSlots[selectedDate] || []
  
  return (
    <div>
      <h4 className="font-medium mb-3">Hora</h4>
      <div className="grid grid-cols-3 gap-2">
        {availableTimes.map((time) => {
          const isBooked = isTimeBooked(professional.id, selectedDate, time)
          const isPassed = isTimePassed(selectedDate, time)
          const isDisabled = isBooked || isPassed
          
          return (
            <button
              key={time}
              onClick={() => !isDisabled && setSelectedTime(time)}
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
              {isPassed && <div className="text-xs text-gray-500">Pasado</div>}
            </button>
          )
        })}
      </div>
    </div>
  )
} 