import { NextRequest, NextResponse } from 'next/server'
import { psychologists, availableSlots } from '@/constants'

interface BookingRequest {
  professionalId: number
  date: string
  time: string
  sessionType: 'Presencial' | 'Online'
  patientName: string
  patientEmail: string
  patientPhone: string
  notes?: string
}

export async function POST(request: NextRequest) {
  try {
    const body: BookingRequest = await request.json()
    
    // Validate required fields
    const requiredFields = ['professionalId', 'date', 'time', 'sessionType', 'patientName', 'patientEmail', 'patientPhone']
    for (const field of requiredFields) {
      if (!body[field as keyof BookingRequest]) {
        return NextResponse.json(
          { 
            success: false, 
            error: `Campo requerido faltante: ${field}` 
          },
          { status: 400 }
        )
      }
    }
    
    // Validate professional exists
    const professional = psychologists.find(p => p.id === body.professionalId)
    if (!professional) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Profesional no encontrado' 
        },
        { status: 404 }
      )
    }
    
    // Validate date and time availability
    const availableTimesForDate = availableSlots[body.date]
    if (!availableTimesForDate || !availableTimesForDate.includes(body.time)) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Fecha u hora no disponible' 
        },
        { status: 400 }
      )
    }
    
    // Validate session type
    if (!['Presencial', 'Online'].includes(body.sessionType)) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Tipo de sesión inválido' 
        },
        { status: 400 }
      )
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(body.patientEmail)) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Formato de email inválido' 
        },
        { status: 400 }
      )
    }
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500))
    
    // Generate booking ID
    const bookingId = `BK${Date.now()}${Math.random().toString(36).substr(2, 5).toUpperCase()}`
    
    // Create booking object
    const booking = {
      id: bookingId,
      professionalId: body.professionalId,
      professionalName: professional.name,
      date: body.date,
      time: body.time,
      sessionType: body.sessionType,
      patientName: body.patientName,
      patientEmail: body.patientEmail,
      patientPhone: body.patientPhone,
      notes: body.notes || '',
      status: 'confirmed',
      createdAt: new Date().toISOString(),
      price: 800, // MXN
      duration: '50 minutos'
    }
    
    // In a real app, you would save this to a database
    // For now, we'll just return the booking
    
    return NextResponse.json({
      success: true,
      data: booking,
      message: 'Reserva creada exitosamente'
    }, { status: 201 })
    
  } catch (error) {
    console.error('Error creating booking:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Error interno del servidor' 
      },
      { status: 500 }
    )
  }
} 