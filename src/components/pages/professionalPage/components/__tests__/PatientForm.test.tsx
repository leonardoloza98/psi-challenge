import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { PatientForm } from '../PatientForm'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { bookingFormSchema, type BookingFormData } from '@/schemas/bookingSchema'

// Wrapper para el formulario
const TestWrapper = () => {
  const form = useForm<BookingFormData>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      selectedDate: "",
      selectedTime: "",
      sessionType: "Online",
      patientName: "",
      patientEmail: "",
      patientPhone: "",
      notes: "",
    },
  })

  return <PatientForm form={form} />
}

describe('PatientForm', () => {
  it('renderiza todos los campos del formulario', () => {
    render(<TestWrapper />)
    
    expect(screen.getByText('Información del Paciente')).toBeInTheDocument()
    expect(screen.getByText('Nombre completo *')).toBeInTheDocument()
    expect(screen.getByText('Email *')).toBeInTheDocument()
    expect(screen.getByText('Teléfono *')).toBeInTheDocument()
    expect(screen.getByText('Notas adicionales')).toBeInTheDocument()
  })

  it('renderiza los placeholders correctos', () => {
    render(<TestWrapper />)
    
    expect(screen.getByPlaceholderText('Tu nombre completo')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('tu@email.com')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('+52 55 1234 5678')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Información adicional que quieras compartir')).toBeInTheDocument()
  })

  it('permite escribir en los campos del formulario', () => {
    render(<TestWrapper />)
    
    const nameInput = screen.getByPlaceholderText('Tu nombre completo')
    const emailInput = screen.getByPlaceholderText('tu@email.com')
    const phoneInput = screen.getByPlaceholderText('+52 55 1234 5678')
    const notesTextarea = screen.getByPlaceholderText('Información adicional que quieras compartir')
    
    fireEvent.change(nameInput, { target: { value: 'Juan Pérez' } })
    fireEvent.change(emailInput, { target: { value: 'juan@test.com' } })
    fireEvent.change(phoneInput, { target: { value: '+52 55 1234 5678' } })
    fireEvent.change(notesTextarea, { target: { value: 'Nota de prueba' } })
    
    expect(nameInput).toHaveValue('Juan Pérez')
    expect(emailInput).toHaveValue('juan@test.com')
    expect(phoneInput).toHaveValue('+52 55 1234 5678')
    expect(notesTextarea).toHaveValue('Nota de prueba')
  })

  it('muestra los tipos de input correctos', () => {
    render(<TestWrapper />)
    
    const nameInput = screen.getByPlaceholderText('Tu nombre completo')
    const emailInput = screen.getByPlaceholderText('tu@email.com')
    const phoneInput = screen.getByPlaceholderText('+52 55 1234 5678')
    
    expect(nameInput).toHaveAttribute('type', 'text')
    expect(emailInput).toHaveAttribute('type', 'email')
    expect(phoneInput).toHaveAttribute('type', 'tel')
  })
}) 