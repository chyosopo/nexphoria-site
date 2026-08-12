/* JOB: close the post-submit void (FLAGSHIP-REBUILD P6). A standalone,
   flagship "what happens after you submit" timeline — reassurance before
   the intake, orientation after it. No PHI, no invented timing promises
   beyond the honest process; every step is true to the service model. */
import { Link } from "wouter";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { Reveal } from "@/components/Reveal";
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
    title: "Your intake reaches a physician",
    body: "Your history and, where provided, your prior labs are routed to a board-certified, U.S.-licensed physician of Arora Health & Aesthetics, LLC. Not a questionnaire score — a clinician reads it.",
  },
  {
    when: "Within a few business days",
    title: "The physician makes a decision",
    body: "They determine whether a protocol is appropriate. If it is, you receive a secure approval and a final payment link by email. If it isn't, they tell you so — and there is no charge.",
    note: "No charge unless a physician prescribes.",
  },
  {
    when: "If prescribed",
    title: "Bloodwork, then compounding",
    body: "Baseline bloodwork is ordered to a partner laboratory near you. Once your panel is read, your protocol is compounded in a state-licensed 503A pharmacy under USP <797> and shipped cold-chain to all 50 states.",
  },
  {
    when: "Every 90 days, ongoing",
    title: "The same markers, re-read",
    body: "Your panel is re-drawn each quarter. Your physician reads the trend against your protocol and adjusts, holds, or stops. Nothing continues on assumption — the change is proven, not presumed.",
  },
];

export default function WhatHappensNext() {
  useSeo({
    path: "/what-happens-next",
    title: "What happens after you submit — Nexphoria",
    description: "The path from intake to prescription to the 90-day retest loop. A physician reviews every case and can decline; there is no charge unless prescribed.",
    jsonLd: [
      webPageJsonLd({ name: "What happens next", description: "The intake-to-retest timeline.", path: "/what-happens-next" }),
      breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "What happens next", path: "/what-happens-next" }]),
    ],
  });

  return (
    <SiteLayout navVariant="showcase">
      {/* Hero */}
      <section className="relative" style={{ overflow: "hidden" }} aria-labelledby="whn-title">
        <div className="nx-aurora" aria-hidden><i /><i /><i /></div>
        <div className="nx-container relative nx-hero-seq" style={{ paddingTop: "var(--nx-sp-sec)", paddingBottom: "var(--nx-sp-band)", zIndex: 1, maxWidth: 820 }}>
          <p style={{ fontFamily: F, fontSize: "var(--nx-t-xs)", fontWeight: 600, letterSpacing: "var(--nx-ls-wide)", textTransform: "uppercase", color: "var(--nx-cobalt)" }}>
            The path from here
          </p>
          <h1 id="whn-title" style={{ fontFamily: S, fontWeight: 500, fontSize: "var(--nx-t-h1)", lineHeight: 1.05, letterSpacing: "-0.02em", color: "var(--nx-fg)", marginTop: "0.8rem", maxWidth: "18ch" }}>
            What happens after you submit.
          </h1>
          <p style={{ fontFamily: F, fontSize: "var(--nx-t-body)", lineHeight: 1.62, color: "var(--nx-fg-graphite)", maxWidth: "56ch", marginTop: "1.1rem" }}>
            No black box. Here is exactly how your intake becomes a protocol — and the point at which a physician can decline. You are never charged before that decision.
          </p>
        </div>
      </section>

      {/* Timeline */}
      <section className="nx-container" style={{ paddingBottom: "var(--nx-sp-sec)" }} aria-label="Timeline">
        <ol className="nx-timeline">
          {PHASES.map((p, i) => (
            <Reveal key={p.title} delay={i * 70}>
              <li className="nx-timeline__row">
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
            </Reveal>
          ))}
        </ol>
      </section>

      {/* Close */}
      <section style={{ background: "var(--nx-bg-cream)", borderTop: "1px solid var(--nx-border)" }}>
        <div className="nx-container" style={{ paddingTop: "var(--nx-sp-sec)", paddingBottom: "var(--nx-sp-sec)", textAlign: "center" }}>
          <h2 style={{ fontFamily: S, fontWeight: 500, fontSize: "var(--nx-t-h2)", color: "var(--nx-fg)", lineHeight: 1.12, maxWidth: "20ch", margin: "0 auto" }}>
            The consultation is complimentary. <em style={{ color: "var(--nx-cobalt)" }}>A figure follows only a prescription.</em>
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
