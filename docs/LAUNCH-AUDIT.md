# NEXPHORIA LAUNCH AUDIT — 2026-07-21

Full-site readiness audit: engineering, UI, UX/journey, SEO, AEO, analytics,
conversion, trust, performance. Every claim below was verified against the
repo or a live Chromium run on the current build (design/azure @ 8dcf2a6).
Grades are launch-readiness, not effort.

| Dimension | Grade | One-line verdict |
|---|---|---|
| Engineering foundation | A− | 5-gate CI, 49/49 smoke, typed, data single-sourced |
| UI / visual system | A− | Tokens fully collapsed; porcelain palette coherent |
| UX & customer journey | B+ | ≤3-click funnel proven; post-submit journey ends at a wall |
| SEO (classic) | B | 36/36 routed pages meta'd, 115-URL sitemap; **no prerender** |
| AEO (answer engines) | C+ → B | llms.txt was drifted/harmful (fixed this audit); no prerender |
| Analytics | C+ | Excellent scaffold, 25 events; **zero vendors live** |
| Conversion (CRO) | B | Strong pricing/gift/exit surfaces; no email nurture rail |
| Trust & compliance | B− | Legal pages solid; LegitScript pending; no testimonials (blocked, honest) |
| Performance | B+ | Entry ≤300KB, recharts banned, Bloodwork lazy; images heavy on some pages |
| **Launch blockers (Chiya)** | — | Payments/Bask, GA4 ID, CF token, LegitScript — see §10 |

---

## 1 · Engineering foundation — A−

**Verified:** tsc 0 errors · smoke 49/49 routes · data-drift audit clean at
three layers (prices, stacks, sitemap) · design audit at historic best
(fontSize 3 · radius 3 · shadow 7 · transition 0) · funnel gate: every entry
reaches price+buy ≤3 clicks in real Chromium · CI runs all gates on every
push and auto-deploys gh-pages · manual-trigger apex deploy workflow exists
(needs CLOUDFLARE_API_TOKEN secret).

**Gaps:** the 4 Express API routes (waitlist/contact/intake-click/checkout)
don't run on static hosting — all client paths fail HONESTLY (verified), but
production needs either serverless ports or Bask/MDI wiring. No error
tracking (Sentry or similar) — a production JS error today is invisible.

## 2 · UI / visual system — A−

The system is now genuinely tokenized: one type ladder (10 steps + 2xs), one
section rhythm (3 tokens, fluid, shared by inline styles AND tailwind), one
caps-tracking scale, one radius ladder, cool porcelain palette with the warm
ivory fully retired, world theming (azure/rose) via a single accent variable,
footer wordmark signature. 17 routes verified overflow-free at 390px.

**Gaps:** ~10 remaining warm-cast photos (tesamorelin, bpc157, semax stills;
some lifestyle frames) queued for the next Bloom pass. BenefitTile metric
variant still carries 2 off-ladder conditional clamps (cosmetic).

## 3 · UX & customer journey — B+

### The journey as built (both worlds, verified click-through):

```
AWARE      front door → world select (men/women, fully themed)
ORIENT     world home: goal grid (3×2) → biomarker proof → formulary → gift band → FAQ
CONSIDER   goal page: 3 routes compared (protocol/compound/physician-decides)
           + protocol selector chips · PDP: dose/format, cadence ladder,
           what's-included, safety, panel gate, gift doors
DECIDE     pricing: 3-path compare, panel tiers, cadence calculator,
           "composition of the price" · bloodwork: panel picker quiz
COMMIT     assessment (goal pre-filled from URL) OR cart → checkout
           (3 steps, no card — physician-first, honest about billing)
AFTER      ❗ submit → "physician will review" → **nothing else exists**
```

**Strengths:** the two-worlds split is real (imagery, copy register, accent),
self-selection surfaces everywhere (route cards, panel picker, cadence calc),
honesty-as-architecture (declines possible, failure paths keep drafts and
give mailto fallbacks), gift loop complete with tamper-safe links.

**Gaps (ranked):**
1. **Post-submit void.** No confirmation email, no "what happens next"
   timeline page after intake submit, no way to check status. Highest-impact
   UX gap — P0 with Bask wiring, or interim: a /what-happens-next page the
   thank-you state links to.
2. **No email nurture rail.** Waitlist/exit-intent capture exists but goes to
   repo SQLite (staging) — no ESP (Loops/Klaviyo/Resend), no welcome
   sequence. Captured emails currently go nowhere a human reads. P0.
3. **No persistent world memory.** Returning direct to /pricing forgets the
   visitor's world (defaults shared). Small; localStorage fix.
4. Journal content is strong but has no capture (no inline "get the
   protocol" or email gate on long articles). P2.

## 4 · SEO (classic) — B

**Verified strong:** 36/36 routed pages call useSeo (title/desc/canonical/OG
set imperatively); build-time sitemap (115 URLs, all 200-verified in a prior
crawl); robots.txt correct (carts disallowed); clean URL structure (no more
hash routing); comparison/SEO articles exist (vs-testosterone,
vs-ozempic, etc.); JSON-LD: Organization, MedicalBusiness, Physician,
Product+Offer, FAQ Question, HowToStep, ItemList, WebSite.

**Gaps (ranked):**
1. **No prerendering.** The site ships one index.html shell; all content is
   client-rendered. Googlebot renders JS (eventually, at crawl-budget cost),
   but every other crawler — Bing's freshness pass, social unfurlers beyond
   the static defaults, and ALL LLM crawlers — sees an empty page. A
   build-time prerender (Playwright walk of the 115 sitemap URLs → static
   HTML snapshots) is the single highest-leverage SEO/AEO item on this list.
2. **One OG image for every page.** Per-page og:image (product frames for
   PDPs, protocol art for stacks) would lift social/message CTR. P1, partly
   automatable from existing art.
3. Journal articles lack Article/MedicalWebPage schema + author entity
   (E-E-A-T: the named Medical Director is blocked on Chiya, but the schema
   scaffold can ship now). P1.
4. No Search Console / Bing Webmaster verification tokens in the repo. P0
   at apex cutover (5 minutes, needs Chiya's accounts).

## 5 · AEO (answer engines: ChatGPT, Perplexity, Claude, Gemini) — C+ → B

This is where the next cohort of high-intent traffic comes from ("best
physician-supervised peptide program", "BPC-157 legit telehealth").

**Verified strong:** robots.txt explicitly welcomes 13 AI crawlers (GPTBot,
ClaudeBot, PerplexityBot, Google-Extended…); llms.txt exists; FAQ content is
extractive and well-structured; institutional copy is quotable.

**Was broken — FIXED in this audit:** llms.txt had drifted catastrophically:
it advertised four stacks that don't exist (Restore/Clarity/Prime/Balance),
wrong formulas for real ones, and 37 dead hash-URLs. An LLM citing us would
have cited fiction. llms.txt is now GENERATED at build time from the
canonical catalogs (script/genLlms.ts), same pattern as the sitemap — it can
never drift again.

**Remaining gaps:** prerender (item 4.1 — LLM crawlers don't run JS; today
they see llms.txt and nothing else); an /about#medical-director entity
(blocked on Chiya naming one); Q&A-shaped headings on PDPs (partially done).

## 6 · Analytics — C+

**Verified:** a genuinely good scaffold — single track() choke-point,
25 distinct events already instrumented across the full journey:
world_selected, goal_selected, selector_pick, product_viewed, panel_pick,
cadence_calc, intake_started/cta, checkout_step/submitted (+ honest
checkout_capture_unavailable), gift_entry/mode/item_selected/link_copied/
claim_started, comparison_viewed, ebook_requested, page_view (SPA-aware,
double-count-proofed GA4 bootstrap behind VITE_GA4_ID).

**The gap: none of it goes anywhere.** No GA4 ID (blocked on Chiya), no
product-analytics vendor, no web-vitals, no error tracking, no session
replay, no ad pixels.

**Recommended stack (launch week):**
- **GA4** (free) — flip VITE_GA4_ID; every event lights up. P0, 5 min.
- **PostHog** (free tier: replay + funnels + retention) — one snippet; the
  scaffold already forwards to window.posthog. P0, 30 min. Funnels to build
  day one: world→goal→route→PDP→cadence→intake_started→checkout_submitted;
  gift_entry→link_copied→claim_started; panel_pick→intake.
- **web-vitals** → track() (LCP/CLS/INP as events, segmented by route). P1.
- **Sentry** (or GlitchTip) for JS errors. P1.
- **Meta/TikTok pixels** only when paid starts; consent banner first. P2.
- KPI tree: north star = physician-approved protocols/wk. Leading:
  assessment starts, start→submit rate, PDP→cadence-pick rate, gift links
  created, exit-intent capture rate.

## 7 · Conversion (CRO) — B

**Strong:** ≤3-click price proof; consult-priced fallbacks ("From $159 · if
prescribed"); cadence ladder with honest annual math; panel-picker quiz;
exit-intent modal; announcement bar; gift = a second payer path; sticky buy
rail; mobile buy bar; investment-frame pricing voice.

**Gaps:** no A/B capability (PostHog flags solve free); no social proof
(testimonials blocked on Chiya — correctly not faked); no urgency mechanics
(correct for the brand — do NOT add); waitlist has no double-opt-in or
delivery (ESP item); no referral loop beyond gift (P2: "covered by"
attribution on gift claims).

## 8 · Trust & compliance — B−

**Verified:** Terms, Privacy, Telehealth Consent, Refund Policy, Prescribing
Policy, State Availability, HIPAA notice pages all live and linked; FDA/
research disclaimers on every footer; "if prescribed" discipline sitewide;
PHI boundary held (goal stripped from waitlist payloads; mailto fallbacks
carry contact fields only — re-verified this session).

**Gaps:** LegitScript shows "pending verification" (real cert is a Chiya
process; the badge copy is honest); no named Medical Director (blocked);
privacy policy needs a final pass by an actual lawyer before paid traffic;
cookie/consent banner needed BEFORE any ad pixel ships (not needed for
GA4-only in most US states, but required the day Meta pixel lands).

## 9 · Performance — B+

**Verified:** entry JS ≤300KB budget enforced by gate; recharts banned from
entry; Bloodwork's 420KB chunk lazy-loads; modulepreloads capped at 4;
images webp with srcset on rail/tile surfaces; fonts self-hosted woff2.

**Gaps:** several hero images are 300-500KB (acceptable on fast, heavy on
LTE) — an -800w companion pass for the newest frames + fetchpriority=high on
LCP heroes would firm up mobile LCP. No live vitals data until web-vitals
ships. Run PageSpeed on the apex after cutover — CF Pages' CDN will beat
gh-pages.

## 10 · Launch blockers — decisions/actions only Chiya can make

| # | Blocker | Unblocks |
|---|---|---|
| 1 | **Bask/MDI account + API wiring** | Real intake → physician → payment. THE launch gate. |
| 2 | **CLOUDFLARE_API_TOKEN repo secret** (or Atlas deploy) | Apex publish (workflow ready, one click after) |
| 3 | **VITE_GA4_ID** (create GA4 property, 10 min) | All 25 events live |
| 4 | **ESP choice** (Loops/Klaviyo/Resend) | Email capture actually captures |
| 5 | LegitScript application | Trust badge → real cert |
| 6 | Named Medical Director | E-E-A-T entity, physician schema, About |
| 7 | Payment rails decision (Stripe vs Bask-only) | Gift one-time payments |
| 8 | Search Console + Bing verification | Index monitoring from day 1 |

---

# THE LAUNCH PLAN

## P0 — before the apex is announced (this week, mostly Sandbox/Atlas)
1. ~~llms.txt regenerated from canonical data~~ ✅ done this audit
2. **Prerender pipeline**: build-time Playwright walk of sitemap URLs →
   static HTML per route into dist/public (SEO + AEO in one stroke). Sandbox.
3. **Apex deploy**: Chiya pastes CF token (or Atlas runs the Mac deploy);
   run the Deploy Apex workflow; verify deep links + Search Console submit.
4. **GA4 + PostHog live** (needs blockers #3, #4): flip the IDs, build
   the two core funnels, set the KPI dashboard.
5. **ESP wired**: waitlist/exit/footer capture → real list + welcome email.
6. **Post-submit page**: "What happens in the next 48 hours" timeline the
   checkout/assessment thank-you states link to. Sandbox, half a day.
7. Sentry (or self-hosted GlitchTip) on the client. Atlas or Sandbox.

## P1 — launch week
8. Per-page OG images (PDP product frames, stack art) — automatable.
9. Article/MedicalWebPage + author schema on Journal; sameAs org links.
10. web-vitals → track(); watch LCP on 4G for the hero pages.
11. Imagery pass 2: remaining warm frames (tesamorelin, bpc157, semax,
    lifestyle warm casts) + -800w companions for new frames.
12. World memory (localStorage) + returning-visitor "continue where you
    left off" chip on the front door.
13. Consent banner scaffold (dormant until pixels exist).

## P2 — first month after launch
14. A/B via PostHog flags: hero line, goal-grid order, pricing H1.
15. Referral/gift attribution loop ("X covered yours — pay it forward").
16. Journal capture units + 2 new comparison articles (vs TRT clinics,
    vs compounding-pharmacy-direct).
17. Session-replay review cadence: watch 20 replays/wk, fix top friction.
18. Testimonials + Medical Director page the moment Chiya unblocks them.
19. Structured retest-outcomes content (aggregate, de-identified, honest)
    once real cohort data exists — the ultimate AEO asset.

*Standing law reminder: nothing here is "done" — every shipped item returns
to this file as a checked line with its verification evidence.*
