# Verifier Report — Round 1

**Audited:** 2026-07-02  
**Build:** Production build served via Express, localhost:5000  
**Tool:** Playwright 1.49.0, full-page screenshots at 1280px and 375px  

---

## Summary

- Total routes audited: 22 (20 live + /privacy + /terms which 404 by design, see note)
- Total issues found: 21
- Critical (must fix): 9
- Minor (should fix): 12

---

## Findings by Route

### / (home)
- [MINOR] `components/BenefitTile.tsx:22` — `dark` and `ember` tone variants use hardcoded `#E28A3D` for eyebrow color. This orange is not in the token system (`--nx-amber` is `#8B5A2B`). Visually close but off-token. Affects any BenefitTile with `tone="dark"` or `tone="ember"` rendered on this page.
- Desktop and mobile both render cleanly. No overflow, no squishing. Hero typography and layout are strong.

### /peptides
- [MINOR] Mobile: VialTile grid renders at 1-column on 375px — reasonable, but the "NOT SURE WHERE TO START?" last tile with the assessment CTA renders full-width with slightly disproportionate padding vs the product tiles. Not broken, just slightly inconsistent spacing.
- No kill words. No italics. No broken images.

### /peptides/tirzepatide (sample PDP — uses `PeptideDetail.tsx`)
- No italic usage. No kill words. No broken images. Desktop and mobile both clean.
- [MINOR] Mobile hero: discount badge (`-14%`) and the product name/hero image read clearly; the right-side add-to-cart sticky panel reflows correctly to below the hero. Looks good.

### /stacks
- [MINOR] Stack portraits (Wolverine, Glow, Restore, Clarity) all render with strong photography. However `Primo` and `Balance` stacks use the same athletic male portrait as Wolverine/Restore — no visual differentiation between protocols that have different goals. Not a code bug, but a content/imagery gap that could confuse users comparing stacks.
- Mobile renders cleanly. No overflow.

### /stacks/wolverine (sample stack)
- No kill words. No italics. No broken images.
- Desktop and mobile both clean. The protocol compound table, biomarker chart, and comparison section all render correctly.
- [MINOR] `lib/protocols.ts:303` — `protocolItalicHeadline` field stores a string called `"italic"` (value: `"nothing happened"`). In `StackReveal.tsx:308` this renders as `<span className="text-primary">nothing happened</span>` — NOT italic font style, just accent color. Harmless but the field name `italic` is misleading and the data file has 5 entries using this pattern. Consider renaming field to `accent` in `lib/protocols.ts:298,303,365,370,432,437,499,504,566,571`.

### /how-it-works
- No kill words. No italics. No broken images.
- Desktop and mobile both clean. 4-step process, doctor strip, cold-chain section all render clearly.
- [MINOR] The `mdPhoto` image at line 491 (`HowItWorks.tsx`) shows "Dr. Sarah Chen" — this physician name does not appear in the actual physician team on `/physicians`. Potential factual inconsistency if this is meant to represent a real team member.

### /pricing
- No kill words. No italics.
- [CRITICAL] `Pricing.tsx:70` — `badge: "BEST VALUE"` renders uppercase in the pricing card for the 12-Month plan. By the ALL-CAPS eyebrow standard, badge labels should follow lowercase conventions unless they are product names/wordmarks. Same applies to `"MOST POPULAR"` in `PricingTiers.tsx:22`. These are marketing labels, not product names. Flag for lowercase fix.
- Desktop and mobile clean. Comparison table renders correctly on both viewports.

### /bloodwork
- No kill words. No italics. No broken images.
- Desktop and mobile clean. Dashboard mockup, biomarker section render correctly.
- [MINOR] `components/BloodworkDashboard.tsx:218` — table headers `["BIOMARKER", "VALUE", "REF RANGE", "TREND"]` rendered as all-caps hardcoded strings. These are functional UI labels on a data dashboard (analogous to spreadsheet column headers), so uppercase is arguably intentional. Flag as borderline — could be lowercase with CSS `text-transform: uppercase`.

### /about
- No kill words. No italics (per source comment: `About.tsx:19` — "General Sans throughout. No italics. No serif.").
- Desktop and mobile clean.
- [MINOR] The "Precision medicine is not a marketing category" pull-quote renders as a large blockquote on a cream background with a border. Looks solid. No issues.

### /science
- No kill words. No italics.
- [CRITICAL] **Off-brand color palette on hero and evidence sections.** `Science.tsx:894` — hero uses `linear-gradient(135deg, #08101E, #0F1B32, #16264A)` (dark navy blue) instead of the token `--nx-bg-dark: #0A0A0A` (pure black). The same navy gradient is used on `/physicians` (`Physicians.tsx:478`) and `/men` (`MenHome.tsx:180`). The brand token system defines dark sections as pure black (#0A0A0A), not navy. This creates a visual inconsistency between dark-mode sections across pages.
- [CRITICAL] `Science.tsx:961,968,997,1077` — uses `#B3FF66` for accent color (a yellow-green). The brand token `--nx-acid: #C6F184` is a different shade of acid green. These two greens appear simultaneously on dark sections, creating a minor but observable inconsistency with the token spec.
- Desktop renders as intentional dark-lab aesthetic. Mobile clean.

### /physicians
- No kill words. No italics.
- [CRITICAL] Same off-brand navy gradient as `/science` — `Physicians.tsx:478`: `linear-gradient(135deg, #0B1220, #0F1B32, #14243E)` instead of token black. See `/science` note.
- [MINOR] `Physicians.tsx:853` — expand/collapse CTA text: `"Read more →"` / `"Show less ↑"`. "Read more" is on the borderline of the generic CTA list. In context (expanding physician bio), it is functional UI copy, not a marketing CTA. Acceptable as-is, but could be more specific: "See full bio →".

### /faq
- No kill words. No italics.
- Desktop and mobile clean. Category navigation sidebar renders correctly.
- FAQ categories use Title Case ("Products", "Process", "Safety" etc.) — correct. No ALL-CAPS violations.

### /lab-testing
- No kill words. No italics.
- Desktop and mobile clean. Pricing tiers, biomarker table, HSA section all render correctly.
- [MINOR] `LabTesting.tsx:854` — status labels `"NORMAL"`, `"LOW"`, `"HIGH"` in the results table are hardcoded uppercase strings. As data/status indicators (analogous to blood lab report conventions), this is defensible. Flag for lowercase + `text-transform: uppercase` via CSS for consistency.

### /men
- No kill words.
- [CRITICAL] **Italic rendering on hero.** `MenHome.tsx:180` — same off-brand navy gradient used for dark sections.
- Desktop hero "Peak performance, engineered for men." looks clean. VialTile grid renders well at both viewports.
- Mobile: the three-option selector (Single / Flagship / Custom) renders as a column stack — readable but slightly cramped at 375px. Not broken.

### /women
- [CRITICAL] **Italic `<em>` on hero headline.** `WomenHome.tsx:1497`: `<em style={{ color: "#B25778", fontStyle: "italic", fontWeight: 500 }}>her</em>`. The global CSS rule `em, i { font-style: normal; }` (line 106 of `index.css`) does NOT use `!important`, so the inline `fontStyle: "italic"` overrides it. The word "her" in "Protocols tuned to *her* physiology." renders in italic on the page. This violates the zero-italic mandate.
  - File: `pages/WomenHome.tsx:1497`
- Desktop and mobile screenshots confirm the `<em>` styling is live (visible italic on hero).

### /men/peptides
- No kill words. No italic.
- [CRITICAL] **ALL-CAPS hero headline**: The hero renders "BUILT FOR / THE MALE ENGINE." in large ALL-CAPS display text. Source: `pages/GenderPeptides.tsx:347-360` — h1 text is `"Built for <br /> the male engine."` with inline `style={{ textTransform: "uppercase" }}`. Confirmed visible in screenshot. This is a hardcoded CSS-uppercased hero h1, not a wordmark or product name. The Women's equivalent (`"Peptides tuned to her physiology."`) uses Title/sentence case — asymmetric treatment.
  - File: `pages/GenderPeptides.tsx:355`
- Mobile clean.

### /women/peptides
- [CRITICAL] **Italic `<em>` on hero headline.** `GenderPeptides.tsx:515`: `<em style={{ color: "#B25778", fontStyle: "italic", fontWeight: 500 }}>her</em>` in "Peptides tuned to *her* physiology." Same CSS specificity issue as `/women` — renders visibly italic.
  - File: `pages/GenderPeptides.tsx:515`
- Desktop and mobile screenshots confirm the italic "her" is live.

### /assessment
- No kill words. No italics.
- Desktop and mobile clean. The landing hero with the Quest lab image is strong and benefit-encoded. Step 1 "What is your biological sex?" renders clearly on both viewports.
- [MINOR] Assessment hero tile cards ("Personalized protocol" / "Physician-reviewed") have no hero image — they use the decorative SVG hexagon/wave glyph system. These are placeholder-style graphics rather than benefit-encoded photography. Functional but weak for a conversion entry page.

### /cart
- No kill words. No italics.
- Empty cart state shows cleanly on both desktop and mobile.
- [MINOR] `Cart.tsx:277` — "Learn more" link on the lab testing add-on line item. "Learn more" is one of the generic CTA patterns to flag. In this context (a small inline link inside a cart line item) it is functional but could be "See panel details" or "View lab panel" for specificity.
- [MINOR] Cart page renders a different nav than most content pages — it shows "For Women / For Men / Stacks / Bloodwork / How It Works / Science / Journal" instead of the standard "Pharmacy / Stacks / Bloodwork / Science / Journal / How It Works". The nav variant is context-appropriate (cart context), but the visual difference is notable.

### /checkout
- Empty cart redirects to the checkout empty state cleanly.
- No issues. Desktop and mobile clean.

### /privacy
- [CRITICAL] **Route 404.** `/#/privacy` resolves to the 404 not-found page. The correct route is `/#/legal/privacy` (defined in `App.tsx:120`). The audit spec listed `/privacy` as a route to check. Footer correctly links to `/legal/privacy`. No user-facing broken link. However, if any external link or sitemap points to `/#/privacy`, it will 404.
  - Recommendation: add a redirect from `/privacy` → `/legal/privacy` and `/terms` → `/legal/terms`.

### /terms
- [CRITICAL] **Route 404.** `/#/terms` resolves to the 404 not-found page. Same root cause as `/privacy`. Correct route is `/#/legal/terms`.
  - Recommendation: add redirects.

---

## Global findings

### Grep results for kill words
**NONE FOUND.** Zero hits for: cutting-edge, revolutionary, unlock, harness, leverage, seamless, world-class, unparalleled, elite, breakthrough across all `.tsx` / `.ts` files.

### Exclamation points in copy
**NONE in user-visible copy.** All `!` hits in the grep output were JavaScript operators (`!==`, `!.`, `!ctx`, etc.) or Tailwind class suffixes (`p-0!`). No exclamation marks appear in JSX text content.

### Italic usage
**4 confirmed active violations** (inline style overrides global CSS rule):

| File | Line | Element | Copy | Notes |
|------|------|---------|------|-------|
| `pages/WomenHome.tsx` | 1497 | `<em style={fontStyle:italic}>` | "her" | Renders italic on /women hero |
| `pages/GenderPeptides.tsx` | 515 | `<em style={fontStyle:italic}>` | "her" | Renders italic on /women/peptides hero |
| `pages/GenderPeptideDetail.tsx` | 271, 284 | `<span style={fontStyle:italic, fontFamily:'Instrument Serif'}>` | Women's PDP hero (2nd word of peptide name) | Renders italic on /women/peptides/* |
| `pages/GenderPeptideDetail.tsx` | 306 | `<span style={fontStyle: isWomen ? 'italic' : 'normal'}>` | Women's PDP tagline | Renders italic on /women/peptides/* |
| `pages/GenderPeptideDetail.tsx` | 491, 550, 686, 798 | `<span style={fontStyle:italic}>` | "week", "evidence", accent words in body | Renders italic in body sections of /women/peptides/* |

**Root cause:** `index.css:106` defines `em, i { font-style: normal; }` without `!important`. Inline `style={{ fontStyle: "italic" }}` wins over this rule. The `.italic { font-style: normal !important; }` rule (line 109) only applies to elements with the `.italic` class, not inline-styled elements.

**Also noted (data/field names, not rendering):**
- `lib/protocols.ts:53,298,303,365,370,432,437,499,504,566,571` — field named `protocolItalicHeadline` and `italicWord`. These are data field names. In `StackReveal.tsx`, the "italic" text renders inside `<span className="text-primary">` with NO italic font style. Not a visual violation but misleading naming.

### ALL-CAPS eyebrows still hardcoded
**Intentional pattern (acceptable):** Most ALL-CAPS strings are used with `.nx-eyebrow` or equivalent classes that add `text-transform: uppercase`. The hardcoded uppercase in data strings is redundant but harmless.

**Flagged for review:**
- `components/TrustStrip.tsx:21,26,31,36` — `"MEDICAL EVALUATION"`, `"STERILE COMPOUNDING"`, `"CLINICAL READINESS"`, `"LAB TESTED"`. These are user-visible trust bar labels. Per the no-ALL-CAPS policy, these should be Title Case with CSS uppercase transform: `"Medical Evaluation"`, etc.
- `pages/Pricing.tsx:70` — `badge: "BEST VALUE"` (and `PricingTiers.tsx:22` `"MOST POPULAR"`) — marketing badges, not product names.
- `components/FAQAccordion.tsx:20-75` — category data strings (`"PROCESS"`, `"SAFETY"`, `"LEGALITY"`, `"EFFICACY"`, `"PRICING"`) used as filter labels. In `FAQ.tsx`, the visible categories are already Title Case ("Products", "Process") — the FAQAccordion categories are only used in `showCategories=true` mode (default false). Low priority.

**Confirmed flagged:**
- `/men/peptides` hero headline "BUILT FOR / THE MALE ENGINE." — visible ALL-CAPS hero heading (see route finding above). Source: `GenderPeptides.tsx`.

### Generic CTA text
- `Cart.tsx:277` — "Learn more" (inline lab testing link) — minor, see /cart finding.
- `Home.tsx:118` — announcement bar promo: `cta: "Learn more"` for the shipping promo. This is in a rotating announcement bar. Acceptable-but-generic; could be "See how it ships".
- `Physicians.tsx:853` — "Read more →" for expanding physician bio. Borderline; functional UI copy.

All primary CTAs follow the "Start your intake / Start your assessment / See your protocol / Browse stacks" pattern correctly. No "Get Started Now" or "Click Here" found.

### Missing alt text on `<img>` tags
**NONE.** All 25+ `<img>` elements flagged by the initial grep have `alt=` attributes on the following line (multi-line JSX formatting caused false positives). Every image has descriptive alt text. Accessibility-clean.

### Console errors
**ZERO** browser console errors across all 44 screenshots (22 routes × 2 viewports). No 404s for assets, no JS runtime errors, no failed network requests.

### Off-brand / off-token colors
| Location | Value | Issue |
|----------|-------|-------|
| `Science.tsx:894` | `#08101E / #0F1B32 / #16264A` | Navy-blue gradient — not in token system. Token dark is `#0A0A0A`. |
| `Physicians.tsx:478` | `#0B1220 / #0F1B32 / #14243E` | Same navy gradient. |
| `MenHome.tsx:180` | `#0B1220 / #0F1B32 / #14243E` | Same navy gradient. |
| `Science.tsx:961,997` | `#B3FF66` | Acid-green variant, not token `--nx-acid: #C6F184`. |
| `BenefitTile.tsx:22,37` | `#E28A3D` (dark/ember eyebrow) | Orange not in token system. Closest token: `--nx-rust: #C97A4A`. |
| `BloodworkDashboard.tsx:150,333` | `#E6E0D4` | Off-token cream (tokens: `#FAF7F0`, `#F0EBE0`, `#E8E4D8`). |
| `VialTile.tsx:228-231` | FDA badge colors `#EAF6E6`, `#F5EEDA`, `#EEF1F4` | Status indicator colors — contextually appropriate but hardcoded outside token system. Low priority. |

---

## What's strong

1. **Zero kill words** — the entire vocabulary purge is complete. Not a single "revolutionary", "cutting-edge", "unlock", etc. anywhere in the codebase.
2. **Zero console errors** — production build is clean across all routes.
3. **Zero JS/404 runtime errors** — every route renders, no broken imports or missing chunks.
4. **Alt text fully populated** — every `<img>` has a descriptive alt attribute. Accessibility-ready.
5. **CTA language is mostly excellent** — "Start your intake", "Start your assessment", "Browse stacks", "See your protocol" — the tone is clinical and direct throughout.
6. **Mobile layout is solid** — no horizontal overflow or text cut-off observed on any of the 22 routes at 375px. The responsive system is working.
7. **Typography hierarchy** — General Sans weight + size system is consistent. No rogue font-families.
8. **Legal pages correctly routed** — footer links to `/legal/privacy` and `/legal/terms` are correct. The 404 at bare `/privacy` and `/terms` is because those short paths were never registered, not a broken link issue.

---

## Overall verdict

**FAIL WITH 9 CRITICAL ISSUES**

The site is in excellent shape structurally — zero console errors, zero kill words, zero broken images, solid mobile layout, and strong CTA language throughout. The issues are concentrated in three areas:

1. **Italic violations** — 4 files actively render italic text despite the zero-italic mandate (WomenHome, GenderPeptides, GenderPeptideDetail × 5 spans). Root cause: CSS rule missing `!important`. Fix: add `!important` to `em, i, cite, address, dfn, var { font-style: normal !important; }` AND replace inline `fontStyle: "italic"` usages in GenderPeptideDetail.
2. **Off-token navy blue** on Science/Physicians/Men hero sections (3 pages using same gradient). Fix: replace with `--nx-bg-dark: #0A0A0A` or add the navy as a named token.
3. **Route gaps** — `/privacy` and `/terms` 404 (correct routes are `/legal/privacy` and `/legal/terms`). Fix: add route aliases or redirects.

Minor issues (12) are polish items: off-token orange/green variants, ALL-CAPS marketing badges, "Learn more" generic CTA in 2 low-priority spots.
