# Market Validation Research Plan: Ramesh Wellness Coaching

**Client:** Ramesh (Personal Brand Wellness Coach)
**Target Audience:** Professional women 50-65 in finance/corporate seeking holistic wellness
**Status:** Pre-launch validation research (product/strategy not yet proven)
**Decision:** This is a TWO-PHASE engagement - validate market viability BEFORE full onboarding

---

## Executive Summary

Ramesh is a wellness coach targeting "Professional Annie" (50-65, finance/corporate professionals) with a holistic approach bridging science and spirituality. Before investing $6K-8K in full brand development, we must validate if there's a viable market.

**Approach:** Run 5-phase market validation research with fail-fast checkpoints. If validated, migrate research into standard onboarding (50% time reduction). If not validated, pivot or recommend no-go with minimal investment.

**Cost:** $1,680-2,200 (52 hours + $100-200 tools)
**Timeline:** 7-11 days
**Deliverable:** `VALIDATION_REPORT.md` with Go/Pivot/No-Go recommendation

---

## Why Pre-Validation?

Standard onboarding assumes market viability. For unproven offers, this risks:
- $6K-8K wasted investment in brand development for non-viable market
- 3-4 weeks of work before discovering market issues
- Emotional/financial commitment to wrong direction

**This approach:**
- Front-loads market intelligence for $1.7K-2.2K investment
- Provides decision checkpoints after each phase
- Reuses research if validated (50% onboarding time reduction)
- Enables informed pivot or no-go decision with minimal loss

---

## Validation Framework

Four dimensions must pass for "GO" recommendation:

| Dimension | Success Criteria | Tool Primary |
|-----------|------------------|--------------|
| **Search Demand** | ≥10K monthly searches, 3+ keywords >1K/mo, CPC >$1 | DataForSEO |
| **Competitive Landscape** | 5-10 competitors with white space, viable pricing | Apify Google Scraper |
| **Platform Validation** | 5+ active groups (2K+ members), 15-45 min videos getting 5K+ views | Apify YouTube/IG |
| **Market Economics** | Addressable market >30K, LTV:CAC ≥3:1, stable/growing | DataForSEO Historical |

**Decision Matrix:**
- 4/4 passing → **GO** (proceed to full onboarding)
- 3/4 passing → **PIVOT** (niche down, re-validate specific dimension)
- ≤2/4 passing → **NO-GO** (market not viable, recommend alternative)

---

## Phase 1: Search Demand Validation (Days 1-2)

**Goal:** Determine if people are actively searching for Ramesh's solutions.

### 1.1 Seed Keyword Volume Analysis

```javascript
mcp__dataforseo__keywords_data_google_ads_search_volume({
  keywords: [
    // Core positioning (15 keywords)
    "holistic health coach women over 50",
    "functional medicine coach",
    "wellness coach menopause",
    "natural hormone balance coach",
    "integrative health practitioner",
    // ... [full 45-keyword list in detailed plan]
  ],
  location_name: "United States",
  language_code: "en"
})
```

**Expected Output:** Search volumes, CPC data for 45 seed keywords across 3 categories (Core, Solution-Based, Competitor Brand)

### 1.2 Keyword Expansion

```javascript
mcp__dataforseo__dataforseo_labs_google_keyword_ideas({
  keywords: [
    "wellness coaching women over 50",
    "functional medicine menopause"
  ],
  location_name: "United States",
  language_code: "en",
  limit: 100,
  filters: [["keyword_data.keyword_info.search_volume", ">", 100]],
  order_by: ["keyword_data.keyword_info.search_volume,desc"]
})
```

**Expected Output:** 100+ related keywords with search volumes >100/month

### 1.3 SERP Analysis (Top 10 Keywords)

```javascript
mcp__dataforseo__serp_organic_live_advanced({
  keyword: "wellness coach women over 50",
  language_code: "en",
  location_name: "United States",
  depth: 100
})
```

**Repeat for top 10 keywords by volume**

### Deliverable: `01-search-demand/search_demand_validation.md`

**Content:**
- Total addressable search volume (monthly)
- Top 20 keywords ranked by volume + CPC
- Keyword clusters (awareness vs. consideration vs. conversion intent)
- Search trends (stable/growing/declining)
- SERP competitive intensity (0-100 scale)

**Decision Checkpoint:**
- **GO:** ≥10,000 monthly searches, 3+ keywords >1,000/month, CPC >$1, stable/growing trend
- **PIVOT:** 5,000-10,000 searches but concentrated in 1-2 clusters (niche down)
- **NO-GO:** <5,000 total searches, no keywords >500/month, declining >10% YoY

---

## Phase 2: Competitive Intelligence (Days 3-4)

**Goal:** Map competitive landscape and identify positioning gaps.

### 2.1 Competitor Identification

```javascript
mcp__apify__apify-slash-google-search-scraper({
  queries: [
    "wellness coach for women over 50",
    "functional medicine coach women",
    "menopause health coach",
    "holistic health coach online",
    "executive wellness coaching",
    "midlife wellness programs"
  ],
  maxPagesPerQuery: 3,
  resultsPerPage: 100,
  countryCode: "us",
  languageCode: "en"
})
```

**Expected Output:** 50-100 competitor websites

### 2.2 Deep Competitor Analysis (Top 10)

For each of top 10 competitors:

```javascript
// Scrape website for positioning/pricing
mcp__apify__apify-slash-rag-web-browser({
  startUrls: ["[competitor_website]"],
  instructions: "Extract: positioning statement, target audience description, program/service offerings with pricing, unique value propositions, credentials/certifications, testimonials/social proof"
})

// Get social media presence
mcp__apify__apify-slash-instagram-scraper({
  directUrls: ["[competitor_instagram]"],
  resultsType: "details"
})
```

### 2.3 Pricing Landscape Extraction

Manual extraction from competitor websites + Instagram bios for:
- Entry offers ($97-297 range)
- Core programs ($997-2,997 range)
- Premium offerings (retreats, 1:1 coaching)
- Membership models

### Deliverables:

**`02-competitive-intelligence/competitor_map.md`:**
- 10 primary competitors profiled (positioning, pricing, audience, channels)
- Competitive density map (high/medium/low by niche)

**`02-competitive-intelligence/positioning_gaps.md`:**
- White space opportunities (underserved niches, messaging gaps)
- Differentiation strategy for Ramesh (science + spirituality bridge)

**`02-competitive-intelligence/pricing_landscape.md`:**
- Pricing benchmarks by offer type
- Unit economics viability (can Ramesh's funnel work at market rates?)

**Decision Checkpoint:**
- **GO:** 5-10 competitors with identifiable white space, pricing supports 3:1 LTV:CAC
- **PIVOT:** 10-20 competitors saying similar things (need sharper differentiation)
- **NO-GO:** 0-2 competitors (no proven market) OR 30+ saying identical things (commoditized)

---

## Phase 3: Platform & Content Validation (Days 5-7)

**Goal:** Validate where Professional Annie is active and what content resonates.

### 3.1 Facebook Group Analysis (Manual Research Required)

**Why Manual:** 50-65 demographic prefers private Facebook groups; Apify can't access private groups reliably.

**Process:**
1. Search Facebook for: "women over 50 health", "menopause support", "midlife wellness", "professional women wellness"
2. Document top 15 groups: member count, activity level (posts/day), engagement quality
3. Join 5-7 most relevant groups (with client permission)
4. Analyze 2 weeks of posts: common questions, pain points, popular topics, influencer mentions

### 3.2 YouTube Content Analysis

```javascript
mcp__apify__streamers-slash-youtube-scraper({
  searchQueries: [
    "wellness tips women over 50",
    "menopause natural remedies",
    "hormone balance after 50",
    "how to lose weight over 50",
    "sleep solutions for women over 50",
    "reducing inflammation naturally"
  ],
  maxResults: 30,
  sortingOrder: "views"
})
```

**Analysis:** Extract from top 30 videos per query:
- Video length patterns (expect 15-45 min for this demographic)
- View counts (success = 5K+ views for educational content)
- Engagement rates (likes + comments / views)
- Title/thumbnail patterns that drive clicks
- Content format (talking head vs. demonstration vs. interview)

### 3.3 Instagram Engagement Benchmarks

```javascript
mcp__apify__apify-slash-instagram-scraper({
  directUrls: [
    "[top_10_competitor_instagram_urls]"
  ],
  resultsType: "posts",
  resultsLimit: 30
})
```

**Analysis:** For each competitor's last 30 posts:
- Average engagement rate (likes + comments / followers)
- Post types performing best (carousel vs. reel vs. static)
- Caption length/style
- Hashtag strategy
- Posting frequency

### Deliverables:

**`03-platform-validation/facebook_groups_analysis.md`:**
- 15 groups profiled with member counts, activity levels
- Common pain points and questions observed
- Influencer/thought leader mentions
- Content gaps (questions not being answered well)

**`03-platform-validation/youtube_content_patterns.md`:**
- Top 20 video topics by views
- Optimal video length (15-45 min validation)
- Title/thumbnail patterns that work
- Engagement benchmarks by topic

**`03-platform-validation/instagram_engagement_benchmarks.md`:**
- Average engagement rates by competitor tier
- Content formats ranked by performance
- Posting frequency benchmarks

**`03-platform-validation/platform_recommendation.md`:**
- Primary platform: Facebook (community) vs. YouTube (content authority)
- Content strategy recommendations by platform
- Posting frequency recommendations

**Decision Checkpoint:**
- **GO:** 5+ active Facebook groups (2K+ members), 15-45 min YouTube videos getting 5K+ views, engagement >1%
- **PIVOT:** Groups exist but <1K members OR video engagement <0.5% (need content strategy pivot)
- **NO-GO:** No active groups OR video engagement <0.3% consistently (audience not consuming this format)

---

## Phase 4: Market Size & Economics Validation (Days 8-10)

**Goal:** Estimate total addressable market and unit economics viability.

### 4.1 Top-Down Market Sizing

**Data Sources:**
- US Census (women 50-65 population)
- Bureau of Labor Statistics (finance/professional occupations)
- Healthcare spending data (wellness spending patterns)

**Calculation:**
```
1. US women aged 50-65: ~20 million
2. In finance/corporate professional roles: ~15% = 3 million
3. Mid-high income ($75K+): ~60% = 1.8 million
4. Experiencing health issues (IBS, sleep, hypertension): ~40% = 720K
5. Open to holistic solutions (not just pharma): ~30% = 216K
6. Actively seeking help (not ignoring): ~20% = 43K

Addressable Market: 43,000 potential customers
```

### 4.2 Historical Keyword Trend Analysis

```javascript
mcp__dataforseo__dataforseo_labs_google_historical_keyword_data({
  keywords: [
    "wellness coach women over 50",
    "menopause health coaching",
    "functional medicine women"
  ],
  location_name: "United States",
  language_code: "en"
})
```

**Analysis:** Past 24 months of search volume trends to determine if market is:
- Growing (>10% YoY increase)
- Stable (-10% to +10%)
- Declining (>10% YoY decrease)

### 4.3 Unit Economics Projection

**Ramesh's Funnel (from PDFs):**
- Lead Magnet → Entry ($97-297) → Core ($997-2,997) → Premium ($2,500-5,000) → Membership ($497-997/mo)

**LTV Calculation:**
```
Scenario 1 (Conservative):
- 100 leads → 20 entry ($197 avg) → 4 core ($1,997 avg) → 1 premium ($3,500)
- Revenue: $3,940 + $7,988 + $3,500 = $15,428
- LTV per acquired customer: $154

Scenario 2 (Moderate):
- 100 leads → 30 entry → 10 core → 3 premium → 2 membership (12 mo avg)
- Revenue: $5,910 + $19,970 + $10,500 + $11,964 = $48,344
- LTV per acquired customer: $483

Scenario 3 (Optimistic):
- Higher conversion rates + membership retention
- LTV per acquired customer: $750+
```

**CAC Benchmarks (from competitor research Phase 2):**
- Facebook Ads: $50-150 per lead acquisition
- Organic content: $20-50 per lead (amortized content costs)
- Target CAC: <$160 (to achieve 3:1 LTV:CAC in conservative scenario)

### Deliverables:

**`04-market-economics/top_down_market_size.md`:**
- Total addressable market calculation: 43,000
- Serviceable obtainable market (first 2 years): 500-1,000 customers
- Market share required to hit revenue goals

**`04-market-economics/ltv_cac_analysis.md`:**
- LTV projections (conservative/moderate/optimistic)
- CAC benchmarks by channel
- Profitability scenarios at different conversion rates

**`04-market-economics/market_timing_analysis.md`:**
- Historical search trend analysis (growing/stable/declining)
- Seasonal patterns (if any)
- Macro trends (aging population, wellness spending growth)

**Decision Checkpoint:**
- **GO:** Addressable market >30K, LTV:CAC ≥3:1 in moderate scenario, market stable or growing
- **PIVOT:** Addressable market 15K-30K (viable but need efficient CAC strategy)
- **NO-GO:** Addressable market <10K, LTV:CAC <2:1 even in optimistic scenario, market declining >10%

---

## Phase 5: Validation Report & Recommendation (Days 11-12)

**Goal:** Synthesize all research into actionable recommendation.

### 5.1 Scorecard Creation

| Dimension | Status | Key Metric | Threshold | Pass/Fail |
|-----------|--------|------------|-----------|-----------|
| Search Demand | [Status] | [X]K monthly searches | ≥10K | [✅/❌] |
| Competitive Landscape | [Status] | [X] competitors | 5-10 ideal | [✅/❌] |
| Platform Validation | [Status] | [X] active groups, [X]K video views | 5+ groups, 5K+ views | [✅/❌] |
| Market Economics | [Status] | [X]K addressable, [X]:1 LTV:CAC | 30K+, 3:1+ | [✅/❌] |

**Overall Score:** [X]/4 dimensions passing

### 5.2 Recommendation

**If 4/4 Passing (GO):**
- Recommendation: Proceed to full onboarding (4-agent workflow)
- Integration plan: Reuse validation research, skip market-competitor-analyst and trends-platform-analyst (50% time reduction)
- Next steps: client-file-architect → brand-dna-architect → content-strategist
- Estimated timeline: 2-3 weeks to launch-ready brand
- Estimated cost: $3.5K-4.5K (reduced from $6K-8K standard)

**If 3/4 Passing (PIVOT):**
- Recommendation: Market exists but needs sharper positioning
- Failed dimension: [Specify which one]
- Pivot strategy: [Specific recommendations, e.g., "Niche down to 'Executives with IBS' vs. broad wellness"]
- Re-validation plan: [Mini-research to validate pivot, 3-5 days, $500-700]

**If ≤2/4 Passing (NO-GO):**
- Recommendation: Market not viable for current positioning
- Alternative paths:
  1. Different target audience (e.g., broader age range 40-70)
  2. Different value proposition (e.g., corporate wellness programs vs. individual coaching)
  3. Different business model (e.g., certification/train-the-trainer vs. direct-to-consumer)
- Investment required to validate alternative: [Estimate]

### 5.3 File Deliverable: `VALIDATION_REPORT.md`

**Structure:**
```markdown
# Market Validation Report: Ramesh Wellness Coaching

## Executive Summary
- Overall recommendation: GO / PIVOT / NO-GO
- Key findings (3-5 bullet points)
- Next steps

## Dimension 1: Search Demand Validation
- Finding: [Summary]
- Data: [Key metrics]
- Status: PASS / FAIL

## Dimension 2: Competitive Landscape
[Same structure]

## Dimension 3: Platform Validation
[Same structure]

## Dimension 4: Market Economics
[Same structure]

## Recommendation & Next Steps
[Detailed based on GO/PIVOT/NO-GO outcome]

## Appendices
- All data files linked
- Tool outputs referenced
```

---

## File Organization

All research will be stored in:

```
validation-research/ramesh-wellness/
├── 00-validation-overview/
│   ├── VALIDATION_REPORT.md (final deliverable)
│   └── research_protocol.md (this plan)
├── 01-search-demand/
│   ├── search_demand_validation.md
│   ├── seed_keywords_volume.csv
│   ├── expanded_keywords.csv
│   └── serp_analysis_top10.csv
├── 02-competitive-intelligence/
│   ├── competitor_map.md
│   ├── positioning_gaps.md
│   ├── pricing_landscape.md
│   └── competitor_profiles/ (10 markdown files)
├── 03-platform-validation/
│   ├── facebook_groups_analysis.md
│   ├── youtube_content_patterns.md
│   ├── instagram_engagement_benchmarks.md
│   └── platform_recommendation.md
├── 04-market-economics/
│   ├── top_down_market_size.md
│   ├── ltv_cac_analysis.md
│   └── market_timing_analysis.md
└── 05-raw-data/
    ├── dataforseo_exports/
    ├── apify_exports/
    └── manual_research_notes/
```

---

## Integration Path (If Validated)

### Standard Onboarding Workflow (Not Validated)
1. client-file-architect (4 hours)
2. market-competitor-analyst (12 hours) ← **SKIP** (already done in validation)
3. trends-platform-analyst (8 hours) ← **SKIP** (already done in validation)
4. brand-dna-architect (16 hours)
5. **Total:** 40 hours

### Validation-Integrated Onboarding (If GO)
1. client-file-architect (4 hours)
   - Migrate validation research into client folders
   - Create `client_config.yaml` with insights from validation
2. brand-dna-architect (16 hours)
   - Use competitor positioning gaps from Phase 2
   - Use platform validation insights for Avatar design
   - Use market validation for strategic pillars
3. **Total:** 20 hours (50% reduction)

### Memory Entity Population

If validated and onboarding begins, populate memory with:

```javascript
mcp__memory__create_entities({
  entities: [
    {
      name: "ramesh-wellness",
      entityType: "client",
      observations: [
        "Personal brand wellness coach targeting professional women 50-65",
        "Positioning: Bridge between science and spirituality",
        "Geographic focus: National online, metro areas for retreats",
        "Minimal existing digital presence, complete refresh needed",
        // ... [more from validation research]
      ]
    },
    {
      name: "ramesh-wellness-avatar-annie",
      entityType: "customer_avatar",
      observations: [
        "Primary persona: Professional Annie, age 50-65",
        "Occupation: Finance, consulting, corporate leadership",
        "Pain points: Poor sleep, IBS/reflux, hypertension, polypharmacy fatigue",
        // ... [from customer-avatar.pdf]
      ]
    }
    // ... [more entities from validation]
  ]
})
```

---

## Cost & Timeline Summary

| Phase | Duration | Effort | Tool Cost | Total |
|-------|----------|--------|-----------|-------|
| Phase 1: Search Demand | 2 days | 12 hours | $30-50 | $600-650 |
| Phase 2: Competitive Intel | 2 days | 12 hours | $40-60 | $640-660 |
| Phase 3: Platform Validation | 3 days | 16 hours | $20-40 | $820-840 |
| Phase 4: Market Economics | 3 days | 8 hours | $10-20 | $410-420 |
| Phase 5: Validation Report | 1 day | 4 hours | $0 | $200 |
| **TOTAL** | **11 days** | **52 hours** | **$100-200** | **$2,670-2,770** |

**Note:** If client approves execution in batches, can be spread over 2-3 weeks for cash flow management.

---

## Verification & Quality Checks

### Data Quality Checklist (Per Phase)

**Phase 1:**
- [ ] Minimum 45 keywords with volume data
- [ ] Top 10 keywords have SERP analysis (100 results each)
- [ ] Historical trend data covers ≥12 months
- [ ] CPC data available for commercial keywords

**Phase 2:**
- [ ] Minimum 10 competitors fully profiled
- [ ] Pricing data collected for 80%+ of competitors
- [ ] Positioning statements extracted and categorized
- [ ] White space gaps identified with evidence

**Phase 3:**
- [ ] Minimum 10 Facebook groups documented
- [ ] YouTube analysis covers 30+ videos per query (6 queries = 180 videos)
- [ ] Instagram data for 10 competitors (300 posts total)
- [ ] Platform recommendation backed by engagement metrics

**Phase 4:**
- [ ] Market size calculation shows methodology
- [ ] LTV projections include 3 scenarios
- [ ] CAC benchmarks from 3+ sources
- [ ] Historical trends cover 24 months minimum

**Phase 5:**
- [ ] All 4 dimensions scored with pass/fail
- [ ] Recommendation includes specific next steps
- [ ] Integration plan outlined if GO
- [ ] Alternative paths explored if PIVOT/NO-GO

### Output Quality Standards

Each markdown deliverable must include:
- **Executive Summary** (3-5 sentences)
- **Methodology** (tools used, date ranges, limitations)
- **Key Findings** (bullet points, data-backed)
- **Visual Aids** (tables, charts where applicable)
- **Data Sources** (links to CSV exports, tool outputs)
- **Confidence Level** (High/Medium/Low with rationale)

---

## Risk Mitigation

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| Facebook groups are all private/inaccessible | Medium | High | Manual research required; join 5-7 groups with client permission |
| Competitors don't publicly list pricing | Medium | Medium | Cross-reference Instagram bios, run test inquiries, industry benchmarks |
| Search volume is regional, not national | Low | Medium | Use DataForSEO location parameters for major metros separately |
| Historical trend data insufficient (<12 mo) | Low | Medium | Supplement with Google Trends, industry reports |
| Client impatient with 11-day timeline | Medium | Low | Offer phased delivery: Phase 1-2 first (4 days), then decision to continue |

---

## Critical Files Reference

**Input Documents:**
- `/Users/willsuarez/Desktop/Ramesh -Marketing.pdf` - Marketing strategy, Professional Annie persona, funnel structure
- `/Users/willsuarez/Desktop/customer-avatar.pdf` - Psychographics, pain points, decision journey

**Agent Tools:**
- `/.claude/agents/market-competitor-analyst.md` - Standard onboarding agent (skipped if validated)
- `/.claude/agents/trends-platform-analyst.md` - Standard onboarding agent (skipped if validated)
- `/.claude/agents/brand-dna-architect.md` - Used in onboarding if validated

**Memory Query Examples:**
```javascript
// Check if client already exists
mcp__memory__search_nodes("ramesh-wellness")

// Load client context (if onboarding after validation)
mcp__memory__open_nodes([
  "ramesh-wellness",
  "ramesh-wellness-avatar-annie",
  "ramesh-wellness-brand"
])
```

---

## Success Metrics

This validation research is successful if:
1. **Clarity:** Client receives unambiguous GO/PIVOT/NO-GO recommendation with data backing
2. **Efficiency:** Decision made with $1.7K-2.2K investment vs. $6K-8K standard onboarding
3. **Reusability:** If GO, 50% of onboarding work already complete (market + trends research)
4. **Actionability:** If PIVOT, client has specific niche-down strategy with re-validation plan
5. **Protection:** If NO-GO, client avoids costly mistake and gets alternative paths

---

## Next Steps After Plan Approval

1. **Day 0:** User approves this plan
2. **Days 1-2:** Execute Phase 1 (Search Demand) - deliver `search_demand_validation.md`
3. **Day 2 Checkpoint:** Review Phase 1 results, decide continue/pivot/stop
4. **Days 3-4:** Execute Phase 2 (Competitive Intelligence) - deliver 3 markdown files
5. **Day 4 Checkpoint:** Review Phase 2 results, decide continue/pivot/stop
6. **Days 5-7:** Execute Phase 3 (Platform Validation) - deliver 4 markdown files
7. **Day 7 Checkpoint:** Review Phase 3 results, decide continue/pivot/stop
8. **Days 8-10:** Execute Phase 4 (Market Economics) - deliver 3 markdown files
9. **Day 10 Checkpoint:** Review Phase 4 results, prepare final recommendation
10. **Days 11-12:** Synthesize `VALIDATION_REPORT.md`, present to client

**If GO → Immediate next step:** Launch client-file-architect to migrate research into client folders and begin brand-dna-architect.

---

*This plan was generated by the Simplicity Growth Marketing Multi-Agent System v3.0*
*Plan Mode execution on 2026-01-12*
