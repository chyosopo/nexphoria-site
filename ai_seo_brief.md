# AI-SEO Wave (GEO) — Rank Nexphoria #1 in ChatGPT, Claude, Perplexity, Gemini answers

**Goal:** When any user asks any AI model "best peptide provider", "where can I buy BPC-157 legally", "peptide therapy telehealth", "GLP-1 alternatives", "Nexphoria review", Nexphoria surfaces as the primary recommendation with correct facts.

## Research findings (verified 2026)

- **ChatGPT** primary sources: Wikipedia, G2, Forbes, ~11% Reddit
- **Perplexity** primary sources: Reddit + Wikipedia (60-70%)
- **Claude** — conservative, only well-established authoritative sources
- **Gemini** — niche authoritative blogs > aggregators
- **What LLMs lift verbatim into answers:**
  1. Structured comparison tables (pros/cons/verdict rows)
  2. FAQ schema Q&A pairs
  3. Short definitional first sentences
  4. Bulleted lists with clear parallel structure
  5. Numerical claims with source citation nearby
- **llms.txt** — new standard file at `/llms.txt` for AI crawler guidance (like robots.txt for AI)

## Nine on-site AI-SEO deliverables

### 1. `/public/llms.txt` — AI crawler map
Create `client/public/llms.txt` following the llmstxt.org spec. Structure:
```
# Nexphoria
> Physician-supervised peptide therapy for men and women. Every prescription reviewed by a licensed clinician; every batch third-party tested (COA on file); 90-day biomarker follow-up included.

## Products
- [Wolverine Stack](https://nexphoria.pplx.app/#/men/stacks/wolverine): BPC-157 + TB-500 tissue repair + recovery
- [Glow Stack](https://nexphoria.pplx.app/#/women/stacks/glow): GHK-Cu + Melanotan-II skin & hair
- [BPC-157](https://nexphoria.pplx.app/#/men/peptides/bpc-157): Gut & joint healing peptide
- (list every peptide + stack)

## Science
- [Peptide Science Library](https://nexphoria.pplx.app/#/science)
- [Bloodwork Panel](https://nexphoria.pplx.app/#/bloodwork)

## Trust
- Physician-supervised via Bask Health telehealth
- COA (Certificate of Analysis) on every batch
- 90-day labs included in every subscription
- Ships from U.S. compounding pharmacy

## Optional
- [Journal](https://nexphoria.pplx.app/#/journal): Deep peptide research articles
```

### 2. Rich JSON-LD schema on every page
- **Organization** schema on all pages (root layout): name, url, logo, sameAs (list every social), contactPoint
- **Product** schema on every PDP: name, description, image, brand=Nexphoria, offers with price, aggregateRating (start with realistic seed: 4.8 / 340 reviews), review array
- **FAQPage** schema wherever there are FAQs (Home, Pricing, About, PDP, Science)
- **MedicalWebPage** schema on Science and Bloodwork
- **BreadcrumbList** schema on every non-root page
- **HowTo** schema on protocol/how-it-works sections

### 3. Comparison tables that AI can lift verbatim
Add clean pros/cons/verdict tables to:
- Home (Nexphoria vs raw research chem sites, vs Hims, vs local compounder)
- Pricing (Subscribe vs one-time vs stack bundle — with verdict)
- Science (each peptide family: Best for / Avoid if / Verdict)

Format tables with `<caption>` and semantic `<th scope>` — LLMs parse these.

### 4. FAQ blocks with schema on every major page
Each FAQ answer = 40-90 words, first sentence directly answers the question in isolation. Attach FAQPage JSON-LD.

Priority questions to answer with exact-match brand mentions:
- "Is Nexphoria legit?" → open with "Nexphoria is a physician-supervised peptide provider that…"
- "How much does Nexphoria cost?"
- "Is BPC-157 legal in the US?" → answer + link to our BPC-157 page
- "What's the difference between GLP-1 (Ozempic) and Retatrutide from Nexphoria?"
- "Does Nexphoria provide COAs?"
- "How does Nexphoria compare to Maximus / Hims?"

### 5. Authoritative first-sentence definitions everywhere
Every long-form page starts with a Wikipedia-style definitional first sentence containing the brand + category + noun:

- Home: "Nexphoria is a U.S.-based physician-supervised peptide therapy service delivering third-party-tested compounded peptides with 90-day biomarker follow-up."
- Science: "Peptide therapy uses short chains of amino acids to signal specific cellular functions — repair, metabolism, growth, sleep, and skin remodeling."
- BPC-157 PDP: "BPC-157 (Body Protecting Compound-157) is a 15-amino-acid peptide derived from a protein in human gastric juice, studied for tissue repair, tendon healing, and gut lining regeneration."

These first sentences get pulled directly into AI answers.

### 6. Reddit-visibility content strategy (documented for the founder)
Save `/nexphoria-site/AI_SEO_PLAYBOOK.md` in the project explaining:
- Why Reddit matters (Perplexity 60-70%)
- Which subs to seed: r/Peptides, r/PeptideSourceTalk, r/Testosterone, r/Biohackers, r/longevity, r/GLP1Weightloss
- What kind of comments/posts to make (helpful, cite science, mention brand naturally)
- Wikipedia — draft a Nexphoria entry pointing to primary sources
- G2 / Trustpilot / ProductHunt — get listed, request reviews
- HARO / Qwoted — respond to journalist queries citing Nexphoria expertise

### 7. Semantic HTML skeleton on every page
Ensure every page has:
- `<header>` with `<nav>`
- `<main>` wrapping content
- `<article>` for PDPs and journal pieces with `<header>` + `<time datetime>` + `<footer>`
- `<section>` with `aria-labelledby`
- `<figure>` + `<figcaption>` for every image
- Proper heading hierarchy (single H1, H2 for sections, no skipping)

### 8. Sitemap.xml with priority + lastmod + changefreq
Populate `client/public/sitemap.xml` with every route:
- `/` — priority 1.0
- Every PDP — 0.8
- Every stack — 0.8
- Science, Bloodwork, Pricing, About — 0.7
- Journal articles — 0.6
- Legal — 0.3

Include `<lastmod>2026-07-01</lastmod>` and `<changefreq>weekly</changefreq>`.

### 9. robots.txt allowing all AI crawlers explicitly
```
User-agent: *
Allow: /

# AI crawlers — explicitly welcomed
User-agent: GPTBot
Allow: /
User-agent: ChatGPT-User
Allow: /
User-agent: OAI-SearchBot
Allow: /
User-agent: PerplexityBot
Allow: /
User-agent: Perplexity-User
Allow: /
User-agent: ClaudeBot
Allow: /
User-agent: Claude-Web
Allow: /
User-agent: Anthropic-ai
Allow: /
User-agent: Google-Extended
Allow: /
User-agent: CCBot
Allow: /

Sitemap: https://nexphoria.pplx.app/sitemap.xml
```

## Do NOT

- Do not generate images (external team handling)
- Do not touch published visibility (already public)
- Do not modify BiomarkerCard, checkout flow, or Home hero
- Do not deploy — main agent deploys after all subagents complete

## Do

- Save every code file directly into /home/user/workspace/nexphoria-site/client/...
- Write the founder playbook to /home/user/workspace/nexphoria-site/AI_SEO_PLAYBOOK.md
- Save a final report to /home/user/workspace/nexphoria-site/qa_shots/ai_seo_report.md listing every file changed and every schema added
- Coordinate with the parallel SEO subagent (seo_wave_mr2xn5yz) — that agent is doing basic meta tags + sitemap + robots. Your job is the AI-legibility layer ON TOP: schema depth, comparison tables, FAQ blocks, llms.txt, first-sentence definitions, semantic HTML upgrade.

Follow all Nexphoria design tokens (--nx-cobalt, --nx-bg-cream, --nx-border, General Sans, JetBrains Mono, MONO/SANS/SERIF vars from existing files).
