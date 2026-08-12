# Nexphoria Site — Performance / SEO / Accessibility Audit
**Date:** 2026-07-03  
**Branch:** design/azure  
**Build:** Vite + React SPA (hash routing)  

Severity legend: 🔴 Critical · 🟡 High · 🟠 Medium · 🟢 Low / Info

---

## 1. Bundle Analysis

### Build output summary

| Chunk | Raw | Gzip | Status |
|---|---|---|---|
| `Bloodwork-7IWkyU51.js` | **438.97 kB** | 121.20 kB | 🔴 2.2× over threshold |
| `index-D95xFhva.js` (main) | **271.25 kB** | 83.13 kB | 🟡 Over 200 kB |
| `react-pGyMA_Ab.js` | 134.07 kB | 43.07 kB | 🟢 Expected |
| `motion-DvLbs3Nz.js` | 120.35 kB | 40.16 kB | 🟡 Eagerly loaded (see below) |
| `Checkout-KxEqjcXC.js` | 106.87 kB | 29.49 kB | 🟠 Lazy, but large |
| `Science-c61L7rsf.js` | 75.50 kB | 20.76 kB | 🟢 Lazy, fine |
| `Assessment-DXCYmQtz.js` | 51.61 kB | 13.65 kB | 🟢 Fine |

### Findings

#### 🔴 CRIT-01 — `Bloodwork.tsx` compiles to 438 kB
`client/src/pages/Bloodwork.tsx` (1279 lines) is the largest page by far. At 438 kB raw / 121 kB gzip this is the single worst first-load hit for any user landing on `/bloodwork`. Root causes:
- Massive inline JSX with duplicated Lucide icons (`HeartPulse, Flame, Activity, Brain, Gauge, Droplets, Filter, Shield, Apple, TestTube, Hourglass`) — each lazy chunk bundles its own copies of shared icons because there is no shared `ui` manual chunk
- All inline data, copy strings, FAQ arrays compiled directly into the page component
- No sub-component splitting (the two full page "variants" — grid and list — live in one file)

**Fix:** Extract the inline biomarker/FAQ data to a separate `data/bloodworkContent.ts` so it can be tree-shaken separately. Split the page into `BloodworkGrid` and `BloodworkHero` sub-components loaded via a single `lazy()` boundary. Add a `lucide` manual chunk in `vite.config.ts`:
```ts
manualChunks: {
  react: ["react", "react-dom"],
  motion: ["framer-motion"],
  router: ["wouter"],
  lucide: ["lucide-react"],   // ← ADD THIS
},
```

#### 🟡 HIGH-01 — framer-motion eagerly loaded despite separate manual chunk
`App.tsx` eagerly imports `Home`, `WomenHome`, `MenHome`. `Home.tsx` imports `AnimatedCounter` which imports `{ useInView, motion, animate } from "framer-motion"` (`client/src/components/AnimatedCounter.tsx:2`). Because of this eager import chain, the `motion-DvLbs3Nz.js` chunk (120 kB / 40 kB gzip) is fetched synchronously alongside the main bundle.

First-paint effective blocking payload:  
`index.js` (271 kB) + `motion.js` (120 kB) + `react.js` (134 kB) = **525 kB raw before first render.**

**Fix:** Convert `AnimatedCounter` to a lazy-loaded component, or replace its `framer-motion` dependency with a lightweight `requestAnimationFrame`-based counter (no external dep needed for a simple counter animation).

#### 🟡 HIGH-02 — main `index.js` bundle over 200 kB
The three eagerly-loaded pages (Home 2321 lines, WomenHome, MenHome) plus all shared components (Nav, Footer, AnnouncementBar, TrustBar, etc.) inflate the main chunk to 271 kB. No shared-components chunk exists.

**Fix:** Add `components` to `manualChunks` to hoist shared heavy components:
```ts
manualChunks: {
  components: [
    "@/components/Nav",
    "@/components/Footer",
    "@/components/SiteLayout",
  ],
  lucide: ["lucide-react"],
},
```
Also consider making `MenHome` and `WomenHome` lazy — they are only needed after the gate choice.

#### 🟠 MED-01 — `Checkout.tsx` at 106 kB gzip 29 kB
Checkout is lazy-loaded so this only affects that route. Still worth reviewing for duplicate icon / component bundling once a `lucide` chunk is added.

#### 🟢 INFO-01 — Code-splitting coverage is good
26 of 29 user-facing pages use `React.lazy()` + `Suspense`. The `LoadingScreen` fallback exists. Only Home/WomenHome/MenHome are eager — intentional for the gate UX.

---

## 2. SEO Audit

### 2a. Meta tags — `client/index.html`

| Tag | Present | Notes |
|---|---|---|
| `<title>` | ✅ | Good length |
| `meta description` | ✅ | 155 chars, on-spec |
| `og:type` | ✅ | `website` |
| `og:title` | ✅ | |
| `og:description` | ✅ | |
| `og:url` | ⚠️ | Points to GitHub Pages subdomain |
| `og:image` | ✅ | Absolute URL |
| `og:image:width / height` | ✅ | 1200×630 |
| `og:image:alt` | ❌ | Missing |
| `og:locale` | ❌ | Missing |
| `og:site_name` | ✅ | |
| `twitter:card` | ✅ | `summary_large_image` |
| `twitter:title / description / image` | ✅ | |
| `twitter:site` | ❌ | Missing (no @handle set) |
| `canonical` | ⚠️ | Points to GitHub Pages (`chyosopo.github.io`) |
| `hreflang en-US` | ✅ | Also GH Pages URL |
| `robots` | ✅ | `index, follow, max-image-preview:large` |

#### 🔴 CRIT-02 — Canonical and all OG URLs point to GitHub Pages
`client/index.html` line 17: `<link rel="canonical" href="https://chyosopo.github.io/nexphoria-site/" />`  
`seo.ts` line 11: `const BASE_URL = "https://chyosopo.github.io/nexphoria-site";`

Every dynamic canonical, og:url, og:image, and structured-data URL built by `useSeo()` and every JSON-LD `url` field will resolve to the GitHub Pages subdomain — not `nexphoria.com`. When the production domain goes live, Google will index the wrong canonical origin, splitting link equity.

**Fix:** Change `BASE_URL` in `client/src/lib/seo.ts` to `https://nexphoria.com` and update `index.html`. The sitemap comment already says "one sed" — treat this as a pre-launch blocking item.

#### 🟡 HIGH-03 — `sitemap.xml` uses hash fragment URLs
`client/public/sitemap.xml` — all 90+ entries use `/#/route` fragment URLs. Google officially ignores the hash fragment and will only index the bare `https://…/` URL from all entries. The sitemap is effectively inert until path routing is implemented.

The sitemap comment acknowledges this, but it should be noted that this means **zero organic traffic benefit** until path routing lands.

#### 🟠 MED-02 — Missing `og:image:alt` and `og:locale`
`client/index.html`:
```html
<!-- Add these two -->
<meta property="og:image:alt" content="Nexphoria — Physician-Led Peptide Protocols" />
<meta property="og:locale" content="en_US" />
```

#### 🟠 MED-03 — Missing `twitter:site`
No Twitter/X account handle set. Once the brand has one, add:
```html
<meta name="twitter:site" content="@nexphoria" />
```

#### 🟢 INFO-02 — JSON-LD coverage is excellent
All major page types have structured data via `useSeo({ jsonLd: […] })`:
- Home: Organization + MedicalBusiness + WebPage + FAQPage ✅
- SoloPDP: Drug + Product + WebPage + BreadcrumbList ✅
- StackPage: Product + WebPage + BreadcrumbList ✅
- FAQ, Science, Pricing, Bloodwork: FAQPage ✅
- HowItWorks: HowTo ✅
- JournalArticle: WebPage ✅
- Physicians, About, Community, Contact: WebPage ✅

#### 🟢 INFO-03 — `useSEO.ts` (legacy hook) still present
`client/src/lib/useSEO.ts` — a lighter earlier version that only updates title/description/og. No pages use it anymore (all use the full `useSeo` from `seo.ts`). Safe to delete to reduce confusion.

#### 🟢 INFO-04 — `robots.txt` is comprehensive and AI-crawler-friendly
Explicitly whitelists GPTBot, Perplexity, ClaudeBot, Google-Extended, etc. ✅

---

## 3. Accessibility

### 3a. ARIA Landmarks & Navigation

| Check | Status | Notes |
|---|---|---|
| Skip-to-content link | ✅ | `SiteLayout.tsx:62` — sr-only, focus-visible styled correctly |
| `<main id="main-content">` | ✅ | `SiteLayout.tsx:69` |
| `<header>` element | ✅ | `Nav.tsx:149` |
| `<nav aria-label="Primary">` | ✅ | `Nav.tsx:168` |
| `<footer>` element | ✅ | Footer component |
| `aria-expanded` on hamburger | ✅ | `Nav.tsx:234` |
| `aria-haspopup` on mega-menu trigger | ✅ | `Nav.tsx:194` |
| `aria-hidden` on decorative icons/arrows | ✅ | Throughout Nav.tsx |

### 3b. Color Contrast

#### 🟡 HIGH-04 — `--nx-fg-muted` fails WCAG AA for body text
`client/src/index.css` lines 71–72 (light theme):
- `--nx-fg-muted: #7288A0` on `--nx-bg: #E9EFF5`
- Estimated contrast ratio: **~3.58:1** — fails AA for normal-sized text (requires 4.5:1)
- Passes for large text (≥18pt or ≥14pt bold, requires 3:1)

This token is used for "tertiary / captions" per the comment, so usage on small caption text is the concern. Any `--nx-fg-muted` text under 18px at normal weight fails AA.

**Fix:** Darken `--nx-fg-muted` to approximately `#5A7490` which achieves ~4.5:1 on the cream background.

#### 🔴 CRIT-03 — Women world `--nx-fg-muted` fails WCAG for all text sizes
`client/src/index.css` `[data-world="women"]` block:
- `--nx-fg-muted: #A18F97` on `--nx-bg: #FAF4F7`
- Estimated contrast ratio: **~2.86:1** — fails WCAG AA for normal AND large text

**Fix:** Darken to approximately `#7A5F6A` to achieve 4.5:1.

#### 🟢 INFO-05 — Primary/accent colors pass contrast
- `--nx-fg: #16283E` on `--nx-bg: #E9EFF5` → >10:1 ✅
- `--nx-cobalt: #2E5877` on `--nx-bg: #E9EFF5` → ~6.2:1 ✅ (AA pass)
- `.nx-italic-accent` hard-coded `#1F5FD0` on cream → ~5.2:1 ✅

### 3c. Font Sizes

#### 🟡 HIGH-05 — Sub-12px font sizes on Physicians page
`client/src/pages/Physicians.tsx` ~lines 794–802:
```jsx
font-size: "9px"   // specialty · institution label
font-size: "8px"   // credentials line
```
8px and 9px text is unreadable for many users and fails WCAG SC 1.4.4 (resize text). These are physician specialty/credentials — important trust signals being rendered illegibly.

**Fix:** Minimum 11px (ideally 12px / `var(--nx-t-xs)`) for any rendered text.

### 3d. Forms

#### 🟢 INFO-06 — Form labels correctly associated
- `Contact.tsx`: all fields use `htmlFor` matching `id` attributes ✅
- `Assessment.tsx`: all contact fields use `htmlFor` / `id` pairs ✅
- Assessment multi-choice options use `<label>` wrapping `<input type="radio">` ✅

#### 🟠 MED-04 — No `aria-live` / `role="alert"` on form validation
Neither `Contact.tsx` nor `Assessment.tsx` announce validation errors to screen readers. The validation state updates visually but there is no `aria-live="polite"` region or `role="alert"` for error messages.

**Fix:** Add an `aria-live="polite"` container for non-blocking feedback, or `role="alert"` for blocking errors.

#### 🟠 MED-05 — `.nx-input:focus` suppresses outline without `:focus-visible` guard
`client/src/index.css:663–665`:
```css
.nx-input:focus {
  outline: none;   /* ← removes focus ring for ALL focus events */
  box-shadow: 0 0 0 1px var(--nx-cobalt);
}
```
The global `:focus-visible` ring at line 1276 is correct, but `.nx-input:focus` unconditionally removes `outline` without checking `:focus-visible`. The box-shadow replacement is a reasonable visual substitute but is overriding the global policy inconsistently.

**Fix:**
```css
.nx-input:focus-visible {
  outline: none;
  box-shadow: 0 0 0 2px var(--nx-cobalt);
}
.nx-input:focus:not(:focus-visible) {
  outline: none;
  box-shadow: none;
}
```

### 3e. Images & Alt Text

#### 🟢 INFO-07 — Alt text strategy is correct
- Decorative/background images: `alt="" aria-hidden` ✅
- Content images: descriptive alt text ✅  
  - `Physicians.tsx:54`: `"Board-certified physician reviewing a 38-biomarker peptide lab panel before prescribing"` — excellent
  - `Science.tsx:846`: `"Physician protocol binder with anatomical diagrams and peptide research notes"` ✅
- `SignatureTile.tsx:153` receives alt from parent via prop ✅

#### 🟠 MED-06 — Hero `<img>` in `HowItWorks.tsx:105` has `alt="" aria-hidden` despite being the hero image
The hero background image on `/how-it-works` is `alt="" aria-hidden`. If it is purely decorative (overlaid with heading text) this is acceptable — but the text overlay should be verified as a proper `<h1>`.

### 3f. Keyboard Navigation

#### 🟢 INFO-08 — Focus-visible ring implemented globally
`client/src/index.css:1276`:
```css
:where(a, button, input, select, textarea, [role="button"], [tabindex]):focus-visible {
  outline: 2px solid var(--nx-cobalt);
}
```
Solid implementation. ✅

#### 🟠 MED-07 — Mega-menu keyboard navigation not fully implemented
`Nav.tsx` sets `aria-haspopup` and `aria-expanded` on the trigger button but the mega-menu panel itself has no `role="dialog"` or keyboard trap. Tab moves focus into/through the mega-menu items correctly because they are in DOM order, but **Escape to close** is not handled.

Review `Nav.tsx` around line 194: `onMouseEnter`/`onMouseLeave` control open state; no `onKeyDown` handler for Escape.

---

## 4. Performance Patterns

### 4a. Re-renders / Memoization

#### 🟠 MED-08 — No `React.memo` on high-frequency card components
Card components rendered in long lists (`VialTile`, `BenefitTile`, `BiomarkerCard`, `StackCard`) have no `React.memo` wrapping. In pages like Bloodwork or PeptidesCatalog where 20+ cards render, parent state changes (e.g. filter toggle) re-render all cards.

- `client/src/components/VialTile.tsx` — no memo
- `client/src/components/BiomarkerCard.tsx` — no memo
- `client/src/components/StackCard.tsx` — no memo

Context-triggered re-renders (CartProvider state) will ripple to all mounted list cards on every cart mutation.

**Fix:** Wrap with `React.memo` and ensure props are stable (primitives or memoized objects).

#### 🟢 INFO-09 — CartProvider, ProtocolConfigurator, BuildYourStack use `useMemo`/`useCallback` correctly
`CartProvider.tsx:58–107` — all mutation handlers wrapped in `useCallback` with correct dep arrays. `useMemo` for derived cart state. ✅

#### 🟢 INFO-10 — `Reveal` component properly manages `will-change`
`Reveal.tsx:18-22`: `will-change: transform` is set during animation and cleared via `onTransitionEnd` once settled. Prevents permanent GPU layer promotion. Excellent pattern. ✅

### 4b. Image Optimization

#### 🟠 MED-09 — Most `<img>` tags in `Home.tsx` lack `width`/`height` attributes
Without explicit `width` and `height`, the browser cannot reserve layout space before the image loads → **Cumulative Layout Shift (CLS)**.

Affected lines in `client/src/pages/Home.tsx`:
- Line 499: tile images in goal grid — no width/height
- Lines 791, 1032, 1120, 1299, 1492, 1725: editorial/section images — no width/height

Compare to `HowItWorks.tsx:105` which correctly has `width={2048} height={1360}` — apply this pattern everywhere.

#### 🟢 INFO-11 — WebP format used throughout
All brand images have `.webp` variants and source code imports `.webp` files directly ✅

#### 🟢 INFO-12 — `loading="lazy"` applied correctly
All below-fold images use `loading="lazy"`. Above-fold/hero images use `loading="eager"` or `fetchPriority="high"` ✅

#### 🟢 INFO-13 — `<picture>` / `srcset` used in `SignatureTile`
`SignatureTile.tsx:59-62` uses `<picture>` with responsive `srcSet` for mobile/desktop. Isolated usage — other high-impact images could benefit similarly.

### 4c. CSS Performance

#### 🟡 HIGH-06 — `backdrop-filter: blur()` on multiple non-scrolled elements
`client/src/index.css` usage:
- Line 792: `backdrop-filter: blur(14px) saturate(1.1)` — nav bar (gated to scrolled + md, good ✅)
- Line 1089: `backdrop-filter: blur(14px)` — `.nx-buy-bar` 
- Line 1108: `backdrop-filter: blur(8px)` — card hover state
- Line 1229: `backdrop-filter: blur(14px) saturate(1.35)` — `.nx-frosted`

`backdrop-filter` forces compositing for every element using it. On mobile GPUs this causes scroll jank. The nav correctly gates it to desktop-scrolled; the buy bar and frosted cards apply it unconditionally.

**Fix:** Gate heavy blur to `@media (min-width: 768px)` or replace with a semi-opaque solid background on mobile.

#### 🟠 MED-10 — `filter: blur(72px)` on `.nx-aurora i` — expensive CSS filter
`client/src/index.css:1220`:
```css
.nx-aurora i { filter: blur(72px); will-change: transform; }
```
Large blur radius on an element that animates. While `will-change: transform` promotes it to GPU, `filter: blur(72px)` still forces a rasterization pass. On mid-range phones this can drop below 60fps.

**Fix:** Use a static pre-blurred PNG/webp for aurora glows, or reduce blur radius and clamp to `@media (prefers-reduced-motion: no-preference)`.

#### 🟢 INFO-14 — `box-shadow` transitions on hover are acceptable
`.nx-glass-card` transitions `transform` and `box-shadow` on hover. Box-shadow doesn't trigger layout, only paint. With GPU compositing from `will-change: transform`, paint happens off-main-thread on Chromium. Acceptable. ✅

#### 🟢 INFO-15 — `prefers-reduced-motion` fully honored
11 `@media (prefers-reduced-motion: reduce)` blocks in index.css. `Reveal.tsx` checks `window.matchMedia("(prefers-reduced-motion: reduce)")`. framer-motion's `useReducedMotion()` used in `EasterEgg`, `FindYourFocusSection`, `Assessment`. ✅

### 4d. Video

#### 🟠 MED-11 — Hero video in `Home.tsx` — check `preload` attribute
`Home.tsx:14-15` defines:
```ts
const heroVideo  = "img/img_2724ef984ae9.mp4";
const heroPoster = "img/img_beb6d78848a2.webp";
```
Unable to confirm the `<video>` tag itself in the search (the tag must be buried in JSX). Ensure it has `preload="none"` (or `"metadata"` at most) and `poster={heroPoster}` to prevent auto-downloading a large video on page load. If autoplay, must also have `muted playsinline` for mobile.

---

## 5. Mobile Responsiveness

### 5a. Viewport & Overflow

| Check | Status |
|---|---|
| `viewport` meta with `initial-scale=1.0, maximum-scale=5` | ✅ |
| `overflow-x: hidden` on `html` and `body` | ✅ `index.css:176,190` |
| `overflow-x: clip` on `body` (belt-and-suspenders) | ✅ `index.css:1114` |
| `max-width: 100vw` on body | ✅ |

#### 🟢 INFO-16 — Horizontal overflow risk is well-mitigated
Both `overflow-x: hidden` and `overflow-x: clip` applied. `clip` is the stronger choice (doesn't create scroll containers). ✅

### 5b. Breakpoints

CSS defines explicit breakpoints at **640px**, **720px**, **768px**, and **1024px** in index.css. Most responsive behavior is handled via Tailwind's inline `sm:` / `md:` / `lg:` / `xl:` utilities in component JSX.

#### 🟢 INFO-17 — Breakpoint coverage adequate for current design
Standard mobile-first responsive approach. No gaps identified in the breakpoint ladder for the current layout.

### 5c. Touch Target Sizes

#### 🟠 MED-12 — Some buttons approach but do not clearly exceed 44px touch target
WCAG 2.5.5 (Level AAA) and Google's Core Web Vitals INP recommendations require 44×44px minimum touch targets.

`.nx-cta-cobalt`: `padding: 0.75rem 1.5rem` + `font-size: 0.9375rem` (15px) with inherited `line-height: 1.5` → total height ≈ **46.5px** — marginally passes.

`.nx-cta-ghost`: same dimensions — marginally passes.

Nav links in desktop mode: `h-14` container (56px) but individual nav link elements may have narrower clickable height depending on inline padding.

**Risk area:** The mobile hamburger button and close button — confirm hit target ≥ 44×44px. `Nav.tsx:233` renders the button but inline sizing wasn't visible in the excerpt.

### 5d. Touch Interaction

#### 🟢 INFO-18 — 300ms tap delay eliminated globally
`client/src/index.css:196-199`:
```css
a, button, [role="button"], input, select, textarea, label, summary {
  touch-action: manipulation;
}
```
This removes the 300ms delay on all interactive elements. ✅

---

## Summary Table

| # | Severity | Category | Issue |
|---|---|---|---|
| CRIT-01 | 🔴 | Bundle | `Bloodwork.tsx` compiles to 438 kB |
| CRIT-02 | 🔴 | SEO | All canonical/OG URLs point to GitHub Pages, not nexphoria.com |
| CRIT-03 | 🔴 | A11y | Women-world `--nx-fg-muted` (#A18F97) contrast 2.86:1 — fails all WCAG text |
| HIGH-01 | 🟡 | Bundle | framer-motion eagerly loaded via AnimatedCounter → Home (+120 kB at first paint) |
| HIGH-02 | 🟡 | Bundle | Main `index.js` 271 kB; no shared-components chunk |
| HIGH-03 | 🟡 | SEO | Sitemap uses hash fragment URLs — inert for search indexing |
| HIGH-04 | 🟡 | A11y | Default `--nx-fg-muted` (#7288A0) contrast 3.58:1 — fails AA for normal text |
| HIGH-05 | 🟡 | A11y | 8px/9px font-size on Physicians page labels |
| HIGH-06 | 🟡 | Perf | `backdrop-filter: blur()` unconditional on mobile (buy bar, frosted cards) |
| MED-01 | 🟠 | Bundle | `Checkout.tsx` 106 kB — duplicate icon bundling |
| MED-02 | 🟠 | SEO | Missing `og:image:alt` and `og:locale` |
| MED-03 | 🟠 | SEO | Missing `twitter:site` handle |
| MED-04 | 🟠 | A11y | No `aria-live`/`role="alert"` on form validation messages |
| MED-05 | 🟠 | A11y | `.nx-input:focus` suppresses outline without `:focus-visible` guard |
| MED-06 | 🟠 | A11y | HowItWorks hero image `alt=""` — verify not content-bearing |
| MED-07 | 🟠 | A11y | Mega-menu missing Escape-key handler |
| MED-08 | 🟠 | Perf | No `React.memo` on list card components (VialTile, BiomarkerCard, StackCard) |
| MED-09 | 🟠 | Perf | Home.tsx `<img>` tags missing `width`/`height` → CLS risk |
| MED-10 | 🟠 | Perf | `.nx-aurora i` filter: blur(72px) on animated element |
| MED-11 | 🟠 | Perf | Hero `<video>` — confirm `preload="none"` and `poster` set |
| MED-12 | 🟠 | Mobile | Touch targets need confirmation ≥44px on Nav mobile buttons |
| LOW-01 | 🟢 | SEO | Legacy `useSEO.ts` dead code — safe to delete |
| LOW-02 | 🟢 | Bundle | `lucide-react` manual chunk would deduplicate icons across lazy pages |

---

## Quick-win Priority Order

1. **CRIT-02**: Update `BASE_URL` in `seo.ts` to `nexphoria.com` — 1-line fix, pre-launch blocker
2. **CRIT-03 + HIGH-04**: Darken both muted color tokens — 2 CSS variable changes
3. **HIGH-05**: Replace 8px/9px font sizes in Physicians.tsx — 2-line change
4. **CRIT-01 + HIGH-01**: Add `lucide` manual chunk + make `AnimatedCounter` lazy — ~10 line change
5. **MED-09**: Add `width`/`height` to Home.tsx img tags — systematic but fast
6. **MED-04**: Add `aria-live="polite"` error region to Contact and Assessment forms
7. **MED-02**: Add `og:image:alt` and `og:locale` to `index.html` — 2 lines
8. **HIGH-06**: Gate `backdrop-filter` to desktop in `.nx-buy-bar` and `.nx-frosted`
