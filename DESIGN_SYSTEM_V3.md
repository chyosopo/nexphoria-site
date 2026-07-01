# Nexphoria Design System V3 — ADHD-Proof

## The Rule
**One idea per section. One action per screen. No walls of text.**

## Typography — Locked

**Single font family: General Sans (Fontshare)**

- **Display** (h1, h2): General Sans **600**, tracking -0.02em, line-height 1.0-1.05
- **Section head** (h3): General Sans **500**, tracking -0.01em
- **Body**: General Sans **400**, size 17-18px, line-height 1.6
- **Label / eyebrow**: General Sans **500**, UPPERCASE, tracking +0.08em, 12-13px

### Hard Bans
- ❌ NO italics anywhere — zero `font-style: italic`
- ❌ NO Fraunces / Instrument Serif / Playfair
- ❌ NO `<em>` inside headlines
- ❌ NO more than 2 weights per line
- ✅ Hierarchy comes from **size** and **weight**, never from style

### Load
```html
<link href="https://api.fontshare.com/v2/css?f[]=general-sans@400,500,600&display=swap" rel="stylesheet" />
```

## Color — Locked

| Token | Hex | Use |
|-------|-----|-----|
| `--nx-black` | `#0a0a0a` | Text, dark section bg |
| `--nx-ceramic` | `#fffff3` | Light section bg |
| `--nx-rock` | `#e8e9db` | Alt section bg (breather) |
| `--nx-acid` | `#c6f184` | Only accent — CTAs, dots, active states |
| `--nx-fg-muted` | `rgba(10,10,10,0.55)` | Body text muted |
| `--nx-line` | `rgba(10,10,10,0.10)` | Dividers |

**Acid is used sparingly** — CTAs, bullet dots, eyebrow prefix dots, active tab underlines. Never for text blocks.

## Tile Grammar — The Maximus Move

Every product/goal tile:

```
┌─────────────────────────────┐
│                             │
│       [Big photo]           │  ← image is 80% of tile, edge to edge
│                             │
│                             │
│ ● GOAL LABEL                │  ← acid dot + uppercase eyebrow (12px, tracking .08em)
│                             │
│ Big verb + noun.            │  ← General Sans 600, 40-56px, 2-4 words max
│                             │
│ [ Explore protocol → ]      │  ← acid pill CTA, 48px
└─────────────────────────────┘
```

Rules:
- 3:4 or 16:10 aspect ratio
- Border-radius: 12px (soft but architectural)
- No decorative gradients, no dark overlay unless text needs contrast
- Full tile is clickable
- Hover: image scales 1.03, CTA nudges right

## Section Rhythm — ADHD-Proof Home

1. **Hero** — one giant statement, one sub, one CTA, one supporting number
2. **Trust bar** — 4 icons + one-word labels
3. **Goal tiles** — 4 tiles, verb-first, image-forward
4. **How it works** — 3 steps, huge numerals, one line each
5. **Featured protocol** — one product deep-cut, big photo left / brief right
6. **Numbers** — 3 giant stats (Bask-style)
7. **Physicians** — 3 photos + names + one credential each
8. **Final CTA** — one giant question, one button

That's it. 8 sections. Every section = one job.

## Motion

- Fade-up on scroll: 400ms, ease-out, 12px translate
- Tile hover: scale 1.03, 300ms ease
- Sticky nav: opaque after 80px scroll
- No parallax. No scroll-jacking. No cursor followers.
- Respect `prefers-reduced-motion`

## Copy Rules

- Headlines: **4-7 words max**
- Subs: **1 sentence, max 12 words**
- Body blocks: **max 2 sentences before a visual break**
- Verb-first: "Boost testosterone", "Sleep deeper", "Recover faster"
- Numbers over adjectives: "50k+ members" > "many members"

## Spacing System

- Section top/bottom padding: 96px desktop / 64px mobile
- Container max-width: 1280px
- Container gutter: 32px desktop / 20px mobile
- Grid gap between tiles: 16px

## The Copy of Home (Locked)

**Hero**
- Eyebrow: `● PEPTIDE PHARMACY · US-COMPOUNDED`
- H1: `Peptides, prescribed.`
- Sub: `Physician-guided protocols. Compounded in US pharmacies. Delivered to your door.`
- Primary CTA: `Start assessment →`
- Secondary: `See protocols`

**Goal tiles** (4)
1. Recover faster — Wolverine stack
2. Burn fat — GLP-1 protocols
3. Sleep deeper — Growth peptides
4. Glow skin — GHK-Cu stack

**How it works** (3 steps)
1. Answer 8 questions — 3 min
2. Board-certified physician reviews — 24 hrs
3. Compounded and shipped — 3-5 days

**Numbers**
- 12,000+ protocols shipped
- 48-state coverage
- 24-hour physician review

**Final CTA**
- H2: `Ready to start?`
- Sub: `Free consult with your first protocol.`
- CTA: `Start assessment →`
