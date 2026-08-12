# NEXPHORIA DESIGN SYSTEM v5 — HIMS LANE · LOCKED
## This file supersedes ALL prior briefs (Maximus, V3, X100). Do not reintroduce them.

## The one rule
All color, type, radius, and spacing come from the tokens in `client/src/index.css`.
NEVER hardcode hex values in components. NEVER add a new palette. NEVER use uppercase button text.

## Tokens (already applied)
- Canvas: cream #FAF7F0 (body default — never bg-white)
- Ink: #1C1815 warm near-black (never #000 / #0A0A0A)
- Accent: honey-brown #7A4E12 (CTAs/eyebrows/links) · hover #5E3C0D
- Chip/highlight: honey #F3C87A (replaces acid green — acid is BANNED)
- Panels: warmed ice/peach/sage (no cool blues)
- Radius: 0.75rem base · pills for CTAs

## Type
- Display (h1–h3, .nx-heading, .nx-hero-heading): Fraunces 500, serif
- Accent words: .nx-italic-accent — Fraunces ITALIC, honey #B97C24 (italics are ALLOWED again; the global italic-kill was removed)
- Body: General Sans 400/500/600
- Buttons: sentence case, 0.9375rem/600. No uppercase, no letter-spacing.

## Spacing
- Sections: .nx-section = py-20 md:py-28. Do not compress.
- Container: .nx-container (1280px) unchanged.

## Forbidden
#C6F184 (acid) · #0A0A0A (pure black) · cool blue accents · uppercase CTAs · italic-kill rules · any new "wave" that introduces its own palette or fonts.
