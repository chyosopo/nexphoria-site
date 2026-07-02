import { Stethoscope, FlaskConical, Package, TestTube, Award, ShieldCheck } from "lucide-react";

/**
 * TrustStrip — Maximus pharmacy-certs-first pattern.
 * Top row: 5 compliance certs as small monochrome marks.
 * Bottom row: 4 pillar icons + label + sub.
 * Comes IMMEDIATELY after hero (Maximus: trust architecture before doctor cards).
 */

const certMarks = [
  "LegitScript Certified",
  "CLIA-Certified Labs",
  "USP-Compliant Compounding",
  "Quest Diagnostics Partner",
  "503A Licensed Pharmacy",
];

const pillars = [
  {
    icon: Stethoscope,
    label: "Medical evaluation",
    sub: "Board-certified US physicians",
  },
  {
    icon: FlaskConical,
    label: "Sterile compounding",
    sub: "state-licensed 503A pharmacies",
  },
  {
    icon: Package,
    label: "Clinical readiness",
    sub: "Cold-chain ready-to-inject delivery",
  },
  {
    icon: TestTube,
    label: "Lab tested",
    sub: "Blood panels pre and post protocol",
  },
];

export function TrustStrip() {
  return (
    <div
      className="w-full"
      style={{
        backgroundColor: "var(--nx-bg-cream)",
        borderTop: "1px solid var(--nx-border)",
        borderBottom: "1px solid var(--nx-border)",
      }}
      data-testid="trust-strip"
    >
      {/* Top cert row */}
      <div
        className="nx-container"
        style={{
          paddingTop: "1.25rem",
          paddingBottom: "1rem",
          borderBottom: "1px solid var(--nx-border)",
        }}
      >
        <div className="flex flex-wrap items-center gap-x-8 gap-y-2 justify-center md:justify-start">
          <p
            style={{
              fontFamily: "'General Sans', system-ui, sans-serif",
              fontSize: "9px",
              fontWeight: 500,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "var(--nx-fg-muted)",
              flexShrink: 0,
            }}
          >
            Standards &amp; Certifications
          </p>
          {certMarks.map((cert) => (
            <div
              key={cert}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "5px",
              }}
            >
              <ShieldCheck
                size={12}
                style={{ color: "var(--nx-cobalt)", opacity: 0.7, flexShrink: 0 }}
                strokeWidth={2}
              />
              <p
                style={{
                  fontFamily: "'General Sans', system-ui, sans-serif",
                  fontSize: "10px",
                  fontWeight: 500,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "var(--nx-fg-graphite)",
                  whiteSpace: "nowrap",
                }}
              >
                {cert}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom 4-pillar row */}
      <div className="nx-container">
        <div className="grid grid-cols-2 md:grid-cols-4">
          {pillars.map(({ icon: Icon, label, sub }, i) => (
            <div
              key={label}
              className="flex items-center gap-3 py-5 px-4"
              style={{
                borderRight:
                  i < 3 ? "1px solid var(--nx-border)" : "none",
              }}
            >
              <Icon
                size={20}
                style={{ color: "var(--nx-cobalt)", flexShrink: 0 }}
                strokeWidth={1.5}
              />
              <div>
                <p
                  style={{
                    fontFamily: "'General Sans', system-ui, sans-serif",
                    fontSize: "10px",
                    fontWeight: 500,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "var(--nx-fg)",
                  }}
                >
                  {label}
                </p>
                <p
                  style={{
                    fontFamily: "'General Sans', system-ui, sans-serif",
                    fontSize: "12px",
                    color: "var(--nx-fg-graphite)",
                    marginTop: "2px",
                  }}
                >
                  {sub}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
