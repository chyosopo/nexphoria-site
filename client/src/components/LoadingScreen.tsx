export function LoadingScreen() {
  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ backgroundColor: "var(--nx-bg-cream)" }}
      aria-live="polite"
      aria-label="Loading"
    >
      <span
        className="animate-pulse"
        style={{
          display: "inline-block",
          width: "10px",
          height: "10px",
          borderRadius: "50%",
          backgroundColor: "var(--nx-fg)",
          opacity: 0.6,
        }}
      />
    </div>
  );
}
