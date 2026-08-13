/* ═══ A2P 10DLC / SMS COMPLIANCE — the disclosures, in one place ═══

   Chiya applied for A2P 10DLC registration and a Twilio number (2026-08-13).
   Before this file the site collected phone numbers on TWO forms (the intake
   and the contact form) and carried ZERO messaging language anywhere — no
   consent checkbox, no program description, no STOP/HELP, and none of the
   clauses carriers check. That is not a near-miss; it is the standard
   rejection set, and campaign review reads the PUBLIC WEBSITE to verify it.

   Everything a reviewer looks for lives here so the opt-in checkbox, the
   Messaging Terms page, the Privacy Policy section, and the audit:a2p gate
   all render the SAME strings. A consent checkbox whose wording has drifted
   from the terms page it links to is a finding by itself.

   WHAT THIS FILE IS NOT: legal advice, and not a substitute for the campaign
   registration itself (brand + campaign use case + sample messages are filed
   with the carrier, not published here). It makes the site side verifiable.

   ── The rejection causes this addresses, in the order reviewers hit them ──
   1. Privacy Policy missing the mobile-information clause. The single most
      common rejection. The exact sentence is MOBILE_DATA_CLAUSE below; it is
      quoted verbatim on purpose and should not be paraphrased.
   2. No visible opt-in. Consent must be collected on the site, unchecked by
      default, with the disclosure IN the label rather than behind a link.
   3. Consent bundled into a required flow. Messaging consent may not be a
      condition of purchase or of care, so the SMS gate is the one consent on
      the intake that is OPTIONAL — see requiredConsents() in ConsentGates.
   4. Missing program terms: description, frequency, rates, STOP, HELP.
   5. Legal entity on the site not matching the registered brand. Every string
      here takes the entity from BUSINESS rather than hardcoding a name. */
import { BUSINESS } from "./compliance";

/** VERBATIM carrier-required clause. Reviewers pattern-match this closely, so
 *  do not reword it, split it, or "improve" the grammar — the second sentence
 *  reads awkwardly and is still the accepted standard wording. */
export const MOBILE_DATA_CLAUSE =
  "No mobile information will be shared with third parties or affiliates for marketing or promotional purposes. All the above categories exclude text messaging originator opt-in data and consent; this information will not be shared with any third parties.";

/** What the program actually sends. This must describe REAL message types —
 *  a campaign whose sample messages do not match its published description is
 *  a rejection, and inventing a marketing programme we do not run would be a
 *  worse failure than under-describing one we do. */
export const MESSAGE_TYPES = [
  "Assessment and account notifications — confirmation that your intake was received, and requests for missing information.",
  "Clinical coordination — messages from your care team, prescription and refill status, and dose-review reminders.",
  "Laboratory scheduling — panel booking, collection reminders, and notice that results are ready to view.",
  "Shipment notifications — dispatch confirmation, cold-chain tracking, and delivery updates.",
  "Customer support — replies to questions you send us.",
];

export const MESSAGE_FREQUENCY = "Message frequency varies.";
export const MESSAGE_RATES = "Message and data rates may apply.";
export const OPT_OUT = "Reply STOP to any message to unsubscribe. You will receive a single confirmation and then no further messages.";
export const HELP_TEXT = `Reply HELP to any message for assistance, or email ${BUSINESS.email}.`;
export const CARRIER_LIABILITY =
  "Carriers are not liable for delayed or undelivered messages.";

/** The consent sentence shown beside a phone field. Every element a reviewer
 *  screenshots is inside it: who is sending, what they send, that consent is
 *  not a condition of purchase, frequency, rates, and the STOP/HELP keywords.
 *  Rendered as ONE string so the checkbox label and the terms page cannot
 *  drift apart. */
export function smsConsentLabel(): string {
  return `I agree to receive text messages from ${BUSINESS.entity} at the number I provided, about my assessment, prescription, laboratory scheduling, and shipments. Consent is not a condition of purchase or of care. ${MESSAGE_FREQUENCY} ${MESSAGE_RATES} Reply STOP to opt out, HELP for help.`;
}

/** Everything the audit checks for, so the gate and the pages cannot disagree
 *  about what "compliant" means. Each entry is a substring that MUST appear in
 *  the rendered site. */
export const A2P_REQUIRED_STRINGS: { label: string; needle: string; where: string }[] = [
  { label: "mobile-information clause", needle: MOBILE_DATA_CLAUSE, where: "/legal/privacy" },
  { label: "message frequency", needle: MESSAGE_FREQUENCY, where: "/legal/messaging" },
  { label: "message and data rates", needle: MESSAGE_RATES, where: "/legal/messaging" },
  { label: "STOP keyword", needle: "Reply STOP", where: "/legal/messaging" },
  { label: "HELP keyword", needle: "Reply HELP", where: "/legal/messaging" },
  { label: "carrier liability", needle: CARRIER_LIABILITY, where: "/legal/messaging" },
  { label: "consent not a condition", needle: "not a condition of purchase", where: "/legal/messaging" },
  { label: "legal entity", needle: BUSINESS.entity, where: "/legal/messaging" },
];
