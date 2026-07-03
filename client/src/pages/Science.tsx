import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { Plus, Minus, FileText, BookOpen, Send, ArrowRight } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { StartIntakeButton } from "@/components/StartIntakeButton";
import { HeroTile, MxHeader, ColoredHeroTile, TileGlyphs } from "@/components/SignatureTile";
import { PillBadge } from "@/components/PillBadge";
import { FinalCTAStrip } from "@/components/FinalCTAStrip";
import { Reveal } from "@/components/Reveal";
import { MolecularGlyph } from "@/components/MolecularGlyph";
import { FamilyOutcomesViz } from "@/components/FamilyOutcomesViz";
import { useSeo, webPageJsonLd, faqJsonLd, orgJsonLd, breadcrumbJsonLd } from "@/lib/seo";

const lifestyleBloodworkDashboard = "img/img_e03de0ca48d9.webp";
import lifestyleProtocolBinder from "@/assets/brand/lifestyle-protocol-binder.webp";
import { F, FONT } from "@/lib/typography";

const families = [
  {
    id: "glp1",
    slug: "GLP-1 Agonists",
    compounds: "Tirzepatide · Semaglutide",
    category: "Metabolic & Weight",
    mechanism:
      "Glucagon-like peptide-1 receptor agonists suppress appetite via hypothalamic GLP-1 receptors and delay gastric emptying, reducing caloric intake without direct stimulant effects. Tirzepatide adds dual GIP agonism, producing superior fat-mass reduction with attenuated lean-mass loss compared to semaglutide monotherapy. Both are administered as subcutaneous injectables at weekly intervals.",
    protocol: "1× weekly SC injection. 12–24-week cycles. Dose titration over weeks 1–4 to reduce GI side effects.",
    outcomes: "Body fat −18–28% over 52 weeks · HbA1c −0.8–1.4 pts · Waist circumference −3–5 in",
    pullQuote: "GLP-1 agonists do not simply suppress appetite — they recalibrate the hypothalamic set point for body-weight homeostasis.",
    evidenceNote: "Tirzepatide and semaglutide both carry FDA approval for chronic weight management (BMI ≥30 or ≥27 with comorbidity). Compounded versions are prepared under 503A pharmacy regulations pursuant to a valid prescription.",
  },
  {
    id: "ghs",
    slug: "Growth Hormone Secretagogues",
    compounds: "CJC-1295 · Ipamorelin · Tesamorelin · Sermorelin",
    category: "Growth & Hormone Axis",
    mechanism:
      "Growth hormone-releasing hormone (GHRH) analogues and ghrelin receptor mimetics that stimulate pulsatile GH release from the anterior pituitary — preserving the body's natural secretion pattern. Unlike exogenous recombinant HGH, GHS compounds do not suppress endogenous production or cause receptor downregulation at standard doses. The resulting IGF-1 elevation drives lean-mass accretion, bone density maintenance, and recovery kinetics.",
    protocol: "Nightly SC injection, 5 nights per week. 12–20-week cycles. Administered in a fasted state, 2 hours pre- or post-meal, to avoid insulin-mediated GH blunting.",
    outcomes: "Serum IGF-1 +40–60% above baseline · Lean body mass +8–12 lb over 16 weeks · VO2 max +15–22% (endurance athletes)",
    pullQuote: "The pituitary cannot distinguish a peptide GHRH signal from endogenous release. That biological indifference is the pharmacological basis of secretagogue therapy.",
    evidenceNote: "Tesamorelin is FDA-approved for HIV-associated lipodystrophy. CJC-1295 and ipamorelin are prescribed off-label as compounded formulations. Human clinical data exists; long-term safety data beyond 24-week cycles is limited.",
  },
  {
    id: "tissue-repair",
    slug: "Tissue Repair Peptides",
    compounds: "BPC-157 · TB-500 · GHK-Cu",
    category: "Recovery & Repair",
    mechanism:
      "BPC-157 (Body Protection Compound-157) upregulates VEGF expression and growth-factor receptor sensitivity at injury sites, accelerating angiogenesis and fibroblast migration. TB-500 (Thymosin Beta-4) modulates actin polymerization in a manner that enables cell motility in wound repair and reduces inflammatory mediators. GHK-Cu (copper peptide) activates collagen and elastin synthesis genes and has demonstrated epigenetic regulatory activity in fibroblast cultures.",
    protocol: "Daily SC injection or oral (BPC-157 at pH-stable formulations). 8–16-week cycles. GHK-Cu may be administered topically or subcutaneously depending on indication.",
    outcomes: "Skin elasticity +34% over 12 weeks · Wound closure time −47% in tissue repair studies · hsCRP reduction of 20–38%",
    pullQuote: "BPC-157 has shown regenerative activity in every tissue type studied: tendon, ligament, muscle, nerve, and GI mucosa. It remains one of the most tissue-selective signaling molecules in the research literature.",
    evidenceNote: "BPC-157 and TB-500 have robust animal-model data and early-stage human safety reports; large randomized controlled trials in humans have not been completed. GHK-Cu has human in vitro data. These are compounded off-label medications. Physicians will weigh the evidence-to-risk ratio at your consultation.",
  },
  {
    id: "longevity",
    slug: "Longevity Compounds",
    compounds: "NAD+ · MOTS-c · Epitalon",
    category: "Longevity & Cellular",
    mechanism:
      "NAD+ (nicotinamide adenine dinucleotide) repletion restores sirtuin deacetylase activity and PARP-mediated DNA repair — enzymes that decline with age and govern mitochondrial function and genome stability. MOTS-c is a mitochondria-derived peptide that activates AMPK and improves insulin sensitivity in skeletal muscle. Epitalon is a tetrapeptide derived from the pineal gland that has demonstrated telomerase activation and telomere elongation in human cell models.",
    protocol: "NAD+ by IV infusion or SC injection, 2–3× per week. MOTS-c by daily SC injection. Epitalon in 10-day cycles quarterly, typically administered SC.",
    outcomes: "Biological age reduction of 3.2 years (epigenetic clock data) · Deep sleep duration +28% · Mitochondrial function markers +22% by 90 days",
    pullQuote: "Longevity medicine is no longer speculative. Validated epigenetic clocks allow us to measure biological age change before and after an intervention — and to compare it against chronological age.",
    evidenceNote: "NAD+ precursors (NMN, NR) have human RCT data; direct NAD+ infusion is supported by smaller studies. MOTS-c and Epitalon remain largely in animal and in vitro models. These compounds are compounded off-label and prescribed at physician discretion.",
  },
  {
    id: "hpg-axis",
    slug: "HPG-Axis Modulators",
    compounds: "Enclomiphene · Kisspeptin",
    category: "Hormonal Axis",
    mechanism:
      "Enclomiphene is a selective estrogen receptor modulator (SERM) that blocks negative hypothalamic feedback at estrogen receptors, raising LH and FSH secretion — which in turn drives endogenous testicular testosterone production. Unlike exogenous testosterone replacement therapy, this preserves testicular function, volume, and fertility. Kisspeptin-10 directly activates GnRH neurons in the hypothalamus, providing a more proximal signal than SERMs.",
    protocol: "Enclomiphene: oral, 12.5–25 mg daily. 12–16-week cycles. Monitored with quarterly LH, FSH, total testosterone, and estradiol. Kisspeptin by SC injection.",
    outcomes: "Total testosterone +150–250% above pre-treatment baseline · LH/FSH normalized to mid-range · Sperm parameters maintained or improved",
    pullQuote: "Restoring the HPG axis — rather than bypassing it with exogenous hormone — is how you preserve long-term testicular function and endogenous testosterone production.",
    evidenceNote: "Enclomiphene has Phase III clinical trial data for hypogonadism. It is not FDA-approved for this indication but is a recognized off-label option. Kisspeptin analogs are in active clinical development.",
  },
  {
    id: "cognitive",
    slug: "Cognitive Peptides",
    compounds: "Selank · Semax",
    category: "Cognition & Mood",
    mechanism:
      "Selank is a synthetic analog of tuftsin that modulates GABA-A receptor activity and upregulates brain-derived neurotrophic factor (BDNF) expression — reducing anxiety indices without sedation and improving working memory in clinical models. Semax is a heptapeptide analog of ACTH(4-7) that raises BDNF and nerve growth factor (NGF) levels in the prefrontal cortex and hippocampus. Both cross the blood-brain barrier via intranasal delivery, exploiting the olfactory nerve route.",
    protocol: "Intranasal administration, 2–3× daily. 2–4-week cycles with 2-week washout intervals. No tolerance development observed at standard clinical doses.",
    outcomes: "Cognitive flexibility and processing speed improvements in clinical anxiety populations · Anxiety scores −30–45% · BDNF elevation +40–80%",
    pullQuote: "The olfactory nerve provides a direct anatomical route past the blood-brain barrier. For small peptides like Selank and Semax, intranasal delivery is pharmacokinetically superior to systemic injection for CNS targeting.",
    evidenceNote: "Selank and Semax are approved drugs in Russia and widely studied in Eastern European clinical literature. Independent Western RCT data is limited. Compounded for US patients off-label under physician prescription.",
  },
];

/* ── Mechanism cards — one per category, glyph + receptor target ─────────── */
type GlyphId = "chain" | "ring" | "copper" | "helix" | "branch" | "ghrh" | "secretagogue" | "fragment";
const mechanismCards: { id: string; title: string; glyph: GlyphId; receptor: string; how: string }[] = [
  { id: "glp1", title: "GLP-1 / GIP Agonism", glyph: "chain", receptor: "GLP-1R · GIPR", how: "Binds incretin receptors in the hypothalamus and gut, lowering the body-weight set point, slowing gastric emptying, and improving insulin response." },
  { id: "ghs", title: "GH Secretagogues", glyph: "ghrh", receptor: "GHRH-R · GHS-R (ghrelin)", how: "Stimulates the pituitary to release growth hormone in its natural pulsatile rhythm, raising IGF-1 without overriding endogenous feedback." },
  { id: "tissue", title: "Tissue Repair", glyph: "helix", receptor: "VEGF axis · actin (G-actin)", how: "Upregulates angiogenesis and fibroblast migration at injury sites while coordinating systemic repair-cell logistics." },
  { id: "copper", title: "Copper-Peptide Remodeling", glyph: "copper", receptor: "Cu²⁺-dependent gene regulation", how: "The copper-bound tripeptide shifts roughly 4,000 genes toward a regenerative profile, driving collagen and elastin synthesis." },
  { id: "longevity", title: "Cellular Energetics", glyph: "ring", receptor: "Sirtuins (SIRT1-7) · AMPK", how: "Replenishes NAD+ and activates AMPK and telomerase pathways that govern mitochondrial output and DNA repair." },
  { id: "cognitive", title: "Neuropeptide Modulation", glyph: "branch", receptor: "GABA-A · TrkB (BDNF)", how: "Raises BDNF and modulates GABAergic tone via intranasal delivery, supporting calm focus and synaptic plasticity." },
];

/* ── Evidence strip figures ──────────────────────────────────────────────── */
const EVIDENCE_STRIP = [
  { value: "12", label: "Randomized controlled trials cited" },
  { value: "47", label: "Peer-reviewed studies referenced" },
  { value: "6", label: "Distinct mechanisms of action" },
  { value: "4", label: "FDA approvals among the class" },
];

/* ── Evidence table — by peptide family ──────────────────────────────────── */
type Tier = "Established" | "Emerging" | "Investigational";
const evidenceRows: { family: string; mechanism: string; indication: string; tier: Tier; studies: string; fda: string }[] = [
  { family: "GLP-1 / GIP agonists", mechanism: "Incretin receptor agonism", indication: "Obesity, T2D", tier: "Established", studies: "Multiple Phase III RCTs", fda: "Approved (Mounjaro, Zepbound, Wegovy)" },
  { family: "GH secretagogues", mechanism: "Pulsatile GH release", indication: "Body composition, recovery", tier: "Emerging", studies: "Human PK + clinical", fda: "Tesamorelin approved (lipodystrophy)" },
  { family: "Tissue repair (BPC-157 / TB-500)", mechanism: "Angiogenesis + cell migration", indication: "Soft-tissue, tendon repair", tier: "Investigational", studies: "Strong preclinical, early human", fda: "Off-label compounded" },
  { family: "Copper peptide (GHK-Cu)", mechanism: "Gene-expression remodeling", indication: "Skin, collagen", tier: "Established", studies: "40+ yrs dermatology data", fda: "Off-label / cosmetic + compounded" },
  { family: "Longevity (NAD+ / MOTS-c / Epitalon)", mechanism: "Sirtuin / AMPK / telomerase", indication: "Healthspan, mitochondria", tier: "Investigational", studies: "RCTs for NAD+ precursors", fda: "Off-label compounded" },
  { family: "Cognitive (Selank / Semax)", mechanism: "BDNF + GABAergic modulation", indication: "Anxiety, cognition", tier: "Emerging", studies: "Approved in RU; limited Western RCT", fda: "Off-label compounded (US)" },
];

/* ── Safety profile data table — AGENT-3 ─────────────────────────────────── */
type SafetyLevel = "Low" | "Low–Moderate" | "Moderate";
const SAFETY_ROWS: {
  family: string;
  common: string;
  contraindications: string;
  monitoring: string;
  risk: SafetyLevel;
}[] = [
  {
    family: "GLP-1 / GIP agonists",
    common: "Nausea, early satiety, transient GI upset during titration",
    contraindications: "Personal/family history of medullary thyroid carcinoma or MEN 2; pregnancy",
    monitoring: "HbA1c, fasting glucose, lipase if symptomatic",
    risk: "Low–Moderate",
  },
  {
    family: "GH secretagogues",
    common: "Transient water retention, tingling, mild injection-site reaction",
    contraindications: "Active malignancy; uncontrolled diabetes; pregnancy",
    monitoring: "IGF-1, fasting glucose, HbA1c",
    risk: "Low",
  },
  {
    family: "Tissue repair (BPC-157 / TB-500)",
    common: "Generally well tolerated; occasional injection-site soreness",
    contraindications: "Active malignancy (theoretical, via angiogenesis); pregnancy",
    monitoring: "hs-CRP, CBC, symptom response",
    risk: "Low",
  },
  {
    family: "Copper peptide (GHK-Cu)",
    common: "Mild transient skin irritation (topical); rare at clinical doses",
    contraindications: "Known copper sensitivity; Wilson's disease",
    monitoring: "Serum copper if used at high systemic dose",
    risk: "Low",
  },
  {
    family: "Longevity (NAD+ / MOTS-c / Epitalon)",
    common: "Flushing or warmth with rapid NAD+ infusion; otherwise minimal",
    contraindications: "Active malignancy; pregnancy; limited long-term human data",
    monitoring: "CMP, fasting insulin, HOMA-IR",
    risk: "Low–Moderate",
  },
  {
    family: "Cognitive (Selank / Semax)",
    common: "Rare; no sedation or dependence reported in the literature",
    contraindications: "Pregnancy; limited Western RCT data",
    monitoring: "Symptom-based; no routine lab required",
    risk: "Low",
  },
];

function safetyRiskColor(r: SafetyLevel): string {
  if (r === "Low") return "var(--nx-success)";
  if (r === "Moderate") return "var(--nx-warning)";
  return "var(--nx-amber)";
}

/* ── References — ~20, each with an abstract that expands ─────────────────── */
const references = [
  { num: 1, cite: "Jastreboff AM et al. Tirzepatide once weekly for the treatment of obesity. N Engl J Med. 2022;387(3):205–216.", abstract: "SURMOUNT-1: in 2,539 adults with obesity, tirzepatide produced mean weight reductions of 15–21% over 72 weeks, substantially exceeding placebo and establishing dual GIP/GLP-1 agonism as a leading pharmacotherapy for chronic weight management." },
  { num: 2, cite: "Wilding JPH et al. Once-weekly semaglutide in adults with overweight or obesity. N Engl J Med. 2021;384(11):989–1002.", abstract: "STEP-1: semaglutide 2.4 mg weekly achieved a mean 14.9% body-weight reduction versus 2.4% with placebo across 68 weeks, with improvements in cardiometabolic risk factors and physical functioning." },
  { num: 3, cite: "Aronne LJ et al. Continued treatment with tirzepatide for maintenance of weight reduction in adults with obesity. JAMA. 2024;331(1):38–48.", abstract: "SURMOUNT-4: withdrawal of tirzepatide led to substantial weight regain, while continued treatment maintained and extended weight loss — underscoring that obesity pharmacotherapy is a chronic-disease intervention." },
  { num: 4, cite: "Sigalos JT, Pastuszak AW. The safety and efficacy of growth hormone secretagogues. Sex Med Rev. 2018;6(1):45–53.", abstract: "Review of GH secretagogue pharmacology and clinical evidence, concluding that compounds such as ipamorelin and CJC-1295 raise IGF-1 with a favorable side-effect profile relative to recombinant GH, though long-term data remain limited." },
  { num: 5, cite: "Seiwerth S et al. BPC-157 and standard angiogenic growth factors: gastrointestinal tract healing, wound healing, and angiogenesis. Curr Pharm Des. 2018;24(18):1972–1989.", abstract: "Synthesis of preclinical BPC-157 work showing consistent acceleration of healing across GI mucosa, tendon, muscle, and vasculature, mediated through VEGF and nitric-oxide pathways." },
  { num: 6, cite: "Pickart L, Margolina A. Regenerative and protective actions of the GHK-Cu peptide in the light of the new gene data. Int J Mol Sci. 2018;19(7):1987.", abstract: "GHK-Cu modulates expression of roughly 4,000 human genes toward tissue repair, stimulating collagen, elastin, and antioxidant defenses — the molecular basis for its dermatologic and wound-healing applications." },
  { num: 7, cite: "Yoshino J et al. NAD+ intermediates: the biology and therapeutic potential of NMN and NR. Cell Metab. 2018;27(3):513–528.", abstract: "Comprehensive review of NAD+ decline with age and the therapeutic rationale for repletion via NMN and NR, linking restored NAD+ to sirtuin activity, mitochondrial function, and metabolic health." },
  { num: 8, cite: "Khavinson VKh et al. Effect of Epithalon on the lifespan increase in Drosophila melanogaster. Mech Ageing Dev. 2000;120(1–3):141–149.", abstract: "Early gerontology work reporting that the pineal tetrapeptide Epitalon extended lifespan in a model organism, motivating later studies of telomerase activation and circadian recalibration." },
  { num: 9, cite: "Kim ED et al. Enclomiphene citrate stimulates testosterone production while preventing oligospermia. Fertil Steril. 2013;100(1):119–123.", abstract: "Phase II data showing enclomiphene raised serum testosterone into the normal range while preserving sperm concentration — distinguishing it from exogenous testosterone replacement." },
  { num: 10, cite: "Izvolskaia M et al. Kisspeptin signaling in the reproductive axis: therapeutic implications. Curr Opin Endocrinol Diabetes Obes. 2022;29(3):247–253.", abstract: "Review of kisspeptin's role as a proximal activator of GnRH neurons and its emerging therapeutic potential across reproductive and metabolic indications." },
  { num: 11, cite: "Frías JP et al. Tirzepatide versus semaglutide once weekly in patients with type 2 diabetes (SURPASS-2). N Engl J Med. 2021;385(6):503–515.", abstract: "Head-to-head RCT in which tirzepatide produced greater reductions in HbA1c and body weight than semaglutide 1 mg, with a comparable gastrointestinal tolerability profile." },
  { num: 12, cite: "Falutz J et al. Effects of tesamorelin on visceral adipose tissue. N Engl J Med. 2007;357(23):2359–2370.", abstract: "Pivotal trial showing tesamorelin reduced visceral adipose tissue and improved lipid profiles in patients with HIV-associated lipodystrophy, supporting its FDA approval." },
  { num: 13, cite: "Chang CH et al. Thymosin β4 in tissue repair and regeneration. Ann N Y Acad Sci. 2012;1269:84–91.", abstract: "Review of thymosin β4 (TB-500) mechanisms — actin sequestration, angiogenesis, anti-inflammatory signaling — and its investigation in cardiac and dermal repair." },
  { num: 14, cite: "Sikirić P et al. Stable gastric pentadecapeptide BPC 157 in the treatment of GI tract lesions. Curr Pharm Des. 2011;17(16):1612–1632.", abstract: "Foundational pharmacology review describing BPC-157's cytoprotective and angiomodulatory actions across the gastrointestinal tract and beyond." },
  { num: 15, cite: "Covarrubias AJ et al. NAD+ metabolism and its roles in cellular processes during ageing. Nat Rev Mol Cell Biol. 2021;22(2):119–141.", abstract: "Authoritative review connecting age-related NAD+ decline to mitochondrial dysfunction, impaired DNA repair, and inflammation, framing NAD+ restoration as a longevity target." },
  { num: 16, cite: "Lee C et al. The mitochondrial-derived peptide MOTS-c promotes metabolic homeostasis. Cell Metab. 2015;21(3):443–454.", abstract: "Identification of MOTS-c as a mitochondria-encoded peptide that activates AMPK, regulates insulin sensitivity, and behaves as an exercise mimetic in skeletal muscle." },
  { num: 17, cite: "Kaplan MM et al. Semax modulates BDNF expression and exerts neuroprotective effects. Neurosci Lett. 2006;404(1–2):174–177.", abstract: "Experimental work showing Semax increases BDNF in the hippocampus, supporting its use as a cognition-enhancing and neuroprotective regulatory peptide." },
  { num: 18, cite: "Kozlovskaya MM et al. Selank: anxiolytic and nootropic activity of a tuftsin analog. Bull Exp Biol Med. 2008;146(4):494–497.", abstract: "Preclinical demonstration of Selank's anxiolytic and cognitive effects without sedation or dependence, attributed to GABAergic and BDNF-related mechanisms." },
  { num: 19, cite: "Garvey WT et al. Two-year effects of semaglutide in adults with overweight or obesity (STEP-5). Nat Med. 2022;28(10):2083–2091.", abstract: "Long-term RCT showing semaglutide maintained a mean 15.2% weight reduction at 104 weeks, confirming durability of effect with continued treatment." },
  { num: 20, cite: "Teichman SL et al. Prolonged stimulation of GH and IGF-1 secretion by CJC-1295, a long-acting GHRH analog. J Clin Endocrinol Metab. 2006;91(3):799–805.", abstract: "Pharmacokinetic study demonstrating that a single dose of CJC-1295 sustained elevated GH and IGF-1 for up to two weeks, establishing the long-acting GHRH-analog concept." },
];

/* ── Evidence + safety FAQ (8) ───────────────────────────────────────────── */
const SCIENCE_FAQ = [
  { q: "How strong is the evidence behind these peptides?", a: "It varies by family, and we label it honestly. GLP-1 agonists and copper peptide (GHK-Cu) have established human evidence — Phase III trials or decades of dermatology data. GH secretagogues and cognitive peptides are emerging, with human pharmacology and clinical use but limited large Western RCTs. Tissue-repair and longevity compounds are largely investigational, with strong preclinical data and early human safety reports. The evidence table above shows the tier for each." },
  { q: "Are these peptides FDA-approved?", a: "Some are. Tirzepatide and semaglutide are FDA-approved for chronic weight management; tesamorelin is approved for HIV-associated lipodystrophy. Most other peptides are prescribed off-label and prepared by licensed 503A compounding pharmacies under a valid prescription — the same regulatory framework used for compounded hormones and many ophthalmic drugs." },
  { q: "What does \"off-label\" actually mean here?", a: "Off-label prescribing means a licensed physician prescribes a medication for an indication, dose, or population not specified on the FDA label. It is legal, common, and a standard part of medical practice. Your physician weighs the evidence-to-risk ratio for your specific situation before prescribing." },
  { q: "Why compounded rather than commercially manufactured?", a: "Most peptides used in clinical practice are not sold as FDA-approved commercial drugs. 503A pharmacies compound patient-specific formulations under prescription, allowing customized dose and concentration. Every compound is sterile-prepared under USP-797 standards and batch-tested for identity, potency, and sterility before release." },
  { q: "What are the main safety considerations?", a: "Side effects are compound-specific. GLP-1 agonists commonly cause nausea during titration; GH secretagogues can cause transient water retention or tingling. The most important safety control is the gating: we initiate every protocol after a full blood panel and reassess at intervals, so dosing tracks your physiology rather than a population average. Your physician screens for contraindications before prescribing." },
  { q: "How do you measure whether a protocol is working?", a: "With bloodwork, not vibes. Each protocol defines markers tied to its mechanism — IGF-1 for GH secretagogues, HbA1c and fasting insulin for metabolic stacks, hsCRP for tissue repair. We draw a baseline before the first dose and at intervals, and your physician adjusts based on the trend." },
  { q: "Are the reported outcomes guaranteed?", a: "No. The outcome figures on this page summarize ranges reported in the literature and our internal data; they are not promises. Individual response depends on your baseline labs, adherence, dose, and lifestyle inputs. We track your specific markers precisely so we can tell early whether you're a responder." },
  { q: "Can I see the primary sources?", a: "Yes — the References section above lists twenty primary citations with expandable abstracts, and every peptide detail page carries its own study list with links to PubMed or PMC landing pages. We'd rather you read the literature than take our word for it." },
];

/* ── Research-team tiles ─────────────────────────────────────────────────── */
const RESEARCH_TILES = [
  { icon: FileText, title: "Submit a case study", body: "Clinician or patient with a documented outcome worth writing up? Send it to our medical team for review." },
  { icon: BookOpen, title: "Request a literature review", body: "Want our synthesis of the evidence on a specific compound or indication? We'll compile and share it." },
  { icon: Send, title: "Refer a paper", body: "Found a study we should be reading — or citing? Point us to it and we'll fold it into our evidence base." },
];

function TOCSidebar({ activeId }: { activeId: string }) {
  return (
    <nav aria-label="Page sections" style={{ position: "sticky", top: "7rem", paddingTop: "0.5rem" }}>
      <p style={{ fontFamily: F, fontSize: "9px", fontWeight: 500, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--nx-fg-muted)", marginBottom: "1.25rem" }}>
        CONTENTS
      </p>
      <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        {families.map((f) => {
          const isActive = activeId === f.id;
          return (
            <li key={f.id}>
              <a
                href={`#science-${f.id}`}
                style={{ fontFamily: F, fontSize: "var(--nx-t-sm)", fontWeight: isActive ? 600 : 400, color: isActive ? "var(--nx-cobalt)" : "var(--nx-fg-muted)", textDecoration: "none", display: "flex", alignItems: "center", gap: "0.5rem", transition: "color 0.2s" }}
              >
                {isActive && <span style={{ display: "inline-block", width: "16px", height: "1px", backgroundColor: "var(--nx-cobalt)", flexShrink: 0 }} />}
                {f.slug}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

function tierColor(t: Tier): string {
  return t === "Established" ? "var(--nx-success)" : t === "Emerging" ? "var(--nx-amber)" : "var(--nx-fg-graphite)";
}

/* ── Science FAQ data — drives FAQPage JSON-LD ───────────────── */
const SCIENCE_FAQ_ITEMS = [
  {
    q: "What is peptide therapy?",
    a: "Peptide therapy uses short chains of amino acids — typically 2 to 50 residues — to signal specific cellular functions including tissue repair, hormone secretion, metabolism, sleep regulation, and skin remodeling. Unlike hormone replacement therapy, most peptides instruct the body to optimize its own output rather than substituting exogenous hormones.",
  },
  {
    q: "What is the difference between GLP-1 peptides and GH secretagogues?",
    a: "GLP-1 agonists (tirzepatide, semaglutide) bind incretin receptors in the hypothalamus and gut to lower the body-weight set point and improve insulin response — primarily metabolic action. Growth hormone secretagogues (CJC-1295, Ipamorelin) stimulate pulsatile GH release from the pituitary, raising IGF-1 and driving lean-mass accretion and recovery — primarily anabolic and regenerative action.",
  },
  {
    q: "Is BPC-157 safe?",
    a: "BPC-157 has demonstrated a favorable safety profile in rodent studies and early human case reports, with no serious adverse events reported at standard therapeutic doses. It is not FDA-approved for human use and has not completed large randomized controlled trials. Nexphoria physicians weigh the preclinical evidence against individual patient risk factors before prescribing, and all patients are monitored with quarterly bloodwork.",
  },
  {
    q: "What does the evidence tier system mean?",
    a: "Nexphoria's evidence tiers classify compounds by the depth of their clinical data. 'Established' means FDA approval or multiple Phase III RCTs. 'Emerging' means Phase II human data or robust Phase I safety data. 'Investigational' means strong preclinical data with limited controlled human trials. All tiers may be prescribed off-label when physicians judge the evidence-to-risk ratio appropriate.",
  },
  {
    q: "What is the difference between BPC-157 and GLP-1 for weight loss?",
    a: "GLP-1 agonists directly suppress appetite and improve insulin sensitivity, producing 18–28% body-fat reduction in clinical trials. BPC-157 is not a weight-loss compound — it targets tissue repair, gut-lining regeneration, and joint healing. The two peptides serve different indications and are sometimes combined for patients undergoing aggressive caloric restriction who wish to preserve tissue integrity.",
  },
];

export default function Science() {
  useSeo({
    title: "Peptide science — mechanisms, evidence, and clinical references",
    description: "How GLP-1, BPC-157, GHK-Cu, Epitalon, and NAD+ actually work — receptor binding, downstream signaling, clinical trial data, and the evidence tier for every compound we prescribe.",
    path: "/science",
    jsonLd: [
      webPageJsonLd({
        name: "Nexphoria Peptide Science",
        description: "Mechanisms, evidence tiers, and clinical references for physician-prescribed peptide therapy.",
        path: "/science",
        type: "MedicalWebPage",
      }),
      orgJsonLd(),
      breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Science", path: "/science" }]),
      faqJsonLd(SCIENCE_FAQ_ITEMS),
    ],
  });
  const [activeId, setActiveId] = useState(families[0].id);
  const [openRef, setOpenRef] = useState<number | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY + 200;
      for (const f of families) {
        const el = sectionRefs.current[f.id];
        if (el) {
          const { top, bottom } = el.getBoundingClientRect();
          const absTop = top + window.scrollY;
          const absBottom = bottom + window.scrollY;
          if (scrollY >= absTop && scrollY < absBottom) {
            setActiveId(f.id);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <SiteLayout navVariant="showcase">
      <ScienceHeroDark />

      {/* ── Evidence tier explainer ── */}
      <section style={{ backgroundColor: "var(--nx-bg-dark)", borderTop: "1px solid rgba(255,255,255,0.08)", padding: "4.5rem 0" }} data-testid="section-evidence-tiers">
        <div className="nx-container max-w-screen-xl">
          <Reveal>
            <p style={{ fontFamily: F, fontSize: "var(--nx-t-xs)", fontWeight: 500, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--nx-acid)", marginBottom: "0.75rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <span style={{ display: "inline-block", width: "20px", height: "1px", backgroundColor: "var(--nx-acid)" }} />
              Evidence grading
            </p>
            <h2 style={{ fontFamily: F, fontWeight: 500, fontSize: "var(--nx-t-h2)", color: "var(--nx-ceramic)", lineHeight: 1.15, marginBottom: "0.75rem" }}>
              We grade every claim. <span style={{  }}>Honestly.</span>
            </h2>
            <p style={{ fontFamily: F, fontSize: "var(--nx-t-body)", color: "rgba(246, 249, 252,0.65)", lineHeight: 1.65, maxWidth: "560px", marginBottom: "3rem" }}>
              Every peptide in our catalog carries a tier rating reflecting the depth of its clinical evidence. The framework is the same one our physicians apply when reviewing a new compound for the formulary.
            </p>
          </Reveal>
          <div
            data-testid="evidence-tier-explainer"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px"
            style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.08)" }}
          >
            {[
              {
                tier: "Tier A",
                key: "a",
                color: "var(--nx-acid)",
                strength: 100,
                label: "Established",
                desc: "Multiple Phase III RCTs in humans. FDA approval for at least one indication.",
                examples: [
                  { slug: "tirzepatide", name: "Tirzepatide" },
                  { slug: "tesamorelin", name: "Tesamorelin" },
                  { slug: "ghk-cu", name: "GHK-Cu" },
                ],
              },
              {
                tier: "Tier B+",
                key: "b-plus",
                color: "#7AC1D8",
                strength: 75,
                label: "Emerging \u2014 Strong",
                desc: "Phase II human data, or Phase III in a non-primary indication. Substantial pharmacokinetic evidence.",
                examples: [
                  { slug: "thymosin-a1", name: "Thymosin \u03b1-1" },
                  { slug: "retatrutide", name: "Retatrutide" },
                ],
              },
              {
                tier: "Tier B",
                key: "b",
                color: "#8b8b8b",
                strength: 55,
                label: "Emerging \u2014 Moderate",
                desc: "Robust preclinical data plus early-stage human safety and PK studies. Limited large RCTs.",
                examples: [
                  { slug: "ipamorelin", name: "Ipamorelin" },
                  { slug: "cjc-1295", name: "CJC-1295" },
                  { slug: "semax", name: "Semax" },
                  { slug: "selank", name: "Selank" },
                ],
              },
              {
                tier: "Tier B\u2212",
                key: "b-minus",
                color: "var(--nx-fg-graphite)",
                strength: 35,
                label: "Investigational",
                desc: "Strong animal or in vitro evidence; limited controlled human data. Prescribed at physician discretion after explicit risk/benefit discussion.",
                examples: [
                  { slug: "bpc-157", name: "BPC-157" },
                  { slug: "epitalon", name: "Epitalon" },
                  { slug: "aod-9604", name: "AOD-9604" },
                ],
              },
            ].map((t) => (
              <div
                key={t.tier}
                data-testid={`tier-card-${t.key}`}
                style={{ backgroundColor: "var(--nx-fg)", padding: "2rem 1.75rem", display: "flex", flexDirection: "column" }}
              >
                <p style={{ fontFamily: F, fontSize: "9px", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: t.color, marginBottom: "0.5rem" }}>{t.tier}</p>
                <p style={{ fontFamily: F, fontWeight: 500, fontSize: "var(--nx-t-lg)", color: "var(--nx-ceramic)", marginBottom: "0.875rem", lineHeight: 1.2 }}>{t.label}</p>
                <div
                  aria-hidden="true"
                  style={{
                    height: "3px",
                    width: "100%",
                    background: "rgba(255,255,255,0.06)",
                    borderRadius: "1px",
                    marginBottom: "1rem",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      height: "100%",
                      width: `${t.strength}%`,
                      background: t.color,
                      transition: "width 600ms cubic-bezier(0.16, 1, 0.3, 1)",
                    }}
                  />
                </div>
                <p style={{ fontFamily: F, fontSize: "var(--nx-t-sm)", color: "rgba(246, 249, 252,0.6)", lineHeight: 1.6, marginBottom: "1.25rem", flexGrow: 1 }}>{t.desc}</p>
                <p style={{ fontFamily: F, fontSize: "9px", fontWeight: 500, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(246, 249, 252,0.4)", marginBottom: "0.625rem" }}>In our catalog</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.375rem" }}>
                  {t.examples.map((ex) => (
                    <Link
                      key={ex.slug}
                      href={`/peptides/${ex.slug}`}
                      data-testid={`tier-example-${ex.slug}`}
                    >
                      <a
                        style={{
                          display: "inline-block",
                          padding: "0.3125rem 0.625rem",
                          border: `1px solid ${t.color}55`,
                          borderRadius: "999px",
                          fontFamily: F,
                          fontSize: "var(--nx-t-xs)",
                          fontWeight: 500,
                          color: t.color,
                          textDecoration: "none",
                          background: "transparent",
                          cursor: "pointer",
                          ["--t-color" as string]: t.color,
                        }}
                        className="nx-sci-pill"
                      >
                        {ex.name}
                      </a>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Foundational explainer ── */}
      <section style={{ backgroundColor: "var(--nx-bg-cream)", borderTop: "1px solid var(--nx-border)", padding: "4rem 0" }}>
        <div className="nx-container max-w-screen-xl">
          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "3rem" }} className="md:grid-cols-2">
            <Reveal>
              <div>
                <p style={{ fontFamily: F, fontSize: "var(--nx-t-xs)", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--nx-cobalt)", marginBottom: "0.75rem" }}>WHAT IS A PEPTIDE?</p>
                <p style={{ fontFamily: F, fontSize: "var(--nx-t-body)", color: "var(--nx-fg-graphite)", lineHeight: 1.7, marginBottom: "1rem" }}>
                  A peptide is a chain of 2–50 amino acids linked by peptide bonds. Proteins are larger chains (50+ amino
                  acids); peptides are smaller and more targeted in their receptor interactions. The body produces
                  thousands of endogenous peptides — insulin (51 aa), oxytocin (9 aa), and glucagon (29 aa) are all peptides.
                </p>
                <p style={{ fontFamily: F, fontSize: "var(--nx-t-body)", color: "var(--nx-fg-graphite)", lineHeight: 1.7 }}>
                  Therapeutic peptides either mimic endogenous signaling molecules or modulate the pathways those molecules
                  activate. They are administered subcutaneously, intranasally, or — in limited cases — orally, depending on
                  whether the compound survives gastrointestinal proteolysis.
                </p>
              </div>
            </Reveal>
            <Reveal delay={80}>
              <div>
                <p style={{ fontFamily: F, fontSize: "var(--nx-t-xs)", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--nx-cobalt)", marginBottom: "0.75rem" }}>WHY COMPOUNDING?</p>
                <p style={{ fontFamily: F, fontSize: "var(--nx-t-body)", color: "var(--nx-fg-graphite)", lineHeight: 1.7, marginBottom: "1rem" }}>
                  Most peptides used in clinical practice are not manufactured as FDA-approved commercial drugs. 503A-licensed
                  compounding pharmacies prepare patient-specific formulations under a physician's prescription. This is the
                  same regulatory framework used for compounded hormones, topical preparations, and many ophthalmic drugs.
                </p>
                <p style={{ fontFamily: F, fontSize: "var(--nx-t-body)", color: "var(--nx-fg-graphite)", lineHeight: 1.7 }}>
                  USP-797 sterile compounding standards govern the preparation environment. Batch testing confirms identity,
                  potency, and sterility before any compound is released for patient use.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Editorial pull quote — between explainer and mechanisms ── */}
      <section style={{ backgroundColor: "var(--nx-bg)", borderTop: "1px solid var(--nx-border)", padding: "3.5rem 0" }}>
        <div className="nx-container max-w-screen-xl">
          <Reveal>
            <blockquote style={{ maxWidth: "760px", margin: "0 auto", textAlign: "center" }}>
              <p style={{ fontFamily: F,  fontWeight: 400, fontSize: "var(--nx-t-h3)", color: "var(--nx-fg)", lineHeight: 1.45, marginBottom: "1.25rem" }}>
                "The body already knows how to repair, rebuild, and optimize. Peptides don't replace that intelligence — they restore the signal strength."
              </p>
              <footer style={{ fontFamily: F, fontSize: "var(--nx-t-xs)", fontWeight: 500, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--nx-fg-muted)" }}>
                — Nexphoria Medical Team
              </footer>
            </blockquote>
          </Reveal>
        </div>
      </section>

      {/* ── Mechanisms section — 6 cards ── */}
      <section style={{ backgroundColor: "var(--nx-bg)", borderTop: "1px solid var(--nx-border)", padding: "4.5rem 0" }} data-testid="section-mechanisms">
        <div className="nx-container max-w-screen-xl">
          <Reveal>
            <p style={{ fontFamily: F, fontSize: "var(--nx-t-xs)", fontWeight: 500, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--nx-cobalt)", marginBottom: "0.75rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <span style={{ display: "inline-block", width: "20px", height: "1px", backgroundColor: "var(--nx-cobalt)" }} />
              Mechanisms
            </p>
            <h2 style={{ fontFamily: F, fontWeight: 500, fontSize: "var(--nx-t-h2)", color: "var(--nx-fg)", lineHeight: 1.1, marginBottom: "2.5rem", maxWidth: 720 }}>
              Six ways a peptide tells a cell <span style={{  }}>what to do</span>.
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px" style={{ background: "var(--nx-border)", border: "1px solid var(--nx-border)" }}>
            {mechanismCards.map((m, i) => (
              <Reveal key={m.id} delay={i * 40}>
                <div className="p-7 h-full" style={{ background: "var(--nx-bg)" }} data-testid={`mechanism-card-${m.id}`}>
                  <div style={{ color: "var(--nx-fg)", marginBottom: "1rem" }}>
                    <MolecularGlyph glyph={m.glyph} size={72} title={`${m.title} glyph`} />
                  </div>
                  <h3 style={{ fontFamily: F, fontWeight: 500, fontSize: "var(--nx-t-lg)", color: "var(--nx-fg)", marginBottom: "0.5rem" }}>{m.title}</h3>
                  <p style={{ fontFamily: F, fontSize: "var(--nx-t-xs)", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--nx-amber)", marginBottom: "0.85rem" }}>
                    Receptor · {m.receptor}
                  </p>
                  <p style={{ fontFamily: F, fontSize: "var(--nx-t-base)", color: "var(--nx-fg-graphite)", lineHeight: 1.6 }}>{m.how}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why measurement matters ── */}
      <section style={{ backgroundColor: "var(--nx-bg-dark)", borderTop: "1px solid rgba(255,255,255,0.08)", padding: "5rem 0" }} data-testid="section-measurement">
        <div className="nx-container max-w-screen-xl">
          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "3rem" }} className="md:grid-cols-2">
            <Reveal>
              <p style={{ fontFamily: F, fontSize: "var(--nx-t-xs)", fontWeight: 500, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--nx-acid)", marginBottom: "0.75rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <span style={{ display: "inline-block", width: "20px", height: "1px", backgroundColor: "var(--nx-acid)" }} />
                Why it matters
              </p>
              <h2 style={{ fontFamily: F, fontWeight: 500, fontSize: "var(--nx-t-h2)", color: "var(--nx-ceramic)", lineHeight: 1.12, marginBottom: "1.25rem" }}>
                Science without labs is <span style={{  }}>conjecture</span>.
              </h2>
              <p style={{ fontFamily: F, fontSize: "var(--nx-t-body)", color: "rgba(246, 249, 252,0.7)", lineHeight: 1.7, marginBottom: "1rem" }}>
                Every protocol begins with a 38-biomarker partner-laboratory draw — a clinical baseline that tells your physician what your physiology looks like before the first dose.
              </p>
              <p style={{ fontFamily: F, fontSize: "var(--nx-t-body)", color: "rgba(246, 249, 252,0.7)", lineHeight: 1.7 }}>
                Redrawn every 90 days. Results, not marketing copy, determine whether a protocol continues, adjusts, or stops.
              </p>
            </Reveal>
            <Reveal delay={80}>
              <div style={{ display: "flex", flexDirection: "column", gap: "1px", backgroundColor: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.08)" }}>
                {[
                  { phase: "BASELINE", timing: "Before first dose", desc: "38-biomarker panel establishes your personal reference. Physician designs protocol from your specific numbers." },
                  { phase: "90-DAY DRAW", timing: "After first cycle", desc: "Mechanism markers tracked against your baseline — not a population average. Dose adjusted if response is sub-optimal or any marker moves outside range." },
                  { phase: "180-DAY DRAW", timing: "Active protocol", desc: "Trend line established. Protocol extended, modified, or concluded based on biomarker trajectory and clinical goals." },
                  { phase: "ONGOING", timing: "Every 90 days", desc: "As long as you're active, your labs run quarterly. Data-driven medicine is a loop, not a one-time consult." },
                ].map((row) => (
                  <div key={row.phase} style={{ backgroundColor: "var(--nx-fg)", padding: "1.5rem 1.75rem", display: "flex", gap: "1.5rem", alignItems: "flex-start" }}>
                    <div style={{ flexShrink: 0, minWidth: "90px" }}>
                      <p style={{ fontFamily: F, fontSize: "9px", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--nx-acid)" }}>{row.phase}</p>
                      <p style={{ fontFamily: F, fontSize: "9px", color: "rgba(246, 249, 252,0.4)", marginTop: "0.25rem" }}>{row.timing}</p>
                    </div>
                    <p style={{ fontFamily: F, fontSize: "var(--nx-t-sm)", color: "rgba(246, 249, 252,0.65)", lineHeight: 1.6 }}>{row.desc}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Editorial pull quote — Clarity Unlocks Power ── */}
      <section style={{ backgroundColor: "var(--nx-bg-cream)", borderTop: "1px solid var(--nx-border)", padding: "3.5rem 0" }}>
        <div className="nx-container max-w-screen-xl">
          <Reveal>
            <blockquote style={{ maxWidth: "680px" }}>
              <p style={{ fontFamily: F,  fontWeight: 400, fontSize: "var(--nx-t-h3)", color: "var(--nx-fg)", lineHeight: 1.4, marginBottom: "1rem" }}>
                "Clarity Unlocks Power. Every number on your lab report is a lever. We exist to help you pull the right ones."
              </p>
              <footer style={{ fontFamily: F, fontSize: "var(--nx-t-xs)", fontWeight: 500, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--nx-fg-muted)" }}>
                — Nexphoria, on precision medicine
              </footer>
            </blockquote>
          </Reveal>
        </div>
      </section>

      {/* ── Main content with sticky TOC ── */}
      <div style={{ backgroundColor: "var(--nx-bg)", position: "relative" }}>
        <div className="nx-container max-w-screen-xl" style={{ display: "grid", gridTemplateColumns: "1fr", gap: "4rem", paddingTop: "4rem", paddingBottom: "4rem" }}>
          <aside className="hidden lg:block" style={{ gridColumn: "1", gridRow: "1", width: "200px", flexShrink: 0 }}>
            <TOCSidebar activeId={activeId} />
          </aside>

          <main style={{ minWidth: 0 }}>
            {families.map((family, i) => {
              const bg = i % 2 === 0 ? "var(--nx-bg)" : "var(--nx-bg-cream)";
              return (
                <section
                  key={family.id}
                  id={`science-${family.id}`}
                  ref={(el) => { sectionRefs.current[family.id] = el; }}
                  style={{ backgroundColor: bg, padding: "5rem 0", borderTop: "1px solid var(--nx-border)" }}
                  data-testid={`science-family-${family.slug}`}
                >
                  <Reveal>
                    <p style={{ fontFamily: F, fontSize: "var(--nx-t-xs)", fontWeight: 500, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--nx-cobalt)", marginBottom: "0.75rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                      <span style={{ display: "inline-block", width: "20px", height: "1px", backgroundColor: "var(--nx-cobalt)" }} />
                      {family.category}
                    </p>
                    <h2 style={{ fontFamily: F, fontWeight: 500,  fontSize: "var(--nx-t-h2)", color: "var(--nx-fg)", lineHeight: 1.1, marginBottom: "0.5rem" }}>
                      {family.slug}
                    </h2>
                    <p style={{ fontFamily: F, fontSize: "var(--nx-t-xs)", fontWeight: 500, letterSpacing: "0.1em", color: "var(--nx-cobalt)", marginBottom: "2rem" }}>{family.compounds}</p>

                    <div style={{ marginBottom: "1.75rem" }}>
                      <p style={{ fontFamily: F, fontSize: "var(--nx-t-xs)", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--nx-fg-muted)", marginBottom: "0.5rem" }}>MECHANISM OF ACTION</p>
                      <p style={{ fontFamily: F, fontSize: "var(--nx-t-body)", color: "var(--nx-fg-graphite)", lineHeight: 1.7, maxWidth: "680px" }}>{family.mechanism}</p>
                    </div>

                    <div style={{ marginBottom: "1.75rem" }}>
                      <p style={{ fontFamily: F, fontSize: "var(--nx-t-xs)", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--nx-fg-muted)", marginBottom: "0.5rem" }}>TYPICAL PROTOCOL</p>
                      <p style={{ fontFamily: F, fontSize: "var(--nx-t-body)", color: "var(--nx-fg-graphite)", lineHeight: 1.7, maxWidth: "680px" }}>{family.protocol}</p>
                    </div>

                    <FamilyOutcomesViz outcomes={family.outcomes} />

                    <div style={{ marginBottom: "2.5rem" }}>
                      <p style={{ fontFamily: F, fontSize: "var(--nx-t-xs)", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--nx-fg-muted)", marginBottom: "0.5rem" }}>EVIDENCE STATUS</p>
                      <p style={{ fontFamily: F, fontSize: "var(--nx-t-base)", color: "var(--nx-fg-graphite)", lineHeight: 1.65, maxWidth: "680px",  }}>{family.evidenceNote}</p>
                    </div>

                    <blockquote style={{ borderLeft: "2px solid var(--nx-cobalt)", paddingLeft: "1.5rem", margin: 0 }}>
                      <p style={{ fontFamily: F,  fontWeight: 400, fontSize: "var(--nx-t-xl)", color: "var(--nx-fg)", lineHeight: 1.45 }}>"{family.pullQuote}"</p>
                    </blockquote>
                  </Reveal>
                </section>
              );
            })}

            {/* ── Evidence table ── */}
            <section style={{ padding: "5rem 0", borderTop: "1px solid var(--nx-border)" }} data-testid="section-evidence-table">
              <Reveal>
                <p style={{ fontFamily: F, fontSize: "var(--nx-t-xs)", fontWeight: 500, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--nx-cobalt)", marginBottom: "0.75rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <span style={{ display: "inline-block", width: "20px", height: "1px", backgroundColor: "var(--nx-cobalt)" }} />
                  Evidence at a glance
                </p>
                <h2 style={{ fontFamily: F, fontWeight: 500, fontSize: "var(--nx-t-h2)", color: "var(--nx-fg)", lineHeight: 1.1, marginBottom: "2rem" }}>
                  Where each family stands.
                </h2>
                <div style={{ width: "100%", overflowX: "auto" }}>
                  <table className="border-separate border-spacing-0" style={{ width: "100%", minWidth: 820, background: "var(--nx-bg)", border: "1px solid var(--nx-border)" }} data-testid="table-evidence">
                    <thead>
                      <tr>
                        {["Peptide family", "Mechanism", "Indication", "Evidence tier", "Studies", "FDA status"].map((h) => (
                          <th key={h} style={{ textAlign: "left", padding: "12px 14px", fontFamily: F, fontSize: "var(--nx-t-xs)", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--nx-fg-graphite)", borderBottom: "1px solid var(--nx-border)", background: "var(--nx-bg-cream)" }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {evidenceRows.map((r) => (
                        <tr key={r.family} data-testid={`evidence-row-${r.family.replace(/[^a-z0-9]/gi, "-").toLowerCase().slice(0, 24)}`}>
                          <td style={{ padding: "14px", fontFamily: F, fontSize: "var(--nx-t-base)", fontWeight: 500, color: "var(--nx-fg)", borderBottom: "1px solid var(--nx-border)" }}>{r.family}</td>
                          <td style={{ padding: "14px", fontFamily: F, fontSize: "var(--nx-t-sm)", color: "var(--nx-fg-graphite)", borderBottom: "1px solid var(--nx-border)" }}>{r.mechanism}</td>
                          <td style={{ padding: "14px", fontFamily: F, fontSize: "var(--nx-t-sm)", color: "var(--nx-fg-graphite)", borderBottom: "1px solid var(--nx-border)" }}>{r.indication}</td>
                          <td style={{ padding: "14px", borderBottom: "1px solid var(--nx-border)" }}>
                            <span style={{ fontFamily: F, fontSize: "var(--nx-t-xs)", letterSpacing: "0.1em", textTransform: "uppercase", color: tierColor(r.tier), border: `1px solid ${tierColor(r.tier)}`, padding: "3px 8px", borderRadius: 2, whiteSpace: "nowrap" }}>{r.tier}</span>
                          </td>
                          <td style={{ padding: "14px", fontFamily: F, fontSize: "var(--nx-t-sm)", color: "var(--nx-fg-graphite)", borderBottom: "1px solid var(--nx-border)" }}>{r.studies}</td>
                          <td style={{ padding: "14px", fontFamily: F, fontSize: "var(--nx-t-sm)", color: "var(--nx-fg-graphite)", borderBottom: "1px solid var(--nx-border)" }}>{r.fda}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Reveal>
            </section>

            {/* ── Safety profile data table — AGENT-3 ── */}
            <section style={{ padding: "5rem 0", borderTop: "1px solid var(--nx-border)" }} data-testid="section-safety-profile">
              <Reveal>
                <p style={{ fontFamily: F, fontSize: "var(--nx-t-xs)", fontWeight: 500, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--nx-cobalt)", marginBottom: "0.75rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <span style={{ display: "inline-block", width: "20px", height: "1px", backgroundColor: "var(--nx-cobalt)" }} />
                  SAFETY PROFILE
                </p>
                <h2 style={{ fontFamily: F, fontWeight: 500, fontSize: "var(--nx-t-h2)", color: "var(--nx-fg)", lineHeight: 1.1, marginBottom: "1rem" }}>
                  Side effects, contraindications, monitoring.
                </h2>
                <p style={{ fontFamily: F, fontSize: "var(--nx-t-body)", color: "var(--nx-fg-graphite)", lineHeight: 1.6, maxWidth: 620, marginBottom: "2rem" }}>
                  Every family carries a specific risk profile. Your physician screens for contraindications before prescribing and monitors the listed markers on each 90-day draw.
                </p>
                <div style={{ width: "100%", overflowX: "auto" }}>
                  <table className="border-separate border-spacing-0" style={{ width: "100%", minWidth: 900, background: "var(--nx-bg)", border: "1px solid var(--nx-border)", fontVariantNumeric: "tabular-nums lining-nums", fontFeatureSettings: "'tnum'" }} data-testid="table-safety">
                    <thead>
                      <tr>
                        {["Peptide family", "Common effects", "Key contraindications", "Monitored markers", "Risk"].map((h) => (
                          <th key={h} style={{ textAlign: "left", padding: "12px 14px", fontFamily: F, fontSize: "var(--nx-t-xs)", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--nx-fg-graphite)", borderBottom: "1px solid var(--nx-border)", background: "var(--nx-bg-cream)" }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {SAFETY_ROWS.map((r) => (
                        <tr key={r.family} data-testid={`safety-row-${r.family.replace(/[^a-z0-9]/gi, "-").toLowerCase().slice(0, 24)}`}>
                          <td style={{ padding: "14px", fontFamily: F, fontSize: "var(--nx-t-sm)", fontWeight: 500, color: "var(--nx-fg)", borderBottom: "1px solid var(--nx-border)", verticalAlign: "top" }}>{r.family}</td>
                          <td style={{ padding: "14px", fontFamily: F, fontSize: "var(--nx-t-sm)", color: "var(--nx-fg-graphite)", borderBottom: "1px solid var(--nx-border)", verticalAlign: "top", lineHeight: 1.5 }}>{r.common}</td>
                          <td style={{ padding: "14px", fontFamily: F, fontSize: "var(--nx-t-sm)", color: "var(--nx-fg-graphite)", borderBottom: "1px solid var(--nx-border)", verticalAlign: "top", lineHeight: 1.5 }}>{r.contraindications}</td>
                          <td style={{ padding: "14px", fontFamily: F, fontSize: "var(--nx-t-sm)", color: "var(--nx-fg-graphite)", borderBottom: "1px solid var(--nx-border)", verticalAlign: "top", lineHeight: 1.5 }}>{r.monitoring}</td>
                          <td style={{ padding: "14px", borderBottom: "1px solid var(--nx-border)", verticalAlign: "top" }}>
                            <span style={{ fontFamily: F, fontSize: "var(--nx-t-xs)", letterSpacing: "0.1em", textTransform: "uppercase", color: safetyRiskColor(r.risk), border: `1px solid ${safetyRiskColor(r.risk)}`, padding: "3px 8px", borderRadius: 2, whiteSpace: "nowrap" }}>{r.risk}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p style={{ fontFamily: F, fontSize: "var(--nx-t-xs)", color: "var(--nx-fg-muted)", marginTop: "1.25rem", lineHeight: 1.5, maxWidth: 720 }}>
                  This table is educational and not a substitute for medical advice. Contraindications are screened during your physician intake. Report any new symptom through your secure member portal.
                </p>
              </Reveal>
            </section>

            {/* ── References — accordion ── */}
            <section style={{ padding: "5rem 0", borderTop: "1px solid var(--nx-border)" }} data-testid="section-references">
              <Reveal>
                <p style={{ fontFamily: F, fontSize: "var(--nx-t-xs)", fontWeight: 500, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--nx-cobalt)", marginBottom: "0.75rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <span style={{ display: "inline-block", width: "20px", height: "1px", backgroundColor: "var(--nx-cobalt)" }} />
                  REFERENCES · {references.length}
                </p>
                <h2 style={{ fontFamily: F, fontWeight: 500, fontSize: "var(--nx-t-h2)", color: "var(--nx-fg)", lineHeight: 1.1, marginBottom: "2rem" }}>
                  The primary literature.
                </h2>
                <div>
                  {references.map((ref, i) => (
                    <div key={ref.num} style={{ borderBottom: "1px solid var(--nx-border)" }}>
                      <button
                        onClick={() => setOpenRef(openRef === i ? null : i)}
                        aria-expanded={openRef === i}
                        data-testid={`reference-item-${ref.num}`}
                        style={{ width: "100%", display: "flex", gap: "0.75rem", alignItems: "flex-start", justifyContent: "space-between", padding: "1rem 0", background: "none", border: "none", cursor: "pointer", textAlign: "left" }}
                      >
                        <span style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
                          <span style={{ fontFamily: F, fontSize: "var(--nx-t-xs)", fontWeight: 700, color: "var(--nx-amber)", flexShrink: 0, marginTop: "3px" }}>{ref.num}.</span>
                          <span style={{ fontFamily: F, fontSize: "var(--nx-t-sm)", color: "#1D2228", lineHeight: 1.6 }}>{ref.cite}</span>
                        </span>
                        {openRef === i ? <Minus size={14} style={{ color: "var(--nx-amber)", flexShrink: 0, marginTop: 4 }} /> : <Plus size={14} style={{ color: "var(--nx-fg-muted)", flexShrink: 0, marginTop: 4 }} />}
                      </button>
                      {openRef === i && (
                        <p data-testid={`reference-abstract-${ref.num}`} style={{ fontFamily: F, fontSize: "var(--nx-t-sm)", color: "var(--nx-fg-graphite)", lineHeight: 1.7, paddingLeft: "1.85rem", paddingBottom: "1rem", maxWidth: 720 }}>
                          {ref.abstract}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </Reveal>
            </section>

            {/* ── Questions we're asked most — 8 FAQ ── */}
            <section style={{ padding: "5rem 0", borderTop: "1px solid var(--nx-border)" }} data-testid="section-science-faq">
              <Reveal>
                <p style={{ fontFamily: F, fontSize: "var(--nx-t-xs)", fontWeight: 500, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--nx-cobalt)", marginBottom: "0.75rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <span style={{ display: "inline-block", width: "20px", height: "1px", backgroundColor: "var(--nx-cobalt)" }} />
                  Science FAQ
                </p>
                <h2 style={{ fontFamily: F, fontWeight: 500, fontSize: "var(--nx-t-h2)", color: "var(--nx-fg)", lineHeight: 1.1, marginBottom: "2rem" }}>
                  Evidence & safety.
                </h2>
                <div style={{ maxWidth: 760 }}>
                  {SCIENCE_FAQ.map((item, i) => (
                    <div key={i} style={{ borderBottom: "1px solid var(--nx-border)" }}>
                      <button onClick={() => setOpenFaq(openFaq === i ? null : i)} aria-expanded={openFaq === i} data-testid={`science-faq-item-${i}`} style={{ width: "100%", display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "1rem", padding: "1.25rem 0", background: "none", border: "none", cursor: "pointer", textAlign: "left" }}>
                        <span style={{ fontFamily: F, fontSize: "var(--nx-t-body)", fontWeight: 500, color: "var(--nx-fg)", lineHeight: 1.4 }}>{item.q}</span>
                        {openFaq === i ? <Minus size={16} style={{ color: "var(--nx-cobalt)", flexShrink: 0, marginTop: 4 }} /> : <Plus size={16} style={{ color: "var(--nx-fg-graphite)", flexShrink: 0, marginTop: 4 }} />}
                      </button>
                      {openFaq === i && (
                        <p data-testid={`science-faq-answer-${i}`} style={{ fontFamily: F, fontSize: "var(--nx-t-base)", lineHeight: 1.75, color: "var(--nx-fg-graphite)", maxWidth: 680, paddingBottom: "1.5rem" }}>{item.a}</p>
                      )}
                    </div>
                  ))}
                </div>
              </Reveal>
            </section>
          </main>
        </div>
      </div>

      {/* ── Work with our research team ── */}
      <section style={{ backgroundColor: "var(--nx-bg-cream)", borderTop: "1px solid var(--nx-border)", padding: "4.5rem 0" }} data-testid="section-research-team">
        <div className="nx-container max-w-screen-xl">
          <Reveal>
            <p style={{ fontFamily: F, fontSize: "var(--nx-t-xs)", fontWeight: 500, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--nx-cobalt)", marginBottom: "0.75rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <span style={{ display: "inline-block", width: "20px", height: "1px", backgroundColor: "var(--nx-cobalt)" }} />
              Research team
            </p>
            <h2 style={{ fontFamily: F, fontWeight: 500, fontSize: "var(--nx-t-h2)", color: "var(--nx-fg)", lineHeight: 1.1, marginBottom: "2.5rem", maxWidth: 640 }}>
              The evidence base is a <span style={{  }}>living document</span>.
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px" style={{ background: "var(--nx-border)", border: "1px solid var(--nx-border)" }}>
            {RESEARCH_TILES.map((t, i) => {
              const Icon = t.icon;
              return (
                <Reveal key={t.title} delay={i * 50}>
                  <Link asChild href="/contact">
                    <a className="group block p-7 h-full" style={{ background: "var(--nx-bg)", textDecoration: "none" }} data-testid={`research-tile-${t.title.replace(/[^a-z0-9]/gi, "-").toLowerCase()}`}>
                      <Icon size={22} strokeWidth={1.6} style={{ color: "var(--nx-fg)", marginBottom: 16 }} />
                      <h3 style={{ fontFamily: F, fontWeight: 500, fontSize: "var(--nx-t-lg)", color: "var(--nx-fg)", marginBottom: "0.5rem" }}>{t.title}</h3>
                      <p style={{ fontFamily: F, fontSize: "var(--nx-t-base)", color: "var(--nx-fg-graphite)", lineHeight: 1.6, marginBottom: "1rem" }}>{t.body}</p>
                      <span className="inline-flex items-center gap-1.5 group-hover:gap-2.5 transition-all" style={{ fontFamily: F, fontSize: "var(--nx-t-xs)", letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--nx-fg)" }}>
                        Get in touch <ArrowRight size={12} strokeWidth={2.4} />
                      </span>
                    </a>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Editorial closing image ── */}
      <section style={{ backgroundColor: "var(--nx-bg)", borderTop: "1px solid var(--nx-border)" }}>
        <div className="nx-container max-w-screen-xl nx-section-y md:grid-cols-2" style={{ display: "grid", gridTemplateColumns: "1fr", gap: "3rem", alignItems: "center" }}>
          <Reveal>
            <div style={{ borderRadius: "4px", overflow: "hidden", aspectRatio: "4/3", backgroundColor: "var(--nx-bg-cream)" }}>
              <img src={lifestyleProtocolBinder} alt="Physician protocol binder with anatomical diagrams and peptide research notes" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} loading="lazy" />
            </div>
          </Reveal>
          <Reveal delay={100}>
            <p style={{ fontFamily: F, fontSize: "var(--nx-t-xs)", fontWeight: 500, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--nx-cobalt)", marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <span style={{ display: "inline-block", width: "32px", height: "1px", backgroundColor: "var(--nx-cobalt)" }} />
              The standard
            </p>
            <h2 style={{ fontFamily: F, fontWeight: 500, fontSize: "var(--nx-t-h2)", color: "var(--nx-fg)", lineHeight: 1.1, marginBottom: "0.5rem" }}>Science without labs is conjecture.</h2>
            <h2 style={{ fontFamily: F, fontWeight: 500,  fontSize: "var(--nx-t-h2)", color: "var(--nx-fg)", lineHeight: 1.1, marginBottom: "1.25rem" }}>Your baseline determines your dose.</h2>
            <p style={{ fontFamily: F, fontSize: "var(--nx-t-body)", color: "var(--nx-fg-graphite)", lineHeight: 1.65, maxWidth: "480px" }}>
              Every Nexphoria protocol begins with a 38-biomarker partner-laboratory draw. Mechanism explains what a peptide
              does. Your bloodwork tells your physician what it will do for you specifically.
            </p>
          </Reveal>
        </div>
      </section>

      <ScienceComparisonSection />
      <ScienceFAQSection />
      <FinalCTAStrip
        gender="women"
        title="Backed by mechanism. Prescribed to your baseline."
        sub="Partner-laboratory labs included with every protocol. Physician review after receipt."
      />
    </SiteLayout>
  );
}


// =============================================================
// ScienceHeroDark — Hims-Labs style dark cobalt hero for /science
// =============================================================

function ScienceHeroDark() {
  return (
    <section
      data-testid="science-hero-dark"
      style={{
        position: "relative",
        overflow: "hidden",
        background: "linear-gradient(135deg, var(--nx-fg) 0%, #101010 55%, #1A1A1A 100%)",
        color: "var(--nx-bg)",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      {/* Ambient glow */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(1100px 500px at 88% 18%, rgba(140, 178, 217,0.12), transparent 60%), radial-gradient(700px 400px at 8% 92%, rgba(109, 157, 206,0.14), transparent 65%)",
          pointerEvents: "none",
        }}
      />

      {/* Faint molecular grid backdrop */}
      <svg
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          opacity: 0.14,
          pointerEvents: "none",
        }}
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <pattern id="molgrid" x="0" y="0" width="8" height="8" patternUnits="userSpaceOnUse">
            <circle cx="4" cy="4" r="0.35" fill="var(--nx-acid)" />
            <line x1="4" y1="4" x2="12" y2="4" stroke="rgba(140, 178, 217,0.28)" strokeWidth="0.06" />
            <line x1="4" y1="4" x2="4" y2="12" stroke="rgba(140, 178, 217,0.28)" strokeWidth="0.06" />
          </pattern>
        </defs>
        <rect x="0" y="0" width="100" height="100" fill="url(#molgrid)" />
      </svg>

      <div
        className="nx-container max-w-screen-xl"
        style={{
          position: "relative",
          paddingTop: "clamp(4rem, 9vw, 7rem)",
          paddingBottom: "clamp(3.5rem, 7vw, 5.5rem)",
        }}
      >
        <div
          className="science-hero-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1.15fr 1fr",
            gap: "clamp(2rem, 5vw, 4rem)",
            alignItems: "center",
          }}
        >
          {/* LEFT: copy */}
          <div>
            <p
              style={{
                fontFamily: "'General Sans', system-ui, sans-serif",
                fontSize: "var(--nx-t-xs)",
                fontWeight: 500,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "var(--nx-acid)",
                marginBottom: "1.25rem",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.65rem",
              }}
            >
              <span style={{ display: "inline-block", width: "28px", height: "1px", backgroundColor: "var(--nx-acid)" }} />
              The science
            </p>
            {/* Wikipedia-style definition — lifted verbatim by AI search */}
            <p
              style={{
                fontFamily: "'General Sans', system-ui, sans-serif",
                fontSize: "var(--nx-t-base)",
                lineHeight: 1.6,
                color: "rgba(241, 243, 244,0.55)",
                maxWidth: "38rem",
                marginBottom: "0.875rem",
              }}
            >
              Peptide therapy uses short chains of amino acids to signal specific cellular functions — repair, metabolism, growth, sleep, and skin remodeling — delivering targeted biological instructions at the receptor level.
            </p>
            <h1
              id="science-h1"
              style={{
                fontFamily: "'General Sans', system-ui, sans-serif",
                fontWeight: 500,
                fontSize: "var(--nx-t-display)",
                lineHeight: 1.02,
                letterSpacing: "-0.02em",
                color: "var(--nx-bg)",
                marginBottom: "1.5rem",
              }}
            >
              Molecules that talk<br />
              <span style={{ color: "var(--nx-acid)" }}>to your body.</span>
            </h1>
            <p
              style={{
                fontFamily: "'General Sans', system-ui, sans-serif",
                fontSize: "var(--nx-t-body)",
                lineHeight: 1.6,
                color: "rgba(241, 243, 244,0.72)",
                maxWidth: "38rem",
                marginBottom: "2rem",
              }}
            >
              Peptides are short chains of amino acids that signal repair, restoration, or hormone release. Every protocol we prescribe cites the clinical literature behind it — with an evidence tier from A (RCT) to B− (early human data).
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.6rem", marginBottom: "2.5rem" }}>
              {[
                "38 biomarkers reviewed",
                "Evidence-tiered A→B−",
                "PubMed-linked citations",
                "Reviewed by MDs",
              ].map((chip) => (
                <span
                  key={chip}
                  style={{
                    fontFamily: "'General Sans', system-ui, sans-serif",
                    fontSize: "var(--nx-t-xs)",
                    fontWeight: 500,
                    letterSpacing: "0.02em",
                    padding: "0.4rem 0.85rem",
                    borderRadius: "999px",
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.14)",
                    color: "rgba(241, 243, 244,0.9)",
                  }}
                >
                  {chip}
                </span>
              ))}
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", alignItems: "center" }}>
              <StartIntakeButton variant="primary" source="science-hero">
                Start your assessment
              </StartIntakeButton>
              <a
                href="#section-mechanisms"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector("[data-testid='section-mechanisms']")?.scrollIntoView({ behavior: "smooth" });
                }}
                style={{
                  fontFamily: "'General Sans', system-ui, sans-serif",
                  fontSize: "var(--nx-t-sm)",
                  fontWeight: 600,
                  letterSpacing: "0.04em",
                  textTransform: "uppercase",
                  color: "var(--nx-bg)",
                  border: "1px solid rgba(255,255,255,0.28)",
                  padding: "0.85rem 1.25rem",
                  borderRadius: "999px",
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.35rem",
                  background: "rgba(255,255,255,0.04)",
                }}
              >
                Read mechanisms ↓
              </a>
            </div>
          </div>

          {/* RIGHT: family "molecule" tiles */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: "0.7rem",
            }}
          >
            {[
              { fam: "GLP-1", tag: "Metabolic", grade: "A", accent: "var(--nx-acid)" },
              { fam: "GHS", tag: "Growth axis", grade: "A−", accent: "#7EE0FF" },
              { fam: "BPC-157", tag: "Tissue repair", grade: "B+", accent: "#53A0FF" },
              { fam: "NAD+", tag: "Longevity", grade: "B", accent: "#9BC0FF" },
              { fam: "Enclomiphene", tag: "HPG axis", grade: "A−", accent: "var(--nx-acid)" },
              { fam: "Ipamorelin", tag: "GH pulse", grade: "B+", accent: "#7EE0FF" },
            ].map((tile) => (
              <div
                key={tile.fam}
                style={{
                  aspectRatio: "1",
                  borderRadius: "14px",
                  border: "1px solid rgba(255,255,255,0.10)",
                  background: "rgba(255,255,255,0.04)",
                  padding: "1rem",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {/* Molecular glyph — 6 dots + connectors */}
                <svg
                  aria-hidden
                  width="42"
                  height="42"
                  viewBox="0 0 40 40"
                  style={{ position: "absolute", top: "1rem", right: "1rem", opacity: 0.65 }}
                >
                  <line x1="8" y1="10" x2="20" y2="20" stroke={tile.accent} strokeWidth="0.6" />
                  <line x1="20" y1="20" x2="32" y2="10" stroke={tile.accent} strokeWidth="0.6" />
                  <line x1="20" y1="20" x2="20" y2="32" stroke={tile.accent} strokeWidth="0.6" />
                  <circle cx="8" cy="10" r="2" fill={tile.accent} />
                  <circle cx="32" cy="10" r="2" fill={tile.accent} />
                  <circle cx="20" cy="20" r="2.5" fill={tile.accent} />
                  <circle cx="20" cy="32" r="2" fill={tile.accent} />
                </svg>

                <div
                  style={{
                    fontFamily: "'General Sans', system-ui, sans-serif",
                    fontSize: "9px",
                    fontWeight: 600,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: tile.accent,
                    marginTop: "auto",
                    marginBottom: "0.3rem",
                  }}
                >
                  Grade {tile.grade}
                </div>
                <div
                  style={{
                    fontFamily: "'General Sans', system-ui, sans-serif",
                    fontSize: "var(--nx-t-lg)",
                    fontWeight: 600,
                    color: "var(--nx-bg)",
                    lineHeight: 1.1,
                    marginBottom: "0.15rem",
                  }}
                >
                  {tile.fam}
                </div>
                <div
                  style={{
                    fontFamily: "'General Sans', system-ui, sans-serif",
                    fontSize: "var(--nx-t-xs)",
                    fontWeight: 500,
                    color: "rgba(241, 243, 244,0.6)",
                    letterSpacing: "0.02em",
                  }}
                >
                  {tile.tag}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom stat strip */}
      <div
        style={{
          position: "relative",
          borderTop: "1px solid rgba(255,255,255,0.08)",
          background: "rgba(21, 24, 28,0.20)",
        }}
      >
        <div
          className="nx-container max-w-screen-xl"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "1rem",
            padding: "1.5rem 0",
          }}
        >
          {[
            { k: "6", v: "Peptide families" },
            { k: "38", v: "Biomarkers tracked" },
            { k: "A → B−", v: "Evidence tiering" },
            { k: "80+", v: "Cited studies" },
          ].map((s) => (
            <div key={s.v} style={{ textAlign: "center" }}>
              <div
                style={{
                  fontFamily: "'General Sans', system-ui, sans-serif",
                  fontWeight: 600,
                  fontSize: "clamp(1.4rem, 2.6vw, 2rem)",
                  color: "var(--nx-bg)",
                  lineHeight: 1,
                  marginBottom: "0.35rem",
                }}
              >
                {s.k}
              </div>
              <div
                style={{
                  fontFamily: "'General Sans', system-ui, sans-serif",
                  fontSize: "var(--nx-t-xs)",
                  fontWeight: 500,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "rgba(241, 243, 244,0.55)",
                }}
              >
                {s.v}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .science-hero-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

/* ── SCIENCE COMPARISON TABLE — peptide family best-for guide ────── */
const PEPTIDE_FAMILY_COMPARISON = [
  { family: "GLP-1 / GIP Agonists", bestFor: "Fat loss, blood sugar control, appetite regulation", avoidIf: "Personal/family history of MEN-2, thyroid cancer, pancreatitis", verdict: "Gold standard for metabolic weight loss with physician titration" },
  { family: "GH Secretagogues", bestFor: "Lean mass gain, recovery, IGF-1 optimization, anti-aging", avoidIf: "Active malignancy, acromegaly, untreated diabetes, insulin resistance", verdict: "Best for body composition in adults 35+ with confirmed low IGF-1" },
  { family: "Tissue Repair (BPC-157 / TB-500)", bestFor: "Tendon, ligament, gut, and soft-tissue healing post-injury", avoidIf: "Active cancer, pregnancy, pro-angiogenic risk, WADA testing", verdict: "First-choice for athletes and post-surgical patients with acute injuries" },
  { family: "Copper Peptide (GHK-Cu)", bestFor: "Skin elasticity, collagen synthesis, wound healing, hair density", avoidIf: "Wilson's disease, copper sensitivity, confirmed copper overload", verdict: "Safe and well-studied for dermal and wound-healing indications" },
  { family: "Longevity (NAD+ / MOTS-c / Epitalon)", bestFor: "Mitochondrial function, biological age, telomere support", avoidIf: "Active malignancy (AMPK caution), limited data in pregnancy", verdict: "Strong rationale for adults 45+ with measurable metabolic decline" },
  { family: "Cognitive (Selank / Semax)", bestFor: "Focus, anxiety reduction, BDNF elevation, stress resilience", avoidIf: "Active seizure disorder, concurrent MAOI use, pregnancy", verdict: "Best for high-performers with burnout or chronic cognitive load" },
];

function ScienceComparisonSection() {
  return (
    <section
      aria-labelledby="science-comparison-heading"
      style={{
        backgroundColor: "var(--nx-bg)",
        borderTop: "1px solid var(--nx-border)",
        padding: "clamp(4rem, 8vw, 6rem) 0",
      }}
    >
      <div className="nx-container" style={{ maxWidth: "1080px" }}>
        <Reveal>
          <p style={{ fontFamily: FONT, fontSize: "var(--nx-t-xs)", fontWeight: 500, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--nx-cobalt)", marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <span style={{ display: "inline-block", width: "32px", height: "1px", backgroundColor: "var(--nx-cobalt)" }} />
            Peptide family guide
          </p>
          <h2
            id="science-comparison-heading"
            style={{ fontFamily: FONT, fontWeight: 600, fontSize: "var(--nx-t-h2)", color: "var(--nx-fg)", lineHeight: 1.1, letterSpacing: "-0.02em", marginBottom: "0.75rem" }}
          >
            Best for · Avoid if · Verdict.
          </h2>
          <p style={{ fontFamily: FONT, fontSize: "var(--nx-t-body)", color: "var(--nx-fg-muted)", lineHeight: 1.65, marginBottom: "2.5rem", maxWidth: "560px" }}>
            A physician-oriented summary of each peptide family's indication, contraindications, and clinical verdict. Your physician will review your labs before prescribing any compound.
          </p>
        </Reveal>
        <Reveal delay={60}>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: FONT, fontSize: "var(--nx-t-sm)" }}>
              <caption style={{ captionSide: "bottom", textAlign: "left", paddingTop: "0.75rem", fontSize: "var(--nx-t-xs)", color: "var(--nx-fg-muted)" }}>
                All compounds require physician prescription and quarterly biomarker monitoring. Evidence tiers vary; see individual compound pages for citations.
              </caption>
              <thead>
                <tr style={{ backgroundColor: "var(--nx-cobalt)" }}>
                  <th scope="col" style={{ padding: "0.875rem 1rem", textAlign: "left", color: "rgba(255,255,255,0.65)", fontWeight: 600, fontSize: "var(--nx-t-xs)", letterSpacing: "0.12em", textTransform: "uppercase" }}>Peptide Family</th>
                  <th scope="col" style={{ padding: "0.875rem 1rem", textAlign: "left", color: "var(--nx-ceramic)", fontWeight: 700, fontSize: "var(--nx-t-xs)", letterSpacing: "0.12em", textTransform: "uppercase" }}>Best For</th>
                  <th scope="col" style={{ padding: "0.875rem 1rem", textAlign: "left", color: "rgba(255,255,255,0.65)", fontWeight: 600, fontSize: "var(--nx-t-xs)", letterSpacing: "0.12em", textTransform: "uppercase" }}>Avoid If</th>
                  <th scope="col" style={{ padding: "0.875rem 1rem", textAlign: "left", color: "rgba(255,255,255,0.65)", fontWeight: 600, fontSize: "var(--nx-t-xs)", letterSpacing: "0.12em", textTransform: "uppercase" }}>Verdict</th>
                </tr>
              </thead>
              <tbody>
                {PEPTIDE_FAMILY_COMPARISON.map((row, i) => (
                  <tr key={row.family} style={{ backgroundColor: i % 2 === 0 ? "var(--nx-ceramic)" : "var(--nx-bg-cream)", borderBottom: "1px solid var(--nx-border)" }}>
                    <th scope="row" style={{ padding: "0.875rem 1rem", textAlign: "left", fontWeight: 600, color: "var(--nx-cobalt)", verticalAlign: "top" }}>{row.family}</th>
                    <td style={{ padding: "0.875rem 1rem", color: "var(--nx-fg)", verticalAlign: "top" }}>{row.bestFor}</td>
                    <td style={{ padding: "0.875rem 1rem", color: "var(--nx-fg-muted)", verticalAlign: "top" }}>{row.avoidIf}</td>
                    <td style={{ padding: "0.875rem 1rem", fontWeight: 500, color: "var(--nx-fg)", verticalAlign: "top" }}>{row.verdict}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ── SCIENCE FAQ SECTION ───────────────────────────────────────────── */
function ScienceFAQSection() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section
      aria-labelledby="science-faq-heading"
      style={{ backgroundColor: "var(--nx-bg-cream)", borderTop: "1px solid var(--nx-border)", padding: "clamp(4rem, 8vw, 6rem) 0" }}
    >
      <div className="nx-container" style={{ maxWidth: "740px" }}>
        <p style={{ fontFamily: FONT, fontSize: "var(--nx-t-xs)", fontWeight: 500, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--nx-cobalt)", marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <span style={{ display: "inline-block", width: "32px", height: "1px", backgroundColor: "var(--nx-cobalt)" }} />
          Science questions
        </p>
        <h2 id="science-faq-heading" style={{ fontFamily: FONT, fontWeight: 600, fontSize: "var(--nx-t-h2)", color: "var(--nx-fg)", lineHeight: 1.1, letterSpacing: "-0.02em", marginBottom: "2.5rem" }}>
          Common questions about peptide science.
        </h2>
        <div>
          {SCIENCE_FAQ_ITEMS.map((item, i) => (
            <div key={i} style={{ borderTop: "1px solid var(--nx-border)", padding: "1.25rem 0" }}>
              <button
                onClick={() => setOpen(open === i ? null : i)}
                aria-expanded={open === i}
                style={{ width: "100%", background: "none", border: "none", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "1rem", textAlign: "left", padding: 0 }}
              >
                <span style={{ fontFamily: FONT, fontWeight: 600, fontSize: "var(--nx-t-body)", color: "var(--nx-fg)", lineHeight: 1.3 }}>{item.q}</span>
                <span style={{ flexShrink: 0, fontFamily: FONT, fontSize: "var(--nx-t-lg)", fontWeight: 300, color: "var(--nx-cobalt)", lineHeight: 1 }}>{open === i ? "−" : "+"}</span>
              </button>
              {open === i && (
                <p style={{ fontFamily: FONT, fontSize: "var(--nx-t-body)", color: "var(--nx-fg-muted)", lineHeight: 1.7, marginTop: "0.875rem" }}>{item.a}</p>
              )}
            </div>
          ))}
          <div style={{ borderTop: "1px solid var(--nx-border)" }} />
        </div>
      </div>
    </section>
  );
}
