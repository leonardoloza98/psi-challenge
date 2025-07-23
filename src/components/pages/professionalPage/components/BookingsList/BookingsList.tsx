import { Card, CardContent } from "@/components/ui/card"
import { toast } from "sonner"
import { BookingsListProps } from "./types"
import { BookingCard } from "./BookingCard"
import { EmptyState, BookingsListHeader } from "./BookingsListStates"
import { useProfessionalBookings } from "@/hooks/useBookings"

export function BookingsList({ professional }: BookingsListProps) {
  const {data: professionalBookings} = useProfessionalBookings(professional.id)
  console.log("professionalBookingsState", professionalBookings)
  const handleCancelBooking = async (bookingId: string): Promise<void> => {
    try {      
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
  if (!professionalBookings) return <EmptyState />

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-violet-100">
      <BookingsListHeader />
      <CardContent>
        <div className="space-y-3">
          {professionalBookings && professionalBookings.map((booking) => (
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