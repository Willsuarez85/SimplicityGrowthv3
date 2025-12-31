2# Guía Completa: Workflow del Marketer con SimplicityAgents

**Cómo usar el sistema para generar reportes, construir memoria y escalar conocimiento**

---

## 📋 Tabla de Contenidos

1. [Flujo Completo del Proyecto](#flujo-completo-del-proyecto)
2. [Generación de Reportes](#generación-de-reportes)
3. [Dónde se Guardan los Reportes](#dónde-se-guardan-los-reportes)
4. [Cómo se Usan los Reportes](#cómo-se-usan-los-reportes)
5. [Construcción de Memoria](#construcción-de-memoria)
6. [Ejemplo Práctico Completo](#ejemplo-práctico-completo)

---

## 🎯 Flujo Completo del Proyecto

### Fase 1: Setup del Cliente

**Paso 1: Crear estructura de carpetas**
```
Tú: "Necesito trabajar con un nuevo cliente: Restaurante Los Paisas"
Sistema: Usa `client-file-architect` para crear estructura
```

**Resultado:**
```
/clients/los-paisas/
├── 01-research/
│   ├── brand-audit/
│   ├── competitor-analysis/
│   └── trend-research/
├── 02-strategy/
│   ├── brand-dna/
│   └── content-strategy/
├── 03-creative/
├── 04-assets/
└── 05-deliverables/
```

**Archivos creados automáticamente:**
- `client_memory_profile.md` - Perfil de memoria del cliente
- `README.md` - Guía del proyecto

---

### Fase 2: Investigación (Research)

**Paso 2: Análisis de Competidores**
```
Tú: "Analiza los competidores de Los Paisas en Charlotte, NC"
Sistema: Activa `market-competitor-analyst`
```

**Reportes generados:**
```
/clients/los-paisas/01-research/competitor-analysis/
├── competitor_map.md              ← Mapa de competidores
├── market_overview.md             ← Visión general del mercado
├── messaging_and_positioning.md   ← Posicionamiento
├── content_patterns_and_formats.md ← Patrones de contenido
├── engagement_signals.md           ← Señales de engagement
└── gaps_and_opportunities.md      ← Oportunidades
```

**Qué contiene cada reporte:**
- **competitor_map.md**: Lista de competidores, fortalezas/debilidades, posicionamiento
- **market_overview.md**: Tamaño del mercado, tendencias, audiencia objetivo
- **gaps_and_opportunities.md**: Oportunidades específicas para tu cliente

**Cómo se usa:**
- Los agentes siguientes (`brand-dna-architect`, `content-strategist`) leen estos reportes automáticamente
- Tú puedes consultarlos para decisiones estratégicas
- Se referencia en presentaciones al cliente

---

**Paso 3: Análisis de Tendencias**
```
Tú: "Qué está funcionando ahora en TikTok e Instagram para restaurantes latinos?"
Sistema: Activa `trends-platform-analyst`
```

**Reportes generados:**
```
/clients/los-paisas/01-research/trend-research/
├── platform_trends_overview.md    ← Resumen ejecutivo
├── tiktok_trends.md               ← Tendencias TikTok específicas
├── instagram_reels_trends.md      ← Tendencias Reels
└── hooks_and_formats.md           ← Patrones de hooks
```

**Qué contiene:**
- Formatos que están funcionando ahora
- Patrones de hooks que generan engagement
- Timing óptimo de publicación
- Ejemplos reales de contenido exitoso

**Cómo se usa:**
- Informa la estrategia de contenido
- Se usa para crear hooks efectivos
- Referencia para el equipo creativo

---

### Fase 3: Estrategia (Strategy)

**Paso 4: Brand DNA**
```
Tú: "Crea el Brand DNA para Los Paisas basado en la investigación"
Sistema: Activa `brand-dna-architect`
```

**Reportes generados:**
```
/clients/los-paisas/02-strategy/brand-dna/
├── brand_dna_core.md              ← ADN de marca principal
├── tone_of_voice_guidelines.md   ← Guía de voz y tono
├── visual_identity_direction.md  ← Dirección visual
├── ai_avatars.md                 ← Avatares para contenido
└── brand_package_summary.md      ← Resumen ejecutivo
```

**Memoria creada automáticamente:**
El sistema crea entidades en MCP Memory:
- `los-paisas` (Client entity)
- `los-paisas-brand` (Brand entity)
- `los-paisas-voice` (ToneOfVoice entity)
- `los-paisas-visual` (VisualIdentity entity)
- `los-paisas-avatar-[role]` (Avatar entities)

**Cómo se usa:**
- Todos los agentes futuros consultan esta memoria automáticamente
- Garantiza consistencia en todo el contenido
- No necesitas recordar detalles, el sistema los tiene

---

**Paso 5: Estrategia de Contenido**
```
Tú: "Crea la estrategia de contenido para Los Paisas"
Sistema: Activa `content-strategist`
```

**Reportes generados:**
```
/clients/los-paisas/02-strategy/content-strategy/
├── content_pillars.md            ← Pilares de contenido
├── content_calendar.md           ← Calendario de contenido
├── content_angles.md             ← Ángulos y hooks
└── content_briefs/               ← Briefs individuales
    ├── content-brief-001.md
    ├── content-brief-002.md
    └── ...
```

**Qué contiene:**
- **content_pillars.md**: 3-5 pilares temáticos principales
- **content_calendar.md**: Calendario mensual con temas específicos
- **content_angles.md**: Lista de ángulos y hooks para cada pilar
- **content_briefs/**: Briefs detallados para cada pieza de contenido

**Cómo se usa:**
- Guía para crear contenido consistente
- El equipo creativo usa los briefs directamente
- Se actualiza mensualmente basado en resultados

---

### Fase 4: Creativo (Creative)

**Paso 6: Dirección Creativa**
```
Tú: "Crea los storyboards para los primeros 5 videos"
Sistema: Activa `creative-director`
```

**Reportes generados:**
```
/clients/los-paisas/03-creative/
├── storyboards/
│   ├── storyboard-001.md
│   ├── storyboard-002.md
│   └── ...
├── scripts/
│   ├── script-001.md
│   ├── script-002.md
│   └── ...
└── prompts/
    └── ai-prompts.md
```

**Qué contiene:**
- **storyboards/**: Descripción visual de cada escena
- **scripts/**: Guiones completos con diálogos
- **prompts/**: Prompts para generación de imágenes/videos con AI

**Cómo se usa:**
- El editor usa los storyboards para crear videos
- Los scripts se usan para grabación
- Los prompts se usan con herramientas AI (fal.ai, etc.)

---

### Fase 5: Entrega (Delivery)

**Paso 7: Preparación de Entrega**
```
Tú: "Prepara todo para entregar al cliente"
Sistema: Activa `delivery-documentation-manager`
```

**Reportes generados:**
```
/clients/los-paisas/05-deliverables/
├── presentations/
│   ├── brand-package-presentation.pdf
│   └── content-strategy-presentation.pdf
└── handoff-packages/
    ├── delivery_summary.md
    ├── client_handoff.md
    └── editor_handoff.md
```

**Qué contiene:**
- **presentations/**: PDFs profesionales para el cliente
- **handoff-packages/**: Documentación para el equipo interno

**Cómo se usa:**
- Se envía al cliente vía Google Drive o Notion
- El equipo interno usa los handoff docs para continuar el trabajo

---

## 📊 Generación de Reportes

### Tipos de Reportes que Genera el Sistema

#### 1. Reportes de Investigación
**Agente:** `market-competitor-analyst`
**Ubicación:** `/clients/[client]/01-research/competitor-analysis/`

**Ejemplo de comando:**
```
"Analiza los competidores de Los Paisas en Charlotte, NC, 
enfocándote en su presencia en redes sociales y estrategia de contenido"
```

**Reportes generados:**
- `competitor_map.md` - Mapa completo de competidores
- `market_overview.md` - Visión general del mercado
- `content_patterns_and_formats.md` - Patrones de contenido
- `gaps_and_opportunities.md` - Oportunidades identificadas

---

#### 2. Reportes de Tendencias
**Agente:** `trends-platform-analyst`
**Ubicación:** `/clients/[client]/01-research/trend-research/`

**Ejemplo de comando:**
```
"Analiza qué está funcionando en TikTok e Instagram para 
restaurantes latinos en Estados Unidos"
```

**Reportes generados:**
- `platform_trends_overview.md` - Resumen ejecutivo
- `tiktok_trends.md` - Tendencias específicas de TikTok
- `instagram_reels_trends.md` - Tendencias de Reels
- `hooks_and_formats.md` - Patrones de hooks exitosos

---

#### 3. Reportes de Estrategia
**Agente:** `content-strategist`
**Ubicación:** `/clients/[client]/02-strategy/content-strategy/`

**Ejemplo de comando:**
```
"Crea la estrategia de contenido para Los Paisas basada en 
el Brand DNA y las tendencias identificadas"
```

**Reportes generados:**
- `content_pillars.md` - Pilares temáticos
- `content_calendar.md` - Calendario mensual
- `content_angles.md` - Ángulos y hooks
- `content_briefs/` - Briefs individuales

---

### Cómo Solicitar Reportes

**Formato de solicitud:**
```
"[Tipo de análisis] para [Cliente] enfocándome en [Área específica]"
```

**Ejemplos:**
- "Análisis de competidores para Los Paisas enfocándome en su estrategia de TikTok"
- "Tendencias de Instagram Reels para restaurantes latinos en Charlotte"
- "Estrategia de contenido para Los Paisas para el próximo trimestre"

**El sistema automáticamente:**
1. Identifica qué agente usar
2. Consulta información previa del cliente (si existe)
3. Genera los reportes en las carpetas correctas
4. Crea índices y documentación

---

## 📁 Dónde se Guardan los Reportes

### Estructura de Carpetas por Cliente

```
/clients/[client-name]/
│
├── 01-research/                    ← TODOS LOS REPORTES DE INVESTIGACIÓN
│   ├── brand-audit/
│   │   └── brand_audit_report.md
│   ├── competitor-analysis/        ← Reportes de competidores
│   │   ├── competitor_map.md
│   │   ├── market_overview.md
│   │   ├── content_patterns_and_formats.md
│   │   ├── engagement_signals.md
│   │   ├── gaps_and_opportunities.md
│   │   └── messaging_and_positioning.md
│   ├── trend-research/             ← Reportes de tendencias
│   │   ├── platform_trends_overview.md
│   │   ├── tiktok_trends.md
│   │   ├── instagram_reels_trends.md
│   │   └── hooks_and_formats.md
│   └── research_index.md            ← Índice de todos los reportes
│
├── 02-strategy/                    ← TODOS LOS REPORTES DE ESTRATEGIA
│   ├── brand-dna/
│   │   ├── brand_dna_core.md
│   │   ├── tone_of_voice_guidelines.md
│   │   ├── visual_identity_direction.md
│   │   ├── ai_avatars.md
│   │   └── brand_package_summary.md
│   └── content-strategy/
│       ├── content_pillars.md
│       ├── content_calendar.md
│       ├── content_angles.md
│       └── content_briefs/
│
├── 03-creative/                    ← DIRECCIÓN CREATIVA
│   ├── storyboards/
│   ├── scripts/
│   └── prompts/
│
├── 04-assets/                      ← ASSETS GENERADOS
│   ├── images/
│   ├── videos/
│   └── references/
│
└── 05-deliverables/                ← ENTREGAS AL CLIENTE
    ├── presentations/
    └── handoff-packages/
```

### Convención de Nombres

**Formato estándar:**
```
[client]_[tipo]_[descripción]_[versión].[ext]
```

**Ejemplos:**
- `los-paisas_research_competitor-analysis_v1.md`
- `los-paisas_strategy_content-calendar_q1_v1.md`
- `los-paisas_brand_dna-core_vFinal.md`

---

## 🔄 Cómo se Usan los Reportes

### 1. Uso Interno (Por Agentes)

**Los agentes leen reportes automáticamente:**

**Ejemplo:**
```
1. Tú: "Crea la estrategia de contenido para Los Paisas"
2. Sistema activa `content-strategist`
3. El agente automáticamente:
   - Lee brand_dna_core.md
   - Lee competitor_map.md
   - Lee platform_trends_overview.md
   - Consulta MCP Memory para brand voice
   - Genera content_pillars.md basado en todo lo anterior
```

**No necesitas:**
- Recordar detalles del cliente
- Copiar información entre reportes
- Buscar archivos manualmente

**El sistema:**
- Consulta automáticamente información previa
- Mantiene consistencia entre reportes
- Referencia documentos anteriores

---

### 2. Uso por Ti (Marketer)

**Consultar reportes para decisiones:**

**Ejemplo:**
```
Tú: "Muéstrame las oportunidades identificadas para Los Paisas"
Sistema: Abre gaps_and_opportunities.md
```

**Usar reportes para presentaciones:**

**Ejemplo:**
```
Tú: "Crea una presentación ejecutiva del análisis de competidores"
Sistema: Usa delivery-documentation-manager para crear PDF
```

**Actualizar reportes basado en resultados:**

**Ejemplo:**
```
Tú: "Actualiza la estrategia de contenido con los resultados del mes pasado"
Sistema: Lee content_calendar.md, analiza resultados, actualiza
```

---

### 3. Uso por el Cliente

**Reportes entregados:**

**Formato PDF:**
```
/clients/los-paisas/05-deliverables/presentations/
├── brand-package-presentation.pdf
└── content-strategy-presentation.pdf
```

**Formato Notion:**
```
Notion Workspace → Los Paisas → Brand Package
```

**Contenido incluido:**
- Resumen ejecutivo
- Hallazgos clave
- Recomendaciones
- Próximos pasos

---

## 🧠 Construcción de Memoria

### Dos Tipos de Memoria

#### 1. Memoria de Cliente (Client Memory)
**Dónde:** MCP Knowledge Graph (memoria del sistema)
**Qué:** Información específica de cada cliente
**Formato:** Entidades con relaciones

**Ejemplo de entidades creadas:**
```
los-paisas (Client)
  └── los-paisas-brand (Brand)
      ├── los-paisas-voice (ToneOfVoice)
      ├── los-paisas-visual (VisualIdentity)
      └── los-paisas-avatar-chef (Avatar)
```

**Cuándo se crea:**
- Automáticamente cuando `brand-dna-architect` completa su trabajo
- Se actualiza cuando hay cambios en brand DNA

**Cómo se usa:**
- Todos los agentes consultan esta memoria automáticamente
- Garantiza consistencia en todo el contenido
- No necesitas recordar detalles

**Ejemplo de uso:**
```
1. Tú: "Crea un script para Los Paisas"
2. Sistema activa `creative-director`
3. El agente automáticamente:
   - Consulta MCP Memory: mcp__memory__open_nodes(["los-paisas-voice"])
   - Obtiene: "Bilingual, warm, authentic, uses Spanglish"
   - Escribe el script usando ese tono automáticamente
```

---

#### 2. Knowledge Base (Conocimiento General)
**Dónde:** `/knowledge-base/`
**Qué:** Conocimiento aplicable a múltiples clientes
**Formato:** Archivos Markdown organizados

**Estructura:**
```
/knowledge-base/
├── industry-insights/        ← Insights por industria
│   └── restaurants/
├── platform-guides/         ← Guías por plataforma
│   ├── tiktok/
│   └── instagram/
├── best-practices/          ← Mejores prácticas
└── trends-intelligence-2025/ ← Tendencias actuales
```

**Cuándo se agrega:**
- Después de completar trabajo con clientes
- Cuando identificas patrones que funcionan en múltiples proyectos
- Después de campañas exitosas

**Cómo se construye:**

**Paso 1: Identificar aprendizaje**
```
Después de trabajar con 3 restaurantes, notas:
"Los hooks bilingües funcionan mejor que solo español o solo inglés"
```

**Paso 2: Documentar en Knowledge Base**
```
/knowledge-base/industry-insights/restaurants/
└── bilingual_hooks_patterns_2025-01.md
```

**Paso 3: Usar en futuros proyectos**
```
Cuando trabajes con el próximo restaurante:
- El sistema consulta knowledge-base automáticamente
- Encuentra el patrón de hooks bilingües
- Lo aplica en la estrategia de contenido
```

---

### Proceso de Construcción de Memoria

#### Durante el Proyecto

**1. Memoria de Cliente se construye automáticamente:**
```
Fase: Brand DNA
Agente: brand-dna-architect
Acción: Crea entidades en MCP Memory
Resultado: Memoria específica del cliente disponible para siempre
```

**2. Documentos se guardan en carpetas:**
```
Cada reporte se guarda en su carpeta correspondiente
Índices se actualizan automáticamente
```

---

#### Después del Proyecto

**1. Extracción de aprendizajes:**

**Preguntas clave:**
- ¿Qué funcionó que podría funcionar para otros clientes?
- ¿Qué patrón se repitió en múltiples proyectos?
- ¿Qué insight es generalizable?

**Ejemplo:**
```
Proyecto: Los Paisas
Resultado: Hooks bilingües generaron 3x más engagement
Aprendizaje: "Hooks bilingües funcionan para restaurantes latinos"
Acción: Documentar en knowledge-base
```

**2. Documentación en Knowledge Base:**

**Ubicación según tipo:**
- **Industry insight:** `/knowledge-base/industry-insights/restaurants/`
- **Platform strategy:** `/knowledge-base/platform-guides/tiktok/`
- **Best practice:** `/knowledge-base/best-practices/`

**Formato del documento:**
```markdown
# Bilingual Hooks for Latino Restaurants

**Date:** 2025-01-15
**Source:** Los Paisas campaign (Q1 2025)
**Evidence:** 3x engagement vs monolingual hooks

## Pattern
Start hook in English, switch to Spanish for emotional moment

## Examples
- "You think you know tacos... pero espera hasta que veas esto"
- "Everyone says authentic... pero esto es lo que realmente significa"

## Application
Use for: Latino restaurants targeting bilingual audience
Avoid for: Monolingual Spanish-only audiences
```

**3. Uso en futuros proyectos:**

**Automático:**
```
Nuevo proyecto: Restaurante El Sol
Sistema consulta knowledge-base
Encuentra: bilingual_hooks_patterns.md
Aplica: Patrón de hooks bilingües en estrategia
```

---

## 📝 Ejemplo Práctico Completo

### Escenario: Nuevo Cliente - Restaurante El Sol

#### Semana 1: Setup e Investigación

**Día 1: Setup**
```
Tú: "Necesito trabajar con Restaurante El Sol en Miami"
Sistema: client-file-architect crea estructura
Resultado: /clients/restaurante-el-sol/ creado
```

**Día 2: Análisis de Competidores**
```
Tú: "Analiza los competidores de El Sol en Miami"
Sistema: market-competitor-analyst genera reportes
Resultado: 
  /clients/restaurante-el-sol/01-research/competitor-analysis/
  ├── competitor_map.md
  ├── market_overview.md
  └── gaps_and_opportunities.md
```

**Día 3: Tendencias**
```
Tú: "Qué está funcionando en TikTok para restaurantes en Miami?"
Sistema: trends-platform-analyst genera reportes
Resultado:
  /clients/restaurante-el-sol/01-research/trend-research/
  ├── platform_trends_overview.md
  └── tiktok_trends.md
```

**Día 4: Revisión**
```
Tú: "Muéstrame las oportunidades identificadas"
Sistema: Abre gaps_and_opportunities.md
Tú: Revisas y apruebas para continuar
```

---

#### Semana 2: Estrategia

**Día 5: Brand DNA**
```
Tú: "Crea el Brand DNA para El Sol"
Sistema: brand-dna-architect genera documentos
Resultado:
  /clients/restaurante-el-sol/02-strategy/brand-dna/
  ├── brand_dna_core.md
  ├── tone_of_voice_guidelines.md
  └── visual_identity_direction.md

Memoria creada automáticamente:
  - el-sol (Client)
  - el-sol-brand (Brand)
  - el-sol-voice (ToneOfVoice)
  - el-sol-visual (VisualIdentity)
```

**Día 6: Estrategia de Contenido**
```
Tú: "Crea la estrategia de contenido"
Sistema: content-strategist:
  1. Lee brand_dna_core.md
  2. Consulta MCP Memory para voice
  3. Lee platform_trends_overview.md
  4. Consulta knowledge-base para patrones de restaurantes
  5. Genera content_pillars.md y content_calendar.md

Resultado:
  /clients/restaurante-el-sol/02-strategy/content-strategy/
  ├── content_pillars.md
  ├── content_calendar.md
  └── content_briefs/
```

---

#### Semana 3: Creativo y Entrega

**Día 7-10: Dirección Creativa**
```
Tú: "Crea los primeros 10 storyboards"
Sistema: creative-director:
  1. Consulta MCP Memory para visual identity
  2. Lee content_briefs/
  3. Consulta knowledge-base para hooks patterns
  4. Genera storyboards y scripts

Resultado:
  /clients/restaurante-el-sol/03-creative/
  ├── storyboards/
  └── scripts/
```

**Día 11: Entrega**
```
Tú: "Prepara todo para entregar al cliente"
Sistema: delivery-documentation-manager:
  1. Reúne todos los documentos
  2. Crea presentaciones PDF
  3. Prepara Notion workspace
  4. Genera handoff documentation

Resultado:
  /clients/restaurante-el-sol/05-deliverables/
  ├── presentations/
  └── handoff-packages/
```

---

#### Después del Proyecto: Construcción de Memoria

**Mes 2: Revisión de Resultados**
```
Tú: "Revisa los resultados del primer mes de El Sol"
Sistema: Analiza métricas
Hallazgo: "Hooks con preguntas directas generaron 2.5x más engagement"
```

**Extracción de Aprendizaje:**
```
Tú: "Documenta este hallazgo en knowledge-base"
Sistema: Crea documento en best-practices
Resultado:
  /knowledge-base/best-practices/
  └── question_hooks_restaurants_2025-02.md
```

**Uso en Próximo Proyecto:**
```
Nuevo proyecto: Taqueria La Familia
Sistema consulta knowledge-base automáticamente
Encuentra: question_hooks_restaurants.md
Aplica: Patrón de hooks con preguntas en estrategia
```

---

## 🎯 Resumen: Flujo de Memoria

### Durante el Proyecto
```
1. Generas reportes → Se guardan en carpetas del cliente
2. Brand DNA se completa → Se crea memoria en MCP
3. Agentes futuros → Consultan memoria automáticamente
```

### Después del Proyecto
```
1. Identificas patrones → Qué funcionó para múltiples clientes
2. Documentas en Knowledge Base → Conocimiento general
3. Próximos proyectos → Consultan Knowledge Base automáticamente
```

### Resultado Final
```
Cada proyecto:
- Construye memoria específica del cliente (MCP Memory)
- Genera reportes organizados (carpetas del cliente)
- Contribuye conocimiento general (Knowledge Base)

Cada nuevo proyecto:
- Accede a memoria del cliente (si existe)
- Consulta Knowledge Base automáticamente
- Aprende de proyectos anteriores
- Se vuelve más eficiente con el tiempo
```

---

## 💡 Tips para Maximizar el Sistema

### 1. Nombres Consistentes
```
Usa siempre el mismo formato:
- Cliente: "restaurante-el-sol" (lowercase, hyphens)
- Archivos: "[client]_[tipo]_[descripción]_v1.md"
```

### 2. Revisa Índices Regularmente
```
Cada carpeta tiene un índice:
- research_index.md
- documentation_map.md

Úsalos para navegar rápidamente
```

### 3. Extrae Aprendizajes Proactivamente
```
Después de cada proyecto exitoso:
- Identifica qué funcionó
- Documenta en Knowledge Base
- El sistema lo usará automáticamente después
```

### 4. Consulta Knowledge Base Antes de Empezar
```
Antes de nuevo proyecto:
- Revisa industry-insights relevantes
- Consulta platform-guides
- Aplica best-practices identificadas
```

---

**El sistema se vuelve más inteligente con cada proyecto. Tu trabajo se vuelve más eficiente con el tiempo.**

