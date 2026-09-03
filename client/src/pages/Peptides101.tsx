/* ═══ PEPTIDES 101 — the teaching page (docs/MASTER-PLAN.md, Part 3)

   For someone who has never heard of a peptide. The excited expert, in the
   "you" voice: what a peptide is, the four we prescribe and what each is
   for, what the first twelve weeks look like, who it is for, and the honest
   part. Every fact comes from the catalog and data/monitoring.ts; the FDA
   line is verbatim. Funnels to one action. */
import { Link } from "wouter";
import { SiteLayout } from "@/components/SiteLayout";
import { Reveal } from "@/components/Reveal";
import { SectionLine } from "@/components/SectionLine";
import { SkuPhoto } from "@/components/SkuPhoto";
import { useSeo, webPageJsonLd, breadcrumbJsonLd, faqJsonLd } from "@/lib/seo";
import { F, S } from "@/lib/typography";
import { SOLO_CATALOG } from "@/data/soloCatalog";
import { monitoringFor, RETEST_WEEK } from "@/data/monitoring";
import { PANEL_TOTAL_MARKERS } from "@/data/biomarkerPanel";

const kicker: React.CSSProperties = { fontFamily: F, fontSize: "var(--nx-t-2xs)", fontWeight: 600, letterSpacing: "var(--nx-ls-wide)", textTransform: "uppercase", color: "var(--nx-cobalt)" };
const h2: React.CSSProperties = { fontFamily: S, fontWeight: 500, fontSize: "var(--nx-t-h2)", color: "var(--nx-fg)", lineHeight: 1.08, letterSpacing: "var(--nx-ls-tight)", marginTop: "0.7rem", textWrap: "balance" };
const body: React.CSSProperties = { fontFamily: F, fontSize: "var(--nx-t-body)", lineHeight: 1.65, color: "var(--nx-fg-graphite)" };

const WHAT = [
  ["Made of the same stuff as protein.", "A peptide is a short chain of amino acids. Protein is a long one. Your body builds thousands of peptides every day to carry messages between organs."],
  ["A message, in your body's own language.", "Insulin is a peptide. So is the signal that tells you that you are full, and the one that tells your body to release growth hormone. A prescription peptide is a precise copy of one of those messages."],
  ["Prescribed, made for you, monitored.", "A licensed U.S. doctor decides whether one fits you, a licensed U.S. pharmacy makes it for you, and at week twelve your blood shows your doctor what it changed."],
] as const;

const TWELVE = [
  ["Day 1", "You start.", "Your doctor's plan arrives cold, with your dose and your schedule in writing. Most peptides are a small injection under the skin with a tiny needle. PT-141 is taken as needed."],
  ["Weeks 1 to 4", "Your body learns the signal.", "GLP-1 doses start low and step up, so your stomach settles. Tesamorelin builds over weeks. Your doctor is reachable if anything feels off."],
  ["Week 4", "A check-in.", "How is it going, what to watch, what to eat. A questionnaire and a message. Your doctor stays reachable."],
  [`Week ${RETEST_WEEK}`, "Your blood tells the story.", `A full panel of ${PANEL_TOTAL_MARKERS} markers, included. Your doctor reads it next to your plan and continues, adjusts or stops.`],
] as const;

const FAQ = [
  { q: "Are peptides steroids?", a: "Peptides are messages your body already sends, made of amino acids. Anabolic steroids are a different class of drug with a different mechanism and different risks. The peptides we prescribe ask your body to do something it already does." },
  { q: "Is this legal?", a: "Yes. Every peptide here is prescription only. A licensed U.S. physician writes the prescription, and a licensed 503A pharmacy compounds it for you. Compounded medications are made for an individual patient under a prescription. They are not FDA-approved drugs, and they are not the branded products." },
  { q: "Will I feel it?", a: "It depends on the peptide. Appetite changes on a GLP-1 are often felt in the first weeks. Tesamorelin works on a slower clock, which is why the week 12 panel matters: some of what changes shows up in your blood before you feel it." },
  { q: "Do I have to inject it?", a: "Most peptides are a small injection under the skin with a very fine needle, the kind people use every day for insulin. Your box comes with everything and plain instructions. PT-141 is used as needed." },
  { q: "What if it is not for me?", a: "Your doctor can say no from your questionnaire, and some do. If it fits, you start. At week 12 your blood and your doctor decide what happens next." },
];

export default function Peptides101() {
  useSeo({
    title: "Peptides 101: what they are and what ours do",
    description: `What a peptide is, in plain words. The four we prescribe, what each one is for, what the first ${RETEST_WEEK} weeks look like, and the honest part.`,
    path: "/peptides-101",
    jsonLd: [
      webPageJsonLd({ name: "Peptides 101", description: "What a peptide is and what ours do, explained for someone new to it.", path: "/peptides-101", type: "MedicalWebPage" }),
      breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Peptides 101", path: "/peptides-101" }]),
      faqJsonLd(FAQ),
    ],
  });

  return (
    <SiteLayout navVariant="showcase">
      <div className="nx-env" aria-hidden="true" />

      <section className="nx-container" style={{ paddingTop: "clamp(3.5rem, 9vh, 6rem)", paddingBottom: "var(--nx-sp-band)" }}>
        <Reveal>
          <p style={kicker}>Peptides 101</p>
          <h1 style={{ fontFamily: S, fontWeight: 500, fontSize: "var(--nx-t-display)", lineHeight: 1, letterSpacing: "var(--nx-ls-display)", color: "var(--nx-fg)", marginTop: "0.8rem", maxWidth: "14ch", textWrap: "balance" }}>
            Peptides, explained the way a friend would.
          </h1>
          <p style={{ ...body, fontSize: "var(--nx-t-lg)", maxWidth: "52ch", marginTop: "1.2rem" }}>
            Your body already makes them. A prescription peptide is a precise version of one of your own signals, made for you by a licensed pharmacy, on a plan a real doctor wrote. Here is the whole idea in five minutes.
          </p>
        </Reveal>
      </section>

      {/* what a peptide is */}
      <section className="nx-container" aria-labelledby="p101-what">
        <Reveal><p style={kicker}>Start here</p><h2 id="p101-what" style={{ ...h2, maxWidth: "18ch" }}>What a peptide actually is.</h2></Reveal>
        <ol className="nx-check-grid" style={{ gridTemplateColumns: "repeat(3, minmax(0, 1fr))" }} data-testid="p101-what">
          {WHAT.map(([t, b], i) => (
            <Reveal key={t} delay={i * 80}>
              <li className="nx-check-item">
                <span className="nx-check-n" aria-hidden="true" style={{ fontFamily: F }}>0{i + 1}</span>
                <p style={{ fontFamily: S, fontWeight: 500, fontSize: "var(--nx-t-xl)", lineHeight: 1.2, color: "var(--nx-fg)", margin: 0 }}>{t}</p>
                <p style={{ ...body, fontSize: "var(--nx-t-base)", margin: "0.5rem 0 0" }}>{b}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </section>

      <SectionLine />

      {/* the four */}
      <section className="nx-container" aria-labelledby="p101-four">
        <Reveal><p style={kicker}>The four we prescribe</p><h2 id="p101-four" style={{ ...h2, maxWidth: "22ch" }}>What each one is for, and what your blood shows at week {RETEST_WEEK}.</h2></Reveal>
        <div style={{ display: "grid", gap: "clamp(1rem, 2vw, 1.4rem)", marginTop: "clamp(1.6rem, 3vw, 2.4rem)" }} data-testid="p101-four">
          {SOLO_CATALOG.map((s, i) => {
            const m = monitoringFor(s.slug);
            return (
              <Reveal key={s.slug} delay={i * 60}>
                <article className="nx-p101-card" data-testid={`p101-${s.slug}`}>
                  <div className="nx-p101-photo"><SkuPhoto slug={s.slug} name={s.name} className="nx-sku-img nx-sku-img--card" /></div>
                  <div>
                    <p style={kicker}>{s.category}</p>
                    <h3 style={{ fontFamily: S, fontWeight: 500, fontSize: "var(--nx-t-h3)", color: "var(--nx-fg)", lineHeight: 1.1, marginTop: "0.4rem" }}>{s.name}. <em style={{ color: "var(--nx-cobalt)" }}>{s.outcome}</em></h3>
                    <p style={{ ...body, marginTop: "0.8rem", maxWidth: "62ch" }}>{s.mechanism}</p>
                    {m && (
                      <p style={{ ...body, fontSize: "var(--nx-t-sm)", marginTop: "0.8rem", maxWidth: "62ch" }}>
                        <span style={{ fontWeight: 600, color: "var(--nx-fg)" }}>At week {RETEST_WEEK} your doctor reads first:</span> {m.watch.join(", ")}. {m.why}
                      </p>
                    )}
                    <Link href={`/peptides/${s.slug}`} className="nx-text-link" style={{ fontFamily: F, fontSize: "var(--nx-t-sm)", fontWeight: 600, marginTop: "0.9rem", display: "inline-block" }}>
                      See {s.name}, the plan and the price
                    </Link>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </section>

      <SectionLine />

      {/* the first twelve weeks */}
      <section className="nx-steps-band" aria-labelledby="p101-twelve">
        <div className="nx-container">
          <Reveal><p style={kicker}>The first {RETEST_WEEK} weeks</p><h2 id="p101-twelve" style={{ ...h2, maxWidth: "20ch" }}>What actually happens, week by week.</h2></Reveal>
          <ol className="nx-steps" style={{ gridTemplateColumns: "repeat(4, minmax(0, 1fr))" }} data-testid="p101-twelve">
            {TWELVE.map(([when, t, b], i) => (
              <Reveal key={t} delay={i * 80}>
                <li className="nx-step">
                  <span className="nx-step-n" aria-hidden="true" style={{ fontFamily: F }}>{when}</span>
                  <p style={{ fontFamily: S, fontWeight: 500, fontSize: "var(--nx-t-xl)", lineHeight: 1.15, color: "var(--nx-fg)", margin: 0 }}>{t}</p>
                  <p style={{ ...body, fontSize: "var(--nx-t-sm)", margin: "0.6rem 0 0" }}>{b}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* the honest part */}
      <section className="nx-container" aria-labelledby="p101-honest" style={{ paddingTop: "var(--nx-sp-sec)" }}>
        <Reveal>
          <p style={kicker}>The honest part</p>
          <h2 id="p101-honest" style={{ ...h2, maxWidth: "20ch" }}>Who it is for, and what your doctor asks first.</h2>
          <p style={{ ...body, maxWidth: "60ch", marginTop: "1rem" }}>
            Peptides are for adults with a goal a doctor can help with. Because you start before any blood is drawn, your questionnaire carries the questions a doctor needs answered first. Answer them straight; some plans end there, and that is the system working.
          </p>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: 14, marginTop: "1.6rem" }} data-testid="p101-screens">
          {SOLO_CATALOG.map((s, i) => {
            const m = monitoringFor(s.slug);
            if (!m) return null;
            return (
              <Reveal key={s.slug} delay={i * 60}>
                <div style={{ background: "var(--nx-ceramic)", border: "1px solid var(--nx-border)", borderRadius: "var(--nx-r-lg)", padding: "1.2rem 1.4rem", height: "100%" }}>
                  <p style={{ fontFamily: S, fontWeight: 500, fontSize: "var(--nx-t-lg)", color: "var(--nx-fg)" }}>{s.name}: what your doctor asks</p>
                  <ul style={{ margin: "0.6rem 0 0", padding: "0 0 0 1.1rem", display: "grid", gap: 4 }}>
                    {m.intakeScreens.map((q) => <li key={q} style={{ ...body, fontSize: "var(--nx-t-sm)" }}>{q}</li>)}
                  </ul>
                </div>
              </Reveal>
            );
          })}
        </div>
        <p style={{ ...body, fontSize: "var(--nx-t-xs)", color: "var(--nx-fg-muted)", marginTop: "1.2rem", maxWidth: "70ch" }}>
          Compounded medications are prepared for you by a licensed 503A pharmacy under a physician's prescription. They are not FDA-approved drugs, and they are not the branded products. Educational content, not medical advice.
        </p>
      </section>

      <SectionLine />

      <section className="nx-container nx-faq-section" aria-labelledby="p101-faq">
        <Reveal><p style={kicker}>Asked by people new to this</p><h2 id="p101-faq" style={{ ...h2, maxWidth: "18ch" }}>The questions everyone asks first.</h2></Reveal>
        <div className="nx-faq-list" data-testid="p101-faq">
          {FAQ.map((it, i) => (
            <Reveal key={it.q} delay={i * 50}>
              <details className="nx-faq-item" open={i === 0}>
                <summary><span>{it.q}</span><span className="nx-faq-plus" aria-hidden /></summary>
                <p className="nx-faq-a">{it.a}</p>
              </details>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="nx-gradient-hero-dark nx-closer" aria-labelledby="p101-closer">
        <div className="nx-container" style={{ textAlign: "center" }}>
          <Reveal>
            <h2 id="p101-closer" style={{ fontFamily: S, fontWeight: 500, fontSize: "var(--nx-t-h1)", color: "var(--nx-ceramic)", lineHeight: 1.05, letterSpacing: "var(--nx-ls-display)", maxWidth: "18ch", margin: "0 auto", textWrap: "balance" }}>
              Now you know what it is. See if it is for you.
            </h2>
            <Link href="/assessment" className="nx-cta-ceramic" data-testid="p101-cta" style={{ fontFamily: F, fontWeight: 600, fontSize: "var(--nx-t-base)", marginTop: "2rem" }}>
              Start your assessment
            </Link>
            <p style={{ fontFamily: F, fontSize: "var(--nx-t-xs)", color: "color-mix(in srgb, var(--nx-acid) 78%, transparent)", marginTop: "0.9rem" }}>
              Two minutes to start.
            </p>
          </Reveal>
        </div>
      </section>
    </SiteLayout>
  );
}
