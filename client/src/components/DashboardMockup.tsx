import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Reveal } from "@/components/Reveal";
import outcomeScore from "@/assets/v2/outcome-score-card.png";
import cycleTimeline from "@/assets/v2/cycle-timeline-chart.png";

/**
 * DashboardMockup — Maximus-style outcome-score showcase.
 * Two layered devices on a dark gradient, scroll-driven parallax.
 */
export function DashboardMockup() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const phoneY = useTransform(scrollYProgress, [0, 1], ["-30px", "30px"]);
  const chartY = useTransform(scrollYProgress, [0, 1], ["30px", "-30px"]);

  return (
    <section
      ref={ref}
      className="relative bg-background text-foreground overflow-hidden nx-section"
      data-testid="section-dashboard-mockup"
    >
      {/* Subtle acid glow */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 50%, rgba(13,79,60,0.18) 0%, transparent 70%)",
        }}
      />

      <div className="nx-container relative">
        <Reveal>
          <div className="max-w-3xl mb-16 md:mb-24">
            <div className="nx-eyebrow mb-5 text-foreground/55">Outcome tracking</div>
            <h2 className="font-display text-fluid-4xl leading-[0.95] tracking-tight text-balance mb-6">
              Every cycle, <span className="font-medium text-primary">measured.</span>
            </h2>
            <p className="text-fluid-lg text-foreground/70 leading-relaxed max-w-2xl">
              Your dashboard shows the same metrics your physician watches — recovery, vitality,
              strength, mid-cycle response. Lab values plotted alongside subjective scores so the
              picture is honest.
            </p>
          </div>
        </Reveal>

        <div className="grid lg:grid-cols-[420px_1fr] gap-8 lg:gap-12 items-start">
          {/* Outcome score "phone" card */}
          <motion.div
            style={{ y: phoneY }}
            className="will-change-transform mx-auto lg:mx-0 max-w-[360px] lg:max-w-none"
          >
            <Reveal>
              <div className="relative">
                <div className="absolute -inset-4 bg-primary/10 blur-2xl rounded-[2.5rem]" />
                <div className="relative rounded-[2rem] overflow-hidden border border-foreground/15 bg-background shadow-[0_30px_80px_-20px_rgba(13,79,60,0.25)]">
                  <img
                    src={outcomeScore}
                    alt="Outcome score dashboard — 89 performance index, recovery 72, vitality 85, strength 91"
                    className="w-full h-auto block"
                  />
                </div>
                <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-foreground/45 mt-4 text-center lg:text-left">
                  Outcome Score · Wk 8 of 12
                </div>
              </div>
            </Reveal>
          </motion.div>

          {/* 12-week chart */}
          <motion.div style={{ y: chartY }} className="will-change-transform">
            <Reveal>
              <div className="bg-background/[0.04] border border-foreground/15 rounded-3xl p-6 md:p-8">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <div className="nx-eyebrow text-foreground/55 mb-1">Cycle response</div>
                    <div className="font-display text-fluid-xl">12-Week Trajectory</div>
                  </div>
                  <div className="flex items-center gap-4 text-fluid-xs font-mono uppercase tracking-[0.15em]">
                    <span className="flex items-center gap-2 text-foreground/75">
                      <span className="w-3 h-3 rounded-sm bg-primary" /> Primary
                    </span>
                    <span className="flex items-center gap-2 text-foreground/55">
                      <span className="w-3 h-3 rounded-sm bg-primary" /> Secondary
                    </span>
                  </div>
                </div>
                <div className="bg-background rounded-2xl overflow-hidden">
                  <img
                    src={cycleTimeline}
                    alt="12-week peptide cycle progression chart showing primary and secondary biomarker response curves"
                    className="w-full h-auto block"
                  />
                </div>
                <div className="grid grid-cols-3 gap-px bg-background/10 border border-foreground/10 rounded-xl overflow-hidden mt-6">
                  {[
                    { v: "+82", l: "Primary marker" },
                    { v: "+61", l: "Secondary marker" },
                    { v: "Wk 12", l: "Consolidation" },
                  ].map((m) => (
                    <div key={m.l} className="bg-background p-4">
                      <div className="font-display text-fluid-xl tabular text-primary mb-1">{m.v}</div>
                      <div className="nx-eyebrow text-foreground/45">{m.l}</div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
