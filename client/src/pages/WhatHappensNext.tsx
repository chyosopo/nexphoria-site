/* JOB: close the post-submit void (FLAGSHIP-REBUILD P6). A standalone,
   flagship "what happens after you submit" timeline — reassurance before
   the intake, orientation after it. No PHI, no invented timing promises
   beyond the honest process; every step is true to the service model. */
import { Link } from "wouter";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { useSeo, webPageJsonLd, breadcrumbJsonLd } from "@/lib/seo";
import { F, S } from "@/lib/typography";

interface Phase {
  when: string;
  title: string;
  body: string;
  note?: string;
}

/* The five steps of docs/COPY-DECK-PLAIN.md, seen from the moment of submission. */
const PHASES: Phase[] = [
  {
    when: "Done at checkout",
    title: "Choose.",
    body: "A medicine or a protocol, and a term of one, three, six or twelve months.",
  },
  {
    when: "The moment you submit",
    title: "Health questions.",
    body: "Your health history, current medicines and goals go to an independent, U.S.-licensed physician of Arora Health & Aesthetics, LLC. A physician reads every answer.",
  },
  {
    when: "Within a few business days",
    title: "A physician decides.",
    body: "A licensed U.S. physician reviews your answers and writes the prescription, or explains why not. If prescribed, your prescription goes to the pharmacy and you get a confirmation by email. If not, nothing is made and the refund policy sets out what is refunded.",
    note: "A prescription comes before anything is made.",
  },
  {
    when: "If prescribed",
    title: "Blood kit, then first dose.",
    body: "Your medicine is compounded for you in a state-licensed 503A pharmacy under USP <797> and ships cold with an at-home blood kit, included. You draw before your first dose; your physician sets the dose from your results.",
  },
  {
    when: "Week 12",
    title: "Week 12.",
    body: "The same blood test again. Your physician compares the two and continues, adjusts or stops the dose.",
  },
];

export default function WhatHappensNext() {
  useSeo({
    path: "/what-happens-next",
    title: "What happens after you submit",
    description: "The five steps from checkout to the week-12 blood test. A licensed U.S. physician reviews every case and can decline.",
    jsonLd: [
      webPageJsonLd({ name: "What happens next", description: "The intake-to-retest timeline.", path: "/what-happens-next" }),
      breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "What happens next", path: "/what-happens-next" }]),
    ],
  });

  return (
    <SiteLayout navVariant="showcase">
      {/* Hero */}
      <section className="relative" style={{ overflow: "hidden" }} aria-labelledby="whn-title">
        <div className="nx-container relative nx-hero-seq" style={{ paddingTop: "var(--nx-sp-sec)", paddingBottom: "var(--nx-sp-band)", zIndex: 1, maxWidth: 820 }}>
          <p style={{ fontFamily: F, fontSize: "var(--nx-t-xs)", fontWeight: 600, letterSpacing: "var(--nx-ls-wide)", textTransform: "uppercase", color: "var(--nx-cobalt)" }}>
            What happens next
          </p>
          <h1 id="whn-title" style={{ fontFamily: S, fontWeight: 500, fontSize: "var(--nx-t-h1)", lineHeight: 1.05, letterSpacing: "var(--nx-ls-tight)", color: "var(--nx-fg)", marginTop: "0.8rem", maxWidth: "18ch" }}>
            What happens after you submit.
          </h1>
          <p style={{ fontFamily: F, fontSize: "var(--nx-t-body)", lineHeight: 1.62, color: "var(--nx-fg-graphite)", maxWidth: "56ch", marginTop: "1.1rem" }}>
            The five steps, in the order they happen. The first is behind you; the physician's decision comes next.
          </p>
        </div>
      </section>

      {/* Timeline */}
      <section className="nx-container" style={{ paddingBottom: "var(--nx-sp-sec)" }} aria-label="Timeline">
        <ol className="nx-timeline">
          {PHASES.map((p, i) => (
              <li key={p.title} className="nx-timeline__row">
                <div className="nx-timeline__rail" aria-hidden>
                  <span className="nx-timeline__dot" />
                  <span className="nx-timeline__idx" style={{ fontFamily: F, fontVariantNumeric: "tabular-nums" }}>{String(i + 1).padStart(2, "0")}</span>
                </div>
                <div className="nx-timeline__body">
                  <p style={{ fontFamily: F, fontSize: "var(--nx-t-2xs)", fontWeight: 700, letterSpacing: "var(--nx-ls-caps)", textTransform: "uppercase", color: "var(--nx-cobalt)" }}>{p.when}</p>
                  <h2 style={{ fontFamily: S, fontWeight: 500, fontSize: "var(--nx-t-h3)", color: "var(--nx-fg)", lineHeight: 1.15, marginTop: "0.4rem" }}>{p.title}</h2>
                  <p style={{ fontFamily: F, fontSize: "var(--nx-t-body)", lineHeight: 1.62, color: "var(--nx-fg-graphite)", marginTop: "0.6rem", maxWidth: "58ch" }}>{p.body}</p>
                  {p.note && (
                    <p style={{ fontFamily: F, fontSize: "var(--nx-t-sm)", fontWeight: 600, color: "var(--nx-cobalt)", marginTop: "0.7rem" }}>{p.note}</p>
                  )}
                </div>
              </li>
          ))}
        </ol>
      </section>

      {/* Close */}
      <section style={{ background: "var(--nx-bg-cream)", borderTop: "1px solid var(--nx-border)" }}>
        <div className="nx-container" style={{ paddingTop: "var(--nx-sp-sec)", paddingBottom: "var(--nx-sp-sec)", textAlign: "center" }}>
          <h2 style={{ fontFamily: S, fontWeight: 500, fontSize: "var(--nx-t-h2)", color: "var(--nx-fg)", lineHeight: 1.12, maxWidth: "20ch", margin: "0 auto" }}>
            The next step is the physician's decision.
          </h2>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "1.2rem", justifyContent: "center", alignItems: "center", marginTop: "1.6rem" }}>
            <Link href="/how-it-works" className="nx-cta-cobalt" data-testid="whn-cta" style={{ fontSize: "var(--nx-t-base)", padding: "15px 32px" }}>
              How it works <ArrowRight size={15} aria-hidden />
            </Link>
          </div>
          <div style={{ marginTop: "1.6rem" }}>
            <Link href="/" className="nx-text-link" style={{ fontFamily: F, fontSize: "var(--nx-t-sm)", fontWeight: 600 }}>
              <ArrowLeft size={14} aria-hidden /> Back to Nexphoria
            </Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
