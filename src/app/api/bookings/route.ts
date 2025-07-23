import { NextRequest, NextResponse } from 'next/server'
import { bookingsService, type Booking } from '@/lib/firestore'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const professionalId = searchParams.get('professionalId')
    const patientEmail = searchParams.get('patientEmail')
    const userId = searchParams.get('userId')
    
    let bookings: Booking[] = []
    
    if (professionalId) {
      bookings = await bookingsService.getByProfessionalId(professionalId, userId || undefined)
    } else if (patientEmail) {
      bookings = await bookingsService.getByPatientEmail(patientEmail)
    } else if (userId) {
      bookings = await bookingsService.getByUserId(userId)
    } else {
      bookings = []
    }
    
    await new Promise(resolve => setTimeout(resolve, 100))
    
    return NextResponse.json({
      success: true,
      data: bookings,
      message: 'Reservas obtenidas exitosamente'
    })
  } catch (error) {
    console.error('Error fetching bookings:', error)
    return NextResponse.json(
      { success: false, message: 'Error al obtener las reservas' },
      { status: 500 }
    )
  }
}

// POST - Crear nueva reserva
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { 
      userId,
      professionalId, 
      professionalName, 
      date, 
      time, 
      sessionType, 
      patientName, 
      patientEmail, 
      patientPhone, 
      notes 
    } = body

    if (!userId || !professionalId || !date || !time) {
      return NextResponse.json(
        { success: false, message: 'userId, professionalId, date y time son requeridos' },
        { status: 400 }
      )
    }

    // Check if time slot is available
    const isAvailable = await bookingsService.isTimeSlotAvailable(professionalId, date, time)
    if (!isAvailable) {
      return NextResponse.json(
        { success: false, message: 'El horario seleccionado no está disponible' },
        { status: 409 }
      )
    }

    const bookingData = {
      userId,
      professionalId,
      professionalName,
      date,
      time,
      sessionType,
      patientName,
      patientEmail,
      patientPhone,
      notes,
      status: 'confirmed' as const
    }

    const newBooking = await bookingsService.create(bookingData)

    await new Promise(resolve => setTimeout(resolve, 500))
    
    return NextResponse.json({
      success: true,
      data: newBooking,
      message: 'Reserva creada exitosamente'
    }, { status: 201 })
  } catch (error) {
    console.error('Error creating booking:', error)
    return NextResponse.json(
      { success: false, message: 'Error al crear la reserva' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const bookingId = searchParams.get('id')

    if (!bookingId) {
      return NextResponse.json(
        { success: false, message: 'ID de reserva es requerido' },
        { status: 400 }
      )
    }

    await bookingsService.delete(bookingId)

    await new Promise(resolve => setTimeout(resolve, 300))
    
    return NextResponse.json({
      success: true,
      message: 'Reserva eliminada exitosamente'
    })
  } catch (error) {
    console.error('Error deleting booking:', error)
    return NextResponse.json(
      { success: false, message: 'Error al eliminar la reserva' },
      { status: 500 }
    )
  }
} 