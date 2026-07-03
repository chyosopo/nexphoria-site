/* ─────────────────────────────────────────────────────────────
   Journal data — reference-tier editorial hub
   Categories mirror what serious peptide patients actually search.
   Each article is a long-form, clinically rigorous read.
   ───────────────────────────────────────────────────────────── */

import editorialBloodwork from "@/assets/brand/editorial-bloodwork.webp";
import editorialPrescription from "@/assets/brand/editorial-prescription.webp";
import editorialProtocolKit from "@/assets/brand/editorial-protocol-kit.webp";
import editorialPharmacy from "@/assets/brand/editorial-pharmacy.webp";

export type JournalCategory =
  | "foundations"
  | "protocols"
  | "research"
  | "metabolic"
  | "longevity"
  | "performance"
  | "hormones"
  | "safety";

export interface JournalCategoryMeta {
  slug: JournalCategory;
  label: string;
  description: string;
  count: number;
}

export interface JournalArticle {
  slug: string;
  category: JournalCategory;
  eyebrow: string;
  title: string;
  dek: string;
  readTime: string;
  publishedISO: string;
  author: {
    name: string;
    title: string;
  };
  reviewers?: {
    name: string;
    title: string;
  }[];
  imageSrc: string;
  /** TOC sections used both for the rendered article and the sticky TOC */
  sections: {
    id: string;
    label: string;
    /** Plain-text paragraphs. Use double newline for paragraph breaks. */
    body: string;
    /** Optional pull-quote or callout that breaks the column */
    callout?: string;
    /** Optional ordered list rendered as a numbered protocol */
    steps?: string[];
    /** Optional table of values */
    table?: {
      headers: string[];
      rows: string[][];
    };
  }[];
  references: {
    n: number;
    citation: string;
    url?: string;
  }[];
  /** Slugs of related articles */
  related?: string[];
}

export const JOURNAL_CATEGORIES: JournalCategoryMeta[] = [
  {
    slug: "foundations",
    label: "Foundations",
    description: "What peptides are, how they signal, why they matter.",
    count: 4,
  },
  {
    slug: "protocols",
    label: "Protocols",
    description: "Dosing, titration, cycling — the clinical playbook.",
    count: 6,
  },
  {
    slug: "research",
    label: "Research",
    description: "Trial readouts, mechanism papers, what the literature actually shows.",
    count: 5,
  },
  {
    slug: "metabolic",
    label: "Metabolic",
    description: "GLP-1, GIP, insulin sensitivity, body composition.",
    count: 4,
  },
  {
    slug: "longevity",
    label: "Longevity",
    description: "Senescence, mitochondrial repair, NAD+, telomere biology.",
    count: 3,
  },
  {
    slug: "performance",
    label: "Performance",
    description: "Growth-hormone axis, recovery, lean mass, training adaptation.",
    count: 3,
  },
  {
    slug: "hormones",
    label: "Hormones",
    description: "Testosterone, estrogen, cortisol — and the peptides that touch them.",
    count: 2,
  },
  {
    slug: "safety",
    label: "Safety",
    description: "Side-effect profiles, contraindications, when to stop.",
    count: 3,
  },
];

export const JOURNAL_ARTICLES: JournalArticle[] = [
  {
    slug: "what-is-a-peptide",
    category: "foundations",
    eyebrow: "Foundations · 8 min read",
    title: "What is a peptide, exactly?",
    dek: "Short chains of amino acids that signal cells. Understanding mechanism is the first step toward informed therapy.",
    readTime: "8 MIN",
    publishedISO: "2026-06-12",
    author: { name: "Nexphoria Medical Team", title: "Clinical Editorial" },
    reviewers: [
      { name: "Nexphoria Clinical Editorial", title: "Editorial Review" },
    ],
    imageSrc: editorialBloodwork,
    sections: [
      {
        id: "definition",
        label: "Definition",
        body: "A peptide is a short chain of amino acids — typically between two and fifty — linked by peptide bonds. Below that length, you have a free amino acid. Above it, you have a protein. Peptides sit in the middle: large enough to fold into a recognizable shape, small enough to cross tissue barriers, and just specific enough to bind a single class of receptor with high affinity.\n\nThe distinction matters because mechanism drives effect. A peptide is not a vitamin, not a hormone analog by accident, not a small-molecule drug. It is a sequence — and that sequence either matches a binding site or it does not.",
      },
      {
        id: "signaling",
        label: "How peptides signal",
        body: "Most therapeutic peptides act as ligands. They dock with a membrane-bound receptor on a target cell, triggering a conformational change that cascades through second messengers — cyclic AMP, calcium, MAP kinase — and ultimately changes gene expression or protein behavior inside the cell.\n\nA few peptides act intracellularly. Some, like BPC-157, appear to modulate growth-factor pathways without binding a single canonical receptor. Others, like NAD+ precursors, are technically nucleotides that participate in redox chemistry rather than receptor binding. The category 'peptide therapy' is loose; the mechanisms are not.",
        callout: "Sequence is everything. A single amino-acid substitution can turn a potent agonist into a useless analog.",
      },
      {
        id: "pharmacokinetics",
        label: "Why route of administration matters",
        body: "Peptides are fragile. Oral bioavailability is usually under five percent because stomach acid and intestinal proteases break peptide bonds before absorption. That is why most therapeutic peptides are injected subcutaneously or, in select cases, delivered intranasally or transdermally.\n\nSubcutaneous injection gives predictable absorption: peak plasma concentration in fifteen to ninety minutes, half-life from minutes to days depending on the molecule. The longer half-lives — semaglutide at one week, for instance — come from engineered modifications that resist enzymatic clearance.",
        table: {
          headers: ["Route", "Bioavailability", "Onset", "Practical"],
          rows: [
            ["Oral", "<5%", "Variable", "Rare; specialty formulations only"],
            ["Subcutaneous", "70-95%", "15-90 min", "Standard for most therapy peptides"],
            ["Intramuscular", "80-95%", "30-60 min", "Used for select longer-acting agents"],
            ["Intranasal", "10-40%", "10-30 min", "Convenient; lower exposure"],
            ["Transdermal", "<10%", "60+ min", "Limited to small peptides"],
          ],
        },
      },
      {
        id: "categories",
        label: "Therapeutic categories",
        body: "Modern therapeutic peptides fall into a handful of working buckets: metabolic (GLP-1, GIP, amylin); growth-hormone axis (CJC-1295, ipamorelin, sermorelin, tesamorelin); tissue repair (BPC-157, TB-500); cognitive (selank, semax, dihexa); skin and pigment (GHK-Cu, melanotan); and longevity (epitalon, NAD+ precursors, MOTS-c).\n\nEach category has its own mechanism, its own evidence base, and its own safety profile. Treating them as one undifferentiated category — the way most consumer-facing peptide marketing does — is how patients get hurt.",
      },
      {
        id: "bottom-line",
        label: "Bottom line",
        body: "A peptide is a signal. The right peptide, at the right dose, delivered the right way, can move a specific biological lever with remarkable precision. The wrong peptide — or the right peptide misused — does nothing, or worse.\n\nThe rest of this journal exists to help you tell the difference.",
      },
    ],
    references: [
      {
        n: 1,
        citation: "Lau JL, Dunn MK. Therapeutic peptides: Historical perspectives, current development trends, and future directions. Bioorg Med Chem. 2018;26(10):2700-2707.",
        url: "https://pubmed.ncbi.nlm.nih.gov/28720325/",
      },
      {
        n: 2,
        citation: "Muttenthaler M, King GF, Adams DJ, Alewood PF. Trends in peptide drug discovery. Nat Rev Drug Discov. 2021;20(4):309-325.",
        url: "https://pubmed.ncbi.nlm.nih.gov/33536635/",
      },
    ],
    related: ["reading-your-bloodwork", "subq-injection-technique"],
  },
  {
    slug: "reading-your-bloodwork",
    category: "protocols",
    eyebrow: "Protocols · 12 min read",
    title: "Reading your bloodwork without panic.",
    dek: "Reference ranges are population averages — not your personal optimum. A primer on biomarker interpretation.",
    readTime: "12 MIN",
    publishedISO: "2026-06-19",
    author: { name: "Nexphoria Medical Team", title: "Clinical Editorial" },
    imageSrc: editorialPrescription,
    sections: [
      {
        id: "ranges",
        label: "Reference ranges are not goals",
        body: "When a lab returns a result inside the reference range, it is telling you one thing: ninety-five percent of the apparently healthy population it sampled fell within these two numbers. That is a useful starting point. It is not a target.\n\nReference ranges are built from large, mostly older, mostly sedentary cohorts. They describe statistical normality, not biological optimum. A free testosterone in the 'normal' bottom decile for a thirty-year-old man is not optimum even though the lab will flag it green.",
        callout: "Normal is what the cohort looked like. Optimal is what you want to look like in five years.",
      },
      {
        id: "context",
        label: "Context beats individual values",
        body: "No single marker tells the whole story. Free testosterone without SHBG and albumin is a number without a denominator. LDL-C without ApoB and Lp(a) is a partial picture. HbA1c without fasting glucose and insulin can flag late, after dysfunction is already entrenched.\n\nGood interpretation means triangulating across markers and across time. We trend everything. A single draw is a snapshot; three draws ninety days apart is a movie.",
      },
      {
        id: "trending",
        label: "What changes, and how fast",
        body: "Some markers move within weeks: fasting insulin, hs-CRP, ferritin, free T3. Others lag months: HbA1c is a ninety-day average, lipid changes from real intervention often take twelve weeks to manifest, IGF-1 plateaus around six weeks after a GH-axis change.\n\nDo not panic over a number that hasn't had time to move. Do not celebrate one either. Wait for the second draw.",
      },
      {
        id: "panels",
        label: "Panels we order",
        body: "The standard Nexphoria longitudinal panel includes: CBC with differential, comprehensive metabolic panel, full lipid panel including ApoB and Lp(a), HbA1c, fasting insulin, hs-CRP, ferritin, vitamin D, full thyroid (TSH, fT3, fT4, reverse T3), and a sex-specific hormone panel.\n\nFor patients on growth-hormone-axis peptides, we add IGF-1 and IGFBP-3. For metabolic patients, we add fasting C-peptide. For longevity protocols, we layer in homocysteine, methylmalonic acid, and uric acid.",
      },
    ],
    references: [
      {
        n: 1,
        citation: "Sniderman AD, Thanassoulis G, Glavinovic T, et al. Apolipoprotein B Particles and Cardiovascular Disease: A Narrative Review. JAMA Cardiol. 2019;4(12):1287-1295.",
        url: "https://pubmed.ncbi.nlm.nih.gov/31642874/",
      },
    ],
    related: ["what-is-a-peptide", "side-effects-and-contraindications"],
  },
  {
    slug: "side-effects-and-contraindications",
    category: "safety",
    eyebrow: "Safety · 9 min read",
    title: "Side effects, contraindications, and when to stop.",
    dek: "Every peptide has a side-effect profile. We catalog them, severity-rated, with clinical recourse.",
    readTime: "9 MIN",
    publishedISO: "2026-06-05",
    author: { name: "Nexphoria Medical Team", title: "Clinical Editorial" },
    imageSrc: editorialProtocolKit,
    sections: [
      {
        id: "severity",
        label: "Severity, not anxiety",
        body: "Every therapeutic peptide has side effects. Pretending otherwise is malpractice. The goal of patient education is not to alarm — it is to make sure the patient recognizes the difference between a transient adjustment, a manageable side effect, and a stop-and-call-the-doctor event.\n\nWe rate side effects on a three-tier scale: common and transient; manageable with dose adjustment; serious — discontinue immediately.",
        table: {
          headers: ["Severity", "Examples", "Action"],
          rows: [
            ["Common", "Injection-site redness, mild nausea, headache", "Monitor; usually resolves in 1-2 weeks"],
            ["Manageable", "Persistent nausea, fluid retention, fatigue", "Contact physician; dose titration likely"],
            ["Serious", "Severe abdominal pain, vision changes, allergic reaction", "Stop immediately; seek urgent care"],
          ],
        },
      },
      {
        id: "glp1",
        label: "GLP-1 class (semaglutide, tirzepatide)",
        body: "The most common adverse events are gastrointestinal: nausea, constipation, occasional vomiting, especially during titration. These typically resolve within four to six weeks. Persistent severe abdominal pain is not normal and warrants evaluation for pancreatitis or gallbladder pathology.\n\nRare but documented: thyroid C-cell tumors (in rodent models — human signal unclear), acute kidney injury from dehydration, retinopathy progression in patients with established diabetic retinopathy.",
        callout: "Stop and call: severe persistent abdominal pain, vision changes, neck swelling, signs of dehydration.",
      },
      {
        id: "growth-hormone",
        label: "Growth-hormone-axis peptides (CJC-1295, ipamorelin, sermorelin)",
        body: "Mild water retention, transient injection-site reactions, occasional carpal-tunnel-like paresthesias at higher doses. Insulin sensitivity can decrease slightly during active GH-axis modulation — relevant for prediabetic patients.\n\nDo not stack multiple GH-axis peptides without clinical supervision. The IGF-1 ceiling is a real safety margin; the goal is restoration, not supraphysiology.",
      },
    ],
    references: [
      {
        n: 1,
        citation: "Wilding JPH, Batterham RL, Calanna S, et al. Once-Weekly Semaglutide in Adults with Overweight or Obesity. N Engl J Med. 2021;384(11):989-1002.",
        url: "https://pubmed.ncbi.nlm.nih.gov/33567185/",
      },
    ],
    related: ["what-is-a-peptide", "reading-your-bloodwork"],
  },
  {
    slug: "legal-landscape-compounded-peptides-2026",
    category: "research",
    eyebrow: "Research · 14 min read",
    title: "The legal landscape of compounded peptides in 2026.",
    dek: "503A pharmacies, FDA enforcement discretion, and what 'research-only' really means.",
    readTime: "14 MIN",
    publishedISO: "2026-05-28",
    author: { name: "Nexphoria Medical Team", title: "Clinical Editorial" },
    imageSrc: editorialPharmacy,
    sections: [
      {
        id: "503a-503b",
        label: "503A vs 503B",
        body: "Two compounding-pharmacy categories exist under U.S. federal law. A 503A pharmacy compounds patient-specific prescriptions, dispensed against a valid physician order, for a named individual. A 503B outsourcing facility manufactures in bulk under cGMP and can supply hospitals and clinics without a patient-specific prescription.\n\nNexphoria operates exclusively through 503A pharmacy partners. Every order is a patient-specific prescription written by a licensed clinician following a real evaluation. This is not a workaround. It is the lawful path.",
      },
      {
        id: "enforcement",
        label: "FDA enforcement discretion",
        body: "Some peptides — semaglutide, tirzepatide — were placed on the FDA shortage list during 2023-2024, which allowed 503A pharmacies to compound them. As shortages resolve, that latitude narrows. Reputable telehealth providers track shortage status weekly and adjust formulary accordingly.\n\nWe do not compound peptides that have lost shortage status unless they have a legitimate compounding pathway (e.g., personalized dosing, allergy-driven excipient swap).",
        callout: "If a vendor sells you a peptide that the FDA does not allow to be compounded, that is not enforcement discretion. That is grey market.",
      },
      {
        id: "research-only",
        label: "What 'research-only' actually means",
        body: "Vials labeled 'for research only' or 'not for human consumption' are exactly that. The label is not a wink. It is the legal posture of a chemical supplier who has not validated identity, purity, sterility, or endotoxin load to clinical standards.\n\nResearch-grade peptides should not be self-administered. Period.",
      },
    ],
    references: [
      {
        n: 1,
        citation: "U.S. Food and Drug Administration. Compounding and the FDA: Questions and Answers. FDA.gov. Updated 2024.",
        url: "https://www.fda.gov/drugs/human-drug-compounding/compounding-and-fda-questions-and-answers",
      },
    ],
    related: ["what-is-a-peptide", "side-effects-and-contraindications"],
  },
  {
    slug: "subq-injection-technique",
    category: "protocols",
    eyebrow: "Protocols · 6 min read",
    title: "Subcutaneous injection — a clean, anxiety-free technique.",
    dek: "Done well, a sub-q injection is faster, cleaner, and less painful than a flu shot. Here is the protocol.",
    readTime: "6 MIN",
    publishedISO: "2026-06-22",
    author: { name: "Nexphoria Clinical Editorial", title: "Editorial Review" },
    imageSrc: editorialProtocolKit,
    sections: [
      {
        id: "supplies",
        label: "What you need",
        body: "A 28- to 31-gauge insulin syringe, an alcohol swab, the reconstituted vial, a sharps container, and a clean flat surface. That is it. No vial adapters, no z-track, no aspiration step.\n\nKeep supplies together in a labeled drawer. Decision fatigue is the enemy of adherence; ritualizing the setup helps.",
      },
      {
        id: "site",
        label: "Site selection",
        body: "Subcutaneous tissue: lower abdomen (two finger-widths from the navel), outer thigh, or back of upper arm. Rotate sites between doses to avoid lipohypertrophy. The abdomen has the most consistent absorption and is the default unless otherwise indicated.",
        steps: [
          "Wash hands with soap and warm water.",
          "Wipe the injection site with an alcohol swab in one direction. Let it dry — fully dry, ten seconds.",
          "Pinch a fold of skin between thumb and forefinger.",
          "Insert the needle at a 45-degree angle (lean subjects) or 90-degree (most adults). Smooth, single motion.",
          "Depress the plunger steadily over two to three seconds.",
          "Withdraw, release the pinch, dispose of the syringe in the sharps container. Do not recap.",
        ],
      },
      {
        id: "troubleshooting",
        label: "Troubleshooting",
        body: "A small bead of blood is normal. Apply gentle pressure for thirty seconds. Bruising is more common with thinner skin and abdominal injections; it is cosmetic, not clinical.\n\nPersistent redness, warmth, or pain at the site lasting more than 48 hours is not normal — message the clinical team.",
      },
    ],
    references: [
      {
        n: 1,
        citation: "Frid AH, Hirsch LJ, Menchior AR, et al. New Insulin Delivery Recommendations. Mayo Clin Proc. 2016;91(9):1231-1255.",
        url: "https://pubmed.ncbi.nlm.nih.gov/27594187/",
      },
    ],
    related: ["what-is-a-peptide", "reading-your-bloodwork"],
  },
  {
    slug: "gh-secretagogues-complete-guide",
    category: "performance",
    eyebrow: "Performance · 11 min read",
    title: "Growth hormone secretagogues: a complete clinical guide.",
    dek: "CJC-1295, ipamorelin, sermorelin — what each does, how they stack, and what your IGF-1 should tell you at 90 days.",
    readTime: "11 MIN",
    publishedISO: "2026-06-10",
    author: { name: "Nexphoria Medical Team", title: "Clinical Editorial" },
    reviewers: [
      { name: "Nexphoria Clinical Editorial", title: "Editorial Review" },
    ],
    imageSrc: editorialBloodwork,
    sections: [
      {
        id: "what-are-ghs",
        label: "What GH secretagogues actually do",
        body: "Growth hormone secretagogues (GHS) are a class of peptides that stimulate the pituitary gland to release growth hormone in a pulsatile, physiologically normal pattern. They are not the same as exogenous recombinant HGH. The distinction is critical: exogenous GH suppresses endogenous production via negative feedback; secretagogues preserve and amplify the body\'s own secretion rhythm.\n\nTwo receptor systems are relevant. GHRH-receptor agonists (CJC-1295, sermorelin, tesamorelin) mimic growth hormone-releasing hormone from the hypothalamus. Ghrelin-receptor agonists (ipamorelin, hexarelin, MK-677) bind the GHS-R1a receptor, driving a distinct pituitary signal. Stacking one from each class produces additive pulsation without equivalent feedback blunting.",
        callout: "The pituitary cannot distinguish a synthetic GHRH signal from endogenous release. That indifference is the entire pharmacological premise.",
      },
      {
        id: "cjc-vs-sermorelin",
        label: "CJC-1295 vs. sermorelin — duration and potency",
        body: "Sermorelin is the shortest-acting option: a 29-amino-acid GHRH analog with a half-life of ten to twenty minutes. It mimics the natural, brief hypothalamic pulse. CJC-1295 extends that pulse via a drug affinity complex (DAC) that binds serum albumin, extending half-life to seven to ten days per dose. That longevity is both its advantage and its risk — if you react poorly, the signal persists.\n\nFor patients new to GHS therapy, sermorelin\'s short half-life makes it the lower-risk entry point. CJC-1295 is reserved for patients who have tolerated a shorter-acting analog and want sustained IGF-1 elevation with weekly rather than nightly dosing.",
        table: {
          headers: ["Compound", "Class", "Half-life", "Dosing schedule", "Practical"],
          rows: [
            ["Sermorelin", "GHRH analog", "10–20 min", "Nightly SC", "Best starting point; short half-life, reversible"],
            ["CJC-1295 (DAC)", "GHRH analog", "7–10 days", "1–2× weekly SC", "Sustained IGF-1 elevation; less forgiving if poorly tolerated"],
            ["Ipamorelin", "GHS-R agonist", "2 hours", "Nightly SC", "Selective GH pulse; minimal cortisol/prolactin elevation"],
          ],
        },
      },
      {
        id: "stack-rationale",
        label: "Why GHRH + GHS stacks work",
        body: "The clinical rationale for combining a GHRH analog with a ghrelin-mimetic is synergy at the pituitary level. The two receptor systems amplify each other: GHRH primes somatotrophs (GH-secreting pituitary cells) and the ghrelin signal then triggers a larger-than-normal release. The IGF-1 response to the CJC-1295 + ipamorelin combination exceeds either agent alone by a factor of 2–3× in clinical use.\n\nIpamorelin is the preferred GHS-R agonist because it is highly selective for GH secretion with minimal effect on cortisol and prolactin — a critical safety advantage over older ghrelin mimetics like GHRP-2 and GHRP-6.",
      },
      {
        id: "monitoring",
        label: "Monitoring: IGF-1 is the signal",
        body: "IGF-1 (insulin-like growth factor-1) is the primary biomarker for GHS therapy response. It is produced in the liver downstream of GH stimulation and has a half-life of fifteen to twenty hours, making it a stable, integrated measure of GH-axis activity — unlike GH itself, which pulses and is hard to capture.\n\nBaseline IGF-1 is drawn before the first dose. At 90 days, we target an IGF-1 in the upper quartile of age-adjusted reference range — not supraphysiologic. If IGF-1 exceeds the upper limit of normal, dose is reduced. If response is sub-optimal, the protocol is reviewed for compliance and timing.",
        callout: "The goal is restoration to physiological optimum — not supraphysiology. IGF-1 at 2× normal is not better; it is a risk signal.",
      },
    ],
    references: [
      {
        n: 1,
        citation: "Sigalos JT, Pastuszak AW. The safety and efficacy of growth hormone secretagogues. Sex Med Rev. 2018;6(1):45-53.",
        url: "https://pubmed.ncbi.nlm.nih.gov/27997118/",
      },
      {
        n: 2,
        citation: "Teichman SL et al. Prolonged stimulation of GH and IGF-1 secretion by CJC-1295, a long-acting GHRH analog. J Clin Endocrinol Metab. 2006;91(3):799-805.",
        url: "https://pubmed.ncbi.nlm.nih.gov/16352683/",
      },
    ],
    related: ["what-is-a-peptide", "reading-your-bloodwork", "longevity-nad-mots-c"],
  },
  {
    slug: "longevity-nad-mots-c",
    category: "longevity",
    eyebrow: "Longevity · 10 min read",
    title: "NAD+, MOTS-c, and the mitochondrial theory of aging.",
    dek: "Why cellular energy decline is measurable, what restores it, and what the clinical evidence actually supports.",
    readTime: "10 MIN",
    publishedISO: "2026-06-03",
    author: { name: "Nexphoria Medical Team", title: "Clinical Editorial" },
    imageSrc: editorialProtocolKit,
    sections: [
      {
        id: "nad-decline",
        label: "The NAD+ problem",
        body: "Nicotinamide adenine dinucleotide (NAD+) is a coenzyme present in every living cell, essential for hundreds of metabolic reactions and for the function of sirtuins — proteins that govern DNA repair, gene expression, and mitochondrial biogenesis. NAD+ levels decline by roughly fifty percent between age twenty and age fifty in most tissues, and the consequences are measurable: impaired mitochondrial function, reduced DNA repair capacity, and a shift in cellular metabolism toward inflammation.\n\nThe therapeutic thesis is straightforward: restoring NAD+ to youthful levels should restore the enzymatic activity it supports. The question is how to get it into cells efficiently.",
        callout: "NAD+ does not simply enter cells — it must be synthesized inside them. The precursors NMN and NR are better absorbed and converted intracellularly.",
      },
      {
        id: "nad-precursors-vs-iv",
        label: "Precursors vs. direct infusion",
        body: "Oral NMN (nicotinamide mononucleotide) and NR (nicotinamide riboside) are the most-studied delivery vehicles. Multiple randomized controlled trials in humans confirm that oral NMN raises blood and muscle NAD+ levels measurably. The magnitude of cellular restoration at tissue level remains debated.\n\nDirect IV NAD+ infusion bypasses the precursor conversion step and produces rapid, sustained plasma NAD+ elevation. Clinical reports of improved energy, cognitive clarity, and sleep quality are consistent. The evidence base is smaller than for oral precursors — but the mechanism is direct.",
        table: {
          headers: ["Form", "Route", "Evidence level", "Time to effect", "Practical notes"],
          rows: [
            ["NMN / NR", "Oral", "RCT data in humans", "2–4 weeks", "Convenient; lower cost; moderate tissue delivery"],
            ["IV NAD+", "Intravenous", "Smaller trials + case series", "Hours to days", "Direct plasma elevation; infusion clinic required"],
            ["SC NAD+", "Subcutaneous", "Early clinical use", "1–3 days", "Emerging; more convenient than IV; compounded only"],
          ],
        },
      },
      {
        id: "mots-c",
        label: "MOTS-c: mitochondria\'s own hormone",
        body: "MOTS-c (mitochondrial open reading frame of the 12S rRNA type-c) is a peptide encoded in mitochondrial DNA itself — the first mitochondria-derived regulatory peptide identified in humans. It activates AMPK, the cellular energy sensor, and has been shown to improve insulin sensitivity in skeletal muscle with effects comparable to exercise in some animal models.\n\nHuman data is limited but compelling: MOTS-c levels are lower in older adults and in populations with metabolic disease. Exogenous MOTS-c supplementation in aging rodent models improved metabolic markers and extended healthspan. Clinical trials in humans are ongoing.",
      },
      {
        id: "measuring-longevity",
        label: "Measuring biological age — the Horvath clock and beyond",
        body: "The clinical question is: how do you know if a longevity intervention is working? Chronological age is fixed. Biological age, as measured by epigenetic DNA methylation clocks (Horvath, GrimAge, PhenoAge), is not. Validated epigenetic clocks correlate with mortality risk, disease incidence, and physiological function — and they respond to interventions.\n\nNexphoria\'s longevity protocols are benchmarked at baseline and at one year using a validated biological age assessment. A protocol that doesn\'t move the needle on measurable markers is re-evaluated. Dare to defy. Find your focus. Measure the result.",
      },
    ],
    references: [
      {
        n: 1,
        citation: "Yoshino J et al. NAD+ intermediates: the biology and therapeutic potential of NMN and NR. Cell Metab. 2018;27(3):513-528.",
        url: "https://pubmed.ncbi.nlm.nih.gov/29514063/",
      },
      {
        n: 2,
        citation: "Lee C et al. The mitochondrial-derived peptide MOTS-c promotes metabolic homeostasis and reduces obesity and insulin resistance. Cell Metab. 2015;21(3):443-454.",
        url: "https://pubmed.ncbi.nlm.nih.gov/25738459/",
      },
    ],
    related: ["what-is-a-peptide", "reading-your-bloodwork", "gh-secretagogues-complete-guide"],
  },
  {
    slug: "bpc-157-tissue-repair-evidence",
    category: "research",
    eyebrow: "Research · 9 min read",
    title: "BPC-157 and tissue repair: what the evidence actually supports.",
    dek: "Exceptional preclinical data, limited human trials. A clear-eyed review of where BPC-157 stands in 2026.",
    readTime: "9 MIN",
    publishedISO: "2026-05-20",
    author: { name: "Nexphoria Medical Team", title: "Clinical Editorial" },
    reviewers: [
      { name: "Nexphoria Clinical Editorial", title: "Editorial Review" },
    ],
    imageSrc: editorialPharmacy,
    sections: [
      {
        id: "mechanism",
        label: "The mechanism: VEGF and the nitric oxide system",
        body: "BPC-157 (Body Protection Compound-157) is a synthetic pentadecapeptide derived from a sequence found in human gastric juice. Its healing properties were first documented in the gastrointestinal tract, where it exhibited cytoprotective effects across essentially every tissue type studied.\n\nThe primary mechanism involves upregulation of vascular endothelial growth factor (VEGF) expression at injury sites. VEGF drives angiogenesis — the formation of new blood vessels — which is the biological prerequisite for tissue repair. BPC-157 also modulates nitric oxide synthase, enhancing NO availability at injury sites and further accelerating fibroblast migration.",
        callout: "In rodent models, BPC-157 has demonstrated healing activity in tendon, ligament, muscle, nerve, GI mucosa, cornea, and bone. No other single peptide in the research literature comes close to this tissue range.",
      },
      {
        id: "preclinical",
        label: "Preclinical evidence: exceptional",
        body: "The animal-model literature on BPC-157 is among the most extensive in peptide pharmacology. Dozens of independent research groups across multiple countries have replicated core findings: accelerated tendon-to-bone healing, gut mucosal repair, reduction in inflammatory markers, and reversal of drug-induced organ damage.\n\nA 2018 review by Seiwerth et al. in Current Pharmaceutical Design synthesized this body of work, concluding that BPC-157 consistently accelerates healing across tissue types with a favorable safety profile and no reported organ toxicity at studied doses in animals.",
      },
      {
        id: "human-evidence",
        label: "Human evidence: limited but promising",
        body: "The honest assessment: BPC-157 has not been subject to large randomized controlled trials in humans. Small early-phase studies and case series exist, primarily from Croatian research groups. The compound has not completed Phase III trials for any indication. It is not FDA-approved.\n\nThis is why Nexphoria classifies BPC-157 as Tier B− (investigational). The preclinical signal is compelling enough that physicians include it in the formulary for appropriate patients — but the evidence-to-risk discussion with each patient is explicit, not assumed.",
      },
      {
        id: "who-benefits",
        label: "Who benefits: clinical use cases",
        body: "In clinical practice, BPC-157 is used primarily in two contexts: soft-tissue injury recovery (tendon, ligament, muscle tears) and gastrointestinal protection during protocols that include compounds with GI side effects.\n\nTypical protocol: 250–500 mcg subcutaneous daily or twice-daily, 8–12 weeks. Oral pH-stable formulations are available for GI-specific use. Monitoring is clinical — there is no validated serum biomarker for BPC-157 response, so symptom tracking and functional assessment are the primary endpoints.",
      },
    ],
    references: [
      {
        n: 1,
        citation: "Seiwerth S et al. BPC-157 and standard angiogenic growth factors: gastrointestinal tract healing, wound healing, and angiogenesis. Curr Pharm Des. 2018;24(18):1972-1989.",
        url: "https://pubmed.ncbi.nlm.nih.gov/29745325/",
      },
      {
        n: 2,
        citation: "Sikiric P et al. Stable gastric pentadecapeptide BPC 157: novel therapy in gastrointestinal tract. Curr Pharm Des. 2011;17(16):1612-1632.",
        url: "https://pubmed.ncbi.nlm.nih.gov/21548867/",
      },
    ],
    related: ["what-is-a-peptide", "side-effects-and-contraindications", "legal-landscape-compounded-peptides-2026"],
  },
];

export function getArticleBySlug(slug: string): JournalArticle | undefined {
  return JOURNAL_ARTICLES.find((a) => a.slug === slug);
}

export function getArticlesByCategory(category: JournalCategory): JournalArticle[] {
  return JOURNAL_ARTICLES.filter((a) => a.category === category);
}

export function getRelatedArticles(slugs: string[] | undefined): JournalArticle[] {
  if (!slugs) return [];
  return slugs.map((s) => getArticleBySlug(s)).filter(Boolean) as JournalArticle[];
}
