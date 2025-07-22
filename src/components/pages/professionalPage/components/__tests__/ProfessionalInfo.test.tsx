import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { ProfessionalInfo } from '../ProfessionalInfo'
import { Professional } from '@/constants'

// Mock del profesional
const mockProfessional: Professional = {
  id: 1,
  name: "Dr. María González",
  specialty: "Psicología Clínica",
  categories: ["Ansiedad", "Depresión", "Terapia de Pareja"],
  rating: 4.9,
  reviews: 127,
  location: "Ciudad de Córdoba",
  phone: "+52 55 1234 5678",
  email: "maria.gonzalez@email.com",
  experience: "8 años",
  image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
  about: "Soy una psicóloga clínica especializada en terapia cognitivo-conductual",
  education: ["Doctorado en Psicología Clínica"],
  certifications: ["Certificación en TCC"],
  languages: ["Español", "Inglés"],
  pricing: { price: 8000 },
  weeklySchedule: {
    monday: [],
    tuesday: [],
    wednesday: [],
    thursday: [],
    friday: [],
    saturday: [],
    sunday: []
  },
  availableSlots: {},
  onlineSlots: {},
  presencialSlots: {},
  status: "active",
  consultationAreas: ["Trastornos de Ansiedad", "Depresión"],
  therapeuticApproaches: ["Terapia Cognitivo-Conductual"],
  insuranceAccepted: ["Seguros Monterrey", "GNP"],
  sessionTypes: ["Online", "Presencial"] as ('Online' | 'Presencial')[]
}

describe('ProfessionalInfo', () => {
  it('renderiza la información básica del profesional', () => {
    render(<ProfessionalInfo professional={mockProfessional} />)
    
    expect(screen.getByText('Dr. María González')).toBeInTheDocument()
    expect(screen.getByText('Psicología Clínica')).toBeInTheDocument()
    expect(screen.getByText('Ciudad de Córdoba')).toBeInTheDocument()
  })

  it('renderiza el avatar del profesional', () => {
    render(<ProfessionalInfo professional={mockProfessional} />)
    
    // Verificar que el avatar está presente (puede ser imagen o fallback)
    const avatarContainer = screen.getByText('DMG')
    expect(avatarContainer).toBeInTheDocument()
  })

  it('renderiza las categorías como badges', () => {
    render(<ProfessionalInfo professional={mockProfessional} />)
    
    expect(screen.getByText('Ansiedad')).toBeInTheDocument()
    expect(screen.getByText('Depresión')).toBeInTheDocument()
    expect(screen.getByText('Terapia de Pareja')).toBeInTheDocument()
  })

  it('muestra la información de contacto', () => {
    render(<ProfessionalInfo professional={mockProfessional} />)
    
    expect(screen.getByText('+52 55 1234 5678')).toBeInTheDocument()
    expect(screen.getByText('maria.gonzalez@email.com')).toBeInTheDocument()
  })

  it('muestra el precio y duración de la sesión', () => {
    render(<ProfessionalInfo professional={mockProfessional} />)
    
    expect(screen.getByText('8000')).toBeInTheDocument()
    expect(screen.getByText('60 min')).toBeInTheDocument()
  })
}) 