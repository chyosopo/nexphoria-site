import { Reveal } from "@/components/Reveal";
import { AnimatedCounter } from "@/components/AnimatedCounter";

/**
 * AnimatedStatStrip — replaces the static evidence card grid.
 * Big animated numbers, monospace context, hairline borders.
 */
const stats = [
  {
    value: 73,
    suffix: "%",
    label: "of patients report reduced inflammation by week 4",
    source: "BPC-157 meta-analysis · 2024",
  },
  {
    value: 4000,
    suffix: "+",
    label: "genes upregulated by GHK-Cu in human dermal fibroblasts",
    source: "Pickart · J Biomater Sci · 2008",
  },
  {
    value: 1.4,
    decimals: 1,
    suffix: "×",
    label: "increase in BDNF observed with Semax in clinical use",
    source: "Russian Academy of Medical Sciences",
  },
  {
    value: 24,
    suffix: "h",
    label: "median time from intake submission to physician review",
    source: "Internal data · Q4 2025",
  },
];

export function AnimatedStatStrip() {
  return (
    <section className="nx-section bg-background text-foreground border-y border-border">
      <div className="nx-container">
        <Reveal>
          <div className="flex items-end justify-between flex-wrap gap-6 mb-14">
            <div>
              <div className="nx-eyebrow mb-3">Evidence base · selected findings</div>
              <h2 className="font-display text-fluid-3xl leading-tight tracking-tight max-w-xl text-balance">
                The literature is already <span className="text-primary">there.</span>
              </h2>
            </div>
            <p className="font-mono text-fluid-xs text-foreground/45 max-w-xs leading-relaxed">
              Aggregated from peer-reviewed studies. Individual results vary. Statements have not been
              evaluated by the FDA for off-label uses.
            </p>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-background/8 border border-border rounded-3xl overflow-hidden">
          {stats.map((s, i) => (
            <Reveal key={i} delay={i * 80} className="bg-background">
              <div className="p-8 md:p-10 h-full flex flex-col">
                <div className="font-display text-[clamp(3rem,6vw,5.5rem)] leading-[0.95] tracking-tight tabular text-foreground mb-5">
                  <AnimatedCounter
                    value={s.value}
                    suffix={s.suffix}
                    decimals={s.decimals ?? 0}
                  />
                </div>
                <p className="text-fluid-base text-foreground/75 leading-snug mb-6 flex-1">
                  {s.label}
                </p>
                <div className="text-fluid-xs font-mono uppercase tracking-[0.15em] text-foreground/45 pt-5 border-t border-border">
                  {s.source}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
