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
    // eslint-disable-next-line no-console
    console.log("[nx]", event, props ?? {});
    // ── Vendor drop-in goes here, e.g.: ──
    // window.posthog?.capture(event, props);
    // window.plausible?.(event, { props });
  } catch {
    /* analytics must never break the UI */
  }
}

/** Convenience helpers for the canonical events. */
export const analytics = {
  intakeStarted: (props?: AnalyticsProps) => track("intake_started", props),
  goalSelected: (props?: AnalyticsProps) => track("goal_selected", props),
  productViewed: (props?: AnalyticsProps) => track("product_viewed", props),
  comparisonViewed: (props?: AnalyticsProps) => track("comparison_viewed", props),
  ebookRequested: (props?: AnalyticsProps) => track("ebook_requested", props),
};
