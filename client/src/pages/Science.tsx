import { useState, useEffect, useRef } from "react";
import { SiteLayout } from "@/components/SiteLayout";
import { FinalCTAStrip } from "@/components/FinalCTAStrip";
import { Reveal } from "@/components/Reveal";

import editorialPharmacy from "@/assets/brand/editorial-pharmacy.jpg";
import editorialBloodwork from "@/assets/brand/editorial-bloodwork.jpg";

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

const references = [
  { num: 1, cite: "Jastreboff AM et al. Tirzepatide once weekly for the treatment of obesity. N Engl J Med. 2022;387(3):205–216." },
  { num: 2, cite: "Wilding JPH et al. Once-weekly semaglutide in adults with overweight or obesity. N Engl J Med. 2021;384(11):989–1002." },
  { num: 3, cite: "Aronne LJ et al. Continued treatment with tirzepatide for maintenance of weight reduction in adults with obesity. JAMA. 2024;331(1):38–48." },
  { num: 4, cite: "Sigalos JT, Pastuszak AW. The safety and efficacy of growth hormone secretagogues. Sex Med Rev. 2018;6(1):45–53." },
  { num: 5, cite: "Seiwerth S et al. BPC-157 and standard angiogenic growth factors: gastrointestinal tract healing, wound healing, and angiogenesis. Curr Pharm Des. 2018;24(18):1972–1989." },
  { num: 6, cite: "Pickart L, Margolina A. Regenerative and protective actions of the GHK-Cu peptide in the light of the new gene data. Int J Mol Sci. 2018;19(7):1987." },
  { num: 7, cite: "Yoshino J et al. NAD+ intermediates: the biology and therapeutic potential of NMN and NR. Cell Metab. 2018;27(3):513–528." },
  { num: 8, cite: "Khavinson VKh et al. Effect of Epithalon on the lifespan increase in Drosophila melanogaster. Mech Ageing Dev. 2000;120(1–3):141–149." },
  { num: 9, cite: "Kim ED et al. Enclomiphene citrate stimulates testosterone production while preventing oligospermia. Fertil Steril. 2013;100(1):119–123." },
  { num: 10, cite: "Izvolskaia M et al. Kisspeptin signaling in the reproductive axis: therapeutic implications. Curr Opin Endocrinol Diabetes Obes. 2022;29(3):247–253." },
];

function TOCSidebar({ activeId }: { activeId: string }) {
  return (
    <nav
      aria-label="Page sections"
      style={{
        position: "sticky",
        top: "7rem",
        paddingTop: "0.5rem",
      }}
    >
      <p
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "9px",
          fontWeight: 500,
          letterSpacing: "0.16em",
          textTransform: "uppercase",
          color: "var(--nx-fg-muted)",
          marginBottom: "1.25rem",
        }}
      >
        CONTENTS
      </p>
      <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        {families.map((f) => {
          const isActive = activeId === f.id;
          return (
            <li key={f.id}>
              <a
                href={`#science-${f.id}`}
                style={{
                  fontFamily: "'Inter Tight', sans-serif",
                  fontSize: "13px",
                  fontWeight: isActive ? 600 : 400,
                  color: isActive ? "var(--nx-cobalt)" : "var(--nx-fg-muted)",
                  textDecoration: "none",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  transition: "color 0.2s",
                  paddingLeft: isActive ? "0" : "0",
                }}
              >
                {isActive && (
                  <span
                    style={{
                      display: "inline-block",
                      width: "16px",
                      height: "1px",
                      backgroundColor: "var(--nx-cobalt)",
                      flexShrink: 0,
                    }}
                  />
                )}
                {f.slug}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default function Science() {
  const [activeId, setActiveId] = useState(families[0].id);
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
    <SiteLayout navVariant="gate">
      {/* ── Hero ── */}
      <section
        className="py-32 md:py-40"
        style={{ backgroundColor: "var(--nx-bg)", borderBottom: "1px solid var(--nx-border)" }}
      >
        <div className="nx-container max-w-screen-xl">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr",
              gap: "3rem",
              alignItems: "center",
            }}
            className="md:grid-cols-2"
          >
            <Reveal>
              <p
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "11px",
                  fontWeight: 500,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "var(--nx-cobalt)",
                  marginBottom: "1.25rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                }}
              >
                <span style={{ display: "inline-block", width: "32px", height: "1px", backgroundColor: "var(--nx-cobalt)" }} />
                THE SCIENCE
              </p>
              <h1
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontWeight: 500,
                  fontSize: "clamp(3rem, 6vw, 5rem)",
                  color: "var(--nx-fg)",
                  lineHeight: 1.05,
                  marginBottom: "0.5rem",
                }}
              >
                What peptides are.
              </h1>
              <h1
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontWeight: 500,
                  fontStyle: "italic",
                  fontSize: "clamp(3rem, 6vw, 5rem)",
                  color: "var(--nx-fg)",
                  lineHeight: 1.05,
                  marginBottom: "1.5rem",
                }}
              >
                What the evidence shows.
              </h1>
              <p
                style={{
                  fontFamily: "'Inter Tight', sans-serif",
                  fontSize: "clamp(1rem, 2vw, 1.0625rem)",
                  color: "#4A4A4A",
                  lineHeight: 1.65,
                  maxWidth: "520px",
                }}
              >
                Peptides are short amino-acid chains that act as biological signaling molecules.
                They bind specific receptors and instruct cells — to release a hormone, repair
                a tissue, or modulate an inflammatory pathway. This page covers six peptide
                families, each with distinct mechanisms, clinical protocols, and research evidence.
              </p>
            </Reveal>
            <Reveal delay={120}>
              <div
                style={{
                  borderRadius: "4px",
                  overflow: "hidden",
                  aspectRatio: "4/3",
                  backgroundColor: "var(--nx-bg-cream)",
                }}
              >
                <img
                  src={editorialBloodwork}
                  alt="Precision in peptide medicine"
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                  loading="eager"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Foundational explainer ── */}
      <section
        style={{
          backgroundColor: "var(--nx-bg-cream)",
          borderTop: "1px solid var(--nx-border)",
          padding: "4rem 0",
        }}
      >
        <div className="nx-container max-w-screen-xl">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr",
              gap: "3rem",
            }}
            className="md:grid-cols-2"
          >
            <Reveal>
              <div>
                <p
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "10px",
                    fontWeight: 700,
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: "var(--nx-cobalt)",
                    marginBottom: "0.75rem",
                  }}
                >
                  WHAT IS A PEPTIDE?
                </p>
                <p
                  style={{
                    fontFamily: "'Inter Tight', sans-serif",
                    fontSize: "1.0625rem",
                    color: "#4A4A4A",
                    lineHeight: 1.7,
                    marginBottom: "1rem",
                  }}
                >
                  A peptide is a chain of 2–50 amino acids linked by peptide bonds. Proteins
                  are larger chains (50+ amino acids); peptides are smaller and more targeted
                  in their receptor interactions. The body produces thousands of endogenous
                  peptides — insulin (51 aa), oxytocin (9 aa), and glucagon (29 aa) are all peptides.
                </p>
                <p
                  style={{
                    fontFamily: "'Inter Tight', sans-serif",
                    fontSize: "1.0625rem",
                    color: "#4A4A4A",
                    lineHeight: 1.7,
                  }}
                >
                  Therapeutic peptides either mimic endogenous signaling molecules or modulate
                  the pathways those molecules activate. They are administered subcutaneously,
                  intranasally, or — in limited cases — orally, depending on whether the compound
                  survives gastrointestinal proteolysis.
                </p>
              </div>
            </Reveal>
            <Reveal delay={80}>
              <div>
                <p
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "10px",
                    fontWeight: 700,
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: "var(--nx-cobalt)",
                    marginBottom: "0.75rem",
                  }}
                >
                  WHY COMPOUNDING?
                </p>
                <p
                  style={{
                    fontFamily: "'Inter Tight', sans-serif",
                    fontSize: "1.0625rem",
                    color: "#4A4A4A",
                    lineHeight: 1.7,
                    marginBottom: "1rem",
                  }}
                >
                  Most peptides used in clinical practice are not manufactured as FDA-approved
                  commercial drugs. 503A-licensed compounding pharmacies prepare patient-specific
                  formulations under a physician's prescription. This is the same regulatory
                  framework used for compounded hormones, topical preparations, and many
                  ophthalmic drugs.
                </p>
                <p
                  style={{
                    fontFamily: "'Inter Tight', sans-serif",
                    fontSize: "1.0625rem",
                    color: "#4A4A4A",
                    lineHeight: 1.7,
                  }}
                >
                  USP-797 sterile compounding standards govern the preparation environment.
                  Batch testing confirms identity, potency, and sterility before any compound
                  is released for patient use.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Main content with sticky TOC ── */}
      <div
        style={{
          backgroundColor: "var(--nx-bg)",
          position: "relative",
        }}
      >
        <div
          className="nx-container max-w-screen-xl"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "4rem",
            paddingTop: "4rem",
            paddingBottom: "4rem",
          }}
        >
          {/* TOC — hidden on mobile, sticky on desktop */}
          <aside
            className="hidden lg:block"
            style={{
              gridColumn: "1",
              gridRow: "1",
              width: "200px",
              flexShrink: 0,
            }}
          >
            <TOCSidebar activeId={activeId} />
          </aside>

          {/* Peptide sections */}
          <main style={{ minWidth: 0 }}>
            {families.map((family, i) => {
              const bg = i % 2 === 0 ? "var(--nx-bg)" : "var(--nx-bg-cream)";
              return (
                <section
                  key={family.id}
                  id={`science-${family.id}`}
                  ref={(el) => { sectionRefs.current[family.id] = el; }}
                  style={{
                    backgroundColor: bg,
                    padding: "5rem 0",
                    borderTop: "1px solid var(--nx-border)",
                  }}
                  data-testid={`science-family-${family.slug}`}
                >
                  <Reveal>
                    <p
                      style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: "10px",
                        fontWeight: 500,
                        letterSpacing: "0.15em",
                        textTransform: "uppercase",
                        color: "var(--nx-cobalt)",
                        marginBottom: "0.75rem",
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                      }}
                    >
                      <span style={{ display: "inline-block", width: "20px", height: "1px", backgroundColor: "var(--nx-cobalt)" }} />
                      {family.category}
                    </p>
                    <h2
                      style={{
                        fontFamily: "'Playfair Display', Georgia, serif",
                        fontWeight: 500,
                        fontStyle: "italic",
                        fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
                        color: "var(--nx-fg)",
                        lineHeight: 1.1,
                        marginBottom: "0.5rem",
                      }}
                    >
                      {family.slug}
                    </h2>
                    <p
                      style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: "11px",
                        fontWeight: 500,
                        letterSpacing: "0.1em",
                        color: "var(--nx-cobalt)",
                        marginBottom: "2rem",
                      }}
                    >
                      {family.compounds}
                    </p>

                    {/* Mechanism */}
                    <div style={{ marginBottom: "1.75rem" }}>
                      <p
                        style={{
                          fontFamily: "'Inter Tight', sans-serif",
                          fontSize: "10px",
                          fontWeight: 700,
                          letterSpacing: "0.12em",
                          textTransform: "uppercase",
                          color: "var(--nx-fg-muted)",
                          marginBottom: "0.5rem",
                        }}
                      >
                        MECHANISM OF ACTION
                      </p>
                      <p
                        style={{
                          fontFamily: "'Inter Tight', sans-serif",
                          fontSize: "1.0625rem",
                          color: "#4A4A4A",
                          lineHeight: 1.7,
                          maxWidth: "680px",
                        }}
                      >
                        {family.mechanism}
                      </p>
                    </div>

                    {/* Protocol */}
                    <div style={{ marginBottom: "1.75rem" }}>
                      <p
                        style={{
                          fontFamily: "'Inter Tight', sans-serif",
                          fontSize: "10px",
                          fontWeight: 700,
                          letterSpacing: "0.12em",
                          textTransform: "uppercase",
                          color: "var(--nx-fg-muted)",
                          marginBottom: "0.5rem",
                        }}
                      >
                        TYPICAL PROTOCOL
                      </p>
                      <p
                        style={{
                          fontFamily: "'Inter Tight', sans-serif",
                          fontSize: "1.0625rem",
                          color: "#4A4A4A",
                          lineHeight: 1.7,
                          maxWidth: "680px",
                        }}
                      >
                        {family.protocol}
                      </p>
                    </div>

                    {/* Outcomes chip */}
                    <div
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "1rem",
                        backgroundColor: "var(--nx-cobalt-soft)",
                        border: "1px solid #C5D4C2",
                        borderRadius: "4px",
                        padding: "0.875rem 1.25rem",
                        marginBottom: "1.75rem",
                      }}
                    >
                      <p
                        style={{
                          fontFamily: "'JetBrains Mono', monospace",
                          fontSize: "9px",
                          fontWeight: 700,
                          letterSpacing: "0.14em",
                          textTransform: "uppercase",
                          color: "var(--nx-cobalt)",
                          whiteSpace: "nowrap",
                        }}
                      >
                        REPORTED OUTCOMES
                      </p>
                      <div
                        style={{ width: "1px", height: "16px", backgroundColor: "#C5D4C2" }}
                      />
                      <p
                        style={{
                          fontFamily: "'Inter Tight', sans-serif",
                          fontSize: "13px",
                          fontWeight: 600,
                          color: "var(--nx-fg)",
                        }}
                      >
                        {family.outcomes}
                      </p>
                    </div>

                    {/* Evidence note */}
                    <div style={{ marginBottom: "2.5rem" }}>
                      <p
                        style={{
                          fontFamily: "'Inter Tight', sans-serif",
                          fontSize: "10px",
                          fontWeight: 700,
                          letterSpacing: "0.12em",
                          textTransform: "uppercase",
                          color: "var(--nx-fg-muted)",
                          marginBottom: "0.5rem",
                        }}
                      >
                        EVIDENCE STATUS
                      </p>
                      <p
                        style={{
                          fontFamily: "'Inter Tight', sans-serif",
                          fontSize: "0.9375rem",
                          color: "#4A4A4A",
                          lineHeight: 1.65,
                          maxWidth: "680px",
                          fontStyle: "italic",
                        }}
                      >
                        {family.evidenceNote}
                      </p>
                    </div>

                    {/* Pull quote */}
                    <blockquote
                      style={{
                        borderLeft: "2px solid var(--nx-cobalt)",
                        paddingLeft: "1.5rem",
                        margin: 0,
                      }}
                    >
                      <p
                        style={{
                          fontFamily: "'Playfair Display', Georgia, serif",
                          fontStyle: "italic",
                          fontWeight: 400,
                          fontSize: "clamp(1.25rem, 2.5vw, 1.625rem)",
                          color: "var(--nx-fg)",
                          lineHeight: 1.45,
                        }}
                      >
                        "{family.pullQuote}"
                      </p>
                    </blockquote>
                  </Reveal>
                </section>
              );
            })}

            {/* References */}
            <section
              style={{
                padding: "5rem 0",
                borderTop: "1px solid var(--nx-border)",
              }}
            >
              <Reveal>
                <p
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "10px",
                    fontWeight: 500,
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: "var(--nx-cobalt)",
                    marginBottom: "1.5rem",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                  }}
                >
                  <span style={{ display: "inline-block", width: "20px", height: "1px", backgroundColor: "var(--nx-cobalt)" }} />
                  REFERENCES
                </p>
                <ol
                  style={{
                    listStyle: "none",
                    padding: 0,
                    margin: 0,
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.75rem",
                  }}
                >
                  {references.map((ref) => (
                    <li
                      key={ref.num}
                      style={{
                        display: "flex",
                        gap: "0.75rem",
                        alignItems: "flex-start",
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "'JetBrains Mono', monospace",
                          fontSize: "10px",
                          fontWeight: 700,
                          color: "#8B5A2B",
                          flexShrink: 0,
                          marginTop: "3px",
                        }}
                      >
                        {ref.num}.
                      </span>
                      <p
                        style={{
                          fontFamily: "'Inter Tight', sans-serif",
                          fontSize: "13px",
                          color: "#4A4A4A",
                          lineHeight: 1.6,
                        }}
                      >
                        {ref.cite}
                      </p>
                    </li>
                  ))}
                </ol>
              </Reveal>
            </section>
          </main>
        </div>
      </div>

      {/* ── Editorial closing image ── */}
      <section
        style={{
          backgroundColor: "var(--nx-bg-cream)",
          borderTop: "1px solid var(--nx-border)",
        }}
      >
        <div
          className="nx-container max-w-screen-xl py-24 md:py-32 md:grid-cols-2"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "3rem",
            alignItems: "center",
          }}
        >
          <Reveal>
            <div
              style={{
                borderRadius: "4px",
                overflow: "hidden",
                aspectRatio: "4/3",
                backgroundColor: "var(--nx-bg-cream)",
              }}
            >
              <img
                src={editorialPharmacy}
                alt="Nexphoria 503A compounding pharmacy"
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                loading="lazy"
              />
            </div>
          </Reveal>
          <Reveal delay={100}>
            <p
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "11px",
                fontWeight: 500,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "var(--nx-cobalt)",
                marginBottom: "1rem",
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
              }}
            >
              <span style={{ display: "inline-block", width: "32px", height: "1px", backgroundColor: "var(--nx-cobalt)" }} />
              THE STANDARD
            </p>
            <h2
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontWeight: 500,
                fontSize: "clamp(1.875rem, 3.5vw, 2.75rem)",
                color: "var(--nx-fg)",
                lineHeight: 1.1,
                marginBottom: "0.5rem",
              }}
            >
              Science without labs is conjecture.
            </h2>
            <h2
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontWeight: 500,
                fontStyle: "italic",
                fontSize: "clamp(1.875rem, 3.5vw, 2.75rem)",
                color: "var(--nx-fg)",
                lineHeight: 1.1,
                marginBottom: "1.25rem",
              }}
            >
              Your baseline determines your dose.
            </h2>
            <p
              style={{
                fontFamily: "'Inter Tight', sans-serif",
                fontSize: "1.0625rem",
                color: "#4A4A4A",
                lineHeight: 1.65,
                maxWidth: "480px",
              }}
            >
              Every Nexphoria protocol begins with a 38-biomarker Quest Diagnostics draw.
              Mechanism explains what a peptide does. Your bloodwork tells your physician
              what it will do for you specifically.
            </p>
          </Reveal>
        </div>
      </section>

      <FinalCTAStrip
        gender="women"
        title="Backed by mechanism. Prescribed to your baseline."
        sub="Quest Diagnostics labs included with every protocol. Physician review within 48 hours."
      />
    </SiteLayout>
  );
}
