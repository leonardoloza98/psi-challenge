import { format } from "date-fns"
import { es } from "date-fns/locale"

export const formatBookingDate = (dateString: string): string => {
  try {
    const [year, month, day] = dateString.split('-').map(Number)
    const date = new Date(year, month - 1, day)
    return format(date, 'EEEE, d \'de\' MMMM', { locale: es })
  } catch {
    return dateString
  }
} 