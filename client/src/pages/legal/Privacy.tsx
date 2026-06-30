import { LegalLayout, LegalSection, LegalP } from "./LegalLayout";
import { useSeo } from "@/lib/seo";

export default function Privacy() {
  useSeo({
    title: "Privacy Policy | Nexphoria",
    description: "How we collect, use, and protect your personal and health information. HIPAA-compliant.",
    path: "/legal/privacy",
  });
  return (
    <LegalLayout title="Privacy Policy" lastUpdated="June 2026">
      <LegalSection title="1. Information We Collect">
        <LegalP>We collect personal information you provide during registration and intake, including name, date of birth, email address, and health information. We also collect lab results uploaded to or ordered through our platform.</LegalP>
      </LegalSection>
      <LegalSection title="2. How We Use Your Information">
        <LegalP>Your information is used to provide telehealth services, connect you with licensed physicians, process prescriptions, and facilitate pharmacy compounding. We do not sell your personal health information.</LegalP>
      </LegalSection>
      <LegalSection title="3. HIPAA Compliance">
        <LegalP>Nexphoria operates as a HIPAA-covered entity. We maintain administrative, physical, and technical safeguards to protect your protected health information (PHI) as required by law.</LegalP>
      </LegalSection>
      <LegalSection title="4. Data Sharing">
        <LegalP>We share your health information only with your treating physician, the compounding pharmacy fulfilling your prescription, and laboratory services processing your blood panel. We do not share your PHI with third-party advertisers.</LegalP>
      </LegalSection>
      <LegalSection title="5. Data Retention">
        <LegalP>We retain your health records for a minimum of seven years or as required by applicable state law, whichever is longer. You may request a copy of your records at any time.</LegalP>
      </LegalSection>
      <LegalSection title="6. Your Rights">
        <LegalP>You have the right to access, correct, or delete your personal information, subject to legal retention requirements. Submit requests to hello@nexphoria.com. This policy is governed by the laws of the State of New York.</LegalP>
      </LegalSection>
    </LegalLayout>
  );
}
