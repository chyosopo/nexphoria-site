# Nexphoria master plan: the model, the journey, the copy, the funnel

Written 2026-09-02 from Chiya's brief: rethink the whole copy and the whole
customer journey into a converting machine; present the best of what we do
with excitement, for people who have never heard of peptides; explain the
benefits, the outcomes and the bloodwork; define the stacks, the bundles,
the funnel and the checkout; make a complete plan and execute it one by one.

The plan is in seven parts. Part 1 is the thing everything else hangs on,
and it needs three decisions from Chiya before the copy can be true.

---

## Part 1. The model: how peptides and bloodwork work together

### Where "99 markers" came from

It is `client/src/data/biomarkerPanel.ts`: eleven categories (heart,
metabolism, hormones, stress, thyroid, and so on) adding up to 99 reported
values, written in July 2026 as a marketing artifact that made the site
sound rigorous. It was never tied to any peptide. Nothing on the site
explains why a person taking semaglutide needs their Lipoprotein(a) or a
thyroid antibody. That is why it reads as old: it is a number, not a
reason. It goes.

### The honest answer to "why monitor blood at all"

A peptide is a signal. It tells the body to do something it already knows
how to do: release growth hormone, slow the stomach, quiet appetite. The
signal works on everyone a little differently, and the only place you can
see how it is working, before you can feel it, is in the blood. Three jobs:

1. **Before the first dose: is this safe for you, and where are you
   starting from?** A GLP-1 in someone with a pancreatic or thyroid problem
   they do not know about is a risk the doctor must rule out. Tesamorelin
   can raise blood sugar; the doctor needs to know yours first. A baseline
   is also the only way to prove later that something changed.
2. **During: is the dose right?** Tesamorelin is dosed to IGF-1: too low and
   nothing happens, too high and the doctor pulls it back. GLP-1 titration
   is guided by response, tolerance and glucose. Blood turns "I think it is
   working" into a number the doctor can act on.
3. **After twelve weeks: did it work, and what next?** The same markers
   again. Continue, adjust, taper, or stop. This is the receipt.

That is the whole story, and it is a good one. It does not need 99 markers.
It needs the right dozen for each peptide, drawn twice.

### Chiya's decisions, 2026-09-02

1. **Start first, test later.** The doctor prescribes from the questionnaire.
   There is no blood draw before the first dose. (Recommendation was a small
   baseline; Chiya chose start first. Recorded, and the site says so plainly.
   The physicians' intake must carry the screens a baseline would have
   caught: thyroid cancer history, pancreatitis, pregnancy, diabetes
   medication, cancer history, blood pressure.)
2. **Week 12 retest, included in the price.** One full panel at the end of
   the first twelve weeks, read by the doctor, who continues, adjusts or
   stops.
3. **One full panel for everyone.** The same panel for every plan, and the
   reason for every marker printed on the page. Its contents are proposed in
   `client/src/data/monitoring.ts` and need the physicians' sign-off.

So the model in one line: **choose your plan, answer the questionnaire, your
doctor prescribes, you start; at week 12 a full blood panel, included, shows
your doctor what changed, and your dose follows it.**

### The recommendation that was made (kept for the record)

**Decision 1: baseline before the first dose, or start first and test
later?** Chiya's instinct: "we first get a peptide, then we monitor."
Recommendation: **baseline first, once, and keep it small.** Reasons:
a licensed physician cannot responsibly prescribe a GLP-1 or a GH-axis
peptide without seeing glucose, kidney and liver function; LegitScript and
the pharmacy partner expect it; and without a baseline the retest proves
nothing. The fix for "labs feel like a wall" is not to remove them, it is to
make them small, fast and explained. A focused panel is a single tube at a
lab near you, results in days, and the site tells you exactly why each
marker is there.

**Decision 2: the retest.** Recommendation: **week 12 for every plan, and
included in the price.** GLP-1 titration schedules and tesamorelin's IGF-1
response both settle around twelve weeks, so one retest at week 12 is the
honest checkpoint. A week 4 check-in is a questionnaire and a message, not
a needle.

**Decision 3: one big panel for everyone, or the panel each peptide needs?**
Recommendation: **the panel each peptide needs**, with the reason for every
marker printed on the page. A full panel stays available as an add-on for
people who want the whole picture.

### The proposed panels (pending physician sign-off)

These are standard monitoring practice for these drug classes. The
prescribing physicians (MDI) must approve them before they are printed as
fact; until then the site says "your doctor sets your panel" and shows
these as what is typical.

| Peptide | Before the first dose | At week 12 | Why |
|---|---|---|---|
| Semaglutide, Tirzepatide (GLP-1 class) | HbA1c, fasting glucose, fasting insulin, lipid panel, comprehensive metabolic panel (kidney and liver), CBC, TSH, lipase | HbA1c, fasting glucose, lipid panel, CMP, lipase | Rules out pancreatic and kidney problems the drug can worsen, sets the glucose baseline, and shows the metabolic change the person came for. Personal or family history of medullary thyroid cancer is an intake question, not a blood test. |
| Tesamorelin (GH-axis) | IGF-1, HbA1c, fasting glucose, lipid panel (triglycerides), CMP | IGF-1, HbA1c, fasting glucose, lipid panel | IGF-1 is how the dose is set and capped. Tesamorelin can raise blood sugar, so glucose is watched. Triglycerides are what it is expected to move. |
| PT-141 (melanocortin) | Blood pressure and cardiovascular history at intake; optional testosterone and estradiol if low desire may be hormonal | None required; a doctor check-in | PT-141 raises blood pressure transiently; the screen is cardiovascular, not a blood marker. |
| GH secretagogue stacks (CJC-1295, Ipamorelin), if reinstated | IGF-1, glucose, HbA1c, lipid panel, CMP | IGF-1, glucose, HbA1c | Same logic as tesamorelin. |

Roughly 8 to 12 markers per plan instead of 99. One tube. The word on the
site becomes "your panel", never a number.

---

## Part 2. The customer journey, step by step

Every step names the page, the job of the copy there, the feeling to leave,
and the number that tells us it is working.

| Step | Where | The copy's job | Feeling | Measure |
|---|---|---|---|---|
| 1. Arrive | Home, goal pages, ads | Say what this is in one breath for someone who has never heard of peptides, and what it could mean for them | "Oh, this is for me" | Scroll past the hero, click into a goal |
| 2. Understand | Peptides 101, Bloodwork 101 (new pages), the peptide pages | Teach: what a peptide is, what each one does, why blood is part of it, what a plan looks like, with real excitement and no selling | "I get it, and I trust these people" | Time on page, click to a plan |
| 3. Choose | Goal page → plan page (peptide + panel + retest + price as one thing) | Make the plan feel complete and yours; show the timeline; answer the four objections on the page | "This is the one" | Click Start |
| 4. Check out | Bask checkout | State what is paid now, what happens next, and the refund terms in plain words before the card | "No surprises" | Completion rate |
| 5. Questionnaire | Bask intake | Feel like talking to a doctor, not a form | "Someone is actually reading this" | Completion |
| 6. Labs | Requisition email + What happens next page | Where to go, how long, what is being measured and why | "Easy, and I know why" | Draw completed |
| 7. Doctor decides | Email + portal | The decision, the dose, the plan, in the doctor's voice | "A real person decided" | Time to decision |
| 8. Delivery | The box, the note inside | How to start, what to expect week by week | "I know what I am doing" | First-dose confirmation |
| 9. Week 4 | Check-in questionnaire + message | How is it going, what to watch, when the retest is | "Looked after" | Response rate |
| 10. Week 12 | Retest + doctor's read | The receipt: what moved, what next | "It worked, and I can see it" | Renewal |

Steps 4 to 9 live in Bask and in email/SMS. The site owns 1 to 3 and the
"what happens next" page, and writes the copy for the emails.

---

## Part 3. The copy system

**Voice.** Second person, plain, short. An expert who is excited to explain,
never a salesperson. The reader is smart and new to this. Every claim has a
fact behind it; every fact has a reason on the page.

**Structure of every selling page** (goal pages, peptide pages, plan pages):
1. What it is, in one breath.
2. What it does in the body, in plain words (mechanism, without the jargon).
3. What people use it for, and what a realistic first twelve weeks look
   like (timeline, not a promise).
4. Why your blood is part of it: the specific markers, and why each one.
5. Your plan: what is in the box, what the doctor does, what the retest
   shows, the price as one number.
6. The honest part: who it is not for, side effects, the FDA line.
7. Start.

**Compliance guardrails, unchanged.** No outcome guarantees, no before and
after numbers, no "same as Ozempic". The FDA compounded-drug line stays
verbatim. The voice gate (no defensive negation) stays.

**Two new pages.** *Peptides 101*: what a peptide is, the four we prescribe,
what each is for, in the excited-expert voice. *Your blood, explained*: the
three jobs above, the panel per peptide with a reason per marker, what a
draw is like, how results come back.

**Every line in a deck.** The copy deck grows from the home page to every
page: job, feeling, fact. No line ships outside a deck.

---

## Part 4. Bundles, stacks and pricing architecture

Prices are Chiya's. The structure is proposed here so the copy and the
checkout can be designed around it.

- **A plan is always three things:** the peptide, its panel (baseline and
  week 12), and the doctor. One number a month covers all three. This is
  the offer, and the copy says it everywhere the price appears.
- **Plan lengths:** 1 month (flexible), 3 months (the twelve-week arc, the
  one we recommend, since the retest lands at its end), 12 months (best
  price). The 3-month plan is the default selection because it matches the
  medicine.
- **Bundles (two peptides that belong together):** Weight + Strength
  (GLP-1 + tesamorelin, for people losing weight who want to keep muscle),
  and Strength + Desire (tesamorelin + PT-141). Each bundle shares one
  panel, so the bundle price is less than two plans. Bundles need the
  physicians' agreement that the combination is one they prescribe.
- **Add-ons:** the full panel for people who want the whole picture; an
  extra retest.
- **Stacks:** the retired catalog stacks (Wolverine, Glow, Ascend, Lucidity)
  stay retired until there is a peptide behind them that can be prescribed.

---

## Part 5. The funnel and the checkout

- **One door, three entrances.** Every page funnels to the plan page; the
  plan page funnels to Start. Goal chips and goal cards pre-select the
  goal; peptide pages pre-select the plan.
- **Before the card:** a plain "What you pay today and what happens next"
  block: the amount now, the questionnaire, the lab, the doctor's decision,
  the refund terms in one sentence, delivery timing.
- **After the card:** the What happens next page becomes the real
  post-checkout page, with the timeline and the lab instructions.
- **Email and SMS:** seven messages matching steps 4 to 10, in the same
  voice, within the A2P rules already asserted by the audit.

---

## Part 6. Execution order (one by one, each gated)

Status, 2026-09-02 late: steps 1, 2 and 3 are live on the preview. Step 1:
the model as data and the number 99 retired sitewide. Step 2: the bloodwork
page rebuilt around the one full panel with every marker's reason, and
Peptides 101 published and linked from the nav, the footer and the home
page. Step 3: every product page carries the per-peptide "why your blood is
part of it" section. Next: the home page and goal pages around the arrive,
understand, choose journey (step 4), then bundles and pricing once Chiya's
numbers are in (step 5).

**2026-09-03: step 4 is live on the preview.** The three goal pages
(/goals/metabolic, /goals/growth, /goals/sexual-health) are rebuilt to the
arrive, understand, choose structure with the twelve-week timeline, the
derived marker list and the doctor's screens; every line is in
docs/COPY-DECK.md. The nav links only live goals. Next: step 5, bundles
and the pricing page, which waits on Chiya's numbers; meanwhile step 6's
pre-checkout block and step 7's page decks can start.

**2026-09-03, night pass.** Step 6's pre-checkout block is live on /cart
and /checkout (`PayToday`), /what-happens-next is rewritten, and every
billing line that contradicted the truth ("never charged before approval",
"no card collected today", "Total if prescribed") is gone. Step 7's voice
pass ran across FAQ (rewritten from data), About, Physicians, How it
works, Pricing, Assessment, Cart, Checkout, Contact, Community, Booking,
Gift, Protocols and the shared components: zero em dashes rendered on any
marketing route, "doctor" in prose, no defensive negation, no
fabricated-looking figures (TrustStatsStrip placeholders, the "one patient
trajectory", the sample biomarker index). The lab partner question is
answered in docs/LAB-PARTNER.md and the site describes the draw without
naming a network. Still open: step 5 (Chiya's prices), the seven emails,
journal article bodies, and the OPEN claims list in docs/COPY-DECK.md.

**2026-09-03, later.** Copy system v4 (the brand voice, after a study of
Ro, Henry, Eden, Healthspan and Mochi) is live on nexphoria.com. The full
19-product menu and all seven protocols are on the preview, with five
new goal pages and a "find your treatment" grid; see COPY-DECK.md, "The
full menu". Whether the full menu goes to the .com is Chiya's call: the
four-SKU set was chosen on 2026-08-12 for the LegitScript application,
and fifteen of the nineteen have no FDA-approved active.


1. **Decisions 1 to 3 from Chiya, and the physicians' sign-off on the
   panels.** Meanwhile: the panel model is written as data
   (`client/src/data/monitoring.ts`) so every page reads it from one place.
   The number 99 is retired sitewide in favour of "your panel".
2. **Your blood, explained** (rewrite of /bloodwork) and **Peptides 101**
   (new). The teaching pages first, because every selling page links to them.
3. **The peptide pages** rebuilt to the seven-part structure, with the
   per-peptide panel and the twelve-week timeline.
4. **The home page and goal pages** rebuilt around the journey: arrive,
   understand, choose.
5. **Bundles and the pricing page**, once Chiya's numbers are in.
6. **Pre-checkout block, post-checkout page, and the seven emails.**
7. **FAQ, about, physicians, footer, and the copy decks for every page.**
8. **Gates, screenshots, preview, go-live** with Chiya's word.

Each step ends with a preview link and a shrinking punch list.

---

## Part 7. What only Chiya can decide

1. Baseline before the first dose: yes (recommended) or start first.
2. The retest: week 12, included (recommended), or another cadence.
3. Panels: per peptide (recommended) or one full panel for all.
4. What is paid at checkout, and what the refund is if the doctor declines.
5. The bundle set and every price.
6. Who signs off the panels on the medical side (MDI), and when.

The physicians' sign-off is the one thing that cannot be worked around:
until it lands, the site describes the panels as typical and says the
doctor sets yours.
