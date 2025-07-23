import { Video, Building2 } from "lucide-react"
import { Professional } from "@/constants/professionals"

interface SessionTypeSelectorProps {
  professional: Professional
  selectedSessionType: 'Online' | 'Presencial' | 'Todos'
  onSessionTypeChange: (sessionType: 'Online' | 'Presencial' | 'Todos') => void
}

export function SessionTypeSelector({ 
  professional, 
  selectedSessionType, 
  onSessionTypeChange 
}: SessionTypeSelectorProps) {
  if (professional.sessionTypes.length <= 1) {
    return null
  }

  return (
    <div className="flex gap-2">
      <button
        onClick={() => onSessionTypeChange('Todos')}
        className={`px-3 py-1 text-xs rounded-full transition-colors ${
          selectedSessionType === 'Todos'
            ? 'bg-violet-600 text-white'
            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
        }`}
      >
        Todos
      </button>
      {professional.sessionTypes.includes('Online') && (
        <button
          onClick={() => onSessionTypeChange('Online')}
          className={`px-3 py-1 text-xs rounded-full transition-colors flex items-center gap-1 ${
            selectedSessionType === 'Online'
              ? 'bg-green-600 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          <Video className="h-3 w-3" />
          Online
        </button>
      )}
      {professional.sessionTypes.includes('Presencial') && (
        <button
          onClick={() => onSessionTypeChange('Presencial')}
          className={`px-3 py-1 text-xs rounded-full transition-colors flex items-center gap-1 ${
            selectedSessionType === 'Presencial'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          <Building2 className="h-3 w-3" />
          Presencial
        </button>
      )}
    </div>
  )
} 