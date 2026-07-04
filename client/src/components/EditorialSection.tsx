import { Reveal } from "./Reveal";
const editorialBloodwork = "img/img_dbc2b8fe6999.webp";
const editorialPrescription = "img/img_ceff7bb26099.webp";
const lifestyleWindowPortrait = "img/img_232f30f5a464.webp";
import lifestyleProtocolBinder from "@/assets/brand/lifestyle-protocol-binder.webp";

/**
 * EditorialSection — reference "Why Peptides" pattern.
 * Long-form 2-column block with serif pull quote centered.
 * Reads like New Yorker copy, not marketing.
 * One editorial image as supporting visual.
 */

interface EditorialSectionProps {
  gender?: "women" | "men";
}

const womenContent = {
  eyebrow: "The Science",
  headline: "Why peptides are different.",
  body1: `Most wellness interventions work around your biology. Peptides work with it. These short chains of amino acids — ten to fifty residues long — are molecular messengers your body already knows. When Tirzepatide binds to a GLP-1 receptor, it isn't overriding your metabolism; it's amplifying a conversation that was already happening. When GHK-Cu arrives at a fibroblast, the cell doesn't reject it as foreign. It reads the signal and begins producing collagen.`,
  pullQuote: "Peptides don't replace what's working. They restore what stopped.",
  body2: `This is why physician supervision matters more, not less, with peptides. The dose-response relationship is nuanced. IGF-1 elevation from ipamorelin follows your natural pulsatile GH rhythm — get the timing wrong and you blunt the effect. Get the compounding wrong and you have nothing. This is why every Nexphoria protocol begins with a 65-marker blood panel: we are not guessing at your baseline. We are measuring it, then calibrating to it.`,
  body3: `The 503A pharmacy standard exists precisely because precision compounding cannot be achieved at industrial scale. Sterile preparation, batch-specific potency testing, cold-chain storage — these are not branding decisions. They are prerequisites. A peptide that has degraded in transit is not a peptide. It is an expensive saline injection.`,
  image: lifestyleWindowPortrait,
  imageAlt: "Woman reviewing lab results in window light, illustrating the peptide protocol outcome",
  footnote: "Individual results vary. All protocols are prescribed by licensed US physicians and compounded by 503A pharmacies.",
};

const menContent = {
  eyebrow: "The Science",
  headline: "What peptides actually do.",
  body1: `Testosterone optimization has been the dominant framework in men's health for a generation. Replace what's missing — TRT has helped millions of men. But testosterone therapy suppresses your own production axis. Testicular function atrophies under exogenous hormone. The HPG axis shuts down. For men who want the hormonal optimization without the trade-off, the framework has shifted: instead of replacing, we stimulate. Enclomiphene doesn't deliver testosterone. It signals the pituitary to produce LH and FSH, which tells the testes to produce testosterone on their own.`,
  pullQuote: "The most effective interventions mimic biology rather than bypassing it.",
  body2: `Growth hormone secretagogues operate on the same principle. CJC-1295 and ipamorelin don't deliver synthetic HGH — they signal the pituitary to release your own. The result is a pulsatile pattern that mirrors how healthy twenty-five-year-old physiology works. IGF-1 rises. Lean mass responds. Recovery accelerates. And because you're not suppressing your axis, the benefit doesn't disappear when you stop the protocol.`,
  body3: `The data is granular because the measurement is granular. Every Nexphoria protocol begins with a 65-marker blood panel. We're tracking IGF-1, testosterone (total and free), LH, FSH, estradiol, SHBG, and twenty more hormonal and metabolic markers — because optimization without measurement is guesswork. Your quarterly reassessment panel is included. If your numbers don't move in the right direction, we adjust the protocol. That is what physician supervision looks like in practice.`,
  image: lifestyleProtocolBinder,
  imageAlt: "Leather protocol binder with anatomical diagrams and peptide compounding notes on physician desk",
  footnote: "Individual results vary. All protocols are prescribed by licensed US physicians and compounded by 503A pharmacies.",
};

export function EditorialSection({ gender = "women" }: EditorialSectionProps) {
  const content = gender === "men" ? menContent : womenContent;

  return (
    <section
      className="nx-section"
      style={{ backgroundColor: "var(--nx-bg-cream)" }}
      data-testid="editorial-section"
    >
      <div className="nx-container">
        <Reveal>
          <div className="flex items-center gap-3 mb-6">
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
              {content.eyebrow}
            </p>
          </div>

          <h2
            style={{
              fontFamily: "'General Sans', system-ui, sans-serif",
              fontWeight: 500,
              fontSize: "clamp(2rem, 3.5vw, 3.25rem)",
              color: "var(--nx-fg)",
              lineHeight: 1.08,
              marginBottom: "3.5rem",
              maxWidth: "540px",
            }}
          >
            {content.headline}
          </h2>
        </Reveal>

        {/* Two-column editorial layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
          {/* Left: Long-form copy */}
          <Reveal>
            <div>
              <p
                style={{
                  fontFamily: "'General Sans', system-ui, sans-serif",
                  fontSize: "1.0625rem",
                  lineHeight: 1.75,
                  color: "var(--nx-fg-graphite)",
                  marginBottom: "2rem",
                }}
              >
                {content.body1}
              </p>

              {/* Pull quote — reference pattern: serif italic, in middle of copy */}
              <blockquote
                style={{
                  borderLeft: "2px solid var(--nx-cobalt)",
                  paddingLeft: "1.5rem",
                  marginLeft: 0,
                  marginBottom: "2rem",
                }}
              >
                <p
                  style={{
                    fontFamily: "'General Sans', system-ui, sans-serif",
                    
                    fontWeight: 400,
                    fontSize: "clamp(1.375rem, 2.2vw, 1.875rem)",
                    color: "var(--nx-fg)",
                    lineHeight: 1.45,
                    letterSpacing: "-0.01em",
                  }}
                >
                  {content.pullQuote}
                </p>
              </blockquote>

              <p
                style={{
                  fontFamily: "'General Sans', system-ui, sans-serif",
                  fontSize: "1.0625rem",
                  lineHeight: 1.75,
                  color: "var(--nx-fg-graphite)",
                  marginBottom: "2rem",
                }}
              >
                {content.body2}
              </p>

              <p
                style={{
                  fontFamily: "'General Sans', system-ui, sans-serif",
                  fontSize: "1.0625rem",
                  lineHeight: 1.75,
                  color: "var(--nx-fg-graphite)",
                }}
              >
                {content.body3}
              </p>
            </div>
          </Reveal>

          {/* Right: Supporting image */}
          <Reveal delay={150}>
            <div
              style={{
                position: "sticky",
                top: "6rem",
              }}
            >
              <div
                style={{
                  borderRadius: "var(--nx-r-md)",
                  overflow: "hidden",
                  aspectRatio: "3/4",
                  backgroundColor: "var(--nx-fg)",
                }}
              >
                <img
                  src={content.image}
                  alt={content.imageAlt}
                  loading="lazy"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: "center",
                  }}
                />
              </div>

              {/* Footnote below image */}
              <p
                style={{
                  fontFamily: "'General Sans', system-ui, sans-serif",
                  fontSize: "9px",
                  letterSpacing: "0.08em",
                  color: "var(--nx-fg-muted)",
                  lineHeight: 1.6,
                  marginTop: "1rem",
                }}
              >
                {content.footnote}
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
