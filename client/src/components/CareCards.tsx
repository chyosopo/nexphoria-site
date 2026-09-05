/* Prescribing and dispensing, as two plain cards; the verbatim compliance
   wording (data/compliance) stays word for word beneath. */
import { F, S } from "@/lib/typography";
import { PROVIDER_INFO, PHARMACY_INFO } from "@/data/compliance";
import { monitoringFor, RETEST_WEEK } from "@/data/monitoring";

function Card({ eyebrow, title, facts, body, testId }: { eyebrow: string; title: string; facts: string[]; body: string; testId: string }) {
  return (
    <div className="nx-card" data-testid={testId}>
      <p className="nx-eyebrow">{eyebrow}</p>
      <p style={{ fontFamily: S, fontWeight: 500, fontSize: "var(--nx-t-lg)", lineHeight: 1.25, color: "var(--nx-fg)", marginTop: "0.5rem", maxWidth: "30ch" }}>{title}</p>
      <ul style={{ listStyle: "none", margin: "0.9rem 0 0", padding: 0, display: "grid", gap: 6 }}>
        {facts.map((f) => (
          <li key={f} style={{ fontFamily: F, fontSize: "var(--nx-t-base)", color: "var(--nx-fg-graphite)", lineHeight: 1.5, paddingLeft: "1rem", position: "relative" }}>
            <span aria-hidden="true" style={{ position: "absolute", left: 0, top: "0.62em", width: 5, height: 5, borderRadius: "var(--nx-r-pill)", background: "var(--nx-cobalt)" }} />{f}
          </li>
        ))}
      </ul>
      <p style={{ fontFamily: F, fontSize: "var(--nx-t-xs)", lineHeight: 1.55, color: "var(--nx-fg-muted)", marginTop: "1rem", paddingTop: "0.8rem", borderTop: "1px solid var(--nx-border)" }}>{body}</p>
    </div>
  );
}

export function CareCards({ slug }: { slug: string; name?: string }) {
  const m = monitoringFor(slug);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: 14, marginTop: "1rem" }}>
      <Card
        eyebrow="Prescribing"
        title={`Prescribed by ${PROVIDER_INFO.name.replace(/, LLC$/, "")}.`}
        facts={[
          "Licensed in all 50 states.",
          "Every order is reviewed before anything is made, and can be declined.",
          m?.doseMarker ? `The dose is set from ${m.doseMarker} and reviewed at week ${RETEST_WEEK}.` : `The dose is set from the panel and reviewed at week ${RETEST_WEEK}.`,
        ]}
        body={PROVIDER_INFO.body}
        testId={`care-physician-${slug}`}
      />
      <Card
        eyebrow="Dispensing"
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
