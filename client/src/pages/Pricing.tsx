/* JOB: answer 'what does it cost' with catalog-true numbers and one path in. */
import React from "react";
import { Link } from "wouter";
import { SiteLayout } from "@/components/SiteLayout";
import { StartIntakeButton } from "@/components/StartIntakeButton";
import { FinalCTAStrip } from "@/components/FinalCTAStrip";
import { Reveal } from "@/components/Reveal";
import { CadenceCalculator } from "@/components/CadenceCalculator";
import { FaqAccordion } from "@/components/EnterprisePatterns";
import { Check, X } from "lucide-react";
import { useSeo, webPageJsonLd, faqJsonLd, orgJsonLd, breadcrumbJsonLd } from "@/lib/seo";
import heroPricing from "@/assets/brand/hero-pricing.webp";
import artPricingSingle from "@/assets/brand/nx-art-pricing-single.webp";
import artPricingBundle from "@/assets/brand/nx-art-pricing-bundle.webp";
import { BenefitTile, BenefitTileGrid } from "@/components/BenefitTile";
import { FlaskConical, Stethoscope, Truck, Receipt, ShieldCheck, ChevronsDownUp } from "lucide-react";
import { F, FONT } from "@/lib/typography";
import { SOLO_FROM_LABEL, SOLO_FROM_PRICE, priceAtCadence, formatUSD, CADENCE_DISCOUNTS } from "@/data/pricing";
import { FLAGSHIP_STACKS, PANELS, usd, FULL_STACK } from "@/data/stacksCatalog";
import { RETEST_WEEK } from "@/data/monitoring";
import { SOLO_CATALOG } from "@/data/soloCatalog";
import { PANEL_TOTAL_MARKERS, PANEL_CATEGORY_COUNT, BIOMARKER_PANEL } from "@/data/biomarkerPanel";
import { ComparisonMatrix } from "@/components/ComparisonMatrix";

/* ── Catalog-derived pricing — single source of truth is the pricing engine
   (CADENCE_DISCOUNTS / priceAtCadence) + the solo & stack catalogs. No dollar
   amount or percent on this page is hand-written; every figure resolves here. ── */
const CADENCE_ORDER = ["1mo", "3mo", "6mo", "12mo"] as const;
const SAVE_3MO = CADENCE_DISCOUNTS["3mo"].savePct;
const SAVE_6MO = CADENCE_DISCOUNTS["6mo"].savePct;
const SAVE_12MO = CADENCE_DISCOUNTS["12mo"].savePct;

/* The shelf stacks that are actually sold (gated GLP-1 excluded).
   Under the launch scope this list is EMPTY — six flagships are retired and
   Ignite is gated. Math.min() of an empty list is Infinity, so this must
   resolve to null rather than printing "from $Infinity" on the plan tiles;
   the tier already renders a null priceFrom without a figure. Restores itself
   the moment a stack becomes sellable again. */
const NON_GATED_STACKS = FLAGSHIP_STACKS.filter((s) => !s.gated && s.cadences.length > 0);
const STACK_FROM_12MO: number | null = NON_GATED_STACKS.length
  ? Math.min(...NON_GATED_STACKS.map((s) => priceAtCadence(s.slug, "12mo")))
  : null;

/* Protocol rows = the shelf stacks, each priced straight from the catalog. */
const protocols = [
  ...NON_GATED_STACKS.map((s) => ({
    name: s.name,
    description: `${s.peptides.map((p) => p.name).join(" + ")}. ${s.bestFor}`,
    slug: s.slug,
    m1: priceAtCadence(s.slug, "1mo"),
    m3: priceAtCadence(s.slug, "3mo"),
    m6: priceAtCadence(s.slug, "6mo"),
    m12: priceAtCadence(s.slug, "12mo"),
  })),
  /* the Full Stack (the playbook): the four core protocols as one plan, on
     the same four terms as everything else */
  {
    name: FULL_STACK.name,
    description: FULL_STACK.line,
    slug: FULL_STACK.slug,
    m1: FULL_STACK.base,
    m3: Math.round(FULL_STACK.base * (1 - CADENCE_DISCOUNTS["3mo"].pct)),
    m6: Math.round(FULL_STACK.base * (1 - CADENCE_DISCOUNTS["6mo"].pct)),
    m12: Math.round(FULL_STACK.base * (1 - CADENCE_DISCOUNTS["12mo"].pct)),
  },
];

/* Column headers derive from the cadence engine: the four terms. */
const billingTerms = CADENCE_ORDER.map((k) => ({
  key: k,
  label: CADENCE_DISCOUNTS[k].label,
  discount: CADENCE_DISCOUNTS[k].savePct > 0 ? `Save ${CADENCE_DISCOUNTS[k].savePct}%` : "Try it",
  badge: k === "6mo" ? "Best value" : null,
  labs: CADENCE_DISCOUNTS[k].labs,
}));

/* What is inside the price (the playbook's value stack): what each piece
   costs on its own elsewhere, stated as a range, and that here it is
   included. Figures are typical U.S. retail ranges, not a claim about any
   named competitor. */
const VALUE_STACK: { item: string; elsewhere: string }[] = [
  { item: "Physician consultation and a personalised protocol", elsewhere: "$150 to $300" },
  { item: `Baseline blood panel, at home, and the same panel again at week ${RETEST_WEEK}`, elsewhere: "$150 to $260" },
  { item: "Cold-chain shipping, every shipment", elsewhere: "$40 a shipment" },
  { item: "Dose review and adjustment from your results", elsewhere: "A second visit" },
];

/* Worked annual example for the savings callout — real catalog figures.
   This used to read getStack("meridian")!, which crashed /pricing outright once
   Meridian was retired. Hardcoding a different slug would just reset the same
   trap, so the example is DERIVED: the sellable product with the largest real
   annual saving. It follows the catalog and cannot point at something retired. */
const SAVINGS_EXAMPLE = (() => {
  const candidates = SOLO_CATALOG.filter((s) => !s.gated && s.pricing).map((s) => ({
    name: s.name,
    annual: s.pricing!.m12 * 12,
    monthlyYear: s.pricing!.m1 * 12,
  }));
  return candidates.sort((a, b) => (b.monthlyYear - b.annual) - (a.monthlyYear - a.annual))[0];
})();

const included = [
  "Your physician's review of your questionnaire",
  "Compounded medication from a 503A-licensed U.S. pharmacy",
  "A free at-home baseline blood kit with your first order",
  `The same full blood panel again at week ${RETEST_WEEK}`,
  "Cold-chain shipping, plain packaging",
  "Your physician's read of both panels, and your dose adjusted from what changed",
];

const tiers = [
  {
    key: "solo",
    name: "Solo Peptide",
    tagline: "One medication for one goal.",
    priceFrom: SOLO_FROM_PRICE as number | null,
    recommended: false,
    features: [
      "One peptide, chosen with your doctor",
      "Your doctor's review",
      "503A US-compounded vial",
      "Cold shipping, plain packaging",
      "Baseline blood kit, and the week-12 panel",
    ],
    cta: "Browse peptides",
    href: "/peptides",
  },
  {
    key: "stack",
    name: "Curated Stack",
    tagline: "Medications that work together, one plan.",
    priceFrom: STACK_FROM_12MO as number | null,
    recommended: true,
    features: [
      "Two to four medications, chosen to do different jobs",
      "Everything in Solo",
      "Baseline blood kit, and the week-12 panel",
      "Optimization panel at six months and beyond",
      "Dose adjustments from what changed",
    ],
    cta: "Browse stacks",
    href: "/stacks",
  },
  {
    key: "custom",
    name: "Custom Protocol",
    tagline: "A plan built for you by your physician.",
    priceFrom: null as number | null,
    recommended: false,
    features: [
      "Medications chosen for you",
      "Everything in Stack",
      "Everything in Protocol",
      "One doctor who owns your case",
      "Dose review at week 12",
    ],
    cta: "Get started",
    href: null,
  },
];

/* Nexphoria next to the gray market (the playbook): the unregulated
   "research use" vial a reader can buy online without a prescription. Each
   row is a fact about what is inside our figure; the right-hand column is
   what that route offers by definition, never a claim about a named seller. */
const comparison = [
  { feature: "A licensed U.S. physician prescribes, and can decline", nexphoria: true, others: false },
  { feature: "Made for you in a licensed 503A U.S. pharmacy", nexphoria: true, others: false },
  { feature: "Blood work before you start, and again at week 12", nexphoria: true, others: false },
  { feature: "Your dose set against your own numbers", nexphoria: true, others: false },
  { feature: "Cold chain from pharmacy to door", nexphoria: true, others: "varies" },
  { feature: "Someone to call, and a refund policy", nexphoria: true, others: "rarely" },
];

function PricingTiers() {
  return (
    <section
      className="py-[var(--nx-section-y)]"
      style={{ backgroundColor: "var(--nx-bg)", borderTop: "1px solid var(--nx-border)" }}
    >
      <div className="nx-container max-w-screen-xl">
        <Reveal>
          <p
            style={{
              fontFamily: "var(--nx-font-body)",
              fontSize: "var(--nx-t-xs)",
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
            Your plan
          </p>
          <h2
            style={{
              fontFamily: "var(--nx-font-display)",
              fontWeight: 500,
              fontSize: "var(--nx-t-h2)",
              color: "var(--nx-fg)",
              lineHeight: 1.1,
              letterSpacing: "var(--nx-ls-tight)",
              marginBottom: "0.75rem",
            }}
          >
            One medication or a full protocol. Everything included either way.
          </h2>
          <p
            style={{
              fontFamily: "var(--nx-font-body)",
              fontSize: "var(--nx-t-body)",
              color: "var(--nx-fg-graphite)",
              lineHeight: 1.6,
              maxWidth: "640px",
              marginBottom: "3rem",
            }}
          >
            Every plan includes physician review, your medication, cold shipping, a baseline blood kit and the week-12 panel, in one figure paid up front for the term.
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
                      fontFamily: "var(--nx-font-body)",
                      fontSize: "var(--nx-t-xs)",
                      fontWeight: 600,
                      letterSpacing: "var(--nx-ls-caps)",
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
                    fontFamily: "var(--nx-font-body)",
                    fontSize: "var(--nx-t-xl)",
                    fontWeight: 600,
                    letterSpacing: "var(--nx-ls-normal)",
                    color: tier.recommended ? "var(--nx-bg-cream)" : "var(--nx-fg)",
                    marginBottom: "0.4rem",
                  }}
                >
                  {tier.name}
                </p>
                <p
                  style={{
                    fontFamily: "var(--nx-font-body)",
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
                          fontFamily: "var(--nx-font-body)",
                          fontSize: "var(--nx-t-xs)",
                          textTransform: "uppercase",
                          letterSpacing: "var(--nx-ls-caps)",
                          color: tier.recommended ? "rgba(255,255,255,0.5)" : "var(--nx-fg-muted)",
                        }}
                      >
                        From
                      </span>
                      <span
                        style={{
                          fontFamily: "var(--nx-font-body)",
                          fontSize: "var(--nx-t-display)",
                          fontWeight: 600,
                          letterSpacing: "var(--nx-ls-display)",
                          lineHeight: 1,
                          color: tier.recommended ? "var(--nx-ceramic)" : "var(--nx-fg)",
                        }}
                      >
                        {formatUSD(tier.priceFrom)}
                      </span>
                      <span
                        style={{
                          fontFamily: "var(--nx-font-body)",
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
                        fontFamily: "var(--nx-font-body)",
                        fontSize: "var(--nx-t-xl)",
                        fontWeight: 600,
                        letterSpacing: "var(--nx-ls-normal)",
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
                      fontFamily: "var(--nx-font-body)",
                      fontSize: "var(--nx-t-xs)",
                      fontWeight: 500,
                      letterSpacing: "var(--nx-ls-caps)",
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
                            fontFamily: "var(--nx-font-body)",
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
                        fontFamily: "var(--nx-font-body)",
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

        {/* What arrives — the two plan shapes as they ship, not as diagrams */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "1.5rem",
            marginTop: "1.5rem",
          }}
        >
          {[
            {
              key: "solo",
              src: artPricingSingle,
              alt: "A single Nexphoria-labeled peptide vial with a silver crimp cap on a marble counter",
              name: "Solo Peptide, as dispensed",
              line: "One medication, made for you in a licensed U.S. pharmacy and shipped cold.",
            },
            {
              key: "stack",
              src: artPricingBundle,
              alt: "An open navy Nexphoria presentation case holding four compounded peptide vials",
              name: "Curated Stack, as dispensed",
              line: "Two or three medications that work together, shipped as one plan.",
            },
          ].map((item, i) => (
            <Reveal key={item.key} delay={i * 60}>
              <figure
                data-testid={`tier-visual-${item.key}`}
                style={{
                  margin: 0,
                  background: "var(--nx-ceramic)",
                  border: "1px solid var(--nx-border)",
                  borderRadius: "var(--nx-r-lg)",
                  overflow: "hidden",
                }}
              >
                <img
                  src={item.src}
                  alt={item.alt}
                  className="w-full object-cover"
                  style={{ aspectRatio: "4 / 3" }}
                  loading="lazy"
                  decoding="async"
                />
                <figcaption style={{ padding: "1.25rem 1.5rem" }}>
                  <p
                    style={{
                      fontFamily: "var(--nx-font-body)",
                      fontSize: "var(--nx-t-base)",
                      fontWeight: 600,
                      color: "var(--nx-fg)",
                      marginBottom: "0.25rem",
                    }}
                  >
                    {item.name}
                  </p>
                  <p
                    style={{
                      fontFamily: "var(--nx-font-body)",
                      fontSize: "var(--nx-t-sm)",
                      color: "var(--nx-fg-graphite)",
                      lineHeight: 1.5,
                    }}
                  >
                    {item.line}
                  </p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Pricing FAQ data — feeds FAQPage JSON-LD AND renders visibly in the
   FaqAccordion below (single source, byte-parity by construction — the house
   pattern per bloodworkContent.ts / About). Every schema Q&A appears on-page
   and vice versa: no schema-only or page-only entries. ───────────── */
const PRICING_FAQ_ITEMS = [
  {
    q: "Is the physician consult included in the price?",
    a: "Yes. Your initial physician consultation and follow-up consultations within your subscription cycle are part of your plan. The refund policy sets out the terms.",
  },
  {
    q: "Are labs included?",
    a: `Yes, on both sides. A free at-home baseline kit of ${PANEL_TOTAL_MARKERS} markers ships with your first order, and the same panel is drawn again at week ${RETEST_WEEK}, included. Six-month terms add the optimization panel; twelve-month terms retest quarterly.`,
  },
  {
    q: "What if the physician declines my protocol?",
    a: "Then it is a no, and your doctor tells you why. They may suggest a different plan. The refund policy sets out what is refunded.",
  },
  {
    q: "How is it billed?",
    a: "You buy a block of time, paid up front: one month to try it, or three, six or twelve months at 10, 15 or 20% less per month. When your term ends, renewing is your choice. Compounded medications that have shipped cannot be returned; the refund policy sets out what is refunded if your physician declines.",
  },
];

/* Panel-tier depth matrix — how far the included labs go at each tier.
   Price / free-with / retest bind to PANELS (single source of truth); the
   marker-group rows summarize each tier's cumulative `adds`. */
function PanelTierComparison() {
  return (
    <ComparisonMatrix
      testid="pricing-panel-tiers"
      background="var(--nx-bg-cream)"
      eyebrow="Your blood panel"
      title="One full panel. Week 12. Included."
      lead={`Every plan includes the same full panel, ${PANEL_TOTAL_MARKERS} markers in ${PANEL_CATEGORY_COUNT} groups, drawn twelve weeks in and reviewed by your physician. It is inside the figure.`}
      columns={[{ label: "The full panel", sub: "Every plan, every peptide", highlight: true, badge: "Included" }]}
      rows={[
        ...BIOMARKER_PANEL.map((g) => ({ label: `${g.name}: ${g.markers.map((m) => m.name).join(", ")}`, cells: [{ text: "Included", tone: "pos" as const }] })),
        { label: "Drawn at", cells: [{ text: "Week 12 of your plan", tone: "plain" as const }] },
        { label: "Read by", cells: [{ text: "Your doctor, who adjusts your dose from it", tone: "plain" as const }] },
      ]}
      footnote="The typical week-12 panel. Your physician sets yours and may add markers for your medication or your history."
    />
  );
}

export default function Pricing() {
  useSeo({
    title: "Peptide therapy pricing: one complete monthly figure",
    description: `Single peptides from ${SOLO_FROM_LABEL}/mo, physician-curated stacks bundled at 12% off. Partner-laboratory bloodwork, physician consult, and refills within one complete figure. Cancel before dispense.`,
    path: "/pricing",
    jsonLd: [
      webPageJsonLd({
        name: "Nexphoria Pricing",
        description: "Physician-prescribed peptide therapy, priced as one complete figure: single peptides, bundles, and stacks.",
        path: "/pricing",
      }),
      orgJsonLd(),
      breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Pricing", path: "/pricing" }]),
      faqJsonLd(PRICING_FAQ_ITEMS),
    ],
  });
  return (
    <SiteLayout navVariant="showcase">
      {/* SiteLayout renders the sole <main id="main-content"> landmark; this is a
          styled section wrapper only (a second <main>/duplicate id is invalid
          HTML5 and breaks skip-link + SR landmark nav — cf. FAQ c785c4b, Journal 213a890). */}
      {/* ══ HERO (R3): one figure, the four terms as glass tiles, the photograph ══ */}
      <section className="nx-hero-r3" aria-labelledby="pricing-h1" data-testid="pricing-hero">
        <div className="nx-container" style={{ paddingTop: "var(--nx-sp-sec)", paddingBottom: "var(--nx-sp-band)" }}>
          <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr]" style={{ gap: "clamp(1.6rem,4vw,3.5rem)", alignItems: "center" }}>
            <div>
              <p style={{ fontFamily: F, fontSize: "var(--nx-t-2xs)", fontWeight: 600, letterSpacing: "var(--nx-ls-wide)", textTransform: "uppercase", color: "var(--nx-cobalt)" }}>Pricing</p>
              <h1 id="pricing-h1" style={{ fontFamily: "var(--nx-font-display)", fontWeight: 500, fontSize: "var(--nx-t-h1)", lineHeight: 1.05, letterSpacing: "var(--nx-ls-tight)", color: "var(--nx-fg)", maxWidth: "16ch", marginTop: "0.8rem", textWrap: "balance" }}>
                One figure. Everything within it.
              </h1>
              <p style={{ fontFamily: F, fontSize: "var(--nx-t-lg)", lineHeight: 1.55, color: "var(--nx-fg-graphite)", maxWidth: "48ch", marginTop: "1.1rem" }}>
                Your medication, physician review, cold shipping, a baseline blood kit and the week-12 panel, in one figure paid up front for the term you choose. Your dose can change; your price stays the same.
              </p>
              <ul className="nx-terms" aria-label="The four terms" data-testid="pricing-terms">
                {CADENCE_ORDER.map((k) => (
                  <li key={k} className={k === "6mo" ? "is-best" : undefined}>
                    <span className="nx-terms__label" style={{ fontFamily: F }}>{CADENCE_DISCOUNTS[k].label}</span>
                    <span className="nx-terms__save" style={{ fontFamily: "var(--nx-font-display)" }}>{CADENCE_DISCOUNTS[k].savePct > 0 ? `Save ${CADENCE_DISCOUNTS[k].savePct}%` : "Try it"}</span>
                    <span className="nx-terms__labs" style={{ fontFamily: F }}>{CADENCE_DISCOUNTS[k].labs}</span>
                    {k === "6mo" && <span className="nx-chip-acid" style={{ fontFamily: F }}>Best value</span>}
                  </li>
                ))}
              </ul>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: "1.4rem" }}>
                <StartIntakeButton source="pricing-hero" size="lg">Get started</StartIntakeButton>
                <Link href="/peptides" className="nx-cta-ghost" data-testid="pricing-hero-stacks-link">See the menu</Link>
              </div>
            </div>
            <figure className="nx-hero-r3__art" data-testid="pricing-hero-editorial">
              <img src={heroPricing} alt="A man reviews a single clear pricing sheet at his kitchen table in morning light" loading="eager" decoding="async" />
            </figure>
          </div>
        </div>
      </section>

      {/* ── Tier comparison: Solo / Stack / Custom ── */}
      <PricingTiers />

      {/* ── reference-grade benefit tile grid: what every plan includes ── */}
      <section
        className="py-[var(--nx-section-y)]"
        style={{ backgroundColor: "var(--nx-bg-cream)", borderTop: "1px solid var(--nx-border)" }}
      >
        <div className="nx-container max-w-screen-xl">
          <Reveal>
            <p
              style={{
                fontFamily: "var(--nx-font-body)",
                fontSize: "var(--nx-t-xs)",
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
              Every plan
            </p>
            <h2
              style={{
                fontFamily: "var(--nx-font-display)",
                fontWeight: 500,
                fontSize: "var(--nx-t-h2)",
                color: "var(--nx-fg)",
                lineHeight: 1.1,
                letterSpacing: "var(--nx-ls-tight)",
                marginBottom: "0.75rem",
              }}
            >
              One monthly figure. Everything included.
            </h2>
            <p
              style={{
                fontFamily: "var(--nx-font-body)",
                fontSize: "var(--nx-t-body)",
                color: "var(--nx-fg-graphite)",
                lineHeight: 1.6,
                maxWidth: "640px",
                marginBottom: "3rem",
              }}
            >
              Five things every plan already includes.
            </p>
          </Reveal>

          <BenefitTileGrid cols={3}>
            <BenefitTile
              tone="cream"
              eyebrow="Physician"
              icon={<Stethoscope size={18} strokeWidth={1.5} aria-hidden="true" />}
              headline="A licensed U.S. physician on every case."
              sub="A licensed physician reads your questionnaire and your baseline before your dose is set, and your full panel at week 12. A clinician's judgment, start to finish."
              testId="pricing-tile-physician"
            />
            <BenefitTile
              tone="cream"
              eyebrow="Labs"
              icon={<FlaskConical size={18} strokeWidth={1.5} aria-hidden="true" />}
              headline="Blood work on both sides, included."
              sub="A free at-home baseline kit with your first order, and the same full panel again at week 12. The lab work lives inside the figure."
              testId="pricing-tile-labs"
            />
            <BenefitTile
              tone="cream"
              eyebrow="Pharmacy"
              icon={<ShieldCheck size={18} strokeWidth={1.5} aria-hidden="true" />}
              headline="503A US-licensed compounding pharmacy only."
              sub="Every medication is made for you in a licensed U.S. pharmacy, batch documented."
              testId="pricing-tile-pharmacy"
            />
            <BenefitTile
              tone="cream"
              eyebrow="Shipping"
              icon={<Truck size={18} strokeWidth={1.5} aria-hidden="true" />}
              headline="Cold shipping, plain packaging."
              sub="Temperature-controlled shipping in plain packaging, to all 50 states."
              testId="pricing-tile-shipping"
            />
            <BenefitTile
              tone="cream"
              eyebrow="Adjustments"
              icon={<ChevronsDownUp size={18} strokeWidth={1.5} aria-hidden="true" />}
              headline="Dose adjustments, included."
              sub="Your baseline sets your dose. At week 12, your physician reads what changed and adjusts it. Both reviews are included."
              testId="pricing-tile-titration"
            />
          </BenefitTileGrid>
        </div>
      </section>

      {/* ── Labs depth by tier — the panel ladder (bound to PANELS) ── */}
      <PanelTierComparison />

      {/* ── Protocol pricing table ── */}
      <section
        className="py-[var(--nx-section-y)]"
        style={{ backgroundColor: "var(--nx-bg-cream)", borderTop: "1px solid var(--nx-border)" }}
      >
        <div className="nx-container max-w-screen-xl">
          <Reveal>
            <p
              style={{
                fontFamily: "var(--nx-font-body)",
                fontSize: "var(--nx-t-xs)",
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
              Protocol pricing
            </p>
            <h2
              style={{
                fontFamily: "var(--nx-font-display)",
                fontWeight: 500,
                
                fontSize: "var(--nx-t-h2)",
                color: "var(--nx-fg)",
                lineHeight: 1.1,
                marginBottom: "2rem",
              }}
            >
              The figure, protocol by protocol.
            </h2>
          </Reveal>

          {/* Interactive cadence calculator — the commitment ladder made
              concrete before the full static table (Maximus §5). */}
          <Reveal delay={30}>
            <div style={{ marginBottom: "2rem" }}>
              <CadenceCalculator />
            </div>
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
                  gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr",
                  backgroundColor: "var(--nx-cobalt)",
                  padding: "0.875rem 1.5rem",
                  gap: "1rem",
                }}
              >
                <p
                  style={{
                    fontFamily: "var(--nx-font-body)",
                    fontSize: "var(--nx-t-xs)",
                    fontWeight: 700,
                    letterSpacing: "var(--nx-ls-caps)",
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
                          fontFamily: "var(--nx-font-body)",
                          fontSize: "var(--nx-t-xs)",
                          fontWeight: 700,
                          letterSpacing: "var(--nx-ls-caps)",
                          textTransform: "uppercase",
                          color: "var(--nx-ceramic)",
                        }}
                      >
                        {term.label}
                      </p>
                      {term.badge && (
                        <span
                          style={{
                            fontFamily: "var(--nx-font-body)",
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
                          fontFamily: "var(--nx-font-body)",
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

              {/* The labs each term includes (the playbook) */}
              <div
                style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr", padding: "0.7rem 1.5rem", gap: "1rem", backgroundColor: "var(--nx-cobalt-soft)", borderTop: "1px solid var(--nx-border)" }}
                data-testid="pricing-term-labs"
              >
                <p style={{ fontFamily: "var(--nx-font-body)", fontSize: "var(--nx-t-xs)", fontWeight: 600, color: "var(--nx-fg)" }}>Blood work included</p>
                {billingTerms.map((t) => (
                  <p key={t.key} style={{ fontFamily: "var(--nx-font-body)", fontSize: "var(--nx-t-2xs)", lineHeight: 1.4, color: "var(--nx-fg-graphite)", textAlign: "center" }}>{t.labs}</p>
                ))}
              </div>
              {/* Protocol rows */}
              {protocols.map((protocol, i) => (
                <div
                  key={protocol.name}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr",
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
                        fontFamily: "var(--nx-font-body)",
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
                        fontFamily: "var(--nx-font-body)",
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
                      fontFamily: "var(--nx-font-body)",
                      fontSize: "var(--nx-t-lg)",
                      fontWeight: 500,
                      color: "var(--nx-fg)",
                      textAlign: "center",
                    }}
                  >
                    {formatUSD(protocol.m1)}
                    <span
                      style={{
                        fontFamily: "var(--nx-font-body)",
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
                      fontFamily: "var(--nx-font-body)",
                      fontSize: "var(--nx-t-lg)",
                      fontWeight: 500,
                      color: "var(--nx-fg)",
                      textAlign: "center",
                    }}
                  >
                    {formatUSD(protocol.m3)}
                    <span
                      style={{
                        fontFamily: "var(--nx-font-body)",
                        fontSize: "var(--nx-t-xs)",
                        color: "var(--nx-fg-muted)",
                        display: "block",
                        fontWeight: 500,
                      }}
                    >
                      /mo
                    </span>
                  </p>
                  {/* Six months: best value */}
                  <p
                    style={{
                      fontFamily: "var(--nx-font-body)",
                      fontSize: "var(--nx-t-lg)",
                      fontWeight: 500,
                      color: "var(--nx-cobalt)",
                      textAlign: "center",
                    }}
                  >
                    {formatUSD(protocol.m6)}
                    <span
                      style={{
                        fontFamily: "var(--nx-font-body)",
                        fontSize: "var(--nx-t-xs)",
                        color: "var(--nx-fg-muted)",
                        display: "block",
                        fontWeight: 500,
                      }}
                    >
                      /mo
                    </span>
                  </p>
                  {/* Twelve months */}
                  <p
                    style={{
                      fontFamily: "var(--nx-font-body)",
                      fontSize: "var(--nx-t-lg)",
                      fontWeight: 500,
                      color: "var(--nx-fg)",
                      textAlign: "center",
                    }}
                  >
                    {formatUSD(protocol.m12)}
                    <span
                      style={{
                        fontFamily: "var(--nx-font-body)",
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
                <p style={{ fontFamily: "var(--nx-font-body)", fontSize: "var(--nx-t-xs)", fontWeight: 700, letterSpacing: "var(--nx-ls-caps)", textTransform: "uppercase", color: "var(--nx-bg-cream)" }}>
                  SIX MONTHS · SAVE {SAVE_6MO}% · TWELVE · SAVE {SAVE_12MO}%
                </p>
                <p style={{ fontFamily: "var(--nx-font-body)", fontSize: "var(--nx-t-xs)", color: "rgba(255,255,255,0.55)", letterSpacing: "var(--nx-ls-caps)" }}>
                  E.g. {SAVINGS_EXAMPLE.name}: {formatUSD(SAVINGS_EXAMPLE.annual)}/yr vs {formatUSD(SAVINGS_EXAMPLE.monthlyYear)}/yr monthly
                </p>
              </div>

              {/* Footer note */}
              <div
                style={{ padding: "1rem 1.5rem", borderTop: "1px solid var(--nx-border)", backgroundColor: "var(--nx-bg-cream)" }}
              >
                <p style={{ fontFamily: "var(--nx-font-body)", fontSize: "var(--nx-t-xs)", color: "var(--nx-fg-muted)", lineHeight: 1.5 }}>
                  Monthly figures, paid up front for the term. Vitality and Foundation are priced at your consultation.
                  Protocols that include a medicine pending FDA rulemaking are reservable at the figure shown.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── What's included ── */}
      <section
        className="py-[var(--nx-section-y)]"
        style={{ backgroundColor: "var(--nx-bg)", borderTop: "1px solid var(--nx-border)" }}
      >
        <div className="nx-container max-w-screen-xl">
          <Reveal>
            <p
              style={{
                fontFamily: "var(--nx-font-body)",
                fontSize: "var(--nx-t-xs)",
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
              Always included
            </p>
            <h2
              style={{
                fontFamily: "var(--nx-font-display)",
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
                fontFamily: "var(--nx-font-display)",
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
                      fontFamily: "var(--nx-font-body)",
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
          <Reveal delay={60}>
            <div style={{ marginTop: "2.5rem", maxWidth: "600px" }} data-testid="pricing-value-stack">
              <p style={{ fontFamily: "var(--nx-font-body)", fontSize: "var(--nx-t-xs)", fontWeight: 600, letterSpacing: "var(--nx-ls-caps)", textTransform: "uppercase", color: "var(--nx-fg-muted)", marginBottom: "0.75rem" }}>
                What is inside the figure
              </p>
              <div style={{ border: "1.5px solid var(--nx-border)", borderRadius: "var(--nx-r-xs)", overflow: "hidden" }}>
                {VALUE_STACK.map((v, i) => (
                  <div key={v.item} style={{ display: "grid", gridTemplateColumns: "1fr auto auto", gap: "1rem", alignItems: "center", padding: "0.9rem 1.5rem", backgroundColor: i % 2 === 0 ? "var(--nx-ceramic)" : "var(--nx-bg-cream)", borderTop: i > 0 ? "1px solid var(--nx-border)" : "none" }}>
                    <p style={{ fontFamily: "var(--nx-font-body)", fontSize: "var(--nx-t-sm)", color: "var(--nx-fg)", lineHeight: 1.45 }}>{v.item}</p>
                    <p style={{ fontFamily: "var(--nx-font-body)", fontSize: "var(--nx-t-xs)", color: "var(--nx-fg-muted)", whiteSpace: "nowrap" }}>Elsewhere {v.elsewhere}</p>
                    <p style={{ fontFamily: "var(--nx-font-body)", fontSize: "var(--nx-t-xs)", fontWeight: 700, letterSpacing: "var(--nx-ls-caps)", textTransform: "uppercase", color: "var(--nx-cobalt)" }}>Included</p>
                  </div>
                ))}
              </div>
              <p style={{ fontFamily: "var(--nx-font-body)", fontSize: "var(--nx-t-xs)", color: "var(--nx-fg-muted)", lineHeight: 1.5, marginTop: "0.75rem" }}>
                Typical U.S. retail ranges for each piece bought on its own. Here, each is inside the figure.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Comparison table ── */}
      <section
        className="py-[var(--nx-section-y)]"
        style={{ backgroundColor: "var(--nx-bg-cream)", borderTop: "1px solid var(--nx-border)" }}
      >
        <div className="nx-container max-w-screen-xl">
          <Reveal>
            <p
              style={{
                fontFamily: "var(--nx-font-body)",
                fontSize: "var(--nx-t-xs)",
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
              How we compare
            </p>
            <h2
              style={{
                fontFamily: "var(--nx-font-display)",
                fontWeight: 500,
                
                fontSize: "var(--nx-t-h2)",
                color: "var(--nx-fg)",
                lineHeight: 1.1,
                marginBottom: "3rem",
              }}
            >
              What the figure buys, next to the gray market.
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
                    fontFamily: "var(--nx-font-body)",
                    fontSize: "var(--nx-t-xs)",
                    fontWeight: 700,
                    letterSpacing: "var(--nx-ls-caps)",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,0.6)",
                  }}
                >
                  FEATURE
                </p>
                <p
                  style={{
                    fontFamily: "var(--nx-font-body)",
                    fontSize: "var(--nx-t-xs)",
                    fontWeight: 700,
                    letterSpacing: "var(--nx-ls-caps)",
                    textTransform: "uppercase",
                    color: "var(--nx-ceramic)",
                    textAlign: "center",
                  }}
                >
                  NEXPHORIA
                </p>
                <p
                  style={{
                    fontFamily: "var(--nx-font-body)",
                    fontSize: "var(--nx-t-xs)",
                    fontWeight: 700,
                    letterSpacing: "var(--nx-ls-caps)",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,0.55)",
                    textAlign: "center",
                  }}
                >
                  GRAY MARKET
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
                      fontFamily: "var(--nx-font-body)",
                      fontSize: "var(--nx-t-sm)",
                      color: "var(--nx-fg)",
                      fontWeight: 500,
                    }}
                  >
                    {row.feature}
                  </p>
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <Check size={16} aria-hidden="true" style={{ color: "var(--nx-success)" }} />
                    {/* icon-only cell → text equivalent for AT; reading order is
                        feature → Nexphoria → other clinics, so bare Yes/No maps
                        to the right column without needing header association. */}
                    <span className="sr-only">Yes</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    {row.others === true ? (
                      <>
                        <Check size={16} aria-hidden="true" style={{ color: "var(--nx-success)" }} />
                        <span className="sr-only">Yes</span>
                      </>
                    ) : row.others === "varies" || row.others === "rarely" ? (
                      <span
                        style={{
                          fontFamily: "var(--nx-font-body)",
                          fontSize: "var(--nx-t-xs)",
                          color: "var(--nx-fg-muted)",
                          fontWeight: 500,
                          textTransform: "uppercase",
                        }}
                      >
                        {row.others}
                      </span>
                    ) : (
                      <>
                        <X size={16} aria-hidden="true" style={{ color: "var(--nx-fg-muted)" }} />
                        <span className="sr-only">No</span>
                      </>
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
        className="py-[var(--nx-sp-sec)]"
        style={{ backgroundColor: "var(--nx-bg)", borderTop: "1px solid var(--nx-border)" }}
      >
        <div className="nx-container max-w-screen-xl">
          <Reveal>
            <div style={{ maxWidth: "640px" }}>
              <p
                style={{
                  fontFamily: "var(--nx-font-body)",
                  fontSize: "var(--nx-t-xs)",
                  fontWeight: 500,
                  letterSpacing: "var(--nx-ls-wide)",
                  textTransform: "uppercase",
                  color: "var(--nx-cobalt)",
                  marginBottom: "0.75rem",
                }}
              >
                REFUND POLICY
              </p>
              <p
                style={{
                  fontFamily: "var(--nx-font-body)",
                  fontSize: "var(--nx-t-body)",
                  color: "var(--nx-fg-graphite)",
                  lineHeight: 1.7,
                }}
              >
                Compounded medications that have been dispensed cannot be returned under federal
                compounding pharmacy regulations. Physician consultation fees are non-refundable
                after the consultation has been completed. If a physician declines your protocol
                request, the refund policy sets out what is refunded. Subscription fees for upcoming billing cycles may be cancelled
                at any time from your member portal with no cancellation fee.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Pricing FAQ ── */}
      <section
        className="py-[var(--nx-sp-sec)]"
        style={{ backgroundColor: "var(--nx-bg)", borderTop: "1px solid var(--nx-border)" }}
      >
        <div className="nx-container max-w-screen-xl">
          <Reveal>
            <p
              style={{ fontFamily: "var(--nx-font-body)", fontSize: "var(--nx-t-xs)", fontWeight: 500, letterSpacing: "var(--nx-ls-wide)", textTransform: "uppercase", color: "var(--nx-cobalt)", marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.75rem" }}
            >
              <span style={{ display: "inline-block", width: "32px", height: "1px", backgroundColor: "var(--nx-cobalt)" }} />
              PRICING QUESTIONS
            </p>
            <h2
              style={{ fontFamily: "var(--nx-font-display)", fontWeight: 500,  fontSize: "var(--nx-t-h2)", color: "var(--nx-fg)", lineHeight: 1.1, marginBottom: "2.5rem" }}
            >
              Common questions about cost.
            </h2>
          </Reveal>
          <div style={{ maxWidth: "820px" }}>
            <FaqAccordion items={PRICING_FAQ_ITEMS} />
          </div>

          {/* Assessment CTA */}
          <Reveal delay={80}>
            <div className="mt-12 pt-8" style={{ borderTop: "1px solid var(--nx-border)" }}>
              <p style={{ fontFamily: "var(--nx-font-body)", fontWeight: 500,  fontSize: "var(--nx-t-h3)", color: "var(--nx-fg)", lineHeight: 1.2, marginBottom: "1.25rem" }}>
                Your protocol, built on your labs.
              </p>
              <p style={{ fontFamily: "var(--nx-font-body)", fontSize: "var(--nx-t-body)", color: "var(--nx-fg-graphite)", lineHeight: 1.7, maxWidth: "520px", marginBottom: "1.75rem" }}>
                Start with the questionnaire. Your doctor reads it and your baseline, writes a plan around your goal and your numbers, then reads your blood again at week 12.
              </p>
              <StartIntakeButton source="pricing-page" size="lg">
                Get started
              </StartIntakeButton>
            </div>
          </Reveal>
        </div>
      </section>

      <FinalCTAStrip
        title="Begin with your questionnaire."
        sub="Answer a few health questions. A licensed physician reviews them and, if it is right for you, writes your prescription."
      />
    </SiteLayout>
  );
}

/* ── PRICING PLAN COMPARISON TABLE — semantic, AI-liftable ──────── */
const PLAN_COMPARISON_ROWS = [
  // Stacks have no sellable price under the launch scope (see STACK_FROM_12MO)
  // — say so plainly rather than printing a figure that does not exist.
  { feature: "Monthly cost (per peptide)", solo: `From ${SOLO_FROM_LABEL}/mo`, stack: STACK_FROM_12MO === null ? "Quoted at consult" : `From ${formatUSD(STACK_FROM_12MO)}/mo`, custom: "Quoted at consult" },
  { feature: "Your doctor's review", solo: "Included", stack: "Included", custom: "Included (dedicated)" },
  { feature: "Baseline kit, week-12 panel and dose review", solo: "Included", stack: "Included", custom: "Included (priority)" },
  { feature: "Medications", solo: "One", stack: "Two or three", custom: "Chosen for you" },
  { feature: `Full blood panel (${PANEL_TOTAL_MARKERS} markers)`, solo: "Baseline and week 12, included", stack: "Baseline and week 12, included", custom: "Extended panels, included" },
  { feature: "Cold shipping, plain packaging", solo: "Included", stack: "Included", custom: "Included" },
  { feature: "Telehealth secure messaging", solo: "Included", stack: "Included", custom: "Priority response" },
  { feature: "Verdict", solo: "Best for single-goal starters", stack: "Best value for most patients", custom: "Best for complex protocols" },
];

export function PricingPlanTable() {
  return (
    <section
      aria-labelledby="pricing-plan-table-heading"
      style={{ backgroundColor: "var(--nx-bg-cream)", borderTop: "1px solid var(--nx-border)", padding: "var(--nx-sp-sec) 0" }}
    >
      <div className="nx-container" style={{ maxWidth: "900px" }}>
        <Reveal>
          <h2
            id="pricing-plan-table-heading"
            style={{ fontFamily: "var(--nx-font-display)", fontWeight: 500, fontSize: "var(--nx-t-h2)", color: "var(--nx-fg)", lineHeight: 1.1, letterSpacing: "var(--nx-ls-tight)", marginBottom: "2rem" }}
          >
            Plan comparison at a glance.
          </h2>
        </Reveal>
        <Reveal delay={60}>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: FONT, fontSize: "var(--nx-t-sm)" }}>
              <caption style={{ captionSide: "bottom", textAlign: "left", paddingTop: "0.75rem", fontSize: "var(--nx-t-xs)", color: "var(--nx-fg-muted)" }}>
                Plan comparison: one medication, a protocol, or a custom plan. Paid up front: save {SAVE_3MO}% at three months, {SAVE_6MO}% at six, {SAVE_12MO}% at twelve.
              </caption>
              <thead>
                <tr style={{ backgroundColor: "var(--nx-cobalt)" }}>
                  <th scope="col" style={{ padding: "0.875rem 1rem", textAlign: "left", color: "rgba(255,255,255,0.65)", fontWeight: 600, fontSize: "var(--nx-t-xs)", letterSpacing: "var(--nx-ls-caps)", textTransform: "uppercase" }}>Feature</th>
                  <th scope="col" style={{ padding: "0.875rem 1rem", textAlign: "center", color: "rgba(255,255,255,0.8)", fontWeight: 600, fontSize: "var(--nx-t-xs)", letterSpacing: "var(--nx-ls-caps)", textTransform: "uppercase" }}>Solo Peptide</th>
                  <th scope="col" style={{ padding: "0.875rem 1rem", textAlign: "center", color: "var(--nx-ceramic)", fontWeight: 700, fontSize: "var(--nx-t-xs)", letterSpacing: "var(--nx-ls-caps)", textTransform: "uppercase" }}>★ Curated Stack</th>
                  <th scope="col" style={{ padding: "0.875rem 1rem", textAlign: "center", color: "rgba(255,255,255,0.8)", fontWeight: 600, fontSize: "var(--nx-t-xs)", letterSpacing: "var(--nx-ls-caps)", textTransform: "uppercase" }}>Custom Protocol</th>
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
