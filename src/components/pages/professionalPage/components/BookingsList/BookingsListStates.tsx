import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar } from "lucide-react"

const BookingsListHeader = () => (
  <CardHeader>
    <CardTitle className="text-violet-900 flex items-center">
      <Calendar className="h-5 w-5 mr-2" />
      Mis Reservas
    </CardTitle>
  </CardHeader>
)

export const LoadingState = () => (
  <Card className="bg-white/80 backdrop-blur-sm border-violet-100">
    <BookingsListHeader />
    <CardContent>
      <p className="text-gray-500 text-center py-4">
        Cargando reservas...
      </p>
    </CardContent>
  </Card>
)

export const EmptyState = () => (
  <Card className="bg-white/80 backdrop-blur-sm border-violet-100">
    <BookingsListHeader />
    <CardContent>
      <p className="text-gray-500 text-center py-4">
        No tienes reservas con este profesional
      </p>
    </CardContent>
  </Card>
)

export { BookingsListHeader } 