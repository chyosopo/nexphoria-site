import { motion } from "framer-motion";

/* ─────────────────────────────────────────────────────────────
   EducationCard — Wave 5
   Reusable portrait card for the education hub.
   Props: eyebrow, title, readTime, excerpt, href, imageSrc
   ───────────────────────────────────────────────────────────── */

export interface EducationCardProps {
  eyebrow: string;
  title: string;
  readTime: string;
  excerpt: string;
  href: string;
  imageSrc?: string;
}

export function EducationCard({
  eyebrow,
  title,
  readTime,
  excerpt,
  href,
  imageSrc,
}: EducationCardProps) {
  return (
    <motion.a
      href={href}
      data-testid={`edu-card-${eyebrow.toLowerCase().replace(/\s+/g, "-")}`}
      whileHover="hovered"
      initial="rest"
      animate="rest"
      style={{
        display: "block",
        textDecoration: "none",
        color: "inherit",
        borderBottom: "1px solid var(--nx-fg)",
        cursor: "pointer",
      }}
      aria-label={title}
    >
      {/* ── Image (16:10 aspect) ──────────────────────── */}
      {imageSrc && (
        <div
          style={{
            position: "relative",
            width: "100%",
            paddingTop: "62.5%", /* 16:10 */
            overflow: "hidden",
            backgroundColor: "var(--nx-bg-cream)",
          }}
        >
          <motion.img
            src={imageSrc}
            alt={title}
            loading="lazy"
            variants={{
              rest: { filter: "brightness(1)", scale: 1 },
              hovered: { filter: "brightness(1.05)", scale: 1.02 },
            }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transformOrigin: "center center",
            }}
          />
        </div>
      )}

      {/* ── Text block ──────────────────────────────── */}
      <div style={{ padding: "16px 0 14px" }}>
        {/* Eyebrow */}
        <p
          style={{
            fontFamily: "'General Sans', system-ui, sans-serif",
            fontSize: "var(--nx-t-2xs)",
            fontWeight: 600,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "var(--nx-fg)",
            marginBottom: "8px",
          }}
        >
          {eyebrow}
        </p>

        {/* Title */}
        <motion.h3
          variants={{
            rest: { textDecoration: "none" },
            hovered: { textDecoration: "underline" },
          }}
          style={{
            fontFamily: "'General Sans', system-ui, sans-serif",
            fontWeight: 500,
            fontSize: "var(--nx-t-lg)",
            color: "var(--nx-fg)",
            lineHeight: 1.25,
            marginBottom: "8px",
            textUnderlineOffset: "3px",
          }}
        >
          {title}
        </motion.h3>

        {/* Excerpt */}
        <p
          style={{
            fontFamily: "'General Sans', system-ui, sans-serif",
            fontSize: "var(--nx-t-sm)",
            fontWeight: 400,
            color: "var(--nx-fg-graphite)",
            lineHeight: 1.6,
            marginBottom: "12px",
            /* Two-line clamp */
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          } as React.CSSProperties}
        >
          {excerpt}
        </p>

        {/* Bottom row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span
            style={{
              fontFamily: "'General Sans', system-ui, sans-serif",
              fontSize: "var(--nx-t-2xs)",
              fontWeight: 500,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "var(--nx-fg-muted)",
            }}
          >
            {readTime}
          </span>

          <motion.span
            variants={{
              rest: { x: 0 },
              hovered: { x: 4 },
            }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            style={{
              fontFamily: "'General Sans', system-ui, sans-serif",
              fontSize: "var(--nx-t-xs)",
              fontWeight: 500,
              color: "var(--nx-fg)",
              display: "inline-flex",
              alignItems: "center",
              gap: "2px",
            }}
          >
            Read article →
          </motion.span>
        </div>
      </div>
    </motion.a>
  );
}
