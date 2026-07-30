# LEGITSCRIPT READINESS CHECKLIST — 2026-07-29

Source of truth: Bask onboarding requirements (Mason Yoon, #nexphoria-bask
Slack, 7/28) + #compliance-legitscript channel brief. The Slack canvas
("LegitScript Website Preparation", F0BKZ2E0QP5) is not API-readable on the
current Slack plan — Chiya: paste its contents here if it holds items beyond
Mason's message, and they'll be folded in.

Statuses: ✅ verified done · 🔧 done this pass (2026-07-29) · ⏳ NEEDS CHIYA
· 🏗️ needs Bask/vendor · ☐ open build item.

## 1 · General site requirements
- ✅ **No dead links** — 49/49 smoke routes pass; 114/115 sitemap URLs
  crawl-verified 200 (the 115th is the sitemap itself); footer + legal +
  questionnaire links all resolve. Re-verified every commit by CI.
- ⏳ **Login / Patient Portal link** — portal.nexphoria.com is a Bask
  domain; needs the DNS A records (see §4) before the nav "Member login"
  target can point at it. Currently routes to /assessment (functional, not
  dead — swap when portal is live).
- 🏗️ **GLP-1 questionnaire links** — come from Bask once configured
  (marked TBD by Mason). Wire into Ignite/GLP-1 pages when issued.

## 2 · Required policies in the footer (each with business address + phone)
- ✅ All five policies exist and are footer-linked: Terms · Privacy ·
  Refund · Telehealth Consent · HIPAA notice (plus Prescribing Policy and
  State Availability beyond the requirement).
- 🔧 **Business-contact block added to every legal page** (LegalLayout):
  renders "Nexphoria Research LLC · [address] · [phone] · hello@nexphoria.com".
- ⏳ **Business address + phone number** — the block ships with entity +
  email only until Chiya supplies both in `client/src/data/compliance.ts`
  (BUSINESS.address / BUSINESS.phone). One-line fill, applies to all pages.
- ⏳ **Policy templates from Bask** — Privacy/ToS/Refund should be rebased
  on Bask's questionnaire templates ("revise Beluga to Arora Health").
  Needs the template docs from the Bask dashboard (Slack attachments are
  not API-readable). Current policies are strong but not the Bask text.
- ⏳ **HIPAA Privacy Policy template** — Mason linked a Google Doc
  (HIPAA Compliance - Privacy Policy Template-3.docx). Chiya: export/paste
  it and the /legal/hipaa-notice page gets rebased on it same-day.

## 3 · Provider + pharmacy information (verbatim Bask text)
- 🔧 **FAQ entries added** with the exact blocks: "Who provides the
  clinical care?" (Arora Health & Aesthetics, LLC — Seattle, WA;
  medicalcompliance@arorahealthgroup.com) and "Which pharmacy fills the
  prescriptions?" (VialsRX — 6220 Westpark Dr, Houston, TX; (713) 497-5590;
  vials.ai; state-variation note included).
- 🔧 **Provider entity corrected sitewide** — user-facing references to
  "MDI Providers PLLC" replaced with "Arora Health & Aesthetics, LLC"
  (WorldHome FAQ, HomeTrust band). CLAUDE.md's MDI note is now historical.
- ⏳ **Arora provider bio + headshot** — usable only after Chiya signs and
  returns the Medical Licensing Agreement (Arora Media Licensing Consent,
  attached in Slack). Unblocks the named-provider/E-E-A-T slot too.

## 4 · Compliance language (Very Important per Bask)
- 🔧 **No affirmative FDA-approval claims for compounded meds** —
  tesamorelin's three "FDA-approved (Egrifta)" claims rephrased to Phase 3
  trial evidence + explicit "compounded tesamorelin is not FDA-approved or
  evaluated"; VialTile "FDA-approved molecule" chip → "Phase 3-studied
  molecule". The standing NOT-approved disclosures (PDP FAQs, footer,
  fdaStatus lines) are the correct pattern and remain.
- ✅ **No brand-equivalence language** — zero instances of "same as /
  equivalent to / generic version of" Ozempic/Wegovy/etc. The footer
  trademark disclaimer states non-affiliation (approved pattern).
- ✅ **Approved 503A phrasing** in use sitewide ("compounded in
  state-licensed 503A pharmacies", "under USP <797>").

## 5 · Bask platform configuration (dashboard-side, Chiya + Bask)
- ⏳ General + Domains sections (Mason's "PLEASE FOCUS") — Bask dashboard.
- ⏳ **DNS**: A records for portal.nexphoria.com + intake.nexphoria.com
  (values come from Bask; added in Cloudflare DNS — do NOT touch apex
  records). Atlas or Chiya in the Cloudflare dashboard.
- ⏳ **Payments**: Stripe connection inside Bask (separate from the site's
  gift Payment Links; one Wolverine gift product exists so far).
- ⏳ **GA + GTM IDs** into Bask (and VITE_GA4_ID for the site — the site's
  25-event analytics scaffold lights up the moment the ID exists).
- ⏳ Notification email customization.

## 6 · Process
- 🏗️ Mason (Bask) audits the site as updates land → submits for
  LegitScript certification.
- 🏗️ Peptide LegitScript approval tracked with Bask/CSN (30–60 days;
  marketing plans pre-launch content accordingly).
- ☐ When Mason's audit begins, hand him the live URL + this checklist.

## The short version of what's left
**Chiya (five items, ~30 min total):** business address + phone · Bask
policy templates (or dashboard access) · HIPAA template text · signed
Arora media agreement · GA/GTM IDs.
**Bask:** DNS record values · GLP-1 questionnaire links · portal URL.
**Site (this repo):** done for every item actionable today; re-audits run
in CI on every push.
