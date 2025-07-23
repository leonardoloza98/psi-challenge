// Tipos expandidos
export interface WeeklySchedule {
  monday: TimeSlot[]
  tuesday: TimeSlot[]
  wednesday: TimeSlot[]
  thursday: TimeSlot[]
  friday: TimeSlot[]
  saturday: TimeSlot[]
  sunday: TimeSlot[]
}

export interface TimeSlot {
  startTime: string
  endTime: string
  isAvailable: boolean
  sessionType: 'Online' | 'Presencial'
}

export interface Pricing {
  price: number
}

export interface Professional {
  id: number
  name: string
  specialty: string
  categories: string[]
  rating: number
  reviews: number
  location: string
  phone: string
  email: string
  experience: string
  image: string
  about: string
  education: string[]
  certifications: string[]
  languages: string[]
  pricing: Pricing
  weeklySchedule: WeeklySchedule
  availableSlots: AvailableSlots
  onlineSlots: AvailableSlots
  presencialSlots: AvailableSlots
  status: 'active' | 'inactive' | 'on_vacation'
  consultationAreas: string[]
  therapeuticApproaches: string[]
  insuranceAccepted: string[]
  emergencyContact?: string
  sessionTypes: ('Online' | 'Presencial')[]
  officeAddress?: string
}

export interface AvailableSlots {
  [key: string]: string[]
}

export const categories = [
  "Todas las categorías",
  "Ansiedad",
  "Depresión",
  "Terapia de Pareja",
  "Terapia Infantil",
  "TDAH",
  "Autismo",
  "Estrés Laboral",
  "Coaching",
  "Desarrollo Personal",
  "Rehabilitación Cognitiva",
  "Demencia",
  "Traumatismo Craneal",
  "Trastornos Alimentarios",
  "Autoestima",
  "Adicciones",
  "Rehabilitación",
  "Terapia Grupal",
  "Trauma",
  "Problemas de Conducta",
  "Liderazgo",
]

 