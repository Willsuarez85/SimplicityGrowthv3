# MCP Integration Guide

> Complete reference for all MCP (Model Context Protocol) tools used in SimplicityAgents v3

---

## Table of Contents

1. [Memory MCP](#1-memory-mcp)
2. [fal.ai MCP](#2-falai-mcp)
3. [Apify MCP](#3-apify-mcp)
4. [DataForSEO MCP](#4-dataforseo-mcp)
5. [Firecrawl MCP](#5-firecrawl-mcp)
6. [Notion MCP](#6-notion-mcp)
7. [Filesystem MCP](#7-filesystem-mcp)

---

## 1. Memory MCP

The Memory MCP provides persistent knowledge graph storage for client data, brand information, and research insights.

### Core Operations

#### Create Entities
Store new information in the knowledge graph.

```javascript
// Create a new client entity
mcp__memory__create_entities({
  entities: [
    {
      name: "taqueria-el-sol",
      entityType: "Client",
      observations: [
        "Mexican restaurant in Austin, TX",
        "Family-owned since 1985",
        "Known for authentic Oaxacan cuisine",
        "Primary audience: Hispanic families, food enthusiasts"
      ]
    }
  ]
})

// Create brand DNA entity
mcp__memory__create_entities({
  entities: [
    {
      name: "taqueria-el-sol-brand",
      entityType: "Brand",
      observations: [
        "Big Idea: Authentic Oaxacan Heritage",
        "Archetype: The Caregiver + The Creator",
        "Pillars: Heritage, Family, Craft, Community",
        "Tagline: Sabor que conecta generaciones"
      ]
    }
  ]
})
```

#### Create Relations
Connect entities with meaningful relationships.

```javascript
mcp__memory__create_relations({
  relations: [
    {
      from: "taqueria-el-sol",
      to: "taqueria-el-sol-brand",
      relationType: "HAS_BRAND"
    },
    {
      from: "taqueria-el-sol",
      to: "taqueria-el-sol-voice",
      relationType: "HAS_VOICE"
    },
    {
      from: "taqueria-el-sol",
      to: "taqueria-el-sol-visual",
      relationType: "HAS_VISUAL_IDENTITY"
    }
  ]
})
```

#### Search Nodes
Find entities by keyword.

```javascript
// Check if client exists
mcp__memory__search_nodes({ query: "taqueria-el-sol" })

// Search for all restaurant clients
mcp__memory__search_nodes({ query: "restaurant" })

// Find all avatars
mcp__memory__search_nodes({ query: "avatar" })
```

#### Open Nodes
Retrieve full entity data by exact name.

```javascript
// Load complete brand context for content creation
mcp__memory__open_nodes({
  names: [
    "taqueria-el-sol-brand",
    "taqueria-el-sol-voice",
    "taqueria-el-sol-visual",
    "taqueria-el-sol-avatar-chef"
  ]
})
```

#### Add Observations
Update existing entities with new information.

```javascript
mcp__memory__add_observations({
  observations: [
    {
      entityName: "taqueria-el-sol-brand",
      contents: [
        "Updated Q1 2026: Added community events pillar",
        "New campaign: Domingo en Familia series"
      ]
    }
  ]
})
```

### Entity Naming Conventions

| Entity Type | Pattern | Example |
|-------------|---------|---------|
| Client | `[slug]` | `taqueria-el-sol` |
| Brand | `[slug]-brand` | `taqueria-el-sol-brand` |
| Voice | `[slug]-voice` | `taqueria-el-sol-voice` |
| Visual | `[slug]-visual` | `taqueria-el-sol-visual` |
| Avatar | `[slug]-avatar-[role]` | `taqueria-el-sol-avatar-chef` |
| Competitor | `[slug]-competitor-[name]` | `taqueria-el-sol-competitor-chipotle` |
| Trends | `[slug]-trends-[platform]` | `taqueria-el-sol-trends-tiktok` |

---

## 2. fal.ai MCP

AI image and video generation for brand assets.

### Image Generation

#### Ideogram v3 (Best for text/graphics)
```javascript
mcp__fal-ai__ideogram_v3({
  prompt: "Modern Mexican restaurant logo, vibrant orange and green colors, minimalist design, professional typography reading 'Taqueria El Sol', white background",
  image_size: "square_hd",
  num_images: 4
})
```

#### Imagen 4 (Best for hero images)
```javascript
mcp__fal-ai__imagen4({
  prompt: "Authentic Mexican taqueria interior, warm golden hour lighting, handmade wooden tables, colorful papel picado decorations, family enjoying dinner together, cinematic photography style",
  image_size: "landscape_16_9",
  num_images: 1
})
```

#### FLUX Dev (Fast iteration)
```javascript
mcp__fal-ai__flux_dev({
  prompt: "Professional headshot of a friendly Mexican chef, 40s, wearing traditional white chef coat, warm smile, soft studio lighting, clean background",
  image_size: "portrait_4_3",
  num_images: 4,
  guidance_scale: 3.5,
  num_inference_steps: 25
})
```

### Video Generation

#### Veo 3 (Text to video with audio)
```javascript
mcp__fal-ai__veo3({
  prompt: "Slow motion close-up of fresh corn tortillas being made by hand on a comal, steam rising, golden brown edges, ambient kitchen sounds",
  aspect_ratio: "16:9",
  duration: 5
})
```

#### Kling Master (Image to video)
```javascript
mcp__fal-ai__kling_master_image({
  image_url: "https://example.com/restaurant-exterior.jpg",
  prompt: "Camera slowly pushes in toward the restaurant entrance, people walking by, warm evening light, gentle movement",
  aspect_ratio: "16:9",
  duration: 5
})
```

### Model Selection Guide

| Use Case | Model | Why |
|----------|-------|-----|
| Logos & text | `ideogram_v3` | Superior typography handling |
| Hero images | `imagen4` | Highest quality, photorealistic |
| Quick iterations | `flux_dev` | Fast, good quality |
| Marketing graphics | `recraft_v3` | Professional design aesthetic |
| Short videos | `veo3` | Includes audio generation |
| Animate images | `kling_master_image` | Premium motion quality |

---

## 3. Apify MCP

Web scraping for social media research and competitor analysis.

### Twitter/X Scraper

```javascript
mcp__apify__apidojo-slash-tweet-scraper({
  searchTerms: ["#MexicanFood", "#TacoTuesday", "authentic mexican restaurant"],
  sort: "Latest",
  maxItems: 100,
  tweetLanguage: "en",
  onlyVideo: false
})
```

### Instagram Scraper

```javascript
// Scrape competitor profile posts
mcp__apify__apify-slash-instagram-scraper({
  directUrls: ["https://www.instagram.com/chipotle/"],
  resultsType: "posts",
  resultsLimit: 50
})

// Scrape Instagram Reels
mcp__apify__apify-slash-instagram-reel-scraper({
  username: ["natgeo", "foodnetwork"],
  resultsLimit: 30,
  includeTranscript: true
})
```

### TikTok Scraper

```javascript
mcp__apify__clockworks-slash-tiktok-scraper({
  hashtags: ["mexicanfood", "streetfood", "tacos"],
  resultsPerPage: 50,
  profileSorting: "popular"
})
```

### YouTube Scraper

```javascript
mcp__apify__streamers-slash-youtube-scraper({
  searchQueries: ["mexican restaurant marketing", "food content creation"],
  maxResults: 20,
  downloadSubtitles: true,
  subtitlesLanguage: "en"
})
```

### Google Maps Scraper

```javascript
mcp__apify__compass-slash-crawler-google-places({
  searchStringsArray: ["mexican restaurant"],
  locationQuery: "Austin, TX",
  maxCrawledPlacesPerSearch: 50,
  language: "en",
  maxReviews: 10
})
```

---

## 4. DataForSEO MCP

Keyword research and search engine data.

### Keyword Research

```javascript
// Get search volume for keywords
mcp__dataforseo__keywords_data_google_ads_search_volume({
  keywords: ["mexican restaurant near me", "best tacos austin", "authentic mexican food"],
  language_code: "en",
  location_name: "United States"
})

// Get keyword ideas
mcp__dataforseo__dataforseo_labs_google_keyword_ideas({
  keywords: ["mexican restaurant", "tacos", "authentic cuisine"],
  language_code: "en",
  location_name: "United States",
  limit: 50
})
```

### Google Trends

```javascript
mcp__dataforseo__keywords_data_google_trends_explore({
  keywords: ["mexican food", "tacos", "burritos"],
  type: "web",
  time_range: "past_12_months",
  location_name: "United States"
})
```

### SERP Analysis

```javascript
mcp__dataforseo__serp_organic_live_advanced({
  keyword: "best mexican restaurant austin",
  language_code: "en",
  location_name: "Austin,Texas,United States",
  depth: 30
})
```

### Competitor Domain Analysis

```javascript
// Get keywords a competitor ranks for
mcp__dataforseo__dataforseo_labs_google_ranked_keywords({
  target: "chipotle.com",
  language_code: "en",
  location_name: "United States",
  limit: 100
})

// Domain overview
mcp__dataforseo__dataforseo_labs_google_domain_rank_overview({
  target: "competitor.com",
  language_code: "en",
  location_name: "United States"
})
```

---

## 5. Firecrawl MCP

Website scraping and content extraction.

### Single Page Scrape

```javascript
mcp__firecrawl__firecrawl_scrape({
  url: "https://competitor-restaurant.com/menu",
  formats: ["markdown"],
  onlyMainContent: true
})
```

### Web Search

```javascript
mcp__firecrawl__firecrawl_search({
  query: "mexican restaurant marketing strategies 2026",
  limit: 10,
  scrapeOptions: {
    formats: ["markdown"],
    onlyMainContent: true
  }
})
```

### Site Map

```javascript
mcp__firecrawl__firecrawl_map({
  url: "https://competitor-restaurant.com",
  limit: 100
})
```

### Deep Research

```javascript
mcp__firecrawl__firecrawl_deep_research({
  query: "What content strategies are successful mexican restaurants using on social media in 2026?",
  maxDepth: 3,
  timeLimit: 120,
  maxUrls: 30
})
```

---

## 6. Notion MCP

Client collaboration and project management.

### Search Pages

```javascript
mcp__notion__API-post-search({
  query: "Taqueria El Sol",
  filter: {
    property: "object",
    value: "page"
  },
  page_size: 10
})
```

### Create Page

```javascript
mcp__notion__API-post-page({
  parent: { page_id: "parent-page-uuid" },
  properties: {
    title: [
      {
        text: { content: "Taqueria El Sol - Brand Package" }
      }
    ]
  }
})
```

### Add Content Blocks

```javascript
mcp__notion__API-patch-block-children({
  block_id: "page-uuid",
  children: [
    {
      type: "paragraph",
      paragraph: {
        rich_text: [{ text: { content: "Brand DNA document content here..." } }]
      }
    }
  ]
})
```

---

## 7. Filesystem MCP

File operations for client folder management.

### List Directory

```javascript
mcp__filesystem__list_directory({
  path: "/Users/willsuarez/Vibecoding Cursor/SimplicityAgents v3/clients"
})
```

### Create Directory

```javascript
mcp__filesystem__create_directory({
  path: "/Users/willsuarez/Vibecoding Cursor/SimplicityAgents v3/clients/taqueria-el-sol/01-research"
})
```

### Write File

```javascript
mcp__filesystem__write_file({
  path: "/path/to/clients/taqueria-el-sol/02-strategy/brand-dna/brand_dna_document.md",
  content: "# Brand DNA Document\n\n## Big Idea\n..."
})
```

### Read Multiple Files

```javascript
mcp__filesystem__read_multiple_files({
  paths: [
    "/path/to/brand_dna.md",
    "/path/to/voice_and_tone.md",
    "/path/to/visual_identity.md"
  ]
})
```

---

## Quick Reference: Agent → MCP Tools

| Agent | Primary MCP Tools |
|-------|-------------------|
| brand-intelligence-analyst | Firecrawl, Apify, Memory |
| market-competitor-analyst | DataForSEO, Apify, Firecrawl, Memory |
| trends-platform-analyst | Apify, DataForSEO, Memory |
| brand-dna-architect | Memory (create_entities) |
| content-strategist | Memory (open_nodes) |
| creative-director | Memory (open_nodes) |
| prompt-asset-engineer | fal.ai, Memory |
| client-file-architect | Filesystem, Memory |
| delivery-documentation-manager | Notion, Filesystem, Memory |

---

## Error Handling

### Memory MCP
- **Entity not found:** Use `search_nodes` before `open_nodes` to verify existence
- **Duplicate entity:** Check with `search_nodes` first, use `add_observations` for updates

### fal.ai MCP
- **Model not available:** Use `list_available_models` to check
- **Generation failed:** Simplify prompt, reduce `num_images`

### Apify MCP
- **Rate limited:** Reduce `maxItems`, add delays between requests
- **No results:** Check URL format, verify account is not private

### DataForSEO MCP
- **Invalid location:** Use `serp_locations` to get valid location names
- **No keyword data:** Try broader keywords, check language_code

### Firecrawl MCP
- **Blocked:** Site may have anti-scraping measures, try different approach
- **Timeout:** Reduce `maxUrls` or `timeLimit`

---

*Last Updated: 2026-01-04*
*SimplicityAgents v3.0*
