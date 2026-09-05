# COPY-V4: the reader's sentence, for the files the copy agent does not own

Companion to docs/VOICE.md v3 and the copy pass of 2026-09-05 (evening).
Chiya: the copy still reads like a process manual. Every line the reader
meets must be a confident, plain sentence about them and their goal, in
the register of Maximus, Hims and Alyve, framed as the new era of peptide
medicine: the body's own signals, prescribed by a physician, with the dose
set from your blood.

The data files were rewritten directly (hero, goalTeaching, spine,
milestones, pathway, forWhom, monitoring `why`, and the outcome /
mechanism / tagline / bestFor / timeline effects of the two catalogs).
The rows below are the strings that live in TSX files owned by other
agents, or in data fields outside the copy agent's list. Each is an exact
old → new for the lead to apply. Every clinical fact, week and marker is
unchanged; "if appropriate" and "if prescribed" stay; nothing here trips
`scripts/audit-voice.ts`.

## client/src/pages/HowItWorks.tsx

The `d` paragraphs are "the deck paragraph, verbatim", and they are
fragments. These make each one a sentence to the reader, matching the
five ROAD steps in `client/src/data/spine.ts` word for word. (This file is
in another agent's working tree this evening; the old strings are as read
from disk at 2026-09-05 evening.)

| Line | Old | New |
|---|---|---|
| 36 | `d: "A medicine or a protocol, and a term of one, three, six or twelve months."` | `d: "You choose a medicine or a protocol, and a term of one, three, six or twelve months."` |
| 41 | `d: "Health history, current medicines and the goal, answered at checkout. A few minutes."` | `d: "Right after you order, you spend a few minutes on your history, your medicines and your goal."` |
| 46 | `d: "A licensed U.S. physician reviews the answers and writes the prescription, or explains why not. If not, nothing is made and the refund policy applies."` | `d: "A licensed U.S. physician reads your answers and writes the prescription if it is appropriate, or explains why not. If not, nothing is made and the refund policy applies."` |
| 51 | `d: "The medicine ships cold with an at-home blood kit. The draw comes before the first dose; the physician sets the dose from the results."` | `d: "The medicine ships cold with an at-home blood kit. You draw your blood before the first dose, and the physician sets your dose from the results."` |
| 56 | `d: "The same panel again. The physician compares the two and continues, adjusts or stops the dose."` | `d: "You draw the same panel again. The physician compares the two and continues, adjusts or stops your dose."` |

## client/src/pages/SoloPDP.tsx

| Line | Old | New |
|---|---|---|
| 227 | `<p id="solo-blood-title" className="nx-eyebrow">The blood.</p>` | `<p id="solo-blood-title" className="nx-eyebrow">Your blood work</p>` (a stopped label, the v2 grammar; an eyebrow carries no full stop) |
| 229 | `The panel is drawn at home before the first dose and repeated at week {RETEST_WEEK}.` | `You draw the panel at home before the first dose, and again at week {RETEST_WEEK}.` (the `For {name}, …` clause that follows is unchanged) |

## client/src/pages/StackPage.tsx

| Line | Old | New |
|---|---|---|
| 222 | `The physician compares the two panels and adjusts the dose from what changed.` | `You draw the panel at home before the first dose and again at week 12, and the physician compares the two and adjusts your dose from what changed.` (the protocol page never says when the two draws happen; the medicine page does) |

## client/src/components/PdpFaq.tsx

| Line | Old | New |
|---|---|---|
| 73 | `a: "An at-home blood kit of 24 markers ships with the first order, included. The draw is before the first dose, and the physician sets the dose from the results. At week 12 the same test is drawn again and compared.",` | `a: "An at-home blood kit ships with your first order, included. You draw before the first dose, the physician sets your dose from the results, and at week 12 you draw the same panel again for comparison.",` |
| 90 | `a: "Yes. The order is placed first, then a quick online visit follows. If the physician does not prescribe, nothing is made and the refund policy sets out what is refunded.",` | `a: "Yes. You place the order first, then a quick online visit follows. If the physician does not prescribe, nothing is made and the refund policy sets out what is refunded.",` |
| 96 | `a: "A term is paid up front: one month, or three, six or twelve months at 10, 15 or 20% less per month. Longer terms include more blood testing. At the end of the term, renewing is a choice.",` | `a: "You pay a term up front: one month, or three, six or twelve months at 10, 15 or 20% less per month. Longer terms include more blood testing, and at the end of the term, renewing is your choice.",` |

Two notes on this file, for the lead rather than as rows:

- Line 73 types the count "24 markers". `client/src/data/monitoring.ts`
  says counts are derived, never typed, and `data/biomarkerPanel` exports
  `PANEL_TOTAL_MARKERS` for exactly this. The new row above drops the
  number; if the lead wants it kept, it should be `${PANEL_TOTAL_MARKERS}`.
- Line 83 composes the first-weeks answer as
  `${firstMark.effect}, in ${firstMark.wk.replace(/^Wk /, "week ")}`,
  which reads "…, in Day 1" / "in Night 1" / "in Dose 1" for the medicines
  whose first mark is a day, a night or a dose. It only fires when a
  medicine has no `feelBy`, and every live medicine has one today, so
  nothing renders wrong; it is a latent seam.

## client/src/components/CareCards.tsx

| Line | Old | New |
|---|---|---|
| 32 | `` m?.doseMarker ? `The dose is set from ${m.doseMarker} and reviewed at week ${RETEST_WEEK}.` : `The dose is set from the panel and reviewed at week ${RETEST_WEEK}.` `` | `` m?.doseMarker ? `Your dose is set from ${m.doseMarker} and reviewed at week ${RETEST_WEEK}.` : `Your dose is set from the panel and reviewed at week ${RETEST_WEEK}.` `` |

## client/src/data/stacksCatalog.ts, field `synergy` (outside the copy agent's field list)

The `synergy` paragraph renders centred under the vial line-up on every
protocol page. Three of the six open as a list of noun phrases. Optional
rows, same facts:

| Protocol | Old | New |
|---|---|---|
| recover | `The growth hormone peptide for overnight repair, BPC-157 for the repair signal at the site, TB-500 for moving repair cells through the whole body. Each does a different job.` | `The growth hormone peptide works on overnight repair, BPC-157 sends the repair signal at the site, and TB-500 moves repair cells through your whole body. Each does a different job.` |
| ascend | `NAD+ for cellular energy, MOTS-c for the pathways exercise switches on, GHK-Cu for collagen and skin, epitalon as a course for telomere maintenance. Each does a different job.` | `NAD+ tops up your cellular energy, MOTS-c switches on the pathways exercise does, GHK-Cu works on collagen and skin, and epitalon runs as a course for telomere maintenance. Each does a different job.` |
| lucidity | `Semax for focus in the morning, Selank for a steadier mood through the day, DSIP for deeper sleep at night. Each does a different job.` | `Semax works on focus in the morning, Selank on a steadier mood through the day, and DSIP on deeper sleep at night. Each does a different job.` |

## Checked and left alone

- `client/src/components/Pathway.tsx` line 23, the measure line under the
  three tiles (`IGF-1, read at week 12, is the measure the dose is set
  against.` / `Cortisol, thyroid are read at week 12 for context.`). It is
  a fact in one sentence and the marker names must keep their case
  (HbA1c, hs-CRP), so a "your physician reads …" form would need the
  `lc` helper SoloPDP already has; not worth the seam.
- `client/src/data/monitoring.ts` `BASELINE.line` (outside the `why`
  list): already one sentence to the reader, unchanged.
- `client/src/data/goalTeaching.ts` `GOAL_SHOUT`: the nine v3 headlines
  Chiya approved this afternoon, unchanged.
- The hero `shout`, `subline`, `cta` and `facts` in `client/src/data/hero.ts`:
  the v3 strings, unchanged; only the unused `lines` and `micro` were
  made sentences.
