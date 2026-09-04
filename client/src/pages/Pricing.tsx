/* ═══ /pricing — stop 04, Decide (the Spine, Phase 3, 2026-09-04) ═══
   One pricing engine, shown once: the four terms, every medicine and every
   protocol at each term, what is inside the figure, and the figure next to
   the gray market. The Solo/Stack/Custom tiers, the Basic/Full/Elite panel
   ladder and the legacy plan table are retired: three pricing systems on one
   page was the defect. Every number resolves from data/pricing and the two
   catalogs; nothing here is typed by hand. */
import { Link } from "wouter";
import { Check, Minus } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { SpineStrip } from "@/components/SpineStrip";
import { StartIntakeButton } from "@/components/StartIntakeButton";
import { FinalCTAStrip } from "@/components/FinalCTAStrip";
import { Reveal } from "@/components/Reveal";
import { CadenceCalculator } from "@/components/CadenceCalculator";
import { FaqAccordion } from "@/components/EnterprisePatterns";
import { useSeo, webPageJsonLd, faqJsonLd, orgJsonLd, breadcrumbJsonLd } from "@/lib/seo";
import heroPricing from "@/assets/brand/hero-pricing.webp";
import { F, S } from "@/lib/typography";
import { SOLO_FROM_LABEL, priceAtCadence, formatUSD, CADENCE_DISCOUNTS } from "@/data/pricing";
import { FLAGSHIP_STACKS, usd, FULL_STACK, stackReservable } from "@/data/stacksCatalog";
import { SOLO_CATALOG, statusOf } from "@/data/soloCatalog";
import { peptides, CATEGORY_LABELS } from "@/data/peptides";
import { PANEL_TOTAL_MARKERS } from "@/data/biomarkerPanel";
import { RETEST_WEEK } from "@/data/monitoring";
import { StatusPill } from "@/components/StatusPill";

/* ── everything below is derived ── */
const CADENCE_ORDER = ["1mo", "3mo", "6mo", "12mo"] as const;
const TERMS = CADENCE_ORDER.map((k) => ({
  key: k,
  label: CADENCE_DISCOUNTS[k].label,
  discount: CADENCE_DISCOUNTS[k].savePct > 0 ? `Save ${CADENCE_DISCOUNTS[k].savePct}%` : "Try it",
  labs: CADENCE_DISCOUNTS[k].labs,
}));
const NON_GATED_STACKS = FLAGSHIP_STACKS.filter((s) => !s.gated && s.cadences.length > 0);
const PROTOCOLS = [
  ...NON_GATED_STACKS.map((s) => ({
    name: s.name, slug: s.slug, href: `/stacks/${s.slug}`,
    line: `${s.peptides.map((p) => p.name).join(" + ")}. ${s.bestFor}`,
    reserve: stackReservable(s),
    m: CADENCE_ORDER.map((k) => priceAtCadence(s.slug, k)),
  })),
  {
    name: FULL_STACK.name, slug: FULL_STACK.slug, href: "/stacks", line: FULL_STACK.line, reserve: true,
    m: CADENCE_ORDER.map((k) => Math.round(FULL_STACK.base * (1 - CADENCE_DISCOUNTS[k].pct))),
  },
];
const GATED_STACKS = FLAGSHIP_STACKS.filter((s) => s.gated);
const goalOf = (slug: string) => peptides.find((p) => p.slug === slug)?.category;

const INSIDE = [
  "A licensed U.S. physician reads your health questions and your baseline, and writes the prescription",
  "Your medication, made for you in a licensed 503A U.S. pharmacy",
  `A ${PANEL_TOTAL_MARKERS}-marker blood kit at home before your first dose, complimentary`,
  `The same panel again at week ${RETEST_WEEK}, on plans of three months and longer`,
  "Cold shipping to all 50 states, in plain packaging",
  "Your physician's read of both panels, and your dose adjusted from what changed",
];
/* Typical U.S. retail ranges for each piece bought on its own. Never a claim
   about a named seller. */
const VALUE_STACK: { item: string; elsewhere: string }[] = [
  { item: "Physician consultation and a personalised protocol", elsewhere: "$150 to $300" },
  { item: `Baseline blood panel, at home, and the same panel again at week ${RETEST_WEEK}`, elsewhere: "$150 to $260" },
  { item: "Cold-chain shipping, every shipment", elsewhere: "$40 a shipment" },
  { item: "Dose review and adjustment from your results", elsewhere: "A second visit" },
];
/* The figure next to the gray market: the unregulated "research use" vial
   bought online without a prescription. Each row is a fact about what is
   inside our figure; the right column is what that route offers by definition. */
const COMPARE: { feature: string; gray: boolean | "varies" | "rarely" }[] = [
  { feature: "A licensed U.S. physician prescribes, and can decline", gray: false },
  { feature: "Made for you in a licensed 503A U.S. pharmacy", gray: false },
  { feature: `Blood work before you start, and again at week ${RETEST_WEEK}`, gray: false },
  { feature: "Your dose set against your own numbers", gray: false },
  { feature: "Cold chain from pharmacy to door", gray: "varies" },
  { feature: "Someone to call, and a refund policy", gray: "rarely" },
];
const FAQ = [
  { q: "Is the physician consult included in the price?", a: "Yes. Your physician's review, and the follow-up reads of your baseline and your week-12 panel, are inside the figure. The refund policy sets out the terms." },
  { q: "Are labs included?", a: `Yes, on both sides. A complimentary at-home baseline kit of ${PANEL_TOTAL_MARKERS} markers ships with your first order, and the same panel is drawn again at week ${RETEST_WEEK} on plans of three months and longer. Six-month terms add a six-month panel; twelve-month terms retest every quarter.` },
  { q: "How is it billed?", a: "You buy a block of time, paid up front: one month to try it, or three, six or twelve months at 10, 15 or 20% less per month. When your term ends, renewing is your choice. Compounded medications that have shipped cannot be returned; the refund policy sets out what is refunded if your physician declines." },
  { q: "What if the physician declines?", a: "Then it is a no, and your physician tells you why. They may suggest a different plan. The refund policy sets out what is refunded." },
  { q: "Why are some medicines marked Reserve?", a: "They are pending final FDA rulemaking for compounding. You can reserve one at the figure shown, and we email you the moment it ships. A physician still reviews every order." },
];

const kicker: React.CSSProperties = { fontFamily: F, fontSize: "var(--nx-t-2xs)", fontWeight: 600, letterSpacing: "var(--nx-ls-wide)", textTransform: "uppercase", color: "var(--nx-cobalt)" };
const h2: React.CSSProperties = { fontFamily: S, fontWeight: 500, fontSize: "var(--nx-t-h2)", color: "var(--nx-fg)", lineHeight: 1.08, letterSpacing: "var(--nx-ls-tight)", marginTop: "0.7rem", textWrap: "balance" };
const body: React.CSSProperties = { fontFamily: F, fontSize: "var(--nx-t-body)", lineHeight: 1.65, color: "var(--nx-fg-graphite)", maxWidth: "58ch" };
const small: React.CSSProperties = { fontFamily: F, fontSize: "var(--nx-t-sm)", lineHeight: 1.55, color: "var(--nx-fg-graphite)" };

export default function Pricing() {
  useSeo({
    title: "Pricing: one figure, four terms, everything within it",
    description: `Every medicine from ${SOLO_FROM_LABEL} a month. Paid up front for one, three, six or twelve months. Physician review, a baseline blood kit and the week-${RETEST_WEEK} panel are inside the figure.`,
    path: "/pricing",
    jsonLd: [
      webPageJsonLd({ name: "Nexphoria pricing", description: "One figure, four terms, everything within it.", path: "/pricing" }),
      orgJsonLd(),
      breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Pricing", path: "/pricing" }]),
      faqJsonLd(FAQ),
    ],
  });

  return (
    <SiteLayout navVariant="showcase">
      {/* ══ HERO: the claim, the four terms, the photograph ══ */}
      <section className="nx-hero-r3" aria-labelledby="pricing-h1" data-testid="pricing-hero">
        <div className="nx-container" style={{ paddingTop: "var(--nx-sp-sec)", paddingBottom: "var(--nx-sp-band)" }}>
          <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr]" style={{ gap: "clamp(1.6rem,4vw,3.5rem)", alignItems: "center" }}>
            <div>
              <p style={kicker}>Pricing</p>
              <h1 id="pricing-h1" style={{ fontFamily: S, fontWeight: 500, fontSize: "var(--nx-t-h1)", lineHeight: 1.05, letterSpacing: "var(--nx-ls-tight)", color: "var(--nx-fg)", maxWidth: "16ch", marginTop: "0.8rem", textWrap: "balance" }}>
                One figure. Everything within it.
              </h1>
              <p style={{ ...body, fontSize: "var(--nx-t-lg)", marginTop: "1.1rem", maxWidth: "48ch" }}>
                The medicine, the physician, cold shipping, the baseline blood kit and the week-{RETEST_WEEK} panel, paid once for the term you choose. Your dose can change; the figure does not.
              </p>
              <ul className="nx-terms" aria-label="The four terms" data-testid="pricing-terms">
                {TERMS.map((t) => (
                  <li key={t.key} className={t.key === "6mo" ? "is-best" : undefined}>
                    <span className="nx-terms__label" style={{ fontFamily: F }}>{t.label}</span>
                    <span className="nx-terms__save" style={{ fontFamily: S }}>{t.discount}</span>
                    <span className="nx-terms__labs" style={{ fontFamily: F }}>{t.labs}</span>
                    {t.key === "6mo" && <span className="nx-chip-acid" style={{ fontFamily: F }}>Best value</span>}
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
      <SpineStrip stop={4} />

      {/* ══ EVERY MEDICINE, AT EVERY TERM ══ */}
      <section className="nx-container" aria-labelledby="pricing-solos" style={{ paddingTop: "var(--nx-sp-sec)" }}>
        <Reveal>
          <p style={kicker}>Every medicine</p>
          <h2 id="pricing-solos" style={{ ...h2, maxWidth: "18ch" }}>The figure, medicine by medicine.</h2>
          <p style={{ ...body, marginTop: "1rem" }}>Monthly figures, paid up front for the term. Every figure includes the physician, the blood work and the shipping. Medicines marked Reserve are pending FDA rulemaking and can be reserved at the figure shown.</p>
        </Reveal>
        <Reveal>
          <div className="nx-price-table" role="table" aria-label="Monthly figures by term, every medicine" data-testid="pricing-solo-table">
            <div className="nx-price-row nx-price-head" role="row">
              <span role="columnheader" style={{ fontFamily: F }}>Medicine</span>
              {TERMS.map((t) => <span key={t.key} role="columnheader" style={{ fontFamily: F }}>{t.label}</span>)}
            </div>
            {SOLO_CATALOG.map((s) => {
              const g = goalOf(s.slug);
              return (
                <Link key={s.slug} href={`/peptides/${s.slug}`} className="nx-price-row" role="row" data-testid={`pricing-solo-${s.slug}`}>
                  <span role="cell" style={{ display: "flex", flexDirection: "column", gap: 3 }}>
                    <span style={{ fontFamily: S, fontWeight: 500, fontSize: "var(--nx-t-lg)", color: "var(--nx-fg)", display: "inline-flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>{s.name} <StatusPill status={statusOf(s)} short /></span>
                    <span style={{ fontFamily: F, fontSize: "var(--nx-t-2xs)", fontWeight: 600, letterSpacing: "var(--nx-ls-caps)", textTransform: "uppercase", color: "var(--nx-fg-muted)" }}>{g ? CATEGORY_LABELS[g] : s.category}</span>
                  </span>
                  {s.gated ? (
                    <span role="cell" className="nx-price-fig nx-price-span" style={{ fontFamily: F }}>Priced after your physician's review</span>
                  ) : s.pricing ? (
                    <>
                      <span role="cell" className="nx-price-fig">{usd(s.pricing.m1)}<i>/mo</i></span>
                      <span role="cell" className="nx-price-fig">{usd(s.pricing.m3)}<i>/mo</i></span>
                      <span role="cell" className="nx-price-fig nx-price-best">{usd(s.pricing.m6)}<i>/mo</i></span>
                      <span role="cell" className="nx-price-fig">{usd(s.pricing.m12)}<i>/mo</i></span>
                    </>
                  ) : (
                    <span role="cell" className="nx-price-fig nx-price-span" style={{ fontFamily: F }}>Priced at consultation</span>
                  )}
                </Link>
              );
            })}
          </div>
        </Reveal>
      </section>

      {/* ══ EVERY PROTOCOL, AT EVERY TERM ══ */}
      <section className="nx-container" aria-labelledby="pricing-protocols" style={{ paddingTop: "var(--nx-sp-sec)" }}>
        <Reveal>
          <p style={kicker}>Every protocol</p>
          <h2 id="pricing-protocols" style={{ ...h2, maxWidth: "18ch" }}>Medicines that work together, priced as one plan.</h2>
          <p style={{ ...body, marginTop: "1rem" }}>Pick a protocol and a term to see the whole figure and what a longer term saves over a year.</p>
        </Reveal>
        <Reveal delay={40}><div style={{ marginTop: "clamp(1.4rem,3vw,2rem)" }}><CadenceCalculator /></div></Reveal>
        <Reveal delay={60}>
          <div className="nx-price-table" role="table" aria-label="Monthly figures by term, every protocol" data-testid="pricing-protocol-table" style={{ marginTop: "clamp(1.4rem,3vw,2rem)" }}>
            <div className="nx-price-row nx-price-head" role="row">
              <span role="columnheader" style={{ fontFamily: F }}>Protocol</span>
              {TERMS.map((t) => <span key={t.key} role="columnheader" style={{ fontFamily: F }}>{t.label}</span>)}
            </div>
            <div className="nx-price-row" role="row" data-testid="pricing-term-labs" style={{ background: "var(--nx-cobalt-soft)" }}>
              <span role="cell" style={{ fontFamily: F, fontSize: "var(--nx-t-xs)", fontWeight: 600, color: "var(--nx-fg)" }}>Blood work included</span>
              {TERMS.map((t) => <span key={t.key} role="cell" style={{ fontFamily: F, fontSize: "var(--nx-t-2xs)", lineHeight: 1.4, color: "var(--nx-fg-graphite)" }}>{t.labs}</span>)}
            </div>
            {PROTOCOLS.map((p) => (
              <Link key={p.slug} href={p.href} className="nx-price-row" role="row" data-testid={`pricing-tier-${p.slug}`}>
                <span role="cell" style={{ display: "flex", flexDirection: "column", gap: 3 }}>
                  <span style={{ fontFamily: S, fontWeight: 500, fontSize: "var(--nx-t-lg)", color: "var(--nx-fg)", display: "inline-flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>{p.name} {p.reserve && <StatusPill status="reserve" short />}</span>
                  <span style={{ ...small, fontSize: "var(--nx-t-xs)" }}>{p.line}</span>
                </span>
                {p.m.map((v, i) => <span key={i} role="cell" className={`nx-price-fig${i === 2 ? " nx-price-best" : ""}`}>{formatUSD(v)}<i>/mo</i></span>)}
              </Link>
            ))}
            {GATED_STACKS.map((s) => (
              <Link key={s.slug} href={`/stacks/${s.slug}`} className="nx-price-row" role="row" data-testid={`pricing-tier-${s.slug}`}>
                <span role="cell" style={{ display: "flex", flexDirection: "column", gap: 3 }}>
                  <span style={{ fontFamily: S, fontWeight: 500, fontSize: "var(--nx-t-lg)", color: "var(--nx-fg)" }}>{s.name}</span>
                  <span style={{ ...small, fontSize: "var(--nx-t-xs)" }}>{s.peptides.map((p) => p.name).join(" + ")}. {s.bestFor}</span>
                </span>
                <span role="cell" className="nx-price-fig nx-price-span" style={{ fontFamily: F }}>Priced at your consultation</span>
              </Link>
            ))}
          </div>
        </Reveal>
      </section>

      {/* ══ INSIDE THE FIGURE ══ */}
      <section className="nx-band" aria-labelledby="pricing-inside" style={{ marginTop: "var(--nx-sp-sec)" }}>
        <div className="nx-container nx-band__body">
          <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr]" style={{ gap: "clamp(1.6rem,4vw,3.5rem)" }}>
            <div>
              <p className="nx-band__kicker" style={{ fontFamily: F }}>Inside the figure</p>
              <h2 id="pricing-inside" className="nx-band__h2" style={{ fontFamily: S }}>Six things, every plan, every term.</h2>
              <ul className="nx-inside" data-testid="pricing-inside">
                {INSIDE.map((t) => <li key={t} style={{ fontFamily: F }}><Check size={14} strokeWidth={2.6} aria-hidden="true" /> {t}</li>)}
              </ul>
            </div>
            <div>
              <p className="nx-band__kicker" style={{ fontFamily: F }}>Bought on its own, elsewhere</p>
              <ul className="nx-value" data-testid="pricing-value-stack">
                {VALUE_STACK.map((v) => (
                  <li key={v.item} className="nx-glass">
                    <span style={{ fontFamily: F }}>{v.item}</span>
                    <span className="nx-value__else" style={{ fontFamily: F }}>{v.elsewhere}</span>
                    <span className="nx-value__inc" style={{ fontFamily: F }}>Included</span>
                  </li>
                ))}
              </ul>
              <p style={{ fontFamily: F, fontSize: "var(--nx-t-xs)", color: "color-mix(in srgb, #FFFFFF 70%, transparent)", marginTop: ".8rem" }}>Typical U.S. retail ranges for each piece bought on its own.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ══ NEXT TO THE GRAY MARKET ══ */}
      <section className="nx-container" aria-labelledby="pricing-compare" style={{ paddingTop: "var(--nx-sp-sec)" }}>
        <Reveal>
          <p style={kicker}>What the figure buys</p>
          <h2 id="pricing-compare" style={{ ...h2, maxWidth: "20ch" }}>The figure, next to the gray market.</h2>
          <p style={{ ...body, marginTop: "1rem" }}>A vial bought online without a prescription costs less. Here is what the difference pays for.</p>
        </Reveal>
        <Reveal delay={40}>
          <div className="nx-compare" role="table" aria-label="Nexphoria next to the gray market" data-testid="pricing-compare">
            <div className="nx-compare__row nx-compare__head" role="row"><span style={{ fontFamily: F }}>Inside the figure</span><span style={{ fontFamily: F }}>Nexphoria</span><span style={{ fontFamily: F }}>Gray market</span></div>
            {COMPARE.map((r) => (
              <div key={r.feature} className="nx-compare__row" role="row">
                <span role="cell" style={{ fontFamily: F }}>{r.feature}</span>
                <span role="cell" className="nx-compare__yes"><Check size={16} strokeWidth={2.6} aria-hidden="true" /><span className="sr-only">Yes</span></span>
                <span role="cell" className="nx-compare__no" style={{ fontFamily: F }}>{r.gray === false ? <><Minus size={16} strokeWidth={2.4} aria-hidden="true" /><span className="sr-only">No</span></> : r.gray}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* ══ QUESTIONS ══ */}
      <section className="nx-container" aria-labelledby="pricing-faq" style={{ paddingTop: "var(--nx-sp-sec)", paddingBottom: "var(--nx-sp-sec)" }}>
        <Reveal>
          <p style={kicker}>Questions</p>
          <h2 id="pricing-faq" style={{ ...h2, maxWidth: "18ch" }}>Asked plainly, answered plainly.</h2>
        </Reveal>
        <div style={{ maxWidth: 820, marginTop: "1.4rem" }}><FaqAccordion items={FAQ} /></div>
      </section>

      <FinalCTAStrip title="Start with the goal." sub="Choose a medicine or a protocol, pick your term, and a licensed physician takes it from there." />
    </SiteLayout>
  );
}
