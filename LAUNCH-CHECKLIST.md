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

## 🔧 REMAINING — site-side (small, no blockers)
- [ ] 12 pre-existing tsc errors (Assessment, PricingTiers, etc.) — cosmetic types, build unaffected
- [ ] Data unification (later, carefully): legacy `stacks.ts`/`peptides.ts` still power cart/checkout/nav; new `stacksCatalog`/`soloCatalog` power PDPs. Two sources of truth = drift risk once real orders flow
- [ ] Checkout-level GLP-1 state block (`isGLP1Excluded` stub) — wire when checkout is real
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
