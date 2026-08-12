# NEXPHORIA — SEO GAP AUDIT
*From SEO research pass 2026-07-03. Prioritized by impact-per-effort. Buildable without a backend unless flagged.*

## CRITICAL

### 1. Hash routing = indexing ceiling (UNFIXABLE without path routing)
Google crawls `/#/peptides/bpc-157` as a fragment, not a URL — every route is the same `index.html` to crawlers. Sitemap hash URLs are ignored. Competitors (Ro/Hims) get N indexable URLs; we get 1. **Effort: migration-level** — switch wouter hash→path routing, Vite base `/`, SPA rewrite, update BASE_URL + sitemap. **Gating factor for all organic ROI. Do before any SEO push.** (Tied to L43/L44 production migration — user-gated on host decision.)

### 2. Medical E-E-A-T signals missing (YMYL)
No physician bylines/credentials, no `dateModified`/"last reviewed by Dr. X", no `author` JSON-LD on clinical pages, no PubMed citations on claims, no persistent scannable disclaimer. Google requires demonstrable physician oversight for YMYL. **Effort: medium**, but **physician names are USER-GATED** — build the framework (review-date, citation links, author schema shape), drop names when available.

### 3. MedicalOrganization schema incomplete
Missing `sameAs` (LinkedIn/Trustpilot), `founder`, `knowsAbout` (therapeutic categories), `medicalSpecialty`, `contactPoint`. **Effort: low** — extend the JSON-LD helper. (sameAs/founder partly user-gated on real accounts.)

## HIGH-IMPACT

### 4. Breadcrumb + internal linking sparse on PDPs
BreadcrumbList schema emits but no VISIBLE breadcrumb nav; PDPs don't link to related peptides (BPC-157→TB-500→GHK-Cu) or Science sections. **Effort: medium** — visible breadcrumb component, relatedPeptides() by category, "explore more" section. **No gates — buildable now.**

### 5. OG images not per-page
All pages use generic `og-default.png`. No per-compound/per-stack social previews. **Effort: medium** — generate per-stack/per-compound OG images (Bloom can help), extend useSeo ogImage param.

### 6. FAQPage schema reach
PDP FAQs render as plain HTML (not FAQPage schema); Category + HowItWorks pages lack FAQ schema entirely. FAQPage drives rich results + LLM answer synthesis. **Effort: low** — pass faqJsonLd() in SoloPDP/Category/HowItWorks. **No gates — buildable now, high ROI.**

### 7. Missing medical education content (vs hims/Ro)
No educational/topical pages that drive telehealth organic (peptide guides, condition explainers, dosing science, comparisons). **Effort: high** — content program. Ties to Journal.

## DO-NOW (no gates, buildable): #4 (breadcrumbs + related links), #6 (FAQPage reach), #3 (org schema non-gated fields)
## USER-GATED: #1 (host/routing), #2 (physician names), #5 sameAs, founder
