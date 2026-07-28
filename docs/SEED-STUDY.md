# SEED-STUDY — seed.com grammar, extracted → Nexphoria transformation architecture
2026-07-21 · requested by Chiya: "check seed.com… can we fully transform our
site to look like seed. plan it, architect it."

Sources: live fetches of seed.com (home), seed.com/science, seed.com/daily-synbiotic
(2026-07-21) + the extensively documented Seed design system.

## Standing-law check (read first)
Per precedent (PROTOCOLE-STUDY, 2026-07-06: "can we keep our colors?"), we
adopt Seed's GRAMMAR AND ARCHITECTURE, not its palette. Porcelain & Navy
stays (law 1) unless Chiya explicitly overrides. Seed's register
("conversational authority — wellness optimism with clinical precision") is
adjacent to our bank voice; ours stays, theirs informs structure only.
Truth laws hold absolutely: no invented citations, no fake press, no
testimonials until real ones exist, no trademark theater.

---

## THE SEED GRAMMAR — what actually makes it feel the way it feels

1. **Numbers as identity.** Seed's most distinctive move: precision numerals
   ARE the brand. "24 strains." "38.7 Billion AFU." "10.57 log viability."
   "2800+ publications, 140,000 citations." Formulation blocks read like
   specimen labels: category · mg · AFU, in tabular type. The number is
   never decoration — it's the subject.
2. **Scientific nomenclature as design object.** Strain taxonomy set large
   and beautiful. The Latin is the aesthetic.
3. **The numbered pipeline.** /science is five numbered stages (01 Strains →
   02 Biofermentation → 03 Validation → 04 SHIME® → 05 Quality), laid out
   like a paper with figures and captions. Rigor communicated by STRUCTURE.
4. **The cross-section moment.** One signature diagram (ViaCap® capsule,
   outer/inner) that explains the delivery mechanism visually. Every
   science brand needs one owned diagram.
5. **Education before commerce.** "You are more than human — 38 trillion
   microbes…" The homepage teaches biology before it sells product.
6. **Credentialism, quantified.** 18 advisors, titles, institutions,
   publication counts. ATCC deposits, cGMP/HACCP/EFSA compliance listed
   like a filing.
7. **Sticky commerce spine.** PDP keeps product name + "Start Now" pinned;
   subscription framed as care ("30-day supply delivered monthly. Pause or
   cancel anytime"), price stated once, plainly.
8. **Quiz-first funnel.** "Take the Quiz" is co-equal with "Shop" from the
   first viewport.
9. **Claim hygiene.** Asterisked claims, "View Clinical Trials" links,
   testing badges (gluten-tested…) as icon+label pairs.
10. **One serif/sans system, sentence-case claims, ® discipline** — type is
    quiet; numerals and nomenclature do the display work.

## What Nexphoria already has (don't rebuild)
Two-worlds engine · token system (type/spacing/radius/tracking ladders) ·
porcelain palette · ≤3-click funnel · cadence ladder · panel picker ·
protocol selector · gift loop · honest failure paths · footer wordmark ·
25-event analytics scaffold · generated sitemap/llms.txt.

---

# THE TRANSFORMATION ARCHITECTURE — six phases

## S1 · The Data-Plate System (foundation — everything else consumes it)
New primitives, token-clean, both worlds:
- **`<SpecPlate>`** — Seed's formulation-block grammar for peptides:
  `COMPOUND · class · dose · concentration · format` in tabular numerals
  with small-caps units. Replaces ad-hoc dose lines on PDPs, stack pages,
  builder, catalog cards.
- **`<BigFigure>`** — the numbers-as-identity display: giant tabular
  numeral + small-caps unit + one-line caption ("99 MARKERS — drawn at
  baseline, re-drawn every 90 days"). Replaces mixed stat strips.
- **`<CiteSup>` + `<References>`** — superscript citation marks bound to a
  per-page numbered reference list (REAL sources only: the pubmed-linked
  literature already in data/peptides.ts evidence fields). Claim hygiene,
  Seed-grade.
- **Nomenclature line** — every peptide gets its taxonomy set as design:
  "BPC-157 — pentadecapeptide · Body Protection Compound · systemic".

## S2 · /science rebuilt as the numbered pipeline
Five stages, paper-like figures and captions, 01→05:
01 INTAKE (structured history) → 02 PANEL (99 markers, tiers) →
03 PHYSICIAN (board-certified review, can decline) → 04 COMPOUNDING
(503A · USP<797> · cold chain) → 05 RETEST (90-day, dose titration).
Each stage: numbered display heading, one figure, one BigFigure, citations.
Ends with the compliance filing block (state licensure, USP, FDA
disclaimers — already written, restructured) and a RESERVED advisory-board
slot that ships empty until Chiya names the Medical Director (no fakes).

## S3 · PDP anatomy, Seed-grade
- Sticky sub-nav spine: compound name + price + Start CTA pinned after
  scroll (we have a mobile buy bar; this is the desktop spine).
- SpecPlate replaces the dose/format tiles.
- "The delivery" section: our ViaCap moment (see S6 diagram) — vial →
  cold chain → SC administration, cross-sectioned.
- Evidence section: claims get CiteSup marks → References accordion
  ("View the literature") from existing evidence data.
- Subscription framed as care line under CTA: "A 30-day course, delivered
  monthly. Pause or cancel anytime." (voice-law compliant, already true).

## S4 · Homepage education block
Between hero and goal grid, one Seed-style teaching moment:
"Your biology is legible." — 3-figure strip (99 markers · 90 days · 503A)
with a short education paragraph per world (men: performance biology;
women: the same engine, her register). No commerce in the block.
RESERVED slots (ship empty, no fakes): press scroller, transformation
counter — until real press/cohort numbers exist.

## S5 · The quiz elevated
Rename/reframe the assessment entry sitewide as the co-equal first CTA:
"Find your protocol — 2 minutes" beside every "Start assessment".
The ProtocolSelector's chips become a 4-question standalone quiz page
(/fit) that routes: goal → route → world → assessment (pre-filled). Pure
front-end on existing selector data; the physician gate unchanged.

## S6 · The owned diagram (the ViaCap moment)
One signature SVG cross-section, used on home + PDPs + science:
**"Inside the vial"** — compounded peptide · concentration · sterile
crimp · cold-chain band — annotated like a lab figure. Built as themeable
SVG (currentColor accents; azure/rose per world). Bloom for the photoreal
variant; SVG is canonical.

## Sequence & effort
S1 2 days (Sandbox) → S2 1 day → S3 2 days → S4 0.5 → S5 1 → S6 1.
Each phase: gates + Chromium verification + one commit, per law.
S1+S2 first — they change how the whole site reads; S3-S6 compound on them.

## Explicitly NOT adopted from Seed
- Palette (law 1 — Porcelain & Navy stays; Chiya can override explicitly)
- "1 million transformations" -style scale claims (we have no cohort — truth law)
- Press/UGC content (no real press yet — slots reserved, never faked)
- Trademark theater (no ™/® we don't own)
- Discount-forward bundle banners (voice law 3)
