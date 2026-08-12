# EMERGENCY 25-MIN FIX BRIEF — Pre-Pitch Polish

User is going into partner meeting in ~25 minutes. Site must be PERFECT and deployed.

## Critical Bugs to Fix (priority order)

### 1. Mobile Menu Broken — `client/src/components/Nav.tsx`

**Current bugs:**
- Line ~405: `top-[calc(40px+64px)]` hardcoded — wrong because announcement bar wraps on 375px screens
- Drawer uses `fixed inset-0` — extends below viewport, breaks landscape
- NO body scroll lock when drawer open — page scrolls behind drawer
- Drawer content itself may not scroll if taller than viewport

**Fix:**
- Replace hardcoded `top-[calc(40px+64px)]` with a ref-based measurement OR a CSS variable set on the wrapper. Simplest: wrap announcement+nav in one sticky header element, then make drawer position relative to that with `top-full` + `h-[calc(100svh-var(--header-h))]`.
- Add `useEffect` that toggles `document.body.style.overflow = 'hidden'` when drawer open, restores on close + on unmount.
- Make drawer inner content `overflow-y-auto` with proper max-height.
- Truncate the announcement bar text on mobile (or hide secondary text under 640px) so it stays single-line, e.g. `<span className="hidden sm:inline">…extra text…</span>`.
- Use `100svh` not `100vh` (mobile Safari viewport bug).
- Ensure close on route change: add `useEffect` watching `location` from wouter and close drawer on change.

### 2. Quiz Buttons Dead — `client/src/pages/Assessment.tsx`

**Current bugs:**
- ALL Continue/CTA buttons (lines 527, 585, 620, 654, 677, 838) use `hover:bg-primary` — same color as base, so NO hover feedback. Looks broken.
- `setTimeout` auto-advance (lines 340, 409, 465) can race on mobile double-tap → buttons feel unresponsive
- No active/pressed state

**Fix:**
- Change `hover:bg-primary` → `hover:bg-primary/90` on ALL CTA buttons
- Add `active:scale-[0.98] active:bg-primary/80 transition-all duration-150` to give tactile feedback
- Add `disabled:opacity-50 disabled:cursor-not-allowed` for proper disabled states
- Add a guard ref `const advancingRef = useRef(false)` — set true on click, reset on next step mount. If true on click → return early. Prevents double-fire race.
- Ensure email submit button (line ~838) ALSO gets the hover/active states + disabled state while submitting.

### 3. Hands-Everywhere Imagery Integration

**New photos already in `client/src/assets/brand/editorial/`:**
- `editorial-hands-kit-select.png` — Home Act 1 alternate, About mission, Protocols catalog band
- `editorial-hands-draw-syringe.png` — HowItWorks Act III, Pharmacy section, Science page
- `editorial-hands-prescribe.png` — Physicians page, MD authority, Assessment interstitial
- `editorial-hands-consult.png` — About mission, Physicians page, Closing CTA bands
- `editorial-hands-pipette.png` — LabTesting page, Science page, HowItWorks pharmacy step

**Inject these into:**
- `Home.tsx` — add one hands moment between hero and protocols (full-bleed, treated as editorial spread — `aspect-[21/9]` or `aspect-[16/9]` with caption overlay)
- `HowItWorks.tsx` — `editorial-hands-draw-syringe.png` after pharmacy step
- `Pharmacy.tsx` — `editorial-hands-draw-syringe.png` as section hero
- `Science.tsx` — `editorial-hands-pipette.png` as visual break mid-page
- `Physicians.tsx` — `editorial-hands-prescribe.png` + `editorial-hands-consult.png` (one near hero, one near closing)
- `About.tsx` — `editorial-hands-consult.png` for mission section
- `LabTesting.tsx` — `editorial-hands-pipette.png` if page exists

Use them as **full-bleed editorial spreads**, not thumbnails. Each should breathe with generous vertical padding (py-20 to py-32). Add subtle caption in JetBrains Mono uppercase tracking-widest text-xs text-fg/50 anchored bottom-left or top-right.

### 4. Polish Pass (only if time permits)

- Tap targets ≥ 44×44px on all mobile interactive elements
- Ensure no horizontal scroll on any route at 375px (use Playwright `evaluate(() => document.documentElement.scrollWidth)`)
- Check ALL routes at 375×812 mobile and 1440×900 desktop with Playwright
- Fix any text overflow / wrapping issues

## Deploy

After fixes:
```bash
cd /home/user/workspace/nexphoria-site
npm run build
# Restart prod server
kill $(lsof -ti :5000) 2>/dev/null || true
NODE_ENV=production node dist/index.cjs &
```

Then call `pplx-tool deploy_website` (parent agent will call this — DO NOT call publish_website):
```bash
pplx-tool deploy_website <<'JSON'
{"project_path":"/home/user/workspace/nexphoria-site/dist/public","site_name":"Nexphoria — Peptide Therapy, Prescribed","entry_point":"index.html","should_validate":false}
JSON
```
Use `api_credentials=["pplx-tool:deploy_website"]`.

## Non-Negotiables (DO NOT VIOLATE)

- Tagline locked: "Science you can feel. Results you can measure." ("Results you can measure." is Gambarino italic acid-green #c6f184)
- NEVER say "nootropics" — always "peptides"
- NO localStorage / sessionStorage / cookies
- prefers-reduced-motion respected
- Hero: NO blur, NO scroll motion, NO parallax
- Tokens locked: bg #0a0a0a, fg #fffff3, accent #c6f184, border #2a2a28
- Fonts locked: Switzer / Gambarino italic 400 / JetBrains Mono via Fontshare
- About page: mission-first, no founders
- StartIntakeButton props: `productSlug` + `source`
- Deploy via `pplx-tool deploy_website` only — NEVER Vercel, NEVER publish_website

## Time Budget

- Bug fixes (mobile menu + quiz): 8 min
- Hands imagery injection: 6 min
- Build + Playwright QA at 375 + 1440: 6 min
- Buffer for fixes from QA: 5 min

GO. Don't explain. Edit, build, screenshot, fix, repeat. Hand control back to parent agent for deploy when build is clean.
