import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export function ProfessionalHeader() {
  const router = useRouter()

  return (
    <div className="flex items-center mb-8">
      <Button
        variant="ghost"
        className="mr-4 text-violet-600 hover:text-violet-700 hover:bg-violet-100"
        onClick={() => router.back()}
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Volver a la lista
      </Button>
    </div>
  )
} 