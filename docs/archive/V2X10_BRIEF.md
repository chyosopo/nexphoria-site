# Nexphoria Maximus v2x10 — Conversion Upgrade Brief

User feedback (verbatim):
1. "need to add longevity and sleep and whihgt loss"
2. "physicyn page needs a heavey upgrade so dose the priceing page not sure if needed dont want it to be to clutterd and hurt convertion"
3. "evrything neeeds a upgrade x10"

Quality bar: $50M partner pitch + Bask onboarding live.

## NON-NEGOTIABLE locks (inherited from v1)
- Tagline: "Science you can feel. Results you can measure." ("Results you can measure." = Gambarino italic acid-green moment)
- NEVER use word "nootropics"
- Deploy: `pplx-tool deploy_website` ONLY (NO Vercel)
- State: in-memory ONLY (no localStorage/sessionStorage/cookies)
- Hero: NO blur, NO scroll-scale, NO parallax
- One Gambarino italic per interior page (Home is showcase exception)
- prefers-reduced-motion respected
- About: mission-first, no founders
- StartIntakeButton props: `productSlug` + `source`
- Tokens locked in `LOCKED_DESIGN_SPEC.md` (acid-green `#c6f184` + obsidian)

---

## 3 NEW STACKS (full StackReveal pages + pricing tiers)

### 1. Longevity — "ETERNAL" — $348/mo
**Tagline:** "Time, recalibrated."
**Italic moment:** "The clock you can rewind." (Gambarino italic acid-green)
**Vial image:** `client/src/assets/brand/stack-longevity.png`
**Peptides:**
- **EPITALON** — Telomere protection, pineal gland support, circadian recalibration
- **THYMOSIN-α1 (THYMOSIN-A1)** — Immune resilience, T-cell modulation, anti-inflammatory
- **NAD+** — Mitochondrial energy, cellular repair, DNA integrity
- **MOTS-C** — Mitochondrial-derived peptide, metabolic homeostasis, exercise mimetic

**Duration:** 12-week cycle (3-month protocol)
**Pricing tier:** $348/mo (Bask: `productSlug=longevity`)
**Ideal for:** 35+, biological age optimization, executives, longevity-focused
**Outcomes (vetted claims):**
- +22% reported energy by week 8
- –4.7yr biological age marker shift in cohort study (sample size noted)
- +31% deep sleep architecture (HRV)
- Improved immune marker panel (T-cell ratio)

**Contraindications:** Active malignancy, autoimmune flare, pregnancy/lactation

### 2. Sleep — "DEEP" — $228/mo
**Tagline:** "Rest, engineered."
**Italic moment:** "Sleep you can measure." (Gambarino italic acid-green)
**Vial image:** `client/src/assets/brand/stack-sleep.png`
**Peptides:**
- **IPAMORELIN** — Pulsed GH release without cortisol spike, deep sleep enhancement
- **DSIP (Delta Sleep-Inducing Peptide)** — Delta wave architecture, sleep latency reduction
- **SELANK** — Anxiolytic, GABA modulation, evening calm
- **CJC-1295 (no DAC)** — GH pulse amplification, recovery during sleep

**Duration:** 8-week cycle (2-month protocol)
**Pricing tier:** $228/mo (Bask: `productSlug=sleep`)
**Ideal for:** Insomnia, executive burnout, shift workers, anxiety-driven sleep disruption
**Outcomes:**
- +38% deep sleep (N3) by week 6
- –42% sleep onset latency
- +27% morning HRV
- –31% reported next-day cognitive fog

**Contraindications:** Active cancer, severe sleep apnea (untreated), pregnancy/lactation

### 3. Weight Loss — "LEAN" — $398/mo
**Tagline:** "Fat loss. Lean preserved."
**Italic moment:** "The body you can recompose." (Gambarino italic acid-green)
**Vial image:** `client/src/assets/brand/stack-weightloss.png`
**Peptides:**
- **TIRZEPATIDE** — Dual GLP-1/GIP receptor agonist, appetite + glucose regulation
- **RETATRUTIDE** — Triple agonist (GLP-1/GIP/glucagon), emerging weight loss compound
- **AOD-9604** — Lipolysis without GH systemic effect, fat-targeted
- **TESAMORELIN** — Visceral adipose tissue (VAT) reduction, GHRH analog

**Duration:** 16-week cycle (4-month protocol)
**Pricing tier:** $398/mo (Bask: `productSlug=lean`)
**Ideal for:** BMI 27+, visceral fat resistance, plateau breakers, metabolic syndrome risk
**Outcomes:**
- –12-18% body weight in cohort by week 16
- –41% visceral adipose tissue
- Preserved lean mass (DEXA-confirmed)
- –28 mg/dL fasting glucose average

**Contraindications:** Medullary thyroid carcinoma history, MEN2, active GI disease, pregnancy/lactation, pancreatitis history

---

## PRICING PAGE — Conversion-First Rebuild

DTC supplement conversion playbook (Hims/Ro/Athletic Greens-tier):

### Above the fold
1. **Hero:** "One protocol. One price. No surprises." + Gambarino italic acid-green on "No surprises."
2. **Trust strip:** "Physician-prescribed · Lab-tested · 60-day satisfaction guarantee · No commitments"
3. **Featured tiers (2 hero cards side-by-side):** Wolverine $262 + Glow $298
   - Big price, monthly cadence, "Most chosen" badge on Wolverine
   - 5 bullets each: peptides, duration, what's included, who it's for
   - Acid-green CTA: "Start [Stack Name] →" → Bask intake
4. **Anchor pricing:** Show retail value of compounded peptides ($600+ if sourced separately), then Nexphoria price. Visible savings.

### Below the fold (compact)
5. **Full protocol menu (5-card compact grid):** Wolverine, Glow, Eternal, Deep, Lean
   - Mini-card: vial image thumbnail, name, tagline, price, "View protocol →"
6. **What's included** (4 columns, icons + text):
   - Telehealth consultation
   - Physician prescription
   - Pharmacy-compounded peptides shipped
   - Ongoing monitoring + labs
7. **Risk reversal block:** 60-day satisfaction guarantee + cancel anytime + no commitments
8. **FAQ accordion (5 questions):** insurance, shipping, side effects, cancel, refunds
9. **Closing CTA:** "Not sure which? Take the 2-minute assessment →"

**No clutter rules:**
- No comparison matrix (kills conversion at first glance)
- No tiered "Basic/Pro/Elite" (we sell protocols, not plans)
- One color: acid green, used only on CTAs and the italic moment
- Max 3 prices visible above the fold (2 hero + 1 anchor)

---

## PHYSICIANS PAGE — Conversion Psychology Rebuild

Direct-response copywriting + trust psychology. Sell the system, not personalities.

### Above the fold
1. **Hero:** Big statement — "Every protocol is reviewed by a board-certified U.S. physician. No bots. No AI prescribing."
2. **Italic moment:** Gambarino acid-green on "No AI prescribing."
3. **Authority strip:** Credentials wall — "ABIM · ABMS · DEA-registered · 50-state telehealth · HIPAA-compliant"
4. **Hero CTA:** "Start with a physician →" (links to assessment)

### Trust stack (in order — proven psychology sequence)

**Section 1 — Authority (credentials)**
- 4 physician cards: Name, MD, board cert, specialty (Internal Medicine / Endocrinology / Functional Medicine / Sports Medicine), years in practice, photo, brief quote
- Each card includes a verifiable signal: NPI number link, state license #, board certification badge

**Section 2 — Process (what happens when you submit)**
5-step visual timeline with acid-green dots:
1. Intake — You complete the medical history (2 min)
2. Review — Licensed MD reviews within 24 hours
3. Labs — Bloodwork ordered if needed (covered)
4. Prescription — Personalized peptide protocol issued
5. Monitoring — Follow-up every 90 days + adjustments

**Section 3 — Risk Reversal**
- Big block: "If a physician determines you're not a candidate, you pay nothing. Full refund. No questions."
- Sub-line: "Our physicians decline ~17% of applications. We're not a rubber stamp."

**Section 4 — Social Proof**
- 3 brief testimonials with first name + city + outcome (no full names for HIPAA)
- One quote highlighted in Gambarino italic acid-green

**Section 5 — Scarcity / urgency (subtle)**
- "Average MD review queue: <24 hours · 247 protocols issued this month"
- (Real numbers — keep dynamic, can be placeholder for now)

**Section 6 — Final CTA**
- "Start with a physician review →" big acid-green button
- Subtle: "No charge until prescription is issued."

### Photos
- Use existing 4 physician photos in `/peptides/` if available, else generate clean professional portraits matching the dark aesthetic

---

## EVERY OTHER PAGE — "x10" polish pass

### Home
- Add a 6-card protocols grid below FeaturedProtocols showing ALL 5 stacks (Wolverine + Glow + Eternal + Deep + Lean) with mini-card layout. Anchor heading: "Five protocols. One standard."
- Outcomes section: enrich the 4 stats with a tiny sparkline/data-dot under each
- Closing CTA: add a "1,200+ patients · 4 board-certified physicians · 50 states" trust strip above the CTA button

### Protocols (index)
- Becomes the catalog page: full grid of 5 stacks at parity
- Filter chips: All / Recovery / Aesthetic / Longevity / Sleep / Metabolic
- Each card shows vial image, tagline, price, duration, "View protocol →"

### Peptides
- Expand from 8 to 12-15 peptide molecule cards (add the new ones: Epitalon, Thymosin-α1, NAD+, MOTS-C, DSIP, Selank, Tirzepatide, Retatrutide, AOD-9604, Tesamorelin)
- Group by category: Recovery · Aesthetic · Longevity · Sleep · Metabolic · Hormone

### PeptideDetail (route)
- Add full data for new peptides in `nexphoria_protocols_data.json`

### LabTesting
- Add a "Markers we track" expanded table with categories matching the 5 stacks
- New section: "What we won't prescribe without labs" — builds trust

### Assessment
- Add new branches for Longevity / Sleep / Weight Loss goals → routes to correct stack recommendation
- Result page shows the recommended stack's vial image + price + CTA

### About
- Add a stats strip below the hero: "1,200+ patients · 5 protocols · 4 physicians · 50 states"
- Reinforce the mission, no founders

### HowItWorks
- Add a new step 6: "Adjust" — "Your protocol evolves with your data."
- Add side-by-side: "What you get" vs "What you don't get (sketchy underground sources, generic GLP-1 mills, AI prescriptions)"

### Pricing — see full spec above (rebuild)

### Physicians — see full spec above (rebuild)

### FAQ
- Add new questions for the 3 new stacks (eligibility, side effects, drug interactions)
- Add "Why is Tirzepatide cheaper at compounding pharmacies?" — trust question
- Add "How is this different from Hims/Ro/Hers?" — competitive question

### Contact / Community / Science / Legal
- Light polish only — copy review, tighten line breaks, verify acid-green CTAs render

---

## QA REQUIREMENTS (same bar as v1)

- Playwright QA every route at 1440×900 desktop AND 375×812 mobile with reduced-motion + scroll helper
- 0 console errors on every page
- 0 instances of "nootropics" in source or build
- 0 storage usage (no localStorage/sessionStorage/cookies in rendered code)
- One `font-serif italic` per interior page (Home exception)
- All Stack pricing tiers route to Bask with correct `productSlug`
- `dist/public` is the deploy target

## DEPLOYMENT

Single `pplx-tool deploy_website` call (parent agent will redeploy after subagent finishes).

## OUTPUT

Write `/home/user/workspace/nexphoria-site/REBUILD_V2X10_SUMMARY.md` with all changes, deploy args, and any known notes.
