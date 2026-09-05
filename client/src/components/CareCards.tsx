/* Prescribing and dispensing, as two tiles in the product page's shared frame;
   the verbatim compliance wording (data/compliance) stays word for word
   beneath, set smaller. The wrapper keeps its .grid class: the parties row
   on the product page dissolves it (display: contents) into one row of three. */
import { F, S } from "@/lib/typography";
import { PROVIDER_INFO, PHARMACY_INFO } from "@/data/compliance";
import { monitoringFor, RETEST_WEEK } from "@/data/monitoring";

function Card({ kicker, title, facts, body, testId }: { kicker: string; title: string; facts: string[]; body: string; testId: string }) {
  return (
    <div className="nx-pt" data-testid={testId}>
      <p className="nx-pt__k" style={{ fontFamily: F }}>{kicker}</p>
      <p className="nx-pt__t" style={{ fontFamily: S }}>{title}</p>
      <ul className="nx-pt-facts">
        {facts.map((f) => <li key={f} style={{ fontFamily: F }}>{f}</li>)}
      </ul>
      <p className="nx-pt__legal" style={{ fontFamily: F }}>{body}</p>
    </div>
  );
}

export function CareCards({ slug }: { slug: string; name?: string }) {
  const m = monitoringFor(slug);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 nx-pt-grid nx-pt-grid--2">
      <Card
        kicker="Prescribing"
        title={`Prescribed by ${PROVIDER_INFO.name.replace(/, LLC$/, "")}.`}
        facts={[
          "Licensed in all 50 states.",
          "Every order is reviewed before anything is made, and can be declined.",
          m?.doseMarker ? `Your dose is set from ${m.doseMarker} and reviewed at week ${RETEST_WEEK}.` : `Your dose is set from the panel and reviewed at week ${RETEST_WEEK}.`,
        ]}
        body={PROVIDER_INFO.body}
        testId={`care-physician-${slug}`}
      />
      <Card
        kicker="Dispensing"
        title={`Compounded by ${PHARMACY_INFO.name}, Houston.`}
        facts={[
          "A state-licensed 503A compounding pharmacy.",
          "Compounded under USP <797> when the prescription is written.",
          "Shipped cold, in plain packaging, to all 50 states.",
        ]}
        body={PHARMACY_INFO.body.replace(/\n+/g, " ")}
        testId={`care-pharmacy-${slug}`}
      />
    </div>
  );
}
