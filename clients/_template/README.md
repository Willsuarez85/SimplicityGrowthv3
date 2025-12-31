# Client Folder Template

This is the standard folder structure for all Simplicity Growth Marketing clients.

## How to Use

1. Copy this entire `_template` folder
2. Rename to client name (lowercase, hyphens): `los-paisas`, `remax-charlotte`
3. Begin work following the phase sequence

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
└── 05-deliverables/
    ├── presentations/      → Client presentations & PDFs
    └── handoff-packages/   → Editor & production handoffs
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
