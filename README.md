# AssitClass - Frontend de Reportes

Dashboard web para generar y descargar reportes de asistencia universitaria.

## Stack Tecnológico

- **React 18** + **TypeScript** + **Vite**
- **TailwindCSS** - Estilos
- **React Router v6** - Navegación
- **Zustand** - State management
- **React Query** - Cache y data fetching
- **Axios** - Cliente HTTP
- **Recharts** - Gráficos
- **React Hot Toast** - Notificaciones
- **Lucide React** - Iconos
- **date-fns** - Manejo de fechas

## Requisitos Previos

- Node.js 20+
- npm o yarn
- Backend API corriendo en `http://localhost:3002`

## Instalación

```bash
# Clonar el repositorio
cd assitclass-frontend

# Instalar dependencias
npm install

# Copiar archivo de environment
cp .env.example .env

# Iniciar servidor de desarrollo
npm run dev
```

## Variables de Entorno

```env
VITE_API_URL=http://localhost:3002
```

## Scripts Disponibles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Construye la aplicación para producción
- `npm run preview` - Preview de la build de producción
- `npm run lint` - Ejecuta el linter

## Estructura del Proyecto

```
src/
├── components/
│   ├── layout/          # Layout, Navbar, PrivateRoute
│   ├── reports/         # ReportForm, ReportTable
│   ├── analytics/       # DashboardStats, Charts
│   └── ui/              # Button, Card, Badge, Table, Input
├── pages/
│   ├── Login.tsx
│   ├── Dashboard.tsx
│   ├── ReportsList.tsx
│   ├── CreateReport.tsx
│   └── CourseStats.tsx
├── services/
│   └── api.ts           # Axios instance + API calls
├── hooks/
│   ├── useReports.ts    # React Query hooks
│   └── useAnalytics.ts
├── store/
│   └── authStore.ts     # Zustand auth store
├── types/
│   └── index.ts         # TypeScript interfaces
├── App.tsx              # Router configuration
└── main.tsx             # Entry point
```

## Funcionalidades

### 1. Autenticación (Mock)
- Login simulado con JWT
- Roles: admin, profesor, estudiante
- Token almacenado en localStorage

### 2. Dashboard Analytics
- Cards con estadísticas globales
- Gráfico de distribución (pie chart)
- Auto-refresh cada 30s

### 3. Generar Reportes
- Formulario con validación
- Tipos: Resumen, Detalle, Estadísticas, Comparativo
- Formatos: PDF, CSV, EXCEL
- Filtros opcionales

### 4. Lista de Reportes
- Tabla paginada con estados
- Filtros por tipo y estado
- Descarga directa (solo COMPLETED)
- Auto-refresh para reportes en proceso

### 5. Estadísticas por Curso
- Métricas del curso
- Gráfico de tendencia temporal
- Lista de estudiantes con % asistencia

## Características Técnicas

- ✅ Responsive design (mobile-first)
- ✅ Dark mode toggle
- ✅ Manejo de errores con toast
- ✅ Loading states
- ✅ Protección de rutas
- ✅ Descarga de archivos via blob
- ✅ Polling para reportes en proceso
- ✅ TypeScript strict mode

## API Endpoints Utilizados

```
POST   /api/reports/generate       # Generar reporte
GET    /api/reports                # Listar reportes
GET    /api/reports/:id            # Detalle de reporte
GET    /api/reports/:id/download   # Descargar archivo
GET    /api/analytics/dashboard    # Stats globales
GET    /api/analytics/course/:id   # Stats por curso
GET    /api/health                 # Health check
```

## Navegación

- `/login` - Página de login
- `/dashboard` - Dashboard principal
- `/reportes` - Lista de reportes
- `/reportes/nuevo` - Crear nuevo reporte
- `/cursos/:id/stats` - Estadísticas por curso

## Login de Desarrollo

Para testing, usar:
- Email: `admin@assitclass.com`
- Rol: `admin`, `profesor` o `estudiante`

El sistema genera un JWT mock automáticamente.

## Build para Producción

```bash
npm run build
```

Los archivos se generarán en la carpeta `dist/`.

## Notas

- Asegúrate de que el backend esté corriendo en `http://localhost:3002`
- El dark mode se guarda en localStorage
- Los reportes en estado PENDING/PROCESSING se actualizan automáticamente cada 5s
- El dashboard se actualiza cada 30s

---

**Desarrollado con React + TypeScript + Vite**
