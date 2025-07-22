import { Monitor, Building2 } from "lucide-react"

export const SESSION_TYPE_CONFIG = {
  Online: {
    icon: Monitor,
    className: 'border-green-400 text-green-800 bg-green-100 shadow-sm',
    label: 'Online'
  },
  Presencial: {
    icon: Building2,
    className: 'border-blue-400 text-blue-800 bg-blue-100 shadow-sm',
    label: 'Presencial'
  }
} as const 