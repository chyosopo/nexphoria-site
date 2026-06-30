# Nexphoria — Locked Design Spec (Bask-Ready Rebuild)

This spec is THE source of truth. Override anything in older docs that contradicts.

## Locked Aesthetic — "Nexphoria Maximus"

Dark, premium, Maximus Tribe-tier pharmaceutical brand. Editorial poster composition.
Acid-green + obsidian. Restraint. Every element earns its place.

## Color Tokens — REPLACE ALL CLINICAL PREMIUM TOKENS

Wire these in `client/src/index.css` (`:root` and `.dark` both — site is dark-only, both should be same dark values) and `tailwind.config.ts`.

Use HSL `H S% L%` format (no `hsl()` wrapper, space separated):

| Role            | Hex       | HSL              | Usage                                          |
| --------------- | --------- | ---------------- | ---------------------------------------------- |
| `--background`  | `#0a0a0a` | `0 0% 4%`        | Page background (near-black, not pure)         |
| `--surface`     | `#0f0f0f` | `0 0% 6%`        | Cards, stacks, secondary panels                |
| `--surface-alt` | `#141414` | `0 0% 8%`        | Hover surfaces, raised elements                |
| `--border`      | `#2a2a28` | `60 3% 16%`      | Dividers, subtle outlines                      |
| `--border-soft` | `#1a1a18` | `60 3% 10%`      | Internal cell borders, low-contrast            |
| `--foreground`  | `#fffff3` | `60 100% 98%`    | Primary text (warm white "Ceramic")            |
| `--muted`       | `#a8a8a0` | `60 4% 64%`      | Secondary text, descriptions                   |
| `--faint`       | `#7c7c73` | `60 5% 47%`      | Tertiary text, mono labels                     |
| `--accent`      | `#c6f184` | `83 79% 73%`     | Acid Green — CTAs, italics, accent dashes      |
| `--accent-hover`| `#d4f896` | `83 84% 78%`     | Acid green hover state                         |
| `--accent-soft` | `rgba(198,241,132,0.08)` | — | Tag backgrounds, soft glows           |

## Typography — Wire via Fontshare CDN in `client/index.html`

```html
<link href="https://api.fontshare.com/v2/css?f[]=switzer@300,400,500,600,700,800&f[]=gambarino@400&f[]=jetbrains-mono@400,500&display=swap" rel="stylesheet">
```

- **Display + Body:** Switzer (300–800). Map to `font-sans`.
- **Serif italic moment:** Gambarino italic 400. Map to `font-serif`. Use SPARINGLY — one per page max for one accent word.
- **Mono labels:** JetBrains Mono. Map to `font-mono`.

### Type rules
- Headings: Switzer 600 weight, tight tracking `-.03em` to `-.045em`
- Hero display: `clamp(56px, 7.4vw, 108px)` on desktop, line-height `.92`
- Section heads: `clamp(48px, 6vw, 88px)`, line-height `.95`
- Body: 16-17px, line-height 1.55-1.65, color `--muted` for descriptions, `--foreground` for primary
- Mono labels: 10.5-11px, uppercase, letter-spacing `.16em` to `.18em`, color `--accent` or `--faint`

## Hero — CRITICAL (NO BLUR, NO SCROLL MOTION)

Use `REFERENCE_HERO_MOCKUP.html` and `REFERENCE_HOME_HERO.jpg` as the visual target.

**Layout:**
1. Top zone: eyebrow chip (acid green dot + label) on left, coordinate marker (mono uppercase) on right
2. Display headline (Switzer 600): "Science you can feel." on line 1
3. Display headline (Gambarino italic, acid green): "Results you can measure." on line 2
4. Vial-lineup image bleeds to bottom, anchored — height ~540px crop with object-position center 50%
5. Footer band sits over bottom of image: short copy LEFT · CTAs CENTER · EST. markers RIGHT

**Hero image asset:** `@/assets/brand/vial-lineup-hero.jpg` (already copied to `client/src/assets/brand/`)

**Hero rules:**
- The image is CRISP. NO `filter: blur()`. NO `transform: scale()` on scroll. NO parallax.
- The image is anchored to the bottom of the hero, not the background.
- Use a top→bottom gradient overlay on the image so the type above stays legible:
  `linear-gradient(180deg, rgba(0,0,0,.92) 0%, rgba(0,0,0,.35) 14%, transparent 42%, rgba(0,0,0,.65) 100%)`
- Side gradient: `linear-gradient(90deg, rgba(0,0,0,.45) 0%, transparent 12%, transparent 88%, rgba(0,0,0,.45) 100%)`

**Hero copy LOCKED:**
- Eyebrow: `● A NEW STANDARD FOR PEPTIDE THERAPY`
- Coordinate: `N · 40.7128°` / `W · 74.0060°` / `2026 · ED.04`
- Headline line 1: `Science you can feel.`
- Headline line 2 (italic, acid green): `Results you can measure.`
- Subcopy: `Prescribed peptide protocols. Compounded in U.S. 503A pharmacies. Reviewed by board-certified MDs. Quarterly labs.`
- CTAs: `Begin →` (primary, acid-green button) + `Browse` (secondary outline)
- Right markers: `EST. 2026` / `MIAMI · NEW YORK` / `FDA-NOTICED`

## Sections After Hero — Apply Same Treatment Site-Wide

### Index strip (4 stats)
Mono labels + Gambarino italic numbers in acid green:
- `14` Peptides in formulary · `12` 503A pharmacy partners · `04` Physicians on staff · `96%` Quarterly lab adherence

### How It Works (4 acts)
- Section eyebrow (mono, acid green): `How it works · 04 Acts`
- Section head: `A clinical act, not a checkout.` (`act` in Gambarino italic acid green)
- 4 steps in a horizontal grid, Gambarino italic acid-green numerals `i. ii. iii. iv.`
  1. Assess — Anonymous 4-minute intake matched to your goals and medical history.
  2. Review — Board-certified MD reviews your case within 24 hours.
  3. Ship — Compounded in a U.S. 503A pharmacy. Cold-chain to your door.
  4. Measure — Quarterly labs. Dose titrated by your MD based on data.

### Featured Protocols — Wolverine + Glow
- Section eyebrow: `Featured Protocols · 02`
- Section head: `Two flagship stacks.` (`stacks.` in Gambarino italic acid green)
- 2 cards side-by-side on desktop:
  - **Wolverine.** — Recovery & Performance · BPC-157 · TB-500 · GHK-Cu · Ipamorelin · From `$262/mo`
  - **Glow.** — Skin, Hair & Vitality · GHK-Cu · Epitalon · Thymosin α1 · PT-141 · From `$298/mo`
- Each card: dark obsidian surface, soft radial accent glow top-right, peptide tags (acid-green pills with .08 alpha background), large Gambarino italic price, "View protocol →" link to `/protocols/:slug`

### Outcomes (4 KPIs)
- Eyebrow: `Outcomes · Aggregated · 12 Months`
- Head: `Measured, not marketed.` (`not` italic acid green)
- Numbers in Switzer 96px, units in Gambarino italic acid green: `–31%` `+18%` `84%` `96%` with labels

### Closing CTA
- Eyebrow: `Begin in four minutes.`
- Head: `The molecules that matter, prescribed.` (`matter,` italic acid green)
- CTAs: `Find your protocol →` + `Talk to a physician`

## Apply The Aesthetic To Every Other Page

Use the same token system, type stack, and section patterns on:
- **/protocols** — index of all stacks, same card pattern
- **/protocols/:slug** — full stack detail (Wolverine, Glow)
- **/peptides** — index of all peptides in the lineup (the 7 vials + any others)
- **/peptides/:slug** — single-peptide detail page
- **/physicians** — MD profile cards on dark obsidian surface
- **/lab-testing** — explanation of quarterly labs
- **/pricing** — full price tiers using the same card pattern
- **/assessment** — keep all 12 questions + 3 interstitials + results, just retoken colors to acid-green/obsidian
- **/how-it-works** — long-form expansion of the 4 acts
- **/about** — mission-first (NO founders)
- **/faq** — accordion on dark surface
- **/contact** — minimal contact card
- **/legal/\*** — typographic only, no decoration

## Locked Constraints (Immovable)
- **Tagline locked:** "Science you can feel. Results you can measure." on the home hero
- **NEVER use the word "nootropics" — use "peptides"** (anywhere in the codebase)
- **One Gambarino italic moment per page MAX** — one accent word, not multiple
- **prefers-reduced-motion respected** — disable any motion when set
- **State: in-memory only** — NO localStorage, sessionStorage, cookies
- **StartIntakeButton props:** `productSlug` + `source` (already in codebase, do not break)
- **About page: mission-first, no founders**

## Mobile (375px) — Required For Every Page
- Hero stacks: headline above, vial image below, CTAs stack vertically
- Multi-column grids collapse to single column (steps, stacks, outcomes)
- Side padding reduces to 24px from 56px
- Display sizes scale via clamp() — already specified above
- Coordinate marker hides on mobile (`display: none` below 768px)
- Nav collapses to hamburger (use existing `Nav.tsx` mobile pattern)

## Components To Keep (DO NOT REWRITE)
- `Assessment.tsx` — full quiz logic. Just retoken colors.
- `data/physicians.ts` and `data/peptides.ts` — keep data structure, update content if peptide list expanded
- `StartIntakeButton.tsx` — keep props interface
- `Footer.tsx` — keep structure, just retoken
- `MolecularGlyph.tsx`, `MoleculeIcon.tsx` — keep, recolor with `--accent` and `--muted`

## Wire The Master Vial Image In Multiple Places
- Home hero: anchored at bottom (the primary use)
- Peptides index: large feature at top of `/peptides`
- About page: as a brand statement image
- Footer: small thumbnail (optional)

The master full-resolution image is at `client/src/assets/brand/vial-lineup-master.png` (1.8MB). The optimized hero crop is at `client/src/assets/brand/vial-lineup-hero.jpg` (155KB) — use the JPG for the hero.

## Visual References (already in project root)
- `REFERENCE_HOME_HERO.jpg` — what the hero must look like
- `REFERENCE_HOME_FULL.jpg` — full-page mockup B with the locked tagline (sections below the fold)
- `REFERENCE_HERO_MOCKUP.html` — exact HTML/CSS reference for the hero composition

## Deploy
- Build: `cd /home/user/workspace/nexphoria-site && npm run build`
- Start server in background:
  ```
  pplx-tool start_server with {"command":"NODE_ENV=production PORT=5000 node dist/index.cjs","project_path":"/home/user/workspace/nexphoria-site","port":5000,"log_file":"/tmp/nx-server.log"} + api_credentials=["pplx-tool:start_server"]
  ```
- Deploy:
  ```
  pplx-tool deploy_website with {"project_path":"/home/user/workspace/nexphoria-site/dist/public","site_name":"Nexphoria — Peptide Therapy, Prescribed","entry_point":"index.html","should_validate":true} + api_credentials=["pplx-tool:deploy_website"]
  ```
- Report new asset_id back.
