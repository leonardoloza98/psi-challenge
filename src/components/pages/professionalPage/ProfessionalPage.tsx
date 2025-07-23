"use client"

import { useState, useEffect } from "react"
import { useProfessional } from "@/hooks/useProfessionals"
import { UserSession } from "@/lib/userSession"
import { UserLogin } from "@/components/UserLogin"
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
  const [userId, setUserId] = useState('')
  const [, setUserName] = useState('')
  const [showLogin, setShowLogin] = useState(false)
  
  const { data: professionalData, isLoading: loading, error } = useProfessional(professionalId)

  useEffect(() => {
    const currentUserId = UserSession.getUserId()
    const currentUserName = UserSession.getUserName()
    
    setUserId(currentUserId)
    setUserName(currentUserName)
    setShowLogin(!currentUserName)
  }, [])

  const handleUserChange = (newUserId: string, newUserName: string) => {
    setUserId(newUserId)
    setUserName(newUserName)
    setShowLogin(!newUserName)
  }

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-violet-600 mx-auto"></div>
        <p className="mt-4 text-violet-600">Cargando profesional...</p>
      </div>
    </div>
  }

  if (error || !professionalData) {
    return <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-red-600 mb-2">Error</h2>
        <p className="text-gray-600">{error?.message || 'Error desconocido'}</p>
      </div>
    </div>
  }

  if (showLogin) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-50 flex items-center justify-center p-4">
        <UserLogin onUserChange={handleUserChange} />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-50">
      <div className="container mx-auto px-4 py-8">
        <ProfessionalHeader />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <ProfessionalInfo professional={professionalData} />
            <WeeklySchedule professional={professionalData} />
            <ProfessionalAbout professional={professionalData} />
            <ProfessionalEducation />
          </div>

          <div className="space-y-6 sticky top-24 h-fit">
            <BookingCard professional={professionalData} userId={userId} />
            <BookingsList professional={professionalData} userId={userId} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfessionalPage