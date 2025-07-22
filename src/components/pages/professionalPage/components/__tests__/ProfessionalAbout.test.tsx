import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { ProfessionalAbout } from '../ProfessionalAbout'
import { Professional } from '@/constants'

// Mock del profesional
const mockProfessional: Professional = {
  id: 1,
  name: "Dr. María González",
  specialty: "Psicología Clínica",
  categories: ["Ansiedad", "Depresión"],
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

describe('ProfessionalAbout', () => {
  it('renderiza el título con el nombre del profesional', () => {
    render(<ProfessionalAbout professional={mockProfessional} />)
    
    expect(screen.getByText('Acerca de Dr. María González')).toBeInTheDocument()
  })

  it('muestra el ícono de usuarios', () => {
    render(<ProfessionalAbout professional={mockProfessional} />)
    
    const title = screen.getByText('Acerca de Dr. María González')
    const icon = title.querySelector('svg')
    
    expect(icon).toBeInTheDocument()
  })

  it('renderiza el contenido de la descripción', () => {
    render(<ProfessionalAbout professional={mockProfessional} />)
    
    expect(screen.getByText(/Soy una psicóloga clínica especializada/)).toBeInTheDocument()
    expect(screen.getByText(/terapia cognitivo-conductual/)).toBeInTheDocument()
  })
}) 