import { Badge } from "@/components/ui/badge"
import { SESSION_TYPE_CONFIG } from "./constants"
import { SessionTypeBadgeProps } from "./types"

export const SessionTypeBadge = ({ sessionType }: SessionTypeBadgeProps) => {
  const config = SESSION_TYPE_CONFIG[sessionType]
  const Icon = config.icon

  return (
    <Badge variant="outline" className={`text-sm font-medium px-3 ${config.className}`}>
      <Icon className="h-4 w-4 mr-1.5" />
      {config.label}
    </Badge>
  )
} 