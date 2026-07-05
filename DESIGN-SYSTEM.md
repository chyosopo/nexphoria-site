# Nexphoria Design System — "Porcelain & Navy"

> The single-page brief for any design tool or AI generator (v0.app, Figma, etc.)
> working on this brand. Distilled from the live token source of truth,
> `client/src/index.css`. If this file and the CSS ever disagree, the CSS wins.

## Identity

Physician-guided peptide telehealth. The register is an **institutional bank,
not a supplement brand**: calm, precise, authoritative. No hype, no exclamation
marks, no urgency theater, no discount energy. Reference peers: hims.com,
Ro.co, Function Health.

**Two worlds, one engine.** Men = azure/steel on warm porcelain. Women =
orchid/rose-quartz. Identical layouts and components — only the token values
change (a `[data-world="women"]` scope re-maps every color). Never design a
women's variant with different structure; design once, theme twice.

## Color — Azure world (default)

| Role | Token | Value |
|---|---|---|
| Canvas | `--nx-bg` | `#E9EFF5` |
| Alternate section | `--nx-bg-cream` | `#DCE6EE` |
| Dark band / footer | `--nx-bg-dark` | `#22384E` |
| Primary ink | `--nx-fg` | `#16283E` |
| Secondary copy | `--nx-fg-graphite` | `#46607A` |
| Captions / muted | `--nx-fg-muted` | `#5A7490` |
| Hairline borders | `--nx-border` | `#C9D5E0` |
| Primary accent (CTAs, links, eyebrows) | `--nx-cobalt` | `#2E5877` |
| Accent hover | `--nx-cobalt-hover` | `#1E4560` |
| Soft accent fill | `--nx-cobalt-soft` | `#D9E4EC` |
| Card surface (warm ceramic) | `--nx-ceramic` | `#F7F3E9` |
| On-dark accent | `--nx-acid` | `#A9C6DE` |
| Form error only | `--nx-danger` | `#A4453C` |

## Color — Orchid world (`[data-world="women"]`)

| Role | Value |
|---|---|
| Canvas | `#FAF4F7` |
| Alternate section | `#F3ECEF` |
| Dark band | `#35212E` |
| Primary ink | `#35212E` |
| Secondary copy | `#78646E` |
| Borders | `#E3DBDF` |
| Primary accent | `#68354E` |
| Accent hover | `#4F253A` |
| Soft accent fill | `#F3E8EC` |
| Card surface | `#FCF3F7` |

Rules: **components reference tokens, never hex.** Crimson/red is reserved for
blood imagery only — never decorative, never a UI accent. Error states use
`--nx-danger` on forms exclusively.

## Typography

- **UI / body:** General Sans (weights 400–700). Everything functional.
- **Display / headlines:** Fraunces, **weight 500 only**, tight leading
  (1.03–1.15), letter-spacing −0.015em. Used for H1/H2/product names/prices.
- Scale (tokens): xs 12 · sm 13.5 · base 15 · body 16.5 · lg 18–20 ·
  xl 22–26 · h3 24–30 · h2 30–42 · h1 38–60 · display 44–76 (all fluid clamp).
- Eyebrows: 11–12px, uppercase, letter-spacing 0.16–0.2em, weight 600, accent color.
- **Never render type below 12px** (`--nx-t-xs` is the floor).

## Shape, elevation, motion

- Radii: 6 / 10 / 16 / 24 / pill (`--nx-r-xs/sm/md/lg/pill`).
- Shadows (cool navy-tinted, never gray): `--nx-e-1` hairline → `--nx-e-4`
  hero float. Cards rest at e-1, hover to e-3.
- Motion: 200ms standard, 320ms structural, ease `cubic-bezier(0.22,0.61,0.36,1)`
  ("confident settle"). Hover lift = `translateY(-2px…-6px)` + shadow step.
  Everything respects `prefers-reduced-motion`.
- Spacing: 4px base scale; section rhythm `clamp(76px, 10vw, 132px)`;
  page gutter `clamp(20px, 4vw, 32px)`; content max-width 1280px.

## Component grammar (the signatures)

- **Weightless tile** (`.nx-art-tile`): light ceramic card, 1px border,
  image INSET with a 10px frame (never full-bleed), 4:3 ratio, label below
  inside the card, hover `translateY(-6px)` + e-3. This is the product/goal
  card everywhere.
- **Glass card** (`.nx-glass-card`): translucent ceramic panel on tinted
  sections for trust/editorial moments.
- **Filter chip** (`.nx-filter-chip`): pill, 44px min height, 1px border,
  hover = 8% cobalt tint, active = solid cobalt via `aria-pressed`.
- **CTAs:** `.nx-cta-cobalt` solid pill (primary), `.nx-cta-ghost` outline,
  `.nx-cta-ceramic` cream-on-dark for night bands. All pill-radius,
  14px/26px padding, hover lift.
- **Night band:** a `--nx-bg-dark` full-bleed section per page for the
  strongest claim, type in ceramic + `--nx-acid` accents, closes with a CTA.
- **Text links** (`.nx-text-link`): cobalt, arrow suffix, hover underline,
  44px tap area.
- Every interactive element: visible hover AND focus-visible state, ≥44px
  touch target.

## Imagery

Hyper-real 85mm editorial photography. **Sell the outcome, never the vial**:
capability restored, fog lifted, years handed back. Men's world = cool
porcelain daylight; women's = warm blush/golden hour. No stock-photo energy,
no decorative filler, no geometric placeholders, no brand names on props.
Product stills: frosted vials, unlabeled cream bands, soft long shadows.

## Voice

Declarative, short, measured. Signature constructions: "Performance is a
number. We measure it first." / "A prescription is a hypothesis. The retest
is the evidence." Claims must be TRUE and verifiable — no invented
certifications, press, statistics, or availability. Counts derive from data
(`PANEL_TOTAL_MARKERS`, catalog lengths), never hardcoded.

## Integration rules for generated code (v0 etc.)

1. Output plain **React 18 + Vite** components (this is NOT Next.js; routing
   is wouter). Styling via the `--nx-*` tokens above — raw hex fails the
   repo's design audit and cannot merge.
2. Propose on a **feature branch**, never `design/azure` directly. Every
   merge must pass: `npm run check`, `npm run smoke`, `npm run audit:data`,
   `npm run audit:design`.
3. External links are plain `<a>`; internal navigation uses wouter `Link`.
   In-page anchors use the `anchor()` helper from `@/lib/anchors` (a runtime
   `<base>` tag breaks bare `href="#x"`).
4. Images: relative `img/...` paths (resolved via the `<base>` tag),
   WebP with width/height attributes.
