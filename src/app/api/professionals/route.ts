import { NextRequest, NextResponse } from 'next/server'
import { professionalsService } from '@/lib/firestore'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    
    const search = searchParams.get('search') || ''
    const category = searchParams.get('category') || ''
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    
    // Get professionals from Firestore
    const result = await professionalsService.getAll(limit)
    let professionals = result.professionals
    
    // Apply filters
    if (search) {
      professionals = professionals.filter(professional => 
        professional.name.toLowerCase().includes(search.toLowerCase()) ||
        professional.specialty.toLowerCase().includes(search.toLowerCase()) ||
        professional.location.toLowerCase().includes(search.toLowerCase())
      )
    }
    
    if (category) {
      professionals = professionals.filter(professional => 
        professional.categories.includes(category)
      )
    }
    
    // Apply pagination
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedProfessionals = professionals.slice(startIndex, endIndex)
    
    const total = professionals.length
    const totalPages = Math.ceil(total / limit)
    const hasNextPage = page < totalPages
    const hasPrevPage = page > 1
    
    // Get categories from Firestore (you might want to create a separate endpoint for this)
    const availableCategories = [
      "Todas las categorías",
      "Ansiedad",
      "Depresión", 
      "Terapia de Pareja",
      "Terapia Infantil",
      "TDAH",
      "Autismo",
      "Estrés Laboral",
      "Coaching",
      "Desarrollo Personal",
      "Rehabilitación Cognitiva",
      "Demencia",
      "Traumatismo Craneal",
      "Trastornos Alimentarios",
      "Autoestima",
      "Adicciones",
      "Rehabilitación",
      "Terapia Grupal",
      "Trauma",
      "Problemas de Conducta",
      "Liderazgo"
    ]
    
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
          availableCategories
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