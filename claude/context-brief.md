# Context brief (read first in a new session)

Updated 2026-09-03, end of the night pass. Branch `design-rollback` is the
working branch and what the preview serves. nexphoria.com serves 8fd9557
and is NOT to be deployed without Chiya's explicit go-ahead.

## Where things live
- Plan: docs/MASTER-PLAN.md (Part 6 has the step status; Part 7 the
  decisions only Chiya can make).
- Copy: docs/COPY-DECK.md (every line with job, feeling, fact; OPEN claims
  list; everything retired and why).
- Lab partner: docs/LAB-PARTNER.md (MyLabsDirect vs SiPhox, questions).
- Model data: client/src/data/monitoring.ts (panel, per-peptide watch lists,
  intake screens; SIGNED_OFF=false).
- Pre-checkout block: client/src/components/PayToday.tsx.
- Preview deploy: GitHub Actions deploy-apex.yml, ref design-rollback,
  input branch=preview-10k → https://preview-10k.nexphoria-1eu.pages.dev
  (never dispatch with the production branch name).
- Local check: `node review/serve.mjs` on :4173 after `npm run build`,
  fonts from review/fonts, screenshots via review/pw-*.mjs (CDP capture).

## Standing truths
- Start first; doctor prescribes from the questionnaire; one full panel at
  week 12, included, same for everyone; dose adjusted from it. Count is
  derived (PANEL_TOTAL_MARKERS = 24 today). The number 99 is retired.
- Something is charged at checkout; checkout can precede the questionnaire;
  the refund policy governs a decline. Exact up-front amount: OPEN.
- Voice: you, plain, friendly; "doctor" in prose; no em dashes anywhere;
  no defensive negation; no outcome claims; no fabricated people or stats.
- Ten gates before every commit (CLAUDE.md). All PASS as of this brief.

## Open for Chiya
Prices and bundles (step 5); up-front charge and refund on decline; lab
partner choice; physicians' sign-off on the panel; the OPEN claims list in
docs/COPY-DECK.md (third-party testing, portal messaging, HIPAA, HSA/FSA,
shipping window, cancel-before-dispense); roll the burned Cloudflare
token; the feeling lines on the goal pages.
