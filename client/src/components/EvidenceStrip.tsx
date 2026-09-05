/* ═══ EVIDENCE STRIP — the citations, at the decision point ═══

   The evidence for this molecule sits on this molecule's page, between the
   mechanism and the price, as one tile: a row per finding, the key on the
   left, the finding and its citation on the right. Every row is open; a
   reader weighing the medicine reads the findings, not a list of toggles.

   Renders NOTHING when there is no evidence for the SKU. That is deliberate
   and load-bearing: PT-141 has no citation in our set, and a component that
   quietly fell back to a neighbour's studies, or padded with something
   adjacent, would be putting a claim behind a molecule that does not support
   it. An absent block is honest; a borrowed one is not.

   Voice: each entry states what a study FOUND, never what the visitor will
   experience. "Produced mean reductions of 15-21% over 72 weeks" is a result.
   "You will lose 15-21%" is a promise we cannot make and will not imply. */
import { F, S } from "@/lib/typography";
import { evidenceFor } from "@/data/evidence";

export function EvidenceStrip({ slug, name }: { slug: string; name: string }) {
  const items = evidenceFor(slug);
  if (items.length === 0) return null;

  return (
    <section
      className="nx-pdp-sec"
      data-testid={`evidence-${slug}`}
      aria-labelledby={`evidence-title-${slug}`}
    >
      <h2 id={`evidence-title-${slug}`} className="nx-dsh3">Here is what the studies found.</h2>
      <p className="nx-lede" style={{ marginTop: "0.6rem" }}>Peer-reviewed findings on {name}, each with its source.</p>

      <div className="nx-pt" style={{ marginTop: "1rem" }}>
        <ol className="nx-pt-rows">
          {items.map((e, i) => (
            <li key={e.cite} className="nx-pt-row" data-testid={`evidence-row-${slug}-${i}`}>
              {/* The key is the finding in a few words; the citation beneath the
                  finding is how a reviewer cross-references it to its source. */}
              <p className="nx-pt-row__k" style={{ fontFamily: S }}>{e.key ?? `Finding ${i + 1}`}</p>
              <div>
                <p className="nx-pt-row__f" style={{ fontFamily: F }}>{e.finding}</p>
                <p className="nx-pt-row__c" style={{ fontFamily: F }}>{e.cite}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>

      {/* The line that keeps a study list from reading as an outcome promise. */}
      <p className="nx-pt-note" style={{ fontFamily: F }}>
        Published findings for the molecule, not predictions for any individual. Populations, doses
        and durations differ from any protocol; the physician decides what applies.
      </p>
    </section>
  );
}
