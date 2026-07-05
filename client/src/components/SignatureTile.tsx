/* ──────────────────────────────────────────────────────────────
   SignatureTile — reusable tile primitives matching the approved
   home_maximus mockup. Three variants:
     <HeroTile />     5:4 photo hero with glass label + CTA
     <ProductTile />  1:1.15 cream tile with floating product object
     <DarkTile />     same as ProductTile but inverted (rhythm break)
     <PhotoTile />    photo-bg small tile variant
   ────────────────────────────────────────────────────────────── */

import { Link } from "wouter";
import { useRef } from "react";

interface HeroTileProps {
  href: string;
  imgSrc: string;       // 1280 webp
  imgSrcSm: string;     // 720 webp
  alt: string;
  label: React.ReactNode;
  caption: string;
  ctaLabel?: string;
  dark?: boolean;
  priority?: boolean;
}

export function HeroTile({
  href,
  imgSrc,
  imgSrcSm,
  alt,
  label,
  caption,
  ctaLabel = "Explore",
  dark = false,
  priority = false,
}: HeroTileProps) {
  const heroRef = useRef<HTMLAnchorElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  const onMouseMove = (e: React.MouseEvent) => {
    if (!heroRef.current || !imgRef.current) return;
    const r = heroRef.current.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    imgRef.current.style.transform = `scale(1.06) translate(${x * -10}px, ${y * -10}px)`;
  };
  const onMouseLeave = () => {
    if (imgRef.current) imgRef.current.style.transform = "";
  };

  return (
    <Link
      href={href}
      ref={heroRef as any}
      className={`mx-hero ${dark ? "dark" : ""}`}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      data-testid={`hero-${href.replace(/[^a-z0-9]/gi, "-")}`}
    >
      <picture>
        <source media="(max-width: 720px)" srcSet={imgSrcSm} type="image/webp" />
        <source srcSet={imgSrc} type="image/webp" />
        <img
          ref={imgRef}
          src={imgSrc}
          alt={alt}
          width={800}
          height={640}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          {...(priority ? { fetchPriority: "high" as any } : {})}
        />
      </picture>
      <div className="mx-hero-label">
        {label}
        <small>{caption}</small>
      </div>
      <div className="mx-hero-cta">
        {ctaLabel}
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      </div>
    </Link>
  );
}

interface ProductTileProps {
  href: string;
  pill?: string;
  label: React.ReactNode;
  meta: string;
  objSrc: string;
  objAlt: string;
  dark?: boolean;
}

export function ProductTile({
  href,
  pill,
  label,
  meta,
  objSrc,
  objAlt,
  dark = false,
}: ProductTileProps) {
  return (
    <Link
      href={href}
      className={`mx-tile ${dark ? "dark" : ""}`}
      data-testid={`tile-${href.replace(/[^a-z0-9]/gi, "-")}`}
    >
      <div className="mx-tile-head">
        {pill && <span className="mx-pill">{pill}</span>}
        <div className="mx-tile-label">{label}</div>
      </div>
      <div className="mx-tile-meta">{meta}</div>
      <img
        className="mx-tile-obj"
        src={objSrc}
        alt={objAlt}
        width={345}
        height={345}
        loading="lazy"
        decoding="async"
      />
    </Link>
  );
}

interface PhotoTileProps {
  href: string;
  pill?: string;
  label: React.ReactNode;
  meta: string;
  photoSrc: string;
  alt: string;
}

export function PhotoTile({
  href,
  pill,
  label,
  meta,
  photoSrc,
  alt,
}: PhotoTileProps) {
  return (
    <Link
      href={href}
      className="mx-tile photo"
      data-testid={`tile-photo-${href.replace(/[^a-z0-9]/gi, "-")}`}
    >
      <img className="mx-tile-photo" src={photoSrc} alt={alt} loading="lazy" decoding="async" />
      <div className="mx-tile-head">
        {pill && <span className="mx-pill">{pill}</span>}
        <div className="mx-tile-label">{label}</div>
      </div>
      <div className="mx-tile-meta">{meta}</div>
    </Link>
  );
}

/* ──────────────────────────────────────────────────────────────
   ColoredHeroTile — alternative to photo HeroTile.
   Renders a subtle-color, gradient tile with a large concept glyph.
   Use when no real photography exists for the concept (e.g. bloodwork,
   physicians, stacks). Each page gets its OWN color so the site stops
   feeling like 2 photos on repeat.
   ────────────────────────────────────────────────────────────── */

interface ColoredHeroTileProps {
  href: string;
  /** Subtle base color — light, never saturated. Six are pre-defined below. */
  tone:
    | "sage"        // bloodwork / verification
    | "rose"        // glow / skin
    | "sand"        // longevity / oils
    | "sky"         // sleep / recovery
    | "cobalt"      // performance / men
    | "butter";     // cognitive / metabolic
  label: React.ReactNode;
  caption: string;
  ctaLabel?: string;
  glyph?: React.ReactNode;  // SVG glyph displayed large behind the label
}

const TONE_PALETTE: Record<
  ColoredHeroTileProps["tone"],
  { bg: string; ink: string; accent: string; shadow: string }
> = {
  sage:   { bg: "linear-gradient(135deg, #E3E9F0 0%, #CFDDE2 100%)", ink: "var(--nx-fg)", accent: "#5C828E", shadow: "rgba(103, 115, 128,0.18)" },
  rose:   { bg: "linear-gradient(135deg, #E1EAF5 0%, #C8D7EA 100%)", ink: "var(--nx-fg)", accent: "#4F7BB0", shadow: "rgba(103, 127, 152,0.18)" },
  sand:   { bg: "linear-gradient(135deg, #E1E8F1 0%, #C4D2E2 100%)", ink: "var(--nx-fg)", accent: "#4E6A8C", shadow: "rgba(94, 109, 125,0.18)" },
  sky:    { bg: "linear-gradient(135deg, #e6edec 0%, #c9d6d4 100%)", ink: "var(--nx-fg)", accent: "#456764", shadow: "rgba(69,103,100,0.20)" },
  cobalt: { bg: "linear-gradient(135deg, #dde4e8 0%, #b9c6d0 100%)", ink: "var(--nx-fg)", accent: "#345470", shadow: "rgba(67, 82, 97,0.22)" },
  butter: { bg: "linear-gradient(135deg, #DBE6F4 0%, #B9CEE7 100%)", ink: "var(--nx-fg)", accent: "#3C69A0", shadow: "rgba(85, 110, 135,0.18)" },
};

export function ColoredHeroTile({
  href,
  tone,
  label,
  caption,
  ctaLabel = "Explore",
  glyph,
}: ColoredHeroTileProps) {
  const p = TONE_PALETTE[tone];
  return (
    <Link
      href={href}
      className="mx-hero mx-colored"
      data-testid={`hero-colored-${tone}-${href.replace(/[^a-z0-9]/gi, "-")}`}
      style={{
        background: p.bg,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {glyph && (
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            right: "-40px",
            bottom: "-40px",
            width: "60%",
            color: p.accent,
            opacity: 0.35,
            pointerEvents: "none",
          }}
        >
          {glyph}
        </div>
      )}
      <div
        className="mx-hero-label"
        style={{ background: "rgba(249, 251, 253,0.92)", color: p.ink, boxShadow: `0 12px 32px ${p.shadow}` }}
      >
        {label}
        <small style={{ color: p.accent }}>{caption}</small>
      </div>
      <div
        className="mx-hero-cta"
        style={{ background: p.ink, color: "var(--nx-ceramic)" }}
      >
        {ctaLabel}
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      </div>
    </Link>
  );
}

/* Pre-built glyphs for ColoredHeroTile — abstract, never childish */
export const TileGlyphs = {
  drop: (
    <svg viewBox="0 0 200 200" fill="currentColor">
      <path d="M100 30 C130 80 160 110 160 140 A60 60 0 0 1 40 140 C40 110 70 80 100 30 Z" />
    </svg>
  ),
  circle: (
    <svg viewBox="0 0 200 200" fill="none" stroke="currentColor" strokeWidth="3">
      <circle cx="100" cy="100" r="80" />
      <circle cx="100" cy="100" r="55" />
      <circle cx="100" cy="100" r="30" />
    </svg>
  ),
  leaf: (
    <svg viewBox="0 0 200 200" fill="currentColor">
      <path d="M40 160 C40 80 100 30 160 40 C150 100 100 160 40 160 Z" />
      <path d="M40 160 C80 130 120 90 160 40" stroke="var(--nx-ceramic)" strokeWidth="2" fill="none" />
    </svg>
  ),
  hex: (
    <svg viewBox="0 0 200 200" fill="currentColor">
      <polygon points="100,20 170,60 170,140 100,180 30,140 30,60" />
    </svg>
  ),
  wave: (
    <svg viewBox="0 0 200 200" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round">
      <path d="M10 100 Q 50 60 100 100 T 190 100" />
      <path d="M10 130 Q 50 90 100 130 T 190 130" opacity="0.6" />
      <path d="M10 70 Q 50 30 100 70 T 190 70" opacity="0.4" />
    </svg>
  ),
  vial: (
    <svg viewBox="0 0 200 200" fill="currentColor">
      <rect x="80" y="30" width="40" height="140" rx="8" />
      <rect x="70" y="20" width="60" height="18" rx="4" />
      <rect x="80" y="130" width="40" height="40" fill="var(--nx-ceramic)" opacity="0.4" />
    </svg>
  ),
};

/* Editorial trust band footer */
export function TrustBand({
  headline,
  items,
}: {
  headline: string;
  items: { num: string; lbl: string }[];
}) {
  return (
    <section className="mx-band">
      <h3>{headline}</h3>
      {items.map((it, i) => (
        <div key={i} className="mx-band-item">
          <div className="num">{it.num}</div>
          <div className="lbl">{it.lbl}</div>
        </div>
      ))}
    </section>
  );
}

/* Section header (eyebrow OR pill badge + headline + subtitle) */
export function MxHeader({
  eyebrow,
  badge,
  headline,
  subtitle,
}: {
  eyebrow?: string;
  badge?: React.ReactNode;
  headline: React.ReactNode;
  subtitle?: string;
}) {
  return (
    <section className="mx-header" style={{ maxWidth: 880, margin: "0 0 40px" }}>
      {badge && <div style={{ marginBottom: 24 }}>{badge}</div>}
      {!badge && eyebrow && (
        <div className="mx-eyebrow" style={{ marginBottom: 18 }}>{eyebrow}</div>
      )}
      <h1 className="mx-headline">{headline}</h1>
      {subtitle && <p className="mx-subtitle" style={{ marginTop: 22 }}>{subtitle}</p>}
    </section>
  );
}
