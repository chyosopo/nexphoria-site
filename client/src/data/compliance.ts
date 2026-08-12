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
  /** e.g. "123 Example St, Suite 4, City, ST 00000" — pending */
  address: "",
  /** e.g. "(555) 000-0000" — pending */
  phone: "",
};

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
