import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { ProfessionalGrid } from '../ProfessionalGrid'
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

const mockProfessionals = [mockProfessional]

describe('ProfessionalGrid', () => {
  it('renderiza el grid con la clase CSS correcta', () => {
    render(<ProfessionalGrid professionals={mockProfessionals} />)
    
    // Buscar el contenedor grid directamente
    const grid = document.querySelector('.grid.grid-cols-1.md\\:grid-cols-2.lg\\:grid-cols-3')
    expect(grid).toBeInTheDocument()
  })

  it('renderiza las tarjetas de profesionales', () => {
    render(<ProfessionalGrid professionals={mockProfessionals} />)
    
    expect(screen.getByText('Dr. María González')).toBeInTheDocument()
    expect(screen.getByText('Psicología Clínica')).toBeInTheDocument()
  })

  it('renderiza múltiples profesionales cuando se proporcionan', () => {
    const secondProfessional = { ...mockProfessional, id: 2, name: "Dr. Carlos Mendoza" }
    const multipleProfessionals = [mockProfessional, secondProfessional]
    
    render(<ProfessionalGrid professionals={multipleProfessionals} />)
    
    expect(screen.getByText('Dr. María González')).toBeInTheDocument()
    expect(screen.getByText('Dr. Carlos Mendoza')).toBeInTheDocument()
  })
}) 