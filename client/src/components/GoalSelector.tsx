import { useState } from "react";
import { Link } from "wouter";
import { ArrowUpRight, Activity, Sparkles, Brain, Moon, FlaskConical } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Reveal } from "@/components/Reveal";
import { analytics } from "@/lib/analytics";

/**
 * GoalSelector — Maximus-style "Why are you here?" interactive picker.
 * User chooses a primary goal; we surface the recommended stack + protocol depth.
 */
const goals = [
  {
    key: "recovery",
    icon: Activity,
    title: "Recover faster.",
    sub: "Joints, soft tissue, training load.",
    recommended: "wolverine",
    label: "Wolverine",
    body: "BPC-157 + TB-500 (or oral KPV) for tissue repair. Optional CJC-1295/Ipamorelin for deeper sleep and recovery acceleration.",
    range: "From $262 / mo",
  },
  {
    key: "skin",
    icon: Sparkles,
    title: "Skin like before.",
    sub: "Tone, fine lines, barrier resilience.",
    recommended: "glow",
    label: "Glow",
    body: "GHK-Cu topical + oral support to upregulate collagen synthesis, restore barrier function, and reverse oxidative skin aging.",
    range: "From $187 / mo",
  },
  {
    key: "cognition",
    icon: Brain,
    title: "Sharper focus.",
    sub: "Memory, attention, executive function.",
    recommended: "wolverine",
    label: "Focus protocols",
    body: "Semax + Selank for catecholaminergic regulation and BDNF upregulation. Stacked with Wolverine for full-body cognitive resilience.",
    range: "Coming Q2 2026",
  },
  {
    key: "sleep",
    icon: Moon,
    title: "Sleep that resets.",
    sub: "Deep sleep, growth-axis recovery.",
    recommended: "wolverine",
    label: "GH-axis stack",
    body: "Sermorelin or CJC-1295/Ipamorelin to restore pulsatile GH release. Lab work required at baseline. Physician-titrated.",
    range: "From $349 / mo",
  },
  {
    key: "labs",
    icon: FlaskConical,
    title: "Just bloodwork.",
    sub: "Baseline, mid-cycle, outcome panels.",
    recommended: "lab-testing",
    label: "Lab Testing",
    body: "Three-panel cadence (Baseline · Mid-Cycle · Outcome) designed to monitor peptide therapy safely. Quest/Labcorp draws.",
    range: "From $89 / panel",
  },
];

export function GoalSelector() {
  const [active, setActive] = useState<string>("recovery");
  const current = goals.find((g) => g.key === active)!;

  return (
    <section className="nx-section bg-background text-foreground relative overflow-hidden">
      {/* Background glow */}
      <div
        className="absolute top-1/2 -translate-y-1/2 right-0 w-[500px] h-[500px] rounded-full opacity-10 blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, #8FC6FF 0%, transparent 70%)" }}
      />

      <div className="nx-container relative">
        <Reveal>
          <div className="max-w-3xl mb-16">
            <div className="nx-eyebrow mb-5 text-foreground/55">Find your protocol</div>
            <h2 className="font-display text-fluid-4xl leading-[0.95] tracking-tight text-balance mb-6">
              Why are <span className="text-primary">you</span> here?
            </h2>
            <p className="text-fluid-lg text-foreground/70 leading-relaxed max-w-2xl">
              Pick a primary goal. We'll show what the physician would likely recommend — and roughly what it costs.
            </p>
          </div>
        </Reveal>

        <div className="grid lg:grid-cols-[1.1fr_1fr] gap-8 lg:gap-16">
          {/* Goal chip column */}
          <div className="space-y-3">
            {goals.map((g, i) => {
              const Icon = g.icon;
              const isActive = active === g.key;
              return (
                <Reveal key={g.key} delay={i * 60}>
                  <button
                    data-testid={`button-goal-${g.key}`}
                    onClick={() => {
                      setActive(g.key);
                      analytics.goalSelected({ goal: g.key, recommended: g.recommended });
                    }}
                    className={`w-full text-left p-6 md:p-7 rounded-2xl border transition-all flex items-center gap-5 group ${
                      isActive
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-background/[0.03] border-foreground/15 hover:bg-background/[0.06] hover:border-foreground/30"
                    }`}
                  >
                    <div
                      className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${
                        isActive ? "bg-background text-primary" : "bg-background/10 text-foreground/60 group-hover:text-primary"
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <div className="font-display text-fluid-xl leading-tight tracking-tight">{g.title}</div>
                      <div className={`text-fluid-sm mt-1 ${isActive ? "text-foreground/65" : "text-foreground/55"}`}>
                        {g.sub}
                      </div>
                    </div>
                    <ArrowUpRight
                      className={`h-5 w-5 flex-shrink-0 transition-transform ${
                        isActive ? "translate-x-1 -translate-y-1" : "opacity-40 group-hover:opacity-80"
                      }`}
                    />
                  </button>
                </Reveal>
              );
            })}
          </div>

          {/* Detail panel */}
          <div className="lg:sticky lg:top-24 self-start">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.key}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="bg-background/[0.04] border border-foreground/15 rounded-3xl p-8 md:p-10"
              >
                <div className="nx-eyebrow text-primary mb-5">Recommended</div>
                <h3 className="font-display text-fluid-3xl leading-tight tracking-tight mb-6">
                  {current.label}
                </h3>
                <p className="text-fluid-base text-foreground/75 leading-relaxed mb-8">
                  {current.body}
                </p>

                <div className="grid grid-cols-2 gap-px bg-background/10 border border-foreground/10 rounded-xl overflow-hidden mb-8">
                  <div className="bg-background p-5">
                    <div className="nx-eyebrow text-foreground/45 mb-2">Starting at</div>
                    <div className="font-display text-fluid-xl tabular text-primary">{current.range}</div>
                  </div>
                  <div className="bg-background p-5">
                    <div className="nx-eyebrow text-foreground/45 mb-2">Cycle length</div>
                    <div className="font-display text-fluid-xl tabular">12 weeks</div>
                  </div>
                </div>

                <Link href={current.recommended === "lab-testing" ? "/lab-testing" : `/protocols/${current.recommended}`}>
                  <button
                    data-testid="button-goal-cta"
                    className="w-full inline-flex items-center justify-between gap-3 px-7 py-5 rounded-full font-medium nx-cta-acid hover:opacity-90 transition-opacity"
                  >
                    <span>See the full protocol</span>
                    <ArrowUpRight className="h-5 w-5" />
                  </button>
                </Link>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
