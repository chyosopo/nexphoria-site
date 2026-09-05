/* ═══ The steps (docs/COPY-DECK-PLAIN.md, Chiya 2026-09-04) ═══
   ROAD is the five steps, the only step list on the site, in the reader's
   words. There is no pricing page: the price is a fact on the product page,
   stated once, beside the medicine. The site informs; it does not persuade.
   STOPS was the navigation vocabulary behind SpineStrip (Land · Choose ·
   Understand · Buy · After); the strip is being removed from every page
   and STOPS stays exported only until SpineStrip.tsx goes with it. */
export const STOPS = ["Land", "Choose", "Understand", "Buy", "After"] as const;
export type Stop = 1 | 2 | 3 | 4 | 5;

export const ROAD: { t: string; b: string }[] = [
  { t: "Choose your medicine", b: "A medicine or a protocol, and a term of one, three, six or twelve months." },
  { t: "Answer the health questions", b: "Your health history, current medicines and goals, at checkout. A few minutes." },
  { t: "A physician decides", b: "A licensed U.S. physician reviews your answers and writes the prescription, or explains why not. If not, nothing is made and the refund policy applies." },
  { t: "Draw your blood kit, then start", b: "Your medicine ships cold with an at-home blood kit. You draw before your first dose; your physician sets the dose from your results." },
  { t: "Retest at week 12", b: "The same blood test again. Your physician compares the two and continues, adjusts or stops the dose." },
];
