import { Button } from "@/components/ui/button"
import { Clock, User, Trash2, Building2 } from "lucide-react"
import { ConfirmationDialog } from "@/components/ui/confirmation-dialog"
import { BookingCardProps } from "./types"
import { SessionTypeBadge } from "./SessionTypeBadge"
import { BookingInfoRow } from "./BookingInfoRow"
import { formatBookingDate } from "./utils"

export const BookingCard = ({ booking, professional, onCancelBooking }: BookingCardProps) => {
  const handleCancel = () => onCancelBooking(booking.id)
  
  return (
    <div className="border border-violet-200 rounded-lg p-3 bg-violet-50/50">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-violet-600" />
              <span className="font-medium text-violet-900">
                {formatBookingDate(booking.date)} a las {booking.time}
              </span>
            </div>
          </div>
          
          {booking.patientName && (
            <BookingInfoRow icon={<User className="h-4 w-4" />}>
              {booking.patientName}
            </BookingInfoRow>
          )}
            {booking.sessionType && (
              <SessionTypeBadge sessionType={booking.sessionType} />
            )}
          {booking.sessionType === 'Presencial' && professional.officeAddress && (
            <BookingInfoRow icon={<Building2 className="h-4 w-4" />}>
              {professional.officeAddress}
            </BookingInfoRow>
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
          onConfirm={handleCancel}
          variant="destructive"
        />
      </div>
    </div>
  )
} 