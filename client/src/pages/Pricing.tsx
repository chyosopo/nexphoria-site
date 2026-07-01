import React from "react";
import { SiteLayout } from "@/components/SiteLayout";
import { StartIntakeButton } from "@/components/StartIntakeButton";
import { FinalCTAStrip } from "@/components/FinalCTAStrip";
import { Reveal } from "@/components/Reveal";
import { StartIntakeButton } from "@/components/StartIntakeButton";
import { TrustStatsStrip } from "@/components/TrustStatsStrip";
import { Check, X } from "lucide-react";
import { useSeo } from "@/lib/seo";
import { HeroTile, MxHeader, ColoredHeroTile, TileGlyphs } from "@/components/MaximusTile";
import { PillBadge } from "@/components/PillBadge";

const protocols = [
  {
    name: "Metabolic",
    description: "GLP-1 agonist protocols (semaglutide, tirzepatide). Includes HbA1c, fasting insulin, and lipid panel monitoring.",
    monthlyFrom: 349,
    slug: "starter",
  },
  {
    name: "Tissue Repair",
    description: "BPC-157, TB-500, and GHK-Cu compounded formulations. Inflammatory and hepatic markers included.",
    monthlyFrom: 279,
    slug: "tissue-repair",
  },
  {
    name: "Growth Hormone Axis",
    description: "CJC-1295, Ipamorelin, Sermorelin, and Tesamorelin. IGF-1 and growth hormone axis monitoring.",
    monthlyFrom: 319,
    slug: "ghs",
  },
  {
    name: "HPG-Axis / Hormonal",
    description: "Enclomiphene and Kisspeptin protocols. Full HPG-axis panel including LH, FSH, total and free testosterone.",
    monthlyFrom: 299,
    slug: "hpg",
  },
  {
    name: "Longevity",
    description: "NAD+, MOTS-c, and Epitalon. Epigenetic clock testing and mitochondrial function markers available.",
    monthlyFrom: 389,
    slug: "longevity",
  },
  {
    name: "Cognitive",
    description: "Selank and Semax intranasal formulations. BDNF and baseline inflammatory markers monitored quarterly.",
    monthlyFrom: 249,
    slug: "cognitive",
  },
];

const billingTerms = [
  {
    label: "Monthly",
    discount: null,
    badge: null,
    note: "Billed month-to-month. Cancel anytime.",
  },
  {
    label: "6-Month",
    discount: "Save 10%",
    badge: null,
    note: "Paid in full at start. Protocols lock for 6 months.",
  },
  {
    label: "12-Month",
    discount: "Save 20%",
    badge: "BEST VALUE",
    note: "Paid in full. Lowest per-month cost of any term.",
  },
];

const included = [
  "Board-certified physician consultation (initial + follow-up)",
  "Compounded peptides from a 503A-licensed US pharmacy",
  "Quest Diagnostics labs every 90 days",
  "Overnight cold-chain shipping",
  "Physician re-evaluation at each lab cycle",
  "Secure telehealth messaging between visits",
  "Itemized receipts for FSA/HSA submission",
];

const comparison = [
  { feature: "Quest Diagnostics labs included", nexphoria: true, others: false },
  { feature: "Board-certified US physician on every case", nexphoria: true, others: "varies" },
  { feature: "503A US compounding pharmacy only", nexphoria: true, others: false },
  { feature: "Quarterly monitoring included", nexphoria: true, others: false },
  { feature: "No long-term contracts", nexphoria: true, others: false },
  { feature: "FSA/HSA receipts provided", nexphoria: true, others: false },
  { feature: "Physician declines if inappropriate", nexphoria: true, others: "rarely" },
];

function PricingFAQItem({ item, idx }: { item: { q: string; a: string }; idx: number }) {
  const [open, setOpen] = React.useState(false);
  return (
    <div style={{ borderBottom: "1px solid var(--nx-border)" }}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        style={{ width: "100%", display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "1rem", padding: "1.25rem 0", background: "none", border: "none", cursor: "pointer", textAlign: "left" }}
      >
        <span style={{ fontFamily: "'General Sans', system-ui, sans-serif", fontSize: "15px", fontWeight: 500, color: "var(--nx-fg)", lineHeight: 1.4 }}>{item.q}</span>
        <span style={{ fontFamily: "'General Sans', system-ui, sans-serif", fontSize: "14px", color: open ? "var(--nx-cobalt)" : "var(--nx-fg-muted)", flexShrink: 0, marginTop: "2px" }}>{open ? "−" : "+"}</span>
      </button>
      {open && (
        <div style={{ paddingBottom: "1.25rem" }}>
          <p style={{ fontFamily: "'General Sans', system-ui, sans-serif", fontSize: "0.9375rem", color: "#4A4A4A", lineHeight: 1.7 }}>{item.a}</p>
        </div>
      )}
    </div>
  );
}

export default function Pricing() {
  useSeo({
    title: "Pricing | Nexphoria",
    description: "Transparent pricing. Everything included. No labs upsell.",
    path: "/pricing",
  });
  return (
    <SiteLayout navVariant="showcase">
      <main id="main-content" style={{ background: "var(--mx-page-bg)" }}>
        <div className="mx-page">
          <MxHeader
            badge={<PillBadge tone="acid">Pricing</PillBadge>}
            headline={
              <>
                <span style={{ color: "color-mix(in oklab, var(--nx-fg) 32%, transparent)" }}>Transparent</span> pricing.<br />
                <span>No hidden fees.</span>
              </>
            }
            subtitle="Monthly subscriptions, single-protocol purchases, or stacked bundles. Your physician consult and bloodwork are included in every plan."
          />

          <div className="mx-grid">
            <ColoredHeroTile
              href="/pricing"
              tone="butter"
              glyph={TileGlyphs.hex}
              label={<>Single protocols<br /><span>month-to-month</span></>}
              caption="From $189/month"
              ctaLabel="See plans"
            />
            <ColoredHeroTile
              href="/stacks"
              tone="sand"
              glyph={TileGlyphs.circle}
              label={<>Bundled stacks<br /><span>best value</span></>}
              caption="From $189/month"
              ctaLabel="See plans"
            />
          </div>
        </div>
      </main>

      {/* EVERYTHING BELOW STAYS UNCHANGED */}


      {/* ── Protocol pricing table ── */}
      <section
        className="py-24 md:py-32"
        style={{ backgroundColor: "var(--nx-bg-cream)", borderTop: "1px solid var(--nx-border)" }}
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
              PROTOCOLS
            </p>
            <h2
              style={{
                fontFamily: "'General Sans', system-ui, sans-serif",
                fontWeight: 500,
                
                fontSize: "clamp(2rem, 4vw, 3rem)",
                color: "var(--nx-fg)",
                lineHeight: 1.1,
                marginBottom: "2rem",
              }}
            >
              Starting prices by protocol category.
            </h2>
          </Reveal>

          {/* Billing terms header */}
          <Reveal delay={40}>
            <div
              style={{
                border: "1.5px solid var(--nx-border)",
                borderRadius: "4px",
                overflow: "hidden",
                maxWidth: "860px",
              }}
            >
              {/* Column headers */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "2fr 1fr 1fr 1fr",
                  backgroundColor: "var(--nx-cobalt)",
                  padding: "0.875rem 1.5rem",
                  gap: "1rem",
                }}
              >
                <p
                  style={{
                    fontFamily: "'General Sans', system-ui, sans-serif",
                    fontSize: "9px",
                    fontWeight: 700,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,0.6)",
                  }}
                >
                  PROTOCOL
                </p>
                {billingTerms.map((term) => (
                  <div key={term.label} style={{ textAlign: "center" }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.4rem" }}>
                      <p
                        style={{
                          fontFamily: "'General Sans', system-ui, sans-serif",
                          fontSize: "9px",
                          fontWeight: 700,
                          letterSpacing: "0.14em",
                          textTransform: "uppercase",
                          color: "#FFFFFF",
                        }}
                      >
                        {term.label}
                      </p>
                      {term.badge && (
                        <span
                          style={{
                            fontFamily: "'General Sans', system-ui, sans-serif",
                            fontSize: "7px",
                            fontWeight: 700,
                            letterSpacing: "0.08em",
                            textTransform: "uppercase",
                            color: "var(--nx-cobalt)",
                            backgroundColor: "#FFFFFF",
                            padding: "1px 5px",
                            borderRadius: "100px",
                          }}
                        >
                          {term.badge}
                        </span>
                      )}
                    </div>
                    {term.discount && (
                      <p
                        style={{
                          fontFamily: "'General Sans', system-ui, sans-serif",
                          fontSize: "8px",
                          color: "rgba(255,255,255,0.6)",
                          marginTop: "2px",
                        }}
                      >
                        {term.discount}
                      </p>
                    )}
                  </div>
                ))}
              </div>

              {/* Protocol rows */}
              {protocols.map((protocol, i) => (
                <div
                  key={protocol.name}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "2fr 1fr 1fr 1fr",
                    padding: "1.25rem 1.5rem",
                    backgroundColor: i % 2 === 0 ? "#FFFFFF" : "var(--nx-bg-cream)",
                    borderTop: "1px solid var(--nx-border)",
                    gap: "1rem",
                    alignItems: "center",
                  }}
                  data-testid={`pricing-tier-${protocol.slug}`}
                >
                  <div>
                    <p
                      style={{
                        fontFamily: "'General Sans', system-ui, sans-serif",
                        fontSize: "14px",
                        fontWeight: 600,
                        color: "var(--nx-fg)",
                        marginBottom: "0.2rem",
                      }}
                    >
                      {protocol.name}
                    </p>
                    <p
                      style={{
                        fontFamily: "'General Sans', system-ui, sans-serif",
                        fontSize: "12px",
                        color: "#4A4A4A",
                        lineHeight: 1.5,
                      }}
                    >
                      {protocol.description}
                    </p>
                  </div>
                  {/* Monthly */}
                  <p
                    style={{
                      fontFamily: "'General Sans', system-ui, sans-serif",
                      fontSize: "1.25rem",
                      fontWeight: 500,
                      color: "var(--nx-fg)",
                      textAlign: "center",
                    }}
                  >
                    ${protocol.monthlyFrom}
                    <span
                      style={{
                        fontFamily: "'General Sans', system-ui, sans-serif",
                        fontSize: "9px",
                        color: "var(--nx-fg-muted)",
                        display: "block",
                        fontWeight: 500,
                      }}
                    >
                      /mo
                    </span>
                  </p>
                  {/* 6-month */}
                  <p
                    style={{
                      fontFamily: "'General Sans', system-ui, sans-serif",
                      fontSize: "1.25rem",
                      fontWeight: 500,
                      color: "var(--nx-fg)",
                      textAlign: "center",
                    }}
                  >
                    ${Math.round(protocol.monthlyFrom * 0.9)}
                    <span
                      style={{
                        fontFamily: "'General Sans', system-ui, sans-serif",
                        fontSize: "9px",
                        color: "var(--nx-fg-muted)",
                        display: "block",
                        fontWeight: 500,
                      }}
                    >
                      /mo
                    </span>
                  </p>
                  {/* 12-month */}
                  <p
                    style={{
                      fontFamily: "'General Sans', system-ui, sans-serif",
                      fontSize: "1.25rem",
                      fontWeight: 500,
                      color: "var(--nx-cobalt)",
                      textAlign: "center",
                    }}
                  >
                    ${Math.round(protocol.monthlyFrom * 0.8)}
                    <span
                      style={{
                        fontFamily: "'General Sans', system-ui, sans-serif",
                        fontSize: "9px",
                        color: "var(--nx-fg-muted)",
                        display: "block",
                        fontWeight: 500,
                      }}
                    >
                      /mo
                    </span>
                  </p>
                </div>
              ))}

              {/* Savings callout */}
              <div
                style={{
                  padding: "1rem 1.5rem",
                  borderTop: "1px solid var(--nx-border)",
                  backgroundColor: "var(--nx-fg)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  gap: "0.75rem",
                }}
              >
                <p style={{ fontFamily: "'General Sans', system-ui, sans-serif", fontSize: "10px", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--nx-bg-cream)" }}>
                  12-MONTH PLAN — SAVE UP TO 20% vs. MONTH-TO-MONTH
                </p>
                <p style={{ fontFamily: "'General Sans', system-ui, sans-serif", fontSize: "9px", color: "rgba(255,255,255,0.55)", letterSpacing: "0.1em" }}>
                  E.g. Metabolic: ${Math.round(349*12*0.8).toLocaleString()}/yr vs $${349*12}/yr monthly
                </p>
              </div>

              {/* Footer note */}
              <div
                style={{ padding: "1rem 1.5rem", borderTop: "1px solid var(--nx-border)", backgroundColor: "var(--nx-bg-cream)" }}
              >
                <p style={{ fontFamily: "'General Sans', system-ui, sans-serif", fontSize: "12px", color: "var(--nx-fg-muted)", lineHeight: 1.5 }}>
                  Starting prices. Final protocol cost determined at physician consultation based on compound selection and dosing.
                  Multi-compound protocols priced individually. All prices are monthly equivalent.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── What's included ── */}
      <section
        className="py-24 md:py-32"
        style={{ backgroundColor: "var(--nx-bg)", borderTop: "1px solid var(--nx-border)" }}
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
              ALWAYS INCLUDED
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
              What's in every protocol fee.
            </h2>
            <h2
              style={{
                fontFamily: "'General Sans', system-ui, sans-serif",
                fontWeight: 500,
                
                fontSize: "clamp(2rem, 4vw, 3rem)",
                color: "var(--nx-fg)",
                lineHeight: 1.1,
                marginBottom: "3rem",
              }}
            >
              Regardless of tier or term.
            </h2>
          </Reveal>
          <Reveal delay={40}>
            <div
              style={{
                border: "1.5px solid var(--nx-border)",
                borderRadius: "4px",
                overflow: "hidden",
                maxWidth: "600px",
              }}
            >
              {included.map((item, i) => (
                <div
                  key={item}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "0.875rem",
                    padding: "1rem 1.5rem",
                    backgroundColor: i % 2 === 0 ? "#FFFFFF" : "var(--nx-bg-cream)",
                    borderTop: i > 0 ? "1px solid var(--nx-border)" : "none",
                  }}
                >
                  <Check
                    size={14}
                    style={{
                      color: "var(--nx-cobalt)",
                      flexShrink: 0,
                      marginTop: "3px",
                    }}
                  />
                  <p
                    style={{
                      fontFamily: "'General Sans', system-ui, sans-serif",
                      fontSize: "14px",
                      color: "var(--nx-fg)",
                      lineHeight: 1.5,
                    }}
                  >
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
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
              HOW WE COMPARE
            </p>
            <h2
              style={{
                fontFamily: "'General Sans', system-ui, sans-serif",
                fontWeight: 500,
                
                fontSize: "clamp(2rem, 4vw, 3rem)",
                color: "var(--nx-fg)",
                lineHeight: 1.1,
                marginBottom: "3rem",
              }}
            >
              The clinical standard most providers skip.
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
                    fontFamily: "'General Sans', system-ui, sans-serif",
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
                    fontFamily: "'General Sans', system-ui, sans-serif",
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
                    fontFamily: "'General Sans', system-ui, sans-serif",
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
                      fontFamily: "'General Sans', system-ui, sans-serif",
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
                    ) : row.others === "varies" || row.others === "rarely" ? (
                      <span
                        style={{
                          fontFamily: "'General Sans', system-ui, sans-serif",
                          fontSize: "9px",
                          color: "var(--nx-fg-muted)",
                          fontWeight: 500,
                          textTransform: "uppercase",
                        }}
                      >
                        {row.others}
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

      {/* ── Refund policy ── */}
      <section
        className="py-16 md:py-20"
        style={{ backgroundColor: "var(--nx-bg)", borderTop: "1px solid var(--nx-border)" }}
      >
        <div className="nx-container max-w-screen-xl">
          <Reveal>
            <div style={{ maxWidth: "640px" }}>
              <p
                style={{
                  fontFamily: "'General Sans', system-ui, sans-serif",
                  fontSize: "10px",
                  fontWeight: 500,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "var(--nx-cobalt)",
                  marginBottom: "0.75rem",
                }}
              >
                REFUND POLICY
              </p>
              <p
                style={{
                  fontFamily: "'General Sans', system-ui, sans-serif",
                  fontSize: "1.0625rem",
                  color: "#4A4A4A",
                  lineHeight: 1.7,
                }}
              >
                Compounded medications that have been dispensed cannot be returned under federal
                compounding pharmacy regulations. Physician consultation fees are non-refundable
                after the consultation has been completed. If a physician declines your protocol
                request and no prescription is issued, you are not charged for pharmacy
                compounding. Subscription fees for upcoming billing cycles may be cancelled
                at any time from your member portal with no cancellation fee.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <TrustStatsStrip
        eyebrow="Why patients trust the price"
        heading="What ‘no hidden fees’ actually looks like."
      />

      {/* ── Pricing FAQ ── */}
      <section
        className="py-16 md:py-20"
        style={{ backgroundColor: "var(--nx-bg)", borderTop: "1px solid var(--nx-border)" }}
      >
        <div className="nx-container max-w-screen-xl">
          <Reveal>
            <p
              style={{ fontFamily: "'General Sans', system-ui, sans-serif", fontSize: "11px", fontWeight: 500, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--nx-cobalt)", marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.75rem" }}
            >
              <span style={{ display: "inline-block", width: "32px", height: "1px", backgroundColor: "var(--nx-cobalt)" }} />
              PRICING QUESTIONS
            </p>
            <h2
              style={{ fontFamily: "'General Sans', system-ui, sans-serif", fontWeight: 500,  fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)", color: "var(--nx-fg)", lineHeight: 1.1, marginBottom: "2.5rem" }}
            >
              Common questions about cost.
            </h2>
          </Reveal>
          <div style={{ maxWidth: "680px" }}>
            {[
              { q: "Is the physician consult included in the price?", a: "Yes. Your initial physician consultation and all follow-up consultations within your subscription cycle are included. There is no separate consultation fee." },
              { q: "Are labs included?", a: "Quest Diagnostics lab panels are included with 3-month and 12-month plans. Monthly plan members can add the 38-biomarker panel for $199 standalone, or it will be required before your first prescription at no additional charge on longer plans." },
              { q: "Can I use FSA or HSA funds?", a: "Yes. Compounded prescription medications and physician consultations are generally FSA/HSA-eligible. We provide itemized receipts at checkout. Confirm eligibility with your plan administrator." },
              { q: "What if the physician declines my protocol?", a: "If a physician determines your requested protocol is clinically inappropriate, no prescription is issued and you are not charged for pharmacy compounding. The physician may propose a modified alternative." },
              { q: "Is there a cancellation fee?", a: "No. Cancel anytime from your member portal with no penalty. Cancellation takes effect at the end of your current billing cycle. Compounded medications that have shipped cannot be returned." },
            ].map((item, i) => (
              <PricingFAQItem key={i} item={item} idx={i} />
            ))}
          </div>

          {/* Assessment CTA */}
          <Reveal delay={80}>
            <div className="mt-12 pt-8" style={{ borderTop: "1px solid var(--nx-border)" }}>
              <p style={{ fontFamily: "'General Sans', system-ui, sans-serif", fontWeight: 500,  fontSize: "clamp(1.375rem, 3vw, 2rem)", color: "var(--nx-fg)", lineHeight: 1.2, marginBottom: "1.25rem" }}>
                Peak Potential, Pinnacle Performance.
              </p>
              <p style={{ fontFamily: "'General Sans', system-ui, sans-serif", fontSize: "1rem", color: "#4A4A4A", lineHeight: 1.7, maxWidth: "520px", marginBottom: "1.75rem" }}>
                Start with a 5-minute assessment. Your physician will review your intake and design a protocol around your labs, your goals, and your physiology — not a template.
              </p>
              <StartIntakeButton source="pricing-page" size="lg">
                Start your assessment
              </StartIntakeButton>
            </div>
          </Reveal>
        </div>
      </section>

      <FinalCTAStrip
        gender="women"
        title="No consultation fee. Labs included."
        sub="Start your intake. Physician review within 48 hours of your Quest Diagnostics draw."
      />
    </SiteLayout>
  );
}
