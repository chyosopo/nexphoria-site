# Nexphoria v2x10 Upgrade — Rebuild Summary

**Date:** June 29, 2026
**Scope:** Upgrade of the deployed Nexphoria site (premium physician-guided peptide-therapy brand) to "v2x10".
**Quality bar:** $50M partner-pitch grade; Bask onboarding live.
**Project root:** `/home/user/workspace/nexphoria-site/`

---

## 1. What changed

### Data layer (Tasks 1–2)
- **`client/src/lib/protocols.ts`** — Expanded to **5 stacks** and **18 peptides**.
  - Stacks (ordered): `wolverine`, `glow`, `longevity` ("Eternal"), `sleep` ("Deep"), `lean` ("Lean").
  - From-prices (best 6-month per-month rate): Wolverine $262, Glow $187, Eternal $348, Deep $228, Lean $398.
  - `goals` array: all 5 goals now `status: "available"`.
  - `Stack.goal` union: `recover | skin | longevity | sleep | weight`.
- **`client/src/data/peptides.ts`** — `PeptideCategory` extended (+`longevity`, +`metabolic`); 15 peptides with real PMC/PubMed citation URLs. Used by the Peptides index + PeptideDetail.

### Components (Tasks 3–5)
- **`StackReveal.tsx`** — Vial PNGs wired for all 5 stacks (`lean` → `stack-weightloss.png`).
- **`Pricing.tsx`** — Rebuilt conversion-first: removed `ComparisonTable`; featured tiles + compact 5-stack grid; trust strip; pricing FAQ; all CTAs route to Bask with correct `productSlug`.
- **`Physicians.tsx`** — Rebuilt with conversion-psychology layout; `physicians.ts` gained `npi`/`license` fields.

### Page polish (Task 6)
- **Home.tsx** — Added `ProtocolCatalog` (5-stack grid, "Five protocols. One standard.") and `TrustStrip` ("1,200+ patients · 04 physicians · 50 states · 503A pharmacies"). Home is the **showcase exception** for multiple Gambarino italics.
- **Protocols.tsx** — Full rebuild as a 5-stack catalog with filter chips (All / Recovery / Aesthetic / Longevity / Sleep / Metabolic) linking to `/protocols/:slug`.
- **Peptides.tsx** — Filters expanded to 8 categories; copy updated ("Fifteen molecules", "Every signal. One standard.").
- **Assessment.tsx** — `Protocol` type extended to 6 options; `mapToStack()` now scores all 5 stacks from protocol pick + blockers + goals + sleep-quality signals (pure in-memory `useReducer`).
- **About.tsx** — Mission-first (no founders); stats strip updated to "1,200+ patients / 05 protocols / 04 physicians / 50 states".
- **FAQ.tsx** — Added 5 questions: "Which protocol is right for my goal?", "Is the longevity/sleep/weight protocol right for everyone?", "Why is Tirzepatide cheaper at compounding pharmacies?", "How is this different from Hims/Ro/Hers?"; pricing FAQ updated to all 5 stacks.
- **HowItWorks.tsx** — Added **step 6 "Adjust"** + a "What you get / and what you don't" two-column comparison section.
- **LabTesting.tsx** — Added **"What we won't prescribe without labs"** section (Eternal / Lean / GH-axis gating cards) alongside the existing markers table.
- **PeptideDetail.tsx** — Verified clean from the data layer; no changes needed.

### Light polish (Task 7)
- **Science.tsx** — Updated stale copy ("Ten molecules" → "Every molecule"); category list now includes metabolic.
- **Contact.tsx**, **Community.tsx**, **Legal.tsx** (+ `legal/*` sub-pages) — Verified compliant; no edits required.
- **Physicians.tsx** — Removed a second Gambarino italic from a testimonial blockquote (now `text-primary font-medium`) to satisfy the one-italic-per-interior-page lock.

---

## 2. Build & QA (Task 8)

- `npx tsc --noEmit` — **PASS** (clean) after every edit batch.
- `npm run build` — **PASS** (client bundle + `dist/index.cjs` server built).
- Production server started on port 5000 (`NODE_ENV=production node dist/index.cjs`).
- **Playwright QA:** all 20 routes × 2 viewports (desktop 1440×900, mobile 375×812) with `reducedMotion: 'reduce'` + full-page scroll.
  - **40 page loads, 0 console errors, 0 page errors.**
  - Full-page screenshots saved to `qa-screenshots-v2x10/`.
  - Visual spot-checks confirmed correct rendering of HowItWorks (step 6 + get/don't-get), LabTesting (won't-prescribe section + panel), FAQ (6 categories + new Qs), Protocols (5 stacks), and the Wolverine protocol-detail page.

---

## 3. Compliance verification (Task 9)

| Lock | Result |
|------|--------|
| Tagline "Science you can feel. Results you can measure." unchanged | PASS (locked in `seo.ts`) |
| Word "nootropics" never used | PASS — **0** occurrences in source AND dist |
| State in-memory only (no localStorage/sessionStorage/cookies) | PASS — no storage writes in app code (only comments; unused shadcn `sidebar.tsx` is never imported) |
| One Gambarino `font-serif italic` per interior page MAX | PASS — every interior page = 1 (Physicians fixed from 2→1); Home is the showcase exception |
| `prefers-reduced-motion` respected | PASS — QA ran with reduced-motion; `Reveal` honors it |
| About is mission-first, no founders | PASS |
| `StartIntakeButton` props `productSlug` + `source` intact | PASS |
| Tokens: acid-green `#c6f184`, obsidian `#0a0a0a`; Switzer / Gambarino italic / JetBrains Mono | PASS (unchanged) |
| All stack pricing tiers route to Bask with correct `productSlug` | PASS — wolverine/glow/longevity/sleep/lean all wired to `nexphoria.bask.health?product=<slug>` |

---

## 4. Deploy arguments (for parent — DO NOT deploy from subagent)

Per the lock, this subagent did **not** call `deploy_website`. Hand these to the parent agent:

- **tool:** `pplx-tool deploy_website`
- **project_path:** `/home/user/workspace/nexphoria-site/dist/public`
- **site_name:** `Nexphoria — Peptide Therapy, Prescribed`
- **entry_point:** `index.html`
- **should_validate:** `false`

> Backend note: the template's `queryClient.ts` uses the `__PORT_5000__` proxy token that `deploy_website` rewrites at deploy time, so the contact-form API (`/api/contact`) continues to work after deploy. The production server on port 5000 should remain running for the deployed site's API proxy.

---

## 5. Files touched this session

- `client/src/pages/FAQ.tsx` (5 new Qs + pricing update)
- `client/src/pages/HowItWorks.tsx` (step 6 + get/don't-get section)
- `client/src/pages/LabTesting.tsx` (won't-prescribe-without-labs section)
- `client/src/pages/Science.tsx` (copy correction)
- `client/src/pages/Physicians.tsx` (italic-lock fix)
- (Tasks 1–6 files completed in prior sessions, all typecheck-verified.)

**Status: COMPLETE.** All 9 tasks done; build green; QA clean (0 console errors across 40 loads); all locks verified.
