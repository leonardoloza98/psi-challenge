import { MapPin, Phone, Mail, DollarSign, Monitor, Building2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { Professional } from "@/constants"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface ProfessionalCardProps {
  professional: Professional
}

export function ProfessionalCard({ professional }: ProfessionalCardProps) {
  const router = useRouter()

  return (
    <Card className="group hover:shadow-xl transition-all duration-300 border-violet-100 bg-white/80 backdrop-blur-sm hover:bg-white/90">
      <CardHeader className="pb-1">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Avatar className="h-20 w-20 border-4 border-violet-200">
              <AvatarImage
                src={professional.image}
                alt={professional.name}
              />
              <AvatarFallback className="bg-violet-100 text-violet-700 text-lg font-semibold">
                {professional.name.split(' ').map((n: string) => n[0]).join('').toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-lg text-violet-900 group-hover:text-violet-700 transition-colors">
              {professional.name}
            </h3>
            <p className="text-violet-600 text-sm font-medium">{professional.specialty}</p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex flex-col h-full space-y-2">
        <div className="flex flex-col space-y-2 flex-1">
          <div className="flex flex-wrap gap-2">
            {professional.categories.slice(0, 3).map((category: string) => (
              <Badge
                key={category}
                variant="secondary"
                className="bg-violet-100 text-violet-700 hover:bg-violet-200"
              >
                {category}
              </Badge>
            ))}
            {professional.categories.length > 3 && (
              <Badge variant="outline" className="border-violet-300 text-violet-600">
                +{professional.categories.length - 3} más
              </Badge>
            )}
          </div>
          <div className="space-y-2 text-sm text-gray-600">
            <div className="flex items-center">
              <MapPin className="h-4 w-4 text-violet-400 mr-2" />
              {professional.location}
            </div>
            <div className="flex items-center">
              <DollarSign className="h-4 w-4 text-violet-400 mr-2" />
              <span className="font-medium text-violet-700">
                {professional.pricing.price}
              </span>
              <span className="text-gray-500 ml-1">/ sesión</span>
            </div>
            <div className="flex items-center">
              <Phone className="h-4 w-4 text-violet-400 mr-2" />
              {professional.phone}
            </div>
            <div className="flex items-center">
              <Mail className="h-4 w-4 text-violet-400 mr-2" />
              {professional.email}
            </div>
            <div className="flex items-center">
              <div className="flex gap-1">
                {professional.sessionTypes.includes('Online') && (
                  <Badge variant="outline" className="border-green-300 text-green-700 bg-green-50">
                    <Monitor className="h-3 w-3 mr-1" />
                    Online
                  </Badge>
                )}
                {professional.sessionTypes.includes('Presencial') && (
                  <Badge variant="outline" className="border-blue-300 text-blue-700 bg-blue-50">
                    <Building2 className="h-3 w-3 mr-1" />
                    Presencial
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </div>
        
        <Button
          className="w-full bg-violet-600 hover:bg-violet-700 text-white"
          onClick={() => router.push(`/professionals/${professional.id}`)}
        >
          Ver Perfil
        </Button>
      </CardContent>
    </Card>
  )
} 