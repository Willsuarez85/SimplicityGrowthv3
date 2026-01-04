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

# Generate image (best models)
mcp__fal-ai__ideogram_v3     # Text/diagrams
mcp__fal-ai__flux_dev        # Fast iteration
mcp__fal-ai__imagen4         # Hero images

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

### Best Model by Use Case

| Use Case | Model | Command |
|----------|-------|---------|
| Text/diagrams/graphics | Ideogram v3 | `mcp__fal-ai__ideogram_v3` |
| Fast iteration | FLUX Dev | `mcp__fal-ai__flux_dev` |
| Hero images | Imagen 4 | `mcp__fal-ai__imagen4` |
| Premium 4K | Nano Banana Pro | `mcp__fal-ai__nano_banana_pro` |
| Video from text | Veo 3 | `mcp__fal-ai__veo3` |
| Video from image | Kling Master | `mcp__fal-ai__kling_master_image` |

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

**Status:** ~70% complete (Phases 1-3 DONE)
- 8 agents in `/.claude/agents/`
- 24+ templates in `/templates/`
- 4 workflow guides in `docs/workflows/`

**Next:** Phase 4 (Test client workflow), Phase 5 (Documentation)

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
