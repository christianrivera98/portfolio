# PLAN ESTRATÉGICO: HERO SECTION
## Portfolio de Christian Lamadrid — Frontend Engineer

**Fecha:** Febrero 2026
**Versión:** 1.0
**Estado:** Listo para Figma → Implementación

---

## RESUMEN EJECUTIVO

Este documento define la estrategia completa para la primera impresión (hero section) del portfolio. El objetivo es comunicar en menos de 10 segundos que Christian Lamadrid es un **Frontend Engineer con background de ingeniería, experiencia en fintech de producción, y capacidad para transformar sistemas complejos en interfaces claras**.

**Target:** Tech Leads, CTOs de startups, reclutadores de empresas SaaS/fintech, equipos de producto de alto nivel.

**Anti-target:** Clientes que buscan "páginas bonitas baratas", empresas sin cultura técnica.

---

# PARTE 1: ANÁLISIS CRÍTICO DEL ESTADO ACTUAL

## 1.1 VEREDICTO GENERAL

> **Tu código dice "Senior". Tu mensaje dice "Junior".**

La arquitectura técnica del proyecto (Atomic Design, GSAP + Framer Motion híbrido, WebGL Silk shader, TypeScript estricto, hooks custom bien abstraídos) comunica experiencia real y criterio técnico. Sin embargo, el copy, la jerarquía visual y las decisiones de contenido sabotean esa señal.

### Lo que un Tech Lead ve en 7 segundos:

| Elemento | Señal | Impacto |
|----------|-------|---------|
| Animaciones bien ejecutadas | Senior | Positivo |
| Estructura Atomic Design real | Senior | Positivo |
| Headline genérico sin diferenciador | Junior | **Negativo** |
| Carrusel "Kung Fu Panda" | Inmaduro | **Muy negativo** |
| Sin prueba social visible | Sin validar | **Negativo** |
| Sin métricas de impacto | Junior | **Negativo** |
| Nombre no visible | Anónimo | **Negativo** |

---

## 1.2 CLARIDAD DEL MENSAJE INICIAL

### Headline actual:
```
"Frontend Developer building scalable, product-focused web experiences."
```

### Problemas identificados:

| Problema | Por qué es crítico |
|----------|-------------------|
| **Commodity copy** | Cualquier bootcamp graduate puede escribir esto |
| **Sin nombre** | ¿Cómo te busco en LinkedIn? ¿Cómo te recuerdo? |
| **Buzzwords vacíos** | "Scalable" y "product-focused" son ruido sin evidencia |
| **Sin filtro de target** | Habla a todos, no conecta con nadie específico |
| **Sin hook de curiosidad** | No hay razón para seguir leyendo |

### Subheadline actual:
```
"I see the frontend as part of a larger system—creating user-centered
interfaces aligned with real business goals."
```

### Problemas identificados:

| Problema | Por qué es crítico |
|----------|-------------------|
| **Filosófico sin sustancia** | Suena aspiracional, no probado |
| **Sin prueba social** | ¿Dónde has aplicado esto? ¿En qué empresa? |
| **Sin diferenciador** | No menciona fintech, ingeniería, sistemas críticos |
| **Descripción de LinkedIn** | No es un statement de un ingeniero de producción |

---

## 1.3 JERARQUÍA VISUAL

### Layout actual:
```
┌─────────────────────────────────────┬─────────────────┐
│ Headline genérico (text-6xl)        │ Tech Stack      │
│ Subheadline filosófico              │ (4 folders)     │
├──────────────────────────┬──────────┴────────┬────────┤
│ Carrusel de Personalidad │ Focus: Product    │ 5+ yrs │
│ (160% width, videos)     ├───────────────────┴────────┤
│ - Mechatronics Engineer  │ [View projects]             │
│ - Hip-hop lover          │                             │
│ - Animal lover           │                             │
│ - Travel enthusiast      │                             │
│ - Kung Fu Panda fan      │                             │
└──────────────────────────┴────────────────────────────┘
```

### Análisis de desajustes:

| Elemento | Espacio Visual | Importancia Real | Problema |
|----------|----------------|------------------|----------|
| Headline genérico | XXL (text-6xl) | Baja (no diferencia) | Sobrevalorado |
| "5+ years" | S (card pequeña) | Alta (credibilidad) | Subvalorado |
| Carrusel personal | XL (160% width) | Nula (distrae) | Sobrevalorado |
| Nombre | **Inexistente** | Crítica | Faltante |
| Bancolombia/Fintech | **Inexistente** | Alta | Faltante |
| Métricas/Impacto | **Inexistente** | Alta | Faltante |

---

## 1.4 SEÑALES DE SENIORITY VS JUNIOR

### Señales que COMUNICAN Junior (visibles en superficie):

| Elemento | Por qué daña |
|----------|-------------|
| "Kung Fu Panda is my favorite movie" | Infantiliza el perfil profesional. Un Tech Lead lee esto y cierra la pestaña. |
| "I love animals" / "I love traveling" | Relleno de CV universitario. No aporta a decisión de contratación. |
| "I'm a hip-hop lover" | Irrelevante. No filtra ni diferencia. |
| Headline sin métricas | Juniors hablan de skills. Seniors hablan de impacto. |
| Sin empresa reconocible | Seniors muestran credenciales rápido. |
| "Focus: Product & UX" (vago) | ¿Qué productos? ¿Qué resultados? |

### Señales que COMUNICAN Senior (enterradas en código):

| Elemento | Por qué es señal de Senior |
|----------|---------------------------|
| Atomic Design implementado | No solo carpetas, sino separación real atoms/molecules/organisms |
| GSAP + Framer Motion híbrido | Sabe cuándo usar cada herramienta según el caso |
| WebGL shader custom parametrizado | No es copy-paste, hay decisiones técnicas |
| TypeScript estricto | Ve el valor del type safety en producción |
| Hooks custom bien abstraídos | `useHeroIntroAnimation`, `useHeroHumanRotator` — lógica separada de UI |
| Config files separados de componentes | Patrón de producción: datos vs presentación |

### El problema central:
> Las señales de Junior están en la **superficie** (visibles en 3 segundos).
> Las señales de Senior están **enterradas en el código** (solo visibles clonando el repo).

---

## 1.5 QUÉ COMUNICA IMPLÍCITAMENTE

### Lo que un reclutador senior piensa al ver el hero actual:

> "Este developer tiene buen gusto visual pero no sabe venderse. El carrusel de hobbies es inmaduro. No menciona dónde trabajó. No hay números. Probablemente tiene talento pero no ha trabajado en equipos serios o no sabe articular su valor. **Next.**"

### Lo que DEBERÍA pensar:

> "Este developer ha tocado producción en fintech. Tiene background de ingeniería que le da perspectiva diferente. Entiende que el frontend impacta negocio. **Vale la pena agendar una llamada.**"

---

## 1.6 QUÉ SOBRA O DISTRAE

### ELIMINAR INMEDIATAMENTE:

| Elemento | Razón para eliminar |
|----------|---------------------|
| "I'm a hip-hop lover" | No aporta a decisión de contratación |
| "I love animals" | Ruido emocional sin diferenciación |
| "I love traveling" | Cliché universal, dice nada |
| "Kung Fu Panda is my favorite movie" | **Destruye credibilidad profesional** |
| Carrusel de videos de personalidad | El formato completo es problema — no muestra trabajo |

### MANTENER Y AMPLIFICAR:

| Elemento | Razón para mantener |
|----------|---------------------|
| "I'm a Mechatronics Engineer" | Diferenciador real — background de ingeniería |
| "5+ years" | Credibilidad — pero debe ser prominente |
| Tech Stack visual (folders) | Muestra competencia — agregar contexto de uso real |
| Animaciones staggered | Demuestra craft — sin distraer del mensaje |
| Fondo WebGL Silk | Distintivo — mantener sutil |

---

## 1.7 QUÉ FALTA PARA GENERAR CONFIANZA EN <10 SEGUNDOS

| Faltante | Por qué es crítico | Cómo agregarlo |
|----------|-------------------|----------------|
| **Tu nombre** | Identidad, búsqueda, recall | Headline principal |
| **Bancolombia** | Prueba social instantánea — fintech + banco grande | Badge o mención en bio |
| **"Fintech" o "Banking"** | Keyword que filtra y atrae al target | Parte del título |
| **Una métrica** | Impacto medible, no declaraciones | "Sistemas con X usuarios" |
| **Ubicación/Timezone** | Remote-first necesita saber overlap | Sutil en metadata |
| **GitHub + LinkedIn** | Validación social inmediata | CTAs visibles |
| **Un proyecto destacado** | Genera curiosidad específica | Nombre real, no "View projects" |

---

# PARTE 2: PLAN PARA LA NUEVA PRIMERA IMPRESIÓN

## 2.1 CONCEPTO DEL HERO

### Concepto central:
> **"Ingeniero que construye interfaces para sistemas críticos"**

### Qué comunica:
- No eres un "frontend developer" genérico que hace landing pages
- Tienes background de ingeniería (Mecatrónica) — piensas en sistemas
- Has trabajado en producción donde los errores cuestan dinero (fintech)
- Entiendes arquitectura, no solo pixeles
- Tu frontend es parte de un sistema más grande

### A quién ATRAE:
- Tech Leads de empresas SaaS que buscan seniors
- CTOs de fintech que necesitan gente que entienda el dominio
- Equipos de producto que valoran pensamiento sistémico
- Reclutadores técnicos que reconocen señales de seniority

### A quién REPELE (intencionalmente):
- Empresas que buscan "maquetadores" que implementen diseños sin cuestionar
- Clientes que quieren "páginas bonitas baratas"
- Startups sin cultura técnica que no valorarían tu background
- Ofertas de "junior con años de experiencia"

### Posicionamiento claro:
```
NO ERES: "Un frontend developer más que sabe React"
ERES: "El ingeniero que traduce sistemas complejos en interfaces que funcionan en producción"
```

---

## 2.2 HEADLINE ORIENTADO A IMPACTO

### Requisitos del headline:
1. Nombre visible (identidad + búsqueda)
2. Diferenciador claro (ingeniería → frontend)
3. Señal de dominio (fintech, sistemas)
4. Sin buzzwords vacíos
5. Genera curiosidad para seguir leyendo

### Opción A — Técnico + Dominio:
```
Christian Lamadrid
Frontend Engineer — Fintech & Production Systems
```

### Opción B — Transición + Contexto:
```
Christian Lamadrid
De Ingeniería Mecatrónica a Frontend
Interfaces para sistemas que no pueden fallar.
```

### Opción C — Impacto + Prueba:
```
Christian Lamadrid
Frontend Engineer
Ex-Bancolombia. TypeScript estricto. Sistemas críticos.
```

### Opción D — Minimalista + Potente:
```
Christian Lamadrid
Frontend para fintech.
```

### Recomendación: Opción B o C
- Opción B para mercado internacional (historia de transición)
- Opción C para mercado LATAM (Bancolombia es reconocido)

---

## 2.3 SUBHEADLINE QUE CONECTA

### Estructura:
```
[Experiencia cuantificada] + [Stack concreto] + [Prueba social] + [Enfoque diferenciador]
```

### Propuesta:
```
5+ años transformando arquitecturas complejas en interfaces claras.
React, Next.js, TypeScript en modo estricto.
Background en ingeniería. Experiencia en fintech de producción.
```

### Versión compacta (para mobile):
```
5+ años · React/Next.js/TypeScript · Ex-Bancolombia
Interfaces para sistemas de escala.
```

### Por qué funciona:
- **Números reales** (5+ años) — no es recién egresado
- **Stack específico** (no "modern technologies")
- **Prueba social** (Bancolombia = fintech serio)
- **Diferenciador** (background ingeniería)
- **Enfoque** (sistemas, escala, no solo UI)

---

## 2.4 JERARQUÍA VISUAL PARA LECTURA RÁPIDA

### Nuevo layout propuesto:

```
┌─────────────────────────────────────────────────────────────────┐
│  [Logo]                                    [Nav]  [Theme] [Menu]│
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│                                                                 │
│  CHRISTIAN LAMADRID                              ┌────────────┐ │
│  ═══════════════════                             │            │ │
│                                                  │   Foto     │ │
│  Frontend Engineer                               │   B&W o    │ │
│  Fintech · Production Systems                    │  Duotone   │ │
│                                                  │            │ │
│  ────────────────────────────────                └────────────┘ │
│                                                                 │
│  5+ años construyendo interfaces para sistemas                  │
│  que procesan transacciones reales.                             │
│                                                                 │
│  Ex-Bancolombia · TypeScript estricto · React + Next.js         │
│                                                                 │
│                                                                 │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │ Ver trabajo  │  │   GitHub     │  │  LinkedIn    │          │
│  │      →       │  │      ↗       │  │      ↗       │          │
│  └──────────────┘  └──────────────┘  └──────────────┘          │
│                                                                 │
│                                                                 │
│  ─────────────────── Stack ───────────────────                  │
│                                                                 │
│  [React]  [Next.js]  [TypeScript]  [Node]  [Tailwind]          │
│                                                                 │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Principios de jerarquía aplicados:

| Zona | Contenido | Justificación |
|------|-----------|---------------|
| **Top-left** | Nombre grande | Nielsen Norman Group: 69% más atención en lado izquierdo |
| **Primeras 2 líneas** | Título + Keywords | F-pattern: primeras líneas = máxima atención |
| **Right (opcional)** | Foto profesional | Humaniza, genera confianza, conecta con LinkedIn |
| **Centro** | Bio con prueba social | Scanning después del hook inicial |
| **CTAs** | Izquierda, prominentes | Thumb zone en mobile, F-pattern en desktop |
| **Bottom** | Tech stack | Validación técnica después de establecer credibilidad |

### Zonas de atención (eye-tracking):

```
┌─────────────────────────────────────────────────────────────────┐
│  ████████████████████████░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░│ ← Barra 1: Máxima
│  ████████████████████░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░│ ← Barra 2: Alta
│  ████████████████░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░│ ← Barra 3: Media
│  ████████░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░│ ← Scanning
│  ████░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░│
└─────────────────────────────────────────────────────────────────┘
  ↑ Left-side bias: contenido crítico debe estar aquí
```

### Orden de lectura optimizado:
1. **Nombre** (identidad) — 0-1 segundos
2. **Título + dominio** (qué hace) — 1-2 segundos
3. **Bio corta** (credenciales) — 2-4 segundos
4. **CTAs** (si hay interés) — 4-5 segundos
5. **Stack** (validación técnica) — 5-7 segundos

---

## 2.5 TIPOGRAFÍA

### Sistema tipográfico propuesto:

| Rol | Familia | Peso | Tamaño | Tracking | Razón |
|-----|---------|------|--------|----------|-------|
| **Nombre** | Instrument Serif o Fraunces | 500-600 | 48-64px | -0.02em | Distintivo, editorial, profesional |
| **Título** | Geist Sans (actual) | 600 | 20-28px | -0.01em | Técnico, limpio, moderno |
| **Bio/Body** | Geist Sans | 400 | 16-18px | 0 | Legibilidad óptima |
| **Labels** | Geist Mono | 400 | 12-14px | 0.02em | Señal técnica sutil |
| **CTAs** | Geist Sans | 500-600 | 14-16px | 0.01em | Claridad en acciones |
| **Stack items** | Geist Mono | 400 | 13px | 0.02em | Código-like, técnico |

### Por qué este sistema:

1. **Contraste serif/sans para nombre**
   - El nombre en serif crea jerarquía inmediata
   - Rompe la monotonía sin ser "diseño de diseñador"
   - Señala intencionalidad tipográfica

2. **Geist para cuerpo (mantener actual)**
   - Ya está en el proyecto
   - Es técnico sin ser frío
   - Funciona bien en pantalla

3. **Geist Mono para detalles técnicos**
   - Refuerza perfil de ingeniero/developer
   - Stack y labels se sienten "de código"
   - Consistencia con terminal/editor aesthetic

4. **Pesos extremos (400 vs 600)**
   - Crea separación visual clara
   - No usa 500 en exceso (error común)
   - Jerarquía por peso, no solo por tamaño

### Escala tipográfica (clamp responsive):

```css
:root {
  /* Display */
  --text-hero-name: clamp(2.5rem, 5vw + 1rem, 4rem);      /* 40-64px */
  --text-hero-title: clamp(1.25rem, 2vw + 0.5rem, 1.75rem); /* 20-28px */

  /* Body */
  --text-body: clamp(1rem, 1vw + 0.5rem, 1.125rem);        /* 16-18px */
  --text-body-small: clamp(0.875rem, 0.9vw + 0.4rem, 1rem); /* 14-16px */

  /* Labels */
  --text-label: 0.75rem;                                    /* 12px fixed */
  --text-mono: 0.8125rem;                                   /* 13px fixed */
}
```

### Alternativas a Instrument Serif:

| Opción | Características | Disponibilidad |
|--------|----------------|----------------|
| **Instrument Serif** | Elegante, editorial | Google Fonts |
| **Fraunces** | Old-style, distintivo | Google Fonts |
| **Newsreader** | Periodístico, serio | Google Fonts |
| **Lora** | Clásico, legible | Google Fonts |
| **Source Serif 4** | Técnico, Adobe heritage | Google Fonts |

---

## 2.6 USO DE IMAGEN PERSONAL

### Análisis de opciones:

| Factor | Sin foto | Con foto profesional |
|--------|----------|---------------------|
| **Humanización** | Frío, anónimo | Conexión inmediata |
| **Credibilidad** | "¿Quién es esta persona?" | Persona real, verificable |
| **LinkedIn match** | No reconocible | Consistencia de marca personal |
| **Riesgo** | Ninguno | Si es mala foto, daña |
| **Formalidad** | Más "agencia" | Más "persona" |

### Recomendación: SÍ USAR FOTO

Pero con condiciones estrictas:

### Requisitos de la foto:

| Requisito | Por qué |
|-----------|---------|
| **Profesional** | No selfie, no casual extremo, no foto de fiesta |
| **Fondo neutro** | Sin distracciones, puede ser ligeramente tech |
| **Mirada a cámara o 3/4** | Genera confianza y conexión |
| **Iluminación buena** | Señal de que inviertes en tu imagen profesional |
| **Ropa neutra** | Camisa o similar, no traje (muy formal), no camiseta (muy casual) |

### Tratamiento visual recomendado:

| Opción | Efecto | Cuándo usar |
|--------|--------|-------------|
| **Blanco y negro** | Elegante, editorial, atemporal | Preferido |
| **Duotone** | Distintivo, memorable | Si tienes color de marca |
| **Color desaturado** | Natural pero controlado | Si B&W no funciona |
| **Full color** | Más personal | Solo si es foto excelente |

### Especificaciones técnicas:

```
Tamaño: 120-160px (desktop), 80-100px (mobile)
Forma: rounded-2xl o rounded-full
Border: 2px border-white/10 o border-accent/20
Shadow: shadow-2xl para profundidad
Hover: grayscale-0 si está en grayscale (reveal de color)
```

### Si NO hay foto buena disponible:

| Alternativa | Implementación |
|-------------|----------------|
| Iniciales estilizadas | "CL" en gradiente distintivo con fondo oscuro |
| Avatar abstracto | Forma geométrica que se vuelva reconocible |
| Nada | Ajustar layout para que no se sienta vacío |

---

## 2.7 MICRO-INTERACCIONES Y ANIMACIONES

### Filosofía de animación:
> **"Animaciones que demuestran craft técnico, no que distraen del mensaje"**

### Lo que está bien en el código actual:
- Staggered reveal con timing escalonado
- GSAP para transiciones complejas
- Durations razonables (~700ms)
- Easing correcto (ease-out para entradas)

### Lo que necesita ajuste:

| Actual | Problema | Solución |
|--------|----------|----------|
| Carrusel de videos rotando cada 3s | Distrae constantemente de la lectura | Eliminar |
| Silk background siempre activo | Puede causar motion sickness | Agregar `prefers-reduced-motion` |
| Folders con hover 3D | Interacción sin propósito claro en hero | Simplificar o mover a sección Stack |

### Nueva secuencia de animación:

```
Timeline de entrada (onMount):

0ms    ─────┐
             │ Fade in background (Silk)
200ms  ─────┘

200ms  ─────┐
             │ Nombre: fade + slide-up (translateY: 20px → 0)
500ms  ─────┘

400ms  ─────┐
             │ Título + keywords: fade + slide-up
650ms  ─────┘

600ms  ─────┐
             │ Bio text: fade in (solo opacity)
900ms  ─────┘

800ms  ─────┐
             │ Foto (si existe): scale 0.95 → 1 + opacity
1100ms ─────┘

1000ms ─────┐
             │ CTAs: stagger slide-up (100ms entre cada uno)
1400ms ─────┘

1400ms ─────┐
             │ Tech stack: fade in + slight slide-up
1800ms ─────┘
```

### Especificaciones de animación:

| Elemento | Tipo | Duration | Easing | Delay |
|----------|------|----------|--------|-------|
| Background | opacity | 200ms | ease-out | 0ms |
| Nombre | translateY + opacity | 300ms | ease-out | 200ms |
| Título | translateY + opacity | 250ms | ease-out | 400ms |
| Bio | opacity | 300ms | ease-out | 600ms |
| Foto | scale + opacity | 300ms | ease-out | 800ms |
| CTAs | translateY + opacity | 200ms/each | ease-out | 1000ms + stagger 100ms |
| Stack | translateY + opacity | 400ms | ease-out | 1400ms |

### Micro-interacciones (hover/focus):

```css
/* CTAs */
.cta-button {
  transition: transform 150ms ease-out,
              box-shadow 150ms ease-out,
              background-color 150ms ease-out;
}
.cta-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0,0,0,0.15);
}
.cta-button:active {
  transform: translateY(0) scale(0.98);
}

/* Tech stack items */
.tech-item {
  transition: transform 200ms ease-out, opacity 200ms ease-out;
  opacity: 0.7;
}
.tech-item:hover {
  transform: scale(1.05);
  opacity: 1;
}

/* Foto */
.hero-photo {
  transition: filter 400ms ease-out, transform 400ms ease-out;
  filter: grayscale(100%);
}
.hero-photo:hover {
  filter: grayscale(0%);
  transform: scale(1.02);
}
```

### Accesibilidad obligatoria:

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

---

## 2.8 SEÑALES TÉCNICAS SIN LISTAR TECNOLOGÍAS

El hero debe comunicar seniority **sin convertirse en una lista de logos**. Las señales técnicas deben ser implícitas y percibidas, no explícitas y listadas.

### Señales a comunicar:

| Señal | Cómo percibirla sin listarla |
|-------|------------------------------|
| **Pensamiento sistémico** | El copy habla de "sistemas", "arquitectura", "producción" — no de "hacer páginas bonitas" |
| **Experiencia en producción real** | Mencionar empresa real (Bancolombia), dominio real (fintech), no proyectos de curso |
| **Type safety / calidad de código** | "TypeScript estricto" — no "TypeScript" solo. El "estricto" señala que entiende por qué importa |
| **Entendimiento de negocio** | Hablar de "transacciones", "sistemas críticos", "interfaces que impactan negocio" |
| **Background de ingeniería** | Mencionar Mecatrónica/IoT — señala que piensa en sistemas, no solo en UI |
| **DevOps awareness** | No listar Docker/CI/CD, pero mencionarlo en contexto de proyectos que "están en producción" |
| **Criterio técnico** | La ejecución del propio portfolio: animaciones fluidas pero no excesivas, código limpio visible en GitHub |

### Cómo el copy refleja estas señales:

**Junior dice:**
> "Uso React, Next.js, TypeScript, Tailwind, Node.js, Docker, AWS..."

**Senior dice:**
> "Construyo interfaces para sistemas que procesan transacciones reales."

La diferencia:
- Junior **lista herramientas** (input)
- Senior **describe resultados** (output)

### Señales en la ejecución del portfolio mismo:

| Elemento del portfolio | Qué señala |
|-----------------------|------------|
| Animaciones con timing correcto | Entiende UX, no solo implementación |
| `prefers-reduced-motion` respetado | Accesibilidad no es afterthought |
| Performance buena (no laggy) | Optimización real, no solo features |
| Código público en GitHub limpio | Puede trabajar en equipo, código legible |
| Mobile bien ejecutado | Responsive real, no solo "funciona" |
| Dark mode coherente | Sistema de diseño, no hacks |

### El stack se muestra al final, no al principio:

```
Orden de información:
1. Quién eres (nombre)
2. Qué haces (título + dominio)
3. Por qué creerte (credenciales)
4. Qué hacer (CTAs)
5. Cómo lo haces (stack) ← Último, como validación
```

El stack al final es **confirmación**, no **argumento de venta**.

---

## 2.9 ERRORES COMUNES A EVITAR

### Errores que comunican "frontend superficial":

| Error | Por qué daña | Alternativa |
|-------|-------------|-------------|
| **Listar 20+ tecnologías** | Parece inseguro, necesita compensar | Mostrar 5-6 core, mencionar resto en contexto |
| **"Passionate developer"** | Cliché vacío, todo el mundo lo dice | Mostrar pasión con trabajo, no con palabras |
| **"Clean code lover"** | Declaración sin evidencia | GitHub público con código limpio real |
| **"Pixel perfect"** | Término de 2010, suena junior | "Atención al detalle" en contexto de sistema |
| **Portfolio solo con proyectos de curso** | Sin validación de producción real | Un proyecto real > 10 proyectos de Udemy |
| **Diseño más importante que contenido** | Diseñador gráfico, no developer | Diseño al servicio del mensaje |
| **Sin GitHub visible** | ¿Dónde está tu código? | Link prominente en hero |
| **Sin LinkedIn** | No se puede verificar historia | Link visible para validación social |
| **Headline genérico** | Commodity, no diferencia | Específico: dominio + diferenciador |
| **Hobbies irrelevantes** | Parece CV de universidad | Solo lo que aporta a decisión |
| **Animaciones excesivas** | Distrae del mensaje | Sutiles, con propósito |
| **Música/video autoplay** | UX hostil, señal de mal criterio | Nunca, jamás |
| **Efectos 3D innecesarios** | Muestra skills, no resuelve problema | Solo si aporta al mensaje |
| **Testimonials falsos o genéricos** | Se detectan, erosionan confianza | Solo reales o ninguno |
| **"Available for hire" como headline** | Desesperado, sin valor primero | Mostrar valor, CTA al final |

### Errores de copy:

| Frase a evitar | Por qué | Alternativa |
|----------------|---------|-------------|
| "I create beautiful websites" | Subjetivo, commodity | "Interfaces para sistemas X" |
| "Full-stack developer" (si no lo es) | Mentira detectable | "Frontend con contexto de backend" |
| "Self-taught" (como badge) | Señal de inseguridad | No mencionarlo, mostrar trabajo |
| "Always learning" | Obvio, no diferencia | Mostrar qué aprendiste aplicándolo |
| "Team player" | CV-speak vacío | Mostrar colaboración en proyectos |
| "Problem solver" | Todo developer debería serlo | Describir un problema resuelto |
| "Detail-oriented" | Declaración sin prueba | Ejecutar portfolio con atención al detalle |

### Errores de diseño en portfolio técnico:

| Error | Por qué es problema |
|-------|---------------------|
| **Demasiado color** | Distrae, parece diseñador no developer |
| **Gradientes en todo** | "AI slop" aesthetic, 2023 cliché |
| **Glassmorphism excesivo** | Reduce legibilidad, trendy pero malo para UX |
| **Tipografía decorativa para body** | Dificulta lectura, parece diseñador |
| **Spacing inconsistente** | Señala falta de sistema, caos |
| **Animaciones lentas (>500ms para UI)** | Frustra al usuario, parece lento |
| **Parallax sin propósito** | Motion sickness, distracción |
| **Scroll hijacking** | UX hostil, señala mal criterio |
| **Cursor custom innecesario** | Distrae, a veces rompe usabilidad |
| **Preloader largo** | Señala que el sitio es pesado |

---

## 2.10 CONEXIÓN CON EL RESTO DEL PORTFOLIO

El hero no existe aislado. Debe establecer expectativas que el resto del portfolio cumple.

### Principio de coherencia:
> **Lo que prometes en el hero, lo demuestras en el portfolio.**

### Mapa de conexiones:

```
HERO
  │
  ├──→ "Ex-Bancolombia" ──→ EXPERIENCIA
  │         └──→ Debe haber sección detallando rol en Bancolombia
  │              - Qué construiste
  │              - Con qué stack
  │              - Qué impacto tuvo
  │
  ├──→ "Sistemas críticos" ──→ PROYECTOS
  │         └──→ Al menos 1 proyecto debe mostrar:
  │              - Sistema real (no landing page)
  │              - Complejidad técnica visible
  │              - Problema → Solución → Resultado
  │
  ├──→ "TypeScript estricto" ──→ GITHUB / CÓDIGO
  │         └──→ Repos públicos deben mostrar:
  │              - TypeScript real, no any everywhere
  │              - Tipos bien definidos
  │              - Código legible
  │
  ├──→ "React + Next.js" ──→ STACK SECTION
  │         └──→ No solo listar, sino:
  │              - Cuándo usas cada uno
  │              - Qué decides y por qué
  │              - Proyectos que lo demuestran
  │
  ├──→ "Background ingeniería" ──→ ABOUT
  │         └──→ Expandir la historia:
  │              - Por qué mecatrónica → frontend
  │              - Qué perspectiva única aporta
  │              - Cómo piensas diferente
  │
  └──→ [CTAs] ──→ NAVEGACIÓN CLARA
            └──→ Cada CTA lleva a sección que:
                 - Cumple la promesa implícita
                 - Profundiza lo que el hero introdujo
                 - Tiene su propia claridad de mensaje
```

### Estructura sugerida del portfolio completo:

```
1. HERO (primera impresión)
   └─ Establece: quién, qué, por qué creerte

2. PROYECTOS DESTACADOS (prueba inmediata)
   └─ 2-3 proyectos reales con:
      - Problema resuelto
      - Stack usado
      - Resultado/impacto
      - Link a demo/código

3. EXPERIENCIA (credenciales)
   └─ Timeline o cards con:
      - Empresas reales
      - Rol específico
      - Achievements concretos

4. STACK / SKILLS (validación técnica)
   └─ Organizado por categoría:
      - Frontend core
      - Backend/APIs
      - Herramientas
      - Metodologías
   └─ Con contexto de uso, no solo logos

5. ABOUT (humanización controlada)
   └─ La historia de transición
   └─ Perspectiva única
   └─ Intereses profesionales (no Kung Fu Panda)

6. CONTACTO (conversión)
   └─ CTA claro
   └─ Múltiples canales
   └─ Disponibilidad/timezone
```

### Coherencia visual:
- Mismo sistema tipográfico en todo el portfolio
- Paleta de colores consistente
- Spacing usando el mismo scale
- Animaciones con mismo easing y duraciones similares
- Componentes reutilizados (cards, buttons, labels)

### Coherencia de mensaje:
- Si el hero dice "sistemas críticos", los proyectos deben mostrarlo
- Si el hero dice "5+ años", la experiencia debe sumar eso
- Si el hero dice "TypeScript estricto", el GitHub debe probarlo
- No hay contradicciones entre secciones

---

# PARTE 3: RESUMEN ACCIONABLE

## Prioridad de implementación:

### FASE 1: Críticos (Hacer primero)

| # | Cambio | Impacto | Esfuerzo |
|---|--------|---------|----------|
| 1 | Reescribir headline con nombre + diferenciador | Alto | Bajo |
| 2 | Eliminar carrusel de personalidad completo | Alto | Bajo |
| 3 | Agregar "Bancolombia" o "Fintech" visible | Alto | Bajo |
| 4 | Agregar CTAs a GitHub + LinkedIn | Alto | Bajo |

### FASE 2: Importantes (Hacer después)

| # | Cambio | Impacto | Esfuerzo |
|---|--------|---------|----------|
| 5 | Reestructurar layout según nueva jerarquía | Alto | Medio |
| 6 | Implementar nuevo sistema tipográfico | Medio | Medio |
| 7 | Agregar foto profesional tratada | Medio | Bajo-Medio |
| 8 | Simplificar animaciones, agregar a11y | Medio | Bajo |

### FASE 3: Refinamiento (Después de las anteriores)

| # | Cambio | Impacto | Esfuerzo |
|---|--------|---------|----------|
| 9 | Optimizar mobile layout | Medio | Medio |
| 10 | Ajustar stack section (mover folders o simplificar) | Bajo | Bajo |
| 11 | Agregar métricas si las tienes | Medio | Bajo |
| 12 | Testing de performance y accesibilidad | Medio | Medio |

---

## Checklist antes de implementar:

### Copy
- [ ] ¿El nombre es visible en los primeros 2 segundos?
- [ ] ¿Hay un diferenciador claro (ingeniería, fintech)?
- [ ] ¿Hay prueba social (empresa, años)?
- [ ] ¿El copy evita todos los clichés listados?
- [ ] ¿Se puede entender qué haces en 10 segundos?

### Diseño
- [ ] ¿La jerarquía guía la lectura correctamente?
- [ ] ¿Los CTAs son visibles y claros?
- [ ] ¿La tipografía es legible en todos los tamaños?
- [ ] ¿Hay suficiente contraste?
- [ ] ¿El diseño funciona en mobile?

### Técnico
- [ ] ¿Las animaciones tienen `prefers-reduced-motion`?
- [ ] ¿El performance es bueno (no laggy)?
- [ ] ¿Los links externos abren en nueva pestaña?
- [ ] ¿GitHub y LinkedIn son correctos?
- [ ] ¿La foto carga rápido (optimizada)?

### Mensaje
- [ ] ¿Atrae al target correcto?
- [ ] ¿Repele al target incorrecto?
- [ ] ¿Conecta con las secciones siguientes?
- [ ] ¿Las promesas se cumplen en el portfolio?

---

## Notas finales

Este plan está diseñado para:
1. **Figma**: Usar las especificaciones de layout, tipografía y spacing para diseñar
2. **Implementación**: Seguir la estructura de componentes y animaciones descritas
3. **Iteración**: Usar el checklist para validar antes de deploy

El objetivo final es que un Tech Lead o reclutador senior vea el hero y piense:

> "Este developer sabe lo que hace. Ha tocado producción real. Tiene un background diferente que le da perspectiva. Vale la pena hablar con él."

---

**Documento creado:** Febrero 2026
**Próximo paso:** Llevar a Figma para diseño visual, luego implementar en React/Next.js
