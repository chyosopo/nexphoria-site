import { LegalLayout, LegalSection, LegalP } from "./LegalLayout";

export default function Terms() {
  return (
    <LegalLayout title="Terms of Service" lastUpdated="June 2026">
      <LegalSection title="1. Acceptance of Terms">
        <LegalP>By accessing or using Nexphoria services, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing our services.</LegalP>
      </LegalSection>
      <LegalSection title="2. Medical Services">
        <LegalP>Nexphoria provides a telehealth platform connecting patients with licensed US physicians. Physicians are independent contractors and not employees of Nexphoria. All prescriptions are issued solely at the physician's medical discretion after review of your labs and health history.</LegalP>
        <LegalP>Nexphoria does not practice medicine. Nothing on this site constitutes medical advice. You should always consult with a qualified healthcare provider before starting any new treatment protocol.</LegalP>
      </LegalSection>
      <LegalSection title="3. Compounding Pharmacy">
        <LegalP>Compounded medications are prepared by third-party 503A-licensed pharmacies. Nexphoria is not a pharmacy. All compounded preparations are made pursuant to a valid prescription from a licensed physician.</LegalP>
      </LegalSection>
      <LegalSection title="4. User Eligibility">
        <LegalP>You must be at least 21 years of age to use Nexphoria services. By using our services, you represent and warrant that you are of legal age and have the legal capacity to enter into these terms.</LegalP>
      </LegalSection>
      <LegalSection title="5. Payment and Billing">
        <LegalP>All services are self-pay. Charges are billed monthly. You authorize us to charge the payment method on file for recurring subscription charges. We provide itemized receipts suitable for FSA/HSA reimbursement.</LegalP>
      </LegalSection>
      <LegalSection title="6. Cancellation">
        <LegalP>You may cancel your subscription at any time through your member portal. Cancellation takes effect at the end of your current billing cycle. Medications that have been dispensed cannot be returned.</LegalP>
      </LegalSection>
      <LegalSection title="7. Limitation of Liability">
        <LegalP>To the fullest extent permitted by law, Nexphoria shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of our services.</LegalP>
      </LegalSection>
      <LegalSection title="8. Contact">
        <LegalP>Questions about these terms? Contact us at hello@nexphoria.com. Nexphoria operates under the laws of the State of New York. Any dispute arising from these terms shall be governed by and construed in accordance with New York law, without regard to its conflict-of-law provisions.</LegalP>
      </LegalSection>
    </LegalLayout>
  );
}
