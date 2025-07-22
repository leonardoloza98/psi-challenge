import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { ProfessionalHeader } from '../ProfessionalHeader'

// Mock de window.history.back
const mockBack = vi.fn()
Object.defineProperty(window, 'history', {
  value: {
    back: mockBack,
  },
  writable: true,
})

describe('ProfessionalHeader', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renderiza el botón de volver', () => {
    render(<ProfessionalHeader />)
    
    expect(screen.getByText('Volver')).toBeInTheDocument()
  })

  it('muestra el ícono de flecha hacia la izquierda', () => {
    render(<ProfessionalHeader />)
    
    const button = screen.getByText('Volver')
    const icon = button.querySelector('svg')
    
    expect(icon).toBeInTheDocument()
  })

  it('llama a window.history.back() cuando se hace clic en el botón', () => {
    render(<ProfessionalHeader />)
    
    const button = screen.getByText('Volver')
    fireEvent.click(button)
    
    expect(mockBack).toHaveBeenCalledTimes(1)
  })

  it('renderiza el título y descripción de la página', () => {
    render(<ProfessionalHeader />)
    
    expect(screen.getByText('Encuentra tu Psicólogo Ideal')).toBeInTheDocument()
    expect(screen.getByText(/Conecta con profesionales de la salud mental/)).toBeInTheDocument()
  })
}) 