# Client Folder Template

This is the standard folder structure for all Simplicity Growth Marketing clients.

## How to Use

1. Copy this entire `_template` folder
2. Rename to client name (lowercase, hyphens): `los-paisas`, `remax-charlotte`
3. Update `client_config.yaml` with client information
4. Begin work following the phase sequence

## Folder Structure

```
[client-name]/
├── 01-research/
│   ├── brand-audit/        → Client's current brand analysis
│   ├── competitor-analysis/ → Market & competitor intelligence
│   └── trend-research/      → Platform trends & patterns
│
├── 02-strategy/
│   ├── brand-dna/          → Brand identity documents
│   └── content-strategy/    → Content pillars & calendars
│
├── 03-creative/
│   ├── storyboards/        → Visual storyboards
│   ├── scripts/            → Video/audio scripts
│   └── prompts/            → AI generation prompts
│
├── 04-assets/
│   ├── images/             → Generated/collected images
│   ├── videos/             → Video files & clips
│   └── references/         → Visual references & mood boards
│
├── 05-deliverables/
│   ├── presentations/      → Client presentations & PDFs
│   └── handoff-packages/   → Editor & production handoffs
│
├── _extensions/            → 🆕 CLIENT-SPECIFIC EXTENSIONS
│   ├── agents/             → Custom agents for this client
│   ├── templates/          → Custom templates
│   └── knowledge/          → Industry-specific knowledge
│
├── client_config.yaml      → 🆕 Client configuration
├── client_memory_profile.md → Memory entity tracking
└── README.md               → This file
```

## Workflow Sequence

1. **Research Phase** (01-research)
   - Run `market-competitor-analyst`
   - Run `trends-platform-analyst`
   - Complete brand audit

2. **Strategy Phase** (02-strategy)
   - Run `brand-dna-architect`
   - Run `content-strategist`

3. **Creative Phase** (03-creative)
   - Run `creative-director`
   - Run `prompt-asset-engineer`

4. **Delivery Phase** (04-assets, 05-deliverables)
   - Run `client-file-architect`
   - Run `delivery-documentation-manager`

## File Naming

```
[client]_[type]_[description]_[version].[ext]

Examples:
lospaisas_research_competitor-analysis_v1.md
lospaisas_brand_dna-document_v1.md
lospaisas_content_calendar-q1_v1.md
```

---

## 🆕 Sistema Híbrido: Extensiones

### ¿Cuándo usar extensiones?

| Cliente | ¿Necesita extensiones? |
|---------|------------------------|
| Restaurante típico | ❌ No - usar sistema base |
| Realtor estándar | ❌ No - usar sistema base |
| Creador de cursos AI | ✅ Sí - necesita agentes custom |
| E-commerce complejo | ✅ Sí - necesita templates específicos |

### Cómo agregar extensiones

1. **Agente Custom:**
   ```
   _extensions/agents/my-custom-agent.md
   ```

2. **Template Custom:**
   ```
   _extensions/templates/my-template.md
   ```

3. **Knowledge Custom:**
   ```
   _extensions/knowledge/industry-insights.md
   ```

4. **Activar en config:**
   ```yaml
   # client_config.yaml
   extensions:
     agents:
       - my-custom-agent.md
   ```

### Flujo de carga

```
1. Sistema carga agentes BASE (/.claude/agents/)
2. Sistema lee client_config.yaml
3. Si hay extensiones → las carga y combina
4. Agente ejecuta con contexto extendido
```

---

## Client Configuration

El archivo `client_config.yaml` controla:

- **Información básica:** slug, nombre, industria
- **Extensiones activas:** qué custom agents/templates usar
- **Overrides:** longitud de contenido, plataformas prioritarias
- **Features especiales:** productos digitales, long-form, etc.

### Ejemplo mínimo:

```yaml
client:
  slug: "mi-cliente"
  name: "Mi Cliente"
  industry: "Restaurant"
  status: "active"

extensions:
  agents: []      # Sin extensiones
  templates: []
  knowledge: []

overrides:
  content:
    default_length: "short"
    language: "bilingual"
```

---

*SimplicityAgents v3 - Hybrid System*
