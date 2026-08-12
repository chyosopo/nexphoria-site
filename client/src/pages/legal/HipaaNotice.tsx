import { LegalLayout, LegalSection, LegalP } from "./LegalLayout";
import { useSeo, webPageJsonLd, breadcrumbJsonLd } from "@/lib/seo";

/* Standalone HIPAA Notice of Privacy Practices. HIPAA content previously
   lived only inside the Privacy Policy; regulators and hims-class telehealth
   sites treat the NPP as its own prominently linked document. */
export default function HipaaNotice() {
  useSeo({
    title: "HIPAA Notice of Privacy Practices | Nexphoria",
    description:
      "How medical information about you may be used and disclosed, and how you can get access to this information.",
    path: "/legal/hipaa-notice",
    jsonLd: [
      webPageJsonLd({
        name: "HIPAA Notice of Privacy Practices",
        description: "How medical information about you may be used and disclosed, and how you can get access to this information.",
        path: "/legal/hipaa-notice",
      }),
      breadcrumbJsonLd([
        { name: "Home", path: "/" },
        { name: "Legal", path: "/legal" },
        { name: "HIPAA Notice", path: "/legal/hipaa-notice" },
      ]),
    ],
  });
  return (
    <LegalLayout title="HIPAA Notice of Privacy Practices" lastUpdated="July 2026">
      <LegalSection title="This notice">
        <LegalP>
          This notice describes how medical information about you may be used and
          disclosed, and how you can get access to this information. Please review it
          carefully. Medical services are provided by independent licensed physicians
          and pharmacies; where those providers are covered entities under HIPAA, your
          protected health information (PHI) is handled under this notice and under
          business associate agreements executed per 45 CFR 164.504(e).
        </LegalP>
      </LegalSection>
      <LegalSection title="How we may use and disclose PHI">
        <LegalP>
          Treatment — your intake responses and laboratory results are shared with the
          physician reviewing your case and the pharmacy filling your prescription.
          Payment — billing information is processed to collect payment for services
          you request. Health care operations — quality review, credentialing of the
          physician network, and compliance auditing. Other uses and disclosures
          require your written authorization, which you may revoke at any time.
        </LegalP>
      </LegalSection>
      <LegalSection title="What we never do">
        <LegalP>
          We do not sell PHI. We do not use PHI for third-party advertising. Marketing
          communications require your authorization and can be stopped at any time.
        </LegalP>
      </LegalSection>
      <LegalSection title="Your rights">
        <LegalP>
          You may request access to and copies of your medical records; request
          corrections; request an accounting of disclosures; request restrictions on
          certain uses; request confidential communications; and receive notice of any
          breach affecting your PHI. Records are retained for a minimum of seven years
          consistent with medical record retention requirements.
        </LegalP>
      </LegalSection>
      <LegalSection title="Complaints and contact">
        <LegalP>
          To exercise any right or to file a complaint, contact hello@nexphoria.com.
          You may also file a complaint with the U.S. Department of Health and Human
          Services Office for Civil Rights. You will not be penalized for filing a
          complaint.
        </LegalP>
      </LegalSection>
    </LegalLayout>
  );
}
