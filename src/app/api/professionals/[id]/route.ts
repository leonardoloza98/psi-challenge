import { NextRequest, NextResponse } from 'next/server'
import professionals from '@/data/professionals.json'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    
    await new Promise(resolve => setTimeout(resolve, 200))
    const professional = professionals.professionals.find(p => p.id === parseInt(id))
    if (!professional) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Profesional no encontrado' 
        },
        { status: 404 }
      )
    }
    
    return NextResponse.json({
      success: true,
      data: professional
    })
    
  } catch (error) {
    console.error('Error fetching professional:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Error interno del servidor' 
      },
      { status: 500 }
    )
  }
} 