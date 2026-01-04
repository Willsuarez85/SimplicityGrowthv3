# Content Campaign Workflow

> Create strategic content for existing clients—from trend refresh to editor-ready deliverables.

---

## Overview

| Attribute | Value |
|-----------|-------|
| **Purpose** | Create content for existing clients |
| **Duration** | 1-2 hours |
| **Agents** | 5 (trends-platform-analyst, content-strategist, creative-director, prompt-asset-engineer, delivery-documentation-manager) |
| **Prerequisite** | Brand DNA must exist in memory |
| **Output** | Content strategy, storyboards, AI prompts, editor handoff |

---

## Trigger Patterns

The system automatically recognizes these phrases and initiates this workflow:

```
"Content campaign for [client]"
"Create content for [client]"
"[N] pieces of content for [client]"
"Monthly content for [client]"
"Content batch for [client]"
"[Client] needs new content"
```

**Examples:**
```
User: "Content campaign for taqueria-el-sol, 10 reels for January"
System: Initiates Content Campaign workflow

User: "Create 5 pieces of content for los-paisas focusing on community"
System: Initiates Content Campaign workflow
```

---

## Prerequisites

### Required
| Check | Description | How to Verify |
|-------|-------------|---------------|
| **Brand DNA exists** | Client must be onboarded | `mcp__memory__open_nodes(["[client-slug]-brand"])` |
| **Voice exists** | Tone guidelines must exist | `mcp__memory__open_nodes(["[client-slug]-voice"])` |
| **Avatars exist** | At least 1 avatar defined | `mcp__memory__search_nodes("[client-slug]-avatar")` |

### Pre-flight Check
```javascript
// Run this before starting workflow
mcp__memory__open_nodes([
  "[client-slug]-brand",
  "[client-slug]-voice",
  "[client-slug]-visual"
])
// All 3 must return valid entities
```

**If pre-flight fails:** Run New Client Onboarding workflow first.

### Optional Information
| Information | Helps With | Example |
|-------------|------------|---------|
| Campaign objectives | Strategy focus | "Awareness", "Engagement", "Conversion" |
| Content quantity | Brief count | "10 pieces", "4 weeks of content" |
| Target platforms | Format selection | "TikTok only", "Reels and TikTok" |
| Specific themes | Angle direction | "Behind the scenes", "Customer stories" |
| Avatar preference | Consistency | "Use the educator avatar" |

---

## Workflow Sequence

```
┌─────────────────────────────────────────────────────────────────┐
│  PRE-FLIGHT: Verify Brand DNA exists                            │
│  Check: memory entities for client                              │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│  STEP 1: Refresh Trend Intelligence (if needed)                 │
│  Agent: trends-platform-analyst                                 │
│  Condition: Skip if trends < 30 days old                        │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│  STEP 2: Content Strategy                                       │
│  Agent: content-strategist                                      │
│  Output: Pillars, calendar, briefs                              │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│  STEP 3: Creative Direction                                     │
│  Agent: creative-director                                       │
│  Output: Storyboards, scripts                                   │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│  STEP 4: AI Asset Preparation                                   │
│  Agent: prompt-asset-engineer                                   │
│  Output: Generation-ready prompts                               │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│  STEP 5: Delivery Package                                       │
│  Agent: delivery-documentation-manager                          │
│  Output: Editor handoff, client summary                         │
└─────────────────────────────────────────────────────────────────┘
```

---

## Step-by-Step Execution

### Pre-Flight: Verify Prerequisites

**Check Brand DNA Exists:**
```javascript
mcp__memory__open_nodes([
  "[client-slug]-brand",
  "[client-slug]-voice",
  "[client-slug]-visual"
])
```

**Check Trend Data Freshness:**
```javascript
mcp__memory__open_nodes(["[client-slug]-trends-tiktok"])
// Check research_date observation
// If > 30 days ago, proceed with Step 1
// If < 30 days ago, skip to Step 2
```

---

### Step 1: Refresh Trend Intelligence (Conditional)

**Agent:** `trends-platform-analyst`

**Condition:** Only run if existing trend data is >30 days old OR doesn't exist.

**Input Required:**
- Industry (from client memory)
- Target platforms for campaign

**Memory Query:**
```javascript
// Get industry context from brand
mcp__memory__open_nodes(["[client-slug]-brand"])
// Extract industry from observations
```

**Actions Performed:**
1. Analyze current platform trends
2. Update trend snapshots
3. Refresh hook library with current patterns

**Output Files:**
```
/clients/[client-slug]/01-research/trend-research/
├── platform_trends_overview.md (updated)
├── tiktok_trends.md (updated)
├── what_is_working_now.md (updated)
└── [other platform files as needed]
```

**Memory Updates:**
```javascript
// Update TrendSnapshot entities
mcp__memory__create_entities({
  "entities": [{
    "name": "[client-slug]-trends-[platform]",
    "entityType": "TrendSnapshot",
    "observations": [
      "platform: [platform]",
      "research_date: [today's date]",
      "top_formats: [updated formats]",
      // ... updated observations
    ]
  }]
})
```

**Validation:**
```javascript
mcp__memory__open_nodes(["[client-slug]-trends-tiktok"])
// Verify research_date is current
```

---

### Step 2: Content Strategy

**Agent:** `content-strategist`

**Memory Queries Required:**
```javascript
// Query brand context
mcp__memory__open_nodes(["[client-slug]-brand"])
// Retrieves: purpose, promise, values, personality

// Query voice guidelines
mcp__memory__open_nodes(["[client-slug]-voice"])
// Retrieves: language style, emotional posture, signature phrases

// Query available avatars
mcp__memory__search_nodes("[client-slug]-avatar")
// Retrieves: all avatar profiles
```

**Input Required:**
- Brand context (from memory)
- Trend data (from Step 1 or existing)
- Campaign objectives
- Content quantity

**Actions Performed:**
1. Define/confirm content pillars
2. Create content calendar for campaign period
3. Develop angles and hooks aligned with brand
4. Generate content briefs (one per piece)

**Output Files:**
```
/clients/[client-slug]/02-strategy/content-strategy/
├── content_pillars.md
├── content_calendar.md
├── content_angles.md
└── content_briefs/
    ├── brief-001-[topic].md
    ├── brief-002-[topic].md
    ├── brief-003-[topic].md
    └── ... (one per content piece)
```

**Brief Structure:**
Each brief includes:
- Content objective
- Key message
- Emotional tone
- Hook suggestion
- Avatar to use
- Platform context
- Success criteria

**Validation:**
- [ ] Number of briefs matches requested quantity
- [ ] Each brief specifies an avatar
- [ ] Briefs align with brand voice
- [ ] Platform-specific considerations included

---

### Step 3: Creative Direction

**Agent:** `creative-director`

**Memory Queries Required:**
```javascript
// Query visual identity
mcp__memory__open_nodes(["[client-slug]-visual"])
// Retrieves: mood, colors, lighting, style

// Query tone of voice
mcp__memory__open_nodes(["[client-slug]-voice"])
// Retrieves: language style, phrases, forbidden words

// Query specific avatar (per brief)
mcp__memory__open_nodes(["[client-slug]-avatar-[role]"])
// Retrieves: personality, voice style, visual appearance
```

**Input Required:**
- Content briefs from Step 2
- Visual identity from memory
- Avatar profiles from memory

**Actions Performed:**
1. Create storyboard for each brief
2. Write scripts (spoken word + on-screen text)
3. Define creative direction notes
4. Specify hooks and attention mechanics

**Output Files:**
```
/clients/[client-slug]/03-creative/
├── storyboards/
│   ├── storyboard-001-[topic].md
│   ├── storyboard-002-[topic].md
│   └── ...
├── scripts/
│   ├── script-001-[topic].md
│   ├── script-002-[topic].md
│   └── ...
└── creative_notes.md
```

**Storyboard Structure:**
Each storyboard includes:
- Scene-by-scene breakdown
- Visual framing notes
- Hook specification (first 3 seconds)
- Emotional beats
- Production notes

**Validation:**
- [ ] Each brief has a corresponding storyboard
- [ ] Each storyboard has a script
- [ ] Avatar consistency maintained
- [ ] Visual direction matches brand

---

### Step 4: AI Asset Preparation

**Agent:** `prompt-asset-engineer`

**Memory Queries Required:**
```javascript
// Query visual identity (CRITICAL)
mcp__memory__open_nodes(["[client-slug]-visual"])
// Retrieves: colors, lighting, photography style

// Query avatar visual details
mcp__memory__open_nodes(["[client-slug]-avatar-[role]"])
// Retrieves: visual_appearance for AI generation
```

**Input Required:**
- Storyboards from Step 3
- Visual identity from memory
- Avatar visual descriptions

**Actions Performed:**
1. Create AI image prompts (if needed)
2. Create AI video prompts (if needed)
3. Define keyframes for video generation
4. Document model recommendations

**Output Files:**
```
/clients/[client-slug]/03-creative/prompts/
├── image_prompts/
│   ├── prompt-001-[description].md
│   └── ...
├── video_prompts/
│   ├── prompt-001-[description].md
│   └── ...
└── keyframe_definitions/
    ├── keyframes-001.md
    └── ...
```

**Prompt Structure:**
```
[PROMPT ID]: [model]_[avatar]_[scenario]_[format]_v1
[MODEL]: flux_dev / veo3 / nano_banana_pro
[TYPE]: image / text-to-video / image-to-video

[MAIN PROMPT]:
[Detailed prompt incorporating visual identity]

[STYLE GUIDANCE]:
[From visual memory: mood, colors, lighting]

[CONSISTENCY RULES]:
[Avatar appearance, brand elements]

[MODEL-SPECIFIC PARAMS]:
aspect_ratio: 9:16
duration: 5s (for video)
```

**Validation:**
- [ ] Each storyboard has corresponding prompts
- [ ] Prompts incorporate visual identity
- [ ] Avatar descriptions match memory
- [ ] Model selection appropriate for content type

---

### Step 5: Delivery Package

**Agent:** `delivery-documentation-manager`

**Memory Queries Required:**
```javascript
// Query all client context for documentation
mcp__memory__open_nodes([
  "[client-slug]",
  "[client-slug]-brand"
])
// For executive summary context

mcp__memory__search_nodes("[client-slug]-avatar")
// For avatar roster in delivery docs
```

**Input Required:**
- All creative outputs from Steps 2-4
- Client context from memory

**Actions Performed:**
1. Assemble delivery summary
2. Create client handoff document
3. Create editor handoff package
4. Organize files for access

**Output Files:**
```
/clients/[client-slug]/05-deliverables/
├── handoff-packages/
│   ├── delivery_summary.md
│   ├── client_handoff.md
│   └── editor_handoff.md
└── presentations/
    └── campaign_overview.pdf (optional)
```

**Editor Handoff Includes:**
- Content list with status
- Storyboard links
- Script links
- Prompt links
- Avatar reference images
- Brand guidelines summary
- Priority order

**Validation:**
- [ ] Delivery summary lists all content pieces
- [ ] Editor handoff has all necessary links
- [ ] File organization follows structure
- [ ] No missing references

---

## Handoff Points Summary

| From | To | What Passes |
|------|-----|-------------|
| Pre-flight | Step 1 | Brand context, trend freshness status |
| Step 1 | Step 2 | Updated trend data |
| Step 2 | Step 3 | Content briefs, avatar assignments |
| Step 3 | Step 4 | Storyboards, visual direction |
| Step 4 | Step 5 | Prompts, keyframes, scripts |

---

## Memory Interactions Summary

### Read Operations
| Step | Entity | Purpose |
|------|--------|---------|
| Pre-flight | Brand, Voice, Visual | Verify prerequisites |
| Step 1 | Brand | Get industry context |
| Step 2 | Brand, Voice, Avatars | Strategy alignment |
| Step 3 | Visual, Voice, Avatar | Creative direction |
| Step 4 | Visual, Avatar | Prompt generation |
| Step 5 | Client, Brand, Avatars | Documentation |

### Write Operations
| Step | Entity | Purpose |
|------|--------|---------|
| Step 1 | TrendSnapshot | Update trend data |
| Step 1 | HookLibrary | Refresh hooks |

---

## Final Validation Checklist

### Strategy Documents
- [ ] Content pillars defined
- [ ] Calendar covers campaign period
- [ ] Briefs match requested quantity
- [ ] Each brief has clear objective

### Creative Documents
- [ ] Storyboard for each brief
- [ ] Script for each storyboard
- [ ] Hooks defined for first 3 seconds
- [ ] Avatar consistency maintained

### Production Documents
- [ ] AI prompts for needed assets
- [ ] Prompts incorporate brand visual
- [ ] Model recommendations specified

### Delivery Documents
- [ ] Summary lists all deliverables
- [ ] Editor handoff is actionable
- [ ] All links work
- [ ] Files in correct folders

---

## Common Issues & Solutions

### Issue: Brand DNA not found
**Symptom:** Pre-flight check fails, brand entity not found
**Solution:** Run New Client Onboarding workflow first

### Issue: Trend data is stale
**Symptom:** Trend research_date > 30 days old
**Solution:** Step 1 will automatically refresh. If skipped, force Step 1.

### Issue: Avatar not specified in briefs
**Symptom:** Content strategist didn't assign avatars
**Solution:** Query available avatars and update briefs before creative step

### Issue: Visual prompts don't match brand
**Symptom:** Generated images don't feel on-brand
**Solution:** Verify visual memory was queried. Check prompt includes mood, colors, lighting from `[client-slug]-visual`

### Issue: Missing content pieces
**Symptom:** Fewer storyboards than briefs
**Solution:** Compare brief count to storyboard count. Re-run creative-director for missing pieces.

---

## Time Estimates by Step

| Step | Agent | Estimated Time |
|------|-------|----------------|
| Pre-flight | (validation) | 2-3 minutes |
| 1. Trend Refresh | trends-platform-analyst | 15-30 minutes (if needed) |
| 2. Content Strategy | content-strategist | 20-40 minutes |
| 3. Creative Direction | creative-director | 30-45 minutes |
| 4. AI Prompts | prompt-asset-engineer | 15-25 minutes |
| 5. Delivery Package | delivery-documentation-manager | 10-15 minutes |
| **Total** | | **1-2 hours** |

---

*Workflow Version: 1.0 | Last Updated: 2025-12-31*




