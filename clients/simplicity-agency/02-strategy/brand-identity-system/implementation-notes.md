# Implementation Notes
## Simplicity Agency - Elementor & WordPress Guide

**Concept:** "Blueprints for Growth" meets "Marble Future"
**Version:** 1.0
**Updated:** December 2024

---

## Overview

This document provides implementation specifications for building the Simplicity Agency website using Elementor Pro on WordPress. All specifications align with the Brand Guidelines and Design Tokens.

---

## Required Setup

### WordPress Theme
- **Recommended:** Hello Elementor (lightweight base theme)
- **Alternative:** Astra Free (if Hello not available)
- **Avoid:** Heavy themes with built-in builders

### Required Plugins
```
Core:
├── Elementor Pro (page builder)
├── Elementor Header & Footer Builder
├── Custom Fonts (for Inter/Satoshi upload)
└── WP Rocket or LiteSpeed Cache (performance)

Optional:
├── ACF Pro (custom fields for dynamic content)
├── Lottie for Elementor (if motion graphics needed)
└── Ultimate Addons for Elementor (extended widgets)
```

### Font Setup
1. Upload fonts via **Elementor > Custom Fonts**
2. Required font files:
   - Inter (400, 500, 600, 700)
   - Satoshi (400, 500, 600, 700)
3. Set fallback: `-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`

---

## Global Site Settings

### Elementor > Site Settings > Colors

```
System Colors:
├── Primary: #0A0A0A (Charcoal)
├── Secondary: #F7F7F7 (Off-White)
├── Text: #0A0A0A (Charcoal)
└── Accent: #09B9B4 (Turquoise - USE SPARINGLY)

Custom Colors:
├── Pure Black: #000000
├── Pure White: #FFFFFF
├── Light Gray: #EAEAEA
└── Mid Gray: #BDBDBD
```

### Elementor > Site Settings > Typography

```
Primary Headline (H1):
├── Font: Inter
├── Size: 56px (Desktop) / 40px (Mobile)
├── Weight: 700
├── Line Height: 1.14
└── Letter Spacing: -0.02em

Secondary Headline (H2):
├── Font: Inter
├── Size: 48px (Desktop) / 32px (Mobile)
├── Weight: 700
├── Line Height: 1.17
└── Letter Spacing: -0.01em

H3:
├── Font: Inter
├── Size: 32px (Desktop) / 24px (Mobile)
├── Weight: 600
└── Line Height: 1.25

H4:
├── Font: Inter
├── Size: 24px (Desktop) / 20px (Mobile)
├── Weight: 600
└── Line Height: 1.33

Body Text:
├── Font: Inter
├── Size: 16px
├── Weight: 400
├── Line Height: 1.5
└── Color: #0A0A0A

Body Large:
├── Font: Inter
├── Size: 18px
├── Weight: 400
└── Line Height: 1.56

Labels/Overlines:
├── Font: Inter
├── Size: 12px
├── Weight: 600
├── Letter Spacing: 0.08em
└── Transform: Uppercase
```

### Elementor > Site Settings > Layout

```
Container Width: 1440px
Content Width: 1280px
Widgets Gap: 32px (Desktop) / 24px (Tablet) / 16px (Mobile)
```

---

## Section Implementation

### Hero Section (Full-Width Dark)

**Elementor Structure:**
```
Section Settings:
├── Layout: Boxed
├── Content Width: Full Width
├── Height: Fit to Screen (or Min 700px)
├── Column Position: Middle
└── Vertical Align: Middle

Background:
├── Type: Classic
├── Color: #0A0A0A
└── Background Overlay: None

Advanced:
├── Margin: 0
├── Padding: 80px top/bottom (Desktop)
└── Z-Index: 1
```

**Hero Content Column:**
```
Column Settings:
├── Width: 50%
├── Vertical Align: Middle
└── Padding: 0 40px

Heading Widget:
├── HTML Tag: H1
├── Style > Color: #FFFFFF
├── Typography: Use Global H1
└── Margin Bottom: 24px

Text Editor Widget:
├── Color: #FFFFFF
├── Typography: Body Large (18px)
├── Max Width: 600px
└── Margin Bottom: 32px

Button Widget (Primary):
├── Background: #000000
├── Text Color: #FFFFFF
├── Border Radius: 999px
├── Padding: 16px 32px
├── Hover Background: #0A0A0A
└── Hover Text: #FFFFFF
```

**Hero Image Column:**
```
Column Settings:
├── Width: 50%
└── Vertical Align: Middle

Image Widget:
├── Image Size: Full
├── Border Radius: 20px
└── Box Shadow: None
```

---

### Services Section (Cards Grid)

**Elementor Structure:**
```
Section Settings:
├── Layout: Boxed
├── Content Width: Boxed (1280px)
├── Background: #F7F7F7
└── Padding: 96px top/bottom

Inner Section:
├── Columns: 3 (Desktop) / 2 (Tablet) / 1 (Mobile)
└── Gap: 32px
```

**Service Card (Using Container or Inner Column):**
```
Column/Container Settings:
├── Background: #FFFFFF
├── Border Radius: 20px
├── Padding: 32px
├── Box Shadow: 0 4px 6px rgba(0,0,0,0.1)
└── Hover > Transform: translateY(-8px)
└── Hover > Box Shadow: 0 25px 50px rgba(0,0,0,0.15)

Icon Widget:
├── Icon Library: Custom SVG (line-style)
├── Size: 24px
├── Color: #0A0A0A
└── Margin Bottom: 24px

Heading Widget (H3):
├── Style: H4 size (24px)
├── Color: #0A0A0A
└── Margin Bottom: 16px

Text Editor Widget:
├── Typography: Body (16px)
├── Color: #0A0A0A
└── Margin Bottom: 24px

Button Widget (Text Link):
├── Style: Text only with arrow
├── Color: #0A0A0A
├── Hover Color: #09B9B4
└── Icon: Arrow right
```

---

### Stats Section (Full-Width Dark)

**Elementor Structure:**
```
Section Settings:
├── Layout: Full Width
├── Background: #0A0A0A
└── Padding: 80px top/bottom

Inner Section:
├── Columns: 4 (Desktop) / 2 (Tablet) / 1 (Mobile)
└── Gap: 32px
```

**Stat Item:**
```
Heading Widget (Number):
├── Size: 48-72px
├── Weight: 700
├── Color: #FFFFFF
└── Margin Bottom: 8px

Heading Widget (Label):
├── Size: 14px
├── Weight: 400
├── Color: #BDBDBD
├── Transform: Uppercase
└── Letter Spacing: 0.05em
```

**ONE Accent Stat (Optional):**
```
Heading Widget (Number):
├── Color: #09B9B4  ← Turquoise accent
└── All else same as above
```

---

### CTA Section (Conversion Block)

**Elementor Structure:**
```
Section Settings:
├── Layout: Full Width
├── Background: #000000
├── Padding: 100px top/bottom
└── Text Align: Center

Content Container:
├── Max Width: 600px
├── Margin: 0 auto
└── Text Align: Center
```

**CTA Content:**
```
Heading Widget (H2):
├── Color: #FFFFFF
├── Text Align: Center
└── Margin Bottom: 16px

Text Editor Widget:
├── Color: #FFFFFF
├── Max Width: 500px
├── Margin: 0 auto 32px auto
└── Text Align: Center

Button Widget (TURQUOISE - ONE PER PAGE):
├── Background: #09B9B4
├── Text Color: #FFFFFF
├── Border Radius: 999px
├── Padding: 16px 32px
├── Hover Background: #08a8a3 (slightly darker)
└── Hover Text: #FFFFFF
```

**⚠️ IMPORTANT:** This is the ONLY section where a turquoise button should appear on the page.

---

### Contact Section

**Elementor Structure:**
```
Section Settings:
├── Layout: Boxed
├── Background: #F7F7F7
└── Padding: 96px top/bottom

Inner Section:
├── Columns: 55% | 45%
└── Gap: 64px
```

**Form Column (Elementor Form Widget):**
```
Form Fields:
├── Name (Required)
├── Email (Required)
├── Phone (Optional)
└── Message (Textarea)

Field Style:
├── Background: #FFFFFF
├── Border: 1px solid #EAEAEA
├── Border Radius: 8px
├── Padding: 12px 16px
├── Focus Border: #0A0A0A
└── Placeholder Color: #BDBDBD

Submit Button:
├── Background: #0A0A0A
├── Text Color: #FFFFFF
├── Border Radius: 999px
├── Padding: 16px 32px
├── Full Width: Optional
└── Hover: #000000
```

**Info Column:**
```
Heading Widget:
├── Text: "Get in Touch"
├── Size: H3
└── Margin Bottom: 32px

Icon List Widget:
├── Icon Size: 20px
├── Icon Color: #09B9B4 (subtle accent)
├── Text Size: 16px
├── Text Color: #0A0A0A
└── Spacing: 24px
```

---

### Footer Section

**Elementor Structure:**
```
Section Settings:
├── Layout: Full Width
├── Background: #0A0A0A
└── Padding: 80px top, 40px bottom

Inner Section (Main):
├── Columns: 30% | 23% | 23% | 24%
└── Gap: 32px

Divider Widget:
├── Style: Solid
├── Color: #333333
├── Weight: 1px
└── Margin: 40px top/bottom

Inner Section (Bottom Bar):
├── Columns: 50% | 50%
└── Alignment: Space Between
```

**Footer Content:**
```
Logo/Brand Column:
├── Logo Widget (white version)
├── Tagline Text: 14px, #888888
└── Margin Bottom: 24px

Link Columns:
├── Heading: 14px, Uppercase, #FFFFFF
├── Links: 16px, #FFFFFF
├── Link Hover: #09B9B4
└── Line Height: 2

Bottom Bar:
├── Copyright: 14px, #888888
├── Legal Links: 14px, #888888
└── Social Icons: 20px, #FFFFFF, Hover #09B9B4
```

---

## Navigation Implementation

### Header Settings

**Elementor Header Template:**
```
Section Settings:
├── Layout: Full Width
├── Background: #FFFFFF or Transparent
├── Padding: 16px top/bottom
└── Position: Fixed (Sticky)
└── Z-Index: 200

Content Width: 1280px
Columns: Logo (Left) | Nav (Center) | CTA (Right)
```

**Nav Menu Widget:**
```
Typography:
├── Font: Inter
├── Size: 14px
├── Weight: 500
└── Letter Spacing: 0.02em

Colors:
├── Text: #0A0A0A
├── Text Hover: #09B9B4
└── Active: #0A0A0A

Pointer:
├── Type: Underline
├── Animation: Fade
└── Color: #0A0A0A
```

**CTA Button (Header):**
```
├── Background: #0A0A0A
├── Text: #FFFFFF
├── Border Radius: 999px
├── Padding: 12px 24px
└── Size: Small (14px)
```

---

## Responsive Settings

### Breakpoints (Elementor Default)

```
Desktop: 1025px+
Tablet: 768px - 1024px
Mobile: 0 - 767px
```

### Mobile Adjustments

**Typography Scaling:**
```
H1: 56px → 40px
H2: 48px → 32px
H3: 32px → 24px
H4: 24px → 20px
Body: 16px → 16px (no change)
```

**Spacing Scaling:**
```
Section Padding: 96px → 48px
Container Margin: 80px → 16px
Card Padding: 32px → 24px
Gap: 32px → 16px
```

**Layout Changes:**
```
3-column → 1-column (mobile)
2-column → 1-column (mobile)
Side-by-side → Stacked (mobile)
```

---

## Animation Settings

### Scroll Animations (Elementor Motion Effects)

**Entrance Animation:**
```
Animation: Fade In Up
Duration: Normal (1s)
Delay: 0ms (stagger: 100ms per element)
```

**Scroll Effects (Advanced):**
```
Parallax (Images):
├── Enable Scrolling Effects: Yes
├── Vertical Scroll: Yes
├── Speed: 3 (slow)
└── Viewport: 0% to 100%
```

### Hover Animations

**Cards:**
```
Transform:
├── Translate Y: -8px
└── Transition Duration: 300ms

Box Shadow:
├── Default: 0 4px 6px rgba(0,0,0,0.1)
└── Hover: 0 25px 50px rgba(0,0,0,0.15)
```

**Buttons:**
```
Background Transition: 200ms
No Transform on Hover
```

---

## Image Handling

### Recommended Sizes

```
Hero Images: 1920x1080px (16:9)
Service Icons: 48x48px or 64x64px (SVG preferred)
Case Study: 1600x900px (16:9)
Team Photos: 800x800px (1:1)
Testimonial Avatars: 100x100px (1:1)
Background Patterns: SVG (scalable)
```

### Image Optimization

```
Format: WebP (with JPEG fallback)
Quality: 80-85%
Lazy Loading: Enabled
Alt Text: Required for all images
```

---

## Performance Checklist

### Before Launch

- [ ] Remove unused Elementor widgets from pages
- [ ] Optimize images (WebP, compressed)
- [ ] Enable caching plugin (WP Rocket / LiteSpeed)
- [ ] Minify CSS/JS (Elementor Experiments)
- [ ] Lazy load images and videos
- [ ] Preload critical fonts (Inter)
- [ ] Check Core Web Vitals (LCP < 2.5s, CLS < 0.1)
- [ ] Test on mobile devices
- [ ] Verify turquoise accent is used sparingly (5-8% max)

### Elementor Performance Settings

```
Elementor > Settings > Advanced:
├── CSS Print Method: Internal Embedding
├── Load Font Awesome: No
└── Optimize Font Loading: Yes

Elementor > Settings > Experiments:
├── Flexbox Container: Active
├── Nested Elements: Active
└── Optimized Markup: Active
```

---

## Custom CSS Snippets

### Add to Elementor > Custom CSS or Theme Customizer

**Reduced Motion Media Query:**
```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

**Watermark Text Background:**
```css
.watermark-text {
  position: absolute;
  font-size: 15vw;
  font-weight: 700;
  text-transform: uppercase;
  color: #0A0A0A;
  opacity: 0.03;
  pointer-events: none;
  z-index: -1;
  white-space: nowrap;
}
```

**Focus Ring for Accessibility:**
```css
*:focus-visible {
  outline: 2px solid #0A0A0A;
  outline-offset: 2px;
}

button:focus-visible,
a:focus-visible {
  outline: 2px solid #0A0A0A;
  outline-offset: 2px;
}
```

**Button Pill Style Global:**
```css
.elementor-button {
  border-radius: 999px !important;
}
```

---

## Template Library

### Save as Global Templates

Create Elementor templates for repeated sections:

1. **Header Template** - Sticky navigation with logo, menu, CTA
2. **Footer Template** - 4-column footer with bottom bar
3. **Hero Section Template** - Full-width dark hero
4. **Stats Section Template** - 4-stat dark strip
5. **CTA Section Template** - Centered conversion block
6. **Service Card Template** - Individual card widget
7. **Testimonial Slider Template** - Quote with navigation

### Global Widgets

Save as Global Widgets for consistency:
- Primary Button (Black)
- Secondary Button (Outline)
- Accent Button (Turquoise - use ONE per page)
- Section Label (Uppercase turquoise)
- Card Component

---

## Quality Checklist

### Per Page Review

- [ ] Only ONE turquoise accent button per page
- [ ] Turquoise usage under 5-8% of visual space
- [ ] All typography using global styles
- [ ] Section padding matches specs (96px desktop)
- [ ] Cards have 20px border-radius
- [ ] Buttons have pill shape (999px radius)
- [ ] Images use correct aspect ratios
- [ ] Hover states work on all interactive elements
- [ ] Mobile layout properly stacked
- [ ] All links have hover color change

### Accessibility Check

- [ ] Color contrast meets WCAG AA (4.5:1)
- [ ] All images have alt text
- [ ] Focus states visible on all interactive elements
- [ ] Reduced motion respected
- [ ] Touch targets minimum 44px
- [ ] Form labels associated with inputs

---

*Implementation Notes for Simplicity Agency - Elementor/WordPress*
*December 2024 - Version 1.0*
