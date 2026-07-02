import { Link } from "wouter";
import { ArrowUpRight } from "lucide-react";

/* ──────────────────────────────────────────────────────────────
   BenefitTile — Maximus-style square tile
   Small, square, benefit-first. No decoration. Copy leads.

   Use in tight grids (2/3/4 col) across category grids,
   protocol lists, and benefit strips. Every tile is a
   destination — the whole tile is clickable when `href` is set.
   ────────────────────────────────────────────────────────────── */

const FONT = "'General Sans', system-ui, sans-serif";
const MONO = "'JetBrains Mono', ui-monospace, SFMono-Regular, monospace";

export type TileTone = "dark" | "cream" | "white" | "cobalt" | "ember";

const TONES: Record<TileTone, { bg: string; fg: string; eyebrow: string; sub: string; border: string; hover: string }> = {
  dark: {
    bg: "var(--nx-fg)",
    fg: "var(--nx-bg)",
    eyebrow: "var(--nx-accent)",
    sub: "rgba(240, 244, 250,0.62)",
    border: "rgba(61, 135, 226,0.22)",
    hover: "#141311",
  },
  cream: {
    bg: "var(--nx-bg-cream)",
    fg: "var(--nx-fg)",
    eyebrow: "var(--nx-amber)",
    sub: "var(--nx-fg-graphite)",
    border: "var(--nx-border)",
    hover: "#D8E3F0",
  },
  white: {
    bg: "#fff",
    fg: "var(--nx-fg)",
    eyebrow: "var(--nx-amber)",
    sub: "var(--nx-fg-graphite)",
    border: "var(--nx-border)",
    hover: "#EAF2FB",
  },
  cobalt: {
    bg: "linear-gradient(160deg, var(--nx-bg-dark) 0%, #18222E 65%, #1C293A 100%)",
    fg: "var(--nx-bg)",
    eyebrow: "#5591C7",
    sub: "rgba(228, 236, 245,0.68)",
    border: "rgba(85,145,199,0.28)",
    hover: "#0F1D3A",
  },
  ember: {
    bg: "linear-gradient(180deg, #141311 0%, var(--nx-bg-dark) 100%)",
    fg: "var(--nx-bg)",
    eyebrow: "var(--nx-accent)",
    sub: "rgba(228, 236, 245,0.62)",
    border: "rgba(61, 135, 226,0.28)",
    hover: "#181B1E",
  },
};

interface BenefitTileProps {
  /** Small uppercase label above the headline. Category, step number, or metric. */
  eyebrow?: string;
  /** The dominant benefit statement. Keep it short — 3-7 words. */
  headline: string;
  /** Optional sub-copy explaining the benefit. */
  sub?: string;
  /** Optional metric number displayed prominently. */
  metric?: string;
  /** Optional unit displayed next to the metric. */
  metricUnit?: string;
  /** Icon rendered top-left. */
  icon?: React.ReactNode;
  /** Route to link to. When omitted, the tile renders as a static div. */
  href?: string;
  /** Optional CTA label shown bottom-right — defaults to icon only. */
  cta?: string;
  /** Visual tone. */
  tone?: TileTone;
  /** Aspect ratio — 1 = square (default), 4/5 = portrait, 5/4 = landscape. */
  aspect?: number;
  /** Test id. */
  testId?: string;
  /** Optional background image path. Applies dark overlay for legibility. */
  image?: string;
}

export function BenefitTile({
  eyebrow,
  headline,
  sub,
  metric,
  metricUnit,
  icon,
  href,
  cta,
  tone = "cream",
  aspect = 1,
  testId,
  image,
}: BenefitTileProps) {
  const t = TONES[tone];
  const isDark = tone === "dark" || tone === "cobalt" || tone === "ember";
  const hasImage = !!image;

  const Inner = (
    <div
      className="benefit-tile group relative flex flex-col h-full w-full p-5 md:p-6 overflow-hidden transition-all duration-300"
      style={{
        background: hasImage ? "var(--nx-fg)" : t.bg,
        color: t.fg,
        border: `1px solid ${t.border}`,
        borderRadius: 10,
        aspectRatio: aspect,
      }}
      data-testid={testId}
    >
      {/* Background image w/ scrim */}
      {hasImage ? (
        <>
          <div
            className="absolute inset-0 transition-transform duration-500 group-hover:scale-105"
            style={{
              backgroundImage: `url(${image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            aria-hidden="true"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(21, 24, 28,0.05) 0%, rgba(21, 24, 28,0.55) 60%, rgba(21, 24, 28,0.92) 100%)",
            }}
            aria-hidden="true"
          />
        </>
      ) : null}

      {/* Top row: icon + eyebrow */}
      <div className="relative flex items-start justify-between mb-4">
        {icon ? (
          <span
            className="inline-flex items-center justify-center"
            style={{
              width: 32,
              height: 32,
              background: isDark || hasImage ? "rgba(255,255,255,0.08)" : "rgba(43, 86, 139,0.10)",
              color: isDark || hasImage ? t.eyebrow : "var(--nx-amber)",
              borderRadius: 6,
              border: `1px solid ${isDark || hasImage ? "rgba(255,255,255,0.10)" : "rgba(43, 86, 139,0.18)"}`,
              flexShrink: 0,
            }}
          >
            {icon}
          </span>
        ) : (
          <span />
        )}
        {eyebrow ? (
          <span
            className="text-[9px] uppercase"
            style={{
              fontFamily: MONO,
              color: hasImage ? "var(--nx-accent)" : t.eyebrow,
              letterSpacing: "0.18em",
              fontWeight: 600,
            }}
          >
            {eyebrow}
          </span>
        ) : null}
      </div>

      {/* Middle: metric OR headline */}
      <div className="relative flex-1 flex flex-col justify-end">
        {metric ? (
          <div className="mb-3 flex items-baseline gap-1.5 flex-wrap">
            <span
              className="leading-none"
              style={{
                fontFamily: FONT,
                fontSize:
                  metric.length > 3
                    ? "clamp(1.75rem, 3vw, 2.5rem)"
                    : "clamp(2.25rem, 4vw, 3.25rem)",
                fontWeight: 700,
                letterSpacing: "-0.03em",
                color: hasImage ? "var(--nx-bg)" : t.fg,
              }}
            >
              {metric}
            </span>
            {metricUnit ? (
              <span
                className="text-[11px] md:text-xs uppercase tracking-[0.14em]"
                style={{ fontFamily: MONO, color: hasImage ? "var(--nx-accent)" : t.eyebrow, fontWeight: 600 }}
              >
                {metricUnit}
              </span>
            ) : null}
          </div>
        ) : null}

        <h3
          className="leading-tight mb-2"
          style={{
            fontFamily: FONT,
            fontSize: metric ? "0.9375rem" : "clamp(1.125rem, 1.6vw, 1.375rem)",
            fontWeight: metric ? 500 : 600,
            letterSpacing: "-0.015em",
            color: hasImage ? "var(--nx-bg)" : t.fg,
          }}
        >
          {headline}
        </h3>

        {sub ? (
          <p
            className="leading-relaxed"
            style={{
              fontFamily: FONT,
              fontSize: "0.8125rem",
              color: hasImage ? "rgba(240, 244, 250,0.75)" : t.sub,
              lineHeight: 1.5,
            }}
          >
            {sub}
          </p>
        ) : null}
      </div>

      {/* Bottom: CTA */}
      {href ? (
        <div
          className="relative flex items-center justify-between mt-4 pt-3"
          style={{ borderTop: `1px solid ${hasImage ? "rgba(255,255,255,0.14)" : t.border}` }}
        >
          <span
            className="text-[10px] uppercase"
            style={{
              fontFamily: MONO,
              color: hasImage ? "rgba(240, 244, 250,0.85)" : t.sub,
              letterSpacing: "0.15em",
              fontWeight: 600,
            }}
          >
            {cta || "Explore"}
          </span>
          <ArrowUpRight
            size={16}
            style={{ color: hasImage ? "var(--nx-accent)" : t.eyebrow }}
            className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </div>
      ) : null}
    </div>
  );

  if (!href) return Inner;

  return (
    <Link
      href={href}
      className="block no-underline h-full"
      style={{ color: "inherit", textDecoration: "none" }}
      data-testid={testId ? `link-${testId}` : undefined}
    >
      {Inner}
    </Link>
  );
}

/* ──────────────────────────────────────────────────────────────
   BenefitTileGrid — helper wrapper enforcing the Maximus grid.
   Renders a 2/3/4 responsive column grid with tight gaps.
   ────────────────────────────────────────────────────────────── */

interface BenefitTileGridProps {
  cols?: 2 | 3 | 4;
  children: React.ReactNode;
  className?: string;
}

export function BenefitTileGrid({ cols = 3, children, className = "" }: BenefitTileGridProps) {
  const gridClass =
    cols === 2
      ? "grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4"
      : cols === 3
      ? "grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4"
      : "grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4";
  return <div className={`${gridClass} ${className}`}>{children}</div>;
}
