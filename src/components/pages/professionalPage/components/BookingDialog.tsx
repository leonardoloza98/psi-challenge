import { Loader2, Monitor, Building2 } from "lucide-react"
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
  const { handleSubmit, watch, setValue } = form
  const [isBookingOpen, setIsBookingOpen] = useState(false)
  const [bookingLoading, setBookingLoading] = useState(false)
  const [selectedSessionType, setSelectedSessionType] = useState<'Online' | 'Presencial' | null>(
    professional.sessionTypes.length === 1 ? professional.sessionTypes[0] : null
  )

  const formValues = watch()
  const isFormValid = Boolean(
    formValues.selectedDate &&
    formValues.selectedTime &&
    formValues.sessionType &&
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

          {professional.sessionTypes.length > 1 && (
            <div className="space-y-3">
              <h4 className="font-medium text-violet-900">Tipo de Sesión</h4>
              <div className="flex gap-2">
                {professional.sessionTypes.includes('Online') && (
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedSessionType('Online')
                      setValue('sessionType', 'Online', { shouldTouch: true })
                      setValue('selectedTime', '', { shouldTouch: true })
                    }}
                    className={`flex-1 flex items-center justify-center gap-2 p-3 rounded-lg border-2 transition-colors ${
                      selectedSessionType === 'Online'
                        ? 'border-green-500 bg-green-50 text-green-700'
                        : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
                    }`}
                  >
                    <Monitor className="h-4 w-4" />
                    <span className="font-medium">Online</span>
                  </button>
                )}
                {professional.sessionTypes.includes('Presencial') && (
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedSessionType('Presencial')
                      setValue('sessionType', 'Presencial', { shouldTouch: true })
                      setValue('selectedTime', '', { shouldTouch: true })
                    }}
                    className={`flex-1 flex items-center justify-center gap-2 p-3 rounded-lg border-2 transition-colors ${
                      selectedSessionType === 'Presencial'
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
                    }`}
                  >
                    <Building2 className="h-4 w-4" />
                    <span className="font-medium">Presencial</span>
                  </button>
                )}
              </div>
            </div>
          )}

          <BookingCalendar
            professional={professional}
            form={form}
          />

          <TimeSlots
            professional={professional}
            form={form}
            selectedSessionType={selectedSessionType || undefined}
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