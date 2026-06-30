import { createContext, useContext, useState, useCallback, useMemo, ReactNode } from "react";
import { pricing, formatUSD } from "@/data/pricing";
import { stacks, computeStackPrice } from "@/data/stacks";

/* ──────────────────────────────────────────────────────────────
   Nexphoria Cart — React Context (NO localStorage — blocked in iframe)
   Cart survives page navigation within a session; not across reloads.
   ────────────────────────────────────────────────────────────── */

export type CartItemType = "peptide" | "stack";

export interface CartItem {
  /** unique id: peptide slug OR stack slug */
  slug: string;
  type: CartItemType;
  qty: number;
}

export interface CartLine extends CartItem {
  name: string;
  unitPrice: number;
  lineTotal: number;
  /** for stacks: how much you save vs buying components individually */
  savings?: number;
}

interface CartContextValue {
  items: CartItem[];
  lines: CartLine[];
  subtotal: number;
  totalSavings: number;
  itemCount: number;
  addPeptide: (slug: string, qty?: number) => void;
  addStack: (slug: string, qty?: number) => void;
  updateQty: (slug: string, type: CartItemType, qty: number) => void;
  removeItem: (slug: string, type: CartItemType) => void;
  clear: () => void;
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const addPeptide = useCallback((slug: string, qty: number = 1) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.slug === slug && i.type === "peptide");
      if (existing) {
        return prev.map((i) => (i.slug === slug && i.type === "peptide" ? { ...i, qty: i.qty + qty } : i));
      }
      return [...prev, { slug, type: "peptide", qty }];
    });
    setIsOpen(true);
  }, []);

  const addStack = useCallback((slug: string, qty: number = 1) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.slug === slug && i.type === "stack");
      if (existing) {
        return prev.map((i) => (i.slug === slug && i.type === "stack" ? { ...i, qty: i.qty + qty } : i));
      }
      return [...prev, { slug, type: "stack", qty }];
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
      if (item.type === "peptide") {
        const p = pricing[item.slug];
        const unitPrice = p?.monthlyPrice || 0;
        const name = humanizePeptide(item.slug);
        return {
          ...item,
          name,
          unitPrice,
          lineTotal: unitPrice * item.qty,
        };
      }
      // stack
      const stack = stacks.find((s) => s.slug === item.slug);
      if (!stack) {
        return { ...item, name: item.slug, unitPrice: 0, lineTotal: 0 };
      }
      const { sum, bundle, savings } = computeStackPrice(stack, pricing);
      return {
        ...item,
        name: `${stack.name} Stack`,
        unitPrice: bundle,
        lineTotal: bundle * item.qty,
        savings: savings * item.qty,
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
