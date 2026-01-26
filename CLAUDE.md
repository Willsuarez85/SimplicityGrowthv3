# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

> **Project:** Multi-Agent AI System for Growth Marketing Operations
> **Agency:** Simplicity Growth Marketing
> **Version:** 3.0

---

## Quick Commands

```bash
# Check if client exists in memory
mcp__memory__search_nodes("[client-slug]")

# Get full brand context
mcp__memory__open_nodes(["[client-slug]-brand", "[client-slug]-voice", "[client-slug]-visual"])

# Create new client folder
mkdir -p clients/[name]/{01-research/{brand-audit,competitor-analysis,trend-research},02-strategy/{brand-dna,content-strategy},03-creative/{storyboards,scripts,prompts},04-assets/{images,videos,references},05-deliverables/{presentations,handoff-packages}}

# Generate image (DEFAULT: Nano Banana Pro via execute_custom_model)
mcp__fal-ai__execute_custom_model endpoint="fal-ai/nano-banana"  # 🔥 DEFAULT
mcp__fal-ai__ideogram_v3     # Fallback for text-heavy graphics
mcp__fal-ai__flux_dev        # Fallback for fast iteration

# Run Simplicity Viewer (visual client dashboard)
cd simplicity-viewer && npm run dev  # http://localhost:3000
```

---

## Agent Quick Reference

| Keyword | Agent | Use For |
|---------|-------|---------|
| competitors, market, gaps | `market-competitor-analyst` | External market intelligence |
| trending, viral, hooks | `trends-platform-analyst` | Platform trends & patterns |
| brand, voice, avatars | `brand-dna-architect` | Brand identity & DNA |
| pillars, calendar, briefs | `content-strategist` | Content strategy |
| storyboard, script, reel | `creative-director` | Creative execution |
| prompts, fal.ai, keyframes | `prompt-asset-engineer` | AI asset generation |
| folders, organize | `client-file-architect` | File structure |
| deliver, handoff, PDF | `delivery-documentation-manager` | Final delivery |

---

## 🎯 Anthropic Skills (Installed)

**Location:** `.claude/anthropic-skills/skills/`

### Installation
```bash
# Already installed locally. To activate via plugin marketplace:
/plugin marketplace add anthropics/skills
/plugin install example-skills@anthropic-agent-skills
/plugin install document-skills@anthropic-agent-skills

# Or use directly by mentioning:
"Usa brand-voice para..."
"Usa content-atomizer para..."
```

### Marketing & Content Skills (Top Priority)

| Skill | Trigger Words | Use For | Works With Agent |
|-------|---------------|---------|------------------|
| **brand-voice** | voice, tone, brand personality | Extract/build voice profiles | `brand-dna-architect` |
| **positioning-angles** | positioning, angles, hook, why isn't selling | Find 3-5 selling angles | `content-strategist` |
| **direct-response-copy** | copy, landing page, sales copy | Conversion-focused writing | `creative-director` |
| **content-atomizer** | atomize, distribute, multi-platform | 1 content → 10+ platform assets | All agents |
| **lead-magnet** | lead magnet, opt-in, freebie | Create lead magnets that convert | `content-strategist` |
| **email-sequences** | email sequence, nurture, drip | Design email automation | `content-strategist` |
| **newsletter** | newsletter, email content | Create engaging newsletters | `content-strategist` |
| **landing-page** | landing page, conversion page | Build landing page structure | `creative-director` |
| **keyword-research** | keywords, SEO research | SEO keyword strategy | `trends-platform-analyst` |
| **seo-content** | SEO content, blog post | SEO-optimized content | `content-strategist` |
| **orchestrator** | complex project, multiple skills | Coordinate multi-skill workflows | Project management |

### Document Skills (Production)

| Skill | Format | Use For |
|-------|--------|---------|
| **docx** | .docx | Word documents (create/edit/track changes) |
| **pdf** | .pdf | PDF manipulation (extract/merge/split/forms) |
| **pptx** | .pptx | PowerPoint presentations |
| **xlsx** | .xlsx | Excel spreadsheets with formulas |

### Creative & Design Skills

| Skill | Use For |
|-------|---------|
| **algorithmic-art** | Generative art with p5.js |
| **canvas-design** | Visual posters and static designs |
| **frontend-design** | High-quality web interfaces |
| **slack-gif-creator** | Animated GIFs for Slack |
| **theme-factory** | Visual theme systems |

### Development & Technical Skills

| Skill | Use For |
|-------|---------|
| **mcp-builder** | Create MCP servers (Python/TypeScript) |
| **skill-creator** | Build custom skills |
| **web-artifacts-builder** | Complex React + Tailwind artifacts |
| **webapp-testing** | Playwright testing |
| **doc-coauthoring** | Technical documentation workflow |

### Enterprise & Communication Skills

| Skill | Use For |
|-------|---------|
| **internal-comms** | Corporate internal communications |
| **brand-guidelines** | Apply Anthropic brand standards |

### Skill + Agent Integration Patterns

```bash
# Pattern 1: Voice Profile Creation
1. brand-intelligence-analyst (research)
2. brand-voice skill (extract voice)
3. brand-dna-architect (integrate into DNA)

# Pattern 2: Content Campaign
1. positioning-angles skill (find angles)
2. content-strategist (strategy + pillars)
3. direct-response-copy skill (write copy)
4. content-atomizer skill (10x distribution)
5. creative-director (final storyboards)

# Pattern 3: Lead Generation
1. lead-magnet skill (create offer)
2. landing-page skill (conversion page)
3. email-sequences skill (nurture flow)
4. creative-director (design assets)

# Pattern 4: Quick Content
1. content-atomizer skill (atomize existing)
2. prompt-asset-engineer (generate assets)
3. delivery-documentation-manager (package)
```

### Usage Examples

```bash
# Extract voice from existing content
"Usa brand-voice en modo Extract. Analiza estos 5 posts
de La Única y crea un voice profile completo."

# Find positioning angles
"Usa positioning-angles para encontrar 5 ángulos
de posicionamiento para [cliente]."

# Write conversion copy
"Usa direct-response-copy con el voice profile de [cliente]
para escribir landing page copy."

# Atomize content for multi-platform
"Usa content-atomizer para convertir este post en
assets para Instagram, TikTok, LinkedIn y Twitter."

# Create lead magnet
"Usa lead-magnet para crear un PDF descargable
sobre [topic] para [audience]."

# Design landing page
"Usa landing-page para estructurar una página
de conversión para [producto/servicio]."
```

### When to Use Skills vs Agents

| Scenario | Use | Reason |
|----------|-----|--------|
| Voice profile from content | **brand-voice skill** | Specialized extraction patterns |
| Brand identity synthesis | **brand-dna-architect agent** | Multi-source synthesis + memory |
| Finding angles | **positioning-angles skill** | Angle frameworks library |
| Content strategy | **content-strategist agent** | Strategic planning + context |
| Writing copy | **direct-response-copy skill** | Copywriting frameworks |
| Creative execution | **creative-director agent** | Video-specific storyboards |
| Multi-platform atomization | **content-atomizer skill** | Platform templates |
| AI prompt generation | **prompt-asset-engineer agent** | fal.ai integration |

**Rule of Thumb:**
- Skills = Specialized frameworks & templates
- Agents = Strategic thinking & synthesis + memory integration

---

## Workflow Triggers

| User Says | Workflow | Sequence |
|-----------|----------|----------|
| "New client: X" | Onboarding | file-architect → market → trends → brand-dna |
| "Content for X" | Campaign | trends → strategy → creative → prompts → delivery |
| "Refresh brand for X" | Refresh | market → brand-dna → strategy → delivery |
| "Quick reel for X" | Quick | creative → prompts → delivery |

**Before any workflow:** Check if Brand DNA exists: `mcp__memory__search_nodes("[client-slug]-brand")`

---

## Memory System

### Check Client Exists
```javascript
// ALWAYS run first for any client work
mcp__memory__search_nodes("[client-slug]")

// If empty → Run New Client Onboarding workflow
// If exists → Proceed with requested work
```

### Entity Types & Naming

| Entity | Pattern | Agent |
|--------|---------|-------|
| Client | `[slug]` | client-file-architect |
| Brand | `[slug]-brand` | brand-dna-architect |
| Voice | `[slug]-voice` | brand-dna-architect |
| Visual | `[slug]-visual` | brand-dna-architect |
| Avatar | `[slug]-avatar-[role]` | brand-dna-architect |
| Competitor | `[slug]-competitor-[name]` | market-competitor-analyst |
| Gaps | `[slug]-market-gaps` | market-competitor-analyst |
| Trends | `[slug]-trends-[platform]` | trends-platform-analyst |
| Hooks | `[slug]-hooks` | trends-platform-analyst |

**Client slug:** lowercase, hyphens, no special chars (e.g., "Taqueria El Sol" → `taqueria-el-sol`)

---

## fal.ai Quick Reference

### 🔥 MODELO PREDETERMINADO: Nano Banana Pro

**SIEMPRE usar Nano Banana Pro para generación de imágenes a menos que se especifique otro modelo.**

Nano Banana Pro ofrece calidad premium 4K y requiere `execute_custom_model`:

```bash
# Comando por defecto para CUALQUIER imagen
mcp__fal-ai__execute_custom_model
  endpoint: "fal-ai/nano-banana"
  input_params: {"prompt": "[tu prompt]", "image_size": "portrait_4_3"}
  category_hint: "image"
```

### Modelos por Caso de Uso

| Prioridad | Use Case | Model | Método |
|-----------|----------|-------|--------|
| 🥇 DEFAULT | **Todas las imágenes** | Nano Banana Pro | `execute_custom_model` endpoint: `fal-ai/nano-banana` |
| 🥈 Fallback | Text-heavy graphics | Ideogram v3 | `mcp__fal-ai__ideogram_v3` |
| 🥉 Fallback | Fast iteration | FLUX Dev | `mcp__fal-ai__flux_dev` |
| Opcional | Photorealistic | Imagen 4 | `mcp__fal-ai__imagen4` |
| Video | Text to video | Veo 3 | `mcp__fal-ai__veo3` |
| Video | Image to video | Kling Master | `mcp__fal-ai__kling_master_image` |

### Protocolo de Generación de Imágenes

```bash
# Paso 1: SIEMPRE intentar primero con Nano Banana Pro
mcp__fal-ai__execute_custom_model({
  "endpoint": "fal-ai/nano-banana",
  "input_params": {"prompt": "...", "image_size": "portrait_4_3"},
  "category_hint": "image"
})

# Paso 2: Si falla, usar Ideogram v3 (mejor para texto)
mcp__fal-ai__ideogram_v3

# Paso 3: Si falla, usar FLUX Dev (más estable)
mcp__fal-ai__flux_dev
```

Assets auto-save to `/generated-assets/`

---

## File Conventions

### Naming
```
[client]_[type]_[description]_[version].[ext]

Examples:
lospaisas_brand_dna-document_v1.md
lospaisas_creative_storyboard-promo1_v1.md
```

### Folder Structure
```
clients/[client-name]/
├── 01-research/          # Audits, competitor analysis, trends
├── 02-strategy/          # Brand DNA, content strategy
├── 03-creative/          # Storyboards, scripts, prompts
├── 04-assets/            # Generated images, videos, references
├── 05-deliverables/      # PDFs, handoffs, presentations
├── _extensions/          # 🆕 Client-specific extensions (hybrid system)
│   ├── agents/           # Custom agents
│   ├── templates/        # Custom templates
│   └── knowledge/        # Industry-specific knowledge
└── client_config.yaml    # 🆕 Client configuration
```

---

## 🆕 Hybrid System: Client Extensions

### Protocol: Loading Extensions

**Before executing any workflow for a client:**

```bash
# Step 1: Check for client config
if exists clients/[client]/client_config.yaml:
    read client_config.yaml
    
# Step 2: Load base agents
load /.claude/agents/*.md

# Step 3: Check for extensions
if client_config.extensions.agents is not empty:
    load clients/[client]/_extensions/agents/*.md
    
# Step 4: Apply overrides
if client_config.overrides exists:
    apply content_length, platform_priority, tone overrides
```

### When to Use Extensions

| Client Type | Use Extensions? |
|-------------|-----------------|
| Standard restaurant | ❌ No - use base system |
| Standard realtor | ❌ No - use base system |
| AI course creator | ✅ Yes - needs custom agents |
| E-commerce complex | ✅ Yes - needs custom templates |
| Enterprise client | ✅ Yes - needs custom everything |

### Creating Custom Agents

Place in `clients/[client]/_extensions/agents/`:

```markdown
---
name: custom-agent-name
description: When to use this agent
model: sonnet
color: orange
---

[Agent instructions...]

## Integration with Base System
This agent extends the base creative-director by adding...

## Memory Query Protocol
[Standard memory queries...]
```

### Activating Extensions

In `client_config.yaml`:

```yaml
extensions:
  agents:
    - ai-course-creator.md
    - youtube-strategist.md
  templates:
    - youtube_script_template.md
  knowledge:
    - ai_education_trends.md
```

### Override Examples

```yaml
# For long-form content client (William Suarez)
overrides:
  content:
    default_length: "long"        # 8-15 min videos
    primary_format: "youtube"
  platforms:
    priority:
      - "youtube"
      - "instagram"
      - "tiktok"
```

---

## Routing Decision Tree

```
User Request
    │
    ├─► COMPETITORS/MARKET? ──────► market-competitor-analyst
    ├─► TRENDS/WHAT'S WORKING? ───► trends-platform-analyst
    ├─► BRAND/VOICE/AVATARS? ─────► brand-dna-architect
    ├─► CONTENT STRATEGY? ────────► content-strategist
    ├─► CREATIVE/SCRIPTS? ────────► creative-director
    ├─► AI PROMPTS/ASSETS? ───────► prompt-asset-engineer
    ├─► FILE ORGANIZATION? ───────► client-file-architect
    └─► DELIVERY/HANDOFF? ────────► delivery-documentation-manager
```

### Agent Prerequisites

| Agent | Requires First |
|-------|----------------|
| brand-dna-architect | Research (market + trends) |
| content-strategist | Brand DNA |
| creative-director | Brand DNA + Strategy |
| prompt-asset-engineer | Creative direction |
| delivery-documentation-manager | All work complete |

---

## Common Operations

### Start New Client
```bash
1. mcp__memory__search_nodes("[client-slug]")  # Check if exists
2. mkdir -p clients/[name]/{01-research/...,05-deliverables/...}
3. Run: market-competitor-analyst → trends-platform-analyst → brand-dna-architect
```

### Content Campaign (Existing Client)
```bash
1. mcp__memory__open_nodes(["[slug]-brand", "[slug]-voice"])  # Load context
2. Run: trends-platform-analyst → content-strategist → creative-director
```

### Generate Assets
```bash
1. mcp__memory__open_nodes(["[slug]-visual", "[slug]-avatar-educator"])
2. Use visual identity for prompt styling
3. mcp__fal-ai__[model] with brand-aligned prompt
```

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Memory returns empty | Run brand-dna-architect first to populate entities |
| Agent missing context | Check prerequisites - run required agents first |
| fal.ai fails | Check model name, try `list_available_models` |
| Wrong agent selected | Match keywords: "competitors" vs "trends" vs "brand" |

---

## Session Continuity

1. Read `CHANGELOG.md` for current project state
2. Check "Quick Context for Claude Code" section
3. Update `CHANGELOG.md` after completing tasks

**Status:** ~90% complete (Phases 1-5 DONE)
- 8 agents in `/.claude/agents/`
- 24+ templates in `/templates/`
- 4 workflow guides in `docs/workflows/`
- Hybrid System implementado
- Simplicity Viewer (dashboard) funcional
- 2 clientes activos con Brand DNA completo

**Next:** Phase 5 (Final Documentation), Phase 6 (Content Strategy campaigns)

---

## Active Clients Status

### La Única Supermarket Internacional
| Campo | Estado |
|-------|--------|
| **Slug** | `la-unica-supermarket` |
| **Ubicación** | Independence Ave, Charlotte, NC |
| **Industria** | Retail - Mexican Supermarket |
| **Tagline** | "Todo lo tradicional de México en un solo lugar" |
| **Big Idea** | Corazón de las Carolinas |

**Onboarding Progress:**
| Fase | Status | Archivos |
|------|--------|----------|
| 1. Folder Structure | ✅ Completo | `client_config.yaml`, `client_index.md` |
| 2. Brand Audit | ✅ Completo | 8 archivos en `01-research/brand-audit/` |
| 3. Competitor Analysis | ✅ Completo | 7 archivos en `01-research/competitor-analysis/` |
| 4. Trend Research | ✅ Completo | 7 archivos en `01-research/trend-research/` |
| 5. Brand DNA Synthesis | ✅ Completo | 3 archivos en `02-strategy/brand-dna/` |
| 6. Memory Storage | ✅ Completo | 4 entidades + 5 relaciones en memoria |

**Archivos Brand DNA creados:**
- `brand_dna_document.md` - Documento principal con Big Idea, archetypes, pillars
- `voice_and_tone.md` - Guía completa de voz y tono bilingüe
- `visual_identity.md` - Especificaciones visuales, colores, tipografía

**Entidades en memoria:**
```bash
mcp__memory__open_nodes([
  "la-unica-supermarket",        # Client
  "la-unica-supermarket-brand",  # Brand DNA
  "la-unica-supermarket-voice",  # Voice & Tone
  "la-unica-supermarket-visual"  # Visual Identity
])
```

**Datos clave del cliente:**
- Ventas: $2,286,952
- Margen bruto: 46.62%
- Departamento estrella: Carnicería (+16.7% growth)
- 6 departamentos: Taquería, Produce, Tortillería, Carnicería, Panadería, Supermercado
- Visual distintivo: Patrón cuadros rojos/blancos (mantel tradicional)

### William Suarez AIPreneur
| Campo | Estado |
|-------|--------|
| **Slug** | `william-suarez-aipreneur` |
| **Status** | ✅ Brand DNA completo, extensiones activas |
| **Tipo** | Long-form YouTube content creator |
| **Extensiones** | `ai-course-creator.md`, custom templates |

---

## Git

**Repo:** `https://github.com/Willsuarez85/SimplicityGrowthv3.git`

```bash
# Commit convention
[type]: Brief description
# Types: feat, fix, docs, refactor, chore
```

---

## The 7 Rules

1. Nothing created without research
2. Nothing produced without a brief
3. Nothing scales without systems
4. Everything must be documented
5. Everything must be repeatable
6. Strategy leads, creativity executes
7. AI amplifies, it does not improvise

---

## Key Documentation

| Doc | Purpose | Location |
|-----|---------|----------|
| Memory Architecture | Entity types, lifecycle, queries | `docs/memory-architecture.md` |
| fal.ai Integration | All 21+ models, examples | `docs/fal-ai-integration.md` |
| Workflow Guides | Step-by-step agent sequences | `docs/workflows/` |
| Templates | All deliverable templates | `/templates/` |

---

*Simplicity Growth Marketing AI Agent System v3.0*
