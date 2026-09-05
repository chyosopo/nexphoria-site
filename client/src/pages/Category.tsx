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
import { VialPanel, labelSpec } from "@/components/VialMockup";
import { ProductTile } from "@/components/ProductTile";
import { BodyMap } from "@/components/BodyMap";
import { benefitFor, REGION_LABEL } from "@/data/benefits";
import { useSeo, webPageJsonLd, faqJsonLd, breadcrumbJsonLd, itemListJsonLd } from "@/lib/seo";
import { F, S } from "@/lib/typography";
import { peptides, LIVE_CATEGORIES, type PeptideCategory } from "@/data/peptides";
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
import { BASELINE } from "@/data/monitoring";
import { StatusPill } from "@/components/StatusPill";
import { AddonsFor } from "@/components/AddonsFor";
import { ExpectTimeline } from "@/components/ExpectTimeline";
import { statusOf } from "@/data/soloCatalog";

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
  /** the medicine-led headline */
  headline: string;
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
    short: "Weight loss",
    headline: "GLP-1 weight loss medication, prescribed online.",
    sub: "Semaglutide and tirzepatide help you feel full sooner and stay full longer. Answer a few health questions, and a licensed U.S. physician will prescribe the one that is right for you. Made in a licensed U.S. pharmacy and delivered cold to your door.",
    photo: goalMetabolic, photo500: goalMetabolic500,
    photoAlt: "A person at a kitchen counter in morning light, calm, a glass of water in hand",
    what: {
      title: "How GLP-1 medicines work.",
      body: [
        "GLP-1 is a hormone your body releases after you eat. It tells your brain you are full and slows down digestion. Semaglutide and tirzepatide are longer-lasting versions of that signal, so you feel full sooner, think about food less, and your blood sugar stays steadier. Tirzepatide works on a second hormone, GIP, as well.",
        "You take a small injection under the skin once a week. Your physician starts you on a low dose and increases it step by step over the first few weeks, which keeps side effects like nausea manageable.",
      ],
    },
    choose: {
      title: "Which one is prescribed?",
      body: "Semaglutide works on one hormone, tirzepatide on two. Your physician chooses based on your health history, your goal and what is available in your state. You can tell us your preference in the health questions.",
    },
    weeks: [
      { when: BASELINE.when, what: "Your baseline blood kit arrives with your first order, included. Draw at home; your physician sets your dose from the results." },
      { when: "Week 1", what: "Your first dose, at the lowest step. Your medication arrives cold, with instructions." },
      { when: "Weeks 2 to 8", what: "Your dose increases step by step on your physician's schedule." },
      { when: `Week ${RETEST_WEEK}`, what: "Your blood test, included in your plan." },
      { when: "After", what: "Your physician reviews your results and adjusts your dose for the next stretch." },
    ],
    faqs: [
      { q: "How do I take it?", a: "A small injection under the skin of your stomach or thigh, once a week. The needle is short and thin, it takes a few seconds, and clear instructions come with your first shipment." },
      { q: "How is compounded semaglutide different from Ozempic?", a: "Semaglutide is the same active ingredient. Compounded semaglutide is prepared for you by a licensed 503A pharmacy under a physician's prescription. It is not an FDA-approved drug, and it is not the branded product." },
      { q: "What if it is not right for me?", a: "Your physician will tell you why. For some people the answer is to wait, or to try a different treatment, and the refund policy explains what is refunded." },
      { q: "Is it available in my state?", a: "In most states. A few restrict compounded GLP-1 medication by law, so the health questions ask where you live first." },
    ],
  },
  growth: {
    short: "Body composition",
    headline: "Tesamorelin for body composition, prescribed online.",
    sub: "A daily peptide that helps your body release more of its own growth hormone, used for stubborn abdominal fat and lean mass. Prescribed by a licensed U.S. physician, made in a licensed U.S. pharmacy, and dosed against your own IGF-1 at week 12.",
    photo: goalGrowth, photo500: goalGrowth500,
    photoAlt: "A man in a bright home gym holding a dumbbell mid-curl, a bench and window behind him",
    what: {
      title: "How tesamorelin works.",
      body: [
        "Growth hormone is what your body uses to build and repair. It is released in pulses, mostly while you sleep. Tesamorelin copies the signal that triggers those pulses, so your body makes more of its own growth hormone rather than getting it from outside. It is best studied for visceral fat, the deep fat around your organs, and it supports lean muscle.",
        "You take a small injection under the skin once a day, usually in the evening. The dose stays the same. What changes is IGF-1 in your blood, which is the number your physician checks at week 12.",
      ],
    },
    weeks: [
      { when: BASELINE.when, what: "Your baseline blood kit arrives with your first order, included. Draw at home; your physician sets your dose from the results." },
      { when: "Week 1", what: "Your first dose, in the evening. Your medication arrives cold, with instructions." },
      { when: "Weeks 2 to 8", what: "The same dose every day. The effect builds gradually." },
      { when: `Week ${RETEST_WEEK}`, what: "Your blood test, included. IGF-1 is read first." },
      { when: "After", what: "Your physician confirms or adjusts your dose against your IGF-1." },
    ],
    faqs: [
      { q: "Is this the same as taking growth hormone?", a: "It is different. Growth hormone injections put the hormone in from outside. Tesamorelin helps your body release its own, in its own natural pulses, which is why your physician sets the dose against your IGF-1." },
      { q: "Why IGF-1?", a: "Growth hormone rises and falls in pulses, so a single blood test misses it. IGF-1 is the steady marker downstream, and it shows how much your body has responded." },
      { q: "Is it safe for me?", a: "Your physician checks for active cancer or a history of it, pituitary conditions, and pregnancy before prescribing. Those questions are part of your health questions." },
    ],
  },
  recovery: {
    short: "Recovery",
    headline: "Recovery peptides for injuries and training, prescribed online.",
    sub: "BPC-157 and TB-500 support the way your body repairs tendons, muscle, joints and the gut lining. Answer a few health questions, and a licensed U.S. physician will prescribe the plan that fits. Made in a licensed U.S. pharmacy and delivered cold to your door.",
    photo: "img/img_fad0fee022a9.webp", photo500: "img/img_fad0fee022a9.webp",
    photoAlt: "A climber chalking up at the crag in morning light",
    what: {
      title: "How BPC-157 and TB-500 work.",
      body: [
        "When tissue is injured, your body sends repair signals and moves repair cells to the site. BPC-157 is studied for the signal: it supports blood vessel growth and the repair of tendons, ligaments, muscle and the gut lining. TB-500, a fragment of a protein called thymosin beta-4, is studied for the second half: moving repair cells to where they are needed.",
        "BPC-157 is one small injection a day. TB-500 is two a week. Many people take both, which is why the pair is offered as one plan.",
      ],
    },
    choose: {
      title: "Which one is prescribed?",
      body: "BPC-157 on its own suits a specific injury or gut complaint. TB-500 suits whole-body recovery from training. The pair covers both. Your physician confirms the fit from your health questions.",
    },
    weeks: [
      { when: BASELINE.when, what: "Your baseline blood kit arrives with your first order, included. Draw at home; your physician sets your dose from the results." },
      { when: "Week 1", what: "Your first doses. Your medication arrives cold, with instructions." },
      { when: "Weeks 2 to 8", what: "Daily or twice weekly, through your recovery." },
      { when: `Week ${RETEST_WEEK}`, what: "Your blood test, included. Inflammation markers are read first." },
      { when: "After", what: "Your physician reviews your results and decides whether to continue." },
    ],
    faqs: [
      { q: "Where do I inject it?", a: "Under the skin, usually the abdomen. For a specific injury, near the site. Instructions come with your first shipment." },
      { q: "Can I keep training?", a: "Most people do, at a level their body tolerates. Your physician can advise from your health questions." },
      { q: "Is it right for me?", a: "Your physician checks for active cancer or a history of it, and pregnancy or breastfeeding, before prescribing. Those questions are part of your health questions." },
    ],
  },
  skin: {
    short: "Skin and ageing",
    headline: "GHK-Cu and epitalon for skin and healthy ageing, prescribed online.",
    sub: "GHK-Cu is a copper peptide studied for collagen and skin repair. Epitalon is a short course studied for telomere maintenance and the sleep-wake cycle. Prescribed by a licensed U.S. physician, made in a licensed U.S. pharmacy, and delivered cold to your door.",
    photo: "img/img_3678caab4727.webp", photo500: "img/img_3678caab4727.webp",
    photoAlt: "A woman in a cream robe in golden light, skin catching the sun",
    what: {
      title: "How GHK-Cu and epitalon work.",
      body: [
        "GHK-Cu is a copper-binding peptide your body makes less of with age. It is studied for prompting collagen production, elasticity and wound healing, which is why it is used for skin quality. One small injection a day.",
        "Epitalon is a four-amino-acid peptide studied for supporting telomere maintenance and regulating the sleep-wake cycle. It is taken as a 20-day course, a few times a year.",
      ],
    },
    choose: {
      title: "Which one is prescribed?",
      body: "GHK-Cu is the choice for skin. Epitalon is the choice for healthy ageing more broadly, and the two are often combined. Your physician confirms the fit from your health questions.",
    },
    weeks: [
      { when: BASELINE.when, what: "Your baseline blood kit arrives with your first order, included. Draw at home; your physician sets your dose from the results." },
      { when: "Week 1", what: "Your first dose. Your medication arrives cold, with instructions." },
      { when: "Weeks 2 to 8", what: "Daily for GHK-Cu. Epitalon runs as a 20-day course." },
      { when: `Week ${RETEST_WEEK}`, what: "Your blood test, included. Inflammation and blood count are read first." },
      { when: "After", what: "Your physician reviews your results and decides whether to continue." },
    ],
    faqs: [
      { q: "How long until skin changes?", a: "Skin renews on roughly a six-week cycle, so most people give it at least that long. Everyone responds differently." },
      { q: "Is GHK-Cu the same as the copper peptide in skincare?", a: "Same peptide, different route. Topical creams work at the surface. The prescribed version is injected, so it works from inside." },
      { q: "Is it right for me?", a: "Your physician checks for copper allergy, active cancer or a history of it, and pregnancy before prescribing." },
    ],
  },
  cognition: {
    short: "Focus and mood",
    headline: "Peptides for focus and mood, prescribed online.",
    sub: "Semax for focus and mental stamina. Selank for a steadier mood under stress. Both are nasal sprays. Prescribed by a licensed U.S. physician, made in a licensed U.S. pharmacy, and delivered to your door.",
    photo: "img/img_916e52b67436.webp", photo500: "img/img_916e52b67436.webp",
    photoAlt: "A man at a chessboard, thinking three moves ahead",
    what: {
      title: "How Semax and Selank work.",
      body: [
        "Semax supports BDNF, a protein your brain uses to build and maintain connections. It is studied for focus, memory and mental stamina. One spray a day, in the morning.",
        "Selank works on the brain's stress response. It is studied for a steadier mood and clearer thinking under pressure, without sedation. Two sprays a day.",
      ],
    },
    choose: {
      title: "Which one is prescribed?",
      body: "Semax for focus. Selank for stress and mood. Many patients are prescribed both, one in the morning and one through the day. Your physician confirms the fit from your health questions.",
    },
    weeks: [
      { when: "Day 1", what: "Your first spray. Many people notice something within the hour." },
      { when: "Weeks 1 to 8", what: "Taken daily, the effect evens out." },
      { when: `Week ${RETEST_WEEK}`, what: "Your blood test, included. Thyroid and cortisol are read for context." },
      { when: "After", what: "Your physician reviews your results and decides whether to continue." },
    ],
    faqs: [
      { q: "Is a nasal spray really a peptide?", a: "Yes. The nose is a fast route to the brain, which is why these two peptides are given this way." },
      { q: "Can I take these with antidepressants?", a: "Tell your physician everything you take. Some psychiatric medications need a closer look before prescribing." },
      { q: "Is it right for me?", a: "Your physician checks your current medications and asks about pregnancy before prescribing." },
    ],
  },
  sleep: {
    short: "Sleep",
    headline: "DSIP for deeper sleep, prescribed online.",
    sub: "Delta sleep-inducing peptide is studied for falling asleep faster and getting more deep sleep. One small dose at bedtime. Prescribed by a licensed U.S. physician, made in a licensed U.S. pharmacy, and delivered cold to your door.",
    photo: "img/img_928775d1e9c1.webp", photo500: "img/img_928775d1e9c1.webp",
    photoAlt: "A man waking before the alarm in soft morning light",
    what: {
      title: "How DSIP works.",
      body: [
        "Deep sleep is where your body does most of its repair. DSIP is a naturally occurring peptide studied for helping you fall asleep sooner and spend more of the night in deep sleep, without the grogginess of a sedative.",
        "One small injection under the skin at bedtime. The effect builds over the first couple of weeks.",
      ],
    },
    weeks: [
      { when: "Night 1", what: "Your first dose, at bedtime." },
      { when: "Weeks 1 to 8", what: "Taken nightly, sleep settles into a rhythm." },
      { when: `Week ${RETEST_WEEK}`, what: "Your blood test, included. Cortisol and thyroid are read first." },
      { when: "After", what: "Your physician reviews your results and decides whether to continue." },
    ],
    faqs: [
      { q: "Is it a sedative?", a: "No. It works on the sleep cycle itself rather than knocking you out, which is why people wake without grogginess." },
      { q: "Can I take it with other sleep aids?", a: "Tell your physician everything you take. Some medications need a closer look before prescribing." },
      { q: "Is it right for me?", a: "Your physician checks your current medications and asks about pregnancy before prescribing." },
    ],
  },
  longevity: {
    short: "Energy and healthy ageing",
    headline: "NAD+, MOTS-c and epitalon for energy and healthy ageing, prescribed online.",
    sub: "NAD+ for cellular energy. MOTS-c for metabolism and endurance. Epitalon as a short course for healthy ageing. Prescribed by a licensed U.S. physician, made in a licensed U.S. pharmacy, and delivered cold to your door.",
    photo: "img/img_cf1396d09b4a.webp", photo500: "img/img_cf1396d09b4a.webp",
    photoAlt: "A man running ahead of the group at a picnic",
    what: {
      title: "How NAD+, MOTS-c and epitalon work.",
      body: [
        "NAD+ is the coenzyme every cell uses to turn food into energy, and your levels fall with age. Replacing it is studied for energy, recovery and healthy ageing. Three small injections a week.",
        "MOTS-c is a peptide your mitochondria make that signals the same pathways exercise does. It is studied for metabolism and endurance. Two small injections a week. Epitalon, taken as a 20-day course, is studied for telomere maintenance.",
      ],
    },
    choose: {
      title: "Which one is prescribed?",
      body: "NAD+ is for cellular energy. MOTS-c suits training and metabolism. Epitalon adds a short course a few times a year. Your physician confirms the fit from your health questions.",
    },
    weeks: [
      { when: BASELINE.when, what: "Your baseline blood kit arrives with your first order, included. Draw at home; your physician sets your dose from the results." },
      { when: "Week 1", what: "Your first doses. Your medication arrives cold, with instructions." },
      { when: "Weeks 2 to 8", what: "On schedule, the levels build." },
      { when: `Week ${RETEST_WEEK}`, what: "Your blood test, included. Metabolic and inflammation markers are read first." },
      { when: "After", what: "Your physician reviews your results and decides whether to continue." },
    ],
    faqs: [
      { q: "Is NAD+ by injection different from the supplements?", a: "Yes. Oral NAD+ precursors are broken down in digestion. The injected form reaches your cells directly." },
      { q: "Do I need to exercise for MOTS-c to work?", a: "It signals the same pathways exercise does, and it works best alongside training." },
      { q: "Is it right for me?", a: "Your physician checks for active cancer or a history of it, and pregnancy, before prescribing." },
    ],
  },
  "sexual-health": {
    short: "Sexual health",
    headline: "Desire, performance and closeness, prescribed online.",
    sub: "PT-141 for desire, a fast tadalafil nasal spray for performance, and oxytocin for closeness. Each taken on the day you choose, for men and women. Prescribed by a licensed U.S. physician, made in a licensed U.S. pharmacy, and delivered cold to your door.",
    photo: goalDesire, photo500: goalDesire500,
    photoAlt: "Two people at ease together in warm evening light",
    what: {
      title: "How PT-141, tadalafil and oxytocin work.",
      body: [
        "Most medications for sexual function work on blood flow. PT-141, also called bremelanotide, works upstream, on the part of the brain involved in sexual desire, for men and women. Tadalafil works on the blood flow itself, as a nasal spray that is absorbed in twenty to thirty minutes. Oxytocin, the bonding hormone, works on closeness.",
        "Each is taken on the day you want it rather than every day, and they are often prescribed together. PT-141 raises blood pressure briefly, so your physician checks your blood pressure and heart history before prescribing it.",
      ],
    },
    choose: {
      title: "Which one is prescribed?",
      body: "If desire is the missing piece, PT-141. If the body needs help on the night, tadalafil. If closeness is the goal, oxytocin. Your physician chooses from your health questions. Many patients are prescribed both.",
    },
    weeks: [
      { when: BASELINE.when, what: "Your baseline blood kit arrives with your first order, included. Draw at home; your physician sets your dose from the results." },
      { when: "Dose 1", what: "About an hour ahead, under the skin. Most people find their timing within the first few doses." },
      { when: "The first weeks", what: "Use it on the days you choose, within the monthly limit your physician sets." },
      { when: `Week ${RETEST_WEEK}`, what: "Your blood test, included. Your hormones are read for context." },
      { when: "After", what: "Your physician reviews how it is going and adjusts your dose or your plan." },
    ],
    faqs: [
      { q: "Is this like the pills for erections?", a: "Tadalafil is that medication, as a fast nasal spray. PT-141 works differently: on desire in the brain, for men and women. Your physician reviews your blood pressure and heart history before prescribing either." },
      { q: "How fast does it work?", a: "Usually within one to three hours, and it stays active for several hours. Most people find their timing within the first few doses." },
      { q: "Why does my physician check blood pressure?", a: "A dose raises blood pressure for a few hours. Uncontrolled high blood pressure or heart disease can rule it out, so both are checked first." },
    ],
  },
  hormone: {
    short: "Hormones",
    headline: "Testosterone, monitored, prescribed online.",
    sub: "For men whose testosterone is low: replacement that is dosed against your own blood work, with kisspeptin to keep your body's own production working underneath it. Prescribed by a licensed U.S. physician, made in a licensed U.S. pharmacy, and delivered cold to your door.",
    photo: goalGrowth, photo500: goalGrowth500,
    photoAlt: "A man at a bright home gym, tape on the bench",
    what: {
      title: "How testosterone therapy works, and why blood work comes first.",
      body: [
        "Testosterone is the one medicine on this menu where blood work is the whole point. Your baseline kit shows your physician your total and free testosterone, estradiol and red blood cell count before a dose is set. A weekly dose then keeps your level steady, and the week-12 retest shows whether the dose is right.",
        "Testosterone replacement quiets your own production. Kisspeptin works one step above your hormones, telling the pituitary to keep signalling, which is why the two are prescribed together in the Foundation protocol.",
      ],
    },
    choose: {
      title: "Which one is prescribed?",
      body: "If your baseline shows low testosterone, replacement is the base layer. Kisspeptin supports the axis alongside it, and is the gentler lever on its own for fertility-minded plans. Your physician chooses from your numbers.",
    },
    weeks: [
      { when: BASELINE.when, what: "Your baseline blood kit arrives with your first order, included. Total and free testosterone, estradiol and blood count set your starting dose." },
      { when: "Weeks 1 to 2", what: "Your first weekly doses. Levels begin to settle." },
      { when: "Weeks 3 to 6", what: "Energy, mood and drive are usually the first things to move." },
      { when: `Week ${RETEST_WEEK}`, what: "Your blood test, included. Testosterone, estradiol, blood count and PSA are read first." },
      { when: "After", what: "Your physician adjusts your dose from what changed, and body composition builds over months three to six." },
    ],
    faqs: [
      { q: "Do I need blood work first?", a: "Yes. Testosterone is dosed against your own numbers, so your baseline kit is drawn before your first dose. Your physician sets your dose from it and adjusts from your week-12 retest." },
      { q: "What does your physician watch?", a: "Testosterone, estradiol, red blood cell count and PSA, at baseline and at week 12. High red blood cell count or an untreated sleep apnea can rule it out, so both are checked first." },
      { q: "Will it affect fertility?", a: "Testosterone replacement can lower sperm production. Tell your physician if you are planning to conceive; kisspeptin exists on this menu for exactly that conversation." },
      { q: "Is compounded testosterone FDA-approved?", a: "Testosterone cypionate is an FDA-approved medication. The compounded preparation made for you by a licensed 503A pharmacy is not itself FDA-approved, and compounded medications are not evaluated by the FDA for safety, effectiveness, or quality." },
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
    title: live ? copy!.headline : "Choose a goal",
    description: live ? copy!.sub : "Prescription peptides for weight, strength and desire, prescribed by U.S. licensed doctors.",
    path: `/goals/${slug}`,
    jsonLd: live
      ? [
          webPageJsonLd({ name: copy!.headline, description: copy!.sub, path: `/goals/${slug}`, type: "MedicalWebPage" }),
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
          <h1 id="category-notfound-title" style={{ ...h2, fontSize: "var(--nx-t-h1)", maxWidth: "18ch" }}>Coming soon. Here is what we treat today.</h1>
          <div className="mt-8 flex flex-wrap gap-2" role="list">
            {doors.map((d) => (
              <Link key={d.c} href={`/goals/${d.c}`} className="nx-chip" role="listitem" style={{ fontFamily: F }} data-testid={`cat-door-${d.c}`}>
                {d.copy!.short} <ArrowRight size={15} aria-hidden style={{ marginLeft: 6 }} />
              </Link>
            ))}
            <Link href="/peptides-101" className="nx-chip nx-chip-ghost" role="listitem" style={{ fontFamily: F }}>Peptides 101</Link>
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
      <section className="nx-hero-r3" aria-labelledby="category-hero-title"><div className="nx-container" style={{ paddingTop: "var(--nx-sp-sec)", paddingBottom: "var(--nx-sp-band)" }}>
        <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-10 lg:gap-16 items-center">
          <div>
            <p style={kicker} data-testid="cat-eyebrow">{cfg.short}</p>
            <h1 id="category-hero-title" style={{ fontFamily: S, fontWeight: 500, fontSize: "var(--nx-t-h1)", lineHeight: 1.06, letterSpacing: "var(--nx-ls-tight)", color: "var(--nx-fg)", maxWidth: "18ch", marginTop: "0.9rem", textWrap: "balance" }} data-testid="cat-h1">
              {cfg.headline}
            </h1>
            <p style={{ ...body, fontSize: "var(--nx-t-lg)", marginTop: "1.1rem" }} data-testid="cat-sub">{cfg.sub}</p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link href={assessmentHref} className="nx-cta-cobalt inline-flex items-center gap-2" data-testid="cat-cta-start">
                See if I'm eligible <ArrowRight size={17} strokeWidth={2} />
              </Link>
              <Link href="/peptides-101" className="nx-cta-ghost inline-flex items-center gap-2" data-testid="cat-cta-101">
                Peptides 101
              </Link>
            </div>
          </div>
          <Reveal delay={80} className="nx-reveal-lift">
            <div style={{ borderRadius: "var(--nx-r-lg)", overflow: "hidden", boxShadow: "var(--nx-e-3)", aspectRatio: "4 / 5", border: "1px solid var(--nx-border)", background: "var(--nx-ceramic)" }}>
              <img src={cfg.photo} srcSet={cfg.photo500 !== cfg.photo ? `${cfg.photo500} 500w, ${cfg.photo} 1000w` : undefined} sizes="(max-width: 1024px) 100vw, 45vw" alt={cfg.photoAlt} width={1000} height={1250} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} loading="eager" decoding="async" />
            </div>
          </Reveal>
        </div>
      </div></section>

      {/* ── 2. Understand ── */}
      <section style={{ background: "var(--nx-ceramic)", borderTop: "1px solid var(--nx-border)", borderBottom: "1px solid var(--nx-border)" }} aria-labelledby="category-what-title">
        <div className="nx-container grid lg:grid-cols-[0.9fr_1.1fr] gap-8 lg:gap-16" style={{ paddingTop: "var(--nx-sp-band)", paddingBottom: "var(--nx-sp-band)" }}>
          <Reveal>
            <p style={kicker}>How it works</p>
            <h2 id="category-what-title" style={{ ...h2, maxWidth: "18ch" }} data-testid="cat-what">{cfg.what.title}</h2>
          </Reveal>
          <Reveal delay={60}>
            <div style={{ display: "grid", gap: "1rem" }}>
              {cfg.what.body.map((p) => <p key={p} style={body}>{p}</p>)}
              {(() => { const b = benefitFor(skus[0]?.slug ?? ""); if (!b) return null; return (
                <div className="nx-goal-how" data-testid="cat-bodymap">
                  <BodyMap region={b.region} size={64} />
                  <div>
                    <p style={{ ...label, color: "var(--nx-cobalt)" }}>{REGION_LABEL[b.region]}</p>
                    <p style={{ ...small, marginTop: "0.3rem" }}>Good for {b.goodFor.join(", ").toLowerCase()}.</p>
                  </div>
                </div>
              ); })()}
              <p style={small}>
                More on how peptides work:{" "}
                <Link href="/peptides-101" className="nx-text-link" style={{ fontWeight: 600 }}>Read Peptides 101</Link>
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── 3. Choose ── */}
      <section className="nx-container" style={{ paddingTop: "var(--nx-sp-band)", paddingBottom: "var(--nx-sp-band)" }} aria-labelledby="category-options-title">
        <Reveal>
          <p style={kicker}>Medicines</p>
          <h2 id="category-options-title" style={{ ...h2, maxWidth: "20ch" }}>
            {skus.length === 1 ? "The medicine for this goal." : "The medicines for this goal."}
          </h2>
        </Reveal>
        <Reveal><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" style={{ marginTop: "clamp(1.4rem,3vw,2.2rem)" }}>
          {skus.map((s, i) => (
            <ProductTile key={s.slug} sku={s} index={i} detail base={`/${world}`} testId={`cat-item-${s.slug}`} />
          ))}
        </div></Reveal>
        {cfg.choose && (
          <Reveal>
            <div style={{ ...card, background: "var(--nx-ceramic)", marginTop: "1.2rem", maxWidth: 820, padding: "1.2rem 1.4rem" }} data-testid="cat-choose">
              <p style={label}>{cfg.choose.title}</p>
              <p style={{ ...body, marginTop: "0.4rem" }}>{cfg.choose.body}</p>
            </div>
          </Reveal>
        )}
        <p style={{ ...small, fontSize: "var(--nx-t-xs)", color: "var(--nx-fg-muted)", marginTop: "1rem" }}>Prescription only, if a licensed physician determines it is appropriate for you. Availability varies by state.</p>
      </section>

      {/* ── 4. Your first twelve weeks ── */}
      <section style={{ background: "var(--nx-ceramic)", borderTop: "1px solid var(--nx-border)", borderBottom: "1px solid var(--nx-border)" }} aria-labelledby="category-weeks-title">
        <div className="nx-container grid lg:grid-cols-[0.9fr_1.1fr] gap-8 lg:gap-16" style={{ paddingTop: "var(--nx-sp-band)", paddingBottom: "var(--nx-sp-band)" }}>
          <Reveal>
            <p style={kicker}>What to expect</p>
            <h2 id="category-weeks-title" style={{ ...h2, maxWidth: "16ch" }}>Your first {RETEST_WEEK} weeks.</h2>
            <p style={{ ...body, marginTop: "1rem" }}>The blood kit ships with your first order and you draw at home before your first dose. Your physician sets your dose from the results, and the same {PANEL_TOTAL_MARKERS} markers are tested again at week {RETEST_WEEK}.</p>
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
              <p style={kicker}>Your week-{RETEST_WEEK} blood panel</p>
              <h2 id="category-blood-title" style={{ ...h2, maxWidth: "18ch" }}>What your physician reads first.</h2>
              <p style={{ ...body, marginTop: "1rem" }}>
                The {PANEL_TOTAL_MARKERS}-marker blood test is included in your plan. These are the markers your physician reads first for this treatment, and why.
              </p>
              {doseMarkers.map((d) => (
                <p key={d.peptide} style={{ ...small, marginTop: "0.8rem" }}>Your {d.peptide} dose is set against your {d.marker}.</p>
              ))}
              <p style={{ ...small, marginTop: "0.8rem" }}>
                <Link href="/labs" className="nx-text-link" style={{ fontWeight: 600 }}>Every marker, and the additional tests</Link>
              </p>
              <AddonsFor keys={[slug, ...slugs]} testId="cat-addons" />
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
              {screens.length > 0 && (
                <div style={{ ...card, background: "var(--nx-ceramic)", marginTop: 10 }} data-testid="cat-screens">
                  <p style={label}>Checked before prescribing</p>
                  <ul style={{ margin: "0.5rem 0 0", padding: "0 0 0 1.1rem", display: "grid", gap: 4 }}>
                    {screens.map((q) => <li key={q} style={{ ...small, color: "var(--nx-fg-graphite)" }}>{q}</li>)}
                  </ul>
                  <p style={{ ...small, fontSize: "var(--nx-t-xs)", color: "var(--nx-fg-muted)", marginTop: "0.6rem" }}>{FDA} Availability varies by state.</p>
                </div>
              )}
            </Reveal>
          </div>
        </section>
      )}

      {/* ── 7. Questions ── */}
      <section className="nx-container" style={{ paddingTop: "var(--nx-sp-band)", paddingBottom: "var(--nx-sp-band)", maxWidth: 860 }} aria-labelledby="category-faq-title">
        <Reveal>
          <p style={kicker}>Questions</p>
          <h2 id="category-faq-title" style={{ ...h2, maxWidth: "18ch" }}>Common questions.</h2>
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
              <h2 id="cat-reading-title" style={{ fontFamily: S, fontWeight: 500, fontSize: "var(--nx-t-h3)", color: "var(--nx-fg)" }}>Further reading.</h2>
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
          <h2 id="category-cta-title" style={{ ...h2, marginTop: 0 }}>The next step is a physician.</h2>
          <p style={{ ...body, margin: "0.7rem auto 0" }}>A few health questions. A licensed U.S. physician reads them and decides whether this is right for you. If it is, your medication is made and shipped cold to your door.</p>
          <Link href={assessmentHref} className="nx-cta-cobalt inline-flex items-center gap-2 mt-6" data-testid="cat-cta-end">
            See if I'm eligible <ArrowRight size={17} strokeWidth={2} />
          </Link>
          <p style={{ ...small, fontSize: "var(--nx-t-xs)", color: "var(--nx-fg-muted)", marginTop: "1.4rem" }}>{FDA} Availability varies by state.</p>
        </div>
      </section>
    </SiteLayout>
  );
}
