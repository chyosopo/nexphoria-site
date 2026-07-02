import { useState } from "react";
import { SiteLayout } from "@/components/SiteLayout";
import { StartIntakeButton } from "@/components/StartIntakeButton";
import { FinalCTAStrip } from "@/components/FinalCTAStrip";
import { Reveal } from "@/components/Reveal";
import { physicians, type Physician } from "@/data/physicians";
import { useSeo, webPageJsonLd } from "@/lib/seo";
import lifestylePhysicianConsult from "@/assets/brand/lifestyle-physician-consult.webp";
const physicianTrustHero = "img/img_20e1e1d49da4.webp";
import { HeroTile, MxHeader, ColoredHeroTile, TileGlyphs } from "@/components/SignatureTile";
import { PillBadge } from "@/components/PillBadge";

export default function Physicians() {
  useSeo({
    title: "Nexphoria physicians — board-certified, Cleveland Clinic to Stanford",
    description: "Every Nexphoria protocol is reviewed by a board-certified U.S. physician trained at Cleveland Clinic, Mayo, UCSF, Hopkins, or Stanford. No algorithms, no auto-approval — a licensed physician reads your file.",
    path: "/physicians",
    jsonLd: [webPageJsonLd({
      name: "Nexphoria Physicians",
      description: "Board-certified U.S. physicians from Cleveland Clinic, Mayo, UCSF, Hopkins, and Stanford reviewing every peptide protocol.",
      path: "/physicians",
      type: "MedicalWebPage",
    })],
  });
  return (
    <SiteLayout navVariant="showcase">
      <PhysiciansHeroDark />

      {/* ── Benefit-encoded editorial portrait band ── */}
      <section
        data-testid="physicians-editorial-band"
        style={{ backgroundColor: "var(--nx-bg)", borderTop: "1px solid var(--nx-border)" }}
      >
        <div className="nx-container max-w-screen-xl" style={{ paddingTop: "3.5rem", paddingBottom: "3.5rem" }}>
          <div
            className="physicians-band-grid"
            style={{ display: "grid", gridTemplateColumns: "1fr", gap: "2.5rem", alignItems: "center" }}
          >
            <Reveal>
              <div
                style={{
                  aspectRatio: "4/3",
                  overflow: "hidden",
                  borderRadius: "20px",
                  border: "1px solid var(--nx-border)",
                  backgroundColor: "var(--nx-bg-cream)",
                }}
              >
                <img
                  src={physicianTrustHero}
                  alt="Board-certified physician reviewing a 38-biomarker peptide lab panel before prescribing"
                  loading="eager"
                  decoding="async"
                  data-testid="physicians-hero-portrait"
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                />
              </div>
            </Reveal>
            <Reveal delay={100}>
              <div>
                <p
                  style={{
                    fontFamily: "'General Sans', system-ui, sans-serif",
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
                  Labs before your prescription
                </p>
                <h2
                  style={{
                    fontFamily: "'General Sans', system-ui, sans-serif",
                    fontWeight: 500,
                    fontSize: "clamp(1.875rem, 3.5vw, 2.75rem)",
                    color: "var(--nx-fg)",
                    lineHeight: 1.1,
                    marginBottom: "1.25rem",
                  }}
                >
                  Your physician reads a 38-biomarker panel before writing anything.
                </h2>
                <p
                  style={{
                    fontFamily: "'General Sans', system-ui, sans-serif",
                    fontSize: "1.0625rem",
                    color: "var(--nx-fg-graphite)",
                    lineHeight: 1.7,
                  }}
                >
                  Peptide medicine is precision pharmacology. The physicians on our panel do not
                  prescribe from a questionnaire — they calibrate dose against your measured
                  IGF-1, metabolic, and hormonal markers, then monitor and adjust every 90 days.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Doctor grid ── */}
      <section
        className="py-24 md:py-32"
        style={{ backgroundColor: "var(--nx-bg-cream)" }}
      >
        <div className="nx-container max-w-screen-xl">
          <Reveal>
            <p
              style={{
                fontFamily: "'General Sans', system-ui, sans-serif",
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
              The panel
            </p>
            <h2
              style={{
                fontFamily: "'General Sans', system-ui, sans-serif",
                fontWeight: 500,
                fontSize: "clamp(2rem, 4vw, 3rem)",
                color: "var(--nx-fg)",
                lineHeight: 1.1,
                marginBottom: "0.5rem",
              }}
            >
              Five physicians.
            </h2>
            <h2
              style={{
                fontFamily: "'General Sans', system-ui, sans-serif",
                fontWeight: 500,
                
                fontSize: "clamp(2rem, 4vw, 3rem)",
                color: "var(--nx-fg)",
                lineHeight: 1.1,
                marginBottom: "3.5rem",
              }}
            >
              One clinical standard.
            </h2>
          </Reveal>

          <div
            data-testid="physicians-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
              gap: "2px",
            }}
          >
            {physicians.map((doc, i) => (
              <Reveal key={doc.name} delay={i * 80}>
                <PhysicianCard doc={doc} index={i} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Medical standards ── */}
      <section
        className="py-24 md:py-32"
        style={{ backgroundColor: "var(--nx-bg)" }}
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
                    fontFamily: "'General Sans', system-ui, sans-serif",
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
                  Our standards
                </p>
                <h2
                  style={{
                    fontFamily: "'General Sans', system-ui, sans-serif",
                    fontWeight: 500,
                    fontSize: "clamp(1.875rem, 3.5vw, 2.75rem)",
                    color: "var(--nx-fg)",
                    lineHeight: 1.1,
                    marginBottom: "0.5rem",
                  }}
                >
                  Every physician on our panel
                </h2>
                <h2
                  style={{
                    fontFamily: "'General Sans', system-ui, sans-serif",
                    fontWeight: 500,
                    
                    fontSize: "clamp(1.875rem, 3.5vw, 2.75rem)",
                    color: "var(--nx-fg)",
                    lineHeight: 1.1,
                    marginBottom: "2rem",
                  }}
                >
                  meets this standard.
                </h2>
                <p
                  style={{
                    fontFamily: "'General Sans', system-ui, sans-serif",
                    fontSize: "1.0625rem",
                    color: "var(--nx-fg-graphite)",
                    lineHeight: 1.7,
                    marginBottom: "2rem",
                  }}
                >
                  Every physician on our panel is U.S.-licensed, board-certified, and
                  DEA-registered. We do not contract with international or non-licensed
                  providers. Every physician reviews actual laboratory results before
                  issuing a prescription — intake questionnaires alone are insufficient.
                </p>
                <ul
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem",
                    listStyle: "none",
                    padding: 0,
                    margin: 0,
                  }}
                >
                  {[
                    { label: "ABIM, ABFM, or specialty board certification required", detail: "No exceptions. Board certification is the minimum — not a differentiator." },
                    { label: "Laboratory review mandatory before any Rx", detail: "38-biomarker Quest Diagnostics panel must be on file. No prescription precedes labs." },
                    { label: "Licensed in member's state of residence", detail: "Physician licensure is state-specific. Members are matched to a licensed provider in their state." },
                    { label: "DEA registration active and current", detail: "Required for prescribing scheduled and controlled compounds within our formulary." },
                    { label: "Quarterly case review with medical director", detail: "All active protocols are reviewed against updated clinical literature on a rolling 90-day cycle." },
                  ].map((item) => (
                    <li
                      key={item.label}
                      style={{
                        display: "flex",
                        gap: "1rem",
                        alignItems: "flex-start",
                        paddingBottom: "1rem",
                        borderBottom: "1px solid var(--nx-border)",
                      }}
                    >
                      <span
                        style={{
                          width: "6px",
                          height: "6px",
                          borderRadius: "50%",
                          backgroundColor: "var(--nx-cobalt)",
                          flexShrink: 0,
                          marginTop: "8px",
                        }}
                      />
                      <div>
                        <p
                          style={{
                            fontFamily: "'General Sans', system-ui, sans-serif",
                            fontSize: "14px",
                            fontWeight: 600,
                            color: "var(--nx-fg)",
                            marginBottom: "2px",
                          }}
                        >
                          {item.label}
                        </p>
                        <p
                          style={{
                            fontFamily: "'General Sans', system-ui, sans-serif",
                            fontSize: "13px",
                            color: "var(--nx-fg-graphite)",
                            lineHeight: 1.55,
                          }}
                        >
                          {item.detail}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            {/* Pull quote */}
            <Reveal delay={120}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  paddingLeft: "0",
                  borderLeft: "none",
                }}
                className="md:pl-16 md:border-l"
              >
                <div
                  style={{
                    borderLeft: "3px solid var(--nx-cobalt)",
                    paddingLeft: "2rem",
                  }}
                >
                  <p
                    style={{
                      fontFamily: "'General Sans', system-ui, sans-serif",
                      
                      fontWeight: 400,
                      fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
                      color: "var(--nx-fg)",
                      lineHeight: 1.35,
                      marginBottom: "2rem",
                    }}
                  >
                    "Peptide medicine is precision pharmacology — labs, dosing, monitoring,
                    and a physician who understands your individual baseline. Without all four,
                    it is guesswork with a syringe."
                  </p>
                  <div>
                    <p
                      style={{
                        fontFamily: "'General Sans', system-ui, sans-serif",
                        fontSize: "14px",
                        fontWeight: 600,
                        color: "var(--nx-fg)",
                        marginBottom: "2px",
                      }}
                    >
                      Dr. Arjun Patel, MD
                    </p>
                    <p
                      style={{
                        fontFamily: "'General Sans', system-ui, sans-serif",
                        fontSize: "10px",
                        fontWeight: 500,
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        color: "var(--nx-cobalt)",
                      }}
                    >
                      Endocrinology · Cleveland Clinic · ABIM Board-Certified
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── How physician review works ── */}
      <section
        className="py-24 md:py-32"
        style={{ backgroundColor: "var(--nx-bg-cream)", borderTop: "1px solid var(--nx-border)" }}
      >
        <div className="nx-container max-w-screen-xl">
          <Reveal>
            <p
              style={{ fontFamily: "'General Sans', system-ui, sans-serif", fontSize: "11px", fontWeight: 500, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--nx-cobalt)", marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.75rem" }}
            >
              <span style={{ display: "inline-block", width: "32px", height: "1px", backgroundColor: "var(--nx-cobalt)" }} />
              How review works
            </p>
            <h2 style={{ fontFamily: "'General Sans', system-ui, sans-serif", fontWeight: 500, fontSize: "clamp(2rem, 4vw, 3rem)", color: "var(--nx-fg)", lineHeight: 1.1, marginBottom: "0.5rem" }}>
              Three steps.
            </h2>
            <h2 style={{ fontFamily: "'General Sans', system-ui, sans-serif", fontWeight: 500,  fontSize: "clamp(2rem, 4vw, 3rem)", color: "var(--nx-fg)", lineHeight: 1.1, marginBottom: "3rem" }}>
              Zero algorithmic shortcuts.
            </h2>
          </Reveal>

          <div
            style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1.5px", backgroundColor: "var(--nx-border)", border: "1.5px solid var(--nx-border)", maxWidth: "900px" }}
          >
            {[
              {
                n: "01",
                label: "Labs First",
                body: "A 38-biomarker Quest Diagnostics panel is required before any prescription. Your physician will not prescribe based on symptoms alone. The panel covers hormones, metabolic markers, inflammation, cardiovascular markers, and organ function.",
              },
              {
                n: "02",
                label: "Physician Review",
                body: "Your assigned board-certified physician reviews your full panel and intake within 24 hours of receipt. They look for absolute contraindications, relative cautions, and protocol optimization based on your specific baseline — not population averages.",
              },
              {
                n: "03",
                label: "Telehealth Consult",
                body: "Your consult is scheduled through Bask Health, our licensed telehealth partner. Your physician finalizes your protocol, sets dose parameters, and answers clinical questions. Ongoing secure portal messaging is available between consult cycles.",
              },
            ].map(({ n, label, body }) => (
              <Reveal key={n}>
                <div style={{ backgroundColor: "#FFFFFF", padding: "2rem", height: "100%" }}>
                  <p style={{ fontFamily: "'General Sans', system-ui, sans-serif", fontSize: "10px", fontWeight: 700, letterSpacing: "0.16em", color: "var(--nx-cobalt)", marginBottom: "0.5rem" }}>{n}</p>
                  <p style={{ fontFamily: "'General Sans', system-ui, sans-serif",  fontSize: "1.25rem", fontWeight: 500, color: "var(--nx-fg)", marginBottom: "0.75rem" }}>{label}</p>
                  <p style={{ fontFamily: "'General Sans', system-ui, sans-serif", fontSize: "13.5px", color: "var(--nx-fg-graphite)", lineHeight: 1.7 }}>{body}</p>
                </div>
              </Reveal>
            ))}
          </div>

          {/* CTA to assessment */}
          <Reveal delay={100}>
            <div className="mt-12">
              <p style={{ fontFamily: "'General Sans', system-ui, sans-serif", fontWeight: 500,  fontSize: "clamp(1.25rem, 2.5vw, 1.75rem)", color: "var(--nx-fg)", marginBottom: "1rem", maxWidth: "520px" }}>
                "Dare to defy. Find your focus. Elevate every moment."
              </p>
              <p style={{ fontFamily: "'General Sans', system-ui, sans-serif", fontSize: "1rem", color: "var(--nx-fg-graphite)", lineHeight: 1.7, maxWidth: "480px", marginBottom: "1.75rem" }}>
                Your physician review is included with every protocol. Take the assessment and our team will match you with the right physician for your state and goals.
              </p>
              <StartIntakeButton source="physicians-page" size="lg">
                Start your intake
              </StartIntakeButton>
            </div>
          </Reveal>
        </div>
      </section>

      <PhysicianCredentials />

      <FinalCTAStrip
        gender="women"
        title="Your physician review is included."
        sub="Quest Diagnostics labs drawn first. Board-certified MD review within 48 hours."
      />
      <style>{`
        @media (min-width: 768px) {
          .physicians-band-grid { grid-template-columns: 1.1fr 1fr !important; gap: 4rem !important; }
        }
      `}</style>
    </SiteLayout>
  );
}

// ─────────────────────────────────────────────
// PhysicianCard — expandable, with extended bio + focus + publications
// ─────────────────────────────────────────────

// =============================================================
// PhysiciansHeroDark — Hims-Labs style dark cobalt hero
// =============================================================

function PhysiciansHeroDark() {
  return (
    <section
      data-testid="physicians-hero-dark"
      style={{
        position: "relative",
        overflow: "hidden",
        background: "linear-gradient(135deg, var(--nx-fg) 0%, #101010 55%, #1A1A1A 100%)",
        color: "var(--nx-bg)",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      {/* Ambient acid glow */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(1200px 500px at 82% 12%, rgba(140, 178, 217,0.14), transparent 60%), radial-gradient(700px 400px at 5% 90%, rgba(109, 157, 206,0.12), transparent 65%)",
          pointerEvents: "none",
        }}
      />

      <div
        className="nx-container max-w-screen-xl"
        style={{
          position: "relative",
          paddingTop: "clamp(4rem, 9vw, 7rem)",
          paddingBottom: "clamp(3.5rem, 7vw, 5.5rem)",
        }}
      >
        <div
          className="physicians-hero-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1.1fr 1fr",
            gap: "clamp(2rem, 5vw, 4rem)",
            alignItems: "center",
          }}
        >
          {/* LEFT: copy */}
          <div>
            <p
              style={{
                fontFamily: "'General Sans', system-ui, sans-serif",
                fontSize: "11px",
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
              The medical team
            </p>
            <h1
              style={{
                fontFamily: "'General Sans', system-ui, sans-serif",
                fontWeight: 500,
                fontSize: "clamp(2.4rem, 5.4vw, 4.5rem)",
                lineHeight: 1.02,
                letterSpacing: "-0.02em",
                color: "var(--nx-bg)",
                marginBottom: "1.5rem",
              }}
            >
              Meet the physicians<br />
              <span style={{ color: "var(--nx-acid)" }}>behind your protocol.</span>
            </h1>
            <p
              style={{
                fontFamily: "'General Sans', system-ui, sans-serif",
                fontSize: "1.0625rem",
                lineHeight: 1.6,
                color: "rgba(241, 243, 244,0.72)",
                maxWidth: "38rem",
                marginBottom: "2rem",
              }}
            >
              Five board-certified U.S. physicians. Cleveland Clinic, Mayo, UCSF, Hopkins, Stanford. Every peptide protocol is reviewed against your bloodwork and signed by the doctor licensed in your state.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.6rem", marginBottom: "2.5rem" }}>
              {[
                "Reads your labs first",
                "Signs every refill",
                "Direct portal messaging",
                "Licensed in your state",
              ].map((chip) => (
                <span
                  key={chip}
                  style={{
                    fontFamily: "'General Sans', system-ui, sans-serif",
                    fontSize: "12px",
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
              <StartIntakeButton variant="primary" source="physicians-hero">
                Start your assessment
              </StartIntakeButton>
              <a
                href="#physicians-grid"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("physicians-grid")?.scrollIntoView({ behavior: "smooth" });
                }}
                style={{
                  fontFamily: "'General Sans', system-ui, sans-serif",
                  fontSize: "13px",
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
                Meet the team ↓
              </a>
            </div>
          </div>

          {/* RIGHT: physician face grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "0.65rem",
              position: "relative",
            }}
          >
            {physicians.slice(0, 5).map((doc, i) => (
              <div
                key={doc.name}
                style={{
                  aspectRatio: "4/5",
                  borderRadius: "14px",
                  overflow: "hidden",
                  border: "1px solid rgba(255,255,255,0.10)",
                  background: "rgba(255,255,255,0.03)",
                  position: "relative",
                  gridColumn: i === 0 ? "1 / 3" : i === 4 ? "2 / 4" : "auto",
                  gridRow: i === 0 ? "1 / 3" : "auto",
                }}
              >
                <img
                  src={doc.photo}
                  alt={doc.name}
                  loading="eager"
                  decoding="async"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: "top center",
                    display: "block",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(180deg, transparent 45%, rgba(16, 21, 27,0.85) 100%)",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    left: "0.7rem",
                    right: "0.7rem",
                    bottom: "0.6rem",
                    color: "var(--nx-bg)",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "'General Sans', system-ui, sans-serif",
                      fontWeight: 600,
                      fontSize: i === 0 ? "0.95rem" : "0.78rem",
                      lineHeight: 1.15,
                      marginBottom: "0.15rem",
                    }}
                  >
                    {doc.name.replace(/, MD.*/, "")}
                  </div>
                  <div
                    style={{
                      fontFamily: "'General Sans', system-ui, sans-serif",
                      fontSize: i === 0 ? "10px" : "8.5px",
                      fontWeight: 500,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: "var(--nx-acid)",
                    }}
                  >
                    {doc.institution}
                  </div>
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
          background: "rgba(21, 24, 28,0.15)",
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
            { k: "5", v: "Board-certified MDs" },
            { k: "18+", v: "Avg years in practice" },
            { k: "38", v: "Biomarkers reviewed" },
            { k: "50", v: "States licensed" },
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
                  fontSize: "10px",
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
          .physicians-hero-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}


function PhysicianCard({ doc, index }: { doc: Physician; index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      style={{ backgroundColor: "#FFFFFF", overflow: "hidden" }}
      data-testid={`physician-card-${index}`}
    >
      <div
        style={{
          width: "100%",
          aspectRatio: "4/5",
          backgroundColor: "var(--nx-bg-cream)",
          overflow: "hidden",
        }}
      >
        <img
          src={doc.photo}
          alt={doc.name}
          loading="lazy"
          decoding="async"
          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top center", display: "block" }}
        />
      </div>
      <div style={{ height: "2px", backgroundColor: "var(--nx-cobalt)" }} />
      <div style={{ padding: "1.5rem 1.25rem 2rem" }}>
        <h3 style={{ fontFamily: "'General Sans', system-ui, sans-serif",  fontWeight: 500, fontSize: "1.375rem", color: "var(--nx-fg)", lineHeight: 1.2, marginBottom: "0.4rem" }}>
          {doc.name}
        </h3>
        <p style={{ fontFamily: "'General Sans', system-ui, sans-serif", fontSize: "9px", fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--nx-cobalt)", marginBottom: "0.375rem" }}>
          {doc.specialty} · {doc.institution}
        </p>
        <p style={{ fontFamily: "'General Sans', system-ui, sans-serif", fontSize: "8px", fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--nx-fg-muted)", marginBottom: "0.875rem" }}>
          {doc.credentials}
        </p>
        <p style={{ fontFamily: "'General Sans', system-ui, sans-serif", fontSize: "13px", color: "var(--nx-fg-graphite)", lineHeight: 1.65, marginBottom: "1rem" }}>
          {doc.bio}
        </p>

        {open && (
          <div style={{ marginTop: "0.5rem", marginBottom: "1rem", paddingTop: "1rem", borderTop: "1px solid var(--nx-rock)" }}>
            <p style={{ fontFamily: "'General Sans', system-ui, sans-serif", fontSize: "13px", color: "var(--nx-fg-graphite)", lineHeight: 1.7, marginBottom: "1rem" }}>
              {doc.extendedBio}
            </p>
            <p style={{ fontFamily: "'General Sans', system-ui, sans-serif", fontSize: "9px", fontWeight: 500, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--nx-fg)", marginBottom: "0.5rem" }}>
              Clinical focus
            </p>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, marginBottom: "1rem" }}>
              {doc.focus.map((f) => (
                <li key={f} style={{ fontFamily: "'General Sans', system-ui, sans-serif", fontSize: "12px", color: "var(--nx-fg-graphite)", lineHeight: 1.6, paddingLeft: "1rem", position: "relative" }}>
                  <span style={{ position: "absolute", left: 0, color: "var(--nx-cobalt)" }}>•</span>
                  {f}
                </li>
              ))}
            </ul>
            <p style={{ fontFamily: "'General Sans', system-ui, sans-serif", fontSize: "9px", fontWeight: 500, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--nx-fg)", marginBottom: "0.5rem" }}>
              Selected publications
            </p>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, marginBottom: "1rem" }}>
              {doc.publications.map((p) => (
                <li key={p} style={{ fontFamily: "'General Sans', system-ui, sans-serif", fontSize: "11px",  color: "#6A6A6A", lineHeight: 1.55, marginBottom: "0.35rem" }}>
                  {p}
                </li>
              ))}
            </ul>
            <p style={{ fontFamily: "'General Sans', system-ui, sans-serif", fontSize: "9px", fontWeight: 500, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--nx-fg)", marginBottom: "0.35rem" }}>
              Languages
            </p>
            <p style={{ fontFamily: "'General Sans', system-ui, sans-serif", fontSize: "12px", color: "var(--nx-fg-graphite)" }}>{doc.languages}</p>
          </div>
        )}

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls={`physician-extended-${index}`}
          data-testid={`physician-read-more-${index}`}
          style={{
            fontFamily: "'General Sans', system-ui, sans-serif",
            fontSize: "12px",
            fontWeight: 600,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            color: "var(--nx-cobalt)",
            background: "transparent",
            border: "none",
            padding: 0,
            cursor: "pointer",
            display: "inline-flex",
            alignItems: "center",
            gap: "0.35rem",
          }}
        >
          {open ? "Show less ↑" : "Read more →"}
        </button>
      </div>
    </div>
  );
}

// PhysicianCredentials — partner-org training + board certs as clean type
const eyebrowStyle: React.CSSProperties = {
  fontFamily: "'General Sans', system-ui, sans-serif",
  fontSize: "11px",
  fontWeight: 500,
  letterSpacing: "0.18em",
  textTransform: "uppercase",
  color: "var(--nx-cobalt)",
  marginBottom: "1rem",
  display: "flex",
  alignItems: "center",
  gap: "0.75rem",
};

function PhysicianCredentials() {
  const institutions = ["Cleveland Clinic", "Mayo Clinic", "UCSF", "Johns Hopkins", "Stanford Medicine"];
  const boards = [
    { abbr: "ABIM", full: "American Board of Internal Medicine", note: "Internal medicine and endocrinology" },
    { abbr: "ABFM", full: "American Board of Family Medicine", note: "Primary and preventative care" },
    { abbr: "DEA", full: "Drug Enforcement Administration", note: "Active prescribing registration" },
    { abbr: "State licensure", full: "Matched to your state of residence", note: "Physician licensed where you live" },
  ];
  return (
    <section
      className="py-24 md:py-32"
      style={{ backgroundColor: "var(--nx-bg)", borderTop: "1px solid var(--nx-border)" }}
      data-testid="physicians-credentials"
    >
      <div className="nx-container max-w-screen-xl">
        <Reveal>
          <p style={eyebrowStyle}>
            <span style={{ display: "inline-block", width: "32px", height: "1px", backgroundColor: "var(--nx-cobalt)" }} />
            TRAINED AND CERTIFIED
          </p>
          <h2
            style={{
              fontFamily: "'General Sans', system-ui, sans-serif",
              fontWeight: 500,
              fontSize: "clamp(1.875rem, 3.5vw, 2.75rem)",
              color: "var(--nx-fg)",
              lineHeight: 1.1,
              marginBottom: "0.75rem",
            }}
          >
            Where our physicians trained.
          </h2>
          <p
            style={{
              fontFamily: "'General Sans', system-ui, sans-serif",
              fontSize: "1.0625rem",
              color: "var(--nx-fg-graphite)",
              lineHeight: 1.65,
              maxWidth: "560px",
              marginBottom: "3rem",
            }}
          >
            Residency and fellowship training from top U.S. academic medical centers. Every
            physician holds active board certification and state licensure.
          </p>
        </Reveal>

        <div
          data-testid="physicians-institutions"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
            gap: "1.5px",
            backgroundColor: "var(--nx-border)",
            border: "1.5px solid var(--nx-border)",
            marginBottom: "3.5rem",
          }}
        >
          {institutions.map((org) => (
            <div
              key={org}
              data-testid={`physicians-institution-${org.replace(/\s+/g, "-").toLowerCase()}`}
              style={{
                backgroundColor: "var(--nx-bg)",
                padding: "1.75rem 1.25rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
              }}
            >
              <span
                style={{
                  fontFamily: "'General Sans', system-ui, sans-serif",
                  fontSize: "1rem",
                  fontWeight: 600,
                  letterSpacing: "-0.01em",
                  color: "var(--nx-fg)",
                  lineHeight: 1.2,
                }}
              >
                {org}
              </span>
            </div>
          ))}
        </div>

        <div
          data-testid="physicians-boards"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {boards.map((c) => (
            <div
              key={c.abbr}
              data-testid={`physicians-board-${c.abbr.replace(/\s+/g, "-").toLowerCase()}`}
              style={{ borderTop: "2px solid var(--nx-cobalt)", paddingTop: "1rem" }}
            >
              <p
                style={{
                  fontFamily: "'General Sans', system-ui, sans-serif",
                  fontSize: "1.125rem",
                  fontWeight: 600,
                  color: "var(--nx-fg)",
                  marginBottom: "0.35rem",
                }}
              >
                {c.abbr}
              </p>
              <p
                style={{
                  fontFamily: "'General Sans', system-ui, sans-serif",
                  fontSize: "13px",
                  fontWeight: 500,
                  color: "var(--nx-fg)",
                  lineHeight: 1.4,
                  marginBottom: "0.25rem",
                }}
              >
                {c.full}
              </p>
              <p
                style={{
                  fontFamily: "'General Sans', system-ui, sans-serif",
                  fontSize: "12px",
                  color: "var(--nx-fg-muted)",
                  lineHeight: 1.45,
                }}
              >
                {c.note}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

