import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BookingDialog } from "./BookingDialog"
import { Professional } from "@/constants"

interface BookingSidebarProps {
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

export function BookingSidebar({
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
  handleBooking,
}: BookingSidebarProps) {
  return (
    <Card className="bg-white/80 backdrop-blur-sm border-violet-100">
      <CardHeader>
        <CardTitle className="text-violet-900">Agendar Cita</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center">
          <p className="text-2xl font-bold text-violet-900">${professional.pricing.price}</p>
          <p className="text-sm text-gray-600">por sesión de 60 minutos</p>
        </div>

        <Separator />

        <div className="space-y-3">
          <BookingDialog
            professional={professional}
            isBookingOpen={isBookingOpen}
            setIsBookingOpen={setIsBookingOpen}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            selectedTime={selectedTime}
            setSelectedTime={setSelectedTime}
            patientName={patientName}
            setPatientName={setPatientName}
            patientEmail={patientEmail}
            setPatientEmail={setPatientEmail}
            patientPhone={patientPhone}
            setPatientPhone={setPatientPhone}
            notes={notes}
            setNotes={setNotes}
            bookingError={bookingError}
            bookingLoading={bookingLoading}
            handleBooking={handleBooking}
          />
        </div>
      </CardContent>
    </Card>
  )
} 