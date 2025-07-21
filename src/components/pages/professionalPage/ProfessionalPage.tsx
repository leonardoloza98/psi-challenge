"use client"

import { useState } from "react"
import Image from "next/image"
import {
  ArrowLeft,
  Star,
  MapPin,
  Phone,
  Mail,
  Clock,
  Calendar,
  CheckCircle,
  Award,
  Users,
  BookOpen,
  Loader2,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { availableSlots } from "@/constants"
import { useRouter } from "next/navigation"
import { useProfessional, useCreateBooking } from "@/hooks/useApi"

interface ProfessionalPageClientProps {
  professionalId: number
}

export const ProfessionalPage = ({ professionalId }: ProfessionalPageClientProps) => {
  const router = useRouter()
  const [selectedDate, setSelectedDate] = useState<string>("")
  const [selectedTime, setSelectedTime] = useState<string>("")
  const [selectedSessionType, setSelectedSessionType] = useState<string>("")
  const [isBookingOpen, setIsBookingOpen] = useState(false)
  const [patientName, setPatientName] = useState("")
  const [patientEmail, setPatientEmail] = useState("")
  const [patientPhone, setPatientPhone] = useState("")
  const [notes, setNotes] = useState("")

  // Use API hooks
  const { data: professionalData, loading, error } = useProfessional(professionalId)
  const { createBooking, loading: bookingLoading, error: bookingError } = useCreateBooking()

  const psychologist = professionalData?.data

  // Generate calendar days (next 2 weeks)
  const generateCalendarDays = () => {
    const days = []
    const today = new Date()

    for (let i = 0; i < 14; i++) {
      const date = new Date(today)
      date.setDate(today.getDate() + i)
      const dateString = date.toISOString().split("T")[0]
      const dayName = date.toLocaleDateString("es-ES", { weekday: "short" })
      const dayNumber = date.getDate()

      days.push({
        date: dateString,
        dayName: dayName.charAt(0).toUpperCase() + dayName.slice(1),
        dayNumber,
        hasSlots: availableSlots[dateString]?.length > 0,
      })
    }

    return days
  }

  const calendarDays = generateCalendarDays()

  const handleBooking = async () => {
    if (!psychologist || !selectedDate || !selectedTime || !selectedSessionType || !patientName || !patientEmail || !patientPhone) {
      return
    }

    try {
      await createBooking({
        professionalId: psychologist.id,
        date: selectedDate,
        time: selectedTime,
        sessionType: selectedSessionType as 'Presencial' | 'Online',
        patientName,
        patientEmail,
        patientPhone,
        notes
      })
      
      alert(`Cita agendada exitosamente para el ${selectedDate} a las ${selectedTime} (${selectedSessionType})`)
      setIsBookingOpen(false)
      setSelectedDate("")
      setSelectedTime("")
      setSelectedSessionType("")
      setPatientName("")
      setPatientEmail("")
      setPatientPhone("")
      setNotes("")
    } catch (error) {
      console.error('Error creating booking:', error)
    }
  }

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-50">
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-center items-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-violet-600" />
            <span className="ml-2 text-violet-600">Cargando profesional...</span>
          </div>
        </div>
      </div>
    )
  }

  // Show error state
  if (error || !psychologist) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-50">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <div className="text-red-600 mb-4">Error al cargar el profesional</div>
            <div className="text-gray-600">{error || 'Profesional no encontrado'}</div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header with back button */}
        <div className="flex items-center mb-8">
          <Button
            variant="ghost"
            className="mr-4 text-violet-600 hover:text-violet-700 hover:bg-violet-100"
            onClick={() => router.back()}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver a la lista
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main column - Professional information */}
          <div className="lg:col-span-2 space-y-6">
            {/* Main card - Professional information */}
            <Card className="bg-white/80 backdrop-blur-sm border-violet-100">
              <CardContent className="p-8">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-shrink-0">
                    <Image
                      src={psychologist.image || "/placeholder.svg"}
                      alt={psychologist.name}
                      width={200}
                      height={200}
                      className="rounded-2xl object-cover border-4 border-violet-200"
                    />
                    <div className="mt-4 flex items-center justify-center">
                      <div className="bg-green-500 w-4 h-4 rounded-full mr-2"></div>
                      <span className="text-sm text-green-600 font-medium">Disponible</span>
                    </div>
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
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 text-violet-400 mr-3" />
                        <span className="text-gray-700">Experiencia: {psychologist.experience}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* About section */}
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

            {/* Education and certifications */}
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
          </div>

          {/* Sidebar - Booking */}
          <div className="space-y-6">
            <Card className="bg-white/80 backdrop-blur-sm border-violet-100 sticky top-24">
              <CardHeader>
                <CardTitle className="text-violet-900">Agendar Cita</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-violet-900">$800 MXN</p>
                  <p className="text-sm text-gray-600">por sesión de 50 minutos</p>
                </div>

                <Separator />

                <div className="space-y-3">
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">Tipo de sesión</label>
                    <Select value={selectedSessionType} onValueChange={setSelectedSessionType}>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Presencial">Presencial</SelectItem>
                        <SelectItem value="Online">Online</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Dialog open={isBookingOpen} onOpenChange={setIsBookingOpen}>
                    <DialogTrigger asChild>
                      <Button className="w-full bg-violet-600 hover:bg-violet-700 text-white">
                        Seleccionar Fecha y Hora
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-lg">
                      <DialogHeader>
                        <DialogTitle>Agendar Cita</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        {/* Patient Information */}
                        <div className="space-y-3">
                          <h4 className="font-medium">Información del Paciente</h4>
                          <div>
                            <label className="text-sm font-medium text-gray-700 mb-1 block">Nombre completo *</label>
                            <input
                              type="text"
                              value={patientName}
                              onChange={(e) => setPatientName(e.target.value)}
                              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                              placeholder="Tu nombre completo"
                            />
                          </div>
                          <div>
                            <label className="text-sm font-medium text-gray-700 mb-1 block">Email *</label>
                            <input
                              type="email"
                              value={patientEmail}
                              onChange={(e) => setPatientEmail(e.target.value)}
                              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                              placeholder="tu@email.com"
                            />
                          </div>
                          <div>
                            <label className="text-sm font-medium text-gray-700 mb-1 block">Teléfono *</label>
                            <input
                              type="tel"
                              value={patientPhone}
                              onChange={(e) => setPatientPhone(e.target.value)}
                              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                              placeholder="+52 55 1234 5678"
                            />
                          </div>
                          <div>
                            <label className="text-sm font-medium text-gray-700 mb-1 block">Notas adicionales</label>
                            <textarea
                              value={notes}
                              onChange={(e) => setNotes(e.target.value)}
                              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                              placeholder="Información adicional que quieras compartir"
                              rows={3}
                            />
                          </div>
                        </div>

                        <Separator />

                        {/* Calendar */}
                        <div>
                          <h4 className="font-medium mb-3">Fecha</h4>
                          <div className="grid grid-cols-7 gap-2">
                            {calendarDays.map((day) => (
                              <button
                                key={day.date}
                                onClick={() => setSelectedDate(day.date)}
                                className={`p-2 rounded-lg text-sm transition-colors ${
                                  selectedDate === day.date
                                    ? "bg-violet-600 text-white"
                                    : day.hasSlots
                                    ? "bg-violet-100 text-violet-700 hover:bg-violet-200"
                                    : "bg-gray-100 text-gray-400 cursor-not-allowed"
                                }`}
                                disabled={!day.hasSlots}
                              >
                                <div className="text-xs">{day.dayName}</div>
                                <div className="font-medium">{day.dayNumber}</div>
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Time slots */}
                        {selectedDate && (
                          <div>
                            <h4 className="font-medium mb-3">Hora</h4>
                            <div className="grid grid-cols-3 gap-2">
                              {availableSlots[selectedDate]?.map((time) => (
                                <button
                                  key={time}
                                  onClick={() => setSelectedTime(time)}
                                  className={`p-2 rounded-lg text-sm transition-colors ${
                                    selectedTime === time
                                      ? "bg-violet-600 text-white"
                                      : "bg-violet-100 text-violet-700 hover:bg-violet-200"
                                  }`}
                                >
                                  {time}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}

                        {bookingError && (
                          <div className="text-red-600 text-sm bg-red-50 p-2 rounded">
                            {bookingError}
                          </div>
                        )}

                        <Button
                          onClick={handleBooking}
                          disabled={!selectedDate || !selectedTime || !selectedSessionType || !patientName || !patientEmail || !patientPhone || bookingLoading}
                          className="w-full bg-violet-600 hover:bg-violet-700 text-white"
                        >
                          {bookingLoading ? (
                            <>
                              <Loader2 className="h-4 w-4 animate-spin mr-2" />
                              Agendando...
                            </>
                          ) : (
                            'Confirmar Cita'
                          )}
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
} 

export default ProfessionalPage