# Documento Funcional - Psi App

## 🚀 ¿Qué features tenemos disponibles?

- **Home inicial** con acceso directo al listado de profesionales
- **Listado completo de profesionales** con:
  - Búsqueda por nombre en tiempo real
  - Filtrado por categorías/temáticas
- **Página de detalle del profesional** con:
  - Información completa del profesional
  - Sistema de reserva de citas
  - Calendario y selector de horarios
- **Sistema de reservas completo**:
  - Crear reservas con formulario de paciente
  - Selección de tipo de sesión (Online/Presencial)
  - Gestión de disponibilidad
- **Diseño responsive** para desktop y mobile

---

## 🎯 Funcionalidades Implementadas

### 1. **Página de Inicio (Home)**
- **Acceso directo** al listado de profesionales
- **Navegación intuitiva** hacia la funcionalidad principal

### 2. **Listado de Profesionales**
- **Visualización en grid** con tarjetas informativas
- **Información mostrada**:
  - Foto del profesional
  - Nombre y especialidad
  - Categorías de tratamiento
  - Precio por sesión
- **Búsqueda por nombre**:
  - Filtrado en tiempo real
- **Filtrado por categorías**:
  - Dropdown con todas las categorías disponibles
- **Navegación al detalle**:
  - Clic en tarjeta para acceder al perfil completo

### 3. **Página de Detalle del Profesional**
- **Información completa**:
  - Header con botón de navegación "Volver"
  - Información personal y profesional
  - Especialidades y enfoques terapéuticos
  - Educación y certificaciones
  - Información de contacto
- **Sección "Acerca de"** con descripción detallada
- **Sección de educación** con formación académica
- **Sistema de reserva** integrado en la página

### 4. **Sistema de Reservas**
- **Formulario de reserva** con:
  - Información del paciente (nombre, email, teléfono)
  - Campo de notas adicionales
  - Validación de campos requeridos
- **Selector de tipo de sesión**:
  - Online (con ícono de monitor)
  - Presencial (con ícono de edificio)
  - Solo se muestra si el profesional ofrece ambas modalidades
- **Calendario de disponibilidad**:
  - Selección de fecha
  - Horarios disponibles por día
- **Confirmación de reserva**:
  - Botón "Confirmar Cita" con estado de carga
  - Validación de formulario completo
  - Notificaciones de éxito/error

### 5. **Gestión de Estado y Datos**
- **React Query** para gestión de estado del servidor
- **Context API** para estado global de reservas
- **React Hook Form** con validación Zod
- **Persistencia de datos** en localStorage

---

## 🔄 Flujos de Usuario Implementados

### **Flujo 1: Explorar y Buscar Profesionales**
1. Usuario accede a la página de inicio
2. Hace clic en "Ver profesionales" o navega directamente
3. Visualiza el listado completo de profesionales
4. Utiliza la barra de búsqueda para filtrar por nombre
5. Aplica filtros por categorías usando el dropdown
6. Selecciona un profesional haciendo clic en su tarjeta

### **Flujo 2: Ver Detalle y Reservar Cita**
1. Usuario accede a la página de detalle del profesional
2. Explora la información completa del profesional
3. Hace clic en "Reservar" para abrir el formulario
4. Completa la información del paciente:
   - Nombre completo
   - Email
   - Teléfono
   - Notas adicionales (opcional)
5. Selecciona el tipo de sesión (si hay opciones)
6. Elige fecha en el calendario
7. Selecciona horario disponible
8. Confirma la reserva
9. Recibe confirmación de la cita agendada

### **Flujo 3: Navegación y UX**
1. Usuario puede navegar entre páginas usando:
   - Botón "Volver" en headers
   - Navegación del navegador
2. Interfaz responsive que se adapta a:
   - Desktop (grid de 3 columnas)
   - Tablet (grid de 2 columnas)
   - Mobile (grid de 1 columna)
---

*Este documento refleja el estado actual de la aplicación Psi App, desarrollada con tecnologías modernas y siguiendo las mejores prácticas de desarrollo web.* 