import { ShoppingBag } from "lucide-react";
import { useCart } from "@/contexts/CartProvider";

/* Cart icon with item-count badge — appears in Nav */

export function CartIconButton({ className = "" }: { className?: string }) {
  const { itemCount, open } = useCart();

  return (
    <button
      onClick={open}
      className={`relative p-2 -m-2 transition-colors hover:bg-black/5 rounded ${className}`}
      aria-label={`Open cart, ${itemCount} ${itemCount === 1 ? "item" : "items"}`}
      data-testid="button-open-cart"
      style={{ color: "#0E2447" }}
    >
      <ShoppingBag size={18} strokeWidth={1.5} />
      {itemCount > 0 ? (
        <span
          className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 flex items-center justify-center text-[10px] rounded-full"
          style={{
            background: "#1F5FD0",
            color: "#F2F7FD",
            fontFamily: "'General Sans', system-ui, sans-serif",
            fontWeight: 600,
            letterSpacing: 0,
          }}
          data-testid="text-cart-count"
        >
          {itemCount}
        </span>
      ) : null}
    </button>
  );
}
