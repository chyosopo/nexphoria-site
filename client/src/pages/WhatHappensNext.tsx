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

const PHASES: Phase[] = [
  {
    when: "The moment you submit",
    title: "Your questionnaire reaches a doctor",
    body: "Your answers go to a board-certified, U.S. licensed physician of Arora Health & Aesthetics, LLC. A doctor reads every one of them.",
  },
  {
    when: "Within a few business days",
    title: "Your doctor decides",
    body: "If your plan fits you, your prescription goes to the pharmacy and you get a confirmation by email. If it does not, your doctor tells you why, and the refund policy sets out what is refunded.",
    note: "A prescription comes before anything is made.",
  },
  {
    when: "If prescribed",
    title: "Made for you, shipped cold",
    body: "Your medicine is compounded for you in a state-licensed 503A pharmacy under USP <797> and shipped cold to all 50 states.",
  },
  {
    when: "Week 12",
    title: "Your blood, read",
    body: "A full blood panel is drawn at week 12, included in your plan. Your doctor reads it against your plan and continues, adjusts or stops your dose from what it shows."
  },
];

export default function WhatHappensNext() {
  useSeo({
    path: "/what-happens-next",
    title: "What happens after you submit",
    description: "The path from checkout to prescription to the week-12 blood panel. A U.S. licensed doctor reviews every case and can decline.",
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
            The path from here
          </p>
          <h1 id="whn-title" style={{ fontFamily: S, fontWeight: 500, fontSize: "var(--nx-t-h1)", lineHeight: 1.05, letterSpacing: "var(--nx-ls-tight)", color: "var(--nx-fg)", marginTop: "0.8rem", maxWidth: "18ch" }}>
            What happens after you submit.
          </h1>
          <p style={{ fontFamily: F, fontSize: "var(--nx-t-body)", lineHeight: 1.62, color: "var(--nx-fg-graphite)", maxWidth: "56ch", marginTop: "1.1rem" }}>
            Here is exactly how your questionnaire becomes a plan, and the point at which your doctor decides. Four steps, in the order they happen.
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
            Your doctor decides first. <em style={{ color: "var(--nx-cobalt)" }}>Then your medicine is made for you.</em>
          </h2>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "1.2rem", justifyContent: "center", alignItems: "center", marginTop: "1.6rem" }}>
            <Link href="/assessment" className="nx-cta-cobalt" data-testid="whn-cta" style={{ fontSize: "var(--nx-t-base)", padding: "15px 32px" }}>
              Start your assessment
            </Link>
            <Link href="/how-it-works" className="nx-text-link" style={{ fontFamily: F, fontSize: "var(--nx-t-sm)", fontWeight: 600 }}>
              See how it works <ArrowRight size={15} aria-hidden />
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
