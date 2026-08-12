# NEXPHORIA — THE FLAGSHIP REBUILD BRIEF
## "The $100M site" — creative direction, offer architecture & conversion system
2026-08 · Chiya: "recreate the full design completely… a $100M site… the full
customer journey… the offer, the checkout, everything… build it out powerfully
like a senior branding agency… convert."

---

## 0 · The honest frame (read once)
- **Conversion is a number we EARN, not one we type.** Telehealth visit→purchase
  runs ~1–4%. The step rates hit 10%+ (landing→assessment-start, assessment→
  submit). So this brief maximizes and instruments EVERY step; the live number
  comes from analytics, never from a claim on the page (truth law).
- **We keep the engine, rebuild the experience.** Routing, data catalogs,
  prescription gating, LegitScript-clean copy, the gate battery, checkout logic —
  all stay. What we rebuild is the *presentation layer, the offer framing, the
  journey choreography, and the conversion mechanics*.
- **Standing law is the ceiling, not a suggestion.** Porcelain & Navy. Two
  worlds. Prescription-only. No invented outcomes/testimonials. No RUO language.
  Everything below lives inside it.

---

## 1 · THE POSITIONING (what makes it feel like $100M)
The $100M feeling is not more graphics — it's **conviction + specificity +
restraint**. Three pillars, every page ladders to one:

1. **"Measured, not marketed."** Every claim is a number a physician reads. The
   brand's whole aesthetic = the lab report made beautiful. (This is the Seed
   grammar we started: numbers as identity.)
2. **"A physician on every file."** The trust anchor. Not a questionnaire, not a
   sales team — a licensed clinician who can decline. Repeated, never hyped.
3. **"Two worlds, one engine."** Men azure / women rose — same medical rigor,
   different register. The tailoring IS the premium signal.

Voice: institutional-bank calm. Investment-in-self framing. Assurance as
completeness ("The figure is complete."), never defensive negation.

---

## 2 · THE OFFER ARCHITECTURE (the thing that actually converts)
A $100M offer is *legible in 5 seconds and irresistible in 60*. Current site has
the pieces (solo / stack / custom, cadence ladder, panel tiers, gift) but they're
spread thin. The rebuilt offer:

**ONE headline offer, three depths, one price philosophy.**
- **The membership frame:** "One figure a month. Physician, medication, labs,
  and the retest that proves it — all inside it." Sell the COMPLETE thing, not a
  vial.
- **Three doors, ranked by commitment, not by product:**
  1. *Start with your biology* → the assessment (free, physician-read). The
     DEFAULT hero CTA. Lowest friction, highest intent capture.
  2. *Start with a protocol* → curated stacks (the flagship products).
  3. *Start with one compound* → solo PDPs (the browsers).
- **The cadence ladder as the value reveal:** 1 / 3 / 12-month, the annual plan
  visibly carrying the panel. Anchored, honest math, "the figure is complete."
- **Risk reversal, truthfully:** "No charge unless a physician prescribes." This
  is our real, legal risk-reversal — it does the job a money-back guarantee does
  on other sites, and it's TRUE.
- **The gift as a second buyer.** Already built; surface it as a real revenue door.

---

## 3 · THE CUSTOMER JOURNEY (choreographed, stage by stage)
Every stage has: a JOB, a HERO MOMENT, a CTA, and an ANALYTICS event.

| Stage | Job | Hero moment | Primary CTA | Event |
|---|---|---|---|---|
| **Land** | Establish "measured, not marketed" in 5s | Giant statement + one live proof number | Start your assessment | page_view, world_selected |
| **Orient** | "which of me is this for?" | The 6-goal grid, 3×2, photographic | goal tile → goal page | goal_selected |
| **Believe** | Physician + panel proof | The 99-marker panel, the physician gate, the retest loop | See the science | product_viewed |
| **Choose** | Reduce to one decision | 3 routes to the same goal, self-select chips | route → PDP/stack | selector_pick |
| **Commit** | Make starting trivial | Assessment: 2 min, physician-read, pre-filled from goal | Submit intake | intake_started, checkout_submitted |
| **After** | Kill the void (P0 gap) | "What happens in the next 48 hours" timeline + status | (email nurture) | — |

**The spine:** every page keeps the assessment one tap away (sticky), and every
product surface offers both "assess" (low friction) and "buy" (high intent).

---

## 4 · THE PAGE SYSTEM (what gets rebuilt, in priority)
Rebuilt to flagship quality, each as a proof-piece:

**P1 — The world home** (men + women): giant statement hero (done), a NEW
   "your biology is legible" proof band (3 live numbers + physician), the 3×2
   goal grid, the formulary rail, the protocol logic, the gift band, the close.
   This is the conversion engine — build first, perfect it.
**P2 — The offer/pricing page:** the membership frame, three doors, cadence
   ladder as value reveal, panel tiers, the complete-figure narrative.
**P3 — The PDP + stack pages:** spec-plate system (done), sticky buy spine,
   the "inside the vial" delivery moment, citations, cadence.
**P4 — The science page:** the numbered 01→05 pipeline (Intake→Panel→Physician
   →Compounding→Retest), the owned cross-section diagram, the evidence tiering.
**P5 — The assessment:** the highest-leverage conversion surface — make it feel
   like a concierge intake, not a form; progress, pre-fill, physician presence.
**P6 — The post-submit page (NEW):** "what happens next" 48-hour timeline —
   closes the current dead-end. Interim until Bask portal is live.
**P7 — Checkout:** physician-first, honest billing, gift door, trust rail —
   elevate the existing 3-step to flagship polish.

---

## 5 · THE CONVERSION MECHANICS (the senior-agency toolkit)
Applied where each earns its place — never dark-pattern, always truthful:
- **One primary CTA per view**, repeated (assessment). Secondary is always a
  lower-commitment text link.
- **Proof adjacency:** every CTA sits next to a physician/lab proof element.
- **The number does the selling:** big tabular figures (99 markers, 90 days,
  503A) as the recurring hero device.
- **Progressive commitment:** free assessment → physician review → figure only
  if prescribed. Each step smaller than the last.
- **Sticky assessment access** on every page (desktop spine + mobile bar).
- **Exit-intent + announcement bar** (exist) tuned to the assessment.
- **Instrument everything:** the 25-event scaffold is live; the moment GA4/
  PostHog IDs land, the funnel is measurable end-to-end. THIS is how we prove
  and then raise the conversion number.
- **Speed = conversion:** entry ≤300KB (gated), LCP heroes fetchpriority-high,
  the whole thing static-fast on Cloudflare.

---

## 6 · BUILD SEQUENCE (how a senior team ships this without breaking prod)
Every phase: build → all 5 gates → Chromium verify → commit → push. Never a
broken main.
- **Phase A — Design foundation:** confirm the elevated token system + the Seed
  grammar primitives (data-plates, giant type — done); add motion/reveal polish.
- **Phase B — The world home** (P1) rebuilt to flagship. THE proof piece.
- **Phase C — Offer/pricing** (P2) + checkout (P7) — the money pages.
- **Phase D — PDP/stack/science** (P3/P4) — the belief pages.
- **Phase E — Assessment + post-submit** (P5/P6) — the commit + retention.
- **Phase F — Motion, imagery pass 2, per-page OG, performance, a11y sweep.**

Each phase is a real, shippable increment — the site is never worse than it is
now at any commit.

---

## 7 · WHAT ONLY CHIYA CAN UNLOCK (so the $100M is real, not a demo)
- Named Medical Director + Arora bio/headshot (E-E-A-T, the trust keystone)
- Real testimonials / outcomes cohort (the one thing we can't fabricate)
- GA4 + PostHog IDs (turns the conversion system from built → measured)
- Stripe DDQ + LegitScript cert (turns checkout from concierge → live payment)
- The apex deploy (so all of this is on nexphoria.com, not just preview)
- Business address/phone (compliance completeness)

*This brief is standing law for the rebuild. Every shipped phase checks back
into it. Nothing here is "done" — it's a shrinking punch list.*
