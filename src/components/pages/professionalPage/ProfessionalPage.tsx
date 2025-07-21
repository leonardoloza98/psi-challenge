"use client"

import { useState } from "react"
import { useProfessional } from "@/hooks/useProfessionals"
import { useBookingsContext } from "@/contexts/BookingsContext"
import { useCreateBooking } from "@/hooks/useBookings"
import { ProfessionalInfo } from "./components/ProfessionalInfo"
import { ProfessionalAbout } from "./components/ProfessionalAbout"
import { ProfessionalEducation } from "./components/ProfessionalEducation"
import { WeeklySchedule } from "./components/WeeklySchedule"
import { BookingSidebar } from "./components/BookingSidebar"
import { BookingsList } from "./components/BookingsList"
import { ProfessionalHeader } from "./components/ProfessionalHeader"
import { toast } from "sonner"

interface ProfessionalPageProps {
  professionalId: number
}

export const ProfessionalPage = ({ professionalId }: ProfessionalPageProps) => {
  const [selectedDate, setSelectedDate] = useState<string>("")
  const [selectedTime, setSelectedTime] = useState<string>("")
  const [isBookingOpen, setIsBookingOpen] = useState(false)
  const [patientName, setPatientName] = useState("")
  const [patientEmail, setPatientEmail] = useState("")
  const [patientPhone, setPatientPhone] = useState("")
  const [notes, setNotes] = useState("")
  const [bookingError, setBookingError] = useState<string | null>(null)
  const [bookingLoading, setBookingLoading] = useState(false)

  const { data: professionalData, isLoading: loading, error } = useProfessional(professionalId)
  const { refetch, isTimeBooked, isTimePassed } = useBookingsContext()
  const createBookingMutation = useCreateBooking()

  const professional = professionalData?.data

  const handleBooking = async () => {
    if (!professional || !selectedDate || !selectedTime || !patientName || !patientEmail || !patientPhone) {
      setBookingError("Por favor completa todos los campos requeridos")
      return
    }

    if (isTimeBooked(professional.id, selectedDate, selectedTime)) {
      setBookingError("Este horario ya está reservado")
      return
    }

    if (isTimePassed(selectedDate, selectedTime)) {
      setBookingError("No se puede reservar un horario que ya pasó")
      return
    }

    setBookingLoading(true)
    setBookingError(null)
    
    try {
      await createBookingMutation.mutateAsync({
        professionalId: professional.id,
        professionalName: professional.name,
        date: selectedDate,
        time: selectedTime,
        patientName,
        patientEmail,
        patientPhone,
        notes
      })
      
      toast.success(`Cita agendada exitosamente`, {
        description: `${selectedDate} a las ${selectedTime} con ${professional.name}`,
        duration: 5000,
      })
      
      // Forzar refresh de las reservas
      await refetch()
      
      setIsBookingOpen(false)
      setSelectedDate("")
      setSelectedTime("")
      setPatientName("")
      setPatientEmail("")
      setPatientPhone("")
      setNotes("")
      setBookingError(null)
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Error al agendar la cita. Por favor intenta nuevamente."
      setBookingError(errorMessage)
      toast.error("Error al agendar la cita", {
        description: errorMessage,
        duration: 5000,
      })
    } finally {
      setBookingLoading(false)
    }
  }

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-violet-600 mx-auto"></div>
        <p className="mt-4 text-violet-600">Cargando profesional...</p>
      </div>
    </div>
  }

  if (error || !professional) {
    return <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-red-600 mb-2">Error</h2>
        <p className="text-gray-600">{error?.message || 'Error desconocido'}</p>
      </div>
    </div>
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-50">
      <div className="container mx-auto px-4 py-8">
        <ProfessionalHeader />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <ProfessionalInfo professional={professional} />
            <WeeklySchedule professional={professional} />
            <ProfessionalAbout professional={professional} />
            <ProfessionalEducation />
          </div>

          <div className="space-y-6 sticky top-24 h-fit">
            <BookingSidebar
              professional={professional}
              isBookingOpen={isBookingOpen}
              setIsBookingOpen={setIsBookingOpen}
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
              selectedTime={selectedTime}
              setSelectedTime={setSelectedTime}
              patientName={patientName}
              setPatientName={setPatientName}
              patientEmail={patientEmail}
              setPatientEmail={setPatientEmail}
              patientPhone={patientPhone}
              setPatientPhone={setPatientPhone}
              notes={notes}
              setNotes={setNotes}
              bookingError={bookingError}
              bookingLoading={bookingLoading}
              handleBooking={handleBooking}
            />
            <BookingsList professional={professional} />
          </div>
        </div>
      </div>
    </div>
  )
} 

export default ProfessionalPage