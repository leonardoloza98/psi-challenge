"use client"

import { useProfessionals } from "@/hooks/useProfessionals"
import { ProfessionalGrid } from "./components/ProfessionalGrid"
import { useState, useMemo } from "react"
import { ProfessionalFilters } from "./components/ProfessionalFilters"
import { ProfessionalHeader } from "./components/ProfessionalHeader"

export default function ProfessionalListPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")

  const { data: professionals, isLoading: loading, error } = useProfessionals(searchTerm)

  const filteredProfessionals = useMemo(() => {
    if (!professionals || !Array.isArray(professionals)) return []

    if (selectedCategory && selectedCategory !== "Todas las categorías") {
      return professionals.filter(professional =>
        professional.categories.includes(selectedCategory)
      )
    }

    return professionals
  }, [professionals, selectedCategory])

  const categories = useMemo(() => {
    if (!professionals || !Array.isArray(professionals)) return []
    
    const allCategories = professionals.flatMap(professional => professional.categories)
    const uniqueCategories = [...new Set(allCategories)]
    return ["Todas las categorías", ...uniqueCategories]
  }, [professionals])

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
        <ProfessionalHeader />
        <ProfessionalFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          categories={categories}
        />  
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-violet-600"></div>
            <span className="ml-4 text-violet-600">Cargando profesionales...</span>
          </div>
        ) : (
          <ProfessionalGrid professionals={filteredProfessionals} />
        )}
      </div>
    </div>
  )
} 