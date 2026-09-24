# nuformhealth.com, studied (2026-09-24)

Chiya, 2026-09-24: "deep, deep, deep study the site and come back with
learnings on how we can implement to our site. Everything about it."

Method: home, sitemap and robots fetched; 26 pages fetched with a Chrome
UA and their copy dumped in page order; the Webflow stylesheet (1.8 MB)
read for fonts, palette and radii; 15 pages rendered live in Chromium at
1440 (four also at 390) and walked viewport by viewport; the home
localised (243 assets) and rendered offline. Screenshots and copy dumps
are in the session scratchpad, not committed.

## What Nuform is

A physician-owned hormone and metabolic telehealth clinic in Troy,
Michigan (Nuform Health and Wellness; co-founded by a neurosurgeon, Dr.
Christopher Elia DO, and a physician assistant, Romario Yousif PA-C).
Products: TRT, enclomiphene ("Formula T"), DHEA/pregnenolone, GLP-1 and
GLP-1/GIP "vitamin blends", Lipo-MIC B12, tesamorelin, sermorelin, NAD+,
glutathione, rapamycin, women's HRT, and diagnostic lab panels sold on
their own. Stack: Webflow (60 sitemap URLs, several test/orphan pages),
Splide sliders, Finsweet attributes, Lottie, Cookiebot, GTM, Meta and
TikTok pixels, Microsoft Clarity, Trustpilot widgets, a LegitScript seal,
and an intake form on a separate Next.js app (/form/become-nu).

## The business model, which is the real lesson

Nuform does not sell a subscription. It sells:

1. **One $170 annual physician fee** that "unlocks" a dedicated provider
   and a dedicated specialist with direct phone and SMS access.
2. **Medication in kits of 2 to 6.5 months**, never monthly, stated as a
   monthly rate with the kit total beside it ("$129/mo · $389 (3 month
   plan) · Billed in 3 increments. INCLUDES SUPPLIES & DOSE INCREASES").
   Their stated reason: "to prevent gaps or monthly drop-off issues, we
   do not offer monthly prescriptions or subscription plans."
3. **Blood work first**, at a Quest draw site near the patient (they say
   at-home kits "typically are not accurate"), with the panel sold
   standalone: 57 markers for $195, a 6-marker essential panel for $95.
4. **A check-in every four weeks** from the same two people, by text.
5. HSA/FSA accepted; nothing auto-renews; medication is non-refundable
   once ordered; the physician fee is refundable until the consult.

Everything on the site serves that model. The home's one job is to get
the reader into the three-minute intake; a specialist calls within 24 to
48 hours; the sale happens on the phone, not on the page.

## The page grammar

**Nav.** A gold announcement bar ("Tirzepatide and more, prescribed by
our physicians"), a sticky white bar, wordmark left, six links (Why
Nuform · Hormone Health · Weight Loss · Women's Health · Longevity ·
Diagnostic Labs), one navy pill GET STARTED. Hormone Health and Longevity
are dropdowns of medicines. On the phone: the pill and a burger; the
sheet lists nine numbered concerns (01 Hormone Optimization … 09 Anxiety
& Depression) that mostly link nowhere.

**Home, in order.** Hero (two-tone headline "*The Future You* / STARTS
TODAY", a line, GET STARTED + EXPLORE SOLUTIONS, a glass card of four
facts: physician founded, 1-on-1 care teams, licensed US pharmacies,
delivered to your door, over a photo of a couple in Nuform kit) → press
logos + HSA/FSA + Google 5.0 / Trustpilot 4.9 → six goal tiles (a hand
holding the vial, a serif goal name, pill chips per medicine) → four
product cards (category chip, name, one line, SEE PRODUCT DETAILS) →
"*How it* WORKS" (three steps beside a phone showing the intake, a
full-width GET PERSONALIZED TREATMENT bar) → "*Optimized* FOR HER" photo
tile → "*Uncover the Blueprint* TO YOUR HEALTH" (a marquee of 57
biomarker chips over a landscape) → "*Forget Normal* UNLOCK OPTIMAL" (a
testosterone counter animating to 1007 ng/dL, a tiny Jan→Feb line, a
"Did you know?" card) beside "*Personalized* TREATMENT" (a phone mockup
of a video visit) → Trustpilot review cards in a rail → "*Physician Owned*
& OPERATED" team grid (five circular b/w portraits with credentials) →
the founder's quote beside a family photo → footer (legal links, address,
phone, a privacy sentence).

**Why Nuform.** The argument page: "*You're not buying a box.* YOU'RE
BUYING A TEAM." → "*The faceless-clinic* PROBLEM" (nine pill chips: "You
fill out a form. You get a prescription. You log into a portal … Your
card gets charged. You start over.") → "Neurosurgeon co-founded" over a
family photo → "*Your team.* NOT A CALL CENTER." (four bullets) →
"*Honest pricing.* NO SUBSCRIPTION GAMES." with a Nuform vs Typical
Telehealth table (provider fee $170/year vs $200+/month; kits vs
auto-renewal; direct text vs portal; same provider yes vs rare; hidden
fees none vs common) → patient stories → reviews → six hairline FAQs →
"Start with the intake form. Your team takes it from there."

**Product page (TRT, weight loss).** Two columns: left the caps name, an
HSA/FSA tick, a lavender rule, three bold-lead bullets ("Clinically
tested, 503a and b certified…", "Micro-dosing, subQ or IM…", "Shipped
directly to your doorstep"), then a bordered pricing card per formulation
(small vial render, name, $/mo large, kit total + plan length, the
billing line, INCLUDES SUPPLIES), BOOK A HEALTH CONSULTATION; right a
Splide carousel of the product on fabric, Google/Trustpilot, AS SEEN ON.
Below: two outlined fact tiles ("ALL MEDICATIONS ARE DISPENSED FROM A
US-BASED 503A PHARMACIES", "CUSTOM DOSAGE PROTOCOLS"), a hexagon-overlay
anatomy photo with benefit rows and numbered citations, "View
References" (real journal citations: JCEM, NEJM), the three steps, FAQ
accordion, team grid, before/after stories, reviews, the founder quote,
and two disclaimer lines (GLP-1 risks; "not FDA-reviewed… compounded
medications are not FDA-approved").

**The newer pages** (/peptide-therapy, /sermorelin-therapy-offer,
/how-nuform-works) are a second design: Barlow Condensed caps with the
last line in blue, Manrope body, 01–04 numbered fact cards ("Licensed
clinician review · No prescription is written without one" / "Third-party
tested · every batch"), a blue-bordered compliance note under them, one
section per medicine with two plan cards (the recommended kit outlined
in blue), a navy founder band, and a footer with per-medicine
disclaimers. Their copy is the best on the site: "Sermorelin sends the
signal. It mirrors GHRH… Your own gland still does the work. The peptide
only asks." / "Worth saying plainly: this is gradual. Most people notice
sleep first, somewhere around weeks 4 to 8… If you're looking for a
same-week change, this isn't it."

## Type, colour, shape

- **Type.** The signature is a two-tone headline: an italic serif first
  line (PP Eiko) over a condensed bold caps second line (Roboto
  Condensed). Body is Neue Montreal; buttons and eyebrows are tracked
  caps (Archimoto, Eurostile Extended). The newer pages swap in Barlow
  Condensed and Manrope. Five display families on one site.
- **Colour.** White ground, navy #1d2540 for the pill and headings, one
  electric blue #1065e6 on the newer pages, lavender tints #eaecf8 /
  #c8cee3 for cards and the pricing highlight, greys, a gold #f5a623
  announcement bar, warm photography (beige fabric, sunset, family).
- **Shape.** Radii 7–20 px on cards, pills for chips and buttons, circles
  for portraits, a 1px lavender rule under product heads, glass cards
  over photos.
- **Motion.** Splide rails, Lottie icons, a count-up on the testosterone
  figure, the biomarker marquee, scroll reveals.

## What they do well

1. **A model you can state in one breath**: one annual fee, kits not
   subscriptions, blood first, the same two people, a check-in every
   four weeks. The "why" page argues it and the pricing cards prove it.
2. **Named humans with credentials**: five portraits, DO / PA-C / RN, the
   founder's own story ("I never understood hormone optimization until I
   suffered from it myself"), a family photo. The trust is the people.
3. **The blood panel as the product**: 57 markers as a marquee, "Being
   told your lab values are normal… to us, means nothing", the figure
   animating from "normal" to "optimal", the panel priced on its own.
4. **Kit pricing shown as two numbers**: the monthly rate large, the kit
   total and length beside it, the billing sentence under it, "includes
   supplies and dose increases". No hunting.
5. **Citations on the product page**: numbered benefits tied to real
   journal references. Informing, not claiming.
6. **The newer medicine copy** teaches mechanism in plain words and sets
   expectations ("gradual… sleep first… weeks 4 to 8").
7. **Compliance is visible**: 503A wording, "not FDA-approved", "not all
   patients qualify", per-medicine disclaimers, a refund policy split by
   service type, a LegitScript seal.
8. **Goal tiles that name the medicines** (chips inside the tile), so the
   reader sees the shelf before the click.

## What they do badly (and we must not copy)

- Three design generations on one site; five font families; copy blocks
  duplicated two and three times in the same page; sitemap full of test
  pages (test123-copy, new-page, welcome-to-nu-stg-copy); broken images
  and alt text on the newer pages; no meta descriptions; no structured
  data; a cookie wall; five trackers; 1.8 MB of CSS and ~130 scripts.
- Everything law 3 forbids: Google 5.0 / Trustpilot 4.9 ratings, review
  rails, before/after photos, "AS SEEN ON", "20% OFF PRODUCTS", "best
  pricing", "2 to 5X", "No gimmicks", "No hidden fees", "No subscription
  games", "Not a call center", "Typical Telehealth" comparison tables,
  "24-48 hours", "Shipped fast", "free shipping, cancel anytime".
- "At-home kits are not accurate" is a swipe at our model; our answer is
  the fact of the 24-marker panel and the week-12 retest, not a rebuttal.

## What to implement on ours, ranked

Each item below is allowed by the laws as written; the ones that need a
fact from Chiya say so.

1. **Say the model in one breath, on the home and the why page.** Ours
   exists but is scattered: one price a month, everything within it; a
   licensed physician on every order and every dose change; the
   24-marker panel included, read again at week 12; a person answers.
   Build a "how it is different" section that states these four as
   completeness (law 3), not as negation. Add a `/why` route in the
   cinema register with the four facts, the panel, the retest, the price
   card. No comparison table.
2. **The panel as a marquee.** We have `biomarkerPanel.ts`. Render the 24
   markers as chips in a slow marquee under "SET FROM YOUR BLOOD.", the
   way they render 57. It turns a number into a thing the reader can see.
3. **Pricing as two numbers on every plan tile.** The monthly rate large,
   the term total and length beside it, the billing sentence under it,
   "the blood test the term includes". Our buy box states this; make the
   two-number shape the default on the product hero and the card.
4. **Citations on the product page.** A numbered "References" block per
   medicine with real journal citations, and the benefit rows footnoted.
   Needs a clinical reviewer to supply the citations; the block and the
   footnote grammar can be built now against the existing `outcome` and
   `mechanism` fields.
5. **Mechanism-and-expectation copy per medicine**, in the newer Nuform
   register: what the signal is, what your body still does, what people
   notice first and when, and what it is not ("if you're looking for a
   same-week change, this isn't it"). Facts, not claims; law 3's
   "inform" made concrete. A copy pass over `soloCatalog.ts`.
6. **Goal tiles that name the medicines.** Add two or three medicine
   chips inside each goal tile on the home and in the nav panel, each a
   link to the product. We have the data (`liveCategories`, `SOLO_CATALOG`).
7. **The people.** Portraits and credentials of the prescribing physicians
   and the pharmacy. Blocked on the legal parties: the site names Arora
   Health & Aesthetics and VialsRX today; the OpenLoop question is still
   open. Do not build until Chiya confirms who the physicians are.
8. **HSA/FSA.** One fact line if true. Chiya to confirm with the engine.
9. **"Third-party tested, every batch."** One fact line if VialsRX (or the
   confirmed pharmacy) provides certificates of analysis. Chiya to
   confirm; never state it on inference.
10. **The check-in cadence.** Nuform promises a text every four weeks.
    Ours promises the week-12 retest and a person who answers. If the
    engine supports a scheduled check-in, state it once as a fact.
11. **A standalone panel.** They sell the blood panel on its own ($195 /
    $95). Ours is included in the first order; a standalone SKU is a
    business decision, not a design one.
12. **The intake as the front door.** Theirs is a separate app that ends
    in "a specialist will reach out within 24–48 hours". Ours is the quiz
    to a product to checkout. Keep ours; it is the shorter funnel (the
    audit:funnel gate holds it at three clicks).

## What to keep of ours against theirs

The single design system and twelve gates; the prerendered routes with
meta and JSON-LD; the self-hosted two-family type; the cinema photography
as one set; no cookie wall, no third-party pixels on the marketing site;
the facts stated once per page. Nuform's site would fail audit:design,
audit:voice, audit:a11y and audit:legitscript on its first run.
