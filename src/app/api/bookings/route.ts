import { NextRequest, NextResponse } from 'next/server'
import { Booking } from '@/hooks/useBookings'

// Simular base de datos en memoria (en producción sería una base de datos real)
let bookings: Booking[] = []

// GET - Obtener todas las reservas
export async function GET() {
  try {
    // Simular delay de red
    await new Promise(resolve => setTimeout(resolve, 100))
    
    return NextResponse.json({
      success: true,
      data: bookings,
      message: 'Reservas obtenidas exitosamente'
    })
  } catch (error) {
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
    const { professionalId, professionalName, date, time } = body

    // Validaciones
    if (!professionalId || !professionalName || !date || !time) {
      return NextResponse.json(
        { success: false, message: 'Todos los campos son requeridos' },
        { status: 400 }
      )
    }

    // Verificar si el horario ya está reservado
    const existingBooking = bookings.find(
      booking => 
        booking.professionalId === professionalId && 
        booking.date === date && 
        booking.time === time
    )

    if (existingBooking) {
      return NextResponse.json(
        { success: false, message: 'Este horario ya está reservado' },
        { status: 409 }
      )
    }

    // Verificar si el horario ya pasó
    const now = new Date()
    const bookingDateTime = new Date(`${date}T${time}:00`)
    if (bookingDateTime <= now) {
      return NextResponse.json(
        { success: false, message: 'No se puede reservar un horario que ya pasó' },
        { status: 400 }
      )
    }

    // Crear nueva reserva
    const newBooking: Booking = {
      id: `${professionalId}-${date}-${time}`,
      professionalId,
      professionalName,
      date,
      time,
      createdAt: new Date().toISOString()
    }

    // Simular delay de red
    await new Promise(resolve => setTimeout(resolve, 500))
    
    bookings.push(newBooking)

    return NextResponse.json({
      success: true,
      data: newBooking,
      message: 'Reserva creada exitosamente'
    }, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Error al crear la reserva' },
      { status: 500 }
    )
  }
}

// DELETE - Eliminar reserva
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

    // Buscar la reserva
    const bookingIndex = bookings.findIndex(booking => booking.id === bookingId)
    
    if (bookingIndex === -1) {
      return NextResponse.json(
        { success: false, message: 'Reserva no encontrada' },
        { status: 404 }
      )
    }

    // Simular delay de red
    await new Promise(resolve => setTimeout(resolve, 300))
    
    // Eliminar la reserva
    const deletedBooking = bookings.splice(bookingIndex, 1)[0]

    return NextResponse.json({
      success: true,
      data: deletedBooking,
      message: 'Reserva eliminada exitosamente'
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Error al eliminar la reserva' },
      { status: 500 }
    )
  }
} 