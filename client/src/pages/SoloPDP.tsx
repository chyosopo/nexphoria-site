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
import { PdpFaq, buildPdpFaq } from "@/components/PdpFaq";
import { Disclaimer } from "@/components/Disclaimer";
import { RegulatoryDisclosure } from "@/components/RegulatoryDisclosure";
import { VialPanel, labelSpec } from "@/components/VialMockup";
import { SkuPhoto } from "@/components/SkuPhoto";
import { PDP_TILE } from "@/lib/studioTiles";
import { GOAL_SHOUT, CATEGORY_TO_GOAL } from "@/data/goalTeaching";
import { FeaturedProtocol } from "@/components/FeaturedProtocol";
import { BenefitStrip } from "@/components/BenefitStrip";
import { ExpectCard } from "@/components/ExpectCard";
import { ProductTile } from "@/components/ProductTile";
import { AddonsFor } from "@/components/AddonsFor";
import { ExpectTimeline } from "@/components/ExpectTimeline";
import { EvidenceStrip } from "@/components/EvidenceStrip";
import { StatusPill } from "@/components/StatusPill";
import { soloTiers } from "@/lib/tiers";
import { statusOf, regulatoryOf } from "@/data/soloCatalog";
import { monitoringFor, RETEST_WEEK } from "@/data/monitoring";
import { InsideTheVial } from "@/components/InsideTheVial";
import { Ritual } from "@/components/Ritual";
import { CareCards } from "@/components/CareCards";
import { Pathway } from "@/components/Pathway";
import { Milestones } from "@/components/Milestones";
import { forWhom } from "@/data/forWhom";

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
  /* marker names mid-sentence: lower-case the plain words, keep acronyms (HbA1c, IGF-1, hs-CRP). */
  const lc = (m: string) => (/^[A-Z][a-z]/.test(m) ? m.charAt(0).toLowerCase() + m.slice(1) : m);

  return (
    <SiteLayout>
      {/* ══ 1 · HERO: the product beside what it is, what it is for and how it works ══ */}
      <section className="nx-tilehero" aria-labelledby="solo-hero-title">
        <div className="nx-container" style={{ paddingTop: "1.4rem", paddingBottom: "var(--nx-sp-tight)" }}>
          <Link href={`${base}/peptides`} className="nx-text-link" style={{ gap: 6, fontFamily: F, fontSize: "var(--nx-t-sm)", fontWeight: 600 }}>
            <ArrowLeft size={15} aria-hidden="true" /> All peptides
          </Link>
          <div className="grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr]" style={{ gap: "clamp(1.6rem,4vw,3.2rem)", alignItems: "center", marginTop: "1rem" }}>
            {/* LEFT: the product, on its goal-toned panel */}
            <div className="nx-tile nx-tile--pdp" style={{ order: 0 }}>
              {PDP_TILE[solo.slug]
                ? <img src={PDP_TILE[solo.slug].src} srcSet={`${PDP_TILE[solo.slug].src600} 600w, ${PDP_TILE[solo.slug].src} 1200w`} sizes="(max-width: 1024px) 100vw, 42vw" alt={`${solo.name}, as dispensed`} width={1200} height={1500} fetchPriority="high" decoding="async" data-testid={`solo-vial-${solo.slug}`} />
                : <SkuPhoto slug={solo.slug} name={solo.name} eager className="nx-sku-img nx-sku-img--pdp" testId={`solo-vial-${solo.slug}`} fallback={<VialPanel name={solo.name} dose={labelSpec(solo.spec)} size="80%" testId={`solo-vial-${solo.slug}`} />} />}
              <span className="nx-chips nx-chips--tile" aria-hidden="true"><span className="nx-chip nx-chip--accent" style={{ fontFamily: F }}>{GOAL_LABEL[solo.category]}</span><span className="nx-chip" style={{ fontFamily: F }}>Rx</span></span>
              <span className="sr-only" data-testid={`solo-posture-${solo.slug}`}>{solo.gated ? "Physician-assessed" : "Prescription only"}</span>
              <span className="nx-tile__pill nx-tile__pill--right"><StatusPill status={statusOf(solo)} testId={`solo-status-${solo.slug}`} /></span>
            </div>

            {/* RIGHT: name, category, tile line, mechanism, the benefit layer, the expectations */}
            <div>
              <p className="nx-shout nx-pdp-shout" style={{ fontFamily: S }}>{GOAL_SHOUT[CATEGORY_TO_GOAL[solo.category]]}</p>
              <h1 id="solo-hero-title" style={{ fontFamily: S, fontWeight: 500, fontSize: "var(--nx-t-h1)", lineHeight: 1.05, letterSpacing: "var(--nx-ls-tight)", color: "var(--nx-fg)", marginTop: "0.5rem", maxWidth: "18ch" }}>{solo.name}</h1>
              <p style={{ fontFamily: S, fontWeight: 500, fontSize: "var(--nx-t-xl)", color: "var(--nx-cobalt)", marginTop: "0.6rem", maxWidth: "40ch" }}>
                {solo.outcome}
              </p>
              <p style={{ fontFamily: F, fontSize: "var(--nx-t-body)", lineHeight: 1.62, color: "var(--nx-fg-graphite)", maxWidth: "52ch", marginTop: "1rem" }}>
                {solo.mechanism}
              </p>
              <div style={{ marginTop: "1.2rem", maxWidth: 560 }}><BenefitStrip slug={solo.slug} testId={`benefit-${solo.slug}`} /></div>
              <div style={{ marginTop: "1rem", maxWidth: 560 }}><ExpectCard sku={solo} base={base} /></div>

              <div style={{ display: "flex", alignItems: "center", gap: "0.8rem", flexWrap: "wrap", marginTop: "1.5rem" }}>
                <a
                  href="#buy"
                  className="nx-cta-cobalt"
                  data-testid="solo-hero-cta"
                  style={{ fontFamily: F, fontWeight: 600, fontSize: "var(--nx-t-base)" }}
                >
                  Choose a plan
                </a>
                <Link href="/peptides" className="nx-text-link" style={{ fontFamily: F, fontSize: "var(--nx-t-sm)", fontWeight: 600 }}>
                  Shop all medicines
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
            {/* ── 2 · What you get, exactly: inside the vial · the ritual · what arrives.
                (Happy Head study, 2026-09-05: explain it in detail and visualize it.) ── */}
            {/* ── About: what it is for, who it suits, how it works, the measure ── */}
            <section aria-labelledby="solo-about-title" data-testid="solo-about">
              <h2 id="solo-about-title" className="nx-dsh3 nx-shout">What it does.</h2>
              {forWhom(solo.slug) && (
                <p className="nx-lede" style={{ marginTop: "0.8rem" }}>
                  {solo.name} suits {forWhom(solo.slug)!.charAt(0).toLowerCase()}{forWhom(solo.slug)!.slice(1)}{" "}
                  <a href="#solo-contra-title" className="nx-text-link" style={{ fontWeight: 600, whiteSpace: "nowrap" }}>Who should not take it</a>
                </p>
              )}
              <Pathway slug={solo.slug} />
            </section>

            {/* ── The medicine: as dispensed, and how it is taken ── */}
            <section aria-labelledby="solo-get-title" data-testid="solo-get" style={{ marginTop: "clamp(2rem,4vw,2.8rem)" }}>
              <h2 id="solo-get-title" className="nx-dsh3 nx-shout">What arrives.</h2>
              <div style={{ marginTop: "1rem" }}><InsideTheVial sku={solo} /></div>
              <Ritual sku={solo} />
            </section>

            {/* ── The first twelve weeks ── */}
            <section aria-labelledby="solo-expect-title" style={{ marginTop: "clamp(2rem,4vw,2.8rem)" }}>
              <h2 id="solo-expect-title" className="nx-dsh3 nx-shout">The first twelve weeks.</h2>
              <div style={{ marginTop: "1rem" }}><ExpectTimeline slug={solo.slug} /></div>
              <Milestones sku={solo} />
            </section>

            {/* ── The evidence ── */}
            <EvidenceStrip slug={solo.slug} name={solo.name} />

            {/* ── Monitoring: the panel, and what is read for this medicine ── */}
            <section style={{ marginTop: "clamp(2rem,4vw,2.8rem)" }} aria-labelledby="solo-blood-title" data-testid="solo-blood">
              <h2 id="solo-blood-title" className="nx-dsh3 nx-shout">The blood.</h2>
              <p className="nx-lede" style={{ marginTop: "0.8rem" }}>
                The panel is drawn at home before the first dose and repeated at week {RETEST_WEEK}.
                {monitoring && (monitoring.doseMarker
                  ? ` For ${solo.name}, ${monitoring.doseMarker} sets the dose${monitoring.watch.filter((w) => w !== monitoring.doseMarker).length ? `; ${monitoring.watch.filter((w) => w !== monitoring.doseMarker).map(lc).join(", ")} are read alongside it` : ""}.`
                  : ` For ${solo.name}, ${monitoring.watch.map(lc).join(", ")} are read.`)}
              </p>
              <AddonsFor keys={[solo.slug]} testId={`addons-${solo.slug}`} />
              <Link href="/how-it-works" className="nx-text-link" style={{ fontFamily: F, fontSize: "var(--nx-t-sm)", fontWeight: 600, marginTop: "0.8rem" }}>
                Every marker, and the additional tests
              </Link>
            </section>

            {/* ── 5 · Who should not take it ── */}
            <section style={{ marginTop: "clamp(2rem,4vw,2.8rem)" }} aria-labelledby="solo-contra-title">
              <h2 id="solo-contra-title" className="nx-dsh3 nx-shout" style={{ scrollMarginTop: "96px" }}>Who should not take it.</h2>
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
              <h2 id="solo-parties-title" className="nx-dsh3 nx-shout">Who prescribes. Who makes it.</h2>
              <CareCards slug={solo.slug} />
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

      {/* ══ 8b · The protocol this medicine is prescribed in, as the wide tile ══ */}
      {parentStack && <FeaturedProtocol slug={parentStack.slug} />}

      {/* ══ 9 · Other medicines ══ */}
      {related.length > 0 && (
        <section className="nx-container" style={{ paddingTop: "var(--nx-sp-band)", paddingBottom: "0" }} aria-labelledby="solo-crosssell-title">
          <h2 id="solo-crosssell-title" className="nx-dsh3 nx-shout">
            More medicines.
          </h2>
          <p className="nx-lede" style={{ marginTop: "0.5rem" }}>
            Each comes with the same physician review and the same blood testing.
          </p>
          <Reveal><div className="grid grid-cols-1 sm:grid-cols-3" style={{ gap: 14, marginTop: "1.4rem" }}>
            {related.map((r, i) => <ProductTile key={r.slug} sku={r} index={i} base={base} testId={`solo-related-${r.slug}`} />)}
          </div></Reveal>
        </section>
      )}

      {/* ══ 10 · Closer, as one tile ══ */}
      <section className="nx-container" style={{ paddingTop: "var(--nx-sp-band)", paddingBottom: "var(--nx-sp-sec)" }} aria-labelledby="solo-close-title">
        <div className="nx-closer-tile">
          <div>
            <h2 id="solo-close-title" className="nx-shout" style={{ fontFamily: S, fontSize: "var(--nx-t-h2)", color: "var(--nx-ceramic)", maxWidth: "16ch", margin: 0, textWrap: "balance" }}>Prescribed, if appropriate.</h2>
            <p style={{ fontFamily: F, fontSize: "var(--nx-t-base)", lineHeight: 1.6, color: "color-mix(in srgb, var(--nx-ceramic) 78%, transparent)", maxWidth: "46ch", marginTop: ".8rem" }}>The order is placed, the health questions answered, and a licensed physician decides. If not prescribed, nothing is made.</p>
            <a href="#buy" className="nx-cta-ceramic" style={{ fontFamily: F, fontWeight: 600, fontSize: "var(--nx-t-base)", marginTop: "1.6rem" }}>See the plan and price</a>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
