import { LucideIcon } from "lucide-react"

interface EmptyStateProps {
  icon?: LucideIcon
  title: string
  description: string
  className?: string
}

export function EmptyState({ 
  icon: Icon, 
  title, 
  description, 
  className = "" 
}: EmptyStateProps) {
  return (
    <div className={`text-center py-12 ${className}`}>
      {Icon && (
        <div className="text-violet-300 mb-4">
          <Icon className="h-16 w-16 mx-auto" />
        </div>
      )}
      <h3 className="text-xl font-semibold text-violet-900 mb-2">{title}</h3>
      <p className="text-violet-600">{description}</p>
    </div>
  )
} 