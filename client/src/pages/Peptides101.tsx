/* ═══ PEPTIDES 101 — the teaching page (docs/MASTER-PLAN.md, Part 3)

   For someone who has never heard of a peptide. The excited expert, in the
   "you" voice: what a peptide is, the medicines we prescribe and what each
   is for, what the first twelve weeks look like, who it is for, and the
   honest part. Every fact comes from the catalog and data/monitoring.ts; the
   FDA line is verbatim. Passed for the plain deck (docs/COPY-DECK-PLAIN.md). */
import { Link } from "wouter";
import { SiteLayout } from "@/components/SiteLayout";
import { Reveal } from "@/components/Reveal";
import { SectionLine } from "@/components/SectionLine";
import { useSeo, webPageJsonLd, breadcrumbJsonLd, faqJsonLd } from "@/lib/seo";
import { F, S } from "@/lib/typography";
import { SOLO_CATALOG, type SoloCategory } from "@/data/soloCatalog";
import { RETEST_WEEK } from "@/data/monitoring";
import { PANEL_TOTAL_MARKERS } from "@/data/biomarkerPanel";

const body: React.CSSProperties = { fontFamily: F, fontSize: "var(--nx-t-body)", lineHeight: 1.65, color: "var(--nx-fg-graphite)" };

const WHAT = [
  ["A peptide is made of amino acids.", "A peptide is a short chain of amino acids. Protein is a long one. Your body builds thousands of peptides every day to carry messages between organs."],
  ["A peptide is a message your body already sends.", "Insulin is a peptide. So is the signal that tells you that you are full, and the one that tells your body to release growth hormone. A prescription peptide is a precise copy of one of those messages."],
  ["A prescription peptide is prescribed, made for you and monitored.", "A licensed U.S. doctor decides whether one fits you, a licensed U.S. pharmacy makes it for you, and at week twelve your blood shows your doctor what it changed."],
] as const;

/* The families a newcomer can actually hold in their head, instead of a wall
   of twenty-two. Each teaches how that class works; the member names and the
   count come from the catalog, so this can never drift from what we carry. */
const FAMILIES: { name: string; how: string; cats: SoloCategory[]; goal: string }[] = [
  { name: "GLP-1 medicines", cats: ["Metabolic"], goal: "metabolic",
    how: "A GLP-1 is a hormone your gut releases after you eat. It tells your brain you are full and steadies your blood sugar. These medicines are a longer-lasting version of that signal, so you feel full sooner and think about food less." },
  { name: "Growth hormone peptides", cats: ["Growth"], goal: "growth",
    how: "Your body releases growth hormone in pulses, mostly while you sleep. These peptides prompt those pulses, so your body makes more of its own rather than taking it from outside. Best studied for abdominal fat and lean mass." },
  { name: "Repair peptides", cats: ["Recovery"], goal: "recovery",
    how: "When tissue is injured, your body sends a repair signal and moves repair cells to the site. These peptides are studied for both halves of that, for tendons, muscle, joints and the gut lining." },
  { name: "Focus, mood and sleep", cats: ["Cognitive", "Sleep"], goal: "cognition",
    how: "Some peptides act on the brain: on the proteins it uses to build connections, on its stress response, and on the sleep cycle. Two are nasal sprays; the sleep one is taken at night." },
  { name: "Longevity and skin", cats: ["Skin & Longevity"], goal: "skin",
    how: "These work at the cellular level: the coenzyme every cell uses for energy, the signals mitochondria send, and the copper peptide behind collagen and skin repair." },
  { name: "Hormones and sexual health", cats: ["Hormone", "Sexual Health"], goal: "hormone",
    how: "Testosterone replacement, dosed against your own blood work, with a peptide that keeps your own production working underneath it; and, for desire and function, medicines taken on the day you choose." },
];

const membersOf = (cats: SoloCategory[]) =>
  SOLO_CATALOG.filter((s) => cats.includes(s.category)).map((s) => s.name);

const TWELVE = [
  ["Before day 1", "Your blood kit.", `Your medicine ships cold with an at-home blood kit of ${PANEL_TOTAL_MARKERS} markers, included. You draw before your first dose and your doctor sets the dose from the results.`],
  ["Day 1", "You start.", "Your dose and your schedule arrive in writing. Most peptides are a small injection under the skin with a tiny needle. PT-141 is taken as needed."],
  ["Weeks 1 to 4", "The first weeks.", "GLP-1 doses start low and step up, so your stomach settles. Tesamorelin builds over weeks."],
  [`Week ${RETEST_WEEK}`, "Your blood test.", `The same ${PANEL_TOTAL_MARKERS} markers again. Your doctor compares the two and continues, adjusts or stops the dose.`],
] as const;

const FAQ = [
  { q: "Are peptides steroids?", a: "Peptides are messages your body already sends, made of amino acids. Anabolic steroids are a different class of drug with a different mechanism and different risks. The peptides we prescribe ask your body to do something it already does." },
  { q: "Is this legal?", a: "Yes. Every peptide here is prescription only. A licensed U.S. physician writes the prescription, and a licensed 503A pharmacy compounds it for you. Compounded medications are made for an individual patient under a prescription. They are not FDA-approved drugs, and they are not the branded products." },
  { q: "Will I feel it?", a: "It depends on the peptide. Appetite changes on a GLP-1 are often felt in the first weeks. Tesamorelin works on a slower clock, which is why the week 12 panel matters: some of what changes shows up in your blood before you feel it." },
  { q: "Do I have to inject it?", a: "Most peptides are a small injection under the skin with a very fine needle, the kind people use every day for insulin. Your box comes with everything and plain instructions. PT-141 is used as needed." },
  { q: "What if it is not for me?", a: "Your doctor can say no from your questionnaire, and some do. If it fits, your medication ships with an at-home blood kit, included, and you start. At week 12 your blood and your doctor decide what happens next." },
];

export default function Peptides101() {
  useSeo({
    title: "Peptides 101: what they are and what ours do",
    description: `What a peptide is, in plain words. The medicines we prescribe, what each one is for, what the first ${RETEST_WEEK} weeks look like, and the honest part.`,
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
          <p className="nx-eyebrow">Peptides 101</p>
          <h1 style={{ fontFamily: S, fontWeight: 500, fontSize: "var(--nx-t-display)", lineHeight: 1, letterSpacing: "var(--nx-ls-display)", color: "var(--nx-fg)", marginTop: "0.8rem", maxWidth: "14ch", textWrap: "balance" }}>
            What peptides are, and what ours do.
          </h1>
          <p style={{ ...body, fontSize: "var(--nx-t-lg)", maxWidth: "52ch", marginTop: "1.2rem" }}>
            Your body already makes thousands of peptides. They are the signals that tell cells what to do. A prescription peptide is a precise version of one of them, made for you in a licensed pharmacy. Here is what they are, what the medicines we prescribe do, and what your first twelve weeks look like.
          </p>
        </Reveal>
      </section>

      {/* what a peptide is */}
      <section className="nx-container" aria-labelledby="p101-what">
        <Reveal><div className="nx-sec-head"><p className="nx-eyebrow">Start here</p><h2 id="p101-what" className="nx-dsh2" style={{ maxWidth: "18ch" }}>What a peptide is.</h2></div></Reveal>
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
        <Reveal><div className="nx-sec-head"><p className="nx-eyebrow">The medicines we prescribe</p><h2 id="p101-four" className="nx-dsh2" style={{ maxWidth: "22ch" }}>Peptides come in a few families.</h2>
          <p className="nx-lede">Every medicine belongs to one of a few families. Once you know yours, the choice makes sense. The catalog shows what each one treats and its price.</p>
        </div></Reveal>
        <div className="nx-p101-families" data-testid="p101-four">
          {FAMILIES.map((fam, i) => {
            const members = membersOf(fam.cats);
            return (
              <Reveal key={fam.name} delay={i * 60}>
                <article className="nx-p101-fam">
                  <h3 style={{ fontFamily: S, fontWeight: 500, fontSize: "var(--nx-t-h3)", color: "var(--nx-fg)", lineHeight: 1.1 }}>{fam.name}</h3>
                  <p style={{ ...body, marginTop: "0.7rem" }}>{fam.how}</p>
                  <p style={{ ...body, fontSize: "var(--nx-t-sm)", color: "var(--nx-fg-muted)", marginTop: "0.8rem" }}>{members.slice(0, 4).join(" · ")}{members.length > 4 ? " and more" : ""}</p>
                  <Link href={`/goals/${fam.goal}`} className="nx-text-link" style={{ fontFamily: F, fontSize: "var(--nx-t-sm)", fontWeight: 600, marginTop: "0.8rem", display: "inline-block" }}>See these medicines</Link>
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
          <Reveal><div className="nx-sec-head"><p className="nx-eyebrow">The first {RETEST_WEEK} weeks</p><h2 id="p101-twelve" className="nx-dsh2" style={{ maxWidth: "20ch" }}>What happens, week by week.</h2></div></Reveal>
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
      <section className="nx-container nx-sec" aria-labelledby="p101-honest">
        <Reveal>
          <div className="nx-sec-head">
            <p className="nx-eyebrow">The honest part</p>
            <h2 id="p101-honest" className="nx-dsh2" style={{ maxWidth: "20ch" }}>Who it is for, and what is screened for.</h2>
            <p className="nx-lede">
              Peptides are for adults with a goal a doctor can help with. Because you start before any blood is drawn, your questionnaire carries the questions a doctor needs answered first. Some plans end there.
            </p>
          </div>
        </Reveal>
        <ul className="nx-p101-screens" data-testid="p101-screens">
          {[
            ["Your history", "Any cancer now or in the past, and any heart, liver or kidney condition."],
            ["Pregnancy", "Whether you are pregnant, breastfeeding or planning to be."],
            ["Your medicines", "Everything you already take, so nothing interacts."],
            ["Your goal", "What you are treating, so the doctor matches the medicine to it, or says none fits."],
          ].map(([t, b], i) => (
            <Reveal key={t} delay={i * 60}>
              <li className="nx-p101-screen">
                <p style={{ fontFamily: S, fontWeight: 500, fontSize: "var(--nx-t-lg)", color: "var(--nx-fg)" }}>{t}</p>
                <p style={{ ...body, fontSize: "var(--nx-t-sm)", marginTop: "0.3rem" }}>{b}</p>
              </li>
            </Reveal>
          ))}
        </ul>
        <p style={{ ...body, fontSize: "var(--nx-t-xs)", color: "var(--nx-fg-muted)", marginTop: "1.2rem", maxWidth: "70ch" }}>
          Compounded medications are prepared for you by a licensed 503A pharmacy under a physician's prescription. They are not FDA-approved drugs, and they are not the branded products. Educational content, not medical advice.
        </p>
      </section>

      <SectionLine />

      <section className="nx-container nx-faq-section" aria-labelledby="p101-faq">
        <Reveal><div className="nx-sec-head"><p className="nx-eyebrow">Asked by people new to this</p><h2 id="p101-faq" className="nx-dsh2" style={{ maxWidth: "18ch" }}>Common questions.</h2></div></Reveal>
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
              The next step is a physician.
            </h2>
            <Link href="/assessment" className="nx-cta-ceramic" data-testid="p101-cta" style={{ fontFamily: F, fontWeight: 600, fontSize: "var(--nx-t-base)", marginTop: "2rem" }}>
              See if I'm eligible
            </Link>
            <p style={{ fontFamily: F, fontSize: "var(--nx-t-xs)", color: "color-mix(in srgb, var(--nx-acid) 78%, transparent)", marginTop: "0.9rem" }}>
              A few health questions, read by a licensed U.S. physician.
            </p>
          </Reveal>
        </div>
      </section>
    </SiteLayout>
  );
}
