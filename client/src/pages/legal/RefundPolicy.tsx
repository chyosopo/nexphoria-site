import { LegalLayout, LegalSection, LegalP } from "./LegalLayout";

export default function RefundPolicy() {
  return (
    <LegalLayout title="Refund Policy" lastUpdated="June 2026">
      <LegalSection title="General Policy">
        <LegalP>Nexphoria is committed to your satisfaction. Because our service involves physician consultations, laboratory work, and compounded medications, our refund policy reflects the nature of these services.</LegalP>
      </LegalSection>
      <LegalSection title="Physician Consultation Fees">
        <LegalP>Initial consultation fees are non-refundable once the consultation has been completed. If a physician is unable to complete a consultation, you will receive a full refund.</LegalP>
      </LegalSection>
      <LegalSection title="Lab Testing">
        <LegalP>Lab panel fees are non-refundable once a requisition has been issued. If you do not use your lab requisition within 30 days, you may request a refund minus a $25 processing fee.</LegalP>
      </LegalSection>
      <LegalSection title="Compounded Medications">
        <LegalP>Compounded medications cannot be returned or refunded once dispensed, per federal and state pharmacy regulations. If you receive a defective or incorrect product, contact us immediately at support@nexphoria.com — we will arrange a replacement at no charge.</LegalP>
      </LegalSection>
      <LegalSection title="Subscription Cancellation">
        <LegalP>You may cancel your subscription at any time from your member portal. Monthly fees already charged are not refunded. No further charges will be made after cancellation.</LegalP>
      </LegalSection>
      <LegalSection title="Exceptions">
        <LegalP>We review refund requests on a case-by-case basis for extraordinary circumstances. Contact billing@nexphoria.com within 30 days of a charge to request a review.</LegalP>
      </LegalSection>
    </LegalLayout>
  );
}
