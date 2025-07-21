import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, User, Trash2 } from "lucide-react"
import { useBookings } from "@/contexts/BookingsContext"
import { Professional } from "@/constants"
import { toast } from "sonner"
import { ConfirmationDialog } from "@/components/ui/confirmation-dialog"

interface BookingsListProps {
  professional: Professional
}

export function BookingsList({ professional }: BookingsListProps) {
  const { bookings, removeBooking, loadBookings, loading } = useBookings()
  const professionalBookings = bookings.filter(booking => booking.professionalId === professional.id)

  const handleCancelBooking = async (bookingId: string) => {
    try {
      await removeBooking(bookingId)
      
      // Forzar refresh de las reservas
      await loadBookings()
      
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
            No tienes reservas pendientes
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
            Mis Reservas ({professionalBookings.length})
          </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {professionalBookings.map((booking) => (
            <div
              key={booking.id}
              className="border border-violet-200 rounded-lg p-3 bg-violet-50"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <User className="h-4 w-4 text-violet-600 mr-2" />
                  <span className="font-medium text-violet-900">
                    {booking.professionalName}
                  </span>
                </div>
                <Badge variant="secondary" className="text-xs">
                  Confirmada
                </Badge>
              </div>
              
              <div className="flex items-center text-sm text-gray-600 mb-2">
                <Calendar className="h-4 w-4 mr-1" />
                <span>{new Date(booking.date).toLocaleDateString('es-ES', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}</span>
              </div>
              
              <div className="flex items-center text-sm text-gray-600 mb-3">
                <Clock className="h-4 w-4 mr-1" />
                <span>{booking.time}</span>
              </div>
              
              <div className="flex justify-end">
                <ConfirmationDialog
                  trigger={
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-red-600 border-red-200 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      Cancelar
                    </Button>
                  }
                  title="Cancelar Reserva"
                  description="¿Estás seguro de que quieres cancelar esta reserva? Esta acción no se puede deshacer."
                  confirmText="Sí, cancelar"
                  cancelText="No, mantener"
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