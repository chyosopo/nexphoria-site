/* JOB: answer 'what does it cost' with catalog-true numbers and one path in. */
import React from "react";
import { Link } from "wouter";
import { SiteLayout } from "@/components/SiteLayout";
import { StartIntakeButton } from "@/components/StartIntakeButton";
import { FinalCTAStrip } from "@/components/FinalCTAStrip";
import { Reveal } from "@/components/Reveal";
import { TrustStatsStrip } from "@/components/TrustStatsStrip";
import { FaqAccordion } from "@/components/EnterprisePatterns";
import { Check, X } from "lucide-react";
import { useSeo, webPageJsonLd, faqJsonLd, orgJsonLd, breadcrumbJsonLd } from "@/lib/seo";
import { MxHeader } from "@/components/SignatureTile";
import heroPricing from "@/assets/brand/hero-pricing.webp";
import { PillBadge } from "@/components/PillBadge";
import { BenefitTile, BenefitTileGrid } from "@/components/BenefitTile";
import { FlaskConical, Stethoscope, Truck, Receipt, ShieldCheck, ChevronsDownUp } from "lucide-react";
import { F, FONT } from "@/lib/typography";
import { SOLO_FROM_LABEL, SOLO_FROM_PRICE, priceAtCadence, formatUSD, CADENCE_DISCOUNTS } from "@/data/pricing";
import { SOLO_CATALOG } from "@/data/soloCatalog";
import { FLAGSHIP_STACKS, getStack, PANELS, usd } from "@/data/stacksCatalog";
import { ComparisonMatrix } from "@/components/ComparisonMatrix";

/* ── Catalog-derived pricing — single source of truth is the pricing engine
   (CADENCE_DISCOUNTS / priceAtCadence) + the solo & stack catalogs. No dollar
   amount or percent on this page is hand-written; every figure resolves here. ── */
const CADENCE_ORDER = ["1mo", "3mo", "12mo"] as const;
const SAVE_3MO = CADENCE_DISCOUNTS["3mo"].savePct;
const SAVE_12MO = CADENCE_DISCOUNTS["12mo"].savePct;

/* The shelf stacks that are actually sold (gated GLP-1 excluded). */
const NON_GATED_STACKS = FLAGSHIP_STACKS.filter((s) => !s.gated && s.cadences.length > 0);
const SOLO_1MO_FROM = Math.min(...SOLO_CATALOG.filter((s) => s.pricing).map((s) => s.pricing!.m1));
const STACK_FROM_12MO = Math.min(...NON_GATED_STACKS.map((s) => priceAtCadence(s.slug, "12mo")));
const STACK_TO_1MO = Math.max(...NON_GATED_STACKS.map((s) => priceAtCadence(s.slug, "1mo")));

/* Protocol rows = the shelf stacks, each priced straight from the catalog. */
const protocols = NON_GATED_STACKS.map((s) => ({
  name: s.name,
  description: `${s.peptides.map((p) => p.name).join(" + ")}. ${s.bestFor}`,
  slug: s.slug,
  m1: priceAtCadence(s.slug, "1mo"),
  m3: priceAtCadence(s.slug, "3mo"),
  m12: priceAtCadence(s.slug, "12mo"),
}));

/* Column headers derive from the cadence engine — three cadences only, no 6-month. */
const billingTerms = CADENCE_ORDER.map((k) => ({
  label: CADENCE_DISCOUNTS[k].label,
  discount: CADENCE_DISCOUNTS[k].savePct > 0 ? `Save ${CADENCE_DISCOUNTS[k].savePct}%` : null,
  badge: k === "12mo" ? "Best value" : null,
}));

/* Worked annual example for the savings callout — real catalog figures. */
const SAVINGS_EXAMPLE = (() => {
  const ex = getStack("meridian")!;
  const annual = ex.cadences.find((c) => c.key === "12mo")!.total;
  const monthlyYear = priceAtCadence("meridian", "1mo") * 12;
  return { name: ex.name, annual, monthlyYear };
})();

const included = [
  "Board-certified physician consultation (initial + follow-up)",
  "Compounded peptides from a 503A-licensed US pharmacy",
  "Partner-laboratory labs every 90 days",
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
    priceFrom: SOLO_FROM_PRICE as number | null,
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
    priceFrom: STACK_FROM_12MO as number | null,
    recommended: true,
    features: [
      "2\u20134 synergistic peptides",
      "Everything in Solo",
      "Partner-laboratory labs every 90 days",
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
    priceFrom: null as number | null,
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
  { feature: "Partner-laboratory labs included", nexphoria: true, others: false },
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
              fontSize: "var(--nx-t-xs)",
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
              fontFamily: "'Fraunces', Georgia, serif",
              fontWeight: 500,
              fontSize: "var(--nx-t-h2)",
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
              fontSize: "var(--nx-t-body)",
              color: "var(--nx-fg-graphite)",
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
                  background: tier.recommended ? "var(--nx-fg)" : "var(--nx-ceramic)",
                  border: tier.recommended ? "1.5px solid var(--nx-fg)" : "1px solid var(--nx-border)",
                  borderRadius: "var(--nx-r-lg)",
                  padding: "2.4rem 2.15rem",
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
                      fontSize: "var(--nx-t-xs)",
                      fontWeight: 600,
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      color: "var(--nx-fg)",
                      background: "var(--nx-acid)",
                      padding: "4px 12px",
                      borderRadius: "var(--nx-r-pill)",
                    }}
                    data-testid={`tier-badge-${tier.key}`}
                  >
                    Recommended
                  </span>
                )}
                <p
                  style={{
                    fontFamily: "'General Sans', system-ui, sans-serif",
                    fontSize: "var(--nx-t-xl)",
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
                    fontSize: "var(--nx-t-sm)",
                    color: tier.recommended ? "rgba(255,255,255,0.6)" : "var(--nx-fg-graphite)",
                    lineHeight: 1.5,
                    marginBottom: "1.5rem",
                    minHeight: "39px",
                  }}
                >
                  {tier.tagline}
                </p>
                <div
                  style={{ display: "flex", alignItems: "baseline", gap: "0.4rem", marginBottom: "1.75rem" }}
                  data-testid={`tier-price-${tier.key}`}
                >
                  {tier.priceFrom != null ? (
                    <>
                      <span
                        style={{
                          fontFamily: "'General Sans', system-ui, sans-serif",
                          fontSize: "var(--nx-t-xs)",
                          textTransform: "uppercase",
                          letterSpacing: "0.12em",
                          color: tier.recommended ? "rgba(255,255,255,0.5)" : "var(--nx-fg-muted)",
                        }}
                      >
                        From
                      </span>
                      <span
                        style={{
                          fontFamily: "'General Sans', system-ui, sans-serif",
                          fontSize: "var(--nx-t-display)",
                          fontWeight: 600,
                          letterSpacing: "-0.03em",
                          lineHeight: 1,
                          color: tier.recommended ? "var(--nx-ceramic)" : "var(--nx-fg)",
                        }}
                      >
                        {formatUSD(tier.priceFrom)}
                      </span>
                      <span
                        style={{
                          fontFamily: "'General Sans', system-ui, sans-serif",
                          fontSize: "var(--nx-t-xs)",
                          color: tier.recommended ? "rgba(255,255,255,0.5)" : "var(--nx-fg-muted)",
                        }}
                      >
                        /mo
                      </span>
                    </>
                  ) : (
                    <span
                      style={{
                        fontFamily: "'General Sans', system-ui, sans-serif",
                        fontSize: "var(--nx-t-xl)",
                        fontWeight: 600,
                        letterSpacing: "-0.01em",
                        lineHeight: 1.1,
                        color: tier.recommended ? "var(--nx-ceramic)" : "var(--nx-fg)",
                      }}
                    >
                      Priced at consultation
                    </span>
                  )}
                </div>

                <div style={{ flex: 1, marginBottom: "1.75rem" }}>
                  <p
                    style={{
                      fontFamily: "'General Sans', system-ui, sans-serif",
                      fontSize: "var(--nx-t-xs)",
                      fontWeight: 500,
                      letterSpacing: "0.16em",
                      textTransform: "uppercase",
                      color: tier.recommended ? "rgba(255,255,255,0.5)" : "var(--nx-fg-muted)",
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
                          aria-hidden="true"
                          style={{ color: tier.recommended ? "var(--nx-acid)" : "var(--nx-success)", flexShrink: 0, marginTop: "2px" }}
                        />
                        <span
                          style={{
                            fontFamily: "'General Sans', system-ui, sans-serif",
                            fontSize: "var(--nx-t-sm)",
                            color: tier.recommended ? "var(--nx-bg-cream)" : "var(--nx-fg-graphite)",
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
                        borderRadius: "var(--nx-r-md)",
                        fontFamily: "'General Sans', system-ui, sans-serif",
                        fontSize: "var(--nx-t-sm)",
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

/* ── Pricing FAQ data — drives FAQPage JSON-LD ───────────────── */
const PRICING_FAQ_ITEMS = [
  {
    q: "How much does Nexphoria cost per month?",
    a: `Single peptides start at ${SOLO_FROM_LABEL}/month on a 12-month plan and ${formatUSD(SOLO_1MO_FROM)}/month billed monthly. Physician-built stacks run from ${formatUSD(STACK_FROM_12MO)}/month up to ${formatUSD(STACK_TO_1MO)}/month, depending on protocol and cadence. Every plan includes your physician consultation, compounded peptides from a U.S. 503A-licensed pharmacy, overnight cold-chain shipping, and partner-laboratory labs. There are no hidden fees.`,
  },
  {
    q: "Is the physician consultation included in the subscription price?",
    a: "Yes. Your initial board-certified physician consultation and all follow-up consultations within your active subscription cycle are included in the plan price. There is no separate consultation fee. If your physician declines to issue a prescription, you are not charged for pharmacy compounding.",
  },
  {
    q: "Can I save money by prepaying?",
    a: `Yes. A quarterly (3-month) plan saves ${SAVE_3MO}% off the monthly rate. A 12-month annual plan saves ${SAVE_12MO}% — the lowest per-month cost available. Both include the same physician consultations, quarterly bloodwork, and compounding benefits as the monthly plan.`,
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

/* Panel-tier depth matrix — how far the included labs go at each tier.
   Price / free-with / retest bind to PANELS (single source of truth); the
   marker-group rows summarize each tier's cumulative `adds`. */
function PanelTierComparison() {
  const basic = PANELS.find((p) => p.tier === "Basic")!;
  const full = PANELS.find((p) => p.tier === "Full")!;
  const elite = PANELS.find((p) => p.tier === "Elite")!;
  return (
    <ComparisonMatrix
      testid="pricing-panel-tiers"
      background="var(--nx-bg-cream)"
      eyebrow="Labs, by tier"
      title="How deep the bloodwork goes."
      lead="Every plan includes physician-reviewed labs. Which tier you draw depends on your protocol — the deeper the therapy reaches, the deeper we read. You never pay à la carte."
      columns={[
        { label: "Basic panel", sub: basic.summary },
        { label: "Full panel", sub: full.summary, highlight: true, badge: "Most protocols" },
        { label: "Elite panel", sub: elite.summary },
      ]}
      rows={[
        {
          label: "Standalone price",
          cells: [
            { text: usd(basic.price), tone: "plain" },
            { text: usd(full.price), tone: "plain" },
            { text: usd(elite.price), tone: "plain" },
          ],
        },
        {
          label: "Included free with",
          cells: [
            { text: basic.freeWith ?? "—", tone: "plain" },
            { text: full.freeWith ?? "—", tone: "plain" },
            { text: elite.freeWith ?? "—", tone: "plain" },
          ],
        },
        {
          label: "Safety screen — CBC, metabolic, lipids, HbA1c, hs-CRP, TSH",
          cells: [
            { text: "Included", tone: "pos" },
            { text: "Included", tone: "pos" },
            { text: "Included", tone: "pos" },
          ],
        },
        {
          label: "Hormonal + GH axis — testosterone, LH/FSH, IGF-1, full thyroid",
          cells: [
            { text: "Not in Basic", tone: "neg" },
            { text: "Included", tone: "pos" },
            { text: "Included", tone: "pos" },
          ],
        },
        {
          label: "Advanced cardiometabolic — ApoB, Lp(a), LDL-P, HOMA-IR, IL-6/TNF-α",
          cells: [
            { text: "Not in Basic", tone: "neg" },
            { text: "Not in Full", tone: "neg" },
            { text: "Included", tone: "pos" },
          ],
        },
        {
          label: "Epigenetic age testing",
          cells: [
            { text: "Not included", tone: "neg" },
            { text: "Not included", tone: "neg" },
            { text: "Optional", tone: "pos" },
          ],
        },
        {
          label: "Retest schedule",
          cells: [
            { text: basic.retest, tone: "plain" },
            { text: full.retest, tone: "plain" },
            { text: elite.retest, tone: "plain" },
          ],
        },
      ]}
      footnote="Prices shown are standalone rates. On 3- and 12-month plans the panel your protocol requires is bundled in — there is no separate lab bill."
    />
  );
}

export default function Pricing() {
  useSeo({
    title: "Peptide therapy pricing — transparent, all-in, no lab upsell",
    description: `Single peptides from ${SOLO_FROM_LABEL}/mo, physician-curated stacks bundled at 12% off. Partner-laboratory bloodwork, physician consult, and refills all included. No hidden fees. Cancel before dispense.`,
    path: "/pricing",
    jsonLd: [
      webPageJsonLd({
        name: "Nexphoria Pricing",
        description: "Transparent all-in pricing for physician-prescribed peptide therapy — single peptides, bundles, and stacks.",
        path: "/pricing",
      }),
      orgJsonLd(),
      breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Pricing", path: "/pricing" }]),
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
                <span style={{ color: "color-mix(in oklab, var(--nx-fg) 62%, transparent)" }}>Transparent</span> pricing.<br />
                <span>No hidden fees.</span>
              </>
            }
            subtitle="Monthly subscriptions, single-protocol purchases, or stacked bundles. Your physician consult and bloodwork are included in every plan."
          />

          {/* Editorial hero — the pricing promise as a photograph, not a diagram */}
          <figure
            className="relative overflow-hidden"
            style={{ borderRadius: "var(--nx-r-lg)", border: "1px solid var(--nx-border)" }}
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
                  "linear-gradient(to top, color-mix(in srgb, var(--nx-fg) 58%, transparent) 0%, color-mix(in srgb, var(--nx-fg) 14%, transparent) 38%, transparent 60%)",
              }}
            />
            <figcaption className="absolute left-0 right-0 bottom-0 p-6 md:p-10">
              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5">
                <p
                  style={{
                    fontFamily: F,
                    fontSize: "var(--nx-t-xl)",
                    fontWeight: 500,
                    lineHeight: 1.35,
                    color: "var(--nx-ceramic)",
                    maxWidth: "34ch",
                    textShadow: "0 1px 12px color-mix(in srgb, var(--nx-fg) 40%, transparent)",
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
                    className="inline-flex items-center justify-center transition-colors"
                    style={{
                      fontFamily: F,
                      fontSize: "var(--nx-t-base)",
                      fontWeight: 500,
                      color: "var(--nx-ceramic)",
                      border: "1px solid color-mix(in srgb, var(--nx-ceramic) 55%, transparent)",
                      borderRadius: "var(--nx-r-pill)",
                      padding: "0.875rem 1.5rem",
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

      {/* ── reference-grade benefit tile grid: what every plan includes ── */}
      <section
        className="py-24 md:py-32"
        style={{ backgroundColor: "var(--nx-bg-cream)", borderTop: "1px solid var(--nx-border)" }}
      >
        <div className="nx-container max-w-screen-xl">
          <Reveal>
            <p
              style={{
                fontFamily: "'General Sans', system-ui, sans-serif",
                fontSize: "var(--nx-t-xs)",
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
                fontFamily: "'Fraunces', Georgia, serif",
                fontWeight: 500,
                fontSize: "var(--nx-t-h2)",
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
                fontSize: "var(--nx-t-body)",
                color: "var(--nx-fg-graphite)",
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
              icon={<Stethoscope size={18} strokeWidth={1.5} aria-hidden="true" />}
              headline="Board-certified US physician on every case."
              sub="Not a form. A licensed physician reviews your intake and labs before anything ships."
              testId="pricing-tile-physician"
            />
            <BenefitTile
              tone="cream"
              eyebrow="Labs"
              icon={<FlaskConical size={18} strokeWidth={1.5} aria-hidden="true" />}
              headline="Partner-laboratory bloodwork every 90 days."
              sub="Full biomarker panels included in every plan. No à la carte lab bills."
              testId="pricing-tile-labs"
            />
            <BenefitTile
              tone="cream"
              eyebrow="Pharmacy"
              icon={<ShieldCheck size={18} strokeWidth={1.5} aria-hidden="true" />}
              headline="503A US-licensed compounding pharmacy only."
              sub="Every vial compounded in a US facility we vet. No overseas peptides."
              testId="pricing-tile-pharmacy"
            />
            <BenefitTile
              tone="cream"
              eyebrow="Shipping"
              icon={<Truck size={18} strokeWidth={1.5} aria-hidden="true" />}
              headline="Cold-chain overnight, discreet."
              sub="Temperature-controlled overnight shipping in plain packaging. Signature confirmed."
              testId="pricing-tile-shipping"
            />
            <BenefitTile
              tone="cream"
              eyebrow="Adjustments"
              icon={<ChevronsDownUp size={18} strokeWidth={1.5} aria-hidden="true" />}
              headline="Physician re-titrates each cycle."
              sub="Every 90 days, your physician reviews your labs and adjusts your dose. No extra visit fee."
              testId="pricing-tile-titration"
            />
            <BenefitTile
              tone="cream"
              eyebrow="Receipts"
              icon={<Receipt size={18} strokeWidth={1.5} aria-hidden="true" />}
              headline="FSA/HSA itemized receipts, every month."
              sub="Pre-tax dollars for medical care. Automatic receipts, no requests, no friction."
              testId="pricing-tile-fsahsa"
            />
          </BenefitTileGrid>
        </div>
      </section>

      {/* ── Labs depth by tier — the panel ladder (bound to PANELS) ── */}
      <PanelTierComparison />

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
                fontSize: "var(--nx-t-xs)",
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
                fontFamily: "'Fraunces', Georgia, serif",
                fontWeight: 500,
                
                fontSize: "var(--nx-t-h2)",
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
                borderRadius: "var(--nx-r-xs)",
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
                    fontSize: "var(--nx-t-xs)",
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
                          fontSize: "var(--nx-t-xs)",
                          fontWeight: 700,
                          letterSpacing: "0.14em",
                          textTransform: "uppercase",
                          color: "var(--nx-ceramic)",
                        }}
                      >
                        {term.label}
                      </p>
                      {term.badge && (
                        <span
                          style={{
                            fontFamily: "'General Sans', system-ui, sans-serif",
                            fontSize: "var(--nx-t-xs)",
                            fontWeight: 700,
                            letterSpacing: "0.08em",
                            textTransform: "uppercase",
                            color: "var(--nx-cobalt)",
                            backgroundColor: "var(--nx-ceramic)",
                            padding: "1px 5px",
                            borderRadius: "var(--nx-r-pill)",
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
                          fontSize: "var(--nx-t-xs)",
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
                    backgroundColor: i % 2 === 0 ? "var(--nx-ceramic)" : "var(--nx-bg-cream)",
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
                        fontSize: "var(--nx-t-sm)",
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
                        fontSize: "var(--nx-t-xs)",
                        color: "var(--nx-fg-graphite)",
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
                      fontSize: "var(--nx-t-lg)",
                      fontWeight: 500,
                      color: "var(--nx-fg)",
                      textAlign: "center",
                    }}
                  >
                    {formatUSD(protocol.m1)}
                    <span
                      style={{
                        fontFamily: "'General Sans', system-ui, sans-serif",
                        fontSize: "var(--nx-t-xs)",
                        color: "var(--nx-fg-muted)",
                        display: "block",
                        fontWeight: 500,
                      }}
                    >
                      /mo
                    </span>
                  </p>
                  {/* Quarterly (3-month) */}
                  <p
                    style={{
                      fontFamily: "'General Sans', system-ui, sans-serif",
                      fontSize: "var(--nx-t-lg)",
                      fontWeight: 500,
                      color: "var(--nx-fg)",
                      textAlign: "center",
                    }}
                  >
                    {formatUSD(protocol.m3)}
                    <span
                      style={{
                        fontFamily: "'General Sans', system-ui, sans-serif",
                        fontSize: "var(--nx-t-xs)",
                        color: "var(--nx-fg-muted)",
                        display: "block",
                        fontWeight: 500,
                      }}
                    >
                      /mo
                    </span>
                  </p>
                  {/* Annual (12-month) */}
                  <p
                    style={{
                      fontFamily: "'General Sans', system-ui, sans-serif",
                      fontSize: "var(--nx-t-lg)",
                      fontWeight: 500,
                      color: "var(--nx-cobalt)",
                      textAlign: "center",
                    }}
                  >
                    {formatUSD(protocol.m12)}
                    <span
                      style={{
                        fontFamily: "'General Sans', system-ui, sans-serif",
                        fontSize: "var(--nx-t-xs)",
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
                <p style={{ fontFamily: "'General Sans', system-ui, sans-serif", fontSize: "var(--nx-t-xs)", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--nx-bg-cream)" }}>
                  12-MONTH PLAN — SAVE {SAVE_12MO}% vs. MONTH-TO-MONTH
                </p>
                <p style={{ fontFamily: "'General Sans', system-ui, sans-serif", fontSize: "var(--nx-t-xs)", color: "rgba(255,255,255,0.55)", letterSpacing: "0.1em" }}>
                  E.g. {SAVINGS_EXAMPLE.name}: {formatUSD(SAVINGS_EXAMPLE.annual)}/yr vs {formatUSD(SAVINGS_EXAMPLE.monthlyYear)}/yr monthly
                </p>
              </div>

              {/* Footer note */}
              <div
                style={{ padding: "1rem 1.5rem", borderTop: "1px solid var(--nx-border)", backgroundColor: "var(--nx-bg-cream)" }}
              >
                <p style={{ fontFamily: "'General Sans', system-ui, sans-serif", fontSize: "var(--nx-t-xs)", color: "var(--nx-fg-muted)", lineHeight: 1.5 }}>
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
                fontSize: "var(--nx-t-xs)",
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
                fontFamily: "'Fraunces', Georgia, serif",
                fontWeight: 500,
                fontSize: "var(--nx-t-h2)",
                color: "var(--nx-fg)",
                lineHeight: 1.1,
                marginBottom: "0.5rem",
              }}
            >
              What's in every protocol fee.
            </h2>
            <h2
              style={{
                fontFamily: "'Fraunces', Georgia, serif",
                fontWeight: 500,
                
                fontSize: "var(--nx-t-h2)",
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
                borderRadius: "var(--nx-r-xs)",
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
                    backgroundColor: i % 2 === 0 ? "var(--nx-ceramic)" : "var(--nx-bg-cream)",
                    borderTop: i > 0 ? "1px solid var(--nx-border)" : "none",
                  }}
                >
                  <Check
                    size={14}
                    aria-hidden="true"
                    style={{
                      color: "var(--nx-cobalt)",
                      flexShrink: 0,
                      marginTop: "3px",
                    }}
                  />
                  <p
                    style={{
                      fontFamily: "'General Sans', system-ui, sans-serif",
                      fontSize: "var(--nx-t-sm)",
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
                fontSize: "var(--nx-t-xs)",
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
                fontFamily: "'Fraunces', Georgia, serif",
                fontWeight: 500,
                
                fontSize: "var(--nx-t-h2)",
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
                borderRadius: "var(--nx-r-xs)",
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
                    fontSize: "var(--nx-t-xs)",
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
                    fontSize: "var(--nx-t-xs)",
                    fontWeight: 700,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: "var(--nx-ceramic)",
                    textAlign: "center",
                  }}
                >
                  NEXPHORIA
                </p>
                <p
                  style={{
                    fontFamily: "'General Sans', system-ui, sans-serif",
                    fontSize: "var(--nx-t-xs)",
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
                    backgroundColor: i % 2 === 0 ? "var(--nx-ceramic)" : "var(--nx-bg-cream)",
                    borderTop: "1px solid var(--nx-border)",
                    alignItems: "center",
                  }}
                >
                  <p
                    style={{
                      fontFamily: "'General Sans', system-ui, sans-serif",
                      fontSize: "var(--nx-t-sm)",
                      color: "var(--nx-fg)",
                      fontWeight: 500,
                    }}
                  >
                    {row.feature}
                  </p>
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <Check size={16} aria-hidden="true" style={{ color: "var(--nx-success)" }} />
                  </div>
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    {row.others === true ? (
                      <Check size={16} aria-hidden="true" style={{ color: "var(--nx-success)" }} />
                    ) : row.others === "varies" || row.others === "rarely" ? (
                      <span
                        style={{
                          fontFamily: "'General Sans', system-ui, sans-serif",
                          fontSize: "var(--nx-t-xs)",
                          color: "var(--nx-fg-muted)",
                          fontWeight: 500,
                          textTransform: "uppercase",
                        }}
                      >
                        {row.others}
                      </span>
                    ) : (
                      <X size={16} aria-hidden="true" style={{ color: "var(--nx-fg-muted)" }} />
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
                  fontSize: "var(--nx-t-xs)",
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
                  fontSize: "var(--nx-t-body)",
                  color: "var(--nx-fg-graphite)",
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
              style={{ fontFamily: "'General Sans', system-ui, sans-serif", fontSize: "var(--nx-t-xs)", fontWeight: 500, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--nx-cobalt)", marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.75rem" }}
            >
              <span style={{ display: "inline-block", width: "32px", height: "1px", backgroundColor: "var(--nx-cobalt)" }} />
              PRICING QUESTIONS
            </p>
            <h2
              style={{ fontFamily: "'Fraunces', Georgia, serif", fontWeight: 500,  fontSize: "var(--nx-t-h2)", color: "var(--nx-fg)", lineHeight: 1.1, marginBottom: "2.5rem" }}
            >
              Common questions about cost.
            </h2>
          </Reveal>
          <div style={{ maxWidth: "820px" }}>
            <FaqAccordion items={[
              { q: "Is the physician consult included in the price?", a: "Yes. Your initial physician consultation and all follow-up consultations within your subscription cycle are included. There is no separate consultation fee." },
              { q: "Are labs included?", a: "Partner-laboratory lab panels are included with 3-month and 12-month plans. Monthly plan members can add the 99-biomarker panel for $199 standalone, or it will be required before your first prescription at no additional charge on longer plans." },
              { q: "Can I use FSA or HSA funds?", a: "Yes. Compounded prescription medications and physician consultations are generally FSA/HSA-eligible. We provide itemized receipts at checkout. Confirm eligibility with your plan administrator." },
              { q: "What if the physician declines my protocol?", a: "If a physician determines your requested protocol is clinically inappropriate, no prescription is issued and you are not charged for pharmacy compounding. The physician may propose a modified alternative." },
              { q: "Is there a cancellation fee?", a: "No. Cancel anytime from your member portal with no penalty. Cancellation takes effect at the end of your current billing cycle. Compounded medications that have shipped cannot be returned." },
            ]} />
          </div>

          {/* Assessment CTA */}
          <Reveal delay={80}>
            <div className="mt-12 pt-8" style={{ borderTop: "1px solid var(--nx-border)" }}>
              <p style={{ fontFamily: "'General Sans', system-ui, sans-serif", fontWeight: 500,  fontSize: "var(--nx-t-h3)", color: "var(--nx-fg)", lineHeight: 1.2, marginBottom: "1.25rem" }}>
                Your protocol, built on your labs.
              </p>
              <p style={{ fontFamily: "'General Sans', system-ui, sans-serif", fontSize: "var(--nx-t-body)", color: "var(--nx-fg-graphite)", lineHeight: 1.7, maxWidth: "520px", marginBottom: "1.75rem" }}>
                Start with a structured assessment. Your physician will review your intake and design a protocol around your labs, your goals, and your physiology — not a template.
              </p>
              <StartIntakeButton source="pricing-page" size="lg">
                Start your assessment
              </StartIntakeButton>
            </div>
          </Reveal>
        </div>
      </section>

      <FinalCTAStrip
        title="No consultation fee. Labs included."
        sub="Start your intake. Physician review follows every partner-laboratory draw."
      />
    </SiteLayout>
  );
}

/* ── PRICING PLAN COMPARISON TABLE — semantic, AI-liftable ──────── */
const PLAN_COMPARISON_ROWS = [
  { feature: "Monthly cost (per peptide)", solo: `From ${SOLO_FROM_LABEL}/mo`, stack: `From ${formatUSD(STACK_FROM_12MO)}/mo`, custom: "Quoted at consult" },
  { feature: "Physician consultation (initial)", solo: "Included", stack: "Included", custom: "Included (dedicated)" },
  { feature: "Physician follow-up visits", solo: "Included", stack: "Included", custom: "Included (priority)" },
  { feature: "503A compounded peptides", solo: "1 compound", stack: "2–4 compounds", custom: "Fully bespoke" },
  { feature: "Partner-laboratory labs (99 markers)", solo: "Add $199", stack: "Every 90 days — included", custom: "Extended panels — included" },
  { feature: "Cold-chain overnight shipping", solo: "Included", stack: "Included", custom: "Included" },
  { feature: "Telehealth secure messaging", solo: "Included", stack: "Included", custom: "Priority response" },
  { feature: "FSA/HSA itemized receipts", solo: "Included", stack: "Included", custom: "Included" },
  { feature: "Verdict", solo: "Best for single-goal starters", stack: "Best value for most patients", custom: "Best for complex protocols" },
];

export function PricingPlanTable() {
  return (
    <section
      aria-labelledby="pricing-plan-table-heading"
      style={{ backgroundColor: "var(--nx-bg-cream)", borderTop: "1px solid var(--nx-border)", padding: "clamp(3rem, 6vw, 5rem) 0" }}
    >
      <div className="nx-container" style={{ maxWidth: "900px" }}>
        <Reveal>
          <h2
            id="pricing-plan-table-heading"
            style={{ fontFamily: "'Fraunces', Georgia, serif", fontWeight: 500, fontSize: "var(--nx-t-h2)", color: "var(--nx-fg)", lineHeight: 1.1, letterSpacing: "-0.02em", marginBottom: "2rem" }}
          >
            Plan comparison at a glance.
          </h2>
        </Reveal>
        <Reveal delay={60}>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: FONT, fontSize: "var(--nx-t-sm)" }}>
              <caption style={{ captionSide: "bottom", textAlign: "left", paddingTop: "0.75rem", fontSize: "var(--nx-t-xs)", color: "var(--nx-fg-muted)" }}>
                Nexphoria plan comparison: Solo Peptide vs. Curated Stack vs. Custom Protocol. Save {SAVE_3MO}% (quarterly) or {SAVE_12MO}% (annual) with prepay.
              </caption>
              <thead>
                <tr style={{ backgroundColor: "var(--nx-cobalt)" }}>
                  <th scope="col" style={{ padding: "0.875rem 1rem", textAlign: "left", color: "rgba(255,255,255,0.65)", fontWeight: 600, fontSize: "var(--nx-t-xs)", letterSpacing: "0.12em", textTransform: "uppercase" }}>Feature</th>
                  <th scope="col" style={{ padding: "0.875rem 1rem", textAlign: "center", color: "rgba(255,255,255,0.8)", fontWeight: 600, fontSize: "var(--nx-t-xs)", letterSpacing: "0.12em", textTransform: "uppercase" }}>Solo Peptide</th>
                  <th scope="col" style={{ padding: "0.875rem 1rem", textAlign: "center", color: "var(--nx-ceramic)", fontWeight: 700, fontSize: "var(--nx-t-xs)", letterSpacing: "0.12em", textTransform: "uppercase" }}>★ Curated Stack</th>
                  <th scope="col" style={{ padding: "0.875rem 1rem", textAlign: "center", color: "rgba(255,255,255,0.8)", fontWeight: 600, fontSize: "var(--nx-t-xs)", letterSpacing: "0.12em", textTransform: "uppercase" }}>Custom Protocol</th>
                </tr>
              </thead>
              <tbody>
                {PLAN_COMPARISON_ROWS.map((row, i) => (
                  <tr key={row.feature} style={{ backgroundColor: i % 2 === 0 ? "var(--nx-ceramic)" : "var(--nx-bg-cream)", borderBottom: "1px solid var(--nx-border)" }}>
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
