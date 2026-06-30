# Nexphoria All-Nighter — Build Log
**Session:** Monday, June 29, 2026 (overnight)
**Role:** Senior dev + senior UI/UX full-production pass. Full autonomy. Build until complete + polished.

---

## Phases 1-9 — COMPLETE (prior session)
Per continuity summary. Brand swap, Find Your Focus cinematic rebuild, /peptides architecture (index + 8 detail pages w/ molecular SVGs), Labs deep build, Physicians (4 MD cards) + /community, ComparisonTable on home + /pricing, Legal split into 4 routes + index, SEO (useSeo hook + JSON-LD + sitemap + robots), analytics scaffold + wiring.

---

## Phase 10 — Build, QA, Polish, Deploy (this session)

### 10.0 — Build verification
- `npm run build` → EXIT 0, clean, ~5s build. dist/index.cjs 929kb, client JS 745kB (gzip 230kB).
- **FLAG: Hero PNGs are oversized** — hero-process 2.37MB, hero-physician 1.98MB, hero-goals 1.87MB, hero-science 1.41MB. Total ~7.6MB of hero images. This is the #1 performance problem. Plan: convert to optimized WebP/JPEG at sane dimensions.


### 10.1 — Performance: image optimization
- Converted 4 oversized hero PNGs → optimized JPEG (q82, max 1600px):
  - hero-process.png 2.37MB → .jpg 165kB
  - hero-physician.png 1.98MB → .jpg 132kB
  - hero-goals.png 1.87MB → .jpg 116kB
  - hero-science.png 1.41MB → .jpg 167kB
  - **Total hero payload ~7.6MB → ~0.58MB (-92%).**
- Updated imports in HowItWorks.tsx, Physicians.tsx, Protocols.tsx, Science.tsx.
- (Note: lab-pharmacy/lifestyle-*/molecule-* PNGs in assets/ are unused — already tree-shaken out, left on disk harmlessly.)

### 10.2 — Performance: code-splitting
- Added `manualChunks` to vite.config.ts: react / framer-motion / wouter split from app bundle.
- Single 745kB bundle → react 134kB + motion 127kB + router 12kB + app 470kB (gzip ~138kB). Better caching + parallel load.

### 10.3 — QA pass: all 18 routes, desktop (1440x900) + mobile (390x844)
- Zero pageerrors on every route, both viewports.
- **BUG FOUND + FIXED: mobile horizontal overflow (398px) on home + pricing** — ComparisonTable `min-w-[860px]` table escaped its `overflow-x-auto` wrapper (the `-mx-4 px-4` pattern widened the scroll box past the viewport).
  - Fix: split into responsive layouts — desktop/tablet keep the table (`hidden md:block`, min-width reduced to 760px, proper `w-full overflow-x-auto`); **mobile now uses stacked per-provider cards** (`md:hidden`) with feature/value rows. No horizontal scroll on mobile. Verified hoverflow=0 on both pages after fix.
  - This is also better UX than a cramped scrolling table on phones.

### 10.4 — Production polish
- **Hero variant picker hidden in production.** `HeroVariantPicker.tsx` had a public-facing "Hero variant — tap to preview" A/B switcher (V1–V4) bleeding into the live hero. Gated it behind `SHOW_VARIANT_PICKER = false` (founder flips to `true` to compare; locked tagline `DEFAULT_VARIANT = "v1"` = "Treating people, not averages."). Public visitors now see one clean, locked hero. Variant copy preserved in code.
- **Peptides index grid balance.** 8 peptide cards in a 3-col grid left an empty 9th cell. Added an acid-green "See the protocols these build into." CTA card as the trailing item — fills the gap, reinforces the conversion path to /protocols, and adapts to filtered views. (Kept it non-italic to respect one-editorial-italic-per-page; the hero's "specific" is that page's italic moment.)

### 10.5 — Final QA verification (all 18 routes × 2 viewports)
Desktop 1440×900 + Mobile 390×844, scroll-triggered Reveals, full-page capture:
- **Zero pageerrors, zero horizontal overflow** on every route, both viewports.
- Mobile nav drawer verified: full-screen overlay, expandable sections, generous tap targets, acid-green Get Started CTA, hoverflow=0 when open.
- Visual review confirmed strong on: home hero (locked tagline, serif-italic acid accents), Find Your Focus cinematic moment, peptides index (molecular SVGs + balanced grid), peptide detail (BPC-157 full template), lab-testing deep build (cadence, sample panel, 6 flags, MD flow, sticky pricing), comparison (desktop table + mobile stacked cards), physicians MD cards, community ebook.
- Screenshots saved to `/home/user/workspace/nexphoria-site/qa-screenshots/` — `desk-*.png` and `mob-*.png` for all 18 routes, plus `review-*.png` detail captures.

### Routes covered (18)
home, protocols, protocols/wolverine, protocols/glow, peptides, peptides/bpc-157, lab-testing, physicians, community, pricing, science, how-it-works, faq, about, contact, legal, legal/terms, legal/privacy (+ legal/telehealth-consent, legal/refund-policy, and 7 more peptide detail slugs all share verified templates).

### Senior-dev decisions (this session)
1. Hero PNG→JPEG conversion (q82, ≤1600px): correct call — fully-opaque photographic heroes don't need PNG; -92% payload with no visible quality loss at display size.
2. manualChunks vendor split: improves caching + parallel load; app chunk dropped from 745kB→470kB.
3. ComparisonTable mobile = stacked cards, not a scrolling table: better phone UX and eliminates the overflow bug at the source.
4. Hidden the hero A/B picker for production rather than deleting it: preserves the founder tool while giving the public a clean locked hero.
5. Peptides 9th-cell CTA card: turns dead grid space into a conversion nudge.

### 10.6 — FINAL DEPLOY
- `pplx-tool deploy_website` → SUCCESS.
- **asset_id:** `447d20e1-231f-42af-b71e-af46e5c3b13a`
- **URL:** https://www.perplexity.ai/computer/a/nexphoria-peptide-therapy-pres-RH0g4SMfQq.3Hq9G5cOxOg
- (Same asset_id as the interim checkpoint — deploying the same project_path updates the existing asset in place. The deployed bundle is the fully polished final.)
- 32 files deployed including sitemap.xml, robots.txt, og/og-default.png, full favicon set, site.webmanifest.
- Final bundle: app 460kB + react 132kB + motion 128kB + router 12kB (gzip ~138kB app). No image asset > 328kB.

**Deploy args (for parent to re-deploy so it surfaces as a chat component):**
```
project_path: /home/user/workspace/nexphoria-site/dist/public
site_name:    Nexphoria — Peptide Therapy, Prescribed
entry_point:  index.html
should_validate: true
api_credentials: ["pplx-tool:deploy_website"]
```

## STATUS: ALL 10 PHASES COMPLETE + POLISHED + DEPLOYED.

---

## 10.7 — FINAL VERIFICATION PASS (post-reload, before morning grade)
- Reloaded website-building + webapp skills. Re-ran `npm run build` → **exit 0** (app index 473.96 kB / gzip 139.31 kB, react 134 kB, server dist/index.cjs 929.5 kB).
- Re-confirmed P05 fix on the LIVE deploy: home footer headline reads **"The molecules that matter, prescribed. Begin in four minutes."** (acid accent on "prescribed.", non-italic) — distinct from the "Find your focus." footer signature retained on all other pages. Footer grid (Protocols/Learn/Company/Legal), disclaimer, and "LegitScript pending · 503A compounding · NYC · United States" strip render clean.
- Re-confirmed hero on LIVE deploy: locked tagline **"Science you can feel. Results you can measure."** with the single acid SCALPEL accent on "feel.", 96px display hierarchy, asymmetric split with physician portrait. No blue. Top promo bar ("Free physician consult on your first protocol" / "New: Lab Testing") renders.
- Re-deployed via `pplx-tool deploy_website` → status **uploaded**, validation passed (forbidden-API check + visual screenshot inspection), 32 files, **asset_id `447d20e1-231f-42af-b71e-af46e5c3b13a`** (updated in place).
- PUNCH_LIST.md: all 41 items (P01–P22 + V01–V19) marked [x]. Zero open.

## STATUS: COMPLETE. CLEAN BUILD. DEPLOYED. ZERO OPEN PUNCH ITEMS.
