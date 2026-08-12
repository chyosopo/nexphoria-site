# HUNDRED.COM DESIGN OVERHAUL — Claude Code Brief

## Owner directive
Make every page CLEAN, SPACIOUS, SIMPLE — studied against hundred.com's rhythm.
The owner (Chiya) specifically said to study hundred.com's rhythm, spacing, clean cards,
and white-space dominance BEFORE changing design. This is that pass.

## What hundred.com does (reference DNA — reproduce the RHYTHM, not the content)
1. **White space dominates.** Huge vertical breathing room between every section.
   Sections feel unhurried. Nothing is cramped. The page is mostly calm empty space.
2. **Single-column narrative flow.** One idea per section, stacked vertically. The eye
   moves straight down. No dense multi-column grids fighting for attention.
3. **Numbered "How It Works" steps** with generous vertical rhythm — big number, short
   headline, one calm paragraph. Lots of air around each step.
4. **Clean category cards** — biomarker/category cards are simple: a label, a count, a
   short list. Flat, quiet, generous padding, minimal borders. No heavy shadows, no busy
   gradients, no decorative noise inside cards.
5. **One dominant CTA per section.** Never a wall of competing buttons.
6. **Physician / credibility band** rendered calmly — headshots + name + role, plenty of
   space, no clutter.
7. **Type hierarchy is restrained** — a few clear sizes. Big serene headlines, comfortable
   body, no sub-legible micro-text.

## HARD CONSTRAINTS (Nexphoria law — do NOT break)
- **Design tokens only.** Porcelain & Navy. Use existing `--nx-*` tokens. Do NOT introduce
  off-palette colors. Crimson is reserved for blood imagery ONLY — never a UI accent.
- **Spacing:** build on the EXISTING system — `--nx-section-y`, `.nx-section-y`,
  `.nx-container`. If sections need more air, INCREASE the section-y tokens / apply
  `.nx-section-y` consistently. Do not invent a parallel spacing system.
- **Two worlds, one engine:** men = azure/steel, women = orchid/rose-quartz. Keep both.
- **Institutional bank voice.** No hype, no exclamation marks, no urgency theater,
  no discount-brand energy. (hundred.com uses promo-code urgency — DO NOT copy that tone.)
- **PHI never in the repo.** No patient data anywhere.
- **No sub-10px type.** Purge any micro-text you touch.

## SCOPE (this pass)
Apply the clean/spacious/simple treatment across the marketing pages. Prioritize the
flagship surfaces first, then propagate the rhythm everywhere:
- Home.tsx, MenHome.tsx, WomenHome.tsx (the world homes)
- HowItWorks.tsx (make it a real numbered-step spacious flow like hundred's)
- Science.tsx, LabTesting.tsx, Bloodwork.tsx, Pricing.tsx
- ProtocolsIndex.tsx, Category.tsx, PeptidesCatalog.tsx, StackPage.tsx, SoloPDP.tsx
- About.tsx, Physicians.tsx, FAQ.tsx, Community.tsx, Journal.tsx

Concretely:
- Increase white space / vertical rhythm between sections (apply `.nx-section-y`,
  raise section-y tokens if needed).
- Simplify cards: flatten heavy shadows, reduce border noise, add generous internal
  padding, quiet the visual weight. Aim for hundred's calm flat card feel within our tokens.
- Reduce competing CTAs to one dominant CTA per section.
- Tighten type to a restrained hierarchy; kill any cramped/dense clusters.
- Keep everything single-column-narrative where a dense grid currently fights the eye.

## GATE BATTERY — MANDATORY before any commit (all six must pass / non-regress)
Run in this dir with Node 20 (`nvm use`):
1. `npm run check`        (tsc — clean, no NEW errors; 12 pre-existing known)
2. `npm run build`        (must succeed)
3. `npm run smoke`        (38 pass / 0 fail)
4. `npm run audit:data`   (pass)
5. `npm run audit:bundle` (entry <=300KB, recharts-free, Bloodwork lazy)
6. `npm run audit:design` (token integrity; fontSize/radius/shadow NON-REGRESSING or better)

## GIT DISCIPLINE
- Branch: `design/azure`. Before starting and before every push:
  `git fetch origin design/azure && git rebase origin/design/azure`.
- ONE commit per coherent phase. Descriptive message stating WHAT + WHY (inter-agent changelog).
- A second agent (Sandbox Claude) also works this repo — never force-push, always rebase.
- Do NOT deploy to gh-pages yourself — Atlas handles deploy + browser verification.
- Do NOT touch domains/DNS/apex. Do NOT touch PHI/medical engine.

## DELIVERABLE
Commit the cleaner, more spacious, hundred-inspired pages to `design/azure` with all six
gates green. Report per-page WHAT changed and the final gate results as real command output.
Never say "done" — report as a shrinking punch list: verified / pending / failed.
