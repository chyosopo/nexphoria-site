# The house voice, v3: the flowing register (Chiya, 2026-09-05)

Chiya, 2026-09-05, on the staccato labels that v2 produced ("QUESTIONS.
PHYSICIAN. FIRST DOSE."): "stupid". What she wants instead is copy that
FLOWS the way maximustribe.com, hims.com, alyvewellness.com, alyverx.com
and enhanced.com flow: confident, second person, full sentences with
momentum, framed around the new era of peptide medicine. The performance
words she liked (stronger, sharper, leaner, rested, harder) stay, as the
reader's goals.

v3 replaces the v2 "enhanced register" (short, declarative, stopped, in
caps) for DISPLAY copy. Body copy stays plain and factual. The legal and
safety clauses are untouched. The guardrails at the bottom are the same
guardrails as v2, verbatim.

## The benchmark, measured (2026-09-05)

Each homepage was fetched with curl, its stylesheets and images localised,
scripts stripped, and rendered offline in Chromium at 1440 and 390. Text
is `document.body.innerText`; dumps and screenshots are in the session
scratchpad under `voice/<site>/`. hims.com sits behind a Cloudflare
challenge ("Just a moment...", 403 to curl and to a fetch proxy alike), so
it is unmeasured here and is not quoted.

| | maximustribe.com | enhanced.com | alyvewellness.com | alyverx.com |
|---|---|---|---|---|
| Hero H1 | "Maximum" | "FIND OUT WHAT YOU'RE ACTUALLY CAPABLE OF" | (H1 rotates "Personalised vitamins made for your [energy/sleep/beauty/focus/calm]", injected by script; the offline render shows the subhead) | "Weight loss built for your health" |
| Hero sub | "The leading edge of personal performance medicine – treating people, not averages." | "PRESCRIPTION AND SUPPLEMENTS. SEE WHAT YOU'RE ACTUALLY CAPABLE OF." | "UK's highest-rated personalised vitamins. No more guesswork. No more handfuls of pills. Just one formula, made for you." | "We create personalized weight loss plans to help you feel your best — powered by PermeAct™ Delivery Tech for better absorption and more consistent results." |
| Hero CTA | "Get started →" | "Buy Now" | "Start Quiz" | "Get started" |
| Section 1 | "Next-generation testosterone optimization." / "It's not just hormones – it's the science of unlocking human potential." | "DON'T SLOW DOWN." / "Energy, recovery, and resilience as you age." | "How it works" / "1. Take your quiz — Tell us about you, your health goals. It only takes a few mins." | "It's much easier than you think" / "Take our assessment — Share your health history, lifestyle, and goals so we can better understand you" |
| Section 2 | "Lose weight. Curb cravings. Boost metabolism." / "GLP-1 and GIP weight loss guided by science, grounded in care." | "BUILT AROUND YOUR BASELINE." / "Testosterone, clinician-guided and lab-monitored." | "Vitamins as unique as you" / "Finally a vitamin made for you and your health goals." | "Healthcare that feels human, not clinical" / "Clinically proven treatments, safely prescribed" |
| Section 3 | "The new way to sleep better and reduce stress." / "Our patent-pending Oxytocin Calming Cream delivers all-day calm and all-night rest." | "KNOW WHAT YOU'RE AFTER?" / "Clinician-prescribed peptides from licensed US pharmacies. Lab-monitored." | "Why ALYVE" / "Personalised to you — Uniquely formulated to you, your health goals and needs." | "Make today life changing" / "Losing even 10% of body weight may support heart health, boost energy, and improve sleep quality." |
| Sentence length (mean / median words, sentences of 3+ words) | 7.8 / 5 | 6.1 / 4 | 7.9 / 6 | 11.0 / 6 |
| Rhythm | Serif headlines as one flowing sentence or three short verbs; subheads one sentence with a dash | Caps fragments, two to four words, stopped; one plain sentence under each | Everyday sentences, contractions, "a few mins"; numbered verb steps | Longer sentences, em-dashes, one benefit clause per line |
| Reader | you/your 26 times vs we/our 18 | you/your 10 vs we/our 4 | you/your 21 vs we/our 9 | you/your 27 vs we/our 15 |
| The doctor | "doctors" 5, "doctor" 3, "physician(s)" 3, "care team" 1; "Designed by leading doctors" | "clinician" only (3): "clinician-guided", "clinician-prescribed" | "nutritionist(s)" 8, "doctors" 1 | "provider(s)" 2, "clinicians" 1, "physicians" 1 |
| Price | "Starting at $249.99 →", "$149.99", "$199.99", "$99.99"; "No membership fee" | none on the home | "for less than £1/day", "From £1 a day, we're 70% less than…" | "Starting at $283/mo monthly" on every product card |
| Sections | 11 blocks (no `<section>` tags; 7 children of main) | 11 blocks (no `<section>` tags; 43 children) | 10 `<section>` | 12 `<section>` |
| Rendered height 1440 / 390 | 8,687 / 10,021 px | 7,425 / 7,941 px | 10,752 / 11,906 px | 10,988 / 12,452 px |

What the four have in common, and what v3 takes: the reader is "you" two
to three times as often as the house is "we"; a headline is one sentence
about what the reader wants (or, at Enhanced, a caps fragment that names
it); the subhead says how it happens in one sentence; the button is a
verb and an object; the doctor is named as a fact, once per section, in
one word (clinician, doctor, physician, provider); the price sits beside
the product as "Starting at $X/mo" and nowhere else. What v3 leaves
behind is documented per site in docs/MAXIMUS-STUDY.md,
docs/ALYVE-STUDY.md and docs/ALYVERX-STUDY.md: ratings, counts, "As seen
in", discounts, guarantees, "No more…", "unlike…", before-and-afters.

## The register

1. **A headline is one confident sentence in second person about the
   reader's goal.** Six to twelve words, sentence case, a full stop. It
   reads as something a confident company would say out loud, never as a
   label on a drawer.
   - "Lose the weight and keep the muscle you trained for."
   - "Answer a few questions, and a physician takes it from there."
   - "Everything a month needs arrives in one box."
   - Out: "QUESTIONS. PHYSICIAN. FIRST DOSE." / "One box. Everything in
     it." / "The blood." (labels, however heavy the type).
2. **A subhead says how it happens, in one sentence.** The physician, the
   blood work, the compounding, in whatever order the section needs.
   - "A licensed U.S. physician reads your answers, prescribes if it is
     appropriate, and a licensed U.S. pharmacy compounds it to order."
   - "The medicine ships cold once a month, and the blood kit comes with
     your first order."
3. **Body is two or three plain sentences.** Facts, in the order the
   reader meets them. Everyday words ("a few minutes", "your blood",
   "the box"). One idea per sentence; a comma and "and" is the house
   join, the semicolon is rare, the em-dash is out.
4. **A button is a verb and an object.** "Shop the medicines." "See how
   it works." "See every step." "Choose a plan." "Ask us." Never a
   fragment ("Learn more"), never a promise ("Start my transformation").
5. **Second person, present tense, active.** "Your blood work sets the
   dose." "You answer the questions at checkout." The house is "we" only
   where a fact needs an owner ("We ship to all 50 states").
6. **Performance words name the reader's goal:** stronger, sharper,
   leaner, rested, harder, faster, deeper. They sit in the headline as
   what the reader is after; they are never a promised result. "Stay
   sharper and steadier when the pressure does not let up" names a goal;
   "you will be sharper in two weeks" is a claim and is out.
7. **The doctor is "a licensed U.S. physician" the first time in a
   section and "the physician" after.** Never "our doctors", never
   "clinician-guided" as a hyphenated badge.
8. **Momentum comes from the sentence, not from the type.** No ALL-CAPS
   labels anywhere. The `.nx-shout` class (uppercase, heavy, tight) may
   stay on the hero H1 only, and only while the H1 is a real sentence;
   every other heading is sentence case in the house sans.
9. **One headline says one thing.** Two ideas are two sentences in the
   subhead, never a stacked pair of fragments in the headline.

## The "new era" framing (reusable)

Peptides are your body's own signals: short chains of amino acids it
already makes to say release growth hormone tonight, you have eaten
enough, repair this tendon. For a long time they were research chemicals.
Now a licensed U.S. physician can prescribe the exact one that fits your
goal, a licensed U.S. pharmacy compounds it to order, and your own blood
work sets the dose before the first one and again at week twelve. The
goal is yours (stronger, sharper, leaner, rested); the decision is the
physician's.

Use it whole as the explainer paragraph, or take one sentence of it as a
subhead. Every clause in it is true of the service as built: the catalog
is by goal, the physician decides, the pharmacy is a 503A, the panel is
drawn twice.

## The guardrails (unchanged)

- A goal is a goal, not a guarantee. "Lose the weight" names the goal of a
  GLP-1; "you will lose 20 lb" is a claim and is out.
- "Prescribed, if appropriate" and "if prescribed" stay wherever they are.
- The FDA and compounding disclosures stay verbatim.
- No urgency, no discounts, no counts, no "free" (audit:voice still runs).
- No comparison with other companies.

The gate that checks it is `scripts/audit-voice.ts`, run against the
prerendered HTML. Its patterns must never trip; in practice that means
the copy never says "we don't" / "we never" / "we do not", never "not a
…" (outside the six documented clinical and legal exemptions), never "no
hidden", never "unlike other", never "the figure", never "free", and
never a badge ("Best value", "Most popular", "Ready when you are").
Exemptions are literal strings with a stated reason, never patterns.

## Before → after (the home, v2 → v3)

| Where | v2 (2026-09-05 morning) | v3 |
|---|---|---|
| Hero H1 | STRONGER. SHARPER. RESTED. | Stronger, sharper and better rested, with the dose set from your blood. |
| Hero line | Prescribed for your [sleep]. | Prescribed for your [sleep]. (kept) |
| Hero sub | Prescription peptides. A licensed U.S. physician. The dose set from your blood work. | A licensed U.S. physician reads your answers, prescribes if it is appropriate, and a licensed U.S. pharmacy compounds it to order. |
| Hero CTA | Shop the medicines / How it works | Shop the medicines / See how it works |
| Tile: weight | LOSE THE WEIGHT. KEEP THE MUSCLE. | Lose the weight and keep the muscle you trained for. |
| Tile: body | BUILD LEAN MASS. | Build lean mass and lose the deep fat that diet alone has not shifted. |
| Tile: sexual | BLOOD FLOW. DESIRE. DRIVE. | Bring back the desire, the blood flow and the drive, on the days you choose. |
| Tile: hormones | BUILT AROUND YOUR BASELINE. | Support your testosterone from your own baseline, read from your blood. |
| Tile: longevity | DON'T SLOW DOWN. | Keep your energy and your recovery as the years add up. |
| Tile: sleep | SLEEP DEEP. | Fall asleep sooner, sleep deeper and wake up rested. |
| Tile: cognition | SHARPER. STEADIER. | Stay sharper and steadier when the pressure does not let up. |
| Tile: recovery | REPAIR. RECOVER. GO AGAIN. | Repair the tendon, the joint or the gut, and get back to training. |
| Tile: skin | FIRMER SKIN. | Firm the skin and speed the healing that has slowed with age. |
| How it works | QUESTIONS. PHYSICIAN. FIRST DOSE. | Answer a few questions, and a physician takes it from there. |
| Steps | ANSWER THE QUESTIONS. / A PHYSICIAN DECIDES. / THE BOX ARRIVES. | Answer the health questions. / A licensed physician reads them and decides. / The box arrives cold, with your blood kit. |
| Explainer | THE BODY'S OWN SIGNALS. PRESCRIBED. | Peptides are your body's own signals, prescribed one at a time. |
| Frames | A signal you already make. / The exact one, prescribed. / The blood shows it. | You already make the signal. / A physician prescribes the one that fits your goal. / Your blood work shows what changed. |
| By goal | KNOW WHAT YOU'RE AFTER? | Start with what you want to change. |
| Protocol band | PRESCRIBED TOGETHER. | Prescribed together, so each medicine does its own job. |
| Menu | EVERY MEDICINE. ITS PRICE. | Every medicine a physician can prescribe here, with its price. |
| Arrives | ONE BOX. EVERYTHING IN IT. | Everything a month needs arrives in one box. |
| Blood | THE DOSE IS SET FROM BLOOD. | Your blood work sets the dose before you take the first one. (docs/COPY-V3.md) |
| Price | ONE NUMBER A MONTH. | One monthly price covers the medicine, the physician and the blood work. (docs/COPY-V3.md) |
| Closer | KNOW WHAT YOU'RE AFTER? | Start with what you want to change. (docs/COPY-V3.md) |
| Catalog H1 | KNOW WHAT YOU'RE AFTER? | Start with what you want to change. (docs/COPY-V3.md) |

The five files another agent is restructuring (FrontDoor, SoloPDP,
PeptidesCatalog, StackPage, ProtocolsIndex) are not edited here; their
exact old → new strings are in docs/COPY-V3.md for the lead to apply.
