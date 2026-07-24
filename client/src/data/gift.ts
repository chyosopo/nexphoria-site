/* ═══ THE GIFT — data + share-link codec (Chiya 2026-07-14, hone.com
   "Gift of Hone" grammar). What can truthfully be gifted here is the
   COVERAGE: a one-time payment for a protocol term or a bloodwork panel.
   The recipient still completes their own intake; their own physician
   reviews their labs and can decline — in which case the sitewide promise
   applies (you pay only if prescribed → an unprescribed gift is refunded).
   Every price is DERIVED from the canonical catalogs; the share link
   carries only identifiers and a first name — never a price. */
import { FLAGSHIP_STACKS, PANELS, type PanelTier } from "@/data/stacksCatalog";

export type GiftTerm = "3mo" | "12mo";

export const TERM_LABELS: Record<GiftTerm, string> = {
  "3mo": "3-month supply",
  "12mo": "12-month supply",
};

export interface GiftStack {
  kind: "stack";
  slug: string;
  name: string;
  tagline: string;
  bestFor: string;
  /** one-time totals straight from the cadence engine */
  terms: { key: GiftTerm; label: string; total: number }[];
}

export interface GiftPanel {
  kind: "panel";
  slug: string; // tier, lowercased
  name: string;
  tagline: string;
  bestFor: string;
  terms: { key: "once"; label: string; total: number }[];
}

export type GiftItem = GiftStack | GiftPanel;

/** Non-gated flagship protocols with real 3- and 12-month one-time totals. */
export function giftableStacks(): GiftStack[] {
  return FLAGSHIP_STACKS.filter((s) => !s.gated && s.cadences.length > 0).map((s) => {
    const c3 = s.cadences.find((c) => c.key === "3mo");
    const c12 = s.cadences.find((c) => c.key === "12mo");
    return {
      kind: "stack" as const,
      slug: s.slug,
      name: `The ${s.name} protocol`,
      tagline: s.tagline,
      bestFor: s.bestFor,
      terms: [
        ...(c3 ? [{ key: "3mo" as const, label: TERM_LABELS["3mo"], total: c3.total }] : []),
        ...(c12 ? [{ key: "12mo" as const, label: TERM_LABELS["12mo"], total: c12.total }] : []),
      ],
    };
  });
}

/** The three bloodwork panels — already one-time prices. */
export function giftablePanels(): GiftPanel[] {
  return PANELS.map((p) => ({
    kind: "panel" as const,
    slug: p.tier.toLowerCase(),
    name: `The ${p.tier} panel`,
    tagline: p.summary,
    bestFor: `Retested ${p.retest.toLowerCase()}.`,
    terms: [{ key: "once" as const, label: "One draw", total: p.price }],
  }));
}

export function allGiftItems(): GiftItem[] {
  return [...giftableStacks(), ...giftablePanels()];
}

export function findGiftItem(kind: string, slug: string): GiftItem | null {
  return (
    allGiftItems().find((g) => g.kind === kind && g.slug === slug) ?? null
  );
}

/* ── Share-link codec ──
   /gift/claim?item=stack:glow&term=12mo&from=Ava
   Identifiers only. The claim page re-derives everything (name, price)
   from the catalog; an unknown item or term renders the invalid state.
   `from` is a display-only first name, length-capped. */
export interface GiftAsk {
  item: GiftItem;
  termKey: string;
  termLabel: string;
  total: number;
  from: string | null;
}

export function encodeGiftAsk(kind: string, slug: string, termKey: string, from: string): string {
  const p = new URLSearchParams();
  p.set("item", `${kind}:${slug}`);
  p.set("term", termKey);
  const name = from.trim().slice(0, 24);
  if (name) p.set("from", name);
  return p.toString();
}

export function decodeGiftAsk(search: string): GiftAsk | null {
  const p = new URLSearchParams(search.startsWith("?") ? search : `?${search}`);
  const [kind, slug] = (p.get("item") ?? "").split(":");
  if (!kind || !slug) return null;
  const item = findGiftItem(kind, slug);
  if (!item) return null;
  const termKey = p.get("term") ?? item.terms[0]?.key;
  const term = item.terms.find((t) => t.key === termKey);
  if (!term) return null;
  const rawFrom = (p.get("from") ?? "").trim().slice(0, 24);
  return {
    item,
    termKey: term.key,
    termLabel: term.label,
    total: term.total,
    from: rawFrom || null,
  };
}

/** Panel tier helper for display ("Basic" from "basic"). */
export function panelTierFromSlug(slug: string): PanelTier | null {
  const t = PANELS.find((p) => p.tier.toLowerCase() === slug);
  return t ? t.tier : null;
}
