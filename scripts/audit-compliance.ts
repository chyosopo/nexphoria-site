/* audit:compliance — blocks a LegitScript submission built on placeholder facts.

   Chiya asked for placeholder business address/phone so the legal pages render
   complete while the real values are gathered (2026-08-12). That is fine for
   preview and actively useful for design review. It is NOT fine to submit, and
   the failure mode is silent: the pages look finished, so nobody remembers the
   address is fake until a reviewer checks it and the application fails.

   This gate makes that impossible to forget. It exits non-zero while any
   placeholder remains, so the apex deploy workflow stops rather than publishing
   invented business facts. Replace the values in client/src/data/compliance.ts
   and the gate goes quiet on its own — never by loosening the pattern. */
import { BUSINESS, PROVIDER_INFO, PHARMACY_INFO, compliancePlaceholders } from "../client/src/data/compliance";

let failed = false;

console.log("\n═ COMPLIANCE FACTS ═");
console.log(`  entity   : ${BUSINESS.entity}`);
console.log(`  email    : ${BUSINESS.email}`);
console.log(`  address  : ${BUSINESS.address || "(empty)"}`);
console.log(`  phone    : ${BUSINESS.phone || "(empty)"}`);
console.log(`  provider : ${PROVIDER_INFO.name}`);
console.log(`  pharmacy : ${PHARMACY_INFO.name}`);

console.log("\n═ PLACEHOLDER CHECK ═");
const pending = compliancePlaceholders();
if (pending.length) {
  failed = true;
  for (const k of pending) console.log(`  ✗ ${k} is still a placeholder`);
  console.log(
    "\n  These render on every legal page. LegitScript verifies the business\n" +
      "  address — submitting a placeholder fails the application. Replace the\n" +
      "  values in client/src/data/compliance.ts before any apex deploy.",
  );
} else {
  console.log("  none — all compliance facts are real values");
}

/* Empty is its own failure: LegitScript requires address + phone on every
   policy page, and LegalLayout omits fields that are blank. */
console.log("\n═ REQUIRED-FIELD CHECK ═");
const missing = (["entity", "email", "address", "phone"] as const).filter((k) => !BUSINESS[k]?.trim());
if (missing.length) {
  failed = true;
  for (const k of missing) console.log(`  ✗ BUSINESS.${k} is empty — required on every policy page`);
} else {
  console.log("  none — every required field is populated");
}

if (failed) {
  console.log("\nRESULT: FAIL — compliance facts are not submission-ready\n");
  process.exit(1);
}
console.log("\nRESULT: PASS — compliance facts are submission-ready\n");
