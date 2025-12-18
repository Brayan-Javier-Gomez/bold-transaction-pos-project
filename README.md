# Bold Transactions Dashboard

Sistema de gestión de transacciones financieras con arquitectura orientada a dominio. Prioriza seguridad, validación estricta de datos y renderizado del lado del servidor para protección de información sensible.

---

## Stack Tecnológico

- **Framework**: Next.js 16 (App Router)
- **Runtime**: React 19
- **Lenguaje**: TypeScript (modo estricto)
- **Validación**: Zod 4
- **Estilos**: SCSS Modules
- **Testing**: Vitest + Testing Library
- **Deployment**: Vercel

---

## Requisitos

- **Node.js**: >= 18.x
- **Package Manager**: npm, yarn, pnpm o bun

---

## Instalación y Setup

### 1. Instalar dependencias

```bash
npm install
```

### 2. Configurar variables de entorno

Crea un archivo `.env` en la raíz del proyecto:

```bash
TRANSACTIONS_ENDPOINT="https://bold-fe-api.vercel.app/api"
```

**⚠️ IMPORTANTE**: La variable `TRANSACTIONS_ENDPOINT` es **obligatoria**. Sin ella, la aplicación no podrá realizar peticiones al backend.

### 3. Ejecutar en desarrollo

```bash
npm run dev
```

La aplicación estará disponible en [http://localhost:3000](http://localhost:3000)

---

## Testing

```bash
# Ejecutar tests
npm test

# Modo watch
npm run test:watch

# Con UI interactiva
npm run test:ui

# Coverage
npm run test:coverage
```

**Cobertura actual**: 74 tests pasando, cobertura > 90%

---

## Deploy en Vercel

### Opción 1: Vercel CLI (recomendado)

```bash
# Instalar Vercel CLI
npm i -g vercel

# Deploy
vercel

# Deploy a producción
vercel --prod
```

### Opción 2: GitHub Integration

1. Push del código a GitHub
2. Conectar repositorio en [vercel.com](https://vercel.com)
3. Configurar variable de entorno `TRANSACTIONS_ENDPOINT`
4. Deploy automático



---

## Estructura del Proyecto

```
├── app/                          # Next.js App Router
│   ├── (transactions)/          # Grupo de rutas de transacciones
│   │   ├── page.tsx            # Página principal (SSR)
│   │   └── layout.tsx          # Layout del grupo
│   └── layout.tsx              # Root layout
│
├── features/                     # Lógica de dominio por feature
│   └── transactions/
│       ├── components/          # Componentes específicos del dominio
│       │   ├── Filter/
│       │   ├── Search/
│       │   ├── TransactionTable/
│       │   ├── TransactionDetail/
│       │   ├── SalesResumeCard/
│       │   └── ...
│       ├── services/            # Lógica de negocio
│       │   ├── filters/         # Filtros (search, status, period, etc.)
│       │   ├── aggregations/    # Cálculos y estadísticas
│       │   ├── enrichers/       # Enriquecimiento de datos (deducciones)
│       │   ├── transaction.service.ts
│       │   └── validators.ts    # Validaciones de seguridad
│       ├── schemas/             # Schemas de Zod
│       └── hooks/               # React hooks del dominio
│
├── lib/                         # Código compartido
│   ├── types/                   # TypeScript types globales
│   │   ├── transaction.ts
│   │   └── filters.ts
│   └── utils/                   # Utilidades
│       ├── date-filters.ts
│       ├── format.ts
│       └── pagination.ts
│
├── components/                   # Componentes compartidos
│   └── shared/
│       └── Header.tsx
│
├── styles/                       # Estilos globales y variables
│   ├── globals.scss
│   ├── _variables.scss
│   ├── _mixins.scss
│   └── _reset.scss
│
└── public/                       # Assets estáticos
    └── assets/icons/
```

### Guía rápida de navegación

- **Servicios de transacciones**: `features/transactions/services/`
- **Componentes UI**: `features/transactions/components/`
- **Tipos y contratos**: `lib/types/`
- **Lógica de filtros**: `features/transactions/services/filters/`
- **Agregaciones y cálculos**: `features/transactions/services/aggregations/`
- **Enriquecimiento de datos**: `features/transactions/services/enrichers/`

---

## Principios de Arquitectura

Este proyecto fue diseñado para manejar **información financiera sensible**. Por ello:

### Seguridad

- **Server-Side Rendering (SSR)**: Los datos se obtienen y procesan en el servidor, nunca expuestos en el cliente
- **Validación estricta**: Todos los datos pasan por Zod schemas antes de procesarse
- **Sanitización**: Input del usuario sanitizado antes de búsquedas
- **TypeScript estricto**: Modo `strict: true` para prevenir errores en tiempo de compilación
- **Sin secretos en frontend**: Variables sensibles solo en servidor
- **Validación de seguridad**: Límites en paginación, filtros y queries para prevenir ataques

### Control de Datos

- **Arquitectura funcional**: Funciones puras para filtros, agregaciones y enriquecimiento
- **Inmutabilidad**: Uso de `ReadonlyArray` y tipos `readonly` en toda la capa de dominio
- **Pipeline de datos**: Flujo predecible: fetch → validate → filter → enrich → aggregate → paginate
- **Testing exhaustivo**: Cada capa del pipeline tiene tests unitarios e integración

### User Experience

- **SSR para velocidad**: Datos pre-renderizados en servidor, mejor TTFB
- **Client solo para interacción**: DOM y UI interactiva, sin lógica de negocio
- **Optimistic UI**: Feedback inmediato en acciones del usuario
- **Responsive**: Mobile-first design

---

## Scripts Disponibles

```bash
npm run dev          # Desarrollo local
npm run build        # Build de producción
npm start            # Servidor de producción
npm run lint         # Linter
npm test             # Tests
npm run test:ui      # Tests con interfaz
npm run test:coverage # Coverage report
```

