# NEXPHORIA — MAXIMUS x100 EDITORIAL UPGRADE BRIEF

**Mission:** Transform the site from "well-designed AI build" → "$50M brand with real photography." Every page must feel like Vogue, Hodinkee, or Equinox + Function Health had a love child. Editorial cinema, not stock health. We have a partner pitch coming.

**You are the closer.** This is the final integration pass. Do not redesign the visual system — extend it. Inject real-feeling editorial photography across every page. Make every interior page feel like a single editorial spread.

---

## 1 — NEW PHOTOGRAPHY LIBRARY (already in repo)

All in `/home/user/workspace/nexphoria-site/client/src/assets/brand/editorial/`:

| File | Subject | Aspect | Use for |
|---|---|---|---|
| `editorial-hero-home.png` | Sweat-portrait man, sun streaks, sweat on jawline | 16:9 | **HOME — Act 1 cinematic brand hero** (NEW SECTION before product lineup) |
| `editorial-lab-hands-vial.png` | Black-gloved hands holding unmarked vial | 16:9 | Pharmacy strip, HowItWorks Act II, Science page |
| `editorial-pharmacy-process.png` | Lab tech in cleanroom with vial tray | 16:9 | HowItWorks Act III "ship", Science |
| `editorial-kit-unbox.png` | Matte black kit with vials + syringes | 16:9 | Pricing, Protocols catalog ambient, HowItWorks |
| `editorial-lab-bloodwork.png` | Blood-collection tubes blank labels | 16:9 | LabTesting hero, HowItWorks Act IV |
| `editorial-md-endo.png` | Indian male physician, gray temples | 3:4 | Physicians MD card (Endocrinology) |
| `editorial-md-internal.png` | Olive-skinned female in turtleneck | 3:4 | Physicians MD card (Internal Medicine) |
| `editorial-md-functional.png` | Silver-haired male, clean white coat | 3:4 | Physicians MD card (Functional Medicine) |
| `editorial-md-sports.png` | Black female, curly hair | 3:4 | Physicians MD card (Sports Medicine) |
| `editorial-lifestyle-morning.png` | Man at kitchen, golden hour, vial on counter | 16:9 | Home Act 1 brand intro, About mission |
| `editorial-lifestyle-recovery.png` | Black athletic man, post-workout cooldown | 16:9 | Wolverine protocol context, Community |
| `editorial-lifestyle-night.png` | Woman in silk pajamas, holding vial, warm lamp | 16:9 | Deep (sleep) protocol context |
| `editorial-lifestyle-consult.png` | Handshake across dark wood desk | 16:9 | Physicians page, Assessment interstitial, About |

All photos: deep obsidian-black backgrounds, subtle acid-green #c6f184 atmospheric haze (10%), Peter Lindbergh / Annie Leibovitz / Platon editorial aesthetic. They share a visual language. **Use them generously** — every long page must have ≥2 editorial photo moments breaking up the type.

---

## 2 — WHAT TO BUILD

### A. HOME PAGE — Add Act 1 Cinematic Editorial Opener (BEFORE existing Hero)

**Current Home structure:**  Hero (vial lineup) → IndexStrip → HowItWorks → FeaturedProtocols → ProtocolCatalog → Outcomes → TrustStrip → ClosingCta.

**New structure:**
1. **NEW: `CinematicOpener`** — full-bleed editorial moment, 100vh on desktop, 70vh mobile
   - Background image: `editorial-hero-home.png` with subtle dark gradient overlay (bottom 40% fades to #0a0a0a)
   - Top-left: tiny eyebrow `NEXPHORIA · CIRCA 2026` in mono
   - Center-left positioned headline (60ch max): "The body, **prescribed.**" with "prescribed." in Gambarino italic acid-green
   - Bottom-left: 1-line subhead "Peptide protocols. Compounded in U.S. pharmacies. Reviewed by MDs."
   - Bottom-right corner: mono scroll cue "↓ continue"
   - NO blur, NO parallax, NO scroll motion (locked constraint)
   - prefers-reduced-motion respected — but no motion required anyway
2. Hero (existing vial lineup) — UNCHANGED
3. **NEW: editorial photo break between sections** — insert `editorial-lifestyle-morning.png` as a full-bleed 70vh band after `FeaturedProtocols`, with a single line of copy laid over it on the left: "Eight weeks in, the difference is in the data — and in the mirror."
4. Rest of Home unchanged.

**Important:** Home is the showcase exception — multiple Gambarino italics permitted across sections. Interior pages: ONE italic only.

### B. PHYSICIANS PAGE — Wire in 4 new MD portraits

- Update `/home/user/workspace/nexphoria-site/client/src/data/physicians.ts`:
  - Replace `md1`/`md2`/`md3`/`md4` imports with the 4 new editorial photos
  - Match specialty to portrait:
    - `editorial-md-functional.png` → Dr. Maya Iyer (Functional Medicine) ← NO, the silver-haired man is functional. Update name to be male: **"Dr. James Whitlock, MD" Functional Medicine** (silver hair fits)
    - `editorial-md-endo.png` → **Dr. Arjun Patel, MD** Endocrinology (Indian male, gray temples)
    - `editorial-md-internal.png` → Dr. Elena Vasiliev (keep — olive-skinned female fits) **Internal Medicine**
    - `editorial-md-sports.png` → **Dr. Imani Carter, MD** Sports Medicine (Black female fits)
  - Adjust NPI/license/bio text minimally to match new names
- Upgrade MD card layout: photo aspect ratio 3:4, larger (180×240 minimum), full editorial portrait visible
- Replace the existing `heroPhysician` import at top of Physicians.tsx with `editorial-lifestyle-consult.png` for the hero side image (the handshake — perfect for medical authority hero)

### C. HOWITWORKS PAGE — Inject editorial process photography

- Act II "MD Reviews" section → insert `editorial-md-internal.png` (or any portrait) as side image, full bleed
- Act III "Pharmacy compounds" → insert `editorial-pharmacy-process.png` full-bleed
- Act IV "Quarterly labs" → insert `editorial-lab-bloodwork.png` full-bleed
- Each section: large editorial photo, sparse type, NO icons over the photo, photo is the visual

### D. LABTESTING PAGE — New hero + supporting imagery

- Hero: replace any existing background with `editorial-lab-bloodwork.png`, dark gradient overlay, headline "What your blood is **telling us.**" (Gambarino italic on "telling us.")
- Mid-page: `editorial-pharmacy-process.png` for the "how panels are processed" section

### E. ABOUT PAGE — Mission-first editorial spread (no founders)

- Hero: `editorial-lifestyle-morning.png` full-bleed 80vh
- Headline overlay: "We didn't start a clinic. We rebuilt **the standard.**" (Gambarino on "the standard.")
- Mission body (mission-first, NO founder bios): 3-paragraph block on second screen, large editorial type, generous white space
- Below: `editorial-lifestyle-consult.png` as visual support for "What an actual physician relationship looks like" section
- Locked constraint: NO founders, mission-first

### F. SCIENCE PAGE — Add editorial visual rhythm

- Hero: keep existing if any, but insert `editorial-lab-hands-vial.png` as a section break image at 70vh
- Add citation cards with the photo as a backdrop layer

### G. COMMUNITY PAGE — Add lifestyle imagery

- Hero: `editorial-lifestyle-recovery.png` (Black athletic man, post-workout cool-down) full-bleed
- Headline: "Built **alongside** athletes, MDs, founders." (Gambarino on "alongside")

### H. PROTOCOLS PAGE — Catalog gets ambient context

- Above the protocol grid: editorial band using `editorial-kit-unbox.png` 50vh, copy: "Five protocols. **One standard.**" (Gambarino on "One standard.")

### I. STACKREVEAL pages — leave as-is (already v3, working perfectly)

---

## 3 — LOCKED CONSTRAINTS (DO NOT VIOLATE)

- ✅ Tagline locked: "Science you can feel. Results you can measure."
- ✅ Never use the word "nootropics" — always "peptides"
- ✅ Hero NEVER blurs, NEVER scales on scroll, NEVER parallax
- ✅ State: in-memory only — NO localStorage/sessionStorage/cookies
- ✅ One Gambarino italic per interior page (Home is showcase exception with multiple italics)
- ✅ prefers-reduced-motion respected
- ✅ About page: mission-first, no founder bios
- ✅ StartIntakeButton props: `productSlug` + `source`
- ✅ Tokens (LOCKED_DESIGN_SPEC.md): bg `#0a0a0a`, fg `#fffff3`, accent `#c6f184`, border `#2a2a28`
- ✅ Fonts: Switzer / Gambarino italic 400 / JetBrains Mono via Fontshare CDN

---

## 4 — TECHNICAL EXECUTION

### Build commands
```bash
cd /home/user/workspace/nexphoria-site && npm run build
```

### Production server (KEEP ALIVE)
A production server is already running on port 5000. If you need to restart:
```bash
pplx-tool start_server <<'JSON'
{"command":"NODE_ENV=production node dist/index.cjs","project_path":"/home/user/workspace/nexphoria-site","port":5000}
JSON
```
Use api_credentials=["pplx-tool:start_server"].

### Deploy (DO NOT RUN — main agent handles deploy)
You will hand control back to the main agent for the final deploy. Just build, QA, and report.

### Playwright QA — REQUIRED
After build completes, screenshot EVERY route at BOTH viewports:
- Desktop: 1440×900
- Mobile: 375×812

Routes to test:
- `/`
- `/protocols`
- `/protocols/wolverine`
- `/protocols/glow`
- `/protocols/longevity`
- `/protocols/sleep`
- `/protocols/lean`
- `/physicians`
- `/how-it-works`
- `/lab-testing`
- `/science`
- `/about`
- `/community`
- `/peptides`
- `/pricing`
- `/faq`
- `/contact`

Check for:
- Text overflow / wrapping / mid-word breaks
- Image loading (no broken images)
- Italic count per interior page (exactly 1, except Home)
- "peptides" — never "nootropics"
- Hero no blur/scale
- Mobile layouts: image bands switch to vertical stack appropriately

### Image import pattern
Always use Vite's `@assets` alias:
```tsx
import editorialHero from "@/assets/brand/editorial/editorial-hero-home.png";
```

### Performance
- Photos are large (~2MB each). Use `loading="lazy"` on all editorial images EXCEPT the very first Home cinematic opener.
- All photo bands: `<img>` with `object-cover` and `object-position: center` unless otherwise specified.

---

## 5 — REPORT BACK

When you're done, save a summary to `/home/user/workspace/nexphoria-site/MAXIMUS_X100_BUILD_SUMMARY.md` with:
- Files modified
- Build success confirmation
- QA result for each route (pass/fail with notes)
- Any locked-constraint risks you encountered and how you resolved them
- Confirmation that `dist/public` is ready to deploy

**Quality bar:** This is going in front of a $50M investor partner. Every screen must feel like a real publication. If something looks AI-generated, fix it. If a section feels empty without a photo, add one (you have a generous library).

GO.
