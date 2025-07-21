// Tipos
export interface Professional {
  id: number
  name: string
  specialty: string
  categories: string[]
  rating: number
  reviews: number
  location: string
  phone: string
  email: string
  experience: string
  image: string
  about: string
  education: string[]
  certifications: string[]
  languages: string[]
  sessionTypes: string[]
  price: string
  sessionDuration: string
}

export interface AvailableSlots {
  [key: string]: string[]
}

export interface Psychologist {
  id: number
  name: string
  specialty: string
  categories: string[]
  rating: number
  reviews: number
  location: string
  phone: string
  email: string
  experience: string
  image: string
}

// Datos de ejemplo del profesional
export const professional: Professional = {
  id: 1,
  name: "Dra. María González",
  specialty: "Psicología Clínica",
  categories: ["Ansiedad", "Depresión", "Terapia de Pareja", "Trauma", "Autoestima"],
  rating: 4.9,
  reviews: 127,
  location: "Ciudad de México",
  phone: "+52 55 1234 5678",
  email: "maria.gonzalez@email.com",
  experience: "8 años",
  image: "/placeholder.svg?height=300&width=300",
  about:
    "Soy una psicóloga clínica especializada en terapia cognitivo-conductual con más de 8 años de experiencia ayudando a personas a superar desafíos emocionales y mentales. Mi enfoque se centra en crear un espacio seguro y de confianza donde mis pacientes puedan explorar sus pensamientos y emociones.",
  education: [
    "Doctorado en Psicología Clínica - Universidad Nacional Autónoma de México",
    "Maestría en Terapia Cognitivo-Conductual - Instituto Mexicano de Psicoterapia",
    "Licenciatura en Psicología - Universidad Iberoamericana",
  ],
  certifications: [
    "Certificación en Terapia de Pareja - Instituto Gottman",
    "Especialización en Trastornos de Ansiedad - AMTAC",
    "Certificación en EMDR para Trauma - EMDR Institute",
  ],
  languages: ["Español", "Inglés"],
  sessionTypes: ["Presencial", "Online"],
  price: "$800 MXN",
  sessionDuration: "50 minutos",
}

// Horarios disponibles de ejemplo
export const availableSlots: AvailableSlots = {
  "2024-01-15": ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"],
  "2024-01-16": ["09:00", "10:00", "14:00", "15:00"],
  "2024-01-17": ["10:00", "11:00", "14:00", "15:00", "16:00", "17:00"],
  "2024-01-18": ["09:00", "11:00", "14:00", "16:00"],
  "2024-01-19": ["09:00", "10:00", "11:00", "15:00", "16:00"],
  "2024-01-22": ["09:00", "10:00", "14:00", "15:00", "16:00"],
  "2024-01-23": ["10:00", "11:00", "14:00", "15:00", "17:00"],
  "2024-01-24": ["09:00", "10:00", "11:00", "14:00", "16:00"],
  "2024-01-25": ["09:00", "14:00", "15:00", "16:00", "17:00"],
  "2024-01-26": ["10:00", "11:00", "14:00", "15:00", "16:00"],
}

// Datos de ejemplo de psicólogos
export const psychologists: Psychologist[] = [
  {
    id: 1,
    name: "Dra. María González",
    specialty: "Psicología Clínica",
    categories: ["Ansiedad", "Depresión", "Terapia de Pareja"],
    rating: 4.9,
    reviews: 127,
    location: "Ciudad de México",
    phone: "+52 55 1234 5678",
    email: "maria.gonzalez@email.com",
    experience: "8 años",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 2,
    name: "Dr. Carlos Mendoza",
    specialty: "Psicología Infantil",
    categories: ["Terapia Infantil", "TDAH", "Autismo"],
    rating: 4.8,
    reviews: 89,
    location: "Guadalajara",
    phone: "+52 33 2345 6789",
    email: "carlos.mendoza@email.com",
    experience: "12 años",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 3,
    name: "Dra. Ana Rodríguez",
    specialty: "Psicología Organizacional",
    categories: ["Estrés Laboral", "Coaching", "Desarrollo Personal"],
    rating: 4.7,
    reviews: 156,
    location: "Monterrey",
    phone: "+52 81 3456 7890",
    email: "ana.rodriguez@email.com",
    experience: "10 años",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 4,
    name: "Dr. Luis Herrera",
    specialty: "Neuropsicología",
    categories: ["Rehabilitación Cognitiva", "Demencia", "Traumatismo Craneal"],
    rating: 4.9,
    reviews: 203,
    location: "Puebla",
    phone: "+52 22 4567 8901",
    email: "luis.herrera@email.com",
    experience: "15 años",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 5,
    name: "Dra. Sofia Martínez",
    specialty: "Psicología Clínica",
    categories: ["Trastornos Alimentarios", "Ansiedad", "Autoestima"],
    rating: 4.8,
    reviews: 94,
    location: "Tijuana",
    phone: "+52 66 5678 9012",
    email: "sofia.martinez@email.com",
    experience: "6 años",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 6,
    name: "Dr. Roberto Silva",
    specialty: "Psicología de Adicciones",
    categories: ["Adicciones", "Rehabilitación", "Terapia Grupal"],
    rating: 4.6,
    reviews: 78,
    location: "Mérida",
    phone: "+52 99 6789 0123",
    email: "roberto.silva@email.com",
    experience: "9 años",
    image: "/placeholder.svg?height=200&width=200",
  },
]

export const categories = [
  "Todas las categorías",
  "Ansiedad",
  "Depresión",
  "Terapia de Pareja",
  "Terapia Infantil",
  "TDAH",
  "Autismo",
  "Estrés Laboral",
  "Coaching",
  "Desarrollo Personal",
  "Rehabilitación Cognitiva",
  "Demencia",
  "Traumatismo Craneal",
  "Trastornos Alimentarios",
  "Autoestima",
  "Adicciones",
  "Rehabilitación",
  "Terapia Grupal",
] 