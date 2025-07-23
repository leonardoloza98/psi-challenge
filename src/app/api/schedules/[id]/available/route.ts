import { NextRequest, NextResponse } from 'next/server'
import { schedulesService } from '@/lib/firestore'

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

    const availableSchedule = await schedulesService.getAvailableSchedule(id)

    await new Promise(resolve => setTimeout(resolve, 200))
    
    return NextResponse.json({
      success: true,
      data: availableSchedule
    })
    
  } catch (error) {
    console.error('Error fetching available schedule:', error)
    return NextResponse.json(
      { success: false, error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
} 