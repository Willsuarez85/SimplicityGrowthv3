# CLAUDE.md - Simplicity Growth Marketing AI Agent System

> **Project:** Multi-Agent AI System for Growth Marketing Operations
> **Agency:** Simplicity Growth Marketing
> **Version:** 3.0

---

## Quick Reference

```
/agents                     → List all available agents
/agents:<agent-name>        → Launch specific agent
```

**Available Agents:**
- `market-competitor-analyst` - External market & competitor intelligence
- `trends-platform-analyst` - TikTok, YouTube, Instagram trend analysis
- `brand-dna-architect` - Brand identity & DNA development
- `content-strategist` - Content pillars, calendars, strategy
- `creative-director` - Storyboards, scripts, creative direction
- `prompt-asset-engineer` - AI prompts, keyframes, visual assets
- `client-file-architect` - File structure & organization
- `delivery-documentation-manager` - Final deliverables & handoff

---

## Agent Routing Rules

Use these rules to determine which agent to invoke based on the user's prompt. Route to the FIRST matching agent based on keyword patterns and context.

### Quick Decision Tree

```
User Request
    │
    ├─► About COMPETITORS or MARKET? ──────► market-competitor-analyst
    │   (what competitors do, market gaps, positioning landscape)
    │
    ├─► About TRENDS or WHAT'S WORKING? ───► trends-platform-analyst
    │   (TikTok/YouTube/Reels trends, hooks, formats, viral patterns)
    │
    ├─► About BRAND IDENTITY or DNA? ──────► brand-dna-architect
    │   (voice, tone, personality, avatars, brand values)
    │
    ├─► About CONTENT STRATEGY? ───────────► content-strategist
    │   (pillars, calendars, angles, content ideas, briefs)
    │
    ├─► About CREATIVE EXECUTION? ─────────► creative-director
    │   (storyboards, scripts, hooks, reels, ads, carousels)
    │
    ├─► About AI PROMPTS or ASSETS? ───────► prompt-asset-engineer
    │   (image prompts, video prompts, keyframes, fal.ai, FLUX, Veo3)
    │
    ├─► About FILE ORGANIZATION? ──────────► client-file-architect
    │   (folder structure, file naming, document organization)
    │
    └─► About DELIVERY or HANDOFF? ────────► delivery-documentation-manager
        (PDFs, Notion, client packages, editor handoffs)
```

### Detailed Routing by Prompt Keywords

#### `market-competitor-analyst`
**Trigger when user asks about:**
- Competitors, competition, competitive landscape
- What others are doing in the market
- Market analysis, market research, market gaps
- Competitor social media, competitor content
- Positioning opportunities, differentiation
- Industry benchmarks, market leaders
- "What are [competitors] doing?"
- "Analyze the market for..."
- "Who are we competing against?"

**DO NOT use for:** Client's own brand analysis, trend research, strategy recommendations

---

#### `trends-platform-analyst`
**Trigger when user asks about:**
- What's trending, what's working now
- TikTok trends, YouTube trends, Reels trends
- Viral content, viral formats, viral hooks
- Platform patterns, algorithm behavior
- Hook styles, title patterns, thumbnail trends
- "What's performing well on [platform]?"
- "What content formats are working?"
- "Show me current trends in [industry]"

**DO NOT use for:** Client brand analysis, competitor deep-dives, strategy creation

---

#### `brand-dna-architect`
**Trigger when user asks about:**
- Brand identity, brand DNA, brand personality
- Tone of voice, voice guidelines
- Brand values, brand purpose, brand promise
- AI avatars, content creator personas
- Visual identity direction
- "Build the brand for..."
- "Define the voice for..."
- "Create avatars for..."
- "What should the brand feel like?"

**Prerequisites:** Research phase should be complete (market + trends)

**DO NOT use for:** Content calendars, scripts, file organization

---

#### `content-strategist`
**Trigger when user asks about:**
- Content strategy, content pillars
- Content calendar, posting schedule
- Content ideas, content angles
- Content briefs, creative briefs
- "What should [client] post about?"
- "Build a content calendar for..."
- "What content angles work for..."
- "Create briefs for the creative team"

**Prerequisites:** Brand DNA should be complete

**DO NOT use for:** Writing actual scripts, creating storyboards, designing visuals

---

#### `creative-director`
**Trigger when user asks about:**
- Storyboards, scripts, creative direction
- Reels content, Stories content, ad creative
- Hooks, openers, attention-grabbers
- Carousels, slide sequences
- Video structure, scene breakdowns
- "Write a script for..."
- "Create a storyboard for..."
- "Design the reel for..."
- "What should the ad look like?"

**Prerequisites:** Content strategy and brand DNA should be complete

**DO NOT use for:** AI prompt generation, file organization, delivery

---

#### `prompt-asset-engineer`
**Trigger when user asks about:**
- AI prompts, image prompts, video prompts
- fal.ai generation, FLUX prompts, Imagen4, Veo3, Kling
- Keyframes, scene definitions
- Asset preparation, editor handoff assets
- Prompt library, prompt optimization
- "Create prompts for..."
- "Generate the images for..."
- "Prepare the assets for..."
- "Build keyframes for the video"

**Prerequisites:** Creative direction should be complete (storyboards/scripts exist)

**DO NOT use for:** Writing scripts, strategy work, client delivery

---

#### `client-file-architect`
**Trigger when user asks about:**
- Folder structure, file organization
- Setting up a new client, initializing folders
- Document versioning, file naming
- Organizing files, cleaning up folders
- "Set up folders for [client]"
- "Organize the files for..."
- "Create the folder structure"
- "Where should this document go?"

**DO NOT use for:** Creating content, strategy work, deliverable creation

---

#### `delivery-documentation-manager`
**Trigger when user asks about:**
- Delivering to client, client handoff
- Creating PDFs, Notion pages
- Packaging deliverables, final packages
- Editor handoff, production handoff
- "Deliver the brand package to..."
- "Prepare everything for the client"
- "Package this for delivery"
- "Send the handoff to the editor"

**Prerequisites:** Work from other agents should be complete

**DO NOT use for:** Creating new content, strategy work, research

---

### Routing by Project Phase

| Phase | Primary Agent | Secondary Agent |
|-------|---------------|-----------------|
| **New client (no research)** | market-competitor-analyst | trends-platform-analyst |
| **Research complete, need identity** | brand-dna-architect | - |
| **Brand ready, need content plan** | content-strategist | - |
| **Strategy ready, need creative** | creative-director | - |
| **Creative ready, need AI assets** | prompt-asset-engineer | - |
| **Assets ready, need organization** | client-file-architect | - |
| **Everything ready, need delivery** | delivery-documentation-manager | - |

### Multi-Agent Sequences

**Full new client onboarding:**
```
market-competitor-analyst → trends-platform-analyst → brand-dna-architect → client-file-architect
```

**Content campaign (brand exists):**
```
trends-platform-analyst → content-strategist → creative-director → prompt-asset-engineer → delivery-documentation-manager
```

**Quick creative request (strategy exists):**
```
creative-director → prompt-asset-engineer → delivery-documentation-manager
```

### Ambiguous Request Resolution

When the request could match multiple agents:

1. **"Help with content"** → Ask: Is this strategy (content-strategist) or execution (creative-director)?
2. **"Research the market"** → Default: market-competitor-analyst (competitors, not trends)
3. **"What's working?"** → Default: trends-platform-analyst (platform patterns)
4. **"Build the brand"** → Default: brand-dna-architect (identity, not content)
5. **"Prepare for delivery"** → Default: delivery-documentation-manager (final handoff)

---

## Automatic Workflow Triggers

The system recognizes natural language patterns and automatically initiates the corresponding workflow sequence. When a trigger is detected, confirm with the user before proceeding.

### New Client Onboarding

**Triggers:**
- "New client: [name]"
- "Onboard [name]"
- "Set up [name] as a new client"
- "Start working with [name]"
- "I have a new client called [name]"

**Automatic Sequence:**
```
1. client-file-architect      → Folder setup & memory profile
2. market-competitor-analyst  → Competitive intelligence
3. trends-platform-analyst    → Platform trends
4. brand-dna-architect        → Brand development & memory population
```

**Prerequisites:** Client name, industry, location

**Guide:** `docs/workflows/new-client-onboarding.md`

---

### Content Campaign

**Triggers:**
- "Content campaign for [client]"
- "Create content for [client]"
- "[N] pieces for [client]"
- "Monthly content for [client]"
- "Content batch for [client]"

**Automatic Sequence:**
```
1. trends-platform-analyst         → Refresh trends (if >30 days old)
2. content-strategist              → Pillars, calendar, briefs
3. creative-director               → Storyboards, scripts
4. prompt-asset-engineer           → AI prompts, keyframes
5. delivery-documentation-manager  → Editor handoff
```

**Prerequisites:** Brand DNA must exist in memory

**Guide:** `docs/workflows/content-campaign.md`

---

### Brand Refresh

**Triggers:**
- "Refresh brand for [client]"
- "Update [client] brand"
- "Rebrand [client]"
- "[Client] needs brand update"

**Automatic Sequence:**
```
1. market-competitor-analyst       → Updated competitive landscape
2. brand-dna-architect             → Revised brand DNA (update, not create)
3. content-strategist              → Revised content pillars
4. delivery-documentation-manager  → Brand refresh presentation
```

**Prerequisites:** Existing client with Brand DNA

**Guide:** `docs/workflows/brand-refresh.md`

---

### Quick Creative

**Triggers:**
- "Create [type] for [client]"
- "Quick [reel/ad/carousel] for [client]"
- "Make a [content type] about [topic]"
- "I need a [reel/ad] for [client]"

**Automatic Sequence:**
```
1. creative-director               → Storyboard + script
2. prompt-asset-engineer           → AI prompts
3. delivery-documentation-manager  → Editor handoff
```

**Prerequisites:** Brand DNA must exist, content type specified

**Guide:** `docs/workflows/quick-creative.md`

---

### Workflow Detection Logic

When a user message matches a workflow trigger:

1. **Confirm the workflow** - "This looks like a [workflow name]. Proceed?"
2. **List the agent sequence** - Show which agents will run
3. **Check prerequisites** - Verify memory entities exist
4. **Ask for missing info** - Request any missing prerequisites
5. **Execute in sequence** - Run agents one by one
6. **Validate at each step** - Confirm outputs before proceeding
7. **Report completion** - Summarize what was created

### Workflow Selection Quick Reference

```
User Request Type                    → Workflow
─────────────────────────────────────────────────
"New client: X"                      → New Client Onboarding
"Content for existing client"        → Content Campaign
"Update/refresh brand"               → Brand Refresh
"Quick single piece"                 → Quick Creative
```

---

## What Is This Project?

This is the **internal AI agent system** for Simplicity Growth Marketing - a multi-agent architecture that operates as a virtual marketing team. Each agent has specialized responsibilities and works together to execute the full growth marketing process.

**Core Principle:** AI amplifies human work - it does not replace strategic thinking.

---

## Agency Overview

**Simplicity Growth Marketing** is a Growth Marketing and Advertising agency helping owner-led local businesses grow with clarity, consistency, and scalability.

### What We Deliver (Not Isolated Deliverables - Growth Systems)

| Phase | Deliverables |
|-------|--------------|
| **Research** | Brand audits, competitor analysis, trend intelligence |
| **Strategy** | Brand DNA, content pillars, campaign frameworks |
| **Creative** | Storyboards, scripts, prompts, visual direction |
| **Production** | Editor-ready packages, asset libraries |
| **Advertising** | Meta Ads, Google Ads, full-funnel campaigns |
| **Delivery** | Executive PDFs, Notion docs, organized handoffs |

---

## Target Clients

### 1. Latino Restaurants & Supermarkets
- Mexican/Latino restaurants, Hispanic supermarkets, family-owned businesses
- **Goals:** Local traffic, sales growth, brand recognition, community presence

### 2. Real Estate & Professional Services
- Realtors, loan officers, real estate teams
- **Goals:** Authority, trust, market education, lead generation

### 3. Home Services & Local Businesses
- Construction, remodeling, home services
- **Goals:** Consistent demand, local positioning, appointment generation

**Common Client Profile:**
- Lack documented brand identity
- Lack strategic clarity
- Lack marketing systems
- Heavily dependent on owner

---

## Agent System Architecture

### Workflow Sequence

```
┌─────────────────────────────────────────────────────────────────┐
│                        RESEARCH PHASE                           │
├─────────────────────────────────────────────────────────────────┤
│  market-competitor-analyst  →  External market intelligence     │
│  trends-platform-analyst    →  Platform trends & patterns       │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                        STRATEGY PHASE                           │
├─────────────────────────────────────────────────────────────────┤
│  brand-dna-architect        →  Brand identity & DNA             │
│  content-strategist         →  Content pillars & calendars      │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                        CREATIVE PHASE                           │
├─────────────────────────────────────────────────────────────────┤
│  creative-director          →  Storyboards, scripts, direction  │
│  prompt-asset-engineer      →  AI prompts & visual assets       │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                        DELIVERY PHASE                           │
├─────────────────────────────────────────────────────────────────┤
│  client-file-architect      →  File organization & structure    │
│  delivery-documentation-mgr →  Final packages & handoff         │
└─────────────────────────────────────────────────────────────────┘
```

### Agent Responsibilities

| Agent | Input | Output | Downstream |
|-------|-------|--------|------------|
| **market-competitor-analyst** | Client brief, market scope | Competitor map, positioning analysis, gaps | brand-dna-architect, content-strategist |
| **trends-platform-analyst** | Industry/niche | Trend reports, hooks, formats, patterns | content-strategist, creative-director |
| **brand-dna-architect** | Research outputs, client info | Brand DNA, voice, personality, avatars | content-strategist, creative-director |
| **content-strategist** | Brand DNA, trends, research | Content pillars, calendars, angles | creative-director |
| **creative-director** | Strategy, brand DNA | Storyboards, scripts, creative briefs | prompt-asset-engineer |
| **prompt-asset-engineer** | Creative briefs, scripts | AI prompts, keyframes, visual refs | delivery-documentation-manager |
| **client-file-architect** | All outputs | Organized folder structure | delivery-documentation-manager |
| **delivery-documentation-manager** | All packages | Final PDFs, Notion, handoff docs | Client |

---

## Folder Structure

```
SimplicityAgents v3/
│
├── .claude/
│   └── agents/                    # Agent definitions
│
├── clients/                       # Client-specific work
│   └── [client-name]/
│       ├── 01-research/
│       │   ├── brand-audit/
│       │   ├── competitor-analysis/
│       │   └── trend-research/
│       ├── 02-strategy/
│       │   ├── brand-dna/
│       │   └── content-strategy/
│       ├── 03-creative/
│       │   ├── storyboards/
│       │   ├── scripts/
│       │   └── prompts/
│       ├── 04-assets/
│       │   ├── images/
│       │   ├── videos/
│       │   └── references/
│       └── 05-deliverables/
│           ├── presentations/
│           └── handoff-packages/
│
├── templates/                     # Reusable templates
│   ├── research/
│   ├── brand/
│   ├── content/
│   ├── creative/
│   └── delivery/
│
├── knowledge-base/                # Agency knowledge & learnings
│   ├── industry-insights/
│   ├── platform-guides/
│   └── best-practices/
│
└── docs/                          # Project documentation
    ├── CLAUDE.md
    ├── simplicity_context.md
    └── workflows/
```

---

## Operating Principles

### The 7 Rules

1. **Nothing is created without research** - Always gather data first
2. **Nothing is produced without a brief** - Document requirements before execution
3. **Nothing scales without systems** - Build repeatable processes
4. **Everything must be documented** - Clear, structured documentation
5. **Everything must be repeatable** - Templates and systems over one-offs
6. **Strategy leads, creativity executes** - Creative follows strategic direction
7. **AI amplifies, it does not improvise** - AI enhances human-defined processes

### Quality Standards

- All claims supported by data or evidence
- No deliverable without context
- No deliverable without structure
- Sources documented for traceability
- Files follow naming conventions
- Ready for immediate downstream use

---

## Common Workflows

### New Client Onboarding
```
1. market-competitor-analyst  → Competitive landscape
2. trends-platform-analyst    → Current platform trends
3. brand-dna-architect        → Brand identity package
4. client-file-architect      → Set up client folder structure
```

### Content Campaign
```
1. trends-platform-analyst    → What's working now
2. content-strategist         → Content calendar & pillars
3. creative-director          → Scripts & storyboards
4. prompt-asset-engineer      → AI prompts & assets
5. delivery-documentation-mgr → Editor handoff package
```

### Brand Refresh
```
1. market-competitor-analyst  → Updated competitive analysis
2. brand-dna-architect        → Revised brand DNA
3. content-strategist         → Updated content strategy
4. delivery-documentation-mgr → Brand guidelines package
```

---

## File Naming Conventions

```
[client]_[type]_[description]_[version].[ext]

Examples:
lospaisas_research_competitor-analysis_v1.md
lospaisas_brand_dna-document_v2.md
lospaisas_content_calendar-january_v1.md
lospaisas_creative_storyboard-promo1_v1.md
```

---

## Integration Notes

### MCP Tools Available
- **Apify** - Social media scraping (Instagram, TikTok, YouTube, Google Maps)
- **Perplexity** - Market research and web intelligence
- **DataForSEO** - SEO and SERP analysis
- **Firecrawl** - Website crawling and extraction
- **fal.ai** - AI image & video generation (21+ models including Imagen4, FLUX, Veo3, Kling)

### Output Formats
- **Markdown** - Primary format for all documentation
- **PDF** - Executive presentations and client deliverables
- **Notion** - Client-facing dashboards and collaboration
- **Google Drive** - File storage and sharing

---

## Getting Started

### For a New Client:
```bash
# 1. Create client folder
mkdir -p clients/[client-name]/{01-research,02-strategy,03-creative,04-assets,05-deliverables}

# 2. Run competitive analysis
/agents:market-competitor-analyst

# 3. Run trend research
/agents:trends-platform-analyst

# 4. Develop brand DNA
/agents:brand-dna-architect
```

### For Content Work:
```bash
# 1. Check current trends
/agents:trends-platform-analyst

# 2. Build content strategy
/agents:content-strategist

# 3. Create creative assets
/agents:creative-director
```

---

## Success Metrics

The agent system succeeds when:
- Decisions are data-informed (not assumption-based)
- Creativity is strategically directed (not random)
- Growth is predictable (not sporadic)
- Human effort focuses on high-leverage work (not repetitive tasks)
- Client deliverables are consistent and professional
- Knowledge compounds across clients and campaigns

---

## Development Status & Progress

| Document | Purpose | Location |
|----------|---------|----------|
| ROADMAP.md | Development phases, task breakdowns, priority matrix | `/ROADMAP.md` |
| CHANGELOG.md | Progress tracking, version history, session context | `/CHANGELOG.md` |

**For Claude Code Session Continuity:**
1. Read `CHANGELOG.md` first for current project state
2. Check "Quick Context for Claude Code" section for immediate priorities
3. Reference `ROADMAP.md` for detailed phase specifications
4. Update `CHANGELOG.md` after completing any task

**Current Status:** ~70% complete (Phase 1, 1.X, 2, and 3 COMPLETE)

**What's Done:**
- 8 agent definitions complete
- CLAUDE.md configuration complete
- Memory system architecture designed and documented
- MCP integrations configured
- Folder structure defined
- **Phase 1 COMPLETE:** All 24 templates created
- **Phase 1.X COMPLETE:** Template expansion (Visual Library, Character Reference Sheets)
- **Phase 2 COMPLETE:** Memory protocols for all agents
  - All agents can read/write to MCP Memory
  - New entity types: CompetitorInsight, MarketGap, TrendSnapshot, HookLibrary
  - Documentation: `docs/memory-architecture.md`
- **Phase 3 COMPLETE:** Workflow Orchestration
  - 4 workflow guides in `docs/workflows/`
  - Automatic workflow triggers in CLAUDE.md
  - Step-by-step execution with memory protocols

**What's Next:**
1. Run test client through workflow (Phase 4)
2. Complete remaining documentation (Phase 5)

---

*This document serves as the foundational reference for the Simplicity Growth Marketing AI Agent System.*
