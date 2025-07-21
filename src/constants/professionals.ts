// Tipos expandidos
export interface WeeklySchedule {
  monday: TimeSlot[]
  tuesday: TimeSlot[]
  wednesday: TimeSlot[]
  thursday: TimeSlot[]
  friday: TimeSlot[]
  saturday: TimeSlot[]
  sunday: TimeSlot[]
}

export interface TimeSlot {
  startTime: string
  endTime: string
  isAvailable: boolean
  sessionType: 'Online'
}

export interface Pricing {
  price: number
}

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
      pricing: Pricing
    weeklySchedule: WeeklySchedule
    availableSlots: AvailableSlots
    status: 'active' | 'inactive' | 'on_vacation'
    consultationAreas: string[]
    therapeuticApproaches: string[]
    insuranceAccepted: string[]
    emergencyContact?: string
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

// Función helper para generar slots disponibles desde HOY hasta una semana después
const generateWeeklySlots = (): AvailableSlots => {
  const slots: AvailableSlots = {}
  
  // Obtener la fecha actual
  const today = new Date()
  
  const dayNames: (keyof WeeklySchedule)[] = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
  
  // Generar slots para 7 días desde hoy
  for (let i = 0; i < 7; i++) {
    const currentDate = new Date(today)
    currentDate.setDate(today.getDate() + i)
    const dayOfWeek = dayNames[currentDate.getDay()]
    
    const dateString = currentDate.toISOString().split('T')[0]
    
    // Obtener el horario del día de la semana
    const daySchedule = createWeeklySchedule()[dayOfWeek]
    
    if (daySchedule && daySchedule.length > 0) {
      const availableTimes = daySchedule
        .filter(slot => slot.isAvailable)
        .map(slot => slot.startTime)
      
      if (availableTimes.length > 0) {
        slots[dateString] = availableTimes
      }
    }
  }
  
  return slots
}

// Horarios semanales de ejemplo
const createWeeklySchedule = (): WeeklySchedule => ({
  monday: [
    { startTime: "09:00", endTime: "10:00", isAvailable: true, sessionType: "Online" },
    { startTime: "10:00", endTime: "11:00", isAvailable: true, sessionType: "Online" },
    { startTime: "11:00", endTime: "12:00", isAvailable: true, sessionType: "Online" },
    { startTime: "14:00", endTime: "15:00", isAvailable: true, sessionType: "Online" },
    { startTime: "15:00", endTime: "16:00", isAvailable: true, sessionType: "Online" },
    { startTime: "16:00", endTime: "17:00", isAvailable: true, sessionType: "Online" },
  ],
  tuesday: [
    { startTime: "09:00", endTime: "10:00", isAvailable: true, sessionType: "Online" },
    { startTime: "10:00", endTime: "11:00", isAvailable: true, sessionType: "Online" },
    { startTime: "14:00", endTime: "15:00", isAvailable: true, sessionType: "Online" },
    { startTime: "15:00", endTime: "16:00", isAvailable: true, sessionType: "Online" },
  ],
  wednesday: [
    { startTime: "10:00", endTime: "11:00", isAvailable: true, sessionType: "Online" },
    { startTime: "11:00", endTime: "12:00", isAvailable: true, sessionType: "Online" },
    { startTime: "14:00", endTime: "15:00", isAvailable: true, sessionType: "Online" },
    { startTime: "15:00", endTime: "16:00", isAvailable: true, sessionType: "Online" },
    { startTime: "16:00", endTime: "17:00", isAvailable: true, sessionType: "Online" },
    { startTime: "17:00", endTime: "18:00", isAvailable: true, sessionType: "Online" },
  ],
  thursday: [
    { startTime: "09:00", endTime: "10:00", isAvailable: true, sessionType: "Online" },
    { startTime: "11:00", endTime: "12:00", isAvailable: true, sessionType: "Online" },
    { startTime: "14:00", endTime: "15:00", isAvailable: true, sessionType: "Online" },
    { startTime: "16:00", endTime: "17:00", isAvailable: true, sessionType: "Online" },
  ],
  friday: [
    { startTime: "09:00", endTime: "10:00", isAvailable: true, sessionType: "Online" },
    { startTime: "10:00", endTime: "11:00", isAvailable: true, sessionType: "Online" },
    { startTime: "11:00", endTime: "12:00", isAvailable: true, sessionType: "Online" },
    { startTime: "15:00", endTime: "16:00", isAvailable: true, sessionType: "Online" },
    { startTime: "16:00", endTime: "17:00", isAvailable: true, sessionType: "Online" },
  ],
  saturday: [
    { startTime: "09:00", endTime: "10:00", isAvailable: true, sessionType: "Online" },
    { startTime: "10:00", endTime: "11:00", isAvailable: true, sessionType: "Online" },
    { startTime: "11:00", endTime: "12:00", isAvailable: true, sessionType: "Online" },
  ],
  sunday: [], // No hay horarios disponibles los domingos
})

// Datos completos de profesionales
export const professionals: Professional[] = [
  {
    id: 1,
    name: "Dra. María González",
    specialty: "Psicología Clínica",
    categories: ["Ansiedad", "Depresión", "Terapia de Pareja", "Trauma", "Autoestima"],
    rating: 4.9,
    reviews: 127,
    location: "Ciudad de Córdoba",
    phone: "+52 55 1234 5678",
    email: "maria.gonzalez@email.com",
    experience: "8 años",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
    about: "Soy una psicóloga clínica especializada en terapia cognitivo-conductual con más de 8 años de experiencia ayudando a personas a superar desafíos emocionales y mentales. Mi enfoque se centra en crear un espacio seguro y de confianza donde mis pacientes puedan explorar sus pensamientos y emociones.",
    education: [
      "Doctorado en Psicología Clínica - Universidad Nacional Autónoma de Córdoba",
      "Maestría en Terapia Cognitivo-Conductual - Instituto Mexicano de Psicoterapia",
      "Licenciatura en Psicología - Universidad Iberoamericana",
    ],
    certifications: [
      "Certificación en Terapia de Pareja - Instituto Gottman",
      "Especialización en Trastornos de Ansiedad - AMTAC",
      "Certificación en EMDR para Trauma - EMDR Institute",
    ],
    languages: ["Español", "Inglés"],
    pricing: {
      price: 8000,
    },
    weeklySchedule: createWeeklySchedule(),
    availableSlots: generateWeeklySlots(),
    status: "active",
    consultationAreas: [
      "Trastornos de Ansiedad",
      "Depresión",
      "Problemas de Pareja",
      "Trauma y Estrés Postraumático",
      "Baja Autoestima",
      "Duelo y Pérdida",
    ],
    therapeuticApproaches: [
      "Terapia Cognitivo-Conductual (TCC)",
      "EMDR",
      "Terapia de Pareja",
      "Mindfulness",
      "Terapia de Aceptación y Compromiso (ACT)",
    ],
    insuranceAccepted: ["Seguros Monterrey", "GNP", "AXA"],
  },
  {
    id: 2,
    name: "Dr. Carlos Mendoza",
    specialty: "Psicología Infantil",
    categories: ["Terapia Infantil", "TDAH", "Autismo", "Problemas de Conducta"],
    rating: 4.8,
    reviews: 89,
    location: "Ciudad de Córdoba",
    phone: "+52 33 2345 6789",
    email: "carlos.mendoza@email.com",
    experience: "12 años",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
    about: "Especialista en psicología infantil con más de 12 años de experiencia trabajando con niños y adolescentes. Mi enfoque combina técnicas lúdicas con terapias basadas en evidencia para ayudar a los más pequeños a superar sus desafíos emocionales y de desarrollo.",
    education: [
      "Doctorado en Psicología Infantil - Universidad de Córdoba",
      "Maestría en Psicología del Desarrollo - Universidad Autónoma de Córdoba",
      "Licenciatura en Psicología - Universidad de Córdoba",
    ],
    certifications: [
      "Certificación en Evaluación e Intervención en TDAH",
      "Especialización en Trastornos del Espectro Autista",
      "Certificación en Terapia de Juego",
    ],
    languages: ["Español"],
    pricing: {
      price: 900,
    },
    weeklySchedule: createWeeklySchedule(),
    availableSlots: generateWeeklySlots(),
    status: "active",
    consultationAreas: [
      "Trastorno por Déficit de Atención e Hiperactividad (TDAH)",
      "Trastornos del Espectro Autista",
      "Problemas de Conducta",
      "Ansiedad Infantil",
      "Depresión en Niños y Adolescentes",
      "Problemas de Aprendizaje",
    ],
    therapeuticApproaches: [
      "Terapia de Juego",
      "Terapia Cognitivo-Conductual Infantil",
      "Análisis Conductual Aplicado (ABA)",
      "Terapia Familiar",
      "Intervención Temprana",
    ],
    insuranceAccepted: ["Seguros Monterrey", "GNP"],
  },
  {
    id: 3,
    name: "Dra. Ana Rodríguez",
    specialty: "Psicología Organizacional",
    categories: ["Estrés Laboral", "Coaching", "Desarrollo Personal", "Liderazgo"],
    rating: 4.7,
    reviews: 156,
    location: "Ciudad de Córdoba",
    phone: "+52 81 3456 7890",
    email: "ana.rodriguez@email.com",
    experience: "10 años",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
    about: "Psicóloga organizacional especializada en desarrollo de talento y bienestar laboral. Ayudo a profesionales y empresas a crear entornos de trabajo saludables y productivos, promoviendo el equilibrio entre vida personal y laboral.",
    education: [
      "Maestría en Psicología Organizacional - ITESM",
      "Certificación en Coaching Ejecutivo - ICF",
      "Licenciatura en Psicología - Universidad Autónoma de Nuevo León",
    ],
    certifications: [
      "Certificación en Coaching Ejecutivo - ICF",
      "Especialización en Gestión del Estrés Laboral",
      "Certificación en Desarrollo de Liderazgo",
    ],
    languages: ["Español", "Inglés"],
    pricing: {
      price: 1200,
    },
    weeklySchedule: createWeeklySchedule(),
    availableSlots: generateWeeklySlots(),
    status: "active",
    consultationAreas: [
      "Estrés y Burnout Laboral",
      "Desarrollo de Liderazgo",
      "Gestión de Conflictos",
      "Coaching Ejecutivo",
      "Desarrollo de Carrera",
      "Equilibrio Vida-Trabajo",
    ],
    therapeuticApproaches: [
      "Coaching Ejecutivo",
      "Terapia Cognitivo-Conductual",
      "Mindfulness en el Trabajo",
      "Desarrollo de Habilidades Blandas",
      "Gestión del Cambio",
    ],
    insuranceAccepted: ["AXA", "GNP", "Seguros Monterrey"],
  },
]

export const psychologists: Psychologist[] = professionals.map(p => ({
  id: p.id,
  name: p.name,
  specialty: p.specialty,
  categories: p.categories,
  rating: p.rating,
  reviews: p.reviews,
  location: p.location,
  phone: p.phone,
  email: p.email,
  experience: p.experience,
  image: p.image,
}))

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
  "Trauma",
  "Problemas de Conducta",
  "Liderazgo",
]

 