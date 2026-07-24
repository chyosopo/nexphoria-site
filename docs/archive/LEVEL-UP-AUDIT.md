# NEXPHORIA — LEVEL-UP AUDIT (2026-07-03)
*State at handoff. Everything in Parts I–III self-executable is shipped and gate-verified;
what remains is polish, imagery reach, thin pages, and the user-gated launch items.
All findings below are grounded in a repo scan, not memory.*

## GATE STATUS (all green at handoff)
`npm run` → **audit:data** (price/GLP-1/ghost drift) · **audit:design** (entropy lint) ·
**audit:bundle** (245KB entry, ≤300 budget) · **smoke** (39/39 routes SSR-render) ·
plus `tsc --noEmit` clean. Run ALL before every deploy. Deploy = build → copy dist/public
into gh-pages clone → push → POST pages/builds → poll → **verify local vs remote tree hash**.

## A. IMAGERY REACH — the biggest visible gap
Hyper-real outcome photography (16 frames, `data/outcomeImagery.ts`) is wired into WorldHome
heroes/tiles + StackPage + PeptidesCatalog. It is NOT yet on:
- **ProtocolsIndex** (`/stacks`) — the protocol grid uses 0 images; each flagship has an
  `OUTCOME_STACK[slug]` frame sitting unused. Wire them as card art.
- **BuildYourStack** (`/stacks/build`) — 0 outcome frames; still abstract.
- **Home.tsx, Science.tsx, Assessment.tsx** — still lean on MolecularGlyph/VialTile sculptures.
  Decide per surface: keep the glyph as "scientific" texture, or swap to photography.
- **Category.tsx** (`/goals/:slug`) — no per-category hero photo; `OUTCOME_CATEGORY` has them.
New imagery needs: solo-PDP frames (19 solos share stack frames today), Assessment step art,
About/Physicians editorial portraits (needs real people — user-gated).

## B. THIN PAGES (need real depth, not just tokens)
- **HowItWorks.tsx** (79 ln) — generic 3-step + loop. Needs the real Nexphoria mechanism:
  intake → 76-marker panel → physician → 503A compounding → 90-day retest, with specifics.
- **ProtocolsIndex.tsx** (83 ln) — bare grid. Add positioning, the "7 flagships" narrative,
  category framing, outcome imagery (see A).
- **RefundPolicy (32), TelehealthConsent (57), Privacy (71), Terms (74)** — real-ish template
  copy but MUST get a counsel pass (user-gated, L48). Entities say "Nexphoria, Inc." only;
  MDI PLLC / Strive Pharmacy not yet referenced anywhere in legal.

## C. POLISH DEBT
- **D14 input reach:** `.nx-input` only adopted in Checkout + PeptidesCatalog. Contact.tsx and
  Assessment.tsx roll their own inputs — migrate to `.nx-input` + `Field` error grammar.
- **Token debt:** ~41 `#FFFFFF` + scattered hex literals in page files (Home, Science,
  LabTesting worst). `npm run audit:design` counts them; drive fontSize/hex toward tokens.
  Baseline frozen at: fontSize 74 · radius 31 · shadow 16 · transition 33 · font-redecl 0.
- **AssessmentParts.tsx** — only page with no `useSeo` (it's a fragment, likely fine, verify).
- **Duplicate route aliases** — `/bloodwork`+`/blood-work`, `/peptides`+`/catalog`,
  `/terms`+`/legal/terms`. Confirm each pair sets a single rel=canonical to avoid SEO dupes.

## D. ENGINEERING REMAINDER (need browser or launch window)
- **E33** web-vitals budget in CI (LCP<2.5s, CLS<0.1) — needs Lighthouse/browser.
- **E42** visual-regression harness — needs headless browser (Playwright) in CI.
- **E41** history squash — do at pre-production only.

## E. USER-GATED (cannot be done by an agent)
Physician names + bios (C23/L49) · mission/About real voice (C28) · review strategy, honest
pre-launch (C26) · backend platform Indie vs Bask (L45) · payments seam (L46) · legal counsel
pass (L48) · production domain + path-routing migration off hash routing (L43/L44) ·
server-side GLP-1 state validation (L47) · retatrutide final call. Tracked in LAUNCH-CHECKLIST.md.

## PRIORITY ORDER (recommended)
1. Imagery reach A (ProtocolsIndex + BuildYourStack + Category) — highest visible ROI.
2. HowItWorks + ProtocolsIndex depth (B).
3. D14 input reach + token debt (C).
4. New Bloom imagery for uncovered surfaces (solo PDPs, Assessment, Category heroes).
5. Everything else waits on the user (E) or a browser (D).
