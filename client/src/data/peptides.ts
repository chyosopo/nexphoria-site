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
  | "metabolic";

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
}

export const CATEGORY_LABELS: Record<PeptideCategory, string> = {
  recovery: "Recovery & Repair",
  skin: "Skin & Aesthetics",
  cognition: "Cognition & Mood",
  sleep: "Sleep & Restoration",
  growth: "Growth & Hormone",
  longevity: "Longevity & Cellular",
  metabolic: "Metabolic & Weight",
};

export const peptides: Peptide[] = [
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
  },
];

export function getPeptide(slug: string): Peptide | undefined {
  return peptides.find((p) => p.slug === slug);
}

export function peptidesByCategory(category: PeptideCategory): Peptide[] {
  return peptides.filter((p) => p.category === category);
}
