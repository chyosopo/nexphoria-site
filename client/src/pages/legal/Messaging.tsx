/* ═══ MESSAGING TERMS — the page A2P 10DLC campaign review reads ═══

   Carrier review checks the public website for a specific, small set of
   things. This page carries all of them, and takes every string from
   data/messaging.ts so the opt-in checkbox on the forms, this page, and the
   audit:a2p gate cannot drift apart. */
import { LegalLayout, LegalSection, LegalP } from "./LegalLayout";
import { useSeo, webPageJsonLd, breadcrumbJsonLd } from "@/lib/seo";
import { BUSINESS, isPlaceholder } from "@/data/compliance";
import {
  MESSAGE_TYPES, MESSAGE_FREQUENCY, MESSAGE_RATES, OPT_OUT, HELP_TEXT,
  CARRIER_LIABILITY, MOBILE_DATA_CLAUSE,
} from "@/data/messaging";

export default function Messaging() {
  useSeo({
    title: "Messaging Terms (SMS) | Nexphoria",
    description:
      "How Nexphoria uses text messaging: what we send, how often, how to stop, and how your mobile information is handled.",
    path: "/legal/messaging",
    jsonLd: [
      webPageJsonLd({ name: "Messaging Terms", description: "SMS program terms, opt-in, and opt-out.", path: "/legal/messaging" }),
      breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Legal", path: "/legal" }, { name: "Messaging Terms", path: "/legal/messaging" }]),
    ],
  });

  return (
    <LegalLayout title="Messaging Terms" lastUpdated="August 2026">
      <LegalSection title="1. The programme">
        <LegalP>
          {BUSINESS.entity} operates a text-messaging programme to coordinate care for people
          who have started an assessment or hold an active protocol. Messages are transactional
          and service-related. We do not run an SMS marketing programme and we do not send
          promotional offers by text.
        </LegalP>
        <LegalP>
          You are enrolled only if you give express written consent — by ticking the messaging
          box on our intake or contact form, or by texting us first. <strong>Consent is not a
          condition of purchase or of care.</strong> Declining messages does not affect your
          eligibility, your assessment, or anything a physician decides.
        </LegalP>
      </LegalSection>

      <LegalSection title="2. What we send">
        {MESSAGE_TYPES.map((t) => <LegalP key={t}>{t}</LegalP>)}
      </LegalSection>

      <LegalSection title="3. Frequency and cost">
        <LegalP>
          {MESSAGE_FREQUENCY} Volume depends on where you are in your protocol — an active lab
          or shipment week carries more messages than a quiet one. {MESSAGE_RATES} Charges come
          from your mobile carrier, not from us; check your plan if you are unsure what your
          carrier charges for text messages.
        </LegalP>
      </LegalSection>

      <LegalSection title="4. Stopping messages">
        <LegalP>{OPT_OUT}</LegalP>
        <LegalP>
          Opting out stops text messages only. We will still reach you by email about anything
          your care requires — a prescription decision, a lab result, or a safety notice — because
          those communications are part of the medical service rather than the messaging
          programme.
        </LegalP>
      </LegalSection>

      <LegalSection title="5. Getting help">
        <LegalP>{HELP_TEXT}</LegalP>
        {!isPlaceholder(BUSINESS.phone) && <LegalP>You can also reach us by phone at {BUSINESS.phone}.</LegalP>}
      </LegalSection>

      <LegalSection title="6. Carriers and delivery">
        <LegalP>
          {CARRIER_LIABILITY} Delivery depends on your carrier and your device, and messages may
          not be available on every carrier or handset. Never rely on a text message for anything
          urgent. If you are having a medical emergency, call 911 or go to the nearest emergency
          department.
        </LegalP>
      </LegalSection>

      <LegalSection title="7. Your mobile information">
        <LegalP>{MOBILE_DATA_CLAUSE}</LegalP>
        <LegalP>
          We share the mobile number you provide only with the vendors that deliver the messages
          on our behalf, and only for that purpose, under contract. Our full data practices — what
          we collect, how long we keep it, and your rights over it — are set out in our Privacy
          Policy.
        </LegalP>
      </LegalSection>

      <LegalSection title="8. Changes and contact">
        <LegalP>
          We may update these terms; material changes will be posted here before they take
          effect. Questions about the messaging programme go to {BUSINESS.email}.
          {!isPlaceholder(BUSINESS.address) && ` ${BUSINESS.entity}, ${BUSINESS.address}.`}
        </LegalP>
      </LegalSection>
    </LegalLayout>
  );
}
