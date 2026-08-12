# HANDS EVERYWHERE 10X — Editorial Saturation Brief

User said "Keeping Hans in everything. Everything make it 10 times better." This means EVERY page gets multiple hands-led editorial moments. Treat the site as an editorial fashion magazine — hands punctuate every scroll, every section transition is a full-bleed editorial spread.

## Asset inventory — 14 hands photos in `client/src/assets/brand/editorial/`

Use ALL of them — every page should get 2+ moments. Each photo is full-bleed editorial quality, obsidian-black background, acid-green #c6f184 atmospheric haze, hyperreal hand texture.

| File | Tone | Best uses |
|---|---|---|
| `editorial-hands-kit-select.png` | suited hand reaching into matte case for vial | Home opener, About mission, Protocols |
| `editorial-hands-draw-syringe.png` | hands drawing liquid into syringe | HowItWorks, Pharmacy, Science |
| `editorial-hands-prescribe.png` | physician signing chart | Physicians, Assessment interstitial |
| `editorial-hands-consult.png` | physician's hand on patient's wool shoulder | About, Physicians, CTA closers |
| `editorial-hands-pipette.png` | black-gloved hands pipetting between vials | LabTesting, Science, HowItWorks |
| `editorial-hands-measure.png` ⭐NEW | hand + caliper around amber vial | Science precision moment, Peptides catalog |
| `editorial-hands-notes.png` ⭐NEW | hand writing with fountain pen | Physicians, Assessment, Contact |
| `editorial-hands-handoff.png` ⭐NEW | doctor handing case to patient | HowItWorks Act III, About mission |
| `editorial-hands-assemble.png` ⭐NEW | gloved hands placing vials in case | Pharmacy hero, HowItWorks pharmacy step |
| `editorial-hands-pulse.png` ⭐NEW | fingers on wrist taking pulse | Physicians, Community, FAQ opener |
| `editorial-hands-chart.png` ⭐NEW | hand pointing to acid-green data on tablet | Science, Pricing, LabTesting |
| `editorial-hands-commit.png` ⭐NEW | muscular forearm + vial + cup, morning ritual | Home closer, Community, lifestyle moments |
| `editorial-hands-sealed.png` ⭐NEW | gloved hand placing wax seal on black package | Pharmacy, Protocols, closing CTA |
| `editorial-lab-hands-vial.png` | existing | Science, Peptides |

## Editorial pattern — required for EVERY page

Every route below must have AT LEAST 2 `<EditorialHands>` spreads. Each spread is **full-bleed** (escape any container — use `<section className="-mx-...">` or place outside containers). Use the `aspect-[21/9]` ratio for headline moments, `16/9` for breathers. Add captions in JetBrains Mono uppercase tracking-widest using the `caption` prop with copy like:

- `"FIG. 01 · COMPOUNDED IN U.S. PHARMACIES"`
- `"FIG. 02 · MD-PRESCRIBED · ALWAYS"`
- `"FIG. 03 · MEASURED IN MILLIGRAMS · NOT MARKETING"`
- `"FIG. 04 · YOUR CASE · ARRIVES SEALED"`
- `"FIG. 05 · PROTOCOL · WEEK ONE"`
- `"FIG. 06 · RESULTS · MEASURED MONTHLY"`
- `"FIG. 07 · YOUR PHYSICIAN · REAL · LICENSED"`

Number them sequentially across the journey so they feel like an editorial sequence (FIG. 01 on Home → FIG. 12 on Contact, etc.) — that's the 10x storytelling.

For section-opening moments, use the optional `headline` overlay prop with a short Switzer-display heading + one Gambarino italic word in `#c6f184`. Example:
```tsx
<EditorialHands
  src={handsHandoff}
  alt="..."
  ratio="21/9"
  caption="FIG. 04 · THE HANDOFF"
  headline={
    <h2 className="text-nx-fg text-[clamp(28px,5vw,56px)] leading-[1.05] tracking-[-0.02em]">
      Real medicine, <span className="font-display-italic text-nx-accent italic">handed over</span>.
    </h2>
  }
/>
```
(Match how existing Home/About already use this — keep one Gambarino italic word per interior page.)

## Page-by-page injection plan

### 1. `Home.tsx` (already has 1)
Add a SECOND hands moment between Protocols section and the closing CTA. Use `editorial-hands-commit.png` (morning ritual) full-bleed `21/9` with caption `"FIG. 02 · YOUR MORNING · YOUR PROTOCOL"`. No headline overlay (keep Home's Gambarino budget for the hero tagline).

### 2. `HowItWorks.tsx` (already has 1)
Add TWO additional spreads:
- After step 2 (intake/MD review) → `editorial-hands-notes.png` `16/9` caption `"FIG. 03 · YOUR CHART · WRITTEN BY HAND"`
- After step 4 (delivery/results) → `editorial-hands-handoff.png` `21/9` caption `"FIG. 04 · THE HANDOFF"` + headline overlay with one italic Gambarino word

### 3. `Pharmacy.tsx` (currently no EditorialHands import — ADD)
Add THREE spreads:
- Pharmacy hero replacement: `editorial-hands-assemble.png` `21/9` caption `"FIG. 05 · COMPOUNDED · ONE BATCH AT A TIME"`
- Mid-page: `editorial-hands-draw-syringe.png` `16/9` caption `"FIG. 06 · PRECISION · PEPTIDE-GRADE"`
- Closer: `editorial-hands-sealed.png` `21/9` caption `"FIG. 07 · SEALED · DIRECT TO YOUR DOOR"`

### 4. `Science.tsx` (already has 1)
Add TWO more:
- `editorial-hands-measure.png` `16/9` caption `"FIG. 08 · MEASURED IN MILLIGRAMS"`
- `editorial-hands-chart.png` `21/9` caption `"FIG. 09 · WHAT THE DATA SHOWS"` with optional headline

### 5. `Physicians.tsx` (already has 2)
Add THIRD spread before closing CTA: `editorial-hands-pulse.png` `21/9` caption `"FIG. 10 · YOUR PHYSICIAN · ACTUALLY YOURS"` — replaces or supplements the existing closer

### 6. `About.tsx` (already has 1)
Add SECOND moment between mission and method/values sections: `editorial-hands-kit-select.png` `21/9` caption `"FIG. 11 · CHOSEN · NOT PRESCRIBED BLINDLY"`

### 7. `LabTesting.tsx` (already has 1)
Add SECOND: `editorial-hands-chart.png` `16/9` caption `"FIG. 12 · YOUR BIOMARKERS · YOUR ROADMAP"`

### 8. `Peptides.tsx` (currently no hands — ADD ONE)
Open the catalog with `editorial-hands-measure.png` `21/9` caption `"FIG. 13 · THE LIBRARY"`

### 9. `Protocols.tsx` (no hands — ADD ONE)
Open the protocols catalog with `editorial-hands-kit-select.png` `21/9` caption `"FIG. 14 · FIVE PROTOCOLS · YOUR PICK"`. Place BEFORE the protocol grid.

### 10. `Pricing.tsx` (no hands — ADD ONE)
Between hero and pricing tiers: `editorial-hands-chart.png` `16/9` caption `"FIG. 15 · WHAT YOU PAY FOR"`

### 11. `Community.tsx` (no hands — ADD ONE)
Mid-page: `editorial-hands-commit.png` `21/9` caption `"FIG. 16 · DAILY · TOGETHER"`

### 12. `Contact.tsx` (no hands — ADD ONE)
After contact form: `editorial-hands-notes.png` `16/9` caption `"FIG. 17 · YOUR MESSAGE · READ BY A HUMAN"`

### 13. `FAQ.tsx` (no hands — ADD ONE)
Top of page: `editorial-hands-pulse.png` `21/9` caption `"FIG. 18 · ANSWERS · STRAIGHT"`

### 14. `Assessment.tsx` (no hands — ADD ONE small interstitial)
After the first question is answered, show a small `16/9` hands moment as a calming visual reset: `editorial-hands-handoff.png` or `editorial-hands-prescribe.png` with caption `"FIG. 19 · YOU'RE BUILDING YOUR PROTOCOL"`. Keep it brief and don't disrupt the quiz flow.

### 15. `PeptideDetail.tsx` (no hands — ADD ONE)
For every peptide detail page, add an editorial spread between description and mechanism sections: `editorial-hands-pipette.png` `16/9` caption `"FIG. 20 · COMPOUNDED · RESEARCH-GRADE"`

## Polish moves while you're in there

1. **Section spacing** — every `<EditorialHands>` must be flanked by generous `py-24 lg:py-32` content sections so the spreads BREATHE
2. **Mobile preservation** — verify each spread doesn't crush on 375px (use `min-h-[360px]` already in the component, which is fine)
3. **Lazy load** — already `loading="lazy"` in component — verified
4. **Caption legibility** — gradient vignette already in component — verified
5. **No headline overflow on mobile** — use `clamp(24px, 5vw, 56px)` for headline overlays
6. **Import the new images** at the top of each page file:
```tsx
import handsMeasure from "@/assets/brand/editorial/editorial-hands-measure.png";
import handsNotes from "@/assets/brand/editorial/editorial-hands-notes.png";
import handsHandoff from "@/assets/brand/editorial/editorial-hands-handoff.png";
import handsAssemble from "@/assets/brand/editorial/editorial-hands-assemble.png";
import handsPulse from "@/assets/brand/editorial/editorial-hands-pulse.png";
import handsChart from "@/assets/brand/editorial/editorial-hands-chart.png";
import handsCommit from "@/assets/brand/editorial/editorial-hands-commit.png";
import handsSealed from "@/assets/brand/editorial/editorial-hands-sealed.png";
```

## Build, QA, Deploy

After all edits:

```bash
cd /home/user/workspace/nexphoria-site
npm run build
# restart prod server
kill $(lsof -ti :5000) 2>/dev/null || true
NODE_ENV=production node dist/index.cjs &
sleep 2
```

Then Playwright QA every route at 375×812 and 1440×900. Save evidence screenshots to `/home/user/workspace/nexphoria-site/qa/10x/`. Specifically verify:
- Every page now has 2+ visible hands spreads
- No horizontal scroll at 375px
- Captions readable on mobile
- Headlines (where used) don't overflow
- Mobile drawer still works
- Quiz buttons still work
- Build size sane (no doubling)

Return summary with the count of hands spreads per page. DO NOT call deploy_website or publish_website — return control to parent for deploy.

## Non-Negotiable Constraints (DO NOT VIOLATE)

- Tagline locked: "Science you can feel. Results you can measure." (italic part Gambarino acid-green #c6f184)
- NEVER use "nootropics" — always "peptides"
- NO localStorage / sessionStorage / cookies
- Tokens locked: bg #0a0a0a, fg #fffff3, accent #c6f184, border #2a2a28
- Fonts: Switzer / Gambarino italic 400 / JetBrains Mono via Fontshare
- About page: mission-first, no founders
- StartIntakeButton props: productSlug + source
- prefers-reduced-motion respected — DO NOT add scroll-triggered animations on the hands spreads
- Hero: NO blur, NO scroll motion, NO parallax — applies to hands spreads too: STATIC images only
- One Gambarino italic per interior page max (Home is showcase exception)
- Deploy: pplx-tool deploy_website only — NEVER Vercel, NEVER publish_website

GO. Edit, build, screenshot, fix, repeat. Move fast.
