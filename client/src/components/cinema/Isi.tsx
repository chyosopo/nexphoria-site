/* ═══ Important safety information (2026-09-16) ═══
   mod.com carries the FDA paragraph as its own block above the FAQ ("What
   you should know before taking MOD"). Ours carries the house clause the
   footer already renders, verbatim (the FDA wording is exempt from the
   voice gate), and the link to the prescribing policy. */
import { Link } from "wouter";
import { F } from "@/lib/typography";

export function Isi() {
  return (
    <section className="nx-container nx-cine-sec" aria-labelledby="fd-isi" data-testid="frontdoor-isi">
      <div className="nx-cine-isi" style={{ fontFamily: F }}>
        <h2 id="fd-isi" className="nx-cine-isi__h2">Important safety information</h2>
        <p className="nx-cine-isi__k">What to know before starting:</p>
        <p className="nx-cine-isi__p">These statements have not been evaluated by the Food and Drug Administration. Nexphoria peptide protocols are prescribed off-label by licensed US physicians and compounded in state-licensed 503A pharmacies. They are not intended to diagnose, treat, cure, or prevent any disease. Medication is dispensed only if a licensed provider determines a prescription is appropriate. Compounded medications are not approved or evaluated by the FDA for safety, effectiveness, or quality. Individual results vary.</p>
        <Link href="/legal/prescribing-policy" className="nx-cine-isi__a" data-testid="frontdoor-isi-more">Read the prescribing policy</Link>
      </div>
    </section>
  );
}
