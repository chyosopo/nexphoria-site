# NEXPHORIA · DESIGN SYSTEM LOCK
**All agents must read this before touching any file.**

North Star references: Hims (himshealth.com), Maximus (maximustribe.com), **Hims Labs** (hims.com/labs).

---

## 1. THE ONE RULE
**Every image must encode a benefit.** No decorative photos. If you can remove the image without losing information, remove it. Images are informational, not ornamental.

- ❌ WRONG: Generic lifestyle shot of "wellness"
- ✅ RIGHT: Man mid-deadlift with visible vein detail → "Wolverine · 2.3x faster recovery"
- ✅ RIGHT: Before/after biomarker card overlay showing IGF-1 ↑ 23% → data IS the visual
- ✅ RIGHT: Portrait of a woman with visibly luminous, hyper-detailed skin → "Glow · GHK-Cu clinical results"

Every hero, every tile, every card image asks: **"What benefit does this image PROVE?"**

## 2. LOCKED TOKENS (do not change)
- **Colors:** `--nx-black: #0A0A0A`, `--nx-ceramic: #FFFFF3`, `--nx-rock: #E8E4DA`, `--nx-acid: #C6FF3D` (CTAs only)
- **Cobalt:** `--nx-cobalt` (biomarker highlight) — DO NOT RENAME
- **Font:** General Sans (400/500/600/700). No Instrument Serif in new work. **NO ITALICS ANYWHERE.**
- **Grid:** `nx-container` (max-width 1280, px-6 mobile / px-8 desktop)
- **Radii:** 12px (buttons), 16px (cards), 20px (large cards), 999px (pills)

## 3. TILE SIZING (fixed by Hims/Maximus study)
- **Category tiles:** 4-col on desktop (was 3), aspect 4/5 (was 3/4). Smaller category name (28-32px, not 40+). Eyebrow chip stays.
- **Product cards:** 3-col desktop, aspect 3/4. Peptide name in 20px, benefit in 13px muted.
- **Peptide tiles in strip:** 5-col desktop, aspect square. Vial-only shots, name below in 14px.

## 4. HERO PATTERNS (choose one per page)
- **A. Product-hero:** Left column text 7-col, right column benefit image 5-col aspect 4/5. Home uses this.
- **B. Data-hero:** Full-bleed dark background with giant number + one supporting portrait right. PDP + Bloodwork use this.
- **C. Editorial-hero:** Full-bleed cream background, giant serif-weight sans headline, no image. Legal/About use this.

## 5. TYPOGRAPHY SCALE (locked)
- Hero headline: clamp(56px, 8vw, 108px), weight 600, tracking -0.035em, line-height 0.98
- Section headline: clamp(40px, 5.2vw, 64px), weight 600, tracking -0.03em, line-height 1.02
- Card title: 20-28px depending on card size, weight 600
- Body: 16-18px, weight 400, line-height 1.55
- Eyebrow chip: 12-13px, weight 500, letter-spacing 0.08em, uppercase, muted color
- **NO WEIGHT 700+ FOR BODY.** Only headlines and CTA labels.

## 6. IMAGE GENERATION RULES
**Model:** `gpt_image_2` for portraits/product. `sora_2` for hero video (only if requested).

**Portrait prompts must include:**
- Specific benefit anchor (e.g., "visibly strong forearm veins," "luminous skin texture," "sharp intelligent eye contact")
- Editorial magazine lighting (warm side-light, natural window light, or clinical rim-light)
- 3:4 or 4:5 aspect for tiles
- **No smiling stock photos.** Editorial = intense, focused, natural
- Specific age/build/energy: "athletic man mid-30s," "distinguished silver-haired man 50s," "focused executive woman 40s"

**Reject if the image could sell:** yogurt, insurance, a bank account. It must ONLY sell Nexphoria's specific benefit.

## 7. COPY RULES
- No hedging ("may help," "could support"). Use clinical, definitive language backed by studies.
- Every claim has a peptide name and mechanism next to it
- No italics. No exclamation marks. No em-dash filler.
- CTAs: verbs first ("Start assessment", "See protocols", "Book intake"), never noun-phrases

## 8. FILES TO NEVER TOUCH
- `client/src/components/SiteLayout.tsx` (nav is locked — Wave 10 confirmed)
- `client/src/index.css` token block (:root vars)
- `client/src/data/peptides.ts` (product data)
- Anything under `client/src/pages/legal/`

## 9. AGENT COORDINATION
- Each agent works in one page cluster. Write image files to `client/src/assets/nx_v11_<agent>_<name>.webp`.
- Commit with prefix `[AGENT-N]` so we can trace conflicts.
- If two agents need to touch the same shared component, the one that touches it first wins; the second agent extends via props.
- All agents preload skills: `website-building/webapp`, `design-foundations`, `media`.
