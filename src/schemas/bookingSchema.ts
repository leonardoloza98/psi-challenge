import { z } from 'zod'

export const bookingFormSchema = z.object({
  selectedDate: z.string().min(1, 'Debes seleccionar una fecha'),
  selectedTime: z.string().min(1, 'Debes seleccionar una hora'),
  sessionType: z.enum(['Online', 'Presencial']),
  patientName: z.string()
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(50, 'El nombre no puede tener más de 50 caracteres')
    .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, 'El nombre solo puede contener letras y espacios'),
  patientEmail: z.string()
    .min(1, 'El email es requerido')
    .email('Ingresa un email válido'),
  patientPhone: z.string()
    .min(1, 'El teléfono es requerido')
    .regex(/^(\+52\s?)?[0-9]{10}$/, 'Ingresa un número de teléfono válido (10 dígitos)'),
  notes: z.string().optional(),
})

export type BookingFormData = z.infer<typeof bookingFormSchema> 