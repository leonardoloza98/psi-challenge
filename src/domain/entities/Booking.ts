export interface Booking {
  id: string
  userId: string
  professionalId: number
  professionalName?: string
  date: string
  time: string
  sessionType: 'Online' | 'Presencial'
  patientName?: string
  patientEmail?: string
  patientPhone?: string
  notes?: string
  createdAt: string
}

export interface CreateBookingRequest {
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
} 