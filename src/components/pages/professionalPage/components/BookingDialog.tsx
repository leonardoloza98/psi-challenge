import { Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import { BookingCalendar } from "./BookingCalendar"
import { TimeSlots } from "./TimeSlots"
import { PatientForm } from "./PatientForm"
import { Professional } from "@/constants"

interface BookingDialogProps {
  professional: Professional
  isBookingOpen: boolean
  setIsBookingOpen: (open: boolean) => void
  selectedDate: string
  setSelectedDate: (date: string) => void
  selectedTime: string
  setSelectedTime: (time: string) => void
  patientName: string
  setPatientName: (name: string) => void
  patientEmail: string
  setPatientEmail: (email: string) => void
  patientPhone: string
  setPatientPhone: (phone: string) => void
  notes: string
  setNotes: (notes: string) => void
  bookingError: string | null
  bookingLoading: boolean
  handleBooking: () => void
}

export function BookingDialog({
  professional,
  isBookingOpen,
  setIsBookingOpen,
  selectedDate,
  setSelectedDate,
  selectedTime,
  setSelectedTime,
  patientName,
  setPatientName,
  patientEmail,
  setPatientEmail,
  patientPhone,
  setPatientPhone,
  notes,
  setNotes,
  bookingError,
  bookingLoading,
  handleBooking
}: BookingDialogProps) {
  return (
    <Dialog open={isBookingOpen} onOpenChange={setIsBookingOpen}>
      <DialogTrigger asChild>
        <Button className="w-full bg-violet-600 hover:bg-violet-700 text-white">
          Reservar
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Agendar Cita</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <PatientForm
            patientName={patientName}
            setPatientName={setPatientName}
            patientEmail={patientEmail}
            setPatientEmail={setPatientEmail}
            patientPhone={patientPhone}
            setPatientPhone={setPatientPhone}
            notes={notes}
            setNotes={setNotes}
          />

          <Separator />

          <BookingCalendar
            professional={professional}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
          />

          <TimeSlots
            professional={professional}
            selectedDate={selectedDate}
            selectedTime={selectedTime}
            setSelectedTime={setSelectedTime}
          />

          {bookingError && (
            <div className="text-red-600 text-sm bg-red-50 p-2 rounded">
              {bookingError}
            </div>
          )}

          <Button
            onClick={handleBooking}
            disabled={!selectedDate || !selectedTime || !patientName || !patientEmail || !patientPhone || bookingLoading}
            className="w-full bg-violet-600 hover:bg-violet-700 text-white"
          >
            {bookingLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                Agendando...
              </>
            ) : (
              'Confirmar Cita'
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
} 