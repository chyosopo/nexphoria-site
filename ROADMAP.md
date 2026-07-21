# ROADMAP — From "cute" to a site that converts

> The standing execution plan. Any agent session picks up the FIRST unchecked
> item, completes it to its Definition of Done, checks it off, commits, and
> moves to the next. Chiya should never have to re-explain the goal.
> Updated: 2026-07-05.

## The zoom-out (why the site fails today)

A first-time visitor is a 30–55 year old who heard about peptides on a
podcast. They are curious, skeptical (this market is full of scams), and
busy. In order, they ask:

1. *What is this?* (3 seconds)
2. *Is it for someone like me?* (10 seconds)
3. *What do I get and what does it cost?* (30 seconds)
4. *Can I trust them with my body and my card?* (2 minutes)
5. *What exactly do I do next?* (the one action)

Today the site answers none of these in order. The gate shows two photos
and no value proposition. Every page offers 3–6 competing actions
(assessment, panel, protocols, catalog, booking, cart, build-your-stack).
Chemistry names lead before goals. Trust is scattered as generic badges
instead of woven into decision moments. Result: a beautiful brochure with
no spine — the user's words: "a client comes in, he doesn't even know
what to do."

## The north star

**One visitor. One story. One action.**
- ONE primary action sitewide: **Start the assessment** (goal → short quiz
  → personalized recommendation → checkout). Everything else is secondary.
- Every page has ONE job and ends by advancing the visitor ONE step.
- Story beats on every key page: *feeling → possibility → proof → path.*
- Any entry point → a price and a buy button in ≤ 3 clicks.

---

## PHASE 1 — The spine: one clear action everywhere

- [x] **1.1 CTA hierarchy law.** (done 2026-07-05) Exactly one solid CTA per viewport; all
  others become ghost/text links. Announcement bar loses its competing
  CTA (message only). World-home hero: ONE solid "Start your assessment"
  + one text link. Kill "The seven protocols" hero button (the goal grid
  is right below). Audit every page: no viewport with two solid CTAs.
  *DoD: Playwright sweep counts solid CTAs per viewport section on all
  routes; screenshots reviewed; pushed.*
- [x] **1.2 New front door.** (done 2026-07-05) The bare her/him photo gate stops being the
  homepage. New single homepage: value proposition + emotional hero
  ("Prescription peptide protocols, built on your bloodwork.") → ONE CTA
  → gender/goal choice as a warm second section → 3-step how-it-works →
  goal grid → physician proof → price anchor ("Protocols from $129/mo,
  physician and labs included") → FAQ teaser → final CTA. A stranger must
  understand the offer in 5 seconds without scrolling.
  *DoD: 5-second test against the hero screenshot; mobile + desktop
  verified; gate remains at /gate for returning users.*
- [x] **1.3 Nav simplification.** (done 2026-07-05) One button (Start assessment), 4–5 links
  max (Goals, Protocols, Science, Pricing), cart icon. Everything else
  into the footer. Shipped: all four nav variants ≤5 links (Peptides ·
  Protocols · Bloodwork · Science · Pricing; gate: For Women · For Men ·
  Protocols · Bloodwork · Pricing); Journal/How It Works/Custom Protocol
  reachable via footer; footer email unified to hello@nexphoria.com +
  "Book a consultation" link.
  *DoD: nav screenshot both worlds + mobile drawer.* ✅ qa35-nav-men.png
  (desktop, 5 links + one button + cart), qa35-nav-drawer.png (women
  mobile drawer, same 5 links).

## PHASE 2 — The guided flow (the product IS the path)

- [x] **2.1 Assessment = storefront.** (done 2026-07-05) Tighten to: pick goal → 5 questions
  → RECOMMENDATION page. No dead ends; progress always visible; back
  always works. Flow: sex → goal → 5 questions → review → recommendation;
  labeled progress bar on every question step; back + edit-in-place from
  review; every terminal screen advances (checkout / eligibility /
  pricing + "see other options").
- [x] **2.2 The recommendation page** (done 2026-07-05) (the emotional + trust peak):
  "Based on your goals: the Wolverine Protocol" — what's in it, what it
  costs per month, what the panel checks, the physician gate, ONE button
  to checkout. Secondary: "see other options."
  *DoD: full flow Playwright run, goal → recommendation → checkout form,
  screenshots each step, mobile first.* ✅ qa36-mobile-01…07 + desktop
  walk: headline "Based on your goals: the Ascend protocol.", real stack
  contents/cadence pricing/panel from stacksCatalog, ONE "Continue to
  checkout" button lands on /checkout with the stack in the cart at the
  same $254/mo; gated GLP-1 goal → "Check eligibility" → /stacks/ignite;
  unmatched goals (hormonal, not-sure) keep the pricing path.
- [x] **2.3 Demote the side doors.** (done 2026-07-05) Build-your-stack and direct cart stay
  reachable (footer/catalog) but leave the primary nav. Booking page
  links from FAQ/contact only. Verified: /stacks/build linked only from
  ProtocolsIndex (catalog) + footer; /booking linked only from footer
  contact column + a new quiet third door on /contact; nav carries no
  side doors (1.3). Dead legacy Home import removed from App.tsx.

## PHASE 3 — Page-role contract (information architecture)

- [x] **3.1** (done 2026-07-05) Write the one-line JOB of each page at the top of its file;
  delete sections that don't serve it. Kill duplicate trust strips
  (today: TrustBar + TrustStrip + badge rows on the SAME page).
  Shipped: `/* JOB: … */` contract on all 26 routed pages; the 12
  page-level TrustStrip badge rows deleted (SiteLayout's global TrustBar
  is THE one generic trust surface; the Assessment in-flow strip stays —
  it sits at the submit decision, which is 5.1's pattern). Verified in
  browser: science/physicians/assessment each show trust-bar=1,
  page-strips=0. Judgment-call section deletions beyond trust ride with
  the 4.1 copy rewrite, page by page.
- [x] **3.2 Goals before chemistry.** (done 2026-07-05) Catalog defaults to goal grouping;
  compound names become the secondary line. PDP hero states the OUTCOME
  first, molecule second. Shipped: `outcome` tagline on all 20 solos
  (derived from each mechanism — no new claims); catalog default view
  groups by the 7 goal shelves with outcome-titled cards (name · dose is
  the second line; filter/search flattens); PDP hero = outcome headline,
  "Name · Category" eyebrow, bolded name opening the mechanism line.
  Verified: /peptides group headers + /peptides/bpc-157 "The healing
  signal, systemwide." (qa39-*).

## PHASE 4 — Emotion pass (copy as story beats)

- [x] **4.1** (done 2026-07-05) Rewrite key-page copy to the beat structure: feeling →
  possibility → proof → path. Bank voice, but warm. No feature lists
  above the fold. Shipped: men hero "The strongest version of you is
  measurable.", women hero "How you want to feel has a biology." — both
  subs are narrative sentences (the old subs were literal feature
  lists); HowItWorks sub reframed around the visitor's skepticism.
  FrontDoor already carried the structure from 1.2; Bloodwork's hero
  already led with possibility. Deeper per-section copy rides page by
  page with 7.1's persona walks.
- [x] **4.2** (done 2026-07-05) Each goal gets its 3-word feeling line (e.g. Recovery:
  "Train like it never happened.") used consistently from tile → PDP →
  assessment. Shipped: CATEGORY_FEELING in @/data/peptides (single
  source, 8 goals) → front-door goal tiles, /goals hero lead line,
  catalog shelf headers, and assessment goal tiles (GOAL_TILE_CONFIG
  feeling field, reusing CATEGORY_FEELING where 1:1). PDPs carry the
  finer-grained per-peptide outcome lines from 3.2. Verified on all
  four surfaces (qa40-*).

## PHASE 5 — Trust weave (at decision points, not in wallpaper)

- [x] **5.1** (done 2026-07-05) One trust system: physician presence (face + board
  certification + "can decline") appears exactly at decision moments —
  beside hero CTA, beside buy box, on checkout. Generic badge rows
  reduced to one per page (done in 3.1). Shipped: compact PhysicianGate
  (unnamed network portrait + "board-certified · licensed in your state
  · free to decline") beside the FrontDoor hero CTA, both world-home
  hero CTAs, in the BuyBox under the promise, and on checkout. Verified
  present at all four moments (qa42-*).
- [x] **5.2** (done 2026-07-05) The "if prescribed / no charge unless prescribed" promise
  becomes a single reusable component at every price display. Shipped:
  PrescribedPromise ("No charge unless a physician prescribes — the
  review is free.", optional operational detail) at the BuyBox, cart
  drawer (with the Bask card-hold detail), cart summary, checkout
  header, FrontDoor price anchor, and the assessment recommendation
  card; ad-hoc phrasings at those sites removed. Page-close headline
  sections keep their editorial phrasing. Browser-verified at all six
  (qa41).
- [ ] **5.3 Pricing truth debt (found 2026-07-05).** Pricing.tsx and
  lib/protocols.ts carry a legacy pricing scheme (6-month prepay, save
  10/20/25%, "$249–$389/mo") that contradicts the real catalog
  (stacksCatalog cadences: 3-mo save 15%, 12-mo save 30%, protocols from
  $139/mo, solos from $149/mo). FAQ answer already re-derived from the
  catalog; Pricing page's tier model (Solo/Curated/Custom + 6-month
  plans) needs a full rebuild on FLAGSHIP_STACKS + pricing data. Also:
  unrouted legacy pages/Home.tsx still contains the stale claims —
  delete or rebuild. Flagship page → Atlas's lane, or next agent here.
  Also found 2026-07-05: the biomarker COUNT is inconsistent — FrontDoor
  and world homes say "{PANEL_TOTAL_MARKERS}-marker panel" (=99, derived
  from biomarkerPanel.ts), while FAQ ("38-biomarker panel"), Assessment
  landing copy, and physicians stats ("38 biomarkers reviewed first")
  hardcode 38. Decide the canonical count with Chiya (38 = one tier? 99
  = all tiers?) and derive every mention from one source.

## PHASE 6 — Speed to checkout

- [x] **6.1** (done 2026-07-05) ≤3 clicks from any entry to price+buy: measured as an
  automated Playwright test that fails the build if a path regresses.
  Shipped: `npm run audit:funnel` (scripts/audit-funnel.mjs) — serves
  the built client, walks 7 entry paths in real Chromium, exits 1 on
  regression. It immediately caught a real break: world-home goal tiles
  all pointed at the generic catalog — now deep-linked to /goals/:cat.
  All 7 paths pass at ≤2 clicks. Part of the gate battery from now on.
- [x] **6.2** (done 2026-07-05) Sticky contextual CTA on long pages (mobile bottom bar
  already exists on PDPs — extend the pattern). Shipped: StickyAssessBar
  (mobile-only, mounts only past 900px scroll so it never doubles the
  hero's solid CTA) on Science, LabTesting, HowItWorks, Bloodwork with
  contextual labels. Verified: hidden at top, present after scroll,
  never on desktop (qa43).

## PHASE 7 — Full-journey QA to 100%

- [x] **7.1** (done 2026-07-05) Five personas walked end-to-end (skeptical newcomer, hims
  switcher, woman/skin, athlete/recovery, GLP-1 seeker), every step
  screenshotted mobile+desktop, every break fixed. Ran as an automated
  Playwright walk (qa44: 50 steps × console errors / horizontal overflow
  / broken images / dead ends): zero site breaks — the only console
  noise is the two external font CDNs blocked by the sandbox network
  (fine in production; consider self-hosting fonts later). Visual
  sample review caught 3 CTA-label deviations ("Begin intake" on the
  BuyBox mobile bar, CadenceSelector, LabTesting tiers) — fixed to the
  sitewide law.
- [x] **7.2** (done 2026-07-05) Final gate: every page passes the 5-second test + the
  one-action test. One-action: 25/25 routes show ≤1 solid CTA in the
  first viewport (nav + fixed bars excluded). 5-second: hero
  screenshots reviewed across the qa37–qa44 sets — every key page
  states what it is, who it's for, and the one action. Copy depth keeps
  iterating, but the structural laws now hold everywhere and are
  enforced by audit:funnel + the sweeps in this file.

## PHASE 8 — The Protocole direction (Chiya, 2026-07-06: "exactly what I
## had in mind" — see docs/PROTOCOLE-STUDY.md for the full study)

- [x] **8.1 Bone & Espresso v2 token sheet.** (shipped 2026-07-06,
  REVERTED same day per Chiya: "why the brown color? can we keep our
  colors?") The warm sheet proved the one-commit-swap architecture both
  ways: Porcelain & Navy is back everywhere (index.css restored from
  pre-sheet history; OG card regenerated to match). The protocole
  GRAMMAR (8.2–8.4 structure, triads, illustration naming) is kept —
  only the temperature was declined.
- [x] **8.2 Front-door grammar pass.** (done 2026-07-06) Shipped: positioning
  band "A protocol. Not a purchase." on the deep-bone field; numbered
  three-pillar band (compounding / physician on every file / measured
  every 90 days); "What is a peptide?" education card with OUR keys-
  and-receptors metaphor + three plain-truth chips; "How it works —
  fine print first." steps with the footnotes stated up front
  (PrescribedPromise + declined-means-nothing-billed + panel-included).
  All claims existing/true; no copy borrowed from the reference.
- [x] **8.3 Protocol triads.** (done 2026-07-06) CATEGORY_TRIAD in
  @/data/peptides (8 goals, e.g. recovery: Repair · Rebound · Return);
  rendered as quiet chips on every flagship stack hero via a
  slug→goal map. Category pages deliberately keep their functional
  chips (different job); goal tiles carry the feeling line.
- [x] **8.4 Inner-page sweep.** (done 2026-07-06) GoalVialTile tints,
  VialArt glass/liquid hues, illustration neutrals, and regulatory
  chips regraded from the azure family to warm bone/espresso
  equivalents (one cool tone kept in-family for contrast). Verified on
  the assessment goal step.
- [ ] **8.5 BLOCKED ON CHIYA:** named Clinical & Scientific Board (real
  people + consent), real before/after testimonials, membership pricing
  model ($/mo club vs current subscriptions). Do not fabricate any of
  these.

## PHASE 9 — The frictionless pass (Chiya 2026-07-06: "everything leveled
## up and tightened, every button working, logic + emotion + strategy +
## flow — client goes through quickly, frictionless, flawless")

Method: a parallel agent fleet audits every page against the laws (one
action per viewport · feeling before chemistry · worlds separate · truth
only · tokens only · every control does something), each returning a
prioritized fix list; fixes land page by page, gates green each time.

- [ ] **9.1 Bloodwork page overhaul** (Chiya's callout) — the panel IS the
  product; the page must sell it with the same grammar as the front door:
  emotional hero, tier clarity, marker explorer that feels alive, retest
  loop story, ONE action.
- [ ] **9.2 Fleet audit findings** — per-page fix lists from the audit
  fleet, executed in severity order (see commit messages for the lists).
- [ ] **9.3 Every-button proof** — re-run the interaction audit + funnel
  gates after each batch; nothing ships with a dead control.

## PHASE 10 — The Maximus playbook (Chiya 2026-07-13: "study
## maximustribe.com… make a full plan exactly how a senior developer
## would"; evidence base in docs/MAXIMUS-STUDY.md; then "first lets work
## on the visuals the tiles like hims… everything tailored" and "go")

- [x] **10.1 Hims-style tiles, option B, everywhere.** (done 2026-07-13)
  Small 16:10 image band on top, text below — never overlaid. 4-across
  desktop / 2 mobile, equal-height rows (geometry-measured: 270px).
  One .nx-goalgrid regrade covers both world homes + front door. Dead
  bento CSS deleted.
- [x] **10.2 Product-first shelf cards, cast per world.** (done 2026-07-13)
  getPeptideCardImage(slug, world): the 8 vial/dropper/pen still-lifes
  render anywhere; gendered lifestyle frames only in their own world;
  fallback = the world's own category art. Fixed the man-and-child NAD+
  frame that briefly leaked onto her formulary.
- [x] **10.3 World-tailored protocols shelf + PDP.** (done 2026-07-13)
  /stacks orders own-lean → shared → other-lean with "Made for her/him"
  badges; stackArt(slug, world) swaps the four cast-mismatched canonical
  frames (wolverine/threshold/ignite→her equivalents on her side,
  lucidity→his on his). Her Wolverine PDP shows her climbing frame.
- [x] **10.4 The protocol selector.** (done 2026-07-13) Every goal page is
  a decision surface: 2–4 routes ("Best for: [persona]" cards — flagship
  stack + top solos, badges/bullets/price anchors all data-derived), an
  on-page "Which sounds like you?" chip row that stamps "Your match",
  and the honest exit (the intake decides). Hero carries a "Compare your
  N routes" anchor.
- [x] **10.5 "Which panel do I need?" tool on /bloodwork.** (done
  2026-07-13) Two questions; the answer is derived (a goal's tier = the
  highest tier its routes gate on; depth only steps up). Recommended
  tier lights up in the grid.
- [x] **10.6 Offer-logic wiring.** (done 2026-07-13) "What do you want to
  change?" felt-need question above the home goal grids; solo PDPs show
  THE COMPLETE ROUTE band (compound → its flagship protocol, world-cast,
  real from-price); goal pages cross-link their two matching journal
  pieces ("Read before you decide").
- [x] **10.7 Calculator, phase 2.** (done 2026-07-13) Interactive cadence
  calculator on /pricing — pick a protocol, see per-cadence cost + the
  real year-one saving (Wolverine $972, Ascend $1,080), panel included on
  annual. Derived from priceAtCadence, identical to the static table. A
  biological-age/dosage calculator was declined: both require fabricated
  medical output (truth-only + never-self-dose laws).
- [x] **10.8 Comparison SEO landers.** (done 2026-07-13) Two journal
  pieces from catalog data: "Semaglutide vs tirzepatide: one receptor or
  two" (SURPASS-2/SURMOUNT/STEP cited) and "Oral vs injectable peptides"
  (bioavailability table, calls out transdermal overreach). Metabolic goal
  page now leads with the sema-vs-tirz read.
- [x] **10.9 Funnel continuity + hardening.** (done 2026-07-13)
  · Goal pages / selector carry ?gender=&goal= into the intake, which
    pre-fills and skips the answered steps (a fresh goal wins over a stale
    draft; a mid-intake draft still owns the step). Verified end-to-end.
  · A11y: intake goal tiles announce aria-pressed + a descriptive label.
  · SEO: sitemap.xml is now GENERATED from data at build (script/
    genSitemap.ts) — it had silently dropped all 10 journal articles and
    all 8 goal pages; 114 URLs, every one verified to resolve. New
    comparison articles + goal pages confirmed emitting Article/FAQPage/
    ItemList JSON-LD, canonicals, and OG.
- [x] **10.11 Defect sweep** (done 2026-07-14, Chiya: "a lot needs to be
  fixed, I'll let you figure them all out"). Found by full-page audit of
  every major page + failure-path testing; each fix screenshot- or
  behavior-verified:
  · Hero rail duplicated the goal grid (same 6 frames twice in two
    viewports) → rail now carries bloodwork / flagship / vial / physician.
  · Price contradictions: 4 solos said "priced at consult" on PDP+catalog
    while the home/selector said "From $X/mo" → single-sourced via getPrice.
  · Blank rail tile: outcomeSrcSet emitted a 404 -800w candidate for
    bundled assets → srcSet only for img/ frames.
  · Science sticky TOC was in a ONE-column grid — rendered above content,
    6 family bands ran against a dead half-viewport → real 200px+1fr grid.
  · How-it-works step 06 had no visual → dashboard sample panel.
  · Waitlist told visitors with valid emails "enter a valid email" when
    OUR endpoint was down → invalid vs err split, honest fallback.
  · THE BLACK HOLE: intake submit treated API failure as success — deleted
    the draft, showed the success screen, intake gone (every current host).
    Now fails honestly: draft kept, retry + contact-only mailto; success
    screen only on a real 2xx. No repo-side intake endpoint added (PHI law).
  · Mobile trust strip clipped mid-word with no affordance → edge fade.
- [x] **10.12 Defect sweep, round 2** (done 2026-07-14, continuing "figure
  them all out"):
  · Builder's curated-match banner read the LEGACY stacks shelf — banner
    vanished for 5 of 7 goals (slugs didn't exist) and promised formulas
    the canonical PDP contradicts (Wolverine "3 peptides · 8-week" vs 2 ·
    12-week). Now adapted from FLAGSHIP_STACKS with world-cast stackArt.
  · Gate chip claimed "3 Flagship Protocols" — there are 7; now derived.
  · pages/LabTesting.tsx was dead code (route redirects to /bloodwork)
    carrying an invented Essential/Comprehensive/Executive tier line with
    impossible marker math — deleted (2,221 lines) with its orphaned
    portraits lib + 6 tile assets; smoke asserts the redirect target.
  · Intake early-email capture sent the visitor's GOAL to the repo-side
    waitlist store — health answer, PHI-adjacency law; email+source only.
  · Footer dropped the redundant "Lab testing" link.
  Verified after: 22-route crawl clean, e2e funnel 0 fails both worlds,
  all gates green.
- [x] **10.13 THE GIFT** (done 2026-07-14, Chiya: hone.com "gift health"
  grammar — give a protocol, or send a link asking someone to cover
  yours). /gift + /gift/claim:
  · Give: choose a non-gated protocol (real 3/12-month one-time totals
    from the cadence engine) or a panel; concierge checkout via mailto —
    NO fake payment capture (real-money rule; Stripe/Bask pending).
  · Request: build your plan + first name → share link. The link carries
    identifiers only (item, term, name — never a price, never health
    data); the claim page re-derives everything from the catalog, and a
    tampered/unknown link fails soft.
  · Honesty as architecture: a gift covers the COST — recipient still
    completes their own intake, their physician can decline, and an
    unprescribed gift is refunded/applied (extension of the sitewide
    pay-only-if-prescribed promise). Giver never sees recipient health
    data. Gated (GLP-1) protocols excluded from gifting.
  · Entries: footer "Give as a gift", both gift doors on every stack
    buy box, sitemap 115 URLs, smoke 49/49.
  OPEN (needs Chiya): 6-month gift term (no 6-mo cadence exists in the
  catalog — needs a priced decision), real payment rails, gift-credit
  policy sign-off (refund/apply language), gift email/delivery flow.
- [ ] **10.10 BLOCKED ON CHIYA:** commitment-ladder framing ("first panel
  included" vs any % language), add-on/supplement tier, free cross-sell
  offer, protocol-tagged real testimonials.

## PARALLEL TRACK (blocked on Chiya)

- [ ] **P.1** Checkout backend: wire intake submission to Bask/MDI (needs
  account/API access). Until then checkout captures fail gracefully.
- [ ] **P.2** `V0_API_KEY` env var → design exploration loop.
- [ ] **P.3** Consolidate the second agent branch
  (claude/nexphoria-enterprise-overhaul-ld0sqd) into design/azure; one
  production lane.

## Working rules (unchanged)

Every step: gates green (tsc · build · smoke · audit:data · audit:design ·
audit:bundle · audit:funnel) → screenshot-verify → commit with WHAT/WHY →
push (CI deploys). One step at a time, in order. Never mark "done" without
browser proof.
