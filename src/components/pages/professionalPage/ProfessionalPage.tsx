"use client"

import { useProfessional } from "@/hooks/useProfessionals"
import { ProfessionalInfo } from "./components/ProfessionalInfo"
import { ProfessionalAbout } from "./components/ProfessionalAbout"
import { ProfessionalEducation } from "./components/ProfessionalEducation"
import { WeeklySchedule } from "./components/WeeklySchedule"
import { BookingsList } from "./components/BookingsList/BookingsList"
import { BookingCard } from "./components/BookingCard"
import { ProfessionalHeader } from "./components/ProfessionalHeader"

interface ProfessionalPageProps {
  professionalId: number
}

export const ProfessionalPage = ({ professionalId }: ProfessionalPageProps) => {
  const { data: professionalData, isLoading: loading, error } = useProfessional(professionalId)

  const professional = professionalData?.data

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
            <BookingCard professional={professional} />
            <BookingsList professional={professional} />
          </div>
        </div>
      </div>
    </div>
  )
} 

export default ProfessionalPage