/* ═══ ROUTE ERROR BOUNDARY — E32 ═══
   Catches render errors and lazy-chunk load failures (the classic
   stale-deploy case) without blanking the whole app. Chunk failures
   offer a one-tap reload, which fetches the new hashed bundles.
   Porcelain voice; tokens only. */
import { Component, type ReactNode } from "react";
import { F, S } from "@/lib/typography";

interface Props { children: ReactNode }
interface State { error: Error | null }

function isChunkError(e: Error) {
  return /dynamically imported module|Loading chunk|import\(\)/i.test(e.message ?? "");
}

export class RouteErrorBoundary extends Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error) {
    // eslint-disable-next-line no-console
    console.error("[route-error]", error);
  }

  render() {
    const { error } = this.state;
    if (!error) return this.props.children;

    const stale = isChunkError(error);
    return (
      <div style={{ minHeight: "70vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "3rem 1.5rem", textAlign: "center" }} data-testid="route-error">
        <div style={{ maxWidth: 460 }}>
          <p style={{ fontFamily: F, fontSize: 11, fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--nx-cobalt)" }}>
            {stale ? "New version available" : "Something interrupted"}
          </p>
          <h1 style={{ fontFamily: S, fontWeight: 500, fontSize: "var(--nx-t-h2)", color: "var(--nx-fg)", lineHeight: 1.1, marginTop: "0.8rem" }}>
            {stale ? "The site was just updated." : "This page hit an error."}
          </h1>
          <p style={{ fontFamily: F, fontSize: "var(--nx-t-base)", lineHeight: 1.6, color: "var(--nx-fg-graphite)", marginTop: "0.8rem" }}>
            {stale
              ? "Reload once to pick up the latest version — nothing you entered elsewhere is affected."
              : "Reloading usually clears it. If it persists, the rest of the site still works."}
          </p>
          <button
            onClick={() => window.location.reload()}
            style={{ fontFamily: F, fontWeight: 600, fontSize: "var(--nx-t-base)", background: "var(--nx-cobalt)", color: "var(--nx-ceramic)", border: "none", borderRadius: "var(--nx-r-pill)", padding: "13px 26px", marginTop: "1.4rem", cursor: "pointer" }}
            data-testid="route-error-reload"
          >
            Reload the page
          </button>
        </div>
      </div>
    );
  }
}
