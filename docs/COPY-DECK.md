# Copy deck: the home page, every line

Written 2026-09-02 after Chiya: "every word of copy needs to be thought
out, exactly why it is said, and what emotion it should do."

Rules for this deck:

- Every line that a visitor can read on the home page is here. If a line is
  not in this deck, it does not ship.
- Each line carries three things: **the job** (what it has to do for the
  reader at that moment), **the feeling** (what the reader should feel after
  reading it), and **the fact** (what makes the line true, and where that
  comes from). A line whose fact is marked OPEN is a claim only Chiya can
  confirm; until she does, the line is off the page.
- Voice: second person, plain, friendly, direct. Short sentences. Doctor,
  not physician, except where a legal or FDA phrase requires the formal word.
- Two hard rules from law: nothing that implies an outcome for the reader
  (compliance), and nothing that defines us by what we are not (voice gate).

Status key: LIVE = on the page now · OFF = removed until confirmed · CATALOG
= comes from the product data, not this deck.

---

## 1. Hero

**Kicker: "Prescribed by U.S. licensed doctors"** · LIVE
Job: the first fixation. Say who is behind this before anything else, so the
headline is read as medicine, not marketing.
Feeling: safety. "A real doctor is involved."
Fact: prescribing is by independent U.S. licensed physicians through the
telehealth partner (data/physicians.ts, data/compliance.ts).

**Headline: "Your body. Your numbers. Your plan."** · LIVE
Job: the promise of the whole site in six words: this is built around you,
from your own blood test, and it ends in something that is yours.
Feeling: recognition, then ownership. The reader sees themself in it.
Fact: a panel is drawn before prescribing and the protocol is set from it
(data/biomarkerPanel.ts, physicians.ts step 01 and 02).

**Subline: "A U.S. doctor checks 99 markers in your blood, then writes a
plan that is actually yours. Made for you in a licensed U.S. pharmacy.
Delivered cold."** · LIVE
Job: explain the headline in one breath: who, what they check, what you get,
how it arrives.
Feeling: clarity. "I understand exactly what happens."
Fact: 99 markers (PANEL_TOTAL_MARKERS), 503A compounding, cold shipping
(compliance.ts). "Actually yours" is earned by the panel being the reader's
own, not a template.

**Button: "Start your assessment"** · LIVE
Job: the one action. "Assessment" rather than "quiz" or "consultation" so it
sounds like a medical step, not a sales step.
Feeling: low stakes, easy. Starting costs nothing but two minutes.
Fact: the assessment is the intake form (/assessment).

**Microline: "Two minutes. You pay only if a doctor prescribes."** · OFF
Job: remove the two fears under the button: how long, and what it costs.
Feeling: relief.
Fact: OPEN. "You pay only if a doctor prescribes" depends on how billing is
actually run in Bask. Chiya has not confirmed it. Until she does the line is
**"Two minutes to start."** (LIVE), which is true and does the first half of
the job.

**Trust chips: "U.S. licensed doctors" · "Licensed 503A pharmacy" · "99
markers read first" · "Ships cold, all 50 states"** · LIVE
Job: the four proofs a careful buyer scans for, as scannable pills, so the
skeptic gets their checklist without reading a paragraph.
Feeling: "this is a real clinic."
Fact: compliance.ts (physician network, 503A, shipping). "All 50 states" is
the current shipping claim in compliance.ts; if any state is excluded for a
product that is handled on the product page, not here.

## 2. Start with your goal

**Kicker: "Start with your goal"** · LIVE
Job: name the section as a door, not a menu.
Feeling: "there is a place for me here."

**Headline: "What do you want help with?"** · LIVE
Job: ask the reader the one question they came with, in their words.
Feeling: being asked, not sold to.
Fact: none needed; it is a question.

**Card titles: "Weight" · "Strength" · "Desire"** · LIVE
Job: three plain nouns a person would say out loud. One word each.
Feeling: recognition.
Fact: the three live goal categories with a sellable prescription behind
them (data/peptides.ts liveCategories, soloCatalog LAUNCH_SLUGS).

**Card lines: "Appetite, finally quiet." · "Strength, with receipts." ·
"Desire, addressed directly."** · CATALOG (CATEGORY_FEELING in
data/peptides.ts)
Job: one feeling per goal, so the card reads as a wish rather than a
diagnosis.
Feeling: the wish, named.
Fact: these are the house feeling lines already used on the goal pages and
in the assessment. Compliance note: "finally quiet" and "with receipts"
gesture at an outcome. They passed the earlier compliance review as feeling
lines, not result claims. Chiya to keep or replace; if replaced, replace in
data/peptides.ts so every surface changes together.

**Card meta: "2 options · Start here"** · LIVE
Job: say how many prescriptions sit behind the door and that this is a
door.
Feeling: "there is something real behind this."
Fact: counted from the catalog at render time, never typed.

**Chips: "Or jump straight in with" · "Weight" · "Strength" · "Desire" ·
"Not sure yet"** · LIVE
Job: the fastest path. One tap lands in the assessment with the goal chosen.
"Not sure yet" is there because a large share of visitors are not sure, and
they should feel welcome rather than filtered out.
Feeling: permission.
Fact: the assessment accepts ?goal= (Assessment.tsx GOAL_PARAM_TO_GOAL).

## 3. What you get (the checklist)

**Kicker: "What you get"** · LIVE
**Headline: "Four things to expect from a real clinic. You get all four."** · LIVE
Job: turn the buyer's own checklist for spotting a real clinic into our
proof section. Say the standard first, then that we meet it.
Feeling: the skeptic relaxes.
Fact: the four items below.

**01 "Your own doctor." / "A named, state-licensed physician reads your file
and signs your prescription."** · LIVE
Job: the first proof: a named human, licensed where you live.
Feeling: accountability.
Fact: physicians.ts standards (state licensure, board certification). The
word "physician" stays here because it is the licensing term.

**02 "Your own batch." / "Made for you in a licensed U.S. 503A pharmacy,
batch documented, shipped cold."** · LIVE
Job: the second proof: this is made for you, on record, not from a shelf.
Feeling: care.
Fact: 503A compounding per prescription (compliance.ts). "Batch documented"
describes standard 503A record keeping; if the pharmacy partner's practice
differs, cut the phrase.

**03 "Your blood, read first." / "99 markers, drawn and reviewed before
anything is prescribed."** · LIVE (the 99 counts up on screen)
Job: the third proof and the site's spine: labs before anything.
Feeling: rigor.
Fact: physicians.ts step 01 ("no prescription precedes labs").

**04 "Your retest, already booked." / "The same 99 markers again at 90 days.
Your dose follows what they show."** · LIVE
Job: the fourth proof: this continues on evidence.
Feeling: being looked after over time.
Fact: the 90-day retest cadence (physicians.ts, bloodwork data). "Already
booked" means it is part of the plan, not that a calendar appointment exists
at signup; if that reads as a literal booking to Chiya, change to "on the
calendar."

**Closing line: "That is the whole model. It is also how you tell a real
clinic from a website."** · LIVE
Job: land the section: we just handed you the test, use it on anyone.
Feeling: confidence, and a little pride.
Fact: none needed.

## 4. Your options (the formulary)

**Kicker: "Your options"** · LIVE
**Headline: "What each one does for you, and when you will know."** · LIVE
Job: introduce the four prescriptions as choices about you, and promise a
timeline rather than a miracle.
Feeling: informed.
Fact: each tile's timeline comes from the catalog.

**Tile lines (outcome, name, first timeline mark, price floor)** · CATALOG
(data/soloCatalog.ts). Examples: "Visceral fat, addressed on the axis." ·
"Tesamorelin" · "Wk 2 Early metabolic response." · "from $249/mo".
Job: one honest sentence per molecule, the real name, the first point at
which a doctor would expect to see anything, and the lowest real monthly
figure.
Feeling: plain and specific.
Fact: catalog. Chiya to review the four outcome lines and the timeline marks
in soloCatalog.ts; they were written before this voice and read more
clinical than the rest of the page. "Priced at consultation" for PT-141 is
true today (no pricing in the catalog) and must be replaced with a figure
when one exists.

**Link: "The complete catalog"** · LIVE
Job: the exit for someone who wants everything before choosing.

## 5. What arrives

**Kicker: "What arrives"** · LIVE
**Headline: "A plain box, cold, at your door."** · LIVE
Job: make the abstract concrete: this is the thing that shows up.
Feeling: anticipation, and discretion.
Fact: cold-chain shipping, unbranded packaging (compliance.ts). "Plain box"
must match the actual packaging from the pharmacy partner; Chiya to confirm
the outside carries no product name.

**"Your vials, made for you." / "Compounded to your prescription in a
licensed U.S. 503A pharmacy, packed on ice."** · LIVE
Job: what is in the box and why it is yours.
Fact: 503A, cold pack shipping.

**"Your doctor's note inside." / "Your dose, your schedule, and how to reach
your doctor through the portal."** · LIVE
Job: the human touch in the box, and the reminder that the doctor stays
reachable.
Fact: OPEN. Whether a printed note with dose and schedule is actually in the
box, and whether portal messaging is live, are operational facts for
Chiya/Bask. Until confirmed this line reads **"Your dose and your schedule,
in writing."** which is true of the prescription itself.

**"The outside is plain." / "The inside is yours. Delivered cold to all 50
states."** · LIVE
Job: discretion, stated as a positive.
Fact: as above.

**Promise line under the list** · OFF (see billing, below)

## 6. How it works

**Kicker: "How it works"** · LIVE
**Headline: "Three steps. Your doctor is in every one."** · LIVE
Job: three steps, and the reassurance that none of them is automated.
Feeling: simple and safe.
Fact: physicians.ts (no algorithmic approvals).

**1 "Choose your plan." / "Pick the peptide and the plan length, and check
out. Two minutes."** · LIVE
**2 "Answer the questionnaire." / "Your health, your history and your goal,
plus 99 markers drawn at a lab near you. All of it goes to a U.S. licensed
doctor."** · LIVE
**3 "Your doctor decides. Then it ships." / "If it fits you, your
prescription goes to a licensed 503A pharmacy, is made for you, and ships
cold. At 90 days you test again, and your dose follows your numbers."** · LIVE
Job: the path in the order it actually happens (Chiya, 2026-09-02: checkout
first, then the questionnaire, then the doctor), each step ending with the
doctor.
Feeling: "I can see the whole road, and where the money goes."
Fact: checkout before questionnaire (Chiya); CLIA lab draw, physician
review, 503A, 90-day retest (physicians.ts, compliance.ts).

**Fine print: "If your doctor says no, nothing is made. The refund policy
sets out what is refunded."** · LIVE
**Fine print: "Prices are per month. Twelve-month plans include your blood
panel."** · LIVE
Job: the two things a careful reader wants in writing before they start.
Feeling: honesty.
Fact: pricing cadence and panel inclusion (data/pricing.ts, soloCatalog).

## 7. Try it (the hold)

**Kicker: "Try it"** · LIVE
**Headline: "Hold to run your 90 days."** · LIVE
**Line: "Your first panel, your doctor's read, your retest. Your dose
follows your numbers. Run it yourself."** · LIVE
**Readout: "Day 0 of 90" · "baseline" · "retest"** · LIVE
**Lines that light: "Panel drawn." · "Doctor reviewed." · "Dose adjusted."** · LIVE
**Button: "Hold to run your 90 days" → "Ninety days, run."** · LIVE
**Help: "Press and hold. Let go early and the days ease back." → "That is
the whole model: your panel, read twice, and your dose in between."** · LIVE
Job: let the reader perform the premise with their hand instead of reading
it a fourth time.
Feeling: play, then understanding.
Fact: the same three facts as the checklist.

## 8. Your price

**Kicker: "Your price"** · LIVE
**Headline: "One number a month. Everything within it."** · LIVE
**Line: "Your consultation, your blood panel, your medication, shipping and
your 90-day retest are all inside the figure. Your doctor sets the dose. The
price does not change with it."** · LIVE
Job: state the price as complete, as a positive (house law: assurance as
completeness).
Feeling: no surprises coming.
Fact: OPEN in part. That the figure includes consultation, panel,
medication, shipping and retest is the pricing model in data/pricing.ts;
Chiya to confirm it matches how Bask bills. "The price does not change with
the dose" is true only if dose changes never change the monthly figure.
Confirm.

**Table: peptide · 1 month · 3 months · 12 months** · CATALOG
**Promise line under the table** · OFF (billing)

## 9. Your questions (FAQ)

**Kicker: "Your questions"** · LIVE
**Headline: "What people ask before they start."** · LIVE
Job: answer the real objections found in research, in their words.

**"Is this legit?"** · LIVE. Job: the question everyone has and nobody asks a
salesperson. Answer restates the four proofs. Feeling: relief.
**"Do I actually talk to a doctor?"** · LIVE. Answer: yes, and how. Fact:
portal messaging is OPEN (see What arrives); the answer now reads "A doctor
reads your full intake and your 99-marker panel and makes the call. Your
dose is reviewed at every retest."
**"Do I need bloodwork?"** · LIVE. Job: turn the objection into the reason.
Fact: panel inside the monthly figure (pricing.ts); the retest as the point.
**"What if the doctor says no?"** · LIVE, rewritten: "Then nothing is made.
Some intakes end there." The billing half is OFF until confirmed.
**"How is compounded semaglutide different from Ozempic?"** · LIVE. FDA
wording, verbatim, exempt from the voice gate. Job: the one answer that has
to be exactly right.
**"How is it shipped?"** · LIVE: "Cold, in a plain package, to your door in
all 50 states."

## 10. The closer

**Headline: "Your numbers decide. Your doctor signs. Your plan."** · LIVE
Job: the headline again, now that the reader knows what it means.
Feeling: resolve.
**Button: "Start your assessment"** · LIVE
**Microline: "Two minutes to start."** · LIVE (billing half OFF)

## 11. Footer line

**"Lifestyle imagery is illustrative. Product photography shows the actual
vials."** · LIVE
Job: disclose the generated lifestyle photography without apologising for
it. Fact: the lifestyle photographs are generated; the vial photographs are
the product renders used sitewide.

---

## The open facts (Chiya to confirm, one at a time)

1. **Billing.** ANSWERED 2026-09-02 by Chiya: something is charged up
   front. "The checkout can be before the questionnaire. The questionnaire
   goes to the doctor, and they make the prescription." So every
   "complimentary consultation", "no charge unless prescribed" and "you pay
   only if prescribed" line was untrue and is retired sitewide (17 files
   plus the llms.txt generator). The legal refund policy already said the
   consultation fee and the lab panel fee are paid and non-refundable once
   used; the marketing copy now agrees with it. Replacement lines state the
   review condition ("a licensed doctor reviews your order before anything
   is made", "nothing is made without a prescription") and point to the
   refund policy for money outcomes. The home page steps now run in the true
   order: choose your plan, answer the questionnaire, your doctor decides.
   Still open: the exact amount and timing of the up-front charge, for a
   plain line about it. Original question:
   Is a visitor charged anything before a doctor prescribes?
   If the answer is "no charge before a prescription," the lines "You pay
   only if a doctor prescribes," "nothing is billed," and the sitewide
   promise "No charge unless a doctor prescribes. The review is
   complimentary." can return. If anything is charged up front (an intake
   fee, the panel, a deposit), every one of those lines stays off and the
   announcement bar's "Your first consultation is complimentary" must also
   change. This is the line that started this deck.
2. **The box.** Is the outside unbranded, and is there a printed note with
   dose and schedule inside?
3. **The portal.** Can a patient message their doctor through a portal today?
4. **Price completeness.** Does the monthly figure include consultation,
   panel, medication, shipping and the 90-day retest, and does it stay the
   same when the dose changes?
5. **Retest.** Is the 90-day retest part of every plan?
6. **Goal feeling lines.** Keep "Appetite, finally quiet." / "Strength, with
   receipts." / "Desire, addressed directly."?

Everything else on the page rests on facts already in the repo's data files
(compliance.ts, physicians.ts, biomarkerPanel.ts, pricing.ts, soloCatalog.ts).


---

## Sitewide claims found on 2026-09-02 that only Chiya can confirm

Found by searching every rendered string for portals, messaging, testing,
privacy, shipping time and payment claims. None of these were changed; each
is either true and stays, or comes out. One answer per line is enough.

1. **Third-party batch testing.** About page: "Every batch third-party
   tested", "batch-tested, third-party verified"; checkout: "third-party
   COA on every batch". Does the pharmacy partner issue a third-party
   certificate of analysis for every batch?
2. **Physician messaging between visits.** About page headline
   "Physician messaging between visits"; physicians.ts "ongoing secure
   portal messaging"; assessment "requisition generated in your member
   portal". Is there a patient portal with messaging today?
3. **HIPAA-compliant.** About page, the assessment trust row, the trust
   strip, the footer "HIPAA · Encrypted intake". Is intake handled in a
   HIPAA-covered system (Bask), so the claim holds?
4. **HSA/FSA eligible.** Cart drawer. Confirmed with the payment processor?
5. **Cancel anytime before dispense.** Assessment trust row. True under the
   refund policy? The policy says monthly fees already charged are not
   refunded; "before dispense" needs to match it.
6. **Discreet 3 to 5 day shipping.** Trust strip. The actual transit window?
7. **Tested twice a year.** Biomarker panel data. Is the retest cadence
   90 days (four times a year) or twice a year? Both appear on the site.

Already handled today: "complimentary consultation" and "no charge unless
prescribed" (retired sitewide), "marker dashboard & messaging" and "secure
telehealth messaging" (reduced to what is confirmed), "you pay only if a
doctor prescribes" (off the home page).


---

## Model change, 2026-09-02 evening: start first, one full panel at week 12

Chiya's three decisions (docs/MASTER-PLAN.md Part 1) retire "labs before
anything is prescribed" and the number 99 from the whole site. The lines
below replace their earlier entries above; job and feeling carry over
unless restated. The panel count is derived from data/monitoring.ts and is
never typed.

**Hero subline: "A U.S. doctor writes your plan from your questionnaire.
Made for you in a licensed U.S. pharmacy, delivered cold. At week 12 a full
blood panel, included, shows what changed."** · LIVE
Fact: Chiya, 2026-09-02: start first; week 12 full panel, included.

**Trust chip: "Full blood panel at week 12, included"** · LIVE (replaces "99
markers read first").

**Checklist 03: "Your blood, read at week 12." / "A full panel of N markers,
included, drawn at week 12 and read by your doctor."** · LIVE (N derived).
**Checklist 04: "Your dose, adjusted from it." / "Your doctor continues,
adjusts or stops from what your blood shows. Every change has a number
behind it."** · LIVE

**Step 2: "Answer the questionnaire." / "Your health, your history, your
goal, and the screens that matter for your peptide. All of it goes to a
U.S. licensed doctor."** · LIVE
Fact: with no draw before the first dose, the questionnaire carries the
screens (thyroid cancer history, pancreatitis, pregnancy, diabetes drugs,
cancer history, blood pressure). PENDING the physicians' confirmation that
their intake asks them.
**Step 3: "...At week 12 a full blood panel, included, shows your doctor
what changed, and your dose follows it."** · LIVE

**The hold: "Hold to run your 12 weeks." Readout "Week 0 of 12", axis
"start" to "week 12", lines "You start." "Week 12: panel drawn." "Dose
adjusted."** · LIVE

**Pricing line: "Your doctor, your medication, shipping and your week-12
blood panel are all inside the figure."** · LIVE. Fact: OPEN (price
completeness) as before.

**FAQ "Do I need bloodwork?": "Yes, at week 12. You start first. Then a full
panel, drawn at a lab near you and included in your plan, shows your doctor
what changed, so your dose follows your numbers."** · LIVE
**FAQ "Is this legit?": "...reviews your questionnaire and signs every
prescription... At week 12 your blood is drawn and read."** · LIVE

Sitewide, the same model now appears on bloodwork, how it works,
physicians, pricing, the product pages, the goal pages, what happens next,
about, the FAQ, the trust strip, the cart and the legal consent page. The
"Basic / Full / Elite" panel tiers still exist in the catalog data and on
the bloodwork and pricing pages; with one panel for everyone they should
collapse to one, which is the next step.
