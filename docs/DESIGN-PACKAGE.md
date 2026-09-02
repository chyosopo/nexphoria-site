# Nexphoria design package

The single deliverable of the 10k Creative Director's Loop, Tier 1 (one 6 second
shot, about 400vh of hero). Written complete before any credit moves. The build
consumes it; every line of copy below ships verbatim. Band ranges are starting
points, validated by the flick test.

Decisions by Chiya, 2026-09-01: hero concept A (cold-chain arrival), lifestyle
imagery disclosed in the footer, video on Seedance 2.5 at 1080p.

Deviations from the skill, said out loud:

- Palette is not sampled from footage. Graphite & Ice is house law (CLAUDE.md
  law 1, with a revert history), so the footage is prompted into the palette.
- Architecture stays Vite + React + Cloudflare Pages behind the ten-gate battery.
  The skill's hero engine is ported into one React component built to the exact
  scrub-pipeline standard. The one-file rule exists for beginners on fresh sites;
  a live regulated brand earns the deviation.

## 0. Decision log, 2026-09-02

Chiya watched the scroll-scrubbed film on the preview and rejected the idea
("there's no point behind this motion scroll video"). Seven hero mockups
were rendered as HTML with the real fonts and photographs; she rejected the
copy across all of them ("I don't like the copy at all") and chose the
"You, you, you" voice: second person, plain, friendly, straight to the
point. The hero is now one lifestyle photograph (layout A of the mockups)
with "Your body. Your numbers. Your plan." and every line on the home page
was rewritten in that voice. The scroll engine, its assets and the band map
below are retired; the film and frames stay in review/ for reference. Law 3
(institutional voice) is deliberately relaxed on tone by the principal; the
voice gate (no defensive negation) still runs.

**The 1000x pass, later on 2026-09-02.** Chiya: "Make it 1000 times better."
Done without further questions: new 2K photography generated in one world
(7am, cold white, ice blue; Nano Banana Pro, 10 credits, one of each pair
rejected on sight) for the hero (woman at the kitchen window), three goal
cards (jeans, home gym, a couple on a frosted walk) and the plain cold box;
a "Start with your goal" section of three photographed doors plus quick
chips that land in the assessment with the goal preselected; a "What
arrives" section around the cold box; trust chips under the hero button;
the 99 counts up; the step line draws in; every photograph breathes slowly
while on screen and holds still under reduced motion. The promise line now
reads "No charge unless a doctor prescribes." Assets live in
client/src/assets/life at two widths each.

## 1. The brand premise

One word from the subject's world: **measured**. A Nexphoria dose is set from a
99-marker panel a doctor reads before anything ships, and set again from the same
panel at 90 days. The dose follows the data. Every section teaches that one idea,
the interactive moment performs it, and the closing line restates it. A section
that does not serve it does not belong on the page.

Buyers' own checklist for a real clinic, found in research: a licensed prescriber
on record, a 503A pharmacy, your history and your labs, a monitoring protocol,
repeat labs at three months, documented dose changes. That checklist is the
page's proof section, in their words.

## 2. The palette as CSS tokens

Existing house tokens, unchanged. Named here so the build and the footage prompt
share one vocabulary.

```css
:root{
  --canvas:#F7F8FA;         /* --nx-bg, cold white, never pure white */
  --panel:#ECEFF3;          /* --nx-bg-cream, raised surfaces and bands */
  --night:#101317;          /* --nx-bg-dark, the settle and the closer */
  --accent:#2B6CB0;         /* --nx-cobalt, the CTA and rare emphasis */
  --accent-muted:#E0E9F4;   /* --nx-tint-cobalt-bg, whisper level: hairlines, glow, frost */
  --text-primary:#17191C;   /* --nx-fg, graphite */
  --text-secondary:#4A5058; /* --nx-fg-graphite */
}
```

Footage world, described as material and light for the prompts: cold white
studio, clear glass, brushed aluminium caps, frost that clears to a soft
ice-blue glow, graphite shadow.

## 3. The type trio

- Display: Fraunces 500, roman and italic. Already loaded.
- Body: General Sans 400, 500, 600. Already loaded.
- Labels and readouts: the system mono stack, `ui-monospace, "SF Mono", Menlo,
  Consolas, monospace`. No extra font request; the readouts are small.

## 4. The band map

Decision log, 2026-09-01 evening: Chiya watched the cold-chain shot (Seedance
2.5, 54 credits) and asked for something more fun and fast. Concept revised to
**the rush**: the camera whips through a tunnel of cold light and flying
droplets, bursts into the studio, and the four vials snap into the row one by
one with a splash, landing on the same composed ending. Generated on Kling 3.0
Pro (10.5 credits) from a new start frame (2 credits); the ending frame and
every line of copy are unchanged. The captions now echo the rush: approach
from depth, blur to sharp, word punch, then the settle.

Hero height 550vh (400vh failed the flick test by one flick). Scroll range is
450vh, so 0.02 of progress is 9vh and each 0.22 band is a plateau of about
87vh, five to six normal flicks. All captions live in the calm
left third until the settle, where the text sits lower left beside the landed
product.

| Band | Range (start) | Footage moment | Copy (verbatim) | Entrance |
|---|---|---|---|---|
| 1 | 0.00 to 0.22 | Inside the light tunnel, droplets streaking past | "Peptides, prescribed on your numbers." | Approach from depth, opens settled on load |
| 2 | 0.26 to 0.48 | The tunnel brightens to white | "A doctor reads a 99-marker panel before anything ships." | Blur to sharp |
| 3 | 0.52 to 0.74 | Burst into the studio, vials snapping in with splashes | "The same panel again at 90 days. The dose follows the data." | Word punch with overshoot |
| 4 | 0.80 to 1.00 | Landed. Four vials at rest, margin above and below | Headline "Built on your bloodwork." Subline "Physician prescribed. Compounded in a licensed U.S. pharmacy. Shipped cold." CTA "Start your assessment" Microline "Two minutes. Billed only if a physician prescribes." | Word by word rise into a staged settle |

Band 1 skips the ease in. Band 4 skips the ease out.

Engineering notes earned in the build: caption widths are set in rem on the
band and in ch on the text element itself (a container's ch is measured in
the body font); the poster URL is resolved in JS against the document, never
placed as a relative url() inside a CSS custom property (that resolves
against the stylesheet folder); the prerenderer strips the blob: video src
and the scrub state classes from snapshots; a VP9 WebM sits beside the H.264
MP4 and the engine fetches whichever the browser can decode.

## 5. The static hero copy block

For phones and reduced motion, composed over the ending frame:

Headline: "Built on your bloodwork."
Subline: "Peptides, prescribed by a U.S. physician who reads a 99-marker panel
first. Compounded in a licensed U.S. pharmacy. Shipped cold."
CTA: "Start your assessment"
Microline: "Two minutes. Billed only if a physician prescribes."

## 6. The below-fold outline

Every section funnels to one anchor: the assessment. Every line below is final.

**6.1 The checklist (proof, in buyers' words)**
Kicker: "What a real clinic has"
Headline: "Four things. We have all four."
Items:
1. "A licensed physician on record. A named, state-licensed doctor signs every prescription."
2. "A 503A pharmacy. Your prescription is compounded for you, batch documented, in a licensed U.S. pharmacy."
3. "Your labs, read first. A 99-marker panel is drawn and reviewed before anything is prescribed."
4. "A retest on the calendar. The same panel again at 90 days, and the dose follows what it shows."
Closing line: "That is the whole model. It is also the checklist people use to spot a real clinic."

**6.2 The formulary**
Kicker: "The formulary"
Headline: "What each one does, and when you will know."
Four product tiles from the catalog, outcome first, real vial photo, the physician timeline, the price floor. Existing component, restyled to the standard.

**6.3 How it works**
Kicker: "How it works"
Headline: "Three steps to a protocol built on your numbers."
1. "Complete the assessment. Two minutes on your health, your history and your goal. It goes straight to a U.S. licensed physician."
2. "Draw the panel. A 99-marker panel at a CLIA-certified lab near you. Your physician reads the results."
3. "Start, and retest at 90 days. Your physician decides. If it fits, a 503A pharmacy compounds it and ships it cold. The same markers are drawn again at 90 days and the dose follows the data."
Fine print, verbatim: "If the physician declines, nothing is compounded and nothing is billed." and "Prices are monthly figures. Twelve-month plans include the blood panel."

**6.4 The interactive moment: Read the panel**
Lives between How it works and Pricing. Kicker: "Try it". Headline: "Hold to run the 90 days."
A press-and-hold. While held, a marker line draws from a baseline dot across
to a retest dot, and a readout counts the days from 0 to 90. Releasing early
eases it back; it never snaps. Completing it lights three lines in sequence:
"Panel drawn." "Physician reviewed." "Dose adjusted." The visitor performs the
premise. Reduced motion: the finished state, no hold required. The line is the
site's signature element (section 7).

**6.5 Pricing**
Kicker: "One number"
Headline: "One number a month. Everything within it."
Line: "The consultation, the panel, the medication, the shipping and the 90-day retest are all inside the figure. Your physician sets the dose. The price does not change with it."
Price rows from the catalog, derived, never typed.

**6.6 FAQ (the real objections, answered plainly)**
- Q "Is this legit?" A "Yes. A named, U.S. licensed physician reviews your intake and your labs and signs every prescription. The medication is compounded for you in a licensed 503A pharmacy and shipped cold. Your labs are drawn again at 90 days."
- Q "Do I actually talk to a doctor?" A "A physician reads your full intake and your 99-marker panel, and makes the call. You can message them through the portal, and your dose is reviewed at every retest."
- Q "Do I need bloodwork?" A "Yes, before anything is prescribed. It is drawn at a CLIA-certified lab near you, and it is inside the monthly figure. Without a baseline there is nothing to compare the retest against, and the retest is the point."
- Q "What if the doctor says no?" A "Then nothing is compounded and nothing is billed. Some intakes end there, and that outcome carries no charge."
- Q "How is compounded semaglutide different from Ozempic?" A "Semaglutide is the same active ingredient. Compounded semaglutide is prepared for you by a licensed 503A pharmacy under a physician's prescription. It is not an FDA-approved drug, and it is not the branded product." (FDA-required wording; exempt from the voice gate. The question was "Is compounded semaglutide the same as Ozempic?" until audit:legitscript flagged the equivalence framing; the buyer's question is the same, asked as a difference.)
- Q "How is it shipped?" A "Cold, in an unbranded package, to all 50 states."

**6.7 The closer**
Headline: "Prescribed on your numbers. Reviewed on your numbers."
CTA: "Start your assessment"
Microline: "Two minutes. Billed only if a physician prescribes."

**6.8 The footer**
Existing footer, plus one quiet line: "Lifestyle imagery is illustrative. Product photography shows the actual vials." The A2P and legal blocks stay exactly as they are.

**The form.** The assessment lives on its own page and is the single CTA; the newsletter and waitlist forms post to the live `/api/waitlist` Function, verified returning `{"ok":true}` on the apex. No form on the home page itself.

## 7. The vector layer plan

- **Signature element: the marker line.** A single hand-drawn SVG path, baseline
  dot to retest dot, that draws itself on scroll. It appears three times: under
  the settle headline in the hero, as the divider between sections, and as the
  thing the visitor draws in the interactive moment. Remove it and the page
  changes. That is the test of a signature.
- **Whisper particles:** slow frost motes in the hero stage only, at opacity
  below 0.2, paused off screen.
- **The environment layer:** one fixed background behind everything, a very
  slow cold-light drift on the canvas, cycling at 70 seconds, so scrolling feels
  like moving through one place.
- **One living element per section** after its entrance, four seconds or
  longer, negative delays so they are mid-cycle at first paint.
- All of it honors reduced motion: final states shown, drives stopped, pinned
  live on the change event and unpinned when it flips back.

## 8. The engineering list

The full standard from `scrub-pipeline.md`, named so the build cannot half
remember it: streamed Blob fetch behind an honest loading ring with a 20 second
watchdog, the dt-normalized lerp that rests, gated seeks with the deadlock
escape, delta-gated DOM writes, band pacing in scroll distance with the flick
test at 120, 240 and 360px, the four-layer legibility system with the worst-frame
audit at 3.5:1, the five static-hero gates identical in CSS and JS and decided
live, complete without the video, the video decorative and out of the tab order,
overflow-x clip on html and body, and the whole-site-animated standard.

House gates on top: the ten in CLAUDE.md, run before every commit.

## 9. The copy gate line

Every viewer-facing line above ships verbatim. Before anyone sees the build it
passes the Phase 9 grep: zero em dashes, zero of leverage, seamless, empower,
unlock, robust, actionable, data-driven, solutions, plus the body sweep for
testament, landscape, delve, elevate, "not just X, it's Y," false ranges and
vague attributions. Deliberate devices written here stay: the triplet "Panel
drawn. Physician reviewed. Dose adjusted." is craft. The house voice gate
(audit:voice) runs on top of it.
