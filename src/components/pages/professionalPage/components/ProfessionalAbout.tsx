import { Users } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Professional } from "@/services/api"

interface ProfessionalAboutProps {
  psychologist: Professional
}

export function ProfessionalAbout({ psychologist }: ProfessionalAboutProps) {
  return (
    <Card className="bg-white/80 backdrop-blur-sm border-violet-100">
      <CardHeader>
        <CardTitle className="text-violet-900 flex items-center">
          <Users className="h-5 w-5 mr-2" />
          Acerca de {psychologist.name}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-700 leading-relaxed">
          Soy una psicóloga clínica especializada en terapia cognitivo-conductual con más de 8 años de experiencia ayudando a personas a superar desafíos emocionales y mentales. Mi enfoque se centra en crear un espacio seguro y de confianza donde mis pacientes puedan explorar sus pensamientos y emociones.
        </p>
      </CardContent>
    </Card>
  )
} 