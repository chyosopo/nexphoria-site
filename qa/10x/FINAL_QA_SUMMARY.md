# Hands Everywhere — 10x Editorial Saturation — FINAL QA SUMMARY

Date: 2026-06-29
Status: COMPLETE — all edits, build, prod server, full QA verified. NOT deployed (parent will deploy).

## Per-page EditorialHands spread counts (verified, no horizontal overflow at 1440x900 or 375x812)

| Route | Spreads | Captions |
|---|---|---|
| / (Home) | 7 bg-black sections | incl. FIG.01 "PRESCRIBED · COMPOUNDED IN U.S. PHARMACIES", FIG.02 "YOUR MORNING · YOUR PROTOCOL" + pre-existing editorial heroes/bands |
| /how-it-works | 2 | FIG.03 "YOUR CHART · WRITTEN BY HAND", FIG.04 "THE HANDOFF" |
| /science | 3 | FIG.08 "MEASURED IN MILLIGRAMS", pre-existing FIG.02, FIG.09 "WHAT THE DATA SHOWS" |
| /physicians | 3 | pre-existing FIG.01, FIG.02, FIG.10 "YOUR PHYSICIAN · ACTUALLY YOURS" |
| /about | 2 | pre-existing "OUR MISSION" consult, FIG.11 "CHOSEN · NOT PRESCRIBED BLINDLY" |
| /lab-testing | 4 | 2 pre-existing no-caption + FIG.03 + FIG.12 "YOUR BIOMARKERS · YOUR ROADMAP" |
| /peptides | 2 | FIG.13 "THE LIBRARY", tonal "PEPTIDES · RESEARCH-GRADE · ONE STANDARD" |
| /protocols | 2 | FIG.14 "FIVE PROTOCOLS · YOUR PICK", tonal "PROTOCOLS · SEALED · DIRECT TO YOUR DOOR" |
| /pricing | 2 | FIG.15 "WHAT YOU PAY FOR", tonal "ONE PRICE · ONE STANDARD · NO SURPRISES" |
| /community | 2 | FIG.16 "DAILY · TOGETHER", tonal "REAL PEOPLE · REAL CLINICIANS · ONE ROOM" |
| /contact | 2 | tonal "REAL TEAM · REAL CLINICIANS · ONE INBOX", FIG.17 "YOUR MESSAGE · READ BY A HUMAN" |
| /faq | 2 | FIG.18 "ANSWERS · STRAIGHT", tonal "NO HYPE · NO GRAY MARKET · ONE STANDARD" |
| /peptides/bpc-157 (PeptideDetail) | 2 | FIG.20 "COMPOUNDED · RESEARCH-GRADE", tonal "PRESCRIBED · COMPOUNDED · ONE STANDARD" |
| /assessment | 2 (inline interstitial imagery) | FIG.19 "YOU'RE BUILDING YOUR PROTOCOL" (md interstitial, handsHandoff) + tonal "MEASURED · NOT GUESSED" (lab interstitial, handsMeasure) |

Every route has 2+ hands placements. FIG sequence runs 01–04, 08–20.

## Pharmacy / FIG.05/06/07 — SKIPPED (correct)
Pharmacy.tsx does NOT exist in this codebase and is not a route. FIG.05/06/07 (assemble / draw-syringe / sealed) belonged to that fictional page and were correctly not placed. The brief's 15-page list maps to the 14 real pages + this non-existent page.

## Assessment.tsx special handling
The assessment is a full-screen single-screen funnel (useReducer, not SiteLayout, renders one viewport-fitting screen at a time). Full-bleed EditorialHands sections would break the fixed-viewport UX. Instead, hands imagery was added as low-opacity (opacity-[0.16]/[0.14]) absolute-positioned background `<img>` with gradient overlay inside the md and lab interstitial screens, with mono captions. Foreground content layered above via `relative`. Quiz state untouched. Static images, no motion.

## Build & server
- `npm run build` succeeded (client + server dist/index.cjs ~929.5kb; chunk-size warning benign).
- Prod server persistent via pplx-tool start_server on port 5000 (NODE_ENV=production node dist/index.cjs). Confirmed listening.

## QA verification (all PASS)
- Desktop 1440x900: all 13 SiteLayout routes — 2+ spreads, overflowX=false. Full-page PNGs saved.
- Mobile 375x812: all routes overflowX=false. Full-page PNGs saved.
- Mobile drawer: button-mobile-menu opens drawer, nav links visible — PASS.
- Quiz full flow end-to-end (12 steps): protocol-recovery → Q1-Q3 → stat interstitial (auto) → Q4-Q6 → md interstitial (FIG.19 + handsHandoff, legible) → Q7-Q9 (all no) → lab interstitial (tonal "MEASURED · NOT GUESSED" + handsMeasure, legible) → Q10-Q12 → Results screen ("PROTOCOL · WOLVERINE", $262/mo, email capture, Start MD intake CTA, disclaimer) — PASS.
- Captions: JetBrains Mono uppercase tracking-widest, acid-green #c6f184, legible over imagery.
- No horizontal scroll on any route at either viewport.

## Constraints respected
- Tagline locked, "peptides" only (never nootropics), no localStorage/sessionStorage/cookies, tokens (bg #0a0a0a, fg #fffff3, accent #c6f184, border #2a2a28), Switzer/Gambarino italic/JetBrains Mono, About mission-first, prefers-reduced-motion (static images, no parallax/blur/scroll motion), one Gambarino italic per interior page.

## Evidence
28 PNGs in /home/user/workspace/nexphoria-site/qa/10x/ (desktop + mobile full-page for 13 routes, plus assessment-lab-interstitial.png and assessment-results.png).

## NOT DEPLOYED — parent agent will deploy.
