import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { ProfessionalCard } from '../ProfessionalCard'
import { Professional } from '@/constants'

// Mock del profesional
const mockProfessional: Professional = {
  id: 1 as number,
  name: "Dr. María González",
  specialty: "Psicología Clínica",
  categories: ["Terapia Cognitivo-Conductual", "Ansiedad", "Depresión"],
  sessionTypes: ['Online', 'Presencial'],
  location: "Buenos Aires, Argentina",
  phone: "+54 11 1234-5678",
  email: "maria.gonzalez@psicologia.com",
  image: "/professionals/maria-gonzalez.jpg",
  pricing: { price: "$120" },
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
  presencialSlots: {}
}

describe('ProfessionalCard', () => {
  it('renderiza la información básica del profesional', () => {
    render(<ProfessionalCard professional={mockProfessional} />)
    
    expect(screen.getByText('Dr. María González')).toBeInTheDocument()
    expect(screen.getByText('Psicología Clínica')).toBeInTheDocument()
    expect(screen.getByText('$120')).toBeInTheDocument()
  })

  it('muestra los badges de tipo de sesión', () => {
    render(<ProfessionalCard professional={mockProfessional} />)
    
    expect(screen.getByText('Online')).toBeInTheDocument()
    expect(screen.getByText('Presencial')).toBeInTheDocument()
  })

  it('muestra las categorías del profesional', () => {
    render(<ProfessionalCard professional={mockProfessional} />)
    
    expect(screen.getByText('Terapia Cognitivo-Conductual')).toBeInTheDocument()
    expect(screen.getByText('Ansiedad')).toBeInTheDocument()
    expect(screen.getByText('Depresión')).toBeInTheDocument()
  })

  it('renderiza el precio del profesional', () => {
    render(<ProfessionalCard professional={mockProfessional} />)
    
    expect(screen.getByText('$120')).toBeInTheDocument()
  })

  it('muestra la ubicación del profesional', () => {
    render(<ProfessionalCard professional={mockProfessional} />)
    
    expect(screen.getByText('Buenos Aires, Argentina')).toBeInTheDocument()
  })
}) 