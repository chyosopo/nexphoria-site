import { memo } from "react";
import { Link } from "wouter";
import { ArrowUpRight } from "lucide-react";
import type { Stack } from "@/lib/protocols";
import { MoleculeIcon, moleculeVariantFor } from "./MoleculeIcon";
import { getPeptidesForStack } from "@/lib/protocols";

function StackCardInner({ stack, variant = "light" }: { stack: Stack; variant?: "light" | "dark" }) {
  const peptides = getPeptidesForStack(stack);
  const isDark = variant === "dark";

  return (
    <Link href={`/stacks/${stack.slug}`} data-testid={`card-stack-${stack.slug}`}>
      <article className={`group relative h-full rounded-3xl p-8 md:p-10 nx-card-lift nx-lift-premium overflow-hidden cursor-pointer ${
        isDark
          ? "bg-background/[0.04] border border-foreground/15 hover:border-primary/40"
          : "bg-background border border-border hover:border-border"
      }`}>
        {/* Top row — eyebrow + arrow */}
        <div className="flex items-start justify-between mb-8">
          <div className={`nx-eyebrow ${isDark ? "text-foreground/55" : "text-foreground/55"}`}>
            {stack.hero.eyebrow}
          </div>
          <ArrowUpRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={1.8} />
        </div>

        {/* Headline */}
        <h3 className="font-display text-fluid-3xl leading-[0.95] tracking-tight text-balance mb-4">
          {stack.name}
        </h3>
        <p className={`text-fluid-base leading-relaxed mb-8 max-w-md ${isDark ? "text-foreground/70" : "text-foreground/70"}`}>
          {stack.tagline}
        </p>

        {/* Peptide chips with molecule icons */}
        <div className="flex flex-wrap gap-2 mb-8">
          {peptides.map((p) => (
            <span
              key={p.slug}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-fluid-xs font-mono uppercase tracking-[0.1em] ${
                isDark ? "bg-background/8 border border-foreground/15" : "bg-card border border-border"
              }`}
            >
              <MoleculeIcon variant={moleculeVariantFor(p.slug)} size={14} className={isDark ? "text-primary" : "text-foreground"} />
              {p.name}
            </span>
          ))}
        </div>

        {/* Bottom row */}
        <div className={`flex items-end justify-between pt-6 border-t ${isDark ? "border-foreground/10" : "border-border"}`}>
          <div>
            <div className={`text-fluid-xs font-mono uppercase tracking-[0.15em] mb-1 ${isDark ? "text-foreground/45" : "text-foreground/45"}`}>
              From
            </div>
            <div className="font-display text-fluid-2xl tabular leading-none">
              ${stack.pricing[2].pricePerMonth}<span className={`text-fluid-base ${isDark ? "text-foreground/55" : "text-foreground/55"}`}>/mo</span>
            </div>
          </div>
          <div className={`text-fluid-xs font-mono uppercase tracking-[0.15em] ${isDark ? "text-primary" : "text-foreground/60"}`}>
            {stack.protocol.duration} →
          </div>
        </div>
      </article>
    </Link>
  );
}

/* stack is a stable catalog object, variant a primitive — shallow memo is safe. */
export const StackCard = memo(StackCardInner);
