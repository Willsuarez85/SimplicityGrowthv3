# Brand Refresh Workflow

> Update an existing client's brand based on new market conditions, repositioning, or business evolution.

---

## Overview

| Attribute | Value |
|-----------|-------|
| **Purpose** | Update existing brand based on new market conditions |
| **Duration** | 2-3 hours |
| **Agents** | 4 (market-competitor-analyst, brand-dna-architect, content-strategist, delivery-documentation-manager) |
| **Prerequisite** | Existing client with Brand DNA |
| **Output** | Updated brand package, revised strategy, client presentation |

---

## Trigger Patterns

The system automatically recognizes these phrases and initiates this workflow:

```
"Refresh brand for [client]"
"Update [client] brand"
"Rebrand [client]"
"[Client] needs brand update"
"Evolve the brand for [client]"
"Revise brand strategy for [client]"
```

**Examples:**
```
User: "Refresh brand for taqueria-el-sol, they're expanding to food trucks"
System: Initiates Brand Refresh workflow

User: "Update los-paisas brand, market has changed significantly"
System: Initiates Brand Refresh workflow
```

---

## When to Use Brand Refresh

### Use Brand Refresh When:
- Market landscape has shifted significantly (new competitors, trends)
- Client business has evolved (new services, locations, audience)
- Original brand feels outdated or misaligned
- Performance metrics indicate messaging isn't resonating
- Client requests strategic repositioning

### Don't Use Brand Refresh When:
- Client is completely new (use New Client Onboarding)
- Only need new content (use Content Campaign)
- Only need one creative piece (use Quick Creative)
- Brand DNA doesn't exist in memory

---

## Prerequisites

### Required
| Check | Description | How to Verify |
|-------|-------------|---------------|
| **Client exists** | Client entity in memory | `mcp__memory__open_nodes(["[client-slug]"])` |
| **Brand DNA exists** | Brand entity in memory | `mcp__memory__open_nodes(["[client-slug]-brand"])` |
| **Client folder exists** | Folder structure present | Check `/clients/[client-slug]/` |

### Pre-flight Check
```javascript
// Verify client exists and has brand
mcp__memory__open_nodes([
  "[client-slug]",
  "[client-slug]-brand",
  "[client-slug]-voice",
  "[client-slug]-visual"
])
// All must return valid entities
```

**If pre-flight fails:** This is a new client. Run New Client Onboarding workflow first.

### Information Needed for Refresh
| Information | Purpose | Example |
|-------------|---------|---------|
| **Refresh reason** | Focus analysis | "Market has shifted", "Expanding services" |
| **Refresh scope** | What to update | "Full rebrand", "Voice update only", "Visual refresh" |
| **What's working** | What to preserve | "Educator avatar is strong", "Colors are iconic" |
| **What's not working** | What to change | "Messaging too formal", "Not standing out" |

---

## Refresh Scope Options

### Full Refresh
Updates all brand elements:
- Brand DNA (purpose, promise, values)
- Tone of Voice
- Visual Identity
- Avatars (may add, modify, or retire)
- Content Strategy

### Partial Refresh Options
| Scope | What Updates | What Stays |
|-------|--------------|------------|
| **Voice Only** | Tone, language, phrases | Visual, Avatars, DNA core |
| **Visual Only** | Colors, mood, photography | Voice, Avatars, DNA core |
| **Positioning Only** | Promise, differentiators | Voice, Visual, Avatars |
| **Avatar Update** | Avatar roster, personalities | Brand DNA, Voice, Visual |

---

## Workflow Sequence

```
┌─────────────────────────────────────────────────────────────────┐
│  PRE-FLIGHT: Verify Brand DNA exists & determine scope          │
│  Check: memory entities + refresh scope                         │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│  STEP 1: Updated Market Analysis                                │
│  Agent: market-competitor-analyst                               │
│  Output: Fresh competitive landscape, gap analysis              │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│  STEP 2: Revised Brand DNA                                      │
│  Agent: brand-dna-architect                                     │
│  Output: Updated brand package, memory entity updates           │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│  STEP 3: Content Strategy Alignment                             │
│  Agent: content-strategist                                      │
│  Output: Revised pillars, updated calendar approach             │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│  STEP 4: Client Delivery                                        │
│  Agent: delivery-documentation-manager                          │
│  Output: Brand refresh presentation, change documentation       │
└─────────────────────────────────────────────────────────────────┘
```

---

## Step-by-Step Execution

### Pre-Flight: Verify Prerequisites & Scope

**Check Existing Brand:**
```javascript
// Get current brand state
mcp__memory__open_nodes([
  "[client-slug]",
  "[client-slug]-brand",
  "[client-slug]-voice",
  "[client-slug]-visual"
])

// Get existing avatars
mcp__memory__search_nodes("[client-slug]-avatar")

// Get previous competitor research
mcp__memory__search_nodes("[client-slug]-competitor")
```

**Document Current State:**
Before making changes, note the current state for comparison:
- Current brand purpose and promise
- Current voice characteristics
- Current visual direction
- Active avatars

**Define Refresh Scope:**
Based on user input, determine:
- [ ] Full refresh or partial
- [ ] Which elements will change
- [ ] Which elements must be preserved

---

### Step 1: Updated Market Analysis

**Agent:** `market-competitor-analyst`

**Memory Query (existing research):**
```javascript
// Get previous competitor insights for comparison
mcp__memory__search_nodes("[client-slug]-competitor")
// Note: Don't delete yet, compare first
```

**Input Required:**
- Client name and industry
- Refresh scope and reason
- Specific areas to investigate

**Actions Performed:**
1. Re-analyze competitive landscape
2. Compare to previous analysis (identify what's changed)
3. Identify new competitors, departed competitors
4. Update market gaps and opportunities
5. Document competitive shifts

**Output Files:**
```
/clients/[client-slug]/01-research/competitor-analysis/
├── market_overview_v2.md (or timestamp)
├── competitor_map_v2.md
├── competitive_shifts.md (NEW - what changed)
├── gaps_and_opportunities_v2.md
└── refresh_rationale.md (NEW - why refresh is needed)
```

**Memory Operations:**
```javascript
// UPDATE existing competitor entities (not create new)
// For entities that still exist:
mcp__memory__create_entities({
  "entities": [{
    "name": "[client-slug]-competitor-[name]",
    "entityType": "CompetitorInsight",
    "observations": [
      // Updated observations
      "last_analysis: [previous date]",
      "current_analysis: [today]",
      "changes_noted: [what changed]"
    ]
  }]
})

// For NEW competitors:
mcp__memory__create_entities({
  "entities": [{
    "name": "[client-slug]-competitor-[new-name]",
    "entityType": "CompetitorInsight",
    "observations": [
      "competitor_name: [name]",
      "first_identified: [today]",
      // ... standard observations
    ]
  }]
})

// Update market gaps
mcp__memory__create_entities({
  "entities": [{
    "name": "[client-slug]-market-gaps",
    "entityType": "MarketGap",
    "observations": [
      // Updated gap analysis
      "previous_gaps: [summary of old gaps]",
      "current_gaps: [new opportunities]",
      "closed_gaps: [what competitors filled]"
    ]
  }]
})
```

**Validation:**
- [ ] Competitive shift document created
- [ ] Changes from previous analysis documented
- [ ] New opportunities identified

---

### Step 2: Revised Brand DNA

**Agent:** `brand-dna-architect`

**Memory Query (current brand):**
```javascript
// Get ALL current brand entities
mcp__memory__open_nodes([
  "[client-slug]-brand",
  "[client-slug]-voice",
  "[client-slug]-visual"
])

// Get all avatars
mcp__memory__search_nodes("[client-slug]-avatar")
```

**Input Required:**
- Updated market research from Step 1
- Current brand entities (for reference)
- Refresh scope
- Elements to preserve

**Actions Performed:**
1. Review current brand against new market data
2. Identify what needs to change vs. what's working
3. Revise brand DNA elements per scope
4. Update voice guidelines (if in scope)
5. Update visual direction (if in scope)
6. Revise/add/retire avatars (if in scope)
7. Update all memory entities

**Output Files:**
```
/clients/[client-slug]/02-strategy/brand-dna/
├── brand_dna_core_v2.md (or timestamp)
├── brand_evolution_notes.md (NEW - what changed and why)
├── tone_of_voice_guidelines_v2.md (if updated)
├── visual_identity_direction_v2.md (if updated)
├── ai_avatars_v2.md (if updated)
└── brand_package_summary_v2.md
```

**Memory Operations (CRITICAL: Update, don't duplicate):**
```javascript
// UPDATE Brand entity with new observations
mcp__memory__create_entities({
  "entities": [{
    "name": "[client-slug]-brand",
    "entityType": "Brand",
    "observations": [
      // Overwrite with updated values
      "purpose: [updated purpose]",
      "promise: [updated promise]",
      "last_refresh: [today]",
      "refresh_reason: [reason]",
      // ... other updated observations
    ]
  }]
})

// UPDATE Voice entity
mcp__memory__create_entities({
  "entities": [{
    "name": "[client-slug]-voice",
    "entityType": "ToneOfVoice",
    "observations": [
      // Updated voice observations
      "last_refresh: [today]"
    ]
  }]
})

// UPDATE Visual entity
mcp__memory__create_entities({
  "entities": [{
    "name": "[client-slug]-visual",
    "entityType": "VisualIdentity",
    "observations": [
      // Updated visual observations
      "last_refresh: [today]"
    ]
  }]
})

// For RETIRED avatars: Add observation marking inactive
mcp__memory__create_entities({
  "entities": [{
    "name": "[client-slug]-avatar-[old-role]",
    "entityType": "Avatar",
    "observations": [
      "status: retired",
      "retired_date: [today]",
      "retired_reason: [reason]"
    ]
  }]
})

// For NEW avatars: Create new entities
mcp__memory__create_entities({
  "entities": [{
    "name": "[client-slug]-avatar-[new-role]",
    "entityType": "Avatar",
    "observations": [
      "status: active",
      "created_date: [today]",
      // ... standard avatar observations
    ]
  }]
})
```

**Validation:**
- [ ] Brand evolution notes document created
- [ ] Memory entities updated (not duplicated)
- [ ] Changes align with refresh scope
- [ ] Preserved elements remain intact

---

### Step 3: Content Strategy Alignment

**Agent:** `content-strategist`

**Memory Query:**
```javascript
// Get UPDATED brand context
mcp__memory__open_nodes([
  "[client-slug]-brand",
  "[client-slug]-voice"
])

// Get current active avatars
mcp__memory__search_nodes("[client-slug]-avatar")
// Filter for status: active
```

**Input Required:**
- Updated brand DNA from Step 2
- Previous content strategy (for comparison)
- Campaign objectives going forward

**Actions Performed:**
1. Review previous content pillars against new brand
2. Revise pillars to align with updated positioning
3. Update content angles and hooks
4. Adjust avatar usage recommendations
5. Create transition plan for existing content

**Output Files:**
```
/clients/[client-slug]/02-strategy/content-strategy/
├── content_pillars_v2.md (or timestamp)
├── content_strategy_evolution.md (NEW - transition plan)
├── content_angles_v2.md
└── avatar_content_mapping.md (NEW - which avatar for what)
```

**Validation:**
- [ ] Pillars align with updated brand purpose
- [ ] Angles reflect new positioning
- [ ] Avatar mapping updated for active avatars only
- [ ] Transition guidance provided

---

### Step 4: Client Delivery

**Agent:** `delivery-documentation-manager`

**Memory Query:**
```javascript
// Get all updated entities for documentation
mcp__memory__open_nodes([
  "[client-slug]",
  "[client-slug]-brand",
  "[client-slug]-voice",
  "[client-slug]-visual"
])

mcp__memory__search_nodes("[client-slug]-avatar")
```

**Input Required:**
- All updated brand documents from Steps 1-3
- Change documentation

**Actions Performed:**
1. Create brand refresh summary
2. Document all changes (before/after)
3. Create client presentation
4. Update handoff documentation

**Output Files:**
```
/clients/[client-slug]/05-deliverables/
├── presentations/
│   └── brand_refresh_presentation.pdf
├── handoff-packages/
│   ├── brand_refresh_summary.md (NEW)
│   ├── change_log.md (NEW - before/after)
│   └── client_handoff_v2.md
└── archive/
    └── [previous brand docs for reference]
```

**Brand Refresh Summary Includes:**
- Executive summary of changes
- Before/after comparison
- Rationale for each change
- What was preserved and why
- Implementation recommendations
- Timeline for rollout

**Validation:**
- [ ] Changes clearly documented
- [ ] Before/after comparison included
- [ ] Presentation ready for client
- [ ] Previous versions archived (not deleted)

---

## Version Control Strategy

### Document Versioning
All updated documents should use versioning:
- `_v2.md` suffix for major updates
- OR timestamp: `_2025-01-15.md`
- Keep `_v1` versions in place for reference

### Memory Versioning
Memory entities are updated in place (MCP overwrites):
- Add `last_refresh` observation with date
- Add `refresh_reason` observation
- Previous values are overwritten

### Archive Strategy
Move (don't delete) previous versions:
```
/clients/[client-slug]/archive/
├── brand_dna_v1_2025-06-15/
│   ├── brand_dna_core.md
│   ├── tone_of_voice_guidelines.md
│   └── ...
└── competitor_analysis_2025-06-15/
    └── ...
```

---

## Memory Update Summary

### Entities Updated (Not Created)
| Entity | Key Changes |
|--------|-------------|
| `[client-slug]-brand` | Add `last_refresh`, update changed observations |
| `[client-slug]-voice` | Add `last_refresh`, update voice characteristics |
| `[client-slug]-visual` | Add `last_refresh`, update visual direction |
| `[client-slug]-competitor-*` | Add `current_analysis`, update observations |
| `[client-slug]-market-gaps` | Replace gaps with current analysis |

### Entities Potentially Added
- New competitor entities (if new competitors identified)
- New avatar entities (if new avatars created)

### Entities Potentially Retired
- Avatar entities marked as `status: retired`
- (Note: Don't delete, just mark inactive)

---

## Final Validation Checklist

### Research Documents
- [ ] Competitive shifts documented
- [ ] New market gaps identified
- [ ] Refresh rationale clear

### Brand Documents
- [ ] Brand DNA updated per scope
- [ ] Evolution notes document created
- [ ] Voice updated (if in scope)
- [ ] Visual updated (if in scope)
- [ ] Avatar roster updated

### Strategy Documents
- [ ] Content pillars revised
- [ ] Transition plan documented
- [ ] Avatar mapping updated

### Delivery Documents
- [ ] Refresh summary created
- [ ] Before/after documented
- [ ] Presentation ready
- [ ] Previous versions archived

### Memory Entities
- [ ] Brand entity has `last_refresh` date
- [ ] Voice entity updated
- [ ] Visual entity updated
- [ ] Active avatars current
- [ ] Retired avatars marked
- [ ] Competitor entities updated

---

## Common Issues & Solutions

### Issue: Can't determine what to preserve
**Symptom:** Unclear what should stay vs. change
**Solution:** Review performance data. What's working (high engagement) should be preserved. What's not resonating should change.

### Issue: Memory entities duplicated
**Symptom:** Multiple entities with same base name
**Solution:** Use exact entity name when updating. MCP overwrites by name.

### Issue: Old content still references retired avatar
**Symptom:** Content uses avatar marked as retired
**Solution:** Include transition plan in content strategy. Gradually phase out old avatar in new content.

### Issue: Client confused by changes
**Symptom:** Client doesn't understand why brand changed
**Solution:** Ensure brand evolution notes and refresh rationale are in presentation. Show market data that drove decisions.

### Issue: Refresh scope creep
**Symptom:** Started as partial refresh, became full rebrand
**Solution:** Stick to defined scope. If more changes needed, note for future phase.

---

## Time Estimates by Step

| Step | Agent | Estimated Time |
|------|-------|----------------|
| Pre-flight | (validation + scope) | 10-15 minutes |
| 1. Market Analysis | market-competitor-analyst | 45-60 minutes |
| 2. Brand DNA Update | brand-dna-architect | 45-75 minutes |
| 3. Strategy Alignment | content-strategist | 25-35 minutes |
| 4. Client Delivery | delivery-documentation-manager | 20-30 minutes |
| **Total** | | **2-3 hours** |

---

*Workflow Version: 1.0 | Last Updated: 2025-12-31*






