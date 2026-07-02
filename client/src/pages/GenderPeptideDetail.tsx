/**
 * /women/peptides/:slug and /men/peptides/:slug
 * Same compound, different gender context and outcome copy.
 * Now with Hims-tier configurator and split gender identities.
 */
import { Link } from "wouter";
import { ArrowLeft, Clock, Syringe, Calendar, ShieldCheck } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from "recharts";
import { SiteLayout } from "@/components/SiteLayout";
import { FinalCTAStrip } from "@/components/FinalCTAStrip";
import { Reveal } from "@/components/Reveal";
import { StartIntakeButton } from "@/components/StartIntakeButton";
import { HimsConfigurator } from "@/components/HimsConfigurator";
import { peptides, CATEGORY_LABELS } from "@/data/peptides";
import { pricing } from "@/data/pricing";
import { useSeo, productJsonLd, breadcrumbJsonLd } from "@/lib/seo";

interface GenderPeptideDetailProps {
  gender: "women" | "men";
  slug: string;
}

/* ── Gender-identity tokens (mirror HimsConfigurator) */
const IDENTITY = {
  men: {
    heroBg: "linear-gradient(180deg, #0A0A0A 0%, #111111 60%, #1A1815 100%)",
    heroGlow: "radial-gradient(700px 320px at 92% 10%, rgba(226,138,61,0.16), transparent 65%)",
    accent: "#E28A3D",
    accentSoft: "rgba(226,138,61,0.14)",
    text: "#F5F0E4",
    textMuted: "rgba(245,240,228,0.62)",
    textFaint: "rgba(245,240,228,0.42)",
    border: "rgba(226,138,61,0.22)",
    borderStrong: "rgba(226,138,61,0.4)",
    chipBg: "rgba(226,138,61,0.06)",
    chipBorder: "rgba(226,138,61,0.28)",
    surface: "#141311",
    surfaceCard: "#1A1815",
    display: "'General Sans', system-ui, sans-serif",
    mono: "'JetBrains Mono', ui-monospace, monospace",
    body: "'General Sans', system-ui, sans-serif",
    weight: 700,
    radius: 4,
    uppercase: "uppercase" as const,
    grid: "linear-gradient(rgba(226,138,61,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(226,138,61,0.05) 1px, transparent 1px)",
  },
  women: {
    heroBg: "linear-gradient(180deg, #F5EFE4 0%, #EDE5D5 55%, #E8DEC9 100%)",
    heroGlow: "radial-gradient(1000px 400px at 88% 18%, rgba(196,120,140,0.14), transparent 65%)",
    accent: "#B25778",
    accentSoft: "rgba(178,87,120,0.12)",
    text: "#1E1811",
    textMuted: "rgba(30,24,17,0.62)",
    textFaint: "rgba(30,24,17,0.4)",
    border: "rgba(138,106,62,0.22)",
    borderStrong: "rgba(178,87,120,0.5)",
    chipBg: "rgba(255,255,255,0.55)",
    chipBorder: "rgba(138,106,62,0.22)",
    surface: "#FBF5EA",
    surfaceCard: "#FFFDF7",
    display: "'Instrument Serif', Georgia, serif",
    mono: "'General Sans', system-ui, sans-serif",
    body: "'General Sans', system-ui, sans-serif",
    weight: 500,
    radius: 14,
    uppercase: "none" as const,
    grid: "none",
  },
};

export default function GenderPeptideDetail({ gender, slug }: GenderPeptideDetailProps) {
  const peptide = peptides.find((p) => p.slug === slug);
  const id = IDENTITY[gender];
  const isMen = gender === "men";
  const isWomen = gender === "women";

  useSeo({
    title: peptide ? `${peptide.name} — ${peptide.tagline}` : "Peptide protocol not found",
    description: peptide
      ? `${peptide.name} (${peptide.fullName}): ${peptide.summary} Physician-prescribed and compounded in a U.S. 503A pharmacy.`.slice(0, 160)
      : "Compounded peptide protocol supervised by U.S. board-certified physicians at Nexphoria.",
    path: `/${gender}/peptides/${slug}`,
    jsonLd: peptide
      ? [
          productJsonLd({
            name: peptide.name,
            description: peptide.summary,
            path: `/${gender}/peptides/${slug}`,
            category: peptide.category,
            price: pricing[peptide.slug]?.monthlyPrice,
            reviewCount: 340,
            ratingValue: 4.8,
          }),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: gender === "men" ? "For Him" : "For Her", path: `/${gender}` },
            { name: "Peptides", path: `/${gender}/peptides` },
            { name: peptide.name, path: `/${gender}/peptides/${slug}` },
          ]),
        ]
      : [],
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

  const timelineData = peptide.timeline.map((t, i) => ({ week: t.week, score: 40 + i * 8 }));

  const chartStroke = id.accent;
  const chartGridStroke = isMen ? "rgba(245,240,228,0.08)" : "rgba(30,24,17,0.08)";

  return (
    <SiteLayout navVariant={gender} footerVariant={gender}>
      {/* ────────── HERO ────────── */}
      <section
        style={{
          position: "relative",
          background: id.heroBg,
          color: id.text,
          overflow: "hidden",
          borderBottom: `1px solid ${id.border}`,
        }}
        data-testid={`pdp-hero-${gender}`}
      >
        {/* Ambient glow */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: id.heroGlow,
            pointerEvents: "none",
          }}
        />
        {/* Engineering grid (men only) */}
        {isMen && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage: id.grid,
              backgroundSize: "44px 44px",
              opacity: 0.55,
              pointerEvents: "none",
            }}
          />
        )}

        {/* Breadcrumb */}
        <div
          style={{
            position: "relative",
            zIndex: 2,
            borderBottom: `1px solid ${id.border}`,
            padding: "14px 0",
          }}
        >
          <div className="nx-container" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <Link
              href={`/${gender}/peptides`}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                fontFamily: id.mono,
                fontSize: "11px",
                letterSpacing: "0.14em",
                textTransform: id.uppercase,
                color: id.textMuted,
                textDecoration: "none",
              }}
              data-testid="breadcrumb-back"
            >
              <ArrowLeft size={13} />
              {isWomen ? "Women's peptides" : "Men's peptides"}
            </Link>
            <span style={{ color: id.textFaint, fontFamily: id.mono, fontSize: "11px" }}>/</span>
            <span
              style={{
                fontFamily: id.mono,
                fontSize: "11px",
                letterSpacing: "0.14em",
                textTransform: id.uppercase,
                color: id.text,
              }}
            >
              {peptide.name}
            </span>
          </div>
        </div>

        <div className="nx-container" style={{ position: "relative", zIndex: 2, padding: "72px 0 88px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1.15fr 1fr", gap: "56px", alignItems: "start" }}>
            {/* LEFT — headline + summary + meta */}
            <div>
              <Reveal>
                {/* Category chip */}
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "6px 12px",
                    background: id.chipBg,
                    border: `1px solid ${id.chipBorder}`,
                    borderRadius: isMen ? 3 : 999,
                    marginBottom: "24px",
                  }}
                >
                  <span
                    style={{
                      width: "6px",
                      height: "6px",
                      borderRadius: "50%",
                      background: id.accent,
                    }}
                  />
                  <span
                    style={{
                      fontFamily: id.mono,
                      fontSize: "10px",
                      fontWeight: 600,
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      color: id.accent,
                    }}
                  >
                    {CATEGORY_LABELS[peptide.category]}
                  </span>
                </div>

                {/* Headline */}
                <h1
                  style={{
                    fontFamily: id.display,
                    fontWeight: id.weight,
                    fontSize: "clamp(3rem, 6vw, 5rem)",
                    lineHeight: isWomen ? 0.98 : 1.02,
                    letterSpacing: isMen ? "-0.02em" : "-0.015em",
                    textTransform: id.uppercase,
                    color: id.text,
                    marginBottom: "18px",
                  }}
                  data-testid={`pdp-headline-${slug}`}
                >
                  {isWomen ? (
                    <>
                      {peptide.name.split(" ")[0]}
                      {peptide.name.split(" ").length > 1 && (
                        <span
                          style={{
                            fontFamily: "'Instrument Serif', Georgia, serif",
                            color: id.accent,
                            fontWeight: 500,
                          }}
                        >
                          {" " + peptide.name.split(" ").slice(1).join(" ")}
                        </span>
                      )}
                      {peptide.name.split(" ").length === 1 && (
                        <span
                          style={{
                            display: "block",
                            fontFamily: "'Instrument Serif', Georgia, serif",
                            color: id.accent,
                            fontWeight: 500,
                            fontSize: "0.5em",
                            marginTop: "8px",
                            lineHeight: 1,
                          }}
                        >
                          for her
                        </span>
                      )}
                    </>
                  ) : (
                    peptide.name
                  )}
                </h1>

                {/* Tagline */}
                <p
                  style={{
                    fontFamily: isWomen ? "'Instrument Serif', Georgia, serif" : id.body,
                    fontSize: isWomen ? "1.65rem" : "1.25rem",
                    fontWeight: isWomen ? 400 : 500,
                    color: id.text,
                    lineHeight: 1.3,
                    marginBottom: "20px",
                    maxWidth: "540px",
                  }}
                >
                  {peptide.tagline}
                </p>

                {/* Summary */}
                <p
                  style={{
                    fontFamily: id.body,
                    fontSize: "16px",
                    color: id.textMuted,
                    lineHeight: 1.65,
                    marginBottom: "36px",
                    maxWidth: "560px",
                  }}
                >
                  {peptide.summary}
                </p>

                {/* Gender-context box */}
                <div
                  style={{
                    padding: "16px 18px",
                    background: isMen ? "rgba(226,138,61,0.06)" : "rgba(255,255,255,0.55)",
                    border: `1px solid ${id.border}`,
                    borderRadius: id.radius,
                    marginBottom: "32px",
                    backdropFilter: isWomen ? "blur(4px)" : "none",
                  }}
                  data-testid={`gender-context-${gender}`}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      marginBottom: "6px",
                    }}
                  >
                    <ShieldCheck size={13} style={{ color: id.accent }} />
                    <span
                      style={{
                        fontFamily: id.mono,
                        fontSize: "10px",
                        fontWeight: 700,
                        letterSpacing: "0.16em",
                        textTransform: "uppercase",
                        color: id.accent,
                      }}
                    >
                      {genderContext.contextLabel}
                    </span>
                  </div>
                  <p
                    style={{
                      fontFamily: id.body,
                      fontSize: "13px",
                      color: id.textMuted,
                      lineHeight: 1.6,
                      margin: 0,
                    }}
                  >
                    {genderContext.contextNote}
                  </p>
                </div>

                {/* Protocol meta strip — 4 tiles */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(2, 1fr)",
                    gap: "10px",
                  }}
                >
                  {[
                    { icon: Clock, label: "Half-life", value: peptide.halfLife },
                    { icon: Syringe, label: "Typical dose", value: peptide.typicalDose },
                    { icon: Calendar, label: "Cycle length", value: peptide.cycleLength },
                    { icon: Syringe, label: "Route", value: peptide.administration },
                  ].map(({ icon: Icon, label, value }) => (
                    <div
                      key={label}
                      style={{
                        padding: "14px 16px",
                        background: isMen ? "rgba(226,138,61,0.04)" : "rgba(255,255,255,0.5)",
                        border: `1px solid ${id.border}`,
                        borderRadius: id.radius,
                        backdropFilter: isWomen ? "blur(2px)" : "none",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "6px" }}>
                        <Icon size={12} style={{ color: id.accent }} />
                        <span
                          style={{
                            fontFamily: id.mono,
                            fontSize: "9px",
                            fontWeight: 600,
                            letterSpacing: "0.14em",
                            textTransform: "uppercase",
                            color: id.textFaint,
                          }}
                        >
                          {label}
                        </span>
                      </div>
                      <p
                        style={{
                          fontFamily: id.body,
                          fontSize: "12.5px",
                          fontWeight: 600,
                          color: id.text,
                          margin: 0,
                          lineHeight: 1.4,
                        }}
                      >
                        {value}
                      </p>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>

            {/* RIGHT — configurator */}
            <div>
              <Reveal delay={120}>
                <HimsConfigurator
                  slug={slug}
                  productName={peptide.name}
                  category={peptide.category}
                  gender={gender}
                  pairsWith={peptide.pairsWith}
                  typicalDose={peptide.typicalDose}
                />
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ────────── MECHANISM ────────── */}
      <section
        style={{
          background: id.surface,
          borderBottom: `1px solid ${id.border}`,
          padding: "88px 0",
        }}
        data-testid="peptide-mechanism"
      >
        <div className="nx-container" style={{ maxWidth: "780px" }}>
          <Reveal>
            <p
              style={{
                fontFamily: id.mono,
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: id.accent,
                marginBottom: "16px",
              }}
            >
              Mechanism of action
            </p>
            <h2
              style={{
                fontFamily: id.display,
                fontWeight: id.weight,
                fontSize: "clamp(2rem, 3.2vw, 2.75rem)",
                lineHeight: 1.15,
                color: id.text,
                marginBottom: "24px",
                textTransform: id.uppercase,
              }}
            >
              {isWomen ? (
                <>
                  How{" "}
                  <span style={{ color: id.accent }}>{peptide.name}</span>{" "}
                  works.
                </>
              ) : (
                <>How {peptide.name} works.</>
              )}
            </h2>
            <p
              style={{
                fontFamily: id.body,
                fontSize: "17px",
                color: id.textMuted,
                lineHeight: 1.7,
              }}
            >
              {peptide.mechanism}
            </p>
          </Reveal>
        </div>
      </section>

      {/* ────────── TIMELINE ────────── */}
      {peptide.timeline.length > 0 && (
        <section
          style={{
            background: id.surfaceCard,
            borderBottom: `1px solid ${id.border}`,
            padding: "88px 0",
          }}
          data-testid="peptide-timeline"
        >
          <div className="nx-container" style={{ maxWidth: "820px" }}>
            <Reveal>
              <p
                style={{
                  fontFamily: id.mono,
                  fontSize: "11px",
                  fontWeight: 700,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: id.accent,
                  marginBottom: "16px",
                }}
              >
                What to expect
              </p>
              <h2
                style={{
                  fontFamily: id.display,
                  fontWeight: id.weight,
                  fontSize: "clamp(2rem, 3.2vw, 2.75rem)",
                  lineHeight: 1.15,
                  color: id.text,
                  marginBottom: "40px",
                  textTransform: id.uppercase,
                }}
              >
                {isWomen ? (
                  <>
                    Week by <span style={{ color: id.accent }}>week</span>.
                  </>
                ) : (
                  <>Week-by-week timeline.</>
                )}
              </h2>
            </Reveal>

            {/* Timeline chart preview */}
            <div
              style={{
                marginBottom: "32px",
                padding: "20px",
                background: isMen ? "#0A0A0A" : "rgba(255,255,255,0.5)",
                border: `1px solid ${id.border}`,
                borderRadius: id.radius,
                backdropFilter: isWomen ? "blur(2px)" : "none",
              }}
            >
              <div style={{ height: 180 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={timelineData} margin={{ top: 8, right: 8, bottom: 4, left: -20 }}>
                    <defs>
                      <linearGradient id={`grad-${gender}-${slug}`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={chartStroke} stopOpacity={0.35} />
                        <stop offset="95%" stopColor={chartStroke} stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke={chartGridStroke} vertical={false} />
                    <XAxis
                      dataKey="week"
                      tick={{ fontSize: 10, fill: id.textMuted, fontFamily: id.mono }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis
                      tick={{ fontSize: 10, fill: id.textMuted, fontFamily: id.mono }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <Area
                      type="monotone"
                      dataKey="score"
                      stroke={chartStroke}
                      strokeWidth={2.5}
                      fill={`url(#grad-${gender}-${slug})`}
                      dot={{ fill: chartStroke, strokeWidth: 0, r: 3 }}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column" }}>
              {peptide.timeline.map((entry, i) => (
                <Reveal key={i} delay={i * 60}>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "100px 1fr",
                      gap: "28px",
                      padding: "22px 0",
                      borderBottom: i < peptide.timeline.length - 1 ? `1px solid ${id.border}` : "none",
                    }}
                  >
                    <div>
                      <span
                        style={{
                          fontFamily: id.mono,
                          fontSize: "11px",
                          fontWeight: 700,
                          letterSpacing: "0.14em",
                          color: id.accent,
                          textTransform: "uppercase",
                        }}
                      >
                        {entry.week}
                      </span>
                    </div>
                    <p
                      style={{
                        fontFamily: id.body,
                        fontSize: "15px",
                        color: id.textMuted,
                        lineHeight: 1.65,
                        margin: 0,
                      }}
                    >
                      {entry.effect}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ────────── STUDIES ────────── */}
      {peptide.studies.length > 0 && (
        <section
          style={{
            background: id.surface,
            borderBottom: `1px solid ${id.border}`,
            padding: "88px 0",
          }}
          data-testid="peptide-studies"
        >
          <div className="nx-container" style={{ maxWidth: "820px" }}>
            <Reveal>
              <p
                style={{
                  fontFamily: id.mono,
                  fontSize: "11px",
                  fontWeight: 700,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: id.accent,
                  marginBottom: "16px",
                }}
              >
                Peer-reviewed research
              </p>
              <h2
                style={{
                  fontFamily: id.display,
                  fontWeight: id.weight,
                  fontSize: "clamp(2rem, 3.2vw, 2.75rem)",
                  lineHeight: 1.15,
                  color: id.text,
                  marginBottom: "32px",
                  textTransform: id.uppercase,
                }}
              >
                {isWomen ? (
                  <>
                    Clinical <span style={{ color: id.accent }}>evidence</span>.
                  </>
                ) : (
                  <>Clinical evidence.</>
                )}
              </h2>
            </Reveal>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {peptide.studies.map((study, i) => (
                <Reveal key={i} delay={i * 50}>
                  <a
                    href={study.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "block",
                      padding: "18px 20px",
                      background: id.surfaceCard,
                      border: `1px solid ${id.border}`,
                      borderRadius: id.radius,
                      textDecoration: "none",
                      transition: "all 0.18s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = id.borderStrong;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = id.border;
                    }}
                    data-testid={`study-link-${i}`}
                  >
                    <p
                      style={{
                        fontFamily: id.body,
                        fontSize: "14.5px",
                        fontWeight: 600,
                        color: id.text,
                        marginBottom: "8px",
                        lineHeight: 1.4,
                      }}
                    >
                      {study.title}
                    </p>
                    <div style={{ display: "flex", gap: "16px" }}>
                      <span
                        style={{
                          fontFamily: id.mono,
                          fontSize: "10.5px",
                          letterSpacing: "0.1em",
                          color: id.accent,
                          textTransform: "uppercase",
                          fontWeight: 600,
                        }}
                      >
                        {study.source}
                      </span>
                      <span
                        style={{
                          fontFamily: id.mono,
                          fontSize: "10.5px",
                          letterSpacing: "0.1em",
                          color: id.textFaint,
                        }}
                      >
                        {study.year}
                      </span>
                    </div>
                  </a>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ────────── PAIRS WITH ────────── */}
      {peptide.pairsWith.length > 0 && (
        <section
          style={{
            background: id.surfaceCard,
            padding: "72px 0",
            borderBottom: `1px solid ${id.border}`,
          }}
          data-testid="peptide-pairs-with"
        >
          <div className="nx-container">
            <Reveal>
              <p
                style={{
                  fontFamily: id.mono,
                  fontSize: "11px",
                  fontWeight: 700,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: id.accent,
                  marginBottom: "16px",
                }}
              >
                Stacks well with
              </p>
              <h2
                style={{
                  fontFamily: id.display,
                  fontWeight: id.weight,
                  fontSize: "clamp(1.75rem, 2.6vw, 2.25rem)",
                  color: id.text,
                  marginBottom: "28px",
                  textTransform: id.uppercase,
                }}
              >
                {isWomen ? (
                  <>
                    Pairs with<span style={{ color: id.accent }}>.</span>
                  </>
                ) : (
                  <>Complementary compounds.</>
                )}
              </h2>
            </Reveal>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
              {peptide.pairsWith.map((pairSlug) => {
                const paired = peptides.find((p) => p.slug === pairSlug);
                if (!paired) return null;
                return (
                  <Link
                    key={pairSlug}
                    href={`/${gender}/peptides/${pairSlug}`}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "8px",
                      padding: "12px 18px",
                      background: id.surface,
                      border: `1px solid ${id.border}`,
                      borderRadius: isMen ? id.radius : 999,
                      fontFamily: id.body,
                      fontSize: "14px",
                      fontWeight: 600,
                      color: id.text,
                      textDecoration: "none",
                      transition: "all 0.15s ease",
                    }}
                    data-testid={`pair-link-${pairSlug}`}
                  >
                    {paired.name}
                    <span style={{ color: id.accent }}>→</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ────────── DISCLAIMER ────────── */}
      <div
        style={{
          background: id.surface,
          padding: "40px 0 32px",
        }}
      >
        <div className="nx-container">
          <p
            style={{
              fontFamily: id.mono,
              fontSize: "11px",
              color: id.textFaint,
              lineHeight: 1.7,
              maxWidth: "760px",
              letterSpacing: "0.02em",
            }}
          >
            <strong style={{ color: id.textMuted }}>Disclaimer:</strong> This information is for
            educational purposes only. {peptide.name} is prescribed off-label by licensed U.S.
            physicians and compounded by FDA-registered 503A pharmacies. It has not been evaluated
            by the FDA for all indications listed. Individual results vary. Consult your Nexphoria
            physician.
          </p>
        </div>
      </div>

      <FinalCTAStrip gender={gender} />
    </SiteLayout>
  );
}
