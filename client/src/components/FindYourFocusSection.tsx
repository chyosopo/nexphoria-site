import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import findYourFocusArt from "@/assets/brand/find-your-focus-art.webp";

/**
 * FindYourFocusSection — THE editorial showstopper.
 * ────────────────────────────────────────────────
 * A cinematic full-bleed treatment of the real brand photograph
 * (`find-your-focus-art.webp`, 1800×1113) — the half-blurred man behind glass
 * with the "Find your focus." typography. As the section enters the viewport
 * the image animates from 110% scale + 8px blur → 100% scale + 0 blur,
 * a scroll-driven "come into focus" reveal that literalizes the brand vision.
 *
 * Editorial type is overlaid at safe edges on desktop; on mobile the image
 * stays full-bleed at the top and the type stacks below on a black card.
 *
 * Respects prefers-reduced-motion: when reduced, the image renders sharp and
 * static (no blur, no scale), and overlay copy appears without transition.
 */
export function FindYourFocusSection() {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });

  // Blur-to-sharp + scale-down as the section scrolls into view.
  const blur = useTransform(scrollYProgress, [0, 1], [8, 0]);
  const filter = useTransform(blur, (b) => `blur(${b}px)`);
  const scale = useTransform(scrollYProgress, [0, 1], [1.1, 1]);
  // Subtle caption parallax — the type drifts up slightly slower than the scroll.
  const captionY = useTransform(scrollYProgress, [0, 1], [28, 0]);

  const imgStyle = reduceMotion ? {} : { filter, scale };
  const captionStyle = reduceMotion ? {} : { y: captionY };

  const overlayInitial = reduceMotion ? false : { opacity: 0, y: 24 };
  const overlayAnimate = reduceMotion ? {} : { opacity: 1, y: 0 };

  return (
    <section
      ref={ref}
      className="relative bg-background text-foreground overflow-hidden"
      data-testid="section-find-your-focus"
    >
      {/* ── Desktop / tablet: full-bleed image with overlaid editorial type ── */}
      <div className="relative hidden md:block">
        <div className="relative w-full overflow-hidden aspect-[1800/1113] max-h-[92vh]">
          <motion.img
            src={findYourFocusArt}
            alt="A focused man behind glass etched with the words Find your focus — the Nexphoria brand vision"
            style={imgStyle as any}
            className="absolute inset-0 w-full h-full object-cover object-center will-change-transform"
          />
          {/* Cinematic edge darkening so type stays legible at the safe edges */}
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-background/75 via-transparent to-background/45" />
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-background/55 via-transparent to-transparent" />
          {/* Film grain — adds cinematic texture, kept very subtle */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.07] mix-blend-overlay"
            aria-hidden="true"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
            }}
          />

          {/* Top-left caption */}
          <div className="absolute top-8 left-8 lg:top-12 lg:left-12 z-10">
            <div className="font-mono text-[11px] uppercase tracking-[0.32em] text-primary">
              Brand Vision · Chapter 01
            </div>
          </div>

          {/* Bottom-right kicker */}
          <div className="absolute bottom-8 right-8 lg:bottom-12 lg:right-12 z-10">
            <div className="font-mono text-[11px] uppercase tracking-[0.28em] text-foreground/70">
              — Nexphoria
            </div>
          </div>

          {/* Bottom-left editorial type block */}
          <motion.div
            initial={overlayInitial}
            whileInView={overlayAnimate}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            style={captionStyle as any}
            className="absolute bottom-10 left-8 lg:bottom-16 lg:left-12 z-10 max-w-xl"
          >
            <div className="text-foreground text-foreground leading-[0.95] text-fluid-5xl mb-1">
              Dare to defy.
            </div>
            <div className="font-display text-foreground leading-[0.95] tracking-[-0.02em] text-fluid-4xl">
              Find your focus.
            </div>
            <div className="font-display text-primary leading-[0.95] tracking-[-0.02em] text-fluid-2xl mt-1">
              Elevate every moment.
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── Mobile: full-bleed image on top, type stacked below on black ── */}
      <div className="md:hidden">
        <div className="relative w-full overflow-hidden aspect-[1800/1113]">
          <motion.img
            src={findYourFocusArt}
            alt="A focused man behind glass etched with the words Find your focus — the Nexphoria brand vision"
            style={imgStyle as any}
            className="absolute inset-0 w-full h-full object-cover object-center will-change-transform"
          />
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-background/70 to-transparent" />
          <div className="absolute top-6 left-6 z-10">
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary">
              Brand Vision · Ch. 01
            </div>
          </div>
        </div>

        <div className="bg-background px-6 py-12">
          <motion.div
            initial={overlayInitial}
            whileInView={overlayAnimate}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="text-foreground text-foreground leading-[1] text-fluid-4xl mb-1">
              Dare to defy.
            </div>
            <div className="font-display text-foreground leading-[1] tracking-[-0.02em] text-fluid-3xl">
              Find your focus.
            </div>
            <div className="font-display text-primary leading-[1] tracking-[-0.02em] text-fluid-xl mt-1.5">
              Elevate every moment.
            </div>
            <p className="mt-6 text-fluid-base text-foreground/65 leading-relaxed max-w-md">
              Peptides don&rsquo;t just repair tissue &mdash; they restore attention, resilience,
              and the quiet certainty that your body is finally listening.
            </p>
            <div className="mt-6 font-mono text-[10px] uppercase tracking-[0.28em] text-foreground/45">
              — Nexphoria
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
