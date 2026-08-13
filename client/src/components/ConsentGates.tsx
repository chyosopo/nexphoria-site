/* ═══ CONSENT GATES ═══

   Atlas's rendered audit of /assessment (docs/ASSESSMENT-AUDIT.md §A7) found
   the flow had **zero hard consent gates**: every disclaimer was passive text
   at the Review step, and nothing blocked submission. IvyRx runs three
   blocking acknowledgments (general guidelines, pregnancy precaution,
   truthfulness) plus a telehealth consent at account creation.

   That gap is compliance, not taste. A telehealth intake that never obtains
   explicit consent to a telehealth relationship, and never asks the patient to
   attest their answers are true, is missing two of the things a reviewer looks
   for first — and the second is what protects the prescribing physician when
   an intake turns out to be false.

   Design notes:
   · These are ACKNOWLEDGMENTS, not data. Nothing here is PHI and nothing here
     is transmitted as health information — they are booleans recording that a
     disclosure was shown and accepted. The health answers themselves continue
     to live in the medical engine, never in this repo (CLAUDE.md law 5).
   · Each gate states what is being agreed to IN the label, not behind a link.
     A checkbox whose meaning requires a click elsewhere is not informed
     consent; the linked policy is supporting detail, not the disclosure.
   · Unchecked is the only default. Pre-checking a consent box is the dark
     pattern Atlas flagged on the reference (§V3.5, marketing opt-in
     pre-checked) and it is explicitly not copied. */
import { F } from "@/lib/typography";
import { Link } from "wouter";
import { smsConsentLabel } from "@/data/messaging";

export interface ConsentState {
  telehealth: boolean;
  truthful: boolean;
  /** Only required when the intake flagged a contraindication. */
  contraindication: boolean;
  /** SMS opt-in. NEVER required — see requiredConsents(). */
  sms: boolean;
}

export const EMPTY_CONSENT: ConsentState = {
  telehealth: false,
  truthful: false,
  contraindication: false,
  sms: false,
};

/** Every gate the current answers require. Contraindication acknowledgment is
 *  demanded ONLY when something was actually flagged — asking everyone to
 *  acknowledge a risk they did not report trains people to tick without
 *  reading, which defeats the purpose of a gate.
 *
 *  `sms` is deliberately ABSENT from every branch. Messaging consent may not
 *  be a condition of purchase or of care under A2P 10DLC rules, so the SMS box
 *  must never be able to block submission. If you are adding a consent here,
 *  check first whether it is one the patient is allowed to decline. */
export function requiredConsents(hasFlaggedCondition: boolean): (keyof ConsentState)[] {
  return hasFlaggedCondition
    ? ["telehealth", "truthful", "contraindication"]
    : ["telehealth", "truthful"];
}

export function consentSatisfied(c: ConsentState, hasFlaggedCondition: boolean): boolean {
  return requiredConsents(hasFlaggedCondition).every((k) => c[k]);
}

function Gate({
  id, checked, onChange, children,
}: {
  id: string; checked: boolean; onChange: (v: boolean) => void; children: React.ReactNode;
}) {
  return (
    <label
      htmlFor={id}
      data-testid={`consent-${id}`}
      data-checked={checked}
      style={{
        display: "flex", gap: "0.7rem", alignItems: "flex-start", cursor: "pointer",
        border: `1px solid ${checked ? "var(--nx-cobalt)" : "var(--nx-border)"}`,
        background: checked ? "var(--nx-cobalt-soft)" : "var(--nx-ceramic)",
        borderRadius: "var(--nx-r-sm)", padding: "0.85rem 0.95rem",
        transition: "border-color var(--nx-dur-2) var(--nx-ease), background var(--nx-dur-2) var(--nx-ease)",
      }}
    >
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        style={{ marginTop: 3, width: 16, height: 16, accentColor: "var(--nx-cobalt)", flexShrink: 0 }}
      />
      <span style={{ fontFamily: F, fontSize: "var(--nx-t-sm)", lineHeight: 1.55, color: "var(--nx-fg-graphite)" }}>
        {children}
      </span>
    </label>
  );
}

export function ConsentGates({
  value, onChange, hasFlaggedCondition, flaggedLabel,
}: {
  value: ConsentState;
  onChange: (next: ConsentState) => void;
  /** True when the medical-history step flagged anything requiring review. */
  hasFlaggedCondition: boolean;
  /** What was flagged, echoed back so the acknowledgment is specific. */
  flaggedLabel?: string;
}) {
  const set = (k: keyof ConsentState) => (v: boolean) => onChange({ ...value, [k]: v });

  return (
    <div data-testid="consent-gates" style={{ display: "grid", gap: "0.6rem" }}>
      <p
        style={{
          fontFamily: F, fontSize: "var(--nx-t-2xs)", fontWeight: 600,
          letterSpacing: "var(--nx-ls-caps)", textTransform: "uppercase",
          color: "var(--nx-fg-muted)", margin: "0 0 0.15rem",
        }}
      >
        Before you submit
      </p>

      <Gate id="telehealth" checked={value.telehealth} onChange={set("telehealth")}>
        I consent to a telehealth evaluation by a licensed provider, and I understand
        that a provider may determine that no treatment is appropriate.{" "}
        <Link href="/legal/telehealth-consent" style={{ color: "var(--nx-cobalt)", textDecoration: "underline" }}>
          Telehealth consent
        </Link>
      </Gate>

      <Gate id="truthful" checked={value.truthful} onChange={set("truthful")}>
        The information I have given is true and complete to the best of my knowledge.
        I understand a provider relies on it to decide whether treatment is safe for me.
      </Gate>

      {hasFlaggedCondition && (
        <Gate id="contraindication" checked={value.contraindication} onChange={set("contraindication")}>
          I understand that what I reported{flaggedLabel ? ` — ${flaggedLabel} — ` : " "}
          may make this treatment unsafe or unsuitable, and that a provider will review it
          before anything is prescribed.
        </Gate>
      )}

      {/* SMS OPT-IN — the box A2P 10DLC campaign review looks for.
          Set apart from the gates above and labelled optional, because it is
          the one consent here the patient may decline with no consequence.
          Unchecked by default and disclosed in the label rather than behind
          the link: a checkbox whose meaning requires a click elsewhere is not
          express written consent. */}
      <p
        style={{
          fontFamily: F, fontSize: "var(--nx-t-2xs)", fontWeight: 600,
          letterSpacing: "var(--nx-ls-caps)", textTransform: "uppercase",
          color: "var(--nx-fg-muted)", margin: "0.7rem 0 0.15rem",
        }}
      >
        Optional
      </p>
      <Gate id="sms" checked={value.sms} onChange={set("sms")}>
        {smsConsentLabel()}{" "}
        <Link href="/legal/messaging" style={{ color: "var(--nx-cobalt)", textDecoration: "underline" }}>
          Messaging Terms
        </Link>
        {" · "}
        <Link href="/legal/privacy" style={{ color: "var(--nx-cobalt)", textDecoration: "underline" }}>
          Privacy Policy
        </Link>
      </Gate>
    </div>
  );
}
