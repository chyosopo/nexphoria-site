/**
 * /women/peptides/:slug and /men/peptides/:slug
 * Same compound, different gender context and outcome copy.
 */
import { Link } from "wouter";
import { ArrowLeft, Clock, Syringe, Calendar } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from "recharts";
import { SiteLayout } from "@/components/SiteLayout";
import { FinalCTAStrip } from "@/components/FinalCTAStrip";
import { Reveal } from "@/components/Reveal";
import { StartIntakeButton } from "@/components/StartIntakeButton";
import { peptides, CATEGORY_LABELS } from "@/data/peptides";
import { getPrice, formatUSD } from "@/data/pricing";
import { AddToCartButton } from "@/components/AddToCartButton";
import { CadenceSelector } from "@/components/CadenceSelector";
import { useSeo } from "@/lib/seo";

interface GenderPeptideDetailProps {
  gender: "women" | "men";
  slug: string;
}

export default function GenderPeptideDetail({ gender, slug }: GenderPeptideDetailProps) {
  const peptide = peptides.find((p) => p.slug === slug);
  useSeo({
    title: peptide ? `${peptide.name} | Nexphoria` : "Peptide Protocol | Nexphoria",
    description: peptide
      ? `${peptide.name} (${peptide.fullName}): ${peptide.summary}`
      : "Compounded peptide protocol supervised by U.S. board-certified physicians.",
    path: `/${gender}/peptides/${slug}`,
  });
  if (!peptide) {
    return (
      <SiteLayout navVariant={gender} footerVariant={gender}>
        <div className="nx-container py-32 text-center">
          <p className="nx-eyebrow mb-4">404</p>
          <h1 className="nx-heading mb-4">Peptide not found.</h1>
          <Link href={`/${gender}/peptides`} className="nx-cta-cobalt">
            ← Back to catalog
          </Link>
        </div>
      </SiteLayout>
    );
  }

  const genderContext =
    gender === "women"
      ? {
          contextLabel: "Women's outcomes",
          contextNote:
            "This protocol is prescribed in a female-specific dose range, accounting for hormonal variation across cycle phases. Your physician reviews your labs before prescribing.",
        }
      : {
          contextLabel: "Men's outcomes",
          contextNote:
            "This protocol is prescribed in a male-optimized dose range, calibrated to testosterone baseline and IGF-1 status from your blood panel.",
        };

  // Simple demo chart data
  const timelineData = peptide.timeline.map((t, i) => ({
    week: t.week,
    score: 40 + i * 8,
  }));

  return (
    <SiteLayout navVariant={gender} footerVariant={gender}>
      {/* Breadcrumb */}
      <div
        className="border-b py-3"
        style={{ borderColor: "var(--nx-border)", backgroundColor: "var(--nx-bg-cream)" }}
      >
        <div className="nx-container flex items-center gap-2">
          <Link href={`/${gender}/peptides`} className="flex items-center gap-1 no-underline" style={{ fontFamily: "'General Sans', system-ui, sans-serif", fontSize: "13px", color: "var(--nx-fg-graphite)" }}>
            <ArrowLeft size={14} />
            {gender === "women" ? "Women's peptides" : "Men's peptides"}
          </Link>
          <span style={{ color: "var(--nx-border)", fontSize: "13px" }}>/</span>
          <span style={{ fontFamily: "'General Sans', system-ui, sans-serif", fontSize: "13px", color: "var(--nx-fg)" }}>{peptide.name}</span>
        </div>
      </div>

      {/* Hero */}
      <section className="nx-section" data-testid="peptide-detail-hero">
        <div className="nx-container">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-12">
            {/* Left 3/5 */}
            <div className="md:col-span-3">
              <Reveal>
                <p className="nx-eyebrow mb-3">{CATEGORY_LABELS[peptide.category]}</p>
                <h1
                  style={{
                    fontFamily: "'General Sans', system-ui, sans-serif",
                    fontWeight: 500,
                    fontSize: "clamp(2.5rem, 5vw, 4rem)",
                    color: "var(--nx-fg)",
                    lineHeight: 1.1,
                    marginBottom: "0.75rem",
                  }}
                >
                  {peptide.name}
                </h1>
                <p style={{ fontFamily: "'General Sans', system-ui, sans-serif",  fontSize: "1.25rem", color: "var(--nx-fg-graphite)", marginBottom: "1.5rem" }}>
                  {peptide.tagline}
                </p>
                <p className="nx-body mb-8">{peptide.summary}</p>

                {/* Gender context box */}
                <div
                  className="p-4 rounded-xl mb-8"
                  style={{ backgroundColor: "var(--nx-cobalt-soft)", border: "1px solid #D6D2C4" }}
                >
                  <p style={{ fontFamily: "'General Sans', system-ui, sans-serif", fontSize: "10px", fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--nx-cobalt)", marginBottom: "6px" }}>
                    {genderContext.contextLabel}
                  </p>
                  <p style={{ fontFamily: "'General Sans', system-ui, sans-serif", fontSize: "14px", color: "var(--nx-fg-graphite)", lineHeight: 1.6 }}>
                    {genderContext.contextNote}
                  </p>
                </div>

                {/* Price block */}
                {(() => {
                  const p = getPrice(slug);
                  if (!p) return null;
                  return (
                    <div
                      className="flex items-end justify-between p-5 mb-6"
                      style={{ background: "#fff", border: "1px solid var(--nx-border)" }}
                      data-testid={`pdp-price-block-${slug}`}
                    >
                      <div>
                        <div
                          style={{
                            fontFamily: "'General Sans', system-ui, sans-serif",
                            fontSize: "10px",
                            letterSpacing: "0.18em",
                            textTransform: "uppercase",
                            color: "var(--nx-fg-muted)",
                            marginBottom: 4,
                          }}
                        >
                          Monthly · vial
                        </div>
                        <div className="flex items-baseline gap-2">
                          <span
                            style={{
                              fontFamily: "'General Sans', system-ui, sans-serif",
                              fontSize: "2rem",
                              fontWeight: 500,
                              color: "var(--nx-fg)",
                            }}
                            data-testid={`pdp-price-${slug}`}
                          >
                            {formatUSD(p.monthlyPrice)}
                          </span>
                          {p.badge && (
                            <span
                              style={{
                                fontFamily: "'General Sans', system-ui, sans-serif",
                                fontSize: "9px",
                                letterSpacing: "0.16em",
                                textTransform: "uppercase",
                                color: "#8B5A2B",
                              }}
                            >
                              · {p.badge}
                            </span>
                          )}
                        </div>
                        <div
                          style={{
                            fontFamily: "'General Sans', system-ui, sans-serif",
                            fontSize: "12px",
                            color: "var(--nx-fg-graphite)",
                            marginTop: 4,
                          }}
                        >
                          {p.vialSpec} — {p.vialDuration}
                        </div>
                      </div>
                    </div>
                  );
                })()}

                {/* Cadence selector with built-in Add-to-Cart */}
                <CadenceSelector slug={slug} type="peptide" productName={peptide.name} />

                <div className="flex flex-wrap gap-3 mt-4">
                  <StartIntakeButton productSlug={slug} source={`${gender}-peptide-detail`} size="lg">
                    Start intake →
                  </StartIntakeButton>
                </div>
              </Reveal>
            </div>

            {/* Right 2/5 — meta + chart */}
            <div className="md:col-span-2">
              <Reveal delay={150}>
                {/* Protocol meta */}
                <div className="nx-chart-card mb-4">
                  <p className="nx-eyebrow mb-4">PROTOCOL OVERVIEW</p>
                  <div className="flex flex-col gap-4">
                    {[
                      { icon: Clock, label: "HALF-LIFE", value: peptide.halfLife },
                      { icon: Syringe, label: "TYPICAL DOSE", value: peptide.typicalDose },
                      { icon: Calendar, label: "CYCLE LENGTH", value: peptide.cycleLength },
                      { icon: Syringe, label: "ADMINISTRATION", value: peptide.administration },
                    ].map(({ icon: Icon, label, value }) => (
                      <div key={label} className="flex items-start gap-3">
                        <Icon size={16} style={{ color: "var(--nx-cobalt)", marginTop: "2px", flexShrink: 0 }} />
                        <div>
                          <p style={{ fontFamily: "'General Sans', system-ui, sans-serif", fontSize: "9px", fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--nx-fg-muted)" }}>{label}</p>
                          <p style={{ fontFamily: "'General Sans', system-ui, sans-serif", fontSize: "14px", fontWeight: 500, color: "var(--nx-fg)" }}>{value}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Outcome chart */}
                {timelineData.length > 0 && (
                  <div className="nx-chart-card">
                    <p className="nx-eyebrow mb-3">OUTCOME TIMELINE</p>
                    <div style={{ height: 150 }}>
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={timelineData} margin={{ top: 4, right: 4, bottom: 0, left: -28 }}>
                          <defs>
                            <linearGradient id="detailGrad" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#0A0A0A" stopOpacity={0.12} />
                              <stop offset="95%" stopColor="#0A0A0A" stopOpacity={0} />
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" stroke="#E5E5E2" vertical={false} />
                          <XAxis dataKey="week" tick={{ fontSize: 9, fill: "#8A8A8A", fontFamily: "'General Sans', system-ui, sans-serif" }} axisLine={false} tickLine={false} />
                          <YAxis tick={{ fontSize: 9, fill: "#8A8A8A", fontFamily: "'General Sans', system-ui, sans-serif" }} axisLine={false} tickLine={false} />
                          <Area type="monotone" dataKey="score" stroke="#0A0A0A" strokeWidth={2} fill="url(#detailGrad)" dot={false} />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                )}
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Mechanism */}
      <section className="nx-section" style={{ backgroundColor: "var(--nx-bg-cream)" }} data-testid="peptide-mechanism">
        <div className="nx-container max-w-3xl">
          <Reveal>
            <p className="nx-eyebrow mb-3">MECHANISM OF ACTION</p>
            <h2 className="nx-heading mb-4">How {peptide.name} works.</h2>
            <p className="nx-body">{peptide.mechanism}</p>
          </Reveal>
        </div>
      </section>

      {/* Timeline */}
      {peptide.timeline.length > 0 && (
        <section className="nx-section" data-testid="peptide-timeline">
          <div className="nx-container max-w-3xl">
            <Reveal>
              <p className="nx-eyebrow mb-3">WHAT TO EXPECT</p>
              <h2 className="nx-heading mb-8">Week-by-week timeline.</h2>
            </Reveal>
            <div className="flex flex-col gap-0">
              {peptide.timeline.map((entry, i) => (
                <Reveal key={i} delay={i * 60}>
                  <div
                    className="flex gap-6 py-5"
                    style={{ borderBottom: i < peptide.timeline.length - 1 ? "1px solid var(--nx-border)" : "none" }}
                  >
                    <div style={{ flexShrink: 0, width: "60px" }}>
                      <p style={{ fontFamily: "'General Sans', system-ui, sans-serif", fontSize: "10px", fontWeight: 500, letterSpacing: "0.1em", color: "var(--nx-cobalt)", textTransform: "uppercase" }}>
                        {entry.week}
                      </p>
                    </div>
                    <p style={{ fontFamily: "'General Sans', system-ui, sans-serif", fontSize: "15px", color: "var(--nx-fg-graphite)", lineHeight: 1.6 }}>
                      {entry.effect}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Studies */}
      {peptide.studies.length > 0 && (
        <section className="nx-section" style={{ backgroundColor: "var(--nx-bg-cream)" }} data-testid="peptide-studies">
          <div className="nx-container max-w-3xl">
            <Reveal>
              <p className="nx-eyebrow mb-3">RESEARCH</p>
              <h2 className="nx-heading mb-6">Clinical evidence.</h2>
            </Reveal>
            <div className="flex flex-col gap-3">
              {peptide.studies.map((study, i) => (
                <Reveal key={i} delay={i * 50}>
                  <a
                    href={study.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block p-4 rounded-xl no-underline transition-all hover:shadow-sm"
                    style={{ border: "1px solid var(--nx-border)", backgroundColor: "#FFFFFF" }}
                    data-testid={`study-link-${i}`}
                  >
                    <p style={{ fontFamily: "'General Sans', system-ui, sans-serif", fontSize: "14px", fontWeight: 500, color: "var(--nx-fg)", marginBottom: "4px", lineHeight: 1.4 }}>{study.title}</p>
                    <div className="flex gap-3">
                      <span style={{ fontFamily: "'General Sans', system-ui, sans-serif", fontSize: "10px", letterSpacing: "0.08em", color: "var(--nx-cobalt)" }}>{study.source}</span>
                      <span style={{ fontFamily: "'General Sans', system-ui, sans-serif", fontSize: "10px", letterSpacing: "0.08em", color: "var(--nx-fg-muted)" }}>{study.year}</span>
                    </div>
                  </a>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Pairs with */}
      {peptide.pairsWith.length > 0 && (
        <section className="nx-section" data-testid="peptide-pairs-with">
          <div className="nx-container">
            <Reveal>
              <p className="nx-eyebrow mb-3">PAIRS WITH</p>
              <h2 className="nx-heading mb-6">Stack it with.</h2>
            </Reveal>
            <div className="flex flex-wrap gap-3">
              {peptide.pairsWith.map((pairSlug) => {
                const paired = peptides.find((p) => p.slug === pairSlug);
                if (!paired) return null;
                return (
                  <Link
                    key={pairSlug}
                    href={`/${gender}/peptides/${pairSlug}`}
                    className="px-4 py-2.5 rounded-full no-underline transition-all hover:shadow-sm"
                    style={{ border: "1px solid var(--nx-border)", fontFamily: "'General Sans', system-ui, sans-serif", fontSize: "14px", fontWeight: 500, color: "var(--nx-fg)", backgroundColor: "#fff" }}
                    data-testid={`pair-link-${pairSlug}`}
                  >
                    {paired.name} →
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Disclaimer */}
      <div className="nx-container pb-8">
        <p
          style={{
            fontFamily: "'General Sans', system-ui, sans-serif",
            fontSize: "12px",
            color: "var(--nx-fg-muted)",
            lineHeight: 1.6,
            maxWidth: "640px",
          }}
        >
          <strong>Disclaimer:</strong> This information is for educational purposes only.
          {peptide.name} is prescribed off-label by licensed US physicians and compounded by FDA-registered
          503A pharmacies. It has not been evaluated by the FDA for all indications listed.
          Individual results vary. Consult your Nexphoria physician.
        </p>
      </div>

      <FinalCTAStrip gender={gender} />
    </SiteLayout>
  );
}
