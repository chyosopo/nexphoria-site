# LEGITSCRIPT READINESS CHECKLIST — 2026-07-29

Source of truth: Bask onboarding requirements (Mason Yoon, #nexphoria-bask
Slack, 7/28) + #compliance-legitscript channel brief. The Slack canvas
("LegitScript Website Preparation", F0BKZ2E0QP5) is not API-readable on the
current Slack plan — Chiya: paste its contents here if it holds items beyond
Mason's message, and they'll be folded in.

Statuses: ✅ verified done · 🔧 done this pass (2026-07-29) · ⏳ NEEDS CHIYA
· 🏗️ needs Bask/vendor · ☐ open build item.

## 1 · General site requirements
- ✅ **No dead links** — verified by `npm run audit:legitscript` against the
  RENDERED artifact: every same-origin href on all 57 prerendered pages
  resolves. (The former "114/115 sitemap URLs" line was measured at a
  115-route catalog and went stale silently when the launch scope cut it to
  57 — which is exactly why this is now a gate, not a sentence.)
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

## Machine-verified as of 2026-08-12 (`npm run audit:legitscript`)
Run against the built artifact, never source — a requirement can be satisfied
in source and still fail to render. **0 site-side failures, 7 vendor-blocked.**
Verified: no dead links (57 pages) · all five policies exist AND are
footer-linked · business-contact block renders on every legal page · provider
+ pharmacy named with contact details on /faq · no stale "MDI Providers" ·
no RUO language (one documented exemption, the article that repudiates
gray-market labels) · no brand-equivalence · no FDA-approval claim for what we
dispense · all 4 product pages carry the non-approval disclosure · 503A
language present.

Two defects the gate caught on first run, both since fixed: dead
/men/assessment and /women/assessment links introduced by GoalTriage
(/assessment is not worlded), and the catalog cut had left the dead-link
figure above overstated.

## The short version of what's left
**Chiya (five items, ~30 min total):** business address + phone · Bask
policy templates (or dashboard access) · HIPAA template text · signed
Arora media agreement · GA/GTM IDs.
**Bask:** DNS record values · GLP-1 questionnaire links · portal URL.
**Site (this repo):** done for every item actionable today; re-audits run
in CI on every push.


---

## ADDENDUM — RUO + claims perfection pass (2026-08, agent-audited)

Two Explore agents swept every user-facing file. Every LIVE finding fixed;
verified against the real tree, all 5 gates green.

### RUO language — eliminated (the hard-fail category)
- **Footer "For research purposes only."** removed from the sitewide FDA
  disclaimer (both render branches); required FDA/compounding text kept.
  testid `footer-research-disclaimer` → `footer-fda-disclaimer`.
- "research-grade" as a self-description → removed (pricing.ts comment).
- Comparative RUO phrasing ("research-grade peptides… not for human use")
  in FAQ + Science reworded to "unregulated online peptides / no physician
  oversight" — same argument, without putting the trigger phrases on our
  own domain for a reviewer's crawler.
- KEPT (documented decision): the Journal article "legal landscape of
  compounded peptides" quotes "for research only / not for human
  consumption" to REPUDIATE gray-market vendors and tell readers not to
  self-administer. This is pro-compliance educational content and is the
  strongest on-site evidence of legitimacy; removing it would weaken the
  posture. Flag for Mason if he wants the section anchor renamed.

### Claim red-flags — fixed
- "Reverse visible aging from the inside" (BuildYourStack) → "supported
  from the inside".
- "anti-aging" (Science verdict) → removed; "First-choice… post-surgical"
  → hedged.
- BPC-157 "used to accelerate… healing" → "investigated for… repair";
  Thymosin-α1 "restores age-related decline" → "studied for"; Cerebrolysin
  stroke/dementia clinical-use line → hedged + "not FDA-approved in the US".
- Epitalon "The clock you can rewind" → "Studied at the cellular clock".
- Quantified anxiety-score outcome → hedged; GHK "Safe" → "well-tolerated
  in published studies".
- FDA-approved-vs-compounded: FAQ + Science now state the branded drug is
  approved but the COMPOUNDED formulation is not (mirrors peptides.ts).
- FamilyOutcomesViz: added an inline "figures summarize published research,
  not results we promise; individual outcomes vary" footnote under every
  outcomes chart on /science.
- "investigational" removed as a product-level descriptor (9 strings) →
  "prescribed off-label" / "in Phase 3 clinical trials".

### Dead code carrying pre-compliance language — quarantined
- `lib/scienceContent.ts` (0 importers) — deleted.
- `lib/protocols.ts` — reduced to the one consumed export
  (glyphForPeptide); ~590 lines of unrendered peptide/stack prose with
  disease/healing claims removed.
- `data/stacks.ts` — unrendered purpose/description prose neutralized
  (cart uses only stacks[]/computeStackPrice).

### From Slack/Gmail (2026-08)
- **Application scope**: Bask (Mason) advises submitting LegitScript with
  the GLPs (semaglutide + tirzepatide) first.
  ⚠️ **CHANGED 2026-08-12 — Mason must be told.** Both GLPs were gated when
  this line was written. On Chiya's instruction they are now DIRECTLY
  PURCHASABLE (priced, ungated; state exclusions retained and rendered on
  every path). Selling compounded GLP-1 is a materially larger compliance
  surface than gating it behind eligibility, and it is the most scrutinised
  category post-shortage — Mason should review before submission rather than
  discover it during his audit.
- **Stripe**: Maddie (Stripe) sent the Pharma DDQ. Chiya action: complete
  DDQ → return with Stripe acct_1TxxpZ3ToKa8JOSh + LegitScript cert once
  approved → risk review 1–3 days.
- **Provider entity to confirm**: Maddie's note says "direct Stripe +
  MD Integrations"; Mason's site requirement says Arora Health. Site shows
  Arora (per Mason). Chiya: confirm which provider network serves at launch.

### ⚠️ DEPLOY GAP (unchanged, most urgent)
All of the above is on `design/azure` + the gh-pages PREVIEW. **Mason
audits nexphoria.com**, which still serves the OLD build. The apex Cloudflare
deploy (Atlas wrangler upload, or the CLOUDFLARE_API_TOKEN secret for the
Deploy Apex workflow) must run before his review.
