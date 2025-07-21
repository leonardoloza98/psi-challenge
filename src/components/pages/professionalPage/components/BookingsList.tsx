import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, User, Trash2 } from "lucide-react"
import { useBookingsContext } from "@/contexts/BookingsContext"
import { Professional } from "@/constants"
import { toast } from "sonner"
import { ConfirmationDialog } from "@/components/ui/confirmation-dialog"

interface BookingsListProps {
  professional: Professional
}

export function BookingsList({ professional }: BookingsListProps) {
  const { getProfessionalBookings, removeBooking, loading } = useBookingsContext()
  const professionalBookings = getProfessionalBookings(professional.id)
  
  const handleCancelBooking = async (bookingId: string) => {
    try {
      await removeBooking(bookingId)
      
      toast.success("Reserva cancelada exitosamente", {
        description: "La reserva ha sido eliminada de tu agenda",
        duration: 3000,
      })
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Error al cancelar la reserva"
      toast.error("Error al cancelar la reserva", {
        description: errorMessage,
        duration: 5000,
      })
    }
  }

  if (loading) {
    return (
      <Card className="bg-white/80 backdrop-blur-sm border-violet-100">
        <CardHeader>
          <CardTitle className="text-violet-900 flex items-center">
            <Calendar className="h-5 w-5 mr-2" />
            Mis Reservas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500 text-center py-4">
            Cargando reservas...
          </p>
        </CardContent>
      </Card>
    )
  }

  if (professionalBookings.length === 0) {
    return (
      <Card className="bg-white/80 backdrop-blur-sm border-violet-100">
        <CardHeader>
          <CardTitle className="text-violet-900 flex items-center">
            <Calendar className="h-5 w-5 mr-2" />
            Mis Reservas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500 text-center py-4">
            No tienes reservas con este profesional
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-violet-100">
      <CardHeader>
        <CardTitle className="text-violet-900 flex items-center">
          <Calendar className="h-5 w-5 mr-2" />
          Mis Reservas
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {professionalBookings.map((booking) => (
            <div
              key={booking.id}
              className="border border-violet-200 rounded-lg p-3 bg-violet-50/50"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="h-4 w-4 text-violet-600" />
                    <span className="font-medium text-violet-900">
                      {booking.date} a las {booking.time}
                    </span>
                  </div>
                  
                  {booking.patientName && (
                    <div className="flex items-center gap-2 mb-1">
                      <User className="h-4 w-4 text-violet-600" />
                      <span className="text-sm text-violet-700">
                        {booking.patientName}
                      </span>
                    </div>
                  )}
                  
                  {booking.notes && (
                    <p className="text-sm text-violet-600 mt-1">
                      {booking.notes}
                    </p>
                  )}
                </div>
                
                <ConfirmationDialog
                  trigger={
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  }
                  title="Cancelar Reserva"
                  description="¿Estás seguro de que quieres cancelar esta reserva? Esta acción no se puede deshacer."
                  onConfirm={() => handleCancelBooking(booking.id)}
                  variant="destructive"
                />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
} 