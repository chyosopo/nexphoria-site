# Nexphoria Route Audit — 2026-07-02

**Tested:** 49 routes  
**Clean (0 errors, no content issues):** 47  
**Routes with errors or content issues:** 2  

> Audit methodology: Playwright (Chromium, 1440×900), `networkidle` + 1500ms settle, console/pageerror/requestfailed/response(≥400)/broken-image listeners wired before each navigation. All listeners reset between routes.

---

## Routes with ZERO Errors

All 49 routes loaded without any console errors, page errors, failed requests, HTTP 4xx/5xx responses, or broken images. No "Application error" React crash text was detected on any route.

The following 47 routes are fully clean with correct page titles:

| Route | Page Title |
|---|---|
| `/` | Peptide therapy that works — physician-prescribed, lab-monitored \| Nexphoria |
| `/#/men` | Peptide protocols for men — strength, fat loss, recovery, drive \| Nexphoria |
| `/#/women` | Peptide protocols for women — glow, metabolic, longevity \| Nexphoria |
| `/#/gate` | Nexphoria — peptide therapy, physician-prescribed and lab-monitored |
| `/#/peptides` | Peptide catalog — BPC-157, GLP-1, NAD+, Epitalon and 16 more \| Nexphoria |
| `/#/peptides/bpc-157` | BPC-157 — The repair signal. \| Nexphoria |
| `/#/peptides/tb-500` | TB-500 — The repair logistics. \| Nexphoria |
| `/#/peptides/ghk-cu` | GHK-Cu — The skin reset. \| Nexphoria |
| `/#/peptides/tirzepatide` | Tirzepatide — The appetite reset. \| Nexphoria |
| `/#/peptides/retatrutide` | Retatrutide — The triple lever. \| Nexphoria |
| `/#/peptides/cjc-1295` | CJC-1295 — The sustained signal. \| Nexphoria |
| `/#/peptides/ipamorelin` | Ipamorelin — The clean GH pulse. \| Nexphoria |
| `/#/peptides/tesamorelin` | Tesamorelin — Targeted body composition. \| Nexphoria |
| `/#/men/peptides` | Peptides for men — BPC-157, Ipamorelin, GLP-1, NAD+ and more \| Nexphoria |
| `/#/men/peptides/bpc-157` | BPC-157 — The repair signal. \| Nexphoria |
| `/#/men/protocols` | Peptide stacks for men — recovery, metabolic, longevity, cognitive \| Nexphoria |
| `/#/women/peptides` | Peptides for women — GHK-Cu, Tirzepatide, Epitalon and more \| Nexphoria |
| `/#/women/peptides/ghk-cu` | GHK-Cu — The skin reset. \| Nexphoria |
| `/#/women/protocols` | Peptide stacks for women — skin, metabolic, longevity, hormonal \| Nexphoria |
| `/#/stacks` | Physician-curated peptide stacks — repair, sleep, metabolic, longevity \| Nexphoria |
| `/#/stacks/wolverine` | Wolverine — The repair stack \| Physician-prescribed peptide stack \| Nexphoria |
| `/#/stacks/glow` | Glow — The skin stack \| Physician-prescribed peptide stack \| Nexphoria |
| `/#/stacks/prime` | Prime — The metabolic stack \| Physician-prescribed peptide stack \| Nexphoria |
| `/#/stacks/restore` | Restore — The sleep stack \| Physician-prescribed peptide stack \| Nexphoria |
| `/#/stacks/balance` | Balance — The cellular stack \| Physician-prescribed peptide stack \| Nexphoria |
| `/#/stacks/build` | Build your own peptide stack — custom, physician-reviewed \| Nexphoria |
| `/#/pricing` | Peptide therapy pricing — transparent, all-in, no lab upsell \| Nexphoria |
| `/#/assessment` | Start your peptide protocol — 5-minute intake, physician review in 24h \| Nexphoria |
| `/#/how-it-works` | How peptide therapy works — intake, physician review, compound, deliver \| Nexphoria |
| `/#/science` | Peptide science — mechanisms, evidence, and clinical references \| Nexphoria |
| `/#/bloodwork` | Peptide therapy bloodwork — 38 biomarkers, every 90 days \| Nexphoria |
| `/#/lab-testing` | At-home lab testing — 38 biomarkers, Quest Diagnostics, every 90 days \| Nexphoria |
| `/#/testing` | At-home lab testing — 38 biomarkers, Quest Diagnostics, every 90 days \| Nexphoria |
| `/#/journal` | Nexphoria Journal — peptide science, protocols, and physician notes |
| `/#/about` | About Nexphoria — physician-founded, pharmacy-grade peptide care |
| `/#/physicians` | Nexphoria physicians — board-certified, Cleveland Clinic to Stanford |
| `/#/community` | Nexphoria community — clinical roundtables, outcomes, and education |
| `/#/contact` | Contact Nexphoria — physician questions, protocol support |
| `/#/faq` | Peptide therapy FAQ — safety, legality, pricing, process \| Nexphoria |
| `/#/cart` | Your Cart \| Nexphoria |
| `/#/legal` | Legal — Terms, Privacy, Telehealth Consent, Refund Policy \| Nexphoria |
| `/#/legal/privacy` | Privacy Policy \| Nexphoria |
| `/#/legal/terms` | Terms of Service \| Nexphoria |
| `/#/legal/refund-policy` | Refund Policy \| Nexphoria |
| `/#/legal/telehealth-consent` | Telehealth Consent \| Nexphoria |
| `/#/privacy` | Privacy Policy \| Nexphoria |
| `/#/terms` | Terms of Service \| Nexphoria |

---

## Routes with Errors or Content Issues

No routes produced JavaScript errors, HTTP error codes, broken images, or failed network requests. However, two routes render "not found" content states — indicating missing data in the route data layer, not a React crash.

### `/#/stacks/lean`

**Title:** `Stack not found | Nexphoria`  
**JS errors:** 0  
**HTTP errors:** 0  
**Content issue:** The page title and visible page text indicate "Stack not found" — the slug `lean` does not map to any entry in the stacks data source. The route renders gracefully (no crash), but shows an empty/fallback state.

**Severity: MEDIUM** — the route is linked from `/#/stacks` but silently falls through to a not-found state. Users navigating here see no content.

---

### `/#/journal/what-are-peptides`

**Title:** `Article not found | Nexphoria`  
**JS errors:** 0  
**HTTP errors:** 0  
**Content issue:** The page title and visible text indicate "Article not found" — the slug `what-are-peptides` does not resolve to an article in `journal.ts`. The router handles this gracefully but returns no content.

**Severity: MEDIUM** — this slug was included in the audit spec as a test of a known journal article. Its absence suggests either the article has not yet been added to the data source, or the slug is mis-keyed.

---

## Summary

| Metric | Count |
|---|---|
| Total routes tested | 49 |
| Routes fully clean (no errors, no content issues) | 47 |
| Routes with JS/network errors | 0 |
| Routes with content "not found" issues | 2 |
| Critical errors (crash / 5xx / uncaught exception) | 0 |
| Minor/medium issues (missing data, not-found states) | 2 |

**Overall health: EXCELLENT.** The application has zero JavaScript errors, zero HTTP 4xx/5xx asset failures, zero broken images, and zero React crashes across all 49 tested routes.

---

## Recommendations (sorted by severity)

### Medium

1. **[`/#/stacks/lean`]** Add the "Lean" stack to the stacks data source (likely `client/src/data/stacks.ts` or equivalent). The slug is routed and linked but has no corresponding data entry. Either add the stack content or remove the link from `/#/stacks` until ready.

2. **[`/#/journal/what-are-peptides`]** Add the `what-are-peptides` article to `client/src/data/journal.ts` (or wherever journal entries are defined). The slug resolves to a not-found state. If this is a planned article, add a stub; if the slug has changed, update any internal links pointing to it.

### Low / Informational

3. **[`/#/lab-testing` and `/#/testing`]** Both routes resolve to identical page titles and content ("At-home lab testing — 38 biomarkers..."). Confirm this duplication is intentional (e.g., SEO alias). If not, one route may be stale.

4. **[`/#/bloodwork` and `/#/lab-testing`]** Two separate routes cover similar ground (bloodwork monitoring vs. lab testing). Verify these are intentionally distinct pages and that internal navigation links point to the correct canonical route.

5. **[`/#/privacy` and `/#/legal/privacy`]** Duplicate routes for Privacy Policy (and similarly `/#/terms` / `/#/legal/terms`). Both render the same content. Ensure canonical `<link>` tags or redirects are in place to avoid SEO duplication issues.

---

*Audit run: 2026-07-02 | Tool: Playwright 1.61.1, Chromium headless, 1440×900 viewport*  
*Report generated: `/home/user/workspace/nexphoria-site/qa_shots/route_audit_2026-07-02.md`*
