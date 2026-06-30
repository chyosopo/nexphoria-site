import { useState } from "react";
import { Plus, Minus } from "lucide-react";

type QA = { q: string; a: string };

export function FAQ({ items, variant = "light" }: { items: QA[]; variant?: "light" | "dark" }) {
  const [open, setOpen] = useState<number | null>(0);
  const isDark = variant === "dark";

  return (
    <div className={isDark ? "divide-y divide-border" : "divide-y divide-border"}>
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={i}>
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              className="w-full text-left py-6 md:py-7 flex items-start justify-between gap-6 group"
              data-testid={`button-faq-${i}`}
            >
              <span className="font-display text-fluid-lg md:text-fluid-xl leading-tight tracking-tight pr-2">
                {item.q}
              </span>
              <span className={`shrink-0 mt-1 h-9 w-9 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-105 ${
                isOpen
                  ? "bg-primary text-primary-foreground rotate-90"
                  : isDark ? "border border-foreground/25 text-foreground/70 group-hover:border-primary/50" : "border border-border text-foreground/70 group-hover:border-primary/50"
              }`}>
                {isOpen ? <Minus className="h-4 w-4" strokeWidth={2.2} /> : <Plus className="h-4 w-4" strokeWidth={2.2} />}
              </span>
            </button>
            <div
              className="overflow-hidden transition-all duration-500 ease-[cubic-bezier(.2,.8,.2,1)]"
              style={{ maxHeight: isOpen ? "500px" : "0px", opacity: isOpen ? 1 : 0 }}
            >
              <div className={`pb-7 pr-14 text-fluid-base leading-relaxed ${isDark ? "text-foreground/75" : "text-foreground/75"}`}>
                {item.a}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
