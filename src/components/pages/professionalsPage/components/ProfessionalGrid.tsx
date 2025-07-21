import { Professional } from "@/constants"
import { ProfessionalCard } from "./ProfessionalCard"

interface ProfessionalGridProps {
  professionals: Professional[]
}

export function ProfessionalGrid({ professionals }: ProfessionalGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {professionals.map((professional) => (
        <ProfessionalCard key={professional.id} professional={professional} />
      ))}
    </div>
  )
} 