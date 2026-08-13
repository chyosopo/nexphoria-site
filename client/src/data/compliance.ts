/* ═══ COMPLIANCE CONSTANTS — LegitScript / Bask (2026-07-29) ═══
   Single source for the entity, provider, and pharmacy facts LegitScript
   requires on the site. Text for the provider and pharmacy blocks is
   VERBATIM from Bask onboarding (Mason, #nexphoria-bask, 7/28) — do not
   editorialize it. Business address/phone ship empty until Chiya supplies
   them; legal pages render what exists and omit what doesn't. */

/** Legal entity + contact — REQUIRED on Terms/Privacy/Refund/Telehealth
 *  Consent per LegitScript, and on the A2P 10DLC brand registration.
 *  Supplied by Chiya 2026-08-13; the placeholders are retired. */
export const BUSINESS = {
  entity: "Nexphoria Research LLC",
  email: "hello@nexphoria.com",
  address: "670 Flushing Ave, Brooklyn, NY 11213",
  /** Display form. Use `phoneE164` for tel: links and structured data. */
  phone: "(929) 728-2869",
  /** E.164 — what tel: hrefs, schema.org and the A2P registration want. */
  phoneE164: "+19297282869",
};

/** The address in parts, for schema.org PostalAddress. Kept beside the flat
 *  string rather than parsed out of it: a regex over a one-line address is a
 *  silent-wrong waiting to happen, and structured data reviewers read is not
 *  the place for a best-effort split. */
export const BUSINESS_ADDRESS = {
  streetAddress: "670 Flushing Ave",
  addressLocality: "Brooklyn",
  addressRegion: "NY",
  postalCode: "11213",
  addressCountry: "US",
};

/* ⚠ PLACEHOLDER POLICY — kept because the machinery below still enforces it.
   Between 2026-08-12 and 2026-08-13 address and phone were visibly bracketed
   non-values rather than plausible-looking fakes, because this is the one
   field where a CONVINCING placeholder is more dangerous than an empty one:
   LegitScript and A2P brand verification both check the business address, and
   a fake that reads as real fails harder than a blank. Chiya supplied the real
   values on 2026-08-13 and the placeholders are gone.

   isPlaceholder() still backs audit:compliance and audit:a2p. If a value ever
   has to go back to pending, write it bracketed and the gates resume failing.
   Do not "fix" a gate by making a value look realistic. */
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
