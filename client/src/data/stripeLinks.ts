/* ═══ STRIPE PAYMENT LINKS — gift one-time payments ═══
   The static-site-compatible Stripe surface: hosted Payment Links, one per
   giftable SKU, created in the Nexphoria Stripe account (acct_1TxxpZ3ToKa8JOSh).
   This map is the ONLY join between the site and Stripe — fill a URL and the
   gift give-flow upgrades from concierge mailto to real checkout for that
   SKU; leave it empty and the honest concierge path renders instead. No key
   material lives here (Payment Link URLs are public by design).

   SCOPE LAW: gifts and panels ONLY. Protocol subscriptions stay behind the
   physician gate (Bask/MDI) — never add self-serve subscription links here.
   PHI LAW: nothing patient-related is ever passed to Stripe — the link
   carries only the SKU. The recipient's intake happens on our side of the
   fence, after payment, exactly as the gift flow states. */

export type GiftSkuKey =
  | `stack:${string}:3mo`
  | `stack:${string}:12mo`
  | `panel:${string}:once`;

/** slug/term → hosted Stripe Payment Link. Empty string = not yet created. */
export const STRIPE_GIFT_LINKS: Partial<Record<GiftSkuKey, string>> = {
  // ── protocols (one-time gift covers; totals derived from the cadence engine) ──
  // "stack:wolverine:3mo":  "",   // $686
  // "stack:wolverine:12mo": "",   // $2,260
  // "stack:glow:3mo":       "",   // $584
  // "stack:glow:12mo":      "",   // $1,923
  // "stack:ascend:3mo":     "",   // $762
  // "stack:ascend:12mo":    "",   // $2,512
  // "stack:lucidity:3mo":   "",   // $660
  // "stack:lucidity:12mo":  "",   // $2,176
  // "stack:meridian:3mo":   "",   // $1,145
  // "stack:meridian:12mo":  "",   // $3,772
  // "stack:threshold:3mo":  "",   // $507
  // "stack:threshold:12mo": "",   // $1,672
  // ── bloodwork panels (one-time) ──
  // "panel:basic:once":     "",   // $99
  // "panel:full:once":      "",   // $199
  // "panel:elite:once":     "",   // $399
};

/** The live Payment Link for a gift SKU, or null when concierge should render. */
export function stripeGiftLink(kind: "stack" | "panel", slug: string, termKey: string): string | null {
  const key = `${kind}:${slug}:${kind === "panel" ? "once" : termKey}` as GiftSkuKey;
  const url = STRIPE_GIFT_LINKS[key];
  return url && url.startsWith("https://") ? url : null;
}
