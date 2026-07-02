/* ────────────────────────────────────────────────────────────────
   CATEGORY / CONDITION PAGE — one template, six goals
   Skeleton: emotional hero → 3 steps (if prescribed) → goal chips
   → treatment grid (real data) → FAQ (+JSON-LD) → CTA → footnote
   ──────────────────────────────────────────────────────────────── */
import { Link, useRoute } from "wouter";
import { ArrowRight } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { useSeo, webPageJsonLd, faqJsonLd } from "@/lib/seo";
import { peptides, CATEGORY_LABELS, type PeptideCategory } from "@/data/peptides";

type Cfg = {
  pre: string; accent: string; sub: string;
  chips: string[];
  faqs: { q: string; a: string }[];
};

const IF_RX = "Medication is dispensed only if a licensed provider determines a prescription is appropriate.";

const CONFIG: Record<PeptideCategory, Cfg> = {
  recovery: {
    pre: "Train hard. Recover", accent: "smarter.",
    sub: "Physician-directed peptide protocols oriented around tissue recovery, joint comfort, and training resilience — calibrated to your bloodwork, not a guess.",
    chips: ["Post-injury support", "Joint comfort", "Training load", "Tendon & tissue"],
    faqs: [
      { q: "How do recovery protocols start?", a: "With a A structured intake and baseline bloodwork. A licensed physician reviews both and, if appropriate, prescribes a protocol matched to your training load and history. " + IF_RX },
      { q: "How soon are protocols adjusted?", a: "Labs are re-run every 90 days. Your physician reviews the change in your markers and adjusts, holds, or tapers the protocol accordingly." },
      { q: "Are these products FDA-approved?", a: "Compounded medications are not approved or evaluated by the FDA for safety, effectiveness, or quality. They are prepared by state-licensed 503A compounding pharmacies and prescribed off-label by licensed physicians." },
    ],
  },
  skin: {
    pre: "Radiance, from the", accent: "inside out.",
    sub: "Protocols oriented around skin quality, collagen support, and hair — designed by licensed physicians and adjusted against your own labs.",
    chips: ["Skin quality", "Collagen support", "Hair support", "Healthy aging"],
    faqs: [
      { q: "What does a skin protocol involve?", a: "An online evaluation, baseline labs, and — if a physician prescribes — a compounded protocol with check-ins. " + IF_RX },
      { q: "When do people typically reassess?", a: "Bloodwork is repeated every 90 days and the protocol is reviewed against your markers and your goals." },
      { q: "Are these products FDA-approved?", a: "Compounded medications are not approved or evaluated by the FDA for safety, effectiveness, or quality. They are prepared by state-licensed 503A compounding pharmacies." },
    ],
  },
  growth: {
    pre: "Composition,", accent: "engineered.",
    sub: "Physician-directed protocols oriented around lean mass, GH pulse, and body composition — gated by labs before, during, and after.",
    chips: ["Lean mass", "GH pulse", "Body composition", "Strength support"],
    faqs: [
      { q: "How is eligibility decided?", a: "By a licensed physician, from your intake and baseline bloodwork — never by a questionnaire alone. " + IF_RX },
      { q: "How is progress measured?", a: "Quarterly labs plus your own training data. Protocols are adjusted against numbers, not feelings." },
      { q: "Are these products FDA-approved?", a: "Compounded medications are not approved or evaluated by the FDA for safety, effectiveness, or quality. They are prepared by state-licensed 503A compounding pharmacies." },
    ],
  },
  longevity: {
    pre: "Add life to your", accent: "years.",
    sub: "Foundational protocols oriented around cellular energy, immune resilience, and healthspan — built on a 76-marker baseline and re-tested every quarter.",
    chips: ["Cellular energy", "Immune resilience", "Healthspan", "Daily vitality"],
    faqs: [
      { q: "Where does a longevity protocol begin?", a: "With comprehensive baseline bloodwork — 76 markers across 11 systems — reviewed by a licensed physician who designs a protocol if appropriate. " + IF_RX },
      { q: "What makes this different from supplements?", a: "Everything here is prescription-only, physician-directed, and adjusted against your own labs every 90 days." },
      { q: "Are these products FDA-approved?", a: "Compounded medications are not approved or evaluated by the FDA for safety, effectiveness, or quality. They are prepared by state-licensed 503A compounding pharmacies." },
    ],
  },
  cognition: {
    pre: "Clarity you can", accent: "measure.",
    sub: "Protocols oriented around focus, mood, and cognitive support — physician-directed, lab-gated, and adjusted to how you actually respond.",
    chips: ["Focus", "Mental clarity", "Mood support", "Stress resilience"],
    faqs: [
      { q: "How do cognition protocols work?", a: "A licensed physician reviews your intake and labs, then prescribes a protocol if appropriate, with check-ins through the portal. " + IF_RX },
      { q: "What if something doesn't feel right?", a: "Message your physician through the portal. Most adjustments are dose-related and handled quickly; compounds can be substituted or removed." },
      { q: "Are these products FDA-approved?", a: "Compounded medications are not approved or evaluated by the FDA for safety, effectiveness, or quality. They are prepared by state-licensed 503A compounding pharmacies." },
    ],
  },
  sleep: {
    pre: "Deeper nights,", accent: "better days.",
    sub: "Physician-directed protocols oriented around sleep quality, onset, and overnight recovery — matched to your labs and adjusted to how you actually respond.",
    chips: ["Sleep quality", "Sleep onset", "Overnight recovery", "Morning energy"],
    faqs: [
      { q: "How do sleep protocols start?", a: "With a private online intake and baseline bloodwork reviewed by a licensed physician, who prescribes a protocol only if appropriate. " + IF_RX },
      { q: "How is progress tracked?", a: "Through your own reporting and quarterly labs — protocols are held, adjusted, or tapered against real markers." },
      { q: "Are these products FDA-approved?", a: "Compounded medications are not approved or evaluated by the FDA for safety, effectiveness, or quality. They are prepared by state-licensed 503A compounding pharmacies." },
    ],
  },
  metabolic: {
    pre: "Metabolic health,", accent: "on your terms.",
    sub: "Medically supervised protocols oriented around appetite, weight, and glucose control — with real labs before the first dose and every 90 days after.",
    chips: ["Appetite control", "Weight management", "Glucose support", "Energy"],
    faqs: [
      { q: "How does a metabolic protocol start?", a: "Online intake, baseline bloodwork, and physician review. If a prescription is appropriate, your protocol ships from a state-licensed 503A compounding pharmacy. " + IF_RX },
      { q: "How is dosing handled?", a: "Dosing is individualized by your physician and reviewed against your labs and response every quarter — it is never self-directed." },
      { q: "Are these products FDA-approved?", a: "Some molecules in this category exist as FDA-approved branded medications; compounded versions are not approved or evaluated by the FDA for safety, effectiveness, or quality." },
    ],
  },
};


const GOAL_CHIP: Record<PeptideCategory, { label: string; status: string; pos: string }> = {
  recovery: { label: "Tissue recovery", status: "On track", pos: "26%" },
  skin: { label: "Collagen support", status: "Improving", pos: "30%" },
  growth: { label: "Lean mass", status: "Building", pos: "34%" },
  longevity: { label: "Cellular energy", status: "Optimal", pos: "18%" },
  cognition: { label: "Focus & clarity", status: "Steady", pos: "24%" },
  metabolic: { label: "Glucose control", status: "Improving", pos: "32%" },
};

const STEPS: [string, string][] = [
  ["Share your history", "A private structured intake covering your goals, training, and medical history."],
  ["Get evaluated", "Baseline bloodwork plus review by a U.S.-licensed physician — the only person who decides if a prescription is appropriate."],
  ["Start & stay monitored", "If prescribed, your protocol ships from a state-licensed 503A pharmacy, with labs re-run every 90 days."],
];

export default function Category() {
  const [, params] = useRoute("/goals/:slug");
  const slug = (params?.slug ?? "") as PeptideCategory;
  const cfg = CONFIG[slug];
  const label = CATEGORY_LABELS[slug] ?? "Protocols";
  const list = peptides.filter((p) => p.category === slug);

  useSeo({
    title: cfg ? `${label} peptide protocols — physician-directed` : "Protocols",
    description: cfg ? cfg.sub : "Physician-directed peptide protocols.",
    path: `/goals/${slug}`,
    jsonLd: cfg ? [webPageJsonLd({ name: `${label} protocols`, description: cfg.sub, path: `/goals/${slug}` }), faqJsonLd(cfg.faqs)] : [],
  });

  if (!cfg) {
    return (
      <SiteLayout>
        <section className="nx-section"><div className="nx-container">
          <h1 style={{ fontFamily: "'Fraunces', Georgia, serif", fontWeight: 500 }}>Protocol area not found.</h1>
          <Link href="/peptides" className="nx-cta-cobalt mt-6 inline-flex">Browse all peptides</Link>
        </div></section>
      </SiteLayout>
    );
  }

  return (
    <SiteLayout>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden" style={{ background: "linear-gradient(180deg, #F8FBFF 0%, var(--nx-bg) 100%)" }}>
        <div className="nx-container" style={{ paddingTop: "clamp(3.5rem,7vw,6rem)", paddingBottom: "clamp(2.5rem,5vw,4rem)" }}>
          <p className="nx-eyebrow" data-testid="cat-eyebrow">{label} · physician-directed</p>
          <h1 style={{ fontFamily: "'Fraunces', Georgia, serif", fontWeight: 500, fontSize: "clamp(44px,6.4vw,84px)", lineHeight: 1.06, letterSpacing: "-0.015em", color: "var(--nx-black)", maxWidth: "16ch", marginTop: "0.9rem" }} data-testid="cat-h1">
            {cfg.pre}{" "}
            <em style={{ fontStyle: "italic", color: "#1F5FD0" }}>{cfg.accent}</em>
          </h1>
          <p style={{ fontFamily: "'General Sans', system-ui, sans-serif", fontSize: "clamp(16px,1.3vw,19px)", lineHeight: 1.55, color: "var(--nx-fg-graphite)", maxWidth: "56ch", marginTop: "1.4rem" }}>
            {cfg.sub}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link href="/assessment" className="nx-cta-cobalt inline-flex items-center gap-2" data-testid="cat-cta-start">
              Begin your intake <ArrowRight size={17} strokeWidth={2} />
            </Link>
            <Link href="/bloodwork" className="nx-cta-ghost inline-flex items-center gap-2">See the bloodwork</Link>
          </div>
          {/* goal chips */}
          <div className="mt-8 flex flex-wrap gap-2">
            {cfg.chips.map((c) => (
              <span key={c} style={{ fontFamily: "'General Sans', system-ui, sans-serif", fontSize: 13, fontWeight: 500, color: "#163E8C", background: "rgba(122, 176, 243,0.22)", border: "1px solid rgba(36, 103, 185,0.22)", borderRadius: 999, padding: "7px 14px" }}>
                {c}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Three steps ── */}
      <section className="nx-section" style={{ background: "var(--nx-ceramic)", borderTop: "1px solid var(--nx-line)" }}>
        <div className="nx-container">
          <p className="nx-eyebrow">How it works</p>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {STEPS.map(([t, d], i) => (
              <div key={t} className="nx-glass-card" style={{ padding: "1.6rem 1.5rem" }}>
                <div style={{ fontFamily: "'Fraunces', Georgia, serif", fontWeight: 500, fontSize: 30, color: "#1F5FD0", lineHeight: 1 }}>{i + 1}</div>
                <h3 style={{ fontFamily: "'General Sans', system-ui, sans-serif", fontWeight: 600, fontSize: 17, color: "var(--nx-black)", marginTop: "0.8rem" }}>{t}</h3>
                <p style={{ fontFamily: "'General Sans', system-ui, sans-serif", fontSize: 14.5, lineHeight: 1.55, color: "var(--nx-fg-graphite)", marginTop: "0.4rem" }}>{d}</p>
              </div>
            ))}
          </div>
          <p style={{ fontFamily: "'General Sans', system-ui, sans-serif", fontSize: 12.5, color: "var(--nx-fg-muted)", marginTop: "1.2rem" }}>
            †{IF_RX}
          </p>
        </div>
      </section>

      {/* ── Goal composite — UI over film ── */}
      <section className="relative overflow-hidden flex items-center" style={{ minHeight: "70vh" }}>
        <img src="https://d8j0ntlcm91z4.cloudfront.net/user_3Ft13W9B0KpsVCGoTUaXE6wshlh/hf_20260702_152222_271d9e81-0e8b-4523-919e-f87170779650.png" alt="" aria-hidden className="absolute inset-0 w-full h-full" style={{ objectFit: "cover" }} loading="lazy" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(90deg, rgba(21, 24, 28,0.55) 0%, rgba(21, 24, 28,0.1) 60%, transparent 100%)" }} />
        <img src="https://d8j0ntlcm91z4.cloudfront.net/user_3Ft13W9B0KpsVCGoTUaXE6wshlh/hf_20260702_170611_9a4e8cf6-4a78-4757-97f4-18aed47a8cc5.png" alt="" aria-hidden className="absolute inset-0 w-full h-full pointer-events-none" style={{ objectFit: "cover", zIndex: 1 }} loading="lazy" />
        <div className="nx-container relative" style={{ paddingTop: "3rem", paddingBottom: "3rem" }}>
          <h2 className="relative" style={{ fontFamily: "'Fraunces', Georgia, serif", fontWeight: 500, fontSize: "clamp(30px,4.4vw,54px)", lineHeight: 1.1, color: "#F2F7FD", maxWidth: "16ch", zIndex: 2 }}>
            Progress you can <em style={{ fontStyle: "italic", color: "#8FC6FF" }}>point to.</em>
          </h2>
          <div className="mt-6" style={{ background: "rgba(21, 24, 28,0.55)", backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)", border: "1px solid rgba(240, 244, 250,0.14)", borderRadius: 18, padding: "14px 18px", maxWidth: 320 }}>
            <div className="flex items-center justify-between gap-4">
              <span style={{ fontFamily: "'General Sans', system-ui, sans-serif", fontWeight: 600, fontSize: 13.5, color: "#F2F7FD" }}>{GOAL_CHIP[slug]?.label}</span>
              <span style={{ fontFamily: "'General Sans', system-ui, sans-serif", fontWeight: 600, fontSize: 11, color: "#0E2447", background: "#2FA7C4", borderRadius: 999, padding: "3px 9px" }}>{GOAL_CHIP[slug]?.status}</span>
            </div>
            <div className="relative mt-2.5" style={{ height: 5, borderRadius: 999, background: "linear-gradient(90deg,#2FA7C4,#8FC6FF,#6FA3CC)" }}>
              <span className="absolute nx-pulse-dot" style={{ left: GOAL_CHIP[slug]?.pos, top: -3.5, width: 12, height: 12, borderRadius: 999, background: "#F2F7FD", boxShadow: "0 0 0 3px rgba(240, 244, 250,0.3)" }} />
            </div>
            <p style={{ fontFamily: "'General Sans', system-ui, sans-serif", fontSize: 10.5, color: "rgba(240, 244, 250,0.5)", marginTop: 8, marginBottom: 0 }}>Illustration · tracked against your quarterly labs</p>
          </div>
        </div>
      </section>

      {/* ── Treatment options (real data) ── */}
      <section className="nx-section">
        <div className="nx-container">
          <p className="nx-eyebrow">Peptides in this area</p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((p) => (
              <Link key={p.slug} href={`/peptides/${p.slug}`} className="nx-glass-card group block no-underline" style={{ padding: "1.5rem 1.4rem" }} data-testid={`cat-item-${p.slug}`}>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 style={{ fontFamily: "'Fraunces', Georgia, serif", fontWeight: 500, fontSize: 21, color: "var(--nx-black)" }}>{p.name}</h3>
                    <p style={{ fontFamily: "'General Sans', system-ui, sans-serif", fontSize: 14, color: "var(--nx-fg-graphite)", marginTop: "0.35rem" }}>{p.tagline}</p>
                  </div>
                  <span className="nx-icon-chip" style={{ width: 36, height: 36 }} aria-hidden>
                    <ArrowRight size={17} strokeWidth={1.9} className="transition-transform duration-300 group-hover:translate-x-0.5" />
                  </span>
                </div>
                <p style={{ fontFamily: "'General Sans', system-ui, sans-serif", fontSize: 12, color: "var(--nx-fg-muted)", marginTop: "0.9rem" }}>
                  Prescription only · if prescribed†
                </p>
              </Link>
            ))}
          </div>
          {list.length === 0 && (
            <p style={{ fontFamily: "'General Sans', system-ui, sans-serif", color: "var(--nx-fg-graphite)" }}>
              Protocols in this area are physician-designed per patient. <Link href="/assessment" style={{ color: "#163E8C", fontWeight: 600 }}>Start your intake</Link>.
            </p>
          )}
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="nx-section" style={{ background: "var(--nx-ceramic)", borderTop: "1px solid var(--nx-line)" }}>
        <div className="nx-container" style={{ maxWidth: 860 }}>
          <p className="nx-eyebrow">Questions, answered</p>
          <div className="mt-6">
            {cfg.faqs.map((f) => (
              <details key={f.q} className="group" style={{ borderBottom: "1px solid var(--nx-line)", padding: "1.1rem 0" }}>
                <summary className="flex items-center justify-between cursor-pointer list-none" style={{ fontFamily: "'General Sans', system-ui, sans-serif", fontWeight: 600, fontSize: 16.5, color: "var(--nx-black)" }}>
                  {f.q}
                  <span aria-hidden className="transition-transform duration-300 group-open:rotate-45" style={{ color: "#163E8C", fontSize: 22, lineHeight: 1 }}>+</span>
                </summary>
                <p style={{ fontFamily: "'General Sans', system-ui, sans-serif", fontSize: 15, lineHeight: 1.6, color: "var(--nx-fg-graphite)", marginTop: "0.7rem", maxWidth: "62ch" }}>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="nx-section">
        <div className="nx-container">
          <div className="nx-glass-card" style={{ padding: "clamp(2rem,4vw,3rem)", textAlign: "center" }}>
            <h2 style={{ fontFamily: "'Fraunces', Georgia, serif", fontWeight: 500, fontSize: "clamp(28px,3.6vw,44px)", color: "var(--nx-black)" }}>
              One intake. <em style={{ fontStyle: "italic", color: "#1F5FD0" }}>Your</em> protocol.
            </h2>
            <p style={{ fontFamily: "'General Sans', system-ui, sans-serif", fontSize: 16, color: "var(--nx-fg-graphite)", marginTop: "0.7rem" }}>
              Free evaluation. You only pay if a physician prescribes.
            </p>
            <Link href="/assessment" className="nx-cta-cobalt inline-flex items-center gap-2 mt-6">
              Begin your intake <ArrowRight size={17} strokeWidth={2} />
            </Link>
            <p style={{ fontFamily: "'General Sans', system-ui, sans-serif", fontSize: 11.5, color: "var(--nx-fg-muted)", marginTop: "1.4rem" }}>
              Compounded medications are not approved or evaluated by the FDA for safety, effectiveness, or quality. Availability varies by state.
            </p>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
