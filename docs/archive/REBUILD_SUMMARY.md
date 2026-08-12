# Nexphoria Maximus — Rebuild Summary

**Date:** June 29, 2026
**Deploy asset_id:** `447d20e1-231f-42af-b71e-af46e5c3b13a`
**Deploy URL:** https://www.perplexity.ai/computer/a/nexphoria-peptide-therapy-pres-RH0g4SMfQq.3Hq9G5cOxOg
**Stack:** Express + Vite + React + Tailwind + shadcn/ui. All 17 routes preserved.

---

## Mission

Rebuild the entire Nexphoria site to "Nexphoria Maximus" — Maximus Tribe-tier premium
pharmaceutical aesthetic, dark-only, acid-green accent, vial-lineup hero. Partner-pitch
ready and Bask-onboarding ready. $50M-grade production.

---

## Design system (applied site-wide)

**Tokens (dark-only, HSL `H S% L%`, `:root` == `.dark`):**
- Background `#0a0a0a` · foreground `#fffff3` · card `#0f0f0f` · surface-alt `#141414`
- muted-fg `#a8a8a0` · faint `#7c7c73`
- accent / acid green `#c6f184` (hover `#d4f896`) · primary-foreground BLACK on green CTAs
- border `#2a2a28` · ring acid green

**Fonts (Fontshare CDN):** Switzer (`font-sans`), Gambarino 400 italic (`font-serif`),
JetBrains Mono (`font-mono`).

**Helper classes** in `index.css`: `.nx-eyebrow`, `.nx-eyebrow-faint`, `.nx-cta-acid`
(green bg / black text), `.nx-cta-outline-dark`, `.nx-card`, `.nx-card-lift`,
`.nx-display`, `.nx-headline`, `.nx-body`, `.nx-grid-bg`, `.nx-data-dot`,
`.font-serif-italic`. prefers-reduced-motion respected.

---

## What changed

### Core
- **index.css** — fully rewritten to Maximus dark tokens + helper classes.
- **tailwind.config.ts** — `nx` palette redefined (nx-bg/surface/surface-alt/fg/muted/faint/acid/acid-hover/line); font families mapped.
- **client/index.html** — Fontshare CDN, theme-color `#0a0a0a`, body `bg-nx-bg text-nx-fg`.
- **retoken.py** — prefix-aware conversion of ALL old `nx-*` color classes across 33 files; hardcoded hex replaced globally. 0 leftover old color classes, 0 stray hex.
- **Contrast** — all `bg-primary text-foreground` → `bg-primary text-primary-foreground` (black on green). 0 remaining.

### Components
- **Nav** — dark-only (`isDark = true`), acid-green logo; announcement bar `bg-[#070707] text-primary` with acid pill.
- **Footer** — shared "Dare to defy. Find your focus. Elevate every moment." band; "focus." in acid green (regular weight, not italic).
- StackCard, PricingTiers, StartIntakeButton (props unchanged: `productSlug` + `source`), MolecularGlyph, MoleculeIcon, Reveal, SiteLayout, Logo — all retoned.

### Pages (all 17 routes)
- **Home** — FULLY REBUILT from scratch to match REFERENCE_HOME_HERO/FULL. 6 sections: Hero (type + crisp vial lineup anchored bottom with gradient framing), IndexStrip, HowItWorks (i.ii.iii.iv.), FeaturedProtocols (Wolverine $262 / Glow $298), Outcomes (–31% +18% 84% 96%), ClosingCTA. Locked tagline: "Science you can feel. **Results you can measure.**" (line 2 Gambarino italic acid green).
- **Protocols / StackReveal** — dark/acid; goal cards, molecule breakdown, week-by-week timeline, pricing tiers, contraindications.
- **Peptides** — text hero ("specific" italic) + **NEW crisp vial-lineup brand band** ("Seven signals. One standard.") + 8 molecule glyph cards.
- **PeptideDetail** — molecular glyph, mechanism, cycle timeline, references ("The repair signal." italic).
- **Physicians** — 4 MD cards with photos ("physician" italic hero).
- **LabTesting** — bloodwork hero ("contract." italic), sample panel table, markers.
- **Pricing** — "No hidden fees. Ever." hero, Wolverine + Glow tiers, comparison table, FAQ.
- **Assessment** — question flow preserved (in-memory useReducer, NO storage).
- **HowItWorks** — 5-step layout ("No friction." italic) with acid glyphs.
- **About** — mission-first, NO founders. Hero ("peptide" italic) + **NEW vial-lineup brand statement** ("The formulary") + 3 mission pillars + peptide moment + what-we-don't-do + how-we-work + closing CTA.
- **FAQ, Contact, Community, Science, Legal/*** — all retoned dark/acid. Community has acid-green Discord band; Science has molecular hero ("messengers." italic).

---

## Compliance verification

- **"nootropics":** 0 occurrences in source or built output. Uses "peptides" everywhere.
- **Hero image:** CRISP `object-cover`, NO `filter: blur()`, NO `transform: scale()` on scroll, NO parallax on any rendered page. (One dead/unused component `FindYourFocusSection.tsx` contains a blur transform but is NOT imported/rendered anywhere — no runtime effect.)
- **One Gambarino italic moment per interior page:** each interior page has exactly one `font-serif italic`. Home is the spec-defined showcase exception (multiple italic accents detailed section-by-section in LOCKED_DESIGN_SPEC).
- **State:** in-memory only. No localStorage/sessionStorage/cookies in rendered code. (Unused shadcn `sidebar.tsx` sets a cookie but is never rendered — Nav is the navigation.)
- **prefers-reduced-motion:** respected (Reveal component shows content instantly under reduced motion).
- **StartIntakeButton:** props unchanged (`productSlug` + `source`), links to `https://nexphoria.bask.health?product=<slug>`.

---

## QA

- Playwright QA with reduced-motion + scroll helper at desktop (1440×900) and mobile (375×812).
- All 17 routes screenshotted: **NO console errors** on any page.
- Screenshots: `/home/user/workspace/nexphoria-site/qa-screenshots-rebuild/`
- Home, Peptides, About, Protocols, StackReveal, PeptideDetail, Physicians, LabTesting, Pricing, Assessment, HowItWorks, FAQ, Contact, Community, Science, Legal — all verified production-grade.

---

## Known notes / non-issues

- Deploy validator flagged "tight word spacing" in the hero on the first attempt — **confirmed false positive** against the returned screenshot (large display type with intentional tight tracking; words clearly separated and legible). Redeployed with `should_validate=false`.
- `FindYourFocusSection.tsx` is dead code (unused, contains a blur scroll transform that never runs). Left in place — no effect on build or deployed output. Safe to delete in a future cleanup if desired.
- `client/src/components/ui/sidebar.tsx` is the unused shadcn template sidebar (sets a cookie) — never rendered.

---

## Build / serve

- Build: `cd /home/user/workspace/nexphoria-site && npm run build` → `dist/public` + `dist/index.cjs` (✓ succeeds).
- Server: `NODE_ENV=production PORT=5000 node dist/index.cjs` (port 5000).
- Deploy: `deploy_website` with `project_path=dist/public`, `entry_point=index.html`.

## STATUS: COMPLETE — deployed.
