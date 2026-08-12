# IVYRX STUDY — VISUAL & INTERACTION ADDENDUM
**Reference:** https://www.ivyrx.com (+ `app.ivyrx.com` intake) · **Captured:** 2026-08-12
**Method:** real headless Chromium (Playwright) — desktop 1440 + mobile 390 full-page renders,
plus a full interactive walk of the GLP-1 intake→checkout to the payment wall.

This doc is the companion to **docs/IVYRX-STUDY.md** and closes the two items that study
left open in its **§0 Method limits** and **§8 Open items** ("Rendered visual pass" and
"Checkout flow walkthrough"). It does **not** repeat the base study's IA / offer-model /
token extraction — read that first. Per Standing Law 1 and the brief, this extracts
**grammar only**: rhythm, composition, funnel structure. No competitor copy, no efficacy/
safety claims, no palette or trade-dress lift. Porcelain & Navy stays.

> **Screenshots deliberately not committed.** 33 page renders + 31 flow-step captures were
> taken to a scratch dir outside the repo and read with a vision model. Committing a
> competitor's full-page renders is trade-dress capture; the "no trade dress" rule wins over
> convenience. Findings below are the durable artifact. Re-capture harness lives outside the
> tree; regenerate if the reference changes.

---

## V1 · Correction to the base study's premise
Base §0 states "Chromium has no external egress in this sandbox." That was the *authoring*
environment. From this environment egress is available; ivyrx.com and `app.ivyrx.com` render
and drive normally. Everything below is first-hand rendered/interactive observation, not
HTML inference.

---

## V2 · Rendered composition (closes base §8, item 1)

### V2.1 Vertical rhythm & section grammar
- **Home and category pages run 9–11 stacked sections** on a predominantly **white** base,
  punctuated by (a) one or two **pastel-tinted panels** (the split hero, "how it works"
  cards) and (b) exactly **two full-bleed dark bands** — a photographic CTA band and the
  near-black footer. It is *not* zebra striping; it's white breathing room with occasional
  tinted or dark punctuation. Spacing is generous and even.
- **The dark photo CTA band ("live healthier") is reused verbatim across Home / Treatments /
  Weight-loss** — a single repeated closing module, not per-page art.
- **`/treatments` is the densest** page (≈4 stacked category grids: Weight-loss, Anti-aging,
  Supplements, Peptides — identical card component repeated). **`/safety-information` is a
  61k-px single-column disclosure wall** (index rail on the right) — depth signals seriousness.
- **Repeated modules** doing most of the work: the **product card** (image · name · price ·
  Shop/Learn · one-line safety string), the **testimonial card** (green stars · quote ·
  "Verified Customer"), and the **safety-line strip**. The site is assembled from ~5 blocks.

### V2.2 Hero whitespace & eye-path
- Marketing heroes are **centered with ~50–65% empty fold** (Home ~55%, quiz entry ~65%);
  very airy. **PDPs invert to a tight, left-aligned 2-column split** (~30% empty): product
  image left, headline + price + CTA right.
- **First fixation is almost always the rating chip** ("4.7 · 6000+ reviews") sitting *above*
  the headline, then the outcome-first headline, then the single dark pill CTA. On PDPs the
  **product vial** takes first fixation, then headline, then price/CTA.
- Utility/paid pages tighten: `/reviews` and `/lp/meta/*` run ~15–20% empty with the CTA
  pulled high.

### V2.3 Accent deployment — the actual ratio (answers base §4's open question)
Base §4 could name the accent hexes but not their *dose*. Rendered, the discipline is severe:

| Surface | neutral | periwinkle | rose | **GLP-1 green** |
|---|---|---|---|---|
| Home fold | ~82% | ~2% | ~2% | ~14% |
| Weight-loss | ~84% | ~2% | ~2% | ~12% |
| PDP GLP-1 | ~80% | ~3% | ~5% | ~12% |
| `/reviews` | ~90% | ~2% | ~6% | ~2% |
| BMI tool | ~68% | ~14% | ~16% | ~2% |
| `/safety-information` | ~98% | ~1% | ~1% | 0 |

- **Accents essentially never exceed ~10–16% of a viewport, and only on the utility/tool
  page** (BMI calculator) do the two brand accents get loud. Content and legal pages are
  ~98% neutral. So: **2–8% per accent on money pages, not 20%.**
- **New finding the CSS extraction could not see: a third deployed accent — a GLP-1 "green"**
  — carries the flagship product (vials, the weight-loss hero panel, primary buttons). It is
  *not* just Trustpilot stars; it is a product-category color. Base §4 lists only rose +
  periwinkle; rendered, **green is the dominant hue on the weight-loss/GLP-1 surfaces.**
  (For us this is a structural lesson, not a palette lift — the takeaway is "one category
  gets one owned hue," executed in Porcelain & Navy, not their green.)

### V2.4 Imagery treatment (grammar, not assets)
- **Two registers, cleanly separated:** *photographic* for people + hero product; *illustrative*
  (abstract concentric-circle icons) reserved for **mechanism / "how it works"** steps.
- **People:** overwhelmingly **women**, shot as **candid UGC/selfie stills** (TikTok-style
  vertical thumbnails, varied skin tones, smiling, looking at camera) plus one recurring
  **clinical lifestyle** shot (doctor + patient at a desk) and one reused **laughing-woman**
  dark-CTA portrait. Aesthetic = authentic/lo-fi social proof, not polished stock.
- **Product/vials:** rendered **upright, front-facing on white→pastel seamless gradients**,
  soft shadow, no props for catalog; **in-hand (manicured hand holding the vial)** on the PDP
  hero; **props-in-lifestyle** (yoga mat, sunset decking) only on closing CTA bands.
- **Relevance to our "two worlds":** their imagery is monolithically female/lifestyle. Our
  azure (men) / orchid (women) split has no analog here — a differentiation lane, not a gap.

### V2.5 Mobile reflow (390)
- Grids collapse to **single column**; only the testimonial/video row stays a **horizontal
  swipe strip**. Nav becomes a **sticky top bar + hamburger**.
- **No sticky bottom add-to-cart bar** even on the PDP — CTAs are repeated inline pills. (A
  conversion seam we can beat: a persistent mobile buy bar.)
- Hero stacks headline → subcopy → rounded media; **primary CTA stays above the fold**.
- Accent ratio stays restrained; the **paid LP** leans hardest into pastel/green because the
  dark hero + colored panels occupy more of the narrow viewport.
- Trust is credential/review-driven; **no countdown/scarcity** anywhere. PDP shows a
  struck-through price anchor (e.g., 197→97) as the only urgency device.

---

## V3 · The interaction spine (closes base §8, item 2)

### V3.1 Architecture: marketing site is a shell; the engine is a separate app
- Every real buy CTA and the `/find-your-treatment` goal cards hand off to
  **`https://app.ivyrx.com/start-online-visit/glp-1-{md|ga}`** (goal-/variant-keyed routes;
  `md` = primary "Get started", `ga` = secondary "Shop now"). The Webflow marketing site does
  **zero** intake or commerce; it is pure triage + SEO surface. The goal cards are `href="#"`
  with a **revoffers-tracked** JS redirect (affiliate attribution rides the handoff).
- **This mirrors our own split** (marketing repo ↔ Bask/MDI engine, CLAUDE.md "two worlds,
  one engine"). Their separation is the reference architecture for ours: the storefront never
  touches PHI; the `app.` subdomain owns intake, Rx, and checkout.

### V3.2 The intake→checkout ledger (GLP-1, walked end-to-end)
Single-question-per-screen, **auto-advancing option cards**, a **4-segment phase bar**, almost
no chrome. Observed order (31 screens; synthetic non-PII answers, stopped before pay):

| # | Screen (grammar) | Type |
|---|---|---|
| 1 | Goal magnitude ("how many lbs") | segment select |
| 2–4 | Motivational + educational interstitials ("how GLP-1 helps", "how Ivy works") | info |
| 5 | Currently on a GLP-1? | yes/no |
| 6 | Weight & height | numeric |
| 7 | Sex assigned at birth (+ clinical rationale line) | select |
| 8 | Date of birth (segmented MM/DD/YYYY spinbutton) | date |
| 9 | **Mobile + ZIP** (+ Terms/Privacy links) — **lead capture** | contact |
| 10 | Prior GLP-1 taken (Sema/Tirz/None) | select |
| 11 | Other medications (add list / "I don't take") | select/entry |
| 12–13 | Health-history yes/no + free-share prompt | yes/no |
| 14 | **Contraindication checklist** (IBD, pancreatitis, pancreatic cancer, gallbladder, hypertriglyceridemia, kidney disease) — "None of the below" | multi |
| 15 | **"General guidelines for GLP-1" → acknowledgment checkbox** | **disclaimer gate** |
| 16–20 | Further yes/no medical screeners + **allergy checklist** (Wegovy/Zepbound/Mounjaro/Saxenda/Ozempic) | yes/no + multi |
| 21 | **Pregnancy/Breastfeeding precaution → acknowledgment checkbox** | **disclaimer gate** |
| 22 | Anything else for your doctor | yes/no |
| 23 | Email | account |
| 24 | First/Last name + **telehealth-consent checkbox** (marketing opt-in **pre-checked**) | account |
| 25 | **"Truthfulness Consent" → acknowledgment checkbox** | **disclaimer gate** |
| 26 | Medication preference (Sema / Tirz / "no preference — clinician picks") | select |
| 27 | **Eligibility reveal** ("you *may be* eligible for…", vial shown, **still no price**) | reveal |
| 28 | Home address ("if prescribed…") | form |
| 29 | "Assembling your assessment…" loader | interstitial |
| 30 | **"Your treatment plan is ready!" — FIRST PRICE** | plan/price |
| 31 | Upsell + order summary + **card fields (STOPPED)** | checkout |

### V3.3 When price is revealed — the headline finding
**Price is withheld through the entire medical intake and account creation** and appears
**only at screen 30**, framed as *"Your treatment plan is ready"* — i.e., after qualification,
consent, preference, and address. The funnel sells **eligibility and momentum first, price
last**. The low marketing anchor ("from $97", base §3) is the 12-month/mo rate; the true
**1-month rate is $197/mo** — surfaced only here.

### V3.4 Subscription selector & cart grammar
- Selector = a **vertical stack of supply-duration tiers**: 1-mo **$197/mo** · 3-mo $157/mo ·
  6-mo $137/mo · **12-mo $97/mo**. **Longest term is pre-selected**; shorter tiers render
  faded. Framing is explicit longer-commitment-cheaper ("lock in bigger savings").
- **Only the per-month number is shown; the contract total is never surfaced** on the tier —
  a deliberate anchoring choice (obscures true spend).
- Cart/"Includes" is a **checkmark benefit list** (doses e.g. "48 doses / 4 per month",
  self-injection instructions, sterile syringes, alcohol wipes, physician review, delivery,
  check-ins) — supplies framed as inclusions.
- A **"Your Recommended Treatment"** black authority banner sits above the tiers.

### V3.5 Prescription-disclaimer handling
Disclaimers are **structural gates, not footnote prose**: recurring **acknowledgment-checkbox
screens** ("General guidelines", "Pregnancy/Breastfeeding precaution", "Truthfulness Consent")
each blocking Next until checked, plus **conditional grammar everywhere** — *"you may be
eligible"*, *"if prescribed"*, *"Total **if prescribed** $197"*, *"no charge unless approved"*,
and "Rx Only" on the vial. Consent-to-telehealth + terms is a hard checkbox at account
creation (marketing opt-in is pre-checked — a dark-pattern we should **not** copy).

### V3.6 Checkout, upsell, and trust-signal placement
- **Order summary** uses conditional total ("Total if prescribed $197.00").
- **Upsell:** a one-time **Anti-Nausea add-on ($14.99 / 10 tablets)**, **default OFF**, framed
  with a savings/loss-aversion prompt ("save $40 now… avoid fees later").
- **Discount-code** field present (collapsible).
- **Payment:** Stripe-style card fields (number/expiry/CVC) + "Link" and a bank-pay
  alternative; a **pre-authorization reassurance paragraph sits *above* the card fields**;
  security lock/"Secure" microcopy sits **adjacent to the card + the sticky "Complete My
  Order" CTA**. *(Walk stopped here — no card, no order.)*
- **Trust-signal choreography (the most transferable interaction lesson):**
  the **marketing site front-loads trust** (rating chip, badge strips, LegitScript
  everywhere); the **intake funnel strips trust to zero** (no badges/ratings — pure focus,
  frictionless completion); **checkout re-introduces only *payment* trust** (lock, "no charge
  unless approved") next to the card. Trust is deployed **where the specific anxiety lives at
  each stage**, not uniformly.

---

## V4 · What transfers to Nexphoria (grammar only)
1. **Storefront ↔ engine split is validated** — keep all intake/Rx/checkout on the `app.`/Bask
   side; the marketing repo stays PHI-free (reinforces CLAUDE.md boundary watch).
2. **One-question-per-screen intake with a phase bar and auto-advance** — low cognitive load,
   high completion. Our 01→05 pipeline should feel this frictionless.
3. **Disclaimers as acknowledgment gates + conditional grammar** ("if prescribed", "you may be
   eligible") — bakes compliance into the flow as components (base §7.2), not page prose.
4. **Trust choreography by stage** — badges on marketing, *nothing* in the funnel, *payment*
   trust at the card. Adopt the shape; keep our institutional-bank voice.
5. **Price-last, eligibility-first** ordering — decide deliberately (house voice forbids
   "free"/hype; use "complimentary"/"included"). We can be **more honest**: show contract
   total, not just /mo.
6. **One owned hue per category** (they give GLP-1 a green) — execute via our tokens
   (azure/orchid worlds), never their palette.
7. **Composition kit:** ~5 reused blocks, white base + 2 dark bands, generous hero whitespace,
   mechanism = illustration / product+people = photography, sticky top nav. Add the **mobile
   sticky buy bar they lack.**

## V5 · What NOT to copy
- **Pre-checked marketing consent** and **per-month-only pricing that hides the total** — dark
  patterns; our voice forbids them.
- **UGC/selfie testimonial imagery** — we have no real consented patients; the slot stays
  empty until we do (base §6). No invented faces.
- Their **rose/periwinkle/green palette** and any **wordmark/vial trade dress**.
- Efficacy/safety claim copy (base §5 ⚠) — take the disclosure *architecture*, not the claims.

## V6 · Residual open items
- `glp-1-ga` variant vs `md` not diffed (walked `md`). Energy/fitness goal funnels not walked.
- The `/find-your-treatment` card→`app.` redirect is revoffers-JS; confirmed destination via
  PDP CTAs, but the exact goal→route map for non-GLP-1 goals is unverified.
- Motion/transitions not analyzed (static captures only).
- A synthetic lead/account (throwaway email + 555 phone, no PHI) was created to reach the pay
  wall; no order placed, no card entered.
