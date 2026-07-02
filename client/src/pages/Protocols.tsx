import { useState } from "react";
import { Link } from "wouter";
import { SiteLayout } from "@/components/SiteLayout";
import { Reveal } from "@/components/Reveal";
import { StartIntakeButton } from "@/components/StartIntakeButton";
import { stacks, getPeptidesForStack, type Stack } from "@/lib/protocols";
import { useSeo, webPageJsonLd, breadcrumbJsonLd } from "@/lib/seo";
import { ArrowRight, Check } from "lucide-react";
import { SectionEyebrow } from "@/components/Editorial";
import heroGoals from "@/assets/hero-goals.webp";
import editorialKit from "@/assets/brand/editorial/editorial-kit-unbox.png";
import handsKitSelect from "@/assets/brand/editorial/editorial-hands-kit-select.png";
import handsSealed from "@/assets/brand/editorial/editorial-hands-sealed.png";
import { EditorialHands } from "@/components/EditorialHands";

/* Catalog ordering + per-stack metadata for filtering. */
const ORDER = ["wolverine", "glow", "longevity", "sleep", "lean"];
const KICKERS: Record<string, string> = {
  wolverine: "Recovery & Performance",
  glow: "Skin, Hair & Vitality",
  longevity: "Longevity & Cellular",
  sleep: "Sleep & Recovery",
  lean: "Weight & Metabolic",
};
type FilterKey = "all" | "recover" | "skin" | "longevity" | "sleep" | "weight";
const FILTERS: { key: FilterKey; label: string }[] = [
  { key: "all", label: "All" },
  { key: "recover", label: "Recovery" },
  { key: "skin", label: "Aesthetic" },
  { key: "longevity", label: "Longevity" },
  { key: "sleep", label: "Sleep" },
  { key: "weight", label: "Metabolic" },
];

/* Compare-table matrix: which outcome dimensions each protocol targets. */
const COMPARE_COLS: { key: string; label: string }[] = [
  { key: "energy", label: "Energy" },
  { key: "recovery", label: "Recovery" },
  { key: "cognitive", label: "Cognitive" },
  { key: "aesthetic", label: "Aesthetic" },
];
const COMPARE_MATRIX: Record<string, string[]> = {
  wolverine: ["recovery"],
  glow: ["aesthetic", "recovery"],
  longevity: ["energy", "recovery", "cognitive"],
  sleep: ["energy", "recovery", "cognitive"],
  lean: ["energy", "aesthetic"],
};

export default function Protocols() {
  const [filter, setFilter] = useState<FilterKey>("all");

  useSeo({
    title: "Peptide protocols — recovery, skin, sleep, metabolic, longevity",
    description:
      "Six physician-designed peptide stacks for recovery, skin, sleep, cognition, metabolic health, and longevity. 503A compounded, lab-gated, and physician-monitored from first dose to final draw.",
    path: "/protocols",
    jsonLd: [
      webPageJsonLd({
        name: "Peptide Protocols",
        description:
          "Five physician-designed peptide protocols for recovery, skin, longevity, sleep, and metabolic health.",
        path: "/protocols",
      }),
      breadcrumbJsonLd([
        { name: "Home", path: "/" },
        { name: "Protocols", path: "/protocols" },
      ]),
    ],
  });

  const ordered = ORDER
    .map((slug) => stacks.find((s) => s.slug === slug))
    .filter((s): s is Stack => Boolean(s));
  const shown = filter === "all" ? ordered : ordered.filter((s) => s.goal === filter);

  return (
    <SiteLayout navVariant="showcase">
      {/* Hero */}
      <section className="relative bg-background pt-24 pb-14 md:pt-32 md:pb-20 overflow-hidden">
        <div
          className="absolute inset-0 opacity-30 pointer-events-none"
          style={{
            backgroundImage: `url(${heroGoals})`,
            backgroundSize: "cover",
            backgroundPosition: "center right",
            maskImage: "linear-gradient(to left, black 0%, transparent 70%)",
            WebkitMaskImage: "linear-gradient(to left, black 0%, transparent 70%)",
          }}
          aria-hidden
        />
        <div className="nx-container relative">
          <Reveal>
            <p className="nx-eyebrow text-muted-foreground mb-6" data-testid="text-protocols-eyebrow">
              PROTOCOL LIBRARY · 05
            </p>
            <h1 className="nx-display text-foreground max-w-4xl" data-testid="text-protocols-title">
              Pick your goal.{" "}
              <span className="text-primary">We architect</span> the rest.
            </h1>
            <p className="nx-body text-foreground/70 max-w-2xl mt-6">
              Every protocol is a sequence of peptides, doses, and timing — designed for one
              outcome, reviewed by a licensed physician, compounded in a U.S. 503A pharmacy, and
              shipped to your door. Five protocols. One standard.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Editorial band — the kit */}
      <section className="relative w-full h-[50vh] min-h-[360px] overflow-hidden bg-background">
        <img
          src={editorialKit}
          alt="A matte black Nexphoria protocol kit — every component prescribed, compounded, and batch-tested"
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ objectPosition: "center center" }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "linear-gradient(180deg,rgba(21, 24, 28,.45) 0%,transparent 38%,transparent 58%,rgba(21, 24, 28,.88) 100%)" }}
        />
        <div className="absolute inset-0 flex items-end">
          <div className="nx-container pb-10 md:pb-14 w-full">
            <p className="font-display text-fluid-2xl leading-[1.05] tracking-tight max-w-2xl text-foreground">
              Five protocols.{" "}
              <span className="font-medium text-primary">One standard.</span>
            </p>
          </div>
        </div>
      </section>

      <EditorialHands
        src={handsKitSelect}
        alt="A suited hand reaching into a matte case for a vial — five protocols, your pick"
        ratio="21/9"
        caption="FIG. 14 · FIVE PROTOCOLS · YOUR PICK"
        objectPosition="center 42%"
      />

      {/* Filter + catalog */}
      <section className="bg-background pb-24 md:pb-32 pt-20 md:pt-28">
        <div className="nx-container">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-10">
          <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter protocols by goal">
            {FILTERS.map((f) => {
              const active = filter === f.key;
              return (
                <button
                  key={f.key}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setFilter(f.key)}
                  data-testid={`filter-${f.key}`}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    active
                      ? "bg-foreground text-background"
                      : "border border-border text-foreground/70 hover:border-primary/50"
                  }`}
                >
                  {f.label}
                </button>
              );
            })}
          </div>
            <Link asChild href="/assessment">
              <a
                className="group inline-flex items-center gap-2 text-sm font-mono uppercase tracking-wider text-primary nx-micro"
                data-testid="link-which-is-right"
              >
                Which is right for me?
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" strokeWidth={1.5} />
              </a>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {shown.map((stack, idx) => {
              const peptides = getPeptidesForStack(stack);
              const from = Math.min(...stack.pricing.map((t) => t.pricePerMonth));
              return (
                <Reveal key={stack.slug} delay={idx * 70}>
                  <Link href={`/stacks/${stack.slug}`}>
                    <div
                      className="nx-card group relative h-full p-8 md:p-10 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg cursor-pointer"
                      data-testid={`card-protocol-${stack.slug}`}
                    >
                      <div className="flex items-start justify-between mb-6">
                        <p className="nx-eyebrow text-muted-foreground">{KICKERS[stack.slug]}</p>
                        <span
                          className="shrink-0 grid place-items-center w-9 h-9 rounded-full border border-primary/40 font-display text-sm font-semibold text-primary"
                          aria-hidden
                        >
                          {stack.name.charAt(0)}
                        </span>
                      </div>
                      <h3 className="nx-headline text-foreground mb-3" data-testid={`text-protocol-name-${stack.slug}`}>
                        {stack.name}
                      </h3>
                      <p className="nx-body text-foreground/70 mb-7">{stack.tagline}</p>

                      <div className="border-t border-border pt-6">
                        <p className="text-xs text-foreground/55 font-mono uppercase tracking-wider mb-5">
                          {peptides.map((p) => p.name).join(" · ")}
                        </p>
                        <div className="flex items-end justify-between">
                          <p className="text-sm text-foreground/70">
                            From{" "}
                            <span className="font-display text-xl font-semibold text-foreground">${from}</span>
                            <span className="text-xs text-foreground/50">/mo</span>
                          </p>
                          <span className="text-xs font-mono uppercase tracking-wider text-primary">
                            See protocol →
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </Reveal>
              );
            })}
          </div>

          {shown.length === 0 && (
            <p className="text-center text-foreground/60 py-16">No protocols in this category yet.</p>
          )}

          {/* Compare table */}
          <Reveal delay={150}>
            <div className="mt-20 md:mt-28">
              <SectionEyebrow num="06" label="Compare at a glance" className="mb-8" />
              <div className="overflow-x-auto -mx-6 px-6 md:mx-0 md:px-0">
                <table className="w-full min-w-[560px] border-collapse">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-4 pr-4 font-mono uppercase text-[11px] tracking-[0.18em] text-foreground/50 font-normal">
                        Protocol
                      </th>
                      {COMPARE_COLS.map((c) => (
                        <th
                          key={c.key}
                          className="text-center py-4 px-2 font-mono uppercase text-[11px] tracking-[0.18em] text-foreground/50 font-normal"
                        >
                          {c.label}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {ordered.map((stack) => (
                      <tr key={stack.slug} className="border-b border-border/60" data-testid={`compare-row-${stack.slug}`}>
                        <td className="py-4 pr-4">
                          <span className="font-display text-base font-semibold text-foreground">{stack.name}</span>
                          <span className="block text-xs text-foreground/50 mt-0.5">{KICKERS[stack.slug]}</span>
                        </td>
                        {COMPARE_COLS.map((c) => (
                          <td key={c.key} className="text-center py-4 px-2">
                            {COMPARE_MATRIX[stack.slug]?.includes(c.key) ? (
                              <Check className="inline w-4 h-4 text-primary" strokeWidth={2} aria-label="Yes" />
                            ) : (
                              <span className="text-foreground/20" aria-label="No">—</span>
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </Reveal>

          {/* Not sure? */}
          <Reveal delay={300}>
            <div className="mt-16 md:mt-20">
              <EditorialHands
                src={handsSealed}
                alt="A gloved hand pressing a wax seal onto a black package — every protocol ships sealed"
                ratio="16/9"
                caption="PROTOCOLS · SEALED · DIRECT TO YOUR DOOR"
                captionAnchor="top-right"
                objectPosition="center 45%"
              />
            </div>
          </Reveal>
          <Reveal delay={400}>
            <div className="mt-16 md:mt-24 nx-card bg-background text-foreground p-10 md:p-16 text-center">
              <p className="nx-eyebrow text-primary mb-4">NOT SURE WHERE TO START?</p>
              <h2 className="nx-headline mb-6 max-w-3xl mx-auto">
                Let our intake decide.{" "}
                <span className="font-medium text-primary">Free.</span>
              </h2>
              <p className="nx-body text-foreground/70 max-w-xl mx-auto mb-8">
                A 4-minute clinical questionnaire. A physician reviews your goals, labs (if you have
                them), and contraindications, then routes you to the right protocol.
              </p>
              <StartIntakeButton variant="primary" size="lg" source="protocols_closing">
                Start intake
              </StartIntakeButton>
            </div>
          </Reveal>
        </div>
      </section>
    </SiteLayout>
  );
}
