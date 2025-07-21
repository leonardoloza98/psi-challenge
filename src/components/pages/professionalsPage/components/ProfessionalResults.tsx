interface ProfessionalResultsProps {
  filteredCount: number
  totalCount: number
}

export function ProfessionalResults({ filteredCount, totalCount }: ProfessionalResultsProps) {
  return (
    <div className="mb-6">
      <p className="text-violet-700 text-sm">
        Mostrando {filteredCount} de {totalCount} psicólogos
      </p>
    </div>
  )
} 