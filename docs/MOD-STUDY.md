# mod.com, studied (2026-09-16)

Chiya, 2026-09-16: "build a site: high-res, cinema-grade design and branding
and everything else, copy, tone; https://mod.com/, take inspiration, I like
this way." mod.com sells a compounded modafinil drink ("MOD ALERT") through
telehealth. Fetched with a Chrome UA, localised (201 assets) and rendered
offline at 1440 and 390; copy dumped; the stylesheet read.

## What it is

- **One canvas: black.** #121212 ground, white type, a single electric
  blue #3238fa for the one button. Nothing else has colour. The only
  texture is photography.
- **Photography is the design.** The hero is a 2500×900 black-on-black
  surface beaded with condensation; the bottle is matte black with a white
  box wordmark, also beaded. Every product shot is on black: a fan of
  bottles in motion blur, two hands clinking bottles under a giant "24
  hrs", a tilted bottle for the sticky bar. The product IS the brand.
- **Type: giant, bold, caps, three lines.** "OUT WORK / OUT LAST / OUT
  PERFORM." Urbanist 700 for display, Jost for body, Barlow Condensed 800
  caps for the button ("TRY MOD", "GET STARTED", "TRY NOW").
- **The order of the page:** nav (logo, one pill) → hero (three caps lines,
  one line of what it is, a check line "Compounded by licensed pharmacies
  in the USA", the pill, the bottle at the right) → "WHY MOD IS BETTER?"
  with a duration graph and one paragraph → "Rx ENERGY" four icon tiles
  (SUSTAINED ENERGY / ACTIVATES DOPAMINE / IMPROVED MEMORY / INCREASED
  MOTIVATION, each with a small line) → "GET YOUR MOD · PRESCRIBED ONLINE
  · SHIPPED TO YOUR DOOR" four numbered photo tiles (01 Choose Your Plan
  / 02 Complete Your Medical Profile / 03 Live Tele-visit / 04 Shipped
  Fast!) → "FEEL THE FLOW." a full-bleed photograph → "READ BLOGS TO LEARN
  MORE" a rail of cards → "What you should know before taking MOD" the
  FDA paragraph → "FAQ" four rows with hairlines and "View all" → a
  three-column footer (HELP / LEARN / SOCIAL), the LegitScript seal.
- **A sticky bottom bar** on every scroll position: a white strip,
  "UPGRADE TO MOD | GET SUSTAINED WAKEFULNESS", one blue "TRY NOW".
- **Radii:** small (4–10px) on cards, a pill on the one button.
- **Its content engine** is the blog: ~70 articles, every one a
  comparison or a night-shift survival guide for one profession.

## What we take

The black canvas, the photography-as-design, the giant three-line caps
headline (law 3's enhanced register already asks for caps display copy),
one accent used once per screen, the numbered photo steps, the full-bleed
photograph with one line over it, the FAQ as hairline rows, the sticky
bar as a persistent way in, the journal rail.

## What we leave

- "WHY MOD IS BETTER?" and the graph against coffee: law 3 forbids
  comparison. Ours states what a peptide is.
- "Shipped Fast!", "*Free shipping", "24 hrs" as a hero number: no urgency,
  no "free", no counts.
- The blue stays OUR cobalt #0B5FD6 (law 1; theirs is #3238fa). On black
  the accent as type is #8DBBFF.
- Urbanist/Jost/Barlow: we keep Instrument Sans (with its italic) and
  Manrope; the caps register is weight and tracking, not a new face.
- Their photography is theirs. Ours is generated in the house studio
  (Higgsfield) to the same brief: black surface, condensation, one vial,
  hands, rim light. Assets in client/src/assets/cinema/.

## The measured sheet

| token | mod.com | ours (the cinema layer) |
|---|---|---|
| ground | #121212 | #0A0A0A (night deepened) |
| card | #1C1C1C-ish | #141414 |
| hairline | rgba(255,255,255,.14) | same |
| type | #FFFFFF / #838282 | #FFFFFF / rgba(255,255,255,.72) |
| accent | #3238fa | #0B5FD6 (button), #8DBBFF (type) |
| display | Urbanist 700, 2.5rem+ on desktop; hero ~7rem | Instrument Sans 700, caps, --nx-t-display |
| button | Barlow Condensed 800 caps, pill | Manrope 700 caps, pill |
