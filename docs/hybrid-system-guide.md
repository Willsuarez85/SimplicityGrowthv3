# Hybrid System Guide
## SimplicityAgents v3 - Client Extensions

> Guía completa para usar y crear extensiones personalizadas por cliente

**Version:** 1.0
**Last Updated:** 2026-01-04

---

## ¿Qué es el Sistema Híbrido?

El sistema híbrido combina:

1. **Core compartido (90%)** - Agentes, templates, knowledge base que funcionan para todos los clientes
2. **Extensiones por cliente (10%)** - Personalizaciones específicas donde se necesitan

```
┌─────────────────────────────────────────────────────────────┐
│                    SISTEMA HÍBRIDO                           │
│                                                              │
│   ┌──────────────────────┐   ┌───────────────────────────┐  │
│   │   CORE COMPARTIDO    │   │  EXTENSIONES POR CLIENTE  │  │
│   │                      │   │                           │  │
│   │  • 8 agentes base    │ + │  • agents/custom.md       │  │
│   │  • templates/        │   │  • templates/custom.md    │  │
│   │  • knowledge-base/   │   │  • knowledge/custom.md    │  │
│   │                      │   │  • client_config.yaml     │  │
│   └──────────────────────┘   └───────────────────────────┘  │
│                                                              │
│   Se usa para TODOS          Se usa solo para ESE cliente   │
│   los clientes               cuando tiene necesidades       │
│                              especiales                     │
└─────────────────────────────────────────────────────────────┘
```

---

## ¿Cuándo usar extensiones?

### ✅ SÍ usar extensiones cuando:

| Situación | Ejemplo |
|-----------|---------|
| Cliente tiene industria única | AI Education vs Restaurants |
| Formato de contenido diferente | YouTube 15 min vs Reels 60s |
| Productos digitales | Cursos, templates, SaaS |
| Vocabulario técnico específico | AI, crypto, médico |
| Templates muy diferentes | Course modules vs social posts |

### ❌ NO usar extensiones cuando:

| Situación | Qué hacer |
|-----------|-----------|
| Cliente es similar a otros | Usar sistema base |
| Solo necesita ajustes menores | Usar overrides en config |
| Diferencia es solo visual | Usar brand DNA |
| Es una preferencia temporal | Documentar en notas |

---

## Estructura de Extensiones

```
clients/[client-slug]/
├── 01-research/
├── 02-strategy/
├── 03-creative/
├── 04-assets/
├── 05-deliverables/
│
├── _extensions/                    ← CARPETA DE EXTENSIONES
│   ├── agents/                     # Agentes custom
│   │   └── my-custom-agent.md
│   ├── templates/                  # Templates custom
│   │   └── my-custom-template.md
│   ├── knowledge/                  # Knowledge específico
│   │   └── industry-insights.md
│   └── README.md                   # Documentación de extensiones
│
├── client_config.yaml              ← CONFIGURACIÓN
├── client_memory_profile.md
└── README.md
```

---

## client_config.yaml

El archivo de configuración controla todo el comportamiento específico:

### Estructura Completa

```yaml
# INFORMACIÓN BÁSICA
client:
  slug: "client-slug"
  name: "Client Name"
  industry: "Industry"
  status: "active"
  created: "YYYY-MM-DD"

# EXTENSIONES ACTIVAS
extensions:
  agents:
    - agent-name.md              # Lista de agentes custom
  templates:
    - template-name.md           # Lista de templates custom
  knowledge:
    - knowledge-file.md          # Lista de knowledge custom

# OVERRIDES DE COMPORTAMIENTO
overrides:
  content:
    default_length: "short"      # short | medium | long
    primary_format: "reels"      # reels | youtube | carousel
    language: "bilingual"        # spanish | english | bilingual
  
  platforms:
    priority:
      - "instagram"
      - "tiktok"
      - "youtube"
  
  tone:
    override: false
    description: ""
  
  frequency:
    posts_per_week: 5
    platforms_per_post: 2

# CARACTERÍSTICAS ESPECIALES
features:
  digital_products: false
  long_form_content: false
  multiple_avatars: false
  professional_video: false
  custom_dashboard: false

# NOTAS
notes: |
  Notas adicionales sobre el cliente...

# METADATA
_meta:
  config_version: "1.0"
  last_updated: "YYYY-MM-DD"
  updated_by: "system"
```

### Ejemplos de Configuración

#### Cliente Estándar (Sin Extensiones)

```yaml
client:
  slug: "restaurante-los-paisas"
  name: "Restaurante Los Paisas"
  industry: "Restaurant - Mexican"
  status: "active"

extensions:
  agents: []          # Sin extensiones
  templates: []
  knowledge: []

overrides:
  content:
    default_length: "short"
    primary_format: "reels"
    language: "bilingual"
```

#### Cliente con Extensiones (AIPRENEUR)

```yaml
client:
  slug: "william-suarez-aipreneur"
  name: "William Suarez - AIPRENEUR"
  industry: "AI Education"
  status: "active"

extensions:
  agents:
    - ai-course-creator.md
  templates:
    - youtube_longform_script.md
  knowledge:
    - ai_education_market_2026.md

overrides:
  content:
    default_length: "long"         # Diferente!
    primary_format: "youtube"      # Diferente!
    language: "bilingual"

features:
  digital_products: true           # Tiene cursos
  long_form_content: true          # Videos largos
```

---

## Crear Extensiones

### 1. Crear Agente Custom

Archivo: `_extensions/agents/my-agent.md`

```markdown
---
name: my-custom-agent
description: |
  Descripción de cuándo usar este agente.
  Incluir ejemplos de uso.
model: sonnet
color: cyan
---

# [Agent Name]

## Identity
[Quién es este agente]

## How You Differ from Base Agent
[Tabla comparativa con agente base]

## Deliverables
[Qué produce este agente]

## Memory Integration
[Cómo usa la memoria MCP]

## Output Format
[Formato de los outputs]
```

### 2. Crear Template Custom

Archivo: `_extensions/templates/my-template.md`

```markdown
# [Template Name]
## [Client Name]

> Descripción del template

---

## METADATA

| Campo | Valor |
|-------|-------|
| **Campo 1** | [Valor] |
| **Campo 2** | [Valor] |

---

## ESTRUCTURA

### Sección 1
[Contenido]

### Sección 2
[Contenido]

---

*Template: [Client] [Type] v1.0*
```

### 3. Crear Knowledge Custom

Archivo: `_extensions/knowledge/my-knowledge.md`

```markdown
# [Knowledge Title]
## Knowledge Base: [client-slug]

> Descripción del conocimiento

**Last Updated:** YYYY-MM-DD
**Source:** [Fuentes]

---

## Executive Summary
[Resumen ejecutivo]

## Key Insights
[Insights principales]

## Application
[Cómo aplicar este conocimiento]

---

*Knowledge file: [client-slug] - Updated [Date]*
```

---

## Flujo de Carga

Cuando se trabaja con un cliente:

```
1. Usuario: "Crea contenido para william-suarez-aipreneur"

2. Sistema detecta cliente → Lee client_config.yaml

3. Carga agentes BASE:
   /.claude/agents/creative-director.md
   /.claude/agents/content-strategist.md
   ... (todos los 8 agentes)

4. Verifica extensiones en config:
   extensions.agents: ["ai-course-creator.md"]
   
5. Carga extensiones:
   clients/william-suarez-aipreneur/_extensions/agents/ai-course-creator.md

6. Aplica overrides:
   - default_length: "long" (no "short")
   - primary_format: "youtube" (no "reels")

7. Ejecuta workflow con contexto extendido
```

---

## Mejores Prácticas

### DO ✅

1. **Documenta por qué** - Siempre explica por qué existe cada extensión
2. **Mantén simple** - Solo lo necesario, no sobre-ingeniería
3. **Reutiliza patterns** - Si una extensión funciona, puede ser template
4. **Actualiza config** - Siempre agregar extensiones a client_config.yaml
5. **Testea primero** - Verificar que la extensión funciona antes de depender de ella

### DON'T ❌

1. **No dupliques core** - Si algo debería ser para todos, va al core
2. **No crees sin necesidad** - Solo si realmente es diferente
3. **No olvides documentar** - Extensiones sin docs se vuelven confusas
4. **No mezcles clientes** - Cada extensión es para UN cliente
5. **No ignores memoria** - Las extensiones deben usar MCP memory igual que core

---

## Troubleshooting

| Problema | Solución |
|----------|----------|
| Extensión no se carga | Verificar que está en client_config.yaml |
| Agente no reconocido | Verificar nombre exacto del archivo |
| Override no aplica | Verificar sintaxis YAML |
| Conflicto con core | Extensión sobrescribe core con mismo nombre |

---

## Ejemplos Reales

### AIPRENEUR Extensions

```
clients/william-suarez-aipreneur/_extensions/
├── agents/
│   └── ai-course-creator.md       # Agente para contenido educativo
├── templates/
│   └── youtube_longform_script.md # Template para videos largos
├── knowledge/
│   └── ai_education_market_2026.md # Inteligencia de mercado AI
└── README.md
```

**Por qué existe:** Cliente de educación AI necesita contenido long-form, tutoriales técnicos, y conocimiento específico del mercado de cursos.

---

## Migración de Clientes

Si un cliente estándar necesita extensiones después:

1. Crear carpeta `_extensions/` con subcarpetas
2. Crear `client_config.yaml` desde template
3. Desarrollar extensiones necesarias
4. Activar en config
5. Testear workflow completo

---

## Versionado

- **Config version:** 1.0
- **Extension format:** 1.0
- **Compatible con:** SimplicityAgents v3.0+

---

*Guía del Sistema Híbrido - SimplicityAgents v3*




