"use client"

import { useState } from "react"
import { useProfessional, useCreateBooking } from "@/hooks/useApi"
import {
  ProfessionalHeader,
  ProfessionalInfo,
  ProfessionalAbout,
  ProfessionalEducation,
  WeeklySchedule,
  BookingSidebar,
  LoadingState,
  ErrorState,
} from "./components"

interface ProfessionalPageProps {
  professionalId: number
}

export const ProfessionalPage = ({ professionalId }: ProfessionalPageProps) => {
  const [selectedDate, setSelectedDate] = useState<string>("")
  const [selectedTime, setSelectedTime] = useState<string>("")
  const [selectedSessionType, setSelectedSessionType] = useState<string>("")
  const [isBookingOpen, setIsBookingOpen] = useState(false)
  const [patientName, setPatientName] = useState("")
  const [patientEmail, setPatientEmail] = useState("")
  const [patientPhone, setPatientPhone] = useState("")
  const [notes, setNotes] = useState("")

  const { data: professionalData, loading, error } = useProfessional(professionalId)
  const { createBooking, loading: bookingLoading, error: bookingError } = useCreateBooking()

  const psychologist = professionalData?.data

  const handleBooking = async () => {
    if (!psychologist || !selectedDate || !selectedTime || !patientName || !patientEmail || !patientPhone) {
      return
    }

    try {
      await createBooking({
        professionalId: psychologist.id,
        date: selectedDate,
        time: selectedTime,
        patientName,
        patientEmail,
        patientPhone,
        notes
      })
      
      alert(`Cita agendada exitosamente para el ${selectedDate} a las ${selectedTime}`)
      setIsBookingOpen(false)
      setSelectedDate("")
      setSelectedTime("")
      setSelectedSessionType("")
      setPatientName("")
      setPatientEmail("")
      setPatientPhone("")
      setNotes("")
    } catch (error) {
      console.error('Error creating booking:', error)
    }
  }

  if (loading) {
    return <LoadingState />
  }

  if (error || !psychologist) {
    return <ErrorState error={error} />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-50">
      <div className="container mx-auto px-4 py-8">
        <ProfessionalHeader />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <ProfessionalInfo psychologist={psychologist} />
            <WeeklySchedule professional={psychologist} />
            <ProfessionalAbout psychologist={psychologist} />
            <ProfessionalEducation />
          </div>

          <div className="space-y-6">
            <BookingSidebar
              professional={psychologist}
              selectedSessionType={selectedSessionType}
              setSelectedSessionType={setSelectedSessionType}
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
          </div>
        </div>
      </div>
    </div>
  )
} 

export default ProfessionalPage