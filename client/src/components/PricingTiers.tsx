import { Check } from "lucide-react";
import { StartIntakeButton } from "./StartIntakeButton";
import { cn } from "@/lib/utils";
import type { Tier } from "@/lib/protocols";

export function PricingTiers({
  tiers,
  productSlug,
  source,
  variant = "light",
}: {
  tiers: Tier[];
  productSlug: string;
  source: string;
  variant?: "light" | "dark";
}) {
  const isDark = variant === "dark";

  return (
    <div className="grid md:grid-cols-3 gap-4 md:gap-6">
      {tiers.map((tier) => {
        const isPopular = tier.badge === "MOST POPULAR" || tier.badge === "Most popular";
        const isBest = tier.badge === "BEST VALUE" || tier.badge === "Best value";

        return (
          <div
            key={tier.duration}
            className={cn(
              "relative rounded-2xl p-7 md:p-8 nx-card-lift",
              isDark
                ? "bg-background/[0.04] border border-foreground/15 text-foreground"
                : "bg-background border border-border text-foreground",
              isPopular && (isDark ? "border-primary/50" : "border-primary"),
              isBest && (isDark ? "border-primary/30" : "border-border")
            )}
            data-testid={`card-tier-${tier.duration}`}
          >
            {tier.badge && (
              <div className="absolute -top-3 left-7">
                <span className={cn(
                  "inline-block px-3 py-1 text-fluid-xs font-mono uppercase tracking-[0.15em] rounded-full",
                  isPopular ? "bg-primary text-primary-foreground" : "bg-background text-primary"
                )}>
                  {tier.badge}
                </span>
              </div>
            )}

            <div className="flex items-baseline justify-between mb-1">
              <div className="font-display text-fluid-lg uppercase tracking-tight">
                {tier.months} {tier.months === 1 ? "month" : "months"}
              </div>
              {tier.savings && (
                <div className={cn("text-fluid-xs font-mono uppercase tracking-[0.15em]", isDark ? "text-primary" : "text-foreground/60")}>
                  {tier.savings}
                </div>
              )}
            </div>

            <div className="flex items-baseline gap-2 mt-5 mb-2">
              <span className="font-display text-fluid-3xl tabular leading-none">${tier.pricePerMonth}</span>
              <span className={cn("text-fluid-sm", isDark ? "text-foreground/55" : "text-foreground/55")}>/month</span>
            </div>
            <div className={cn("text-fluid-xs font-mono uppercase tracking-[0.15em]", isDark ? "text-foreground/45" : "text-foreground/45")}>
              ${tier.totalPrice.toLocaleString()} billed up front · ships monthly
            </div>

            <ul className={cn("mt-6 space-y-2.5 text-fluid-sm border-t pt-6", isDark ? "border-foreground/10" : "border-border")}>
              {[
                "Physician consult included",
                "Compounded in 503A pharmacy",
                "Cold-chain shipping",
                tier.months >= 3 ? "Mid-cycle physician check-in" : "Free reschedule anytime",
                tier.months >= 6 ? "Quarterly bloodwork (add-on)" : null,
              ].filter(Boolean).map((feat) => (
                <li key={feat as string} className="flex items-start gap-2.5">
                  <Check className={cn("h-4 w-4 mt-0.5 shrink-0", isDark ? "text-primary" : "text-foreground/60")} strokeWidth={2.4} />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>

            <div className="mt-7">
              <StartIntakeButton
                size="md"
                source={`${source}_${tier.duration}`}
                productSlug={productSlug}
                variant={isPopular ? "primary" : (isDark ? "outline-dark" : "outline-light")}
                className="w-full"
              >
                Start with {tier.months}-month
              </StartIntakeButton>
            </div>
          </div>
        );
      })}
    </div>
  );
}
