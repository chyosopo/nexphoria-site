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
Fact: the doctor prescribes from the questionnaire and the plan is adjusted
from the week-12 panel (data/monitoring.ts; Chiya 2026-09-02, start first).

**Subline: "A U.S. doctor writes your plan from your questionnaire. Made
for you in a licensed U.S. pharmacy, delivered cold. At week 12 a full blood
panel, included, shows what changed."** · LIVE (replaced the 99-marker line
on 2026-09-02)
Job: explain the headline in one breath: who, from what, what you get, how
it arrives, and what happens at week 12.
Feeling: clarity. "I understand exactly what happens."
Fact: prescribing from the questionnaire, 503A compounding, cold shipping
(compliance.ts); the week-12 panel included (data/monitoring.ts,
pricing.ts).

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

**Trust chips: "U.S. licensed doctors" · "Licensed 503A pharmacy" · "Full
blood panel at week 12, included" · "Ships cold, all 50 states"** · LIVE
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

**03 "Your blood, read at week 12." / "A full panel of {count} markers,
included, drawn at week 12 and read by your doctor."** · LIVE (the count is
derived from data/monitoring.ts and counts up on screen)
Job: the third proof and the site's spine: the plan is checked against
your own blood, at the point where there is something to read.
Feeling: rigor.
Fact: one full panel at week 12, included, for everyone (Chiya
2026-09-02, decisions 2 and 3; data/monitoring.ts).

**04 "Your dose, adjusted from it." / "Your doctor continues, adjusts or
stops from what your blood shows. Every change has a number behind it."**
· LIVE
Job: the fourth proof: this continues on evidence.
Feeling: being looked after over time.
Fact: the week-12 read sets the next dose (data/monitoring.ts). "Every
change has a number behind it" is the doctor's read of the panel, so it
holds as long as the panel is drawn
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
**2 "Answer the questionnaire." / "Your health, your history, your goal,
and the screens that matter for your peptide. All of it goes to a U.S.
licensed doctor."** · LIVE
**3 "Your doctor decides. Then it ships." / "If it fits you, your
prescription goes to a licensed 503A pharmacy, is made for you, and ships
cold. At week 12 a full blood panel, included, shows your doctor what
changed, and your dose follows it."** · LIVE
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
reads your full intake and your {count}-marker panel and makes the call.
Your dose is reviewed at every retest."
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


---

# Copy deck: the goal pages (/goals/metabolic, /goals/growth, /goals/sexual-health)

Written 2026-09-03 for master plan step 4. One template
(`client/src/pages/Category.tsx`), three live goals. Same rules as above.
The structure is the journey: arrive, understand, choose, the first twelve
weeks, why your blood, the honest part, questions, start.

## 1. Arrive

**Kicker: "{Weight | Strength | Desire} · Prescribed by U.S. licensed
doctors"** · LIVE
Job: confirm the door the reader came through, and who is behind it.
Feeling: "right place, real doctor."
Fact: the goal picker's own word; physicians.ts.

**Headline: the goal's feeling line** ("Appetite, finally quiet." / "Strength,
with receipts." / "Desire, addressed directly." with the women's world
variants from data/peptides.ts) · LIVE
Job: the same words as the tile that brought them here, so the click is
confirmed in the first fixation.
Feeling: recognition. OPEN for Chiya: these lines predate the you-voice pass
and she has not yet approved them.
Fact: no claim; a feeling line.

**Subline (Weight): "Semaglutide and tirzepatide turn the hunger signal
down. A U.S. doctor picks one for you from your questionnaire. A licensed
U.S. pharmacy makes it. At week 12 your blood shows what changed."** · LIVE
**Subline (Strength): "Tesamorelin asks your body to release more of its own
growth hormone. A U.S. doctor prescribes it from your questionnaire, a
licensed U.S. pharmacy makes it, and at week 12 your blood shows the number
your dose is set against."** · LIVE
**Subline (Desire): "PT-141 works on desire through the brain, on the day
you choose. A U.S. doctor prescribes it from your questionnaire, a licensed
U.S. pharmacy makes it, and it ships cold to your door."** · LIVE
Job: for someone who has never heard of the medicine: what it is, who
prescribes it, who makes it, what happens next. One breath.
Feeling: clarity, and the sense of being told straight.
Fact: mechanism from data/monitoring.ts and soloCatalog.ts; the week-12
panel; IGF-1 as tesamorelin's dose marker.

**Buttons: "Start your assessment" / "New to peptides? Start here"** · LIVE
Job: the one action, and the exit for the reader who needs the longer story
(Peptides 101) instead of being pushed.
Feeling: no pressure.

**Microline: "Two minutes to start. Your doctor decides from your
answers."** · LIVE
Job: how long, and who decides. Feeling: low stakes, honest.
Fact: the questionnaire is the intake; the doctor prescribes from it.

## 2. Understand ("What it is")

**Weight: "One shot a week that turns hunger down."** + two paragraphs
(the gut hormone, the copy of it, what you feel; how and how often you take
it, why the dose starts low) · LIVE
**Strength: "A nightly dose that asks your body for its own growth
hormone."** + two paragraphs (pulses at night, the signal copied, studied
most for visceral fat; one daily dose, the number that changes is IGF-1) ·
LIVE
**Desire: "A dose you take when you want it, that works through the
brain."** + two paragraphs (upstream of blood flow, men and women; an hour
before, several hours, the blood-pressure check) · LIVE
Job: teach the mechanism in plain words so the reader can explain it to
someone else. No outcome promised; only what the medicine does in the body.
Feeling: "I get it."
Fact: GLP-1 and GIP mechanism, GHRH analog and IGF-1, melanocortin pathway
(data/monitoring.ts, soloCatalog.ts mechanism lines). "Studied most for
visceral fat" is tesamorelin's approved indication context.

**Link: "Want the longer version? Peptides 101 explains it from the
start"** · LIVE

## 3. Choose ("Your options")

**Heading: "Two medicines. Your doctor picks one." / "One medicine, made
for you."** · LIVE, derived from the count.
**Tiles** · CATALOG: real vial photo, outcome line, name, how you take it
("Once a week, under the skin" derived from the dose), price line ("from
$X/mo" from the 12-month figure, or "Priced at consultation").
**"Which one?" (Weight only): "Semaglutide works on one hunger signal.
Tirzepatide works on two. Your doctor chooses from your history, your goal
and what is available in your state. You can name a preference in the
questionnaire, and your doctor has the final word."** · LIVE
Job: answer the question everyone has on this page without ranking the two.
Feeling: informed, and relieved the choice is shared.
Fact: receptor count; stateExclusions in soloCatalog.ts; the questionnaire
carries a goal and preference.
**Footnote: "Prescription only. Your doctor decides, and can decline.
Availability varies by state."** · LIVE

## 4. Your first twelve weeks

**Heading: "What actually happens, week by week." / "You start first. Your
doctor prescribes from your questionnaire, and your blood is read at week
12, when there is something to read."** · LIVE
Four beats per goal (Week 1, Weeks 2 to 8, Week 12, After; for Desire:
Dose 1, The first weeks, Week 12, After) · LIVE
Job: remove the fear of the unknown by showing the shape of the thing.
Feeling: calm. "I know what is coming."
Fact: titration for the GLP-1s; a fixed nightly dose for tesamorelin; an
as-needed pattern with a monthly limit for PT-141; the week-12 panel for
all (data/monitoring.ts). "Your doctor sets a monthly limit" is standard
PT-141 practice; if the prescribers' protocol differs, cut it.

## 5. Why your blood is part of it

**"At week 12, your blood tells your doctor what changed." / "A full panel
of {count} markers is drawn, included in your plan. These are the ones your
doctor reads first for this goal, and why."** · LIVE
The marker cards (name + why) are DERIVED from the goal's peptides' watch
lists and the panel's own reasons (data/monitoring.ts); nothing typed.
**"{Peptide}'s dose is set against {marker}."** · LIVE where a dose marker
exists (tesamorelin, IGF-1).
Job: make the blood test the point of the plan, not a chore.
Feeling: taken seriously.
Fact: PROPOSED panel pending the physicians' sign-off (SIGNED_OFF flag).

## 6. The honest part

**"Your doctor decides. Here is what they ask first." / "These questions
are in the questionnaire because your doctor prescribes from it, before any
blood is drawn. Answer them straight. A no from your doctor is them doing
their job."** · LIVE
The screens listed are DERIVED (intakeScreens per peptide).
Job: say plainly that a no is possible, and turn it into a reason to trust.
Feeling: respect. Stated as what the doctor does, never as what we are not.
Fact: intake screens in data/monitoring.ts; the intake must actually carry
them (OPEN: confirm against the Bask questionnaire).
**FDA line, verbatim, plus "Availability varies by state."** · LIVE

## 7. Questions, then start

FAQ per goal (three or four) · LIVE. The Ozempic answer is the home page's.
"What if my doctor says no?" leaves money out until Chiya confirms the
refund on decline (OPEN).
**Closer: "Your questionnaire. Your doctor. Your plan." / "Two minutes of
honest answers. A U.S. licensed doctor reads them and decides. If it is a
yes, your medicine is made for you and ships cold."** · LIVE
Job: the last ask, restating the three nouns the page was built on.
Feeling: ready.

## Removed from the old goal page, and why

- "90 days between every retest, every cycle" and "tracked against your
  quarterly labs": untrue under the week-12 model.
- The illustrated progress bar with a status chip ("Improving"): a
  fabricated-looking outcome. Nothing on the page may imply a result.
- The protocol selector's stack routes ("The Ignite protocol", "Full
  panel" tier badges) and "a physician matches you to the right route
  against your bloodwork": labs-first language, and tier names that no
  longer exist.
- "Physician-directed", "lab-gated", "calibrated to your bloodwork":
  house-voice pass; "doctor", plain words.
- Nav "Shop by outcome" now lists only goals with a medicine behind them,
  and "Featured peptides" is the live catalog; four of six links led to
  empty pages.

---

# Copy deck: the pre-checkout block, the checkout page, and the FAQ

Written 2026-09-03 (master plan step 6 and part of step 7).

## The pre-checkout block (`client/src/components/PayToday.tsx`, on /cart and /checkout)

**Kicker: "What you pay today"** · LIVE
Job: name the one fear at the figure: how much, and when.
Feeling: no surprise coming.

**Figure: "{monthly figure} a month"** · CATALOG
Job: the number, once, in the largest type on the block.
Fact: the cart subtotal, which is the catalog's monthly figure for the
chosen cadence. OPEN: whether anything beyond the first month is charged
at checkout; until Chiya confirms, the block states the monthly figure and
never a second number.

**"Everything within it: your doctor's review, your medicine, cold
shipping, and the full blood panel of {count} markers at week 12."** · LIVE
Job: assurance stated as completeness (law 3 house phrase).
Fact: pricing.ts (consult, panel and shipping inside the figure);
data/monitoring.ts for the count.

**"What happens next" · four beats: Check out / Answer the questionnaire /
Your doctor decides / If it is a no** · LIVE
Job: the order Chiya gave on 2026-09-02, checkout before questionnaire,
told as four short sentences so the reader knows the shape before paying.
Feeling: calm. "I know what I am walking into."
Fact: the flow; the refund policy governs a decline (link).

**Footer: "Prescription only. Your doctor decides, and can decline." +
Refund policy link** · LIVE

## The checkout page (`client/src/pages/Checkout.tsx`)

**H1 "Your plan, then your doctor." / "Check out, answer the questionnaire,
and a U.S. licensed doctor decides. If it is a yes, your medicine is made
for you and ships cold."** · LIVE (replaced "Submit for physician review")
**Billing notice: "Your doctor decides before anything is made." +
"Billing runs through Bask Health, our telehealth billing partner. The
figure is complete..."** · LIVE. Retired: "no card is collected today",
"You are never charged before a physician approves", "No payment collected
today" (all untrue under the billing truth, and defensive negation).
**Rail footer: "Billing is handled by Bask Health... Prescription only.
Your doctor decides, and can decline."** · LIVE

## /what-happens-next

Four phases rewritten in the you voice; "never charged before that
decision", "No black box" and "Not a questionnaire score" retired.
Closer: "Your doctor decides first. Then your medicine is made for you."

## The FAQ (`client/src/pages/FAQ.tsx`), rewritten from data

Five groups: Peptides, Your doctor, Price, Safety, Shipping, Legal. Every
fact derives from the catalog (`SOLO_CATALOG` names, gated-state
exclusions), the compliance blocks (provider and pharmacy, verbatim), the
panel data and pricing. Retired from the old FAQ, with the reason:
- the 16-molecule formulary, retatrutide, enclomiphene, kisspeptin: not
  in the catalog;
- "~15% body-weight reduction", "18 to 28% in trials", "results within 4
  to 8 weeks": outcome claims;
- "2,000+ partner laboratory locations", "requisition in your member
  portal", "labs reviewed before prescribing": the old model;
- "no separate consult fee", "not charged for compounding if declined":
  billing claims Chiya has not confirmed, and defensive negation;
- FSA/HSA eligibility, "cancel from your member portal", "certificate of
  analysis with every shipment", "4 to 7 business days", "expedited
  compounding": OPEN claims, off until confirmed;
- portal messaging: OPEN; replaced with hello@nexphoria.com.

## Also retired on 2026-09-03

- TrustStatsStrip placeholder figures on /pricing ("50,000+ patients
  served", "7 peer-reviewed publications", "3 formulation patents"): never
  verified, rendered live.
- Bloodwork "Illustrative trajectory of one Nexphoria patient" section: read
  as a patient record.
- Assessment sidebar "HIPAA-compliant", "Cancel anytime before dispense",
  "Protocol designed within 5 days": OPEN claims.

## Also retired on 2026-09-03, evening pass

- Cart "Recommended add-ons": a lab panel "required before your first
  prescription" and a BPC-157 stack tile (retired molecule). Replaced with
  one "Within the figure" note: the week-12 panel, included.
- Checkout "Total if prescribed", "Stack savings", "Cold-chain shipped after
  physician approval", every "→" glyph: now "Your figure", "Plan savings",
  "Shipped cold to all 50 states once your doctor says yes".
- Trust bar "HIPAA-compliant" and "Discreet 3 to 5 day shipping": OPEN
  claims, replaced with "Prescription only" and "Ships cold, in a plain
  box". About's "HIPAA-compliant" standard became "Your privacy" without the
  BAA claim. Checkout's "HIPAA-aligned" lines became "encrypted in transit".
- Physicians hero "reviewed against your bloodwork", chips "Signs every
  refill" and "Direct portal messaging", stat "0 algorithmic approvals":
  labs-first, OPEN, and negation. Now "reads every answer", "signs your
  prescription", "reads your blood at week 12", "1 doctor signs your
  prescription".
- Protocols page sample "Biomarker index" dashboard (61/76 markers, minus
  3.4 years biological age): fabricated-looking figures.
- Bloodwork comparison "your own start": there is no baseline draw.
