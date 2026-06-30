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
      "Glucagon-like peptide-1 receptor agonists suppress appetite via the hypothalamus and slow gastric emptying. Tirzepatide adds GIP agonism, producing superior fat loss without proportional lean mass reduction. Both are compounded as subcutaneous injectables.",
    protocol: "1–2× weekly SC injection. 12–24-week cycles. Dose titration weeks 1–4.",
    outcomes: "Body fat −18–28% · A1C −0.8–1.4 pts · Waist −3–5 in",
    pullQuote: "GLP-1 agonists don't just suppress appetite — they recalibrate the hypothalamic set point for body weight.",
  },
  {
    id: "ghs",
    slug: "Growth Hormone Secretagogues",
    compounds: "CJC-1295 · Ipamorelin · Tesamorelin · Sermorelin",
    category: "Growth & Hormone",
    mechanism:
      "GHRH analogues and ghrelin mimetics that stimulate pulsatile GH release from the pituitary — matching the body's natural secretion pattern. Unlike exogenous HGH, GHS compounds do not suppress endogenous production. IGF-1 elevation drives lean mass, bone density, and recovery.",
    protocol: "Nightly SC injection (5×/week). 12–20-week cycles. Best with fasting 2h pre/post.",
    outcomes: "IGF-1 +40–60% · Lean mass +8–12 lb · VO2 max +15–22%",
    pullQuote: "The pituitary doesn't know the difference between a peptide signal and your own GHRH. That's the elegance of secretagogue therapy.",
  },
  {
    id: "tissue-repair",
    slug: "Tissue Repair Peptides",
    compounds: "BPC-157 · TB-500 · GHK-Cu",
    category: "Recovery & Repair",
    mechanism:
      "BPC-157 upregulates VEGF and growth-factor receptor expression at injury sites, accelerating angiogenesis and fibroblast migration. TB-500 modulates actin polymerization, enabling cell motility in wound repair. GHK-Cu activates collagen synthesis genes and has epigenetic regulatory activity.",
    protocol: "Daily SC injection or oral (BPC-157). 8–16-week cycles. Stack all three for synergy.",
    outcomes: "Skin elasticity +34% · Wound healing +47% · Inflammation −38%",
    pullQuote: "BPC-157 has shown regenerative activity in every tissue type tested. It's one of the most tissue-selective signaling molecules we know of.",
  },
  {
    id: "longevity",
    slug: "Longevity Compounds",
    compounds: "NAD+ · MOTS-c · Epitalon",
    category: "Longevity & Cellular",
    mechanism:
      "NAD+ repletion restores sirtuins and PARPs — enzymes that maintain DNA integrity and mitochondrial function. MOTS-c is a mitochondria-derived peptide that activates AMPK and improves insulin sensitivity. Epitalon is a tetrapeptide pineal gland regulator that elongates telomeres via telomerase activation.",
    protocol: "Varies by compound. NAD+ IV or SC 2–3×/week. MOTS-c daily SC. Epitalon 10-day cycle quarterly.",
    outcomes: "Bio age −3.2 yrs · Deep sleep +28% · Mitochondrial function +22%",
    pullQuote: "Longevity medicine is no longer about guessing. We can measure biological age before and after with validated epigenetic clocks.",
  },
  {
    id: "hpg-axis",
    slug: "HPG-Axis Modulators",
    compounds: "Enclomiphene · Kisspeptin",
    category: "Growth & Hormone",
    mechanism:
      "Enclomiphene is a selective estrogen receptor modulator that blocks negative hypothalamic feedback, raising LH and FSH — which in turn drives endogenous testosterone production. Unlike TRT, this preserves testicular function and fertility. Kisspeptin directly activates GnRH neurons.",
    protocol: "Oral (Enclomiphene) 12.5–25 mg daily. 12–16-week cycles. Monitored quarterly labs.",
    outcomes: "Total T +150–250% · LH/FSH normalized · Fertility maintained",
    pullQuote: "Restoring the HPG axis — not bypassing it — is how you preserve long-term fertility and endogenous testosterone production.",
  },
  {
    id: "cognitive",
    slug: "Cognitive Peptides",
    compounds: "Selank · Semax",
    category: "Cognition & Mood",
    mechanism:
      "Selank modulates GABA-A receptors and upregulates BDNF expression — reducing anxiety and improving cognitive flexibility. Semax is an ACTH analogue that raises BDNF/NGF levels in the prefrontal cortex. Both cross the blood-brain barrier via intranasal delivery.",
    protocol: "Intranasal 2–3× daily. 2–4-week cycles with 2-week breaks. No tolerance buildup at standard doses.",
    outcomes: "Cognitive clarity · Anxiety reduction · BDNF +40–80%",
    pullQuote: "Intranasal delivery is surprisingly effective — the olfactory nerve offers a direct route past the blood-brain barrier for small peptides.",
  },
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
                SCIENCE
              </p>
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
                How peptides work.
              </h1>
              <p
                style={{
                  fontFamily: "'Inter Tight', sans-serif",
                  fontSize: "clamp(1rem, 2vw, 1.25rem)",
                  color: "#4A4A4A",
                  lineHeight: 1.6,
                  maxWidth: "520px",
                }}
              >
                Six peptide families. Each with a distinct mechanism, a targeted receptor,
                and a clinical evidence base. This is the science behind every Nexphoria protocol.
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
                  alt="Scientific precision in peptide medicine"
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                  loading="eager"
                />
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
                    <div style={{ marginBottom: "2rem" }}>
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
                        marginBottom: "2.5rem",
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
                        OUTCOMES
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
                fontStyle: "italic",
                fontSize: "clamp(1.875rem, 3.5vw, 2.75rem)",
                color: "var(--nx-fg)",
                lineHeight: 1.1,
                marginBottom: "1.25rem",
              }}
            >
              Science without labs is just theory.
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
              Every Nexphoria protocol starts with your blood work. Mechanism matters,
              but your baseline determines your dose — and your physician determines your protocol.
            </p>
          </Reveal>
        </div>
      </section>

      <FinalCTAStrip
        gender="women"
        title="Backed by science. Prescribed by physicians."
        sub="Your labs + your goals + your physician = your protocol."
      />
    </SiteLayout>
  );
}
