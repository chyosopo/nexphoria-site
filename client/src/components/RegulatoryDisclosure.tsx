/* RegulatoryDisclosure — the compliance surface that wraps every product.

   Built from the IvyRx teardown (docs/IVYRX-STUDY.md §5, IVYRX-STUDY-VISUAL.md
   §V3.5). The operative finding: a certified telehealth site does not survive
   review because of WHICH molecules it lists — it survives because disclosure
   is structural. Theirs is carried by (a) explicit, repeated non-approval
   language, (b) conditional grammar everywhere ("if prescribed", "you may be
   eligible"), and (c) named provider and pharmacy. This component is that
   architecture expressed once, so no product page can ship without it and no
   future SKU can quietly omit it.

   Two rules govern the copy below and must not be relaxed:

   1. A compounded preparation is NEVER itself FDA-approved — true even when
      its active ingredient is. We never blur that. LegitScript reads exact
      wording, and the reference site's own pages show the failure mode: the
      same page that says "not FDA-approved" also says "Proven Healing Power…
      accelerates recovery." We take their architecture, not their claims.
   2. CLAUDE.md Standing Law 3 forbids defensive negation in MARKETING voice.
      Legal and safety disclaimers are explicitly exempt, and this is one.
      Plain statutory language wins here; do not soften it into house phrasing. */
import { Reveal } from "@/components/Reveal";
import { F } from "@/lib/typography";
import { PROVIDER_INFO, PHARMACY_INFO } from "@/data/compliance";
import { regulatoryOf, type SoloPeptide, type SoloRegulatory } from "@/data/soloCatalog";

/* Conditional grammar, centralised. Every surface that speaks about outcome,
   eligibility or supply pulls its phrasing from here, so the conditional voice
   stays uniform and auditable instead of drifting page by page. */
export const CONDITIONAL = {
  ifPrescribed: "if prescribed",
  mayBeEligible: "you may be eligible",
  /** For any figure shown before a physician has reviewed. */
  totalLabel: "Your figure",
  /** Never a billing promise: checkout can precede the questionnaire (Chiya, 2026-09-02). This states the review condition. */
  chargeCondition: "A licensed physician reviews every order before anything is dispensed.",
} as const;

/** The non-approval sentence, keyed to the active's regulatory standing. */
export function regulatoryStatement(r: SoloRegulatory): string {
  return r === "compounded-approved-active"
    ? "This is a compounded preparation. Compounded medications are not FDA-approved, and the FDA does not review them for safety or effectiveness. The active ingredient is FDA-approved in other products; that approval does not extend to this preparation."
    : "This is a compounded preparation. Compounded medications are not FDA-approved, and the FDA does not review them for safety or effectiveness. There is no FDA-approved product containing this active for any indication, so its use is considered experimental or off-label.";
}

/** Evidence-limitation sentence — stated only where it is true. */
function evidenceStatement(r: SoloRegulatory): string | null {
  return r === "compounded-no-approved-active"
    ? "Much of the supporting evidence comes from preclinical or early-stage research. Well-controlled human trials are limited."
    : null;
}

const LABEL: React.CSSProperties = {
  fontFamily: F,
  fontSize: "var(--nx-t-2xs)",
  fontWeight: 600,
  letterSpacing: "var(--nx-ls-caps)",
  textTransform: "uppercase",
  color: "var(--nx-fg-muted)",
  marginBottom: "0.5rem",
};

const BODY: React.CSSProperties = {
  fontFamily: F,
  fontSize: "var(--nx-t-sm)",
  lineHeight: 1.6,
  color: "var(--nx-fg-graphite)",
  margin: 0,
};

export function RegulatoryDisclosure({
  sku,
  regulatory,
  showParties = true,
  testid = "regulatory-disclosure",
}: {
  /** Pass the SKU and the status is derived; or pass `regulatory` directly. */
  sku?: SoloPeptide;
  regulatory?: SoloRegulatory;
  /** Provider + pharmacy attribution. Off where the page already names them. */
  showParties?: boolean;
  testid?: string;
}) {
  const r: SoloRegulatory = regulatory ?? (sku ? regulatoryOf(sku) : "compounded-no-approved-active");
  const evidence = evidenceStatement(r);

  return (
    <Reveal>
      <section
        data-testid={testid}
        data-regulatory={r}
        style={{
          border: "1px solid var(--nx-border)",
          borderRadius: "var(--nx-r-md)",
          background: "var(--nx-ceramic)",
          padding: "clamp(1.25rem,3vw,1.75rem)",
        }}
      >
        <p style={LABEL}>Regulatory status</p>
        <p style={BODY}>{regulatoryStatement(r)}</p>

        {evidence && <p style={{ ...BODY, marginTop: "0.75rem" }}>{evidence}</p>}

        <p style={{ ...BODY, marginTop: "0.75rem" }}>
          Prescription products require an evaluation by a licensed provider. Treatment is
          dispensed only {CONDITIONAL.ifPrescribed}, and a provider may determine that no
          treatment is appropriate.
        </p>

        {showParties && (
          <div
            style={{
              marginTop: "1.25rem",
              paddingTop: "1.25rem",
              borderTop: "1px solid var(--nx-border)",
              display: "grid",
              gap: "1rem",
            }}
          >
            <div>
              <p style={LABEL}>Clinical care</p>
              <p style={BODY}>
                {PROVIDER_INFO.name} provides the clinical care for this program.{" "}
                <a
                  href={`mailto:${PROVIDER_INFO.email}`}
                  style={{ color: "var(--nx-cobalt-ink)", textDecoration: "underline" }}
                >
                  {PROVIDER_INFO.email}
                </a>
              </p>
            </div>
            <div>
              <p style={LABEL}>Dispensing pharmacy</p>
              <p style={BODY}>
                {PHARMACY_INFO.name} · {PHARMACY_INFO.phone}
              </p>
            </div>
          </div>
        )}
      </section>
    </Reveal>
  );
}
