# Nexphoria All-Nighter — Full Production Build Plan
**Date:** 2026-06-29 (Monday AM target)
**Locked tagline:** "Science you can feel. Results you can measure."
**Goal:** Full production ready by morning.

## Brand assets (already on disk)
- `client/src/assets/brand/logos/lockup-black.svg` — full lockup (mark + NEXPHORIA wordmark). USE IN NAV.
- `client/src/assets/brand/logos/logo-black.svg` — mark only, black. USE ON CERAMIC BACKGROUNDS.
- `client/src/assets/brand/logos/logo-green.svg` — mark only, acid green. USE ON BLACK BACKGROUNDS.
- `client/src/assets/brand/find-your-focus-art.jpg` — 1800x1113, cropped book artwork showing half-blurred man with "Find your focus." typography. THE centerpiece image.
- `client/src/assets/brand/find-your-focus-original.jpg` — uncropped book mockup (don't use, has gray wall).
- `client/src/assets/brand/molecular-pattern.jpg` — hand-drawn neurotransmitter pattern (already in use as watermark).
- `client/public/favicon/` — already populated with favicon-16/32/48/180/192/512, .ico, maskable-512.

## Locked decisions
- Tagline: "Science you can feel. Results you can measure." — site-wide (hero h1, meta titles, OG cards)
- Pricing: From $X/mo teaser ONLY (NOT real prices on home/pricing teaser sections; full prices only on stack pages)
- About: mission-first, NO FOUNDERS visible
- Intake CTA: `https://nexphoria.bask.health?product=<slug>` placeholder
- COPY: PEPTIDES (never nootropics)
- Palette ONLY: black #000000, ceramic #fffff3, rock #e8e9db, heather #bbae9f, olive #a4b08a, mist #c9d0b5, acid green #c6f184. NO BLUE.
- Typography: Roc Grotesk display, Inter body, Instrument Serif italic for ONE editorial moment per page, JetBrains Mono for data
- StartIntakeButton props: `productSlug` + `source`

## Build sequence

### Phase 1 — Brand swap (HIGHEST PRIORITY)
1. **Logo.tsx** — replace the SVG approximation with the REAL `logo-black.svg` and `logo-green.svg` markup. Import as React components or inline. Add a `tone` prop: "black" | "green" — defaults to "black". Lockup variant uses `lockup-black.svg`.
2. **Nav.tsx** — use the full lockup (mark + wordmark) sized at 28-32px height.
3. **Footer.tsx** — use lockup, mark, or just wordmark depending on layout.
4. **index.html** — wire favicon links:
   ```html
   <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32.png" />
   <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16.png" />
   <link rel="apple-touch-icon" sizes="180x180" href="/favicon/favicon-180.png" />
   <link rel="manifest" href="/site.webmanifest" />
   ```
5. Create `client/public/site.webmanifest` with maskable icon set.

### Phase 2 — Find Your Focus rebuild (THE EDITORIAL HERO MOMENT)
Replace current FindYourFocusSection (which uses the dot figure) with a cinematic full-bleed treatment of the REAL find-your-focus-art.jpg.

Design spec:
- Full-bleed section, black background bleed (image already has black gym scene)
- Image displayed at 100% width on desktop, with object-position centered
- Scroll-driven reveal: image starts at 110% scale + slight blur (filter blur 8px), animates to 100% scale + 0 blur as user scrolls into view (framer-motion useScroll + useTransform)
- Editorial overlay TYPE positioned over the image at safe edges:
  - Top-left small caption (JetBrains Mono): "BRAND VISION · CHAPTER 01"
  - Bottom-left huge Instrument Serif italic: "Dare to defy."
  - Below it Roc Grotesk: "Find your focus."
  - Below it olive accent: "Elevate every moment."
- Bottom-right small kicker: "— Nexphoria"
- Mobile: image stays full-bleed top, text stacks below on rock/ceramic card
- Aspect ratio: contain the image's own 1800×1113 → use aspect-ratio CSS on mobile to avoid jank

### Phase 3 — Peptides architecture
1. New route: `/peptides` (index) and `/peptides/:slug` (detail)
2. Create `client/src/data/peptides.ts` — array of peptide objects:
   ```ts
   export interface Peptide {
     slug: string; // bpc-157, tb-500, ghk-cu, semax, selank, tesamorelin, ipamorelin, cjc-1295
     name: string; // e.g. "BPC-157"
     fullName: string; // "Body Protection Compound 157"
     tagline: string;
     category: "recovery" | "skin" | "cognition" | "sleep" | "growth";
     mechanism: string; // 2-3 sentences
     halfLife: string;
     typicalDose: string;
     cycleLength: string;
     timeline: { week: string; effect: string }[]; // "Week 1-2", "Initial inflammation reduction"
     studies: { title: string; year: string; url: string }[]; // 3-4 real or placeholder
     pairsWith: string[]; // slugs
     inStacks: string[]; // "wolverine" | "glow"
   }
   ```
3. `pages/Peptides.tsx` (index) — filterable grid (by category), card per peptide with mark + name + tagline
4. `pages/PeptideDetail.tsx` (detail) — hero with name + full name + tagline + a hand-drawn molecular SVG, then sections: Mechanism / Dosing / Timeline / Pairs With / In Our Stacks / References. CTA to add to stack.

8 peptides minimum: BPC-157, TB-500, GHK-Cu, Semax, Selank, Tesamorelin, Ipamorelin, CJC-1295.

For molecular SVGs: hand-draw simplified line-art chemical structures using `<svg>` with `<line>` and `<circle>` elements. Keep style monoline, acid-green accents on key functional groups. ~150-200 lines of SVG per peptide is fine — they don't need to be chemically accurate at the bond level, just suggestive of molecular structure.

### Phase 4 — Labs deep build
Replace `pages/LabTesting.tsx` with a comprehensive build:
- Hero: "Bloodwork is the contract."
- Cadence visual: Baseline ($179) → Mid-cycle ($89) → Outcome ($179) — horizontal timeline with what changes at each draw
- "Sample blood panel" mockup component — looks like a real lab report card with sections (CBC, CMP, Lipids, Hormones, Inflammatory markers, IGF-1). 2-3 values flagged in acid green (in range), 1-2 flagged in olive ("watch") with hover tooltip.
- "What we flag" grid: 6 cards each with a marker name + why it matters + what we do about it
- MD review process: 4-step horizontal flow (Draw → Lab analysis → MD review within 24h → Personalized recommendations)
- Sticky pricing reinforcement at bottom

### Phase 5 — Physicians + Community
1. Update `pages/Physicians.tsx`:
   - 4 MD cards: Dr. Sarah Chen (Functional Medicine), Dr. Marcus Rivera (Endocrinology), Dr. Elena Volkov (Internal Medicine), Dr. James Park (Sports Medicine). PLACEHOLDER NAMES — clearly labeled in source comment as "swap-ready"
   - Each card: silhouette photo placeholder, name, credentials, specialty, board certifications, "reviews completed" stat
   - Layout: 2x2 grid on desktop, stack on mobile
   - Below: "How MD review works" — 5-step process diagram

2. New route `/community` (`pages/Community.tsx`):
   - Hero: "Members who push the frontier."
   - Discord block: invite CTA + animated member count (placeholder 2,847)
   - Weekly AMA schedule: 4 upcoming AMAs with MD names
   - Ebook lead magnet: "The Peptide Protocol Primer" — gated by email capture (in-memory state, ready for real endpoint). Show book cover mockup on left, form on right
   - Member testimonial wall: 6 short quotes

3. Add Community block (condensed) to home — between AnimatedStatStrip and FAQ.

### Phase 6 — Comparison table
New component `client/src/components/ComparisonTable.tsx`:
- Rows: Price/mo, MD oversight, Lab testing included, Peptides offered, TRT, Cycle support, Compounding pharmacy, Refund policy, Membership required
- Columns: Nexphoria (highlighted in acid green), Maximus, Function Health, Levels, DIY peptide sources
- Sticky header on scroll within table viewport
- Add to home (between PhysicianSection and OutcomesSection) AND to /pricing page

### Phase 7 — Legal pages
Replace single `pages/Legal.tsx` with full legal section. Routes:
- `/legal` — index linking to all
- `/legal/terms` — Terms of Service (template content, 8-10 sections: Eligibility, Account, Services, Telehealth Relationship, Prescription, Payment, IP, Disclaimers, Limitation of Liability, Termination, Disputes, Changes)
- `/legal/privacy` — Privacy Policy (HIPAA-aware: what we collect, how we use, sharing, security, your rights, contact)
- `/legal/telehealth-consent` — Telehealth Consent (relationship, scope, alternatives, risks, technology, confidentiality, no guarantees, emergencies, fees, consent)
- `/legal/refund-policy` — Refund Policy (when refunds are issued, when not, process, contact)

All content template-grade, attorney-review-ready language. Use `<article className="prose">` wrapper with appropriate spacing. Each page ~800-1500 words.

### Phase 8 — SEO + structured data
1. **Per-page meta** — every page needs a title + description. Use `react-helmet-async` (install if not present) or set in App.tsx via a router-aware hook.
2. **OG/Twitter** — share image at `/og/og-default.png` (1200x630, brand styled). Generate one using magick from find-your-focus-art.jpg + brand overlay. For now use `find-your-focus-art.jpg` resized to 1200x630.
3. **Structured data** (JSON-LD inline in pages):
   - Organization on home
   - MedicalBusiness on home + physicians
   - FAQPage on /faq
   - Product on each /protocols/:slug and /peptides/:slug
4. **sitemap.xml** in `client/public/sitemap.xml` listing all routes
5. **robots.txt** in `client/public/robots.txt` — allow all, point to sitemap

### Phase 9 — Analytics scaffold
Create `client/src/lib/analytics.ts`:
```ts
export function track(event: string, props?: Record<string, any>) {
  if (typeof window === 'undefined') return;
  // PostHog/Plausible drop-in goes here — for now console + custom event
  window.dispatchEvent(new CustomEvent('nx:analytics', { detail: { event, props } }));
  console.log('[nx]', event, props);
}
```
Wire into StartIntakeButton (`intake_started`), GoalSelector (`goal_selected`), peptide/stack page mount (`product_viewed`), comparison view (`comparison_viewed`), community email capture (`ebook_requested`).

### Phase 10 — Build + QA + deploy
1. `npm run build` from /home/user/workspace/nexphoria-site — fix all TS errors
2. Smoke test every route via curl through the dev server
3. Restart server with `pplx-tool start_server` (port 5000, NODE_ENV=production, dist/index.cjs)
4. Take Playwright screenshots via js_repl of every key route at 1440x900 — verify layout
5. Mobile pass: 390x844 screenshots of home + 2 deep pages — verify tap targets
6. `pplx-tool deploy_website` with project_path /home/user/workspace/nexphoria-site/dist/public — share new asset_id

## Server commands
**Build:** `cd /home/user/workspace/nexphoria-site && npm run build`
**Start server (background, port 5000):** `pplx-tool start_server` with `{"command":"NODE_ENV=production PORT=5000 node dist/index.cjs","project_path":"/home/user/workspace/nexphoria-site","port":5000,"log_file":"/tmp/nx-server.log"}`, api_credentials=`["pplx-tool:start_server"]`
**Deploy:** `pplx-tool deploy_website` with `{"project_path":"/home/user/workspace/nexphoria-site/dist/public","site_name":"Nexphoria — Peptide Therapy, Prescribed","entry_point":"index.html","should_validate":true}`, api_credentials=`["pplx-tool:deploy_website"]`

## CRITICAL constraints
- Preview iframe blocks localStorage / sessionStorage / indexedDB. Use in-memory React state only.
- Email capture: keep it in-memory but mark with `data-future-endpoint="POST /api/community/ebook"` so it's wireable.
- No external CDN images. All assets must be in `client/src/assets/` or `client/public/`.
- framer-motion already installed — use it for motion.
- wouter for routing — add new routes in App.tsx.
- Tailwind already configured with brand tokens. Don't add new design tokens.
- shadcn/ui primitives available — prefer them for buttons/cards/dialogs.

## Quality bar
- Every page passes a senior UI-UX review: rhythm, hierarchy, breathing room, one editorial italic moment, never two competing displays, never crowded.
- Every animation respects `prefers-reduced-motion`.
- Mobile is not an afterthought — every section has a defined mobile state.
- Type doesn't break or wrap awkwardly anywhere.
- The Find Your Focus moment is the unmistakable showstopper.
