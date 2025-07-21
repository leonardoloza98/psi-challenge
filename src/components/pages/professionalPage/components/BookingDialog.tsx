import { Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import { BookingCalendar } from "./BookingCalendar"
import { TimeSlots } from "./TimeSlots"
import { PatientForm } from "./PatientForm"
import { Professional } from "@/constants"
import { UseFormReturn } from "react-hook-form"
import { BookingFormData } from "@/schemas/bookingSchema"
import { useState } from "react"

interface BookingDialogProps {
  professional: Professional
  form: UseFormReturn<BookingFormData>
  onSubmit: (data: BookingFormData) => Promise<void>
}

export function BookingDialog({ professional, form, onSubmit }: BookingDialogProps) {
  const { handleSubmit, watch } = form
  const [isBookingOpen, setIsBookingOpen] = useState(false)
  const [bookingLoading, setBookingLoading] = useState(false)

  const formValues = watch()
  const isFormValid = Boolean(
    formValues.selectedDate &&
    formValues.selectedTime &&
    formValues.patientName &&
    formValues.patientEmail &&
    formValues.patientPhone
  )

  const handleFormSubmit = async (data: BookingFormData) => {
    setBookingLoading(true)
    try {
      await onSubmit(data)
      setIsBookingOpen(false)
    } finally {
      setBookingLoading(false)
    }
  }

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
          <DialogDescription>
            Completa los datos para agendar tu cita con {professional.name}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
          <PatientForm form={form} />

          <Separator />

          <BookingCalendar
            professional={professional}
            form={form}
          />

          <TimeSlots
            professional={professional}
            form={form}
          />

          <Button
            type="submit"
            disabled={!isFormValid || bookingLoading}
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
        </form>
      </DialogContent>
    </Dialog>
  )
} 