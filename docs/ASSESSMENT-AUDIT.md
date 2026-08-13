# ASSESSMENT AUDIT — Nexphoria `/assessment` flow
**Branch:** `claude/nexphoria-enterprise-overhaul-ld0sqd` · tip `db80c205d`
**Method:** local `npm run build` → Express on `:5055` → Playwright (Chromium headless), desktop
1440 × 900 + mobile 390 × 844, both `/men` and `/women` worlds. Synthetic answers only;
no real health data, no PHI, no submission to a live endpoint (local server only; the API
route is not wired in the static build, so the submit POST fails gracefully with a retry
banner).
**Reference:** `docs/IVYRX-STUDY-VISUAL.md` §V3.2–V3.6 (IvyRx's 31-screen intake ledger).
**Captured:** 2026-08-12

---

## A1 · Step ledger — like-for-like against IvyRx §V3.2

### Nexphoria: 8 screens (step 0 + steps 1–7)

| # | Screen (grammar) | Input type | Category |
|---|---|---|---|
| 0 | **Biological sex** — "What is your biological sex?" | 2 large radio cards (Female / Male) | data |
| 1 | **Primary goal** — "What is your primary clinical goal?" | 2×N goal-tile grid (7 tiles); optional early email capture | data |
| 2 | **Age** — "What is your age range?" | 5 radio cards (18–29 … 60+) | data |
| 3 | **Medications** — "Are you currently taking any medications?" | checkbox ("I am not taking any") + textarea (name/dose/freq) | data |
| 4 | **Medical history** — "Do any of the following apply?" | 6 checkboxes (cancer, CV, diabetes, autoimmune, pregnancy, none) | data |
| 5 | **Bloodwork** — "Do you have recent comprehensive labs?" | 3 radio cards (recent / older / use Nexphoria panel) | data |
| 6 | **Contact** — "Where should your physician reach you?" | 4 fields: name, email, phone, state dropdown | data |
| 7 | **Review + submit** — "Review your intake before submitting." | editable summary table + Submit button | review |
| (8) | **Success / recommendation** (post-submit) — protocol tile + "Continue to checkout" or "Check eligibility" | recommendation card + CTA | reveal |

### IvyRx: 31 screens (see §V3.2 of IVYRX-STUDY-VISUAL.md)

### Side-by-side comparison

| Dimension | Nexphoria (8 screens) | IvyRx (31 screens) |
|---|---|---|
| **Total screens** | 8 (+ 1 post-submit reveal) | 31 (to payment wall) |
| **Info / motivational interstitials** | **0** | 4 (screens 2–4, 29) |
| **Data-collection screens** | **7** (sex, goal, age, meds, history, labs, contact) | ~18 |
| **Disclaimer/consent gates** | **0 hard gates** (see §A5) | **3** (general guidelines, pregnancy, truthfulness) |
| **Account-creation screens** | 0 (name+email collected inline at contact step) | 3 (email, name+consent, truthfulness) |
| **Lead-capture moment** | Step 1 (optional email) + Step 6 (contact) | Step 9 (phone + ZIP) |
| **Questions per screen** | **1** (except Contact = 4 fields, Review = summary) | **1** throughout |
| **Auto-advance on selection?** | **No** — every step requires explicit **Continue** | Yes — option cards auto-advance |
| **Progress indicator** | **7-segment labeled bar** ("STEP N OF 7 — label") | 4-segment phase bar |
| **Price first visible** | Goal tiles **back-face** (hover/focus) at step 1 + recommendation at step 8 | **Screen 30** (after full intake + account) |

---

## A2 · How many screens, and how does it feel?

**8 screens vs. IvyRx's 31.** Our flow is roughly **4× shorter**. IvyRx pads
with motivational interstitials ("how GLP-1 works", "how Ivy works"),
split-screen yes/no screeners, and three separate disclaimer gates. We have
**zero info screens and zero hard consent gates** — every screen collects data
or displays the review.

**Feel:** momentum, not a form. One question per screen (Contact is the exception
with 4 fields, which is the only place it risks feeling like a "form"). The
brevity means a visitor who knows their goal can reach Review in under
90 seconds. IvyRx's 31-screen depth creates sunk-cost commitment; ours relies
on **speed + immediate clinical framing** ("Why we ask" panels, physician-review
sidebar) instead.

**Risk:** the Contact step packs 4 fields, which is the densest screen in the
flow. Splitting name+email and phone+state into two screens would match the
one-question-per-screen pattern and reduce the typing-wall feel, especially on
mobile where keyboard transitions are heavier.

---

## A3 · One question per screen + explicit Next

**Yes, one question per screen** — with the exceptions noted above (Contact has
4 fields; Review is a summary). Goal tiles are in a 2-column grid (single
column on mobile) and selecting one **does not auto-advance**; every step
requires clicking **Continue** (or **Review answers** at step 6, or **Submit
intake** at step 7).

**Auto-advance gap:** IvyRx's option cards auto-advance on click, creating a
tapping rhythm. Our explicit Continue button adds a click per step (8 extra
clicks across the flow). This is a UX trade-off: more deliberate, slightly
slower. The Continue button does validate before enabling (disabled when no
selection made), so it prevents accidental advancement — safer but less fluid.

---

## A4 · Progress indicator

**Yes — a 7-segment labeled progress bar** with "STEP N OF 7" aria-valuetext and
a visible label for the current step (e.g., "YOUR GOAL", "AGE", "MEDICATIONS").
On desktop it renders as filled segments in the accent color; on mobile the
segments are smaller but still readable.

**Is it honest?** **Mostly.** The 7 segments correspond to steps 1–7 (sex
selection at step 0 has no progress bar). The bar does NOT account for the
post-submit recommendation reveal (step 8), which adds one more screen after
"STEP 7 OF 7". This is a minor honesty gap — the visitor thinks they're done
at step 7 but one more screen appears.

**IvyRx comparison:** their 4-segment phase bar is much less granular (31
screens mapped to 4 phases), but it's also less honest — the phases don't
correspond to screen counts.

---

## A5 · Where does price first appear?

**Price is visible at step 1 (goal selection) — the opposite of IvyRx.**

The goal tiles have a **front face** (goal name, category, tagline) and a
**back face** revealed on hover/focus/tap (protocol name, peptide names,
monthly price range). The aria-labels include the full detail, so screen
readers get prices immediately. On a mouse, hovering any tile reveals its price
range; on mobile, tapping toggles the back face.

**Can a visitor reach a price without completing intake?** **Yes.** Just
hovering/tapping a goal tile at step 1 reveals ranges like "$210–$340/mo".
This is a deliberate design choice (opposite of IvyRx's screen-30 reveal) and
aligns with the house voice that forbids price-hiding. However:

- The **front face shows no price** — only the back face does. A visitor who
  doesn't hover/tap/focus won't see prices until the recommendation at step 8.
- The post-submit recommendation (step 8) shows the matched stack's real
  cadence pricing and a "Continue to checkout" or "Check eligibility" CTA.
- **The marketing site pages (Pricing, PDPs) show prices openly** — so the
  assessment's hover-reveal is consistent with the broader site, not a hide.

**IvyRx comparison:** IvyRx withholds price through 29 screens of medical
intake + account creation, revealing only at the "Your treatment plan is ready"
screen. We show price at step 1 (accessible) and step 8 (explicit). This is
a genuine differentiator and the right call for our voice.

---

## A6 · Trust signals by stage

**Finding: trust signals are present INSIDE the funnel — this differs from
IvyRx's choreography.**

| Location | Trust signals present? |
|---|---|
| Step 0 (sex) | Minimal — hero image + "Why we ask" clinical rationale |
| Steps 1–6 | **Yes — persistent trust sidebar** (Physician review, Bloodwork arranged, Protocol designed within 5 days) + **top trust strip** (Board-certified physicians, US-compounded via 503A, HIPAA-compliant, Discreet 3–5 day shipping, Lab-monitored every 90 days) + "See a sample protocol" expandable + "Why we ask" per step |
| Step 7 (Review) | **Yes** — "No charge unless a physician prescribes — the review is complimentary" + screener disclaimer + HIPAA/encryption/physician-review line |
| Step 8 (Success) | Recommendation tile + "Continue to checkout" / "Check eligibility" |

**Assessment:** IvyRx strips trust to zero inside the funnel and reintroduces
only payment-trust at checkout. We show trust **persistently through every
step** — the sidebar and top strip are always visible.

**Is this a problem?** Not necessarily — our flow is 4× shorter, so the trust
signals don't fatigue. In a 31-screen flow, persistent badges would become
wallpaper; in an 8-screen flow, they serve as continuous reassurance. The
approach is consistent with our institutional-bank voice. However, the top
trust strip **truncates on mobile** ("US-COMPO…") — this is a minor rendering
defect that should be fixed.

---

## A7 · Consent and disclaimer handling

**There are NO acknowledgment-checkbox gates** that block the Next button.
This is a significant structural difference from IvyRx.

| Mechanism | Nexphoria | IvyRx |
|---|---|---|
| Telehealth consent checkbox | **Absent** | Hard gate at account creation (step 24) |
| Contraindication screening | Step 4 (medical history) — checkboxes, but **no gate**; selecting "cancer" doesn't block progression | Step 14 — checklist blocks Next without "None of the below" |
| General guidelines acknowledgment | **Absent** | Hard gate at step 15 |
| Pregnancy/breastfeeding precaution | Step 4 checkbox option only; **no separate gate** | Hard gate at step 21 |
| Truthfulness consent | **Absent** | Hard gate at step 25 |
| Screener disclaimer | Step 7 (Review) — **passive text**: "This is a marketing screener. Formal medical eligibility is determined during physician review…" | N/A |
| Prescription disclaimer | Step 7 — "No charge unless a physician prescribes" | Conditional grammar throughout ("if prescribed") |

**Assessment:** The flow has **zero hard consent gates**. All disclaimer
language is passive text at the Review step. The screener-disclaimer framing
("this is a marketing screener, not medical eligibility") is good, but:

- **Telehealth consent is missing entirely.** If the intake connects to Bask
  Health for a telehealth consult (as stated in the Review step's "What happens
  next"), telehealth consent should be a hard gate before submission.
- **Contraindication handling is soft.** A visitor can select "Active or prior
  cancer diagnosis" and still proceed without any warning or conditional
  routing. IvyRx blocks progression until contraindications are explicitly
  dismissed.
- **No truthfulness attestation.** IvyRx requires "I certify that the
  information I have provided is truthful" as a blocking checkbox.

**These are compliance gaps that should be addressed before launch.**

---

## A8 · Drop-off risk analysis

| Screen | Risk | Severity | Reason |
|---|---|---|---|
| **Step 0 (Sex)** | Low | — | Two large buttons, no friction |
| **Step 1 (Goal)** | **Medium** | ⚠ | 7 tiles can feel overwhelming. Hover-revealed peptide names + prices may confuse visitors unfamiliar with peptides. "Other / not sure yet" is the escape valve but maps to "Varies by protocol" — no clear path forward |
| **Step 3 (Medications)** | **Medium** | ⚠ | Textarea for medication details can feel like work. The "I am not taking any" checkbox shortcut helps, but the textarea is visible and may feel mandatory even when it isn't |
| **Step 4 (Medical history)** | **Low-Medium** | — | Contraindication options (cancer, CV disease) may spook visitors; with no reassurance that flagging a condition doesn't auto-disqualify, some will lie or abandon |
| **Step 6 (Contact)** | **High** | 🔴 | **4 fields at once** — the densest screen. Asking for phone + state (both feel sensitive) before establishing physician relationship. On mobile, keyboard transitions between 4 fields are heavy. This is the primary drop-off candidate |
| **Step 7 (Review)** | **Low-Medium** | — | Seeing all answers at once may trigger "wait, I don't want to share this" reconsideration. The Submit button's finality without a consent gate means no friction — but also no commitment ceremony |
| **Step 8 (Post-submit)** | **Low** | — | If the recommendation renders, the visitor is already invested. The API failure (in production, if Bask is down) would be a hard drop — the retry banner is the only recovery |

**Primary concern:** Step 6 (Contact) is the point of highest friction. Consider
splitting it into two screens (identity: name + email; then: phone + state) to
maintain the one-question-per-screen pattern and reduce cognitive load.

---

## A9 · Mobile analysis (390px)

| Question | Finding |
|---|---|
| **Primary action above fold?** | **Yes on steps 1–7** — a sticky bottom action bar keeps Continue/Review/Submit visible. **No on step 0** — the sex-selection cards and CTA are below the fold behind hero imagery and marketing copy |
| **Keyboard overlap?** | **Step 6 (Contact) is the risk.** Four text/select fields in sequence; focusing lower fields may cause keyboard to overlap the sticky CTA unless the browser scrolls the focused field into view. Needs real-device testing |
| **Goal tile reflow** | Single column on mobile — correct. Tiles are large touch targets |
| **Progress bar** | Visible and readable, though segments are small. "STEP N OF 7" label is clear |
| **Trust signals** | Collapse into compact panels; the top trust strip **truncates** ("US-COMPO…") — horizontal text clipping on narrow viewport. Not a scroll trap but a rendering defect |
| **Touch targets** | Primary buttons and tiles are adequately sized. Small header icons and footer links are secondary and less comfortable but acceptable |
| **Scroll traps** | Step 0 landing page is **very long** on mobile — large hero image + marketing copy pushes the sex-selection question well down the page. All other steps are compact. No horizontal overflow detected |

**Mobile verdict:** Functional, with two issues to fix: (1) step 0's lengthy
hero pushes the first action below the fold; (2) the top trust strip truncates.

---

## A10 · Retired-molecule sweep — COMPLIANCE DEFECTS 🔴

The catalog is now **4 SKUs**: semaglutide, tirzepatide, tesamorelin, PT-141.
The following retired or non-catalog molecules appear in the rendered flow:

### Goal tiles (step 1) — back-face "You'd take" + aria-label

| Goal | Molecules shown | Status |
|---|---|---|
| Metabolic & body composition | Tirzepatide · **Retatrutide** | ⚠ Retatrutide not in catalog |
| Strength & performance | **CJC-1295 · Ipamorelin** | 🔴 Neither in catalog |
| Longevity & aging | **NAD+ · Epitalon** | 🔴 Neither in catalog |
| Cognitive function | **Selank · Semax** | 🔴 Neither in catalog |
| Skin & recovery | **BPC-157 · GHK-Cu** | 🔴 Both explicitly retired |
| Hormonal optimization | **Enclomiphene · Kisspeptin** | 🔴 Neither in catalog |
| Not sure yet | "Determined after lab review" | ✅ Clean |

**6 of 7 goal tiles reference non-catalog molecules.** Only "Not sure yet" is
clean. The aria-labels expose these to screen readers even without hover.

### Stack definitions (stacks.ts) — post-submit recommendation

| Stack | Peptides array | Status |
|---|---|---|
| Wolverine | bpc-157, tb-500, ghk-cu | 🔴 All non-catalog |
| Glow | ghk-cu, bpc-157, tirzepatide | 🔴 2 of 3 non-catalog |
| Restore | dsip, epitalon, selank | 🔴 All non-catalog |
| Clarity | semax, selank, epitalon | 🔴 All non-catalog |
| Prime | tirzepatide, mots-c, ipamorelin | ⚠ 2 of 3 non-catalog |
| Balance | nad-plus, mots-c, epitalon | 🔴 All non-catalog |

**Every defined stack contains at least one non-catalog molecule.** The post-
submit recommendation (step 8) renders the matched stack's peptide names
directly — so a visitor who completes intake will see non-catalog molecules
in their "recommended protocol."

### GOAL_STACK_SLUG mapping gaps

The goal-to-stack mapping references **3 slugs that don't exist** in stacks.ts:
- "Strength & performance" → `ascend` (not defined)
- "Longevity & healthy aging" → `meridian` (not defined)
- "Cognitive function" → `lucidity` (not defined)

For these goals, `recStack` resolves to `undefined`, and the recommendation
falls back to `GOAL_TILE_CONFIG` data — which contains the same retired
molecules.

### Biomarker case studies (biomarkers.ts)

Two biomarker narratives reference retired molecules by name:
- "Up 44% from baseline after **CJC-1295 / Ipamorelin**"
- "**BPC-157** and systemic recovery reduced background inflammatory load"

### Stack descriptions (stacks.ts)

Multiple stack descriptions mention retired molecules in prose (BPC-157,
GHK-Cu, Epitalon, Selank, Semax, Ipamorelin, MOTS-c, DSIP, NAD+). These
render on protocol detail pages and in the "See a sample protocol" expandable
in the intake sidebar.

**Remediation priority:** The goal tiles and stack definitions are the
highest-priority fixes because they are the primary surfaces visitors interact
with in the intake flow. The biomarker narratives and stack descriptions are
secondary but should also be updated. The 3 missing stack slugs (ascend,
meridian, lucidity) need to be either created with catalog-only molecules or
remapped to existing stacks.

---

## A11 · Summary of findings

### What works well
1. **8 screens vs. 31** — dramatically shorter, feels like momentum not a form
2. **One question per screen** (except Contact) with explicit validation
3. **7-segment labeled progress bar** — more granular and more honest than IvyRx's 4-phase
4. **Price visible at step 1** (hover/focus) — aligns with house voice, opposite of IvyRx's screen-30 hide
5. **"Why we ask" clinical rationale on every step** — builds trust through transparency
6. **"This is a marketing screener" disclaimer** — honest framing, avoids overclaiming
7. **No pre-checked marketing consent** — avoids the dark pattern IvyRx uses
8. **Draft persistence** — localStorage saves progress; returning visitors resume where they left off
9. **Edit-in-place from Review** — jump back to fix one answer, return to Review (hims-tier)

### What needs fixing

| Priority | Issue | Section |
|---|---|---|
| 🔴 Critical | **Retired molecules across all goal tiles + all stack definitions** | §A10 |
| 🔴 Critical | **3 missing stack slugs** (ascend, meridian, lucidity) — goals with no recommendation | §A10 |
| 🔴 Critical | **No telehealth consent gate** before submission | §A7 |
| ⚠ High | **No hard consent gates at all** — contraindication, truthfulness, pregnancy | §A7 |
| ⚠ High | **Contact step packs 4 fields** — primary drop-off risk; split into 2 screens | §A8 |
| ⚠ Medium | **Step 0 hero too long on mobile** — first action below the fold | §A9 |
| ⚠ Medium | **Top trust strip truncates on mobile** ("US-COMPO…") | §A9 |
| ⚠ Medium | **Medical history "cancer" doesn't warn or conditionally route** | §A7, §A8 |
| Low | **Progress bar doesn't account for post-submit step 8** | §A4 |
| Low | **No auto-advance** — adds a click per step vs. IvyRx's tapping rhythm | §A3 |

### Worlds comparison: men vs. women

**The flow is identical.** Both worlds render the same 8 screens with the same
goal tiles, the same medical-history options, and the same contact fields. The
only differences are:
- Step 0 hero imagery (male vs. female lifestyle photo)
- The `data-world` attribute casts azure (men) or orchid (women) accent tokens

No structural divergence — no women-specific screening questions (e.g.,
pregnancy is in the general medical-history checklist, not a separate gate).
IvyRx routes everyone through an identical flow; we do the same.
