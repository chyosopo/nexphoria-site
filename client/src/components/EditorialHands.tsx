/* ──────────────────────────────────────────────────────────────
   EditorialHands — full-bleed editorial spread for the hands imagery.
   Used across Home, HowItWorks, Pharmacy, Science, Physicians, About,
   LabTesting. Static (no scroll motion / parallax / blur) per brand
   constraints. Caption is JetBrains Mono uppercase tracking-widest.
   ────────────────────────────────────────────────────────────── */

type EditorialHandsProps = {
  src: string;
  alt: string;
  /** small mono caption, e.g. "FIG. 03 · COMPOUNDED IN U.S. PHARMACIES" */
  caption?: string;
  /** optional large editorial headline overlay */
  headline?: React.ReactNode;
  /** object-position fine-tuning */
  objectPosition?: string;
  /** caption anchor */
  captionAnchor?: "bottom-left" | "top-right";
  /** aspect ratio for the spread */
  ratio?: "21/9" | "16/9";
  className?: string;
};

export function EditorialHands({
  src,
  alt,
  caption,
  headline,
  objectPosition = "center 45%",
  captionAnchor = "bottom-left",
  ratio = "21/9",
  className = "",
}: EditorialHandsProps) {
  const aspectClass = ratio === "16/9" ? "aspect-[16/9]" : "aspect-[21/9]";
  return (
    <section className={`relative w-full bg-black overflow-hidden ${className}`}>
      <div className={`relative w-full ${aspectClass} max-h-[760px] min-h-[360px]`}>
        <img
          src={src}
          alt={alt}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ objectPosition }}
          loading="lazy"
        />
        {/* edge vignette so caption + headline stay legible */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(180deg,rgba(7,7,7,.5) 0%,transparent 26%,transparent 60%,rgba(7,7,7,.72) 100%)",
          }}
        />

        {headline && (
          <div className="absolute inset-0 z-[2] flex items-center px-6 lg:px-14">
            <div className="max-w-[620px]">{headline}</div>
          </div>
        )}

        {caption && (
          <div
            className={
              captionAnchor === "top-right"
                ? "absolute top-6 right-6 lg:top-8 lg:right-12 z-[3]"
                : "absolute bottom-6 left-6 lg:bottom-8 lg:left-12 z-[3]"
            }
          >
            <p className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-nx-fg/50">
              {caption}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
