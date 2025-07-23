import { NextRequest, NextResponse } from 'next/server'
import { professionalsService, schedulesService } from '@/lib/firestore'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    
    if (!id) {
      return NextResponse.json(
        { success: false, error: 'ID de profesional requerido' },
        { status: 400 }
      )
    }

    const [professional, schedule] = await Promise.all([
      professionalsService.getById(id),
      schedulesService.getByProfessionalId(id)
    ])

    if (!professional) {
      return NextResponse.json(
        { success: false, error: 'Profesional no encontrado' },
        { status: 404 }
      )
    }

    const professionalWithSchedule = {
      ...professional,
      weeklySchedule: schedule?.weeklySchedule || {}
    }

    await new Promise(resolve => setTimeout(resolve, 200))
    
    return NextResponse.json({
      success: true,
      data: professionalWithSchedule
    })
    
  } catch (error) {
    console.error('Error fetching professional:', error)
    return NextResponse.json(
      { success: false, error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
} 