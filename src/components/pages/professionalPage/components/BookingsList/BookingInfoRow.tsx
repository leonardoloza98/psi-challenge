import { BookingInfoRowProps } from "./types"

export const BookingInfoRow = ({ icon, children }: BookingInfoRowProps) => (
  <div className="flex items-center gap-2 mb-1">
    <span className="text-violet-600">{icon}</span>
    <span className="text-sm text-violet-700">{children}</span>
  </div>
) 