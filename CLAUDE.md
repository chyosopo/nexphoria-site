# CLAUDE.md — Nexphoria Marketing Site: Operating Contract

This file governs every agent (Claude Code, Atlas, any assistant) that touches this repo.
Read it before you write a single line. It is standing law, not suggestion.

---

## What This Repo Is
The **marketing site** for **Nexphoria Research LLC** — a physician-guided peptide telehealth brand.
Full-stack: **Vite + React 18 + wouter** client → static build in `dist/public`; a thin **Express 5** server (`server/`) serves that static output with SPA fallback and exposes a few lightweight API routes. Build via `tsx script/build.ts` → client (`dist/public`) + server bundle (`dist/index.cjs`).

## What This Repo Is NOT
It is **not** the medical engine. Intake, orders, payments, prescriptions, and ALL patient data (PHI) live in **Bask Health + MDI Integrations** (MDI Providers PLLC physicians, Strive pharmacy). 

**PHI NEVER touches this repo. No exceptions.** No patient records, no intake payloads, no order data, no real health answers committed to git or written to any repo-side database.

> ⚠️ Boundary watch: `server/routes.ts` + `server/storage.ts` currently define `/api/waitlist`, `/api/contact`, `/api/intake-click`, `/api/checkout` writing to a local SQLite via `storage`. `/api/checkout` accepts "health flags + cart" for "physician review." This is a PHI-adjacency risk. Real intake/checkout must route to Bask/MDI, never persist PHI in-repo. Treat this layer as staging-only scaffolding pending medical-engine wiring and legal review.

---

## Standing Laws (never violated)
1. **Design tokens only — current sheet: PORCELAIN & NAVY** (chosen by Chiya
   2026-09-04 from three costed options in the Spine plan, option C, replacing
   Graphite & Ice: navy ink #0F2140 on porcelain #F6F7F9, navy bands #0B2A5B,
   one accent #2F6FD6, pale-ice #BFD6F5 on dark bands, one sans face, no
   yellow, no serif). The paragraph below is the previous sheet, kept as
   history; the reason to ask before repainting still stands.
   PREVIOUS: GRAPHITE & ICE (chosen by Chiya
   2026-08-13 from three costed options, replacing Porcelain & Navy).
   Cold-white canvas #F7F8FA, graphite ink #17191C, true-graphite night
   #101317, ice-blue accent #2B6CB0. Women's world runs the SAME graphite
   system with a rose accent #A03D6B on a barely-warm canvas — one system,
   two accents, rather than two separate palettes. Every pair verified
   WCAG AA in both worlds.

   HISTORY, kept because it is the reason to ask before repainting: the
   sheet was Porcelain & Navy, reaffirmed 2026-07-06 ("can we keep our
   colors?") after the Bone & Espresso experiment from the
   theprotocole.com study was reverted the same day — the protocole
   GRAMMAR stayed, its palette did not (docs/PROTOCOLE-STUDY.md). Palette
   changes here have a history of being reverted, so propose options and
   get a decision; do not repaint on inference. Graphite & Ice was an
   explicit override by the principal, not an agent's choice.

   No off-palette color introductions. Use the token system; do not
   hardcode hex, fontSize, radius, shadow, transition, or letter-spacing
   off-token (the design audit tracks these — do not regress the counts).
   Negative tracking is tokenised: --nx-ls-display / -tight / -snug /
   -normal. Do not reintroduce inline letterSpacing literals.
2. **Two worlds, one engine.** Same medical engine underneath. Under
   Graphite & Ice (2026-08-13) the worlds share one neutral system and
   separate on ACCENT plus canvas temperature — men ice-blue on cold white,
   women rose on barely-warm — rather than the previous azure/steel vs
   orchid/rose-quartz split palettes.
3. **The voice — AMENDED 2026-09-05 (Chiya, after enhanced.com): the
   enhanced register for DISPLAY copy.** Headlines, tile titles, closers
   and buttons are short, declarative, second person, set in caps: "LOSE
   THE WEIGHT. KEEP THE MUSCLE." / "BUILT AROUND YOUR BASELINE." / "KNOW
   WHAT YOU'RE AFTER?" Performance words (stronger, sharper, leaner,
   rested, harder) name the goal. Body copy stays plain and factual. The
   guardrails below still hold: a goal is not a guarantee, "if
   appropriate" and the FDA clauses stay, no urgency, no discounts, no
   counts, no "free", no comparison. docs/VOICE.md is the deck.
   PREVIOUS (kept as history): **Institutional bank voice.** Calm, precise, authoritative. No hype, no exclamation marks, no urgency theater, no discount-brand energy.
   **Never defensive negation** (Chiya 2026-07-14: "Transparent pricing.
   No hidden fees" killed sitewide): a premium house does not deny
   trickery — assurance is stated as completeness. House phrases: "One
   number a month. Everything within it." / "The figure is complete." /
   "complimentary" and "included," never "free" or "no fee." Legal and
   safety disclaimers (FDA, "if prescribed") are exempt and untouched.
   **Inform, never persuade** (Chiya 2026-09-04: "we present an amazing
   product, we give you the information, we teach you what it is good for,
   what it can treat and where it helps; we are not trying to sell you or
   change your mind"). So: no pricing page (price is a fact on the product
   page, stated once, beside the medicine); no "best value", "save N%",
   "try it", "most popular", "recommended", "you save" badges or rows; no
   cross-sell shelves in the cart; no "reserve your price" or locked-price
   language (a pending medicine offers one email when it is available); no
   "ready when you are" closers. Term differences are stated as facts
   ("10% less per month"). The reader decides.
4. **Crimson is reserved for blood imagery only.** Never decorative, never a UI accent.
5. **PHI never in the repo.** (See above.)
6. **Never declare work "done."** Work produces a *shrinking punch list*: verified / pending / failed.
7. **Verify every claim with actual command output.** If you say a gate passed, you ran it and you have the output.

---

## Gate Battery — run ALL TEN before EVERY commit
A commit ships only if these pass / non-regress. Use Node 20 LTS (`.nvmrc` pins it; better-sqlite3 does not compile on Node 26).

```
npm run check             # 1. tsc — must be clean (currently 0 errors; keep it 0)
npm run smoke             # 2. smoke routes — all must PASS (currently 50/50)
npm run audit:data        # 3. data drift — no drift; gated/orphan items must stay excluded
npm run audit:design      # 4. design tokens — counts must NOT regress vs the printed baseline
npm run audit:funnel      # 5. ≤3 clicks entry→price+buy in real Chromium (build first)
npm run audit:compliance  # 6. business facts real, not placeholder (blocks apex deploy)
npm run audit:legitscript # 7. LegitScript requirements vs the RENDERED artifact (build first)
npm run audit:catalog     # 8. catalog assumptions — derived figures finite, live surfaces
                          #    populated. Catches the failure mode a catalog cut causes:
                          #    not a crash, but correct-looking code rendering nothing.
npm run audit:a2p         # 9. A2P 10DLC / SMS — the disclosures carriers check, asserted
                          #    against the PRERENDERED HTML per route (build first). A
                          #    clause that is bundled but not rendered still fails.
npm run audit:voice       # 10. house voice — law 3, defensive negation, against the
                          #    PRERENDERED HTML (build first). Law 3 was written down in
                          #    2026-07 and drifted anyway: by 2026-08-13 the site carried
                          #    a dozen "not a checkout flow / never an algorithm"
                          #    constructions. A law nobody can check is a preference.
                          #    Exemptions are LITERAL strings with a stated reason
                          #    (clinical, FDA, or A2P-mandated wording) — never patterns.
```
Also run `npm run build` before deploy-affecting commits, and `npm run audit:bundle` when touching entry/imports (entry ≤300KB budget, recharts banned from entry, Bloodwork stays lazy).

**One commit per phase. Descriptive message. Push.**

---

## Node / Toolchain
- **Node 20 LTS required** (`.nvmrc` → 20). Node 26 breaks native `better-sqlite3`. Run `nvm use` in this dir.
- Package manager: npm. Single root `package.json` (name `rest-express`); the client has no separate package.json.
- Aliases (vite): `@` → `client/src`, `@shared` → `shared`, `@assets` → `attached_assets`.

## Deployment Shape (important)
- The **client is fully static** (`dist/public`) with SPA fallback — deployable to Vercel with an SPA rewrite (all routes → `/index.html`).
- The **Express API routes are NOT static.** On a static-only host they won't run until ported to serverless functions or a Node runtime. For staging, the marketing pages render fully static; the 4 API endpoints are a pending item.
- `vite.config.ts` uses `base: "./"` and outputs to `dist/public`.

## Domain Safety (critical) — updated 2026-07-10, verified by live probe
- `nexphoria.com` apex → **Cloudflare Pages project `nexphoria`** (direct
  upload, no git integration; production = branch `main`). Deployed from the
  Mac via `npx wrangler pages deploy <dir> --project-name=nexphoria
  --branch=main --commit-dirty=true` — wrangler OAuth creds with pages:write
  live in `~/Library/Preferences/.wrangler/` (auto-refresh).
  ⚠️ Deploy a COPY of `dist/public` with `404.html` REMOVED: a top-level
  404.html disables CF Pages' automatic SPA fallback (and beats `_redirects`),
  turning every deep link into a hard 404. The 404.html is gh-pages-only.
  As of 2026-07-10 the apex serves design/azure fd154fb; deep links 200 ✓.
- `chyosopo.github.io/nexphoria-site` → CI auto-deploy of `design/azure`
  (gh-pages). Preview; needs 404.html (rafgraph SPA hack) — keep it in dist.
- Apex deploys are PUBLIC publishes → Chiya's explicit go-ahead each time
  (hard rule 2). Do NOT touch nameservers or apex DNS without her decision.

## Hard Rules
1. No real-money actions without approval.
2. No public-facing publish (or apex cutover) without approval.
3. No PHI in the repo — ever.
4. No off-token color/design regressions.
5. No hallucinated results — real command output only.
6. Never "done" — shrinking punch list only.

## Two-Agent Coordination (active since 2026-07-03)
TWO Claude agents work this repo concurrently: **Atlas** (OpenClaw/Claude Code on the Mac —
has a browser, owns visual verification) and **Sandbox Claude** (claude.ai chat — headless).
Both push `design/azure` and deploy `gh-pages`. Rules that prevent clobbering:

1. **Before starting work AND before every push:** `git fetch origin design/azure && git rebase origin/design/azure`.
   On push rejection: fetch → rebase → retry. Never force-push design/azure.
2. **Before every deploy:** hard-sync the pages clone first —
   `git fetch origin gh-pages && git reset --hard origin/gh-pages` — THEN build from a
   freshly-rebased design/azure and copy. A deploy built from a stale tree ERASES the other
   agent's shipped work (the copy step is wholesale). `touch .nojekyll` stays mandatory.
3. **Lane split (soft, to minimize mid-file collisions):**
   - **Atlas:** flagship visual pages (Home, Science, LabTesting, Pricing, Bloodwork),
     type-token migration (D-LOGIC Finding 1), imagery reach + new Bloom generation,
     amber/rust/bg-cream alias retirement (needs eyes), Playwright/E42, web-vitals/E33.
   - **Sandbox:** data catalogs, SEO/meta/structured data, docs/audits, copy depth on
     non-flagship pages, gate scripts. 
   Crossing lanes is fine for small fixes — the fetch-rebase discipline is what matters.
4. **Both run ALL six gates before deploying** (tsc · build · smoke 39 · audit:data ·
   audit:bundle · audit:design incl. token-integrity). The gates are shared law.
5. **Commit messages state WHAT and WHY** — they are the inter-agent changelog. Read
   `git log` from the other agent before overlapping its files.
