"use client"

import { ArrowRight, Search, Calendar, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useRouter } from "next/navigation"

const features = [
  {
    icon: Search,
    title: "Encuentra Profesionales",
    description: "Busca y filtra psicólogos por especialidad y categoría.",
  },
  {
    icon: Users,
    title: "Perfiles Detallados",
    description: "Ve información completa.",
  },
  {
    icon: Calendar,
    title: "Agenda Fácilmente",
    description: "Reserva sesiones con calendario.",
  },
]

export default function Component() {
  const router = useRouter()
  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-50">
      <section className="py-20 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <h1 className="text-5xl md:text-6xl font-bold text-violet-900 mb-6">
            Conecta con el
            <span className="bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
              Psicólogo Ideal
            </span>
          </h1>
          <p className="text-xl text-violet-700 mb-8 max-w-2xl mx-auto">
            Encuentra profesionales de la salud mental, explora sus perfiles y agenda sesiones de forma sencilla.
          </p>

          <Button
            size="lg"
            className="bg-violet-600 hover:bg-violet-700 text-white px-8 py-4 text-lg"
            onClick={() => router.push("/professionals")}
          >
            Explorar Profesionales
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="text-center bg-white/80 backdrop-blur-sm border-violet-100 hover:shadow-lg transition-all"
              >
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-violet-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-violet-900 mb-3">{feature.title}</h3>
                  <p className="text-violet-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      <section className="py-16 px-4 bg-white/50">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-violet-900 mb-4">Proceso Simple</h2>
            <p className="text-lg text-violet-700">En solo 3 pasos encuentra y agenda con tu psicólogo ideal</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-violet-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                1
              </div>
              <h3 className="font-semibold text-violet-900 mb-2">Busca</h3>
              <p className="text-violet-600 text-sm">Filtra por especialidad y encuentra el profesional adecuado</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-violet-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                2
              </div>
              <h3 className="font-semibold text-violet-900 mb-2">Explora</h3>
              <p className="text-violet-600 text-sm">Revisa perfiles detallados</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-violet-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                3
              </div>
              <h3 className="font-semibold text-violet-900 mb-2">Agenda</h3>
              <p className="text-violet-600 text-sm">Reserva tu sesión con el calendario disponible</p>
            </div>
          </div>
        </div>
      </section>
      <section className="py-20 px-4">
        <div className="container mx-auto text-center max-w-2xl">
          <h2 className="text-3xl font-bold text-violet-900 mb-4">¿Listo para comenzar?</h2>
          <p className="text-lg text-violet-700 mb-8">
            Explora nuestra plataforma y encuentra el apoyo profesional que necesitas.
          </p>
          <Button
            size="lg"
            className="bg-violet-600 hover:bg-violet-700 text-white px-8 py-4 text-lg"
            onClick={() => router.push("/professionals")}
          >
            Ver Todos los Psicólogos
          </Button>
        </div>
      </section>
      <footer className="bg-violet-900 text-white py-8 px-4">
        <div className="container mx-auto text-center">
          <h3 className="text-xl font-bold mb-2">PsyChallenge</h3>
          <p className="text-violet-300 text-sm">Conectando personas con profesionales de la salud mental</p>
        </div>
      </footer>
    </div>
  )
}
