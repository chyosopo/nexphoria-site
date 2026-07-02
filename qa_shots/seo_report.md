# Nexphoria SEO Enhancement Report
**Date:** 2026-07-01  
**Build status:** ✅ Clean (2797 modules, 0 errors)  
**Sitemap URLs:** 73  
**robots.txt:** Updated with Disallow for /cart, /checkout, /showcase + AI-crawler allowlist

---

## 1. Page-by-page Title + Description

### Core / Home

| Page | Title | Description | jsonLd added |
|------|-------|-------------|--------------|
| Home (`/`) | Peptide therapy that works — physician-prescribed, lab-monitored | Repair faster, sleep deeper, lose fat, sharpen focus. Physician-prescribed peptide protocols compounded in U.S. 503A pharmacies. Quest bloodwork every 90 days. Results you can measure. | `webPageJsonLd` added |
| Gate (`/`) | Nexphoria — peptide therapy, physician-prescribed and lab-monitored | Single peptides, physician-curated stacks, or a fully custom protocol. Every compound prescribed by a board-certified physician and compounded in a U.S. 503A pharmacy. Tell us your goals. | `webPageJsonLd` added |
| MenHome (`/men`) | Peptide protocols for men — strength, fat loss, recovery, drive | Build muscle, cut fat, recover faster, sharpen focus. Physician-prescribed peptide protocols for men — GLP-1, BPC-157, Ipamorelin and more. 503A compounded, lab-monitored. | `webPageJsonLd` added |
| WomenHome (`/women`) | Peptide protocols for women — glow, metabolic, longevity | Smoother skin, leaner metabolism, deeper sleep, sharper cognition. Physician-prescribed peptide protocols for women — GHK-Cu, Tirzepatide, Epitalon and more. 503A compounded, lab-monitored. | `webPageJsonLd` added |

### Peptides

| Page | Title | Description | jsonLd added |
|------|-------|-------------|--------------|
| Peptides (`/peptides`) | Peptide catalog — BPC-157, GLP-1, NAD+, Epitalon and 16 more | Browse 16+ physician-prescribed peptides: BPC-157, TB-500, GHK-Cu, Tirzepatide, Epitalon, NAD+, MOTS-c. Filter by goal, evidence tier, and route. Every compound compounded in a U.S. 503A pharmacy. | `webPageJsonLd` added |
| PeptideDetail (`/peptides/:slug`) | `{peptide.name} — {peptide.tagline}` (e.g. "BPC-157 — The repair signal.") | `{name} ({fullName}): {summary} Physician-prescribed and compounded in a U.S. 503A pharmacy.` (160 chars max) | Already had `productJsonLd`, `breadcrumbJsonLd`, `medicalBusinessJsonLd` — description improved |
| GenderPeptides (`/men/peptides`) | Peptides for men — BPC-157, Ipamorelin, GLP-1, NAD+ and more | Physician-prescribed peptides for men: strength, fat loss, recovery, cognition. Every compound 503A compounded, batch-tested, and lab-monitored by a board-certified physician. | `webPageJsonLd` added |
| GenderPeptides (`/women/peptides`) | Peptides for women — GHK-Cu, Tirzepatide, Epitalon and more | Physician-prescribed peptides for women: skin, metabolic, longevity, hormonal balance. Every compound 503A compounded, batch-tested, and lab-monitored by a board-certified physician. | `webPageJsonLd` added |
| GenderPeptideDetail (`/{gender}/peptides/:slug`) | `{name} — {tagline}` (e.g. "GHK-Cu — The skin reset.") | `{name} ({fullName}): {summary} Physician-prescribed and compounded in a U.S. 503A pharmacy.` (160 chars) | `productJsonLd` + `breadcrumbJsonLd` added |

### Stacks / Protocols

| Page | Title | Description | jsonLd added |
|------|-------|-------------|--------------|
| StackIndex (`/stacks`) | Physician-curated peptide stacks — repair, sleep, metabolic, longevity | Six physician-designed peptide stacks — Wolverine, Glow, Restore, Clarity, Prime, Balance. Each bundled and lab-gated. Prescribed, compounded in a U.S. 503A pharmacy, monitored every 90 days. | `webPageJsonLd` + `faqJsonLd` + `breadcrumbJsonLd` — **NEW PAGE** |
| StackDetail (`/stacks/:slug`) | `{stack.name} — {tagline} \| Physician-prescribed peptide stack` | `{purpose} Physician-prescribed… {bestFor}. Monitored with biomarker tracking every 90 days.` (160 chars) | `productJsonLd` + `webPageJsonLd` + `breadcrumbJsonLd` — **NEW PAGE** |
| Protocols (`/protocols`) | Peptide protocols — recovery, skin, sleep, metabolic, longevity | Six physician-designed peptide stacks for recovery, skin, sleep, cognition, metabolic health, and longevity. 503A compounded, lab-gated, and physician-monitored from first dose to final draw. | Already had `webPageJsonLd` + `breadcrumbJsonLd` — copy improved |
| StackReveal (`/protocols/:slug`) | `{stack.name} — {tagline} \| Physician-prescribed stack` | `{purpose} Physician-prescribed and compounded in a U.S. 503A pharmacy. {bestFor}.` (160 chars) | Added `breadcrumbJsonLd`; `productJsonLd` improved |
| GenderProtocols (`/{gender}/protocols`) | Peptide stacks for men/women — recovery, metabolic… | Physician-designed multi-peptide stacks with specific compounds listed. 503A compounded, lab-gated. | `webPageJsonLd` added |
| BuildYourStack (`/stacks/build`) | Build your own peptide stack — custom, physician-reviewed | Pick your goal, choose 2–4 compatible peptides, lock in a bundle discount. Every custom stack physician-reviewed, 503A compounded. | `webPageJsonLd` added (path also fixed — was missing) |

### Science & Education

| Page | Title | Description | jsonLd added |
|------|-------|-------------|--------------|
| Science (`/science`) | Peptide science — mechanisms, evidence, and clinical references | How GLP-1, BPC-157, GHK-Cu, Epitalon, and NAD+ actually work — receptor binding, downstream signaling, clinical trial data, and the evidence tier for every compound we prescribe. | `webPageJsonLd` (MedicalWebPage) added |
| HowItWorks (`/how-it-works`) | How peptide therapy works — intake, physician review, compound, deliver | 12-minute intake. Board-certified physician reviews your bloodwork within 24 hours. Protocol compounded in a USP <797> 503A pharmacy and cold-chain shipped to your door. | `webPageJsonLd` (MedicalWebPage) added |
| Bloodwork (`/bloodwork`) | Peptide therapy bloodwork — 38 biomarkers, every 90 days | N biomarkers across M Quest Diagnostics panels. Calibrate your protocol to your chemistry, not a population average. Results in your portal within 48 hours. Physician review included. | `webPageJsonLd` (MedicalWebPage) added |
| LabTesting (`/lab-testing`) | At-home lab testing — 38 biomarkers, Quest Diagnostics, every 90 days | Requisition in your portal, draw at 2,500+ Quest locations, physician-reviewed results in 48 hours. 38 biomarkers calibrate and track your peptide protocol from first dose to completion. | `webPageJsonLd` (MedicalWebPage) added |
| FAQ (`/faq`) | Peptide therapy FAQ — safety, legality, pricing, process | Answers to the most common questions about physician-prescribed peptide therapy: 503A compounding, side effects, pricing, how bloodwork works, and what to expect. | `webPageJsonLd` (MedicalWebPage) + `faqJsonLd` (all categories flattened) added |
| Assessment (`/assessment`) | Start your peptide protocol — 5-minute intake, physician review in 24h | Tell us your goals, history, and medications. A board-certified U.S. physician reviews your bloodwork and designs a 503A-compounded peptide protocol within 24 hours. | `webPageJsonLd` (MedicalWebPage) added |

### Journal

| Page | Title | Description | jsonLd added |
|------|-------|-------------|--------------|
| Journal (`/journal`) | Nexphoria Journal — peptide science, protocols, and physician notes | Long-form evidence reviews, protocol explainers, and physician notes on every peptide we prescribe. The science behind BPC-157, GLP-1, NAD+, Epitalon, and more — plainly written, rigorously sourced. | `webPageJsonLd` (MedicalWebPage) added |
| JournalArticle (`/journal/:slug`) | `{article.title}` (truncated to 55 chars if over) | `{article.dek}` (truncated to 155 chars if over) | `webPageJsonLd` (MedicalWebPage) + `breadcrumbJsonLd` — **NEW PAGE** |

### Trust / Company

| Page | Title | Description | jsonLd added |
|------|-------|-------------|--------------|
| Physicians (`/physicians`) | Nexphoria physicians — board-certified, Cleveland Clinic to Stanford | Every Nexphoria protocol is reviewed by a board-certified U.S. physician trained at Cleveland Clinic, Mayo, UCSF, Hopkins, or Stanford. No algorithms, no auto-approval. | `webPageJsonLd` (MedicalWebPage) added |
| About (`/about`) | About Nexphoria — physician-founded, pharmacy-grade peptide care | Nexphoria was built by physicians who got tired of seeing patients self-administer unverified compounds. Meet the team behind the only end-to-end peptide platform. | `webPageJsonLd` added |
| Community (`/community`) | Nexphoria community — clinical roundtables, outcomes, and education | Monthly clinical roundtables with board-certified physicians, peer outcome reports, and educational webinars on peptide therapy. | `webPageJsonLd` added |
| Contact (`/contact`) | Contact Nexphoria — physician questions, protocol support | Questions about peptide therapy, your protocol, or how to get started? We answer every message within 24 hours, Monday to Friday. | `webPageJsonLd` added |
| Pricing (`/pricing`) | Peptide therapy pricing — transparent, all-in, no lab upsell | Single peptides from $149/mo, physician-curated stacks bundled at 12% off. Quest bloodwork, physician consult, and refills all included. No hidden fees. | `webPageJsonLd` added |

### Legal

| Page | Title | Description | jsonLd added |
|------|-------|-------------|--------------|
| Legal (`/legal`) | Legal — Terms, Privacy, Telehealth Consent, Refund Policy | Nexphoria legal documents: Terms of Service, Privacy Policy, Telehealth Consent, and Refund Policy. Governed by U.S. telehealth and compounding pharmacy law. | `webPageJsonLd` added |
| LegalIndex (`/legal`) | Legal — Terms, Privacy, Telehealth Consent, Refund Policy | (same as above — synced) | — |
| Privacy (`/legal/privacy`) | Privacy Policy \| Nexphoria | How Nexphoria collects, uses, and protects your personal and health information. HIPAA-compliant. | Existing |
| Terms (`/legal/terms`) | Terms of Service \| Nexphoria | Service agreements, user eligibility, and platform terms for Nexphoria peptide therapy. | Existing |
| TelehealthConsent (`/legal/telehealth-consent`) | Telehealth Consent \| Nexphoria | Consent to receive care via telehealth and off-label prescribing of compounded peptides. | Existing |
| RefundPolicy (`/legal/refund-policy`) | Refund Policy \| Nexphoria | Cancellation, returns, and refund request procedures for Nexphoria subscriptions. | Existing |

### Noindex pages (transactional / internal)

| Page | Robots | Implementation |
|------|--------|----------------|
| Cart (`/cart`) | `noindex, nofollow` | `useEffect` imperative meta tag — title set to "Your Cart \| Nexphoria" |
| Checkout (`/checkout`) | `noindex, nofollow` | `useEffect` imperative meta tag — title set to "Checkout \| Nexphoria" |
| Showcase (`/showcase`) | `noindex, nofollow` | `useSeo` + `useEffect` imperative robots meta |
| Not Found (`/404`) | `noindex, nofollow` | `useSeo` (title: "Page not found") + `useEffect` imperative robots meta |

---

## 2. Pages with jsonLd added (this session)

| Page | jsonLd types |
|------|-------------|
| Home | `webPageJsonLd` (added to existing `orgJsonLd` + `medicalBusinessJsonLd`) |
| Gate | `webPageJsonLd` |
| MenHome | `webPageJsonLd` |
| WomenHome | `webPageJsonLd` |
| Peptides | `webPageJsonLd` (added to existing `orgJsonLd` + `medicalBusinessJsonLd`) |
| GenderPeptides | `webPageJsonLd` |
| GenderPeptideDetail | `productJsonLd` + `breadcrumbJsonLd` |
| StackIndex | `webPageJsonLd` + `faqJsonLd` + `breadcrumbJsonLd` |
| StackDetail | `productJsonLd` + `webPageJsonLd` + `breadcrumbJsonLd` |
| StackReveal | Added `breadcrumbJsonLd` (had `productJsonLd`) |
| GenderProtocols | `webPageJsonLd` |
| BuildYourStack | `webPageJsonLd` |
| Science | `webPageJsonLd` (MedicalWebPage) |
| HowItWorks | `webPageJsonLd` (MedicalWebPage) |
| Bloodwork | `webPageJsonLd` (MedicalWebPage) |
| LabTesting | `webPageJsonLd` (MedicalWebPage) |
| FAQ | `webPageJsonLd` (MedicalWebPage) + `faqJsonLd` (all 35+ FAQ items) |
| Assessment | `webPageJsonLd` (MedicalWebPage) |
| Journal | `webPageJsonLd` (MedicalWebPage) |
| JournalArticle | `webPageJsonLd` (MedicalWebPage) + `breadcrumbJsonLd` |
| Physicians | `webPageJsonLd` (MedicalWebPage) |
| About | `webPageJsonLd` |
| Community | `webPageJsonLd` |
| Contact | `webPageJsonLd` |
| Pricing | `webPageJsonLd` |
| Legal | `webPageJsonLd` |

---

## 3. Sitemap

- **File:** `client/public/sitemap.xml` → auto-copied to `dist/public/sitemap.xml` on build
- **URL count:** 73
- **Coverage:** Home, men/women homes, assessment, pricing, all 16 peptide PDPs, gender peptide variants, stacks catalog + 6 stack detail pages, stacks/build, protocols + 6 protocol reveal pages, gender protocol pages, science, how-it-works, bloodwork, lab-testing, FAQ, journal hub + 8 journal articles, physicians, about, community, contact, legal hub + 4 legal docs

**robots.txt updates:**
- Added `Disallow: /#/cart`, `Disallow: /#/checkout`, `Disallow: /#/showcase`
- Retained existing AI-crawler allowlist (GPTBot, PerplexityBot, ClaudeBot, etc.)
- `Sitemap:` reference unchanged

---

## 4. index.html upgrades

- `theme-color` split into light (`#FAF7F0`) and dark (`#0A0A0A`) media queries
- Added `<link rel="alternate" hreflang="en-US" href="https://nexphoria.pplx.app/" />`
- Added `<link rel="preload" as="image" href="/og/og-default.png" />` for OG image LCP
- MedicalOrganization + WebSite JSON-LD confirmed present (unchanged)

---

## 5. Alt text

All `<img>` tags verified:
- `MaximusTile.tsx` line 153: uses `alt={alt}` prop — ✅
- `Science.tsx` line 825: descriptive alt — ✅
- `WomenHome.tsx` WomenHeroDark tiles: was `alt=""` → fixed to `` `${t.label} peptide protocol for women` `` — ✅
- `Home.tsx` condition tiles: `alt=""` inside `aria-hidden` parent — correct per WCAG (purely decorative)
- All other dynamic images (physicians, journal articles, stacks) use data-driven alts (`doc.name`, `article.title`, `stack.name`) — ✅

---

## 6. Issues / Notes

| Issue | Status |
|-------|--------|
| AssessmentParts.tsx — this is a component file (exported UI pieces, no routing), not a page | Comment added; SEO handled by Assessment.tsx |
| Hash routing (`/#/route`) — Google can index fragment URLs but crawl rate may be lower than clean URLs. Sitemap uses hash format to match actual URLs. | Known limitation of wouter hash routing. No change made per constraints. |
| Twitter site handle (`twitter:site`) — not added to index.html as handle is unknown | Skipped — `twitter:card`, `twitter:title`, `twitter:description`, `twitter:image` all present via useSeo |
| LCP hero image preload in index.html — hero image is a Vite-processed `.webp` (hashed filename). Cannot preload with a static path. | Preloaded `/og/og-default.png` instead. For true hero LCP preload, a build plugin would be needed. |
| PeptideDetail `tagline` field — exists on all 16 peptides ✅. Title now uses `{name} — {tagline}` format giving benefit-led titles like "BPC-157 — The repair signal." |  |
