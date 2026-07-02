# NEXPHORIA — PRODUCTION LAUNCH CHECKLIST
*State as of cleanup waves 1–2 + asset independence (commit 8ff299d). Preview: gh-pages, tree-verified.*

## ✅ DONE — site-side (verified in repo/bundle)
- One design system (Porcelain & Navy tokens), one voice (bank register), two worlds (azure/orchid) end-to-end
- Store complete: 7 protocol pages · 19 solo PDPs · 3 blood panels · filterable catalogs · cadence pricing (1/3/12-mo)
- GLP-1 gated site-wide (physician intake wall; not sellable); "priced at consult" where no price exists
- 40 routes, **0 broken internal links**
- Dead weight removed: 11 dead page files, 6 dead imports, 2 backup files, dead ComparisonTable (named-competitor risk)
- tsc 41 → 12 errors (all pre-existing, none in current systems)
- Zero banned tokens: no acid-green, no pure-black, no "Maximus"/"Beyond Boundaries"/hype in copy
- **ASSET INDEPENDENCE: zero external CDN references.** 39 assets localized → WebP q82 ≤1600w (153MB→11MB), served from repo

## ✅ FULL AUDIT LEVEL-UP (this wave)
- **Route smoke harness** (`npm run smoke`): renders all 37 routes through Vite SSR under jsdom — 37/37 pass. Catches runtime crashes statically-impossible to find. Found + killed: dead `Protocols.tsx` carrying a missing-PNG import.
- **Performance**: 13 eagerly-imported pages → lazy. Main bundle **556KB → 223KB (−60%)**. 509KB recharts chunk no longer preloaded for every visitor (manualChunk removed; now rides only the lazy Bloodwork route).
- **SEO**: sitemap regenerated — 99 URLs on the live host (was 73 URLs on the dead `nexphoria.pplx.app` domain); robots.txt sitemap pointer fixed; Cart/Checkout given titles/descriptions.
- **A11y**: tag-span audit — **0 images missing alt** (line-grep false alarm); h1-per-page verified on core templates; skip-link + aria coverage confirmed.
- **Link safety**: all `target="_blank"` carry `rel="noopener noreferrer"`.
- **More dead weight**: `Legal.tsx` (superseded by legal/ suite), `Protocols.tsx`, unused shadcn `ui/chart.tsx` — deleted.

## 🔧 REMAINING — site-side (small, no blockers)
- [x] ~~12 pre-existing tsc errors~~ — **FIXED: tsc = 0 across the entire repo**
- [ ] Data unification (later, carefully): legacy `stacks.ts`/`peptides.ts` still power cart/checkout/nav; new `stacksCatalog`/`soloCatalog` power PDPs. Two sources of truth = drift risk once real orders flow
- [x] ~~Checkout-level GLP-1 state block~~ — **WIRED: address step hard-blocks the 6 excluded states when cart contains GLP-1 (derived from catalog `gated` flags, not hardcoded); bank-voice notice; onSubmit double-guard. Server-side validation still required when a real backend exists.**
- [ ] Git history carries one 153MB asset commit — squash `design/azure` before production merge if repo size matters
- [ ] Delete `.github/workflows/localize-assets.yml` + manifest after production merge (job done)

## 🔴 GO-LIVE GATES — business-side (only you)
1. **Hosting + domain** — currently a GitHub Pages *preview* with hash-routing. Production = real host (Vercel/Netlify/CF Pages), real domain, switch to path routing + real 404 handling
2. **Backend** — intake → physician review (MDI Providers PLLC) → pharmacy (Strive) → fulfillment. Nothing running yet. *Decision pending: Indie vs. Bask*
3. **Payments** — nothing wired
4. **The four keys** — named physicians/advisors · lab pricing confirmation ($99/$199/$399 per doc) · backend platform call · retatrutide (doc dropped it — intentional?)
5. **Legal review** — compounded GLP-1 exposure (FDA 503B proposal, Apr 30 2026), telehealth state rules, the 6 GLP-1-excluded states enforced at checkout, terms/privacy/consent docs
6. **Real content** — About/Physicians pages carry framework copy; need real names, real credentials, real photos before a single patient sees them

## ORDER OF OPERATIONS TO LAUNCH
1. You clear gates 2+4 (backend + keys) → 2. I wire checkout/intake to it → 3. Legal pass (gate 5) → 4. Real content (gate 6) → 5. Production host + domain (gate 1) → 6. I squash-merge, final QA, ship
