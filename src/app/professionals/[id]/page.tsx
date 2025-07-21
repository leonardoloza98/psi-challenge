import { notFound } from "next/navigation"
import ProfessionalPage from "@/components/pages/professionalPage/ProfessionalPage"

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function Page({ params }: PageProps) {
  const { id } = await params
  const professionalId = parseInt(id)

  if (isNaN(professionalId)) {
    notFound()
  }

  return <ProfessionalPage professionalId={professionalId} />
}
