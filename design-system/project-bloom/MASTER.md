# Design System Master File

> **LOGIC:** When building a specific page, first check `design-system/pages/[page-name].md`.
> If that file exists, its rules **override** this Master file.
> If not, strictly follow the rules below.

---

**Project:** Project Bloom (百花計畫)
**Generated:** 2026-03-31
**Parent Brand:** 台灣超讚指南 (hypercerts.guide)
**Category:** Nonprofit Initiative Landing Page

---

## Global Rules

### Color Palette (inherited from 超讚指南)

| Role | Hex | CSS Variable |
|------|-----|--------------|
| Accent | `#2D7D6B` | `--accent` |
| Accent Dark | `#246B5B` | `--accent-dark` |
| Warm | `#C4956A` | `--warm` |
| Background | `#F7F3EE` | `--bg` |
| Surface | `#FFFFFF` | `--surface` |
| Text Primary | `#1C1917` | `--text` |
| Text Secondary | `#6B7164` | `--text-secondary` |
| Text Muted | `#A39E95` | `--text-muted` |
| Border | `#D6CFC5` | `--border` |

**Color Notes:** Teal accent conveys growth/stability. Cream background creates warmth. Warm tan as secondary accent for highlights. All pairs meet WCAG AA 4.5:1 contrast.

### Typography

- **Heading Font:** Noto Serif TC (weight 600, 700)
- **Body Font:** Inter (weight 400, 500, 600)
- **Mood:** warm, trustworthy, grounded, readable, humanist
- **Google Fonts:** [Noto Serif TC + Inter](https://fonts.google.com/share?selection.family=Inter:wght@400;500;600&family=Noto+Serif+TC:wght@600;700)

**CSS Import:**
```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Noto+Serif+TC:wght@600;700&display=swap');
```

**Type Scale:**

| Level | Size | Weight | Font |
|-------|------|--------|------|
| H1 | clamp(28px, 5vw, 40px) | 700 | Noto Serif TC |
| H2 | 22px | 700 | Noto Serif TC |
| H3 | 16px | 600 | Inter |
| Body | 15px | 400 | Inter |
| Small | 13px | 400 | Inter |
| Eyebrow | 12px | 500 | Inter, tracking 0.06em |

### Spacing Variables

| Token | Value | Usage |
|-------|-------|-------|
| `--space-xs` | `4px` | Tight gaps |
| `--space-sm` | `8px` | Icon gaps, inline spacing |
| `--space-md` | `16px` | Standard padding |
| `--space-lg` | `24px` | Card padding, section gaps |
| `--space-xl` | `40px` | Section padding |
| `--space-2xl` | `56px` | Major section breaks |
| `--space-3xl` | `80px` | Hero padding |

### Shadow & Effects

| Level | Value | Usage |
|-------|-------|-------|
| `--shadow-sm` | `0 1px 3px rgba(28,25,23,0.06)` | Subtle lift |
| `--shadow-md` | `0 4px 12px rgba(28,25,23,0.08)` | Cards |
| `--radius-sm` | `6px` | Buttons, inputs |
| `--radius-md` | `10px` | Cards |
| `--radius-lg` | `16px` | Feature sections |

---

## Style Guidelines

**Style:** Nature Distilled (adapted)

**Keywords:** Muted earthy, warm, organic, handmade warmth, trustworthy, grounded, human, approachable

**Best For:** Nonprofit, community, social impact, sustainability, wellness

**Key Effects:**
- Natural easing (ease-out) for transitions, 200-300ms
- Soft shadows only, no hard elevation
- Subtle border separation over shadow separation
- Generous whitespace — content breathes
- No grain/texture overlays (keep it clean)

### Page Pattern

**Pattern:** Hero + Problem + Solution + Social Proof + CTA

- **Section Order:** Hero → Why → What You Get → How → FAQ → CTA
- **CTA Placement:** Hero (secondary) + Bottom (primary)
- **Conversion Strategy:** Lead with empathy (problem), show tangible deliverable, build trust with FAQ, simple action

---

## Component Specs

### Buttons

```css
.btn-primary {
  background: var(--accent);
  color: white;
  padding: 14px 32px;
  border-radius: var(--radius-sm);
  font-size: 15px;
  font-weight: 600;
  transition: background 200ms ease-out;
  cursor: pointer;
}
.btn-primary:hover { background: var(--accent-dark); }
.btn-primary:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}
```

### Cards

```css
.card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  padding: var(--space-lg);
}
```

### Icons

- Use **Lucide Icons** (SVG, stroke-width 1.5-2)
- Size: 20px inline, 24px standalone
- Color: inherit from parent or `var(--accent)`
- **NO emojis as icons**

---

## Anti-Patterns (Do NOT Use)

- ❌ **Emojis as structural icons** — Use SVG (Lucide)
- ❌ **Bold/vibrant/neon colors** — Stay earthy and muted
- ❌ **Geometric/blocky layouts** — Use flowing, natural spacing
- ❌ **Tech jargon** — Write for people who don't know what "deploy" means
- ❌ **AI-generated feeling** — No generic gradients, no stock photo vibes
- ❌ **Low contrast text** — Maintain 4.5:1 minimum
- ❌ **Instant state changes** — Always use transitions (200-300ms)
- ❌ **Invisible focus states** — Must be visible for a11y
- ❌ **Missing cursor:pointer** — All clickable elements

---

## Pre-Delivery Checklist

- [ ] No emojis used as icons (SVG only)
- [ ] All icons from Lucide, consistent stroke weight
- [ ] `cursor-pointer` on all clickable elements
- [ ] Hover states with smooth transitions (200-300ms)
- [ ] Text contrast ≥ 4.5:1
- [ ] Focus-visible states on interactive elements
- [ ] `prefers-reduced-motion` respected
- [ ] Responsive: 375px → 768px → 1024px
- [ ] No horizontal scroll on mobile
- [ ] Chinese text reads naturally, no awkward line breaks
- [ ] Tone is warm and human, not corporate or techy
