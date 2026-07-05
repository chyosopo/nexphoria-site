import React from "react";
import { Link } from "wouter";
import { SiteLayout } from "@/components/SiteLayout";
import { StartIntakeButton } from "@/components/StartIntakeButton";
import { FinalCTAStrip } from "@/components/FinalCTAStrip";
import { Reveal } from "@/components/Reveal";
import { TrustStatsStrip } from "@/components/TrustStatsStrip";
import { Check, X } from "lucide-react";
import { useSeo, webPageJsonLd, faqJsonLd, orgJsonLd } from "@/lib/seo";
import { MxHeader } from "@/components/MaximusTile";
import { PillBadge } from "@/components/PillBadge";
import { BenefitTile, BenefitTileGrid } from "@/components/BenefitTile";
import { FlaskConical, Stethoscope, Truck, Receipt, ShieldCheck, ChevronsDownUp } from "lucide-react";
import heroPricing from "@/assets/brand/hero-pricing.webp";

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
    badge: "Best value",
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

const tiers = [
  {
    key: "solo",
    name: "Solo Peptide",
    tagline: "One targeted compound, one goal.",
    priceFrom: 149,
    recommended: false,
    features: [
      "Single physician-selected peptide",
      "Board-certified physician review",
      "503A US-compounded vial",
      "Cold-chain overnight shipping",
      "Secure telehealth messaging",
    ],
    cta: "Browse peptides",
    href: "/peptides",
  },
  {
    key: "stack",
    name: "Curated Stack",
    tagline: "Physician-built combinations that work in concert.",
    priceFrom: 279,
    recommended: true,
    features: [
      "2\u20134 synergistic peptides",
      "Everything in Solo",
      "Quest Diagnostics labs every 90 days",
      "Physician re-evaluation each lab cycle",
      "Protocol tuned to your biomarkers",
      "FSA/HSA itemized receipts",
    ],
    cta: "Browse stacks",
    href: "/stacks",
  },
  {
    key: "custom",
    name: "Custom Protocol",
    tagline: "A protocol designed around your labs and physiology.",
    priceFrom: 349,
    recommended: false,
    features: [
      "Fully bespoke compound selection",
      "Everything in Stack",
      "Extended biomarker + epigenetic panels",
      "Dedicated physician case ownership",
      "Quarterly dose titration",
      "Priority telehealth response",
    ],
    cta: "Start assessment",
    href: null,
  },
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

function PricingTiers() {
  return (
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
            Your plan
          </p>
          <h2
            style={{
              fontFamily: "'General Sans', system-ui, sans-serif",
              fontWeight: 600,
              fontSize: "clamp(2rem, 4vw, 3rem)",
              color: "var(--nx-fg)",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              marginBottom: "0.75rem",
            }}
          >
            One peptide or a full protocol. Physician and labs included either way.
          </h2>
          <p
            style={{
              fontFamily: "'General Sans', system-ui, sans-serif",
              fontSize: "1.0625rem",
              color: "#4A4A4A",
              lineHeight: 1.6,
              maxWidth: "640px",
              marginBottom: "3rem",
            }}
          >
            Every path includes physician review, US-compounded medication, and transparent pricing. No consultation fee.
          </p>
        </Reveal>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "1.5rem",
            alignItems: "stretch",
          }}
        >
          {tiers.map((tier, i) => (
            <Reveal key={tier.key} delay={i * 60}>
              <div
                data-testid={`tier-card-${tier.key}`}
                style={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  background: tier.recommended ? "var(--nx-fg)" : "#FFFFFF",
                  border: tier.recommended ? "1.5px solid var(--nx-fg)" : "1px solid var(--nx-border)",
                  borderRadius: "20px",
                  padding: "2rem",
                  position: "relative",
                }}
              >
                {tier.recommended && (
                  <span
                    style={{
                      position: "absolute",
                      top: "-11px",
                      left: "2rem",
                      fontFamily: "'General Sans', system-ui, sans-serif",
                      fontSize: "10px",
                      fontWeight: 600,
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      color: "var(--nx-fg)",
                      background: "var(--nx-acid)",
                      padding: "4px 12px",
                      borderRadius: "999px",
                    }}
                    data-testid={`tier-badge-${tier.key}`}
                  >
                    Most popular
                  </span>
                )}
                <p
                  style={{
                    fontFamily: "'General Sans', system-ui, sans-serif",
                    fontSize: "1.375rem",
                    fontWeight: 600,
                    letterSpacing: "-0.01em",
                    color: tier.recommended ? "var(--nx-bg-cream)" : "var(--nx-fg)",
                    marginBottom: "0.4rem",
                  }}
                >
                  {tier.name}
                </p>
                <p
                  style={{
                    fontFamily: "'General Sans', system-ui, sans-serif",
                    fontSize: "13px",
                    color: tier.recommended ? "rgba(255,255,255,0.6)" : "#6B6B6B",
                    lineHeight: 1.5,
                    marginBottom: "1.5rem",
                    minHeight: "39px",
                  }}
                >
                  {tier.tagline}
                </p>
                <div style={{ display: "flex", alignItems: "baseline", gap: "0.4rem", marginBottom: "1.75rem" }}>
                  <span
                    style={{
                      fontFamily: "'General Sans', system-ui, sans-serif",
                      fontSize: "10px",
                      textTransform: "uppercase",
                      letterSpacing: "0.12em",
                      color: tier.recommended ? "rgba(255,255,255,0.5)" : "#8A8A8A",
                    }}
                  >
                    From
                  </span>
                  <span
                    style={{
                      fontFamily: "'General Sans', system-ui, sans-serif",
                      fontSize: "2.25rem",
                      fontWeight: 600,
                      letterSpacing: "-0.02em",
                      color: tier.recommended ? "#FFFFFF" : "var(--nx-fg)",
                    }}
                    data-testid={`tier-price-${tier.key}`}
                  >
                    ${tier.priceFrom}
                  </span>
                  <span
                    style={{
                      fontFamily: "'General Sans', system-ui, sans-serif",
                      fontSize: "12px",
                      color: tier.recommended ? "rgba(255,255,255,0.5)" : "#8A8A8A",
                    }}
                  >
                    /mo
                  </span>
                </div>

                <div style={{ flex: 1, marginBottom: "1.75rem" }}>
                  <p
                    style={{
                      fontFamily: "'General Sans', system-ui, sans-serif",
                      fontSize: "10px",
                      fontWeight: 500,
                      letterSpacing: "0.16em",
                      textTransform: "uppercase",
                      color: tier.recommended ? "rgba(255,255,255,0.5)" : "#8A8A8A",
                      marginBottom: "0.875rem",
                    }}
                  >
                    What's included
                  </p>
                  <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                    {tier.features.map((f) => (
                      <li key={f} style={{ display: "flex", alignItems: "flex-start", gap: "0.625rem" }}>
                        <Check
                          size={14}
                          style={{ color: tier.recommended ? "var(--nx-acid)" : "var(--nx-success)", flexShrink: 0, marginTop: "2px" }}
                        />
                        <span
                          style={{
                            fontFamily: "'General Sans', system-ui, sans-serif",
                            fontSize: "13px",
                            color: tier.recommended ? "var(--nx-bg-cream)" : "#4A4A4A",
                            lineHeight: 1.45,
                          }}
                        >
                          {f}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {tier.href ? (
                  <Link asChild href={tier.href}>
                    <a
                      style={{
                        display: "block",
                        textAlign: "center",
                        padding: "0.875rem 1.5rem",
                        borderRadius: "12px",
                        fontFamily: "'General Sans', system-ui, sans-serif",
                        fontSize: "0.875rem",
                        fontWeight: 500,
                        letterSpacing: "0.02em",
                        background: tier.recommended ? "var(--nx-acid)" : "var(--nx-fg)",
                        color: tier.recommended ? "var(--nx-fg)" : "var(--nx-bg-cream)",
                      }}
                      data-testid={`link-tier-${tier.key}`}
                    >
                      {tier.cta}
                    </a>
                  </Link>
                ) : (
                  <StartIntakeButton source={`pricing-tier-${tier.key}`} size="lg" className="w-full justify-center">
                    {tier.cta}
                  </StartIntakeButton>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

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

/* ── Pricing FAQ data — drives FAQPage JSON-LD ───────────────── */
const PRICING_FAQ_ITEMS = [
  {
    q: "How much does Nexphoria cost per month?",
    a: "Nexphoria monthly subscriptions start at $249/month for cognitive peptide protocols (Selank, Semax) and range up to $389/month for longevity protocols (NAD+, MOTS-c, Epitalon). All plans include your physician consultation, compounded peptides from a U.S. 503A-licensed pharmacy, overnight cold-chain shipping, and Quest Diagnostics labs every 90 days. There are no hidden fees.",
  },
  {
    q: "Is the physician consultation included in the subscription price?",
    a: "Yes. Your initial board-certified physician consultation and all follow-up consultations within your active subscription cycle are included in the plan price. There is no separate consultation fee. If your physician declines to issue a prescription, you are not charged for pharmacy compounding.",
  },
  {
    q: "Can I save money by prepaying?",
    a: "Yes. A 6-month prepay saves 10% off the monthly rate. A 12-month annual plan saves 20% — the lowest per-month cost available. Both prepay options include the same physician consultations, quarterly bloodwork, and compounding benefits as monthly plans.",
  },
  {
    q: "Is peptide therapy FSA or HSA eligible?",
    a: "Compounded prescription medications and physician consultations are generally FSA/HSA-eligible medical expenses. Nexphoria provides itemized receipts at checkout that identify the prescription component separately from shipping. Confirm eligibility with your plan administrator before purchase, as rules vary by FSA/HSA type.",
  },
  {
    q: "What if I want to switch peptides mid-subscription?",
    a: "Protocol changes require a physician re-evaluation, which is included in your subscription. Your physician will review updated labs and goals before modifying your compound selection. Simple dose adjustments within the same compound can typically be handled via secure portal message without a full consult.",
  },
];

export default function Pricing() {
  useSeo({
    title: "Peptide therapy pricing — transparent, all-in, no lab upsell",
    description: "Single peptides from $149/mo, physician-curated stacks bundled at 12% off. Quest bloodwork, physician consult, and refills all included. No hidden fees. Cancel before dispense.",
    path: "/pricing",
    jsonLd: [
      webPageJsonLd({
        name: "Nexphoria Pricing",
        description: "Transparent all-in pricing for physician-prescribed peptide therapy — single peptides, bundles, and stacks.",
        path: "/pricing",
      }),
      orgJsonLd(),
      faqJsonLd(PRICING_FAQ_ITEMS),
    ],
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

          {/* Editorial hero — the pricing promise as a photograph, not a diagram */}
          <figure
            className="relative overflow-hidden"
            style={{ borderRadius: "20px", border: "1px solid var(--nx-border)" }}
            data-testid="pricing-hero-editorial"
          >
            <img
              src={heroPricing}
              alt="A man reviews a single clear pricing sheet at his kitchen table in warm morning light"
              className="w-full object-cover"
              style={{ aspectRatio: "21 / 9", minHeight: "320px" }}
              loading="eager"
              decoding="async"
            />
            <div
              aria-hidden
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to top, rgba(10,10,10,0.55) 0%, rgba(10,10,10,0.12) 38%, transparent 60%)",
              }}
            />
            <figcaption className="absolute left-0 right-0 bottom-0 p-6 md:p-10">
              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5">
                <p
                  style={{
                    fontFamily: "'General Sans', system-ui, sans-serif",
                    fontSize: "clamp(1.125rem, 2vw, 1.5rem)",
                    fontWeight: 500,
                    lineHeight: 1.35,
                    color: "#FFFFF3",
                    maxWidth: "34ch",
                    textShadow: "0 1px 12px rgba(10,10,10,0.35)",
                  }}
                >
                  One number a month. Physician, labs, medication, and shipping — all of it inside.
                </p>
                <div className="flex flex-wrap items-center gap-3">
                  <StartIntakeButton source="pricing-hero" size="lg">
                    Start your assessment
                  </StartIntakeButton>
                  <Link
                    href="/stacks"
                    className="inline-flex items-center justify-center rounded-full px-6 py-3.5 transition-colors"
                    style={{
                      fontFamily: "'General Sans', system-ui, sans-serif",
                      fontSize: "0.9375rem",
                      fontWeight: 500,
                      color: "#FFFFF3",
                      border: "1px solid rgba(255,255,243,0.55)",
                      minHeight: "44px",
                    }}
                    data-testid="pricing-hero-stacks-link"
                  >
                    Compare bundled stacks
                  </Link>
                </div>
              </div>
            </figcaption>
          </figure>
        </div>
      </main>

      {/* ── Tier comparison: Solo / Stack / Custom ── */}
      <PricingTiers />

      {/* ── Maximus-style benefit tile grid: what every plan includes ── */}
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
              Every plan
            </p>
            <h2
              style={{
                fontFamily: "'General Sans', system-ui, sans-serif",
                fontWeight: 600,
                fontSize: "clamp(2rem, 4vw, 3rem)",
                color: "var(--nx-fg)",
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
                marginBottom: "0.75rem",
              }}
            >
              Everything bundled. Nothing upsold.
            </h2>
            <p
              style={{
                fontFamily: "'General Sans', system-ui, sans-serif",
                fontSize: "1.0625rem",
                color: "#4A4A4A",
                lineHeight: 1.6,
                maxWidth: "640px",
                marginBottom: "3rem",
              }}
            >
              Six things every Nexphoria plan already includes — no add-ons, no lab upsell, no consultation fee.
            </p>
          </Reveal>

          <BenefitTileGrid cols={3}>
            <BenefitTile
              tone="cream"
              eyebrow="Physician"
              icon={<Stethoscope size={18} strokeWidth={1.5} />}
              headline="Board-certified US physician on every case."
              sub="Not a form. A licensed physician reviews your intake and labs before anything ships."
              testId="pricing-tile-physician"
            />
            <BenefitTile
              tone="cream"
              eyebrow="Labs"
              icon={<FlaskConical size={18} strokeWidth={1.5} />}
              headline="Quest Diagnostics bloodwork every 90 days."
              sub="Full biomarker panels included in every plan. No à la carte lab bills."
              testId="pricing-tile-labs"
            />
            <BenefitTile
              tone="cream"
              eyebrow="Pharmacy"
              icon={<ShieldCheck size={18} strokeWidth={1.5} />}
              headline="503A US-licensed compounding pharmacy only."
              sub="Every vial compounded in a US facility we vet. No overseas peptides."
              testId="pricing-tile-pharmacy"
            />
            <BenefitTile
              tone="cream"
              eyebrow="Shipping"
              icon={<Truck size={18} strokeWidth={1.5} />}
              headline="Cold-chain overnight, discreet."
              sub="Temperature-controlled overnight shipping in plain packaging. Signature confirmed."
              testId="pricing-tile-shipping"
            />
            <BenefitTile
              tone="cream"
              eyebrow="Adjustments"
              icon={<ChevronsDownUp size={18} strokeWidth={1.5} />}
              headline="Physician re-titrates each cycle."
              sub="Every 90 days, your physician reviews your labs and adjusts your dose. No extra visit fee."
              testId="pricing-tile-titration"
            />
            <BenefitTile
              tone="cream"
              eyebrow="Receipts"
              icon={<Receipt size={18} strokeWidth={1.5} />}
              headline="FSA/HSA itemized receipts, every month."
              sub="Pre-tax dollars for medical care. Automatic receipts, no requests, no friction."
              testId="pricing-tile-fsahsa"
            />
          </BenefitTileGrid>
        </div>
      </section>

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
              Protocol pricing
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
              What you pay. What you get. No surprises.
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
                    fontSize: "10px",
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
                          fontSize: "10px",
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
                          fontSize: "10px",
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
                        fontSize: "10px",
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
                        fontSize: "10px",
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
                        fontSize: "10px",
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
                <p style={{ fontFamily: "'General Sans', system-ui, sans-serif", fontSize: "10px", color: "rgba(255,255,255,0.55)", letterSpacing: "0.1em" }}>
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
              Always included
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
              How we compare
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
                    fontSize: "10px",
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
                    fontSize: "10px",
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
                    fontSize: "10px",
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
                          fontSize: "10px",
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
                Your protocol, built on your labs.
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

/* ── PRICING PLAN COMPARISON TABLE — semantic, AI-liftable ──────── */
const PLAN_COMPARISON_ROWS = [
  { feature: "Monthly cost (per peptide)", solo: "From $149/mo", stack: "From $279/mo", custom: "From $349/mo" },
  { feature: "Physician consultation (initial)", solo: "Included", stack: "Included", custom: "Included (dedicated)" },
  { feature: "Physician follow-up visits", solo: "Included", stack: "Included", custom: "Included (priority)" },
  { feature: "503A compounded peptides", solo: "1 compound", stack: "2–4 compounds", custom: "Fully bespoke" },
  { feature: "Quest Diagnostics labs (38 markers)", solo: "Add $199", stack: "Every 90 days — included", custom: "Extended panels — included" },
  { feature: "Cold-chain overnight shipping", solo: "Included", stack: "Included", custom: "Included" },
  { feature: "Telehealth secure messaging", solo: "Included", stack: "Included", custom: "Priority response" },
  { feature: "FSA/HSA itemized receipts", solo: "Included", stack: "Included", custom: "Included" },
  { feature: "Verdict", solo: "Best for single-goal starters", stack: "Best value for most patients", custom: "Best for complex protocols" },
];

export function PricingPlanTable() {
  const FONT = "'General Sans', system-ui, sans-serif";
  return (
    <section
      aria-labelledby="pricing-plan-table-heading"
      style={{ backgroundColor: "var(--nx-bg-cream)", borderTop: "1px solid var(--nx-border)", padding: "clamp(3rem, 6vw, 5rem) 0" }}
    >
      <div className="nx-container" style={{ maxWidth: "900px" }}>
        <Reveal>
          <h2
            id="pricing-plan-table-heading"
            style={{ fontFamily: FONT, fontWeight: 600, fontSize: "clamp(1.5rem, 3vw, 2.25rem)", color: "var(--nx-fg)", lineHeight: 1.1, letterSpacing: "-0.02em", marginBottom: "2rem" }}
          >
            Plan comparison at a glance.
          </h2>
        </Reveal>
        <Reveal delay={60}>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: FONT, fontSize: "13px" }}>
              <caption style={{ captionSide: "bottom", textAlign: "left", paddingTop: "0.75rem", fontSize: "11px", color: "var(--nx-fg-muted)" }}>
                Nexphoria plan comparison: Solo Peptide vs. Curated Stack vs. Custom Protocol. Save 10% (6-month) or 20% (12-month) with prepay.
              </caption>
              <thead>
                <tr style={{ backgroundColor: "var(--nx-cobalt)" }}>
                  <th scope="col" style={{ padding: "0.875rem 1rem", textAlign: "left", color: "rgba(255,255,255,0.65)", fontWeight: 600, fontSize: "10px", letterSpacing: "0.12em", textTransform: "uppercase" }}>Feature</th>
                  <th scope="col" style={{ padding: "0.875rem 1rem", textAlign: "center", color: "rgba(255,255,255,0.8)", fontWeight: 600, fontSize: "10px", letterSpacing: "0.12em", textTransform: "uppercase" }}>Solo Peptide</th>
                  <th scope="col" style={{ padding: "0.875rem 1rem", textAlign: "center", color: "#FFFFFF", fontWeight: 700, fontSize: "10px", letterSpacing: "0.12em", textTransform: "uppercase" }}>★ Curated Stack</th>
                  <th scope="col" style={{ padding: "0.875rem 1rem", textAlign: "center", color: "rgba(255,255,255,0.8)", fontWeight: 600, fontSize: "10px", letterSpacing: "0.12em", textTransform: "uppercase" }}>Custom Protocol</th>
                </tr>
              </thead>
              <tbody>
                {PLAN_COMPARISON_ROWS.map((row, i) => (
                  <tr key={row.feature} style={{ backgroundColor: i % 2 === 0 ? "#FFFFFF" : "var(--nx-bg-cream)", borderBottom: "1px solid var(--nx-border)" }}>
                    <th scope="row" style={{ padding: "0.875rem 1rem", textAlign: "left", fontWeight: row.feature === "Verdict" ? 700 : 500, color: row.feature === "Verdict" ? "var(--nx-cobalt)" : "var(--nx-fg)" }}>{row.feature}</th>
                    <td style={{ padding: "0.875rem 1rem", textAlign: "center", color: "var(--nx-fg-muted)", fontWeight: row.feature === "Verdict" ? 600 : 400 }}>{row.solo}</td>
                    <td style={{ padding: "0.875rem 1rem", textAlign: "center", fontWeight: 600, color: row.feature === "Verdict" ? "var(--nx-cobalt)" : "var(--nx-fg)" }}>{row.stack}</td>
                    <td style={{ padding: "0.875rem 1rem", textAlign: "center", color: "var(--nx-fg-muted)", fontWeight: row.feature === "Verdict" ? 600 : 400 }}>{row.custom}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
