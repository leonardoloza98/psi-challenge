import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { ProfessionalFilters } from '../ProfessionalFilters'

// Mock de las funciones
const mockSetSearchTerm = vi.fn()
const mockSetSelectedCategory = vi.fn()

const defaultProps = {
  searchTerm: '',
  setSearchTerm: mockSetSearchTerm,
  selectedCategory: '',
  setSelectedCategory: mockSetSelectedCategory,
  categories: ['Todas las categorías', 'Ansiedad', 'Depresión', 'Terapia de Pareja']
}

describe('ProfessionalFilters', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renderiza el campo de búsqueda con placeholder', () => {
    render(<ProfessionalFilters {...defaultProps} />)
    
    expect(screen.getByPlaceholderText('Buscar por nombre...')).toBeInTheDocument()
  })

  it('renderiza el selector de categorías', () => {
    render(<ProfessionalFilters {...defaultProps} />)
    
    expect(screen.getByText('Seleccionar categoría')).toBeInTheDocument()
  })

  it('muestra el ícono de búsqueda', () => {
    render(<ProfessionalFilters {...defaultProps} />)
    
    // Buscar el ícono de búsqueda por su clase CSS
    const searchIcon = document.querySelector('.lucide-search')
    expect(searchIcon).toBeInTheDocument()
  })

  it('llama a setSearchTerm cuando se escribe en el campo de búsqueda', () => {
    render(<ProfessionalFilters {...defaultProps} />)
    
    const searchInput = screen.getByPlaceholderText('Buscar por nombre...')
    fireEvent.change(searchInput, { target: { value: 'María' } })
    
    expect(mockSetSearchTerm).toHaveBeenCalledWith('María')
  })

  it('renderiza las categorías en el selector', () => {
    render(<ProfessionalFilters {...defaultProps} />)
    
    // Abrir el selector
    const selectTrigger = screen.getByText('Seleccionar categoría')
    fireEvent.click(selectTrigger)
    
    // Verificar que las categorías están disponibles
    expect(screen.getByText('Todas las categorías')).toBeInTheDocument()
    expect(screen.getByText('Ansiedad')).toBeInTheDocument()
    expect(screen.getByText('Depresión')).toBeInTheDocument()
    expect(screen.getByText('Terapia de Pareja')).toBeInTheDocument()
  })
}) 