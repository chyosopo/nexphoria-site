import { createContext, useContext, useState, useCallback, useMemo, ReactNode } from "react";
import { pricing, priceAtCadence, CADENCE_DISCOUNTS, bundleDiscount, formatUSD, type CadenceKey } from "@/data/pricing";
import { stacks, computeStackPrice } from "@/data/stacks";
import { getStack as getFlagship } from "@/data/stacksCatalog";
import { labItem, LAB_KIT } from "@/data/labs";
import { getSolo } from "@/data/soloCatalog";

/* ──────────────────────────────────────────────────────────────
   Nexphoria Cart — React Context + guarded sessionStorage.
   Cart survives navigation AND reloads within a browser session; if
   storage is unavailable (sandboxed iframe, private mode) it degrades
   to in-memory without erroring.

   Each item carries a billing cadence (1mo / 3mo / 12mo) which
   controls the per-month price the user actually pays.
   ────────────────────────────────────────────────────────────── */

/* "lab": the blood panel or an add-on test (data/labs). One-time, no term;
   the panel itself is complimentary whenever a medicine is in the cart. */
export type CartItemType = "peptide" | "stack" | "lab";

export interface CartItem {
  /** unique id: peptide slug OR stack slug */
  slug: string;
  type: CartItemType;
  qty: number;
  /** billing cadence — defaults to 1mo */
  cadence: CadenceKey;
}

export interface CartLine extends CartItem {
  name: string;
  unitPrice: number;
  lineTotal: number;
  /** how much you save vs 1mo cadence (for stacks: includes bundle savings) */
  savings?: number;
  cadenceLabel: string;
  /** a one-time line (lab kit or add-on): no term, no cadence control */
  oneTime?: boolean;
  /** the panel, complimentary because a medicine is in the cart */
  complimentary?: boolean;
  /** months in the term (1 for one-time lines) */
  months: number;
  /** what this line costs for the whole term, paid up front */
  termTotal: number;
}

interface CartContextValue {
  items: CartItem[];
  lines: CartLine[];
  subtotal: number;
  totalSavings: number;
  /** multi-peptide bundle discount (2=10%, 3=12%, 4+=15%) already netted out of subtotal */
  bundleSavings: number;
  /** the whole figure, paid up front: every term total plus one-time lines */
  dueToday: number;
  /** the last line added, for the drawer's confirmation moment */
  lastAdded: { slug: string; type: CartItemType; at: number } | null;
  itemCount: number;
  addPeptide: (slug: string, opts?: { qty?: number; cadence?: CadenceKey }) => void;
  addStack: (slug: string, opts?: { qty?: number; cadence?: CadenceKey }) => void;
  /** the panel ("panel") or an add-on ("addon:<slug>"); one per cart */
  addLab: (slug: string) => void;
  updateQty: (slug: string, type: CartItemType, qty: number) => void;
  updateCadence: (slug: string, type: CartItemType, cadence: CadenceKey) => void;
  removeItem: (slug: string, type: CartItemType) => void;
  clear: () => void;
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

/* Session-scoped cart persistence. sessionStorage can throw in sandboxed
   iframes and private modes, so every access is guarded — worst case the
   cart silently falls back to in-memory (the previous behavior). */
const CART_STORAGE_KEY = "nx-cart-v1";

function readStoredCart(): CartItem[] {
  try {
    const raw = window.sessionStorage.getItem(CART_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (i): i is CartItem =>
        i && typeof i.slug === "string" &&
        (i.type === "peptide" || i.type === "stack" || i.type === "lab") &&
        typeof i.qty === "number" && i.qty > 0,
    );
  } catch {
    return [];
  }
}

function writeStoredCart(items: CartItem[]) {
  try {
    window.sessionStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  } catch {
    /* storage unavailable — in-memory cart only */
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItemsRaw] = useState<CartItem[]>(readStoredCart);
  const [isOpen, setIsOpen] = useState(false);
  const [lastAdded, setLastAdded] = useState<{ slug: string; type: CartItemType; at: number } | null>(null);

  const setItems = useCallback((update: CartItem[] | ((prev: CartItem[]) => CartItem[])) => {
    setItemsRaw((prev) => {
      const next = typeof update === "function" ? update(prev) : update;
      writeStoredCart(next);
      return next;
    });
  }, []);

  const addPeptide = useCallback((slug: string, opts?: { qty?: number; cadence?: CadenceKey }) => {
    const qty = opts?.qty ?? 1;
    const cadence = opts?.cadence ?? "3mo"; // default to the most-popular cadence
    setItems((prev) => {
      const existing = prev.find((i) => i.slug === slug && i.type === "peptide");
      if (existing) {
        return prev.map((i) => (i.slug === slug && i.type === "peptide" ? { ...i, qty: i.qty + qty, cadence } : i));
      }
      return [...prev, { slug, type: "peptide", qty, cadence }];
    });
    setLastAdded({ slug, type: "peptide", at: Date.now() });
    setIsOpen(true);
  }, []);

  const addStack = useCallback((slug: string, opts?: { qty?: number; cadence?: CadenceKey }) => {
    const qty = opts?.qty ?? 1;
    const cadence = opts?.cadence ?? "3mo";
    setItems((prev) => {
      const existing = prev.find((i) => i.slug === slug && i.type === "stack");
      if (existing) {
        return prev.map((i) => (i.slug === slug && i.type === "stack" ? { ...i, qty: i.qty + qty, cadence } : i));
      }
      return [...prev, { slug, type: "stack", qty, cadence }];
    });
    setLastAdded({ slug, type: "stack", at: Date.now() });
    setIsOpen(true);
  }, []);

  const addLab = useCallback((slug: string) => {
    if (!labItem(slug)) return;
    setItems((prev) => (prev.some((i) => i.slug === slug && i.type === "lab") ? prev : [...prev, { slug, type: "lab", qty: 1, cadence: "1mo" }]));
    setLastAdded({ slug, type: "lab", at: Date.now() });
    setIsOpen(true);
  }, []);

  const updateQty = useCallback((slug: string, type: CartItemType, qty: number) => {
    if (qty <= 0) {
      setItems((prev) => prev.filter((i) => !(i.slug === slug && i.type === type)));
      return;
    }
    setItems((prev) => prev.map((i) => (i.slug === slug && i.type === type ? { ...i, qty } : i)));
  }, []);

  const updateCadence = useCallback((slug: string, type: CartItemType, cadence: CadenceKey) => {
    setItems((prev) => prev.map((i) => (i.slug === slug && i.type === type ? { ...i, cadence } : i)));
  }, []);

  const removeItem = useCallback((slug: string, type: CartItemType) => {
    setItems((prev) => prev.filter((i) => !(i.slug === slug && i.type === type)));
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback(() => setIsOpen((v) => !v), []);

  /** Derive line items + totals from items + data */
  const { lines, subtotal, totalSavings, bundleSavings, dueToday } = useMemo(() => {
    const hasMedicine = items.some((i) => i.type === "peptide" || i.type === "stack");
    const lines: CartLine[] = items.map((item) => {
      const cadenceLabel = CADENCE_DISCOUNTS[item.cadence]?.label || "Monthly";
      if (item.type === "lab") {
        const lab = labItem(item.slug);
        const complimentary = lab?.kind === "panel" && hasMedicine;
        const unitPrice = complimentary ? 0 : (lab?.price ?? 0);
        return {
          ...item, qty: 1, name: lab?.name ?? item.slug, unitPrice, lineTotal: unitPrice,
          savings: complimentary ? LAB_KIT.price : undefined, cadenceLabel: "One time", oneTime: true, complimentary,
          months: 1, termTotal: unitPrice,
        };
      }
      if (item.type === "peptide") {
        // The one-month figure from the same engine the cadence price comes
        // from, so "you save" can never quote the legacy price table.
        const baseMonthly = priceAtCadence(item.slug, "1mo") || pricing[item.slug]?.monthlyPrice || 0;
        const unitPrice = priceAtCadence(item.slug, item.cadence);
        const name = getSolo(item.slug)?.name ?? humanizePeptide(item.slug);
        const cadenceSavings = (baseMonthly - unitPrice) * item.qty;
        const months = CADENCE_DISCOUNTS[item.cadence]?.months ?? 1;
        return {
          ...item,
          name,
          unitPrice,
          lineTotal: unitPrice * item.qty,
          savings: cadenceSavings > 0 ? cadenceSavings : undefined,
          cadenceLabel,
          months, termTotal: unitPrice * item.qty * months,
        };
      }
      // stack — priced straight from the flagship catalog (single source of truth)
      const flagship = getFlagship(item.slug);
      if (flagship) {
        const unitPrice = priceAtCadence(item.slug, item.cadence);
        const base = priceAtCadence(item.slug, "1mo");
        const cadenceSavings = (base - unitPrice) * item.qty;
        const months = CADENCE_DISCOUNTS[item.cadence]?.months ?? 1;
        return {
          ...item,
          name: `${flagship.name} Protocol`,
          unitPrice,
          lineTotal: unitPrice * item.qty,
          savings: cadenceSavings > 0 ? cadenceSavings : undefined,
          cadenceLabel,
          months, termTotal: unitPrice * item.qty * months,
        };
      }
      // legacy fallback (unrouted paths only)
      const stack = stacks.find((s) => s.slug === item.slug);
      if (!stack) {
        return { ...item, name: item.slug, unitPrice: 0, lineTotal: 0, cadenceLabel, months: 1, termTotal: 0 };
      }
      const { bundle, savings: bundleSavings } = computeStackPrice(stack, pricing);
      const disc = CADENCE_DISCOUNTS[item.cadence].pct;
      const unitPrice = Math.round(bundle * (1 - disc));
      const cadenceSavings = (bundle - unitPrice) * item.qty;
      const totalSavings = bundleSavings * item.qty + cadenceSavings;
      return {
        ...item,
        name: `${stack.name} Stack`,
        unitPrice,
        lineTotal: unitPrice * item.qty,
        savings: totalSavings > 0 ? totalSavings : undefined,
        cadenceLabel,
        months: CADENCE_DISCOUNTS[item.cadence]?.months ?? 1, termTotal: unitPrice * item.qty * (CADENCE_DISCOUNTS[item.cadence]?.months ?? 1),
      };
    });
    const rawSubtotal = lines.reduce((acc, l) => acc + l.lineTotal, 0);
    // Multi-peptide bundle discount — the same schedule the stack builder
    // advertises (2=10%, 3=12%, 4+=15%), applied to the peptide lines only
    // (flagship stacks already carry their own bundle pricing).
    const distinctPeptides = new Set(lines.filter((l) => l.type === "peptide").map((l) => l.slug)).size;
    const peptideSubtotal = lines.filter((l) => l.type === "peptide").reduce((acc, l) => acc + l.lineTotal, 0);
    const bundleSavings = Math.round(peptideSubtotal * bundleDiscount(distinctPeptides));
    const subtotal = rawSubtotal - bundleSavings;
    const totalSavings = lines.reduce((acc, l) => acc + (l.savings || 0), 0) + bundleSavings;
    // The whole figure: every term paid up front, one-time lines once, the
    // bundle discount applied across the term the same way it is monthly.
    const rawDue = lines.reduce((acc, l) => acc + l.termTotal, 0);
    const peptideDue = lines.filter((l) => l.type === "peptide").reduce((acc, l) => acc + l.termTotal, 0);
    const dueToday = rawDue - Math.round(peptideDue * bundleDiscount(distinctPeptides));
    return { lines, subtotal, totalSavings, bundleSavings, dueToday };
  }, [items]);

  const itemCount = items.reduce((acc, i) => acc + i.qty, 0);

  const value: CartContextValue = {
    items,
    lines,
    subtotal,
    totalSavings,
    bundleSavings,
    dueToday,
    lastAdded,
    itemCount,
    addPeptide,
    addStack,
    addLab,
    updateQty,
    updateCadence,
    removeItem,
    clear,
    isOpen,
    open,
    close,
    toggle,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used within CartProvider");
  }
  return ctx;
}

/* ──────────────────────────────────────────────────────────────
   Helpers
   ────────────────────────────────────────────────────────────── */

const peptideNameMap: Record<string, string> = {
  "bpc-157": "BPC-157",
  "tb-500": "TB-500",
  "ghk-cu": "GHK-Cu",
  "semax": "Semax",
  "selank": "Selank",
  "tesamorelin": "Tesamorelin",
  "ipamorelin": "Ipamorelin",
  "cjc-1295": "CJC-1295",
  "epitalon": "Epitalon",
  "thymosin-a1": "Thymosin α-1",
  "nad-plus": "NAD+",
  "mots-c": "MOTS-c",
  "dsip": "DSIP",
  "tirzepatide": "Tirzepatide",
  "retatrutide": "Retatrutide",
  "aod-9604": "AOD-9604",
};

function humanizePeptide(slug: string): string {
  return peptideNameMap[slug] || slug;
}

export { formatUSD };
