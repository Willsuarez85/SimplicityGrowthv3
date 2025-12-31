# Website Section Blueprint
## Simplicity Agency - Web Design System

**Concept:** "Blueprints for Growth" meets "Marble Future"
**Version:** 1.0
**Updated:** December 2024

---

## Core Layout Principles

### Grid System
- **Columns:** 12-column grid
- **Gutter:** 32px (desktop), 24px (tablet), 16px (mobile)
- **Margins:** 80px (desktop), 40px (tablet), 16px (mobile)
- **Max Width:** 1440px container, 1280px content
- **Base Unit:** 8px (all spacing in multiples of 8)

### Visual Hierarchy
1. **Dominant:** Black/White contrast (92%)
2. **Supporting:** Off-white #F7F7F7, Light gray #EAEAEA (6%)
3. **Accent:** Turquoise #09B9B4 (2% MAX)

---

## Section Types

---

### 1. HERO SECTION

**Purpose:** First impression, value proposition, primary CTA

#### Layout A: Full-Width Image Hero
```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│  [WATERMARK: "SIMPLICITY" at 3% opacity, 15vw]                 │
│                                                                 │
│     H1: Main Headline (56px desktop)                           │
│     Subhead: Supporting text (18px, max 600px width)           │
│                                                                 │
│     [■ Primary CTA]  [○ Secondary CTA]                         │
│                                                                 │
│                    ┌─────────────────┐                         │
│                    │   HERO IMAGE    │                         │
│                    │  Marble Statue  │                         │
│                    └─────────────────┘                         │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

**Specifications:**
- Height: 100vh or min 700px
- Background: #0A0A0A or #000000
- Text: #FFFFFF
- Image: Positioned right or center
- Watermark: Behind content, uppercase, bold

#### Layout B: Split Hero
```
┌──────────────────────────┬──────────────────────────┐
│                          │                          │
│  H1: Headline            │     ┌──────────────┐    │
│                          │     │              │    │
│  Body text paragraph     │     │  HERO IMAGE  │    │
│  with value proposition  │     │              │    │
│                          │     └──────────────┘    │
│  [■ Primary CTA]         │                          │
│                          │                          │
└──────────────────────────┴──────────────────────────┘
```

**Specifications:**
- Height: 80vh or min 600px
- Left column: 50% (text content)
- Right column: 50% (image)
- Background: White or Off-white
- Text: Charcoal #0A0A0A

---

### 2. SERVICES SECTION

**Purpose:** Display core service offerings

#### Layout: Three-Column Cards
```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│  [LABEL: "WHAT WE DO"]                                         │
│  H2: Section Headline                                           │
│                                                                 │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐            │
│  │   [Icon]    │  │   [Icon]    │  │   [Icon]    │            │
│  │             │  │             │  │             │            │
│  │  Service 1  │  │  Service 2  │  │  Service 3  │            │
│  │  Title      │  │  Title      │  │  Title      │            │
│  │             │  │             │  │             │            │
│  │  Brief desc │  │  Brief desc │  │  Brief desc │            │
│  │             │  │             │  │             │            │
│  │  [Learn →]  │  │  [Learn →]  │  │  [Learn →]  │            │
│  └─────────────┘  └─────────────┘  └─────────────┘            │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

**Specifications:**
- Background: #F7F7F7 (off-white)
- Cards: White background, 20px border-radius
- Card shadow: 0 4px 6px rgba(0,0,0,0.1)
- Card hover: translateY(-8px), shadow increase
- Icons: 24px, line-style, #0A0A0A
- Padding: 96px vertical (desktop)

---

### 3. STATS/METRICS SECTION

**Purpose:** Social proof through numbers

#### Layout: Full-Width Dark with Stats
```
┌─────────────────────────────────────────────────────────────────┐
│  ██████████████████████████████████████████████████████████████│
│  █                                                            █│
│  █    150+           $2.5M            98%           24/7     █│
│  █   Clients        Revenue         Success        Support   █│
│  █                  Generated        Rate                    █│
│  █                                                            █│
│  ██████████████████████████████████████████████████████████████│
└─────────────────────────────────────────────────────────────────┘
```

**Specifications:**
- Background: #0A0A0A (charcoal)
- Numbers: 48-72px, bold, #FFFFFF
- Labels: 14px uppercase, #BDBDBD
- Optional: ONE stat highlighted with turquoise #09B9B4
- Padding: 80px vertical

---

### 4. ABOUT/STORY SECTION

**Purpose:** Brand story, mission, team introduction

#### Layout: Image Left, Content Right
```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│  ┌──────────────────┐    [LABEL: "ABOUT US"]                   │
│  │                  │                                           │
│  │                  │    H2: Our Story Headline                 │
│  │   MARBLE IMAGE   │                                           │
│  │                  │    Paragraph of body text explaining      │
│  │                  │    the company mission and values.        │
│  │                  │    Keep it concise and impactful.         │
│  │                  │                                           │
│  └──────────────────┘    [■ Learn More]                        │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

**Specifications:**
- Background: #FFFFFF
- Image: 45% width, 20px border-radius
- Content: 55% width
- Label: 12px uppercase, tracking 0.08em, #09B9B4
- Heading: H2 size, #0A0A0A
- Body: 18px, max 560px width

---

### 5. TESTIMONIALS SECTION

**Purpose:** Client social proof

#### Layout: Large Quote with Navigation
```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│  [LABEL: "CLIENT SUCCESS"]                                     │
│                                                                 │
│     "This is a powerful testimonial quote that shows           │
│      the transformation and results achieved."                  │
│                                                                 │
│     ─────────                                                   │
│     John Smith                                                  │
│     CEO, Company Name                                           │
│                                                                 │
│     [○ ○ ● ○ ○]  ← Navigation dots                             │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

**Specifications:**
- Background: #F7F7F7
- Quote: 32px, medium weight, #0A0A0A
- Attribution: 16px, divider line above
- Navigation dots: 8px circles, active = #0A0A0A
- Max quote width: 800px centered
- Padding: 120px vertical

---

### 6. CASE STUDIES/PORTFOLIO

**Purpose:** Showcase work and results

#### Layout: Alternating Image Grid
```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│  [LABEL: "OUR WORK"]                                           │
│  H2: Case Studies                                               │
│                                                                 │
│  ┌────────────────────────────┬─────────────────────┐          │
│  │                            │                     │          │
│  │      CASE STUDY 1          │  Client: Name       │          │
│  │         IMAGE              │  Industry: Type     │          │
│  │                            │  +150% Growth       │          │
│  │                            │  [View Case →]      │          │
│  └────────────────────────────┴─────────────────────┘          │
│                                                                 │
│  ┌─────────────────────┬────────────────────────────┐          │
│  │                     │                            │          │
│  │  Client: Name       │      CASE STUDY 2          │          │
│  │  Industry: Type     │         IMAGE              │          │
│  │  +200% Revenue      │                            │          │
│  │  [View Case →]      │                            │          │
│  └─────────────────────┴────────────────────────────┘          │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

**Specifications:**
- Background: #FFFFFF
- Image blocks: 60% width
- Content blocks: 40% width
- Alternating layout (image left, then right)
- Hover: Slight zoom on image (1.02 scale)
- Stats: Large number with turquoise allowed

---

### 7. CTA SECTION

**Purpose:** Drive primary conversion

#### Layout: Centered CTA Block
```
┌─────────────────────────────────────────────────────────────────┐
│  ██████████████████████████████████████████████████████████████│
│  █                                                            █│
│  █           H2: Ready to Grow Your Business?                 █│
│  █                                                            █│
│  █           Brief supporting text that reinforces            █│
│  █           the value proposition. One line max.             █│
│  █                                                            █│
│  █                   [■ Get Started]                          █│
│  █                                                            █│
│  ██████████████████████████████████████████████████████████████│
└─────────────────────────────────────────────────────────────────┘
```

**Specifications:**
- Background: #000000 (pure black)
- Text: #FFFFFF centered
- Heading: H2 size
- CTA Button: Turquoise #09B9B4 (this is the ONE accent button)
- Padding: 100px vertical
- Max width: 600px for text

---

### 8. CONTACT SECTION

**Purpose:** Lead capture and contact information

#### Layout: Two-Column Form + Info
```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│  [LABEL: "CONTACT"]                                            │
│  H2: Let's Talk Growth                                          │
│                                                                 │
│  ┌──────────────────────────┬───────────────────────┐          │
│  │                          │                       │          │
│  │  [Name Input          ]  │  Get in Touch         │          │
│  │                          │                       │          │
│  │  [Email Input         ]  │  📍 Location          │          │
│  │                          │  City, State          │          │
│  │  [Phone Input         ]  │                       │          │
│  │                          │  📧 Email             │          │
│  │  [Message Textarea    ]  │  hello@simplicity.com │          │
│  │  [                    ]  │                       │          │
│  │  [                    ]  │  📞 Phone             │          │
│  │                          │  (555) 123-4567       │          │
│  │  [■ Send Message     ]   │                       │          │
│  │                          │                       │          │
│  └──────────────────────────┴───────────────────────┘          │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

**Specifications:**
- Background: #F7F7F7
- Form column: 55%
- Info column: 45%
- Inputs: White background, 8px radius, charcoal border on focus
- Submit button: Black primary style
- Padding: 96px vertical

---

### 9. FOOTER

**Purpose:** Navigation, legal, brand reinforcement

#### Layout: Four-Column Footer
```
┌─────────────────────────────────────────────────────────────────┐
│  ██████████████████████████████████████████████████████████████│
│  █                                                            █│
│  █  SIMPLICITY       Services        Company       Contact   █│
│  █  [Logo]           - Service 1     - About       Email     █│
│  █                   - Service 2     - Team        Phone     █│
│  █  Tagline text     - Service 3     - Careers     Address   █│
│  █  goes here        - Service 4     - Blog                  █│
│  █                                                            █│
│  █  ─────────────────────────────────────────────────────    █│
│  █                                                            █│
│  █  © 2024 Simplicity Agency    Privacy  Terms  [Social]     █│
│  █                                                            █│
│  ██████████████████████████████████████████████████████████████│
└─────────────────────────────────────────────────────────────────┘
```

**Specifications:**
- Background: #0A0A0A
- Logo column: 30%
- Link columns: 3 x 23%
- Links: #FFFFFF, hover #09B9B4
- Divider: 1px #333333
- Bottom bar: 14px, #888888
- Padding: 80px top, 40px bottom

---

## Page Templates

---

### Homepage Structure
```
1. Navigation (sticky)
2. Hero Section (Layout A or B)
3. Stats Section
4. Services Section
5. About Section
6. Case Studies (2-3 featured)
7. Testimonials
8. CTA Section
9. Footer
```

### Services Page Structure
```
1. Navigation
2. Hero (Service-focused)
3. Service Overview Grid
4. Process Section (numbered steps)
5. Case Studies (filtered)
6. FAQ Section
7. CTA Section
8. Footer
```

### About Page Structure
```
1. Navigation
2. Hero (Story-focused)
3. Mission/Vision Section
4. Team Grid
5. Values Section
6. Timeline/History
7. CTA Section
8. Footer
```

### Contact Page Structure
```
1. Navigation
2. Hero (minimal)
3. Contact Form + Info
4. Map (optional)
5. FAQ Section
6. Footer
```

---

## Responsive Breakpoints

### Desktop (1024px+)
- Full grid: 12 columns
- All layouts as designed
- Max container: 1440px

### Tablet (768px - 1023px)
- Grid: 8 columns
- Side-by-side layouts stack 50/50
- Reduced padding (64px sections)
- Font sizes: -1 step down

### Mobile (0 - 767px)
- Grid: 4 columns
- All layouts single column
- Full-width images
- Reduced padding (48px sections)
- Font sizes: -2 steps down
- Hamburger navigation

---

## Graphic Elements in Sections

### Watermark Text
- Position: Behind hero content
- Size: 15vw
- Opacity: 3%
- Text: "SIMPLICITY" or section keyword
- Transform: Uppercase

### Blueprint Ring
- Position: Decorative corners or as section dividers
- Size: 80-120px
- Color: Charcoal stroke with ONE turquoise segment
- Opacity: 10-20%

### Grid Pattern
- Use: Behind stat sections or as subtle texture
- Opacity: 5%
- Color: Charcoal lines on white, or white lines on dark

---

## Animation Guidelines

### Scroll Animations
- **Fade Up:** Elements fade in and rise 20px
- **Stagger:** Cards animate 100ms apart
- **Parallax:** Images move at 0.3x scroll speed

### Hover States
- **Cards:** translateY(-8px), shadow increase
- **Buttons:** Background shift, no movement
- **Links:** Color transition to turquoise
- **Images:** Scale 1.02

### Timing
- **Standard:** 300ms ease-out
- **Fast:** 200ms ease-out
- **Slow:** 500ms ease-out

### Reduced Motion
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation: none !important;
    transition: none !important;
  }
}
```

---

## Image Specifications by Section

| Section | Aspect Ratio | Min Resolution | Style |
|---------|--------------|----------------|-------|
| Hero | 16:9 | 1920x1080 | Marble statue, dark bg |
| Services | 1:1 | 800x800 | Icons or detail shots |
| About | 4:3 | 1200x900 | Team or statue |
| Case Studies | 16:9 | 1600x900 | Results/work showcase |
| Testimonials | 1:1 | 400x400 | Client headshot |
| CTA | None | N/A | Text only or subtle bg |

---

## Z-Index Layers

```
Base content:     0
Watermarks:       -1
Sticky nav:       200
Dropdowns:        100
Modals:           400
Toasts:           500
```

---

*Website Blueprint for Simplicity Agency*
*December 2024 - Version 1.0*
