# Quick Creative Workflow

> Fast creative execution for specific content pieces—from idea to editor-ready in under an hour.

---

## Overview

| Attribute | Value |
|-----------|-------|
| **Purpose** | Fast creative execution for specific content |
| **Duration** | 30-60 minutes |
| **Agents** | 3 (creative-director, prompt-asset-engineer, delivery-documentation-manager) |
| **Prerequisite** | Brand DNA must exist in memory |
| **Output** | Storyboard, script, AI prompts, editor handoff |

---

## Trigger Patterns

The system automatically recognizes these phrases and initiates this workflow:

```
"Create [content type] for [client]"
"Quick [reel/ad/carousel] for [client]"
"Make a [content type] about [topic]"
"I need a [content type] about [topic] for [client]"
"[Client] needs a [content type] for [occasion]"
"Fast turnaround [content type] for [client]"
```

**Examples:**
```
User: "Create a reel about fresh ingredients for taqueria-el-sol"
System: Initiates Quick Creative workflow

User: "Quick ad for los-paisas about their new salsa bar"
System: Initiates Quick Creative workflow

User: "Make a carousel about home buying tips for maria-realty"
System: Initiates Quick Creative workflow
```

---

## When to Use Quick Creative

### Use Quick Creative When:
- You need ONE specific content piece
- Brand DNA already exists
- Topic/angle is already defined
- Fast turnaround is needed
- No new strategy required

### Don't Use Quick Creative When:
- Need multiple content pieces (use Content Campaign)
- Client is new (use New Client Onboarding)
- Brand needs updating (use Brand Refresh)
- Topic requires research first

---

## Prerequisites

### Required
| Check | Description | How to Verify |
|-------|-------------|---------------|
| **Brand DNA exists** | Core identity defined | `mcp__memory__open_nodes(["[client-slug]-brand"])` |
| **Voice exists** | Communication style defined | `mcp__memory__open_nodes(["[client-slug]-voice"])` |
| **Visual exists** | Aesthetic direction defined | `mcp__memory__open_nodes(["[client-slug]-visual"])` |
| **Avatars exist** | At least 1 avatar available | `mcp__memory__search_nodes("[client-slug]-avatar")` |

### Quick Pre-flight
```javascript
// Fast check - all required entities
mcp__memory__open_nodes([
  "[client-slug]-brand",
  "[client-slug]-voice",
  "[client-slug]-visual"
])
// Must return all 3 valid entities
```

**If pre-flight fails:** Cannot use Quick Creative. Run New Client Onboarding first.

### Information Needed
| Required | Description | Example |
|----------|-------------|---------|
| **Content type** | Format to create | "reel", "ad", "carousel", "story" |
| **Topic/angle** | What the content is about | "Fresh ingredients", "Customer testimonial" |

| Optional | Description | Example |
|----------|-------------|---------|
| **Specific avatar** | Which persona to use | "Use the educator avatar" |
| **Platform** | Where it will be posted | "TikTok", "Instagram" |
| **Hook preference** | Specific opening style | "Start with a question" |
| **Call to action** | Desired viewer action | "Visit website", "Comment" |

---

## Workflow Sequence

```
┌─────────────────────────────────────────────────────────────────┐
│  PRE-FLIGHT: Verify Brand DNA exists (quick check)              │
│  Time: ~2 minutes                                               │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│  STEP 1: Creative Direction                                     │
│  Agent: creative-director                                       │
│  Output: Storyboard + Script                                    │
│  Time: 15-25 minutes                                            │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│  STEP 2: AI Prompts                                             │
│  Agent: prompt-asset-engineer                                   │
│  Output: Generation-ready prompts                               │
│  Time: 10-20 minutes                                            │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│  STEP 3: Editor Handoff                                         │
│  Agent: delivery-documentation-manager                          │
│  Output: Ready-to-use package                                   │
│  Time: 5-10 minutes                                             │
└─────────────────────────────────────────────────────────────────┘
```

---

## Step-by-Step Execution

### Pre-Flight: Quick Verification

**Fast Memory Check:**
```javascript
// Single query for all essentials
mcp__memory__open_nodes([
  "[client-slug]-brand",
  "[client-slug]-voice",
  "[client-slug]-visual"
])
```

**Select Avatar (if not specified):**
```javascript
// Get available avatars
mcp__memory__search_nodes("[client-slug]-avatar")
// Select most appropriate for content type
```

**Avatar Selection Guide:**
| Content Type | Best Avatar Type |
|--------------|------------------|
| Educational content | Educator/Expert |
| Entertainment/fun | Entertainer/Host |
| Behind-the-scenes | Insider/Team member |
| Testimonial-style | Relatable/Peer |

---

### Step 1: Creative Direction

**Agent:** `creative-director`

**Memory Queries (Minimal Set):**
```javascript
// Get visual direction (CRITICAL for storyboarding)
mcp__memory__open_nodes(["[client-slug]-visual"])

// Get voice guidelines (CRITICAL for script)
mcp__memory__open_nodes(["[client-slug]-voice"])

// Get selected avatar
mcp__memory__open_nodes(["[client-slug]-avatar-[role]"])
```

**Input Required:**
- Content type
- Topic/angle
- Avatar selection (or default)
- Platform (optional)

**Actions Performed:**
1. Create storyboard (scene-by-scene)
2. Write script (spoken word + on-screen text)
3. Define hook (first 3 seconds)
4. Note visual direction

**Output Files:**
```
/clients/[client-slug]/03-creative/
├── storyboards/
│   └── storyboard-[content-type]-[topic-slug].md
└── scripts/
    └── script-[content-type]-[topic-slug].md
```

**Storyboard Speed Template:**
```markdown
# Storyboard: [Topic] [Content Type]

## Meta
- **Format:** [Reel/Ad/Carousel/Story]
- **Duration:** [seconds]
- **Avatar:** [name]
- **Platform:** [TikTok/Instagram/Both]

## Hook (0-3 seconds)
**Visual:** [What viewer sees]
**Audio:** [What they hear]
**On-screen text:** [If any]

## Scene 1 (3-X seconds)
**Visual:** [Description]
**Action:** [What happens]
**Audio:** [Dialogue/music]

## Scene 2 (X-Y seconds)
[Continue pattern]

## CTA (Final seconds)
**Visual:** [End frame]
**Audio:** [Call to action]
**On-screen text:** [CTA text]

## Production Notes
- [Key visual requirements]
- [Audio notes]
- [Transitions]
```

**Validation:**
- [ ] Hook is attention-grabbing
- [ ] Script matches avatar voice
- [ ] Duration appropriate for platform
- [ ] CTA is clear

---

### Step 2: AI Prompts

**Agent:** `prompt-asset-engineer`

**Memory Queries (Minimal Set):**
```javascript
// Get visual identity for prompt styling
mcp__memory__open_nodes(["[client-slug]-visual"])

// Get avatar appearance for consistency
mcp__memory__open_nodes(["[client-slug]-avatar-[role]"])
```

**Input Required:**
- Storyboard from Step 1
- Visual identity from memory
- Avatar visual description

**Actions Performed:**
1. Create AI prompts for needed visuals
2. Specify model recommendations
3. Define keyframes (for video)
4. Include consistency guidance

**Output Files:**
```
/clients/[client-slug]/03-creative/prompts/
├── image_prompts/
│   └── prompt-[topic-slug]-[n].md (if image needed)
├── video_prompts/
│   └── prompt-[topic-slug]-[n].md (if video needed)
└── keyframe_definitions/
    └── keyframes-[topic-slug].md (if applicable)
```

**Quick Prompt Template:**
```markdown
# AI Prompt: [Description]

## Prompt ID
[model]_[client]_[topic]_[type]_v1

## Model
[flux_dev / veo3 / nano_banana_pro]

## Main Prompt
[Full prompt incorporating visual identity]

## Style Reference
- Mood: [from visual memory]
- Lighting: [from visual memory]
- Colors: [from visual memory]

## Avatar Appearance (if applicable)
[From avatar memory: age, ethnicity, style, etc.]

## Technical Specs
- Aspect ratio: [9:16 for vertical, 16:9 for horizontal]
- Duration: [for video]
```

**Validation:**
- [ ] Prompt incorporates brand visual direction
- [ ] Avatar description matches memory
- [ ] Model appropriate for content type
- [ ] Specs match platform requirements

---

### Step 3: Editor Handoff

**Agent:** `delivery-documentation-manager`

**Memory Query (Minimal):**
```javascript
// Get client name for documentation
mcp__memory__open_nodes(["[client-slug]"])
```

**Input Required:**
- Storyboard from Step 1
- Script from Step 1
- Prompts from Step 2

**Actions Performed:**
1. Create concise handoff document
2. List all files with locations
3. Note any production requirements
4. Mark as ready for editor

**Output Files:**
```
/clients/[client-slug]/05-deliverables/handoff-packages/
└── quick_handoff_[topic-slug].md
```

**Quick Handoff Template:**
```markdown
# Editor Handoff: [Topic] [Content Type]

## Created
- **Date:** [YYYY-MM-DD]
- **Client:** [Business Name]
- **Content Type:** [Reel/Ad/Carousel]

## Files
| File | Location | Status |
|------|----------|--------|
| Storyboard | `03-creative/storyboards/[file]` | Ready |
| Script | `03-creative/scripts/[file]` | Ready |
| AI Prompts | `03-creative/prompts/[folder]/[file]` | Ready |

## Quick Summary
[1-2 sentence description of the content]

## Avatar
[Avatar name] - [brief description]

## Production Notes
- [Key requirement 1]
- [Key requirement 2]

## Priority
[High/Medium/Low]

## Deadline (if applicable)
[Date or "ASAP"]
```

**Validation:**
- [ ] All files listed exist
- [ ] Paths are correct
- [ ] Summary is clear
- [ ] Priority assigned

---

## Speed Optimizations

### Skip What's Not Needed
| Scenario | Skip |
|----------|------|
| Text-only content (carousel) | Video prompts |
| Live-action video | AI prompts |
| Simple hook video | Complex keyframes |
| Internal use | Formal handoff |

### Use Defaults
| When | Default |
|------|---------|
| No avatar specified | First/primary avatar |
| No platform specified | Instagram Reel (9:16) |
| No duration specified | 30 seconds |
| No CTA specified | "Follow for more" |

### Quick Memory Queries
Instead of multiple queries, batch when possible:
```javascript
// One query for all needed context
mcp__memory__open_nodes([
  "[client-slug]-visual",
  "[client-slug]-voice",
  "[client-slug]-avatar-educator"
])
```

---

## Content Type Quick Reference

### Reel
- **Duration:** 15-60 seconds
- **Aspect:** 9:16 (vertical)
- **Hook:** First 1-3 seconds critical
- **Audio:** Music or voiceover

### Ad
- **Duration:** 15-30 seconds
- **Aspect:** 9:16 or 1:1
- **Hook:** Immediate value prop
- **CTA:** Strong, specific action

### Carousel
- **Slides:** 5-10
- **Aspect:** 1:1 or 4:5
- **Hook:** Slide 1 must stop scroll
- **CTA:** Last slide action

### Story
- **Duration:** 15 seconds max
- **Aspect:** 9:16
- **Hook:** Immediate engagement
- **Interactive:** Poll, question, slider

---

## Memory Interactions Summary

### Read Operations Only
| Step | Entity | Purpose |
|------|--------|---------|
| Pre-flight | Brand, Voice, Visual | Verify prerequisites |
| Step 1 | Visual, Voice, Avatar | Creative direction |
| Step 2 | Visual, Avatar | Prompt generation |
| Step 3 | Client | Documentation |

### No Write Operations
Quick Creative is read-only for memory. No new entities are created or updated.

---

## Final Validation Checklist

### Creative Documents
- [ ] Storyboard exists with hook defined
- [ ] Script matches avatar voice
- [ ] Duration appropriate for platform
- [ ] CTA included

### Production Documents
- [ ] AI prompts created (if needed)
- [ ] Prompts incorporate visual identity
- [ ] Model recommendations specified

### Handoff Documents
- [ ] Quick handoff file created
- [ ] All file paths accurate
- [ ] Priority assigned

---

## Common Issues & Solutions

### Issue: Brand DNA not found
**Symptom:** Pre-flight fails
**Solution:** Cannot use Quick Creative. Run New Client Onboarding first.

### Issue: No avatars available
**Symptom:** Avatar search returns empty
**Solution:** Create avatar first via brand-dna-architect or use generic brand voice.

### Issue: Hook feels weak
**Symptom:** First 3 seconds don't grab attention
**Solution:** Revisit hook. Use curiosity gap, bold claim, or direct question.

### Issue: Prompts don't match brand
**Symptom:** AI-generated assets feel off-brand
**Solution:** Ensure visual memory was queried. Add more style guidance to prompts.

### Issue: Handoff unclear
**Symptom:** Editor has questions
**Solution:** Add more detail to production notes. Include reference examples if available.

---

## Time Estimates

| Step | Agent | Fast | Standard |
|------|-------|------|----------|
| Pre-flight | (validation) | 1 min | 2 min |
| 1. Creative | creative-director | 15 min | 25 min |
| 2. Prompts | prompt-asset-engineer | 10 min | 20 min |
| 3. Handoff | delivery-documentation-manager | 5 min | 10 min |
| **Total** | | **~30 min** | **~60 min** |

### Speed vs. Quality Trade-offs
| Speed Priority | Quality Priority |
|----------------|------------------|
| Use default avatar | Select optimal avatar |
| Single hook option | Multiple hook options |
| Basic prompts | Detailed prompts with variations |
| Minimal handoff | Comprehensive handoff |

---

## Example: Quick Reel Creation

**User:** "Create a reel about fresh ingredients for taqueria-el-sol"

**Pre-flight:**
```javascript
mcp__memory__open_nodes(["taqueria-el-sol-brand", "taqueria-el-sol-voice", "taqueria-el-sol-visual"])
// All exist → proceed
```

**Step 1 Output:**
- `storyboard-reel-fresh-ingredients.md`
- `script-reel-fresh-ingredients.md`

**Step 2 Output:**
- `prompt-fresh-ingredients-kitchen.md`
- `prompt-fresh-ingredients-produce.md`

**Step 3 Output:**
- `quick_handoff_fresh-ingredients.md`

**Total Time:** ~35 minutes

---

*Workflow Version: 1.0 | Last Updated: 2025-12-31*




