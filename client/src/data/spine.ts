/* ═══ The spine (docs/SPINE, Chiya 2026-09-04) ═══
   Five stops. Every page is one stop, says which, and offers one next
   action. The road is the customer's version of the same five, in order,
   as it happens after they choose. Copy standard: one claim, facts beneath.
   There is no "Decide" stop and no pricing page (Chiya, 2026-09-04): the
   price is a fact on the product page, stated once, beside the medicine.
   The site informs; it does not persuade. */
export const STOPS = ["Land", "Choose", "Understand", "Buy", "After"] as const;
export type Stop = 1 | 2 | 3 | 4 | 5;

export const ROAD: { t: string; b: string }[] = [
  { t: "Choose", b: "A medicine or a protocol, for one month or for three, six or twelve." },
  { t: "Check out", b: "One figure for the term, paid once. Then a few health questions." },
  { t: "A physician decides", b: "A licensed U.S. physician reads your answers and writes the prescription, or tells you why not." },
  { t: "Test, then start", b: "Your medicine arrives cold with a blood kit. You draw at home; your dose is set against your numbers." },
  { t: "Retest at week 12", b: "The same panel again. Your physician reads what changed and adjusts. Renew, expand, or stop." },
];
