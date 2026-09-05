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
import { PANEL_TOTAL_MARKERS } from "@/data/biomarkerPanel";

const kicker: React.CSSProperties = {
  fontFamily: F, fontSize: "var(--nx-t-2xs)", fontWeight: 600,
  letterSpacing: "var(--nx-ls-wide)", textTransform: "uppercase", color: "var(--nx-cobalt)",
};
const h2: React.CSSProperties = {
  fontFamily: S, fontWeight: 500, fontSize: "var(--nx-t-h2)", color: "var(--nx-fg)",
  lineHeight: 1.08, letterSpacing: "var(--nx-ls-tight)", marginTop: "0.7rem", textWrap: "balance",
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
    t: "Choose.",
    d: "A medicine or a protocol, and a term of one, three, six or twelve months.",
    detail: "Every medicine and protocol page states what it is for, how it works, how you take it, what to expect, and its price. A pending medicine is shown with its price and a notice, and the only action is an email when it is available.",
  },
  {
    t: "Health questions.",
    d: "Your health history, current medicines and goals, at checkout. A few minutes.",
    detail: "You check out first, then answer the questions. They cover the conditions that rule each medicine out and the medicines you already take. Compounded GLP-1 medicines are restricted by law in some states; the health questions check.",
  },
  {
    t: "A physician decides.",
    d: "A licensed U.S. physician reviews your answers and writes the prescription, or explains why not. If not, nothing is made and the refund policy applies.",
    detail: "The physician reads your answers against the conditions that rule each medicine out and against the other medicines you take. A decision comes within a few business days.",
  },
  {
    t: "Blood kit, then first dose.",
    d: "Your medicine ships cold with an at-home blood kit. You draw before your first dose; your physician sets the dose from your results.",
    detail: `The kit contains what you need to draw a small sample at home and a prepaid box to return it to the laboratory. It covers ${PANEL_TOTAL_MARKERS} markers across five systems, and your physician reads the results before setting your first dose.`,
  },
  {
    t: `Week ${RETEST_WEEK}.`,
    d: "The same blood test again. Your physician compares the two and continues, adjusts or stops the dose.",
    detail: `At week ${RETEST_WEEK} the same ${PANEL_TOTAL_MARKERS} markers are drawn at home and compared with your first test, marker by marker. Your physician reads what changed and decides whether the dose continues, changes or stops.`,
  },
];

const PARTIES: { name: string; line: string }[] = [
  { name: "Nexphoria", line: "Nexphoria operates the service and does not make clinical decisions." },
  { name: "Bask Health", line: "Bask Health is the telehealth platform through which the health questions are answered and the prescription is written." },
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
    description: `Five steps, from choosing a medicine to your week-${RETEST_WEEK} blood test. Health questions, a physician's decision, a blood kit before the first dose, and the same test again at week ${RETEST_WEEK}.`,
    path: "/how-it-works",
    jsonLd: [
      webPageJsonLd({ name: "How it works", description: `Five steps, from choosing a medicine to your week-${RETEST_WEEK} blood test.`, path: "/how-it-works", type: "MedicalWebPage" }),
      breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "How it works", path: "/how-it-works" }]),
      howToJsonLd({
        name: "How Nexphoria peptide therapy works",
        description: `Five steps, from choosing a medicine to your week-${RETEST_WEEK} blood test.`,
        steps: STEPS.map((s) => ({ name: s.t, text: s.d })),
      }),
    ],
  });

  return (
    <SiteLayout>
      {/* ── Hero ── */}
      <section className="nx-hero-r3" aria-labelledby="hiw-title">
        <div className="nx-container" style={{ paddingTop: "var(--nx-sp-sec)", paddingBottom: "var(--nx-sp-band)" }}>
          <div className="grid grid-cols-1 lg:grid-cols-[1.12fr_0.88fr]" style={{ gap: "clamp(1.6rem,4vw,3rem)", alignItems: "center" }}>
            <div>
              <p style={kicker}>How it works</p>
              <h1 id="hiw-title" style={{ fontFamily: S, fontWeight: 500, fontSize: "var(--nx-t-display)", lineHeight: 1.03, letterSpacing: "var(--nx-ls-tight)", color: "var(--nx-fg)", maxWidth: "16ch", marginTop: "0.9rem" }}>
                How it works.
              </h1>
              <p style={{ ...body, fontSize: "var(--nx-t-lg)", marginTop: "1.1rem" }}>
                Five steps, from choosing a medicine to your week-{RETEST_WEEK} blood test.
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: "1.6rem" }}>
                <Link href="/assessment" className="nx-cta-cobalt" data-testid="hiw-hero-cta">See if I'm eligible</Link>
                <Link href="/peptides" className="nx-cta-ghost">The medicines</Link>
              </div>
            </div>
            <div className="nx-hero-frame nx-hero-bleed" style={{ position: "relative", borderRadius: "var(--nx-r-lg)", overflow: "hidden", boxShadow: "var(--nx-e-4)", aspectRatio: "3 / 2" }}>
              <img src={heroImg} srcSet={outcomeSrcSet(heroImg)} sizes="(max-width: 1024px) 100vw, 45vw" alt="" aria-hidden fetchPriority="high" width={2048} height={1360} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
            </div>
          </div>
        </div>
      </section>

      {/* ── The five steps ── */}
      <section className="nx-container" aria-labelledby="hiw-steps" style={{ paddingTop: "var(--nx-sp-sec)" }}>
        <Reveal>
          <p style={kicker}>The steps</p>
          <h2 id="hiw-steps" style={{ ...h2, maxWidth: "18ch" }}>Five steps.</h2>
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
      <section className="nx-container" aria-labelledby="hiw-blood" style={{ paddingTop: "var(--nx-sp-sec)" }}>
        <Reveal>
          <p style={kicker}>Blood testing</p>
          <h2 id="hiw-blood" style={{ ...h2, maxWidth: "20ch" }}>A blood test before you start, and again at week {RETEST_WEEK}.</h2>
          <p style={{ ...body, marginTop: "1rem" }}>
            Terms of three months and longer include the week-{RETEST_WEEK} test. Six- and twelve-month terms add a six-month test, and twelve-month terms add a test each quarter. On its own the test is $149; a further test on a plan is $99.
          </p>
          <p style={{ ...small, marginTop: "0.9rem" }}>
            <Link href="/labs" className="nx-text-link" style={{ fontWeight: 600 }} data-testid="hiw-labs-link">Every marker, and the additional tests</Link>
          </p>
        </Reveal>
      </section>

      {/* ── Who is involved ── */}
      <section className="nx-container" aria-labelledby="hiw-who" style={{ paddingTop: "var(--nx-sp-sec)" }}>
        <Reveal>
          <p style={kicker}>Who is involved</p>
          <h2 id="hiw-who" style={{ ...h2, maxWidth: "18ch" }}>Who is involved.</h2>
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
      <section className="nx-container" aria-labelledby="hiw-decline" style={{ paddingTop: "var(--nx-sp-sec)" }}>
        <Reveal>
          <p style={kicker}>The decision</p>
          <h2 id="hiw-decline" style={{ ...h2, maxWidth: "20ch" }}>If the physician does not prescribe.</h2>
          <p style={{ ...body, marginTop: "1rem" }}>
            The physician explains why not. Nothing is compounded and nothing ships, and the refund policy sets out what is refunded.
          </p>
          <p style={{ ...small, marginTop: "0.9rem" }}>
            <Link href="/legal/refund-policy" className="nx-text-link" style={{ fontWeight: 600 }}>The refund policy</Link>
          </p>
        </Reveal>
      </section>

      {/* ── What it costs ── */}
      <section className="nx-container" aria-labelledby="hiw-price" style={{ paddingTop: "var(--nx-sp-sec)" }}>
        <Reveal>
          <p style={kicker}>Price</p>
          <h2 id="hiw-price" style={{ ...h2, maxWidth: "18ch" }}>What it costs.</h2>
          <p style={{ ...body, marginTop: "1rem" }}>
            One monthly price, paid up front for a term of one, three, six or twelve months. It includes the medicine, the physician's review, the blood testing the term includes, and cold shipping. Three months is 10% less per month, six 15%, twelve 20%.
          </p>
          <p style={{ ...small, marginTop: "0.9rem" }}>
            <Link href="/peptides" className="nx-text-link" style={{ fontWeight: 600 }} data-testid="hiw-pricing-all">Every medicine, with its price</Link>
          </p>
        </Reveal>
      </section>

      {/* ── Closer ── */}
      <section className="nx-gradient-hero-dark nx-closer" aria-labelledby="hiw-closer">
        <div className="nx-container" style={{ textAlign: "center" }}>
          <Reveal>
            <h2 id="hiw-closer" style={{ fontFamily: S, fontWeight: 500, fontSize: "var(--nx-t-h1)", color: "var(--nx-ceramic)", lineHeight: 1.05, letterSpacing: "var(--nx-ls-display)", maxWidth: "18ch", margin: "0 auto", textWrap: "balance" }}>
              The next step is a physician.
            </h2>
            <Link href="/assessment" className="nx-cta-ceramic" data-testid="hiw-cta" style={{ fontFamily: F, fontWeight: 600, fontSize: "var(--nx-t-base)", marginTop: "2rem" }}>
              See if I'm eligible
            </Link>
          </Reveal>
        </div>
      </section>
    </SiteLayout>
  );
}
