/* JOB: sell ONE peptide — outcome first, molecule second, one add-to-protocol action. */
/* ═══ SOLO PDP — P5 data · D12 layout, D-POLISH visual pass ═══
   Gradient hero with an outcome frame + sticky buy-box (lg+); mobile in-flow
   card + persistent price bar. "Why this peptide" pillars, a drawn expectation
   timeline, a gradient-edged bloodwork card, and a dramatic contraindication
   band. Three commerce states: tiers / GLP-1 wall / consult-priced. */
import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { SiteLayout, resolveWorld } from "@/components/SiteLayout";
import { Reveal } from "@/components/Reveal";
import { BuyBox, BuyTier } from "@/components/BuyBox";
import { useSeo, webPageJsonLd, breadcrumbJsonLd, faqJsonLd, drugJsonLd, productJsonLd } from "@/lib/seo";
import { getSolo, SOLO_CATALOG, SoloCategory } from "@/data/soloCatalog";
import { analytics } from "@/lib/analytics";
import { FLAGSHIP_STACKS, usd } from "@/data/stacksCatalog";
import { getPrice } from "@/data/pricing";
import { ArrowLeft, Check, X, Stethoscope, Microscope, RefreshCw, FlaskConical, Snowflake, LayoutDashboard } from "lucide-react";
import { F, S } from "@/lib/typography";
import { SpecPlate } from "@/components/DataPlate";
import { PdpFaq, buildPdpFaq } from "@/components/PdpFaq";
import { Disclaimer } from "@/components/Disclaimer";
import { SafetyDisclosure } from "@/components/SafetyDisclosure";
import { RegulatoryDisclosure } from "@/components/RegulatoryDisclosure";
import { PhysicianProofBand } from "@/components/PhysicianProofBand";
import { EvidenceStrip } from "@/components/EvidenceStrip";
import { OUTCOME_CATEGORY, OUTCOME_HERO, stackArt, outcomeSrcSet } from "@/data/outcomeImagery";
import { VialPanel, labelSpec } from "@/components/VialMockup";
import { VialPhoto } from "@/components/VialPhoto";
import type { PeptideCategory } from "@/data/peptides";

/* SoloCategory → the outcome-imagery key it reads as. */
const SOLO_OUTCOME: Record<SoloCategory, PeptideCategory> = {
  Growth: "growth",
  Cognitive: "cognition",
  Recovery: "recovery",
  "Skin & Longevity": "longevity",
  Metabolic: "metabolic",
  Sleep: "sleep",
  "Sexual Health": "longevity",
};

export default function SoloPDP({ slug, world }: { slug: string; world?: "men" | "women" }) {
  const base = world ? `/${world}` : "";
  // Imagery world: the URL world if present, else the visitor's remembered world
  // — so a woman who lands on a neutral /peptides/:slug still sees her world's
  // photo (the palette already follows memory; this aligns the imagery to it).
  const [loc] = useLocation();
  const imgWorld = world ?? resolveWorld(loc);
  const solo = getSolo(slug);
  const [tier, setTier] = useState<string>("m3");
  useEffect(() => {
    if (solo) analytics.productViewed({ kind: "solo", slug: solo.slug, category: solo.category, gated: !!solo.gated, world: imgWorld });
  }, [solo, imgWorld]);
  const faq = solo
    ? buildPdpFaq({ name: solo.name, panel: solo.panel, gated: solo.gated, gatedStates: solo.stateExclusions, hasPricing: !!solo.pricing, firstMark: solo.timeline[0] })
    : [];

  useSeo({
    title: solo ? `${solo.name} — ${solo.category} | Nexphoria` : "Peptide — Nexphoria",
    description: solo ? `${solo.name}: ${solo.dose}. Physician-prescribed, ${solo.panel}-panel gated, retested. Educational — not medical advice.` : "",
    // Canonicalize all three variants (/peptides, /men/peptides, /women/peptides)
    // to the neutral PDP so Google consolidates them instead of collapsing every
    // PDP onto the homepage (the old omitted-path bug deindexed the whole catalog).
    path: solo ? `/peptides/${solo.slug}` : "/peptides",
    jsonLd: solo
      ? [
          webPageJsonLd({ name: solo.name, description: solo.mechanism.slice(0, 120), path: `/peptides/${solo.slug}`, type: "MedicalWebPage" }),
          breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Peptides", path: "/peptides" }, { name: solo.name, path: `/peptides/${solo.slug}` }]),
          faqJsonLd(faq),
          drugJsonLd({ name: solo.name, description: solo.mechanism.slice(0, 200), path: `/peptides/${solo.slug}` }),
          // Prescription item: name/brand/category enrichment only — no offers/price (pharma rich-result policy).
          productJsonLd({ name: solo.name, description: solo.mechanism.slice(0, 200), path: `/peptides/${solo.slug}`, category: solo.category }),
        ]
      : [],
  });

  if (!solo) {
    return (
      <SiteLayout variant={imgWorld}>
        <div style={{ maxWidth: 640, margin: "0 auto", padding: "120px 24px", textAlign: "center" }}>
          <h1 style={{ fontFamily: S, fontSize: "var(--nx-t-h2)", color: "var(--nx-fg)", marginBottom: 12 }}>Peptide not found</h1>
          <p style={{ fontFamily: F, fontSize: "var(--nx-t-body)", color: "var(--nx-fg-muted)", marginBottom: 28 }}>
            That entry isn’t in the current formulary. Browse the full catalog or start an assessment.
          </p>
          <Link href={`${base}/peptides`} style={{ fontFamily: F, fontSize: "var(--nx-t-base)", fontWeight: 600, color: "var(--nx-cobalt)", textDecoration: "none" }}>
            ← All peptides
          </Link>
        </div>
      </SiteLayout>
    );
  }

  /* Per-product editorial hero when one exists; the shared category outcome
     photo stays in the lower imagery band so each PDP shows two distinct
     frames (product + outcome) instead of the same photo twice. */
  const categoryImg =
    OUTCOME_CATEGORY[imgWorld][SOLO_OUTCOME[solo.category]] ?? OUTCOME_HERO[imgWorld];

  /* Same-category companions first, then fill from the wider formulary. */
  const related = SOLO_CATALOG
    .filter((s) => s.slug !== solo.slug)
    .sort((a, b) => Number(b.category === solo.category) - Number(a.category === solo.category))
    .slice(0, 3);

  /* The upgrade route (Maximus offer logic): if this compound runs inside a
     flagship protocol, say so — the complete route beats a single vial and
     everything on the band is already in the stack's data. Never surfaces
     the other world's flagship. */
  const normalizeName = (n: string) => n.toLowerCase().replace(/\s*\(.*?\)/g, "").trim();
  const parentStack = FLAGSHIP_STACKS.find(
    (st) =>
      st.worldLean !== (imgWorld === "women" ? "him" : "her") &&
      st.peptides.some((p) => {
        const a = normalizeName(p.name);
        const b = normalizeName(solo.name);
        return a.includes(b) || b.includes(a);
      }),
  );
  const parentFrom = parentStack && !parentStack.gated
    ? usd(Math.min(...parentStack.cadences.map((c) => c.perMonth ?? c.total)))
    : null;
  // Bind the flagship frame once (it was resolved twice) so the responsive
  // srcSet is typed and the world-cast lookup runs a single time.
  const parentStackArt = parentStack ? stackArt(parentStack.slug, imgWorld) : undefined;

  const INCLUDED: { Icon: typeof Stethoscope; t: string }[] = [
    { Icon: Stethoscope, t: "Physician review & prescription" },
    { Icon: Microscope, t: `${solo.panel} bloodwork panel` },
    { Icon: FlaskConical, t: "503A pharmacy compounding" },
    { Icon: Snowflake, t: "Cold-chain, unbranded delivery" },
    { Icon: LayoutDashboard, t: "Marker dashboard & messaging" },
    { Icon: RefreshCw, t: "90-day retest & dose review" },
  ];

  const WHY: { Icon: typeof Stethoscope; t: string; d: string }[] = [
    { Icon: Stethoscope, t: "Prescribed, not sold", d: "A licensed U.S. physician authorizes it against your intake — never a checkout button." },
    { Icon: Microscope, t: `${solo.panel} panel, gated`, d: "Baseline bloodwork is required before the first dose, and read by your physician." },
    { Icon: RefreshCw, t: "Retested at 90 days", d: "The same markers are re-drawn and the dose is held, adjusted, or tapered from data." },
  ];

  const tiers: BuyTier[] | undefined = solo.pricing
    ? [
        { key: "m1", label: "1-Month", sub: "Cancel anytime", amount: solo.pricing.m1, per: "/mo" },
        { key: "m3", label: "3-Month", sub: "Save 15%", badge: "Recommended", amount: solo.pricing.m3, per: "/mo" },
        { key: "m12", label: "12-Month", sub: "Save 30% · panel included", badge: "Best value", amount: solo.pricing.m12, per: "/mo" },
      ]
    : undefined;

  /* The hero figure, off the same three sources the buy box reads and in the
     same order of precedence: a gated SKU has no shelf price at all, a priced
     SKU leads with its lowest real cadence, and anything else is honest about
     being set at consultation. Derived, never a second hardcoded number. */
  const heroPrice = solo.gated
    ? "Assessed first"
    : solo.pricing
      ? `From ${usd(solo.pricing.m12)}/mo`
      : getPrice(solo.slug)
        ? `From ${usd(getPrice(solo.slug)!.monthlyPrice)}/mo`
        : "Set at consultation";
  const heroPriceSub = solo.gated
    ? "Priced once a physician has reviewed your intake"
    : solo.pricing
      ? "on the 12-month cadence · panel included"
      : undefined;

  return (
    <SiteLayout>
      {/* ══ HERO — claim beside an outcome frame, over a gradient field ══ */}
      <section className="nx-gradient-hero relative" style={{ overflow: "hidden" }} aria-labelledby="solo-hero-title">
        <div className="nx-container relative nx-hero-seq" style={{ paddingTop: "var(--nx-sp-band)", paddingBottom: "var(--nx-sp-tight)", zIndex: 1 }}>
          <Link href={`${base}/peptides`} className="nx-text-link" style={{ gap: 6, fontFamily: F, fontSize: "var(--nx-t-sm)", fontWeight: 600 }}>
            <ArrowLeft size={15} aria-hidden="true" /> All peptides
          </Link>
          {/* Reference grammar (IVYRX-STUDY-VISUAL §V2.2): marketing heroes are
              centred and 50–65% empty, but PDPs INVERT — a tight, left-aligned
              two-column split at ~30% empty, product image LEFT, headline +
              price + CTA right, and the product takes first fixation. Ours had
              the opposite: copy left, an editorial photo right, and no price in
              the hero at all — you had to scroll to learn what it cost. */}
          <div className="grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr]" style={{ gap: "clamp(1.6rem,4vw,3.2rem)", alignItems: "center", marginTop: "1rem" }}>
            {/* — LEFT · the product, first fixation — */}
            <div style={{ position: "relative", order: 0 }}>
              <VialPhoto sku={solo} variant="light" width="86%" testId={`solo-vial-${solo.slug}`} />
              <span
                style={{
                  position: "absolute", top: 14, left: 14,
                  fontFamily: F, fontSize: "var(--nx-t-2xs)", fontWeight: 600,
                  letterSpacing: "var(--nx-ls-caps)", textTransform: "uppercase",
                  color: "var(--nx-fg-muted)", background: "var(--nx-ceramic)",
                  border: "1px solid var(--nx-border)", borderRadius: "var(--nx-r-pill)",
                  padding: "6px 12px",
                }}
                data-testid={`solo-posture-${solo.slug}`}
              >
                {solo.gated ? "Physician-assessed" : "Prescription only"}
              </span>
            </div>

            {/* — RIGHT · the claim, the number, the one action — */}
            <div>
              {/* Goals before chemistry (ROADMAP 3.2): the OUTCOME is the
                  headline; the molecule identifies, it no longer leads. */}
              <p style={{ fontFamily: F, fontSize: "var(--nx-t-xs)", fontWeight: 600, letterSpacing: "var(--nx-ls-wide)", textTransform: "uppercase", color: "var(--nx-cobalt)" }}>
                {solo.name} · {solo.category}
              </p>
              <h1 id="solo-hero-title" style={{ fontFamily: S, fontWeight: 500, fontSize: "var(--nx-t-h1)", lineHeight: 1.05, letterSpacing: "var(--nx-ls-tight)", color: "var(--nx-fg)", marginTop: "0.4rem", maxWidth: "18ch" }}>{solo.outcome}</h1>
              <p style={{ fontFamily: F, fontSize: "var(--nx-t-body)", lineHeight: 1.62, color: "var(--nx-fg-graphite)", maxWidth: "52ch", marginTop: "1rem" }}>
                <strong style={{ color: "var(--nx-fg)", fontWeight: 600 }}>{solo.name}</strong> — {solo.mechanism}
              </p>
              {/* Seed-grammar spec plate (SEED-STUDY S1): the compound as a
                  specimen label — taxonomy line + ruled LABEL→value rows in
                  tabular numerals. Replaces the two loose stat cards. */}
              <div style={{ maxWidth: 460, marginTop: "1.4rem" }}>
                <SpecPlate
                  name={solo.name}
                  nomenclature={`${solo.category.toLowerCase()} · physician-prescribed`}
                  rows={[
                    { label: "Dose", value: solo.dose },
                    { label: "Format", value: solo.spec },
                    { label: "Monitoring", value: "Panel at baseline · retest every 90 days" },
                  ]}
                  testId={`spec-plate-${solo.slug}`}
                />
              </div>
              {/* The number, in the hero. The reference's PDP eye-path is
                  product → headline → price/CTA, and ours stopped at the
                  headline: the figure lived only in the buy box further down.
                  Derived from the SAME source the buy box reads, so the hero
                  can never quote a price the rail disagrees with. */}
              <div style={{ display: "flex", alignItems: "baseline", gap: "0.65rem", flexWrap: "wrap", marginTop: "1.5rem" }}>
                <span style={{ fontFamily: S, fontWeight: 500, fontSize: "var(--nx-t-h2)", color: "var(--nx-fg)", lineHeight: 1 }} data-testid={`solo-hero-price-${solo.slug}`}>
                  {heroPrice}
                </span>
                {heroPriceSub && (
                  <span style={{ fontFamily: F, fontSize: "var(--nx-t-sm)", color: "var(--nx-fg-muted)" }}>
                    {heroPriceSub}
                  </span>
                )}
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "0.8rem", flexWrap: "wrap", marginTop: "1.1rem" }}>
                <Link
                  href="/assessment"
                  className="nx-cta-cobalt"
                  data-testid="solo-hero-cta"
                  style={{ fontFamily: F, fontWeight: 600, fontSize: "var(--nx-t-base)" }}
                >
                  Start your assessment
                </Link>
                <a href="#buy" className="nx-text-link" style={{ fontFamily: F, fontSize: "var(--nx-t-sm)", fontWeight: 600 }}>
                  See every cadence →
                </a>
              </div>
              <p style={{ fontFamily: F, fontSize: "var(--nx-t-xs)", lineHeight: 1.55, color: "var(--nx-fg-muted)", marginTop: "0.8rem", maxWidth: "44ch" }}>
                A licensed physician decides — and can decline. Dispensed only if prescribed.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ══ BODY — content rail + sticky buy-box ══ */}
      <section className="nx-container" style={{ paddingTop: "var(--nx-sp-tight)", paddingBottom: "var(--nx-sp-band)" }} aria-label="Peptide details">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_360px]" style={{ gap: "clamp(1.8rem,4vw,3.2rem)", alignItems: "start" }}>

          {/* — LEFT — */}
          <div>
            {/* Why this peptide — the three pillars every solo answers to.
               h2 (not p) so the tile h3s below don't skip a heading level; style unchanged. */}
            <h2 style={{ fontFamily: F, fontSize: "var(--nx-t-xs)", fontWeight: 600, letterSpacing: "var(--nx-ls-caps)", textTransform: "uppercase", color: "var(--nx-fg-muted)" }}>Why this peptide, this way</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3" style={{ gap: 12, marginTop: "0.9rem" }}>
              {WHY.map((w, i) => (
                <Reveal key={w.t} delay={i * 55}>
                  <div className="nx-glass-tile" style={{ height: "100%" }}>
                    <span className="nx-icon-circle" aria-hidden><w.Icon size={19} strokeWidth={1.9} /></span>
                    <h3 style={{ fontFamily: S, fontWeight: 500, fontSize: "var(--nx-t-lg)", color: "var(--nx-fg)", marginTop: "0.7rem", lineHeight: 1.15 }}>{w.t}</h3>
                    <p style={{ fontFamily: F, fontSize: "var(--nx-t-sm)", lineHeight: 1.55, color: "var(--nx-fg-graphite)", marginTop: "0.4rem" }}>{w.d}</p>
                  </div>
                </Reveal>
              ))}
            </div>

            {/* What to expect — drawn timeline */}
            <h2 style={{ fontFamily: S, fontWeight: 500, fontSize: "var(--nx-t-h3)", color: "var(--nx-fg)", marginTop: "clamp(2rem,4vw,2.8rem)" }}>What to expect</h2>
            <div className="nx-timeline" style={{ marginTop: "1.2rem" }}>
              {solo.timeline.map((t, i) => (
                <Reveal key={i} delay={i * 55}>
                  <div className="nx-timeline-step" style={{ paddingBottom: i < solo.timeline.length - 1 ? "1.1rem" : 0 }}>
                    <span className="nx-timeline-node" aria-hidden>{i + 1}</span>
                    <div className="nx-glass-tile" style={{ display: "block" }}>
                      <p style={{ fontFamily: S, fontWeight: 500, fontSize: "var(--nx-t-lg)", color: "var(--nx-cobalt)" }}>{t.wk}</p>
                      <p style={{ fontFamily: F, fontSize: "var(--nx-t-base)", lineHeight: 1.55, color: "var(--nx-fg-graphite)", marginTop: "0.35rem" }}>{t.effect}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            {/* What every solo protocol includes — same grid the stacks carry */}
            <h2 style={{ fontFamily: S, fontWeight: 500, fontSize: "var(--nx-t-h3)", color: "var(--nx-fg)", marginTop: "clamp(2rem,4vw,2.8rem)" }}>
              {/* consult-priced pulse protocols aren't monthly subscriptions */}
              {solo.pricing ? "What is included, every month" : "What is included with your protocol"}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2" style={{ gap: 12, marginTop: "1.2rem" }}>
              {INCLUDED.map((x, i) => (
                <Reveal key={x.t} delay={i * 45}>
                  <div className="nx-glass-tile" style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <span className="nx-icon-circle" aria-hidden><x.Icon size={19} strokeWidth={1.9} /></span>
                    <p style={{ fontFamily: F, fontSize: "var(--nx-t-base)", fontWeight: 600, color: "var(--nx-fg)", lineHeight: 1.3 }}>{x.t}</p>
                  </div>
                </Reveal>
              ))}
            </div>

            {/* Required bloodwork — gradient-edged feature card */}
            <div className="nx-feature-card edge-top" style={{ padding: "clamp(1.4rem,3vw,2rem)", background: "var(--nx-cobalt-soft)", marginTop: "clamp(2rem,4vw,2.8rem)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <span className="nx-icon-circle" aria-hidden><Microscope size={19} strokeWidth={1.9} /></span>
                <div>
                  <p style={{ fontFamily: F, fontSize: "var(--nx-t-xs)", fontWeight: 600, letterSpacing: "var(--nx-ls-caps)", textTransform: "uppercase", color: "var(--nx-cobalt)" }}>Required bloodwork</p>
                  <h3 style={{ fontFamily: S, fontWeight: 500, fontSize: "var(--nx-t-xl)", color: "var(--nx-fg)" }}>{solo.panel} panel</h3>
                </div>
              </div>
              <p style={{ fontFamily: F, fontSize: "var(--nx-t-base)", lineHeight: 1.55, color: "var(--nx-fg-graphite)", marginTop: "0.8rem", maxWidth: "56ch" }}>{solo.panelNote ?? "Reviewed by your physician before and during the protocol."}</p>
              <Link href="/bloodwork" className="nx-text-link" style={{ fontFamily: F, fontSize: "var(--nx-t-sm)", fontWeight: 600, marginTop: "0.7rem" }}>See the panels →</Link>
            </div>

            {solo.gated && (
              <div style={{ borderRadius: "var(--nx-r-lg)", padding: "clamp(1.4rem,3vw,2rem)", background: "var(--nx-cobalt-soft)", border: "1px solid var(--nx-border)", marginTop: "clamp(1.8rem,3.5vw,2.4rem)" }}>
                <h3 style={{ fontFamily: S, fontWeight: 500, fontSize: "var(--nx-t-h3)", color: "var(--nx-fg)", maxWidth: "26ch" }}>GLP-1 therapy is prescribed after review — not bought from a shelf.</h3>
                <p style={{ fontFamily: F, fontSize: "var(--nx-t-base)", lineHeight: 1.65, color: "var(--nx-fg-graphite)", maxWidth: "60ch", marginTop: "0.7rem" }}>Eligibility depends on your medical history and your state. Begin with a structured intake; if appropriate, your physician prescribes and titrates it against your bloodwork.</p>
              </div>
            )}

            <EvidenceStrip slug={solo.slug} name={solo.name} />

            <PhysicianProofBand name={solo.name} />

            <PdpFaq items={faq} />
          </div>

          {/* — RIGHT — */}
          <aside id="buy" style={{ alignSelf: "stretch", scrollMarginTop: "96px" }}>
            <div className="nx-buyrail">
            <BuyBox
              name={solo.name}
              category={solo.category}
              slug={solo.slug}
              addType="peptide"
              tiers={tiers}
              selected={tier}
              onSelect={setTier}
              gated={solo.gated}
              gatedStates={solo.stateExclusions}
              consultPriced={!solo.gated && !solo.pricing}
              fromPrice={!solo.gated && !solo.pricing ? getPrice(solo.slug)?.monthlyPrice : undefined}
              ctaTestId="solo-cta"
            />
            <SafetyDisclosure name={solo.name} contraindications={solo.contraindications} />
            {/* Regulatory standing sits AT the decision point, beside the buy
                box — not in a footer. Per the teardown, disclosure that the
                buyer must scroll past is disclosure that reviewers discount. */}
            <div style={{ marginTop: "1rem" }}>
              <RegulatoryDisclosure sku={solo} testid="solo-regulatory" />
            </div>
            </div>
          </aside>
        </div>
      </section>

      {/* ══ IMAGERY BAND — the outcome, not the vial ══ */}
      <section className="nx-container" style={{ paddingBottom: "var(--nx-sp-band)" }} aria-labelledby="solo-point-title">
        <Reveal>
          <div style={{ position: "relative", borderRadius: "var(--nx-r-lg)", overflow: "hidden", boxShadow: "var(--nx-e-3)", aspectRatio: "16 / 7" }}>
            <img src={categoryImg} srcSet={outcomeSrcSet(categoryImg)} sizes="100vw" alt="" aria-hidden loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "50% 28%", display: "block" }} />
            <div aria-hidden style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg, color-mix(in srgb, var(--nx-fg) 62%, transparent) 0%, transparent 60%)" }} />
            <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center" }}>
              <div style={{ padding: "var(--nx-sp-band)", maxWidth: 560 }}>
                <p style={{ fontFamily: F, fontSize: "var(--nx-t-xs)", fontWeight: 600, letterSpacing: "var(--nx-ls-wide)", textTransform: "uppercase", color: "var(--nx-acid)" }}>The point of the protocol</p>
                <h2 id="solo-point-title" style={{ fontFamily: S, fontWeight: 500, fontSize: "var(--nx-t-h2)", color: "var(--nx-ceramic)", lineHeight: 1.1, marginTop: "0.7rem", maxWidth: "18ch" }}>
                  We sell the measured loop — <em style={{ color: "var(--nx-acid)" }}>not the vial.</em>
                </h2>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ══ CONTRAINDICATION NIGHT BAND — dramatic ══ */}
      <section className="nx-gradient-hero-dark" style={{ padding: "var(--nx-sp-band) 0", overflow: "hidden" }} aria-labelledby="solo-contra-title">
        <div className="nx-container">
          <p style={{ display: "inline-flex", alignItems: "center", gap: 8, fontFamily: F, fontSize: "var(--nx-t-xs)", fontWeight: 600, letterSpacing: "var(--nx-ls-wide)", textTransform: "uppercase", color: "var(--nx-acid)" }}>
            <FlaskConical size={14} strokeWidth={2.2} aria-hidden="true" /> Before you begin
          </p>
          <h2 id="solo-contra-title" style={{ fontFamily: S, fontWeight: 500, fontSize: "var(--nx-t-h1)", color: "var(--nx-ceramic)", maxWidth: "20ch", marginTop: "0.8rem", lineHeight: 1.06, letterSpacing: "var(--nx-ls-snug)" }}>Not for everyone.</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2" style={{ gap: 10, marginTop: "1.4rem", maxWidth: 760 }}>
            {solo.contraindications.map((c) => (
              <div key={c} className="nx-stat-card on-dark" style={{ flexDirection: "row", alignItems: "flex-start", gap: 11 }}>
                <X size={17} strokeWidth={2.4} aria-hidden="true" style={{ color: "var(--nx-acid)", marginTop: 2, flexShrink: 0 }} />
                <p style={{ fontFamily: F, fontSize: "var(--nx-t-base)", lineHeight: 1.5, color: "var(--nx-acid)", opacity: 0.92 }}>{c}</p>
              </div>
            ))}
          </div>
          <div style={{ marginTop: "1.4rem" }}><Disclaimer variant="night" /></div>
        </div>
      </section>

      {/* ══ THE COMPLETE ROUTE — this compound inside its flagship protocol ══ */}
      {parentStack && (
        <section className="nx-container" style={{ paddingTop: "var(--nx-sp-band)", paddingBottom: "0" }} aria-labelledby="solo-upgrade-title">
          <Link
            href={`/stacks/${parentStack.slug}`}
            className="nx-float-card"
            data-testid={`solo-upgrade-${parentStack.slug}`}
            style={{ flexDirection: "row", flexWrap: "wrap", alignItems: "stretch" }}
          >
            {parentStackArt && (
              <div className="nx-float-card__media" style={{ flex: "1 1 260px", aspectRatio: "auto", minHeight: 200, marginBottom: 10 }}>
                <img src={parentStackArt} srcSet={outcomeSrcSet(parentStackArt)} sizes="(max-width: 640px) 100vw, 300px" alt="" aria-hidden loading="lazy" width={1632} height={1020} />
              </div>
            )}
            <div className="nx-float-card__body" style={{ flex: "2 1 340px" }}>
              <p style={{ fontFamily: F, fontSize: "var(--nx-t-xs)", fontWeight: 700, letterSpacing: "var(--nx-ls-caps)", textTransform: "uppercase", color: "var(--nx-cobalt)" }}>
                The complete route
              </p>
              <h2 id="solo-upgrade-title" style={{ fontFamily: S, fontWeight: 500, fontSize: "var(--nx-t-h3)", color: "var(--nx-fg)", lineHeight: 1.15, marginTop: "0.5rem" }}>
                {solo.name} anchors The {parentStack.name} protocol.
              </h2>
              <p style={{ fontFamily: F, fontSize: "var(--nx-t-sm)", lineHeight: 1.55, color: "var(--nx-fg-graphite)", marginTop: "0.5rem", maxWidth: "62ch" }}>
                {parentStack.synergy}
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: "0.8rem" }}>
                {parentStack.peptides.map((p) => (
                  <span key={p.name} style={{ fontFamily: F, fontSize: "var(--nx-t-xs)", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--nx-cobalt)", background: "var(--nx-cobalt-soft)", borderRadius: "var(--nx-r-pill)", padding: "3px 10px" }}>
                    {p.name}
                  </span>
                ))}
              </div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8, marginTop: "auto", paddingTop: "0.95rem" }}>
                <span style={{ fontFamily: F, fontSize: "var(--nx-t-base)", fontWeight: 600, color: "var(--nx-cobalt)" }}>
                  {parentFrom ? (
                    <>From {parentFrom}/mo<span style={{ fontWeight: 400, color: "var(--nx-fg-muted)" }}> · if prescribed</span></>
                  ) : (
                    "Physician-assessed"
                  )}
                </span>
                <span style={{ fontFamily: F, fontSize: "var(--nx-t-sm)", fontWeight: 600, color: "var(--nx-cobalt)", display: "inline-flex", alignItems: "center", gap: 6 }}>
                  See the protocol <ArrowLeft size={15} aria-hidden style={{ transform: "rotate(180deg)" }} />
                </span>
              </div>
            </div>
          </Link>
        </section>
      )}

      {/* ══ CROSS-SELL — same-axis compounds, if-prescribed framing ══ */}
      {related.length > 0 && (
        <section className="nx-container" style={{ paddingTop: "var(--nx-sp-band)", paddingBottom: "0" }} aria-labelledby="solo-crosssell-title">
          <h2 id="solo-crosssell-title" style={{ fontFamily: S, fontWeight: 500, fontSize: "var(--nx-t-h3)", color: "var(--nx-fg)" }}>
            Often prescribed on the same axis
          </h2>
          <p style={{ fontFamily: F, fontSize: "var(--nx-t-base)", color: "var(--nx-fg-graphite)", maxWidth: "58ch", marginTop: "0.5rem" }}>
            Compounds your physician may consider alongside {solo.name} — same intake, same panel, one prescription decision.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3" style={{ gap: 14, marginTop: "1.4rem" }}>
            {related.map((r, i) => (
              <Reveal key={r.slug} delay={i * 60}>
                <Link href={`${base}/peptides/${r.slug}`} className="nx-float-card" data-testid={`solo-related-${r.slug}`}>
                  <div className="nx-float-card__body">
                    <p style={{ fontFamily: F, fontSize: "var(--nx-t-xs)", fontWeight: 600, letterSpacing: "var(--nx-ls-caps)", textTransform: "uppercase", color: "var(--nx-cobalt)" }}>{r.category}</p>
                    <h3 style={{ fontFamily: S, fontWeight: 500, fontSize: "var(--nx-t-lg)", color: "var(--nx-fg)", marginTop: "0.5rem", lineHeight: 1.1 }}>{r.name}</h3>
                    <p className="nx-line-2" style={{ fontFamily: F, fontSize: "var(--nx-t-sm)", lineHeight: 1.5, color: "var(--nx-fg-graphite)", marginTop: "0.4rem" }}>{r.mechanism}</p>
                    <p style={{ fontFamily: F, fontSize: "var(--nx-t-sm)", fontWeight: 600, color: "var(--nx-fg)", marginTop: "auto", paddingTop: "0.95rem" }}>
                      {r.pricing ? `From $${r.pricing.m12}/mo` : "Physician-priced"}
                      <span style={{ fontWeight: 400, color: "var(--nx-fg-muted)" }}> · if prescribed</span>
                    </p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      <section className="nx-container" style={{ paddingTop: "var(--nx-sp-band)", paddingBottom: "4.5rem", textAlign: "center" }} aria-labelledby="solo-close-title">
        <h2 id="solo-close-title" style={{ fontFamily: S, fontWeight: 500, fontSize: "var(--nx-t-h2)", color: "var(--nx-fg)", maxWidth: "22ch", margin: "0 auto", lineHeight: 1.1 }}>The consultation is complimentary. <em style={{ color: "var(--nx-cobalt)" }}>A figure follows only a prescription.</em></h2>
        <Link href="/assessment" className="nx-cta-cobalt" style={{ marginTop: "1.6rem" }}>Start your assessment</Link>
      </section>
    </SiteLayout>
  );
}
