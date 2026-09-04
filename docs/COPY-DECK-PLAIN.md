# The plain deck (2026-09-04, Chiya)

The copy of record for every page. Chiya, 2026-09-04: "We present an amazing
product, we give you the information, we teach you what it is good for, what it
can treat and where it helps. We are not trying to sell you or change your mind."
She approved this voice and the protocol names from the full-site read
(https://claude.ai/code/artifact/096b70af-5685-4744-bd2e-7c2a187fc709).

Every string below is the string. Where a page needs a line the deck does not
give, write it to the rules and list it in your report so it can be checked.

## Rules

1. State, do not persuade. What it is, what it is for, how it works, how you
   take it, what to expect, what it costs, what is checked, who prescribes it.
   No reassurance, no steering ("the most common choice"), no closers that nudge.
2. Ordinary words. "Price", never "figure". "Blood test", never "panel on both
   sides". "Steps", never "loop", "engine", "road", "route", "anchor".
   "Included", never "free".
3. Every fact once per page. The physician, the pharmacy and cold shipping are
   stated in the hero micro line or the "who is involved" block and nowhere else
   on that page. The announcement bar and the trust bar are removed sitewide.
4. Nothing about the market. No comparison table, no "most platforms", no
   "the rest of the market", no question we planted in order to answer it.
5. Complete sentences. No three-word chants, no fragments as headings, no
   "Asked plainly, answered plainly", no "Ready when you are".
6. Only what is true. No dashboard, no audit, no certificates, no messaging,
   no founders, no specialties, no "third-party tested" until Chiya confirms.
7. One set of numbers. Five steps. 24 markers. An at-home kit. Week 12. One
   physician group, one telehealth platform, one pharmacy, named the same way
   everywhere (below).
8. Plain names. Category names match the tiles. Protocols are named by what
   they treat.
9. No em dashes anywhere. No exclamation marks.
10. Tokens only: no new inline hex, fontSize, radius, shadow, transition or
    letterSpacing literals (audit:design must not regress). Legal and FDA
    wording is verbatim and untouched.

## The facts (say them this way, everywhere)

- Nexphoria operates the service and does not make clinical decisions.
- Telehealth platform: Bask Health.
- Physicians: independent, U.S.-licensed physicians of Arora Health &
  Aesthetics, LLC (the compliance.ts PROVIDER_INFO block is verbatim; use it).
- Pharmacy: VialsRX, a state-licensed 503A compounding pharmacy in Houston,
  Texas (PHARMACY_INFO block verbatim).
- Laboratory: a CLIA-certified laboratory. (Partner unnamed until signed.)
- Blood testing: an at-home kit of 24 markers ships with the first order, drawn
  before the first dose; the same 24 markers again at week 12 on terms of three
  months and longer; a six-month test on six- and twelve-month terms; a test each
  quarter on twelve-month terms. $149 on its own, $99 for a further test on a plan.
- Price: one monthly price, paid up front for a term of one, three, six or twelve
  months. Three months is 10% less per month, six 15%, twelve 20%. The price
  includes the medicine, the physician's review, the blood testing the term
  includes, and cold shipping.
- Health questions take a few minutes. A physician decides within a few business
  days. If the physician does not prescribe, nothing is made and the refund
  policy sets out what is refunded.
- Shipping: cold, in plain packaging, to all 50 states. Compounded GLP-1
  medicines are restricted by law in some states; the health questions check.
- Pending medicines: awaiting an FDA decision on compounding. Shown with their
  price and the notice; the only action is an email when available.

## The five steps (the only step list on the site)

1. **Choose.** A medicine or a protocol, and a term of one, three, six or twelve months.
2. **Health questions.** Your health history, current medicines and goals, at checkout. A few minutes.
3. **A physician decides.** A licensed U.S. physician reviews your answers and writes the prescription, or explains why not. If not, nothing is made and the refund policy applies.
4. **Blood kit, then first dose.** Your medicine ships cold with an at-home blood kit. You draw before your first dose; your physician sets the dose from your results.
5. **Week 12.** The same blood test again. Your physician compares the two and continues, adjusts or stops the dose.

Cart and checkout progress strip uses the same five words: Choose · Health
questions · Physician decision · Blood kit and first dose · Week 12.
The SpineStrip (Land · Choose · Understand · Buy · After) is removed from every
page; it was navigation vocabulary shown to the reader.

## Category vocabulary (filters, tiles, goal pages, all the same)

Weight loss · Body composition · Recovery · Skin and ageing · Energy and healthy
ageing · Focus and mood · Sleep · Sexual health · Hormones.
("Sexual desire" becomes "Sexual health". The catalog filter names Growth,
Cognitive, Skin & Longevity, Metabolic, Sexual Health, Hormone are replaced by
these.)

## Protocol names (slugs unchanged)

| slug | name | one line |
|---|---|---|
| recover | Recovery protocol | Ipamorelin / CJC-1295, BPC-157 and TB-500. For injury and recovery from training. |
| ascend | Longevity protocol | MOTS-c, NAD+, GHK-Cu and epitalon. For energy, metabolism and skin with age. |
| lucidity | Focus and sleep protocol | Semax, Selank and DSIP. For focus by day, a steadier mood under stress, and deep sleep. |
| ignite | Weight protocol | Tirzepatide with Ipamorelin / CJC-1295. For weight loss while keeping muscle. |
| vitality | Sexual health protocol | PT-141, oxytocin and tadalafil. For desire, closeness and erectile function, taken as needed. |
| foundation | Testosterone protocol | Testosterone cypionate with kisspeptin. For low testosterone, keeping your own production working. |

"The Full Stack" band and record are removed from the index. The chant
("Repair · Rebound · Return" and its siblings) is removed. Timelines: plain
facts ("Week 1: first doses." / "Week 12: blood test; IGF-1 and inflammation
markers are read first.").

## Tile line for every medicine (`outcome` in soloCatalog)

Pattern: "For [what it treats]. [Route], [frequency]." Nothing else.

- Sermorelin: For body composition. Raises your own growth hormone release. One injection at night.
- Ipamorelin: For body composition. A selective growth hormone releasing peptide. One injection at night.
- CJC-1295: For body composition. A longer-acting growth hormone releasing peptide. One injection at night.
- Ipamorelin / CJC-1295 Blend: For body composition. Two growth hormone releasing peptides in one vial. One injection at night.
- Tesamorelin: For abdominal fat and lean mass. Raises your own growth hormone release. One injection a day.
- Selank: For a steadier mood under stress. A nasal spray, twice a day.
- Semax: For focus and mental stamina. A nasal spray, once a day.
- (the two remaining cognitive entries at soloCatalog lines ~217 and ~227): same pattern; name the route and frequency the record gives.
- BPC-157: For tendon, muscle, joint and gut-lining repair. One injection a day.
- TB-500: For recovery from injury and training. Two injections a week.
- BPC-157 + TB-500: BPC-157 and TB-500 together, for injury and recovery. One plan.
- GHK-Cu: For skin firmness and collagen. One injection a day.
- Epitalon: For healthy ageing. A 20-day course of injections, a few times a year.
- NAD+: For cellular energy. Three injections a week.
- MOTS-c: For metabolism and exercise capacity. Two injections a week.
- Semaglutide: For weight loss. A GLP-1 medicine, one injection a week.
- Tirzepatide: For weight loss. A GLP-1 and GIP medicine, one injection a week.
- DSIP: For deep sleep. One injection at bedtime.
- PT-141: For sexual desire, in men and women. One injection, taken as needed.
- Thymosin Alpha-1: For immune support. Injections a few times a week.
- AOD-9604: For fat metabolism, alongside a weight plan. One injection a day.
- Oxytocin Nasal: For closeness and arousal. A nasal spray, taken as needed.
- Tadalafil Nasal: For erectile function. A nasal spray, 20 to 30 minutes before.
- Testosterone Cypionate: For low testosterone in men. One injection a week, dosed from blood work.
- Kisspeptin: Supports your own testosterone production. Prescribed with testosterone.

Tile labels: "Feel it by" becomes "Typical onset". "Full effect" stays.
BPC-157 feelBy: "Gut symptoms within days; tissue in 1 to 2 weeks". The combo:
"Gut symptoms within days; tissue in 1 to 3 weeks". Status pill: "Not yet
available" / "Under review". Button: "Read more".
`mechanism` paragraphs are already plain; keep them. `timeline` entries:
"Week 1: your first dose." style, no slogans.

## Home

- Kicker: Prescription peptide therapy
- H1: Prescription peptide therapy, with a physician and your blood work.
- Sub: Twenty-two compounded peptide medicines for weight, body composition, recovery, sleep, focus, hormones and sexual health. A licensed U.S. physician reviews your health history, prescribes if it is appropriate, and adjusts your dose from a blood test at week 12. One monthly price covers the medicine, the physician and the blood work.
- CTAs: Choose a goal · How it works
- Micro line (the only place these three facts appear on the home): Prescribed by licensed U.S. physicians. Compounded in a licensed U.S. pharmacy. Shipped cold to all 50 states.
- Goal chips under the hero: Weight loss · Body composition · Sexual health · Hormones
- Goals section: kicker "Goals" · H2 "What are you treating?" · body "Each goal lists the medicines a physician can prescribe for it, what each does, and what to expect." · goal card button "Read more" · chip row label "Or begin the health questions with"
- Menu: kicker "The medicines" · H2 "All twenty-two, with what each is for and its price." · link "The complete list"
- Steps: kicker "How it works" · H2 "Five steps." · the five steps above · line under: "If the physician does not prescribe, nothing is made and the refund policy sets out what is refunded." · link "Every step in detail"
- Blood: kicker "Blood testing" · H2 "A blood test before you start, and again at week 12." · lines: "The kit ships with your first order. 24 markers, drawn at home, included." / "Your physician sets your dose from the results." / "At week 12 the same 24 markers are tested again and compared." · link "Every marker, and the additional tests"
- Price: kicker "Price" · H2 "What it costs." · body "One monthly price, paid up front for a term of one, three, six or twelve months. It includes the medicine, the physician's review, the blood kit, the week-12 test and cold shipping. Longer terms cost less per month." · link "Every medicine, with its price" · note "Monthly prices. Three months is 10% less per month, six 15%, twelve 20%."
- Questions: kicker "Questions" · H2 "Common questions." Replace "Is this legitimate?" with "Who prescribes it, and who makes it?" → "Prescriptions are written by independent, U.S.-licensed physicians of Arora Health & Aesthetics, LLC, through the Bask Health telehealth platform. Medicines are compounded by VialsRX, a state-licensed 503A pharmacy in Houston, Texas. Both are listed with their addresses on the FAQ page." Fix "free" in "Is bloodwork required?" ("An at-home blood kit of 24 markers ships with your first order, included."). "How is it billed?" → the price fact above.
- Closer: H2 "Start with the goal you are treating." · CTA "Choose a goal"

## Catalog (/peptides)

- Kicker "The medicines" · H1 "Twenty-two prescription peptides." · Sub "Each with what it is for, how it works, how you take it, and what it costs. Prescribed by licensed U.S. physicians and compounded in a licensed U.S. pharmacy."
- Remove the marker chip row and "22 medications · prescribed online" badge.
- Filters and group headings in the category vocabulary. Group lines: "Weight loss: appetite and weight." etc, one plain phrase each.
- Closer: H2 "The next step is a physician." · body "A few health questions, read by a licensed U.S. physician, who prescribes the medicine that fits or explains why not." · CTA "Begin the health questions"

## Goal pages (Category.tsx COPY)

- `what.title` per goal: "How GLP-1 medicines work." / "How tesamorelin works." / "How BPC-157 and TB-500 work." / "How GHK-Cu and epitalon work." / "How Semax and Selank work." / "How DSIP works." / "How NAD+, MOTS-c and epitalon work." / "How PT-141, tadalafil and oxytocin work." / "How testosterone therapy works, and why blood work comes first."
- `choose.title`: "Which one is prescribed?" Remove steering sentences: "and it is the most common choice" → delete; "many people are prescribed the pair" → "Many patients are prescribed both."
- Options section: kicker "Medicines" · H2 "The medicines for this goal."
- Weeks: every "free" removed ("Your baseline blood kit arrives with your first order, included.").
- "Go deeper, if you want to" → "Additional tests". "Learn more." (journal) → "Further reading."
- Questions heading "Common questions." Closer as already rewritten.
- Body paragraphs are already in the voice; keep them.

## Product page (SoloPDP) and protocol page (StackPage): one structure

1. Hero: name, category, tile line, mechanism paragraph, "Good for", "What it does", "How you take it", onset / full effect / evidence, "Often prescribed with" (was "Stacks well with").
2. Buy box: term ladder as it is; included list; "Pending" notice as it is.
3. "What to expect" (the timeline; heading is exactly that, not "on a calendar").
4. "Blood testing for this medicine": what the physician reads first; the additional tests.
5. "Who should not take it": the contraindications, once.
6. "Regulatory status": verbatim block as it is.
7. "Who prescribes it, and who makes it": PROVIDER_INFO and PHARMACY_INFO once.
8. "Common questions" (PdpFaq).
9. "Other medicines" tiles (line under heading: "Each comes with the same physician review and the same blood testing.").
10. Closer: "The next step is a physician."

Removed: "What comes with it" cards, "Included in your monthly price" (the buy
box already lists it), "More than the medication", "Safety first: is it right
for you?" (duplicate of 5), PhysicianProofBand ("The Nexphoria clinical
standard"), "The complete route" band (replace with one line under the hero:
"Also prescribed in the Recovery protocol." linking to it), "Your blood panel:
Full panel" (duplicate of 4).

PdpFaq:
- "Is {name} FDA-approved?" branches on `regulatory`. No approved active: "No. There is no FDA-approved product containing {name}. Compounded {name} is prepared by a licensed 503A pharmacy under a physician's prescription. Compounded medications are not approved or evaluated by the FDA for safety, effectiveness, or quality." Approved active: "{name} is an FDA-approved active ingredient. The compounded preparation made for you by a licensed 503A pharmacy is not itself FDA-approved, and compounded medications are not evaluated by the FDA for safety, effectiveness, or quality." For a protocol: "Are the medicines in this protocol FDA-approved?" and answer per component in one paragraph.
- "What should I expect in the first weeks?" → "Typical onset is {feelBy}, with the full effect by {fullEffect}. Everyone responds differently, which is why the week-12 blood test and a dose review are part of the plan."
- "What bloodwork is required?" → "An at-home blood kit of 24 markers ships with your first order, included. You draw before your first dose and your physician sets the dose from the results. At week 12 the same test is drawn again and compared."
- "Why can't I just add it to a cart?" → "Do I pay before the physician decides?" → "Yes. You check out first, then answer the health questions. If the physician does not prescribe, nothing is made and the refund policy sets out what is refunded."
- "How is it billed?" → "You pay for a term up front: one month, or three, six or twelve months at 10, 15 or 20% less per month. Longer terms include more blood testing. At the end of the term, renewing is your choice."
- "Do I need a prescription?" keep.

StackPage specifics: remove the chant; "Baseline panel with your first order,
optimization panel at 90 days" → "A blood test before your first dose, and the
same test at week 12." "Gift this protocol · Ask someone to cover it" → "Give
this protocol as a gift". "Explore the other protocols" → "The other protocols".

## Protocols index

- H1 "Protocols. Medicines prescribed together, on one plan." · Sub "A protocol is two to four medicines a physician prescribes together, with one blood test before you start and the same test at week 12. Prescribed by licensed U.S. physicians and compounded in a licensed U.S. pharmacy."
- Remove the three-tile band ("Chosen to work together" / "Test, start, retest" / "One figure, paid up front"), the "Made for him" badge, the Full Stack band.
- Keep "How they fit together" as it is (it is already in the voice); heading "How they fit together." sub "Each medicine in a protocol does a different job. The same rule applies if you build your own."
- "Measured, then adjusted / Every protocol answers to the panel." → kicker "Blood testing" · H2 "A blood test before you start, and again at week 12." · body "The kit ships with your first order and you draw at home before the first dose. At week 12 the same 24 markers are tested again and your physician adjusts from what changed."
- Closer: H2 "Not sure which one?" · body "The health questions ask what you are treating. A licensed physician chooses the protocol, or a single medicine if that fits better." · CTA "Begin the health questions"

## Blood testing (/labs)

Already in the voice. Changes: "24 markers. 5 systems. One clear picture." →
"24 markers across five systems."; "Read, then dosed." → "Read by your
physician."; "Vitamin D: Low in most adults, and easy to fix." → "Vitamin D:
commonly low; affects bone, mood and immunity."; the empty results table gets
one worked example row set, labelled "Example, not a patient record"; heading
"Common questions."; closer "A blood test first. Then your first dose." with the
two links as they are.

## How it works (full rewrite; ~1/3 the current length)

- H1 "How it works." · Sub "Five steps, from choosing a medicine to your week-12 blood test."
- The five steps, each with the deck paragraph plus one plain paragraph of detail (what the health questions cover; what the physician checks; what the kit contains and how it returns; what the week-12 review decides).
- "Blood testing" short section with link to /labs.
- "Who is involved": Nexphoria · Bask Health · Arora Health & Aesthetics, LLC · VialsRX · a CLIA-certified laboratory, one sentence each from The facts.
- "If the physician does not prescribe": one paragraph, refund policy link.
- "What it costs": the price fact, link to the medicines.
- Closer: "The next step is a physician."
Removed entirely: the seven rhetorical questions, "Most of this market", the
comparison table, "A prescription is a hypothesis", "the loop", the dashboard
mock, the stats row.

## About (full rewrite; ~1/4 the current length)

- H1 "About Nexphoria." · Sub "Nexphoria is a telehealth service for prescription peptide therapy. Prescriptions are written by independent, U.S.-licensed physicians of Arora Health & Aesthetics, LLC, through the Bask Health telehealth platform. Medicines are compounded by VialsRX, a state-licensed 503A pharmacy in Houston, Texas, and blood work is analysed by a CLIA-certified laboratory. Nexphoria operates the service and does not make clinical decisions."
- "What we offer": the twenty-two medicines and six protocols, the goals list, the blood testing, the price fact.
- "Who is involved": the four parties, with the verbatim provider and pharmacy blocks.
- "Where we operate": all 50 states; the GLP-1 state restriction sentence; link to state availability.
- "Contact": hello@nexphoria.com, (929) 728-2869, the contact page.
- "Common questions": keep "Is Nexphoria affiliated with Bask Health?" and "Is Nexphoria accredited or regulated?" as they are; remove the founders and "what makes Nexphoria different" questions.
Removed entirely: "The problem", the stats tiles, "Our approach", "Our
process", "Our principles", "How care is structured", specialties, "Standards",
"Why Nexphoria", the quotation, "READY?".

## What happens next

Already in the voice. Align the step words to the five steps; nothing else.

## FAQ page

- "Is Nexphoria legitimate?" → "Who is behind Nexphoria?" with the who-is-involved sentence.
- "How much does it cost?" → "saves 10%" wording → "10% less per month, six months 15%, twelve 20%".
- "How does it work?" and "Do I need bloodwork to start?": "free" → "included"; the five steps.
- "What do I pay today?" → "The whole term, up front: the monthly price times the months in the term. The health questions follow, then the physician's decision, then your medicine ships."
- Heading "Common questions."

## Shared components

- SiteLayout: AnnouncementBar and TrustBar no longer render anywhere.
- Footer: newsletter line as rewritten tonight; "Doctor-built stacks" → "Protocols"; "Why we test" → remove (duplicate of Blood testing); "Member login" → remove unless it links to the Bask portal.
- CartDrawer and Cart: RoadStrip labels → the five step words. "Included in the figure" → "Included in the price". Line type chips: Medicine · Protocol · Blood test.
- BuyBox: "The figure above is what it will cost." → "The price above is what it will cost." "Includes {panel} panel" → "Blood test at week 12 included".
- ExpectCard: "Stacks well with" → "Often prescribed with". "Feel it by" → "Typical onset".
- ExpectTimeline: "Week 0 · baseline kit" / "Week 12 · retest" → "Week 0: blood kit" / "Week 12: blood test".
- Peptides101: pass for the rules (no slogans, no "free", no market).
- genLlms.ts and seo.ts titles: no "Doctor-Curated", no "99-marker", no "three tiers (Basic/Full/Elite)"; the facts above.
