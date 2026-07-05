import { physicians } from "@/data/physicians";
import { Reveal } from "./Reveal";

export function DoctorStrip() {
  return (
    <section
      className="nx-section"
      style={{ backgroundColor: "var(--nx-bg)" }}
      data-testid="doctor-strip"
    >
      <div className="nx-container">
        <Reveal>
          {/* Section eyebrow with hairline */}
          <div className="flex items-center gap-3 mb-5">
            <div
              style={{
                width: "40px",
                height: "1px",
                backgroundColor: "var(--nx-cobalt)",
                flexShrink: 0,
              }}
            />
            <p
              style={{
                fontFamily: "'General Sans', system-ui, sans-serif",
                fontSize: "10px",
                fontWeight: 500,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "var(--nx-cobalt)",
              }}
            >
              Medical Advisory
            </p>
          </div>

          <h2
            style={{
              fontFamily: "'General Sans', system-ui, sans-serif",
              fontWeight: 500,
              fontSize: "clamp(1.875rem, 3.5vw, 2.75rem)",
              color: "var(--nx-fg)",
              lineHeight: 1.1,
              marginBottom: "0.875rem",
            }}
          >
            Designed by US board-certified physicians.
          </h2>
          <p
            style={{
              fontFamily: "'General Sans', system-ui, sans-serif",
              fontSize: "1rem",
              color: "var(--nx-fg-graphite)",
              maxWidth: "560px",
              lineHeight: 1.65,
              marginBottom: "4rem",
            }}
          >
            Every Nexphoria protocol is reviewed and prescribed by licensed US physicians,
            board-certified in internal medicine, endocrinology, and integrative health.
          </p>
        </Reveal>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8">
          {physicians.map((doc, i) => (
            <Reveal key={doc.name} delay={i * 80}>
              <div data-testid={`doctor-card-${i}`}>
                {/* Rectangular portrait — not circle */}
                <div
                  style={{
                    width: "100%",
                    aspectRatio: "3/4",
                    maxWidth: "120px",
                    overflow: "hidden",
                    borderRadius: "8px",
                    marginBottom: "1rem",
                    border: "1px solid var(--nx-border)",
                    backgroundColor: "var(--nx-bg-cream)",
                  }}
                >
                  <img
                    src={doc.photo}
                    alt={doc.name}
                    loading="lazy"
                    decoding="async"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      objectPosition: "center top",
                    }}
                  />
                </div>

                {/* Name — Playfair */}
                <p
                  style={{
                    fontFamily: "'General Sans', system-ui, sans-serif",
                    
                    fontWeight: 500,
                    fontSize: "1rem",
                    color: "var(--nx-fg)",
                    lineHeight: 1.3,
                    marginBottom: "6px",
                  }}
                >
                  {doc.name}
                </p>

                {/* Deep sage hairline under name */}
                <div
                  style={{
                    width: "28px",
                    height: "1px",
                    backgroundColor: "var(--nx-cobalt)",
                    marginBottom: "6px",
                    opacity: 0.5,
                  }}
                />

                {/* Credential */}
                <p
                  style={{
                    fontFamily: "'General Sans', system-ui, sans-serif",
                    fontSize: "10px",
                    fontWeight: 500,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "var(--nx-cobalt)",
                    lineHeight: 1.5,
                  }}
                >
                  {doc.specialty}
                </p>
                <p
                  style={{
                    fontFamily: "'General Sans', system-ui, sans-serif",
                    fontSize: "12px",
                    color: "var(--nx-fg-graphite)",
                    marginTop: "2px",
                  }}
                >
                  {doc.institution}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
