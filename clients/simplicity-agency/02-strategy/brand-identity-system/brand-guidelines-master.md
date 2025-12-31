# Simplicity Agency
## Visual Identity System v2.0

**Concepto:** "Blueprints for Growth" meets "Marble Future"
**Tagline:** "Cada elemento debe justificar su existencia."
**Fecha:** Diciembre 2024

---

## 1. Brand Concept

### Filosofia Visual

Simplicity Agency fusiona dos lenguajes visuales:

1. **Blueprints for Growth** - El lenguaje del arquitecto y el ingeniero
   - Metodo, sistema, ingenieria, claridad
   - Grid, wireframes, lineas de construccion
   - Precision matematica, espacios calculados

2. **Marble Future** - La nobleza del guerrero clasico
   - Estatuas greco-romanas de guerreros y lideres
   - Tecnologia esculpida en piedra (no como accesorio)
   - Disciplina, fuerza, liderazgo atemporal

### Museo + Laboratorio

```
MUSEO                          LABORATORIO
-----------                    -------------
Estatuas clasicas              Wireframes de AI
Marmol, luz dramatica          Grid systems
Legado y sabiduria             Sistemas escalables
Heritage                       Innovation
```

### Personalidad de Marca

| Atributo | Descripcion |
|----------|-------------|
| **Minimal** | Solo lo esencial, nada sobra |
| **Surgical** | Precision, cada decision es intencional |
| **Strategic** | Pensamiento de largo plazo |
| **Modern** | Actualidad sin modas pasajeras |
| **Trustworthy** | Confianza a traves de claridad |

### Lo Que Somos vs Lo Que NO Somos

```
SOMOS                              NO SOMOS
-----------                        -------------
Growth Partner estrategico         Fabrica de contenido
Arquitectos de sistemas            Ejecutores tacticos
Premium minimalism                 Agencia colorida/playful
Claridad y metodo                  Creatividad caotica
Museo + Laboratorio                Solo tecnologia o solo arte
```

---

## 2. Tagline y Mensajes Clave

### Tagline Principal

**Espanol:** "Cada elemento debe justificar su existencia."
**English:** "Every element must justify its existence."

### Voice Principles

1. **Directo** - Sin rodeos, al punto
2. **Confiado** - Seguridad sin arrogancia
3. **Preciso** - Cada palabra tiene proposito
4. **Estrategico** - Orientado a resultados

### Frases Prohibidas

- "Soluciones integrales"
- "De la mano contigo"
- "Tu exito es nuestro exito"
- "360 grados"
- Emojis excesivos
- Lenguaje casual/informal

---

## 3. Sistema de Colores

### Paleta Principal

| Token | Hex | Uso | Proporcion |
|-------|-----|-----|------------|
| `--white` | #FFFFFF | Fondos principales, texto sobre oscuro | 35-40% |
| `--off-white` | #F7F7F7 | Fondos alternativos, tarjetas | 15-20% |
| `--charcoal` | #0A0A0A | Secciones hero, footers, enfasis | 25-30% |
| `--black` | #000000 | Texto principal, fondos absolutos | 10-15% |
| `--mid-gray` | #BDBDBD | Texto secundario, iconos inactivos | 5-8% |
| `--light-gray` | #EAEAEA | Lineas, divisores, grid sutil | 3-5% |
| `--accent` | #09B9B4 | **MICRO-HIGHLIGHTS ONLY** | **5-8% MAX** |

### Reglas de Uso del Turquesa (#09B9B4)

**PERMITIDO:**
- Segmento de 15-20 grados en rings concentricos
- Underline de 2px en chips/etiquetas
- Icono activo en navegacion (solo el icono, no fondo)
- Cursor/caret en inputs
- Borde en hover de botones secundarios

**PROHIBIDO:**
- Fondos solidos de turquesa
- Texto en turquesa
- Botones primarios en turquesa
- Gradientes con turquesa
- Secciones enteras en turquesa
- Mas de un elemento turquesa visible a la vez

### Modos de Color

**Light Mode:**
```css
--bg-primary: #FFFFFF;
--bg-secondary: #F7F7F7;
--text-primary: #000000;
--text-secondary: #BDBDBD;
--border: #EAEAEA;
```

**Dark Mode:**
```css
--bg-primary: #0A0A0A;
--bg-secondary: #1A1A1A;
--text-primary: #FFFFFF;
--text-secondary: #888888;
--border: #2A2A2A;
```

### Accesibilidad

| Combinacion | Ratio | WCAG |
|-------------|-------|------|
| #000000 sobre #FFFFFF | 21:1 | AAA |
| #FFFFFF sobre #0A0A0A | 19.5:1 | AAA |
| #BDBDBD sobre #FFFFFF | 4.6:1 | AA |
| #09B9B4 sobre #0A0A0A | 8.2:1 | AAA |

---

## 4. Tipografia

### Font Stack

```css
--font-primary: 'Inter', 'Satoshi', system-ui, sans-serif;
--font-display: 'Neue Haas Grotesk Display', 'Inter', sans-serif;
```

### Escala Tipografica

| Nivel | Desktop | Mobile | Weight | Line Height | Letter Spacing |
|-------|---------|--------|--------|-------------|----------------|
| H1 | 56-72px | 36-44px | 800 (ExtraBold) | 1.0-1.1 | -0.02em |
| H2 | 40-48px | 28-32px | 700 (Bold) | 1.1-1.2 | -0.01em |
| H3 | 28-32px | 22-24px | 600 (SemiBold) | 1.2 | 0 |
| H4 | 20-24px | 18-20px | 600 (SemiBold) | 1.3 | 0 |
| Body | 16-18px | 16px | 400 (Regular) | 1.6-1.7 | 0 |
| Body Small | 14px | 14px | 400 (Regular) | 1.5 | 0 |
| Caption | 12px | 12px | 500 (Medium) | 1.4 | 0.02em |
| Overline | 11-12px | 11px | 600 (SemiBold) | 1.2 | 0.08em |

### Reglas Tipograficas

1. **Headlines:** Siempre en sentence case excepto watermarks (UPPERCASE)
2. **Body text:** Maximo 65-75 caracteres por linea
3. **Watermarks:** UPPERCASE, ExtraBold, opacity 3-5%
4. **Labels/Tags:** UPPERCASE, letter-spacing 0.08em
5. **Numeros:** Usar tabular figures para datos/estadisticas

### Jerarquia Visual

```
WATERMARK (fondo)     → "STRATEGY" en gris super claro
H1 (protagonista)     → Titulo principal, una linea ideal
Body (explicacion)    → Maximo 2-3 lineas
CTA (accion)          → Boton unico por seccion
```

---

## 5. Sistema de Layout

### Grid System

```css
--columns: 12;
--gutter: 32px;
--margin-desktop: 80px;
--margin-tablet: 48px;
--margin-mobile: 24px;
```

### Breakpoints

| Nombre | Min Width | Columns | Margins |
|--------|-----------|---------|---------|
| Mobile | 0px | 4 | 24px |
| Tablet | 768px | 8 | 48px |
| Desktop | 1024px | 12 | 80px |
| Large | 1440px | 12 | auto (max 1280px) |

### Sistema de Espaciado (8pt)

```css
--space-1: 8px;    /* Micro spacing */
--space-2: 16px;   /* Element spacing */
--space-3: 24px;   /* Component spacing */
--space-4: 32px;   /* Section internal */
--space-5: 48px;   /* Section gaps */
--space-6: 64px;   /* Large gaps */
--space-7: 96px;   /* Section padding */
--space-8: 140px;  /* Hero padding */
```

### Padding de Secciones

| Tipo | Desktop | Mobile |
|------|---------|--------|
| Hero | 140px top/bottom | 80px |
| Standard | 96px top/bottom | 64px |
| Compact | 64px top/bottom | 48px |
| Card internal | 32-40px | 24px |

### Radios

```css
--radius-sm: 8px;     /* Inputs, chips */
--radius-md: 16px;    /* Cards pequenas */
--radius-lg: 20-28px; /* Cards grandes */
--radius-pill: 999px; /* Botones, badges */
```

---

## 6. Elementos Graficos

### 6.1 Watermark Headings

Palabras enormes en gris ultra-claro detras del contenido principal.

```css
.watermark {
  font-size: clamp(80px, 15vw, 200px);
  font-weight: 800;
  text-transform: uppercase;
  color: rgba(0, 0, 0, 0.03); /* Light mode */
  /* color: rgba(255, 255, 255, 0.03); Dark mode */
  position: absolute;
  z-index: 0;
  letter-spacing: -0.02em;
}
```

**Palabras permitidas:** STRATEGY, GROWTH, SYSTEMS, BUILD, SCALE, CLARITY, METHOD

### 6.2 Blueprint Rings

Circulos concentricos con un micro-segmento turquesa.

```
Especificaciones:
- 3-5 circulos concentricos
- Stroke: 1px en #EAEAEA (light) o #2A2A2A (dark)
- Un segmento de 15-20 grados en #09B9B4
- Posicion: esquinas o detras de contenido
- Opacity base: 30-50%
```

### 6.3 Wireframe Grid

Grid sutil visible en secciones oscuras.

```css
.wireframe-grid {
  background-image:
    linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
  background-size: 40px 40px;
}
```

### 6.4 Museum Label Chips

Etiquetas estilo museo para categorias.

```css
.museum-chip {
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  padding: 8px 16px;
  border-bottom: 2px solid #09B9B4;
  background: transparent;
}
```

### 6.5 Divisores

```css
.divider {
  height: 1px;
  background: #EAEAEA;
  margin: 64px 0;
}

.divider-fade {
  background: linear-gradient(90deg, transparent, #EAEAEA, transparent);
}
```

---

## 7. Componentes UI

### 7.1 Botones

**Primary Button:**
```css
.btn-primary {
  background: #000000;
  color: #FFFFFF;
  padding: 16px 32px;
  border-radius: 999px;
  font-size: 14px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  transition: transform 0.2s, box-shadow 0.2s;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0,0,0,0.15);
}
```

**Secondary Button:**
```css
.btn-secondary {
  background: transparent;
  color: #000000;
  padding: 16px 32px;
  border: 1px solid #EAEAEA;
  border-radius: 999px;
  font-size: 14px;
  font-weight: 600;
}

.btn-secondary:hover {
  border-color: #09B9B4;
}
```

**Ghost Button:**
```css
.btn-ghost {
  background: transparent;
  color: #000000;
  padding: 16px 0;
  font-size: 14px;
  font-weight: 600;
  text-decoration: underline;
  text-underline-offset: 4px;
}
```

### 7.2 Cards

**Standard Card:**
```css
.card {
  background: #FFFFFF;
  border: 1px solid #EAEAEA;
  border-radius: 20px;
  padding: 32px;
  transition: transform 0.3s, box-shadow 0.3s;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 40px rgba(0,0,0,0.08);
}
```

**Dark Card:**
```css
.card-dark {
  background: #0A0A0A;
  border: 1px solid #2A2A2A;
  border-radius: 20px;
  padding: 32px;
  color: #FFFFFF;
}
```

**Feature Card (con icono):**
```css
.card-feature {
  /* Base card styles */
  text-align: left;
}

.card-feature .icon {
  width: 48px;
  height: 48px;
  margin-bottom: 24px;
  color: #000000;
}

.card-feature h3 {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 12px;
}

.card-feature p {
  font-size: 16px;
  color: #BDBDBD;
  line-height: 1.6;
}
```

### 7.3 Navegacion

**Header Desktop:**
```css
.header {
  position: fixed;
  top: 0;
  width: 100%;
  padding: 24px 80px;
  background: rgba(255,255,255,0.95);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid #EAEAEA;
  z-index: 1000;
}

.nav-link {
  font-size: 14px;
  font-weight: 500;
  color: #000000;
  text-decoration: none;
  padding: 8px 16px;
}

.nav-link:hover {
  color: #09B9B4;
}

.nav-cta {
  /* btn-primary styles */
}
```

**Mobile Menu:**
```css
.mobile-menu {
  position: fixed;
  inset: 0;
  background: #0A0A0A;
  padding: 80px 24px;
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.mobile-link {
  font-size: 32px;
  font-weight: 700;
  color: #FFFFFF;
}
```

### 7.4 Inputs

```css
.input {
  width: 100%;
  padding: 16px 20px;
  font-size: 16px;
  border: 1px solid #EAEAEA;
  border-radius: 8px;
  background: #FFFFFF;
  transition: border-color 0.2s;
}

.input:focus {
  outline: none;
  border-color: #09B9B4;
}

.input::placeholder {
  color: #BDBDBD;
}

.label {
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 8px;
  display: block;
}
```

### 7.5 Testimonial Cards

```css
.testimonial {
  background: #F7F7F7;
  border-radius: 24px;
  padding: 40px;
}

.testimonial-quote {
  font-size: 20px;
  line-height: 1.6;
  font-style: italic;
  margin-bottom: 24px;
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
  font-size: 14px;
  font-weight: 600;
}

.testimonial-role {
  font-size: 12px;
  color: #BDBDBD;
}
```

---

## 8. Fotografia e Imagenes

### Concepto Visual

**Sujeto:** Estatuas greco-romanas de guerreros, lideres, figuras de autoridad
- NO solo filosofos pensativos
- SI guerreros, generales, figuras de poder
- Expresiones de determinacion, no contemplacion mistica

**Tecnologia Esculpida:**
- Dispositivos TALLADOS en marmol/piedra (no accesorios reales)
- Sin logos, sin pantallas encendidas, sin textos
- Textura de piedra visible: poros, polvo, micro-grietas
- Parece escultura de museo, no render digital

**Iluminacion:**
- Luz de museo: dramatica, lateral, escultorica
- Fondos NEGRO PURO (#000000)
- Sin gradientes de color, sin humo, sin particulas

**Tratamiento de Color:**
- Monocromatico o tonos piedra
- Sin filtros de color
- Contraste alto pero natural

### Reglas de Composicion

```
DO:
- Estatua como protagonista absoluto
- Espacio negativo generoso
- Un solo punto focal
- Fondo negro limpio

DON'T:
- Elementos flotantes (particulas, humo)
- Gradientes de color
- Multiples estatuas en una imagen
- Dispositivos con pantallas encendidas
- Aspecto de "render 3D" o "AI art"
```

### Cropping Guidelines

| Formato | Uso | Composicion |
|---------|-----|-------------|
| 16:9 | Hero, headers | Estatua al 60% derecha, espacio para texto izquierda |
| 1:1 | Social, thumbnails | Estatua centrada, close-up |
| 4:5 | Instagram feed | Estatua 2/3 inferiores, espacio superior |
| 9:16 | Stories, Reels covers | Estatua completa centrada |

---

## 9. Motion y Animacion

### Principios

1. **Proposito:** Solo animar si mejora la UX
2. **Sutileza:** Movimientos pequenos, no llamativos
3. **Performance:** 60fps minimo, GPU-accelerated
4. **Accesibilidad:** Respetar `prefers-reduced-motion`

### Duraciones

```css
--duration-fast: 150ms;    /* Hovers, toggles */
--duration-normal: 300ms;  /* Transiciones UI */
--duration-slow: 500ms;    /* Entradas de contenido */
--duration-slower: 800ms;  /* Animaciones complejas */
```

### Easings

```css
--ease-out: cubic-bezier(0.16, 1, 0.3, 1);      /* Entradas */
--ease-in-out: cubic-bezier(0.65, 0, 0.35, 1);  /* Loops */
--ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1); /* Bouncy (usar poco) */
```

### Parallax

```javascript
// Hero parallax suave
const parallaxSpeed = 0.3; // 30% de velocidad de scroll
const maxOffset = 100px;   // Limite de movimiento

// Reduced motion
@media (prefers-reduced-motion: reduce) {
  * {
    animation: none !important;
    transition: none !important;
  }
}
```

### Scroll Animations

```css
/* Fade up on scroll */
.animate-on-scroll {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.6s var(--ease-out),
              transform 0.6s var(--ease-out);
}

.animate-on-scroll.visible {
  opacity: 1;
  transform: translateY(0);
}
```

---

## 10. Iconografia

### Estilo

- **Tipo:** Linea (outline), stroke 1.5-2px
- **Esquinas:** Ligeramente redondeadas
- **Tamano base:** 24px para UI, 48px para features
- **Color:** Monocromatico (#000000 o #FFFFFF)

### Set de Iconos Requeridos

**Servicios:**
- Growth (grafica ascendente)
- Strategy (tablero/ajedrez)
- Content (documento)
- Ads (target)
- AI (cerebro/red neuronal)
- Analytics (grafico)

**UI:**
- Menu (hamburguesa 3 lineas)
- Close (X)
- Arrow right/left/down
- Check
- External link
- Email
- Phone
- Location
- Social: Instagram, LinkedIn, X

---

## 11. Do's and Don'ts

### DO

- Usar abundante espacio en blanco
- Mantener jerarquia visual clara
- Un solo CTA por seccion
- Fotografias de alta calidad
- Consistencia en todos los touchpoints
- Grid de 12 columnas
- Turquesa solo como micro-acento

### DON'T

- Fondos con patrones complejos
- Gradientes multicolor
- Stock photos genericas
- Multiples colores de acento
- Texto sobre imagenes sin overlay
- Animaciones excesivas
- Iconos 3D o con sombras
- Tipografias decorativas
- Mas de 2-3 niveles de gris

---

## 12. Checklist de Calidad

Antes de publicar cualquier asset:

- [ ] Paleta de colores correcta (sin dorados, sin azules extra)
- [ ] Turquesa usado solo como micro-acento (< 8%)
- [ ] Tipografia Inter/Satoshi, pesos correctos
- [ ] Espacio en blanco suficiente
- [ ] Jerarquia visual clara
- [ ] Contraste WCAG AA minimo
- [ ] Grid de 8pt respetado
- [ ] Un solo CTA prominente
- [ ] Fotografia consistente con guidelines
- [ ] Sin elementos que no justifiquen su existencia

---

*Simplicity Agency Visual Identity System v2.0*
*"Cada elemento debe justificar su existencia."*
*Diciembre 2024*
