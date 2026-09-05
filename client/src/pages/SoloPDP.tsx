/* JOB: present ONE peptide: what it is, what it is for, how it works, what it costs, who prescribes it. */
/* ═══ SOLO PDP, the plain deck (docs/COPY-DECK-PLAIN.md, 2026-09-04) ═══
   One structure shared with StackPage: hero · buy box · what to expect ·
   blood testing · who should not take it · regulatory status · who
   prescribes it · common questions · other medicines · closer. Every fact
   once per page. Three commerce states: tiers / GLP-1 wall / consult-priced. */
import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { SiteLayout, resolveWorld } from "@/components/SiteLayout";
import { Reveal } from "@/components/Reveal";
import { BuyBox, BuyTier } from "@/components/BuyBox";
import { useSeo, webPageJsonLd, breadcrumbJsonLd, faqJsonLd, drugJsonLd, productJsonLd } from "@/lib/seo";
import { getSolo, SOLO_CATALOG, SoloCategory } from "@/data/soloCatalog";
import { analytics } from "@/lib/analytics";
import { FLAGSHIP_STACKS } from "@/data/stacksCatalog";
import { getPrice } from "@/data/pricing";
import { ArrowLeft, X, Stethoscope, Droplets, FlaskConical, Snowflake } from "lucide-react";
import { F, S } from "@/lib/typography";
import { SpecPlate } from "@/components/DataPlate";
import { PdpFaq, buildPdpFaq } from "@/components/PdpFaq";
import { Disclaimer } from "@/components/Disclaimer";
import { RegulatoryDisclosure } from "@/components/RegulatoryDisclosure";
import { PROVIDER_INFO, PHARMACY_INFO } from "@/data/compliance";
import { VialPanel, labelSpec } from "@/components/VialMockup";
import { SkuPhoto } from "@/components/SkuPhoto";
import { BenefitStrip } from "@/components/BenefitStrip";
import { ExpectCard } from "@/components/ExpectCard";
import { ProductTile } from "@/components/ProductTile";
import { AddonsFor } from "@/components/AddonsFor";
import { ExpectTimeline } from "@/components/ExpectTimeline";
import { EvidenceStrip } from "@/components/EvidenceStrip";
import { StatusPill } from "@/components/StatusPill";
import { soloTiers } from "@/lib/tiers";
import { statusOf, regulatoryOf } from "@/data/soloCatalog";
import { monitoringFor } from "@/data/monitoring";

/* SoloCategory → the category vocabulary (the deck: filters, tiles and goal
   pages all use the same words). */
const GOAL_LABEL: Record<SoloCategory, string> = {
  Growth: "Body composition",
  Cognitive: "Focus and mood",
  Recovery: "Recovery",
  "Skin & Longevity": "Skin and ageing",
  Metabolic: "Weight loss",
  Sleep: "Sleep",
  "Sexual Health": "Sexual health",
  Hormone: "Hormones",
};

export default function SoloPDP({ slug, world }: { slug: string; world?: "men" | "women" }) {
  const base = world ? `/${world}` : "";
  // Imagery world: the URL world if present, else the visitor's remembered world.
  const [loc] = useLocation();
  const imgWorld = world ?? resolveWorld(loc);
  const solo = getSolo(slug);
  const [tier, setTier] = useState<string>("m6");
  useEffect(() => {
    if (solo) analytics.productViewed({ kind: "solo", slug: solo.slug, category: solo.category, gated: !!solo.gated, world: imgWorld });
  }, [solo, imgWorld]);
  const faq = solo
    ? buildPdpFaq({ name: solo.name, gated: solo.gated, hasPricing: !!solo.pricing, firstMark: solo.timeline[0], regulatory: regulatoryOf(solo), feelBy: solo.feelBy, fullEffect: solo.fullEffect })
    : [];

  useSeo({
    title: solo ? `${solo.name}: ${GOAL_LABEL[solo.category]} | Nexphoria` : "Peptide | Nexphoria",
    description: solo ? `${solo.name}: ${solo.outcome} Prescribed by a licensed U.S. physician, with a blood test before the first dose and again at week 12.` : "",
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
          // Prescription item: name/brand/category enrichment only, no offers/price (pharma rich-result policy).
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
            That entry is outside the current formulary. Browse the full catalog to find the right medicine.
          </p>
          <Link href={`${base}/peptides`} style={{ fontFamily: F, fontSize: "var(--nx-t-base)", fontWeight: 600, color: "var(--nx-cobalt)", textDecoration: "none" }}>
            ← All peptides
          </Link>
        </div>
      </SiteLayout>
    );
  }

  /* Same-category companions first, then fill from the wider formulary. */
  const related = SOLO_CATALOG
    .filter((s) => s.slug !== solo.slug)
    .sort((a, b) => Number(b.category === solo.category) - Number(a.category === solo.category))
    .slice(0, 3);

  /* The protocol that contains this medicine, if one does: one plain line
     under the hero. Never surfaces the other world's protocol. */
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

  const tiers: BuyTier[] | undefined = solo.pricing
    ? soloTiers(solo.pricing)
    : undefined;

  const monitoring = monitoringFor(solo.slug);

  return (
    <SiteLayout>
      {/* ══ 1 · HERO: the product beside what it is, what it is for and how it works ══ */}
      <section className="nx-hero-r3 relative" style={{ overflow: "hidden" }} aria-labelledby="solo-hero-title">
        <div className="nx-container relative" style={{ paddingTop: "var(--nx-sp-band)", paddingBottom: "var(--nx-sp-tight)", zIndex: 1 }}>
          <Link href={`${base}/peptides`} className="nx-text-link" style={{ gap: 6, fontFamily: F, fontSize: "var(--nx-t-sm)", fontWeight: 600 }}>
            <ArrowLeft size={15} aria-hidden="true" /> All peptides
          </Link>
          <div className="grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr]" style={{ gap: "clamp(1.6rem,4vw,3.2rem)", alignItems: "center", marginTop: "1rem" }}>
            {/* LEFT: the product */}
            <div style={{ position: "relative", order: 0 }}>
              <SkuPhoto slug={solo.slug} name={solo.name} eager className="nx-sku-img nx-sku-img--pdp" testId={`solo-vial-${solo.slug}`} fallback={<VialPanel name={solo.name} dose={labelSpec(solo.spec)} size="80%" testId={`solo-vial-${solo.slug}`} />} />
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
                {solo.gated ? "Doctor-assessed" : "Prescription only"}
              </span>
              <StatusPill status={statusOf(solo)} testId={`solo-status-${solo.slug}`} style={{ marginLeft: 8 }} />
            </div>

            {/* RIGHT: name, category, tile line, mechanism, the benefit layer, the expectations */}
            <div>
              <p style={{ fontFamily: F, fontSize: "var(--nx-t-xs)", fontWeight: 600, letterSpacing: "var(--nx-ls-wide)", textTransform: "uppercase", color: "var(--nx-cobalt)" }}>
                {GOAL_LABEL[solo.category]}
              </p>
              <h1 id="solo-hero-title" style={{ fontFamily: S, fontWeight: 500, fontSize: "var(--nx-t-h1)", lineHeight: 1.05, letterSpacing: "var(--nx-ls-tight)", color: "var(--nx-fg)", marginTop: "0.4rem", maxWidth: "18ch" }}>{solo.name}</h1>
              <p style={{ fontFamily: S, fontWeight: 500, fontSize: "var(--nx-t-xl)", color: "var(--nx-cobalt)", marginTop: "0.6rem", maxWidth: "40ch" }}>
                {solo.outcome}
              </p>
              <p style={{ fontFamily: F, fontSize: "var(--nx-t-body)", lineHeight: 1.62, color: "var(--nx-fg-graphite)", maxWidth: "52ch", marginTop: "1rem" }}>
                {solo.mechanism}
              </p>
              <div style={{ marginTop: "1.2rem", maxWidth: 560 }}><BenefitStrip slug={solo.slug} testId={`benefit-${solo.slug}`} /></div>
              <div style={{ marginTop: "1rem", maxWidth: 560 }}><ExpectCard sku={solo} base={base} /></div>
              <div style={{ maxWidth: 460, marginTop: "1.4rem" }}>
                <SpecPlate
                  name={solo.name}
                  rows={[
                    { label: "Dose", value: solo.dose },
                    { label: "Format", value: solo.spec },
                  ]}
                  testId={`spec-plate-${solo.slug}`}
                />
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "0.8rem", flexWrap: "wrap", marginTop: "1.5rem" }}>
                <a
                  href="#buy"
                  className="nx-cta-cobalt"
                  data-testid="solo-hero-cta"
                  style={{ fontFamily: F, fontWeight: 600, fontSize: "var(--nx-t-base)" }}
                >
                  See the plan and price
                </a>
                <Link href="/peptides" className="nx-text-link" style={{ fontFamily: F, fontSize: "var(--nx-t-sm)", fontWeight: 600 }}>
                  Every medicine
                </Link>
              </div>
              {/* The fact strip (2026-09-05, after alyverx.com): the four facts
                  that are true of every medicine, once, with an icon each. */}
              <ul className="nx-pdp-facts" aria-label="What every order includes" data-testid={`solo-facts-${solo.slug}`}>
                <li style={{ fontFamily: F }}><Stethoscope size={15} strokeWidth={2.1} aria-hidden="true" />Prescribed by a licensed U.S. physician</li>
                <li style={{ fontFamily: F }}><Droplets size={15} strokeWidth={2.1} aria-hidden="true" />An at-home blood test, included</li>
                <li style={{ fontFamily: F }}><FlaskConical size={15} strokeWidth={2.1} aria-hidden="true" />Compounded in a licensed U.S. pharmacy</li>
                <li style={{ fontFamily: F }}><Snowflake size={15} strokeWidth={2.1} aria-hidden="true" />Shipped cold, in plain packaging</li>
              </ul>
              {parentStack && (
                <p style={{ fontFamily: F, fontSize: "var(--nx-t-sm)", lineHeight: 1.55, color: "var(--nx-fg-graphite)", marginTop: "0.8rem", maxWidth: "44ch" }}>
                  Also prescribed in the{" "}
                  <Link href={`/stacks/${parentStack.slug}`} className="nx-text-link" style={{ fontWeight: 600 }} data-testid={`solo-upgrade-${parentStack.slug}`}>
                    {parentStack.name}
                  </Link>.
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ══ BODY: content rail + sticky buy box ══ */}
      <section className="nx-container" style={{ paddingTop: "var(--nx-sp-tight)", paddingBottom: "var(--nx-sp-band)" }} aria-label="Peptide details">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_360px]" style={{ gap: "clamp(1.8rem,4vw,3.2rem)", alignItems: "start" }}>

          {/* LEFT */}
          <div>
            {/* ── 3 · What to expect ── */}
            <h2 className="nx-dsh3">What to expect</h2>
            <div style={{ marginTop: "1rem" }}><ExpectTimeline slug={solo.slug} /></div>
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

            {/* The evidence: what the studies found, stated as results, kept
                because it teaches (Chiya 2026-09-04: we teach what it is good for). */}
            <EvidenceStrip slug={solo.slug} name={solo.name} />

            {/* ── 4 · Blood testing for this medicine, from data/monitoring.ts ── */}
            <section style={{ marginTop: "clamp(2rem,4vw,2.8rem)" }} aria-labelledby="solo-blood-title" data-testid="solo-blood">
              <h2 id="solo-blood-title" className="nx-dsh3">
                Blood testing for this medicine
              </h2>
              {monitoring && (
                <p className="nx-lede" style={{ marginTop: "0.9rem" }}>{monitoring.why}</p>
              )}
              {monitoring && (
                <div className="nx-glass-tile" style={{ display: "block", marginTop: "1rem" }}>
                  <p style={{ fontFamily: F, fontSize: "var(--nx-t-xs)", fontWeight: 600, letterSpacing: "var(--nx-ls-caps)", textTransform: "uppercase", color: "var(--nx-fg-muted)" }}>What your physician reads first</p>
                  <p style={{ fontFamily: F, fontSize: "var(--nx-t-base)", lineHeight: 1.55, color: "var(--nx-fg)", marginTop: "0.4rem" }}>{monitoring.watch.join(" · ")}</p>
                  {monitoring.doseMarker && <p style={{ fontFamily: F, fontSize: "var(--nx-t-xs)", color: "var(--nx-fg-graphite)", marginTop: "0.4rem" }}>Your dose is set against your {monitoring.doseMarker}.</p>}
                </div>
              )}
              <AddonsFor keys={[solo.slug]} testId={`addons-${solo.slug}`} />
              <Link href="/how-it-works" className="nx-text-link" style={{ fontFamily: F, fontSize: "var(--nx-t-sm)", fontWeight: 600, marginTop: "0.8rem" }}>
                Every marker, and the additional tests
              </Link>
            </section>

            {/* ── 5 · Who should not take it ── */}
            <section style={{ marginTop: "clamp(2rem,4vw,2.8rem)" }} aria-labelledby="solo-contra-title">
              <h2 id="solo-contra-title" className="nx-dsh3">Who should not take it</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2" style={{ gap: 10, marginTop: "1rem", maxWidth: 760 }}>
                {solo.contraindications.map((c) => (
                  <div key={c} className="nx-glass-tile" style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <X size={17} strokeWidth={2.4} aria-hidden="true" style={{ color: "var(--nx-cobalt)", flexShrink: 0 }} />
                    <p style={{ fontFamily: F, fontSize: "var(--nx-t-base)", lineHeight: 1.5, color: "var(--nx-fg-graphite)" }}>{c}</p>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: "1rem" }}><Disclaimer /></div>
            </section>

            {/* ── 6 · Regulatory status (verbatim block; the parties are named once, in 7) ── */}
            <div style={{ marginTop: "clamp(2rem,4vw,2.8rem)" }}>
              <RegulatoryDisclosure sku={solo} showParties={false} testid="solo-regulatory" />
            </div>

            {/* ── 7 · Who prescribes it, and who makes it (compliance.ts, verbatim) ── */}
            <section style={{ marginTop: "clamp(2rem,4vw,2.8rem)" }} aria-labelledby="solo-parties-title" data-testid="solo-parties">
              <h2 id="solo-parties-title" className="nx-dsh3">Who prescribes it, and who makes it</h2>
              <div style={{ marginTop: "1rem" }}>
                <p style={{ fontFamily: F, fontSize: "var(--nx-t-xs)", fontWeight: 600, letterSpacing: "var(--nx-ls-caps)", textTransform: "uppercase", color: "var(--nx-fg-muted)" }}>Clinical care</p>
                <p style={{ fontFamily: F, fontSize: "var(--nx-t-base)", lineHeight: 1.55, color: "var(--nx-fg-graphite)", marginTop: "0.35rem" }}>{PROVIDER_INFO.body}</p>
              </div>
              <div style={{ marginTop: "1rem" }}>
                <p style={{ fontFamily: F, fontSize: "var(--nx-t-xs)", fontWeight: 600, letterSpacing: "var(--nx-ls-caps)", textTransform: "uppercase", color: "var(--nx-fg-muted)" }}>Dispensing pharmacy</p>
                <p style={{ fontFamily: F, fontSize: "var(--nx-t-base)", lineHeight: 1.55, color: "var(--nx-fg-graphite)", marginTop: "0.35rem" }}>{PHARMACY_INFO.body.replace(/\n+/g, " ")}</p>
              </div>
            </section>

            {/* ── 8 · Common questions ── */}
            <PdpFaq items={faq} />
          </div>

          {/* ── 2 · RIGHT · the buy box ── */}
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
              availability={statusOf(solo)}
              consultPriced={!solo.gated && !solo.pricing}
              fromPrice={!solo.gated && !solo.pricing ? getPrice(solo.slug)?.monthlyPrice : undefined}
              ctaTestId="solo-cta"
            />
            </div>
          </aside>
        </div>
      </section>

      {/* ══ 9 · Other medicines ══ */}
      {related.length > 0 && (
        <section className="nx-container" style={{ paddingTop: "var(--nx-sp-band)", paddingBottom: "0" }} aria-labelledby="solo-crosssell-title">
          <h2 id="solo-crosssell-title" className="nx-dsh3">
            Other medicines
          </h2>
          <p className="nx-lede" style={{ marginTop: "0.5rem" }}>
            Each comes with the same physician review and the same blood testing.
          </p>
          <Reveal><div className="grid grid-cols-1 sm:grid-cols-3" style={{ gap: 14, marginTop: "1.4rem" }}>
            {related.map((r, i) => <ProductTile key={r.slug} sku={r} index={i} base={base} testId={`solo-related-${r.slug}`} />)}
          </div></Reveal>
        </section>
      )}

      {/* ══ 10 · Closer ══ */}
      <section className="nx-container" style={{ paddingTop: "var(--nx-sp-band)", paddingBottom: "4.5rem", textAlign: "center" }} aria-labelledby="solo-close-title">
        <h2 id="solo-close-title" className="nx-dsh2" style={{ maxWidth: "22ch", margin: "0 auto" }}>The next step is a physician.</h2>
        <p className="nx-lede" style={{ maxWidth: "52ch", margin: "0.9rem auto 0" }}>A few health questions, read by a licensed U.S. physician, who decides whether this medicine is right for you.</p>
        <a href="#buy" className="nx-cta-cobalt" style={{ marginTop: "1.6rem" }}>See the plan and price</a>
      </section>
    </SiteLayout>
  );
}
