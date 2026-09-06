/**
 * StartIntakeButton — the single intake ADAPTER for the site.
 *
 * Current behavior: every CTA leads to the medicines shelf (`/peptides`). The
 * guided quiz/assessment funnel was retired in the 2026-09-05 cut to the spine
 * (pure browse), so "Get started" opens the shelf. The route still preserves
 * `?source=` and `?stack=` for analytics, and the click is POSTed to
 * /api/intake-click.
 *
 * When a real Rx/telehealth partner is wired up later, swap this single file to
 * deep-link into the partner's intake.
 */

import { useLocation } from "wouter";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { analytics } from "@/lib/analytics";

/* The site's standing call to action. This pointed at "/peptides" — so
   every "Get started" on the site, in the nav and the phone sheet, handed
   the reader a shelf of 26 medicines and asked them to already know which
   one they wanted. It is the assessment now (Chiya 2026-09-06, after
   enhanced.com, whose CTA is the quiz): three questions, then a
   recommendation, with browsing kept one tap away on the quiz's first
   screen. */
const INTAKE_ROUTE = "/quiz";

type Variant = "primary" | "outline-light" | "outline-dark" | "ghost" | "ghost-dark";
type Size = "sm" | "md" | "lg" | "xl";

const variantClasses: Record<Variant, string> = {
  primary: "nx-cta-acid",
  "outline-light": "border border-border bg-transparent text-foreground hover:bg-background/5",
  "outline-dark": "nx-cta-outline-dark",
  ghost: "bg-transparent text-foreground hover:bg-background/5",
  "ghost-dark": "bg-transparent text-foreground hover:bg-background/10",
};

const sizeClasses: Record<Size, string> = {
  sm: "px-4 py-2 text-fluid-sm",
  md: "px-5 py-2.5 text-fluid-sm",
  lg: "px-6 py-3.5 text-fluid-base",
  xl: "px-8 py-4 text-fluid-base",
};

export function StartIntakeButton({
  productSlug,
  source,
  variant = "primary",
  size = "lg",
  className,
  style,
  children = "Get started",
  showArrow = true,
}: {
  productSlug?: string;
  source?: string;
  variant?: Variant;
  size?: Size;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  showArrow?: boolean;
}) {
  const [, setLocation] = useLocation();

  // Build a query string preserving stack + source so /assessment can personalize.
  const params = new URLSearchParams();
  if (productSlug) params.set("stack", productSlug);
  if (source) params.set("source", source);
  const query = params.toString();
  const target = query ? `${INTAKE_ROUTE}?${query}` : INTAKE_ROUTE;

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    // Product analytics choke-point
    analytics.intakeStarted({ productSlug: productSlug || null, source: source || null });
    // Fire and forget — track the click for funnel analytics
    fetch("/api/intake-click", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productSlug: productSlug || null, source: source || null }),
    }).catch(() => {});
    // Internal navigation via wouter hash router
    setLocation(target);
    // Scroll to top so the assessment opens fresh
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
    }
  };

  // NOTE: the href is BASE-RELATIVE (no leading slash) so it resolves against
  // the runtime <base> tag — correct at any route depth on both hosting modes.
  // Normal clicks are handled by onClick (analytics + wouter navigation); the
  // href covers middle-click / open-in-new-tab / no-JS.
  return (
    <a
      href={target.slice(1)}
      onClick={handleClick}
      style={style}
      data-testid={`button-intake-${source || productSlug || "generic"}`}
      className={cn(
        "group inline-flex items-center justify-center gap-2 font-medium rounded-full transition-all",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
        "active:scale-[0.98]",
        variantClasses[variant],
        sizeClasses[size],
        className,
      )}
    >
      <span>{children}</span>
      {showArrow && (
        <ArrowUpRight
          className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          strokeWidth={2.2}
        />
      )}
    </a>
  );
}
