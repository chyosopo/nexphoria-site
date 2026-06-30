import { useEffect } from "react";
import { Link, useRoute } from "wouter";
import { ArrowUpRight, ArrowLeft, ExternalLink, ChevronRight } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { Reveal } from "@/components/Reveal";
import { EditorialHands } from "@/components/EditorialHands";
import { StartIntakeButton } from "@/components/StartIntakeButton";
import { MolecularGlyph } from "@/components/MolecularGlyph";
import handsPipette from "@/assets/brand/editorial/editorial-hands-pipette.png";
import handsSealed from "@/assets/brand/editorial/editorial-hands-sealed.png";
import NotFound from "@/pages/not-found";
import { getPeptide, getPeptide as gp, CATEGORY_LABELS } from "@/data/peptides";
import { getStackBySlug } from "@/lib/protocols";
import { useSeo, productJsonLd, medicalBusinessJsonLd, breadcrumbJsonLd } from "@/lib/seo";
import { analytics } from "@/lib/analytics";

export default function PeptideDetail() {
  const [, params] = useRoute("/peptides/:slug");
  const slug = params?.slug ?? "";
  const peptide = getPeptide(slug);

  useSeo({
    title: peptide
      ? `${peptide.name} — ${peptide.fullName}`
      : "Peptide not found",
    description: peptide
      ? `${peptide.name} (${peptide.fullName}): ${peptide.summary}`
      : "This peptide could not be found.",
    path: `/peptides/${slug}`,
    jsonLd: peptide
      ? [
          productJsonLd({
            name: peptide.name,
            description: peptide.summary,
            path: `/peptides/${peptide.slug}`,
            category: CATEGORY_LABELS[peptide.category],
          }),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Peptides", path: "/peptides" },
            { name: peptide.name, path: `/peptides/${peptide.slug}` },
          ]),
          medicalBusinessJsonLd(),
        ]
      : [],
  });

  useEffect(() => {
    if (peptide) {
      analytics.productViewed({ type: "peptide", slug: peptide.slug, name: peptide.name });
    }
  }, [peptide]);

  if (!peptide) return <NotFound />;

  const pairs = peptide.pairsWith
    .map((s) => gp(s))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));
  const stacks = peptide.inStacks
    .map((s) => getStackBySlug(s))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));

  return (
    <SiteLayout navVariant="dark">
      {/* HERO */}
      <section className="relative bg-background text-foreground overflow-hidden">
        <div className="absolute inset-0 nx-grid-bg opacity-25" />
        <div className="relative nx-container pt-28 pb-16 md:pt-32 md:pb-20">
          {/* Breadcrumb trail */}
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex items-center gap-1.5 text-fluid-sm font-mono uppercase tracking-[0.14em] text-foreground/45">
              <li><Link href="/" className="hover:text-primary transition-colors">Home</Link></li>
              <li aria-hidden="true"><ChevronRight className="h-3 w-3" /></li>
              <li><Link href="/peptides" className="hover:text-primary transition-colors">Peptides</Link></li>
              <li aria-hidden="true"><ChevronRight className="h-3 w-3" /></li>
              <li aria-current="page" className="text-foreground/75">{peptide.name}</li>
            </ol>
          </nav>
          <Link
            href="/peptides"
            className="inline-flex items-center gap-2 text-fluid-sm text-foreground/55 hover:text-primary transition-colors mb-10"
            data-testid="link-back-peptides"
          >
            <ArrowLeft className="h-4 w-4" strokeWidth={1.8} />
            All peptides
          </Link>

          <div className="grid lg:grid-cols-[1fr_auto] gap-12 items-center">
            <div>
              <div className="nx-eyebrow text-primary mb-4">
                {CATEGORY_LABELS[peptide.category]}
              </div>
              <h1 className="font-display text-fluid-5xl leading-[0.92] tracking-tight mb-3">
                {peptide.name}
              </h1>
              <div className="text-fluid-base font-mono uppercase tracking-[0.14em] text-foreground/45 mb-6">
                {peptide.fullName}
              </div>
              <p className="font-serif-italic text-fluid-2xl text-primary mb-6">
                {peptide.tagline}
              </p>
              <p className="text-fluid-lg text-foreground/70 leading-relaxed max-w-2xl">
                {peptide.summary}
              </p>
            </div>
            <div className="justify-self-center lg:justify-self-end">
              <div className="rounded-3xl border border-foreground/12 bg-background/[0.03] p-8">
                <MolecularGlyph
                  glyph={peptide.glyph}
                  size={200}
                  className="text-foreground"
                  title={`${peptide.name} molecular structure`}
                />
              </div>
            </div>
          </div>

          {/* Quick-stat strip */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-px bg-background/10 border border-foreground/10 rounded-2xl overflow-hidden">
            {[
              { l: "Half-life", v: peptide.halfLife },
              { l: "Typical dose", v: peptide.typicalDose },
              { l: "Cycle length", v: peptide.cycleLength },
              { l: "Administration", v: peptide.administration },
            ].map((s) => (
              <div key={s.l} className="bg-background p-5">
                <div className="nx-eyebrow text-foreground/45 mb-2">{s.l}</div>
                <div className="text-fluid-sm text-foreground font-mono leading-snug">{s.v}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FIG.20 — compounded, research-grade */}
      <EditorialHands
        src={handsPipette}
        alt="Hands drawing a precise dose with a pipette in a compounding pharmacy"
        caption="FIG. 20 · COMPOUNDED · RESEARCH-GRADE"
        ratio="16/9"
        objectPosition="center 42%"
      />

      {/* MECHANISM */}
      <section className="nx-section bg-background text-foreground">
        <div className="nx-container grid lg:grid-cols-12 gap-12">
          <Reveal className="lg:col-span-4">
            <div className="nx-eyebrow mb-5">Mechanism</div>
            <h2 className="font-display text-fluid-3xl leading-[0.95] tracking-tight text-balance">
              How it <span className="font-medium">works.</span>
            </h2>
          </Reveal>
          <Reveal delay={100} className="lg:col-span-8">
            <p className="text-fluid-lg text-foreground/75 leading-relaxed max-w-[58ch]">
              {peptide.mechanism}
            </p>
            {/* Mechanism diagram — dot-line signal path */}
            <div className="mt-10 flex items-center gap-3 md:gap-5 flex-wrap">
              {["Peptide", "Receptor", "Signal", "Response"].map((node, i, arr) => (
                <div key={node} className="flex items-center gap-3 md:gap-5">
                  <div className="flex items-center gap-2.5">
                    <span className="nx-data-dot" aria-hidden />
                    <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-foreground/60">
                      {node}
                    </span>
                  </div>
                  {i < arr.length - 1 && (
                    <span className="h-px w-8 md:w-12 bg-gradient-to-r from-primary/60 to-primary/15" aria-hidden />
                  )}
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="nx-section bg-card text-foreground">
        <div className="nx-container">
          <Reveal>
            <div className="max-w-2xl mb-12 md:mb-16">
              <div className="nx-eyebrow mb-5">Expected timeline</div>
              <h2 className="font-display text-fluid-3xl leading-[0.95] tracking-tight text-balance">
                What a cycle typically looks like.
              </h2>
            </div>
          </Reveal>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-background/10 border border-border rounded-3xl overflow-hidden">
            {peptide.timeline.map((t, i) => (
              <Reveal key={t.week} delay={i * 60} className="bg-background p-7 md:p-8">
                <div className="font-mono text-fluid-sm tracking-[0.06em] text-foreground/45 mb-3">
                  {String(i + 1).padStart(2, "0")} / {peptide.timeline.length}
                </div>
                <div className="font-display text-fluid-lg tracking-tight mb-3">{t.week}</div>
                <p className="text-fluid-sm text-foreground/65 leading-relaxed">{t.effect}</p>
              </Reveal>
            ))}
          </div>
          <p className="mt-6 text-fluid-xs text-foreground/45 font-mono max-w-2xl">
            Individual results vary. Timelines are educational summaries, not guarantees. Your
            physician sets dosing and cadence based on your case.
          </p>
        </div>
      </section>

      {/* DOSING DETAIL */}
      <section className="nx-section bg-background text-foreground">
        <div className="nx-container">
          <Reveal>
            <div className="nx-eyebrow mb-5">Dosing & administration</div>
            <h2 className="font-display text-fluid-3xl leading-[0.95] tracking-tight text-balance mb-10 max-w-2xl">
              Prescribed precisely. <span className="font-medium">Never</span> generic.
            </h2>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-5">
            {[
              { l: "Typical dose", v: peptide.typicalDose, note: "Your physician personalizes this to your goals and labs." },
              { l: "Cycle length", v: peptide.cycleLength, note: "Cycling preserves responsiveness and safety." },
              { l: "Route", v: peptide.administration, note: "All supplies and instructions ship with your order." },
            ].map((d) => (
              <div key={d.l} className="rounded-3xl border border-border p-8 bg-background">
                <div className="nx-eyebrow mb-3">{d.l}</div>
                <div className="font-display text-fluid-xl tracking-tight mb-3">{d.v}</div>
                <p className="text-fluid-sm text-foreground/60 leading-relaxed">{d.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PAIRS WITH + IN STACKS */}
      {(pairs.length > 0 || stacks.length > 0) && (
        <section className="nx-section bg-background text-foreground">
          <div className="nx-container grid lg:grid-cols-2 gap-12">
            {pairs.length > 0 && (
              <Reveal>
                <div className="nx-eyebrow text-foreground/55 mb-6">Pairs with</div>
                <div className="space-y-3">
                  {pairs.map((p) => (
                    <Link
                      key={p.slug}
                      href={`/peptides/${p.slug}`}
                      className="group flex items-center justify-between rounded-2xl border border-foreground/12 p-5 hover:border-primary/40 transition-colors"
                      data-testid={`link-pairs-${p.slug}`}
                    >
                      <div className="flex items-center gap-4">
                        <MolecularGlyph glyph={p.glyph} size={40} className="text-foreground" />
                        <div>
                          <div className="font-display text-fluid-lg tracking-tight">{p.name}</div>
                          <div className="text-fluid-xs text-foreground/55">{p.tagline}</div>
                        </div>
                      </div>
                      <ArrowUpRight className="h-5 w-5 text-foreground/40 group-hover:text-primary transition-colors" strokeWidth={1.8} />
                    </Link>
                  ))}
                </div>
              </Reveal>
            )}
            {stacks.length > 0 && (
              <Reveal delay={100}>
                <div className="nx-eyebrow text-foreground/55 mb-6">In our protocols</div>
                <div className="space-y-3">
                  {stacks.map((s) => (
                    <Link
                      key={s.slug}
                      href={`/protocols/${s.slug}`}
                      className="group flex items-center justify-between rounded-2xl border border-foreground/12 p-5 hover:border-primary/40 transition-colors"
                      data-testid={`link-stack-${s.slug}`}
                    >
                      <div>
                        <div className="font-display text-fluid-lg tracking-tight">{s.name}</div>
                        <div className="text-fluid-xs text-foreground/55">{s.tagline}</div>
                      </div>
                      <ArrowUpRight className="h-5 w-5 text-foreground/40 group-hover:text-primary transition-colors" strokeWidth={1.8} />
                    </Link>
                  ))}
                </div>
              </Reveal>
            )}
          </div>
        </section>
      )}

      {/* REFERENCES */}
      <section className="nx-section bg-background text-foreground border-t border-border">
        <div className="nx-container">
          <Reveal>
            <div className="nx-eyebrow mb-8">References · selected literature</div>
          </Reveal>
          <ol className="space-y-4 max-w-3xl">
            {peptide.studies.map((s, i) => (
              <li key={s.url} className="flex gap-4">
                <span className="font-mono text-fluid-sm text-foreground/40 shrink-0 mt-0.5">
                  [{i + 1}]
                </span>
                <a
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group text-fluid-base text-foreground/80 hover:text-foreground leading-snug"
                  data-testid={`ref-${peptide.slug}-${i}`}
                >
                  <span className="border-b border-border group-hover:border-border transition-colors">
                    {s.title}
                  </span>{" "}
                  <span className="text-foreground/50 font-mono text-fluid-xs whitespace-nowrap">
                    — {s.source}, {s.year}
                  </span>
                  <ExternalLink className="inline h-3.5 w-3.5 ml-1.5 -mt-0.5 opacity-50 group-hover:opacity-100" strokeWidth={1.8} />
                </a>
              </li>
            ))}
          </ol>
          <p className="mt-8 text-fluid-xs text-foreground/45 font-mono max-w-3xl leading-relaxed">
            These references are provided for education. Statements on this page have not been
            evaluated by the FDA for the off-label uses described. {peptide.name} is a
            prescription therapy dispensed only after physician review.
          </p>
        </div>
      </section>

      {/* tonal spread — sealed, before CTA */}
      <EditorialHands
        src={handsSealed}
        alt="Hands sealing a finished, physician-supervised peptide order"
        caption="PRESCRIBED · COMPOUNDED · ONE STANDARD"
        captionAnchor="top-right"
        objectPosition="center 45%"
      />

      {/* CTA */}
      <section className="bg-background text-foreground relative overflow-hidden">
        <div className="absolute inset-0 nx-grid-bg opacity-25" />
        <div
          className="absolute -bottom-40 -left-40 w-[520px] h-[520px] rounded-full opacity-20 blur-3xl"
          style={{ background: "radial-gradient(circle, #c6f184 0%, transparent 70%)" }}
        />
        <div className="relative nx-container py-20 md:py-28 text-center">
          <h2 className="font-display text-fluid-4xl leading-[0.95] tracking-tight text-balance max-w-3xl mx-auto mb-8">
            Think {peptide.name} fits your goal?
          </h2>
          <p className="text-fluid-lg text-foreground/65 max-w-xl mx-auto mb-10 leading-relaxed">
            Take the assessment. A board-certified physician confirms fit and dosing before
            anything is prescribed.
          </p>
          <StartIntakeButton size="xl" productSlug={peptide.slug} source={`peptide_${peptide.slug}`} variant="primary">
            Start your assessment
          </StartIntakeButton>
        </div>
      </section>
    </SiteLayout>
  );
}
