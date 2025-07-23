import { Professional } from "@/constants/professionals"

export interface BookingsListProps {
  professional: Professional
  userId: string
}

export interface BookingCardProps {
  booking: Booking
  professional: Professional
  onCancelBooking: (bookingId: string) => Promise<void>
}

export interface SessionTypeBadgeProps {
  sessionType: 'Online' | 'Presencial'
}

export interface BookingInfoRowProps {
  icon: React.ReactNode
  children: React.ReactNode
}

export type Booking = {
  id: string
  userId: string
  professionalId: number
  professionalName: string
  date: string
  time: string
  sessionType: 'Online' | 'Presencial'
  patientName: string
  patientEmail: string
  patientPhone: string
  notes?: string
  status: 'confirmed' | 'cancelled' | 'completed'
  createdAt: string
  updatedAt: string
} 