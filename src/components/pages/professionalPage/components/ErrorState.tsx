interface ErrorStateProps {
  error?: string | null
  message?: string
}

export function ErrorState({ error, message = "Error al cargar el profesional" }: ErrorStateProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-50">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <div className="text-red-600 mb-4">{message}</div>
          <div className="text-gray-600">{error || 'Profesional no encontrado'}</div>
        </div>
      </div>
    </div>
  )
} 