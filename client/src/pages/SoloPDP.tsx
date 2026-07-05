/* ═══ SOLO PDP — P5 data · D12 layout, D-POLISH visual pass ═══
   Gradient hero with an outcome frame + sticky buy-box (lg+); mobile in-flow
   card + persistent price bar. "Why this peptide" pillars, a drawn expectation
   timeline, a gradient-edged bloodwork card, and a dramatic contraindication
   band. Three commerce states: tiers / GLP-1 wall / consult-priced. */
import { useState } from "react";
import { Link } from "wouter";
import { SiteLayout } from "@/components/SiteLayout";
import { Reveal } from "@/components/Reveal";
import { BuyBox, BuyTier } from "@/components/BuyBox";
import { useSeo, webPageJsonLd, breadcrumbJsonLd, faqJsonLd, drugJsonLd, productJsonLd } from "@/lib/seo";
import { getSolo, SOLO_CATALOG, SoloCategory } from "@/data/soloCatalog";
import { ArrowLeft, Check, X, Stethoscope, Microscope, RefreshCw, FlaskConical, Snowflake, LayoutDashboard } from "lucide-react";
import { F, S } from "@/lib/typography";
import { PdpFaq, buildPdpFaq } from "@/components/PdpFaq";
import { Disclaimer } from "@/components/Disclaimer";
import { SafetyDisclosure } from "@/components/SafetyDisclosure";
import { PhysicianProofBand } from "@/components/PhysicianProofBand";
import { OUTCOME_CATEGORY, OUTCOME_HERO } from "@/data/outcomeImagery";
import { getPeptideHeroImage } from "@/lib/peptideImages";
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
  const solo = getSolo(slug);
  const [tier, setTier] = useState<string>("m3");
  const faq = solo
    ? buildPdpFaq({ name: solo.name, panel: solo.panel, gated: solo.gated, gatedStates: solo.stateExclusions, hasPricing: !!solo.pricing, firstMark: solo.timeline[0] })
    : [];

  useSeo({
    title: solo ? `${solo.name} — ${solo.category} | Nexphoria` : "Peptide — Nexphoria",
    description: solo ? `${solo.name}: ${solo.dose}. Physician-prescribed, ${solo.panel}-panel gated, retested. Educational — not medical advice.` : "",
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
      <SiteLayout variant={world ?? "showcase"}>
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
    OUTCOME_CATEGORY[world ?? "men"][SOLO_OUTCOME[solo.category]] ?? OUTCOME_HERO[world ?? "men"];
  const heroImg = getPeptideHeroImage(solo.slug) ?? categoryImg;

  /* Same-category companions first, then fill from the wider formulary. */
  const related = SOLO_CATALOG
    .filter((s) => s.slug !== solo.slug)
    .sort((a, b) => Number(b.category === solo.category) - Number(a.category === solo.category))
    .slice(0, 3);

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

  return (
    <SiteLayout>
      {/* ══ HERO — claim beside an outcome frame, over a gradient field ══ */}
      <section className="nx-gradient-hero relative" style={{ overflow: "hidden" }}>
        <div className="nx-aurora" aria-hidden><i /><i /><i /></div>
        <div className="nx-container relative nx-hero-seq" style={{ paddingTop: "clamp(2.6rem,5vw,3.8rem)", paddingBottom: "clamp(1.6rem,3vw,2.4rem)", zIndex: 1 }}>
          <Link href={`${base}/peptides`} className="nx-text-link" style={{ gap: 6, fontFamily: F, fontSize: "var(--nx-t-sm)", fontWeight: 600 }}>
            <ArrowLeft size={15} aria-hidden="true" /> All peptides
          </Link>
          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr]" style={{ gap: "clamp(1.6rem,4vw,3rem)", alignItems: "center", marginTop: "1rem" }}>
            <div>
              <p style={{ fontFamily: F, fontSize: "var(--nx-t-xs)", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--nx-cobalt)" }}>{solo.category}</p>
              <h1 style={{ fontFamily: S, fontWeight: 500, fontSize: "clamp(40px,6vw,72px)", lineHeight: 1.02, letterSpacing: "-0.02em", color: "var(--nx-fg)", marginTop: "0.4rem" }}>{solo.name}</h1>
              <p style={{ fontFamily: F, fontSize: "var(--nx-t-body)", lineHeight: 1.62, color: "var(--nx-fg-graphite)", maxWidth: "52ch", marginTop: "1rem" }}>{solo.mechanism}</p>
              <div className="grid sm:grid-cols-2" style={{ gap: 10, maxWidth: 520, marginTop: "1.4rem" }}>
                <div className="nx-stat-card" style={{ gap: 4 }}>
                  <span style={{ fontFamily: F, fontSize: "var(--nx-t-xs)", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--nx-fg-muted)" }}>Dose</span>
                  <span style={{ fontFamily: S, fontWeight: 500, fontSize: "var(--nx-t-lg)", color: "var(--nx-fg)" }}>{solo.dose}</span>
                </div>
                <div className="nx-stat-card" style={{ gap: 4 }}>
                  <span style={{ fontFamily: F, fontSize: "var(--nx-t-xs)", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--nx-fg-muted)" }}>Format</span>
                  <span style={{ fontFamily: S, fontWeight: 500, fontSize: "var(--nx-t-lg)", color: "var(--nx-fg)" }}>{solo.spec}</span>
                </div>
              </div>
            </div>
            {/* square frame FILLS the column (the 4:5 + maxHeight cap left it
                floating ~100px narrower than its track) */}
            <div className="nx-hero-frame" style={{ position: "relative", borderRadius: "var(--nx-r-lg)", overflow: "hidden", boxShadow: "var(--nx-e-4)", aspectRatio: "1 / 1", width: "100%" }}>
              <img src={heroImg} alt="" aria-hidden fetchPriority="high" width={1632} height={2048} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} data-testid={`solo-outcome-${solo.slug}`} />
              <div aria-hidden style={{ position: "absolute", inset: 0, background: "linear-gradient(160deg, transparent 55%, color-mix(in srgb, var(--nx-fg) 34%, transparent) 100%)" }} />
              <div
                style={{
                  position: "absolute", top: 14, right: 14, display: "inline-flex", alignItems: "center", gap: 8,
                  background: "color-mix(in srgb, var(--nx-fg) 55%, transparent)",
                  backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)",
                  borderRadius: "var(--nx-r-pill)", padding: "8px 14px",
                }}
              >
                <span style={{ fontFamily: F, fontSize: "var(--nx-t-xs)", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--nx-ceramic)" }}>
                  {solo.gated ? "Physician-assessed" : "Prescription only"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ BODY — content rail + sticky buy-box ══ */}
      <section className="nx-container" style={{ paddingTop: "clamp(1.2rem,2.5vw,2rem)", paddingBottom: "clamp(2rem,4vw,3rem)" }}>
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_360px]" style={{ gap: "clamp(1.8rem,4vw,3.2rem)", alignItems: "start" }}>

          {/* — LEFT — */}
          <div>
            {/* Why this peptide — the three pillars every solo answers to.
               h2 (not p) so the tile h3s below don't skip a heading level; style unchanged. */}
            <h2 style={{ fontFamily: F, fontSize: "var(--nx-t-xs)", fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--nx-fg-muted)" }}>Why this peptide, this way</h2>
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
            <h2 style={{ fontFamily: S, fontWeight: 500, fontSize: "clamp(22px,3vw,32px)", color: "var(--nx-fg)", marginTop: "clamp(2rem,4vw,2.8rem)" }}>What to expect</h2>
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
            <h2 style={{ fontFamily: S, fontWeight: 500, fontSize: "clamp(22px,3vw,30px)", color: "var(--nx-fg)", marginTop: "clamp(2rem,4vw,2.8rem)" }}>
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
                  <p style={{ fontFamily: F, fontSize: "var(--nx-t-xs)", fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--nx-cobalt)" }}>Required bloodwork</p>
                  <h3 style={{ fontFamily: S, fontWeight: 500, fontSize: "clamp(20px,2.6vw,26px)", color: "var(--nx-fg)" }}>{solo.panel} panel</h3>
                </div>
              </div>
              <p style={{ fontFamily: F, fontSize: "var(--nx-t-base)", lineHeight: 1.55, color: "var(--nx-fg-graphite)", marginTop: "0.8rem", maxWidth: "56ch" }}>{solo.panelNote ?? "Reviewed by your physician before and during the protocol."}</p>
              <Link href="/bloodwork" className="nx-text-link" style={{ fontFamily: F, fontSize: "var(--nx-t-sm)", fontWeight: 600, marginTop: "0.7rem" }}>See the panels →</Link>
            </div>

            {solo.gated && (
              <div style={{ borderRadius: "var(--nx-r-lg)", padding: "clamp(1.4rem,3vw,2rem)", background: "var(--nx-cobalt-soft)", border: "1px solid var(--nx-border)", marginTop: "clamp(1.8rem,3.5vw,2.4rem)" }}>
                <h3 style={{ fontFamily: S, fontWeight: 500, fontSize: "clamp(22px,3vw,30px)", color: "var(--nx-fg)", maxWidth: "26ch" }}>GLP-1 therapy is prescribed after review — not bought from a shelf.</h3>
                <p style={{ fontFamily: F, fontSize: "var(--nx-t-base)", lineHeight: 1.65, color: "var(--nx-fg-graphite)", maxWidth: "60ch", marginTop: "0.7rem" }}>Eligibility depends on your medical history and your state. Begin with a structured intake; if appropriate, your physician prescribes and titrates it against your bloodwork.</p>
              </div>
            )}

            <PhysicianProofBand name={solo.name} />

            <PdpFaq items={faq} />
          </div>

          {/* — RIGHT — */}
          <aside style={{ alignSelf: "stretch" }}>
            <div className="nx-buyrail">
            <BuyBox
              name={solo.name}
              category={solo.category}
              tiers={tiers}
              selected={tier}
              onSelect={setTier}
              gated={solo.gated}
              gatedStates={solo.stateExclusions}
              consultPriced={!solo.gated && !solo.pricing}
              ctaTestId="solo-cta"
            />
            <SafetyDisclosure name={solo.name} contraindications={solo.contraindications} />
            </div>
          </aside>
        </div>
      </section>

      {/* ══ IMAGERY BAND — the outcome, not the vial ══ */}
      <section className="nx-container" style={{ paddingBottom: "clamp(2rem,4vw,3rem)" }}>
        <Reveal>
          <div style={{ position: "relative", borderRadius: "var(--nx-r-lg)", overflow: "hidden", boxShadow: "var(--nx-e-3)", aspectRatio: "16 / 7" }}>
            <img src={categoryImg} alt="" aria-hidden loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "50% 28%", display: "block" }} />
            <div aria-hidden style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg, color-mix(in srgb, var(--nx-fg) 62%, transparent) 0%, transparent 60%)" }} />
            <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center" }}>
              <div style={{ padding: "clamp(1.4rem,4vw,3rem)", maxWidth: 560 }}>
                <p style={{ fontFamily: F, fontSize: "var(--nx-t-xs)", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--nx-acid)" }}>The point of the protocol</p>
                <h2 style={{ fontFamily: S, fontWeight: 500, fontSize: "clamp(24px,3.6vw,40px)", color: "var(--nx-ceramic)", lineHeight: 1.1, marginTop: "0.7rem", maxWidth: "18ch" }}>
                  We sell the measured loop — <em style={{ color: "var(--nx-acid)" }}>not the vial.</em>
                </h2>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ══ CONTRAINDICATION NIGHT BAND — dramatic ══ */}
      <section className="nx-gradient-hero-dark" style={{ padding: "clamp(3rem,6vw,4.6rem) 0", overflow: "hidden" }}>
        <div className="nx-container">
          <p style={{ display: "inline-flex", alignItems: "center", gap: 8, fontFamily: F, fontSize: "var(--nx-t-xs)", fontWeight: 600, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--nx-acid)" }}>
            <FlaskConical size={14} strokeWidth={2.2} aria-hidden="true" /> Before you begin
          </p>
          <h2 style={{ fontFamily: S, fontWeight: 500, fontSize: "clamp(28px,4.6vw,52px)", color: "var(--nx-ceramic)", maxWidth: "20ch", marginTop: "0.8rem", lineHeight: 1.06, letterSpacing: "-0.015em" }}>Not for everyone.</h2>
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

      {/* ══ CROSS-SELL — same-axis compounds, if-prescribed framing ══ */}
      {related.length > 0 && (
        <section className="nx-container" style={{ paddingTop: "clamp(2.6rem,5vw,3.6rem)", paddingBottom: "0" }}>
          <h2 style={{ fontFamily: S, fontWeight: 500, fontSize: "clamp(24px,3.4vw,34px)", color: "var(--nx-fg)" }}>
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
                    <p style={{ fontFamily: F, fontSize: "var(--nx-t-xs)", fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--nx-cobalt)" }}>{r.category}</p>
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

      <section className="nx-container" style={{ paddingTop: "clamp(2.6rem,5vw,3.4rem)", paddingBottom: "4.5rem", textAlign: "center" }}>
        <h2 style={{ fontFamily: S, fontWeight: 500, fontSize: "clamp(26px,4vw,44px)", color: "var(--nx-fg)", maxWidth: "22ch", margin: "0 auto", lineHeight: 1.1 }}>The consultation carries no charge. <em style={{ color: "var(--nx-cobalt)" }}>You pay only if prescribed.</em></h2>
        <Link href="/assessment" className="nx-cta-cobalt" style={{ marginTop: "1.6rem" }}>Begin your intake</Link>
      </section>
    </SiteLayout>
  );
}
