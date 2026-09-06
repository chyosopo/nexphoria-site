/* ═══ THE ASSESSMENT — the site's primary call to action ═══
   Chiya, 2026-09-06, pointing at enhanced.com/live-enhanced/testosterone:
   "they copy the voice, the tone, the CTA is the quiz, everything."

   She is naming a funnel, not a finish. Enhanced opens with "Know what
   you're after?" and takes the reader through an assessment to a
   recommendation. This site opened with "Shop the medicines" and a shelf —
   /quiz and /assessment had been retired to redirects, so the whole site
   asked the reader to already know what they wanted. Browsing is a fine
   second path. It is a poor first one for someone who knows the symptom and
   not the molecule.

   THE SHAPE
   Three questions, no account, no email wall:
     1 · what you want to change   → the goal, and the medicines under it
     2 · how it shows up for you   → narrows within the goal
     3 · what you have tried       → sets the tone of the recommendation
   Then a recommendation: the medicine, why it follows from the answers, the
   price, and one way forward.

   THE LAW IT KEEPS
   The answers here are NOT medical intake. Nothing is stored, nothing is
   sent anywhere, no PHI leaves the browser (CLAUDE.md law 5) — the state
   lives in React and dies with the tab. The real medical questions still
   happen at checkout, with the physician, where they belong. A
   recommendation here is a place to start reading, never a prescription,
   and every result says so. */
import type { PeptideCategory } from "@/data/peptides";

export interface QuizOption {
  /** what the reader taps */
  label: string;
  /** the line under it, in the house register */
  line?: string;
  /** the goal this answer points at (question 1 only) */
  goal?: PeptideCategory;
  /** slugs this answer favours when the goal holds several */
  favours?: string[];
}

export interface QuizQuestion {
  id: string;
  /** the question, as a person would ask it */
  title: string;
  /** one line of context under it */
  lead?: string;
  options: QuizOption[];
}

/* ── 1 · The goal ──────────────────────────────────────────────────────
   The nine goals, in the order people arrive with them. The words are the
   reader's, not the catalog's categories. */
export const Q_GOAL: QuizQuestion = {
  id: "goal",
  title: "What do you want to change?",
  lead: "Pick the one that is loudest. You can read the rest afterwards.",
  options: [
    { label: "Lose weight", line: "Appetite runs the day, and the weight will not move.", goal: "metabolic" },
    { label: "Build lean mass", line: "The deep fat has not moved through diet or training.", goal: "growth" },
    { label: "Recover faster", line: "A tendon, a joint or a muscle is slow to heal.", goal: "recovery" },
    { label: "Get your energy back", line: "Energy and recovery have slipped as the years add up.", goal: "longevity" },
    { label: "Think more clearly", line: "Focus frays and mood follows under pressure.", goal: "cognition" },
    { label: "Sleep properly", line: "You fall asleep slowly, or wake without feeling rested.", goal: "sleep" },
    { label: "Bring back the drive", line: "Desire, closeness and erectile function.", goal: "sexual-health" },
    { label: "Raise low testosterone", line: "Energy, drive and mood drop when it is low.", goal: "hormone" },
    { label: "Firmer skin", line: "Firmness goes first, and healing takes longer.", goal: "skin" },
  ],
};

/* ── 2 · How it shows up ───────────────────────────────────────────────
   Per goal, because "how is it showing up" means something different for
   sleep than for weight. The `favours` slugs tilt the recommendation
   without ever inventing a claim: each one is a medicine already indicated
   for that goal in the catalog. */
export const Q_SHAPE: Record<PeptideCategory, QuizQuestion> = {
  metabolic: {
    id: "shape",
    title: "Where does it get hardest?",
    options: [
      { label: "Appetite, all day", line: "Hunger is the thing you are fighting.", favours: ["semaglutide"] },
      { label: "Appetite and blood sugar", line: "Both move together for you.", favours: ["tirzepatide"] },
      { label: "The last stubborn fat", line: "Weight is close, composition is not.", favours: ["aod-9604", "tesamorelin"] },
    ],
  },
  growth: {
    id: "shape",
    title: "What are you after first?",
    options: [
      { label: "Lean mass and recovery", favours: ["ipa-cjc", "sermorelin"] },
      { label: "Deep abdominal fat", favours: ["tesamorelin"] },
      { label: "Sleep quality alongside it", favours: ["sermorelin"] },
    ],
  },
  recovery: {
    id: "shape",
    title: "What is slow to heal?",
    options: [
      { label: "A tendon, joint or muscle", favours: ["bpc-157", "bpc-tb-combo"] },
      { label: "Gut lining", favours: ["bpc-157"] },
      { label: "Recovery from hard training generally", favours: ["tb-500", "bpc-tb-combo"] },
    ],
  },
  longevity: {
    id: "shape",
    title: "What has slipped most?",
    options: [
      { label: "Day-to-day energy", favours: ["nad-plus"] },
      { label: "How training feels", favours: ["mots-c"] },
      { label: "Immune resilience", favours: ["thymosin-a1"] },
    ],
  },
  cognition: {
    id: "shape",
    title: "Which half is louder?",
    options: [
      { label: "Focus through a long day", favours: ["semax"] },
      { label: "Mood under pressure", favours: ["selank"] },
      { label: "Both, most weeks", favours: ["semax", "selank"] },
    ],
  },
  sleep: {
    id: "shape",
    title: "Where does the night go wrong?",
    options: [
      { label: "Falling asleep", favours: ["dsip"] },
      { label: "Waking unrested", favours: ["dsip", "sermorelin"] },
      { label: "Both", favours: ["dsip"] },
    ],
  },
  "sexual-health": {
    id: "shape",
    title: "What would you change first?",
    options: [
      { label: "Desire", favours: ["pt-141"] },
      { label: "Erectile function", favours: ["tadalafil"] },
      { label: "Closeness and arousal", favours: ["oxytocin"] },
    ],
  },
  hormone: {
    id: "shape",
    title: "Which fits you better?",
    options: [
      { label: "Blood work already shows it is low", favours: ["testosterone"] },
      { label: "You would rather support your own production", favours: ["kisspeptin"] },
      { label: "You do not know yet", favours: ["testosterone"] },
    ],
  },
  skin: {
    id: "shape",
    title: "What do you notice?",
    options: [
      { label: "Firmness", favours: ["ghk-cu"] },
      { label: "Healing takes longer", favours: ["ghk-cu"] },
      { label: "Ageing generally", favours: ["epitalon", "nad-plus"] },
    ],
  },
};

/* ── 3 · What you have tried ───────────────────────────────────────────
   This one does not change the medicine. It changes what the result says
   first, which is the difference between a recommendation that lands and
   one that reads like a brochure. */
export const Q_TRIED: QuizQuestion = {
  id: "tried",
  title: "What have you already tried?",
  lead: "It changes what is worth telling you, not what a physician can prescribe.",
  options: [
    { label: "Diet and training, seriously" },
    { label: "Supplements, without much to show" },
    { label: "A prescription medicine before" },
    { label: "This is the first thing" },
  ],
};

export const TRIED_NOTE: Record<string, string> = {
  "Diet and training, seriously":
    "You have done the part that most people skip. These medicines work with that, not instead of it.",
  "Supplements, without much to show":
    "The difference here is the dose, the prescription, and a blood panel to set both.",
  "A prescription medicine before":
    "You will recognise the shape of this: an online visit, a physician's decision, and a dose read from blood.",
  "This is the first thing":
    "Nothing is decided today. A licensed physician reads your answers before anything is made.",
};

/* ── The protocol for a goal, when one exists ──────────────────────────
   Six goals have a protocol: two to four medicines a physician prescribes
   together on one plan. The assessment recommended only single medicines,
   so the protocols — the more complete answer for someone who has just told
   us their whole goal — never appeared on the primary path at all.

   Keyed by goal, valued by the stack slug (data/stacksCatalog). Three goals
   (growth, sleep, skin) have no protocol and correctly show none. */
export const GOAL_PROTOCOL: Partial<Record<PeptideCategory, string>> = {
  metabolic: "ignite",
  recovery: "recover",
  longevity: "ascend",
  cognition: "lucidity",
  "sexual-health": "vitality",
  hormone: "foundation",
};
