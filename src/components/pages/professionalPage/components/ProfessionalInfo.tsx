import { Star, MapPin, Phone, Mail, Clock, DollarSign, Calendar } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Professional } from "@/constants"

interface ProfessionalInfoProps {
  psychologist: Professional
}

export function ProfessionalInfo({ psychologist }: ProfessionalInfoProps) {
  return (
    <Card className="bg-white/80 backdrop-blur-sm border-violet-100">
      <CardContent className="p-8">
                        <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-shrink-0">
                    <Avatar className="h-48 w-48 rounded-2xl border-4 border-violet-200">
                      <AvatarImage
                        src={psychologist.image || "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face"}
                        alt={psychologist.name}
                      />
                      <AvatarFallback className="bg-violet-100 text-violet-700 text-4xl font-semibold rounded-2xl">
                        {psychologist.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </div>

          <div className="flex-1">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold text-violet-900 mb-2">{psychologist.name}</h1>
                <p className="text-lg text-violet-600 mb-3">{psychologist.specialty}</p>
                <div className="flex items-center mb-4">
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400 mr-1" />
                  <span className="text-lg font-semibold text-gray-800 mr-2">
                    {psychologist.rating}
                  </span>
                  <span className="text-gray-600">({psychologist.reviews} reseñas)</span>
                </div>
              </div>
            </div>

            {/* Categories */}
            <div className="flex flex-wrap gap-2 mb-6">
              {psychologist.categories.map((category) => (
                <Badge
                  key={category}
                  variant="secondary"
                  className="bg-violet-100 text-violet-700 hover:bg-violet-200"
                >
                  {category}
                </Badge>
              ))}
            </div>

            {/* Pricing Info */}
            <div className="bg-violet-50 p-4 rounded-lg mb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <DollarSign className="h-5 w-5 text-violet-600 mr-2" />
                  <span className="text-lg font-semibold text-violet-900">
                    {psychologist.pricing.price}
                  </span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 text-violet-600 mr-2" />
                  <span className="text-sm text-gray-600">
                    60 min
                  </span>
                </div>
              </div>
            </div>

            {/* Contact information */}
            <div className="space-y-3">
              <div className="flex items-center">
                <MapPin className="h-4 w-4 text-violet-400 mr-3" />
                <span className="text-gray-700">{psychologist.location}</span>
              </div>
              <div className="flex items-center">
                <Phone className="h-4 w-4 text-violet-400 mr-3" />
                <span className="text-gray-700">{psychologist.phone}</span>
              </div>
              <div className="flex items-center">
                <Mail className="h-4 w-4 text-violet-400 mr-3" />
                <span className="text-gray-700">{psychologist.email}</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 