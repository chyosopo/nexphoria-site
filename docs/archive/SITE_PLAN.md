# Nexphoria — Full Site Plan (Maximus Design System)

## Design Source of Truth
The approved mockup at `nexphoria_mockups/home_maximus.html` is the **only** style reference. Every page in the live site adopts the Maximus tile DNA:

- **Body bg:** `#F4EFE6` (warm pharmacy cream)
- **Tile cream:** `#EFEBE3` (unified product-tile background)
- **Ink:** `#0E0E0F` (serif labels, pills)
- **Navy:** `#15233A` (label color on photo tiles)
- **Dark variant:** `#1A1916` (one tile per row for rhythm)
- **Fonts:** Fraunces (display, italic accents) + Inter (body, uppercase meta)
- **Tile language:** photo hero tiles 5:4, product tiles 1:1.15 cream + floating object, dark tile every 3rd or 5th for visual rhythm
- **Hover:** lift 4px + shadow grow + object translateY(-6) rotate(-2)

## Information Architecture (existing routes — keep all)

| Route | Page | Treatment |
|---|---|---|
| `/` | Showcase (home) | **Full rebuild** with Maximus tiles |
| `/peptides` | Peptides index | Maximus product-tile grid (filter sidebar kept) |
| `/peptides/:slug` | PeptideDetail | Editorial tiles: mechanism, dosage, evidence, safety |
| `/stacks` | StackIndex | Hero tiles (5:4) for each flagship stack |
| `/stacks/:slug` | StackDetail | Anatomy + timeline + included peptides as tiles |
| `/how-it-works` | HowItWorks | 4-step tile flow |
| `/science` | Science | Editorial card system, citation footnotes |
| `/about` | About | Timeline tile band + leadership tiles |
| `/assessment` | Assessment intake | Progress bar + side-context tile |
| Legacy: `/women`, `/men`, `/gate` etc. | Kept reachable, no redesign |

## Build Order

1. **Tokens & components first** (`shared.css` additions + `MaximusTile.tsx`)
2. **Showcase / Home** (highest user impact — what they approved)
3. **Peptides + Stacks index** (browse experience)
4. **Detail pages** (PeptideDetail, StackDetail)
5. **Editorial pages** (HowItWorks, Science, About, Assessment)
6. **Cross-page consistency** (Nav, Footer)

## Performance Budget (every page)

- Hero image: `<picture>` with 720w + 1280w WebP sources, `fetchpriority="high"`, `loading="eager"`
- All non-hero images: `loading="lazy" decoding="async"`
- All `<img>`: explicit `width`/`height` to prevent CLS
- Fonts: preload Inter+Fraunces, font-display: swap
- Target: mobile Lighthouse perf ≥ 85, CLS ≤ 0.05

## Stop condition
- All 9 priority pages rebuilt with Maximus tile system
- Deploys to nexphoria-site/dist/public successfully
- Lives at https://nexphoria.pplx.app via republish with existing site_id
- Playwright QA passes (no overflow, broken images, layout issues) at 1440×900 desktop and 390×844 mobile
- Verifier subagent approves content accuracy + functional flows
