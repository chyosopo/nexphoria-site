/* JOB: one goal, explained for someone who has never heard of it, ending in a start. */
/* ────────────────────────────────────────────────────────────────
   GOAL PAGE — one template, three live goals (Weight, Strength, Desire)
   Structure (docs/MASTER-PLAN.md, step 4: arrive, understand, choose):
     1. Arrive: the feeling line, the plain explanation, one start.
     2. Understand: what the medicine is and what it does, in plain words.
     3. Choose: the options in this goal, with real photos and prices.
     4. Your first twelve weeks, honestly.
     5. Why your blood is part of it (markers derived from data/monitoring).
     6. The honest part: what the doctor screens for, the FDA wording.
     7. Questions, then start.
   Every line here lives in docs/COPY-DECK.md with its job, feeling and fact.
   Voice: second person, plain, friendly. "Doctor", never "physician",
   except inside legal wording. Nothing that implies an outcome for the reader.
   ──────────────────────────────────────────────────────────────── */
import { Link, useRoute, useLocation } from "wouter";
import { ArrowRight } from "lucide-react";
import { SiteLayout, resolveWorld } from "@/components/SiteLayout";
import { Reveal } from "@/components/Reveal";
import { SkuPhoto } from "@/components/SkuPhoto";
import { useSeo, webPageJsonLd, faqJsonLd, breadcrumbJsonLd, itemListJsonLd } from "@/lib/seo";
import { F, S } from "@/lib/typography";
import { peptides, feelingFor, LIVE_CATEGORIES, type PeptideCategory } from "@/data/peptides";
import { SOLO_CATALOG, type SoloPeptide } from "@/data/soloCatalog";
import { usd } from "@/data/stacksCatalog";
import { PANEL_TOTAL_MARKERS } from "@/data/biomarkerPanel";
import { FULL_PANEL_MARKERS, RETEST_WEEK, monitoringFor } from "@/data/monitoring";
import { JOURNAL_ARTICLES } from "@/data/journal";
import goalMetabolic from "@/assets/life/goal-metabolic.webp";
import goalMetabolic500 from "@/assets/life/goal-metabolic-500.webp";
import goalGrowth from "@/assets/life/goal-growth.webp";
import goalGrowth500 from "@/assets/life/goal-growth-500.webp";
import goalDesire from "@/assets/life/goal-desire.webp";
import goalDesire500 from "@/assets/life/goal-desire-500.webp";

/* Goal → the journal pieces that actually answer it. Every slug exists in
   journal.ts; a missing one is skipped, never rendered empty. */
const GOAL_READING: Partial<Record<PeptideCategory, string[]>> = {
  growth: ["gh-secretagogues-complete-guide", "reading-your-bloodwork"],
  metabolic: ["semaglutide-vs-tirzepatide", "reading-your-bloodwork"],
  "sexual-health": ["what-is-a-peptide", "side-effects-and-contraindications"],
};

const FDA = "Compounded medications are not approved or evaluated by the FDA for safety, effectiveness, or quality.";

type Beat = { when: string; what: string };
type GoalCopy = {
  /** the one-word door the reader came through */
  short: string;
  sub: string;
  photo: string;
  photo500: string;
  photoAlt: string;
  what: { title: string; body: string[] };
  /** only where there is more than one option */
  choose?: { title: string; body: string };
  weeks: Beat[];
  faqs: { q: string; a: string }[];
};

const COPY: Partial<Record<PeptideCategory, GoalCopy>> = {
  metabolic: {
    short: "Weight",
    sub: "Semaglutide and tirzepatide turn the hunger signal down. A U.S. doctor picks one for you from your questionnaire. A licensed U.S. pharmacy makes it. At week 12 your blood shows what changed.",
    photo: goalMetabolic, photo500: goalMetabolic500,
    photoAlt: "A person at a kitchen counter in morning light, calm, a glass of water in hand",
    what: {
      title: "One shot a week that turns hunger down.",
      body: [
        "After you eat, your gut releases a hormone that tells your brain you are full. Semaglutide and tirzepatide copy that hormone and keep the signal on longer. You feel full sooner, stay full longer, and your body handles sugar more steadily.",
        "You take a small dose once a week, under the skin, with a short thin needle. Your doctor starts you low on purpose and raises the dose in steps, so your body has time to settle at each one.",
      ],
    },
    choose: {
      title: "Which one?",
      body: "Semaglutide works on one hunger signal. Tirzepatide works on two. Your doctor chooses from your history, your goal and what is available in your state. You can name a preference in the questionnaire, and your doctor has the final word.",
    },
    weeks: [
      { when: "Week 1", what: "Your first dose, a low one on purpose, so your body can settle." },
      { when: "Weeks 2 to 8", what: "Your dose steps up on your doctor's schedule. Each step waits until the last one feels settled." },
      { when: `Week ${RETEST_WEEK}`, what: "Your blood is drawn. The full panel, included in your plan." },
      { when: "After", what: "Your doctor reads it and sets your dose for the next stretch. Up, the same, or down." },
    ],
    faqs: [
      { q: "Do I have to inject myself?", a: "Yes, once a week, under the skin of your stomach or thigh. The needle is short and thin, it takes a few seconds, and your first box comes with plain instructions." },
      { q: "How is compounded semaglutide different from Ozempic?", a: "Semaglutide is the same active ingredient. Compounded semaglutide is prepared for you by a licensed 503A pharmacy under a physician's prescription. It is not an FDA-approved drug, and it is not the branded product." },
      { q: "What if my doctor says no?", a: "Then it is a no, and they tell you why. Your doctor decides from your questionnaire, and the answer can be that this medicine is wrong for you right now." },
      { q: "Is it available in my state?", a: "In most states, yes. A few states exclude these medicines by law, and the questionnaire asks where you live before anything else." },
    ],
  },
  growth: {
    short: "Strength",
    sub: "Tesamorelin asks your body to release more of its own growth hormone. A U.S. doctor prescribes it from your questionnaire, a licensed U.S. pharmacy makes it, and at week 12 your blood shows the number your dose is set against.",
    photo: goalGrowth, photo500: goalGrowth500,
    photoAlt: "A man in a bright home gym holding a dumbbell mid-curl, a bench and window behind him",
    what: {
      title: "A nightly dose that asks your body for its own growth hormone.",
      body: [
        "Growth hormone is what your body uses to build and repair. Your brain releases it in pulses, mostly at night. Tesamorelin copies the signal that starts those pulses, so your body releases more of its own hormone on its own rhythm. It is studied most for visceral fat, the kind that sits deep around the organs.",
        "You take one small dose every day, under the skin, usually at night. The dose stays the same. What changes is a number in your blood, IGF-1, and that is what your doctor reads at week 12.",
      ],
    },
    weeks: [
      { when: "Week 1", what: "Your first dose, at night, under the skin." },
      { when: "Weeks 2 to 8", what: "The same dose, every night. Consistency is the whole job." },
      { when: `Week ${RETEST_WEEK}`, what: "Your blood is drawn. IGF-1 is the number your doctor reads first." },
      { when: "After", what: "Your dose is set against it. Tesamorelin is capped by that number, so the reading matters." },
    ],
    faqs: [
      { q: "Is this the same as taking growth hormone?", a: "It is different. Growth hormone injections put the hormone in from outside. Tesamorelin asks your body to release its own, in its own pulses, which is why your doctor sets the dose against IGF-1." },
      { q: "Why IGF-1?", a: "Growth hormone itself comes and goes in pulses, so a single blood test misses it. IGF-1 is the steady signal downstream, and it tells your doctor how much your body responded." },
      { q: "What does the doctor screen for?", a: "Active cancer or a history of it, pituitary conditions, and pregnancy. Those questions are in the questionnaire, and your doctor reads every answer." },
    ],
  },
  "sexual-health": {
    short: "Desire",
    sub: "PT-141 works on desire through the brain, on the day you choose. A U.S. doctor prescribes it from your questionnaire, a licensed U.S. pharmacy makes it, and it ships cold to your door.",
    photo: goalDesire, photo500: goalDesire500,
    photoAlt: "Two people at ease together in warm evening light",
    what: {
      title: "A dose you take when you want it, that works through the brain.",
      body: [
        "Most medicines in this area work on blood flow. PT-141 works upstream, on the part of the brain that starts desire, in men and women both. That is why it is used for desire itself, and why you take it on the day rather than every day.",
        "You take a small dose under the skin about an hour before. It stays active for several hours. Because it raises blood pressure for a short while, your doctor checks your heart and your pressure in the questionnaire first.",
      ],
    },
    weeks: [
      { when: "Dose 1", what: "About an hour before. Under the skin, with a short thin needle. You learn how your body times it." },
      { when: "The first weeks", what: "Use it on the days you choose. Your doctor sets a monthly limit, and you stay inside it." },
      { when: `Week ${RETEST_WEEK}`, what: "Your blood is drawn. The full panel, included, with your hormones read for context." },
      { when: "After", what: "Your doctor reviews how it has gone and adjusts the dose, or the plan." },
    ],
    faqs: [
      { q: "Is this like the pills for erections?", a: "A different route. Those work on blood flow in the body. PT-141 works on desire in the brain, so it is for wanting, in men and women, and a doctor looks at your heart and blood pressure before prescribing it." },
      { q: "How fast does it work?", a: "Onset is usually one to three hours, and it stays active for several hours. You find your own timing over the first few doses." },
      { q: "Why does the doctor ask about blood pressure?", a: "A dose raises blood pressure for a few hours. If yours is already high, or your heart has a history, your doctor needs to know before saying yes." },
    ],
  },
};

/* ── shared styles, the same ones the home page uses ── */
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
const label: React.CSSProperties = {
  fontFamily: F, fontSize: "var(--nx-t-xs)", fontWeight: 600, letterSpacing: "var(--nx-ls-caps)",
  textTransform: "uppercase", color: "var(--nx-fg-muted)",
};
const card: React.CSSProperties = {
  background: "var(--nx-bg)", border: "1px solid var(--nx-border)", borderRadius: "var(--nx-r-md)", padding: "1rem 1.15rem",
};

function priceLine(s: SoloPeptide) {
  return s.pricing ? `from ${usd(s.pricing.m12)}/mo` : "Priced at consultation";
}

/** How you take it, in plain words, from the catalog's dose string. */
function howTaken(s: SoloPeptide): string {
  const d = s.dose.toLowerCase();
  if (d.includes("weekly")) return "Once a week, under the skin";
  if (d.includes("as-needed") || d.includes("as needed")) return "On the day you choose, under the skin";
  if (d.includes("daily")) return "Once a day, under the skin";
  return s.dose;
}

/** The markers this goal's doctors read first, in panel order, with the
    reason each is drawn. Derived from data/monitoring, never typed here. */
function goalMarkers(slugs: string[]) {
  const wanted = new Set(slugs.flatMap((s) => monitoringFor(s)?.watch ?? []));
  return FULL_PANEL_MARKERS.filter((m) => wanted.has(m.name));
}
function goalScreens(slugs: string[]) {
  return Array.from(new Set(slugs.flatMap((s) => monitoringFor(s)?.intakeScreens ?? [])));
}
function goalDoseMarkers(slugs: string[]) {
  return slugs
    .map((s) => monitoringFor(s))
    .filter((m): m is NonNullable<typeof m> => Boolean(m?.doseMarker))
    .map((m) => ({ peptide: m.peptide, marker: m.doseMarker! }));
}

export default function Category() {
  const [, params] = useRoute("/goals/:slug");
  const slug = (params?.slug ?? "") as PeptideCategory;
  const copy = COPY[slug];
  const [loc] = useLocation();
  const world = resolveWorld(loc);
  const feeling = feelingFor(slug, world);

  const list = peptides.filter((p) => p.category === slug);
  const skus = list
    .map((p) => SOLO_CATALOG.find((s) => s.slug === p.slug))
    .filter((s): s is SoloPeptide => Boolean(s));
  const slugs = skus.map((s) => s.slug);
  const markers = goalMarkers(slugs);
  const screens = goalScreens(slugs);
  const doseMarkers = goalDoseMarkers(slugs);
  const live = Boolean(copy) && skus.length > 0;

  useSeo({
    title: live ? `${copy!.short}: ${feeling} Prescribed by U.S. doctors` : "Choose a goal",
    description: live ? copy!.sub : "Prescription peptides for weight, strength and desire, prescribed by U.S. licensed doctors.",
    path: `/goals/${slug}`,
    jsonLd: live
      ? [
          webPageJsonLd({ name: `${copy!.short}: ${feeling}`, description: copy!.sub, path: `/goals/${slug}`, type: "MedicalWebPage" }),
          breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Peptides", path: "/peptides" }, { name: copy!.short, path: `/goals/${slug}` }]),
          faqJsonLd(copy!.faqs),
          itemListJsonLd({
            name: `${copy!.short} peptides`,
            description: copy!.sub,
            items: skus.map((s) => ({ name: s.name, path: `/peptides/${s.slug}` })),
          }),
        ]
      : [],
  });

  /* A goal with nothing behind it yet: send the reader to the ones that
     are live rather than a blank page. */
  if (!live) {
    const doors = LIVE_CATEGORIES.map((c) => ({ c, copy: COPY[c] })).filter((d) => d.copy);
    return (
      <SiteLayout navVariant={world} footerVariant={world}>
        <section className="nx-container" style={{ paddingTop: "var(--nx-sp-sec)", paddingBottom: "var(--nx-sp-sec)" }} aria-labelledby="category-notfound-title">
          <p style={kicker}>Choose a goal</p>
          <h1 id="category-notfound-title" style={{ ...h2, fontSize: "var(--nx-t-h1)", maxWidth: "16ch" }}>This area opens later. Start with one of these.</h1>
          <div className="mt-8 flex flex-wrap gap-2" role="list">
            {doors.map((d) => (
              <Link key={d.c} href={`/goals/${d.c}`} className="nx-chip" role="listitem" style={{ fontFamily: F }} data-testid={`cat-door-${d.c}`}>
                {d.copy!.short} <ArrowRight size={15} aria-hidden style={{ marginLeft: 6 }} />
              </Link>
            ))}
            <Link href="/peptides-101" className="nx-chip nx-chip-ghost" role="listitem" style={{ fontFamily: F }}>New to peptides? Start here</Link>
          </div>
        </section>
      </SiteLayout>
    );
  }

  const cfg = copy!;
  const assessmentHref = `/assessment?gender=${world === "women" ? "female" : "male"}&goal=${slug}`;

  return (
    <SiteLayout navVariant={world} footerVariant={world}>
      {/* ── 1. Arrive ── */}
      <section className="nx-container" style={{ paddingTop: "var(--nx-sp-sec)", paddingBottom: "var(--nx-sp-band)" }} aria-labelledby="category-hero-title">
        <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-10 lg:gap-16 items-center">
          <div>
            <p style={kicker} data-testid="cat-eyebrow">{cfg.short} · Prescribed by U.S. licensed doctors</p>
            <h1 id="category-hero-title" style={{ fontFamily: S, fontWeight: 500, fontSize: "var(--nx-t-display)", lineHeight: 1.04, letterSpacing: "var(--nx-ls-display)", color: "var(--nx-fg)", maxWidth: "14ch", marginTop: "0.9rem", textWrap: "balance" }} data-testid="cat-h1">
              {feeling}
            </h1>
            <p style={{ ...body, fontSize: "var(--nx-t-lg)", marginTop: "1.1rem" }} data-testid="cat-sub">{cfg.sub}</p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link href={assessmentHref} className="nx-cta-cobalt inline-flex items-center gap-2" data-testid="cat-cta-start">
                Start your assessment <ArrowRight size={17} strokeWidth={2} />
              </Link>
              <Link href="/peptides-101" className="nx-cta-ghost inline-flex items-center gap-2" data-testid="cat-cta-101">
                New to peptides? Start here
              </Link>
            </div>
            <p style={{ ...small, fontSize: "var(--nx-t-xs)", color: "var(--nx-fg-muted)", marginTop: "0.9rem" }}>Two minutes to start. Your doctor decides from your answers.</p>
          </div>
          <Reveal delay={80} className="nx-reveal-lift">
            <div style={{ borderRadius: "var(--nx-r-lg)", overflow: "hidden", boxShadow: "var(--nx-e-3)", aspectRatio: "4 / 5", border: "1px solid var(--nx-border)", background: "var(--nx-ceramic)" }}>
              <img src={cfg.photo} srcSet={`${cfg.photo500} 500w, ${cfg.photo} 1000w`} sizes="(max-width: 1024px) 100vw, 45vw" alt={cfg.photoAlt} width={1000} height={1250} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} loading="eager" decoding="async" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── 2. Understand ── */}
      <section style={{ background: "var(--nx-ceramic)", borderTop: "1px solid var(--nx-border)", borderBottom: "1px solid var(--nx-border)" }} aria-labelledby="category-what-title">
        <div className="nx-container grid lg:grid-cols-[0.9fr_1.1fr] gap-8 lg:gap-16" style={{ paddingTop: "var(--nx-sp-band)", paddingBottom: "var(--nx-sp-band)" }}>
          <Reveal>
            <p style={kicker}>What it is</p>
            <h2 id="category-what-title" style={{ ...h2, maxWidth: "18ch" }} data-testid="cat-what">{cfg.what.title}</h2>
          </Reveal>
          <Reveal delay={60}>
            <div style={{ display: "grid", gap: "1rem" }}>
              {cfg.what.body.map((p) => <p key={p} style={body}>{p}</p>)}
              <p style={small}>
                Want the longer version?{" "}
                <Link href="/peptides-101" className="nx-text-link" style={{ fontWeight: 600 }}>Peptides 101 explains it from the start</Link>
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── 3. Choose ── */}
      <section className="nx-container" style={{ paddingTop: "var(--nx-sp-band)", paddingBottom: "var(--nx-sp-band)" }} aria-labelledby="category-options-title">
        <Reveal>
          <p style={kicker}>Your options</p>
          <h2 id="category-options-title" style={{ ...h2, maxWidth: "18ch" }}>
            {skus.length === 1 ? "One medicine, made for you." : `${skus.length === 2 ? "Two" : String(skus.length)} medicines. Your doctor picks one.`}
          </h2>
        </Reveal>
        <div className="grid gap-4 sm:grid-cols-2" style={{ marginTop: "clamp(1.4rem,3vw,2.2rem)", maxWidth: 820 }}>
          {skus.map((s, i) => (
            <Reveal key={s.slug} delay={i * 70} className="nx-reveal-lift">
              <Link href={`/${world}/peptides/${s.slug}`} className="nx-sku-tile" data-testid={`cat-item-${s.slug}`} aria-label={`${s.name}: ${s.outcome}`}>
                <div className="nx-sku-photo"><SkuPhoto slug={s.slug} name={s.name} /></div>
                <p style={{ fontFamily: S, fontStyle: "italic", fontWeight: 500, fontSize: "var(--nx-t-lg)", lineHeight: 1.25, color: "var(--nx-fg)", margin: 0 }}>{s.outcome}</p>
                <p style={{ fontFamily: F, fontWeight: 600, fontSize: "var(--nx-t-base)", color: "var(--nx-fg)", margin: "0.6rem 0 0" }}>{s.name}</p>
                <p style={{ ...small, margin: "0.25rem 0 0" }}>{howTaken(s)}</p>
                <p className="nx-sku-price" style={{ fontFamily: F }}>{priceLine(s)}</p>
              </Link>
            </Reveal>
          ))}
        </div>
        {cfg.choose && (
          <Reveal>
            <div style={{ ...card, background: "var(--nx-ceramic)", marginTop: "1.2rem", maxWidth: 820, padding: "1.2rem 1.4rem" }} data-testid="cat-choose">
              <p style={label}>{cfg.choose.title}</p>
              <p style={{ ...body, marginTop: "0.4rem" }}>{cfg.choose.body}</p>
            </div>
          </Reveal>
        )}
        <p style={{ ...small, fontSize: "var(--nx-t-xs)", color: "var(--nx-fg-muted)", marginTop: "1rem" }}>Prescription only. Your doctor decides, and can decline. Availability varies by state.</p>
      </section>

      {/* ── 4. Your first twelve weeks ── */}
      <section style={{ background: "var(--nx-ceramic)", borderTop: "1px solid var(--nx-border)", borderBottom: "1px solid var(--nx-border)" }} aria-labelledby="category-weeks-title">
        <div className="nx-container grid lg:grid-cols-[0.9fr_1.1fr] gap-8 lg:gap-16" style={{ paddingTop: "var(--nx-sp-band)", paddingBottom: "var(--nx-sp-band)" }}>
          <Reveal>
            <p style={kicker}>Your first {RETEST_WEEK} weeks</p>
            <h2 id="category-weeks-title" style={{ ...h2, maxWidth: "14ch" }}>What actually happens, week by week.</h2>
            <p style={{ ...body, marginTop: "1rem" }}>You start first. Your doctor prescribes from your questionnaire, and your blood is read at week {RETEST_WEEK}, when there is something to read.</p>
          </Reveal>
          <Reveal delay={60}>
            <ol className="nx-timeline" data-testid="cat-weeks">
              {cfg.weeks.map((b, i) => (
                <li key={b.when} className="nx-timeline__row">
                  <div className="nx-timeline__rail" aria-hidden>
                    <span className="nx-timeline__dot" />
                    <span className="nx-timeline__idx">{String(i + 1).padStart(2, "0")}</span>
                  </div>
                  <div>
                    <p style={{ fontFamily: F, fontWeight: 600, fontSize: "var(--nx-t-base)", color: "var(--nx-fg)", margin: 0 }}>{b.when}</p>
                    <p style={{ ...body, marginTop: "0.3rem" }}>{b.what}</p>
                  </div>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </section>

      {/* ── 5. Why your blood is part of it ── */}
      {markers.length > 0 && (
        <section className="nx-container" style={{ paddingTop: "var(--nx-sp-band)", paddingBottom: "var(--nx-sp-band)" }} aria-labelledby="category-blood-title" data-testid="cat-blood">
          <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr]" style={{ gap: "clamp(1.4rem,3vw,2.6rem)" }}>
            <Reveal>
              <p style={kicker}>Why your blood is part of it</p>
              <h2 id="category-blood-title" style={{ ...h2, maxWidth: "16ch" }}>At week {RETEST_WEEK}, your blood tells your doctor what changed.</h2>
              <p style={{ ...body, marginTop: "1rem" }}>
                A full panel of {PANEL_TOTAL_MARKERS} markers is drawn, included in your plan. These are the ones your doctor reads first for this goal, and why.
              </p>
              {doseMarkers.map((d) => (
                <p key={d.peptide} style={{ ...small, marginTop: "0.8rem" }}>{d.peptide}'s dose is set against {d.marker}.</p>
              ))}
              <p style={{ ...small, marginTop: "0.8rem" }}>
                <Link href="/bloodwork" className="nx-text-link" style={{ fontWeight: 600 }}>See every marker in the panel and why it is there</Link>
              </p>
            </Reveal>
            <Reveal delay={60}>
              <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gap: 10 }}>
                {markers.map((m) => (
                  <li key={m.name} style={card}>
                    <p style={{ fontFamily: F, fontWeight: 600, fontSize: "var(--nx-t-base)", color: "var(--nx-fg)", margin: 0 }}>{m.name}</p>
                    <p style={{ ...small, marginTop: "0.25rem" }}>{m.why}</p>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </section>
      )}

      {/* ── 6. The honest part ── */}
      <section className="nx-gradient-hero-dark" style={{ padding: "var(--nx-sp-band) 0" }} aria-labelledby="category-honest-title">
        <div className="nx-container grid lg:grid-cols-[0.9fr_1.1fr] gap-8 lg:gap-16">
          <Reveal>
            <p style={{ ...kicker, color: "var(--nx-acid)" }}>The honest part</p>
            <h2 id="category-honest-title" style={{ ...h2, color: "var(--nx-ceramic)", maxWidth: "16ch" }}>Your doctor decides. Here is what they ask first.</h2>
            <p style={{ ...body, color: "var(--nx-ceramic)", opacity: 0.85, marginTop: "1rem" }}>
              These questions are in the questionnaire because your doctor prescribes from it, before any blood is drawn. Answer them straight. A no from your doctor is them doing their job.
            </p>
          </Reveal>
          <Reveal delay={60}>
            <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gap: 10 }} data-testid="cat-screens">
              {screens.map((q) => (
                <li key={q} className="nx-stat-card on-dark" style={{ flexDirection: "row", alignItems: "flex-start" }}>
                  <p style={{ fontFamily: F, fontSize: "var(--nx-t-base)", lineHeight: 1.5, color: "var(--nx-ceramic)", margin: 0 }}>{q}</p>
                </li>
              ))}
            </ul>
            <p style={{ ...small, fontSize: "var(--nx-t-xs)", color: "var(--nx-ceramic)", opacity: 0.7, marginTop: "1.2rem" }}>{FDA} Availability varies by state.</p>
          </Reveal>
        </div>
      </section>

      {/* ── 7. Questions ── */}
      <section className="nx-container" style={{ paddingTop: "var(--nx-sp-band)", paddingBottom: "var(--nx-sp-band)", maxWidth: 860 }} aria-labelledby="category-faq-title">
        <Reveal>
          <p style={kicker}>Your questions</p>
          <h2 id="category-faq-title" style={{ ...h2, maxWidth: "18ch" }}>What people ask before they start.</h2>
          <div className="mt-6">
            {cfg.faqs.map((f, i) => (
              <details key={f.q} className="nx-faq-item" open={i === 0}>
                <summary>
                  <span>{f.q}</span>
                  <span className="nx-faq-plus" aria-hidden />
                </summary>
                <p className="nx-faq-a">{f.a}</p>
              </details>
            ))}
          </div>
        </Reveal>
      </section>

      {/* ── Read more ── */}
      {(() => {
        const reads = (GOAL_READING[slug] ?? [])
          .map((s) => JOURNAL_ARTICLES.find((a) => a.slug === s))
          .filter((a): a is NonNullable<typeof a> => Boolean(a));
        if (reads.length === 0) return null;
        return (
          <section className="nx-container" style={{ paddingBottom: "var(--nx-sp-band)" }} aria-labelledby="cat-reading-title">
            <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", flexWrap: "wrap", gap: 10 }}>
              <h2 id="cat-reading-title" style={{ fontFamily: S, fontWeight: 500, fontSize: "var(--nx-t-h3)", color: "var(--nx-fg)" }}>Read more, if you like.</h2>
              <Link href="/journal" className="nx-text-link" style={{ fontFamily: F, fontSize: "var(--nx-t-sm)", fontWeight: 600 }}>
                The journal <ArrowRight size={15} aria-hidden />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2" style={{ gap: 14, marginTop: "1.2rem" }}>
              {reads.map((a) => (
                <Link key={a.slug} href={`/journal/${a.slug}`} className="nx-float-card" data-testid={`cat-read-${a.slug}`}>
                  <div className="nx-float-card__body">
                    <p style={{ ...label, color: "var(--nx-cobalt)" }}>{a.eyebrow}</p>
                    <h3 style={{ fontFamily: S, fontWeight: 500, fontSize: "var(--nx-t-lg)", color: "var(--nx-fg)", marginTop: "0.45rem", lineHeight: 1.15 }}>{a.title}</h3>
                    <p className="nx-line-2" style={{ ...small, marginTop: "0.4rem" }}>{a.dek}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        );
      })()}

      {/* ── Start ── */}
      <section className="nx-container" style={{ paddingBottom: "var(--nx-sp-sec)" }} aria-labelledby="category-cta-title">
        <div className="nx-glass-card" style={{ padding: "var(--nx-sp-band)", textAlign: "center" }}>
          <h2 id="category-cta-title" style={{ ...h2, marginTop: 0 }}>Your questionnaire. Your doctor. Your plan.</h2>
          <p style={{ ...body, margin: "0.7rem auto 0" }}>Two minutes of honest answers. A U.S. licensed doctor reads them and decides. If it is a yes, your medicine is made for you and ships cold.</p>
          <Link href={assessmentHref} className="nx-cta-cobalt inline-flex items-center gap-2 mt-6" data-testid="cat-cta-end">
            Start your assessment <ArrowRight size={17} strokeWidth={2} />
          </Link>
          <p style={{ ...small, fontSize: "var(--nx-t-xs)", color: "var(--nx-fg-muted)", marginTop: "1.4rem" }}>{FDA} Availability varies by state.</p>
        </div>
      </section>
    </SiteLayout>
  );
}
