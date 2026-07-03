import { ArrowDown, ArrowUpRight } from "lucide-react";
import { Link } from "wouter";
import { StartIntakeButton } from "@/components/StartIntakeButton";

/**
 * Hero — the locked home hero.
 * ────────────────────────────
 * Tagline is LOCKED site-wide: "Science you can feel. Results you can measure."
 * One display treatment (Roc Grotesk) with a single acid-green accent on
 * "feel" — the hero's one focal point. The page's single Instrument Serif
 * moment lives in the Find Your Focus section. No A/B machinery in the
 * public path — one clean, intentional hero.
 *
 * (Export name kept as `HeroVariantPicker` so callers don't change.)
 */
export function HeroVariantPicker() {
  return (
    <>
      {/* Headline — locked tagline */}
      <h1 className="font-display text-balance leading-[0.95] tracking-[-0.03em] mb-8 max-w-[11ch] md:max-w-[15ch]">
        <span className="block text-[clamp(3rem,9vw,5rem)] md:text-[clamp(3.5rem,5.6vw,6rem)]">
          Science you can <span className="text-primary">feel.</span>
        </span>
        <span className="block text-[clamp(3rem,9vw,5rem)] md:text-[clamp(3.5rem,5.6vw,6rem)] text-foreground/90">
          Results you can measure.
        </span>
      </h1>

      {/* Subhead */}
      <p className="max-w-2xl text-fluid-lg leading-relaxed text-foreground/70 mb-10">
        Premium peptide therapy, prescribed by a board-certified physician after
        review of your labs and compounded in U.S. 503A pharmacies. The molecules that matter
        &mdash; finally done right.
      </p>

      {/* CTAs */}
      <div className="flex flex-wrap gap-3 mb-16">
        <StartIntakeButton size="xl" source="home_hero" variant="primary">
          Start your assessment
        </StartIntakeButton>
        <Link href="/stacks">
          <button
            data-testid="button-hero-explore"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-medium text-fluid-base border border-foreground/30 hover:border-foreground/60 hover:bg-background/5 transition-all group"
          >
            <span>Explore protocols</span>
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        </Link>
      </div>

      {/* Hero meta grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-background/10 border border-foreground/10 rounded-2xl overflow-hidden max-w-4xl">
        {[
          { label: "MD review", value: "Included" },
          { label: "Compounded", value: "U.S. 503A" },
          { label: "Cold chain", value: "3-5 day ship" },
          { label: "Protocols", value: "12-week cycles" },
        ].map((m) => (
          <div key={m.label} className="bg-background p-5 md:p-6 transition-colors hover:bg-background/[0.03]">
            <div className="nx-eyebrow text-foreground/45 mb-2">{m.label}</div>
            <div className="font-display text-fluid-xl tabular">{m.value}</div>
          </div>
        ))}
      </div>

      {/* Scroll cue */}
      <div className="hidden md:flex absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-2 text-foreground/40">
        <span className="text-fluid-xs font-mono uppercase tracking-[0.2em]">Scroll</span>
        <ArrowDown className="h-4 w-4 animate-bounce" />
      </div>
    </>
  );
}
