import { Card, CardContent } from "@/components/ui/card"
import { toast } from "sonner"
import { BookingsListProps } from "./types"
import { BookingCard } from "./BookingCard"
import { EmptyState, BookingsListHeader } from "./BookingsListStates"
import { useDeleteBooking, useProfessionalBookings } from "@/hooks/useBookings"

export function BookingsList({ professional, userId }: BookingsListProps) {
  const {data: professionalBookings} = useProfessionalBookings(professional.id.toString(), userId)
  const { mutate: deleteBooking } = useDeleteBooking()
  const handleCancelBooking = async (bookingId: string): Promise<void> => {
    try {      
      deleteBooking(bookingId)
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
  if (!professionalBookings || professionalBookings.length === 0) return <EmptyState />
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