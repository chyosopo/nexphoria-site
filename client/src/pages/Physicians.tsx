/* JOB: put real physician oversight on the record. */
import { SiteLayout } from "@/components/SiteLayout";
import { anchor } from "@/lib/anchors";
import { StartIntakeButton } from "@/components/StartIntakeButton";
import { FinalCTAStrip } from "@/components/FinalCTAStrip";
import { Reveal } from "@/components/Reveal";
import { physicianReview } from "@/data/physicians";
import { useSeo, webPageJsonLd, breadcrumbJsonLd } from "@/lib/seo";
import { F } from "@/lib/typography";
const physicianTrustHero = "img/img_20e1e1d49da4.webp";
import heroPhysicians from "@/assets/brand/hero-physicians.webp";

export default function Physicians() {
  useSeo({
    title: "Nexphoria physicians — board-certified U.S. medical review",
    description:
      "Every Nexphoria protocol is reviewed by a board-certified, U.S.-licensed physician who reads your labs before prescribing. No algorithms, no auto-approval — a licensed physician reviews your file.",
    path: "/physicians",
    jsonLd: [
      webPageJsonLd({
        name: "Nexphoria Physician Review",
        description:
          "Board-certified, U.S.-licensed physicians review every peptide protocol against your laboratory results before prescribing.",
        path: "/physicians",
        type: "MedicalWebPage",
      }),
      breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Physicians", path: "/physicians" }]),
    ],
  });
  return (
    <SiteLayout navVariant="showcase">
      <PhysiciansHeroDark />


      {/* ── Benefit-encoded editorial portrait band ── */}
      <section
        data-testid="physicians-editorial-band"
        style={{ backgroundColor: "var(--nx-bg)", borderTop: "1px solid var(--nx-border)" }}
      >
        <div className="nx-container max-w-screen-xl" style={{ paddingTop: "var(--nx-sp-sec)", paddingBottom: "var(--nx-sp-sec)" }}>
          <div
            className="physicians-band-grid"
            style={{ display: "grid", gridTemplateColumns: "1fr", gap: "2.5rem", alignItems: "center" }}
          >
            <Reveal>
              <div
                style={{
                  aspectRatio: "4/3",
                  overflow: "hidden",
                  borderRadius: "var(--nx-r-lg)",
                  border: "1px solid var(--nx-border)",
                  backgroundColor: "var(--nx-bg-cream)",
                }}
              >
                <img
                  src={physicianTrustHero}
                  alt="A board-certified physician reviewing a 99-biomarker peptide lab panel before prescribing"
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
                    fontFamily: F,
                    fontSize: "var(--nx-t-2xs)",
                    fontWeight: 500,
                    letterSpacing: "var(--nx-ls-wide)",
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
                    fontFamily: "'Fraunces', Georgia, serif",
                    fontWeight: 500,
                    fontSize: "var(--nx-t-h2)",
                    color: "var(--nx-fg)",
                    lineHeight: 1.1,
                    marginBottom: "1.25rem",
                  }}
                >
                  Your physician reads a 99-biomarker panel before writing anything.
                </h2>
                <p
                  style={{
                    fontFamily: F,
                    fontSize: "var(--nx-t-body)",
                    color: "var(--nx-fg-graphite)",
                    lineHeight: 1.7,
                  }}
                >
                  Peptide medicine is precision pharmacology. A physician on the network does not
                  prescribe from a questionnaire — your dose is calibrated against your measured
                  IGF-1, metabolic, and hormonal markers, then monitored and adjusted every 90 days.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Medical standards ── */}
      <section
        className="nx-section-y"
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
                    fontFamily: F,
                    fontSize: "var(--nx-t-2xs)",
                    fontWeight: 500,
                    letterSpacing: "var(--nx-ls-wide)",
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
                {/* ONE heading — split h2 siblings read as two headings to
                    screen readers and the document outline */}
                <h2
                  style={{
                    fontFamily: "'Fraunces', Georgia, serif",
                    fontWeight: 500,
                    fontSize: "var(--nx-t-h2)",
                    color: "var(--nx-fg)",
                    lineHeight: 1.1,
                    marginBottom: "2rem",
                  }}
                >
                  Every physician on the network<br />meets this standard.
                </h2>
                <p
                  style={{
                    fontFamily: F,
                    fontSize: "var(--nx-t-body)",
                    color: "var(--nx-fg-graphite)",
                    lineHeight: 1.7,
                    marginBottom: "2rem",
                  }}
                >
                  Every prescribing physician is U.S.-licensed, board-certified, and
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
                  {physicianReview.standards.map((item) => (
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
                            fontFamily: F,
                            fontSize: "var(--nx-t-sm)",
                            fontWeight: 600,
                            color: "var(--nx-fg)",
                            marginBottom: "2px",
                          }}
                        >
                          {item.label}
                        </p>
                        <p
                          style={{
                            fontFamily: F,
                            fontSize: "var(--nx-t-sm)",
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

            {/* Pull quote — institutional, unattributed to any individual */}
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
                      fontFamily: F,

                      fontWeight: 400,
                      fontSize: "var(--nx-t-h2)",
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
                        fontFamily: F,
                        fontSize: "var(--nx-t-sm)",
                        fontWeight: 600,
                        color: "var(--nx-fg)",
                        marginBottom: "2px",
                      }}
                    >
                      Nexphoria clinical standard
                    </p>
                    <p
                      style={{
                        fontFamily: F,
                        fontSize: "var(--nx-t-xs)",
                        fontWeight: 500,
                        letterSpacing: "var(--nx-ls-caps)",
                        textTransform: "uppercase",
                        color: "var(--nx-cobalt)",
                      }}
                    >
                      Board-certified <span aria-hidden="true">·</span> Lab-gated <span aria-hidden="true">·</span> Physician-reviewed
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
        id="how-review-works"
        className="nx-section-y"
        style={{ backgroundColor: "var(--nx-bg-cream)", borderTop: "1px solid var(--nx-border)" }}
      >
        <div className="nx-container max-w-screen-xl">
          <Reveal>
            <p
              style={{ fontFamily: F, fontSize: "var(--nx-t-2xs)", fontWeight: 500, letterSpacing: "var(--nx-ls-wide)", textTransform: "uppercase", color: "var(--nx-cobalt)", marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.75rem" }}
            >
              <span style={{ display: "inline-block", width: "32px", height: "1px", backgroundColor: "var(--nx-cobalt)" }} />
              How review works
            </p>
            <h2 style={{ fontFamily: "'Fraunces', Georgia, serif", fontWeight: 500, fontSize: "var(--nx-t-h2)", color: "var(--nx-fg)", lineHeight: 1.1, marginBottom: "3rem" }}>
              Three steps.<br />Zero algorithmic shortcuts.
            </h2>
          </Reveal>

          <div
            className="physicians-review-grid"
            style={{ display: "grid", gridTemplateColumns: "1fr", gap: "2.5rem", alignItems: "stretch" }}
          >
          <div
            role="list"
            aria-label="Physician review steps"
            style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 220px), 1fr))", gap: "1.5px", backgroundColor: "var(--nx-border)", border: "1.5px solid var(--nx-border)" }}
            className="physicians-steps-list"
          >
            {physicianReview.steps.map(({ n, label, body }) => (
              <Reveal key={n}>
                <div role="listitem" style={{ backgroundColor: "var(--nx-ceramic)", padding: "2.5rem 2.25rem", height: "100%" }}>
                  <p style={{ fontFamily: F, fontSize: "var(--nx-t-h2)", fontWeight: 500, color: "var(--nx-cobalt)", lineHeight: 1, marginBottom: "1.25rem", opacity: 0.85 }}>{n}</p>
                  <p style={{ fontFamily: F,  fontSize: "var(--nx-t-lg)", fontWeight: 500, color: "var(--nx-fg)", marginBottom: "0.75rem" }}>{label}</p>
                  <p style={{ fontFamily: F, fontSize: "var(--nx-t-sm)", color: "var(--nx-fg-graphite)", lineHeight: 1.7 }}>{body}</p>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Editorial — two physicians on one chart: review is collaborative, human work */}
          <Reveal delay={80}>
            <figure
              style={{
                borderRadius: "var(--nx-r-lg)",
                overflow: "hidden",
                border: "1px solid var(--nx-border)",
                height: "100%",
                minHeight: "280px",
              }}
              data-testid="physicians-review-editorial"
            >
              <img
                src={heroPhysicians}
                alt="Two physicians in white coats review a patient chart together in warm afternoon light"
                loading="lazy"
                decoding="async"
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
            </figure>
          </Reveal>
          </div>

          {/* CTA to assessment */}
          <Reveal delay={100}>
            <div className="mt-12">
              <p style={{ fontFamily: F, fontWeight: 500,  fontSize: "var(--nx-t-h3)", color: "var(--nx-fg)", marginBottom: "1rem", maxWidth: "520px" }}>
                A physician on every case. A lab value behind every decision.
              </p>
              <p style={{ fontFamily: F, fontSize: "var(--nx-t-body)", color: "var(--nx-fg-graphite)", lineHeight: 1.7, maxWidth: "480px", marginBottom: "1.75rem" }}>
                Your physician review is included with every protocol. Take the assessment and our team will match you with a physician licensed in your state.
              </p>
              <StartIntakeButton source="physicians-page" size="lg">
                Start your assessment
              </StartIntakeButton>
            </div>
          </Reveal>
        </div>
      </section>

      <PhysicianCredentials />

      <FinalCTAStrip
        title="A physician is ready to read your file."
        sub="A CLIA-certified partner-laboratory panel is drawn first. A board-certified physician reviews it before any prescription."
      />
      <style>{`
        @media (min-width: 768px) {
          .physicians-band-grid { grid-template-columns: 1.1fr 1fr !important; gap: 4rem !important; }
          .physicians-review-grid { grid-template-columns: 1.15fr 0.85fr !important; }
        }
        /* Three steps must never lay out 2+1 with an empty bordered cell
           (fleet audit S2): a numbered sequence stacks — always one column. */
        .physicians-steps-list { grid-template-columns: 1fr !important; }
      `}</style>
    </SiteLayout>
  );
}

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
          paddingTop: "var(--nx-sp-sec)",
          paddingBottom: "var(--nx-sp-sec)",
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
                fontFamily: F,
                fontSize: "var(--nx-t-2xs)",
                fontWeight: 500,
                letterSpacing: "var(--nx-ls-wide)",
                textTransform: "uppercase",
                color: "var(--nx-acid)",
                marginBottom: "1.25rem",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.65rem",
              }}
            >
              <span style={{ display: "inline-block", width: "28px", height: "1px", backgroundColor: "var(--nx-acid)" }} />
              Physician review
            </p>
            <h1
              style={{
                fontFamily: "'Fraunces', Georgia, serif",
                fontWeight: 500,
                fontSize: "var(--nx-t-display)",
                lineHeight: 1.02,
                letterSpacing: "-0.02em",
                color: "var(--nx-bg)",
                marginBottom: "1.5rem",
              }}
            >
              A licensed physician<br />
              <span style={{ color: "var(--nx-acid)" }}>reads your file.</span>
            </h1>
            <p
              style={{
                fontFamily: F,
                fontSize: "var(--nx-t-body)",
                lineHeight: 1.6,
                color: "rgba(241, 243, 244,0.72)",
                maxWidth: "38rem",
                marginBottom: "2rem",
              }}
            >
              Every peptide protocol is reviewed by a board-certified, U.S.-licensed physician
              against your bloodwork, and signed by a doctor licensed in your state. No algorithms,
              no auto-approval.
            </p>
            <div role="list" style={{ display: "flex", flexWrap: "wrap", gap: "0.6rem", marginBottom: "2.5rem" }}>
              {[
                "Reads your labs first",
                "Signs every refill",
                "Direct portal messaging",
                "Licensed in your state",
              ].map((chip) => (
                <span
                  key={chip}
                  role="listitem"
                  style={{
                    fontFamily: F,
                    fontSize: "var(--nx-t-xs)",
                    fontWeight: 500,
                    letterSpacing: "0.02em",
                    padding: "0.4rem 0.85rem",
                    borderRadius: "var(--nx-r-pill)",
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
                href={anchor("#how-review-works")}
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("how-review-works")?.scrollIntoView({ behavior: "smooth" });
                }}
                style={{
                  fontFamily: F,
                  fontSize: "var(--nx-t-sm)",
                  fontWeight: 600,
                  letterSpacing: "0.04em",
                  textTransform: "uppercase",
                  color: "var(--nx-bg)",
                  border: "1px solid rgba(255,255,255,0.28)",
                  padding: "0.85rem 1.25rem",
                  borderRadius: "var(--nx-r-pill)",
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.35rem",
                  background: "rgba(255,255,255,0.04)",
                }}
              >
                How review works <span aria-hidden="true">↓</span>
              </a>
            </div>
          </div>

          {/* RIGHT: standards tiles — no individual identities */}
          <div
            id="physician-standards"
            role="list"
            aria-label="Physician standards"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: "0.65rem",
              position: "relative",
            }}
          >
            {[
              { k: "Board-certified", v: "Active certification required of every prescriber" },
              { k: "Lab-gated", v: "No prescription precedes a CLIA-certified lab panel" },
              { k: "State-licensed", v: "Matched to a physician licensed where you live" },
              { k: "Human review", v: "A physician reads your file — never an algorithm" },
            ].map((tile) => (
              <div
                key={tile.k}
                role="listitem"
                style={{
                  borderRadius: "var(--nx-r-md)",
                  overflow: "hidden",
                  border: "1px solid rgba(255,255,255,0.10)",
                  background: "rgba(255,255,255,0.03)",
                  padding: "1.25rem 1.1rem",
                  minHeight: "128px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-end",
                }}
              >
                <div
                  style={{
                    fontFamily: F,
                    fontWeight: 600,
                    fontSize: "var(--nx-t-base)",
                    lineHeight: 1.15,
                    color: "var(--nx-acid)",
                    marginBottom: "0.4rem",
                  }}
                >
                  {tile.k}
                </div>
                <div
                  style={{
                    fontFamily: F,
                    fontSize: "var(--nx-t-xs)",
                    fontWeight: 400,
                    lineHeight: 1.4,
                    color: "rgba(241, 243, 244,0.72)",
                  }}
                >
                  {tile.v}
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
          role="list"
          aria-label="Physician review at a glance"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
            gap: "1rem",
            padding: "1.5rem 0",
          }}
        >
          {physicianReview.stats.map((s) => (
            <div key={s.v} role="listitem" style={{ textAlign: "center" }}>
              <div
                style={{
                  fontFamily: F,
                  fontWeight: 600,
                  fontSize: "var(--nx-t-h3)",
                  color: "var(--nx-bg)",
                  lineHeight: 1,
                  marginBottom: "0.35rem",
                }}
              >
                {s.k}
              </div>
              <div
                style={{
                  fontFamily: F,
                  fontSize: "var(--nx-t-2xs)",
                  fontWeight: 500,
                  letterSpacing: "var(--nx-ls-caps)",
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

// PhysicianCredentials — board certifications as clean type (no institution claims)
const eyebrowStyle: React.CSSProperties = {
  fontFamily: F,
  fontSize: "var(--nx-t-2xs)",
  fontWeight: 500,
  letterSpacing: "var(--nx-ls-wide)",
  textTransform: "uppercase",
  color: "var(--nx-cobalt)",
  marginBottom: "1rem",
  display: "flex",
  alignItems: "center",
  gap: "0.75rem",
};

function PhysicianCredentials() {
  const boards = physicianReview.credentials;
  return (
    <section
      className="nx-section-y"
      style={{ backgroundColor: "var(--nx-bg)", borderTop: "1px solid var(--nx-border)" }}
      data-testid="physicians-credentials"
    >
      <div className="nx-container max-w-screen-xl">
        <Reveal>
          <p style={eyebrowStyle}>
            <span style={{ display: "inline-block", width: "32px", height: "1px", backgroundColor: "var(--nx-cobalt)" }} />
            CERTIFIED AND LICENSED
          </p>
          <h2
            style={{
              fontFamily: "'Fraunces', Georgia, serif",
              fontWeight: 500,
              fontSize: "var(--nx-t-h2)",
              color: "var(--nx-fg)",
              lineHeight: 1.1,
              marginBottom: "0.75rem",
            }}
          >
            The credentials behind every protocol.
          </h2>
          <p
            style={{
              fontFamily: F,
              fontSize: "var(--nx-t-body)",
              color: "var(--nx-fg-graphite)",
              lineHeight: 1.65,
              maxWidth: "560px",
              marginBottom: "3rem",
            }}
          >
            Prescribing physicians are U.S.-licensed and board-certified, with active DEA
            registration and state licensure matched to where you live.
          </p>
        </Reveal>

        <div
          data-testid="physicians-boards"
          role="list"
          aria-label="Board certifications and licensure"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {boards.map((c) => (
            <div
              key={c.abbr}
              role="listitem"
              data-testid={`physicians-board-${c.abbr.replace(/\s+/g, "-").toLowerCase()}`}
              style={{ borderTop: "2px solid var(--nx-cobalt)", paddingTop: "1rem" }}
            >
              <p
                style={{
                  fontFamily: F,
                  fontSize: "var(--nx-t-lg)",
                  fontWeight: 600,
                  color: "var(--nx-fg)",
                  marginBottom: "0.35rem",
                }}
              >
                {c.abbr}
              </p>
              <p
                style={{
                  fontFamily: F,
                  fontSize: "var(--nx-t-sm)",
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
                  fontFamily: F,
                  fontSize: "var(--nx-t-xs)",
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
