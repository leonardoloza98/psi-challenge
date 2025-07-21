"use client"

import { useState } from "react"
import { ProfessionalHeader } from "./components/ProfessionalHeader"
import { EmptyState } from "@/components/ui/empty-state"
import { Search, Loader2 } from "lucide-react"
import { ProfessionalFilters } from "./components/ProfessionalFilters"
import { ProfessionalResults } from "./components/ProfessionalResults"
import { ProfessionalGrid } from "./components/ProfessionalGrid"
import { useProfessionals } from "@/hooks/useApi"

export default function ProfessionalListPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")

  const { data, loading, error } = useProfessionals({
    search: searchTerm,
    category: selectedCategory === "Todas las categorías" ? "" : selectedCategory,
    limit: 20
  })

  const professionals = data?.data.professionals || []
  const totalCount = data?.data.pagination.total || 0
  const categories = data?.data.filters.availableCategories || []

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-50">
        <div className="container mx-auto px-4 py-8">
          <ProfessionalHeader />
          <div className="text-center py-12">
            <div className="text-red-600 mb-4">Error al cargar los profesionales</div>
            <div className="text-gray-600">{error}</div>
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
            <Loader2 className="h-8 w-8 animate-spin text-violet-600" />
            <span className="ml-2 text-violet-600">Cargando profesionales...</span>
          </div>
        ) : (
          <>
            <ProfessionalResults
              filteredCount={professionals.length}
              totalCount={totalCount}
            />

            {professionals.length > 0 ? (
              <ProfessionalGrid professionals={professionals} />
            ) : (
              <EmptyState
                icon={Search}
                title="No se encontraron psicólogos"
                description="Intenta ajustar tus filtros de búsqueda para encontrar más resultados"
              />
            )}
          </>
        )}
      </div>
    </div>
  )
} 