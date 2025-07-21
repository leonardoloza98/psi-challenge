import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { BookingDialog } from "./BookingDialog"
import { Professional } from "@/constants"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { bookingFormSchema, type BookingFormData } from "@/schemas/bookingSchema"
import { useBookingsContext } from "@/contexts/BookingsContext"
import { toast } from "sonner"

interface BookingSidebarProps {
  professional: Professional
}

export function BookingSidebar({ professional }: BookingSidebarProps) {
  const { addBooking, isTimeBooked, isTimePassed } = useBookingsContext()
  
  const form = useForm<BookingFormData>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      selectedDate: "",
      selectedTime: "",
      patientName: "",
      patientEmail: "",
      patientPhone: "",
      notes: "",
    },
    mode: "all",
  })

  const handleBooking = async (data: BookingFormData) => {
    if (isTimeBooked(professional.id, data.selectedDate, data.selectedTime)) {
      toast.error("Este horario ya está reservado")
      return
    }

    if (isTimePassed(data.selectedDate, data.selectedTime)) {
      toast.error("No se puede reservar un horario que ya pasó")
      return
    }

    try {
      await addBooking({
        professionalId: professional.id,
        professionalName: professional.name,
        date: data.selectedDate,
        time: data.selectedTime,
        patientName: data.patientName,
        patientEmail: data.patientEmail,
        patientPhone: data.patientPhone,
        notes: data.notes || ""
      })
      
      toast.success(`Cita agendada exitosamente`, {
        description: `${data.selectedDate} a las ${data.selectedTime} con ${professional.name}`,
        duration: 5000,
      })
      
      form.reset()
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Error al agendar la cita. Por favor intenta nuevamente."
      toast.error("Error al agendar la cita", {
        description: errorMessage,
        duration: 5000,
      })
    }
  }

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
            form={form}
            onSubmit={handleBooking}
          />
        </div>
      </CardContent>
    </Card>
  )
} 