# COPY-V3: the flowing register, for the five files under restructure

Companion to docs/VOICE.md v3 (Chiya, 2026-09-05: the staccato labels were
"stupid"; the copy must flow). These five files were NOT edited because
another agent is restructuring them. Every heading, lede and button in
them is listed below as an exact old → new string for the lead to apply.
Where a class is named, the change is to drop `nx-shout` (uppercase,
heavy, tight) so the sentence renders in sentence case; the rest of the
className stays.

Rules applied (docs/VOICE.md v3): a headline is one confident sentence in
second person about the reader's goal, 6–12 words, sentence case, full
stop; a subhead says how it happens in one sentence; a button is a verb
and an object; "if appropriate" and "if prescribed" stay; nothing trips
`scripts/audit-voice.ts`.

## client/src/pages/FrontDoor.tsx

| Line | Old | New |
|---|---|---|
| 94 | `<h2 id="fd-blood" className="nx-dsh2 nx-shout" style={{ maxWidth: "20ch" }}>The dose is set from blood.</h2>` | `<h2 id="fd-blood" className="nx-dsh2" style={{ maxWidth: "24ch" }}>Your blood work sets the dose before you take the first one.</h2>` |
| 100 | `Every marker, and the additional tests` | `See every marker and the additional tests` |
| 110 | `<h2 id="fd-pricing" className="nx-dsh2 nx-shout" style={{ maxWidth: "18ch" }}>One number a month.</h2>` | `<h2 id="fd-pricing" className="nx-dsh2" style={{ maxWidth: "26ch" }}>One monthly price covers the medicine, the physician and the blood work.</h2>` |
| 112 | `Paid up front for a term of one, three, six or twelve months. Three months is 10% less per month, six 15%, twelve 20%. Each medicine shows its own price on its page, and the box above is what the price includes.` | `You pay it up front for a term of one, three, six or twelve months. Three months is 10% less per month, six 15%, twelve 20%. Each medicine shows its own price on its page, and the box above is what the price includes.` |
| 115 | `Every medicine, with its price` | `See every medicine with its price` |
| 124 | `<h2 id="fd-faq" className="nx-dsh2 nx-shout" style={{ maxWidth: "18ch" }}>Questions.</h2>` | `<h2 id="fd-faq" className="nx-dsh2" style={{ maxWidth: "24ch" }}>Here is what people ask before they start.</h2>` |
| 147 | `<h2 id="fd-closer" className="nx-shout" style={{ fontFamily: S, fontSize: "var(--nx-t-h2)", color: "var(--nx-ceramic)", maxWidth: "16ch", margin: 0, textWrap: "balance" }}>` | `<h2 id="fd-closer" style={{ fontFamily: S, fontSize: "var(--nx-t-h2)", color: "var(--nx-ceramic)", maxWidth: "20ch", margin: 0, textWrap: "balance" }}>` |
| 148 | `Know what you're after?` | `Start with what you want to change.` |
| 151 | `Every medicine, by what it treats. Prescribed by a licensed U.S. physician, if appropriate.` | `Every medicine is listed by what it treats, and a licensed U.S. physician prescribes it if appropriate.` |
| 154 | `Shop all medicines` | `Shop all medicines` (unchanged: verb + object) |

Also in the home's hero, `client/src/components/HeroTiles.tsx` (not on
either list, so not touched): line 57 keeps `nx-shout` on the H1 because
the H1 is now a real sentence (deck rule 8), but line 66 uppercases the
three goal-tile sentences: change `className="nx-tile__title nx-tile__title--low nx-shout"`
to `className="nx-tile__title nx-tile__title--low"`. And `client/src/index.css`
line 3423 sizes `h1.nx-shout` at `clamp(2.8rem, 7vw, 6rem)` with
`max-width: 11ch`, which was set for a three-word shout; a twelve-word
sentence needs roughly `clamp(2.2rem, 4.6vw, 4rem)` and `max-width: 18ch`
(the lead's call: a token change, not copy).

## client/src/pages/SoloPDP.tsx

| Line | Old | New |
|---|---|---|
| 154 | `<p className="nx-shout nx-pdp-shout" style={{ fontFamily: S }}>{GOAL_SHOUT[CATEGORY_TO_GOAL[solo.category]]}</p>` | `<p className="nx-pdp-shout" style={{ fontFamily: S }}>{GOAL_SHOUT[CATEGORY_TO_GOAL[solo.category]]}</p>` (the strings themselves now come from `data/goalTeaching.ts` as flowing sentences) |
| 170 | `Choose a plan` | `Choose a plan` (unchanged) |
| 175 | `Shop all medicines` | `Shop all medicines` (unchanged) |
| 209 | `<h2 id="solo-about-title" className="nx-dsh3 nx-shout">What it does.</h2>` | `<h2 id="solo-about-title" className="nx-dsh3">Here is what it does, and who it suits.</h2>` |
| 221 | `<h2 id="solo-get-title" className="nx-dsh3 nx-shout">What arrives.</h2>` | `<h2 id="solo-get-title" className="nx-dsh3">Here is what arrives, and how you take it.</h2>` |
| 228 | `<h2 id="solo-expect-title" className="nx-dsh3 nx-shout">The first twelve weeks.</h2>` | `<h2 id="solo-expect-title" className="nx-dsh3">Here is what the first twelve weeks look like.</h2>` |
| 238 | `<h2 id="solo-blood-title" className="nx-dsh3 nx-shout">The blood.</h2>` | `<h2 id="solo-blood-title" className="nx-dsh3">Your blood work sets the dose.</h2>` |
| 247 | `Every marker, and the additional tests` | `See every marker and the additional tests` |
| 253 | `<h2 id="solo-contra-title" className="nx-dsh3 nx-shout" style={{ scrollMarginTop: "96px" }}>Who should not take it.</h2>` | `<h2 id="solo-contra-title" className="nx-dsh3" style={{ scrollMarginTop: "96px" }}>Some people should not take it.</h2>` (the in-page anchor text on line 213, "Who should not take it", stays as the link label) |
| 272 | `<h2 id="solo-parties-title" className="nx-dsh3 nx-shout">Who prescribes. Who makes it.</h2>` | `<h2 id="solo-parties-title" className="nx-dsh3">A licensed physician prescribes it, and a licensed pharmacy makes it.</h2>` |
| 309–311 | `<h2 id="solo-crosssell-title" className="nx-dsh3 nx-shout">` … `More medicines.` | `<h2 id="solo-crosssell-title" className="nx-dsh3">` … `See the other medicines.` |
| 313 | `Each comes with the same physician review and the same blood testing.` | `Each one comes with the same physician review and the same blood testing.` |
| 325 | `<h2 id="solo-close-title" className="nx-shout" style={{ fontFamily: S, fontSize: "var(--nx-t-h2)", color: "var(--nx-ceramic)", maxWidth: "16ch", margin: 0, textWrap: "balance" }}>Prescribed, if appropriate.</h2>` | `<h2 id="solo-close-title" style={{ fontFamily: S, fontSize: "var(--nx-t-h2)", color: "var(--nx-ceramic)", maxWidth: "20ch", margin: 0, textWrap: "balance" }}>A physician decides, and prescribes if it is appropriate.</h2>` |
| 326 | `The order is placed, the health questions answered, and a licensed physician decides. If not prescribed, nothing is made.` | `You place the order and answer the health questions, and a licensed physician decides. If not prescribed, nothing is made.` |
| 327 | `See the plan and price` | `See the plan and price` (unchanged) |

## client/src/pages/PeptidesCatalog.tsx

| Line | Old | New |
|---|---|---|
| 155 | `<h1 id="peptides-hero-title" className="nx-tilehero__h1 nx-shout" style={{ fontFamily: S }}>Know what you're after?</h1>` | `<h1 id="peptides-hero-title" className="nx-tilehero__h1" style={{ fontFamily: S }}>Start with what you want to change.</h1>` |
| 157 | `Choose a goal. Every page states what the medicine treats, how it works, how it is taken, and what it costs. Prescribed by licensed U.S. physicians and compounded in a licensed U.S. pharmacy.` | `Choose a goal, and every page tells you what the medicine treats, how it works, how you take it and what it costs. A licensed U.S. physician prescribes it, and a licensed U.S. pharmacy compounds it.` |
| 216 | `Clear filters` | `Clear the filters` |
| 263 | `<h2 className="nx-dsh3 nx-shout" style={{ fontFamily: S }}>{labelFor(cat)}.</h2>` | `<h2 className="nx-dsh3" style={{ fontFamily: S }}>{labelFor(cat)}.</h2>` (a category name is a name, not a headline; it keeps its stop and loses the caps) |
| 279–281 | `<h2 id="peptides-assess-title" className="nx-shout" style={{ fontFamily: S, fontSize: "var(--nx-t-h2)", color: "var(--nx-ceramic)", maxWidth: "16ch", margin: 0 }}>` … `The next step is a physician.` | `<h2 id="peptides-assess-title" style={{ fontFamily: S, fontSize: "var(--nx-t-h2)", color: "var(--nx-ceramic)", maxWidth: "20ch", margin: 0 }}>` … `From here, a licensed physician reads your answers and decides.` |
| 283 | `A few health questions, read by a licensed U.S. physician, who prescribes the medicine that fits or explains why not.` | `You answer a few health questions at checkout, and the physician prescribes the medicine that fits or explains why not.` |
| 286 | `How it works` | `See how it works` |

## client/src/pages/StackPage.tsx

| Line | Old | New |
|---|---|---|
| 127 | `<p className="nx-shout nx-pdp-shout" style={{ fontFamily: S, marginTop: "1.2rem" }}>Prescribed together.</p>` | `<p className="nx-pdp-shout" style={{ fontFamily: S, marginTop: "1.2rem" }}>Prescribed together, so each medicine does its own job.</p>` |
| 139 | `Choose a plan` | `Choose a plan` (unchanged) |
| 164 | `<h2 id="stack-vials-title" className="nx-eyebrow" style={{ textAlign: "center" }}>What is in it</h2>` | unchanged (an eyebrow, not a headline) |
| 214 | `<h2 id="stack-get-title" className="nx-dsh3 nx-shout">What arrives.</h2>` | `<h2 id="stack-get-title" className="nx-dsh3">Here is what arrives, and at what dose.</h2>` |
| 215 | `Each is dispensed in its own vial, at its own dose. The figures follow from the stated dose and vial; the prescription states the exact volumes.` | `Each medicine is dispensed in its own vial, at its own dose. The amounts follow from the stated dose and vial, and the prescription states the exact volumes.` (also retires "figures", a near miss for the audit's "the figure" pattern) |
| 229–231 | `<h2 className="nx-dsh3 nx-shout" style={{ marginTop: "clamp(2rem,4vw,2.8rem)" }}>` … `What to expect` | `<h2 className="nx-dsh3" style={{ marginTop: "clamp(2rem,4vw,2.8rem)" }}>` … `Here is what to expect, week by week.` |
| 248–250 | `<h2 id="stack-blood-title" className="nx-dsh3 nx-shout">` … `Blood testing for this protocol` | `<h2 id="stack-blood-title" className="nx-dsh3">` … `Your blood is tested before the first dose, and again at week 12.` |
| 252 | `A panel before the first dose, and the same panel at week 12.` | `The physician compares the two panels and adjusts the dose from what changed.` |
| 262 | `Every marker, and the additional tests` | `See every marker and the additional tests` |
| 268 | `<h2 id="stack-contra-title" className="nx-dsh3 nx-shout">Who should not take it.</h2>` | `<h2 id="stack-contra-title" className="nx-dsh3">Some people should not take it.</h2>` |
| 287 | `<h2 id="stack-parties-title" className="nx-dsh3 nx-shout">Who prescribes. Who makes it.</h2>` | `<h2 id="stack-parties-title" className="nx-dsh3">A licensed physician prescribes it, and a licensed pharmacy makes it.</h2>` |
| 320–322 | `<h2 id="stack-crosssell-title" className="nx-dsh3 nx-shout">` … `The other protocols` | `<h2 id="stack-crosssell-title" className="nx-dsh3">` … `See the other protocols.` |
| 324 | `Each comes with the same physician review and the same blood testing.` | `Each one comes with the same physician review and the same blood testing.` |
| 364 | `<h2 id="stack-close-title" className="nx-shout" style={{ fontFamily: S, fontSize: "var(--nx-t-h2)", color: "var(--nx-ceramic)", maxWidth: "16ch", margin: 0, textWrap: "balance" }}>Prescribed, if appropriate.</h2>` | `<h2 id="stack-close-title" style={{ fontFamily: S, fontSize: "var(--nx-t-h2)", color: "var(--nx-ceramic)", maxWidth: "20ch", margin: 0, textWrap: "balance" }}>A physician decides, and prescribes if it is appropriate.</h2>` |
| 365 | `The order is placed, the health questions answered, and a licensed physician decides. If not prescribed, nothing is made.` | `You place the order and answer the health questions, and a licensed physician decides. If not prescribed, nothing is made.` |
| 366 | `See the plan and price` | `See the plan and price` (unchanged) |

## client/src/pages/ProtocolsIndex.tsx

| Line | Old | New |
|---|---|---|
| 96 | `<h1 id="protocols-hero-title" className="nx-tilehero__h1 nx-shout" style={{ fontFamily: S }}>Prescribed together.</h1>` | `<h1 id="protocols-hero-title" className="nx-tilehero__h1" style={{ fontFamily: S }}>Two to four medicines, prescribed together as one plan.</h1>` |
| 98 | `A protocol is two to four medicines a physician prescribes together, with one panel before the first dose and the same panel at week {RETEST_WEEK}. Prescribed by licensed U.S. physicians and compounded in a licensed U.S. pharmacy.` | `Each medicine in a protocol does a different job, and a licensed U.S. physician prescribes them together, with one blood panel before the first dose and the same panel at week {RETEST_WEEK}.` |
| 138 | `<span className="nx-tile__t nx-shout" style={{ fontFamily: S }}>{s.name}</span>` | `<span className="nx-tile__t" style={{ fontFamily: S }}>{s.name}</span>` |
| 140 | `Shop the protocol · from $X/mo` / `Shop the protocol` / `Priced at consultation` | unchanged (verb + object; a fact) |
| 152 | `title={<>How they fit together.</>}` | `title={<>Here is what pairs well, and where you pick one.</>}` |
| 153 | `lead="Each medicine in a protocol does a different job. The same rule applies if you build your own."` | `lead="Each medicine in a protocol does a different job, and the same rule applies if you build your own."` |
| 197 | `title={<>A panel before the first dose, and again at week {RETEST_WEEK}.</>}` | `title={<>Your blood is tested before the first dose, and again at week {RETEST_WEEK}.</>}` |
| 209–211 | `<h2 id="protocols-assess-title" className="nx-shout" style={{ fontFamily: S, fontSize: "var(--nx-t-h2)", color: "var(--nx-ceramic)", maxWidth: "16ch", margin: 0 }}>` … `Which one is the physician's call.` | `<h2 id="protocols-assess-title" style={{ fontFamily: S, fontSize: "var(--nx-t-h2)", color: "var(--nx-ceramic)", maxWidth: "20ch", margin: 0 }}>` … `Which protocol fits you is the physician's call.` |
| 213 | `The health questions state what is being treated. A licensed physician chooses the protocol, or a single medicine if that fits better.` | `Your health questions say what is being treated, and a licensed physician chooses the protocol, or a single medicine if that fits better.` |
| 216 | `How it works` | `See how it works` |

## After applying

Run the gates that read the rendered artifact: `npm run check`, `npm run
build`, `npm run audit:voice` (0 findings expected: no new string above
contains "not a", "never", "we don't", "no hidden", "free", "the figure",
"unlike other" or a badge), then `npm run smoke` and `npm run audit:a2p`,
since the closers and the FDA/consent clauses share pages with these
headings.

## Added by the lead (Chiya, 2026-09-05 evening): the health questions are plumbing, not a selling line
Apply to FrontDoor.tsx, SoloPDP.tsx, StackPage.tsx, PeptidesCatalog.tsx, ProtocolsIndex.tsx after the tightening agent finishes:
- "reads the health questions" → "reviews your online visit"
- "A few health questions, read by a licensed U.S. physician," → "A quick online visit, reviewed by a licensed U.S. physician,"
- "The health questions state what is being treated." → "The online visit states what is being treated."
- "reviews the health questions" → "reviews your online visit"
- "the health questions answered" → "a quick online visit"
Never lead a headline, a cart or a checkout with the intake step.
