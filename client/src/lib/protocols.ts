/* ──────────────────────────────────────────────────────────────
   Nexphoria Protocol Catalog — single source of truth
   Voice: physician-guided, scientific, masculine but elevated
   ────────────────────────────────────────────────────────────── */

export type Tier = {
  duration: "1-month" | "3-month" | "6-month";
  months: 1 | 3 | 6;
  pricePerMonth: number;
  totalPrice: number;
  badge?: "MOST POPULAR" | "BEST VALUE";
  savings?: string;
};

export type Peptide = {
  slug: string;
  name: string;
  fullName: string;
  category: "recovery" | "skin" | "longevity" | "sleep" | "weight" | "cognitive";
  oneLiner: string;
  mechanism: string;
  evidence: string;
};

export type Stack = {
  slug: string;
  name: string;
  tagline: string;
  audience: string;
  goal: "recover" | "skin" | "longevity" | "sleep" | "weight";
  peptides: string[]; // slugs
  protocol: {
    frequency: string;
    duration: string;
    dose: string;
    administration: string;
  };
  timeline: Array<{ weeks: string; phase: string; description: string }>;
  pricing: Tier[];
  outcomes: string[];
  contraindications: string[];
  hero: {
    eyebrow: string;
    headline: string;
    italicWord: string;
    subhead: string;
  };
  /* ── v3 cinematic protocol-detail fields ─────────────────── */
  /** Act 1 hero problem statement (H1) */
  problem: string;
  /** Act 1 hero sub-line (one emotional anchor sentence) */
  subProblem: string;
  /** Act 2 italic H2 — the single Gambarino italic moment on the page */
  protocolItalicHeadline: { plain: string; italic: string; plain2: string };
  /** Act 2 "what this protocol does" — 3 bullets */
  protocolDoes: string[];
  /** Act 3 outcome KPI band — 4 entries */
  outcomeKpis: Array<{ value: string; label: string }>;
  /** Act 3 source footnote */
  outcomesFootnote: string;
  /** Sticky rail anchor (crossed-out) price */
  anchorPrice: string;
  /** Physician callout body copy */
  physicianCalloutCopy: string;
  /** Stack-specific FAQ accordion items */
  faqs: Array<{ q: string; a: string }>;
};

/** Map peptide slug → MolecularGlyph id */
export const glyphForPeptide = (slug: string): "chain" | "helix" | "copper" | "fragment" | "branch" | "ghrh" | "secretagogue" | "ring" => {
  switch (slug) {
    case "bpc-157": return "chain";
    case "tb-500": return "helix";
    case "ghk-cu": return "copper";
    case "epitalon": return "fragment";
    case "thymosin-a1": return "branch";
    case "nad-plus": return "ring";
    case "mots-c": return "fragment";
    case "ipamorelin": return "secretagogue";
    case "dsip": return "chain";
    case "selank": return "branch";
    case "cjc-1295": return "ghrh";
    case "tirzepatide": return "ghrh";
    case "retatrutide": return "branch";
    case "aod-9604": return "fragment";
    case "tesamorelin": return "ghrh";
    default: return "ring";
  }
};

/* ── Peptides ──────────────────────────────────────────────── */
export const peptides: Peptide[] = [
  {
    slug: "bpc-157",
    name: "BPC-157",
    fullName: "Body Protection Compound 157",
    category: "recovery",
    oneLiner: "A 15-amino-acid fragment of a gastric protein that accelerates tendon, ligament, and gut healing.",
    mechanism: "Upregulates VEGF and growth-hormone receptors at injury sites; promotes angiogenesis and fibroblast migration.",
    evidence: "30+ animal studies show accelerated soft-tissue repair. Human trials underway. Used clinically in sports medicine since the 2010s.",
  },
  {
    slug: "tb-500",
    name: "TB-500",
    fullName: "Thymosin Beta-4 (synthetic fragment)",
    category: "recovery",
    oneLiner: "Systemic actin-regulator that travels to damaged tissue and orchestrates cellular repair.",
    mechanism: "Binds G-actin, promotes cell migration to injury, reduces inflammation, and supports new vessel formation.",
    evidence: "Used post-MI and in tendinopathy. Strong preclinical, ongoing human cardiac and wound-healing trials.",
  },
  {
    slug: "ghk-cu",
    name: "GHK-Cu",
    fullName: "Copper Tripeptide-1",
    category: "skin",
    oneLiner: "A copper-binding tripeptide that resets aged skin gene expression toward youthful patterns.",
    mechanism: "Activates ~4,000 genes related to collagen synthesis, wound healing, and antioxidant defense. Stimulates fibroblasts.",
    evidence: "30+ years of dermatology research. Multiple human trials show measurable wrinkle reduction and barrier improvement.",
  },
  {
    slug: "cjc-ipa",
    name: "CJC-1295 / Ipamorelin",
    fullName: "Modified GRF (1-29) + selective GHRP",
    category: "longevity",
    oneLiner: "A pulsatile growth-hormone secretagogue stack that mimics your natural overnight GH release.",
    mechanism: "CJC-1295 extends GHRH signaling; Ipamorelin selectively triggers GH pulses without cortisol or prolactin spikes.",
    evidence: "Decades of GHRH/GHRP research. Used clinically for adult GH deficiency. Synergistic effect at low doses.",
  },
  {
    slug: "sermorelin",
    name: "Sermorelin",
    fullName: "GRF (1-29)",
    category: "longevity",
    oneLiner: "The 29-amino-acid active fragment of growth-hormone-releasing hormone.",
    mechanism: "Stimulates the pituitary to release endogenous GH in natural pulses. Preserves feedback loops.",
    evidence: "FDA-approved for pediatric GHD. Decades of safety data. Standard entry GHRH peptide.",
  },
  {
    slug: "tesamorelin",
    name: "Tesamorelin",
    fullName: "Trans-3-hexenoyl GRF(1-44)",
    category: "longevity",
    oneLiner: "A stabilized GHRH analog that targets visceral adipose tissue.",
    mechanism: "Sustained GH/IGF-1 elevation. Clinically proven visceral fat reduction.",
    evidence: "FDA-approved (Egrifta) for HIV-associated lipodystrophy. Off-label use for metabolic recomposition.",
  },
  {
    slug: "ipamorelin",
    name: "Ipamorelin",
    fullName: "Selective GHRP",
    category: "longevity",
    oneLiner: "The cleanest growth-hormone-releasing peptide — no cortisol, no prolactin spikes.",
    mechanism: "Selective ghrelin-receptor agonist. Triggers GH pulse without disrupting other hormonal axes.",
    evidence: "Phase 2 trials for post-operative ileus. Widely used in performance medicine for over a decade.",
  },
  {
    slug: "selank",
    name: "Selank",
    fullName: "Synthetic heptapeptide (Russian-developed)",
    category: "cognitive",
    oneLiner: "An anxiolytic peptide that sharpens focus and reduces anxiety without sedation.",
    mechanism: "Modulates GABA receptors and BDNF expression. Increases serotonin and dopamine turnover.",
    evidence: "Russian clinical use since the 1990s for generalized anxiety. Limited Western trials but established safety profile.",
  },
  {
    slug: "semax",
    name: "Semax",
    fullName: "ACTH(4-10) analog",
    category: "cognitive",
    oneLiner: "A heptapeptide that upregulates BDNF and NGF — improving focus, memory, and stroke recovery.",
    mechanism: "Increases brain-derived neurotrophic factor by ~1.4x. Modulates dopamine and serotonin systems.",
    evidence: "Russian Ministry of Health-approved for stroke and cognitive disorders. Strong neuroprotective data.",
  },
  {
    slug: "dsip",
    name: "DSIP",
    fullName: "Delta Sleep-Inducing Peptide",
    category: "sleep",
    oneLiner: "A nonapeptide that promotes deep slow-wave sleep architecture.",
    mechanism: "Modulates somatostatin and corticotropin-releasing hormone. Enhances delta-wave EEG patterns.",
    evidence: "Studied for chronic insomnia, narcolepsy, and stress-related sleep disruption since the 1970s.",
  },
  {
    slug: "epitalon",
    name: "Epitalon",
    fullName: "Epithalamin tetrapeptide (Ala-Glu-Asp-Gly)",
    category: "longevity",
    oneLiner: "A pineal-derived tetrapeptide studied for telomerase activation and circadian recalibration.",
    mechanism: "Activates telomerase, normalizes melatonin rhythm via the pineal gland, and restores age-related shifts in gene expression.",
    evidence: "Russian longevity research spanning 35+ years, including a 15-year human cohort showing reduced mortality markers.",
  },
  {
    slug: "thymosin-a1",
    name: "Thymosin-\u03b11",
    fullName: "Thymosin Alpha-1",
    category: "longevity",
    oneLiner: "A thymus-derived peptide that recalibrates immune T-cell function with age.",
    mechanism: "Stimulates T-cell maturation and dendritic-cell function, restoring the CD4/CD8 ratio and innate immune surveillance.",
    evidence: "FDA-recognized in sepsis and hepatitis trials; widely studied as Zadaxin across 35+ countries.",
  },
  {
    slug: "nad-plus",
    name: "NAD+",
    fullName: "Nicotinamide Adenine Dinucleotide",
    category: "longevity",
    oneLiner: "The central coenzyme of cellular energy and DNA repair, declining sharply with age.",
    mechanism: "Fuels mitochondrial ATP production and activates sirtuins (SIRT1-7) and PARP-mediated DNA repair pathways.",
    evidence: "Extensive preclinical longevity data; human trials show restored NAD+ levels and improved mitochondrial markers.",
  },
  {
    slug: "mots-c",
    name: "MOTS-c",
    fullName: "Mitochondrial-derived peptide MOTS-c",
    category: "longevity",
    oneLiner: "A mitochondrial-encoded peptide that acts as an exercise mimetic and metabolic regulator.",
    mechanism: "Activates AMPK, enhances insulin sensitivity, and promotes metabolic flexibility under stress.",
    evidence: "Identified 2015; preclinical studies show improved glucose handling, endurance, and healthspan markers.",
  },
  {
    slug: "cjc-1295",
    name: "CJC-1295 (no DAC)",
    fullName: "Modified GRF (1-29)",
    category: "sleep",
    oneLiner: "A short-acting GHRH analog that amplifies the natural overnight growth-hormone pulse.",
    mechanism: "Binds GHRH receptors to raise the GH-releasing signal; the no-DAC form produces a clean, physiologic nocturnal pulse.",
    evidence: "Decades of GHRH research; paired with ghrelin agonists for synergistic, sleep-aligned GH release.",
  },
  {
    slug: "tirzepatide",
    name: "Tirzepatide",
    fullName: "GIP/GLP-1 dual receptor agonist",
    category: "weight",
    oneLiner: "A dual GIP/GLP-1 agonist that drives substantial weight loss and glycemic control.",
    mechanism: "Activates both GIP and GLP-1 receptors, slowing gastric emptying, reducing appetite, and improving insulin sensitivity.",
    evidence: "FDA-approved (Mounjaro/Zepbound); SURMOUNT trials show 15-22% mean body-weight reduction.",
  },
  {
    slug: "retatrutide",
    name: "Retatrutide",
    fullName: "GGG triple agonist (GIP/GLP-1/glucagon)",
    category: "weight",
    oneLiner: "An investigational triple-hormone agonist showing the largest weight-loss effect to date.",
    mechanism: "Activates GIP, GLP-1, and glucagon receptors simultaneously, boosting energy expenditure alongside appetite suppression.",
    evidence: "Phase 2 trials report up to 24% body-weight reduction at 48 weeks; Phase 3 ongoing.",
  },
  {
    slug: "aod-9604",
    name: "AOD-9604",
    fullName: "hGH fragment 176-191",
    category: "weight",
    oneLiner: "A growth-hormone fragment that targets lipolysis without affecting blood glucose.",
    mechanism: "Stimulates fat breakdown and inhibits lipogenesis by mimicking the lipolytic C-terminal region of growth hormone.",
    evidence: "Human obesity trials show fat-mass reduction with a favorable metabolic safety profile.",
  },
];

/* ── Stacks (Reveal pages) ─────────────────────────────────── */
export const stacks: Stack[] = [
  {
    slug: "wolverine",
    name: "Wolverine",
    tagline: "Recover like nothing happened.",
    audience: "Lifters, athletes, anyone with a stubborn injury or chronic inflammation.",
    goal: "recover",
    peptides: ["bpc-157", "tb-500"],
    protocol: {
      frequency: "5 mornings per week",
      duration: "12 weeks",
      dose: "BPC-157 250mcg + TB-500 2.5mg (subcutaneous)",
      administration: "Single combined injection — both peptides drawn into one syringe",
    },
    timeline: [
      { weeks: "Wk 1-2", phase: "Inflammation drop", description: "Patients report visibly reduced swelling and joint warmth. Sleep quality often improves first." },
      { weeks: "Wk 3-6", phase: "Tissue remodeling", description: "BPC-157 and TB-500 work synergistically — VEGF upregulation drives new capillary formation at injury sites." },
      { weeks: "Wk 7-10", phase: "Strength return", description: "Tendons and ligaments regain load tolerance. Patients add weight or volume without re-aggravation." },
      { weeks: "Wk 11-12", phase: "Consolidation", description: "Repair is stable. We taper, then re-evaluate. Most patients cycle off and maintain gains for months." },
    ],
    pricing: [
      { duration: "1-month", months: 1, pricePerMonth: 349, totalPrice: 349 },
      { duration: "3-month", months: 3, pricePerMonth: 297, totalPrice: 891, badge: "MOST POPULAR", savings: "Save 15%" },
      { duration: "6-month", months: 6, pricePerMonth: 262, totalPrice: 1572, badge: "BEST VALUE", savings: "Save 25%" },
    ],
    outcomes: [
      "Faster soft-tissue repair (tendon, ligament, muscle)",
      "Reduced systemic inflammation",
      "Improved gut barrier function",
      "Better sleep quality from week 1-2",
      "Restored load tolerance in chronic injuries",
    ],
    contraindications: [
      "Active or recent cancer diagnosis",
      "Pregnancy or breastfeeding",
      "Untreated hyperthyroidism",
    ],
    hero: {
      eyebrow: "PROTOCOL · WOLVERINE",
      headline: "Recover like nothing",
      italicWord: "happened",
      subhead: "A 12-week, physician-guided BPC-157 + TB-500 protocol. Compounded in U.S. 503A pharmacies. Shipped to your door.",
    },
    problem: "When recovery isn't optional.",
    subProblem: "You did the rehab. You rested. The injury still owns your training. There's a layer beneath the basics — and it's prescribable.",
    protocolItalicHeadline: { plain: "Recover like ", italic: "nothing happened", plain2: "." },
    protocolDoes: [
      "Drives angiogenesis and fibroblast migration straight to damaged tendon and ligament.",
      "Lowers the systemic inflammation that keeps stalling your repair cycle.",
      "Restores load tolerance so you train without re-aggravating the same site.",
    ],
    outcomeKpis: [
      { value: "–31%", label: "Chronic inflammation (CRP)" },
      { value: "+18%", label: "Strength return, week 8" },
      { value: "84%", label: "Report visible tissue repair" },
      { value: "96%", label: "Protocol completion" },
    ],
    outcomesFootnote: "Internal cohort data, N=247, weeks 0–12. Individual results vary. See methodology.",
    anchorPrice: "$498/mo",
    physicianCalloutCopy: "Every Wolverine prescription is reviewed by a board-certified U.S. physician licensed in your state. If you're not a candidate, you pay nothing.",
    faqs: [
      { q: "Is Wolverine right for me?", a: "It's built for lifters, athletes, and anyone fighting a stubborn soft-tissue injury or chronic inflammation that hasn't resolved with rest and rehab alone. Your intake and MD review confirm fit before anything ships." },
      { q: "What if I have a pre-existing condition?", a: "Our intake screens for contraindications — active or recent cancer, pregnancy or breastfeeding, and untreated hyperthyroidism among them. A physician reviews every case individually and will decline or adjust the protocol when it isn't appropriate." },
      { q: "How long until I see results?", a: "Most patients report reduced swelling and better sleep within 7–14 days. Tissue remodeling builds across weeks 3–6, with strength returning around week 8 on a predictable curve." },
      { q: "Can I stack Wolverine with another protocol?", a: "Often, yes — recovery peptides pair well with Glow or Eternal. Your physician confirms the combined plan and dosing so the protocols complement rather than compete." },
      { q: "What's included in the price?", a: "Physician consult and review, pharmacy-compounded BPC-157 + TB-500, injection supplies, cold-chain shipping, and ongoing care — with lab work covered when clinically indicated. No hidden fees." },
    ],
  },
  {
    slug: "glow",
    name: "Glow",
    tagline: "Skin that looks rested when you're not.",
    audience: "Anyone over 28 who's done the serums and wants the next layer underneath.",
    goal: "skin",
    peptides: ["ghk-cu", "bpc-157"],
    protocol: {
      frequency: "5 mornings per week",
      duration: "12 weeks",
      dose: "GHK-Cu 2mg + BPC-157 250mcg (subcutaneous)",
      administration: "Single combined injection — both peptides drawn into one syringe",
    },
    timeline: [
      { weeks: "Wk 1-3", phase: "Barrier repair", description: "GHK-Cu activates fibroblasts and antioxidant pathways. Redness calms. Texture starts to even." },
      { weeks: "Wk 4-7", phase: "Collagen build", description: "Type I and III collagen synthesis ramps. Fine lines visibly soften. Skin starts to feel firmer." },
      { weeks: "Wk 8-10", phase: "Glow phase", description: "Light reflection improves — what patients call \"the glow.\" Wound healing throughout the body accelerates." },
      { weeks: "Wk 11-12", phase: "Maintenance", description: "Results consolidate. We typically run a maintenance protocol at lower frequency to hold gains." },
    ],
    pricing: [
      { duration: "1-month", months: 1, pricePerMonth: 249, totalPrice: 249 },
      { duration: "3-month", months: 3, pricePerMonth: 212, totalPrice: 636, badge: "MOST POPULAR", savings: "Save 15%" },
      { duration: "6-month", months: 6, pricePerMonth: 187, totalPrice: 1122, badge: "BEST VALUE", savings: "Save 25%" },
    ],
    outcomes: [
      "Visibly firmer, more even skin texture",
      "Softened fine lines and crow's feet",
      "Reduced redness and post-inflammatory marks",
      "Faster wound healing throughout the body",
      "Restored skin barrier function",
    ],
    contraindications: [
      "Active or recent cancer diagnosis",
      "Pregnancy or breastfeeding",
      "Wilson's disease (copper sensitivity)",
    ],
    hero: {
      eyebrow: "PROTOCOL · GLOW",
      headline: "Skin that looks rested when you're",
      italicWord: "not",
      subhead: "A 12-week, physician-guided GHK-Cu + BPC-157 protocol. Compounded in U.S. 503A pharmacies. Shipped to your door.",
    },
    problem: "When good skincare stops being enough.",
    subProblem: "You've layered the serums and the actives. Topicals work on the surface — this works in the layer underneath, where collagen is actually made.",
    protocolItalicHeadline: { plain: "Skin ", italic: "built from inside", plain2: "." },
    protocolDoes: [
      "Switches on roughly 4,000 genes tied to collagen synthesis and barrier repair.",
      "Calms redness and post-inflammatory marks while texture evens out.",
      "Builds Type I and III collagen so firmness comes from the dermis, not a cream.",
    ],
    outcomeKpis: [
      { value: "+27%", label: "Skin elasticity (cutometer)" },
      { value: "–22%", label: "UV photo-damage markers" },
      { value: "89%", label: "Visible glow shift by week 6" },
      { value: "94%", label: "Protocol completion" },
    ],
    outcomesFootnote: "Internal cohort data, N=247, weeks 0–12. Individual results vary. See methodology.",
    anchorPrice: "$352/mo",
    physicianCalloutCopy: "Every Glow prescription is reviewed by a board-certified U.S. physician licensed in your state. If you're not a candidate, you pay nothing.",
    faqs: [
      { q: "Is Glow right for me?", a: "It's for anyone past their late twenties who's already doing topical skincare and wants the next layer underneath — real collagen support, not another surface product. Intake and MD review confirm fit first." },
      { q: "What if I have a pre-existing condition?", a: "Our intake screens for contraindications including active or recent cancer, pregnancy or breastfeeding, and Wilson's disease (copper sensitivity, relevant to GHK-Cu). A physician reviews every case before prescribing." },
      { q: "How long until I see results?", a: "Barrier and redness improvements often begin in the first few weeks; most patients notice the firmer, more reflective ‘glow’ shift by around week 6, consolidating by week 12." },
      { q: "Can I keep my current skincare routine?", a: "Yes — Glow works from the inside and complements topical actives. Your physician will flag any actives worth spacing out during the protocol." },
      { q: "What's included in the price?", a: "Physician consult and review, pharmacy-compounded GHK-Cu + BPC-157, injection supplies, cold-chain shipping, and ongoing care. Lab work is covered when clinically indicated. No hidden fees." },
    ],
  },
  {
    slug: "longevity",
    name: "Eternal",
    tagline: "Time, recalibrated.",
    audience: "35+, biological-age optimizers, and executives who want their healthspan to match their ambition.",
    goal: "longevity",
    peptides: ["epitalon", "thymosin-a1", "nad-plus", "mots-c"],
    protocol: {
      frequency: "5 evenings per week",
      duration: "12 weeks",
      dose: "Epitalon 10mg + Thymosin-\u03b11 1.5mg + NAD+ 100mg + MOTS-c 10mg (cycled)",
      administration: "Subcutaneous injection, sequenced across the cycle per physician protocol",
    },
    timeline: [
      { weeks: "Wk 1-2", phase: "Cellular priming", description: "NAD+ restores mitochondrial energy currency. Patients report cleaner energy and fewer afternoon crashes." },
      { weeks: "Wk 3-6", phase: "Circadian reset", description: "Epitalon recalibrates melatonin rhythm. Deep sleep (HRV) climbs and recovery sharpens." },
      { weeks: "Wk 7-10", phase: "Immune recalibration", description: "Thymosin-\u03b11 restores the T-cell ratio. MOTS-c improves metabolic flexibility." },
      { weeks: "Wk 11-12", phase: "Consolidation", description: "Biological-age markers shift. We re-test, then move to a maintenance cadence." },
    ],
    pricing: [
      { duration: "1-month", months: 1, pricePerMonth: 449, totalPrice: 449 },
      { duration: "3-month", months: 3, pricePerMonth: 392, totalPrice: 1176, badge: "MOST POPULAR", savings: "Save 13%" },
      { duration: "6-month", months: 6, pricePerMonth: 348, totalPrice: 2088, badge: "BEST VALUE", savings: "Save 22%" },
    ],
    outcomes: [
      "+22% energy by week 8",
      "\u20134.7yr biological-age marker shift",
      "+31% deep sleep (HRV-measured)",
      "Improved immune T-cell ratio",
      "Sharper metabolic flexibility",
    ],
    contraindications: [
      "Active malignancy",
      "Autoimmune flare",
      "Pregnancy or breastfeeding",
    ],
    hero: {
      eyebrow: "PROTOCOL \u00b7 ETERNAL",
      headline: "Time,",
      italicWord: "recalibrated",
      subhead: "A 12-week, physician-guided longevity protocol \u2014 Epitalon, Thymosin-\u03b11, NAD+, MOTS-c. Compounded in U.S. 503A pharmacies. Shipped to your door.",
    },
    problem: "Aging isn't inevitable. It's a signal cascade.",
    subProblem: "Energy, sleep, and immunity don't decline at random — they follow falling cellular signals. Eternal targets those signals, under physician supervision.",
    protocolItalicHeadline: { plain: "The clock ", italic: "you can rewind", plain2: "." },
    protocolDoes: [
      "Restores NAD+, the coenzyme that fuels mitochondrial energy and DNA repair.",
      "Recalibrates circadian rhythm and the T-cell ratio that drifts with age.",
      "Improves metabolic flexibility so your body uses fuel like a younger one.",
    ],
    outcomeKpis: [
      { value: "+22%", label: "Reported energy by week 8" },
      { value: "–4.7yr", label: "Biological-age marker shift" },
      { value: "+31%", label: "Deep sleep architecture (HRV)" },
      { value: "81%", label: "T-cell ratio normalized" },
    ],
    outcomesFootnote: "Internal cohort data, N=247, weeks 0–12. Individual results vary. See methodology.",
    anchorPrice: "$621/mo",
    physicianCalloutCopy: "Every Eternal prescription is reviewed by a board-certified U.S. physician licensed in your state. If you're not a candidate, you pay nothing.",
    faqs: [
      { q: "Is Eternal right for me?", a: "It's designed for adults 35+ focused on healthspan and biological-age optimization — people who want energy, sleep, and immunity to keep pace with their ambition. Intake plus MD review confirm fit, and baseline labs are often part of it." },
      { q: "What if I have a pre-existing condition?", a: "Our intake screens for contraindications including active malignancy, autoimmune flare, and pregnancy or breastfeeding. Because Eternal touches immune and metabolic pathways, our physicians frequently require baseline labs before prescribing." },
      { q: "How long until I see results?", a: "Cleaner energy often arrives in the first two weeks via NAD+; sleep and recovery sharpen across weeks 3–6, with biological-age and immune markers shifting by re-test around week 12." },
      { q: "Can I stack Eternal with another protocol?", a: "Yes — it commonly pairs with Deep for sleep or Lean for metabolic goals. Your physician sequences dosing so the protocols reinforce each other." },
      { q: "What's included in the price?", a: "Physician consult and review, the compounded Epitalon / Thymosin-\u03b11 / NAD+ / MOTS-c protocol, supplies, cold-chain shipping, and ongoing care. Lab work is covered when clinically indicated. No hidden fees." },
    ],
  },
  {
    slug: "sleep",
    name: "Deep",
    tagline: "Rest, engineered.",
    audience: "Insomniacs, executives in burnout, and shift workers whose sleep architecture has broken down.",
    goal: "sleep",
    peptides: ["ipamorelin", "dsip", "selank", "cjc-1295"],
    protocol: {
      frequency: "Nightly, 5 nights per week",
      duration: "8 weeks",
      dose: "Ipamorelin 200mcg + DSIP 100mcg + Selank 250mcg + CJC-1295 (no DAC) 100mcg",
      administration: "Subcutaneous injection before bed; Selank intranasal where indicated",
    },
    timeline: [
      { weeks: "Wk 1-2", phase: "Onset reset", description: "DSIP shortens sleep-onset latency. Patients fall asleep faster within the first week." },
      { weeks: "Wk 3-4", phase: "Depth build", description: "Ipamorelin + CJC-1295 amplify the overnight GH pulse, deepening slow-wave (N3) sleep." },
      { weeks: "Wk 5-6", phase: "Architecture lock", description: "Deep sleep climbs to peak. Morning HRV rises; next-day cognitive fog clears." },
      { weeks: "Wk 7-8", phase: "Consolidation", description: "Sleep architecture stabilizes. We taper to a maintenance protocol." },
    ],
    pricing: [
      { duration: "1-month", months: 1, pricePerMonth: 289, totalPrice: 289 },
      { duration: "3-month", months: 3, pricePerMonth: 251, totalPrice: 753, badge: "MOST POPULAR", savings: "Save 13%" },
      { duration: "6-month", months: 6, pricePerMonth: 228, totalPrice: 1368, badge: "BEST VALUE", savings: "Save 21%" },
    ],
    outcomes: [
      "+38% deep sleep (N3) by week 6",
      "\u201342% sleep-onset latency",
      "+27% morning HRV",
      "\u201331% next-day cognitive fog",
      "Steadier mood and stress tolerance",
    ],
    contraindications: [
      "Active cancer diagnosis",
      "Untreated severe sleep apnea",
      "Pregnancy or breastfeeding",
    ],
    hero: {
      eyebrow: "PROTOCOL \u00b7 DEEP",
      headline: "Rest,",
      italicWord: "engineered",
      subhead: "An 8-week, physician-guided sleep protocol \u2014 Ipamorelin, DSIP, Selank, CJC-1295. Compounded in U.S. 503A pharmacies. Shipped to your door.",
    },
    problem: "When sleep stops working.",
    subProblem: "You're in bed eight hours and wake up wrecked. The problem isn't time — it's architecture. Deep rebuilds the slow-wave sleep you've lost.",
    protocolItalicHeadline: { plain: "Sleep ", italic: "you can measure", plain2: "." },
    protocolDoes: [
      "Shortens sleep-onset latency so you fall asleep faster within the first week.",
      "Amplifies the overnight GH pulse that deepens slow-wave (N3) sleep.",
      "Lifts morning HRV and clears the next-day cognitive fog.",
    ],
    outcomeKpis: [
      { value: "+38%", label: "Deep sleep (N3) by week 6" },
      { value: "–42%", label: "Sleep-onset latency" },
      { value: "+27%", label: "Morning HRV" },
      { value: "–31%", label: "Next-day cognitive fog" },
    ],
    outcomesFootnote: "Internal cohort data, N=247, weeks 0–8. Individual results vary. See methodology.",
    anchorPrice: "$412/mo",
    physicianCalloutCopy: "Every Deep prescription is reviewed by a board-certified U.S. physician licensed in your state. If you're not a candidate, you pay nothing.",
    faqs: [
      { q: "Is Deep right for me?", a: "It's for people whose sleep architecture has broken down — insomnia, burnout, or shift work that's flattened your deep sleep. If you sleep enough hours but wake unrested, this is the protocol. Intake and MD review confirm fit." },
      { q: "What if I have a pre-existing condition?", a: "Our intake screens for contraindications including active cancer, untreated severe sleep apnea, and pregnancy or breastfeeding. Untreated apnea must be addressed first — a physician reviews every case before prescribing." },
      { q: "How long until I see results?", a: "Most patients fall asleep faster within the first week as onset latency drops. Deep sleep climbs across weeks 3–6, with morning HRV and daytime clarity following." },
      { q: "Can I stack Deep with another protocol?", a: "Yes — Deep pairs naturally with Wolverine (recovery) and Eternal (longevity), since better sleep amplifies both. Your physician aligns the dosing schedule." },
      { q: "What's included in the price?", a: "Physician consult and review, the compounded Ipamorelin / DSIP / Selank / CJC-1295 protocol, supplies, cold-chain shipping, and ongoing care. Lab work is covered when clinically indicated. No hidden fees." },
    ],
  },
  {
    slug: "lean",
    name: "Lean",
    tagline: "Fat loss. Lean preserved.",
    audience: "BMI 27+, visceral-fat carriers, and plateau breakers who want recomposition, not just a smaller number.",
    goal: "weight",
    peptides: ["tirzepatide", "retatrutide", "aod-9604", "tesamorelin"],
    protocol: {
      frequency: "Weekly titration + supportive dosing",
      duration: "16 weeks",
      dose: "Tirzepatide (titrated) + Retatrutide + AOD-9604 + Tesamorelin per physician protocol",
      administration: "Subcutaneous injection; weekly GLP-class titration with supportive peptides",
    },
    timeline: [
      { weeks: "Wk 1-4", phase: "Appetite reset", description: "Tirzepatide titration slows gastric emptying. Cravings fall; portions shrink without willpower battles." },
      { weeks: "Wk 5-8", phase: "Fat mobilization", description: "AOD-9604 and Tesamorelin target visceral and abdominal fat while preserving lean mass." },
      { weeks: "Wk 9-12", phase: "Recomposition", description: "Body weight drops steadily. DEXA confirms lean mass is preserved as fat falls." },
      { weeks: "Wk 13-16", phase: "Consolidation", description: "Metabolic markers improve. We map a maintenance plan to hold the recomposition." },
    ],
    pricing: [
      { duration: "1-month", months: 1, pricePerMonth: 499, totalPrice: 499 },
      { duration: "3-month", months: 3, pricePerMonth: 448, totalPrice: 1344, badge: "MOST POPULAR", savings: "Save 10%" },
      { duration: "6-month", months: 6, pricePerMonth: 398, totalPrice: 2388, badge: "BEST VALUE", savings: "Save 20%" },
    ],
    outcomes: [
      "\u201312-18% body weight by week 16",
      "\u201341% visceral adipose tissue",
      "Preserved lean mass (DEXA-confirmed)",
      "\u201328 mg/dL fasting glucose",
      "Broken weight-loss plateaus",
    ],
    contraindications: [
      "History of medullary thyroid carcinoma or MEN2",
      "Active GI disease or pancreatitis history",
      "Pregnancy or breastfeeding",
    ],
    hero: {
      eyebrow: "PROTOCOL \u00b7 LEAN",
      headline: "Fat loss. Lean",
      italicWord: "preserved",
      subhead: "A 16-week, physician-guided metabolic protocol \u2014 Tirzepatide, Retatrutide, AOD-9604, Tesamorelin. Compounded in U.S. 503A pharmacies. Shipped to your door.",
    },
    problem: "When the diet plateau won't break.",
    subProblem: "You've cut calories and trained hard, and the scale stopped moving. Lean changes the metabolic signaling — and protects the muscle you fought for.",
    protocolItalicHeadline: { plain: "The body ", italic: "you can recompose", plain2: "." },
    protocolDoes: [
      "Resets appetite and slows gastric emptying so portions shrink without willpower battles.",
      "Mobilizes visceral and abdominal fat while preserving lean mass.",
      "Improves insulin sensitivity and fasting glucose as weight comes down.",
    ],
    outcomeKpis: [
      { value: "–12–18%", label: "Body weight by week 16" },
      { value: "–41%", label: "Visceral adipose tissue" },
      { value: "100%", label: "Preserved lean mass (DEXA)" },
      { value: "–28", label: "mg/dL fasting glucose avg" },
    ],
    outcomesFootnote: "Internal cohort data, N=247, weeks 0–16. Individual results vary. See methodology.",
    anchorPrice: "$689/mo",
    physicianCalloutCopy: "Every Lean prescription is reviewed by a board-certified U.S. physician licensed in your state. If you're not a candidate, you pay nothing.",
    faqs: [
      { q: "Is Lean right for me?", a: "It's built for a BMI of 27+, visceral-fat carriers, and plateau-breakers who want recomposition — not just a smaller number. Intake and MD review confirm fit, and baseline metabolic labs are usually part of it." },
      { q: "What if I have a pre-existing condition?", a: "Our intake screens for contraindications including a personal or family history of medullary thyroid carcinoma or MEN2, active GI disease or pancreatitis history, and pregnancy or breastfeeding. A physician reviews every case before prescribing GLP-class therapy." },
      { q: "How long until I see results?", a: "Appetite and cravings typically fall during the week 1–4 titration. Steady fat loss follows across weeks 5–12, with DEXA confirming preserved lean mass by the consolidation phase." },
      { q: "Why is this cheaper than getting Tirzepatide elsewhere?", a: "Lean uses pharmacy-compounded GLP-class therapy through an FDA-registered 503A facility, which removes brand markup — with real physician oversight, not a rubber stamp. The crossed-out anchor reflects sourcing the molecules separately." },
      { q: "What's included in the price?", a: "Physician consult and review, the compounded Tirzepatide / Retatrutide / AOD-9604 / Tesamorelin protocol with titration, supplies, cold-chain shipping, and ongoing care. Lab work is covered when clinically indicated. No hidden fees." },
    ],
  },
];

/* ── Goal categories for the picker ─────────────────────────── */
export type Goal = {
  slug: string;
  label: string;
  description: string;
  stack?: string; // stack slug if directly mapped
  italic: string;
  status: "available" | "coming-soon";
};

export const goals: Goal[] = [
  { slug: "recover", label: "Recover & Repair", italic: "recover", description: "Heal injuries. Rebuild tendons. Restore load tolerance.", stack: "wolverine", status: "available" },
  { slug: "skin", label: "Skin & Beauty", italic: "rested", description: "Firmer skin. Softer lines. Real collagen, not topical.", stack: "glow", status: "available" },
  { slug: "longevity", label: "Longevity & Performance", italic: "recalibrated", description: "Recalibrate biological age. Sleep deeper. Recompose.", stack: "longevity", status: "available" },
  { slug: "sleep", label: "Sleep & Recovery", italic: "deeper", description: "Architect your slow-wave sleep. Wake recovered.", stack: "sleep", status: "available" },
  { slug: "weight", label: "Weight & Metabolic", italic: "lean", description: "GLP-class and metabolic peptides, prescribed and supervised.", stack: "lean", status: "available" },
];

/* ── Helpers ──────────────────────────────────────────────── */
export const getStackBySlug = (slug: string) => stacks.find(s => s.slug === slug);
export const getPeptideBySlug = (slug: string) => peptides.find(p => p.slug === slug);
export const getPeptidesForStack = (stack: Stack) => stack.peptides.map(slug => peptides.find(p => p.slug === slug)!).filter(Boolean);
