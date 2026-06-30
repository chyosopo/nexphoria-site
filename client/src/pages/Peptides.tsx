import { useState } from "react";
import { Link } from "wouter";
import { ArrowUpRight } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { Reveal } from "@/components/Reveal";
import { StartIntakeButton } from "@/components/StartIntakeButton";
import { MolecularGlyph } from "@/components/MolecularGlyph";
import {
  peptides,
  CATEGORY_LABELS,
  type PeptideCategory,
  type Peptide,
} from "@/data/peptides";
import { useSeo, orgJsonLd, medicalBusinessJsonLd } from "@/lib/seo";

const FILTERS: ({ key: "all"; label: string } | { key: PeptideCategory; label: string })[] = [
  { key: "all", label: "All peptides" },
  { key: "recovery", label: CATEGORY_LABELS.recovery },
  { key: "skin", label: CATEGORY_LABELS.skin },
  { key: "longevity", label: CATEGORY_LABELS.longevity },
  { key: "sleep", label: CATEGORY_LABELS.sleep },
  { key: "growth", label: CATEGORY_LABELS.growth },
  { key: "metabolic", label: CATEGORY_LABELS.metabolic },
  { key: "cognition", label: CATEGORY_LABELS.cognition },
];

export default function Peptides() {
  const [filter, setFilter] = useState<"all" | PeptideCategory>("all");

  useSeo({
    title: "Peptide Library — Science you can feel. Results you can measure.",
    description:
      "Explore the Nexphoria peptide library: BPC-157, TB-500, GHK-Cu, Epitalon, NAD+, MOTS-c, Tirzepatide, Retatrutide, and more. Mechanism, dosing, timelines, and references for each.",
    path: "/peptides",
    jsonLd: [orgJsonLd(), medicalBusinessJsonLd()],
  });

  const shown =
    filter === "all" ? peptides : peptides.filter((p) => p.category === filter);

  return (
    <SiteLayout navVariant="showcase">
      {/* HERO */}
      <section className="relative bg-background text-foreground overflow-hidden">
        <div className="absolute inset-0 nx-grid-bg opacity-30" />
        <div
          className="absolute -top-40 -right-40 w-[560px] h-[560px] rounded-full opacity-20 blur-3xl"
          style={{ background: "radial-gradient(circle, #c6f184 0%, transparent 70%)" }}
        />
        <div className="relative nx-container pt-28 pb-16 md:pt-36 md:pb-20">
          <div className="nx-eyebrow text-foreground/55 mb-6 flex items-center gap-3">
            <span className="nx-data-dot" />
            The peptide library
          </div>
          <h1 className="font-display text-fluid-5xl leading-[0.95] tracking-tight text-balance max-w-4xl mb-6">
            Fifteen molecules. Each one a{" "}
            <span className="font-serif-italic text-primary">specific</span> instruction
            to your body.
          </h1>
          <p className="text-fluid-lg text-foreground/65 max-w-2xl leading-relaxed">
            Peptides are short chains of amino acids that signal repair, restoration, or
            release of a specific hormone. Every peptide below is prescription-only,
            compounded in a U.S. 503A pharmacy, and dispensed under physician oversight.
          </p>
        </div>
      </section>

      {/* FILTER + GRID */}
      <section className="nx-section bg-background text-foreground">
        <div className="nx-container">
          <div className="flex flex-wrap gap-2 mb-12" role="tablist" aria-label="Filter peptides by category">
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
                  className={`px-4 py-2 rounded-full text-fluid-sm font-medium transition-colors ${
                    active
                      ? "bg-background text-foreground"
                      : "border border-border text-foreground/70 hover:bg-background/5"
                  }`}
                >
                  {f.label}
                </button>
              );
            })}
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {shown.map((p, i) => (
              <Reveal key={p.slug} delay={i * 50}>
                <PeptideCard peptide={p} />
              </Reveal>
            ))}
            <Reveal delay={shown.length * 50}>
              <Link href="/protocols" data-testid="card-peptide-guide">
                <article className="group h-full rounded-3xl p-8 border border-primary/35 bg-primary/[0.06] hover:bg-primary/10 transition-colors cursor-pointer flex flex-col justify-between min-h-[260px]">
                  <div className="flex items-start justify-between">
                    <div className="nx-eyebrow text-primary">Not sure where to start?</div>
                    <ArrowUpRight
                      className="h-5 w-5 text-primary transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      strokeWidth={1.8}
                    />
                  </div>
                  <div>
                    <h3 className="font-display text-fluid-2xl leading-tight tracking-tight mb-3">
                      See the protocols these build into.
                    </h3>
                    <p className="text-fluid-sm text-foreground/65 leading-relaxed">
                      Single molecules are the vocabulary. Our physician-designed
                      protocols are the sentences — sequenced, dosed, and supervised.
                    </p>
                  </div>
                </article>
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-background text-foreground relative overflow-hidden">
        <div className="absolute inset-0 nx-grid-bg opacity-25" />
        <div className="relative nx-container py-20 md:py-28 text-center">
          <h2 className="font-display text-fluid-4xl leading-[0.95] tracking-tight text-balance max-w-3xl mx-auto mb-8">
            Not sure which peptide fits your goal?
            <br />
            Let a <span className="font-medium text-primary">physician</span> decide.
          </h2>
          <StartIntakeButton size="xl" source="peptides_index" variant="primary">
            Start the 4-minute assessment
          </StartIntakeButton>
        </div>
      </section>
    </SiteLayout>
  );
}

function PeptideCard({ peptide }: { peptide: Peptide }) {
  return (
    <Link href={`/peptides/${peptide.slug}`} data-testid={`card-peptide-${peptide.slug}`}>
      <article className="group h-full bg-background text-foreground rounded-3xl p-8 nx-card-lift overflow-hidden cursor-pointer flex flex-col">
        <div className="flex items-start justify-between mb-8">
          <MolecularGlyph
            glyph={peptide.glyph}
            size={64}
            className="text-foreground"
            title={`${peptide.name} molecular glyph`}
          />
          <ArrowUpRight
            className="h-5 w-5 text-foreground/50 transition-all group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            strokeWidth={1.8}
          />
        </div>
        <div className="nx-eyebrow text-primary mb-2">
          {CATEGORY_LABELS[peptide.category]}
        </div>
        <h3 className="font-display text-fluid-2xl leading-tight tracking-tight mb-1">
          {peptide.name}
        </h3>
        <div className="text-fluid-xs font-mono uppercase tracking-[0.12em] text-foreground/45 mb-4">
          {peptide.fullName}
        </div>
        <p className="text-fluid-sm text-foreground/65 leading-relaxed mb-6">
          {peptide.tagline} {peptide.summary.split(".")[0]}.
        </p>
        {/* Micro-spec strip — half-life + route of administration */}
        <div className="mt-auto pt-5 border-t border-border grid grid-cols-2 gap-3">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-foreground/40 mb-1">
              Half-life
            </div>
            <div className="font-mono text-xs text-foreground/70 tabular leading-snug">
              {peptide.halfLife.replace(/\s*\([^)]*\)/, "")}
            </div>
          </div>
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-foreground/40 mb-1">
              Route
            </div>
            <div className="font-mono text-xs text-foreground/70 leading-snug">
              {peptide.administration}
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}
