import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export function ProfessionalHeader() {
  return (
    <>
      {/* Header con botón de regreso */}
      <div className="flex items-center mb-8">
        <Button
          variant="ghost"
          className="mr-4 text-violet-600 hover:text-violet-700 hover:bg-violet-100"
          onClick={() => window.history.back()}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Volver
        </Button>
      </div>

      {/* Título de la página */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-violet-900 mb-4">Encuentra tu Psicólogo Ideal</h1>
        <p className="text-lg text-violet-700 max-w-2xl mx-auto">
          Conecta con profesionales de la salud mental especializados en diferentes áreas para recibir el apoyo que
          necesitas
        </p>
      </div>
    </>
  )
} 