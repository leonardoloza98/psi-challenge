interface PatientFormProps {
  patientName: string
  setPatientName: (name: string) => void
  patientEmail: string
  setPatientEmail: (email: string) => void
  patientPhone: string
  setPatientPhone: (phone: string) => void
  notes: string
  setNotes: (notes: string) => void
}

export function PatientForm({
  patientName,
  setPatientName,
  patientEmail,
  setPatientEmail,
  patientPhone,
  setPatientPhone,
  notes,
  setNotes,
}: PatientFormProps) {
  return (
    <div className="space-y-3">
      <h4 className="font-medium">Información del Paciente</h4>
      <div>
        <label className="text-sm font-medium text-gray-700 mb-1 block">Nombre completo *</label>
        <input
          type="text"
          value={patientName}
          onChange={(e) => setPatientName(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-violet-500 focus:border-transparent"
          placeholder="Tu nombre completo"
        />
      </div>
      <div>
        <label className="text-sm font-medium text-gray-700 mb-1 block">Email *</label>
        <input
          type="email"
          value={patientEmail}
          onChange={(e) => setPatientEmail(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-violet-500 focus:border-transparent"
          placeholder="tu@email.com"
        />
      </div>
      <div>
        <label className="text-sm font-medium text-gray-700 mb-1 block">Teléfono *</label>
        <input
          type="tel"
          value={patientPhone}
          onChange={(e) => setPatientPhone(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-violet-500 focus:border-transparent"
          placeholder="+52 55 1234 5678"
        />
      </div>
      <div>
        <label className="text-sm font-medium text-gray-700 mb-1 block">Notas adicionales</label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-violet-500 focus:border-transparent"
          placeholder="Información adicional que quieras compartir"
          rows={3}
        />
      </div>
    </div>
  )
} 