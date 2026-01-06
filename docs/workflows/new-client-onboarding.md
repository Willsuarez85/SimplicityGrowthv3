# New Client Onboarding Workflow

> Complete brand setup workflow for new clients—from folder creation to full brand identity.

---

## Overview

| Attribute | Value |
|-----------|-------|
| **Purpose** | Full brand setup for new clients |
| **Duration** | 2-4 hours |
| **Agents** | 4 (client-file-architect, market-competitor-analyst, trends-platform-analyst, brand-dna-architect) |
| **Output** | Complete brand package with research, identity, and memory entities |

---

## Trigger Patterns

The system automatically recognizes these phrases and initiates this workflow:

```
"New client: [name]"
"Onboard [client name]"
"Set up [client name] as a new client"
"Start working with [name]"
"I have a new client called [name]"
```

**Example:**
```
User: "New client: Taqueria El Sol, a Mexican restaurant in Austin, TX"
System: Initiates New Client Onboarding workflow
```

---

## Prerequisites

Before starting, gather this information:

| Required | Description | Example |
|----------|-------------|---------|
| **Client Name** | Full business name | "Taqueria El Sol" |
| **Industry** | Business category | "Mexican restaurant" |
| **Location** | City, State | "Austin, TX" |

| Optional (Helpful) | Description | Example |
|--------------------|-------------|---------|
| Website URL | Client's current website | "taqueriaelsol.com" |
| Social handles | Existing social media | "@taqueriaelsol" |
| Business goals | What they want to achieve | "Increase local traffic" |
| Target audience | Who they serve | "Young professionals, families" |

---

## Workflow Sequence

```
┌─────────────────────────────────────────────────────────────────┐
│  STEP 1: Initialize Client Structure                            │
│  Agent: client-file-architect                                   │
│  Output: Folder structure, memory profile template              │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│  STEP 2: Competitive Intelligence                               │
│  Agent: market-competitor-analyst                               │
│  Output: 7 research documents, CompetitorInsight entities       │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│  STEP 3: Trend Analysis                                         │
│  Agent: trends-platform-analyst                                 │
│  Output: 8 trend documents, TrendSnapshot entities              │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│  STEP 4: Brand DNA Development                                  │
│  Agent: brand-dna-architect                                     │
│  Output: Brand package, all core memory entities                │
└─────────────────────────────────────────────────────────────────┘
```

---

## Step-by-Step Execution

### Step 1: Initialize Client Structure

**Agent:** `client-file-architect`

**Input Required:**
- Client business name
- Industry (for template selection)

**Actions Performed:**
1. Generate client-slug from business name
2. Create folder structure in `/clients/[client-slug]/`
3. Copy templates to appropriate folders
4. Create `client_memory_profile.md` (pending status)
5. Create `research_index.md`

**Output Files:**
```
/clients/[client-slug]/
├── client_memory_profile.md
├── README.md
├── 01-research/
│   ├── brand-audit/
│   ├── competitor-analysis/
│   ├── trend-research/
│   └── research_index.md
├── 02-strategy/
│   ├── brand-dna/
│   └── content-strategy/
├── 03-creative/
│   ├── prompts/
│   ├── scripts/
│   └── storyboards/
├── 04-assets/
│   ├── images/
│   ├── references/
│   └── videos/
└── 05-deliverables/
    ├── handoff-packages/
    └── presentations/
```

**Validation Checkpoint:**
```bash
# Verify folder structure exists
ls -la clients/[client-slug]/
ls -la clients/[client-slug]/01-research/
ls -la clients/[client-slug]/02-strategy/
```

**Memory Query (if applicable):**
```javascript
// Check if client already exists
mcp__memory__open_nodes(["[client-slug]"])
// Should return empty if truly new client
```

---

### Step 2: Competitive Intelligence

**Agent:** `market-competitor-analyst`

**Input Required:**
- Client name
- Industry
- Location
- Target platforms (optional)

**Actions Performed:**
1. Identify direct, indirect, and reference competitors
2. Analyze platform presence and content patterns
3. Extract messaging and positioning
4. Identify market gaps and opportunities
5. Create memory entities for key competitors

**Output Files:**
```
/clients/[client-slug]/01-research/competitor-analysis/
├── market_overview.md
├── competitor_map.md
├── platform_presence_comparison.md
├── content_patterns_and_formats.md
├── messaging_and_positioning.md
├── engagement_signals.md
└── gaps_and_opportunities.md
```

**Memory Entities Created:**
```javascript
// CompetitorInsight entities (3-5 competitors)
mcp__memory__create_entities({
  "entities": [{
    "name": "[client-slug]-competitor-[competitor-slug]",
    "entityType": "CompetitorInsight",
    "observations": [
      "competitor_name: [name]",
      "competitor_type: direct/indirect/market-leader",
      "platforms: Instagram, TikTok",
      "positioning: [summary]",
      "research_date: YYYY-MM-DD"
    ]
  }]
})

// MarketGap entity
mcp__memory__create_entities({
  "entities": [{
    "name": "[client-slug]-market-gaps",
    "entityType": "MarketGap",
    "observations": [
      "gap_1: [opportunity]",
      "gap_2: [opportunity]",
      "saturated_areas: [what to avoid]",
      "research_date: YYYY-MM-DD"
    ]
  }]
})
```

**Validation Checkpoint:**
```javascript
// Verify competitor entities created
mcp__memory__search_nodes("[client-slug]-competitor")
// Should return 3-5 entities

// Verify market gaps entity
mcp__memory__open_nodes(["[client-slug]-market-gaps"])
// Should return gap observations
```

---

### Step 3: Trend Analysis

**Agent:** `trends-platform-analyst`

**Input Required:**
- Industry/niche
- Target platforms (TikTok, Instagram, YouTube)

**Actions Performed:**
1. Analyze current platform trends
2. Identify winning content formats
3. Extract high-performing hooks
4. Document visual and audio patterns
5. Create trend snapshot entities

**Output Files:**
```
/clients/[client-slug]/01-research/trend-research/
├── platform_trends_overview.md
├── tiktok_trends.md
├── youtube_trends.md
├── reels_trends.md
├── titles_and_hooks_patterns.md
├── thumbnails_and_visual_patterns.md
├── themes_and_topics.md
└── what_is_working_now.md
```

**Memory Entities Created:**
```javascript
// TrendSnapshot entities (per platform)
mcp__memory__create_entities({
  "entities": [{
    "name": "[client-slug]-trends-tiktok",
    "entityType": "TrendSnapshot",
    "observations": [
      "platform: tiktok",
      "research_date: YYYY-MM-DD",
      "top_formats: POV, tutorials, storytimes",
      "optimal_length: 30-60 seconds",
      "hook_patterns: direct question, bold claim"
    ]
  }]
})

// HookLibrary entity
mcp__memory__create_entities({
  "entities": [{
    "name": "[client-slug]-hooks",
    "entityType": "HookLibrary",
    "observations": [
      "hook_1: [verbatim hook]",
      "hook_2: [verbatim hook]",
      "hook_categories: curiosity, authority",
      "research_date: YYYY-MM-DD"
    ]
  }]
})
```

**Validation Checkpoint:**
```javascript
// Verify trend entities created
mcp__memory__search_nodes("[client-slug]-trends")
// Should return entities for each platform analyzed

// Verify hook library
mcp__memory__open_nodes(["[client-slug]-hooks"])
// Should return hook observations
```

---

### Step 4: Brand DNA Development

**Agent:** `brand-dna-architect`

**Input Required:**
- All research documents from Steps 2 and 3
- Client business information

**Actions Performed:**
1. Synthesize research into brand identity
2. Define brand DNA (purpose, promise, values, personality)
3. Create tone of voice guidelines
4. Establish visual identity direction
5. Design AI avatars (2-4)
6. Populate all core memory entities

**Output Files:**
```
/clients/[client-slug]/02-strategy/brand-dna/
├── brand_dna_core.md
├── tone_of_voice_guidelines.md
├── visual_identity_direction.md
├── ai_avatars.md
├── brand_scenarios.md
└── brand_package_summary.md
```

**Memory Entities Created:**
```javascript
// Client entity
mcp__memory__create_entities({
  "entities": [{
    "name": "[client-slug]",
    "entityType": "Client",
    "observations": [
      "business_name: [name]",
      "industry: [industry]",
      "location: [city, state]",
      "status: active",
      "onboarding_date: YYYY-MM-DD"
    ]
  }]
})

// Brand entity
mcp__memory__create_entities({
  "entities": [{
    "name": "[client-slug]-brand",
    "entityType": "Brand",
    "observations": [
      "purpose: [why brand exists]",
      "promise: [brand promise]",
      "archetype_primary: [archetype]",
      "personality_summary: [description]",
      "core_values: [values]"
    ]
  }]
})

// ToneOfVoice entity
mcp__memory__create_entities({
  "entities": [{
    "name": "[client-slug]-voice",
    "entityType": "ToneOfVoice",
    "observations": [
      "language_style: [style]",
      "emotional_posture: [posture]",
      "signature_phrases: [phrases]",
      "forbidden_words: [words to avoid]"
    ]
  }]
})

// VisualIdentity entity
mcp__memory__create_entities({
  "entities": [{
    "name": "[client-slug]-visual",
    "entityType": "VisualIdentity",
    "observations": [
      "primary_mood: [mood]",
      "color_palette_primary: [colors]",
      "lighting_preference: [lighting]",
      "photography_style: [style]"
    ]
  }]
})

// Avatar entities (2-4)
mcp__memory__create_entities({
  "entities": [{
    "name": "[client-slug]-avatar-[role]",
    "entityType": "Avatar",
    "observations": [
      "avatar_name: [name]",
      "role: [role]",
      "personality_traits: [traits]",
      "visual_appearance: [description]",
      "content_focus: [focus]"
    ]
  }]
})
```

**Validation Checkpoint:**
```javascript
// Verify all core entities exist
mcp__memory__open_nodes([
  "[client-slug]",
  "[client-slug]-brand",
  "[client-slug]-voice",
  "[client-slug]-visual"
])
// Should return all 4 entities with observations

// Verify avatars created
mcp__memory__search_nodes("[client-slug]-avatar")
// Should return 2-4 avatar entities
```

---

## Complete Memory Entity Map

After successful onboarding, these entities should exist:

| Entity Type | Entity Name | Created By |
|-------------|-------------|------------|
| Client | `[client-slug]` | brand-dna-architect |
| Brand | `[client-slug]-brand` | brand-dna-architect |
| ToneOfVoice | `[client-slug]-voice` | brand-dna-architect |
| VisualIdentity | `[client-slug]-visual` | brand-dna-architect |
| Avatar | `[client-slug]-avatar-[role]` (x2-4) | brand-dna-architect |
| CompetitorInsight | `[client-slug]-competitor-[name]` (x3-5) | market-competitor-analyst |
| MarketGap | `[client-slug]-market-gaps` | market-competitor-analyst |
| TrendSnapshot | `[client-slug]-trends-[platform]` (x1-3) | trends-platform-analyst |
| HookLibrary | `[client-slug]-hooks` | trends-platform-analyst |

**Total entities:** 12-18 depending on competitors and platforms analyzed

---

## Final Validation Checklist

### Folder Structure
- [ ] `/clients/[client-slug]/` exists
- [ ] All 5 main folders created (01-research through 05-deliverables)
- [ ] `client_memory_profile.md` created
- [ ] `research_index.md` created

### Research Documents
- [ ] 7 competitor analysis documents exist
- [ ] 8 trend research documents exist
- [ ] All documents follow naming conventions

### Brand Documents
- [ ] `brand_dna_core.md` exists
- [ ] `tone_of_voice_guidelines.md` exists
- [ ] `visual_identity_direction.md` exists
- [ ] `ai_avatars.md` exists with 2-4 avatars

### Memory Entities
- [ ] Client entity with business info
- [ ] Brand entity with DNA
- [ ] Voice entity with guidelines
- [ ] Visual entity with direction
- [ ] Avatar entities (2-4)
- [ ] CompetitorInsight entities (3-5)
- [ ] MarketGap entity
- [ ] TrendSnapshot entities (1-3)
- [ ] HookLibrary entity

### Update Client Memory Profile
- [ ] `client_memory_profile.md` status changed to "Active"
- [ ] All entity names listed
- [ ] Sync date updated

---

## Common Issues & Solutions

### Issue: Client already exists
**Symptom:** Memory query returns existing Client entity
**Solution:** This is a Brand Refresh, not new onboarding. Use Brand Refresh workflow instead.

### Issue: Competitor research too broad
**Symptom:** Too many competitors identified, analysis unfocused
**Solution:** Focus on 3-5 most relevant competitors. Prioritize direct competitors in same market.

### Issue: Missing trend data for platform
**Symptom:** TrendSnapshot not created for requested platform
**Solution:** Verify platform is supported (TikTok, YouTube, Instagram). Re-run trends-platform-analyst with specific platform.

### Issue: Brand DNA too generic
**Symptom:** Brand documents lack specificity, could apply to any business
**Solution:** Ensure research documents are complete before brand development. Request more client information if needed.

### Issue: Memory population failed
**Symptom:** Entities not found after brand-dna-architect completes
**Solution:** Check MCP Memory connection. Re-run Memory Population Protocol from brand-dna-architect.

---

## Post-Onboarding Next Steps

After successful onboarding, the client is ready for:

1. **Content Campaign** - Create content using established brand
2. **Quick Creative** - Generate specific content pieces
3. **Client Presentation** - Deliver brand package via delivery-documentation-manager

---

## Time Estimates by Step

| Step | Agent | Estimated Time |
|------|-------|----------------|
| 1. Initialize Structure | client-file-architect | 5-10 minutes |
| 2. Competitive Intelligence | market-competitor-analyst | 45-90 minutes |
| 3. Trend Analysis | trends-platform-analyst | 30-60 minutes |
| 4. Brand DNA Development | brand-dna-architect | 60-90 minutes |
| **Total** | | **2-4 hours** |

---

*Workflow Version: 1.0 | Last Updated: 2025-12-31*







