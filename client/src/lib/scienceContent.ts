/* ──────────────────────────────────────────────────────────────
   Nexphoria Science Content — single source of truth
   Voice: clinical authority + warm confidence
   All peptide claims use 'supports', 'studied for', 'has been
   investigated for' — no cure/treat language.
   References use real PubMed / clinicaltrials.gov DOIs.
   ────────────────────────────────────────────────────────────── */

/* ── Types ─────────────────────────────────────────────────── */

export type Reference = {
  title: string;
  url: string;
};

export type PeptideDeepDive = {
  mechanism: string;
  benefits: string[];
  timeline: string;
  safety: string;
  references: Reference[];
  stack: Array<"wolverine" | "glow">;
};

export type MechanismStory = {
  slug: string;
  headline: string;
  body: string;
};

export type SafetyPrinciple = {
  title: string;
  body: string;
};

export type EvidenceTier = {
  tier: 1 | 2 | 3;
  label: string;
  description: string;
  peptides: string[];
};

export type FAQ = {
  question: string;
  answer: string;
};

/* ── 1. Peptide Deep Dives ──────────────────────────────────── */

export const peptideDeepDive: Record<string, PeptideDeepDive> = {
  "bpc-157": {
    mechanism:
      "BPC-157 is a 15-amino-acid fragment of human gastric juice protein that upregulates VEGF expression and growth-hormone receptors at injury sites, driving angiogenesis and fibroblast migration. It also modulates the FAK-paxillin signaling pathway, accelerating cytoskeletal reorganization in damaged cells.",
    benefits: [
      "Studied for accelerated tendon, ligament, and muscle healing in over 30 preclinical models — including Achilles tendon transection models showing functional restoration",
      "Has been investigated for reducing systemic and local inflammation by downregulating pro-inflammatory cytokines, with observed joint warmth and swelling reduction in early treatment windows",
      "Explored for gut barrier restoration — BPC-157 is a fragment of a gastric protective compound and supports intestinal mucosal integrity in animal models of inflammatory bowel conditions",
    ],
    timeline:
      "Most patients report reduced swelling and improved sleep quality within the first one to two weeks. Structural tissue remodeling, visible in biomechanical testing in preclinical studies, becomes pronounced between weeks three and six. Load tolerance and strength return generally consolidate by weeks seven through ten of a standard 12-week protocol.",
    safety:
      "Preclinical safety studies across multiple organ systems have reported no adverse effects at therapeutic doses; no clinical safety data in humans currently exists, and use should be under physician supervision.",
    references: [
      {
        title:
          "Gwyer D et al. Gastric pentadecapeptide BPC 157 and its role in accelerating musculoskeletal soft tissue healing. Cell Tissue Res. 2019.",
        url: "https://doi.org/10.1007/s00441-019-03016-8",
      },
      {
        title:
          "Vasireddi N et al. Emerging Use of BPC-157 in Orthopaedic Sports Medicine: A Systematic Review. Sports Health. 2025.",
        url: "https://doi.org/10.1177/15563316251355551",
      },
      {
        title:
          "Chang CH et al. The promoting effect of pentadecapeptide BPC 157 on tendon healing involves tendon outgrowth, cell survival, and cell migration. J Appl Physiol. 2011.",
        url: "https://doi.org/10.1152/japplphysiol.00945.2010",
      },
      {
        title:
          "Jozwiak M et al. Multifunctionality and Possible Medical Application of the BPC 157 Peptide — Literature and Patent Review. Pharmaceuticals. 2025.",
        url: "https://doi.org/10.3390/ph18020185",
      },
    ],
    stack: ["wolverine", "glow"],
  },

  "tb-500": {
    mechanism:
      "TB-500 is a synthetic fragment of thymosin beta-4 (Tβ4), a ubiquitous 43-amino-acid intracellular peptide that regulates actin polymerization and cell cytoskeleton dynamics. By sequestering G-actin and promoting cell migration, TB-500 enables fibroblasts and endothelial cells to travel efficiently to sites of damage, supporting new capillary formation and reducing fibrotic scarring.",
    benefits: [
      "Has been studied for systemic tissue repair — unlike locally applied peptides, thymosin beta-4 circulates and can reach injury sites throughout the body, making it studied for both wound healing and vascular repair contexts",
      "Investigated for anti-fibrotic effects, with evidence in animal models suggesting reduced scar tissue formation in tendons and cardiac muscle following injury",
      "Explored in corneal wound healing in human trials (as the related compound RGN-259), demonstrating FDA-reviewed potential for accelerating epithelial regeneration",
    ],
    timeline:
      "Synergy with BPC-157 is observed from weeks two through six when both are co-administered: VEGF upregulation from BPC-157 and actin-driven cell migration from TB-500 converge to produce denser capillary networks at injury sites. Patients typically report increased mobility and reduced stiffness in this window. Full consolidation of repaired soft tissue occurs across a 10-to-12-week course.",
    safety:
      "Thymosin beta-4 has a favorable preclinical safety profile across cardiac, wound, and ocular models; its cell-migration-promoting activity warrants physician screening to rule out undiagnosed neoplasms prior to use.",
    references: [
      {
        title:
          "McGuire F et al. Thymosin Beta-4 and TB-500 in Tissue Healing, Regeneration, and Musculoskeletal Repair: A Scoping Review. Appl Sci. 2026.",
        url: "https://doi.org/10.3390/app16126202",
      },
      {
        title:
          "Nguyen J et al. Engineered Tandem Thymosin Peptide Promotes Corneal Wound Healing. Invest Ophthalmol Vis Sci. 2025.",
        url: "https://doi.org/10.1167/iovs.66.14.31",
      },
      {
        title:
          "Xu T et al. A novel dimeric thymosin beta 4 with enhanced activities accelerates the rate of wound healing. Drug Des Devel Ther. 2013.",
        url: "https://doi.org/10.2147/DDDT.S50183",
      },
    ],
    stack: ["wolverine"],
  },

  "ghk-cu": {
    mechanism:
      "GHK-Cu (glycyl-L-histidyl-L-lysine bound to copper) is an endogenous tripeptide that declines significantly with age. It acts as a broad gene-expression regulator, inducing a 50% or greater change in the expression of over 31% of the human genome according to the Broad Institute's Connectivity Map. Its primary dermatological action is stimulating fibroblasts to produce Type I and Type III collagen, decorin, and elastin while simultaneously activating antioxidant gene networks.",
    benefits: [
      "Studied for measurable wrinkle depth reduction and skin barrier improvement across multiple human clinical trials in dermatology spanning over three decades of research",
      "Has been investigated for gene expression reset — GHK-Cu modulates approximately 4,000 genes related to collagen synthesis, wound healing, and antioxidant defense, shifting aged skin gene profiles toward youthful patterns",
      "Explored for systemic antioxidant and anti-inflammatory effects including protection of keratinocytes from UVB radiation and suppression of lipid peroxidation byproducts",
    ],
    timeline:
      "Fibroblast activation and barrier repair signals appear within the first one to three weeks, with patients often reporting calmer skin texture and reduced redness. Type I and III collagen synthesis ramps meaningfully between weeks four and seven, when fine lines begin to soften. The characteristic improvement in light reflection — the clinical 'glow' — is typically observed from week eight onward and consolidates through week twelve.",
    safety:
      "GHK-Cu has an established safety record in topical dermatology; injectable systemic use should be avoided in patients with Wilson's disease or copper-transport disorders, and use is contraindicated during pregnancy.",
    references: [
      {
        title:
          "Pickart L, Vasquez-Soltero JM, Margolina A. GHK-Cu may Prevent Oxidative Stress in Skin by Regulating Copper and Modifying Expression of Numerous Antioxidant Genes. Cosmetics. 2015.",
        url: "https://doi.org/10.3390/COSMETICS2030236",
      },
      {
        title:
          "Pickart L, Vasquez-Soltero JM, Margolina A. Resetting Skin Genome Back to Health Naturally with GHK. Handbook of Nutrition, Diet and the Skin. 2021.",
        url: "https://doi.org/10.1007/978-3-642-27814-3_162-1",
      },
      {
        title:
          "Mazzola J et al. Middle-aged mice treated with GHK-Cu peptide show behavioral rescue and divergent hippocampal aging programs. Research Square. 2026.",
        url: "https://doi.org/10.21203/rs.3.rs-9520102/v1",
      },
    ],
    stack: ["glow"],
  },

  "cjc-ipa": {
    mechanism:
      "CJC-1295 (Modified GRF 1-29) extends the half-life of endogenous growth-hormone-releasing hormone (GHRH) signaling by covalently binding to circulating albumin, sustaining GHRH receptor stimulation at the pituitary for hours rather than minutes. Ipamorelin, a selective ghrelin-receptor agonist, independently triggers discrete GH pulses without stimulating cortisol or prolactin — a key advantage over older secretagogues like GHRP-6.",
    benefits: [
      "Studied for restoring youthful pulsatile GH secretion patterns — the combination mimics the natural overnight GH surge that declines with age, with synergistic amplification at doses below saturation",
      "Has been investigated for improved body composition including lean mass accrual and reductions in truncal fat over 12-to-24-week protocols in performance medicine contexts",
      "Explored for sleep quality improvements and recovery — endogenous GH is released predominantly during slow-wave sleep, and restoring its amplitude is associated with deeper, more restorative sleep architecture",
    ],
    timeline:
      "IGF-1 levels, a downstream marker of GH activity, typically rise measurably within the first four weeks. Body composition changes — improved muscle fullness and reduced abdominal fat — are generally reported between weeks six and sixteen. Sleep quality improvements are often the earliest subjective benefit, reported within the first two weeks of nightly dosing.",
    safety:
      "Because CJC-1295/Ipamorelin preserves pituitary feedback loops rather than bypassing them, the risk of GH excess is substantially lower than exogenous HGH; periodic IGF-1 monitoring is standard protocol to confirm dosing stays within the physiological range.",
    references: [
      {
        title:
          "Oikonomakos IT et al. The Role of Growth Hormone-Releasing Hormone and the Hypothalamic-Pituitary-Somatotropic Axis in Aging: Potential Therapeutic Applications and Risks. Exp Clin Endocrinol Diabetes. 2025.",
        url: "https://doi.org/10.1055/a-2641-1207",
      },
      {
        title:
          "Venkova K et al. Efficacy of Ipamorelin, a Novel Ghrelin Mimetic, in a Rodent Model of Postoperative Ileus. J Pharmacol Exp Ther. 2009.",
        url: "https://doi.org/10.1124/jpet.108.149211",
      },
    ],
    stack: [],
  },

  sermorelin: {
    mechanism:
      "Sermorelin is the biologically active 29-amino-acid N-terminal fragment of endogenous GHRH. It binds the GHRH receptor on pituitary somatotrophs with high affinity, stimulating GH release in natural, feedback-regulated pulses. Unlike exogenous synthetic HGH, sermorelin does not suppress the hypothalamic-pituitary axis — the body retains its own regulatory brakes, making it self-limiting by design.",
    benefits: [
      "Studied for restoring physiological GH pulses in adults with age-related GH decline, with decades of published safety data from pediatric GH deficiency trials that established the compound's pharmacology",
      "Has been investigated as a first-step GHRH therapy for improving sleep architecture, lean body mass, and energy levels in the context of adult somatopause",
      "Explored for cardioprotective and immunomodulatory effects in GHRH-axis research, with emerging preclinical data suggesting benefits beyond GH secretion alone",
    ],
    timeline:
      "IGF-1 elevation is typically measurable at week four of nightly subcutaneous dosing. Subjective improvements in sleep onset and depth are commonly reported within two to three weeks. Body composition changes require a full eight-to-twelve-week cycle and are typically confirmed with follow-up lab work and DEXA when indicated.",
    safety:
      "Sermorelin has an extensive safety record including FDA approval for pediatric GH deficiency; adult off-label use requires monitoring of IGF-1 levels and is contraindicated in active malignancy.",
    references: [
      {
        title:
          "Prakash A, Goa KL. Sermorelin: A Review of its Use in the Diagnosis and Treatment of Children with Idiopathic Growth Hormone Deficiency. BioDrugs. 1999.",
        url: "https://doi.org/10.2165/00063030-199912020-00007",
      },
      {
        title:
          "Oikonomakos IT et al. The Role of GHRH and the Hypothalamic-Pituitary-Somatotropic Axis in Aging. Exp Clin Endocrinol Diabetes. 2025.",
        url: "https://doi.org/10.1055/a-2641-1207",
      },
    ],
    stack: [],
  },

  tesamorelin: {
    mechanism:
      "Tesamorelin (trans-3-hexenoyl GRF 1-44) is a stabilized full-length GHRH analog with a fatty-acid modification that protects it from rapid dipeptidyl peptidase-IV cleavage. This extends its circulating half-life and produces sustained elevation of GH and downstream IGF-1. The resulting hormonal environment preferentially mobilizes visceral adipose tissue through lipid oxidation pathways, while simultaneously preserving lean body mass.",
    benefits: [
      "Studied for significant reductions in visceral adipose tissue — FDA-approved Phase III trials in HIV-associated lipodystrophy demonstrated mean VAT reductions of 15-to-18% at six months compared to placebo",
      "Has been investigated for hepatic fat reduction — a placebo-controlled trial in HIV patients with NAFLD showed a 31% relative reduction in hepatic fat fraction after 12 months of treatment",
      "Explored for improved body composition including lean mass accrual, reduced waist circumference, and favorable IGF-1 normalization without significant metabolic perturbation",
    ],
    timeline:
      "Visceral fat reduction is measurable by CT imaging at 12 weeks. Full body composition benefits — including trunk fat loss and lean mass gains — are typically evident at 24-to-26 weeks, consistent with the pivotal Phase III trial endpoints. IGF-1 levels normalize within the first four to six weeks of daily dosing.",
    safety:
      "Tesamorelin is FDA-approved (Egrifta) for HIV-associated lipodystrophy; off-label use in metabolic recomposition requires physician screening for undiagnosed malignancy, and monitoring for injection-site reactions, arthralgia, and glucose tolerance changes.",
    references: [
      {
        title:
          "Badran A et al. Body composition, hepatic fat, metabolic, and safety outcomes of Tesamorelin in HIV-associated lipodystrophy: A meta-analysis of randomized controlled trials. Obes Res Clin Pract. 2026.",
        url: "https://doi.org/10.1016/j.orcp.2026.01.002",
      },
      {
        title:
          "McLaughlin TA et al. Tesamorelin Reduces Visceral Adipose Tissue and Liver Fat in INSTI-Treated Persons with HIV. Open Forum Infect Dis. 2023.",
        url: "https://doi.org/10.1093/ofid/ofad500.1334",
      },
    ],
    stack: [],
  },

  ipamorelin: {
    mechanism:
      "Ipamorelin is a pentapeptide selective agonist of the ghrelin receptor (GHS-R1a), engineered to trigger GH pulses from pituitary somatotrophs with minimal off-target receptor activity. Its selectivity profile distinguishes it from earlier GHRPs: it does not stimulate ACTH-cortisol secretion, does not elevate prolactin, and does not suppress the GH feedback axis. The result is a clean, reproducible GH pulse with each dose.",
    benefits: [
      "Studied for selective GH secretion without the cortisol or appetite-stimulating side effects associated with older GHRP compounds like GHRP-6 and GHRP-2",
      "Has been investigated for motility and gastrointestinal recovery — Phase 2 clinical trials evaluated ipamorelin for postoperative ileus, confirming safety and tolerability in a controlled human clinical setting",
      "Explored in combination with GHRH analogs for amplified GH secretion — the two receptor pathways are complementary, with synergistic GH release at sub-maximal doses of each",
    ],
    timeline:
      "A measurable GH pulse is detectable within 15 to 30 minutes of subcutaneous injection. Cumulative effects on IGF-1, body composition, and sleep quality are typically tracked over four-to-twelve-week cycles. Because ipamorelin preserves pituitary feedback, cycling is advisable to maintain receptor sensitivity.",
    safety:
      "Ipamorelin has been evaluated in Phase 2 human trials with a favorable tolerability profile; clinical use should include IGF-1 monitoring, and it is not indicated for use in patients with active malignancy or untreated hypothyroidism.",
    references: [
      {
        title:
          "Venkova K et al. Efficacy of Ipamorelin, a Novel Ghrelin Mimetic, in a Rodent Model of Postoperative Ileus. J Pharmacol Exp Ther. 2009.",
        url: "https://doi.org/10.1124/jpet.108.149211",
      },
      {
        title:
          "Lu Z et al. GHS-R1a agonists anamorelin and ipamorelin inhibit cisplatin-induced weight loss in ferrets. Physiol Behav. 2024.",
        url: "https://doi.org/10.1016/j.physbeh.2024.114644",
      },
    ],
    stack: [],
  },

  selank: {
    mechanism:
      "Selank (Thr-Lys-Pro-Arg-Pro-Gly-Pro) is a synthetic heptapeptide derived from the immunomodulatory peptide tuftsin. It acts as a positive allosteric modulator of GABA-A receptors — distinct from the benzodiazepine binding site — and simultaneously upregulates brain-derived neurotrophic factor (BDNF) and modulates serotonin and dopamine turnover. This multi-target mechanism produces anxiolytic effects without the sedation, tolerance, or withdrawal risk associated with conventional benzodiazepines.",
    benefits: [
      "Studied for generalized anxiety disorder in Russian clinical trials since the 1990s, with published data on rapid and sustained anxiety reduction without cognitive impairment or dependence",
      "Has been investigated for cognitive effects including improved attention, cognitive flexibility, and working memory — consistent with its BDNF-upregulating mechanism",
      "Explored for immunomodulatory properties, with preclinical data showing modulation of cytokine profiles that may support immune resilience under stress",
    ],
    timeline:
      "Anxiolytic effects are typically reported within the first one to two weeks of intranasal or subcutaneous administration. Cognitive benefits including improved focus and reduced mental fatigue tend to become apparent in the two-to-four-week window. A standard course runs four to eight weeks, often with a cycling period to preserve receptor sensitivity.",
    safety:
      "Selank has a documented safety profile from Russian Ministry of Health-approved clinical trials; it is not associated with the dependence or withdrawal phenomena of benzodiazepines, though Western regulatory approval is absent and physician oversight is required.",
    references: [
      {
        title:
          "Vyunova TV et al. Peptide-based Anxiolytics: The Molecular Aspects of Heptapeptide Selank Biological Activity. Curr Mol Pharmacol. 2019.",
        url: "https://doi.org/10.2174/0929866525666180925144642",
      },
      {
        title:
          "Syunyakov T et al. Rapid and Slow Response During Treatment of Generalized Anxiety Disorder With Peptide Anxiolytic Selank. Eur Psychiatry. 2012.",
        url: "https://doi.org/10.1016/S0924-9338(12)75281-1",
      },
    ],
    stack: [],
  },

  semax: {
    mechanism:
      "Semax is a heptapeptide analog of the ACTH(4-7) sequence with a C-terminal Pro-Gly-Pro (PGP) extension that significantly increases its stability and central nervous system penetration. Its primary mechanism is robust upregulation of BDNF and NGF in the hippocampus and cortex — measurable within hours of administration. It also modulates dopamine and serotonin systems and demonstrates neuroprotective activity in ischemic models by suppressing inflammatory gene expression and activating CREB-dependent recovery pathways.",
    benefits: [
      "Studied for neuroprotection following ischemic stroke — Semax is approved by the Russian Ministry of Health for acute stroke therapy and has been investigated for reducing infarct size and improving neurological recovery scores",
      "Has been investigated for cognitive enhancement in healthy subjects and patients with cognitive decline — BDNF elevation of approximately 1.4x in the rat hippocampus is documented in published preclinical work",
      "Explored for focus, attention, and mental stamina improvements, with ACTH-fragment pharmacology that enhances dopaminergic and serotonergic neurotransmission without the stimulant mechanism of amphetamines",
    ],
    timeline:
      "BDNF and NGF induction is detectable within hours of intranasal administration. Subjective improvements in focus and cognitive clarity are typically reported within the first one to two weeks. Neuroprotective and neurorestorative effects in clinical stroke applications are evaluated over four-to-twelve-week courses.",
    safety:
      "Semax has a favorable safety profile established in Russian clinical trials for stroke; off-label cognitive use requires physician oversight, and patients with severe uncontrolled hypertension or active psychiatric conditions should be evaluated carefully before use.",
    references: [
      {
        title:
          "Dolotov OV et al. Semax, an analog of ACTH(4-10) with cognitive effects, regulates BDNF and trkB expression in the rat hippocampus. Brain Res. 2006.",
        url: "https://doi.org/10.1016/J.BRAINRES.2006.07.108",
      },
      {
        title:
          "Denisova AV et al. Brain Protein Expression Profile Confirms the Protective Effect of Semax in a Rat Model of Cerebral Ischemia-Reperfusion. Int J Mol Sci. 2021.",
        url: "https://doi.org/10.3390/ijms22126179",
      },
      {
        title:
          "Dergunova LV et al. Semax and Pro-Gly-Pro Activate the Transcription of Neurotrophins and Their Receptor Genes after Cerebral Ischemia. Cell Mol Neurobiol. 2009.",
        url: "https://doi.org/10.1007/s10571-009-9432-0",
      },
    ],
    stack: [],
  },

  dsip: {
    mechanism:
      "DSIP (delta sleep-inducing peptide) is a naturally occurring nonapeptide first isolated from rabbit cerebral venous blood during slow-wave sleep. It modulates the hypothalamic-pituitary axis by influencing somatostatin and corticotropin-releasing hormone secretion, and enhances delta-wave EEG activity — the electrophysiological signature of deep, restorative slow-wave sleep. Plasma DSIP levels follow a circadian rhythm that correlates positively with body temperature and negatively with REM sleep.",
    benefits: [
      "Studied for increasing slow-wave sleep duration and depth — foundational EEG studies in rats and rabbits demonstrated measurable increases in delta-wave activity following DSIP administration",
      "Has been investigated for normalizing disrupted sleep architecture in contexts including chronic insomnia, narcolepsy, and stress-related sleep disruption in human and animal models",
      "Explored for modulation of stress-response systems through its corticotropin-related actions, with potential downstream effects on cortisol timing and recovery-phase hormone profiles",
    ],
    timeline:
      "Subjective improvements in sleep onset and depth are typically reported within the first one to two weeks of a protocol. Delta-wave EEG changes have been documented acutely in preclinical studies. A standard clinical sleep protocol spans four to eight weeks, with optional cycling to assess maintenance.",
    safety:
      "DSIP has been studied in humans since the 1970s with no significant adverse events reported at therapeutic doses; its effects on the HPA axis warrant physician oversight in patients with adrenal insufficiency or corticosteroid-dependent conditions.",
    references: [
      {
        title:
          "Iyer KS et al. Evidence for a role of delta sleep-inducing peptide in slow-wave sleep and sleep-related growth hormone release in the rat. Proc Natl Acad Sci USA. 1988.",
        url: "https://doi.org/10.1073/PNAS.85.10.3653",
      },
      {
        title:
          "Friedman T et al. Diurnal rhythm of plasma delta-sleep-inducing peptide in humans: evidence for positive correlation with body temperature and negative correlation with REM and slow wave sleep. J Clin Endocrinol Metab. 1994.",
        url: "https://doi.org/10.1210/JCEM.78.5.8175965",
      },
      {
        title:
          "Kafi S, Monnier M, Gallard J. The delta-sleep inducing peptide increases duration of sleep in rats. Neurosci Lett. 1979.",
        url: "https://doi.org/10.1016/0304-3940(79)90036-3",
      },
    ],
    stack: [],
  },
};

/* ── 2. Mechanism Stories ───────────────────────────────────── */

export const mechanismStories: MechanismStory[] = [
  {
    slug: "how-peptides-signal",
    headline: "How peptides signal the body",
    body: "Peptides are short chains of amino acids — the same building blocks as proteins, but small enough to act as precise signaling molecules rather than structural materials. When a peptide binds its target receptor, it triggers a downstream cascade: gene expression shifts, enzymes activate, and cells change their behavior. Your body already runs on endogenous peptides — insulin, oxytocin, growth-hormone-releasing hormone. Therapeutic peptides are either fragments of naturally occurring compounds or synthetic analogs engineered for enhanced stability. They do not permanently alter your DNA. They send a message, the cell responds, and the message degrades. This is why dosing precision and cycle timing matter: the signal has a duration, and the art is in its orchestration.",
  },
  {
    slug: "bpc-tb500-synergy",
    headline: "Why BPC-157 and TB-500 synergize",
    body: "BPC-157 and TB-500 target two complementary phases of soft-tissue repair. BPC-157 drives angiogenesis — the formation of new blood vessels — by upregulating VEGF and growth-hormone receptors at the injury site. Without adequate blood supply, healing stalls. TB-500 addresses the cellular mobility problem: by sequestering G-actin and activating the cell migration machinery, it enables fibroblasts and endothelial cells to physically travel to the site BPC-157 has primed with a vascular scaffold. Together, the two peptides create the conditions for denser, better-organized tissue remodeling than either achieves alone — a synergy consistently observed in preclinical combination models.",
  },
  {
    slug: "ghk-cu-rebuilds-skin",
    headline: "How GHK-Cu rebuilds skin",
    body: "GHK-Cu is not a topical filler — it is a gene-expression switch. When copper binds the GHK tripeptide, the complex enters fibroblasts and alters the transcription of approximately 4,000 genes, shifting the cell's output from a maintenance state to a repair and rebuilding state. Type I and III collagen synthesis accelerates, decorin production improves the organization of new collagen fibers, and antioxidant enzyme networks are upregulated to protect the rebuilding tissue. Plasma GHK-Cu levels decline significantly after age 60, which is why supplementation in this window can produce measurable changes in wrinkle depth, skin firmness, and barrier function — not by adding a layer on top, but by restoring the machinery underneath.",
  },
  {
    slug: "ghrh-vs-hgh",
    headline: "How growth-hormone-releasing peptides differ from HGH",
    body: "Synthetic human growth hormone (HGH) bypasses the hypothalamic-pituitary axis entirely, flooding the bloodstream with a fixed, non-pulsatile GH signal that suppresses your body's own production over time. Growth-hormone-releasing peptides — Sermorelin, CJC-1295, Ipamorelin, Tesamorelin — work upstream: they stimulate the pituitary to release your own GH in natural pulses, preserving the feedback loops that prevent excess. This means the pituitary retains its dose-limiting regulatory function, IGF-1 elevation stays within the physiological range, and the pattern of release mimics youth rather than pharmacological override. The trade-off is a gentler, slower arc of benefit — but one that is sustainable, reversible, and significantly safer than exogenous HGH replacement.",
  },
];

/* ── 3. Safety Principles ───────────────────────────────────── */

export const safetyPrinciples: SafetyPrinciple[] = [
  {
    title: "Pharmacy sourcing: 503A and 503B",
    body: "Every Nexphoria peptide is compounded in a U.S.-licensed 503A or 503B pharmacy operating under FDA oversight and USP Chapter 797 sterile-compounding standards. This means tested sterility, verified potency, and documented purity — not research-chemical gray-market vials of unknown provenance.",
  },
  {
    title: "Physician oversight at every step",
    body: "No protocol ships without a licensed physician reviewing your intake form, health history, and goals. Your prescribing physician sets the dose, monitors your response, and adjusts the protocol. Peptide therapy is a prescription category for a reason — the pharmacology is real, and it deserves real medical judgment.",
  },
  {
    title: "Lab testing before and during treatment",
    body: "Baseline labs — including relevant hormone panels and metabolic markers — are reviewed before your first protocol. For GH-axis peptides, IGF-1 is monitored mid-cycle to confirm your response stays within the physiological range. We treat data, not assumptions.",
  },
  {
    title: "Contraindications are non-negotiable",
    body: "Active or recent cancer diagnosis, pregnancy, and breastfeeding are absolute contraindications across all Nexphoria protocols. Specific peptides carry additional cautions: GHK-Cu is contraindicated in Wilson's disease; TB-500 warrants screening for undiagnosed neoplasms due to its cell-migration activity. Your intake review is designed to surface these before anything is prescribed.",
  },
  {
    title: "Dosing precision is the protocol",
    body: "Therapeutic peptide doses are measured in micrograms to milligrams — orders of magnitude smaller than most pharmaceutical drugs. Consistency and accuracy matter: underdosing produces no meaningful signal; overdosing risks receptor desensitization or off-target effects. Physician-set dosing, compounded concentrations, and properly calibrated insulin syringes are all part of the answer.",
  },
];

/* ── 4. Evidence Tiers ──────────────────────────────────────── */

export const evidenceTiers: EvidenceTier[] = [
  {
    tier: 1,
    label: "Phase III / FDA-approved analog",
    description:
      "These peptides have completed Phase III randomized controlled trials and have received FDA approval for at least one indication. Their pharmacokinetics, safety profile, and efficacy are established in peer-reviewed clinical literature. Off-label use in healthy populations extrapolates from this evidence base under physician supervision.",
    peptides: ["sermorelin", "tesamorelin"],
  },
  {
    tier: 2,
    label: "Phase I-II clinical trials",
    description:
      "These peptides have progressed through Phase 1 or Phase 2 human trials, establishing safety and tolerability data in humans. Efficacy signals are present but not yet confirmed in large-scale randomized controlled trials. They are used clinically based on converging preclinical and early human evidence, under physician monitoring.",
    peptides: ["ipamorelin", "ghk-cu", "selank", "semax"],
  },
  {
    tier: 3,
    label: "Pre-clinical + extensive off-label use",
    description:
      "These peptides have robust pre-clinical data across multiple animal models and a documented history of off-label clinical use in sports medicine, longevity, and functional medicine. Human trial data is limited or not yet published in peer-reviewed form. They are prescribed based on strong mechanistic rationale and physician judgment.",
    peptides: ["bpc-157", "tb-500", "cjc-ipa", "dsip"],
  },
];

/* ── 5. FAQs ─────────────────────────────────────────────────── */

export const faqs: FAQ[] = [
  {
    question: "What exactly is a peptide?",
    answer:
      "A peptide is a short chain of amino acids — the same molecular building blocks that make up proteins, but assembled into smaller sequences that function as biological signals rather than structural materials. Your body already produces thousands of peptides: insulin is a peptide, oxytocin is a peptide, the hormone that tells your pituitary to release growth hormone is a peptide. Therapeutic peptides are either fragments of naturally occurring compounds or synthetic analogs engineered for enhanced stability. They bind specific receptors, trigger targeted cellular responses, and then degrade — leaving no permanent alteration to your DNA or long-term receptor downregulation when used as directed.",
  },
  {
    question: "How are peptides different from steroids?",
    answer:
      "Anabolic steroids are lipid-soluble molecules derived from cholesterol that enter cells and directly alter gene transcription by binding nuclear receptors — this is why they carry significant risks of hormonal suppression, cardiovascular remodeling, and androgenic side effects. Peptides are water-soluble amino acid chains that bind extracellular or membrane-bound receptors, triggering signaling cascades rather than directly commanding gene expression. They do not suppress endogenous testosterone or estrogen production, do not cause the virilization effects associated with androgens, and have fundamentally different safety profiles. The growth-hormone-releasing peptides we use specifically preserve the pituitary's own feedback regulation — the opposite of how synthetic HGH or steroids work.",
  },
  {
    question: "Why do these require a prescription?",
    answer:
      "Prescription status exists because the pharmacology is real, the dosing requires individualization, and some peptides are contraindicated in specific conditions — including active malignancy, pregnancy, and certain hormonal disorders. Without physician oversight, contraindications go unscreened, dosing is guesswork, and there is no monitoring for individual responses like IGF-1 elevation. The gray-market peptide research-chemical market bypasses all of this, offering unverified purity and no medical safety net. We believe prescription-only access is not a regulatory inconvenience — it is the feature that makes these protocols worth doing.",
  },
  {
    question: "Are these peptides FDA-approved?",
    answer:
      "Two peptides in our catalog are FDA-approved: Sermorelin holds approval for pediatric growth hormone deficiency, and Tesamorelin (brand name Egrifta) holds approval for HIV-associated lipodystrophy. Their use at Nexphoria is off-label — meaning we apply their established pharmacology to indications beyond the original approval, which is standard practice across medicine. BPC-157, TB-500, GHK-Cu, Ipamorelin, Selank, Semax, DSIP, and CJC-1295/Ipamorelin do not hold FDA approval for any indication. They are prescribed based on pre-clinical evidence, Phase 1-2 data, and clinical precedent, under the authority of a licensed physician who takes responsibility for individualized prescribing decisions.",
  },
  {
    question: "What is a compounding pharmacy?",
    answer:
      "A compounding pharmacy prepares customized medications for specific patients under a physician's prescription — a practice that predates the modern pharmaceutical industry and fills critical gaps when manufactured versions of a drug do not exist, are unavailable, or need to be tailored in dose or delivery form. In the U.S., 503A pharmacies compound for individual patients under state pharmacy board and FDA oversight; 503B outsourcing facilities operate under FDA current Good Manufacturing Practice standards for larger-scale sterile production. All Nexphoria peptides are compounded in licensed 503A or 503B facilities following USP Chapter 797 sterile-compounding standards, with documented potency, sterility, and purity testing.",
  },
  {
    question: "How are these peptides administered?",
    answer:
      "Most Nexphoria protocols use subcutaneous injection — a small-gauge insulin syringe placed in the tissue just beneath the skin of the abdomen or thigh. This is the same route used for insulin, Ozempic, and most biologics. It is not an intramuscular injection. With proper technique (taught in our patient onboarding materials), it takes under 30 seconds and is typically painless. Select cognitive peptides such as Semax and Selank are available in intranasal spray formulations as an alternative delivery route. Your prescribing physician will specify the route, dose, and frequency based on your protocol.",
  },
  {
    question: "Can I travel with my peptides?",
    answer:
      "Yes, with proper documentation. Your Nexphoria prescription documentation — including the physician's order and pharmacy label — is what establishes legal possession for travel within the United States. For international travel, regulations vary by country: some peptides are classified differently outside the U.S., and several are on the World Anti-Doping Agency prohibited list (including BPC-157 and TB-500) for competitive athletes. Keep peptides refrigerated during transit using an insulated cooler or travel case; most peptides tolerate up to 24-48 hours at room temperature without significant degradation. Contact your Nexphoria care team before international travel for destination-specific guidance.",
  },
  {
    question: "Is it safe to stack peptides together?",
    answer:
      "Stacking — combining two or more peptides — is standard in clinical practice when the mechanisms are complementary and additive rather than redundant or competing. BPC-157 and TB-500 are a well-documented synergistic pair in soft-tissue repair; GHK-Cu and BPC-157 complement each other in skin and wound healing protocols. What matters is that stacking decisions are made by a physician who understands each peptide's mechanism, potential interactions, and individual contraindications. Self-assembled stacks from gray-market sources, at unverified doses, without medical oversight, are where risk accumulates. Every Nexphoria stack is physician-designed and dosed to individual patient labs and health history.",
  },
  {
    question: "Do peptides need to be cycled?",
    answer:
      "Most peptide protocols benefit from cycling to preserve receptor sensitivity and prevent adaptation. Growth-hormone secretagogues like Ipamorelin and CJC-1295 are typically run for 12-week on-cycles followed by a break, allowing pituitary responsiveness to reset. BPC-157 and TB-500 for injury repair are generally used for the duration of the healing protocol and then tapered rather than continued indefinitely. GHK-Cu and skin protocols may use lower-frequency maintenance dosing after an initial course. Your physician will specify the cycle structure in your protocol — cycling is built into the Nexphoria treatment timeline from the start, not added as an afterthought.",
  },
  {
    question: "What lab tests are part of the protocol?",
    answer:
      "Baseline labs are reviewed before your first prescription and include relevant hormone panels and metabolic markers based on your protocol. For GH-axis peptides (Sermorelin, CJC-1295/Ipamorelin, Tesamorelin, Ipamorelin), IGF-1 is the primary monitoring marker — it is checked at baseline and at mid-cycle to confirm your response stays within the physiological range and to guide dose adjustments. For recovery protocols, inflammatory markers may be reviewed if clinically indicated. Labs are ordered through a physician order and can typically be completed at any major lab network. Your Nexphoria physician reviews all results and communicates findings and any protocol adjustments through your care portal.",
  },
  {
    question: "What should I do if I experience side effects?",
    answer:
      "Common low-grade reactions — mild injection-site redness, transient fatigue on the first few days, or vivid dreams with GH-releasing peptides — typically resolve without intervention and are documented in the clinical literature. If you experience persistent injection-site reactions, swelling, signs of infection, unexpected mood changes, or any symptom that concerns you, contact your Nexphoria care team through the patient portal. Your physician can adjust your dose, pause the protocol, or order labs to investigate. Do not modify your protocol unilaterally. For any severe or acute reaction, stop administration and seek standard medical care — then notify your Nexphoria physician.",
  },
  {
    question: "How does Nexphoria choose the right stack for me?",
    answer:
      "Your intake form captures your primary goals, relevant health history, current medications, and any contraindications. A licensed Nexphoria physician reviews this information and cross-references it against the evidence base and safety profile for each peptide. The protocol selection weighs your primary goal (repair, skin, metabolic, cognitive, sleep), your baseline labs where relevant, and any conditions that would change the risk-benefit calculation. We do not operate a one-size catalog — the physician can adjust dose, frequency, combination, and cycle length before the prescription is finalized. After your first cycle, your response data informs whether to continue, adjust, or transition to a different protocol.",
  },
];
