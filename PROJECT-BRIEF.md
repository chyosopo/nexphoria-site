# PROJECT-BRIEF.md — Nexphoria Marketing Site: Current State

> Living document. Verified against the repo on **2026-07-02** (branch `design/azure`, HEAD `26134ba`).
> Where this differs from older briefs, this file wins — numbers here were measured, not remembered.

---

## The Business
**Nexphoria Research LLC** — physician-guided peptide telehealth. Two layers, never mixed:
- **Marketing site (this repo):** `github.com/chyosopo/nexphoria-site` @ `design/azure`. Presentation only.
- **Medical engine:** Bask Health + MDI Integrations. MDI Providers PLLC = physicians. Strive = pharmacy. Bask = platform. **All intake / orders / payments / PHI live here — never in this repo.**

## Stack (verified)
- Client: **Vite 7 + React 18 + wouter + Tailwind 3 + framer-motion + Radix UI**. Static output → `dist/public`.
- Server: **Express 5** (`server/`) — serves static build with SPA fallback + a few API routes. Bundled to `dist/index.cjs` via esbuild.
- Data/ORM present: drizzle-orm + better-sqlite3 + supabase-js (staging scaffolding; see PHI note).
- Build: `npm run build` (`tsx script/build.ts`) → client + server. **Node 20 LTS required** (`.nvmrc`); Node 26 breaks better-sqlite3.

## Verified State (measured 2026-07-02)
- **Routes:** 39 (smoke: **39 pass / 0 fail**).
- **Data census (audit:data):**
  - `soloCatalog`: **20** · legacy `peptides.ts`: 16 · `pricing.ts`: 16
  - `FLAGSHIP_STACKS`: **7** · legacy `stacks.ts`: 6
  - No peptide price drift; all 7 stacks × 3 cadences agree; GLP-1/orphan leak check clean.
  - Gated/excluded from builder (intentional, no PDP): `thymosin-a1`, `retatrutide`, `aod-9604`; `ignite` stack intentionally unpriced/unsellable.
- **Blood panels:** biomarker panels defined in `client/src/data/biomarkerPanel.ts` / `biomarkers.ts` (Bloodwork page + LabTesting).
- **Gate battery — GREEN baseline:**
  - `tsc` (check): **0 errors** (older briefs cited 12 pre-existing — repo has since been cleaned).
  - smoke: **39/39 pass**.
  - audit:data: **pass** (no drift).
  - audit:design: **non-regressing** — NOW: fontSize 74 · radius 31 · shadow 16 · transition 33 · font-redecl 0 (vs lint baseline transition 34; improvement).
  - `npm run build`: **GREEN** — client to `dist/public`, server `dist/index.cjs` (~932kb). Largest lazy chunk Bloodwork ~439kb (correctly lazy).

## Known Debt / Punch List (shrinking)
- **PHI boundary (highest priority):** `server/routes.ts` + `server/storage.ts` expose `/api/waitlist`, `/api/contact`, `/api/intake-click`, `/api/checkout` writing to local SQLite. `/api/checkout` takes "health flags + cart" for "physician review." **Must route to Bask/MDI; no PHI persisted in-repo.** Staging-only until wired + legal review.
- **Routing:** hash → path routing target for SEO (confirm current state; wouter is path-based, verify no hash fallbacks remain).
- **Data unification:** legacy `stacks.ts`/`peptides.ts` vs new `stacksCatalog`/`soloCatalog` — two layers coexist; audit:data enforces agreement but full unification pending.
- **Deployment:** API routes are not static — need serverless adapter (or Node runtime) to function on Vercel; static marketing pages deploy fine now.

## Domain State (critical — do not violate)
- `nexphoria.com` **apex → live Shopify storefront via Cloudflare.** DO NOT repoint apex or touch nameservers without Chiya's explicit launch/cutover decision.
- Staging: **`new.nexphoria.com`** → Vercel CNAME, Cloudflare proxy OFF (grey cloud, DNS-only).
- Old Vercel project `nexphoria-peptide-pharmecy` — DO NOT touch.

## Chiya's Open Business Decisions (track)
- MDI / Bask configuration
- Named physicians (About / Physicians content)
- Lab panel pricing: $99 / $199 / $399
- Retatrutide inclusion (currently gated/excluded)
- Legal review
- Real About / Physicians content
- Shopify → new-site apex cutover date

## Infrastructure / Accounts
- GitHub: chyosopo (repo owner). Note: local gh CLI currently authed as `chiya-lab`; push identity must be reconciled to chyosopo before pushing.
- Vercel team: nexphoria (new project imports chyosopo/nexphoria-site).
- Cloudflare zone: nexphoria.com.
- Claude Code CLI (Claude Max) for heavy builds; Claude Desktop on the Nexphoria account.
- Bloom brand session: `8c558cc7-9ceb-4959-9ead-eac4f6a3cc1f`.

## Reference Docs In-Repo
Design: `DESIGN_SYSTEM_LOCK.md`, `LOCKED_DESIGN_SPEC.md`, `ART-DIRECTION.md`. SEO: `AI_SEO_PLAYBOOK.md`, `ai_seo_brief.md`. Analytics: `ANALYTICS.md`. Punch list: `PUNCH_LIST.md`, `QA_REPORT.md`, `SELF_GRADE.md`.
