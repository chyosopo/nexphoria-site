/* JOB: the five steps, from choosing a medicine to the week-12 blood test. */
/* ═══ HOW IT WORKS — the plain deck (docs/COPY-DECK-PLAIN.md, 2026-09-04)
   Five steps, each with the deck paragraph and one paragraph of detail.
   Then blood testing, who is involved, what happens if the physician does
   not prescribe, what it costs, and the closer. State, do not persuade.
   Tokens only; the R3 hero and the shared closer grammar. */
import { SiteLayout, resolveWorld } from "@/components/SiteLayout";
import { Link, useLocation } from "wouter";
import { useSeo, webPageJsonLd, breadcrumbJsonLd, howToJsonLd } from "@/lib/seo";
import { F, S } from "@/lib/typography";
import { Reveal } from "@/components/Reveal";
import { OUTCOME_HERO, outcomeSrcSet } from "@/data/outcomeImagery";
import { PROVIDER_INFO, PHARMACY_INFO } from "@/data/compliance";
import { RETEST_WEEK } from "@/data/monitoring";
import { PANEL_TOTAL_MARKERS, PANEL_CATEGORY_COUNT, BIOMARKER_PANEL } from "@/data/biomarkerPanel";

const kicker: React.CSSProperties = {
  fontFamily: F, fontSize: "var(--nx-t-2xs)", fontWeight: 600,
  letterSpacing: "var(--nx-ls-wide)", textTransform: "uppercase", color: "var(--nx-cobalt)",
};
const body: React.CSSProperties = {
  fontFamily: F, fontSize: "var(--nx-t-body)", lineHeight: 1.65, color: "var(--nx-fg-graphite)", maxWidth: "58ch",
};
const small: React.CSSProperties = {
  fontFamily: F, fontSize: "var(--nx-t-sm)", lineHeight: 1.55, color: "var(--nx-fg-graphite)",
};
const card: React.CSSProperties = {
  background: "var(--nx-bg)", border: "1px solid var(--nx-border)", borderRadius: "var(--nx-r-md)", padding: "1rem 1.15rem",
};

/* The five steps (the only step list on the site). `d` is the deck
   paragraph, verbatim; `detail` is the one plain paragraph the deck asks for. */
const STEPS: { t: string; d: string; detail: string }[] = [
  {
    t: "Choose a medicine or a protocol, and a term.",
    d: "A medicine or a protocol, and a term of one, three, six or twelve months.",
    detail: "Every medicine and protocol page states what it is for, how it works, how it is taken, what to expect, and its price. A pending medicine is shown with its price and a notice, and the only action is an email when it is available.",
  },
  {
    t: "Complete a quick online visit at checkout.",
    d: "Health history, current medicines and the goal, answered at checkout. A few minutes.",
    detail: "The order is placed first, then the questions are answered. They cover the conditions that rule each medicine out and the medicines already taken. Compounded GLP-1 medicines are restricted by law in some states; the health questions check.",
  },
  {
    t: "A licensed physician reads them and decides.",
    d: "A licensed U.S. physician reviews the answers and writes the prescription, or explains why not. If not, nothing is made and the refund policy applies.",
    detail: "The physician reads the answers against the conditions that rule each medicine out and against the other medicines taken. A decision comes within a few business days.",
  },
  {
    t: "Draw your blood at home, then take the first dose.",
    d: "The medicine ships cold with an at-home blood kit. The draw comes before the first dose; the physician sets the dose from the results.",
    detail: `The kit contains what is needed to draw a small sample at home and a prepaid box to return it to the laboratory. It covers ${PANEL_TOTAL_MARKERS} markers across five systems, and the physician reads the results before setting the first dose.`,
  },
  {
    t: `At week ${RETEST_WEEK}, the same panel is drawn again.`,
    d: "The same panel again. The physician compares the two and continues, adjusts or stops the dose.",
    detail: `At week ${RETEST_WEEK} the same ${PANEL_TOTAL_MARKERS} markers are drawn at home and compared with the first, marker by marker. The physician reads what changed and decides whether the dose continues, changes or stops.`,
  },
];

const PARTIES: { name: string; line: string }[] = [
  { name: "Nexphoria", line: "Nexphoria operates the service and does not make clinical decisions." },
  { name: "Bask Health", line: "Bask Health is the telehealth platform through which the online visit is completed and the prescription is written." },
  { name: PROVIDER_INFO.name, line: `Prescriptions are written by independent, U.S.-licensed physicians of ${PROVIDER_INFO.name}.` },
  { name: PHARMACY_INFO.name, line: `Medicines are compounded by ${PHARMACY_INFO.name}, a state-licensed 503A compounding pharmacy in Houston, Texas.` },
  { name: "A CLIA-certified laboratory", line: "Blood work is analysed by a CLIA-certified laboratory." },
];

export default function HowItWorks() {
  const [loc] = useLocation();
  const world = resolveWorld(loc);
  const heroImg = OUTCOME_HERO[world === "women" ? "women" : "men"];
  useSeo({
    title: "How it works | Nexphoria",
    description: `Five steps, from choosing a medicine to the week-${RETEST_WEEK} panel. A quick online visit, a physician's decision, a blood kit before the first dose, and the same test again at week ${RETEST_WEEK}.`,
    path: "/how-it-works",
    jsonLd: [
      webPageJsonLd({ name: "How it works", description: `Five steps, from choosing a medicine to the week-${RETEST_WEEK} panel.`, path: "/how-it-works", type: "MedicalWebPage" }),
      breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "How it works", path: "/how-it-works" }]),
      howToJsonLd({
        name: "How Nexphoria peptide therapy works",
        description: `Five steps, from choosing a medicine to the week-${RETEST_WEEK} panel.`,
        steps: STEPS.map((s) => ({ name: s.t, text: s.d })),
      }),
    ],
  });

  return (
    <SiteLayout>
      {/* ── Hero ── */}
      <section className="nx-tilehero" aria-labelledby="hiw-title">
        <div className="nx-container" style={{ paddingBottom: "var(--nx-sp-tight)" }}>
          <div className="nx-tilehero__head nx-hero-seq">
            <p className="nx-eyebrow">How it works</p>
            <h1 id="hiw-title" className="nx-tilehero__h1" style={{ fontFamily: S }}>Answer a few questions, and a licensed physician decides the rest.</h1>
            <p className="nx-tilehero__sub" style={{ fontFamily: F }}>Five steps take you from choosing a medicine to the week-{RETEST_WEEK} blood panel.</p>
            <div className="nx-tilehero__foot">
              <Link href="/peptides" className="nx-cta-cobalt" data-testid="hiw-hero-cta">Shop the medicines</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── The five steps ── */}
      <section className="nx-container nx-sec" aria-labelledby="hiw-steps">
        <Reveal>
          <div className="nx-sec-head">
            <p className="nx-eyebrow">The steps</p>
            <h2 id="hiw-steps" className="nx-dsh2" style={{ maxWidth: "24ch" }}>Here are the five steps, in the order they happen.</h2>
          </div>
        </Reveal>
        <ol style={{ listStyle: "none", margin: "clamp(1.6rem,3vw,2.4rem) 0 0", padding: 0, display: "grid", gap: 14, maxWidth: 820 }} data-testid="hiw-steps">
          {STEPS.map((s, i) => (
            <Reveal key={s.t} delay={Math.min(i * 40, 200)}>
              <li style={{ ...card, padding: "clamp(1.2rem,2.5vw,1.6rem) clamp(1.2rem,3vw,1.8rem)" }} data-testid={`hiw-step-${i + 1}`}>
                <p style={{ ...kicker, color: "var(--nx-fg-muted)" }}>Step {i + 1}</p>
                <h3 style={{ fontFamily: S, fontWeight: 500, fontSize: "var(--nx-t-xl)", color: "var(--nx-fg)", lineHeight: 1.1, marginTop: "0.4rem" }}>{s.t}</h3>
                <p style={{ ...body, fontSize: "var(--nx-t-base)", marginTop: "0.8rem", maxWidth: "62ch" }}>{s.d}</p>
                <p style={{ ...body, fontSize: "var(--nx-t-base)", marginTop: "0.6rem", maxWidth: "62ch" }}>{s.detail}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </section>

      {/* ── Blood testing ── */}
      <section className="nx-container nx-sec" aria-labelledby="hiw-blood">
        <Reveal>
          <div className="nx-sec-head">
            <p className="nx-eyebrow">Blood testing</p>
            <h2 id="hiw-blood" className="nx-dsh2" style={{ maxWidth: "26ch" }}>Your blood is tested before the first dose, and again at week {RETEST_WEEK}.</h2>
            <p className="nx-lede">
              The kit reads {PANEL_TOTAL_MARKERS} markers across {PANEL_CATEGORY_COUNT} systems, drawn at home. Terms of three months and longer include the week-{RETEST_WEEK} test. Six- and twelve-month terms add a six-month test, and twelve-month terms add a test each quarter. On its own the test is $149; a further test on a plan is $99.
            </p>
          </div>
          <ul style={{ listStyle: "none", margin: "clamp(1.4rem,3vw,2rem) 0 0", padding: 0, display: "grid", gap: 12, gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", maxWidth: 900 }} data-testid="hiw-panel">
            {BIOMARKER_PANEL.map((c) => (
              <li key={c.name} style={card}>
                <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 8 }}>
                  <p style={{ fontFamily: F, fontWeight: 600, fontSize: "var(--nx-t-base)", color: "var(--nx-fg)", margin: 0 }}>{c.name}</p>
                  <span style={{ ...kicker, color: "var(--nx-fg-muted)" }}>{c.count} marker{c.count === 1 ? "" : "s"}</span>
                </div>
                {c.blurb ? <p style={{ ...small, marginTop: "0.35rem" }}>{c.blurb}</p> : null}
              </li>
            ))}
          </ul>
        </Reveal>
      </section>

      {/* ── Who is involved ── */}
      <section className="nx-container nx-sec" aria-labelledby="hiw-who">
        <Reveal>
          <div className="nx-sec-head">
            <p className="nx-eyebrow">Who is involved</p>
            <h2 id="hiw-who" className="nx-dsh2" style={{ maxWidth: "24ch" }}>Everyone involved is named here, with what each one does.</h2>
          </div>
        </Reveal>
        <ul style={{ listStyle: "none", margin: "1.4rem 0 0", padding: 0, display: "grid", gap: 10, maxWidth: 820 }} data-testid="hiw-parties">
          {PARTIES.map((p) => (
            <li key={p.name} style={card}>
              <p style={{ fontFamily: F, fontWeight: 600, fontSize: "var(--nx-t-base)", color: "var(--nx-fg)", margin: 0 }}>{p.name}</p>
              <p style={{ ...small, marginTop: "0.25rem" }}>{p.line}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* ── If the physician does not prescribe ── */}
      <section className="nx-container nx-sec" aria-labelledby="hiw-decline">
        <Reveal>
          <div className="nx-sec-head">
            <p className="nx-eyebrow">The decision</p>
            <h2 id="hiw-decline" className="nx-dsh2" style={{ maxWidth: "24ch" }}>If the physician does not prescribe, nothing is made.</h2>
            <p className="nx-lede">
              The physician explains why not. Nothing is compounded and nothing ships, and the refund policy sets out what is refunded.
            </p>
          </div>
          <p style={{ ...small, marginTop: "0.9rem" }}>
            <Link href="/legal/refund-policy" className="nx-text-link" style={{ fontWeight: 600 }}>The refund policy</Link>
          </p>
        </Reveal>
      </section>

      {/* ── What it costs ── */}
      <section className="nx-container nx-sec" aria-labelledby="hiw-price">
        <Reveal>
          <div className="nx-sec-head">
            <p className="nx-eyebrow">Price</p>
            <h2 id="hiw-price" className="nx-dsh2" style={{ maxWidth: "26ch" }}>One monthly price covers the medicine, the physician and the blood work.</h2>
            <p className="nx-lede">
              One monthly price, paid up front for a term of one, three, six or twelve months. It includes the medicine, the physician's review, the blood testing the term includes, and cold shipping. Three months is 10% less per month, six 15%, twelve 20%.
            </p>
          </div>
          <p style={{ ...small, marginTop: "0.9rem" }}>
            <Link href="/peptides" className="nx-text-link" style={{ fontWeight: 600 }} data-testid="hiw-pricing-all">Every medicine, with its price</Link>
          </p>
        </Reveal>
      </section>

      {/* ── Closer, as one tile ── */}
      <section className="nx-container" style={{ paddingTop: "var(--nx-sp-band)", paddingBottom: "var(--nx-sp-sec)" }} aria-labelledby="hiw-closer">
        <div className="nx-closer-tile">
          <div>
            <h2 id="hiw-closer" style={{ fontFamily: S, fontSize: "var(--nx-t-h2)", color: "var(--nx-ceramic)", maxWidth: "20ch", margin: 0, textWrap: "balance" }}>A physician decides, and prescribes if it is appropriate.</h2>
            <p style={{ fontFamily: F, fontSize: "var(--nx-t-base)", lineHeight: 1.6, color: "color-mix(in srgb, var(--nx-ceramic) 78%, transparent)", maxWidth: "46ch", marginTop: ".8rem" }}>A licensed U.S. physician reviews your online visit and prescribes the medicine that fits, or explains why not.</p>
            <Link href="/peptides" className="nx-cta-ceramic" data-testid="hiw-cta" style={{ fontFamily: F, fontWeight: 600, fontSize: "var(--nx-t-base)", marginTop: "1.6rem" }}>See the medicines</Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
