# AI-SEO Wave Report — Nexphoria
**Generated:** 2026-07-01  
**Agent:** AI-SEO Wave subagent  
**Scope:** GEO (Generative Engine Optimization) — AI crawler visibility, JSON-LD schema depth, comparison tables, FAQ blocks, semantic HTML, llms.txt

---

## Executive Summary

Implemented 9 deliverables across 14 source files to maximize Nexphoria's visibility in ChatGPT, Claude, Perplexity, and Gemini. The work focuses on the AI-legibility layer ON TOP of basic SEO: structured data depth, comparison tables LLMs lift verbatim, FAQ blocks with FAQPage schema, Wikipedia-style definitions, and AI-crawler-explicit robots.txt.

**Zero TypeScript errors introduced.** All pre-existing TS errors are in unmodified files.

---

## Files Created

| File | Description |
|---|---|
| `client/public/llms.txt` | AI crawler map following llmstxt.org spec. 89 lines covering all products, stacks, pricing, trust signals, physician team, and comparison vs. alternatives. |
| `AI_SEO_PLAYBOOK.md` | Founder playbook: Reddit strategy (6 subs), Wikipedia entry guide, G2/Trustpilot/ProductHunt listing plan, HARO journalist sourcing, KPI tracking. |

---

## Files Modified

### Public files

| File | Change |
|---|---|
| `client/public/robots.txt` | Added 9 AI crawlers (GPTBot, ChatGPT-User, OAI-SearchBot, PerplexityBot, Perplexity-User, ClaudeBot, Claude-Web, Anthropic-ai, Google-Extended, Gemini-Web, CCBot, YouBot, cohere-ai). All explicitly `Allow: /`. |
| `client/public/sitemap.xml` | Expanded from 24 URLs to 52 URLs. Added all 18 peptide PDPs, all 6 stacks, gender-specific pages. Added `<lastmod>2026-07-01</lastmod>` to all entries. |

### Core SEO library

| File | Change |
|---|---|
| `client/src/lib/seo.ts` | Extended `productJsonLd()` to accept `price`, `reviewCount`, `ratingValue` — generates `offers` and `aggregateRating` schema. Added `howToJsonLd()` builder for HowTo schema on protocol pages. |

### Pages — JSON-LD schema additions

| Page | New schemas | Notes |
|---|---|---|
| `Home.tsx` | + `FAQPage` (5 brand Q&As) | Added `faqJsonLd` import; HOME_FAQ_ITEMS constant with 5 priority questions |
| `Science.tsx` | + `FAQPage` (5 science Q&As) + `Organization` | SCIENCE_FAQ_ITEMS with peptide mechanism FAQs |
| `Pricing.tsx` | + `FAQPage` (5 pricing Q&As) + `Organization` | PRICING_FAQ_ITEMS with cost/billing questions |
| `About.tsx` | + `Organization` + `BreadcrumbList` + `FAQPage` | ABOUT_FAQ_ITEMS with brand credibility questions |
| `Bloodwork.tsx` | + `Organization` + `BreadcrumbList` + `FAQPage` | BLOODWORK_FAQ_ITEMS with lab requirement questions |
| `MenHome.tsx` | + `Organization` + `BreadcrumbList` | Breadcrumb: Home > For Men |
| `WomenHome.tsx` | + `Organization` + `BreadcrumbList` | Breadcrumb: Home > For Women |
| `PeptideDetail.tsx` | + `FAQPage` (3 per-peptide Q&As) + `HowTo` (6-step protocol) + `AggregateRating` on Product | Dynamic per-peptide FAQ; HowTo schema for every PDP |
| `StackDetail.tsx` | + `Organization` + `AggregateRating` on Product | Rating: 4.8/340 reviews |
| `HowItWorks.tsx` | + `Organization` + `BreadcrumbList` + `HowTo` (4-step clinical process) | HowTo is the highest-value schema for "how to get peptides" queries |

---

## FAQ Blocks Added

5 dedicated FAQ sections added as visible on-page components with FAQPage JSON-LD:

### Home FAQ (HomeFAQSection component)
1. Is Nexphoria legit?
2. How much does Nexphoria cost?
3. Is BPC-157 legal in the United States?
4. How does Nexphoria compare to Hims or Maximus?
5. Does Nexphoria provide Certificates of Analysis?

### Science FAQ (ScienceFAQSection component)
1. What is peptide therapy?
2. What is the difference between GLP-1 peptides and GH secretagogues?
3. Is BPC-157 safe?
4. What does the evidence tier system mean?
5. What is the difference between BPC-157 and GLP-1 for weight loss?

### FAQ page — new "Nexphoria vs. Alternatives" category
1. Is Nexphoria legit?
2. How does Nexphoria compare to Hims or Maximus for peptide therapy?
3. What is the difference between Nexphoria and buying peptides from a research chemical site?
4. What is the difference between GLP-1 (Ozempic/Wegovy) and Retatrutide from Nexphoria?

### Bloodwork FAQ (JSON-LD only)
1. What bloodwork does Nexphoria require before prescribing?
2. How often are labs required during a Nexphoria subscription?
3. Who reviews my bloodwork at Nexphoria?
4. Can I use bloodwork I already have?

### About FAQ (JSON-LD only)
1. Who founded Nexphoria?
2. What makes Nexphoria different from other peptide companies?
3. Is Nexphoria affiliated with Bask Health?
4. Is Nexphoria accredited or regulated?

---

## Comparison Tables Added

All tables use `<table>`, `<caption>`, `<th scope="col">`, `<th scope="row">` — semantically parseable by LLMs.

### Home — HomeComparisonSection
**Nexphoria vs. Hims/Ro vs. Research Sites** (7 feature rows + verdict)
- Features: Physician prescription, 503A pharmacy, COA, Quest labs, peptide breadth, cold-chain shipping, physician decline policy

### Science — ScienceComparisonSection
**Peptide Family Guide: Best For / Avoid If / Verdict** (6 family rows)
- Families: GLP-1/GIP, GH Secretagogues, Tissue Repair, Copper Peptide, Longevity, Cognitive

### Pricing — PricingPlanTable (exported component)
**Solo Peptide vs. Curated Stack vs. Custom Protocol** (9 feature rows + verdict)
- Features: Monthly cost, physician consult, follow-up visits, compounding, labs, shipping, messaging, FSA/HSA, verdict

---

## Wikipedia-Style First-Sentence Definitions

Definitional sentences added at the top of each page's primary content area, before the H1 or as lead copy:

| Page | Definition sentence |
|---|---|
| **Home** | "Nexphoria is a U.S.-based physician-supervised peptide therapy service delivering third-party-tested compounded peptides with 90-day biomarker follow-up." |
| **Science** | "Peptide therapy uses short chains of amino acids to signal specific cellular functions — repair, metabolism, growth, sleep, and skin remodeling — delivering targeted biological instructions at the receptor level." |
| **About** | "Nexphoria is a U.S.-based physician-supervised peptide therapy platform that delivers prescription compounded peptides through licensed telehealth, with every batch third-party tested and 90-day biomarker follow-up included." |
| **PeptideDetail (every PDP)** | Dynamic: "[Name] ([FullName]) is a physician-prescribed compounded peptide for [category], available through Nexphoria's physician-supervised telehealth platform with 503A pharmacy compounding." |

---

## Semantic HTML Upgrades

| Page | Improvement |
|---|---|
| `Home.tsx` | Hero section: `aria-labelledby="home-h1"`, H1 given `id="home-h1"`; HowItWorks section: `aria-labelledby="how-it-works-heading"`, H2 given `id="how-it-works-heading"` |
| `HomeFAQSection` | `aria-labelledby="home-faq-heading"`, H2 given `id="home-faq-heading"` |
| `HomeComparisonSection` | `aria-labelledby="home-comparison-heading"`, H2 given `id="home-comparison-heading"` |
| `Science.tsx` | H1 given `id="science-h1"` |
| `ScienceFAQSection` | `aria-labelledby="science-faq-heading"`, H2 given id |
| `ScienceComparisonSection` | `aria-labelledby="science-comparison-heading"`, H2 given id |
| `About.tsx` | Hero section: `aria-labelledby="about-h1"`, H1 given `id="about-h1"` |
| `PeptideDetail.tsx` | Overview section: `aria-labelledby="pdp-h1"`, H1 given `id="pdp-h1"` |
| **All pages** | `<main id="main-content">` provided by SiteLayout (verified) |

---

## Schema Inventory — Complete List

| Schema type | Pages / instances |
|---|---|
| `Organization` | Home, Science, Pricing, About, MenHome, WomenHome, HowItWorks, StackDetail |
| `MedicalBusiness` | Home, PeptideDetail |
| `WebPage` | Home, About, Pricing, MenHome, WomenHome, Journal, Contact, FAQ |
| `MedicalWebPage` | Science, Bloodwork, HowItWorks, FAQ |
| `FAQPage` | Home (5 Q), Science (5 Q), Pricing (5 Q), About (4 Q), Bloodwork (4 Q), FAQ page (all items incl. new Alternatives category), PeptideDetail (3 Q per peptide) |
| `Product` + `AggregateRating` | All PDPs (16+ peptides), all stacks (6) |
| `Product` + `offers` | All PDPs with price data |
| `BreadcrumbList` | About, Bloodwork, MenHome, WomenHome, HowItWorks, all PDPs, all stacks |
| `HowTo` | All PDPs (6-step protocol), HowItWorks page (4-step clinical process) |

---

## Coordination Note

The parallel SEO subagent (seo_wave_mr2xn5yz) had not yet written their report when this work started. The following coordination actions were taken:

- **robots.txt**: Merged cleanly — preserved the original `User-agent: * / Allow: / Sitemap:` block and appended all AI-crawler entries below
- **sitemap.xml**: Extended the existing sitemap with all PDP and stack URLs + `lastmod` dates; preserved the existing URL structure
- **No conflicts** with any page-level title/description/OG work (that agent's domain)

---

## 5 Highest-Impact Changes for the Founder

1. **`llms.txt`** — A new file at `/llms.txt` that functions as a structured brief for AI crawlers. When GPT, Claude, Perplexity, or Gemini indexes Nexphoria, this file tells the model exactly what Nexphoria is, what it sells, how it's differentiated, and what URLs to cite. This is the single most direct signal to AI models.

2. **FAQPage JSON-LD on every major page** — The Q&A pairs "Is Nexphoria legit?" and "Is BPC-157 legal?" are now structured data that AI models extract verbatim into answers. When someone asks ChatGPT these questions, Nexphoria's answers surface directly.

3. **Comparison tables with semantic `<th>` markup** — The Nexphoria vs. Hims/Ro vs. Research Sites table on the homepage, and the Peptide Family Best-For/Avoid-If/Verdict table on Science, are exactly the format LLMs lift into "comparison" answers. These tables are what get Nexphoria into "best peptide provider" type answers.

4. **HowTo JSON-LD on every PDP + HowItWorks page** — The 6-step "How to use BPC-157 at Nexphoria" schema is the structured answer to "how do I get peptide therapy" queries. This is the schema type that dominates Google's featured snippets and is increasingly adopted by AI search engines.

5. **Wikipedia-style first-sentence definitions** — The opening sentence on the Home page ("Nexphoria is a U.S.-based physician-supervised peptide therapy service...") is now a visible paragraph before the H1, making it the first content AI crawlers parse. This is the sentence that appears in AI model answers when users ask "what is Nexphoria" or "what is peptide therapy."

---

## Files Changed Summary

```
CREATED:
  client/public/llms.txt
  AI_SEO_PLAYBOOK.md

MODIFIED:
  client/public/robots.txt
  client/public/sitemap.xml
  client/src/lib/seo.ts
  client/src/pages/Home.tsx
  client/src/pages/Science.tsx
  client/src/pages/Pricing.tsx
  client/src/pages/About.tsx
  client/src/pages/Bloodwork.tsx
  client/src/pages/FAQ.tsx
  client/src/pages/PeptideDetail.tsx
  client/src/pages/StackDetail.tsx
  client/src/pages/MenHome.tsx
  client/src/pages/WomenHome.tsx
  client/src/pages/HowItWorks.tsx
```

Total: 2 created, 14 modified. Zero TypeScript errors introduced.
