import { LegalLayout, LegalSection, LegalP } from "./LegalLayout";
import { useSeo, webPageJsonLd, breadcrumbJsonLd } from "@/lib/seo";
import { GLP1_STATE_EXCLUSIONS } from "@/data/stacksCatalog";

/* State availability — surfaces the eligibility rules that previously lived
   only inside checkout validation. A hims-class telehealth site tells the
   user where it operates before they reach a blocked checkout. */
export default function StateAvailability() {
  useSeo({
    title: "State Availability | Nexphoria",
    description:
      "Where Nexphoria physician-supervised peptide therapy is available, and which protocols carry state-level restrictions.",
    path: "/legal/state-availability",
    jsonLd: [
      webPageJsonLd({
        name: "State Availability",
        description: "Where Nexphoria telehealth services are available and which protocols carry state-level restrictions.",
        path: "/legal/state-availability",
      }),
      breadcrumbJsonLd([
        { name: "Home", path: "/" },
        { name: "Legal", path: "/legal" },
        { name: "State Availability", path: "/legal/state-availability" },
      ]),
    ],
  });
  return (
    <LegalLayout title="State Availability" lastUpdated="July 2026">
      <LegalSection title="Where we operate">
        <LegalP>
          Nexphoria coordinates care through independent, state-licensed physicians and
          503A compounding pharmacies. Telehealth consultations and prescription
          fulfillment are available to residents of the U.S. states where our physician
          network and pharmacy partners hold active licenses. Your state of residence is
          confirmed during intake, and a physician licensed in your state reviews your
          file — care is never provided across state lines by an unlicensed provider.
        </LegalP>
      </LegalSection>
      <LegalSection title="Protocol-specific restrictions">
        <LegalP>
          Certain compounded GLP-1 protocols are not available in the following states
          due to state pharmacy regulations: {GLP1_STATE_EXCLUSIONS.join(", ")}. If you
          live in one of these states, the intake will tell you before any consultation
          begins, and other protocols may remain available to you.
        </LegalP>
      </LegalSection>
      <LegalSection title="If your state is not covered">
        <LegalP>
          Licensing coverage expands over time. If service is not available in your
          state, you may join the waitlist and we will notify you when coverage opens.
          No charge is made for an intake that cannot proceed to a consultation.
        </LegalP>
      </LegalSection>
      <LegalSection title="Questions">
        <LegalP>
          For questions about availability in your state, contact hello@nexphoria.com
          before beginning intake.
        </LegalP>
      </LegalSection>
    </LegalLayout>
  );
}
