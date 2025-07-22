# Psi App

## 🚀 Cómo levantar el proyecto

### Prerrequisitos
- Node.js (versión 18 o superior)
- Yarn (gestor de paquetes)

### Instalación y ejecución

1. **Clonar el repositorio**
   ```bash
   git clone <url-del-repositorio>
   cd psi-challenge
   ```

2. **Instalar dependencias**
   ```bash
   yarn install
   ```

3. **Ejecutar en modo desarrollo**
   ```bash
   yarn dev
   ```

4. **Abrir en el navegador**
   ```
   http://localhost:3000
   ```

### Scripts disponibles

- `yarn dev` - Ejecuta el servidor de desarrollo
- `yarn build` - Construye la aplicación para producción
- `yarn start` - Ejecuta la aplicación en modo producción
- `yarn test` - Ejecuta los tests
- `yarn lint` - Ejecuta el linter

## 🛠️ Tecnologías

### Frontend
- **React 18** + **TypeScript** - Framework principal
- **Next.js 14** - Framework de React
- **Tailwind CSS** - Framework de CSS
- **shadcn/ui** - Componentes de UI reutilizables

### Testing
- **Vitest** - Framework de testing
- **React Testing Library** - Testing de componentes
- **@testing-library/jest-dom** - Matchers adicionales

### Gestión de Estado y Datos
- **React Query (TanStack Query)** - Gestión de estado del servidor
- **React Hook Form** - Manejo de formularios
- **Zod** - Validación de esquemas

### Herramientas de Desarrollo
- **ESLint** - Linter de código
- **Prettier** - Formateador de código
- **TypeScript** - Tipado estático

## 📦 Gestión de Paquetes

- **Yarn** - Gestor de paquetes

## 🚀 Deploy

- **Vercel** - Plataforma de hosting y deployment

## 🎨 Diseño

- **Paleta de colores:** Gamas de violetas
- **Componentes:** shadcn/ui con personalización
- **Responsive:** Diseño adaptativo para móviles y desktop

## 📊 Testing

El proyecto incluye una suite completa de tests:
- **47 tests** distribuidos en **11 archivos**
- Cobertura de componentes principales
- Tests de integración y unitarios
- Mocks para APIs externas y navegación

## 📊 Detalle de lo que asumí
A la hora de la contruccion de la aplicación asumí/me informé que:
- La gama de colores violetas dan cierta calidez y sensación de inclusión.
- La aplicación (por el momento) solo se basa en la gestión de reservas, no intenté ir fuera del scope de la misma.
- La aplicación se crea con el objetivo de que sea escalable.
- Prioricé la entrega de funcionalidad real y la legibilidad del código por sobre la rapidez/velocidad.
- Prioricé el diseño desktop por sobre el mobile por cuestiones de tiempo, aunque llegado a esta instancia creo que la aplicación se desenvuelve correctamente en ambos frentes.
- El principal trade-off fue dejar los test para el final, es un aspecto a mejorar claramente.