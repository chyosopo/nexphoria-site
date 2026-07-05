import { createContext, useContext, useState, useCallback, useMemo, ReactNode } from "react";
import { pricing, priceAtCadence, CADENCE_DISCOUNTS, formatUSD, type CadenceKey } from "@/data/pricing";
import { stacks, computeStackPrice } from "@/data/stacks";
import { getStack as getFlagship } from "@/data/stacksCatalog";

/* ──────────────────────────────────────────────────────────────
   Nexphoria Cart — React Context + guarded sessionStorage.
   Cart survives navigation AND reloads within a browser session; if
   storage is unavailable (sandboxed iframe, private mode) it degrades
   to in-memory without erroring.

   Each item carries a billing cadence (1mo / 3mo / 12mo) which
   controls the per-month price the user actually pays.
   ────────────────────────────────────────────────────────────── */

export type CartItemType = "peptide" | "stack";

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
}

interface CartContextValue {
  items: CartItem[];
  lines: CartLine[];
  subtotal: number;
  totalSavings: number;
  itemCount: number;
  addPeptide: (slug: string, opts?: { qty?: number; cadence?: CadenceKey }) => void;
  addStack: (slug: string, opts?: { qty?: number; cadence?: CadenceKey }) => void;
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
        (i.type === "peptide" || i.type === "stack") &&
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
  const { lines, subtotal, totalSavings } = useMemo(() => {
    const lines: CartLine[] = items.map((item) => {
      const cadenceLabel = CADENCE_DISCOUNTS[item.cadence]?.label || "Monthly";
      if (item.type === "peptide") {
        const p = pricing[item.slug];
        const baseMonthly = p?.monthlyPrice || 0;
        const unitPrice = priceAtCadence(item.slug, item.cadence);
        const name = humanizePeptide(item.slug);
        const cadenceSavings = (baseMonthly - unitPrice) * item.qty;
        return {
          ...item,
          name,
          unitPrice,
          lineTotal: unitPrice * item.qty,
          savings: cadenceSavings > 0 ? cadenceSavings : undefined,
          cadenceLabel,
        };
      }
      // stack — priced straight from the flagship catalog (single source of truth)
      const flagship = getFlagship(item.slug);
      if (flagship) {
        const unitPrice = priceAtCadence(item.slug, item.cadence);
        const base = priceAtCadence(item.slug, "1mo");
        const cadenceSavings = (base - unitPrice) * item.qty;
        return {
          ...item,
          name: `${flagship.name} Protocol`,
          unitPrice,
          lineTotal: unitPrice * item.qty,
          savings: cadenceSavings > 0 ? cadenceSavings : undefined,
          cadenceLabel,
        };
      }
      // legacy fallback (unrouted paths only)
      const stack = stacks.find((s) => s.slug === item.slug);
      if (!stack) {
        return { ...item, name: item.slug, unitPrice: 0, lineTotal: 0, cadenceLabel };
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
      };
    });
    const subtotal = lines.reduce((acc, l) => acc + l.lineTotal, 0);
    const totalSavings = lines.reduce((acc, l) => acc + (l.savings || 0), 0);
    return { lines, subtotal, totalSavings };
  }, [items]);

  const itemCount = items.reduce((acc, i) => acc + i.qty, 0);

  const value: CartContextValue = {
    items,
    lines,
    subtotal,
    totalSavings,
    itemCount,
    addPeptide,
    addStack,
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
