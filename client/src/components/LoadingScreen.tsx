/* Route-level Suspense fallback. Instead of a blank viewport with a dot,
   render a page-shaped porcelain skeleton (nav bar, hero copy, hero frame,
   tile row) using the shared .nx-skeleton shimmer — the swap to the real
   page is layout-stable and reads as intentional loading language. */
export function LoadingScreen() {
  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: "var(--nx-bg)" }}
      aria-live="polite"
      aria-label="Loading"
      data-testid="route-skeleton"
    >
      {/* Nav-shaped bar */}
      <div
        style={{
          height: 64,
          borderBottom: "1px solid var(--nx-border)",
          display: "flex",
          alignItems: "center",
          gap: 16,
          padding: "0 clamp(1rem, 4vw, 2.5rem)",
        }}
      >
        <span className="nx-skeleton" style={{ width: 132, height: 20 }} />
        <span style={{ flex: 1 }} />
        <span className="nx-skeleton hidden md:inline-block" style={{ width: 220, height: 14 }} />
        <span className="nx-skeleton" style={{ width: 118, height: 36, borderRadius: "var(--nx-r-pill)" }} />
      </div>

      {/* Hero-shaped block */}
      <div
        className="nx-container grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr]"
        style={{ gap: "clamp(1.6rem, 4vw, 3rem)", alignItems: "center", paddingTop: "clamp(2.6rem, 5vw, 3.8rem)" }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <span className="nx-skeleton" style={{ width: "38%", height: 12 }} />
          <span className="nx-skeleton" style={{ width: "86%", height: 44 }} />
          <span className="nx-skeleton" style={{ width: "64%", height: 44 }} />
          <span className="nx-skeleton" style={{ width: "72%", height: 16, marginTop: 6 }} />
          <span className="nx-skeleton" style={{ width: "52%", height: 16 }} />
          <span className="nx-skeleton" style={{ width: 168, height: 44, borderRadius: "var(--nx-r-pill)", marginTop: 12 }} />
        </div>
        <div className="nx-skeleton" style={{ aspectRatio: "3 / 2", width: "100%" }} />
      </div>

      {/* Tile-row block */}
      <div
        className="nx-container grid grid-cols-2 md:grid-cols-4"
        style={{ gap: 14, paddingTop: "clamp(2rem, 4vw, 3rem)", paddingBottom: "3rem" }}
      >
        {[0, 1, 2, 3].map((i) => (
          <span key={i} className="nx-skeleton" style={{ aspectRatio: "4 / 5", width: "100%" }} />
        ))}
      </div>
    </div>
  );
}
