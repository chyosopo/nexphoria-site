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

- [ ] **4.1** Rewrite key-page copy to the beat structure: feeling →
  possibility → proof → path. Bank voice, but warm. No feature lists
  above the fold.
- [ ] **4.2** Each goal gets its 3-word feeling line (e.g. Recovery:
  "Train like it never happened.") used consistently from tile → PDP →
  assessment.

## PHASE 5 — Trust weave (at decision points, not in wallpaper)

- [ ] **5.1** One trust system: physician presence (face + board
  certification + "can decline") appears exactly at decision moments —
  beside hero CTA, beside buy box, on checkout. Generic badge rows
  reduced to one per page.
- [ ] **5.2** The "if prescribed / no charge unless prescribed" promise
  becomes a single reusable component at every price display.
- [ ] **5.3 Pricing truth debt (found 2026-07-05).** Pricing.tsx and
  lib/protocols.ts carry a legacy pricing scheme (6-month prepay, save
  10/20/25%, "$249–$389/mo") that contradicts the real catalog
  (stacksCatalog cadences: 3-mo save 15%, 12-mo save 30%, protocols from
  $139/mo, solos from $149/mo). FAQ answer already re-derived from the
  catalog; Pricing page's tier model (Solo/Curated/Custom + 6-month
  plans) needs a full rebuild on FLAGSHIP_STACKS + pricing data. Also:
  unrouted legacy pages/Home.tsx still contains the stale claims —
  delete or rebuild. Flagship page → Atlas's lane, or next agent here.

## PHASE 6 — Speed to checkout

- [ ] **6.1** ≤3 clicks from any entry to price+buy: measured as an
  automated Playwright test that fails the build if a path regresses.
- [ ] **6.2** Sticky contextual CTA on long pages (mobile bottom bar
  already exists on PDPs — extend the pattern).

## PHASE 7 — Full-journey QA to 100%

- [ ] **7.1** Five personas walked end-to-end (skeptical newcomer, hims
  switcher, woman/skin, athlete/recovery, GLP-1 seeker), every step
  screenshotted mobile+desktop, every break fixed.
- [ ] **7.2** Final gate: every page passes the 5-second test + the
  one-action test.

## PARALLEL TRACK (blocked on Chiya)

- [ ] **P.1** Checkout backend: wire intake submission to Bask/MDI (needs
  account/API access). Until then checkout captures fail gracefully.
- [ ] **P.2** `V0_API_KEY` env var → design exploration loop.
- [ ] **P.3** Consolidate the second agent branch
  (claude/nexphoria-enterprise-overhaul-ld0sqd) into design/azure; one
  production lane.

## Working rules (unchanged)

Every step: gates green (tsc · build · smoke · audit:data · audit:design ·
audit:bundle) → screenshot-verify → commit with WHAT/WHY → push (CI deploys).
One step at a time, in order. Never mark "done" without browser proof.
