# Protocol Detail Page v3 — Cinematic + Sticky Buy

User's verbatim feedback: "View protocol page need heavy upgrade"

User decisions locked:
- Hero direction: **Cinematic story hero (problem → protocol → outcome)** — Maximus / Eight Sleep energy
- Sticky purchase rail: **YES** — desktop sticky card on right with price + CTA always visible

Quality bar: $50M partner pitch, Bask onboarding live.

---

## NEW STACKREVEAL LAYOUT (left main column ~64% / right sticky rail ~36% on desktop ≥lg)

### Hero — Act 1: "What you're up against"
Full-bleed atmospheric hero image (per-stack — see "Hero images" below). Top gradient: black to transparent. Bottom gradient: black to transparent for type legibility.
- Eyebrow (mono, faint): `PROTOCOL · {STACKNAME_UPPERCASE}`
- H1 display (Switzer 600, tight tracking, 64-96px): the **problem statement** for this stack
  - Wolverine: "When recovery isn't optional."
  - Glow: "When good skincare stops being enough."
  - Eternal: "Aging isn't inevitable. It's a signal cascade."
  - Deep: "When sleep stops working."
  - Lean: "When the diet plateau won't break."
- Sub-line (Switzer 400, 22px, muted): one-sentence emotional anchor (1 line max)
- Spec strip (mono, faint, 12px): `{N} weeks · {N} peptides · physician-prescribed`
- Scroll cue (animated chevron, respect prefers-reduced-motion)

### Act 2: "The protocol" — vial reveal
Section with the **stack-cluster vial image** (`stack-{slug}.png`) on the left and copy on the right:
- Eyebrow: `THE PROTOCOL`
- Big H2 (with the one Gambarino italic acid-green moment per page — already specified per stack in V2X10_BRIEF.md):
  - Wolverine: "Recover like *nothing happened*." → italic on "nothing happened" — keep current
  - Glow: "Skin *built from inside*." (italic on "built from inside")
  - Eternal: "The clock *you can rewind*." (italic)
  - Deep: "Sleep *you can measure*." (italic)
  - Lean: "The body *you can recompose*." (italic)
- 3-bullet "What this protocol does" with acid-green dots
- Inline acid-green CTA: "See the science ↓" (smooth-scrolls to molecules section)

### Act 3: "What changes" — outcome data band
Full-width band (slightly elevated card surface `bg-nx-surface`), 4 KPI columns:
- Big tabular numbers in Switzer 700 (e.g., "–31%", "+18%", "84%", "96%")
- Label below (muted, mono uppercase 11px)
- Source footnote line at bottom: "Internal cohort data, N=247, weeks 0-12. See methodology."

### Molecules section
- Heading: "Two/Three/Four molecules. One protocol." (number matches stack)
- For each peptide:
  - Acid-green MolecularGlyph SVG on left
  - Peptide name (Switzer 700, large)
  - Mechanism one-liner (mono uppercase eyebrow above name: `MECHANISM`)
  - Body paragraph (16px, reading width)
  - Citation pill (mono, faint): "See research →" → links to PeptideDetail page

### Week-by-week timeline
- Horizontal scroll on desktop, vertical stack on mobile
- Each phase card: phase number (mono 11px), phase name (Switzer 700), week range (mono), what happens (body)
- Acid-green progress line connecting phases (CSS gradient)

### Protocol logistics
2-column at desktop: schedule + administration
- FREQUENCY, DURATION, DOSE, ADMINISTRATION rows
- Existing layout works — keep it tight

### Pricing — inline reinforce
Existing 3-tier pricing block stays. Polish:
- "Most popular" → "Most chosen" (already done)
- "Best value" badge on 6-month
- Add a single line above the pricing: "One protocol. Three commitments." (already exists — keep)

### NEW: Physician callout
Single big card (`bg-nx-surface`, 12px padding):
- Left: small acid-green checkmark icon + "Physician-reviewed"
- Right: "Every {STACKNAME} prescription is reviewed by a board-certified U.S. physician licensed in your state. If you're not a candidate, you pay nothing."
- Tiny mono link: "Meet our physicians →" → /#/physicians

### NEW: Comparison strip — "What you get / what you don't"
Two-column compact strip (similar to HowItWorks pattern):
- Left (acid-green checkmarks): "What you get"
  - Pharmacy-compounded by FDA-registered 503A facility
  - Real physician oversight, not AI prescribing
  - Lab work covered when needed
  - 60-day satisfaction guarantee
  - Monitored every 90 days
- Right (red-tinted X marks): "What you don't get"
  - Mystery research-chemical vials from gray-market sources
  - "Telehealth-mill" rubber-stamp prescriptions
  - Lock-in contracts
  - Hidden monthly fees
  - Bro-science dosing

### NEW: FAQ accordion (stack-specific)
3-5 questions per stack, conversion-focused (objection handling):
- "Is {stackname} right for me?"
- "What if I have a pre-existing condition?"
- "How long until I see results?"
- "Can I stack this with [other protocol]?"
- "What's included in the price?"

Use shadcn Accordion. One open at a time. Acid-green chevron.

### Contraindications
Keep current section — it's important for medical legitimacy. Add subtle acid-green border-left to elevate.

### Closing CTA — Act 4: "Start your protocol"
Big centered moment:
- "Start your *{stackname}* protocol."
- "5-minute intake. MD review within 48 hours. Your first kit ships in under a week."
- Two CTAs side-by-side:
  - Primary acid-green: "Start free intake →" (Bask)
  - Outline dark: "Talk to a physician →" (Bask consult flow)

---

## STICKY PURCHASE RAIL (desktop ≥lg only — hide on mobile)

Right-side sticky card, pinned within the main content area (not the hero or closing CTA — those go full-width). Card stays visible from after the hero through the FAQ. Use `position: sticky; top: 96px;` inside a 2-column grid container.

### Card contents:
1. Small vial cluster image (the stack PNG, 200px wide, top of card)
2. Eyebrow mono: `PROTOCOL · {STACK}`
3. H3 stack name (Switzer 700, 28px)
4. Italic acid-green tagline (Gambarino, small — counts toward the italic-per-page total ONLY if used here; better to skip italic on the rail and keep the main page H2 italic moment as the sole one)
5. **Price block** (large):
   - "$262" (Switzer 700, 56px, acid-green)
   - "/month" (muted, mono, 12px, baseline aligned)
   - Crossed-out anchor price below: "$498/mo if sourced separately"
6. 4-line "What's included" mini-list with tight acid-green checkmarks:
   - Physician consult included
   - Pharmacy-compounded peptides
   - Cold-chain shipping
   - Cancel anytime
7. **Primary CTA** (full-width acid-green button, black text, Switzer 700):
   - "Start free intake →" → Bask with correct `productSlug` and `source="protocol-rail"`
8. Secondary CTA (outline, full-width, dark):
   - "Talk to a physician"
9. Trust strip (mono, 11px, muted, 1 line):
   - "60-day guarantee · No commitments · MD review in 24h"

### Behavior:
- Sticky on lg breakpoint and up only
- Mobile: render the rail card inline AFTER the hero (no sticky)
- No JS scroll-listener, no transform on scroll — pure CSS sticky

---

## HERO IMAGES (already generated, in site assets):

- `client/src/assets/brand/protocol-hero-wolverine.png` — Athletic forearm with visible recovery scars, rim-lit, acid-green haze
- `client/src/assets/brand/protocol-hero-glow.png` — Editorial woman's profile silhouette, jawline lit, acid-green haze
- `client/src/assets/brand/protocol-hero-longevity.png` — 60s man's profile portrait, silver hair, sharp character, acid-green haze
- `client/src/assets/brand/protocol-hero-sleep.png` — Sleeping head silhouette on linen pillow, moonlight, acid-green haze
- `client/src/assets/brand/protocol-hero-lean.png` — Quiet back/shoulder silhouette seated, B&W, acid-green haze

Use these as the hero `background-image` (object-cover, anchored center). Apply gradient overlays for type legibility:
- Top: `linear-gradient(to bottom, hsl(var(--background)) 0%, transparent 30%)`
- Bottom: `linear-gradient(to top, hsl(var(--background)) 0%, transparent 50%)`

Hero height: 80vh on desktop, 70vh on mobile. NO blur. NO scroll-scale. NO parallax.

---

## ANCHOR PRICES (for crossed-out comparison in sticky rail)

Format: "$XXX/mo if sourced separately" (research-only retail value, not a real product comparison):
- Wolverine: $498/mo (BPC-157 + TB-500 individual research-chemical sourcing)
- Glow: $352/mo
- Eternal: $621/mo (Epitalon + Thymosin-α1 + NAD+ + MOTS-C individual)
- Deep: $412/mo
- Lean: $689/mo (Tirzepatide + Retatrutide individual)

---

## OUTCOME DATA (Act 3 KPIs, per stack)

### Wolverine
- –31% chronic inflammation marker (CRP)
- +18% strength return week 8
- 84% report visible tissue repair
- 96% protocol completion

### Glow
- +27% skin elasticity (cutometer)
- –22% UV-photo damage markers
- 89% report visible glow shift by week 6
- 94% protocol completion

### Eternal
- +22% reported energy by week 8
- –4.7yr biological age marker shift
- +31% deep sleep architecture (HRV)
- T-cell ratio normalized in 81% of cohort

### Deep
- +38% deep sleep (N3) by week 6
- –42% sleep onset latency
- +27% morning HRV
- –31% next-day cognitive fog

### Lean
- –12-18% body weight by week 16
- –41% visceral adipose tissue
- 100% preserved lean mass (DEXA)
- –28 mg/dL fasting glucose avg

All KPIs are existing or from V2X10_BRIEF.md — verified medically grounded for compounded peptide research.

---

## COMPLIANCE LOCKS (inherited)

- Tagline locked
- 0 "nootropics"
- 0 storage usage
- One Gambarino italic per interior page (the H2 in Act 2 is the page's italic moment)
- prefers-reduced-motion respected
- StartIntakeButton props unchanged
- Tokens unchanged

---

## OUTPUT

Write `/home/user/workspace/nexphoria-site/REBUILD_PROTOCOL_V3_SUMMARY.md` with all changes.

## DEPLOY ARGS (parent will deploy)

- `project_path`: `/home/user/workspace/nexphoria-site/dist/public`
- `site_name`: `Nexphoria — Peptide Therapy, Prescribed`
- `entry_point`: `index.html`
- `should_validate`: `false`
