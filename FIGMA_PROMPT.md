# PROMPT PARA FIGMA AI
## Hero Section — Portfolio de Christian Lamadrid

---

## INSTRUCCIONES DE USO

Copia el prompt completo de la sección "PROMPT PRINCIPAL" y pégalo en Figma AI.
Si Figma AI tiene límite de caracteres, usa los prompts divididos en la sección "PROMPTS ALTERNATIVOS".

---

# PROMPT PRINCIPAL (Completo)

```
Design a hero section for a Frontend Engineer portfolio website. This is a TECHNICAL portfolio, not a graphic designer portfolio. The design should communicate senior-level engineering credibility, not artistic creativity.

## CONTEXT
- Name: Christian Lamadrid
- Role: Frontend Engineer with Mechatronics Engineering background
- Experience: 5+ years, previously at Bancolombia (major fintech/bank)
- Specialty: Building interfaces for critical production systems (fintech, SaaS)
- Target audience: Tech Leads, CTOs, senior recruiters at SaaS/fintech companies

## DESIGN REQUIREMENTS

### Layout Structure (Desktop 1440px)
Create a full-viewport hero section with this hierarchy:

```
┌────────────────────────────────────────────────────────────────────┐
│ [Small logo/initials]                    [Nav: Work, About, Contact]│
│                                                                     │
│                                                                     │
│  CHRISTIAN LAMADRID                              ┌───────────────┐ │
│  (Large, serif font, left-aligned)               │               │ │
│                                                  │  Professional │ │
│  Frontend Engineer                               │  Photo        │ │
│  Fintech · Production Systems                    │  (B&W or      │ │
│  (Medium, sans-serif, muted color)               │   duotone)    │ │
│                                                  │  140x140px    │ │
│  ─────────────────────────────                   │  rounded-2xl  │ │
│                                                  └───────────────┘ │
│  5+ years building interfaces for systems                          │
│  that process real transactions.                                   │
│                                                                     │
│  Ex-Bancolombia · TypeScript strict mode · React + Next.js         │
│  (Small text, muted, with subtle separators)                       │
│                                                                     │
│                                                                     │
│  ┌─────────────────┐  ┌─────────────┐  ┌─────────────┐             │
│  │  View Work  →   │  │   GitHub ↗  │  │ LinkedIn ↗  │             │
│  │  (Primary CTA)  │  │ (Secondary) │  │ (Secondary) │             │
│  └─────────────────┘  └─────────────┘  └─────────────┘             │
│                                                                     │
│                                                                     │
│  ──────────────────── Tech Stack ────────────────────              │
│                                                                     │
│  [React] [Next.js] [TypeScript] [Node.js] [Tailwind]               │
│  (Small pills/badges, monospace font, subtle)                      │
│                                                                     │
└────────────────────────────────────────────────────────────────────┘
```

### Typography System
- Name/Display: Instrument Serif or Fraunces, weight 500-600, size 56-64px
- Title (role): Geist or Inter, weight 600, size 24px, slightly muted
- Body text: Geist or Inter, weight 400, size 16-18px
- Labels/credentials: Geist or Inter, weight 400, size 14px, muted color
- Tech stack: Geist Mono or JetBrains Mono, weight 400, size 13px

### Color Palette (Dark Theme)
- Background: #0A0A0A (near black)
- Primary text: #FAFAFA (off-white)
- Secondary text: #A1A1AA (muted gray)
- Accent: #3B82F6 (blue) or #10B981 (green) - use sparingly
- Borders/dividers: #27272A (subtle dark gray)
- Cards/elevated surfaces: #18181B with subtle border

### Visual Style
- Minimal, editorial aesthetic
- High contrast between name and other elements
- Generous whitespace (don't fill every space)
- Left-aligned content (following F-pattern reading)
- No gradients, no glassmorphism, no decorative elements
- Subtle texture or grain on background (optional, very subtle)
- Professional photo in B&W or duotone treatment

### Photo Placeholder
- Size: 140x140px
- Border radius: 16px (rounded-2xl)
- Treatment: Grayscale or duotone
- Subtle border: 1px solid rgba(255,255,255,0.1)
- Subtle shadow for depth

### CTA Buttons
- Primary "View Work": Solid background (#FAFAFA), dark text, rounded-xl, padding 16px 32px
- Secondary (GitHub, LinkedIn): Ghost style, border only, same border-radius
- All buttons same height, aligned horizontally with 12px gap

### Tech Stack Display
- Horizontal row of small pills/badges
- Background: rgba(255,255,255,0.05)
- Border: 1px solid rgba(255,255,255,0.1)
- Monospace font for tech feel
- Icons optional (small, 16px if used)

### DO NOT INCLUDE
- Decorative illustrations or abstract shapes
- Colorful gradients or mesh backgrounds
- Glassmorphism or blur effects
- Carousels or rotating content
- Multiple font colors (keep it simple: white + muted gray)
- Centered text (left-align everything except nav if needed)
- Generic developer illustrations
- Code snippets or terminal mockups in hero

### Mobile Version (375px)
- Stack layout vertically
- Name still prominent at top
- Photo moves below name or becomes smaller (80px)
- CTAs stack vertically or 2-column grid
- Tech stack wraps to 2 rows
- Maintain same typography hierarchy but smaller sizes

## EXACT COPY TO USE

Name: "CHRISTIAN LAMADRID"

Title line 1: "Frontend Engineer"
Title line 2: "Fintech · Production Systems"

Bio: "5+ years building interfaces for systems that process real transactions."

Credentials: "Ex-Bancolombia · TypeScript strict mode · React + Next.js"

Primary CTA: "View Work"
Secondary CTAs: "GitHub", "LinkedIn"

Tech stack items: "React", "Next.js", "TypeScript", "Node.js", "Tailwind"

## DELIVERABLES
1. Desktop hero section (1440x900px)
2. Mobile hero section (375x812px)
3. Component variants for buttons (default, hover states)
```

---

# PROMPTS ALTERNATIVOS (Por partes)

Si Figma AI tiene límite de caracteres, usa estos prompts en orden:

---

## PROMPT 1: Layout Base

```
Design a minimal hero section for a Frontend Engineer portfolio.

Dark theme (#0A0A0A background, #FAFAFA text).

Layout (left-aligned, desktop 1440px):
- Top: Small navigation (Work, About, Contact)
- Main: Large name "CHRISTIAN LAMADRID" in serif font (56px)
- Below name: "Frontend Engineer" + "Fintech · Production Systems" (24px, muted)
- Bio text: "5+ years building interfaces for systems that process real transactions."
- Credentials line: "Ex-Bancolombia · TypeScript strict mode · React + Next.js"
- 3 CTA buttons in a row: "View Work" (primary), "GitHub" (ghost), "LinkedIn" (ghost)
- Bottom: Tech stack pills (React, Next.js, TypeScript, Node.js, Tailwind)
- Right side: Professional photo placeholder (140px, rounded, B&W treatment)

Style: Editorial, minimal, high-contrast typography. No gradients, no decorations.
```

---

## PROMPT 2: Typography

```
Apply this typography system to the hero section:

- Name "CHRISTIAN LAMADRID": Instrument Serif or Fraunces, 56-64px, weight 500, color #FAFAFA
- Role "Frontend Engineer": Geist or Inter, 24px, weight 600, color #A1A1AA
- Subtitle "Fintech · Production Systems": Same font, 20px, weight 400, color #71717A
- Bio text: 18px, weight 400, color #D4D4D8, max-width 600px
- Credentials: 14px, weight 400, color #71717A, with dot separators
- Tech stack: Geist Mono, 13px, weight 400

Left-align all text. Generous line-height (1.4-1.6 for body).
```

---

## PROMPT 3: Buttons & Components

```
Design CTA buttons for the hero:

Primary button "View Work":
- Background: #FAFAFA
- Text: #0A0A0A, 14px, weight 600
- Padding: 16px 32px
- Border-radius: 12px
- Right arrow icon (→)

Secondary buttons "GitHub", "LinkedIn":
- Background: transparent
- Border: 1px solid #3F3F46
- Text: #FAFAFA, 14px, weight 500
- Padding: 16px 24px
- Border-radius: 12px
- External link icon (↗)

All buttons same height, 12px gap between them.

Tech stack pills:
- Background: rgba(255,255,255,0.05)
- Border: 1px solid rgba(255,255,255,0.1)
- Text: Geist Mono, 13px, #A1A1AA
- Padding: 8px 16px
- Border-radius: 8px
- Optional: Small icon (16px) before text
```

---

## PROMPT 4: Mobile Version

```
Create mobile version (375px width) of the hero:

Stack elements vertically:
1. Navigation (hamburger menu right, logo left)
2. Name "CHRISTIAN LAMADRID" (Instrument Serif, 36px)
3. Photo (80px circle, centered or right-aligned)
4. Role + subtitle (20px + 16px)
5. Bio text (16px, full width)
6. Credentials (14px, can wrap to 2 lines)
7. CTAs: Primary full-width, secondary buttons side by side below
8. Tech stack: 2 rows, pills wrap

Maintain dark theme and typography hierarchy.
Increase vertical spacing between sections.
```

---

## PROMPT 5: States & Interactions

```
Design hover/interaction states:

Primary button hover:
- Background: #E4E4E7 (slightly darker)
- Transform: translateY(-2px)
- Shadow: 0 8px 24px rgba(0,0,0,0.3)

Secondary button hover:
- Border: 1px solid #FAFAFA
- Background: rgba(255,255,255,0.05)

Photo hover:
- Transition from grayscale to full color
- Subtle scale (1.02)

Tech stack pills hover:
- Background: rgba(255,255,255,0.1)
- Text color: #FAFAFA (brighter)
```

---

# PROMPT EN ESPAÑOL (Alternativo)

```
Diseña una hero section para el portfolio de un Frontend Engineer.

CONTEXTO:
- Nombre: Christian Lamadrid
- Rol: Frontend Engineer con background en Ingeniería Mecatrónica
- Experiencia: 5+ años, anteriormente en Bancolombia (fintech/banco)
- Target: Tech Leads, CTOs, reclutadores de empresas SaaS/fintech

DISEÑO:
- Tema oscuro (#0A0A0A fondo, #FAFAFA texto)
- Layout alineado a la izquierda (patrón F de lectura)
- Tipografía: Serif para el nombre (Instrument Serif, 56px), Sans para el resto (Geist)
- Foto profesional a la derecha (140px, blanco y negro, bordes redondeados)
- Estilo: Editorial, minimalista, alto contraste tipográfico
- SIN gradientes, SIN glassmorphism, SIN elementos decorativos

CONTENIDO (usar exactamente):
- Nombre: "CHRISTIAN LAMADRID"
- Título: "Frontend Engineer" + "Fintech · Production Systems"
- Bio: "5+ años construyendo interfaces para sistemas que procesan transacciones reales."
- Credenciales: "Ex-Bancolombia · TypeScript strict mode · React + Next.js"
- CTAs: "Ver trabajo" (primario), "GitHub" (secundario), "LinkedIn" (secundario)
- Stack: React, Next.js, TypeScript, Node.js, Tailwind (pills pequeños, monospace)

ESTRUCTURA:
1. Navegación arriba (logo izquierda, links derecha)
2. Nombre grande + título debajo
3. Bio corta
4. Línea de credenciales
5. Botones CTA en fila
6. Stack técnico al final

Entregar: Desktop (1440px) y Mobile (375px)
```

---

# NOTAS ADICIONALES PARA EL DISEÑO

## Proporciones y Spacing

```
Desktop (1440px):
├── Padding horizontal: 80-120px
├── Padding vertical: 80px top, 60px bottom
├── Gap entre nombre y título: 16px
├── Gap entre título y bio: 32px
├── Gap entre bio y credentials: 16px
├── Gap entre credentials y CTAs: 40px
├── Gap entre CTAs y stack: 60px
└── Gap entre cada CTA button: 12px

Mobile (375px):
├── Padding horizontal: 24px
├── Padding vertical: 60px top, 40px bottom
├── Todos los gaps reducidos ~20-30%
└── CTAs: 12px gap vertical cuando apilados
```

## Colores Exactos (Design Tokens)

```
--color-bg: #0A0A0A
--color-surface: #18181B
--color-border: #27272A
--color-border-subtle: rgba(255,255,255,0.1)

--color-text-primary: #FAFAFA
--color-text-secondary: #A1A1AA
--color-text-muted: #71717A

--color-accent-blue: #3B82F6
--color-accent-green: #10B981

--radius-sm: 8px
--radius-md: 12px
--radius-lg: 16px
--radius-xl: 24px
```

## Fuentes a Usar

```
Display (nombre):
  - Primera opción: Instrument Serif (Google Fonts)
  - Alternativa: Fraunces (Google Fonts)
  - Fallback: Georgia, serif

Body (textos):
  - Primera opción: Geist (Vercel)
  - Alternativa: Inter (Google Fonts)
  - Fallback: system-ui, sans-serif

Mono (tech stack):
  - Primera opción: Geist Mono (Vercel)
  - Alternativa: JetBrains Mono (Google Fonts)
  - Fallback: monospace
```

---

## CHECKLIST POST-DISEÑO

Después de generar el diseño con Figma AI, verifica:

- [ ] El nombre es lo primero que se lee (más grande y prominente)
- [ ] El contenido está alineado a la izquierda (no centrado)
- [ ] Hay suficiente contraste entre elementos
- [ ] Los CTAs son claramente clickeables
- [ ] La foto no domina sobre el contenido
- [ ] No hay elementos decorativos innecesarios
- [ ] El diseño se ve profesional/técnico, no artístico
- [ ] La versión mobile mantiene la jerarquía
- [ ] Los colores son consistentes con los tokens
- [ ] La tipografía serif solo se usa para el nombre
