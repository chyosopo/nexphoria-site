# VOICE v5 — the power register

Chiya, 2026-09-05: *"Focus only on the voice, the tone and the copy. Rewrite
everything from scratch. Pull all those competitors we spoke about and others,
understand their voice and their copy, and adapt to us. I like using power
words."*

This supersedes VOICE v3 and v4. It was written from copy pulled off the live
competitor sites on 2026-09-05, not from memory.

---

## 1 · What the field actually sounds like

Pulled from the live pages (`curl`, then headings and body extracted).

**Enhanced** — the voice Chiya keeps pointing at.
> Find out what you're actually capable of.
> SHOW UP. EVERY DAY. · DON'T SLOW DOWN. · BLOOD FLOW. ENERGY. DRIVE.
> LOSE THE WEIGHT. · BUILT AROUND YOUR BASELINE. · Know what you're after?
> Built to Thor's Standard. Matched to your biology.
> Two daily formulas, no script. Stronger for output and recovery; Longer for how you age.
> Clinician-prescribed peptides from licensed US pharmacies. Lab-monitored.
> Energy, recovery, and resilience as you age.

**Maximus**
> Reduce fat. Recover faster. Rejuvenate naturally.
> Next-generation testosterone optimization.
> Lose weight. Curb cravings. Boost metabolism.
> Precision Testing for Peak Performance.
> The leading edge of personal performance medicine — treating people, not averages.

**Fountain Life**
> Live longer, live healthier. · Detect. Prevent. Reverse.

**Noom**
> Meds to lose the weight. Noom to keep it off.

**Ro** — plain and specific, no adjectives:
> Works in 15 minutes, lasts for 36 hours. · Works continuously, no planning required.

**Eden / Transcend / Blokes** — the weak end, and worth naming so we never
drift there: category labels instead of sentences ("Hormones & Intimacy",
"Popular Products"), hedged mush ("Programs vary by individual and are subject
to review and eligibility"), and defensive negation as a headline ("Not just
another telemedicine company", "No hidden fees, ever"). We do none of that.

## 2 · What they share, mechanically

1. **The period is the tool.** Where a weaker writer puts a comma and a
   subordinate clause, they end the sentence and start another. "Built to
   Thor's Standard. Matched to your biology." Two facts, full weight each.
2. **The triad.** Three beats, verb-first: *Reduce fat. Recover faster.
   Rejuvenate naturally.* / *Detect. Prevent. Reverse.* / *Blood flow. Energy.
   Drive.*
3. **The power word leads.** The first word of the sentence is the thing the
   reader wants — stronger, leaner, sharper, capable, peak — never the process
   that delivers it.
4. **Capability, not treatment.** "Find out what you're actually capable of",
   not "our clinicians will assess your eligibility."
5. **The compound qualifier.** *Clinician-prescribed. Lab-monitored.
   Physician-reviewed.* One hyphenated word does the work of a clause.
6. **The parallel.** "Meds to lose the weight. Noom to keep it off." Same
   shape twice, second half turns.

## 3 · The Nexphoria register

Take 1–6. Keep every guardrail below. Our differentiator is not vibe, it is
the blood panel: **the dose comes from your blood.** That fact carries the
second beat of most lines.

**Write like this**
- Power word first, in a sentence that ends early.
- Two short sentences over one long one. Kill every comma that is holding up
  a subordinate clause.
- Triads where three things are genuinely true.
- Compound qualifiers: *Clinician-prescribed. Blood-dosed. Compounded to order.*
- Second person. "Your blood," "your baseline," "what you're after."
- Numbers as facts, never as pressure.

**The lexicon** (use these; they are the goal named)
> stronger · leaner · sharper · rested · capable · drive · output · recovery ·
> resilience · baseline · peak · precision · repair · steady · clear · lift ·
> hold · build · shed · restore · measured · matched · dosed · monitored

**Never**
- Urgency, scarcity, countdowns, discounts, "free", "save N%", "most popular".
- Comparison to a named competitor, or to "other clinics".
- **Defensive negation.** No "we don't", "never an algorithm", "not just
  another", "no hidden fees". A premium house states what it *is*. (This is
  the one place we refuse to copy Enhanced and Blokes — "Our athletes aren't
  endorsers" and "Not just another telemedicine company" are both this move.)
- A goal stated as a guarantee. Results are what studies found or what a goal
  is, never what will happen to the reader.
- Hype punctuation. No exclamation marks.

**Always**
- "if appropriate" / "if prescribed" wherever a medicine is named beside a
  price or an outcome.
- The FDA and compounding disclosures, verbatim, untouched by this register.
- The hedge gets **its own short sentence.** Never a subordinate clause
  hanging off a promise — that is what made v4 limp:
  > v4: "Stronger, sharper and better rested, with the dose set from your blood."
  > v5: "Stronger, sharper, better rested. Prescribed to your blood."

## 4 · The rewrite rule of thumb

Read the line aloud. If you run out of breath before the first period, it is
a v4 line. Cut it at the comma and make the second half stand up.

---

*Enforced by `npm run audit:voice` against the prerendered HTML. Exemptions
are literal strings with a stated clinical, FDA or A2P reason — never
patterns.*
