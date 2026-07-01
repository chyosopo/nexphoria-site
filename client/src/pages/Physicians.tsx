import { useState } from "react";
import { SiteLayout } from "@/components/SiteLayout";
import { StartIntakeButton } from "@/components/StartIntakeButton";
import { FinalCTAStrip } from "@/components/FinalCTAStrip";
import { Reveal } from "@/components/Reveal";
import { physicians, type Physician } from "@/data/physicians";
import { useSeo } from "@/lib/seo";
import lifestylePhysicianConsult from "@/assets/brand/lifestyle-physician-consult.webp";
import { HeroTile, MxHeader, ColoredHeroTile, TileGlyphs } from "@/components/MaximusTile";
import { PillBadge } from "@/components/PillBadge";

export default function Physicians() {
  useSeo({
    title: "Our Physicians | Nexphoria",
    description: "Board-certified U.S. physicians. Cleveland Clinic, Mayo, UCSF, Hopkins, Stanford.",
    path: "/physicians",
  });
  return (
    <SiteLayout navVariant="showcase">
      <main id="main-content" style={{ background: "var(--mx-page-bg)" }}>
        <div className="mx-page">
          <MxHeader
            badge={<PillBadge tone="acid">Medical team</PillBadge>}
            headline={
              <>
                <span style={{ color: "color-mix(in oklab, var(--nx-fg) 32%, transparent)" }}>Board-certified</span> physicians<br />
                <span>who actually answer.</span>
              </>
            }
            subtitle="Every protocol is reviewed and signed by a licensed U.S. physician. Direct message your prescribing doctor through the patient portal."
          />

          <div className="mx-grid">
            <ColoredHeroTile
              href="/physicians"
              tone="sky"
              glyph={TileGlyphs.circle}
              label={<>Physician-led<br /><span>every protocol</span></>}
              caption="Board-certified MDs"
              ctaLabel="Meet the team"
            />
            <ColoredHeroTile
              href="/physicians"
              tone="sand"
              glyph={TileGlyphs.leaf}
              label={<>Direct access<br /><span>zero gatekeeping</span></>}
              caption="Board-certified MDs"
              ctaLabel="Meet the team"
            />
          </div>
        </div>
      </main>

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
              THE PANEL
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
                  OUR STANDARDS
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
                    color: "#4A4A4A",
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
                            color: "#4A4A4A",
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
              HOW REVIEW WORKS
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
                  <p style={{ fontFamily: "'General Sans', system-ui, sans-serif", fontSize: "13.5px", color: "#4A4A4A", lineHeight: 1.7 }}>{body}</p>
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
              <p style={{ fontFamily: "'General Sans', system-ui, sans-serif", fontSize: "1rem", color: "#4A4A4A", lineHeight: 1.7, maxWidth: "480px", marginBottom: "1.75rem" }}>
                Your physician review is included with every protocol. Take the assessment and our team will match you with the right physician for your state and goals.
              </p>
              <StartIntakeButton source="physicians-page" size="lg">
                Begin physician-led intake
              </StartIntakeButton>
            </div>
          </Reveal>
        </div>
      </section>

      <FinalCTAStrip
        gender="women"
        title="Your physician review is included."
        sub="Quest Diagnostics labs drawn first. Board-certified MD review within 48 hours."
      />
    </SiteLayout>
  );
}

// ─────────────────────────────────────────────
// PhysicianCard — expandable, with extended bio + focus + publications
// ─────────────────────────────────────────────

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
        <p style={{ fontFamily: "'General Sans', system-ui, sans-serif", fontSize: "13px", color: "#4A4A4A", lineHeight: 1.65, marginBottom: "1rem" }}>
          {doc.bio}
        </p>

        {open && (
          <div style={{ marginTop: "0.5rem", marginBottom: "1rem", paddingTop: "1rem", borderTop: "1px solid #E8E9DB" }}>
            <p style={{ fontFamily: "'General Sans', system-ui, sans-serif", fontSize: "13px", color: "#4A4A4A", lineHeight: 1.7, marginBottom: "1rem" }}>
              {doc.extendedBio}
            </p>
            <p style={{ fontFamily: "'General Sans', system-ui, sans-serif", fontSize: "9px", fontWeight: 500, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--nx-fg)", marginBottom: "0.5rem" }}>
              Clinical focus
            </p>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, marginBottom: "1rem" }}>
              {doc.focus.map((f) => (
                <li key={f} style={{ fontFamily: "'General Sans', system-ui, sans-serif", fontSize: "12px", color: "#4A4A4A", lineHeight: 1.6, paddingLeft: "1rem", position: "relative" }}>
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
            <p style={{ fontFamily: "'General Sans', system-ui, sans-serif", fontSize: "12px", color: "#4A4A4A" }}>{doc.languages}</p>
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

