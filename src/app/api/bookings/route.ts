import { NextRequest, NextResponse } from 'next/server'
import { Booking } from '@/domain/entities/Booking'

const bookings: Booking[] = []

export async function GET() {
  try {
    await new Promise(resolve => setTimeout(resolve, 100))
    
    return NextResponse.json({
      success: true,
      data: bookings,
      message: 'Reservas obtenidas exitosamente'
    })
  } catch {
    return NextResponse.json(
      { success: false, message: 'Error al obtener las reservas' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { professionalId, professionalName, date, time, sessionType, patientName, patientEmail, patientPhone, notes } = body

    if (!professionalId || !date || !time) {
      return NextResponse.json(
        { success: false, message: 'Todos los campos son requeridos' },
        { status: 400 }
      )
    }

    const newBooking: Booking = {
      id: `${professionalId}-${date}-${time}`,
      professionalId,
      professionalName,
      date,
      time,
      sessionType,
      patientName,
      patientEmail,
      patientPhone,
      notes,
      createdAt: new Date().toISOString()
    }

    await new Promise(resolve => setTimeout(resolve, 500))
    
    bookings.push(newBooking)

    return NextResponse.json({
      success: true,
      data: newBooking,
      message: 'Reserva creada exitosamente'
    }, { status: 201 })
      } catch {
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

    const bookingIndex = bookings.findIndex((booking: Booking) => booking.id === bookingId)
    
    if (bookingIndex === -1) {
      return NextResponse.json(
        { success: false, message: 'Reserva no encontrada' },
        { status: 404 }
      )
    }

    await new Promise(resolve => setTimeout(resolve, 300))
    
    const deletedBooking = bookings.splice(bookingIndex, 1)[0]

    return NextResponse.json({
      success: true,
      data: deletedBooking,
      message: 'Reserva eliminada exitosamente'
    })
      } catch {
      return NextResponse.json(
        { success: false, message: 'Error al eliminar la reserva' },
        { status: 500 }
      )
    }
} 