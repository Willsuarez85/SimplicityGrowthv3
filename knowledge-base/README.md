# Knowledge Base

Agency-wide learnings, insights, and best practices that compound over time.

## Knowledge Base vs Client Memory

**Important Distinction:**

- **Knowledge Base** (`/knowledge-base/`): **General agency knowledge** that applies across multiple clients
  - Industry insights (restaurants, real estate, home services)
  - Platform strategies (TikTok, Instagram, YouTube, Meta Ads)
  - Best practices and proven patterns
  - Cross-client learnings and trends
  - **Shared across all projects**

- **Client Memory** (MCP Knowledge Graph): **Client-specific information** stored per client
  - Brand DNA, tone of voice, visual identity
  - Client avatars and personas
  - Client-specific preferences and constraints
  - **Private to each client** (stored as `[client-slug]-*` entities)

**Rule:** If it's specific to ONE client → Client Memory. If it applies to MULTIPLE clients → Knowledge Base.

## Folders

| Folder | Purpose | Example Content |
|--------|---------|-----------------|
| `industry-insights/` | Industry-specific knowledge | "Restaurant marketing patterns", "Real estate lead gen strategies" |
| `platform-guides/` | Platform-specific strategies | "TikTok algorithm changes", "Instagram Reels best practices" |
| `best-practices/` | Proven patterns, successful campaigns | "Hook patterns that work", "Campaign structures that convert" |
| `trends-intelligence-2025/` | Current platform trends and momentum signals | "What's working now", "Platform behavior patterns" |

## Contributing Process

### Who Decides What Enters the Knowledge Base?

**Primary Decision Makers:**

1. **Content Strategist** - After completing content strategy work
   - Extracts patterns that worked across multiple clients
   - Documents successful content angles and hooks
   - Identifies industry-specific insights

2. **Trends & Platform Intelligence Analyst** - After trend analysis
   - Platform behavior changes
   - Algorithm shifts and new features
   - Cross-platform performance patterns

3. **Market & Competitor Analyst** - After competitive research
   - Industry-wide competitive patterns
   - Market opportunities applicable to multiple clients
   - Strategic frameworks that work across niches

4. **Delivery Documentation Manager** - After project completion
   - Reviews completed work for extractable learnings
   - Identifies patterns worth documenting
   - Ensures knowledge transfer happens

**Human Oversight:** Final decision on what enters Knowledge Base should be reviewed by human team lead before permanent addition.

### When to Add to Knowledge Base

**Trigger Points:**

1. **After Campaign Completion** - When results are in and patterns are clear
   - What worked? What didn't?
   - What can be reused for other clients?

2. **After Multiple Client Projects** - When you see the same pattern work 2-3 times
   - If it worked for multiple clients, it's generalizable knowledge

3. **After Platform Changes** - When algorithms or features change
   - Document new behaviors and opportunities

4. **Quarterly Reviews** - Systematic knowledge extraction
   - Review all completed work
   - Extract and synthesize learnings

### What Goes Where?

**Knowledge Base (General):**
- ✅ Hook patterns that worked for 2+ clients
- ✅ Platform strategies applicable to multiple industries
- ✅ Industry insights (not client-specific)
- ✅ Campaign structures that convert across niches
- ✅ Tool recommendations and workflows
- ✅ Cultural trends and audience behavior patterns

**Client Memory (Specific):**
- ✅ Client's brand DNA and voice
- ✅ Client's visual identity preferences
- ✅ Client-specific avatars and personas
- ✅ Client's unique constraints or requirements
- ✅ Client-specific messaging that worked

**Example:**
- ❌ "Restaurant X's brand voice" → Client Memory
- ✅ "Bilingual restaurant marketing patterns" → Knowledge Base
- ❌ "Client Y's color palette" → Client Memory  
- ✅ "Color psychology for Latino audiences" → Knowledge Base

## Contribution Workflow

### Step 1: Identify Extractable Learning
After completing client work, ask:
- "Does this apply to other clients?"
- "Is this a pattern or a one-off?"
- "Would this help future projects?"

### Step 2: Categorize
- **Industry-specific?** → `industry-insights/[industry-name]/`
- **Platform-specific?** → `platform-guides/[platform-name]/`
- **General best practice?** → `best-practices/`
- **Current trend?** → `trends-intelligence-2025/`

### Step 3: Document
Create or update markdown files with:
- Clear title and date
- Context (where this came from)
- Evidence (what proves this works)
- Application (how to use this)
- Examples (real examples from client work, anonymized)

### Step 4: Review & Add
- Document in appropriate folder
- Follow existing file naming conventions
- Link to related knowledge base entries
- Update relevant README files

## File Naming Conventions

```
[category]_[topic]_[date].md
```

Examples:
- `industry-insights/restaurants_bilingual_marketing_2025-01.md`
- `platform-guides/tiktok_hook_patterns_2025-01.md`
- `best-practices/campaign_structure_frameworks.md`
- `trends-intelligence-2025/what_is_working_now.md` (updated monthly)

## Quality Standards

Every Knowledge Base entry should:
- ✅ Be evidence-based (not assumptions)
- ✅ Include context (where/when this was observed)
- ✅ Be actionable (how to apply this)
- ✅ Be anonymized (no client-specific details)
- ✅ Be current (date-stamped, reviewed for relevance)

## Maintenance

- **Monthly:** Review `trends-intelligence-2025/what_is_working_now.md`
- **Quarterly:** Review all folders for outdated content
- **Annually:** Comprehensive knowledge base audit and cleanup

---

**Remember:** Knowledge Base compounds over time. Every contribution makes the agency smarter and faster for future clients.
