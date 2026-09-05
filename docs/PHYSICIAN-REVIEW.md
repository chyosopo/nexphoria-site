# Physician review — claims authored on 2026-09-05

Everything below is copy that makes a claim about the body, a molecule, or
what a person may notice. It was written in the plain register from the
published pharmacology of each molecule and from the catalog's own
mechanism, dose and monitoring data. None of it is medical advice, and every
page says so. **Arora Health & Aesthetics should read and sign off each file
before the apex launch.** Corrections go into the file named; nothing is
typed twice.

| File | What it claims | Where it renders |
|---|---|---|
| `client/src/data/pathway.ts` | Three steps per medicine: the signal, where it acts in the body, what changes; and the marker the physician reads. 22 entries. | Medicine page, "How it works in your body" |
| `client/src/data/milestones.ts` | What a person may notice, week by week, per medicine; what the physician looks for at week 12. 22 entries. "May" throughout. | Medicine page, "What to expect" |
| `client/src/data/forWhom.ts` | One line per medicine on who it is for (positive profile only). 22 entries. | Medicine page, "Who this is for" |
| `client/src/data/goalTeaching.ts` | One line per goal: what it feels like and what the medicines do about it. 9 entries. | Home, "By goal" |
| `client/src/data/evidence.ts` (`key` fields) | The key result of each already-sourced study, restated in one plain line. Derived from the existing `finding` only; no new citations. | Medicine page, "What the studies found" |
| `client/src/components/Ritual.tsx` | The how-to-take templates per route: fridge, draw N mL / N units on a U-100 syringe, inject under the skin of the abdomen or thigh, back in the fridge; weekly stepped GLP-1; nasal; capsule. | Medicine page, "How you take it, step by step" |
| `client/src/lib/vial.ts` | Arithmetic only: mL per dose, syringe units, doses per vial, vials per month or course, from the catalog's dose and spec. Confirm the vials ship as solution at the stated concentration (the figures assume no reconstitution step). | Medicine + protocol pages, "Inside the vial" |

Two questions for the pharmacy (VialsRX):
1. Do vials ship pre-mixed at the stated mg/mL, or as powder for reconstitution? The vial figures assume solution.
2. Do syringes, swabs and a sharps container ship with the medicine? "What arrives at your door" currently claims only the medicine, cold packs, the blood kit and the physician's review.
