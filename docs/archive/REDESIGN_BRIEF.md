# Nexphoria $50M Redesign — Hard Gate + Dual-Experience Architecture
**Version:** FINAL · 2026-06-30 · Replaces all prior briefs in this directory.

## The vision in one paragraph

Nexphoria is a **peptide pharmacy**. Doctor-prescribed, sterile-compounded in licensed 503A US pharmacies, blood-tested, ready to inject. The website tone is **Goldman Sachs quiet authority** — we lead with the offer (blood work, MD oversight, 503A compounding), never with defensive framing about China or anyone else. The visual reference is **Maximus Tribe** (maximustribe.com) — clean clinical white, large serif rotating-word hero, big lifestyle photo cards, doctor strip, FAQ accordion, dark navy footer.

The structural breakthrough: a **hard gate** on `/` asks "For her" or "For him" before showing any product. Each path opens into a **fully tailored experience** (`/women` or `/men`) with its own hero photography, flagship stack, dropdown nav, copy, doctor headshots, and outcome charts. Shared informational/legal pages live at the root.

---

## Brand essence (verbatim quotes from the founder)

> "I want it to look like a biohacking peptide pharmacy."
> "We basically sell the the results on how crazy it's really is."
> "I want a customer to spend 1500 a month as much as possible but to be in a full stack of Fifties... accessible to ordinary people in their 30 to 60."
> "Just like Maximus for peptides for Nexphoria. Maybe it should be very like gated, type first patient be men or woman... complete separate experience. Nice picture of a female and a man."
> "We lead with subtle trust like Goldman Sachs wouldn't say trust me. We lead with our offer: blood work, MD, 503A compounded."

## Locked CONSTRAINTS — non-negotiable

- NEVER use the word "nootropics" — always "peptides"
- NEVER claim "first peptide pharmacy" or any "first" superlative
- NEVER use defensive framing about China, powders, mixing, or competitors
- NO localStorage, sessionStorage, indexedDB, cookies — they crash in the sandboxed iframe
- All animations respect `prefers-reduced-motion`
- About page is mission-first — no founder photos or bios
- StartIntakeButton props (`productSlug`, `source`) must be preserved on every CTA
- Deploy via `pplx-tool deploy_website` only — never Vercel
- All copy in US English

---

## Architecture — the 20+ routes

```
/                          → HARD GATE (For her / For him only — no other content)
/women                     → Female homepage (Maximus-tier, fully tailored)
/women/peptides            → Female peptide catalog (filtered to female-tuned protocols)
/women/peptides/[slug]     → Peptide detail page (female context, female outcomes)
/women/protocols           → Stacks built for women
/men                       → Male homepage (Maximus-tier, fully tailored)
/men/peptides              → Male peptide catalog (filtered to male-tuned protocols)
/men/peptides/[slug]       → Peptide detail page (male context, male outcomes)
/men/protocols             → Stacks built for men
/how-it-works              → Shared 5-step process
/science                   → Shared mechanism-of-action page
/physicians                → Shared medical advisory team
/lab-testing               → Shared blood panel offering
/pricing                   → Shared pricing transparency
/faq                       → Shared FAQ accordion
/about                     → Shared mission-first about
/community                 → Shared Discord/eBook capture
/contact                   → Shared contact
/assessment                → Intake form (asks sex first, then routes to /women or /men sub-questions)
/legal/terms               → Terms of service
/legal/privacy             → Privacy policy
/legal/telehealth-consent  → Telehealth consent
/legal/refund-policy       → Refund policy
/not-found                 → 404
```

**Routing rule:** Direct visits to `/` always show the gate, no redirect. Visits to `/women/anything` or `/men/anything` skip the gate entirely.

---

## Design tokens (locked — every file uses these)

### Color
```css
--nx-bg:           #FFFFFF;   /* primary canvas */
--nx-bg-cream:     #FAFAF7;   /* trust strip + section alternation */
--nx-bg-dark:      #0A0A0A;   /* footer only */
--nx-fg:           #0A0A0A;   /* primary text */
--nx-fg-graphite:  #4A4A4A;   /* secondary text, sub-headlines */
--nx-fg-muted:     #8A8A8A;   /* tertiary, captions */
--nx-border:       #E5E5E2;   /* hairline borders */
--nx-cobalt:       #1747D6;   /* the ONE accent — CTAs, underlines, eyebrows, chart fills */
--nx-cobalt-hover: #0E33A8;   /* hover state */
--nx-cobalt-soft:  #E8EEFB;   /* chart background fills, hover surfaces */
--nx-success:      #1D6F42;   /* outcomes trending positive */
--nx-warning:      #C2440E;   /* outcomes trending negative (which is good for body fat etc) */
```

NO greens (except success). NO acid lime. NO oxblood. NO bronze. NO forest. Cobalt is the one accent. Period.

### Typography
```css
--nx-font-serif:   'Canela', 'Playfair Display', 'EB Garamond', Georgia, serif;
--nx-font-sans:    'Inter Tight', 'Inter', system-ui, sans-serif;
--nx-font-mono:    'JetBrains Mono', ui-monospace, monospace;
```

Load Inter Tight + Playfair Display + JetBrains Mono from Google Fonts via `<link>` in `index.html`. Canela is aspirational (paid) — use Playfair Display as the free substitute.

**Type hierarchy:**
| Role | Font | Size | Weight | Where |
|---|---|---|---|---|
| Hero headline | Playfair Display | 80px desktop, 48px mobile | 500 | `/women`, `/men` hero |
| Hero italic rotating word | Playfair Display Italic | same as headline | 500 | Inside hero, w/ cobalt underline |
| Section heading | Playfair Display | 40px desktop, 28px mobile | 500 | Section h2 |
| Sub-headline | Inter Tight | 18px | 500 | Below hero headline |
| Body | Inter Tight | 16px | 400 | All body copy |
| CTA | Inter Tight | 14px | 600 | Buttons (uppercase, tracking 0.05em) |
| Eyebrow / Label | JetBrains Mono | 12px | 500 | Above sections, in mono caps, often cobalt |
| KPI value | Inter Tight Tabular | 32px | 700 | Biomarker chart values |
| KPI label | JetBrains Mono | 10px | 500 | Below KPI values (mono caps graphite) |
| Card overlay (italic) | Playfair Display Italic | 44px | 500 | Flagship card overlays (e.g. "Lose weight") |
| Card banner | JetBrains Mono | 12px | 500 | Cobalt banner at bottom of flagship cards |

NO Switzer. NO Gambarino. NO Helvetica. NO Roboto.

### Spacing & rhythm
- Section vertical padding: 96px desktop, 64px mobile
- Container max-width: 1280px, 24px horizontal padding mobile, 48px desktop
- Border radius: 16px for flagship cards, 8px for buttons, 12px for biomarker dashboards
- Hairline borders: 1px solid `--nx-border`

---

## The Gate (`/`) — exact spec

**ONLY content on this page:**
- Sticky nav (same as /women and /men but with NO dropdowns visible — links route to /women and /men gates)
  - Left: NEXPHORIA wordmark + cobalt PEPTIDE PHARMACY sub-mark + cobalt dot
  - Center: "For Women", "For Men", "How It Works", "Science", "Lab Testing"
  - Right: START INTAKE (cobalt pill), SIGN IN (ghost pill)
- 24px below nav: tiny mono caps centered eyebrow: `NEXPHORIA · PEPTIDE PHARMACY`
- 16px below eyebrow: small italic serif centered: `Choose your protocol`
- 48px below: two enormous side-by-side full-bleed photo cards, 50/50 split, fills rest of viewport
  - Left card → routes to `/women` on click
    - Photo: woman, mid-30s, athletic, beautiful natural light, minimalist setting
    - Bottom-left overlay: `For her.` (italic serif, 84px, white)
    - Below it: `PEPTIDES BUILT FOR WOMEN →` (mono caps, 14px, white)
  - Right card → routes to `/men` on click
    - Photo: man, late-30s, lean/athletic, beautiful natural light, minimalist setting
    - Bottom-left overlay: `For him.` (italic serif, 84px, white)
    - Below it: `PEPTIDES BUILT FOR MEN →` (mono caps, 14px, white)
  - Thin vertical hairline divider between cards
- NO footer on the gate
- NO scroll content below the cards

**Mobile:** Stack vertically. Each card takes 50vh. Same overlays.

**Photo source:** `/home/user/workspace/direction-V1-gender-gate.png` — crop the two halves and use them as the two card images. Or split into `/public/images/gate-her.jpg` and `/public/images/gate-him.jpg` from that source.

---

## `/women` homepage — section-by-section

### 1. Top nav (sticky)
- Left: NEXPHORIA + cobalt PEPTIDE PHARMACY + cobalt dot. **Clicking the logo returns to `/` (the gate).**
- Center dropdowns: **Weight Loss · Skin & Recovery · Longevity · Hormones · Hair · How It Works**
- Right: START INTAKE (cobalt pill), SIGN IN (ghost pill)

### 2. Hero (matches `/home/user/workspace/direction-W1-women-hero.png`)
- Left 60%:
  - Mono caps cobalt eyebrow: `NEXPHORIA · FOR WOMEN`
  - 24px below: large serif headline:
    ```
    The standard of
    care for [italic-rotating-word]
    ```
  - Rotating italic word with cobalt underline, words cycle every 5.5s (fade transition, 600ms easeOut, pause on hover, respect prefers-reduced-motion):
    `skin → weight loss → longevity → hormones → recovery → hair`
  - 32px below: sub-headline (Inter Tight 18px graphite):
    > Doctor-prescribed peptides for women. Compounded in licensed 503A pharmacies. Ready to inject.
  - 32px below: two CTAs (cobalt + ghost): `START INTAKE →` and `BROWSE PEPTIDES →`
- Right 40%:
  - Biomarker dashboard card (white, hairline border, 12px radius, 24px padding):
    - Mono caps cobalt header: `MEMBER OUTCOME 12 WEEK PROTOCOL` + cobalt `DAY 84` chip
    - Title: `GHK-Cu Protocol — Skin Elasticity (Weekly Score)`
    - Bar chart (Recharts): 12 bars, cobalt fill with gradient lighter→darker, y-axis 0-100, x-axis weeks 0-12, light dashed gridlines, cobalt accent
    - Footer: tiny mono caps graphite `TRUSTED BY 2,400 FOUNDING MEMBERS`
  - **Chart swaps with rotating word** — when "skin" is up, show elasticity bars; when "weight loss" is up, show body comp line; "longevity" → bio age line; "hormones" → estradiol bars; "recovery" → CRP/sleep score; "hair" → hair count line

### 3. Trust strip (full-width, cream background `--nx-bg-cream`, 80px tall)
Four hairline-bordered cells, monoline cobalt icons + mono caps labels + graphite sub-labels:
| Icon | Label | Sub-label |
|---|---|---|
| Stethoscope | MEDICAL EVALUATION | Board-certified US physicians |
| Pharmacy vial | STERILE COMPOUNDING | FDA-registered 503A pharmacies |
| Cold-chain box | CLINICAL READINESS | Cold-chain ready-to-inject delivery |
| Lab flask | TESTED | Blood labs pre and post |

### 4. Flagship protocols (matches `/home/user/workspace/direction-W2-women-cards.png`)
- Mono caps cobalt eyebrow: `FLAGSHIP PROTOCOLS FOR WOMEN`
- Three side-by-side portrait cards (16:9 wide layout splits to 3-up at 1280+, stacks vertically at <768px):
  | Card | Italic overlay | Cobalt banner |
  |---|---|---|
  | Walking woman, neutral athletic wear, morning light | `Lose weight` | `STARTING AT $249/MO · TIRZEPATIDE SEMAGLUTIDE` |
  | Woman applying skincare, soft daylight, vanity setting | `Glow skin` | `STARTING AT $199/MO · GHK-Cu BPC-157 TB-500` |
  | Woman waking, white linen, morning peace | `Live longer` | `STARTING AT $299/MO · NAD+ MOTS-c EPITALON` |
- Cards link to `/women/protocols/weight-loss`, `/women/protocols/skin`, `/women/protocols/longevity`

### 5. Maximus-style split section #1 — Weight Loss
- Left 50%: copy
  - Mono caps cobalt eyebrow: `GLP-1 + GIP`
  - Heading: `Lose weight. Hold the muscle.` (Playfair 40px)
  - Sub: `GLP-1 and GIP weight loss guided by US physicians.`
  - CTA: `SEE MY OPTIONS →`
  - Goal selector — 4 pill buttons (visual only, hash to assessment):
    - Lose those last 5-10 lbs
    - Lose belly fat
    - Manage cravings
    - All of the above
  - Three product cards (Tirzepatide $249, Semaglutide $149, Brand-name $199) — each with cobalt `Starting at $X →` link
- Right 50%: lifestyle photograph of a woman + biomarker chart overlay (body fat 28% over 18 months — line chart, cobalt area fill)

### 6. Maximus-style split section #2 — Skin & Recovery
- Same layout as #1, flipped
- Eyebrow: `GHK-Cu · BPC-157 · TB-500`
- Heading: `Repair skin, joints, gut.`
- Sub: `The recovery stack that works at the cellular level.`
- KPI strip: `SKIN ELASTICITY +34% · WOUND HEALING +47% · INFLAMMATION -38%`
- Photo: woman in vanity/skincare setting

### 7. Maximus-style split section #3 — Longevity
- Eyebrow: `NAD+ · MOTS-c · EPITALON`
- Heading: `Live longer. Feel younger.`
- KPI strip: `BIO AGE -3.2 YRS · DEEP SLEEP +28% · MITOCHONDRIAL +22%`
- Photo: woman in restful morning light

### 8. Physician network strip
- Mono caps cobalt eyebrow: `MEDICAL ADVISORY`
- Heading: `Designed by US board-certified physicians.`
- Sub: `Every Nexphoria protocol is reviewed and prescribed by licensed US physicians, board-certified in internal medicine, endocrinology, and integrative health.`
- Row of 5 anonymized doctor cards (headshot + name + credentials + university). Mission-first per founder's About-page rule — these are advisory team, not founders.
  - Dr. M. Chen, MD — Internal Medicine, UCSF
  - Dr. S. Patel, MD — Endocrinology, Cleveland Clinic
  - Dr. J. Reyes, MD — Integrative Medicine, Mayo Clinic
  - Dr. R. Okafor, MD — Family Medicine, Johns Hopkins
  - Dr. L. Bennett, MD — Anti-Aging Medicine, Stanford
- Photos: gender-balanced, professional headshots, clean neutral backgrounds. Generate placeholder headshots.

### 9. FAQ accordion
Questions (each opens to a 2-3 sentence answer):
- What is a peptide?
- How does a Nexphoria prescription work?
- Why a 503A pharmacy?
- What's in my blood panel?
- Are the peptides FDA-approved?
- Can I use insurance?
- How is shipping handled?
- What happens if I want to stop?

### 10. Discord + eBook CTA (two-column)
- Left: `Join the Nexphoria Discord.` + cobalt `Join the conversation →`
- Right: `The Peptide Field Guide.` + email capture + cobalt `Get the guide →`

### 11. Footer (dark `--nx-bg-dark`)
- Left: white NEXPHORIA wordmark + cobalt PEPTIDE PHARMACY sub-mark
- Email capture: `Early access to new protocols, research, and member-only pricing.`
- Four columns:
  - WEIGHT LOSS: Tirzepatide, Semaglutide, Brand-name GLP-1s, All weight loss
  - SKIN & RECOVERY: GHK-Cu, BPC-157, TB-500, All recovery
  - LONGEVITY: NAD+, MOTS-c, Epitalon, Sermorelin, All longevity
  - COMPANY: About, Physicians, Science, How it works, Lab testing, FAQ, Contact, Careers
- Bottom row: `© 2026 Nexphoria · Terms · Privacy · Telehealth Consent · Refund Policy · LegitScript Approved`
- Social icons (white): Discord, Instagram, YouTube, X

---

## `/men` homepage — section-by-section

Mirror of `/women` with these specific differences:

### Nav dropdowns
**Performance · Testosterone · Weight Loss · Recovery · Longevity · Hair · How It Works**

### Hero eyebrow / rotating words
- Eyebrow: `NEXPHORIA · FOR MEN`
- Rotating: `performance → testosterone → weight loss → recovery → longevity → hair`
- Default chart on right: IGF-1 line chart 100→210 ng/mL (matches `direction-M1-men-hero.png`)

### Flagship cards (matches `direction-M2-men-cards.png`)
| Card | Italic overlay | Cobalt banner |
|---|---|---|
| Man kettlebell, gym, focused | `Build strength` | `STARTING AT $299/MO · CJC-1295 IPAMORELIN` |
| Man kitchen, lean, 40s | `Lose weight` | `STARTING AT $249/MO · TIRZEPATIDE SEMAGLUTIDE` |
| Man 50s, outdoor, composed | `Live longer` | `STARTING AT $299/MO · NAD+ MOTS-c EPITALON` |

### Split sections (3 sections, in order)
1. **Performance & Growth Hormone** — CJC-1295/Ipamorelin/Tesamorelin, IGF-1 chart 142→209 ng/mL, KPIs: `LEAN MASS +11.3 lb · VO2 MAX +19% · IGF-1 +47%`
2. **Testosterone / TRT-Adjacent** — Enclomiphene/Kisspeptin, Total T chart 380→1180 ng/dL, KPIs: `TOTAL T +210% · LIBIDO 8.4/10 · MOOD 7.8/10`
3. **Weight Loss + Body Comp** — Tirzepatide/Semaglutide, body fat 24%→17% over 24wk, KPIs: `BODY FAT -18% · WAIST -4.3 in · A1C -1.2 pts`

### Physician strip
Same 5 doctors as `/women` (shared advisory team across both experiences).

### FAQ + Discord + Footer
Identical structure to `/women`, footer columns reflect male nav categories.

---

## Shared informational pages — copy direction

### `/how-it-works`
Five-step process (matches Maximus #6 but Nexphoria-specific):
1. **Quick intake** — 4 minute online questionnaire about your goals and health
2. **Blood panel** — Free at-home or LabCorp draw, 65-marker comprehensive panel
3. **Physician consult** — Board-certified US MD reviews your labs and goals
4. **Compounded protocol shipped** — Sterile-compounded, cold-chain shipped, ready to inject
5. **Quarterly reassessment** — Blood retests, dose adjustments, ongoing physician access

### `/science`
Mechanism-of-action page with 6 peptide families:
- GLP-1 agonists (Tirzepatide, Semaglutide)
- Growth Hormone Secretagogues (CJC-1295, Ipamorelin, Tesamorelin, Sermorelin)
- Tissue Repair Peptides (BPC-157, TB-500, GHK-Cu)
- Longevity Compounds (NAD+, MOTS-c, Epitalon)
- HPG-Axis Modulators (Enclomiphene, Kisspeptin)
- Cognitive (Selank, Semax)

Each section: how it works, what's in it for you, study citations, typical protocol.

### `/physicians`
Same 5 doctors as the strip on /women and /men, with longer bios and credential detail.

### `/lab-testing`
Blood panel offering — 65 markers across 8 panels (hormonal, metabolic, lipid, thyroid, inflammation, vitamins/minerals, blood count, kidney/liver). Pricing $199 standalone or included in protocol.

### `/pricing`
Transparent pricing table by category. NO hidden fees. Free first consult.

### `/faq`
Long-form expanded FAQ.

### `/about`
**Mission-first per founder rule.** NO founder names, NO founder photos.
- Mission paragraph: Build the prescription-grade peptide pharmacy that Americans deserve.
- Why we exist: standard of care for peptides has been compounded in unregulated markets — Nexphoria brings the pharmacy back to the US, prescribed by physicians, compounded under cGMP.
- Where we operate: licensed 503A facilities in [state list].
- How we differ: blood-tested, MD-prescribed, compounded by US pharmacies, ready-to-inject.

### `/assessment`
Intake form. **First question is always sex** — answer routes user to the gender-tailored protocol questions. Then health history, goals, current medications.

### `/legal/*`
Standard pages — keep existing copy if available, restyle with new tokens.

### `/community`
Discord invite + eBook capture only.

### `/contact`
Email, phone, mailing address. Support hours.

---

## Photography & asset checklist

All hero/card assets are pre-generated in `/home/user/workspace/`:

| File | Use |
|---|---|
| `direction-V1-gender-gate.png` | Gate `/` — split into left+right halves for the two cards |
| `direction-W1-women-hero.png` | Reference for `/women` hero layout |
| `direction-W2-women-cards.png` | Source for the 3 flagship cards on `/women` — split into 3 |
| `direction-M1-men-hero.png` | Reference for `/men` hero layout |
| `direction-M2-men-cards.png` | Source for the 3 flagship cards on `/men` — split into 3 |

Place split crops in `/home/user/workspace/nexphoria-site/client/src/assets/brand/`:
- `gate-her.jpg` — left half of V1
- `gate-him.jpg` — right half of V1
- `women-hero-bg.jpg` — right portion of W1 (the woman photo)
- `women-card-weight.jpg`, `women-card-skin.jpg`, `women-card-longevity.jpg` — split from W2
- `men-hero-bg.jpg` — right portion of M1
- `men-card-strength.jpg`, `men-card-weight.jpg`, `men-card-longevity.jpg` — split from M2

For doctor headshots, generate 5 professional headshots (mix of genders/ethnicities, clean neutral backgrounds) via `asi-generate-image` — save to `client/src/assets/doctors/`.

**Delete from existing project:**
- All `client/src/assets/brand/editorial/editorial-hands-*.png` (14 files)
- `client/src/components/EditorialHands.tsx`
- All references to Switzer, Gambarino, `--nx-acid` (lime green)

---

## Tech stack (unchanged from existing project)

- Express + Vite + React + Tailwind + wouter (`useHashLocation`)
- Build: `cd /home/user/workspace/nexphoria-site && npm run build`
- Dev: `npm run dev` (port 5000)
- Deploy: `pplx-tool deploy_website` then `pplx-tool publish_website` with site_id `22ae53c7-1795-4bf4-8eee-6fab2004fa64`
- Routes: `<Router hook={useHashLocation}><Switch>...` pattern, MUST wrap on Router not Switch
- StartIntakeButton component preserved with `productSlug` and `source` props
- Existing `nexphoria_protocols_data.json` in workspace contains peptide catalog — use as source of truth for product names, slugs, KPIs, dosing
- Charts: Recharts (already in package.json)
- Icons: lucide-react (already in package.json)
- Forms: react-hook-form + zod (already configured)

---

## Quality bar

This site should feel like:
- Maximus Tribe's information architecture
- Function Health's data clarity
- Aesop's editorial restraint
- Goldman Sachs' quiet authority
- A real pharmacy you'd trust your blood work with

If a section feels "AI-generated" — generic stock-photo vibe, decorative-but-meaningless graphics, padding-heavy empty cards — it gets rebuilt. Every pixel earns its place.

**Cold-open test:** A 38-year-old executive lands on `/` — does she immediately understand what Nexphoria is, who it's for, and why she should trust it? If yes, we shipped. If no, iterate.

---

## Deliverables checklist for the rebuild subagent

1. [ ] Delete EditorialHands component + all 14 hands photos
2. [ ] Update `tailwind.config.ts` + `index.css` to lock new tokens (cobalt accent, no acid)
3. [ ] Load Playfair Display + Inter Tight + JetBrains Mono from Google Fonts in `index.html`
4. [ ] Generate split assets from the 5 mockup PNGs and place in `client/src/assets/brand/`
5. [ ] Generate 5 doctor headshots via `asi-generate-image`
6. [ ] Rebuild `App.tsx` routes: `/`, `/women`, `/women/peptides`, `/women/peptides/:slug`, `/women/protocols`, `/men`, `/men/peptides`, `/men/peptides/:slug`, `/men/protocols`, shared informational routes, legal routes
7. [ ] Build the Gate component at `/` — pure two-card chooser
8. [ ] Build `/women` homepage with all 11 sections
9. [ ] Build `/men` homepage with all 11 sections
10. [ ] Build `/women/peptides` and `/men/peptides` catalogs filtered to relevant compounds
11. [ ] Build peptide detail template that takes gender context (`/women/peptides/tirzepatide` vs `/men/peptides/tirzepatide` show different outcome data)
12. [ ] Rebuild `/how-it-works`, `/science`, `/physicians`, `/lab-testing`, `/pricing`, `/faq`, `/about`, `/community`, `/contact`
13. [ ] Rebuild `/assessment` with sex-first routing
14. [ ] Restyle `/legal/*` pages with new tokens (keep existing copy)
15. [ ] Verify NO localStorage, NO Switzer, NO Gambarino, NO acid green, NO China references anywhere in the codebase
16. [ ] Build production: `npm run build`
17. [ ] Screenshot at desktop 1440 and mobile 375 via Playwright — every route
18. [ ] Fix any visual issues found in QA
19. [ ] Hand control back to main agent for `deploy_website` + `publish_website`

**End of brief.**
