import { format } from "date-fns"
import { es } from "date-fns/locale"

export const formatBookingDate = (dateString: string): string => {
  try {
    return format(new Date(dateString), 'EEEE, d \'de\' MMMM', { locale: es })
  } catch {
    return dateString
  }
} 