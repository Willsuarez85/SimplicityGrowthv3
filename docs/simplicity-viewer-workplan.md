# Simplicity Viewer - Plan de Trabajo Completo

> **Objetivo:** Dashboard visual para clientes de Simplicity Growth Marketing
> **Stack:** Next.js 14 (App Router) + shadcn/ui + TypeScript + Tailwind CSS
> **Estado Actual:** Core funcional, features nuevos incompletos

---

## Resumen Ejecutivo

### Arquitectura Propuesta

```
┌─────────────────────────────────────────────────────────────────────┐
│                        SIMPLICITY VIEWER                             │
├─────────────────────────────────────────────────────────────────────┤
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐              │
│  │   Dashboard  │  │ File Viewer  │  │  Calendar    │              │
│  │   (Clients)  │  │  (Docs/Img)  │  │  (Content)   │              │
│  └──────────────┘  └──────────────┘  └──────────────┘              │
│           │                │                │                        │
│  ┌────────────────────────────────────────────────────────────┐     │
│  │                    Task Request System                      │     │
│  │         (Research / Asset Production / Strategy)           │     │
│  └────────────────────────────────────────────────────────────┘     │
│                              │                                       │
│  ┌────────────────────────────────────────────────────────────┐     │
│  │              API Layer (Server Actions / Routes)           │     │
│  └────────────────────────────────────────────────────────────┘     │
│                              │                                       │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐              │
│  │  Filesystem  │  │   Memory     │  │   fal.ai     │              │
│  │   (clients/) │  │   (MCP)      │  │   (Assets)   │              │
│  └──────────────┘  └──────────────┘  └──────────────┘              │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Fase 0: Estabilización (1-2 horas)

### 0.1 Arreglar ESLint Errors (13 errores)

| Archivo | Error | Fix |
|---------|-------|-----|
| `ChatInterface.tsx` | `error` unused | Usar en UI para mostrar mensaje de error |
| `ChatInterface.tsx` | `clearChat` unused | Agregar botón "New Chat" que use esta función |
| `FileHeader.tsx` | `lastModified` unused | Mostrar fecha "Last modified: X" |
| `FileHeader.tsx` | `fileName` unused | Usar en título del header |
| `FileHeader.tsx` | `filePath` unused | Mostrar path como breadcrumb |
| `FileHeader.tsx` | `wordCount` unused | Mostrar "X words" en metadata |
| `MarkdownViewer.tsx` | `<img>` element | Cambiar a Next.js `<Image>` component |
| Varios archivos | Unescaped quotes | Usar `&apos;` o template literals |

### 0.2 Verificar Build
```bash
cd simplicity-viewer && npm run build
```

**Criterio de éxito:** Build exitoso sin errores

---

## Fase 1: File Viewer System (3-4 horas)

### 1.1 Nuevo Layout de 3 Paneles

```
┌─────────┬────────────────────┬────────────┐
│ Sidebar │   Content Viewer   │ Info Panel │
│ (Files) │   (Doc/Image/Code) │ (Metadata) │
│  250px  │      flexible      │   300px    │
└─────────┴────────────────────┴────────────┘
```

**Componentes a crear:**

1. **`FileExplorer.tsx`** - Árbol de archivos clickeable
   - Expandir/colapsar folders
   - Iconos por tipo de archivo (md, yaml, png, jpg)
   - Indicador de fase (01-research, 02-strategy, etc.)

2. **`ContentViewer.tsx`** (mejorar existente)
   - Markdown rendering con syntax highlighting
   - Image viewer con zoom/pan
   - YAML viewer con formato bonito
   - PDF preview (iframe)

3. **`FileMetadata.tsx`** - Panel derecho
   - Nombre, ruta, tamaño
   - Fecha de creación/modificación
   - Tipo de archivo
   - Botones: Edit, Delete, Download

### 1.2 API Routes Necesarios

```typescript
// GET /api/files/[...path] - Leer contenido (ya existe)
// PUT /api/files/[...path] - Editar archivo
// DELETE /api/files/[...path] - Borrar archivo
// POST /api/files/upload - Subir archivo nuevo
```

### 1.3 Tipos de Archivo Soportados

| Tipo | Extensión | Viewer |
|------|-----------|--------|
| Markdown | `.md` | MarkdownViewer con react-markdown |
| YAML | `.yaml`, `.yml` | YAMLViewer con syntax highlight |
| Imagen | `.png`, `.jpg`, `.webp` | ImageViewer con zoom |
| JSON | `.json` | JSONViewer con tree view |
| PDF | `.pdf` | iframe embed |

---

## Fase 2: Client Status UX (2-3 horas)

### 2.1 Dashboard Mejorado

**Nuevo diseño de ClientCard:**

```
┌──────────────────────────────────────┐
│ 🏪 La Única Supermarket             │
│ Retail - Mexican Supermarket         │
├──────────────────────────────────────┤
│ Phase Progress                       │
│ ████████████░░░░░░░░░ 60%           │
│                                      │
│ Research ✓  Strategy ✓  Creative ◐  │
│ Assets ○    Delivery ○              │
├──────────────────────────────────────┤
│ 📄 12 docs  🖼 5 assets  📦 2 ready  │
└──────────────────────────────────────┘
```

### 2.2 Client Detail Page Mejorada

**Secciones:**

1. **Header** - Nombre, industria, status badge, tagline
2. **Quick Stats** - Files, assets, deliverables, last activity
3. **Phase Timeline** - Visual de 5 fases con estados
4. **Recent Activity** - Últimos archivos modificados
5. **Deliverables** - Lista de entregables con status
6. **Quick Actions** - Botones para tareas comunes

### 2.3 Status Indicators

| Estado | Color | Icono |
|--------|-------|-------|
| `not_started` | Gray | ○ |
| `in_progress` | Blue | ◐ |
| `review` | Yellow | ◔ |
| `complete` | Green | ✓ |
| `blocked` | Red | ⚠ |

---

## Fase 3: Task Request System (3-4 horas)

### 3.1 Modal de Nueva Tarea

```
┌─────────────────────────────────────────────┐
│ 📋 Request New Task                    [X]  │
├─────────────────────────────────────────────┤
│ Client: [La Única Supermarket    ▼]         │
│                                             │
│ Task Type:                                  │
│ ┌─────────┐ ┌─────────┐ ┌─────────┐        │
│ │Research │ │Strategy │ │Creative │        │
│ └─────────┘ └─────────┘ └─────────┘        │
│ ┌─────────┐ ┌─────────┐                    │
│ │ Assets  │ │Calendar │                    │
│ └─────────┘ └─────────┘                    │
│                                             │
│ Description:                                │
│ ┌─────────────────────────────────────┐    │
│ │ Describe what you need...           │    │
│ └─────────────────────────────────────┘    │
│                                             │
│ Priority: [Medium ▼]                        │
│                                             │
│         [Cancel]  [Submit Request]          │
└─────────────────────────────────────────────┘
```

### 3.2 Task Types

| Type | Description | Agent Triggered |
|------|-------------|-----------------|
| `research` | Market/competitor analysis | market-competitor-analyst |
| `trends` | Platform trend research | trends-platform-analyst |
| `brand` | Brand DNA work | brand-dna-architect |
| `strategy` | Content strategy | content-strategist |
| `creative` | Scripts, storyboards | creative-director |
| `assets` | Image/video generation | prompt-asset-engineer |
| `calendar` | Content calendar creation | content-strategist |

### 3.3 Task Queue Display

```
┌─────────────────────────────────────────────┐
│ 📋 Active Tasks                             │
├─────────────────────────────────────────────┤
│ ○ Research competitor pricing - La Única    │
│   Created: Today 10:30am | Priority: High   │
│                                             │
│ ◐ Generate hero images - AIPreneur          │
│   In Progress | ETA: ~5 min                 │
│                                             │
│ ✓ Brand DNA document - La Única             │
│   Completed: Yesterday 3:45pm               │
└─────────────────────────────────────────────┘
```

---

## Fase 4: Content Calendar (4-5 horas)

### 4.1 Vista Mensual

```
┌─────────────────────────────────────────────────────────────┐
│ January 2026                              [< Month >]       │
├─────┬─────┬─────┬─────┬─────┬─────┬─────────────────────────┤
│ Mon │ Tue │ Wed │ Thu │ Fri │ Sat │ Sun                     │
├─────┼─────┼─────┼─────┼─────┼─────┼─────────────────────────┤
│     │     │  1  │  2  │  3  │  4  │  5                      │
│     │     │     │ 📱  │     │     │                         │
├─────┼─────┼─────┼─────┼─────┼─────┼─────────────────────────┤
│  6  │  7  │  8  │  9  │ 10  │ 11  │ 12                      │
│ 📱  │     │ 🎬  │ 📱  │     │     │                         │
└─────┴─────┴─────┴─────┴─────┴─────┴─────────────────────────┘
│ 📱 = Reel  │ 🎬 = Video  │ 📸 = Photo  │ 📝 = Story         │
└─────────────────────────────────────────────────────────────┘
```

### 4.2 Post Card (en calendario)

```
┌────────────────────────────────┐
│ 📱 Instagram Reel              │
│ "Behind the Carnicería"        │
├────────────────────────────────┤
│ Status: Scripted ◐             │
│ Platform: Instagram, TikTok    │
│ Pillar: Behind the Scenes      │
└────────────────────────────────┘
```

### 4.3 Crear Post Modal

```
┌─────────────────────────────────────────────┐
│ 📅 Schedule Post                       [X]  │
├─────────────────────────────────────────────┤
│ Date: [January 15, 2026]                    │
│ Time: [10:00 AM ▼]                          │
│                                             │
│ Platform(s):                                │
│ [x] Instagram  [x] TikTok  [ ] YouTube     │
│ [ ] Facebook   [ ] X                        │
│                                             │
│ Content Type: [Reel ▼]                      │
│                                             │
│ Title: ________________________________     │
│                                             │
│ Content Pillar: [Behind the Scenes ▼]       │
│                                             │
│ Description:                                │
│ ┌─────────────────────────────────────┐    │
│ │                                     │    │
│ └─────────────────────────────────────┘    │
│                                             │
│ Attach: [+ Script] [+ Storyboard] [+ Asset]│
│                                             │
│         [Cancel]  [Schedule Post]           │
└─────────────────────────────────────────────┘
```

### 4.4 Modelo de Datos

```typescript
interface ContentPost {
  id: string;
  clientSlug: string;
  date: string;           // ISO date
  time?: string;          // 24h format
  platforms: Platform[];  // instagram, tiktok, youtube, etc.
  type: ContentType;      // reel, video, photo, story, carousel
  title: string;
  description?: string;
  pillar?: string;        // content pillar from strategy
  status: PostStatus;     // idea, scripted, produced, scheduled, published
  attachments?: {
    script?: string;      // path to script file
    storyboard?: string;  // path to storyboard
    assets?: string[];    // paths to generated assets
  };
}
```

### 4.5 Storage

Guardar calendario en: `clients/[slug]/05-deliverables/content-calendar.json`

---

## Fase 5: Polish & Integration (2-3 horas)

### 5.1 Navigation

- Breadcrumbs en todas las páginas
- Sidebar colapsable
- Keyboard shortcuts (⌘K = search, ⌘N = new task)

### 5.2 Search

- Buscar archivos por nombre
- Buscar contenido dentro de archivos
- Filtrar por tipo, fecha, cliente

### 5.3 Responsive Design

- Mobile-friendly sidebar (drawer)
- Touch gestures para image viewer
- Responsive calendar grid

### 5.4 Dark Mode (opcional)

- Toggle en header
- Respetar preferencia del sistema

---

## Stack Técnico Final

### Dependencies Actuales
```json
{
  "next": "14.2.35",
  "react": "^18",
  "react-markdown": "^10.1.0",
  "gray-matter": "^4.0.3",
  "js-yaml": "^4.1.1",
  "lucide-react": "^0.562.0",
  "@radix-ui/react-dialog": "^1.1.15",
  "@radix-ui/react-scroll-area": "^1.2.10"
}
```

### Dependencies a Agregar
```bash
npm install date-fns          # Manejo de fechas para calendario
npm install react-dropzone    # Upload de archivos
npm install @tanstack/react-table  # Tabla de tareas
npm install sonner            # Toast notifications
npm install zustand           # State management ligero
```

### shadcn/ui Components a Agregar
```bash
npx shadcn@latest add dialog select textarea tabs calendar toast dropdown-menu
```

---

## Orden de Implementación Recomendado

```
Fase 0: Estabilización
  └── 0.1 Fix ESLint errors
  └── 0.2 Verify build

Fase 1: File Viewer
  └── 1.1 FileExplorer component
  └── 1.2 ContentViewer mejoras
  └── 1.3 FileMetadata panel
  └── 1.4 Edit/Delete API routes

Fase 2: Client Status UX
  └── 2.1 ClientCard rediseño
  └── 2.2 Client detail page
  └── 2.3 Status indicators

Fase 3: Task Request
  └── 3.1 Task modal
  └── 3.2 Task types config
  └── 3.3 Task queue display

Fase 4: Content Calendar
  └── 4.1 Calendar component
  └── 4.2 Post cards
  └── 4.3 Create post modal
  └── 4.4 Data persistence

Fase 5: Polish
  └── 5.1 Navigation
  └── 5.2 Search
  └── 5.3 Responsive
```

---

## Checklist de Éxito

- [ ] Build sin errores de ESLint
- [ ] Ver cualquier archivo (md, yaml, imagen)
- [ ] Editar archivos markdown
- [ ] Borrar archivos
- [ ] Ver estado claro de cada cliente
- [ ] Crear tareas y verlas en cola
- [ ] Calendario mensual funcional
- [ ] Crear posts en calendario
- [ ] Responsive en móvil

---

## Notas de Implementación

### Principios de Diseño

1. **Server Components First** - Solo usar `"use client"` cuando sea necesario
2. **Filesystem as Database** - Los clientes ya tienen estructura de carpetas
3. **Progressive Enhancement** - Funciona sin JS, mejora con JS
4. **Minimal State** - Usar URL params y server state cuando posible

### Convenciones de Código

```typescript
// Componentes: PascalCase con .tsx
FileExplorer.tsx
ContentViewer.tsx

// Hooks: camelCase con use prefix
useFileContent.ts
useCalendar.ts

// Utils: camelCase
formatDate.ts
parseMarkdown.ts

// API Routes: route.ts en carpeta descriptiva
/api/files/[...path]/route.ts
/api/tasks/route.ts
```

---

*Documento creado: 2026-01-05*
*Última actualización: 2026-01-05*
