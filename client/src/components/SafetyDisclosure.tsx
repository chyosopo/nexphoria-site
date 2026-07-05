import { F } from "@/lib/typography";

/* SafetyDisclosure — hims-pattern "Important safety information" accordion
   at the purchase decision point. Native <details> on the shared
   .nx-faq-item grammar; summarizes contraindications right under the
   buy box so safety is scannable before the CTA, not only in the
   night band far below the fold. */
export function SafetyDisclosure({
  name,
  contraindications,
}: {
  name: string;
  contraindications: string[];
}) {
  return (
    <details className="nx-faq-item" data-testid="pdp-safety-disclosure" style={{ marginTop: "1rem" }}>
      <summary style={{ fontSize: "clamp(15px, 1.6vw, 17px)", padding: "14px 2px" }}>
        Important safety information
        <span className="nx-faq-plus" aria-hidden />
      </summary>
      <div style={{ paddingBottom: "1rem" }}>
        <p style={{ fontFamily: F, fontSize: "var(--nx-t-sm)", lineHeight: 1.6, color: "var(--nx-fg-graphite)" }}>
          {name} is prescription-only and is not appropriate for everyone. A licensed
          physician reviews your intake and baseline bloodwork before any prescription
          is issued, and may decline to prescribe. Do not begin if any of the following apply:
        </p>
        <ul style={{ margin: "0.6rem 0 0", paddingLeft: "1.1rem", display: "flex", flexDirection: "column", gap: 5 }}>
          {contraindications.map((c) => (
            <li key={c} style={{ fontFamily: F, fontSize: "var(--nx-t-sm)", lineHeight: 1.55, color: "var(--nx-fg-graphite)" }}>
              {c}
            </li>
          ))}
        </ul>
        <p style={{ fontFamily: F, fontSize: "var(--nx-t-xs)", lineHeight: 1.6, color: "var(--nx-fg-muted)", marginTop: "0.7rem" }}>
          Compounded medications are not FDA-approved. Individual results vary. Report
          side effects to your physician through the secure portal.
        </p>
      </div>
    </details>
  );
}
