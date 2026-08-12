# NEXPHORIA — FULL SITE ENHANCEMENT PASS

User said "keep enhancing everything." This is the deep polish pass — not new features, but raising every page from "great" to "stupidly great." Editorial-magazine quality across all 17 routes. The site is live at nexphoria.pplx.app and must republish at the end.

## Guiding philosophy

Think Aesop × Loewe × Apple × Hims-but-elevated. Every page should feel like a spread in a luxury wellness magazine. We already have the bones (hands editorial spreads, locked tokens, typography). This pass is about **rhythm, restraint, micro-detail, and emotional weight**.

## Hard rules (DO NOT VIOLATE — repeat from prior briefs)

- Tagline locked: "Science you can feel. Results you can measure." (italic Gambarino acid-green #c6f184)
- NEVER "nootropics" — always "peptides"
- NO localStorage / sessionStorage / cookies
- Tokens: bg #0a0a0a, fg #fffff3, accent #c6f184, border #2a2a28
- Fonts: Switzer / Gambarino italic 400 / JetBrains Mono via Fontshare
- About: mission-first, no founders
- StartIntakeButton props: productSlug + source
- prefers-reduced-motion respected
- Hero: NO blur, NO scroll motion, NO parallax. Editorial hands spreads: STATIC.
- One Gambarino italic per interior page (Home is exception)
- Deploy via pplx-tool deploy_website only

## Enhancement targets — categorized

### A. Typography & rhythm (every page)

1. **Section dividers**: every major section break gets a JetBrains Mono uppercase tracking-widest eyebrow label (e.g. `02 — THE METHOD`, `03 — THE TRIAL`). Numbered consecutively per page.
2. **Hero h1s**: kerning at `tracking-[-0.025em]` minimum at desktop sizes; line-height `1.02` for hero `clamp(40px, 7vw, 96px)` headlines.
3. **Body copy measure**: cap at `max-w-[58ch]` (NOT wider) for editorial body — tight measure reads premium.
4. **Pull quotes**: where any page has a long body paragraph, lift one sentence into a pull quote: Gambarino italic 400, size `clamp(22px, 3vw, 38px)`, color `nx-fg/90`, left rule `border-l border-nx-accent pl-6 lg:pl-8`, max-w-[44ch].
5. **Numbered lists / specs**: tabular-nums monospace numerals, baseline-aligned.
6. **Footnotes / asterisk references**: small uppercase mono, `text-nx-fg/40`, italic for legal/disclaimer.

### B. Motion polish (subtle, respect reduced-motion)

1. **Stagger reveals** on heading + body pairs using Motion (`whileInView`, `viewport={{ once: true, margin: "-80px" }}`). 12-16px upward translate, 0→1 opacity, 600ms, `[0.22, 1, 0.36, 1]` ease. Skip for `prefers-reduced-motion`.
2. **Number count-ups**: AnimatedCounter already exists — make sure every stat strip uses it. Stats to verify: pharmacy count, MD count, protocol count, lab marker count.
3. **CTA button micro-feedback**: `hover:translate-y-[-1px]` + `active:translate-y-[0px]` with `transition-all duration-150 ease-out`. Subtle.
4. **Link underline**: text links in body should have animated underline (background-image gradient, 1px tall, slides in from left on hover, 300ms). Apply to footer + content links.
5. **Cursor**: on protocol cards and stack cards, change to `cursor-pointer` and add `hover:-translate-y-[2px] hover:shadow-[0_24px_60px_-24px_rgba(198,241,132,0.18)]` premium lift.
6. **Image reveals**: editorial hands spreads remain STATIC (no motion). Other content images can get a `clip-path` reveal on viewport enter.

### C. Page-specific deepening

**Home**
- Add a "Featured In" press strip (uses existing PressStrip if available, otherwise mono label + ghost wordmarks). Use: "AS COVERED IN — PEPTIDE REGISTRY · ANTI-AGING JOURNAL · SCIENTIFIC AMERICAN" (italicized mono, low opacity).
- After Protocols grid: add a "By the Numbers" stat strip — 4 stats with AnimatedCounter:
  - `7` Peptides screened
  - `92%` Adherence at 60 days
  - `3` Licensed pharmacies
  - `<48h` Avg MD response
- Closing CTA: add a Gambarino italic word ("ready" or "decide") and tighten the hierarchy.

**HowItWorks**
- Number the 4 steps with massive Switzer black numerals (`text-[clamp(48px,8vw,120px)] font-black text-nx-accent/15`) behind each step's content.
- Add a "What you DON'T do" list as a counterweight: "No clinic visits. No insurance fights. No prescription hunting. No marketing inflation."

**Protocols (catalog)**
- Each protocol card: add a small monogram crest in the top-right (use first letter of stack name in a circle with `border border-nx-accent/40`).
- Add a "Which is right for me?" link → Assessment, with subtle arrow icon.
- Compare table at bottom: side-by-side outcomes (Energy / Recovery / Cognitive / Aesthetic — checkmark grid). Compact, premium.

**StackReveal (protocol detail)**
- Add a "Week-by-week" timeline: weeks 1-2 calibration, 3-6 onset, 7-12 measurable, 12+ maintenance. Vertical timeline with thin acid-green rule.
- Add "Compounded by" panel naming a generic licensed pharmacy partner — "Compounded by a state-licensed 503A pharmacy in Texas."
- Add "What's in the case" inventory list with monospace SKU-like codes (made up but plausible).

**Peptides (catalog)**
- Filter chips: ENERGY · LONGEVITY · RECOVERY · COGNITIVE · AESTHETIC · SLEEP — clicking filters the grid client-side (React state, no storage).
- Each peptide card: add half-life and route-of-administration micro-spec strip.

**PeptideDetail**
- Add "Found in our protocols" cross-link section showing which stacks contain it.
- Add "Mechanism" diagram (simple SVG dot-line mechanism if MolecularGlyph exists, use it).
- Add a "Research" links section with 3-4 placeholder citation rows (mono, dim, "[1] Nature, 2022" style — pure visual element).

**Pricing**
- Add a subtle striped pattern behind the recommended tier (acid-green diagonal stripes at 4% opacity).
- Add "What's included" universal checklist BELOW the tiers (MD consult, licensed compounding, monthly check-ins, discreet shipping, 24/7 message support).
- Add "Compare to alternatives" small ghost table: cash clinic ($X+), traditional Rx (varies), Nexphoria (transparent).

**Science**
- Add a "Mechanism of Action" 3-column grid for the top 3 peptide families (Growth factors / Healing peptides / Cognitive enhancers — actually use peptide-correct categories: Secretagogues / Tissue-repair / Mitochondrial). Each with a one-line mechanism in body, one-line evidence in mono.
- Add a "Research lineage" timeline: discovery → animal studies → clinical → today. Decades with tabular numerals.

**Physicians**
- Add board-cert badges as monospace rows (no fake images — pure type): `BOARD CERTIFIED · INTERNAL MEDICINE · ENDOCRINOLOGY · SPORTS MED · FUNCTIONAL`.
- Add quote from a generic "Medical Director" (no name) — pull-quote treatment, Gambarino italic.

**LabTesting**
- Add a panel showing the 4 lab tiers (Baseline / Hormone / Inflammation / Comprehensive) with marker counts and frequencies.
- Add an "On-protocol biomarker tracking" section showing what gets measured at week 0 / 6 / 12.

**Community**
- Add member quotes as editorial pull-quotes (2-3, all anonymized, Gambarino italic, age + protocol attribution).
- Add a "Daily ritual" 7-day mock calendar showing how a protocol week looks (Mon-Sun rows, dosing time + note).

**Contact**
- Above the form, add a "Three ways to reach us" grid: Email · MD message · Press inquiries.
- After form: add response-time badge: "Avg response < 24h. MD inquiries < 4h."

**FAQ**
- Group questions into 3-4 categories with mono eyebrow labels: GETTING STARTED · PROTOCOLS · SAFETY & LEGAL · BILLING.
- Each accordion: smooth height animation, chevron rotates 90°.

**About**
- Add a "Our Standards" 4-point manifesto: Honesty · Precision · Pharmacy · Physicians. Each a one-sentence statement in Gambarino italic.
- Tighten the mission opener: shorter, more declarative.

**Assessment (quiz)**
- Add a tiny progress dot indicator at the very top (12 dots, fills as you go). Subtle.
- Add a "Why we ask" tooltip-like footnote under each question explaining the clinical rationale (single line, mono, dim).
- Results page: when stack revealed, add a "Why this protocol" rationale paragraph tying it to the user's answers.

**Legal pages**
- Use proper editorial type hierarchy. Add eyebrow labels for section numbering.
- Add a "Last updated" date strip at the top.

### D. Global details

1. **Footer**: tighten spacing, add tiny mono signature line: "MADE WITH PRECISION — NEW YORK · MIAMI". Add legal disclaimer at the very bottom: "Peptide therapy is delivered through licensed physicians and state-licensed pharmacies. Not a treatment for or cure of any disease. For research-quality compounded medicine prescribed at MD discretion."
2. **Nav**: ensure the active route shows a subtle acid-green dot under the label.
3. **404 page**: editorial treatment — large `404` in Gambarino italic acid-green, mono subtext "this page hasn't been compounded yet", link back to home.
4. **OG image**: leave as-is unless trivial to upgrade.
5. **Performance**: all editorial PNGs should have `loading="lazy"` (already done in EditorialHands) — verify other images.

### E. Component-level polish

1. **StackCard**: add a small price-from row in mono at bottom.
2. **EditorialHands**: leave alone, it's great.
3. **PressStrip**: if doesn't exist, create one. Ghost wordmarks at low opacity.
4. **Reveal**: utility wrapper for stagger reveals — use it liberally.

## Build & deploy

1. `cd /home/user/workspace/nexphoria-site && npm run build`
2. Restart prod server: `kill $(lsof -ti :5000) 2>/dev/null || true; NODE_ENV=production node dist/index.cjs &; sleep 2`
3. Playwright QA every route at 375×812 and 1440×900. Save evidence to `/home/user/workspace/nexphoria-site/qa/enhance/`.
4. Specifically verify:
   - Mobile menu still works (`Nav.tsx` is sacred — don't refactor structure)
   - Quiz buttons still work (advancingRef intact, hover states intact)
   - Every page has editorial rhythm + pull quotes + mono eyebrows
   - No horizontal scroll at 375px
   - Build bundle hasn't bloated unreasonably (compare to current `dist/index.cjs` ~951KB and `dist/public/assets/index-*.js`)
5. Return summary. DO NOT call publish_website or deploy_website — parent will redeploy + republish.

## Forbidden

- Do NOT add localStorage / sessionStorage / cookies
- Do NOT add scroll-driven parallax on hero or hands spreads
- Do NOT refactor Nav.tsx core structure (only minor additions like active-route dot)
- Do NOT refactor Assessment.tsx core flow (only additive enhancements like progress dots, rationale text)
- Do NOT change tokens or fonts
- Do NOT use the word "nootropic" anywhere
- Do NOT break any existing tests / patterns / EditorialHands placements
- Do NOT add multiple Gambarino italic moments per interior page

GO. Edit, build, screenshot, fix, repeat. Make every page feel ten times richer without making it noisier.
