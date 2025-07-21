import { BookOpen, Award, CheckCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function ProfessionalEducation() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card className="bg-white/80 backdrop-blur-sm border-violet-100">
        <CardHeader>
          <CardTitle className="text-violet-900 flex items-center">
            <BookOpen className="h-5 w-5 mr-2" />
            Educación
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            <li className="flex items-start">
              <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
              <span className="text-sm text-gray-700">Doctorado en Psicología Clínica - UNAM</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
              <span className="text-sm text-gray-700">Maestría en Terapia Cognitivo-Conductual</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
              <span className="text-sm text-gray-700">Licenciatura en Psicología - Ibero</span>
            </li>
          </ul>
        </CardContent>
      </Card>

      <Card className="bg-white/80 backdrop-blur-sm border-violet-100">
        <CardHeader>
          <CardTitle className="text-violet-900 flex items-center">
            <Award className="h-5 w-5 mr-2" />
            Certificaciones
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            <li className="flex items-start">
              <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
              <span className="text-sm text-gray-700">Terapia de Pareja - Instituto Gottman</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
              <span className="text-sm text-gray-700">Trastornos de Ansiedad - AMTAC</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
              <span className="text-sm text-gray-700">EMDR para Trauma - EMDR Institute</span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
} 