# NEXPHORIA — DESIGN-LOGIC & LAYOUT AUDIT (2026-07-03, pass 2)
*Grounded in a live repo scan, not memory. This is the "why it still feels uneven" list:
the design SYSTEM exists (D1–D8 tokens) but adoption is two-tier — pages rebuilt this cycle
obey it, the big legacy flagships (Home, Science, LabTesting, Pricing) predate it and run on
ad-hoc values. That gap is the top finding.*

## ★ FINDING 1 — TYPE SCALE IS TWO-TIER (highest impact)
The `--nx-t-*` fluid type tokens exist and are correct. Adoption is split:
- **On the system:** StackPage (14 token refs / 6 raw), SoloPDP, ProtocolsIndex, HowItWorks,
  BuyBox, PdpFaq — rebuilt this cycle.
- **Off the system entirely (0 token refs):** Home (73 raw fontSize), Science (89),
  LabTesting (76), Pricing (59), Community (37), About (24), Bloodwork (18).
- **15+ distinct h1-ish clamp() values** doing the same job, in TWO unit systems:
  `clamp(2rem,4vw,3rem)` ×18, `clamp(1.875rem,3.5vw,2.75rem)` ×10, `clamp(36px,4.6vw,56px)` ×5…
  Many differ by <2px — invisible variation that reads as "slightly off" everywhere.
**Fix:** port the big legacy pages to `--nx-t-*` (display/h1/h2/h3/lg/body/sm/xs). This is the
single biggest lever on perceived polish. Do it page-by-page; audit:design tracks the count.
Suggested map: clamp(2rem,4vw,3rem)→--nx-t-h2, the 64px hero clamps→--nx-t-display, etc.

## ★ FINDING 2 — SECTION RHYTHM IS AD-HOC
Only 3 pages use `--nx-section-y`; 11 use hand-written `clamp()` vertical padding with
different values. Vertical rhythm between sections is therefore inconsistent page-to-page.
**Fix:** standardize section padding on `--nx-section-y` (or a small set of section-size
tokens: tight / normal / loose). One decision, applied everywhere.

## ★ FINDING 3 — LEGACY COLOR ALIASES STILL SPRAWL
Still live: `--nx-amber` (17), `--nx-rust` (11), `--nx-black` (5), `--nx-bg-cream` (29),
`--nx-line` (4). These predate the Porcelain & Navy token set and muddy the two-world theming
(amber/rust are warm accents that don't belong in either world's palette).
**Fix:** map amber→cobalt/acid, rust→cobalt, black→fg, bg-cream→ceramic/canvas, line→border.
Verify both worlds after — these are the tokens most likely to leak azure into the women's world.

## FINDING 4 — DUPLICATE-CONTENT ROUTE `/catalog`  ← cheap, fix now
`/peptides` correctly redirects to `/men/peptides`. But `/catalog` renders PeptidesCatalog
DIRECTLY with canonical `/peptides` — a second URL serving the same content under a canonical
that doesn't match its own address. Either redirect `/catalog`→canonical, or drop the route.
(Bloodwork vs BloodPanels are DIFFERENT pages with correct distinct canonicals — not a dupe.
Cart/Checkout correctly noindex,nofollow.)

## FINDING 5 — RESPONSIVE GRID FALLBACKS MISSING
Three grids jump straight to multi-column with no `grid-cols-1` base:
- Home.tsx:1364 `grid grid-cols-3` (3-up crushes on phones)  ← fix now
- Checkout.tsx:349 `grid grid-cols-2` (payment fields — tight but survivable)
- StackPage.tsx:133 `grid grid-cols-2` (timeline tiles — 2-up is OK on mobile, low priority)

## FINDING 6 — IMPERATIVE HOVER IN ~10 FILES
`onMouseEnter/onMouseLeave` setting styles in JS (Assessment ×4, Nav ×4, VialTile, SignatureTile,
GoalVialTile, PressStrip, RotatingWord, Science, Gate, BuildYourStack). This bypasses the D18
CSS press/hover grammar and the reduced-motion kill-switch. Migrate to CSS `:hover`/`:active`
classes so motion respects user preferences uniformly.

## FINDING 7 — Z-INDEX HAS NO SCALE
Values seen: 1,2,3,4,12,20,40,50,200,201. The 200/201 (likely nav/drawer/modal) aren't on a
named layer scale, so future overlays will collide by guesswork.
**Fix:** define `--nx-z-base/raised/sticky/overlay/modal` tokens; map the strays.

## FINDING 8 — MINOR
- Fixed px widths (200/180px, minWidth 120px) — verify they don't overflow at 320px. Low risk.
- Cart/Checkout have no `path:` in useSeo (intentional — they're noindexed). Fine.
- ~41 `#FFFFFF` literals across page files → should be `var(--nx-ceramic)`.

## PRIORITY ORDER
1. FINDING 4 + 5 (Home grid) — cheap correctness, do immediately.
2. FINDING 1 — type-token the big legacy pages (Home→Science→LabTesting→Pricing). Biggest ROI.
3. FINDING 3 — retire legacy color aliases (protects two-world theming).
4. FINDING 2 — section rhythm tokens.
5. FINDING 6 + 7 — hover migration + z-index scale.
6. FINDING 8 — hex cleanup rides along with #1.
Every step gated by: tsc 0 · smoke 39/39 · audit:data clean · audit:bundle ok · audit:design
NOT regressing (it will IMPROVE as literals become tokens).
