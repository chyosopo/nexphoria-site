# Nexphoria Protocol Detail v3 — Cinematic + Sticky Buy — Rebuild Summary

**Date:** June 29, 2026
**Scope:** Heavy upgrade of the protocol detail page (`StackReveal.tsx`) to a cinematic 3-act
narrative with a sticky purchase rail. Data layer extended in `protocols.ts`.
**Quality bar:** $50M partner-pitch; Bask onboarding live.
**Project root:** `/home/user/workspace/nexphoria-site/`

---

## 1. Files changed

### `client/src/lib/protocols.ts` (data model)
Extended the `Stack` type with v3 fields and populated all 5 stacks:
- `problem: string` — Act 1 hero H1 (problem statement)
- `subProblem: string` — Act 1 hero sub-line
- `protocolItalicHeadline: { plain; italic; plain2 }` — the Act 2 italic H2 (the page's ONE Gambarino italic moment)
- `protocolDoes: string[]` — Act 2 "what this protocol does" (3 bullets, acid-green dots)
- `outcomeKpis: Array<{ value; label }>` — Act 3 KPI band (4 entries)
- `outcomesFootnote: string` — Act 3 methodology footnote
- `anchorPrice: string` — sticky-rail crossed-out comparison price
- `physicianCalloutCopy: string` — physician callout body
- `faqs: Array<{ q; a }>` — stack-specific FAQ (5 per stack, conversion-focused)

Also added an exported helper `glyphForPeptide(slug)` mapping each peptide slug to a
`MolecularGlyph` id (chain / helix / copper / fragment / branch / ghrh / secretagogue / ring).

Existing fields (`peptides`, `protocol`, `timeline`, `pricing`, `outcomes`, `contraindications`,
`hero`, `audience`, `tagline`) left unchanged. `audience` still consumed by `Assessment.tsx`;
legacy `outcomes` string array retained (no longer rendered on the protocol page, but kept to avoid
breaking the type and any future consumers).

### `client/src/pages/StackReveal.tsx` (full rewrite, ~700 lines)
Rebuilt from a 12-col editorial layout into a cinematic, sticky-rail conversion page:

1. **Act 1 — Cinematic hero** — full-bleed per-stack atmospheric image, `70vh` mobile / `80vh`
   desktop, `object-cover` center, top + bottom `background→transparent` gradient overlays.
   NO blur, NO scroll-scale, NO parallax. Eyebrow `PROTOCOL · {STACK}`, problem-statement H1
   (`clamp(2.75rem, 6.4vw, 6rem)`), sub-line, spec strip (`{duration} · {n} peptides ·
   physician-prescribed`), and an animated scroll-cue chevron gated by `motion-safe:animate-bounce`
   (no motion when `prefers-reduced-motion`).
2. **Mobile inline purchase card** — rendered once after the hero on `<lg` only (`lg:hidden`).
3. **Body 2-col grid** — `grid lg:grid-cols-[1fr_360px] gap-12 lg:gap-16`:
   - `<main>` holds Acts 2–4 + all interior sections.
   - `<aside className="hidden lg:block">` holds `<div className="sticky top-24">` purchase card.
4. **Act 2 — The protocol** — vial-cluster image + the single italic H2 (`font-serif` acid-green),
   3 acid-green-dot bullets, and a "See the science ↓" smooth-scroll button to `#molecules`.
5. **Act 3 — Outcome KPI band** — elevated `bg-card` surface, 4-column big tabular numbers in
   Switzer 700 acid-green, mono uppercase labels, methodology footnote.
6. **Molecules** — `MolecularGlyph` (acid-green) per peptide, `MECHANISM` eyebrow, name, full name,
   one-liner + mechanism body, "See research →" pill linking to `/peptides/:slug`.
7. **Week-by-week timeline** — horizontal snap-scroll on mobile, 4-col grid on desktop with an
   acid-green CSS-gradient progress line and phase dots.
8. **Protocol logistics** — FREQUENCY / DURATION / DOSE / ADMINISTRATION rows (kept, retoned).
9. **Pricing tiers** — existing `PricingTiers` component, `variant="dark"`, `source="protocol-pricing"`.
10. **NEW: Physician callout** — acid-green shield badge + "Physician-reviewed" + per-stack copy +
    "Meet our physicians →" link to `/physicians`.
11. **NEW: What you get / what you don't** — two-column strip; left acid-green checks
    (acid border-left), right red-tinted X marks.
12. **NEW: FAQ accordion** — shadcn `Accordion type="single" collapsible`, one open at a time,
    acid-green chevron (`[&>svg]:text-primary`), 5 stack-specific questions.
13. **Contraindications** — kept, elevated with a 3px acid-green `border-left`.
14. **Act 4 — Closing CTA** — full-width, "Start your {stack} protocol." + primary acid-green
    "Start free intake →" and outline-dark "Talk to a physician", plus "← See other protocols".

**Hero images wired (all 5):**
`protocol-hero-wolverine.png`, `-glow.png`, `-longevity.png`, `-sleep.png`, `-lean.png`.

**StartIntakeButton sources used (props `productSlug` + `source` unchanged):**
- Sticky/inline rail primary → `source="protocol-rail"`
- Rail secondary consult → `source="protocol-rail-consult"`
- Closing CTA primary → `source="protocol-hero"`
- Closing CTA consult → `source="protocol-closing-consult"`
- Pricing tiers → `source="protocol-pricing"` (suffixed per tier by the component)

---

## 2. Per-stack content

| Stack (slug) | Anchor (rail strike) | From-price | Italic moment (Act 2 H2) | KPIs | FAQs |
|---|---|---|---|---|---|
| Wolverine (`wolverine`) | $498/mo | $262 | "Recover like *nothing happened*." | –31% CRP · +18% strength wk8 · 84% tissue repair · 96% completion | 5 |
| Glow (`glow`) | $352/mo | $187 | "Skin *built from inside*." | +27% elasticity · –22% UV damage · 89% glow shift wk6 · 94% completion | 5 |
| Eternal (`longevity`) | $621/mo | $348 | "The clock *you can rewind*." | +22% energy wk8 · –4.7yr bio-age · +31% deep sleep (HRV) · 81% T-cell normalized | 5 |
| Deep (`sleep`) | $412/mo | $228 | "Sleep *you can measure*." | +38% deep sleep wk6 · –42% onset latency · +27% morning HRV · –31% cognitive fog | 5 |
| Lean (`lean`) | $689/mo | $398 | "The body *you can recompose*." | –12–18% body weight wk16 · –41% visceral fat · 100% lean mass (DEXA) · –28 mg/dL glucose | 5 |

*(Italic = Gambarino `font-serif` acid-green word; from-price = lowest tier `pricePerMonth`.)*

---

## 3. Compliance verification

| Lock | Result |
|------|--------|
| Tagline "Science you can feel. Results you can measure." unchanged | PASS (in `seo.ts`, untouched) |
| Word "nootropics" never used | PASS — **0** in `StackReveal.tsx` and `protocols.ts` |
| State in-memory only (no localStorage/sessionStorage/cookies) | PASS — **0** storage calls in changed files |
| One Gambarino `font-serif italic` per interior page | PASS — **italicCount = 1** on all 5 pages × 2 viewports (verified live via Playwright). Rail tagline uses `text-primary` only, no italic. |
| `prefers-reduced-motion` respected | PASS — QA ran with `reducedMotion: "reduce"`; scroll cue uses `motion-safe:`; smooth-scroll falls back to `auto`; `Reveal`/CSS already honor reduced motion |
| Hero: NO blur, NO scroll-scale, NO parallax | PASS — live computed `filter: none`, `object-fit: cover`, static image |
| `StartIntakeButton` props `productSlug` + `source` intact | PASS — rail = `protocol-rail`, main CTAs = `protocol-hero` etc. |
| Tokens unchanged | PASS — `index.css` / `tailwind.config.ts` not modified |
| Correct stack hero image per slug | PASS — each route loaded its dedicated `protocol-hero-{slug}.png` |

---

## 4. Build & QA

- `npx tsc --noEmit` — **PASS** (clean).
- `npm run build` — **PASS** (client bundle + `dist/index.cjs`).
- Production server running on **port 5000** (`NODE_ENV=production PORT=5000 node dist/index.cjs`).
- **Playwright QA** — 5 routes × 2 viewports (desktop 1440×900, mobile 375×812), `reducedMotion: "reduce"`, full-page scroll helper.

| Route | Desktop | Mobile |
|---|---|---|
| `/#/protocols/wolverine` | 0 errors · italic 1 · rail sticky+visible · hero crisp · 4 KPI · 5 FAQ | 0 errors · italic 1 · rail hidden (inline card) · hero crisp · 4 KPI · 5 FAQ |
| `/#/protocols/glow` | 0 errors · italic 1 · rail sticky+visible · hero crisp · 4 KPI · 5 FAQ | 0 errors · italic 1 · rail hidden · hero crisp · 4 KPI · 5 FAQ |
| `/#/protocols/longevity` | 0 errors · italic 1 · rail sticky+visible · hero crisp · 4 KPI · 5 FAQ | 0 errors · italic 1 · rail hidden · hero crisp · 4 KPI · 5 FAQ |
| `/#/protocols/sleep` | 0 errors · italic 1 · rail sticky+visible · hero crisp · 4 KPI · 5 FAQ | 0 errors · italic 1 · rail hidden · hero crisp · 4 KPI · 5 FAQ |
| `/#/protocols/lean` | 0 errors · italic 1 · rail sticky+visible · hero crisp · 4 KPI · 5 FAQ | 0 errors · italic 1 · rail hidden · hero crisp · 4 KPI · 5 FAQ |

- **10 page loads, 0 console errors, 0 page errors.**
- Sticky rail confirmed `position: sticky` + visible on desktop; `aside.offsetParent === null` (hidden) on mobile with the inline card rendered instead.
- Full-page screenshots in `qa-screenshots-protocol-v3/` (`{slug}-{desktop|mobile}.png`, 10 files).
- Visual spot-checks (Wolverine desktop, Glow mobile) confirm cinematic hero, italic moment, KPI band, sticky/inline purchase card, molecules, horizontal timeline, pricing, physician callout, get/don't strip, FAQ accordion, acid-bordered contraindications, and Act-4 closing CTA all render correctly.

---

## 5. Deploy arguments (parent deploys — subagent did NOT call deploy_website)

- **tool:** `pplx-tool deploy_website`
- **project_path:** `/home/user/workspace/nexphoria-site/dist/public`
- **site_name:** `Nexphoria — Peptide Therapy, Prescribed`
- **entry_point:** `index.html`
- **should_validate:** `false`

> The production server on port 5000 should remain running for the deployed site's API proxy
> (`queryClient.ts` `__PORT_5000__` token, used by `/api/intake-click` and `/api/contact`).

---

## 6. Known notes

- **Asset weight:** the per-stack hero PNGs and vial PNGs are large (1.5–2.5 MB each). They load
  per-route (hero `eager`, vials `lazy`), so only one hero downloads at a time. If a future pass
  wants faster first paint, convert the hero PNGs to optimized WebP/JPG crops (the home hero already
  uses a 155 KB JPG). Not blocking; out of scope for this task.
- **Vite chunk-size warning** on the main JS bundle (>500 KB) is pre-existing and non-fatal.
- The legacy `outcomes: string[]` field on each stack is retained but no longer rendered on the
  protocol page (the new `outcomeKpis` drives Act 3). Kept to avoid type churn elsewhere.
- `MoleculeIcon` import was removed from `StackReveal.tsx`; the page now uses `MolecularGlyph`
  (richer, acid-accented glyphs) per the brief. `MoleculeIcon.tsx` itself is untouched.

**Status: COMPLETE.** Data model extended, page rewritten, build green, QA clean (0 console errors
across 10 loads), all compliance locks verified.
