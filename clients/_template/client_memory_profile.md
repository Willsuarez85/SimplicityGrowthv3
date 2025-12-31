# Client Memory Profile: [CLIENT NAME]

**Memory System Status:** [Active/Pending]
**Last Sync:** [DATE]
**Entity Count:** [NUMBER]

---

## Quick Reference

| Entity Type | Entity Name | Status |
|-------------|-------------|--------|
| Client | [client-slug] | [active/pending] |
| Brand | [client-slug]-brand | [active/pending] |
| ToneOfVoice | [client-slug]-voice | [active/pending] |
| VisualIdentity | [client-slug]-visual | [active/pending] |
| Avatar | [client-slug]-avatar-[role] | [active/pending] |

---

## Memory Entities

### Client Entity

**Entity Name:** `[client-slug]`
**Entity Type:** Client

**Observations:**
| Field | Value |
|-------|-------|
| business_name | [Full business name] |
| industry | [Industry category] |
| location | [City, State] |
| status | [active/inactive] |
| onboarding_date | [YYYY-MM-DD] |
| primary_contact | [Contact name] |

---

### Brand Entity

**Entity Name:** `[client-slug]-brand`
**Entity Type:** Brand

**Relation:** `[client-slug]-brand` → `belongs_to` → `[client-slug]`

**Observations:**
| Field | Value |
|-------|-------|
| purpose | [From brand DNA - why the brand exists] |
| promise | [From brand DNA - brand promise statement] |
| archetype_primary | [Primary archetype, e.g., The Sage] |
| archetype_secondary | [Secondary archetype, e.g., The Creator] |
| personality_summary | [2-3 sentence personality description] |
| tagline | [Primary tagline] |
| core_values | [Comma-separated list of core values] |

---

### Tone of Voice Entity

**Entity Name:** `[client-slug]-voice`
**Entity Type:** ToneOfVoice

**Relation:** `[client-slug]-voice` → `defines_voice_for` → `[client-slug]-brand`

**Observations:**
| Field | Value |
|-------|-------|
| language_style | [e.g., Bilingual English-Spanish, code-switching] |
| emotional_posture | [e.g., Calm confidence, warm authority] |
| formality_level | [e.g., Professional but approachable] |
| signature_phrases | [List of signature phrases or patterns] |
| forbidden_words | [Words/phrases to avoid] |
| communication_principles | [Key communication principles] |

---

### Visual Identity Entity

**Entity Name:** `[client-slug]-visual`
**Entity Type:** VisualIdentity

**Relation:** `[client-slug]-visual` → `defines_visual_for` → `[client-slug]-brand`

**Observations:**
| Field | Value |
|-------|-------|
| primary_mood | [e.g., Confident Clarity] |
| secondary_mood | [e.g., Cultural Warmth] |
| color_palette_primary | [Primary colors with hex codes if available] |
| color_palette_accent | [Accent colors] |
| typography_direction | [Font style direction, e.g., Modern sans-serif] |
| lighting_preference | [e.g., Natural, soft, warm 2700-4000K] |
| photography_style | [e.g., Authentic, not staged, real environments] |
| video_aesthetic | [Video style direction] |

---

### Avatar Entities

#### Avatar 1: [AVATAR NAME]

**Entity Name:** `[client-slug]-avatar-[role-slug]`
**Entity Type:** Avatar

**Relation:** `[client-slug]-avatar-[role-slug]` → `represents` → `[client-slug]-brand`

**Observations:**
| Field | Value |
|-------|-------|
| avatar_name | [Display name] |
| role | [Role/archetype] |
| purpose | [What this avatar does] |
| personality_traits | [Comma-separated traits] |
| voice_style | [How this avatar speaks] |
| visual_appearance | [Physical description for AI generation] |
| content_focus | [What content this avatar creates] |

#### Avatar 2: [AVATAR NAME]

**Entity Name:** `[client-slug]-avatar-[role-slug]`
**Entity Type:** Avatar

**Relation:** `[client-slug]-avatar-[role-slug]` → `represents` → `[client-slug]-brand`

**Observations:**
| Field | Value |
|-------|-------|
| avatar_name | [Display name] |
| role | [Role/archetype] |
| purpose | [What this avatar does] |
| personality_traits | [Comma-separated traits] |
| voice_style | [How this avatar speaks] |
| visual_appearance | [Physical description for AI generation] |
| content_focus | [What content this avatar creates] |

---

## Entity Relationship Map

```
[client-slug] (Client)
    │
    └── belongs_to ←── [client-slug]-brand (Brand)
                            │
                            ├── defines_voice_for ←── [client-slug]-voice (ToneOfVoice)
                            │
                            ├── defines_visual_for ←── [client-slug]-visual (VisualIdentity)
                            │
                            ├── represents ←── [client-slug]-avatar-[role1] (Avatar)
                            │
                            └── represents ←── [client-slug]-avatar-[role2] (Avatar)
```

---

## Source Documents

| Entity | Source Document | Location |
|--------|-----------------|----------|
| Brand | brand_dna_core.md | 02-strategy/brand-dna/ |
| ToneOfVoice | tone_of_voice_guidelines.md | 02-strategy/brand-dna/ |
| VisualIdentity | visual_identity_direction.md | 02-strategy/brand-dna/ |
| Avatars | ai_avatars.md | 02-strategy/brand-dna/ |

---

## Sync History

| Date | Action | Agent | Notes |
|------|--------|-------|-------|
| [YYYY-MM-DD] | Initial creation | brand-dna-architect | Created all entities |
| | | | |

---

## Usage Notes

### For Content Strategist
Query these entities before creating content strategy:
```
mcp__memory__open_nodes(["[client-slug]-brand", "[client-slug]-voice"])
mcp__memory__search_nodes("[client-slug]-avatar")
```

### For Creative Director
Query these entities before creating storyboards/scripts:
```
mcp__memory__open_nodes(["[client-slug]-visual", "[client-slug]-voice"])
```

### For Prompt Asset Engineer
Query these entities before generating AI prompts:
```
mcp__memory__open_nodes(["[client-slug]-visual"])
```

---

**Document Owner:** brand-dna-architect / client-file-architect
**Template Version:** 1.0
**Created:** [DATE]
