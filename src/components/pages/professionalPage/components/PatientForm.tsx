import { UseFormReturn } from "react-hook-form"
import { BookingFormData } from "@/schemas/bookingSchema"

interface PatientFormProps {
  form: UseFormReturn<BookingFormData>
}

export function PatientForm({ form }: PatientFormProps) {
  const { register, formState: { errors } } = form

  return (
    <div className="space-y-3">
      <h4 className="font-medium">Información del Paciente</h4>
      <div>
        <label className="text-sm font-medium text-gray-700 mb-1 block">Nombre completo *</label>
        <input
          type="text"
          {...register("patientName")}
          className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-violet-500 focus:border-transparent ${
            errors.patientName 
              ? "border-red-300 bg-red-50" 
              : "border-gray-300"
          }`}
          placeholder="Tu nombre completo"
        />
        {errors.patientName && (
          <p className="text-red-500 text-xs mt-1">
            {errors.patientName.message}
          </p>
        )}
      </div>
      <div>
        <label className="text-sm font-medium text-gray-700 mb-1 block">Email *</label>
        <input
          type="email"
          {...register("patientEmail")}
          className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-violet-500 focus:border-transparent ${
            errors.patientEmail 
              ? "border-red-300 bg-red-50" 
              : "border-gray-300"
          }`}
          placeholder="tu@email.com"
        />
        {errors.patientEmail && (
          <p className="text-red-500 text-xs mt-1">
            {errors.patientEmail.message}
          </p>
        )}
      </div>
      <div>
        <label className="text-sm font-medium text-gray-700 mb-1 block">Teléfono *</label>
        <input
          type="tel"
          {...register("patientPhone")}
          className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-violet-500 focus:border-transparent ${
            errors.patientPhone 
              ? "border-red-300 bg-red-50" 
              : "border-gray-300"
          }`}
          placeholder="+52 55 1234 5678"
        />
        {errors.patientPhone && (
          <p className="text-red-500 text-xs mt-1">
            {errors.patientPhone.message}
          </p>
        )}
      </div>
      <div>
        <label className="text-sm font-medium text-gray-700 mb-1 block">Notas adicionales</label>
        <textarea
          {...register("notes")}
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-violet-500 focus:border-transparent"
          placeholder="Información adicional que quieras compartir"
          rows={3}
        />
      </div>
    </div>
  )
} 