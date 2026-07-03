# ENTERPRISE AUDIT — Nexphoria Site → Hims-Tier Polish
**Date:** 2026-07-03  
**Auditors:** 3× parallel subagents (code, perf/SEO/a11y, UX/design) + Atlas synthesis  
**Benchmark:** hims.com, ro.co, Noom, Function Health  
**Branch:** `design/azure`

---

## EXECUTIVE SUMMARY

The site is **well past prototype** — coherent design system, strong information architecture, 40+ component library, good JSON-LD coverage, and solid motion work. But enterprise-grade means zero tolerance for the gaps below. Three findings are **launch blockers**. The rest separates "nice startup site" from "hims.com-tier."

**Scores by page (1=prototype, 5=enterprise):**

| Page | Score | Gap |
|------|-------|-----|
| Home | 4.5 | Social proof, PressStrip not wired |
| MenHome / WomenHome | 4.0 | Thin — mostly a WorldHome wrapper |
| StackPage (PDPs) | 4.0 | Missing reviews, comparison |
| SoloPDP | 3.5 | Thin content, no reviews |
| Bloodwork | 4.0 | 438KB bundle, raw fonts throughout |
| Science | 3.5 | Font aliases broken, raw hex |
| Assessment | 4.0 | Good flow, needs inline validation UX |
| BuildYourStack | 3.5 | No URL sync, keyboard gaps |
| Pricing | 4.0 | Hardcoded prices |
| Physicians | 4.0 | Good trust, 8px font bug |
| HowItWorks | 3.5 | Content-thin vs. hims |
| FAQ | 4.0 | Solid |
| LabTesting | 3.5 | Hardcoded prices, color-only status |
| Checkout | 2.0 | 🔴 Payment facade — no Stripe |
| Community | 2.0 | Entirely mocked |
| Journal | 3.5 | Articles good, share UX raw |
| About | 3.5 | Placeholder-ish |
| Contact | 4.0 | Clean |
| 404 | 3.5 | Works, bare |

---

## 🔴 LAUNCH BLOCKERS (P0 — fix before any public user sees this)

### 1. Checkout.tsx — Payment is a facade
Card fields are plain `<input type="text">`. No Stripe Elements, no tokenization, no payment capture. The "Submit" creates a DB row with no payment attached. Copy claims "256-bit encryption, PCI-DSS compliant" — that's false for an HTML text input.  
**Fix:** Wire Stripe Elements or remove the page behind a "coming soon" gate. This is the single most critical finding.

### 2. Science.tsx — Font aliases semantically inverted
```typescript
const MONO = "'General Sans', system-ui, sans-serif";  // ← this is SANS
const SERIF = "'General Sans', system-ui, sans-serif"; // ← this is SANS  
const SANS = "'Inter', sans-serif";                    // ← Inter not loaded
```
Any future refactor using these by name will silently break.  
**Fix:** Delete all three dead constants. The file already imports `F` from typography.ts.

### 3. Sitewide — Zero focus-visible rings on interactive elements
Only 3 files use `focus:` or `focus-visible:` Tailwind utilities. Every button, card, tab, drawer, and accordion fails WCAG 2.4.7 (visible focus). A global `:focus-visible` rule exists in `index.css:1276` but is overridden by component-level `outline: none` in multiple places.  
**Fix:** Audit and remove all `outline: none` / `focus:outline-none` that suppress the global ring. Add `focus-visible:ring-2 focus-visible:ring-[var(--nx-cobalt)]` to all interactive Tailwind classes.

---

## 🟠 P1 — HIGH IMPACT (do before soft launch)

### 4. ProtocolConfigurator.tsx — Parallel color system
Ships its own `DARK_THEME`, `AZURE_THEME`, `WOMEN_THEME` objects with 15+ raw hex values that bypass `--nx-*` tokens entirely. This is the most-rendered conversion component on the site. Token updates won't propagate here.  
**Fix:** Replace all hex values with `var(--nx-*)` references.

### 5. Women-world contrast failure (WCAG)
`--nx-fg-muted: #A18F97` on `--nx-bg: #FAF4F7` = **2.86:1** — fails WCAG AA for ALL text sizes.  
Default `--nx-fg-muted: #7288A0` on `--nx-bg: #E9EFF5` = **3.58:1** — fails for normal text.  
**Fix:** Darken to `#7A5F6A` (women) and `#5A7490` (default). Two CSS variable changes.

### 6. Bloodwork.tsx — 438KB bundle + 30+ raw fontSize values
Largest chunk by 2×. Inline biomarker data, duplicate Lucide icons, zero sub-component splitting.  
**Fix:** Extract data to `bloodworkContent.ts`, split into sub-components, add `lucide` manual chunk to vite.config.ts. Also tokenize the 30+ raw fontSize values.

### 7. Hardcoded prices in 12+ locations
`Home.tsx` ("from $349/mo"), `Gate.tsx` (5× prices), `LabTesting.tsx` (5× prices), `Pricing.tsx` (FAQ + comparison), `ThreeTierMenu.tsx` ("from $149/mo"). Only PDPs correctly use `getPrice()`.  
**Fix:** Wire all to `getPrice()` from pricing data module.

### 8. framer-motion eagerly loaded (120KB at first paint)
`Home.tsx` → `AnimatedCounter` → `framer-motion`. First-paint blocking: 525KB (index 271 + motion 120 + react 134).  
**Fix:** Lazy-load AnimatedCounter or replace with lightweight `requestAnimationFrame` counter.

### 9. Nav mega-menu keyboard navigation
No Escape handler to close. Tab doesn't cycle through menu items in open state. `aria-haspopup` set but no focus trap.  
**Fix:** Add `onKeyDown` handler for Escape, implement arrow-key navigation within menu.

### 10. ExitIntentModal — no focus trap, input removes focus indicator
`focus:outline-none` on the primary conversion input with no replacement. No focus trap inside the dialog.  
**Fix:** Add focus trap (focus-trap-react or manual), restore focus-visible ring.

### 11. Canonical URLs point to GitHub Pages
`seo.ts:11` → `BASE_URL = "https://chyosopo.github.io/nexphoria-site"`. All canonical, og:url, and JSON-LD URLs resolve to GitHub Pages. Google will index the wrong origin.  
**Fix:** Change to `https://nexphoria.com` (1 line) — pre-launch blocker.

---

## 🟡 P2 — MEDIUM (enterprise polish)

### 12. 395 inline fontFamily declarations
Every text element declares its own font. Should be base CSS classes (`.nx-sans`, `.nx-serif`).

### 13. JetBrains Mono referenced but never loaded
`CartDrawer`, `BenefitTile`, `FamilyOutcomesViz` reference it. Falls back silently. Remove or load.

### 14. Community.tsx — entirely mocked
Fake forum threads, fake timestamps, fake member guide. Gate it or wire to real data.

### 15. backdrop-filter: blur() unconditional on mobile
`.nx-buy-bar` and `.nx-frosted` apply blur on all devices. Causes scroll jank on mid-range phones.  
**Fix:** Gate to `@media (min-width: 768px)`.

### 16. Home.tsx img tags missing width/height → CLS risk
7+ images in Home.tsx have no explicit dimensions. Browser can't reserve layout space.

### 17. No React.memo on list card components
`VialTile`, `BiomarkerCard`, `StackCard` — cart mutations re-render all mounted list cards.

### 18. Bloodwork tab panel accessibility
`role="tab"` + `aria-selected` correct, but missing `aria-controls` / `id` pairing.

### 19. MolecularGlyph.tsx — `fill="#000"` on SVG text
Will disappear on dark backgrounds. Use `fill="currentColor"`.

### 20. DiscordCTAStrip.tsx — `focus:border-blue-500`
Tailwind default blue, not brand cobalt. Use `var(--nx-cobalt)`.

### 21. Physicians.tsx — 8px/9px font sizes
Specialty and credential labels rendered at illegible sizes. Minimum `var(--nx-t-xs)` (12px).

### 22. Form validation not announced to screen readers
Contact and Assessment forms update visually but no `aria-live` / `role="alert"`.

### 23. Missing og:image:alt and og:locale in index.html
Two-line fix.

### 24. Component-level color maps need centralization
VialTile (12 colors), SignatureTile (6 theme sets), GoalVialTile (16 colors), BenefitTile (10+ hex) — all should live in a token map file.

---

## 🟢 P3 — NICE TO HAVE

### 25. Delete legacy `useSEO.ts` — dead code
### 26. not-found.tsx — use `F` from typography instead of inline string
### 27. Logo.tsx — `#FFFFFF` → `var(--nx-ceramic)`
### 28. ThreeTierMenu.tsx — "16 peptides" count should derive from catalog length
### 29. Science.tsx — raw hex on dark section backgrounds → `var(--nx-bg-dark)`

---

## 🚀 HIMS-TIER GAPS (UX/Design — beyond code)

These are the things that separate the current site from hims.com caliber:

### A. Zero social proof anywhere
No customer testimonials, no review counts, no star ratings, no before/after stories. `PressStrip` component exists but isn't wired to any page. Hims leads with "+2M members" and 5-star review carousels.  
**Fix:** Wire PressStrip to Home + PDPs. Create a testimonial carousel component (honest pre-launch framing, no fake reviews). Add animated stat counters to hero.

### B. No announcement bar on most pages
`PromoBar` exists and renders on Home — verify it shows on all routes.

### C. Missing "physician decides" guarantee badge near CTAs
Hims puts a trust badge directly adjacent to every CTA button. Nexphoria has the copy but not the persistent visual badge.  
**Fix:** Create a `TrustBadge` component ("Licensed physicians · You only pay if prescribed") and render it below every primary CTA.

### D. No customer journey after Assessment
Assessment → what? The post-assessment experience isn't visible. Hims shows an outcome page with recommended product + price + "Start consultation" + physician-review badge.

### E. Content-thin secondary pages
About, HowItWorks, Community, Contact are functional but lack the editorial depth of hims equivalents. Hims fills these with team photos, company story, clinical partnerships, and detailed process breakdowns.

### F. No video content
Hims and Ro use video testimonials, product explanations, and physician introductions. Zero video on Nexphoria beyond the Home hero.

### G. No comparison tables on PDPs
Hims PDPs show "Why choose us over [competitor]" comparison tables. Would reinforce positioning.

### H. Missing FAQ depth on PDPs
Category and PDP pages need product-specific FAQs, not just global FAQs.

---

## EXECUTION PLAN — 5 PHASES

### Phase 1: Launch Blockers (P0) — ~4 hours
1. Gate or fix Checkout.tsx payment facade
2. Delete dead font constants in Science.tsx
3. Fix sitewide focus-visible suppression
4. Update BASE_URL in seo.ts

### Phase 2: High Impact (P1) — ~8 hours
5. ProtocolConfigurator token migration
6. Fix both muted contrast tokens
7. Bloodwork bundle split + font tokenization
8. Wire all hardcoded prices to getPrice()
9. Lazy-load framer-motion / AnimatedCounter
10. Nav keyboard navigation + Escape handler
11. ExitIntentModal focus trap + ring

### Phase 3: Enterprise Polish (P2) — ~6 hours
12. fontFamily consolidation to CSS classes
13. Remove JetBrains Mono dead refs
14. Gate Community.tsx behind "coming soon"
15. Mobile backdrop-filter gating
16. img width/height for CLS
17. React.memo on card components
18. Bloodwork aria-controls
19. MolecularGlyph fill fix
20. Form a11y (aria-live)
21. og:image:alt + og:locale

### Phase 4: Trust & Conversion (UX gaps) — ~10 hours
A. Wire PressStrip + build testimonial carousel
B. TrustBadge near every CTA
C. Post-assessment outcome page
D. Deepen About, HowItWorks, Community content
E. PDP comparison tables + product-specific FAQs

### Phase 5: Performance & SEO Final — ~4 hours
- vite.config.ts manual chunks (lucide, components)
- Lazy-load MenHome/WomenHome
- Color map centralization
- Dead code cleanup
- Final Lighthouse audit

**Total estimated: ~32 hours of focused execution.**

---

*This is a shrinking punch list. Never "done."*
