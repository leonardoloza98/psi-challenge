import { NextRequest, NextResponse } from 'next/server'
import professionalsData from '@/data/professionals.json'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    
    const search = searchParams.get('search') || ''
    const category = searchParams.get('category') || ''
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    
    const { professionals, categories } = professionalsData
    const filteredProfessionals = professionals.filter(professional => {
      const matchesSearch = !search || 
        professional.name.toLowerCase().includes(search.toLowerCase()) ||
        professional.specialty.toLowerCase().includes(search.toLowerCase()) ||
        professional.location.toLowerCase().includes(search.toLowerCase())
      
      const matchesCategory = !category || 
        professional.categories.includes(category)
      
      return matchesSearch && matchesCategory
    })

    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedProfessionals = filteredProfessionals.slice(startIndex, endIndex)
    
    const total = filteredProfessionals.length
    const totalPages = Math.ceil(total / limit)
    const hasNextPage = page < totalPages
    const hasPrevPage = page > 1
    
    await new Promise(resolve => setTimeout(resolve, 300))
    
    return NextResponse.json({
      success: true,
      data: {
        professionals: paginatedProfessionals,
        pagination: {
          page,
          limit,
          total,
          totalPages,
          hasNextPage,
          hasPrevPage
        },
        filters: {
          search,
          category,
          availableCategories: categories
        }
      }
    })
    
  } catch (error) {
    console.error('Error fetching professionals:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Error interno del servidor' 
      },
      { status: 500 }
    )
  }
} 