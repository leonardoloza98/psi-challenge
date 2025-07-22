import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { ProfessionalHeader } from '../ProfessionalHeader'

// Mock de next/navigation
const mockRouter = {
  back: vi.fn(),
  push: vi.fn(),
  replace: vi.fn(),
  prefetch: vi.fn(),
  forward: vi.fn(),
  refresh: vi.fn(),
}

vi.mock('next/navigation', () => ({
  useRouter: () => mockRouter,
}))

describe('ProfessionalHeader', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renderiza el botón de volver', () => {
    render(<ProfessionalHeader />)
    
    expect(screen.getByText('Volver a la lista')).toBeInTheDocument()
  })

  it('muestra el ícono de flecha hacia la izquierda', () => {
    render(<ProfessionalHeader />)
    
    const button = screen.getByText('Volver a la lista')
    const icon = button.querySelector('svg')
    
    expect(icon).toBeInTheDocument()
  })

  it('llama a router.back() cuando se hace clic en el botón', () => {
    render(<ProfessionalHeader />)
    
    const button = screen.getByText('Volver a la lista')
    fireEvent.click(button)
    
    expect(mockRouter.back).toHaveBeenCalledTimes(1)
  })
}) 