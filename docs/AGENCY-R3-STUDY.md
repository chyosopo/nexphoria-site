# The agency's R3 round, read from Figma (2026-09-04)

File: `figma.com/design/o6EdzxgsOwH437dHMRlLVT/Nexphoria`, board
"Names + Interior Review - 090326" (node 1485-11358). Read-only, View seat.
Read so far: the board overview, Homepage R3, Protocol R3 and Bloodwork R3
at half resolution. Pricing R3, Cognition R3, the COLOR sheet and the
variable definitions were blocked by Figma's tool-call limit for a View
seat; their exact hex, type faces and spacing are still to be read.

## What the board holds
- 12 naming candidates (Dr. Pep, OmniPep, A-Pep, Pepl, Pepwell, Pepform,
  Pepful, PepTalk, Aro, Cue, Numa, Rove) with domain lists, and a
  "Naming + Image Direction" cover. The page designs still say Nexphoria.
- Five page designs at 1440: Homepage, Protocol (Wolverine), Bloodwork,
  Pricing, Cognition. A hidden REF frame of mood photography.

## The design system, as seen
- Canvas near-white #F8F8F8; alternating light grey #EFF0F2; light-blue
  tinted cards #E5EFF9; pure white elevated cards.
- Ink: navy #083573 (bands, footer, step numbers, links); deeper #032356
  in the hero band. Body text dark grey.
- Accents: bright blue #1273FA / #3085FB for shop buttons ("Discover more",
  "Build custom stack"); pale yellow (about #EEF0A6) pill for the primary
  "Start assessment" CTA and for chips ("Repair · Rebound · Return").
- Type: one geometric sans throughout, medium-weight headlines, no serif.
- Shape: pill buttons, 16 to 24px card radii, translucent "glass" cards
  over photography, frosted vial tiles on tinted backgrounds.
- Imagery: blue-toned duotone hero, full-bleed photographs of bodies and
  faces, vial photography on tinted panels.
- Patterns: hero with a glass card and a row of four goal chips;
  "Shop bestsellers" carousel; "Physician-approved stacks" carousel;
  two-up promo cards; three trust icons; 01 to 04 process; category tabs
  with goal photo tiles; "Shop protocols"; results; FAQ; navy footer with
  a newsletter line. Protocol page: navy hero with "the vials in this
  protocol", "What is included, every month" tiles, a sticky "Your stack"
  rail (Monthly / Quarterly / Annual), "What the weeks look like", a
  "PepTalk" chat card, "You might also like". Bloodwork: stat chips,
  Basic / Full / Elite tiers, a 99-marker grid, a comparison table,
  "Ninety days. Two draws." result cards, three steps, FAQ.

## How it maps onto our tokens (`?sheet=agency` on the preview)
| token | Graphite & Ice | Agency R3 (approx.) |
|---|---|---|
| --nx-bg | #F7F8FA | #F8F8F8 |
| --nx-bg-cream | #ECEFF3 | #EFF0F2 |
| --nx-bg-dark | #101317 graphite | #083573 navy |
| --nx-cobalt (the accent) | #2B6CB0 ice | #0F6AE6 bright blue |
| --nx-cobalt-soft | #E2EBF5 | #E5EFF9 |
| --nx-ceramic | #FDFDFE | #FFFFFF |
| --nx-acid (dark-band accent) | #9FBBDA | #EEF0A6 pale yellow |
| display face | Fraunces (serif) | General Sans (sans) |
| radii md / lg | 10 / 14 px | 14 / 20 px |
| CTA shape | rounded | pill |

Undecided and NOT mapped: the yellow primary CTA (their assessment button),
the duotone photo treatment, the glass hero card, the carousels.

## Where their content is behind ours (must be reconciled before any handoff)
The R3 pages were built on the site as it stood in July and August:
- Wolverine, Basic / Full / Elite panels at $99 / $199 / $399, "99 markers
  across 11 panels", Monthly / Quarterly / Annual at 15% and 30%,
  "Marker dashboard & messaging", "re-drawn every 90 days". The current
  offer is the playbook: 22 products, six protocols, four terms paid up
  front (10 / 15 / 20%), one 24-marker panel drawn at home before the first
  dose and again at week 12, add-on tests, reservations for pending
  medicines.
- "Before / After" photographs, star-rated testimonials, and an
  "illustrative trajectory" card with marker deltas (IGF-1 up 44%, HbA1c
  down) are exactly the fabricated-result surfaces retired on 2026-09-03.
  LegitScript reads them as outcome claims. They should not ship.
- "Lose weight fast", "Regrow hair", "Nothing is prescribed before it's
  measured", "not guesswork", "declines happen", "No charge unless a
  physician prescribes": hype, negation and unconfirmed claims that fail
  the house voice gate.
- Lorem ipsum in the hero subline, the testimonials and the FAQs.
- "PepTalk" chat: a product promise nobody has built.

## What to ask the agency for
1. The variables / styles panel exported (colors, type scale, spacing,
   radii) or an Editor seat on the file for the connector, so the mapping
   above becomes exact instead of sampled.
2. To design against docs/COPY-DECK.md and the live preview, not the
   July site: four terms, the baseline kit, the 22-product menu, /labs.
3. To drop before/after, star reviews and the trajectory card, or move
   them to a "pending real data" layer.

## Built on the preview (2026-09-04, evening)
Chiya: "build out the site with their design system, don't touch their
files, just build on what we are continuing." Their Figma is untouched;
the site now carries their grammar on our content and tokens:
- The agency sheet is the DEFAULT on this build (`?sheet=house` returns to
  Graphite & Ice for comparison). nexphoria.com is on the previous commit
  (house look) until Chiya says push.
- Home: full-bleed navy-tinted photograph with one glass card (claim, two
  doors: Shop the menu / Get a recommendation) and four goal chips;
  three-fact trust row; the full menu as a navy rail with goal tabs and
  frosted vial tiles; the protocols rail (photo left, plan right, triad
  chips, "Inside the plan"); the two-up promo (Build your own / Which
  treatment is right for you); then the house sections (goals, concerns,
  two ways in, checklist, cold box, hold, price table, FAQ, closer).
- Navy heroes (`.nx-hero-r3`) on product, protocol, goal and blood-testing
  pages: tokens re-scoped inside the hero so every existing card reads as
  glass on navy; the primary CTA is the pale-yellow pill.
- Still to carry into their grammar: pricing hero, protocols index hero,
  the footer newsletter line, FAQ arrow rows, the goal photo tiles' pill.
- Not carried, on purpose: before/after, star reviews, the trajectory
  card, "PepTalk", lorem ipsum.

## Third pass (2026-09-04, night)
Chiya: "use the Pricing R3 first section and the Homepage R3 second section,
mix and match the rest, make it ten times better, apply it everywhere, high-res
lifestyle imagery." Node 1334-5832 and the Pricing R3 hero remain unread
(Figma View-seat limit); the pricing hero below is composed in their grammar
from what was read.
- Pricing: navy hero with the four terms as glass tiles (label, saving, the
  labs that term includes, "Best value" on six months) beside the photograph.
- Labs: a navy "What we measure" band with the five systems as glass cards.
- About and How-it-works heroes in navy; step and checklist numerals as big
  display figures (their 01 to 04 tiles); goal option tiles on tinted panels.
- Imagery: both generators refused (Higgsfield grace-period daily limit despite
  2,451 credits; Bloom 0 credits). Twelve R3-toned lifestyle prompts are ready
  to run the moment either account allows it; until then the 58 localized
  frames carry the site.
