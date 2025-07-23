import { Pricing } from './Pricing'
import { WeeklySchedule } from './WeeklySchedule'
import { AvailableSlots } from './AvailableSlots'

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