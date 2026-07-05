import { StartIntakeButton } from "./StartIntakeButton";
import { Link } from "wouter";
import { Reveal } from "./Reveal";
import { S } from "@/lib/typography";

interface FinalCTAStripProps {
  /** omit on shared/unworlded pages — the browse CTA then goes to the neutral catalog */
  gender?: "women" | "men";
  title?: string;
  sub?: string;
}

/**
 * FinalCTAStrip — reference pattern: full-bleed Deep Sage background, ~280-320px tall.
 * Centered headline in cream + 1-sentence subhead + cream CTA button.
 * Scroll-fade entrance via Reveal.
 */
export function FinalCTAStrip({
  gender,
  title,
  sub = "Complete your intake in 4 minutes. Blood panel included with every protocol.",
}: FinalCTAStripProps) {
  const browsePath = gender ? `/${gender}/peptides` : "/peptides";

  const defaultTitle =
    gender === "men"
      ? "Your protocol. Your physician. Your results."
      : "Physician-guided. Clinically precise. Personally yours.";

  const headline = title || defaultTitle;

  return (
    <section
      style={{
        backgroundColor: "var(--nx-cobalt)",
        minHeight: "300px",
        display: "flex",
        alignItems: "center",
      }}
      data-testid="final-cta-strip"
    >
      <div className="nx-container" style={{ padding: "clamp(2.5rem, 6vw, 5rem) var(--nx-gutter)", textAlign: "center" }}>
        <Reveal>
          {/* Eyebrow */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "12px",
              marginBottom: "1.75rem",
            }}
          >
            <div
              style={{
                width: "40px",
                height: "1px",
                backgroundColor: "rgba(255,255,255,0.3)",
              }}
            />
            <p
              style={{
                fontFamily: "'General Sans', system-ui, sans-serif",
                fontSize: "10px",
                fontWeight: 500,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.55)",
              }}
            >
              READY?
            </p>
            <div
              style={{
                width: "40px",
                height: "1px",
                backgroundColor: "rgba(255,255,255,0.3)",
              }}
            />
          </div>

          {/* Main headline — Fraunces serif, cream (editorial hero voice) */}
          <h2
            style={{
              fontFamily: S,
              fontWeight: 500,
              fontSize: "clamp(2rem, 4.5vw, 3.625rem)",
              color: "var(--nx-ceramic)",
              lineHeight: 1.1,
              letterSpacing: "-0.01em",
              maxWidth: "700px",
              margin: "0 auto 1.25rem",
            }}
          >
            {headline}
          </h2>

          {/* Sub-copy — cream tinted */}
          <p
            style={{
              fontFamily: "'General Sans', system-ui, sans-serif",
              fontSize: "1.0625rem",
              color: "rgba(246, 249, 252,0.72)",
              lineHeight: 1.6,
              maxWidth: "480px",
              margin: "0 auto 2.75rem",
            }}
          >
            {sub}
          </p>

          {/* CTAs */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: "1rem",
            }}
          >
            {/* Cream button (inverted) */}
            <StartIntakeButton
              productSlug={gender ? `${gender}-final-cta` : "final-cta"}
              source="final-cta-strip"
              style={{
                backgroundColor: "var(--nx-ceramic)",
                color: "var(--nx-cobalt)",
                borderColor: "var(--nx-ceramic)",
                padding: "0.875rem 2rem",
              }}
            >
              Start your assessment
            </StartIntakeButton>

            {/* Ghost dark button */}
            <Link
              href={browsePath}
              className="nx-cta-ghost-dark"
              style={{ padding: "0.875rem 2rem" }}
              data-testid="browse-peptides-link"
            >
              Browse peptides ↗
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
