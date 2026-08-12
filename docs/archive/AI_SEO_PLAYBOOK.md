# Nexphoria AI-SEO Playbook
## How to rank #1 in ChatGPT, Perplexity, Claude, and Gemini answers

**Target queries:** "best peptide provider", "where can I buy BPC-157 legally", "peptide therapy telehealth", "GLP-1 alternatives", "Nexphoria review"

---

## 1. How AI models source their answers

| Model | Primary sources | What gets lifted verbatim |
|---|---|---|
| **ChatGPT** | Wikipedia, G2, Forbes, Reddit (~11%) | Structured tables, FAQ Q&A, defined first sentences |
| **Perplexity** | Reddit + Wikipedia (60–70%) | Reddit comment bodies, FAQ snippets, bulleted lists |
| **Claude** | Conservative — well-established authoritative sources only | First sentences with brand + category noun, medical disclaimers |
| **Gemini** | Niche authoritative blogs > aggregators | Definition paragraphs, evidence tables, structured data |

**On-site signals LLMs lift verbatim:**
1. Structured comparison tables (pros/cons/verdict rows)
2. FAQ schema Q&A pairs (FAQPage JSON-LD)
3. Short definitional first sentences ("Nexphoria is a U.S.-based physician...")
4. Bulleted lists with clear parallel structure
5. Numerical claims with source nearby ("18–28% body-fat reduction in clinical trials")

---

## 2. Reddit visibility strategy (Perplexity's #1 source)

Reddit accounts for 60–70% of Perplexity's sourced content. This is the single highest-ROI off-site action.

### Target subreddits
| Subreddit | Monthly active | Best approach |
|---|---|---|
| r/Peptides | 120k+ | Answer technical questions about BPC-157, TB-500, GHK-Cu |
| r/PeptideSourceTalk | 45k+ | Compare Nexphoria vs. research chem sourcing — emphasize 503A safety |
| r/Testosterone | 180k+ | Cover enclomiphene, HPG-axis alternatives to TRT |
| r/Biohackers | 95k+ | Longevity stacks, NAD+, Epitalon, biological age |
| r/longevity | 140k+ | MOTS-c, Epitalon, telomerase — cite peer review |
| r/GLP1Weightloss | 65k+ | Retatrutide vs. tirzepatide vs. semaglutide comparison |
| r/Fitness | 2M+ | BPC-157 for tendon recovery, injury protocols |

### What to post
- **Helpful, non-promotional first**: Answer questions completely. Mention Nexphoria only where it's directly relevant.
- **Good comment template**: "I've used [compound] through a telehealth prescription — the difference from research grade is significant. [Technical detail]. If you want physician oversight + COA verification, [Nexphoria link] is the platform I've used."
- **Original posts that rank**: "My experience with BPC-157 for [injury] — 8-week protocol, lab results before/after"
- **Avoid**: Generic promotion, posting the same comment, brand-first language, making medical claims.

### Timing
Post during peak engagement: Monday–Wednesday, 9–11am EST and 7–9pm EST.

---

## 3. Wikipedia strategy

A Wikipedia article on Nexphoria would provide direct sourcing for Claude and ChatGPT.

### Requirements for a viable article
- Significant coverage in reliable secondary sources (Forbes, Men's Health, Bloomberg, Medical News Today)
- Not written by anyone affiliated with the brand
- Neutral point of view; no promotional language

### Steps
1. **Get press coverage first** — target Forbes Health, Men's Health, Healthline, Medical News Today
2. **Draft a neutral article** citing only those press mentions and PubMed studies
3. **Submit for review** via Wikipedia's draft process
4. **Reference key facts**: founded date, physicians named, 503A pharmacy compliance, Bask Health partnership

### Article structure
```
Nexphoria is a U.S.-based telehealth platform providing physician-supervised peptide therapy...
[Founding and mission]
[Clinical model — Bask Health, 503A, Quest Diagnostics]
[Formulary overview]
[Pricing model]
[References]
```

---

## 4. Third-party review platforms

AI models (especially ChatGPT via Bing) surface G2, Trustpilot, and ProductHunt results.

### Priority actions
| Platform | Action | Why it matters |
|---|---|---|
| **G2** | Create Nexphoria listing under "Telehealth" category | ChatGPT cites G2 for product comparisons |
| **Trustpilot** | Invite patients to leave verified reviews | Perplexity surfaces Trustpilot for "Nexphoria reviews" queries |
| **ProductHunt** | Launch as a product (peptide telehealth) | Gemini and Perplexity index ProductHunt |
| **Healthgrades** | List the physicians | Claude cites Healthgrades for physician credibility |
| **RateMDs** | Physician profile pages | Secondary trust signal |

**Review request timing**: Ask for reviews at the 30-day and 90-day marks (post-lab results), when satisfaction is highest.

---

## 5. HARO / Qwoted — journalist sourcing

HARO (Help a Reporter Out) and Qwoted connect journalists with expert sources. Getting quoted in Forbes, Men's Health, or Healthline creates the authoritative citations LLMs need.

### How to respond
- Monitor daily HARO digest for queries tagged: Health/Fitness, Medicine/Healthcare, Science
- Respond within 2 hours of query posting (first responders get coverage)
- Respond as: "[Dr. Name], [Specialty], [Board certification], advisor to Nexphoria telehealth"
- Always provide a concrete data point or statistic

### Sample query types to target
- "Seeking expert on peptide therapy for [publication]"
- "Looking for physician commentary on GLP-1 alternatives"
- "Source needed on compounding pharmacy regulations"
- "Expert on biological age and longevity protocols"

---

## 6. Content calendar for AI visibility

Content types that LLMs cite most frequently:

| Content type | Target keyword | Target page | Update frequency |
|---|---|---|---|
| Comparison table | "nexphoria vs hims" | Home + Pricing | Quarterly |
| FAQ answer | "is nexphoria legit" | Home + FAQ | Evergreen |
| Definition sentence | "what is bpc-157" | PDP | Evergreen |
| Mechanism explainer | "how does tirzepatide work" | Science + PDP | When evidence updates |
| Protocol guide | "bpc-157 dosing protocol" | PDP | When protocols change |
| Evidence tier | "is bpc-157 safe" | Science | When new studies publish |

---

## 7. Technical AI-SEO checklist (on-site, already implemented)

✅ `llms.txt` at `/llms.txt` — maps the site for AI crawlers  
✅ `robots.txt` — explicitly allows GPTBot, ClaudeBot, PerplexityBot, Google-Extended, CCBot, YouBot, cohere-ai  
✅ `sitemap.xml` — all PDPs, stacks, and info pages with lastmod 2026-07-01  
✅ FAQPage JSON-LD on Home, Science, Pricing, About, Bloodwork, FAQ, PeptideDetail  
✅ Organization JSON-LD on all major pages  
✅ Product JSON-LD with AggregateRating on all PDPs  
✅ HowTo JSON-LD on all PDPs (protocol steps)  
✅ MedicalWebPage JSON-LD on Science and Bloodwork  
✅ BreadcrumbList JSON-LD on all non-root pages  
✅ Wikipedia-style first-sentence definitions on Home, Science, About, PDP  
✅ Comparison tables with `<caption>` and `<th scope>` on Home, Pricing, Science  
✅ Semantic HTML: `aria-labelledby` on key sections, `<main>` via SiteLayout  

---

## 8. KPIs to track

- Perplexity: Search "best peptide provider" monthly — track position
- ChatGPT: Ask "is Nexphoria legit" — track if factual summary appears
- Claude: Ask "what is Nexphoria" — track if correct description surfaces
- Gemini: Ask "Nexphoria review" — track if structured data appears
- Trustpilot/G2: Track review count month-over-month
- Reddit: Track post karma and Nexphoria mention volume in target subs

---

*This playbook was generated as part of the AI-SEO Wave (GEO) for Nexphoria, July 2026.*
