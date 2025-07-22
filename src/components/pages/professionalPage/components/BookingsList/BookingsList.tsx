import { Card, CardContent } from "@/components/ui/card"
import { useBookingsContext } from "@/contexts/BookingsContext"
import { toast } from "sonner"
import { BookingsListProps } from "./types"
import { BookingCard } from "./BookingCard"
import { LoadingState, EmptyState, BookingsListHeader } from "./BookingsListStates"

export function BookingsList({ professional }: BookingsListProps) {
  const { getProfessionalBookings, removeBooking, loading } = useBookingsContext()
  const professionalBookings = getProfessionalBookings(professional.id)
  
  // Debug: verificar las reservas del profesional
  console.log('Professional bookings:', professionalBookings)
  
  const handleCancelBooking = async (bookingId: string): Promise<void> => {
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

  // Loading state
  if (loading) {
    return <LoadingState />
  }

  // Empty state
  if (professionalBookings.length === 0) {
    return <EmptyState />
  }

  // Main content
  return (
    <Card className="bg-white/80 backdrop-blur-sm border-violet-100">
      <BookingsListHeader />
      <CardContent>
        <div className="space-y-3">
          {professionalBookings.map((booking) => (
            <BookingCard
              key={booking.id}
              booking={booking}
              professional={professional}
              onCancelBooking={handleCancelBooking}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  )
} 