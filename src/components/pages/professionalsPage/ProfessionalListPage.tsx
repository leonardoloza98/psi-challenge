"use client"

import { useProfessionals } from "@/hooks/useProfessionals"
import { ProfessionalGrid } from "./components/ProfessionalGrid"

export default function ProfessionalListPage() {
  const { data, isLoading: loading, error } = useProfessionals({
    search: "",
    category: "",
    limit: 20
  })

  const professionals = data?.data.professionals || []

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-50">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <div className="text-red-600 mb-4">Error al cargar los profesionales</div>
            <div className="text-gray-600">{error?.message || 'Error desconocido'}</div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-50">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-violet-900 mb-4">
            Profesionales de la Salud Mental
          </h1>
          <p className="text-lg text-violet-700 max-w-2xl mx-auto">
            Encuentra el profesional ideal para tu bienestar mental. Explora perfiles detallados y agenda sesiones de forma sencilla.
          </p>
        </div>
        
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-violet-600"></div>
            <span className="ml-4 text-violet-600">Cargando profesionales...</span>
          </div>
        ) : (
          <ProfessionalGrid professionals={professionals} />
        )}
      </div>
    </div>
  )
} 