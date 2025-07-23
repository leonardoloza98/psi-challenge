import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { BookingCard } from '../BookingCard'
import { Professional } from '@/constants/professionals'
import { ReactQueryProvider } from '@/components/providers/ReactQueryProvider'

// Mock de sonner
vi.mock('sonner', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}))

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

// Wrapper para el componente
const TestWrapper = ({ professional }: { professional: Professional }) => {
  return (
    <ReactQueryProvider>
      <BookingCard professional={professional} />
    </ReactQueryProvider>
  )
}

describe('BookingCard', () => {
  it('renderiza el título de agendar cita', () => {
    render(<TestWrapper professional={mockProfessional} />)
    
    expect(screen.getByText('Agendar Cita')).toBeInTheDocument()
  })

  it('muestra el precio del profesional', () => {
    render(<TestWrapper professional={mockProfessional} />)
    
    expect(screen.getByText('$8000')).toBeInTheDocument()
    expect(screen.getByText('por sesión de 60 minutos')).toBeInTheDocument()
  })

  it('renderiza el botón de reservar', () => {
    render(<TestWrapper professional={mockProfessional} />)
    
    expect(screen.getByText('Reservar')).toBeInTheDocument()
  })

  it('renderiza el componente dentro de una card', () => {
    render(<TestWrapper professional={mockProfessional} />)
    
    // Verificar que el componente está dentro de una card usando data-slot
    const card = screen.getByText('Agendar Cita').closest('[data-slot="card"]')
    expect(card).toBeInTheDocument()
  })
}) 