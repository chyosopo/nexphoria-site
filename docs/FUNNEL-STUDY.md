# The funnel study (2026-09-16): what the sources say, and what applies

Chiya, 2026-09-16: "watch this video … and … view transcript, learn how to
make our brand and site and everything in it the best possible way for this
industry; … be a good student and plan architect and build a billion dollar
funnel; … go out yourself and learn about peptides / telehealth / marketing /
psychology / branding / designing".

## What could and could not be read

The three videos named:

| video | who | what it is |
|---|---|---|
| youtu.be/v6DZbjnQqwU | Sabri Suby (King Kong; *Sell Like Crazy*) | "It Took Me 17 Years In Business To Learn These 7 Truths" |
| youtube.com/watch?v=yn1kEocp9Ek | Blake Toves with Mark Lombardi | "Launching a Telehealth Brand in 2026" |
| youtu.be/3_VEFdXm0sQ | Daniel Walton (patientacquisition.io) | "How to build an 8+ figure telehealth business" |
| youtube.com/@verneribrander | Verneri Brander (GrowthTrigger) | HIPAA-compliant email/SMS retention for telehealth |

YouTube refuses transcript requests from this sandbox's address (the
transcript API, yt-dlp and two transcript proxies all return "blocked" or
"sign in to confirm you're not a bot"). The titles came from YouTube's
oEmbed endpoint; the substance below comes from the authors' own published
material (Suby's book summaries, Walton's patientacquisition.io, Brander's
growthtrigger.xyz) and the telehealth-marketing guides the search
surfaced. If Chiya pastes a transcript, this file gets a second pass.

## The lessons, distilled to what the laws allow

**Suby (offer and funnel).** Give the most value up front; lead with a
High-Value Content Offer (education that builds desire and trust before
the ask); make one "Godfather" offer so complete the reader has no reason
to hesitate; write to one Dream Buyer; treat the site as a funnel that
moves a visitor up a purchasing pyramid, not a brochure. What applies:
the quiz IS our HVCO (three questions, a named goal, a medicine and its
price, no email gate). The "Godfather" offer is law 3's completeness
("One price a month. Everything within it."), never a discount. One
reader per page: the goal pages already speak to one person.

**Walton (telehealth acquisition).** Condition-specific landing pages that
mirror the ad (one goal, one page); the quiz as the primary conversion
action; the booking/intake funnel is where spend is wasted, so every
click between the ad and the visit must earn its place; reviews and
social proof as the default trust furniture. What applies: `/peptides?goal=`
and `/goals/:slug` are the condition pages; the quiz leads on every
surface; the buy box reaches checkout in ≤3 clicks (audit:funnel). What
does not: counts, ratings and reviews (law 3). Our trust furniture is
the fact: licensed physician, 503A pharmacy, the panel, cold shipping.

**Toves / Lombardi (launching in 2026).** From the published guides the
episode sits among: the 2026 GLP-1 regulatory reckoning (FDA warning
letters to telehealth marketers of compounded GLP-1s, March 2026), so the
compounded/non-approved disclosure and "if appropriate" are the licence
to operate, not fine print; white-label infrastructure (Bask, OpenLoop,
Fuse) means the site's job is brand and funnel, the engine is rented.
What applies: the FDA and 503A clauses stay on every product page
(audit:legitscript), the site never touches PHI.

**Brander (retention).** Retention is the growth lever: welcome,
abandoned-visit, post-purchase and refill flows produce most automated
revenue; lifecycle stages (onboarding → consultation → subscription →
reactivation); zero-party data (the goal a reader names) drives the
segments; HIPAA-compliant tooling (Klaviyo/Customer.io through Bask).
What applies here: the quiz's goal is the zero-party datum to hand to
the engine; the week-12 retest is the natural refill/retention moment;
the messaging-terms page (A2P) already carries the consent language. The
flows themselves live in the engine, not this repo.

## The architecture this implies (the punch list)

1. **One goal, one page, one medicine, one price** — the condition pages
   are the ad landing pages. Verified: `/peptides?goal=` filters; pending:
   per-goal hero copy and imagery on `/goals/:slug` in the cinema register.
2. **The quiz is the front door** — every pill on the site goes to /quiz.
   Verified (audit:funnel).
3. **The offer is complete, stated once** — the price card. Verified.
4. **Trust is fact, stated once per page** — the four tiles. Verified.
5. **Education before the ask** — the journal was retired (its routes
   redirect home); a mod.com-style article engine (one article per goal
   question) is pending and is Chiya's call: it needs a writer and a
   clinical reviewer, not a layer.
6. **Retention** — the week-12 retest and refill flows belong to the
   engine (Bask / OpenLoop); the site's part is the messaging consent.
   Pending on the engine side.
