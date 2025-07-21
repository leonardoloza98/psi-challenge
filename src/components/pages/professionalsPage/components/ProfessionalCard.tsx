import Image from "next/image"
import { MapPin, Star, Phone, Mail } from "lucide-react"
import { useRouter } from "next/navigation"
import { Professional } from "@/services/api"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface ProfessionalCardProps {
  psychologist: Professional
}

export function ProfessionalCard({ psychologist }: ProfessionalCardProps) {
  const router = useRouter()

  return (
    <Card className="group hover:shadow-xl transition-all duration-300 border-violet-100 bg-white/80 backdrop-blur-sm hover:bg-white/90">
      <CardHeader className="pb-4">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Image
              src={psychologist.image || "/placeholder.svg"}
              alt={psychologist.name}
              width={80}
              height={80}
              className="rounded-full object-cover border-4 border-violet-200"
            />
            <div className="absolute -bottom-1 -right-1 bg-green-500 w-6 h-6 rounded-full border-2 border-white"></div>
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-lg text-violet-900 group-hover:text-violet-700 transition-colors">
              {psychologist.name}
            </h3>
            <p className="text-violet-600 text-sm font-medium">{psychologist.specialty}</p>
            <div className="flex items-center mt-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm text-gray-600 ml-1">
                {psychologist.rating} ({psychologist.reviews} reseñas)
              </span>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Categorías */}
        <div className="flex flex-wrap gap-2">
          {psychologist.categories.slice(0, 3).map((category) => (
            <Badge
              key={category}
              variant="secondary"
              className="bg-violet-100 text-violet-700 hover:bg-violet-200"
            >
              {category}
            </Badge>
          ))}
          {psychologist.categories.length > 3 && (
            <Badge variant="outline" className="border-violet-300 text-violet-600">
              +{psychologist.categories.length - 3} más
            </Badge>
          )}
        </div>

        {/* Información adicional */}
        <div className="space-y-2 text-sm text-gray-600">
          <div className="flex items-center">
            <MapPin className="h-4 w-4 text-violet-400 mr-2" />
            {psychologist.location}
          </div>
          <div className="flex items-center">
            <Phone className="h-4 w-4 text-violet-400 mr-2" />
            {psychologist.phone}
          </div>
          <div className="flex items-center">
            <Mail className="h-4 w-4 text-violet-400 mr-2" />
            {psychologist.email}
          </div>
        </div>

        {/* Experiencia */}
        <div className="pt-2 border-t border-violet-100">
          <p className="text-sm text-violet-600 font-medium">Experiencia: {psychologist.experience}</p>
        </div>
        
        <Button
          className="w-full bg-violet-600 hover:bg-violet-700 text-white"
          onClick={() => router.push(`/professionals/${psychologist.id}`)}
        >
          Ver Perfil
        </Button>
      </CardContent>
    </Card>
  )
} 