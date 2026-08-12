/* ═══ COMPLIANCE CONSTANTS — LegitScript / Bask (2026-07-29) ═══
   Single source for the entity, provider, and pharmacy facts LegitScript
   requires on the site. Text for the provider and pharmacy blocks is
   VERBATIM from Bask onboarding (Mason, #nexphoria-bask, 7/28) — do not
   editorialize it. Business address/phone ship empty until Chiya supplies
   them; legal pages render what exists and omit what doesn't. */

/** Legal entity + contact — REQUIRED on Terms/Privacy/Refund/Telehealth
 *  Consent per LegitScript. Address and phone pending from Chiya. */
export const BUSINESS = {
  entity: "Nexphoria Research LLC",
  email: "hello@nexphoria.com",
  /** PLACEHOLDER — replace with the real registered business address. */
  address: "[BUSINESS ADDRESS — PENDING]",
  /** PLACEHOLDER — replace with the real business phone. */
  phone: "[PHONE — PENDING]",
};

/* ⚠ PLACEHOLDER POLICY — read before touching the two fields above.
   Chiya asked for placeholders (2026-08-12) so the legal pages render complete
   while the real values are gathered. They are deliberately written as visibly
   bracketed non-values rather than a plausible-looking street address, because
   this is the one field where a CONVINCING placeholder is more dangerous than
   an empty one: LegitScript verifies the business address, and submitting a
   fake that reads as real fails the application harder than a blank would.

   isPlaceholder() below backs the audit:compliance gate, which fails while any
   placeholder remains. Do not "fix" that gate by making these look realistic —
   replace them with the true values, and the gate goes quiet on its own. */
const PLACEHOLDER_RE = /^\s*\[.*(PENDING|PLACEHOLDER|TODO).*\]\s*$/i;

export function isPlaceholder(v: string): boolean {
  return PLACEHOLDER_RE.test(v);
}

/** Every compliance value still unresolved. Empty array = ready to submit. */
export function compliancePlaceholders(): string[] {
  return Object.entries(BUSINESS)
    .filter(([, v]) => typeof v === "string" && isPlaceholder(v))
    .map(([k]) => `BUSINESS.${k}`);
}

/** Provider block — verbatim from Bask. */
export const PROVIDER_INFO = {
  name: "Arora Health & Aesthetics, LLC",
  body:
    "Arora Health & Aesthetics, LLC provides the clinical care for this program. Our licensed providers serve patients in all 50 U.S. states in accordance with applicable state licensure requirements and telehealth regulations. For provider-related questions, contact medicalcompliance@arorahealthgroup.com. Arora Health's office is located at 300 Lenora Street, Seattle, WA 98121. Learn more at www.arora-health.com.",
  email: "medicalcompliance@arorahealthgroup.com",
  url: "https://www.arora-health.com",
};

/** Partner pharmacy block — verbatim from Bask. */
export const PHARMACY_INFO = {
  name: "VialsRX",
  body:
    "VialsRX\n6220 Westpark Dr\nHouston, TX 77057\nPhone: (713) 497-5590\nvials.ai\n\nServices are available in all 50 US states through affiliated medical providers and pharmacy partners operating in accordance with applicable state licensure requirements. Please note that certain medications, formulations, or fulfillment options may vary depending on state-specific pharmacy regulations and dispensing restrictions.",
  phone: "(713) 497-5590",
  url: "https://vials.ai",
};
