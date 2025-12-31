# Memory Entity Checklist: [CLIENT NAME]

**Client Slug:** `[client-slug]`
**Checklist Date:** [DATE]
**Completed By:** [Agent Name]

---

## Required Entities

### Core Entities

| Entity | Name | Status | Created Date |
|--------|------|--------|--------------|
| Client | `[client-slug]` | [ ] Pending | - |
| Brand | `[client-slug]-brand` | [ ] Pending | - |
| ToneOfVoice | `[client-slug]-voice` | [ ] Pending | - |
| VisualIdentity | `[client-slug]-visual` | [ ] Pending | - |

### Avatar Entities

| Avatar Role | Entity Name | Status | Created Date |
|-------------|-------------|--------|--------------|
| [Role 1] | `[client-slug]-avatar-[role1]` | [ ] Pending | - |
| [Role 2] | `[client-slug]-avatar-[role2]` | [ ] Pending | - |

---

## Entity Relationships

| From | Relation Type | To | Status |
|------|---------------|-----|--------|
| `[client-slug]-brand` | belongs_to | `[client-slug]` | [ ] Pending |
| `[client-slug]-voice` | defines_voice_for | `[client-slug]-brand` | [ ] Pending |
| `[client-slug]-visual` | defines_visual_for | `[client-slug]-brand` | [ ] Pending |
| `[client-slug]-avatar-[role1]` | represents | `[client-slug]-brand` | [ ] Pending |
| `[client-slug]-avatar-[role2]` | represents | `[client-slug]-brand` | [ ] Pending |

---

## Entity Observations Validation

### Client Entity Observations
- [ ] `business_name` - Full legal/display business name
- [ ] `industry` - Industry category
- [ ] `location` - City, State/Country
- [ ] `status` - active/inactive
- [ ] `onboarding_date` - YYYY-MM-DD format
- [ ] `primary_contact` - Contact name (optional)

### Brand Entity Observations
- [ ] `purpose` - Why the brand exists (from brand DNA)
- [ ] `promise` - Brand promise statement
- [ ] `archetype_primary` - Primary archetype (e.g., The Sage)
- [ ] `archetype_secondary` - Secondary archetype
- [ ] `personality_summary` - 2-3 sentence description
- [ ] `tagline` - Primary tagline
- [ ] `core_values` - Comma-separated list

### ToneOfVoice Entity Observations
- [ ] `language_style` - Language approach (e.g., bilingual, formal)
- [ ] `emotional_posture` - Emotional tone (e.g., warm confidence)
- [ ] `formality_level` - Formality description
- [ ] `signature_phrases` - List of signature phrases
- [ ] `forbidden_words` - Words/phrases to avoid
- [ ] `communication_principles` - Key principles

### VisualIdentity Entity Observations
- [ ] `primary_mood` - Primary visual mood
- [ ] `secondary_mood` - Secondary visual mood
- [ ] `color_palette_primary` - Primary colors
- [ ] `color_palette_accent` - Accent colors
- [ ] `typography_direction` - Font style direction
- [ ] `lighting_preference` - Lighting style
- [ ] `photography_style` - Photo approach
- [ ] `video_aesthetic` - Video style direction

### Avatar Entity Observations (per avatar)
- [ ] `avatar_name` - Display name
- [ ] `role` - Role/archetype
- [ ] `purpose` - What this avatar does
- [ ] `personality_traits` - Comma-separated traits
- [ ] `voice_style` - How this avatar speaks
- [ ] `visual_appearance` - Physical description for AI generation
- [ ] `content_focus` - What content this avatar creates

---

## Source Document Verification

| Entity | Required Source | Location | Verified |
|--------|-----------------|----------|----------|
| Brand | brand_dna_core.md | 02-strategy/brand-dna/ | [ ] |
| ToneOfVoice | tone_of_voice_guidelines.md | 02-strategy/brand-dna/ | [ ] |
| VisualIdentity | visual_identity_direction.md | 02-strategy/brand-dna/ | [ ] |
| Avatars | ai_avatars.md | 02-strategy/brand-dna/ | [ ] |

---

## Validation Checks

### Naming Convention
- [ ] All entity names use lowercase
- [ ] All entity names use hyphens (not underscores)
- [ ] Client slug is consistent across all entities
- [ ] Avatar role slugs are descriptive (e.g., "educator", "founder", "expert")

### Data Quality
- [ ] All observations extracted from source documents
- [ ] No placeholder text remains ([EXAMPLE], TBD, etc.)
- [ ] Bilingual content preserved where applicable
- [ ] Dates in correct format (YYYY-MM-DD)

### Completeness
- [ ] All required entities created
- [ ] All relationships established
- [ ] All mandatory observations populated
- [ ] client_memory_profile.md updated

---

## MCP Commands Reference

### Create Entities
```
mcp__memory__create_entities({
  "entities": [
    {
      "name": "[client-slug]",
      "entityType": "Client",
      "observations": ["business_name: [value]", "industry: [value]", ...]
    }
  ]
})
```

### Create Relations
```
mcp__memory__create_relations({
  "relations": [
    {
      "from": "[client-slug]-brand",
      "to": "[client-slug]",
      "relationType": "belongs_to"
    }
  ]
})
```

### Verify Creation
```
mcp__memory__open_nodes(["[client-slug]", "[client-slug]-brand", "[client-slug]-voice", "[client-slug]-visual"])
```

---

## Sign-Off

| Role | Agent | Date | Status |
|------|-------|------|--------|
| Created By | brand-dna-architect | [DATE] | [ ] Complete |
| Verified By | client-file-architect | [DATE] | [ ] Verified |

---

**Template Version:** 1.0
**Document Owner:** brand-dna-architect / client-file-architect
