import { MapPin, Phone, Mail, Clock, DollarSign } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Professional } from "@/constants"

interface ProfessionalInfoProps {
  professional: Professional
}

export function ProfessionalInfo({ professional }: ProfessionalInfoProps) {
  return (
    <Card className="bg-white/80 backdrop-blur-sm border-violet-100">
      <CardContent className="p-8">
        <div className="flex flex-col md:flex-row gap-6">
          <Avatar className="h-48 w-48 rounded-2xl border-4 border-violet-200 flex-shrink-0">
            <AvatarImage
              src={professional.image || "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face"}
              alt={professional.name}
            />
            <AvatarFallback className="bg-violet-100 text-violet-700 text-4xl font-semibold rounded-2xl">
              {professional.name.split(' ').map((n: string) => n[0]).join('').toUpperCase()}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1">
            <h1 className="text-3xl font-bold text-violet-900 mb-2">{professional.name}</h1>
            <p className="text-lg text-violet-600 mb-3">{professional.specialty}</p>

            <div className="flex flex-wrap gap-2 mb-6">
              {professional.categories.map((category: string) => (
                <Badge
                  key={category}
                  variant="secondary"
                  className="bg-violet-100 text-violet-700 hover:bg-violet-200"
                >
                  {category}
                </Badge>
              ))}
            </div>

            <div className="bg-violet-50 p-4 rounded-lg mb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <DollarSign className="h-5 w-5 text-violet-600 mr-2" />
                  <span className="text-lg font-semibold text-violet-900">
                    {professional.pricing.price}
                  </span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 text-violet-600 mr-2" />
                  <span className="text-sm text-gray-600">60 min</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center">
                <MapPin className="h-4 w-4 text-violet-400 mr-3" />
                <span className="text-gray-700">{professional.location}</span>
              </div>
              <div className="flex items-center">
                <Phone className="h-4 w-4 text-violet-400 mr-3" />
                <span className="text-gray-700">{professional.phone}</span>
              </div>
              <div className="flex items-center">
                <Mail className="h-4 w-4 text-violet-400 mr-3" />
                <span className="text-gray-700">{professional.email}</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 