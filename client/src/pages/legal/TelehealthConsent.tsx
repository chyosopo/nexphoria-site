import { LegalLayout, LegalSection, LegalP } from "./LegalLayout";
import { useSeo } from "@/lib/seo";

export default function TelehealthConsent() {
  useSeo({
    title: "Telehealth Consent | Nexphoria",
    description: "Your consent to receive care via telehealth and off-label prescribing. State-specific requirements.",
    path: "/legal/telehealth-consent",
  });
  return (
    <LegalLayout title="Telehealth Consent" lastUpdated="June 2026">
      <LegalSection title="1. Telehealth Services">
        <LegalP>By using Nexphoria's telehealth services, you consent to receive medical care through electronic communications, including video, audio, and asynchronous messaging. Telehealth services are provided by independent licensed physicians.</LegalP>
      </LegalSection>
      <LegalSection title="2. Nature of Telehealth">
        <LegalP>You understand that telehealth is not the same as in-person care. There are potential risks including technological failures, limitations in physical examination, and interruptions to service. Your physician will determine if telehealth is appropriate for your care.</LegalP>
      </LegalSection>
      <LegalSection title="3. Off-Label Prescribing">
        <LegalP>Many peptide protocols offered by Nexphoria involve off-label use of compounded medications — meaning they are prescribed for uses beyond an FDA-approved indication. Your physician will discuss the rationale, evidence, and risks before prescribing.</LegalP>
      </LegalSection>
      <LegalSection title="4. Emergency Care">
        <LegalP>Telehealth is not appropriate for medical emergencies. If you are experiencing a medical emergency, call 911 or go to your nearest emergency room. Nexphoria physicians cannot provide emergency care.</LegalP>
      </LegalSection>
      <LegalSection title="5. State-Specific Requirements">
        <LegalP>Telehealth regulations vary by state. Your physician is licensed to practice in your state of residence. By proceeding, you confirm that you are located in a state where Nexphoria currently operates.</LegalP>
      </LegalSection>
      <LegalSection title="6. Withdrawal of Consent">
        <LegalP>You may withdraw consent to telehealth services at any time by contacting hello@nexphoria.com. Withdrawal does not affect care received prior to withdrawal.</LegalP>
      </LegalSection>
    </LegalLayout>
  );
}
