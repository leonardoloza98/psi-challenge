import { MapPin, Phone, Mail, DollarSign } from "lucide-react"
import { useRouter } from "next/navigation"
import { Professional } from "@/constants"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface ProfessionalCardProps {
  psychologist: Professional
}

export function ProfessionalCard({ psychologist }: ProfessionalCardProps) {
  const router = useRouter()

  return (
    <Card className="group hover:shadow-xl transition-all duration-300 border-violet-100 bg-white/80 backdrop-blur-sm hover:bg-white/90">
      <CardHeader className="pb-1">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Avatar className="h-20 w-20 border-4 border-violet-200">
              <AvatarImage
                src={psychologist.image}
                alt={psychologist.name}
              />
              <AvatarFallback className="bg-violet-100 text-violet-700 text-lg font-semibold">
                {psychologist.name.split(' ').map(n => n[0]).join('').toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-lg text-violet-900 group-hover:text-violet-700 transition-colors">
              {psychologist.name}
            </h3>
            <p className="text-violet-600 text-sm font-medium">{psychologist.specialty}</p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex flex-col h-full space-y-2">
        <div className="flex flex-col space-y-2 flex-1">
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
          <div className="space-y-2 text-sm text-gray-600">
            <div className="flex items-center">
              <MapPin className="h-4 w-4 text-violet-400 mr-2" />
              {psychologist.location}
            </div>
            <div className="flex items-center">
              <DollarSign className="h-4 w-4 text-violet-400 mr-2" />
              <span className="font-medium text-violet-700">
                {psychologist.pricing.price}
              </span>
              <span className="text-gray-500 ml-1">/ sesión</span>
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