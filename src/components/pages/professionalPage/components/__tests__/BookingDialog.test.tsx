import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { BookingDialog } from '../BookingDialog'
import { Professional } from '@/constants/professionals'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { bookingFormSchema, type BookingFormData } from '@/schemas/bookingSchema'
import { ReactQueryProvider } from '@/components/providers/ReactQueryProvider'

// Mock del profesional
const mockProfessional: Professional = {
  id: 1,
  name: "Dr. Test",
  specialty: "Psicología",
  categories: ["Terapia"],
  rating: 4.5,
  reviews: 50,
  sessionTypes: ['Online', 'Presencial'] as ('Online' | 'Presencial')[],
  location: "Buenos Aires",
  phone: "123456789",
  email: "test@test.com",
  experience: "5 años",
  image: "test.jpg",
  about: "Psicólogo especializado en terapia cognitivo-conductual",
  education: ["Licenciatura en Psicología"],
  certifications: ["Certificación en TCC"],
  languages: ["Español"],
  pricing: { price: 100 },
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
  consultationAreas: ["Ansiedad", "Depresión"],
  therapeuticApproaches: ["TCC"],
  insuranceAccepted: ["GNP"]
}

// Wrapper para el formulario
const TestWrapper = ({ professional, onSubmit }: { 
  professional: Professional, 
  onSubmit: (data: BookingFormData) => Promise<void> 
}) => {
  const form = useForm<BookingFormData>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      selectedDate: "",
      selectedTime: "",
      sessionType: professional.sessionTypes[0] as 'Online' | 'Presencial',
      patientName: "",
      patientEmail: "",
      patientPhone: "",
      notes: "",
    },
  })

  return (
    <ReactQueryProvider>
      <BookingDialog
        professional={professional}
        form={form}
        onSubmit={onSubmit}
      />
    </ReactQueryProvider>
  )
}

describe('BookingDialog', () => {
  it('renderiza el botón de reservar', () => {
    const mockOnSubmit = vi.fn()
    
    render(<TestWrapper professional={mockProfessional} onSubmit={mockOnSubmit} />)
    
    expect(screen.getByText('Reservar')).toBeInTheDocument()
  })

  it('abre el sheet cuando se hace clic en el botón', async () => {
    const mockOnSubmit = vi.fn()
    
    render(<TestWrapper professional={mockProfessional} onSubmit={mockOnSubmit} />)
    
    fireEvent.click(screen.getByText('Reservar'))
    
    await waitFor(() => {
      expect(screen.getByText('Agendar Cita')).toBeInTheDocument()
    })
  })

  it('muestra el selector de tipo de sesión cuando hay múltiples tipos', async () => {
    const mockOnSubmit = vi.fn()
    
    render(<TestWrapper professional={mockProfessional} onSubmit={mockOnSubmit} />)
    
    fireEvent.click(screen.getByText('Reservar'))
    
    await waitFor(() => {
      expect(screen.getByText('Tipo de Sesión')).toBeInTheDocument()
      expect(screen.getByText('Online')).toBeInTheDocument()
      expect(screen.getByText('Presencial')).toBeInTheDocument()
    })
  })

  it('no muestra el selector cuando hay solo un tipo de sesión', async () => {
    const mockOnSubmit = vi.fn()
    const singleSessionProfessional = {
      ...mockProfessional,
      sessionTypes: ['Online'] as ('Online' | 'Presencial')[]
    }
    
    render(<TestWrapper professional={singleSessionProfessional} onSubmit={mockOnSubmit} />)
    
    fireEvent.click(screen.getByText('Reservar'))
    
    await waitFor(() => {
      expect(screen.queryByText('Tipo de Sesión')).not.toBeInTheDocument()
    })
  })

  it('muestra el formulario de paciente con los campos correctos', async () => {
    const mockOnSubmit = vi.fn()
    
    render(<TestWrapper professional={mockProfessional} onSubmit={mockOnSubmit} />)
    
    fireEvent.click(screen.getByText('Reservar'))
    
    await waitFor(() => {
      expect(screen.getByText('Nombre completo *')).toBeInTheDocument()
      expect(screen.getByText('Email *')).toBeInTheDocument()
      expect(screen.getByText('Teléfono *')).toBeInTheDocument()
      expect(screen.getByText('Notas adicionales')).toBeInTheDocument()
    })
  })

  it('muestra el botón de confirmar cita', async () => {
    const mockOnSubmit = vi.fn()
    
    render(<TestWrapper professional={mockProfessional} onSubmit={mockOnSubmit} />)
    
    fireEvent.click(screen.getByText('Reservar'))
    
    await waitFor(() => {
      expect(screen.getByText('Confirmar Cita')).toBeInTheDocument()
    })
  })

  it('muestra la descripción del profesional en el sheet', async () => {
    const mockOnSubmit = vi.fn()
    
    render(<TestWrapper professional={mockProfessional} onSubmit={mockOnSubmit} />)
    
    fireEvent.click(screen.getByText('Reservar'))
    
    await waitFor(() => {
      expect(screen.getByText(/Completa los datos para agendar tu cita con Dr\. Test/)).toBeInTheDocument()
    })
  })
}) 