# VISUAL 100X OVERHAUL — enterprise-grade, hundred.com + rythmhealth.com — LIVE on apex

## Owner directive (Chiya) — 2026-07-03 22:48 EDT
Homepage is 10% of where it needs to be. Other pages are ~1%. He wants ENTERPRISE-GRADE
visuals matching hundred.com and rythmhealth.com. FOCUS ONLY on design / UI / UX — make it
beautiful, spacious, clean. nexphoria.com is LIVE on Cloudflare Pages — every deploy is live.

## THIS IS A VISUAL/DESIGN PASS — not a code-quality pass
Ambition level: make each page look like a funded health startup's site. Real visual
craft — hierarchy, spacing, rhythm, polish. The prior P1–P6 / H1–H7 passes only adjusted
spacing tokens; that was NOT enough. Go much further on actual visual design.

## PRIMARY REFERENCE: hims.com (owner's #1 target — 2026-07-03 22:56)
Make it look like hims.com FIRST, then layer the best of hundred + rythm.
hims.com DNA to reproduce (feel + patterns, never their copy):
- Clean minimal premium DTC-telehealth aesthetic; approachable but high-end.
- Big bold confident sans headlines; short punchy subheads; lots of white space.
- Warm muted editorial product/lifestyle photography (we already have premium portraits).
- Simple rounded product cards — soft corners, quiet, generous padding, one product per card.
- Minimal nav, ONE clear CTA per section ("Get started" energy — but bank voice, no hype).
- Calm sectioned scroll: hero → how it works → products → proof → FAQ → CTA.
- Subtle earthy/muted palette accents WITHIN our Porcelain & Navy tokens (no off-palette).

## SECONDARY REFERENCES (reproduce the FEEL + PATTERNS, never the copy or promo hype)
### hundred.com
- Massive white space dominates; unhurried single-column narrative flow.
- Big serene headlines, restrained type scale, generous line-height.
- Flat calm cards — quiet 1px borders, soft/no shadow, generous internal padding.
- Numbered "How It Works" — large numerals, short headline, one calm line, lots of air.
- Biomarker CATEGORY cards; physician credibility band, spacious.
- ONE dominant CTA per section.
### rythmhealth.com
- Calm TRUST BADGE ROW (adapt to Nexphoria's REAL claims only).
- Star rating + review-count social proof (only if real; else clean placeholder component).
- Expert/clinical-voice quote strip (physicians — NO fabricated people/celebrities).
- Painless big numbered 1/2/3 flow.
- Quiet testimonial/review cards.
- BIOMARKER CHIPS — small rounded pill chips.
- Guarantee/risk-free badge near CTA.

## THE 8 PATTERNS TO BUILD + APPLY EVERYWHERE
1. Massive white space (spacious vertical rhythm every section).
2. Flat calm cards (quiet borders, soft/no shadow, generous padding).
3. Simple numbered steps (big airy numerals).
4. Social proof strips (clinical voice + trust row + rating — REAL claims only).
5. Biomarker chips (rounded pill chips).
6. Dashboard mockups (clean abstract UI preview of results/protocol — NO PHI, sample data).
7. Trust badge rows (Nexphoria's TRUE credentials: licensed U.S. physicians · 503A pharmacy ·
   HIPAA-compliant · prescription required · lab-monitored — NO invented CLIA/FDA claims).
8. Clean FAQ accordions (quiet, spacious, smooth reveal).

## HARD CONSTRAINTS (Nexphoria law — NEVER break)
- Tokens only: Porcelain & Navy `--nx-*`. NO off-palette colors. Crimson = blood imagery ONLY.
- Spacing on existing system: `--nx-section-y`, `.nx-section-y`, `.nx-container`, fluid clamps.
- Two worlds, one engine: men=azure/steel, women=orchid/rose-quartz. Keep both.
- Institutional bank voice: NO hype, NO exclamation marks, no urgency/promo banners.
- TRUTH: only real Nexphoria claims. No fabricated certs, endorsers, testimonials, ratings.
  Build the COMPONENT with a clearly-marked placeholder if real content is owner-gated.
- PHI never in repo. Dashboard mockups are abstract/sample only.
- No sub-10px type.

## SCOPE — EVERY page, homepage FIRST (it's only 10% there)
Home / MenHome / WomenHome (DEEP homepage rebuild — biggest gap), then HowItWorks, Science,
LabTesting, Bloodwork, Pricing, ProtocolsIndex, Category, BuildYourStack, PeptidesCatalog,
StackPage, SoloPDP, About, Physicians, FAQ, Community, Journal, JournalArticle, Assessment,
Contact, Cart, Checkout, legal/*.

## GATE BATTERY — all six before EVERY commit (Node 20: `nvm use`)
1. npm run check  2. npm run build  3. npm run smoke (38/38)  4. npm run audit:data
5. npm run audit:bundle (entry ≤300KB, recharts-free, Bloodwork lazy)
6. npm run audit:design (token integrity; fontSize/radius/shadow NON-REGRESSING or better)

## GIT + DEPLOY (LIVE APEX — deploy after each commit)
- Branch design/azure. Before start + every push: `git fetch origin design/azure && git rebase origin/design/azure`.
- ONE commit per coherent phase (V1, V2, ...); message states WHAT + WHY. Never force-push.
- DEPLOY after each commit — build then wrangler Pages deploy:
    nvm use
    npm run build
    unset CLOUDFLARE_API_TOKEN   # CRITICAL: the env token is DNS-only and FAILS on Pages.
                                 # wrangler's OAuth session HAS Pages access — use it.
    wrangler pages deploy dist/public --project-name nexphoria --branch main --commit-dirty=true
  (branch main = production = serves nexphoria.com live.)
- Do NOT touch DNS/domains/apex config. Do NOT set CLOUDFLARE_API_TOKEN. Do NOT touch PHI.

## DELIVERABLE
Every page visibly transformed toward enterprise hundred/rythm grade, homepage first, all six
gates green per phase, committed to design/azure AND deployed live per phase. Report per-page
WHAT changed + real gate output + the live deploy URL. Never "done" — shrinking punch list.
