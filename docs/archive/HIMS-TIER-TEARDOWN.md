# HIMS-TIER TEARDOWN — North-Star Spec
*Concrete, copy-ready patterns from top DTC telehealth/longevity sites, distilled into buildable upgrades for Nexphoria (Porcelain & Navy palette, institutional bank voice, men=navy / women=rose). Source: research agent teardown 2026-07-03.*

## hims.com / forhers.com (gold standard)
- **Hero:** full-width, left-aligned benefit-first headline over right-aligned imagery. Headline = benefit + metric. Sub = specific metric + product. Primary CTA directly under sub; secondary text link below.
- **Nav:** horizontal top bar, sticky after ~80px, transparent→solid on scroll with subtle shadow; active state = 2px accent underline (teal hims / rose hers).
- **Product pages:** name + badge (Rx-only/OTC) + LARGE bold price; doctor photo+credential just below price; 3-step horizontal "how it works" (verb-first: Consult/Receive/Repeat); testimonial carousel (headshot, name, age, ★★★★★); membership fee in small text under price.
- **Trust:** physician grid (4-6 headshots + name + specialty + one-line credential); press-logo strip; animated stat counters (+2M members, +10k reviews); guarantee badge near CTA.
- **Motion:** product cards lift 4px + shadow on hover; scroll fade-up (translateY 20px, ~0.6s ease-out); primary button scale 1.05 on press.
- **Type:** H1 48/56 bold, H2 32/40, body 18/28; 24px vertical rhythm; sections 96px desktop / 64px mobile; generous hero side-padding.
- **Color/imagery:** navy primary + porcelain cards + accent; product shots on white, lifestyle photos for benefit sections.
- **Conversion:** hero CTA → multi-step quiz w/ progress bar; large icons, one choice/step, inline validation ("Great choice!"); outcome page shows product + price + "Start consultation" + "Licensed physicians review your answers" badge.

## Ro (ro.co)
- Thin full-width announcement bar above nav with value prop + "Check eligibility".
- Hero = high-production video/parallax; benefit + metric headline.
- Nav CTA duplicated top-right (high-contrast button).
- "How it works" = vertical accordion (click to expand).
- Social proof = video testimonials (thumbnail + play), quote cards.
- Clinician grid w/ credentials; hospital/clinic partnership logos.

## Function Health / Superpower (longevity/labs)
- Lead with the DATA: marker counts, biological-age framing, dashboard previews.
- Trust through competence: clinical imagery, marker science, physician review.
- Panel/tier comparison tables; "which panel do I need" mapper.

---

## TOP 15 CONCRETE UPGRADES (ranked by visual-impact-per-effort)
Buildable in React/CSS, honor Porcelain & Navy + bank voice + two worlds.

1. **Sticky nav w/ scroll transition** — transparent→solid + shadow after 80px; 2px world-accent underline on active. (E)
2. **Scroll fade-up on every section** — IntersectionObserver, translateY(20px)→0, 0.6s ease-out, reduced-motion safe. (E)
3. **Hover-lift on all cards** — translateY(-4px) + shadow, one grammar everywhere. (E)
4. **Animated stat counters** — count-up on scroll-in (members, markers, reviews). (E-M)
5. **Physician-credential trust rows** — headshot + name + specialty + one-liner (gated on real names — placeholder framework now). (M)
6. **Press-logo strip** — labeled illustrative until real placements. (E)
7. **Guarantee/"you only pay if prescribed" badge near every CTA.** (E)
8. **3-step "how it works" horizontal band** — verb-first, icon + line, on home + PDP. (M)
9. **Announcement bar** — thin, value prop + eligibility CTA. (E)
10. **Testimonial/quote cards** — honest pre-launch framing, no fake reviews. (M)
11. **Bigger hero type + tighter measure** — H1 to display scale, benefit-first. (E)
12. **Section rhythm tokens** — standardize vertical padding (96/64). (M)
13. **Quiz progress bar + inline validation** — on Assessment flow. (M)
14. **Outcome/results imagery grade** — one LUT across all photography. (imagery — Bloom)
15. **Marker-count / biological-age framing** on Bloodwork (Function Health lever). (M)

Legend: (E)=easy (M)=medium. Items 1-3,6,7,9,11 are pure CSS/React, no Bloom, no user gates — DO FIRST.
