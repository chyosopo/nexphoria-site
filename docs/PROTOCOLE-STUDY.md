# The Protocole — reverse-engineering study → Nexphoria v2 direction

> Source: theprotocole.com (Framer site), studied 2026-07-06 at Chiya's
> direction: "Everything about it is exactly what I had in mind for
> Nexphoria." This document extracts the PATTERNS (palette temperature,
> type voice, section grammar, offer architecture) — never their copy,
> photography, names, or logo. Everything we ship remains Nexphoria's own
> words, own Bloom photography, own true claims.

## 1 · The positioning (why it feels different)

The Protocole sells **membership in a private clinic**, not products on a
shelf. Every surface repeats one emotional promise: *you are entering
something exclusive, calm, and physician-run.*

- "A new bond between science and self" — abstract, aspirational hero.
- "A PROTOCOLE. NOT A TREND." — anti-hype positioning band.
- "Membership by application only." — scarcity/exclusivity as trust.
- Concierge language: "white-glove care", "your care team".

**Nexphoria's honest equivalent of exclusivity:** physician approval is
real gating — "Not everyone is approved. A physician decides." We can own
that truthfully; we cannot claim application-only membership (we don't
have one — yet; membership is a business decision for Chiya).

## 2 · Design DNA (extracted from their CSS)

| Role | The Protocole | Temperature |
|---|---|---|
| Background | `rgb(242,241,236)` warm bone | warm, gallery-like |
| Ink | `rgb(43,10,11)` espresso-maroon | near-black with warmth |
| Secondary text | `rgb(77,68,66)` warm taupe | |
| Hairlines/cards | `rgb(224,222,214)` stone | |
| Muted | `rgb(173,157,153)` greige | |
| THE accent | `rgb(0,153,255)` electric blue | one cold spark on a warm field |

- Type: **Carbona VF** (modern grotesk, variable) for everything — one
  family, weight does the hierarchy. DM Sans/Inter fallbacks. CAPS
  micro-labels with wide tracking. No serif.
- The luxury feel = warm field + huge whitespace + ONE electric accent +
  grotesk discipline. (Nexphoria today: cool porcelain field + navy +
  serif display — institutional-bank, colder.)

## 3 · Homepage section grammar (theirs → ours)

1. **Minimal nav** (ABOUT · FAQS · LOGIN · GET STARTED) → we keep our 5-link
   law; consider trimming further on the front door.
2. **Abstract hero** — one poetic line + GET STARTED + exclusivity
   microcopy → ours: one line + "Start your assessment" + "A physician
   decides — not a cart."
3. **Positioning band** — "A PROTOCOLE. NOT A TREND." → ours: same
   register, own words (e.g. "A protocol. Not a purchase.").
4. **Three pillars** (Medical-grade / Clinical guidance / Concierge care)
   → we have these truthfully (503A compounding, physician review,
   support) — one calm 3-up band.
5. **Clinical & Scientific Board — NAMED physicians with photos and real
   credentials.** Their single strongest trust element. **We cannot
   fabricate this.** Needs Chiya: real names/credentials from the MDI
   network or advisors willing to be named. Until then our unnamed
   PhysicianGate stays.
6. **Education metaphor** ("your body is a city; peptides are couriers")
   → we write our own metaphor in bank-warm voice.
7. **How do I get started** — numbered steps WITH honest pricing
   footnotes (membership vs peptides sold separately, refund-if-declined)
   → adopt the footnote honesty pattern; we already have the promise
   component.
8. **Before/after testimonials** ("Real people. Real results.") — **cannot
   fabricate.** Placeholder until real member results exist.
9. **Membership pricing** ($600/yr or $60/mo; peptides from $200/vial,
   sold separately; first order without membership) — a BUSINESS MODEL
   decision for Chiya, not a design pattern. Our current model: protocol
   subscriptions with panel included.
10. **Protocol quartet with triads** — Youth (Glow·Energize), Mind
    (Focus·Sharpen·Thrive), Sculpt (Tone·Build·Define), Perform
    (Rebuild·Fortify·Excel) → maps 1:1 onto our flagship stacks + the
    CATEGORY_FEELING system we already built. Extend each goal with a
    3-word triad.
11. **FAQ with topic tabs** → we already have this.

## 4 · What we adopt now vs what needs Chiya

**Adopt now (patterns, token-sheet swap — architecture unchanged):**
- Warm-luxury token sheet: bone field, espresso ink, stone hairlines,
  ONE electric accent. Two worlds survive as accent casts (men: electric
  azure; women: warm orchid) on the shared bone field.
- Grotesk-led hierarchy option (General Sans already loaded; Fraunces
  reserved for rare editorial moments instead of every headline).
- Positioning band, three-pillar band, education metaphor, honest-footnote
  steps, protocol triads.
- Exclusivity-as-truth copy: physician approval framed as the gate.

**Blocked on Chiya (do NOT fabricate):**
- Named clinical board (real people + consent).
- Before/after testimonials (real members).
- Membership pricing model ($/mo club vs current subscriptions).

## 5 · Rollout

- v2 token sheet lands behind the existing `--nx-*` architecture (one
  file, reversible in one commit).
- FrontDoor rebuilt in the protocole grammar first; worlds + inner pages
  inherit the sheet immediately, then get their grammar passes.
- Every gate still applies (tsc · build · smoke · data · design · bundle ·
  funnel). Design-audit counts must not regress.
