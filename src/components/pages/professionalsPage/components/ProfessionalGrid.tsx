import { Professional } from "@/services/api"
import { ProfessionalCard } from "./ProfessionalCard"

interface ProfessionalGridProps {
  psychologists: Professional[]
}

export function ProfessionalGrid({ psychologists }: ProfessionalGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {psychologists.map((psychologist) => (
        <ProfessionalCard key={psychologist.id} psychologist={psychologist} />
      ))}
    </div>
  )
} 