"use client"

import { useState } from "react"
import { useProfessional } from "@/hooks/useApi"
import { useBookings } from "@/hooks/useBookings"
import { toast } from "sonner"
import {
  ProfessionalHeader,
  ProfessionalInfo,
  ProfessionalAbout,
  ProfessionalEducation,
  WeeklySchedule,
  BookingSidebar,
  BookingsList,
  LoadingState,
  ErrorState,
} from "./components"

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

  const { data: professionalData, loading, error } = useProfessional(professionalId)
  const { addBooking, isTimeBooked, isTimePassed, loading: bookingsLoading, loadBookings } = useBookings()

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
      await addBooking({
        professionalId: professional.id,
        professionalName: professional.name,
        date: selectedDate,
        time: selectedTime
      })
      
      toast.success(`Cita agendada exitosamente`, {
        description: `${selectedDate} a las ${selectedTime} con ${professional.name}`,
        duration: 5000,
      })
      
      // Forzar refresh de las reservas
      await loadBookings()
      
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
    return <LoadingState />
  }

  if (error || !professional) {
    return <ErrorState error={error} />
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