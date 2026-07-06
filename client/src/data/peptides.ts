/* ──────────────────────────────────────────────────────────────
   Nexphoria Peptide Library — single source of truth for /peptides
   Voice: physician-guided, scientific, precise. COPY: always "peptides."
   References are real-literature-grade citations; URLs point
   to PubMed/PMC landing pages where available, otherwise to canonical reviews.
   These are educational summaries, not medical claims — every detail page
   carries the standard off-label disclaimer.
   ────────────────────────────────────────────────────────────── */

export type PeptideCategory =
  | "recovery"
  | "skin"
  | "cognition"
  | "sleep"
  | "growth"
  | "longevity"
  | "metabolic"
  | "sexual-health";

export interface PeptideStudy {
  title: string;
  year: string;
  source: string;
  url: string;
}

export interface PeptideTimelineEntry {
  week: string;
  effect: string;
}

export interface PeptideEvidenceTier {
  /** Letter grade — A / A- / B+ / B / B- / C+ / C / Preclinical */
  grade: string;
  /** One-line description of the evidence base (e.g. "FDA-approved · Phase 3 RCTs"). */
  description: string;
  /** Approximate count of citable human/preclinical studies backing the tier. */
  studyCount: number;
  /** US regulatory status — shown as a callout when it materially affects patient decision-making. */
  fdaStatus?: string;
}

export interface Peptide {
  slug: string;
  name: string;
  fullName: string;
  tagline: string;
  category: PeptideCategory;
  /** kebab id of the molecular SVG glyph in MolecularGlyph */
  glyph:
    | "chain"
    | "ring"
    | "copper"
    | "helix"
    | "branch"
    | "ghrh"
    | "secretagogue"
    | "fragment";
  summary: string;
  mechanism: string;
  halfLife: string;
  typicalDose: string;
  cycleLength: string;
  administration: string;
  timeline: PeptideTimelineEntry[];
  studies: PeptideStudy[];
  pairsWith: string[]; // slugs
  inStacks: string[]; // protocol slugs: "wolverine" | "glow"
  /** Optional per-peptide evidence tier. When omitted, PDP falls back to category-derived tier. */
  evidenceTier?: PeptideEvidenceTier;
  /** Optional per-peptide contraindications strip. When omitted, PDP falls back to category-generic copy. */
  contraindications?: string;
}

export const CATEGORY_LABELS: Record<PeptideCategory, string> = {
  recovery: "Recovery & Repair",
  skin: "Skin & Aesthetics",
  cognition: "Cognition & Mood",
  sleep: "Sleep & Restoration",
  growth: "Growth & Hormone",
  longevity: "Longevity & Cellular",
  metabolic: "Metabolic & Weight",
  "sexual-health": "Sexual Health",
};

/* The feeling line of each goal (ROADMAP 4.2) — the emotional register, used
   consistently on goal tiles, category heroes, catalog shelves, and the
   assessment. Warm, bank-calm, and inside the claims the catalog supports. */
export const CATEGORY_FEELING: Record<PeptideCategory, string> = {
  recovery: "Train like it never happened.",
  skin: "Meet your skin again.",
  cognition: "Clear head, steady mood.",
  sleep: "Wake up actually rested.",
  growth: "Strength, with receipts.",
  longevity: "Age on your terms.",
  metabolic: "Appetite, finally quiet.",
  "sexual-health": "Desire, addressed directly.",
};

/* Her world speaks its own register (Chiya 2026-07-06: the worlds must be
   completely separate — custom emotional triggers per world). The base
   CATEGORY_FEELING lines lean masculine-athletic; women's world overrides
   them wherever it renders world-cast surfaces. */
export const CATEGORY_FEELING_WOMEN: Partial<Record<PeptideCategory, string>> = {
  recovery: "Strength that feels like you.",
  metabolic: "Peace with your appetite.",
  longevity: "Radiance, year after year.",
  cognition: "Calm mind, bright focus.",
  sleep: "Sleep like it's sacred.",
  "sexual-health": "Desire, on your schedule.",
};

/** The feeling line, cast to a world. Men = base register; women override. */
export function feelingFor(cat: PeptideCategory, world?: "men" | "women"): string {
  return world === "women" ? (CATEGORY_FEELING_WOMEN[cat] ?? CATEGORY_FEELING[cat]) : CATEGORY_FEELING[cat];
}

/* Each goal's word-triad (ROADMAP 8.3) — three single-word beats shown as
   quiet chips on stack pages and goal heroes. Same register as the feeling
   lines; claims stay inside what the catalog supports. */
export const CATEGORY_TRIAD: Record<PeptideCategory, [string, string, string]> = {
  recovery: ["Repair", "Rebound", "Return"],
  skin: ["Renew", "Firm", "Radiate"],
  cognition: ["Clear", "Focus", "Steady"],
  sleep: ["Descend", "Restore", "Rise"],
  growth: ["Build", "Recover", "Measure"],
  longevity: ["Restore", "Protect", "Extend"],
  metabolic: ["Quiet", "Steady", "Recompose"],
  "sexual-health": ["Signal", "Respond", "Connect"],
};

const RAW_PEPTIDES: Peptide[] = [
  {
    slug: "bpc-157",
    name: "BPC-157",
    fullName: "Body Protection Compound 157",
    tagline: "The repair signal.",
    category: "recovery",
    glyph: "chain",
    summary:
      "A 15-amino-acid fragment of a protective protein found in gastric juice. The most-studied recovery peptide of the last decade — used to accelerate tendon, ligament, muscle, and gut healing.",
    mechanism:
      "BPC-157 upregulates VEGF and growth-hormone receptor expression at injury sites, driving angiogenesis (new blood-vessel formation) and fibroblast migration. It also modulates the nitric-oxide pathway and appears to protect the gut lining, which is part of why it is investigated for both musculoskeletal and gastrointestinal repair.",
    halfLife: "~4 hours (subcutaneous)",
    typicalDose: "250–500 mcg, once or twice daily",
    cycleLength: "4–8 weeks, near the area of injury where appropriate",
    administration: "Subcutaneous injection",
    timeline: [
      { week: "Week 1–2", effect: "Reduced local inflammation; sleep often improves first." },
      { week: "Week 2–4", effect: "Soft-tissue repair accelerates; joint stiffness eases." },
      { week: "Week 4–6", effect: "Load tolerance returns; range of motion improves." },
      { week: "Week 6–8", effect: "Consolidation — many patients taper to maintenance." },
    ],
    studies: [
      { title: "Stable gastric pentadecapeptide BPC 157: novel therapy in gastrointestinal tract", year: "2018", source: "Curr Pharm Des / PMC", url: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6225019/" },
      { title: "BPC 157 and tendon healing — Achilles tendon transection model", year: "2010", source: "J Orthop Res", url: "https://pubmed.ncbi.nlm.nih.gov/20225319/" },
      { title: "BPC 157 and the central nervous system / NO-system", year: "2020", source: "PMC", url: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC7460276/" },
    ],
    pairsWith: ["tb-500", "ghk-cu"],
    inStacks: ["wolverine"],
    evidenceTier: {
      grade: "Preclinical",
      description: "Rodent tendon, ligament, and gut-lining models · limited human data",
      studyCount: 40,
      fdaStatus: "Not FDA-approved · investigational · compounded by prescription only",
    },
    contraindications:
      "NOT FOR: pregnancy · personal or family history of cancer · active malignancy · pro-angiogenic risk (untreated retinopathy, recent DVT) · competitive athletes under WADA testing · <18 yrs",
  },
  {
    slug: "tb-500",
    name: "TB-500",
    fullName: "Thymosin Beta-4 (synthetic fragment)",
    tagline: "The repair logistics.",
    category: "recovery",
    glyph: "helix",
    summary:
      "A synthetic fragment of Thymosin Beta-4, a naturally occurring actin-regulating peptide. Where BPC-157 acts locally, TB-500 travels systemically to damaged tissue and coordinates the cellular repair crew.",
    mechanism:
      "TB-500 binds G-actin and promotes the migration of repair cells toward injured tissue. It supports new blood-vessel formation, down-regulates inflammatory signaling, and has been studied for cardiac repair following myocardial infarction. Its systemic reach is why it is frequently paired with BPC-157.",
    halfLife: "~2–3 hours; effects persist via tissue distribution",
    typicalDose: "2–2.5 mg, twice weekly (loading), then weekly",
    cycleLength: "4–6 weeks loading, then maintenance",
    administration: "Subcutaneous injection",
    timeline: [
      { week: "Week 1–2", effect: "Systemic anti-inflammatory effect begins; recovery feels faster." },
      { week: "Week 2–4", effect: "Tissue repair broadens beyond the primary injury site." },
      { week: "Week 4–6", effect: "Flexibility and endurance improve; nagging strains settle." },
      { week: "Week 6+", effect: "Transition to weekly maintenance dosing." },
    ],
    studies: [
      { title: "Thymosin beta-4 in cardiac repair and regeneration", year: "2012", source: "Ann N Y Acad Sci", url: "https://pubmed.ncbi.nlm.nih.gov/22994771/" },
      { title: "Thymosin β4 promotes angiogenesis, wound healing, and cell migration", year: "2013", source: "PMC", url: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3812907/" },
      { title: "Actin-sequestering and tissue-repair roles of thymosin β4", year: "2010", source: "Expert Opin Biol Ther", url: "https://pubmed.ncbi.nlm.nih.gov/20932225/" },
    ],
    pairsWith: ["bpc-157"],
    inStacks: ["wolverine"],
    evidenceTier: {
      grade: "Preclinical",
      description: "Rodent cardiac + wound-healing models · human trials are limited to topical/veterinary use",
      studyCount: 32,
      fdaStatus: "Not FDA-approved · investigational · compounded by prescription only",
    },
    contraindications:
      "NOT FOR: pregnancy · active malignancy or cancer history (angiogenic risk) · uncontrolled diabetic retinopathy · recent DVT or PE · competitive athletes under WADA testing · <18 yrs",
  },
  {
    slug: "ghk-cu",
    name: "GHK-Cu",
    fullName: "Copper Tripeptide-1",
    tagline: "The skin reset.",
    category: "skin",
    glyph: "copper",
    summary:
      "A copper-binding tripeptide (Gly-His-Lys) naturally present in human plasma. Decades of dermatology research show it resets aged skin gene expression toward a younger, more regenerative pattern.",
    mechanism:
      "GHK-Cu modulates the expression of roughly 4,000 human genes — broadly shifting them toward tissue repair. It stimulates collagen and elastin synthesis, supports the skin barrier, recruits antioxidant defenses, and improves wound healing. The bound copper ion is essential to its biological activity.",
    halfLife: "Short in plasma; topical/injected depot extends activity",
    typicalDose: "1–2 mg subcutaneous; or compounded topical formulation",
    cycleLength: "8–12 weeks",
    administration: "Subcutaneous injection or compounded topical",
    timeline: [
      { week: "Week 1–3", effect: "Skin hydration and barrier function improve." },
      { week: "Week 3–6", effect: "Tone evens; fine lines begin to soften." },
      { week: "Week 6–10", effect: "Firmness improves as collagen synthesis ramps." },
      { week: "Week 10–12", effect: "Visible texture and elasticity gains consolidate." },
    ],
    studies: [
      { title: "The human tripeptide GHK and tissue remodeling (gene expression)", year: "2008", source: "J Biomater Sci Polym Ed", url: "https://pubmed.ncbi.nlm.nih.gov/18534177/" },
      { title: "GHK peptide as a natural modulator of multiple cellular pathways in skin", year: "2015", source: "PMC", url: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4508371/" },
      { title: "Copper peptide and skin regeneration — review", year: "2018", source: "PMC", url: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5796020/" },
    ],
    pairsWith: ["bpc-157"],
    inStacks: ["glow"],
    evidenceTier: {
      grade: "B",
      description: "Human dermatology trials (topical) · dozens of gene-expression + wound-healing papers",
      studyCount: 27,
      fdaStatus: "Not FDA-approved as a drug · GRAS-listed cosmetic ingredient · injectable form compounded by prescription only",
    },
    contraindications:
      "NOT FOR: pregnancy · Wilson's disease or copper-metabolism disorders · known copper allergy · active melanoma or pigmented skin lesions (defer injectable near lesions) · <18 yrs",
  },
  {
    slug: "semax",
    name: "Semax",
    fullName: "Semax (ACTH 4–10 analog)",
    tagline: "The clarity peptide.",
    category: "cognition",
    glyph: "fragment",
    summary:
      "A synthetic analog of a fragment of adrenocorticotropic hormone (ACTH 4–10), developed in Russia and used clinically there for cognition and neuroprotection. Studied for attention, memory, and recovery from ischemic events.",
    mechanism:
      "Semax increases expression of brain-derived neurotrophic factor (BDNF) and its receptor TrkB, supporting synaptic plasticity. It modulates the dopaminergic and serotonergic systems and has demonstrated neuroprotective effects in models of cerebral ischemia.",
    halfLife: "Minutes in plasma; CNS effects outlast plasma levels",
    typicalDose: "300–600 mcg intranasal daily (compounded)",
    cycleLength: "2–4 weeks on, with breaks",
    administration: "Intranasal (compounded solution)",
    timeline: [
      { week: "Day 1–3", effect: "Subtle lift in mental clarity and verbal fluency." },
      { week: "Week 1", effect: "Sustained attention improves; mental fatigue lessens." },
      { week: "Week 2–3", effect: "Working memory and task persistence strengthen." },
      { week: "Week 3–4", effect: "Cycle off to preserve responsiveness." },
    ],
    studies: [
      { title: "Semax and BDNF expression in the rat hippocampus", year: "2006", source: "Neurosci Lett", url: "https://pubmed.ncbi.nlm.nih.gov/16962711/" },
      { title: "Neuroprotective effects of Semax in cerebral ischemia", year: "2017", source: "PMC", url: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5717325/" },
      { title: "Regulatory peptide Semax: mechanisms and clinical use", year: "2019", source: "PMC", url: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6627178/" },
    ],
    pairsWith: ["selank"],
    inStacks: [],
    evidenceTier: {
      grade: "B-",
      description: "Human clinical use in Russia · no US Phase 2/3 trials",
      studyCount: 14,
      fdaStatus: "Not FDA-approved · registered as a drug in Russia (Peptogen) · compounded in US by prescription only",
    },
    contraindications:
      "NOT FOR: pregnancy · recent sinus or trans-sphenoidal surgery · active rhinosinusitis or nasal polyps · known or suspected CSF leak · severe uncontrolled hypertension · <18 yrs",
  },
  {
    slug: "selank",
    name: "Selank",
    fullName: "Selank (Tuftsin analog)",
    tagline: "Calm without sedation.",
    category: "cognition",
    glyph: "branch",
    summary:
      "A synthetic analog of the immunomodulatory peptide tuftsin. Studied as an anxiolytic that does not cause the sedation, dependence, or cognitive dulling associated with benzodiazepines — often paired with Semax.",
    mechanism:
      "Selank modulates the expression of GABA-related and serotonergic genes and influences the balance of pro- and anti-inflammatory cytokines. It increases BDNF in the hippocampus and stabilizes enkephalins, contributing to a calm-but-alert state.",
    halfLife: "Short; intranasal delivery prolongs CNS exposure",
    typicalDose: "250–500 mcg intranasal daily (compounded)",
    cycleLength: "2–4 weeks as needed",
    administration: "Intranasal (compounded solution)",
    timeline: [
      { week: "Day 1–2", effect: "Reduced situational anxiety without drowsiness." },
      { week: "Week 1", effect: "Steadier mood; improved stress tolerance." },
      { week: "Week 2–3", effect: "Sleep quality and daytime calm both improve." },
      { week: "Week 3–4", effect: "Assess response; cycle as directed." },
    ],
    studies: [
      { title: "Selank: anxiolytic peptide and gene expression in the brain", year: "2011", source: "PMC", url: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3413188/" },
      { title: "Anxiolytic and cognitive-enhancing activity of Selank", year: "2008", source: "Bull Exp Biol Med", url: "https://pubmed.ncbi.nlm.nih.gov/19023993/" },
      { title: "Selank and the GABAergic system", year: "2016", source: "PMC", url: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5037943/" },
    ],
    pairsWith: ["semax"],
    inStacks: ["sleep"],
    evidenceTier: {
      grade: "B-",
      description: "Human anxiolytic trials in Russia · no US Phase 2/3 trials",
      studyCount: 12,
      fdaStatus: "Not FDA-approved · registered as a drug in Russia · compounded in US by prescription only",
    },
    contraindications:
      "NOT FOR: pregnancy · recent sinus or trans-sphenoidal surgery · active rhinosinusitis or nasal polyps · known or suspected CSF leak · concurrent MAOI or SSRI use without physician guidance · <18 yrs",
  },
  {
    slug: "tesamorelin",
    name: "Tesamorelin",
    fullName: "Tesamorelin (GHRH analog)",
    tagline: "Targeted body composition.",
    category: "growth",
    glyph: "ghrh",
    summary:
      "A stabilized analog of growth-hormone-releasing hormone (GHRH). It is FDA-approved to reduce excess visceral abdominal fat in a specific clinical population, and is studied for its favorable effects on body composition and metabolic markers.",
    mechanism:
      "Tesamorelin binds GHRH receptors in the pituitary and stimulates the natural, pulsatile release of growth hormone, which in turn raises IGF-1. Because it works upstream through the body's own feedback loops, it preserves physiologic GH rhythm rather than overriding it.",
    halfLife: "~26–38 minutes; downstream GH/IGF-1 effects persist",
    typicalDose: "1–2 mg subcutaneous, nightly",
    cycleLength: "12+ weeks, with labs (IGF-1) monitored",
    administration: "Subcutaneous injection, before bed",
    timeline: [
      { week: "Week 1–2", effect: "Deeper sleep; recovery improves." },
      { week: "Week 2–6", effect: "IGF-1 rises into target range (lab-confirmed)." },
      { week: "Week 6–12", effect: "Visceral fat declines; body composition shifts." },
      { week: "Week 12+", effect: "Reassess with bloodwork; continue or maintain." },
    ],
    studies: [
      { title: "Tesamorelin and visceral adipose tissue reduction", year: "2010", source: "N Engl J Med", url: "https://pubmed.ncbi.nlm.nih.gov/21091073/" },
      { title: "Effects of tesamorelin on visceral fat and metabolic profile", year: "2012", source: "PMC", url: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3387511/" },
      { title: "GHRH analogs and the GH/IGF-1 axis — review", year: "2018", source: "PMC", url: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6033693/" },
    ],
    pairsWith: ["ipamorelin", "cjc-1295"],
    inStacks: ["lean"],
    evidenceTier: {
      grade: "A",
      description: "FDA-approved (Egrifta / Egrifta SV) · NEJM Phase 3 RCTs",
      studyCount: 22,
      fdaStatus: "FDA-approved for HIV-associated lipodystrophy · prescribed off-label for adult GH-axis support",
    },
    contraindications:
      "NOT FOR: pregnancy · mannitol or tesamorelin hypersensitivity · hypothalamic-pituitary axis disruption (hypophysectomy, hypopituitarism, pituitary tumor, head trauma) · active malignancy · use with caution in diabetic retinopathy · <18 yrs",
  },
  {
    slug: "ipamorelin",
    name: "Ipamorelin",
    fullName: "Ipamorelin (GH secretagogue)",
    tagline: "The clean GH pulse.",
    category: "growth",
    glyph: "secretagogue",
    summary:
      "A selective growth-hormone secretagogue. Ipamorelin triggers a clean pulse of growth hormone without meaningfully raising cortisol or prolactin — making it one of the best-tolerated peptides in its class.",
    mechanism:
      "Ipamorelin is a ghrelin-receptor (GHS-R) agonist that prompts the pituitary to release growth hormone in a short, natural pulse. Its selectivity means it spares the cortisol and prolactin elevations seen with older secretagogues, and it is frequently combined with CJC-1295 for a synergistic, physiologic GH release.",
    halfLife: "~2 hours",
    typicalDose: "200–300 mcg, 1–3× daily (often at night)",
    cycleLength: "8–12 weeks",
    administration: "Subcutaneous injection",
    timeline: [
      { week: "Week 1–2", effect: "Sleep deepens; recovery between sessions improves." },
      { week: "Week 2–6", effect: "Body composition and skin quality begin to shift." },
      { week: "Week 6–10", effect: "Lean mass and recovery gains become apparent." },
      { week: "Week 10–12", effect: "Reassess; many continue with CJC-1295 pairing." },
    ],
    studies: [
      { title: "Ipamorelin, the first selective growth hormone secretagogue", year: "1998", source: "Eur J Endocrinol", url: "https://pubmed.ncbi.nlm.nih.gov/9849822/" },
      { title: "Growth hormone secretagogues — mechanisms and clinical context", year: "2017", source: "PMC", url: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5632578/" },
      { title: "Ghrelin receptor agonists and GH release", year: "2015", source: "PMC", url: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4517446/" },
    ],
    pairsWith: ["cjc-1295", "tesamorelin"],
    inStacks: ["sleep"],
    evidenceTier: {
      grade: "B",
      description: "Small human RCTs (GH pulse pharmacology) · widely used clinically",
      studyCount: 18,
      fdaStatus: "Not FDA-approved · investigational · compounded by prescription only",
    },
    contraindications:
      "NOT FOR: pregnancy · active malignancy · Prader-Willi syndrome with severe obesity or respiratory impairment · uncontrolled type 2 diabetes · use with caution alongside insulin or glucocorticoids · <18 yrs",
  },
  {
    slug: "cjc-1295",
    name: "CJC-1295",
    fullName: "CJC-1295 (long-acting GHRH analog)",
    tagline: "The sustained signal.",
    category: "growth",
    glyph: "secretagogue",
    summary:
      "A long-acting GHRH analog that extends and amplifies the growth-hormone pulse. Most often paired with Ipamorelin: CJC-1295 raises the baseline of GH-releasing signal while Ipamorelin sharpens the pulse.",
    mechanism:
      "CJC-1295 binds GHRH receptors in the pituitary to stimulate growth-hormone release. Modified forms extend its half-life so that GH and IGF-1 stay elevated longer between doses. Combining it with a ghrelin-receptor agonist like Ipamorelin produces a larger, still-physiologic GH pulse than either alone.",
    halfLife: "Several hours to days depending on formulation",
    typicalDose: "100–300 mcg, paired with Ipamorelin",
    cycleLength: "8–12 weeks",
    administration: "Subcutaneous injection",
    timeline: [
      { week: "Week 1–2", effect: "Sleep and recovery improve as GH baseline rises." },
      { week: "Week 2–6", effect: "IGF-1 climbs; body composition begins shifting." },
      { week: "Week 6–10", effect: "Lean mass, skin, and recovery gains accumulate." },
      { week: "Week 10–12", effect: "Reassess with labs; continue or cycle off." },
    ],
    studies: [
      { title: "CJC-1295, a long-acting GHRH analog — pharmacokinetics", year: "2006", source: "J Clin Endocrinol Metab", url: "https://pubmed.ncbi.nlm.nih.gov/16352683/" },
      { title: "Sustained GH and IGF-1 increase with CJC-1295", year: "2006", source: "J Clin Endocrinol Metab", url: "https://pubmed.ncbi.nlm.nih.gov/16940453/" },
      { title: "GHRH analogs and the somatotropic axis — review", year: "2018", source: "PMC", url: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6033693/" },
    ],
    pairsWith: ["ipamorelin", "tesamorelin"],
    inStacks: ["sleep"],
    evidenceTier: {
      grade: "B",
      description: "Phase 1 human PK/PD trials (DAC form) · endocrine safety data",
      studyCount: 15,
      fdaStatus: "Not FDA-approved · development halted after 2007 fatal cardiac event during Phase 2 · non-DAC form compounded by prescription only",
    },
    contraindications:
      "NOT FOR: pregnancy · active malignancy · history of cardiac arrhythmia or QT prolongation · uncontrolled hypertension · concurrent glucocorticoid therapy without physician oversight · <18 yrs",
  },
  {
    slug: "epitalon",
    name: "Epitalon",
    fullName: "Epithalamin tetrapeptide (Ala-Glu-Asp-Gly)",
    tagline: "The clock you can rewind.",
    category: "longevity",
    glyph: "fragment",
    summary:
      "A pineal-derived tetrapeptide studied across decades of Russian gerontology research for telomerase activation and circadian recalibration. The anchor molecule of the Eternal protocol.",
    mechanism:
      "Epitalon activates telomerase, the enzyme that maintains telomere length, and normalizes melatonin secretion through the pineal gland. In long-term studies it restored age-related shifts in gene expression and neuroendocrine rhythm, which is why it is investigated as a healthspan rather than a single-symptom peptide.",
    halfLife: "Short in plasma; effects outlast circulating levels",
    typicalDose: "5-10 mg subcutaneous, cycled",
    cycleLength: "10-20 day courses, repeated seasonally",
    administration: "Subcutaneous injection",
    timeline: [
      { week: "Week 1-2", effect: "Sleep rhythm steadies; evening wind-down comes easier." },
      { week: "Week 3-6", effect: "Deep sleep and recovery markers (HRV) improve." },
      { week: "Week 6-10", effect: "Energy and resilience build as circadian rhythm consolidates." },
      { week: "Week 10-12", effect: "Reassess biological-age markers; cycle as directed." },
    ],
    studies: [
      { title: "Epithalon peptide and telomerase activity in human cells", year: "2003", source: "Bull Exp Biol Med", url: "https://pubmed.ncbi.nlm.nih.gov/14586513/" },
      { title: "Pineal peptides and aging: a long-term cohort", year: "2003", source: "Neuro Endocrinol Lett", url: "https://pubmed.ncbi.nlm.nih.gov/14523363/" },
      { title: "Epithalamin and melatonin in gerontology", year: "2007", source: "PMC", url: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC2515569/" },
    ],
    pairsWith: ["nad-plus", "mots-c", "thymosin-a1"],
    inStacks: ["longevity"],
    evidenceTier: {
      grade: "B-",
      description: "Russian gerontology cohorts (Khavinson et al.) · limited Western replication",
      studyCount: 11,
      fdaStatus: "Not FDA-approved · used clinically in Russia and CIS states · compounded in US by prescription only",
    },
    contraindications:
      "NOT FOR: pregnancy · active malignancy or hematologic cancer history · known telomerase-related conditions · concurrent immunosuppressive therapy without physician oversight · <18 yrs",
  },
  {
    slug: "thymosin-a1",
    name: "Thymosin-\u03b11",
    fullName: "Thymosin Alpha-1",
    tagline: "The immune recalibrator.",
    category: "longevity",
    glyph: "chain",
    summary:
      "A thymus-derived peptide that restores age-related decline in T-cell function. Studied worldwide as Zadaxin for immune modulation; part of the Eternal longevity protocol.",
    mechanism:
      "Thymosin-\u03b11 stimulates the maturation of T-cells and the activity of dendritic and natural-killer cells, helping restore the CD4/CD8 ratio that drifts with age. It modulates innate immune surveillance and has been studied in sepsis, chronic infection, and immune senescence.",
    halfLife: "~2 hours",
    typicalDose: "1.5 mg subcutaneous, twice weekly",
    cycleLength: "8-12 weeks",
    administration: "Subcutaneous injection",
    timeline: [
      { week: "Week 1-3", effect: "Subtle improvement in resilience to seasonal illness." },
      { week: "Week 3-6", effect: "Immune markers begin to normalize (lab-tracked)." },
      { week: "Week 6-10", effect: "T-cell ratio shifts toward a younger profile." },
      { week: "Week 10-12", effect: "Reassess immune panel; continue or maintain." },
    ],
    studies: [
      { title: "Thymosin alpha 1: biological activities and clinical applications", year: "2018", source: "PMC", url: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6240926/" },
      { title: "Thymosin alpha 1 in immune senescence", year: "2011", source: "Ann N Y Acad Sci", url: "https://pubmed.ncbi.nlm.nih.gov/22074716/" },
      { title: "Thymosin alpha 1 and T-cell reconstitution", year: "2007", source: "PMC", url: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC1933533/" },
    ],
    pairsWith: ["epitalon", "nad-plus"],
    inStacks: ["longevity"],
    evidenceTier: {
      grade: "B+",
      description: "Approved in >30 countries (Zadaxin / thymalfasin) for hepatitis B/C, cancer adjunct · US access is off-label",
      studyCount: 24,
      fdaStatus: "Not FDA-approved in the US (orphan-drug designation only) · approved abroad · compounded in US by prescription only",
    },
    contraindications:
      "NOT FOR: pregnancy · organ-transplant recipients on immunosuppression · active autoimmune flare · known thymalfasin hypersensitivity · <18 yrs",
  },
  {
    slug: "nad-plus",
    name: "NAD+",
    fullName: "Nicotinamide Adenine Dinucleotide",
    tagline: "The energy currency.",
    category: "longevity",
    glyph: "ring",
    summary:
      "The central coenzyme of cellular energy and DNA repair. NAD+ declines sharply with age; restoring it is a cornerstone of cellular-longevity protocols.",
    mechanism:
      "NAD+ fuels mitochondrial ATP production and serves as the substrate for sirtuins (SIRT1-7) and PARP enzymes that govern DNA repair and metabolic regulation. Replenishing NAD+ supports mitochondrial output and the repair pathways that decline with age.",
    halfLife: "Rapidly utilized; infusion or injection sustains levels",
    typicalDose: "100-250 mg subcutaneous, titrated",
    cycleLength: "8-12 weeks, then maintenance",
    administration: "Subcutaneous injection (slow titration)",
    timeline: [
      { week: "Week 1-2", effect: "Cleaner daytime energy; fewer afternoon crashes." },
      { week: "Week 2-6", effect: "Mental clarity and stamina improve." },
      { week: "Week 6-10", effect: "Mitochondrial markers and recovery improve." },
      { week: "Week 10-12", effect: "Transition to maintenance dosing." },
    ],
    studies: [
      { title: "NAD+ metabolism and its roles in cellular processes during ageing", year: "2021", source: "Nat Rev Mol Cell Biol", url: "https://pubmed.ncbi.nlm.nih.gov/33353981/" },
      { title: "Therapeutic potential of NAD-boosting molecules", year: "2018", source: "Cell Metab", url: "https://pubmed.ncbi.nlm.nih.gov/29249689/" },
      { title: "NAD+ in aging, metabolism, and neurodegeneration", year: "2015", source: "PMC", url: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4487780/" },
    ],
    pairsWith: ["epitalon", "mots-c"],
    inStacks: ["longevity"],
    evidenceTier: {
      grade: "B",
      description: "Human PK trials + early clinical NAD-precursor cohorts · IV NAD+ trials for neurodegeneration ongoing",
      studyCount: 20,
      fdaStatus: "Not FDA-approved as a drug · marketed as a dietary-supplement precursor (NR/NMN) · injectable NAD+ compounded by prescription only",
    },
    contraindications:
      "NOT FOR: pregnancy · active malignancy (theoretical proliferative risk) · severe cardiovascular disease (IV push-related BP swings) · concurrent chemotherapy without oncology oversight · <18 yrs",
  },
  {
    slug: "mots-c",
    name: "MOTS-c",
    fullName: "Mitochondrial-derived peptide MOTS-c",
    tagline: "The exercise mimetic.",
    category: "longevity",
    glyph: "helix",
    summary:
      "A mitochondrial-encoded peptide that acts as a metabolic regulator and exercise mimetic. One of the newest tools in cellular-longevity protocols.",
    mechanism:
      "MOTS-c activates the AMPK pathway, enhances insulin sensitivity, and promotes metabolic flexibility under stress. Encoded within mitochondrial DNA, it translocates to the nucleus to regulate stress-response genes, linking mitochondrial health to whole-body metabolism.",
    halfLife: "Short; dosed several times weekly",
    typicalDose: "5-10 mg subcutaneous, 2-3x weekly",
    cycleLength: "8-12 weeks",
    administration: "Subcutaneous injection",
    timeline: [
      { week: "Week 1-2", effect: "Endurance and workout recovery feel improved." },
      { week: "Week 2-6", effect: "Glucose handling and metabolic flexibility improve." },
      { week: "Week 6-10", effect: "Body composition and stamina gains accumulate." },
      { week: "Week 10-12", effect: "Reassess metabolic markers; cycle as directed." },
    ],
    studies: [
      { title: "The mitochondrial-derived peptide MOTS-c regulates metabolic homeostasis", year: "2015", source: "Cell Metab", url: "https://pubmed.ncbi.nlm.nih.gov/25738459/" },
      { title: "MOTS-c, an exercise-induced mitochondrial peptide", year: "2018", source: "PMC", url: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6035117/" },
      { title: "Mitochondrial-derived peptides in metabolism and aging", year: "2019", source: "PMC", url: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6663621/" },
    ],
    pairsWith: ["nad-plus", "epitalon"],
    inStacks: ["longevity"],
    evidenceTier: {
      grade: "B-",
      description: "Mechanistic human + rodent metabolic studies · no Phase 2/3 RCTs",
      studyCount: 13,
      fdaStatus: "Not FDA-approved · investigational mitochondrial-derived peptide · compounded by prescription only",
    },
    contraindications:
      "NOT FOR: pregnancy · active malignancy · severe mitochondrial disease · uncontrolled type 2 diabetes without physician oversight · <18 yrs",
  },
  {
    slug: "dsip",
    name: "DSIP",
    fullName: "Delta Sleep-Inducing Peptide",
    tagline: "Deep sleep, on cue.",
    category: "sleep",
    glyph: "branch",
    summary:
      "A naturally occurring nonapeptide that promotes deep, slow-wave sleep architecture. The onset anchor of the Deep sleep protocol.",
    mechanism:
      "DSIP modulates somatostatin and corticotropin-releasing hormone and enhances delta-wave EEG patterns associated with restorative slow-wave sleep. It has been studied for chronic insomnia, narcolepsy, and stress-related sleep disruption since the 1970s.",
    halfLife: "Minutes in plasma; CNS effects outlast levels",
    typicalDose: "100-200 mcg subcutaneous, before bed",
    cycleLength: "4-8 weeks",
    administration: "Subcutaneous injection, evening",
    timeline: [
      { week: "Night 1-3", effect: "Sleep-onset latency shortens; falling asleep gets easier." },
      { week: "Week 1-2", effect: "Slow-wave (N3) sleep deepens; fewer awakenings." },
      { week: "Week 2-4", effect: "Morning HRV rises; daytime fog lifts." },
      { week: "Week 4-8", effect: "Sleep architecture stabilizes; taper to maintenance." },
    ],
    studies: [
      { title: "Delta sleep-inducing peptide (DSIP): a review", year: "1984", source: "Pharmacol Biochem Behav", url: "https://pubmed.ncbi.nlm.nih.gov/6087390/" },
      { title: "DSIP and sleep regulation", year: "2007", source: "PMC", url: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC2440410/" },
      { title: "Effects of DSIP on sleep and stress", year: "1986", source: "Eur Neurol", url: "https://pubmed.ncbi.nlm.nih.gov/3530737/" },
    ],
    pairsWith: ["ipamorelin", "selank", "cjc-1295"],
    inStacks: ["sleep"],
    evidenceTier: {
      grade: "B-",
      description: "Human sleep-lab EEG + polysomnography studies from the 1970s-90s · limited modern trials",
      studyCount: 9,
      fdaStatus: "Not FDA-approved · investigational · compounded by prescription only",
    },
    contraindications:
      "NOT FOR: pregnancy · severe untreated sleep apnea · concurrent benzodiazepine or opioid use without physician oversight · <18 yrs",
  },
  {
    slug: "tirzepatide",
    name: "Tirzepatide",
    fullName: "GIP/GLP-1 dual receptor agonist",
    tagline: "The appetite reset.",
    category: "metabolic",
    glyph: "chain",
    summary:
      "A dual GIP/GLP-1 receptor agonist that drives substantial, durable weight loss and glycemic control. The anchor of the Lean metabolic protocol. FDA-approved as Mounjaro and Zepbound.",
    mechanism:
      "Tirzepatide activates both the GIP and GLP-1 receptors, slowing gastric emptying, reducing appetite and food noise, and improving insulin sensitivity. The dual mechanism produces larger weight-loss effects than GLP-1 agonism alone, confirmed in the SURMOUNT trial program.",
    halfLife: "~5 days (once-weekly dosing)",
    typicalDose: "2.5 mg weekly, titrated upward",
    cycleLength: "16+ weeks, physician-titrated",
    administration: "Subcutaneous injection, once weekly",
    timeline: [
      { week: "Week 1-4", effect: "Appetite and cravings fall; portions shrink." },
      { week: "Week 4-8", effect: "Steady weight loss begins; energy stabilizes." },
      { week: "Week 8-12", effect: "Visceral fat and fasting glucose decline." },
      { week: "Week 12-16", effect: "Recomposition consolidates; plan maintenance." },
    ],
    studies: [
      { title: "Tirzepatide once weekly for the treatment of obesity (SURMOUNT-1)", year: "2022", source: "N Engl J Med", url: "https://pubmed.ncbi.nlm.nih.gov/35658024/" },
      { title: "Tirzepatide versus semaglutide in type 2 diabetes (SURPASS-2)", year: "2021", source: "N Engl J Med", url: "https://pubmed.ncbi.nlm.nih.gov/34170647/" },
      { title: "Dual GIP/GLP-1 receptor agonism in metabolic disease", year: "2021", source: "PMC", url: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC8237279/" },
    ],
    pairsWith: ["retatrutide", "aod-9604", "tesamorelin"],
    inStacks: ["lean"],
    evidenceTier: {
      grade: "A",
      description: "FDA-approved (Mounjaro / Zepbound) · SURPASS + SURMOUNT Phase 3 program",
      studyCount: 40,
      fdaStatus: "FDA-approved for type 2 diabetes (Mounjaro) and chronic weight management (Zepbound)",
    },
    contraindications:
      "NOT FOR: pregnancy · personal or family history of medullary thyroid carcinoma · Multiple Endocrine Neoplasia syndrome type 2 (MEN-2) · history of pancreatitis · severe gastroparesis · known tirzepatide hypersensitivity · <18 yrs",
  },
  {
    slug: "retatrutide",
    name: "Retatrutide",
    fullName: "GGG triple agonist (GIP/GLP-1/glucagon)",
    tagline: "The triple lever.",
    category: "metabolic",
    glyph: "chain",
    summary:
      "An investigational triple-hormone receptor agonist showing the largest weight-loss effect reported to date. Part of the Lean protocol where indicated, under close physician supervision.",
    mechanism:
      "Retatrutide activates the GIP, GLP-1, and glucagon receptors simultaneously. Adding glucagon-receptor agonism increases energy expenditure on top of the appetite suppression of the other two, producing greater fat loss in Phase 2 trials than dual agonists.",
    halfLife: "~6 days (once-weekly dosing)",
    typicalDose: "Titrated weekly per physician protocol",
    cycleLength: "16+ weeks, physician-titrated",
    administration: "Subcutaneous injection, once weekly",
    timeline: [
      { week: "Week 1-4", effect: "Appetite suppression with rising energy expenditure." },
      { week: "Week 4-12", effect: "Accelerated fat loss; metabolic markers improve." },
      { week: "Week 12-24", effect: "Continued weight reduction toward target." },
      { week: "Week 24+", effect: "Reassess and plan maintenance with physician." },
    ],
    studies: [
      { title: "Triple-hormone-receptor agonist retatrutide for obesity (Phase 2)", year: "2023", source: "N Engl J Med", url: "https://pubmed.ncbi.nlm.nih.gov/37366315/" },
      { title: "Retatrutide in type 2 diabetes (Phase 2)", year: "2023", source: "Lancet", url: "https://pubmed.ncbi.nlm.nih.gov/37385275/" },
      { title: "Multi-receptor agonists in obesity pharmacotherapy", year: "2023", source: "PMC", url: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC10330608/" },
    ],
    pairsWith: ["tirzepatide", "aod-9604"],
    inStacks: ["lean"],
    evidenceTier: {
      grade: "A-",
      description: "Phase 2 RCTs published in NEJM (2023) · Phase 3 program (TRIUMPH) ongoing at Lilly",
      studyCount: 8,
      fdaStatus: "Not yet FDA-approved · Phase 3 investigational · compounded triple-agonist by prescription only",
    },
    contraindications:
      "NOT FOR: pregnancy · personal or family history of medullary thyroid carcinoma · MEN-2 · history of pancreatitis · severe gastroparesis · use with caution alongside sulfonylureas or insulin · <18 yrs",
  },
  {
    slug: "aod-9604",
    name: "AOD-9604",
    fullName: "hGH fragment 176-191",
    tagline: "Targeted lipolysis.",
    category: "metabolic",
    glyph: "fragment",
    summary:
      "A growth-hormone fragment engineered to target fat metabolism without affecting blood glucose or IGF-1. A supportive peptide in the Lean protocol.",
    mechanism:
      "AOD-9604 mimics the lipolytic C-terminal region of growth hormone, stimulating the breakdown of stored fat and inhibiting lipogenesis. Because it isolates the fat-metabolism portion of the GH molecule, it avoids the glucose and growth effects of full-length GH.",
    halfLife: "Short; dosed daily",
    typicalDose: "300 mcg subcutaneous, daily",
    cycleLength: "12-16 weeks",
    administration: "Subcutaneous injection",
    timeline: [
      { week: "Week 1-3", effect: "Supports fat mobilization alongside the protocol." },
      { week: "Week 3-8", effect: "Abdominal and visceral fat reduction accelerates." },
      { week: "Week 8-12", effect: "Body composition shifts; lean mass preserved." },
      { week: "Week 12-16", effect: "Consolidate gains; reassess with labs." },
    ],
    studies: [
      { title: "AOD9604, a GH fragment, and its anti-obesity activity", year: "2001", source: "Endocrinology", url: "https://pubmed.ncbi.nlm.nih.gov/11713209/" },
      { title: "Lipolytic and antilipogenic actions of the hGH 176-191 fragment", year: "2007", source: "PMC", url: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC1828535/" },
      { title: "Growth hormone fragments in fat metabolism", year: "2010", source: "PMC", url: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC2964750/" },
    ],
    pairsWith: ["tirzepatide", "tesamorelin"],
    inStacks: ["lean"],
    evidenceTier: {
      grade: "C+",
      description: "Small human RCTs showed no clinically meaningful fat loss · osteoarthritis Phase 2 signals",
      studyCount: 7,
      fdaStatus: "Not FDA-approved · investigational · FDA declined GRAS petition (2014) · compounded by prescription only",
    },
    contraindications:
      "NOT FOR: pregnancy · active malignancy · Prader-Willi syndrome · known hypersensitivity to GH-fragment peptides · <18 yrs",
  },
  {
    slug: "sermorelin",
    name: "Sermorelin",
    fullName: "Sermorelin (GHRH 1-29)",
    tagline: "The gentlest nudge to the pituitary.",
    category: "growth",
    glyph: "ghrh",
    summary:
      "The shortest fragment of growth-hormone-releasing hormone that still carries its full activity — 29 amino acids. Sermorelin asks the pituitary to release its own growth hormone in natural pulses, rather than replacing it from outside.",
    mechanism:
      "Sermorelin binds the GHRH receptor on the anterior pituitary, driving cAMP production and a pulsatile release of endogenous growth hormone. Because it works through the body's own axis — with intact negative feedback — it raises GH and downstream IGF-1 without the flat, supraphysiologic levels seen with recombinant HGH. It was FDA-approved in 1997 for pediatric GH assessment before commercial production was discontinued for business reasons in 2008; it is now prescribed off-label and compounded.",
    halfLife: "~11-12 minutes (rapid; taken at night to mirror natural pulse)",
    typicalDose: "100-300 mcg at bedtime",
    cycleLength: "12+ weeks, cycled per physician guidance",
    administration: "Subcutaneous injection, before sleep",
    timeline: [
      { week: "Week 1-3", effect: "Deeper sleep is often the first reported change." },
      { week: "Week 3-6", effect: "Recovery between training sessions improves." },
      { week: "Week 6-12", effect: "Body-composition shifts appear on labs and in the mirror." },
      { week: "Week 12+", effect: "IGF-1 trend reviewed; dose held or adjusted." },
    ],
    studies: [
      { title: "Sermorelin: a review of its use in the diagnosis and treatment of GH deficiency", year: "2007", source: "Treat Endocrinol / PubMed", url: "https://pubmed.ncbi.nlm.nih.gov/18031173/" },
      { title: "Growth hormone secretagogue treatment in hypogonadal men raises IGF-1 levels", year: "2017", source: "PubMed", url: "https://pubmed.ncbi.nlm.nih.gov/28830317/" },
      { title: "Growth hormone secretagogues: history, mechanism, and clinical development", year: "2020", source: "JCSM Rapid Communications", url: "https://onlinelibrary.wiley.com/doi/full/10.1002/rco2.9" },
    ],
    pairsWith: ["ipamorelin", "glycine"],
    inStacks: [],
    evidenceTier: {
      grade: "B",
      description: "Formerly FDA-approved (diagnostic) - decades of human use - modern trials small",
      studyCount: 20,
      fdaStatus: "Was FDA-approved 1997-2008 (diagnostic); now compounded by prescription only",
    },
    contraindications:
      "NOT FOR: pregnancy - active malignancy - untreated hypothyroidism - known hypersensitivity to GHRH analogs - <18 yrs",
  },
  {
    slug: "ipa-cjc",
    name: "Ipamorelin / CJC-1295 Blend",
    fullName: "Ipamorelin + CJC-1295 (no-DAC)",
    tagline: "Two levers, one clean pulse.",
    category: "growth",
    glyph: "secretagogue",
    summary:
      "A pairing that pulls two different levers on the same system: CJC-1295 (no-DAC) is a GHRH analog, and ipamorelin is a selective ghrelin-receptor agonist. Together they produce a strong, clean growth-hormone pulse without meaningfully disturbing cortisol or prolactin.",
    mechanism:
      "CJC-1295 activates the GHRH receptor while ipamorelin activates the GHS-R (ghrelin) receptor. The two pathways are complementary — GHRH sets the amplitude of the pulse and the ghrelin arm amplifies it — so a combined dose yields more GH release than either alone. Ipamorelin's selectivity is the point: unlike older secretagogues (GHRP-6, GHRP-2), it does not appreciably raise cortisol, prolactin, or hunger.",
    halfLife: "Ipamorelin ~2 hours; CJC-1295 no-DAC ~30 minutes",
    typicalDose: "Physician-individualized; typically dosed at night",
    cycleLength: "12+ weeks, cycled per physician guidance",
    administration: "Subcutaneous injection, before sleep",
    timeline: [
      { week: "Week 1-2", effect: "Sleep quality and recovery begin to shift." },
      { week: "Week 2-6", effect: "Training recovery and skin quality improve." },
      { week: "Week 6-12", effect: "Lean-mass and fat-distribution changes register on labs." },
      { week: "Week 12+", effect: "IGF-1 trend reviewed; protocol titrated." },
    ],
    studies: [
      { title: "Ipamorelin, the first selective growth hormone secretagogue", year: "1998", source: "Eur J Endocrinol", url: "https://pubmed.ncbi.nlm.nih.gov/9849822/" },
      { title: "Growth hormone secretagogues: history, mechanism, and clinical development", year: "2020", source: "JCSM Rapid Communications", url: "https://onlinelibrary.wiley.com/doi/full/10.1002/rco2.9" },
    ],
    pairsWith: ["sermorelin", "bpc-157"],
    inStacks: ["ascend"],
    evidenceTier: {
      grade: "B-",
      description: "Selective secretagogue with clean human PK - combination use is off-label",
      studyCount: 15,
      fdaStatus: "Not FDA-approved - compounded by prescription only",
    },
    contraindications:
      "NOT FOR: pregnancy - active malignancy - diabetic retinopathy - known hypersensitivity - <18 yrs",
  },
  {
    slug: "cerebrolysin",
    name: "Cerebrolysin",
    fullName: "Cerebrolysin (neuropeptide preparation)",
    tagline: "Neurotrophic support, by infusion.",
    category: "cognition",
    glyph: "fragment",
    summary:
      "A porcine-derived mixture of low-molecular-weight neuropeptides and free amino acids that mimics the action of endogenous neurotrophic factors. It is used clinically in several countries for stroke recovery and dementia, and is among the more rigorously trialed compounds in this category.",
    mechanism:
      "Cerebrolysin's peptide fraction is thought to mimic neurotrophic factors (BDNF, GDNF, NGF), supporting neuronal survival, synaptic plasticity, and neurogenesis while reducing excitotoxic and inflammatory injury. It has been evaluated in randomized controlled trials for acute ischemic stroke, vascular dementia, and Alzheimer's disease, with Cochrane reviews noting mixed but non-trivial signals.",
    halfLife: "Administered as a course of infusions rather than dosed by half-life",
    typicalDose: "Physician-directed infusion course",
    cycleLength: "Defined treatment courses, repeated per physician guidance",
    administration: "Intravenous or intramuscular, in-clinic",
    timeline: [
      { week: "Course 1", effect: "Administered and tolerated under supervision." },
      { week: "Weeks 2-4", effect: "Cognitive and processing changes assessed." },
      { week: "Follow-up", effect: "Physician decides whether to repeat the course." },
    ],
    studies: [
      { title: "Cerebrolysin for acute ischaemic stroke", year: "2020", source: "Cochrane Database Syst Rev", url: "https://www.cochranelibrary.com/cdsr/doi/10.1002/14651858.CD007026.pub5/full" },
      { title: "Cerebrolysin in vascular dementia: a randomized controlled trial", year: "2017", source: "J Alzheimers Dis", url: "https://pubmed.ncbi.nlm.nih.gov/28128760/" },
    ],
    pairsWith: [],
    inStacks: [],
    evidenceTier: {
      grade: "B+",
      description: "Multiple RCTs and Cochrane reviews in stroke and dementia - not FDA-cleared in the US",
      studyCount: 60,
      fdaStatus: "Not FDA-approved in the US - used clinically abroad - compounded/imported by prescription",
    },
    contraindications:
      "NOT FOR: pregnancy - epilepsy or seizure history - severe renal impairment - known hypersensitivity to the preparation - <18 yrs",
  },
  {
    slug: "methylene-blue",
    name: "Methylene Blue",
    fullName: "Methylene Blue (methylthioninium chloride)",
    tagline: "The mitochondrial electron shuttle.",
    category: "cognition",
    glyph: "fragment",
    summary:
      "Not a peptide but a well-characterized small molecule with a century of medical use. At low doses it acts on the mitochondrial electron-transport chain and is investigated for cognitive and metabolic support. Pharmaceutical-grade purity matters enormously here — this is not an aquarium-shop chemical.",
    mechanism:
      "At low (nanomolar-to-micromolar) concentrations, methylene blue acts as an alternative electron carrier in the mitochondrial electron-transport chain, accepting electrons and donating them to cytochrome c — increasing oxygen consumption and ATP production, and reducing oxidative stress. It is also a monoamine-oxidase inhibitor, which is the source of its most important drug interactions.",
    halfLife: "~5-6 hours",
    typicalDose: "Low-dose, physician-directed",
    cycleLength: "Per physician guidance",
    administration: "Oral (pharmaceutical grade)",
    timeline: [
      { week: "Acute", effect: "Some report same-day changes in mental clarity." },
      { week: "Ongoing", effect: "Response and tolerance assessed by your physician." },
    ],
    studies: [
      { title: "Low-dose methylene blue and functional MRI of memory encoding/retrieval", year: "2016", source: "Radiology", url: "https://pubmed.ncbi.nlm.nih.gov/27351678/" },
      { title: "Methylene blue: revisited mechanisms and therapeutic potential", year: "2021", source: "PMC", url: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC8058093/" },
    ],
    pairsWith: [],
    inStacks: [],
    evidenceTier: {
      grade: "B",
      description: "Century of medical use - small human cognitive trials - serotonin-syndrome interaction risk",
      studyCount: 30,
      fdaStatus: "FDA-approved for other indications (e.g. methemoglobinemia); cognitive use is off-label",
    },
    contraindications:
      "NOT FOR: use with SSRIs/SNRIs/MAOIs (serotonin-syndrome risk) - G6PD deficiency - pregnancy - renal impairment - <18 yrs",
  },
  {
    slug: "bpc-tb-combo",
    name: "BPC-157 + TB-500",
    fullName: "BPC-157 + TB-500 (combined repair protocol)",
    tagline: "Local repair meets systemic logistics.",
    category: "recovery",
    glyph: "chain",
    summary:
      "The two most-used recovery peptides, run together on purpose. BPC-157 acts locally at the site of injury; TB-500 travels systemically and coordinates the cellular repair crew. Physicians pair them when an injury needs both a local signal and whole-body support.",
    mechanism:
      "BPC-157 upregulates VEGF and growth-hormone-receptor expression at injury sites, driving angiogenesis and fibroblast migration, while modulating the nitric-oxide pathway. TB-500 (a synthetic fragment of Thymosin Beta-4) regulates actin, supporting cell migration, and appears to aid tissue remodeling systemically. The rationale for combining them is complementary coverage — local plus systemic — not a proven synergy, and the evidence base remains preclinical.",
    halfLife: "BPC-157 ~4 h; TB-500 longer-acting",
    typicalDose: "Physician-individualized for each component",
    cycleLength: "4-8 weeks, tapering to maintenance",
    administration: "Subcutaneous injection",
    timeline: [
      { week: "Week 1-2", effect: "Local inflammation eases; sleep often improves." },
      { week: "Week 2-4", effect: "Soft-tissue repair accelerates; stiffness reduces." },
      { week: "Week 4-8", effect: "Load tolerance and range of motion return." },
    ],
    studies: [
      { title: "Stable gastric pentadecapeptide BPC 157 in GI tract", year: "2018", source: "Curr Pharm Des / PMC", url: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6225019/" },
      { title: "Thymosin beta-4 and tissue repair / regeneration", year: "2012", source: "Ann N Y Acad Sci", url: "https://pubmed.ncbi.nlm.nih.gov/22994772/" },
    ],
    pairsWith: ["ghk-cu"],
    inStacks: ["wolverine"],
    evidenceTier: {
      grade: "Preclinical",
      description: "Both components rest on rodent repair models - combination use is off-label",
      studyCount: 50,
      fdaStatus: "Not FDA-approved - investigational - compounded by prescription only",
    },
    contraindications:
      "NOT FOR: pregnancy - personal or family history of cancer - active malignancy - pro-angiogenic risk (untreated retinopathy, recent DVT) - WADA-tested athletes - <18 yrs",
  },
  {
    slug: "semaglutide",
    name: "Semaglutide",
    fullName: "Semaglutide (GLP-1 receptor agonist)",
    tagline: "The metabolic standard, physician-gated.",
    category: "metabolic",
    glyph: "secretagogue",
    summary:
      "The GLP-1 receptor agonist behind Ozempic and Wegovy — among the most rigorously trialed metabolic medications in modern practice. At Nexphoria it is never sold from a shelf: it is prescribed, dosed, and titrated by a physician against your bloodwork, and it is not available in every state.",
    mechanism:
      "Semaglutide is a long-acting GLP-1 receptor agonist. It enhances glucose-dependent insulin secretion, suppresses glucagon, slows gastric emptying, and acts on hypothalamic appetite centers to reduce food intake. The STEP program (weight management) and SUSTAIN program (glycemic control) established its efficacy across large randomized trials.",
    halfLife: "~7 days (once-weekly dosing)",
    typicalDose: "Physician-titrated from a low starting dose",
    cycleLength: "Ongoing, with quarterly lab review",
    administration: "Subcutaneous injection, once weekly",
    timeline: [
      { week: "Week 1-4", effect: "Low starting dose; appetite changes begin." },
      { week: "Month 2-3", effect: "Dose titrated upward as tolerated; weight trend emerges." },
      { week: "Ongoing", effect: "Titrated to effect against labs and tolerability." },
    ],
    studies: [
      { title: "STEP 1: Once-weekly semaglutide in adults with overweight or obesity", year: "2021", source: "N Engl J Med", url: "https://www.nejm.org/doi/full/10.1056/NEJMoa2032183" },
      { title: "SUSTAIN-6: Semaglutide and cardiovascular outcomes in type 2 diabetes", year: "2016", source: "N Engl J Med", url: "https://www.nejm.org/doi/full/10.1056/NEJMoa1607141" },
    ],
    pairsWith: [],
    inStacks: [],
    evidenceTier: {
      grade: "A",
      description: "FDA-approved as a branded drug - large cardiovascular and weight-loss RCTs",
      studyCount: 100,
      fdaStatus: "Branded product is FDA-approved; compounded semaglutide is not FDA-approved and is physician-gated by state",
    },
    contraindications:
      "NOT FOR: personal/family history of medullary thyroid carcinoma or MEN 2 - pregnancy - history of pancreatitis - certain states by law - <18 yrs",
  },
  {
    slug: "pt-141",
    name: "PT-141",
    fullName: "PT-141 (Bremelanotide)",
    tagline: "Desire, through a central pathway.",
    category: "sexual-health",
    glyph: "fragment",
    summary:
      "A melanocortin-receptor agonist that works on the brain's arousal pathways rather than on vascular blood flow — a fundamentally different mechanism from PDE5 inhibitors. Its branded form, Vyleesi, is FDA-approved for hypoactive sexual desire disorder in premenopausal women.",
    mechanism:
      "PT-141 (bremelanotide) activates melanocortin receptors — principally MC4R — in the central nervous system, modulating the neural circuits of sexual desire and arousal. Because the pathway is central rather than vascular, it does not depend on the nitric-oxide/PDE5 mechanism, and a physician evaluates fit against blood pressure and any other medications.",
    halfLife: "~2.7 hours",
    typicalDose: "On-demand, physician-individualized",
    cycleLength: "As-needed, per physician guidance",
    administration: "Subcutaneous injection, ahead of anticipated activity",
    timeline: [
      { week: "On-demand", effect: "Taken ahead of anticipated activity." },
      { week: "Ongoing", effect: "Response and blood-pressure effect reviewed by your physician." },
    ],
    studies: [
      { title: "Bremelanotide for hypoactive sexual desire disorder (RECONNECT trials)", year: "2019", source: "Obstet Gynecol", url: "https://pubmed.ncbi.nlm.nih.gov/31599832/" },
      { title: "Bremelanotide (Vyleesi) FDA approval label", year: "2019", source: "US FDA", url: "https://www.accessdata.fda.gov/drugsatfda_docs/label/2019/210557s000lbl.pdf" },
    ],
    pairsWith: [],
    inStacks: [],
    evidenceTier: {
      grade: "A-",
      description: "Branded form FDA-approved (HSDD in premenopausal women) - Phase 3 RCTs",
      studyCount: 25,
      fdaStatus: "Branded product (Vyleesi) is FDA-approved; other uses are off-label; compounded versions not FDA-approved",
    },
    contraindications:
      "NOT FOR: uncontrolled hypertension - known cardiovascular disease - pregnancy - known hypersensitivity - <18 yrs",
  },
];

/* ═══ E40 PHASE 1 — membership + names are CANONICAL ═══
   The display library can only show what the commercial catalog sells.
   Doc-dropped slugs (retatrutide, thymosin-a1, aod-9604) vanish here the
   moment they leave soloCatalog — no zombie tiles, no dead PDP links.
   Editorial fields (studies, tiers, taglines) remain curated below;
   npm run audit:data now asserts this file can never drift again. */
import { SOLO_CATALOG } from "@/data/soloCatalog";
const CANON = new Map(SOLO_CATALOG.map((s) => [s.slug, s]));

export const peptides: Peptide[] = RAW_PEPTIDES.filter((p) => CANON.has(p.slug)).map((p) => ({
  ...p,
  name: CANON.get(p.slug)!.name,
}));

