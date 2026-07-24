/**
 * Nexphoria analytics scaffold.
 *
 * Single choke-point for product analytics. Today it logs to the console and
 * dispatches a DOM CustomEvent (`nx:analytics`) so anything can subscribe
 * without a vendor SDK. When PostHog / Plausible / Segment is wired up, drop
 * the SDK call into `track()` and every existing call site lights up — no
 * caller changes required.
 *
 * NOTE: deliberately avoids localStorage/sessionStorage/cookies because the
 * preview iframe blocks them. Keep it stateless and in-memory.
 */

export type AnalyticsProps = Record<string, unknown>;

export function track(event: string, props?: AnalyticsProps): void {
  if (typeof window === "undefined") return;
  try {
    window.dispatchEvent(
      new CustomEvent("nx:analytics", { detail: { event, props: props ?? {} } }),
    );
    if (import.meta.env.DEV) {
      // eslint-disable-next-line no-console
      console.log("[nx]", event, props ?? {});
    }
    // Vendor forward — a no-op until a measurement ID is configured (see initAnalytics).
    const w = window as unknown as { gtag?: (...a: unknown[]) => void; posthog?: { capture: (e: string, p?: AnalyticsProps) => void } };
    w.gtag?.("event", event, props ?? {});
    w.posthog?.capture(event, props);
  } catch {
    /* analytics must never break the UI */
  }
}

/**
 * One-time vendor bootstrap. Reads VITE_GA4_ID at build time; if unset, this is
 * a complete no-op — the site ships with zero third-party analytics until a real
 * ID is provided. When set, it loads gtag.js and configures GA4 with
 * send_page_view disabled, because our own route-change page_view event owns
 * that (so SPA navigations aren't double-counted).
 */
export function initAnalytics(): void {
  if (typeof window === "undefined") return;
  const id = import.meta.env.VITE_GA4_ID as string | undefined;
  if (!id) return;
  const w = window as unknown as { dataLayer?: unknown[]; gtag?: (...a: unknown[]) => void };
  w.dataLayer = w.dataLayer || [];
  // eslint-disable-next-line prefer-rest-params
  w.gtag = function gtag() { w.dataLayer!.push(arguments); };
  const s = document.createElement("script");
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
  document.head.appendChild(s);
  w.gtag("js", new Date());
  w.gtag("config", id, { send_page_view: false });
}

/** Convenience helpers for the canonical events. */
export const analytics = {
  intakeStarted: (props?: AnalyticsProps) => track("intake_started", props),
  goalSelected: (props?: AnalyticsProps) => track("goal_selected", props),
  productViewed: (props?: AnalyticsProps) => track("product_viewed", props),
  comparisonViewed: (props?: AnalyticsProps) => track("comparison_viewed", props),
  ebookRequested: (props?: AnalyticsProps) => track("ebook_requested", props),
};
