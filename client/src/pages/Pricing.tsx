import { SiteLayout } from "@/components/SiteLayout";
import { FinalCTAStrip } from "@/components/FinalCTAStrip";
import { Reveal } from "@/components/Reveal";
import { StartIntakeButton } from "@/components/StartIntakeButton";
import { Check, X } from "lucide-react";

const tiers = [
  {
    name: "Starter",
    tagline: "Single compound. One goal.",
    priceFrom: "$199",
    priceTo: "$299",
    period: "/mo",
    slug: "starter",
    includes: [
      "1 compounded peptide",
      "Initial 65-marker blood panel",
      "Board-certified physician consult",
      "Protocol guide & dosing schedule",
      "Member portal access",
      "Secure physician messaging",
    ],
    highlight: false,
  },
  {
    name: "Stack",
    tagline: "A complete protocol. Physician-monitored.",
    priceFrom: "$499",
    priceTo: "$749",
    period: "/mo",
    slug: "protocol",
    includes: [
      "2–3 compounded peptides",
      "Comprehensive 65-marker panel",
      "Board-certified physician consult",
      "Quarterly reassessments & labs",
      "Dose adjustments included",
      "Secure physician messaging",
    ],
    highlight: true,
  },
  {
    name: "Premium",
    tagline: "Full stack. Unlimited access.",
    priceFrom: "$999",
    priceTo: "$1,499",
    period: "/mo",
    slug: "concierge",
    includes: [
      "Up to 5 compounded peptides",
      "Monthly labs",
      "Priority physician response (< 4h)",
      "Unlimited dose adjustments",
      "Dedicated care coordinator",
      "Expedited cold-chain shipping",
    ],
    highlight: false,
  },
];

const comparison = [
  { feature: "Blood panel included", nexphoria: true, others: false },
  { feature: "Board-certified US physician", nexphoria: true, others: "sometimes" },
  { feature: "503A US compounding pharmacy", nexphoria: true, others: false },
  { feature: "Pre-filled syringes, no prep", nexphoria: true, others: false },
  { feature: "Quarterly lab monitoring", nexphoria: true, others: false },
  { feature: "No long-term contracts", nexphoria: true, others: false },
  { feature: "FSA/HSA eligible receipts", nexphoria: true, others: false },
];

export default function Pricing() {
  return (
    <SiteLayout navVariant="gate">
      {/* ── Hero ── */}
      <section
        className="py-32 md:py-40"
        style={{ backgroundColor: "var(--nx-bg)", borderBottom: "1px solid var(--nx-border)" }}
      >
        <div className="nx-container max-w-screen-xl">
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
              PRICING
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
                maxWidth: "700px",
              }}
            >
              No hidden fees.
            </h1>
            <p
              style={{
                fontFamily: "'Inter Tight', sans-serif",
                fontSize: "clamp(1rem, 2vw, 1.25rem)",
                color: "#4A4A4A",
                lineHeight: 1.6,
                maxWidth: "560px",
              }}
            >
              Lab work, physician consultation, and pharmacy compounding are included in your monthly fee.
              No surprise line items. Free first consultation.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── Pricing tiers ── */}
      <section
        className="py-24 md:py-32"
        style={{ backgroundColor: "var(--nx-bg-cream)", borderTop: "1px solid var(--nx-border)" }}
      >
        <div className="nx-container max-w-screen-xl">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: "1.5px",
              backgroundColor: "var(--nx-border)",
              border: "1.5px solid var(--nx-border)",
              maxWidth: "980px",
              margin: "0 auto",
            }}
          >
            {tiers.map((tier, i) => (
              <Reveal key={tier.name} delay={i * 80}>
                <div
                  style={{
                    backgroundColor: tier.highlight ? "var(--nx-cobalt)" : "#FFFFFF",
                    padding: "2.5rem 2rem",
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                  }}
                  data-testid={`pricing-tier-${tier.slug}`}
                >
                  {tier.highlight && (
                    <p
                      style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: "9px",
                        fontWeight: 700,
                        letterSpacing: "0.14em",
                        textTransform: "uppercase",
                        color: "rgba(255,255,255,0.7)",
                        marginBottom: "1rem",
                      }}
                    >
                      ● MOST POPULAR
                    </p>
                  )}

                  <h2
                    style={{
                      fontFamily: "'Playfair Display', Georgia, serif",
                      fontWeight: 500,
                      fontStyle: "italic",
                      fontSize: "1.75rem",
                      color: tier.highlight ? "#FFFFFF" : "var(--nx-fg)",
                      lineHeight: 1.1,
                      marginBottom: "0.375rem",
                    }}
                  >
                    {tier.name}
                  </h2>
                  <p
                    style={{
                      fontFamily: "'Inter Tight', sans-serif",
                      fontSize: "13px",
                      color: tier.highlight ? "rgba(255,255,255,0.65)" : "var(--nx-fg-muted)",
                      marginBottom: "1.75rem",
                    }}
                  >
                    {tier.tagline}
                  </p>

                  <div style={{ marginBottom: "2rem" }}>
                    <p
                      style={{
                        fontFamily: "'Playfair Display', Georgia, serif",
                        fontSize: "clamp(2rem, 4vw, 2.75rem)",
                        fontWeight: 500,
                        color: tier.highlight ? "#FFFFFF" : "var(--nx-fg)",
                        lineHeight: 1,
                        marginBottom: "0.25rem",
                      }}
                    >
                      {tier.priceFrom}
                      <span
                        style={{
                          fontSize: "1rem",
                          color: tier.highlight ? "rgba(255,255,255,0.6)" : "var(--nx-fg-muted)",
                          fontFamily: "'Inter Tight', sans-serif",
                        }}
                      >
                        {" "}–{" "}
                      </span>
                      {tier.priceTo}
                    </p>
                    <p
                      style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: "10px",
                        letterSpacing: "0.1em",
                        color: tier.highlight ? "rgba(255,255,255,0.55)" : "var(--nx-fg-muted)",
                      }}
                    >
                      PER MONTH · BASED ON PROTOCOL
                    </p>
                  </div>

                  <ul
                    style={{
                      listStyle: "none",
                      padding: 0,
                      margin: "0 0 2rem",
                      display: "flex",
                      flexDirection: "column",
                      gap: "0.75rem",
                      flexGrow: 1,
                    }}
                  >
                    {tier.includes.map((item) => (
                      <li
                        key={item}
                        style={{
                          display: "flex",
                          alignItems: "flex-start",
                          gap: "0.625rem",
                          fontFamily: "'Inter Tight', sans-serif",
                          fontSize: "13.5px",
                          color: tier.highlight ? "rgba(255,255,255,0.85)" : "#4A4A4A",
                          lineHeight: 1.5,
                        }}
                      >
                        <Check
                          size={13}
                          style={{
                            color: tier.highlight ? "rgba(255,255,255,0.8)" : "var(--nx-cobalt)",
                            flexShrink: 0,
                            marginTop: "3px",
                          }}
                        />
                        {item}
                      </li>
                    ))}
                  </ul>

                  <StartIntakeButton
                    productSlug={tier.slug}
                    source="pricing"
                    size="md"
                    className="w-full justify-center"
                    style={
                      tier.highlight
                        ? {
                            backgroundColor: "#FFFFFF",
                            color: "var(--nx-cobalt)",
                            border: "none",
                          }
                        : {}
                    }
                  >
                    Get started
                  </StartIntakeButton>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Always included strip ── */}
      <section
        className="py-24 md:py-32"
        style={{ backgroundColor: "var(--nx-bg)", borderTop: "1px solid var(--nx-border)" }}
      >
        <div className="nx-container max-w-screen-xl">
          <Reveal>
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
              ALWAYS INCLUDED
            </p>
            <h2
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontWeight: 500,
                fontStyle: "italic",
                fontSize: "clamp(2rem, 4vw, 3rem)",
                color: "var(--nx-fg)",
                lineHeight: 1.1,
                marginBottom: "3rem",
              }}
            >
              Regardless of tier, some things never change.
            </h2>
          </Reveal>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
              gap: "1.5px",
              backgroundColor: "var(--nx-border)",
              border: "1.5px solid var(--nx-border)",
            }}
          >
            {[
              { title: "MD consult", detail: "Free first consultation. Board-certified physician on every case." },
              { title: "65-marker blood panel", detail: "Every protocol starts with labs. Included in your first month." },
              { title: "503A compounding", detail: "Sterile, US-only, batch-tested. No overseas sourcing." },
              { title: "Cold-chain shipping", detail: "Insulated, temperature-controlled delivery to your door." },
              { title: "No contracts", detail: "Month-to-month. Cancel anytime. No cancellation fees." },
              { title: "FSA/HSA receipts", detail: "Detailed receipts for FSA/HSA submission at checkout." },
            ].map((item) => (
              <div
                key={item.title}
                style={{
                  backgroundColor: "var(--nx-bg-cream)",
                  padding: "1.75rem",
                }}
              >
                <p
                  style={{
                    fontFamily: "'Inter Tight', sans-serif",
                    fontSize: "14px",
                    fontWeight: 700,
                    color: "var(--nx-fg)",
                    marginBottom: "0.375rem",
                  }}
                >
                  {item.title}
                </p>
                <p
                  style={{
                    fontFamily: "'Inter Tight', sans-serif",
                    fontSize: "13px",
                    color: "#4A4A4A",
                    lineHeight: 1.55,
                  }}
                >
                  {item.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Comparison table ── */}
      <section
        className="py-24 md:py-32"
        style={{ backgroundColor: "var(--nx-bg-cream)", borderTop: "1px solid var(--nx-border)" }}
      >
        <div className="nx-container max-w-screen-xl">
          <Reveal>
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
              HOW WE COMPARE
            </p>
            <h2
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontWeight: 500,
                fontStyle: "italic",
                fontSize: "clamp(2rem, 4vw, 3rem)",
                color: "var(--nx-fg)",
                lineHeight: 1.1,
                marginBottom: "3rem",
              }}
            >
              The standard most clinics skip.
            </h2>
          </Reveal>

          <Reveal delay={60}>
            <div
              style={{
                border: "1.5px solid var(--nx-border)",
                borderRadius: "4px",
                overflow: "hidden",
                maxWidth: "680px",
              }}
            >
              {/* Header row */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "2fr 1fr 1fr",
                  backgroundColor: "var(--nx-cobalt)",
                  padding: "0.875rem 1.5rem",
                }}
              >
                <p
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "9px",
                    fontWeight: 700,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,0.6)",
                  }}
                >
                  FEATURE
                </p>
                <p
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "9px",
                    fontWeight: 700,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: "#FFFFFF",
                    textAlign: "center",
                  }}
                >
                  NEXPHORIA
                </p>
                <p
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "9px",
                    fontWeight: 700,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,0.55)",
                    textAlign: "center",
                  }}
                >
                  OTHER CLINICS
                </p>
              </div>

              {/* Data rows */}
              {comparison.map((row, i) => (
                <div
                  key={row.feature}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "2fr 1fr 1fr",
                    padding: "0.875rem 1.5rem",
                    backgroundColor: i % 2 === 0 ? "#FFFFFF" : "var(--nx-bg-cream)",
                    borderTop: "1px solid var(--nx-border)",
                    alignItems: "center",
                  }}
                >
                  <p
                    style={{
                      fontFamily: "'Inter Tight', sans-serif",
                      fontSize: "13px",
                      color: "var(--nx-fg)",
                      fontWeight: 500,
                    }}
                  >
                    {row.feature}
                  </p>
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <Check size={16} style={{ color: "var(--nx-success)" }} />
                  </div>
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    {row.others === true ? (
                      <Check size={16} style={{ color: "var(--nx-success)" }} />
                    ) : row.others === "sometimes" ? (
                      <span
                        style={{
                          fontFamily: "'JetBrains Mono', monospace",
                          fontSize: "9px",
                          color: "var(--nx-fg-muted)",
                          fontWeight: 500,
                        }}
                      >
                        VARIES
                      </span>
                    ) : (
                      <X size={16} style={{ color: "#C2440E" }} />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <FinalCTAStrip
        gender="women"
        title="Free first consult. No contracts."
        sub="Start your intake. Blood panel included with every protocol."
      />
    </SiteLayout>
  );
}
