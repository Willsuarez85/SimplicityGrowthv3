# Workflow Guides

> Step-by-step guides for common multi-agent workflows in the Simplicity Growth Marketing AI Agent System.

---

## Available Workflows

| Workflow | Agents | Duration | Prerequisites | Guide |
|----------|--------|----------|---------------|-------|
| **New Client Onboarding** | 4 | 2-4 hours | Client name, industry, location | [new-client-onboarding.md](new-client-onboarding.md) |
| **Content Campaign** | 5 | 1-2 hours | Existing brand DNA | [content-campaign.md](content-campaign.md) |
| **Brand Refresh** | 4 | 2-3 hours | Existing client folder | [brand-refresh.md](brand-refresh.md) |
| **Quick Creative** | 3 | 30-60 min | Existing brand DNA + content type | [quick-creative.md](quick-creative.md) |

---

## How Workflows Are Triggered

Workflows are automatically detected from natural language patterns. The system recognizes trigger phrases and initiates the corresponding agent sequence.

### Trigger Examples

| Say This | Workflow Triggered |
|----------|-------------------|
| "New client: Taqueria El Sol" | New Client Onboarding |
| "Content campaign for los-paisas" | Content Campaign |
| "Refresh brand for maria-realty" | Brand Refresh |
| "Create a reel for taqueria-el-sol" | Quick Creative |

See `CLAUDE.md` "Automatic Workflow Triggers" section for complete trigger patterns.

---

## Workflow Selection Guide

```
Need to work with a client?
│
├─► NEW client (no existing work)?
│   └─► New Client Onboarding
│       Creates: folders, research, brand DNA
│
├─► EXISTING client needs content?
│   │
│   ├─► Full campaign (multiple pieces)?
│   │   └─► Content Campaign
│   │       Creates: strategy, storyboards, prompts, delivery
│   │
│   └─► Single piece (quick turnaround)?
│       └─► Quick Creative
│           Creates: storyboard, prompts, handoff
│
└─► EXISTING client needs brand update?
    └─► Brand Refresh
        Updates: research, brand DNA, strategy
```

---

## Workflow Prerequisites

### New Client Onboarding
- Client business name
- Industry/niche (e.g., "Mexican restaurant", "Real estate")
- Location (city, state)
- Basic business information (optional but helpful)

### Content Campaign
- Existing client with Brand DNA in memory
- Campaign objectives (awareness, engagement, conversion)
- Content quantity needed
- Target platforms (TikTok, Instagram, YouTube)

### Brand Refresh
- Existing client folder structure
- Reason for refresh (market shift, repositioning, expansion)
- Scope of refresh (full or partial)

### Quick Creative
- Existing client with Brand DNA in memory
- Content type (reel, ad, carousel, story)
- Topic or angle
- Optional: Specific avatar to use

---

## Memory Integration

All workflows interact with the MCP Knowledge Graph (Memory):

### Entities Created by Workflow

| Workflow | Creates | Updates |
|----------|---------|---------|
| New Client Onboarding | Client, Brand, Voice, Visual, Avatars, CompetitorInsight, MarketGap, TrendSnapshot, HookLibrary | - |
| Content Campaign | TrendSnapshot (if refresh needed) | HookLibrary |
| Brand Refresh | - | Brand, Voice, Visual, Avatars, CompetitorInsight, MarketGap |
| Quick Creative | - | - (read-only) |

### Memory Documentation
- Entity definitions: `docs/memory-architecture.md`
- Entity relationships: See Mermaid diagram in memory-architecture.md
- Naming conventions: `[client-slug]-[entity-type]`

---

## Workflow Validation

Each workflow includes validation checkpoints:

1. **Pre-flight Check** - Verify prerequisites exist
2. **Step Validation** - Confirm each agent's output
3. **Memory Validation** - Verify entities created/updated
4. **Completion Check** - All deliverables present

### Validation Commands

```javascript
// Check if client exists in memory
mcp__memory__open_nodes(["[client-slug]"])

// Check if brand DNA exists
mcp__memory__open_nodes(["[client-slug]-brand"])

// List all client entities
mcp__memory__search_nodes("[client-slug]-")
```

---

## Related Documentation

| Document | Purpose |
|----------|---------|
| `CLAUDE.md` | Agent routing rules, workflow triggers |
| `docs/memory-architecture.md` | Memory entity definitions |
| `docs/marketer-workflow-guide.md` | User-facing workflow guide (Spanish) |
| `ROADMAP.md` | Development roadmap |

---

## Workflow Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2025-12-31 | Initial workflow guides created |

---

*These guides are maintained as part of the SimplicityAgents v3 system.*







