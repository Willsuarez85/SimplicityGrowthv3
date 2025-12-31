# Component Specifications
## Simplicity Agency UI Library

**Version:** 1.0
**Concept:** Blueprints for Growth meets Marble Future
**Philosophy:** "Cada elemento debe justificar su existencia."

---

## Table of Contents
1. [Buttons](#1-buttons)
2. [Cards](#2-cards)
3. [Navigation](#3-navigation)
4. [Forms & Inputs](#4-forms--inputs)
5. [Section Layouts](#5-section-layouts)
6. [Hero Components](#6-hero-components)
7. [Footer](#7-footer)
8. [Graphic Elements](#8-graphic-elements)
9. [Tags & Badges](#9-tags--badges)
10. [Testimonials](#10-testimonials)

---

## 1. Buttons

### 1.1 Primary Button (Default)

```css
.btn-primary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  /* Sizing */
  padding: 16px 32px;
  min-height: 52px;

  /* Colors */
  background-color: #000000;
  color: #FFFFFF;

  /* Typography */
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;

  /* Shape */
  border: none;
  border-radius: 999px;

  /* Interaction */
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-primary:hover {
  background-color: #0A0A0A;
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
}

.btn-primary:active {
  transform: translateY(0);
}

.btn-primary:focus-visible {
  outline: 2px solid #000000;
  outline-offset: 2px;
}
```

**Variants:**
- **Large:** padding: 20px 40px; min-height: 60px; font-size: 16px;
- **Small:** padding: 12px 24px; min-height: 44px; font-size: 12px;

### 1.2 Secondary Button (Outline)

```css
.btn-secondary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  /* Sizing */
  padding: 16px 32px;
  min-height: 52px;

  /* Colors */
  background-color: transparent;
  color: #0A0A0A;

  /* Border */
  border: 1.5px solid #0A0A0A;
  border-radius: 999px;

  /* Typography */
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;

  /* Interaction */
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-secondary:hover {
  background-color: #0A0A0A;
  color: #FFFFFF;
}
```

### 1.3 Accent Button (RESTRICTED - 1 per page max)

```css
.btn-accent {
  /* Same structure as primary */
  background-color: #09B9B4;
  color: #FFFFFF;
}

.btn-accent:hover {
  background-color: #08A5A1;
}
```

**Usage Rules:**
- Only ONE accent button per page
- Reserved for primary CTA only
- Never use for secondary actions

### 1.4 Ghost Button

```css
.btn-ghost {
  background: transparent;
  color: #0A0A0A;
  border: none;
  padding: 8px 16px;
  font-size: 14px;
  font-weight: 500;
  text-decoration: underline;
  text-underline-offset: 4px;
}

.btn-ghost:hover {
  color: #09B9B4;
}
```

### 1.5 Icon Button

```css
.btn-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  padding: 0;
  background: transparent;
  border: 1.5px solid #EAEAEA;
  border-radius: 999px;
  transition: all 0.3s ease;
}

.btn-icon:hover {
  border-color: #0A0A0A;
  background: #0A0A0A;
  color: #FFFFFF;
}

.btn-icon svg {
  width: 20px;
  height: 20px;
}
```

---

## 2. Cards

### 2.1 Standard Card

```css
.card {
  background-color: #F7F7F7;
  border-radius: 24px;
  padding: 32px;
  border: none;
  transition: all 0.3s ease;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.08);
}

.card-title {
  font-size: 24px;
  font-weight: 600;
  color: #0A0A0A;
  margin-bottom: 12px;
}

.card-text {
  font-size: 16px;
  line-height: 1.6;
  color: #666666;
}
```

### 2.2 Service Card

```css
.card-service {
  background-color: #F7F7F7;
  border-radius: 28px;
  padding: 40px;
  position: relative;
  overflow: hidden;
}

.card-service::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 4px;
  height: 100%;
  background: #09B9B4;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.card-service:hover::before {
  opacity: 1;
}

.card-service-icon {
  width: 56px;
  height: 56px;
  background: #FFFFFF;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 24px;
}

.card-service-icon svg {
  width: 28px;
  height: 28px;
  stroke: #0A0A0A;
  stroke-width: 1.5;
}

.card-service-title {
  font-size: 20px;
  font-weight: 600;
  color: #0A0A0A;
  margin-bottom: 12px;
}

.card-service-description {
  font-size: 15px;
  line-height: 1.7;
  color: #666666;
}
```

### 2.3 Stat Card

```css
.card-stat {
  background: linear-gradient(135deg, #0A0A0A 0%, #1a1a1a 100%);
  border-radius: 24px;
  padding: 40px;
  color: #FFFFFF;
}

.card-stat-number {
  font-size: 56px;
  font-weight: 700;
  letter-spacing: -0.02em;
  margin-bottom: 8px;
}

.card-stat-number .accent {
  color: #09B9B4;
}

.card-stat-label {
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: #BDBDBD;
}
```

### 2.4 Image Card

```css
.card-image {
  border-radius: 24px;
  overflow: hidden;
  position: relative;
}

.card-image img {
  width: 100%;
  height: auto;
  display: block;
  transition: transform 0.5s ease;
}

.card-image:hover img {
  transform: scale(1.03);
}

.card-image-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 32px;
  background: linear-gradient(transparent, rgba(0,0,0,0.8));
  color: #FFFFFF;
}
```

---

## 3. Navigation

### 3.1 Main Navigation (Desktop)

```css
.nav-main {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 80px;
  background: #FFFFFF;
  position: sticky;
  top: 0;
  z-index: 100;
  border-bottom: 1px solid #EAEAEA;
}

.nav-logo {
  height: 32px;
  width: auto;
}

.nav-links {
  display: flex;
  gap: 40px;
  list-style: none;
  margin: 0;
  padding: 0;
}

.nav-link {
  font-size: 14px;
  font-weight: 500;
  color: #0A0A0A;
  text-decoration: none;
  position: relative;
  padding: 8px 0;
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background: #09B9B4;
  transition: width 0.3s ease;
}

.nav-link:hover::after,
.nav-link.active::after {
  width: 100%;
}

.nav-cta {
  /* Use .btn-primary styles */
}
```

### 3.2 Mobile Navigation

```css
.nav-mobile-toggle {
  display: none;
  width: 44px;
  height: 44px;
  padding: 0;
  background: transparent;
  border: none;
}

@media (max-width: 1023px) {
  .nav-links { display: none; }
  .nav-mobile-toggle { display: flex; }
}

.nav-mobile-menu {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #FFFFFF;
  padding: 100px 40px 40px;
  transform: translateX(100%);
  transition: transform 0.4s ease;
  z-index: 99;
}

.nav-mobile-menu.open {
  transform: translateX(0);
}

.nav-mobile-links {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.nav-mobile-link {
  font-size: 32px;
  font-weight: 600;
  color: #0A0A0A;
  text-decoration: none;
}
```

### 3.3 Breadcrumb

```css
.breadcrumb {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 13px;
  color: #BDBDBD;
}

.breadcrumb-item {
  color: #BDBDBD;
  text-decoration: none;
}

.breadcrumb-item:hover {
  color: #0A0A0A;
}

.breadcrumb-separator {
  color: #EAEAEA;
}

.breadcrumb-current {
  color: #0A0A0A;
  font-weight: 500;
}
```

---

## 4. Forms & Inputs

### 4.1 Text Input

```css
.input {
  width: 100%;
  padding: 16px 20px;
  font-family: 'Inter', sans-serif;
  font-size: 16px;
  color: #0A0A0A;
  background: #FFFFFF;
  border: 1.5px solid #EAEAEA;
  border-radius: 12px;
  transition: all 0.2s ease;
}

.input::placeholder {
  color: #BDBDBD;
}

.input:hover {
  border-color: #BDBDBD;
}

.input:focus {
  outline: none;
  border-color: #0A0A0A;
  box-shadow: 0 0 0 3px rgba(10, 10, 10, 0.05);
}

.input:disabled {
  background: #F7F7F7;
  color: #BDBDBD;
  cursor: not-allowed;
}
```

### 4.2 Textarea

```css
.textarea {
  /* Inherits .input styles */
  min-height: 120px;
  resize: vertical;
}
```

### 4.3 Select

```css
.select {
  /* Inherits .input styles */
  appearance: none;
  background-image: url("data:image/svg+xml,..."); /* Chevron icon */
  background-repeat: no-repeat;
  background-position: right 16px center;
  padding-right: 48px;
}
```

### 4.4 Checkbox

```css
.checkbox-wrapper {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  cursor: pointer;
}

.checkbox {
  width: 20px;
  height: 20px;
  border: 1.5px solid #EAEAEA;
  border-radius: 4px;
  appearance: none;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
}

.checkbox:checked {
  background: #0A0A0A;
  border-color: #0A0A0A;
}

.checkbox:checked::after {
  content: '';
  position: absolute;
  top: 3px;
  left: 6px;
  width: 5px;
  height: 10px;
  border: 2px solid #FFFFFF;
  border-top: none;
  border-left: none;
  transform: rotate(45deg);
}

.checkbox-label {
  font-size: 15px;
  color: #0A0A0A;
  line-height: 1.4;
}
```

### 4.5 Form Group

```css
.form-group {
  margin-bottom: 24px;
}

.form-label {
  display: block;
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.03em;
  text-transform: uppercase;
  color: #0A0A0A;
  margin-bottom: 8px;
}

.form-hint {
  font-size: 13px;
  color: #BDBDBD;
  margin-top: 8px;
}

.form-error {
  font-size: 13px;
  color: #DC2626;
  margin-top: 8px;
}

.input.error {
  border-color: #DC2626;
}
```

---

## 5. Section Layouts

### 5.1 Standard Section

```css
.section {
  padding: 96px 80px;
  position: relative;
}

@media (max-width: 1023px) {
  .section { padding: 64px 40px; }
}

@media (max-width: 767px) {
  .section { padding: 48px 16px; }
}

.section-dark {
  background: #0A0A0A;
  color: #FFFFFF;
}

.section-light {
  background: #F7F7F7;
}

.section-white {
  background: #FFFFFF;
}
```

### 5.2 Section Header

```css
.section-header {
  max-width: 800px;
  margin-bottom: 64px;
}

.section-header.center {
  text-align: center;
  margin-left: auto;
  margin-right: auto;
}

.section-label {
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #09B9B4;
  margin-bottom: 16px;
}

.section-title {
  font-size: 48px;
  font-weight: 700;
  letter-spacing: -0.02em;
  line-height: 1.15;
  color: #0A0A0A;
  margin-bottom: 20px;
}

.section-dark .section-title {
  color: #FFFFFF;
}

.section-subtitle {
  font-size: 18px;
  line-height: 1.6;
  color: #666666;
}

.section-dark .section-subtitle {
  color: #BDBDBD;
}
```

### 5.3 Grid Layouts

```css
/* 2-Column Grid */
.grid-2 {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 32px;
}

@media (max-width: 767px) {
  .grid-2 { grid-template-columns: 1fr; }
}

/* 3-Column Grid */
.grid-3 {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px;
}

@media (max-width: 1023px) {
  .grid-3 { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 767px) {
  .grid-3 { grid-template-columns: 1fr; }
}

/* 4-Column Grid */
.grid-4 {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
}

@media (max-width: 1023px) {
  .grid-4 { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 767px) {
  .grid-4 { grid-template-columns: 1fr; }
}
```

---

## 6. Hero Components

### 6.1 Standard Hero

```css
.hero {
  min-height: 85vh;
  display: flex;
  align-items: center;
  padding: 120px 80px;
  position: relative;
  overflow: hidden;
}

.hero-content {
  max-width: 700px;
  position: relative;
  z-index: 2;
}

.hero-title {
  font-size: 72px;
  font-weight: 700;
  letter-spacing: -0.03em;
  line-height: 1.05;
  color: #0A0A0A;
  margin-bottom: 24px;
}

.hero-subtitle {
  font-size: 20px;
  line-height: 1.6;
  color: #666666;
  margin-bottom: 40px;
  max-width: 560px;
}

.hero-cta {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}

/* Watermark Background */
.hero-watermark {
  position: absolute;
  top: 50%;
  right: -10%;
  transform: translateY(-50%);
  font-size: 20vw;
  font-weight: 700;
  text-transform: uppercase;
  color: #0A0A0A;
  opacity: 0.03;
  white-space: nowrap;
  pointer-events: none;
  z-index: 1;
}
```

### 6.2 Split Hero (Image + Content)

```css
.hero-split {
  display: grid;
  grid-template-columns: 1fr 1fr;
  min-height: 100vh;
}

@media (max-width: 1023px) {
  .hero-split {
    grid-template-columns: 1fr;
    min-height: auto;
  }
}

.hero-split-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 80px;
}

.hero-split-image {
  position: relative;
  overflow: hidden;
}

.hero-split-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
```

---

## 7. Footer

### 7.1 Standard Footer

```css
.footer {
  background: #0A0A0A;
  color: #FFFFFF;
  padding: 80px 80px 40px;
}

.footer-grid {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: 64px;
  margin-bottom: 64px;
}

@media (max-width: 1023px) {
  .footer-grid {
    grid-template-columns: 1fr 1fr;
    gap: 40px;
  }
}

@media (max-width: 767px) {
  .footer-grid {
    grid-template-columns: 1fr;
  }
}

.footer-brand-description {
  font-size: 15px;
  line-height: 1.7;
  color: #BDBDBD;
  margin-top: 20px;
  max-width: 320px;
}

.footer-heading {
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #FFFFFF;
  margin-bottom: 20px;
}

.footer-links {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-link {
  display: block;
  font-size: 15px;
  color: #BDBDBD;
  text-decoration: none;
  padding: 8px 0;
  transition: color 0.2s ease;
}

.footer-link:hover {
  color: #09B9B4;
}

.footer-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 40px;
  border-top: 1px solid rgba(255,255,255,0.1);
}

.footer-copyright {
  font-size: 13px;
  color: #666666;
}

.footer-socials {
  display: flex;
  gap: 16px;
}
```

---

## 8. Graphic Elements

### 8.1 Blueprint Ring

```css
.blueprint-ring {
  position: relative;
  width: 120px;
  height: 120px;
}

.blueprint-ring-outer {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: 1px solid #EAEAEA;
  border-radius: 50%;
}

.blueprint-ring-inner {
  position: absolute;
  top: 20%;
  left: 20%;
  width: 60%;
  height: 60%;
  border: 1px solid #EAEAEA;
  border-radius: 50%;
}

/* SVG Arc Accent */
.blueprint-ring-accent {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.blueprint-ring-accent path {
  fill: none;
  stroke: #09B9B4;
  stroke-width: 2;
  stroke-linecap: round;
}
```

### 8.2 Watermark Text

```css
.watermark {
  position: absolute;
  font-size: 15vw;
  font-weight: 700;
  text-transform: uppercase;
  color: currentColor;
  opacity: 0.03;
  white-space: nowrap;
  pointer-events: none;
  user-select: none;
}

.watermark-left {
  left: -5%;
  top: 50%;
  transform: translateY(-50%);
}

.watermark-right {
  right: -5%;
  top: 50%;
  transform: translateY(-50%);
}
```

### 8.3 Wireframe Grid Background

```css
.bg-wireframe {
  position: relative;
}

.bg-wireframe::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image:
    linear-gradient(rgba(10,10,10,0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(10,10,10,0.03) 1px, transparent 1px);
  background-size: 40px 40px;
  pointer-events: none;
}
```

---

## 9. Tags & Badges

### 9.1 Tag

```css
.tag {
  display: inline-flex;
  align-items: center;
  padding: 6px 14px;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.03em;
  text-transform: uppercase;
  color: #0A0A0A;
  background: #F7F7F7;
  border-radius: 999px;
}

.tag-accent {
  background: rgba(9, 185, 180, 0.1);
  color: #09B9B4;
}

.tag-dark {
  background: #0A0A0A;
  color: #FFFFFF;
}
```

### 9.2 Status Badge

```css
.badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 10px;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  border-radius: 999px;
}

.badge-success {
  background: rgba(16, 185, 129, 0.1);
  color: #10B981;
}

.badge-warning {
  background: rgba(245, 158, 11, 0.1);
  color: #F59E0B;
}

.badge-error {
  background: rgba(239, 68, 68, 0.1);
  color: #EF4444;
}

.badge-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: currentColor;
}
```

---

## 10. Testimonials

### 10.1 Testimonial Card

```css
.testimonial-card {
  background: #F7F7F7;
  border-radius: 24px;
  padding: 40px;
}

.testimonial-quote {
  font-size: 18px;
  line-height: 1.7;
  color: #0A0A0A;
  margin-bottom: 32px;
  font-style: italic;
}

.testimonial-author {
  display: flex;
  align-items: center;
  gap: 16px;
}

.testimonial-avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
}

.testimonial-name {
  font-size: 15px;
  font-weight: 600;
  color: #0A0A0A;
}

.testimonial-role {
  font-size: 13px;
  color: #BDBDBD;
}
```

### 10.2 Logo Carousel

```css
.logo-carousel {
  display: flex;
  align-items: center;
  gap: 64px;
  overflow: hidden;
}

.logo-item {
  flex-shrink: 0;
  height: 32px;
  opacity: 0.4;
  filter: grayscale(100%);
  transition: all 0.3s ease;
}

.logo-item:hover {
  opacity: 1;
  filter: grayscale(0%);
}
```

---

## Implementation Checklist

Before implementing any component:

- [ ] Verify color usage follows 5-8% accent rule
- [ ] Check border-radius consistency (pills for buttons, 20-28px for cards)
- [ ] Ensure typography uses approved font stack
- [ ] Validate spacing follows 8pt grid
- [ ] Test hover/focus states for accessibility
- [ ] Verify responsive behavior at all breakpoints
- [ ] Check that interactions respect prefers-reduced-motion

---

*Component Specifications v1.0 - Simplicity Agency*
*Concept: "Blueprints for Growth meets Marble Future"*
