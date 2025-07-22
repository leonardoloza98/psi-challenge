import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { SessionTypeSelector } from '../SessionTypeSelector'
import { Professional } from '@/constants'

// Mock del profesional con ambos tipos de sesión
const mockProfessional: Professional = {
  id: 1 as number,
  name: "Dr. Test",
  specialty: "Psicología",
  categories: ["Terapia"],
  sessionTypes: ['Online', 'Presencial'],
  location: "Buenos Aires",
  phone: "123456789",
  email: "test@test.com",
  image: "test.jpg",
  pricing: { price: "$100" },
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

// Mock del profesional con solo un tipo de sesión
const mockProfessionalSingle: Professional = {
  ...mockProfessional,
  sessionTypes: ['Online']
}

describe('SessionTypeSelector', () => {
  it('renderiza correctamente con múltiples tipos de sesión', () => {
    const mockOnChange = vi.fn()
    
    render(
      <SessionTypeSelector
        professional={mockProfessional}
        selectedSessionType="Todos"
        onSessionTypeChange={mockOnChange}
      />
    )

    expect(screen.getByText('Todos')).toBeInTheDocument()
    expect(screen.getByText('Online')).toBeInTheDocument()
    expect(screen.getByText('Presencial')).toBeInTheDocument()
  })

  it('no renderiza cuando el profesional tiene solo un tipo de sesión', () => {
    const mockOnChange = vi.fn()
    
    const { container } = render(
      <SessionTypeSelector
        professional={mockProfessionalSingle}
        selectedSessionType="Online"
        onSessionTypeChange={mockOnChange}
      />
    )

    expect(container.firstChild).toBeNull()
  })

  it('llama a onSessionTypeChange cuando se hace clic en un botón', () => {
    const mockOnChange = vi.fn()
    
    render(
      <SessionTypeSelector
        professional={mockProfessional}
        selectedSessionType="Todos"
        onSessionTypeChange={mockOnChange}
      />
    )

    fireEvent.click(screen.getByText('Online'))
    expect(mockOnChange).toHaveBeenCalledWith('Online')
  })

  it('aplica estilos correctos al botón seleccionado', () => {
    const mockOnChange = vi.fn()
    
    render(
      <SessionTypeSelector
        professional={mockProfessional}
        selectedSessionType="Online"
        onSessionTypeChange={mockOnChange}
      />
    )

    const onlineButton = screen.getByText('Online').closest('button')
    expect(onlineButton).toHaveClass('bg-green-600', 'text-white')
  })
}) 