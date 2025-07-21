import { Professional } from "@/constants"

interface TimeSlotsProps {
  professional: Professional
  selectedDate: string
  selectedTime: string
  setSelectedTime: (time: string) => void
}

export function TimeSlots({ professional, selectedDate, selectedTime, setSelectedTime }: TimeSlotsProps) {
  if (!selectedDate) return null

  const availableTimes = professional.availableSlots[selectedDate] || []

  return (
    <div>
      <h4 className="font-medium mb-3">Hora</h4>
      <div className="grid grid-cols-3 gap-2">
        {availableTimes.map((time) => (
          <button
            key={time}
            onClick={() => setSelectedTime(time)}
            className={`p-2 rounded-lg text-sm transition-colors ${
              selectedTime === time
                ? "bg-violet-600 text-white"
                : "bg-violet-100 text-violet-700 hover:bg-violet-200"
            }`}
          >
            {time}
          </button>
        ))}
      </div>
    </div>
  )
} 