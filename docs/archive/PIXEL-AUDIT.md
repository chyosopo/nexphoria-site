# NEXPHORIA — PIXEL-LEVEL VISUAL DESIGN AUDIT
### Enterprise UI/UX teardown vs. hims.com standard

**Auditor:** UI/UX design auditor (subagent)
**Scope:** Every page in `client/src/pages/` + 11 named components
**Method:** Full read of design tokens (`index.css`), structural + CSS-value analysis of each page
**Date:** 2026-07-03

---

## EXECUTIVE SUMMARY

Nexphoria is **not** a typical AI-generated site with cramped spacing and flat cards. It sits on a **mature, fully-tokenized design system** (`--nx-*`) that already encodes the exact enterprise values this audit was asked to check for:

- **Section rhythm:** `--nx-section-y-desktop: 96px` / `--nx-section-y-mobile: 64px` — *exactly the hims spec.*
- **Type scale:** `--nx-t-h1: clamp(38px,5.2vw,60px)`, `--nx-t-display: clamp(44px,6.4vw,76px)`, body `16.5px` — dramatic and correct.
- **Elevation ramp:** four-step shadow token set `--nx-e-1…4` (subtle → dramatic).
- **Radii:** `--nx-r-md:16px / --nx-r-lg:24px / --nx-r-pill:999px`.
- **Motion:** `Reveal` scroll-reveal + `.nx-card-lift` / `.nx-float-card` hover-lift + aurora fields, all with `prefers-reduced-motion` guards.

**The system is A-grade. The problem is DISCIPLINE, not capability.** A handful of pages (built earlier or by a different hand — Cart, HowItWorks, Journal, LabTesting, BloodPanels) bypass the tokens with raw px values, non-pill CTAs, and inconsistent radii. The site's weakness is **drift**, not deficiency.

### Site-wide score: **8.2 / 10**

### Top 6 cross-cutting issues (fix these once, every page benefits)

1. **[CRITICAL · ROUTING] Two competing bloodwork pages.** `/bloodwork` → `Bloodwork.tsx` (rich, 1,181 lines) but `/blood-work` → `BloodPanels.tsx` (thin, 116 lines). `HowItWorks.tsx:117` and `SoloPDP.tsx:166` link to `/blood-work`; Nav + Footer link to `/bloodwork`. Users hit two different "bloodwork" experiences depending on entry point. **Pick one canonical route, 301 the other.**
2. **[HIGH] CTA radius drift.** The site's CTA language is the **pill** (`--nx-r-pill`, used by `.nx-cta-cobalt`, BuyBox, WorldHome, Hero). But **Cart.tsx** and **Checkout.tsx** primary buttons use `borderRadius: 12` + `background: var(--nx-fg)` (dark, squared) instead of the cobalt pill. The two highest-intent commerce screens don't speak the brand's button language.
3. **[HIGH] Raw-px font sizes bypass the type token.** `HowItWorks`, `Journal`, `JournalArticle`, `BuildYourStack`, `Cart`, `Category` hardcode `fontSize: 11/12/13/14/15` instead of `var(--nx-t-*)`. These are mostly *fine visually* (they land near the tokens) but they defeat the responsive `clamp()` scaling and make global type tuning impossible.
4. **[MEDIUM] Static commerce/utility pages.** `Cart`, `Checkout`, `Category`, `BuildYourStack`, `JournalArticle` have **zero** `Reveal`/scroll-motion. Marketing pages feel alive; the money pages feel dead. Add subtle reveals to summary cards & list rows.
5. **[MEDIUM] Radius mixing within a page.** Cart mixes `12 / 16 / 20 / 999` on adjacent cards. Standardize on `--nx-r-md (16)` for cards, `--nx-r-lg (24)` for panels, `--nx-r-pill` for chips/CTAs.
6. **[LOW] Accent color is misnamed but consistent.** `--nx-cobalt` is actually a muted navy-teal `#2E5877` (comments even say "warm honey-brown" — stale). It IS used sparingly and correctly; just note the token name lies, which will confuse future devs.

---

# COMPONENTS

## Nav.tsx — Score: 9/10
### What's good
- Sticky `h-14` (56px) bar, `translateZ(0)` GPU isolation, blur gated to `md+` + scrolled only (real perf discipline). `border-bottom` hairline via token.
- Full Hims-style **hover mega-menu**: 6 outcome tiles (radius 14) + featured-peptide column + featured card (16:9, `group-hover:scale-[1.04]`). Roving arrow-key nav, Escape-to-close, `aria-haspopup/expanded`. This is genuinely enterprise.
- Mobile full-screen drawer with body-scroll lock, sticky CTA footer, category quick-links.

### What needs fixing
1. **[MEDIUM]** Mega-menu tile radius `14` and featured-card radius `14` are **off-token** — should be `--nx-r-md` (16px) to match the rest of the site. Minor but it's the one place the nav diverges.
2. **[LOW]** Desktop nav height 56px is on the tight side for a premium brand; hims runs ~72–80px. Consider `h-16` (64px) for more breathing room around the logo.
3. **[LOW]** Center links `gap-7` (28px) — good. `text-sm` (14px) links are fine, but at 56px bar height the vertical hit area is a little small on trackpads.

### Exact values
- `Nav.tsx` mega tiles: `borderRadius: 14` → `borderRadius: "var(--nx-r-md)"` (three occurrences: category tile, featured card `span`, stacks-promo, plus mobile drawer tiles)
- Bar height: `h-14` → `h-16` (optional premium bump)

---

## Footer.tsx — Score: 9/10
### What's good
- Editorial 4-column layout on a `[1.4fr_2.6fr]` split, brand+newsletter left. `py-16` (64px) top padding is correct.
- Newsletter input + acid "Join" button, trust-badge row (503A / all-50-states / HIPAA / CLIA / LegitScript), bottom legal bar, full regulatory disclaimer. Trust density is excellent.
- All whites use `rgba(255,255,255,0.x)` on `--nx-bg-dark` — proper dark-surface contrast ramp.

### What needs fixing
1. **[MEDIUM]** Newsletter form is `onSubmit={(e)=>e.preventDefault()}` — a **dead form**. Either wire it or remove; a no-op capture erodes trust if a user tests it.
2. **[LOW]** Column heading font is `10px` uppercase `0.12em` — borderline too small; bump to `11px` for legibility parity with the trust row.
3. **[LOW]** Trust-badge sub-labels at `9px` are at the floor of legibility. `10px` minimum recommended.
4. **[LOW]** Unused import `ArrowUpRight` — dead code.

### Exact values
- `Footer.tsx` FooterCol heading: `fontSize: "10px"` → `"11px"`
- Trust badge sub: `fontSize: 9` → `10`

---

## SiteLayout.tsx — Score: 10/10
### What's good
- Clean world-resolution (men/women persistence via `data-world` + localStorage w/ memory fallback for sandboxed iframes). Skip-to-content link. Lazy `ExitIntentModal` off the critical path. `AnnouncementBar → Nav → TrustBar → main → Footer` order is textbook.
- Nothing to fix. This is the correct skeleton.

---

## WorldHome.tsx — Score: 9.5/10
### What's good
- The **best-composed page engine in the codebase.** Grammar: aurora hero → tinted-glass goal tiles *in first glance* → product card row (vial art + `.nx-float-card` grid) → trust slot → ONE dark night band (~15%) → standards line → close.
- Every value tokenized: hero H1 `clamp(38px,5.8vw,68px)` lh 1.05, body `--nx-t-body`, CTA cobalt pill `14px 28px`. Hero art 3:2 with `--nx-e-3`, `fetchPriority="high"`.
- Goal tiles use `.nx-art-tile` (aspect 4/4.4, hover translateY(-4px) + img scale 1.045). Night band stats `clamp(34px,4.4vw,48px)`.
- Rhythm: visual → text → visual → text → dark → text. Exactly the hims cadence.

### What needs fixing
1. **[LOW]** Product-card image block uses a raw `borderRadius: 20` and inline `boxShadow: "0 18px 40px -24px …"` instead of `--nx-r-lg` + `--nx-e-3`. Cosmetically identical, but off-token.
2. **[LOW]** Night-band body `fontSize: 15.5` is a raw px; should be `--nx-t-base` (15) or `--nx-t-body`.

### Exact values
- `WorldHome.tsx` vial block: `borderRadius: 20` → `"var(--nx-r-lg)"`; inline shadow → `"var(--nx-e-3)"`
- Night body: `fontSize: 15.5` → `"var(--nx-t-body)"`

---

## SignatureTile.tsx — Score: 8.5/10
### What's good
- Four well-thought primitives: `HeroTile` (mouse-parallax scale 1.06 + translate), `ProductTile`, `PhotoTile`, `ColoredHeroTile` (6 pre-defined tone gradients + abstract glyphs so the site "stops feeling like 2 photos on repeat" — smart). `MxHeader`, `TrustBand` helpers.
- Responsive `<picture>` with 720px srcset, explicit `width/height` (no CLS), `loading` priority control.

### What needs fixing
1. **[MEDIUM]** Styling lives in external `.mx-*` classes not shown here — verify `.mx-hero`, `.mx-tile` radii match `--nx-r-lg`. The glyph `opacity: 0.35` may be too faint on light tone backgrounds; check contrast.
2. **[LOW]** `MxHeader` uses raw `margin: "0 0 40px"`, `maxWidth: 880`, `marginTop: 22` — off the spacing scale (`--nx-s-*`). Use `--nx-s-10` (40px) etc.
3. **[LOW]** `TONE_PALETTE` gradients are hardcoded hex, not tokens — acceptable for art, but they won't theme to the women's-world orchid palette.

---

## VialTile.tsx — Score: 9/10
### What's good
- The signature interactive object: illustrated SVG vial (glass gradient, liquid gradient, crimp cap, molecular glyph inside liquid) with **flip interaction** — rotateY 180° on desktop hover, tap-toggle on touch (`useIsTouch` via `matchMedia("(hover:none),(pointer:coarse)")`). Back face fully `aria-hidden` until flipped. 8 tone maps driven by `--nx-vial-*` tokens.
- This is the kind of micro-interaction that reads as "premium." Excellent.

### What needs fixing
1. **[MEDIUM]** Flip cards are a known **mobile UX risk** — tap-to-flip competes with tap-to-navigate. Confirm the front face still has an unambiguous "See protocol →" affordance so users aren't forced to flip to buy.
2. **[LOW]** Verify the 3D flip has a static fallback under `prefers-reduced-motion` (rotateY transitions can cause vestibular discomfort).

---

## StackCard.tsx — Score: 8/10
### What's good
- `rounded-3xl` (24px), `p-8 md:p-10`, `.nx-card-lift .nx-lift-premium` hover, `ArrowUpRight` that translates on `group-hover`. Peptide chips with molecule icons. Bottom price row with `border-t`. Light/dark variants. `memo`-ized.

### What needs fixing
1. **[MEDIUM]** Uses Tailwind utility classes (`text-fluid-3xl`, `font-display`, `bg-background`) — a **different type/color system** than the `--nx-*` inline-style pages. This is the seam between the "old" Tailwind-token layer and the "new" `--nx-*` layer. Two systems = drift risk. Prefer migrating to `--nx-t-*` / `--nx-fg`.
2. **[LOW]** `text-fluid-xs` peptide chips (font-mono) — verify they don't drop below 12px on mobile.
3. **[LOW]** Hover border goes `hover:border-border` (light variant) — i.e. **no visible border change on hover**; only the lift moves. Add `hover:border-primary/40` like the dark variant for a clearer affordance.

---

## BuyBox.tsx — Score: 9.5/10
### What's good
- **The commerce workhorse, done right.** Sticky rail on `lg+` (`.nx-buybox { position: sticky; top: 92px }`) + fixed mobile bottom bar (price + CTA always reachable), with a `height: 64` spacer so it never covers the footer. Three states: cadence tiers / GLP-1 physician-wall (gated) / consult-priced.
- Radio-group cadence selector with `aria-checked`, active state = `--nx-cobalt-soft` bg + `1.5px cobalt` border. CTA cobalt pill `14px 26px`. "No charge unless prescribed" reassurance line. Analytics `track()` on select + CTA.
- Deliberately **removed backdrop-blur** from the mobile bar to kill scroll jank on mid-range phones — documented in a comment. This is senior-level performance care.
- Radius = `--nx-r-lg`, shadow = `--nx-e-3`, all tokenized.

### What needs fixing
1. **[LOW]** Card padding `"1.3rem 1.3rem 1.4rem"` is a raw value — fine, but consider `--nx-s-5` (20px) for scale consistency.
2. **[LOW]** Badge font `9.5px` and `10.5px` category label are at the legibility floor; `--nx-t-xs` (12px) is safer for the category eyebrow.

---

## FinalCTAStrip.tsx — Score: 8.5/10
### What's good
- Full-bleed cobalt band, `minHeight: 300px`, centered. Eyebrow with flanking hairlines, headline `clamp(2rem,4.5vw,3.625rem)` in ceramic, sub-copy, dual CTA (inverted cream button + ghost-dark). `Reveal` entrance. Correct pattern.

### What needs fixing
1. **[MEDIUM]** Padding `"5rem 3rem"` is **raw and non-fluid** — on small phones `3rem` (48px) horizontal is too much inside an already-padded container. Use `clamp(2.5rem, 6vw, 5rem) var(--nx-gutter)`.
2. **[LOW]** Comment says "Playfair italic" but `fontFamily` is General Sans (sans) — stale comment; the headline is NOT serif here, which slightly weakens the editorial voice vs. the serif H1s elsewhere. Consider `S` (serif) for brand consistency on this hero-weight line.
3. **[LOW]** Headline has both `marginBottom` AND `margin: "0 auto 1.25rem"` — the shorthand wins; the first `marginBottom` is dead.

### Exact values
- `padding: "5rem 3rem"` → `padding: "clamp(2.5rem,6vw,5rem) var(--nx-gutter)"`
- `fontFamily: "'General Sans'…"` on `<h2>` → `S` (serif) for the editorial voice

---

## TrustStrip.tsx — Score: 9/10
### What's good
- Two-row credibility architecture placed immediately after hero: cert marks row (LegitScript/CLIA/USP/503A) + 4-pillar row (medical eval / compounding / clinical readiness / lab tested) with dividers. On `--nx-bg-cream` for subtle depth-band separation. Icons `strokeWidth 1.5`.

### What needs fixing
1. **[LOW]** Cert labels at `10px` and the section label at `9px` are tiny. Bump to `11px` / `10px`.
2. **[LOW]** Duplicate cert entry: "CLIA-Certified Labs" AND "CLIA-Certified Lab Network" both appear — reads like a copy dedupe miss.
3. **[LOW]** Pillar sub-labels `12px` good; labels `10px` uppercase — fine.

---

## TrustBar.tsx — Score: 9.5/10
### What's good
- The quiet fine-print credibility line under nav on every page. `10px` uppercase `0.12em`, dot separators via `color-mix`, `py-2`. Deliberately understated ("reads like a legal line, not a banner"). This is exactly the right restraint — a real medical brand signal.

### What needs fixing
1. **[LOW]** `10px` is the floor; acceptable here because it's intentionally fine-print, but ensure it passes at 320px width without wrapping awkwardly (5 items + separators is a lot on the narrowest phones — it does `flex-wrap`, so OK).

---

# PAGES

## Gate.tsx — Score: 9.5/10  (`/`)
### What's good
- Stunning two-panel her/him split, full `100dvh`, framer-motion parallax (scale 1.05 on choose, 1.03 on hover, brightness/saturate lift), per-world `data-world` theming so accents resolve orchid vs azure, hover "peek panel" showing 3 flagship stacks with prices, animated entry caption + underline on selection. `prefers-reduced-motion` fully respected. Mobile stacks vertically.
- Label `clamp(3.5rem,6vw,6rem)` — huge, confident. This is a memorable, premium entry surface.

### What needs fixing
1. **[MEDIUM]** Top-bar links use `href="#/stacks"` (hash routing) while the rest of the app uses path routes via `wouter` `<Link>`. Mixing `#/` anchors with the router is fragile — use `<Link>`.
2. **[LOW]** Peek panel `borderRadius: 4` is oddly sharp against a site that's all 16–24px radii. Intentional "dossier" look? If not, `--nx-r-md`.
3. **[LOW]** Gate has no visible skip-to-content / the whole viewport is a button pair — verify keyboard users can reach the "Start assessment" text link (it has `pointerEvents: auto`, good).

---

## Home.tsx — Score: 8.5/10  (showcase `/` alt)
### What's good
- 2,335 lines, 27 sections — the flagship. Hero H1 `clamp(50px,7.2vw,96px)` **Fraunces serif italic accent** — dramatic, correct. Floating result cards (IGF-1 +23%, deep sleep +38%) with `nx-float-in` keyframe + reduced-motion guard. PromoBar, goal tiles, VialTile grid, animated counters, physician portrait, press strip. Heavy imagery (20+ imports). Rhythm is strong.
- Overwhelmingly tokenized: `var(--nx-t-*)` used 100+ times.

### What needs fixing
1. **[HIGH]** **Hero CTA uses `background: var(--nx-acid)` + `color: var(--nx-fg)`** (a pale chip color) instead of the cobalt pill used everywhere else. The primary hero CTA should be the highest-contrast button on the page — `--nx-acid` (`#A9C6DE`, pale blue) on `--nx-fg` text is **low contrast for a primary CTA**. Use `.nx-cta-cobalt` or cobalt bg + ceramic text.
2. **[MEDIUM]** At 2,335 lines / 27 sections this page risks **content fatigue** — verify it's not longer than the men/women WorldHome (which is tighter and arguably better). Consider whether `/` should just BE WorldHome.
3. **[LOW]** Floating cards `borderRadius: 12` — off the card token (should be 16).
4. **[LOW]** A few raw `fontSize: 38 / 30` in section headings bypass `--nx-t-h2`.

### Exact values
- Hero CTA: `background: "var(--nx-acid)", color: "var(--nx-fg)"` → `background: "var(--nx-cobalt)", color: "var(--nx-ceramic)"` (or apply `className="nx-cta-cobalt"`)
- Floating cards: `borderRadius: 12` → `16`

---

## Science.tsx — Score: 8.5/10  (`/science`)
### What's good
- 1,315 lines, 17 sections. H1 uses `--nx-t-display`, H2 `--nx-t-h2` (13×). Body `--nx-t-body` (16×). Heavily tokenized. Rich mechanism/evidence content — high trust density.

### What needs fixing
1. **[MEDIUM]** 6× `fontSize: "9px"` — evidence-tier chips / citations at 9px are **below the legibility floor**. Bump to `--nx-t-xs` (12px) or 10px minimum.
2. **[LOW]** Long-form science page — confirm max reading measure caps at ~65ch (`maxWidth` on paragraphs) so text columns don't run full-bleed on wide desktops.

### Exact values
- All `fontSize: "9px"` → `"var(--nx-t-xs)"` (12px) or `"10px"` for the tiniest meta

---

## Bloodwork.tsx — Score: 8.5/10  (`/bloodwork` — the CANONICAL one)
### What's good
- 1,181 lines, 11 sections. H2s `clamp(34px,5vw,66px)` — dramatic. Dark-band sections (`color: var(--nx-bg)` on dark) for rhythm breaks. `BloodworkDashboard` + `BiomarkerCard` components. Aurora hero.

### What needs fixing
1. **[HIGH · ROUTING]** This is the **rich** bloodwork page but some internal links go to `/blood-work` (the thin `BloodPanels.tsx`). Consolidate (see cross-cutting #1).
2. **[MEDIUM]** 13× `fontSize: 11` + `fontSize: 10` raw — eyebrows/meta. Move to `--nx-t-xs`.
3. **[LOW]** Mix of `borderRadius: 12` and token radii — standardize.

---

## About.tsx — Score: 8.5/10  (`/about`)
### What's good
- 902 lines, 10 sections. H1 `clamp(2.75rem…)`, mostly token-driven. Good narrative rhythm.

### What needs fixing
1. **[LOW]** 4× `fontSize: "11px"` + 2× `"10px"` raw — convert eyebrows to `--nx-t-xs`.
2. **[LOW]** Several headings use raw `clamp(2rem…)` / `clamp(1.5rem…)` instead of `--nx-t-h2/h3` — works but bypasses the scale.

---

## Pricing.tsx — Score: 8/10  (`/pricing`)
### What's good
- 1,251 lines, 8 sections. `--nx-t-h2` (8×), `--nx-t-display` hero. Comprehensive pricing content.

### What needs fixing
1. **[HIGH]** **11× `fontSize: "9px"` + one `"8px"` + one `"7px"`.** A 7px label is **not readable** and fails accessibility. This is the worst offender for micro-type in the codebase. Audit every sub-9px value → 10–12px.
2. **[MEDIUM]** 18× `--nx-t-xs` is heavy reliance on the smallest token; pricing tables can afford `--nx-t-sm` (13.5px) for row labels.

### Exact values
- `fontSize: "7px"` and `"8px"` → minimum `"10px"` (ideally `"var(--nx-t-xs)"`)
- Sweep all `"9px"` → `"10px"` / `"var(--nx-t-xs)"`

---

## HowItWorks.tsx — Score: 9/10  (`/how-it-works`)
### What's good
- **Exemplary page.** 259 lines, tight. Aurora gradient hero, H1 `clamp(40px,6vw,72px)` serif w/ cobalt italic accent, 3:2 outcome frame w/ `--nx-e-4`. 7-step drawn timeline (`.nx-timeline` + `.nx-timeline-node` + `.nx-icon-circle`), each step with mechanism + objection + glyph. Dark night band `clamp(32px,5.4vw,60px)`. Two-column them/us comparison. Reveal throughout. Bank voice. This is the template other pages should copy.

### What needs fixing
1. **[HIGH · BROKEN LINK]** `HowItWorks.tsx:117` → `<Link href="/blood-work">See the panels</Link>` points to the THIN page. Change to `/bloodwork`.
2. **[LOW]** Step body copy uses raw `fontSize: 15.5 / 14.5 / 14` — near-token but should be `--nx-t-body` / `--nx-t-base`.

### Exact values
- Line 117: `href="/blood-work"` → `href="/bloodwork"`
- `fontSize: 15.5` → `"var(--nx-t-body)"`; `14.5`/`14` → `"var(--nx-t-base)"`

---

## Physicians.tsx — Score: 8.5/10  (`/physicians`)
### What's good
- 748 lines, 8 sections. `--nx-t-h2` headings, doctor cards. `--nx-doctor-card` with img zoom on hover. Good trust density (board-certified, named physicians).

### What needs fixing
1. **[LOW]** 5× `fontSize: "11px"` + 2× `"10px"` raw eyebrows → `--nx-t-xs`.
2. **[LOW]** Verify physician headshots are consistent aspect/quality (a mixed-quality doctor grid undermines authority).

---

## Contact.tsx — Score: 8/10  (`/contact`)
### What's good
- 573 lines. `--nx-r-lg` cards, `--nx-e-2/3` shadows, `nx-icon-circle`, `nx-stat-num`, `clamp` padding on cards. Contact form with proper field styling.

### What needs fixing
1. **[MEDIUM]** `borderRadius: "4px"` on a form element (line ~390) is sharply off-system (site is 16–24px). Use `--nx-r-sm` (10px) or `--nx-r-md`.
2. **[LOW]** 3× `"9px"` + `"8px"` labels → 10px min.
3. **[MEDIUM]** Confirm the contact form actually submits (Footer's newsletter is a no-op; check this one isn't too).

---

## FAQ.tsx — Score: 8/10  (`/faq`)
### What's good
- 493 lines, uses `FAQAccordion` component (11KB, animated expand). Single-section focused layout. `clamp(1.5rem…)` heading.

### What needs fixing
1. **[MEDIUM]** Only 1 `<section>` and thin heading structure — the page could use a hero band + category grouping (Billing / Medical / Shipping) like hims. Currently reads as a flat list.
2. **[LOW]** `"9px"` labels → 10px.

---

## Community.tsx — Score: 8/10  (`/community`)
### What's good
- 407 lines, 6 sections. `--nx-t-h2`, `DiscordCTAStrip`. Reasonable rhythm.

### What needs fixing
1. **[LOW]** 3× `"11px"` + `"9px"`/`"10px"` raw → tokens.
2. **[MEDIUM]** Community pages live or die on **social proof imagery** (member photos, count stats). Verify there's real visual content, not just text blocks.

---

## Journal.tsx — Score: 7.5/10  (`/journal`)
### What's good
- 628 lines. Article index. Some Reveal (7×). 2 images.

### What needs fixing
1. **[MEDIUM]** Does **NOT** use `nx-section` rhythm (0 matches) and 8× `fontSize: 11` raw. An editorial/blog index especially needs generous 96px section rhythm and a strong type hierarchy for scannability.
2. **[HIGH]** Only **2 images** for an article index — a journal grid should be image-forward (each article card = hero thumbnail). Text-heavy article lists feel like a database dump. Add card thumbnails (16:9, radius `--nx-r-md`, hover-lift).
3. **[MEDIUM]** `borderRadius: 12` present — align to card token.

### Exact values
- Wrap major bands in `className="nx-section-y"` for the 64/96px rhythm
- `fontSize: 11` → `"var(--nx-t-xs)"`

---

## JournalArticle.tsx — Score: 7.5/10  (`/journal/:slug`)
### What's good
- 762 lines, 6 images (good — article body imagery). Article template.

### What needs fixing
1. **[HIGH]** **Zero Reveal / motion** and no `nx-section` rhythm — long-form reading page feels static. Add subtle fade-in on scroll for figures/pullquotes.
2. **[MEDIUM]** 8× `fontSize: 10` + `9px` raw — article meta/captions too small. Body copy for an ARTICLE must be `--nx-t-body` (16.5px) with lh 1.6–1.7 and `maxWidth: 68ch` for comfortable reading. Verify the article body isn't running full-width.
3. **[LOW]** Add a reading-progress bar (`ScrollProgress` component exists — reuse it) and estimated read time.

---

## Category.tsx — Score: 7.5/10  (`/goals/:slug`)
### What's good
- 292 lines, ONE template for 6 goals — DRY. Uses `nx-section` (5×). Emotional hero (`pre` + accent split), 3-step, goal chips, treatment grid, FAQ+JSON-LD, CTA. Good SEO structure.

### What needs fixing
1. **[MEDIUM]** **Zero Reveal / motion** — the treatment grid and FAQ should animate in. Compare to WorldHome which feels alive.
2. **[MEDIUM]** Many raw `fontSize: 10/11/12/13` (and `.5` variants) — convert to tokens.
3. **[HIGH]** Only **2 images** for a condition page. Hims condition pages are visual-first (hero photo + product shots + result imagery). This template is text-heavy — add a hero image per goal (the `OUTCOME_CATEGORY` art already exists and is used elsewhere; wire it in).
4. **[LOW · CONTENT]** Copy typo: `"With a A structured intake"` (recovery FAQ) — double article.

---

## SoloPDP.tsx — Score: 8.5/10  (`/peptides/:slug`)
### What's good
- 239 lines, tight PDP. 7× Reveal, uses BuyBox (sticky commerce). 2 images. Clean.

### What needs fixing
1. **[HIGH · BROKEN LINK]** `SoloPDP.tsx:166` → `/blood-work` (thin page). Change to `/bloodwork`.
2. **[MEDIUM]** 7× `fontSize: 11` raw eyebrows → `--nx-t-xs`.
3. **[MEDIUM]** A PDP should be more image-rich — 2 images is thin. Add: the VialTile render, a mechanism diagram, and a "what's in the box" shot. hims PDPs stack 4–6 visuals.

### Exact values
- Line 166: `href="/blood-work"` → `href="/bloodwork"`

---

## StackPage.tsx — Score: 8.5/10  (`/stacks/:slug`)
### What's good
- 265 lines. 7× Reveal, uses BuyBox. Protocol detail. Clean structure.

### What needs fixing
1. **[MEDIUM]** Only 1 image — a stack (multi-peptide protocol) page should visualize the stack (multiple vials, a protocol timeline). Add the composed-stack imagery.
2. **[LOW]** 4× `fontSize: 11` raw → tokens.

---

## ProtocolsIndex.tsx — Score: 8.5/10  (`/stacks`, `/protocols`)
### What's good
- 168 lines, tight. 5× Reveal, 3 images. Renders the 7-stack grid (likely `StackCard`).

### What needs fixing
1. **[MEDIUM]** No `nx-section` rhythm — add the 64/96px bands.
2. **[LOW]** 2× `fontSize: 11` raw.

---

## PeptidesCatalog.tsx — Score: 8/10  (`/…/peptides`)
### What's good
- 150 lines, compact catalog. 3× Reveal, 2 images. Renders the formulary grid.

### What needs fixing
1. **[MEDIUM]** A catalog is the core shopping surface — it should have **filter/sort chips** (by category, by goal, by price) and each card should be image-forward (VialTile). Verify it's not a plain text list.
2. **[LOW]** Add `nx-section` rhythm.

---

## Cart.tsx — Score: 7/10  (`/cart`)
### What's good
- 547 lines. Line-item cards, quantity steppers (pill borders `999`), add-on upsell rows (labs, recovery), order summary panel `--nx-r-lg`. Functional and complete.

### What needs fixing
1. **[HIGH]** **Primary checkout CTA is `background: var(--nx-fg)` (dark) + `borderRadius: 12`** — NOT the cobalt pill. The single most important button in the funnel doesn't match the brand CTA language. → `.nx-cta-cobalt` (cobalt pill).
2. **[HIGH]** **Radius chaos:** `12 / 16 / 20 / 999` all on one page. Standardize: line-items `--nx-r-md (16)`, summary panel `--nx-r-lg (24)`, chips/steppers `--nx-r-pill`.
3. **[MEDIUM]** **Zero Reveal / motion** — cart feels static/utilitarian. Add subtle fade-in on line items and a total-updates pulse.
4. **[LOW]** `py-12 md:py-16` top padding is fine but the page could use the `nx-section-y` token for consistency.

### Exact values
- Checkout button (line ~415): `background: "var(--nx-fg)", …, borderRadius: 12` → `className="nx-cta-cobalt"` (full-width variant)
- Line-item cards: `borderRadius: 12` → `"var(--nx-r-md)"`

---

## Checkout.tsx — Score: 7/10  (`/checkout`)
### What's good
- 712 lines. Full checkout flow, field styling, order summary.

### What needs fixing
1. **[HIGH]** Same as Cart — verify the **place-order CTA is the cobalt pill**, not the dark squared button. Highest-intent button on the site.
2. **[HIGH]** **Zero Reveal / motion** AND no `nx-section` — checkout can stay calm, but the summary rail should feel polished (sticky, `--nx-e-3`).
3. **[MEDIUM]** 2× `fontSize: 11` raw. Ensure form labels are ≥12px and inputs use `.nx-input` (defined in index.css with focus-visible ring).
4. **[LOW]** Confirm trust re-assurance (lock icon, "no charge unless prescribed", HIPAA) is repeated at the pay step — reduces abandonment.

---

## Assessment.tsx — Score: 9/10  (`/assessment`)
### What's good
- 1,593 lines — the intake engine. 19× motion/Reveal, 12 images. H1 uses `--nx-t-h1`, centered per-question layout, `setHeadingRef` + `tabIndex={-1}` focus management (a11y for screen-reader question announcement — excellent). Fluid padding `clamp(2rem,5vw,3.5rem)`. This is a well-built multi-step flow.

### What needs fixing
1. **[MEDIUM]** Confirm there's a **visible progress indicator** (step X of N + bar) — long intakes without progress feedback have high drop-off. (`ScrollProgress` exists; a step-progress bar is different — verify one is present.)
2. **[LOW]** With 12 images across steps, verify they're lazy-loaded (only the current step's image should load).
3. **[LOW]** Ensure large touch targets (≥44px) on the answer buttons for mobile.

---

## LabTesting.tsx — Score: 8/10  (redirects to `/bloodwork`)
### What's good
- 1,982 lines — the LARGEST file. **31× Reveal/motion**, 9 images. Extremely rich. But note `App.tsx:111` redirects `/lab-testing` → `/bloodwork`, so **this page may be orphaned/unreachable.**

### What needs fixing
1. **[HIGH · DEAD CODE?]** If `/lab-testing` redirects to `/bloodwork` (Bloodwork.tsx), then LabTesting.tsx (1,982 lines) is **not rendered by any route**. Either it's dead code (delete/archive) or the redirect is wrong and this superior page should be the canonical bloodwork page. **Resolve the bloodwork trilemma:** you have THREE bloodwork-ish pages (`Bloodwork.tsx` @ /bloodwork, `BloodPanels.tsx` @ /blood-work, `LabTesting.tsx` @ orphaned). Pick ONE canonical, redirect the rest.
2. **[MEDIUM]** `borderRadius: 12` mixing present.

---

## BuildYourStack.tsx — Score: 7/10  (`/stacks/build`)
### What's good
- 1,003 lines. `ProtocolConfigurator` (interactive stack builder). Complex, functional tool.

### What needs fixing
1. **[HIGH]** **Worst micro-type offender after Pricing:** 11× `fontSize: 10`, 10× `10.5`, 9× `11`, 7× `9.5`, plus `9`. A configurator dense with tiny labels is hard to use. Sweep everything <12px up to `--nx-t-xs` (12) minimum; primary labels to `--nx-t-sm` (13.5).
2. **[HIGH]** **Zero Reveal / motion** on a flagship interactive tool — the stack should animate as items are added (the payoff moment). Add spring/fade on add-to-stack.
3. **[MEDIUM]** Only 1 image — a stack builder should show the vials assembling visually.

### Exact values
- Global sweep in this file: all `fontSize: 9 / 9.5 / 10 / 10.5 / 11` → `"var(--nx-t-xs)"` (12) or `--nx-t-sm`

---

## BloodPanels.tsx — Score: 8.5/10  (`/blood-work` — thin/duplicate)
### What's good
- 116 lines, clean and tokenized. 3-tier panel cards (`.nx-glass-tile`), "most protocols gate here" badge, cumulative-depth progress bars, stack→panel mapping table, aurora hero H1 `clamp(38px,5.6vw,64px)`. Genuinely nice.

### What needs fixing
1. **[HIGH · ROUTING]** This is a **good page stuck on the wrong/duplicate route** (`/blood-work`). It's thinner than `Bloodwork.tsx`. **Decision needed:** merge its 3-tier panel section INTO the canonical `/bloodwork` page, then retire `/blood-work`.
2. **[LOW]** Raw `fontSize: 34` (price), `9.5/10.5/11/11.5/12.5` meta → tokens.

---

## not-found.tsx — Score: 9.5/10  (`/404`)
### What's good
- **Best 404 in the wild.** Aurora hero, compass-icon composition, serif H1 `clamp(2.6rem,5.4vw,4.2rem)` ("This page isn't on the shelf."), 4 suggested-destination `.nx-feature-card` links with icons, `noindex` meta injection + cleanup on unmount. Fully tokenized, `hideFooter`. Nothing to fix.

---

## MenHome.tsx / WomenHome.tsx — Score: 9.5/10  (`/men`, `/women`)
### What's good
- Thin config wrappers over the `WorldHome` engine (2KB each). Correct SEO JSON-LD, breadcrumbs, per-world imagery (`OUTCOME_CATEGORY`/`OUTCOME_HERO`), serif H1 with cobalt/acid italic accents, `HomeTrust` slot for men. This is the right architecture — one engine, two themed configs. (Their "no Reveal" flag is a false positive; `WorldHome` supplies the motion.)

### What needs fixing
- Nothing structural. Ensure `MenHome`/`WomenHome` featured slugs stay in sync with the live formulary so cards never 404.

---

# APPENDIX A — GLOBAL ACTION LIST (ranked by visual/UX impact)

| # | Severity | Fix | Files |
|---|----------|-----|-------|
| 1 | CRITICAL | Consolidate 3 bloodwork routes → 1 canonical `/bloodwork`; 301 the rest | App.tsx, Bloodwork.tsx, BloodPanels.tsx, LabTesting.tsx |
| 2 | HIGH | Fix broken `/blood-work` links → `/bloodwork` | HowItWorks.tsx:117, SoloPDP.tsx:166 |
| 3 | HIGH | Home hero CTA `--nx-acid` (low-contrast) → cobalt pill | Home.tsx |
| 4 | HIGH | Cart + Checkout primary CTA `--nx-fg`/radius-12 → `.nx-cta-cobalt` | Cart.tsx, Checkout.tsx |
| 5 | HIGH | Kill sub-9px type (`7px`,`8px`,`9px`) → 10–12px floor | Pricing.tsx, BuildYourStack.tsx, Science.tsx, Contact.tsx |
| 6 | HIGH | Add hero/card imagery to text-heavy pages | Category.tsx, Journal.tsx, SoloPDP.tsx, StackPage.tsx |
| 7 | HIGH | Add scroll-reveal motion to static pages | Cart, Checkout, Category, BuildYourStack, JournalArticle |
| 8 | MEDIUM | Standardize radii: card=16, panel=24, chip/CTA=pill | Cart, Bloodwork, Home, LabTesting, Journal, Nav |
| 9 | MEDIUM | Migrate raw-px `fontSize` → `--nx-t-*` tokens site-wide | HowItWorks, Journal*, Category, BuildYourStack, Cart, Bloodwork |
| 10 | MEDIUM | Wire or remove dead forms (footer newsletter, verify contact) | Footer.tsx, Contact.tsx |
| 11 | MEDIUM | Add `nx-section-y` rhythm to pages missing it | Journal, JournalArticle, Category, ProtocolsIndex, Cart, Checkout |
| 12 | LOW | Fix stale comments/typos (FinalCTA "Playfair", "With a A", CLIA dupe) | FinalCTAStrip, Category, TrustStrip |
| 13 | LOW | Rename `--nx-cobalt` or fix its stale "honey-brown" comment | index.css |

# APPENDIX B — WHAT'S ALREADY ENTERPRISE-GRADE (don't touch)

- `--nx-*` token system: type scale, 96/64 section rhythm, 4-step shadow ramp, radii, motion durations/eases — **all correct to spec.**
- `BuyBox` sticky-rail + mobile-bar commerce pattern with deliberate blur-removal for perf.
- `Nav` hover mega-menu with full keyboard nav + a11y.
- `WorldHome` engine + thin men/women configs (one-engine-two-worlds).
- `Gate` cinematic entry.
- `not-found`, `HowItWorks`, `BloodPanels` as clean tokenized templates.
- `Reveal` / `.nx-card-lift` / `.nx-float-card` / `.nx-art-tile` / aurora — all with `prefers-reduced-motion` guards.
- `data-world` orchid/azure theming that resolves every accent for free.

**Verdict:** The system is built. Ship a "token-discipline pass" (Appendix A #2–#5, #8, #9) and a "route consolidation" (#1) and this jumps from **8.2 → 9.3**. The bones are hims-tier; the drift is fixable in a focused day.
