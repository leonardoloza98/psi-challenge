import { ProfessionalsResponse, ProfessionalResponse } from '@/models/models'

export async function getProfessionals(params: {
  search?: string
  category?: string
  page?: number
  limit?: number
} = {}): Promise<ProfessionalsResponse> {
  // Aquí puedes adaptar la lógica para llamar a tu backend real o simulado
  // Por ahora, llamamos a la API local de Next.js
  const url = new URL('/api/professionals', window.location.origin)
  if (params.search) url.searchParams.append('search', params.search)
  if (params.category) url.searchParams.append('category', params.category)
  if (params.page) url.searchParams.append('page', params.page.toString())
  if (params.limit) url.searchParams.append('limit', params.limit.toString())

  const res = await fetch(url.toString())
  if (!res.ok) throw new Error('Error al obtener profesionales')
  return res.json()
}

export async function getProfessionalById(id: number): Promise<ProfessionalResponse> {
  const res = await fetch(`/api/professionals/${id}`)
  if (!res.ok) throw new Error('Error al obtener el profesional')
  return res.json()
} 