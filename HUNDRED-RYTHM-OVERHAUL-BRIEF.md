# FULL DESIGN OVERHAUL — hundred.com + rythmhealth.com — EVERY PAGE, 100x

## Owner directive (Chiya)
Level up EVERY page 100x. Focus on **design / UI / UX — not code quality**.
Clean, spacious, breathing, simple — like hundred.com and rythmhealth.com.
Every page, every pixel. This is the flagship visual pass.

## REFERENCE DNA (reproduce the PATTERNS + FEEL, never the copy or the hype)

### hundred.com
- White space DOMINATES — huge calm vertical rhythm, unhurried sections.
- Single-column narrative flow — one idea per section, eye moves straight down.
- Numbered "How It Works" steps — big number, short headline, one calm paragraph, lots of air.
- Flat calm cards — quiet borders, generous padding, NO heavy shadows/gradients/noise.
- Biomarker CATEGORY cards — label + count + short marker list, flat and simple.
- Physician / credibility band — headshots + name + role, spacious, no clutter.
- One dominant CTA per section. Restrained type hierarchy — a few clear sizes.

### rythmhealth.com
- TRUST BADGE STRIP — CLIA Certified · CAP Accredited · HIPAA Aligned · FDA Cleared · HSA/FSA
  Eligible · 30-day money-back. Rendered as a calm quiet row, not loud.
- STAR RATING + review count as social proof (e.g. 4.8/5).
- SOCIAL PROOF carousel — expert/clinician quotes with name + credential (NOT celebrities;
  for Nexphoria use physicians / clinical voices — no fake endorsements, no invented people).
- Painless numbered "How it Works" — 1 / 2 / 3, big and airy.
- REVIEW / TESTIMONIAL cards — quiet cards, quote + attribution (only real/placeholder-marked;
  do NOT fabricate patient testimonials — use structural placeholders clearly if content unknown).
- BIOMARKER CHIPS — small rounded pill chips listing markers.
- Guarantee / risk-free badge near CTA.

## THE PATTERN LIBRARY TO BUILD / APPLY (owner's explicit list)
1. Massive white space (spacious vertical rhythm every section).
2. Flat calm cards (flatten shadows, quiet borders, generous padding).
3. Numbered steps (big airy 1/2/3 flows).
4. Social proof (clinical-voice quotes; trust strip; rating — NO fabricated people/testimonials).
5. Biomarker chips (rounded pill chips for markers).
6. Dashboard mockups (clean UI preview of results/protocol dashboard — abstract, no PHI).
7. Trust badges (CLIA/CAP-style calm strip adapted to Nexphoria's real credentials:
   licensed physicians · 503A pharmacy · prescription required · lab-monitored — use ONLY
   claims that are TRUE for Nexphoria; do not invent CLIA/FDA claims we can't back).
8. Clean FAQ accordion (quiet, spacious, smooth reveal).

## HARD CONSTRAINTS (Nexphoria law — NEVER break)
- **Tokens only.** Porcelain & Navy. Use existing `--nx-*` tokens. NO off-palette colors.
  Crimson = blood imagery ONLY, never a UI accent.
- **Spacing:** build on the EXISTING system — `--nx-section-y`, `.nx-section-y`, `.nx-container`.
  Increase breathing room via those tokens / fluid clamps. No parallel spacing system.
- **Two worlds, one engine:** men=azure/steel, women=orchid/rose-quartz. Keep both.
- **Institutional bank voice.** No hype, NO exclamation marks, no urgency theater, no
  discount-brand energy, NO promo-code banners. (Both refs use promo urgency — DO NOT copy it.)
- **Truth in trust claims.** Only badges/claims TRUE for Nexphoria. No fabricated
  certifications, no invented endorsers, no fake patient testimonials/ratings. If a proof
  element needs real data we don't have, build the clean COMPONENT with a clearly-marked
  placeholder — never fabricate a person, quote, or number presented as real.
- **PHI never in the repo.** Dashboard mockups are abstract/sample only.
- **No sub-10px type.** Purge micro-text you touch.

## SCOPE — EVERY marketing page
Home, MenHome, WomenHome, HowItWorks, Science, LabTesting, Bloodwork, Pricing,
ProtocolsIndex, Category, BuildYourStack, PeptidesCatalog, StackPage, SoloPDP,
About, Physicians, FAQ, Community, Journal, JournalArticle, Assessment, Contact,
Cart, Checkout, legal/*.
Prior passes P1–P6 already raised global rhythm + several flagships — BUILD ON THEM, go deeper.

## GATE BATTERY — MANDATORY, all six before EVERY commit (Node 20: `nvm use`)
1. `npm run check`        (tsc — no NEW errors)
2. `npm run build`        (succeed)
3. `npm run smoke`        (38/38)
4. `npm run audit:data`   (pass)
5. `npm run audit:bundle` (entry ≤300KB, recharts-free, Bloodwork lazy)
6. `npm run audit:design` (token integrity; fontSize/radius/shadow NON-REGRESSING or better)

## GIT DISCIPLINE
- Branch `design/azure`. Before start + every push: `git fetch origin design/azure && git rebase origin/design/azure`.
- ONE commit per coherent phase (H1, H2, ...). Message states WHAT + WHY (inter-agent changelog).
- A second agent works this repo — never force-push, always rebase.
- Do NOT deploy gh-pages (Atlas deploys + browser-verifies). Do NOT touch domains/DNS/apex/PHI.

## DELIVERABLE
Every page cleaner / more spacious / hundred+rythm-grade, all six gates green per phase,
committed to design/azure. Report per-page WHAT changed + real gate output.
Never "done" — shrinking punch list: verified / pending / failed.
