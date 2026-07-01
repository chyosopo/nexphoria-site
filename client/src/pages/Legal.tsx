import { useState } from "react";
import { SiteLayout } from "@/components/SiteLayout";
import { Reveal } from "@/components/Reveal";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useSeo } from "@/lib/seo";

const lastUpdated = "Last updated: June 28, 2026";

export default function Legal() {
  useSeo({
    title: "Legal | Nexphoria",
    description: "Terms of Service, Privacy Policy, Telehealth Consent, and Refund Policy for Nexphoria.",
    path: "/legal",
  });
  const [tab, setTab] = useState("terms");

  return (
    <SiteLayout navVariant="light">
      <section className="bg-background pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="nx-container max-w-5xl">
          <Reveal>
            <p className="nx-eyebrow text-muted-foreground mb-8" data-testid="text-legal-eyebrow">
              LEGAL
            </p>
            <h1 className="nx-display text-foreground mb-6 leading-[0.95]">
              Terms, privacy, and{" "}
              <span className="text-primary">medical disclaimers.</span>
            </h1>
            <p className="text-sm font-mono text-muted-foreground uppercase tracking-widest">
              {lastUpdated}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-background pb-24 md:pb-32">
        <div className="nx-container max-w-5xl">
          <Tabs value={tab} onValueChange={setTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-12 bg-card h-auto p-1">
              <TabsTrigger value="terms" data-testid="tab-terms" className="text-xs md:text-sm py-3 font-mono uppercase tracking-wider data-[state=active]:bg-background data-[state=active]:text-foreground">
                Terms
              </TabsTrigger>
              <TabsTrigger value="privacy" data-testid="tab-privacy" className="text-xs md:text-sm py-3 font-mono uppercase tracking-wider data-[state=active]:bg-background data-[state=active]:text-foreground">
                Privacy
              </TabsTrigger>
              <TabsTrigger value="medical" data-testid="tab-medical" className="text-xs md:text-sm py-3 font-mono uppercase tracking-wider data-[state=active]:bg-background data-[state=active]:text-foreground">
                Medical
              </TabsTrigger>
              <TabsTrigger value="shipping" data-testid="tab-shipping" className="text-xs md:text-sm py-3 font-mono uppercase tracking-wider data-[state=active]:bg-background data-[state=active]:text-foreground">
                Shipping
              </TabsTrigger>
            </TabsList>

            <TabsContent value="terms" className="prose-content">
              <Section title="Terms of Service">
                <P>By accessing or using Nexphoria (the "Service"), you agree to these Terms of Service. If you do not agree, do not use the Service. Nexphoria is operated by Nexphoria Inc., a Delaware corporation ("Nexphoria", "we", "us").</P>

                <H>1. Eligibility</H>
                <P>You must be at least 18 years old and a resident of a U.S. state where our prescribing physicians are licensed. By creating an account, you represent that all information you provide is accurate and complete, and that you will keep it updated.</P>

                <H>2. The Service</H>
                <P>Nexphoria provides a technology platform that connects patients with independent licensed healthcare providers and FDA-registered compounding pharmacies. We are not a healthcare provider. Our healthcare provider network is operated by independently licensed clinicians who make their own clinical decisions.</P>

                <H>3. Accounts and Security</H>
                <P>You are responsible for maintaining the confidentiality of your account credentials. You agree to notify us immediately of any unauthorized access. We may suspend or terminate your account if we suspect fraud, misuse, or violation of these terms.</P>

                <H>4. Payment</H>
                <P>You agree to pay all fees for the protocols you order. Multi-month commitments lock in the per-month rate but bill in installments unless you choose otherwise. You may cancel future shipments at any time, but once a batch has been compounded, it is non-refundable.</P>

                <H>5. Intellectual Property</H>
                <P>All content on this site — text, images, logos, design — is owned by Nexphoria or its licensors and protected by U.S. and international copyright law. You may not reproduce, modify, or redistribute it without our written permission.</P>

                <H>6. Limitation of Liability</H>
                <P>To the maximum extent permitted by law, Nexphoria's total liability for any claim arising out of these terms or your use of the Service is limited to the amount you paid us in the 12 months before the claim. We are not liable for indirect, incidental, or consequential damages.</P>

                <H>7. Dispute Resolution</H>
                <P>Any dispute will be resolved by binding arbitration administered by JAMS under its Streamlined Arbitration Rules. The arbitration will take place in New York County, New York. You waive the right to a jury trial and to participate in any class action.</P>

                <H>8. Changes</H>
                <P>We may update these Terms from time to time. Material changes will be communicated by email or in-app notice at least 30 days before they take effect. Continued use of the Service after the effective date constitutes acceptance.</P>
              </Section>
            </TabsContent>

            <TabsContent value="privacy" className="prose-content">
              <Section title="Privacy Policy">
                <P>This Privacy Policy describes how Nexphoria collects, uses, and shares information about you. We take your privacy seriously — particularly because much of the information you share with us is protected health information ("PHI") under HIPAA.</P>

                <H>1. Information We Collect</H>
                <P>We collect (a) account information you provide (name, email, address, phone, date of birth); (b) clinical information you submit during intake (medical history, medications, goals, uploaded labs); (c) payment information processed by our PCI-DSS-compliant payment processor (we do not store full card numbers); and (d) usage data (pages visited, device type, IP address) collected automatically through cookies and analytics.</P>

                <H>2. How We Use It</H>
                <P>We use your information to: provide and improve the Service; route your intake to a licensed physician; coordinate with our pharmacy partners to fulfill your prescription; communicate with you about your account and protocol; comply with legal obligations; and detect and prevent fraud.</P>

                <H>3. HIPAA</H>
                <P>Your clinical information is PHI. We act as a business associate of the licensed physicians and pharmacies that provide care to you. We use, disclose, and safeguard PHI in accordance with HIPAA and applicable state law. You will receive a Notice of Privacy Practices from your treating provider that describes your specific rights.</P>

                <H>4. Sharing</H>
                <P>We share information with: (a) the licensed physicians and pharmacies that provide care to you; (b) service providers acting on our behalf (hosting, analytics, payment, shipping) under written confidentiality agreements; (c) authorities when required by law; and (d) acquirers in a merger or asset sale, subject to continued protection. We never sell your personal information.</P>

                <H>5. Your Rights</H>
                <P>Depending on where you live, you may have the right to access, correct, delete, or port your information, and to opt out of certain uses. California residents have additional rights under the CCPA. Email privacy@nexphoria.com to exercise these rights — we respond within 30 days.</P>

                <H>6. Security</H>
                <P>We protect your information with administrative, technical, and physical safeguards including encryption in transit and at rest, role-based access controls, and regular security audits. No method is 100% secure, but we work hard to protect what you trust us with.</P>

                <H>7. Retention</H>
                <P>We retain clinical records for the period required by state medical record laws (generally 7-10 years after last contact, longer for minors). Other information is retained while your account is active and for a reasonable period afterward.</P>
              </Section>
            </TabsContent>

            <TabsContent value="medical" className="prose-content">
              <Section title="Medical Disclaimer">
                <H>Not medical advice</H>
                <P>The content on this website is for informational purposes only and is not a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of a qualified healthcare provider with any questions you have about a medical condition.</P>

                <H>Individual results vary</H>
                <P>The outcomes described on this site are based on published clinical and preclinical research and typical patient experiences. They are not guarantees. Your response to peptide therapy may be faster, slower, or different from what is described. Many factors — including age, weight, baseline health, adherence, sleep, nutrition, and concurrent medications — influence outcomes.</P>

                <H>Prescription medicine</H>
                <P>The peptide therapies we facilitate are prescription medicines, dispensed by licensed pharmacies pursuant to a valid prescription from a licensed physician. They are not dietary supplements, over-the-counter products, or "research chemicals." Do not use any peptide product that has not been prescribed to you by a licensed clinician.</P>

                <H>Off-label use</H>
                <P>Many peptides we prescribe are FDA-approved for one indication and used off-label for another. Off-label prescribing is a long-standing, lawful practice when supported by clinical judgment. Your physician will explain the evidence base, risks, and alternatives during your protocol review.</P>

                <H>Side effects and contraindications</H>
                <P>All medications carry risks. Common side effects of peptide therapy include injection-site irritation, mild headache, transient water retention, and changes in appetite. Serious adverse events are rare but possible. Peptide therapy is contraindicated in patients with active or recent cancer, pregnancy or breastfeeding, and certain endocrine conditions. Our intake screens for these; disclose all relevant history.</P>

                <H>Emergencies</H>
                <P>If you are experiencing a medical emergency, call 911 or go to the nearest emergency room. Do not use Nexphoria's messaging system for emergencies.</P>

                <H>FDA statements</H>
                <P>Statements on this site have not been evaluated by the FDA except where explicitly noted. Compounded medications are not FDA-approved in the same way commercial drugs are; they are exempt from certain requirements under federal law when produced by FDA-registered 503A or 503B pharmacies pursuant to a valid prescription.</P>
              </Section>
            </TabsContent>

            <TabsContent value="shipping" className="prose-content">
              <Section title="Shipping &amp; Returns">
                <H>Shipping</H>
                <P>We ship to U.S. addresses in states where our prescribing physicians are licensed. Most shipments arrive within 2-3 business days of dispatch via insulated cold-chain packaging with temperature monitoring. Tracking is provided automatically. You may opt into signature confirmation at checkout.</P>

                <H>If your shipment is delayed or damaged</H>
                <P>Contact us at shipping@nexphoria.com within 48 hours of delivery (or expected delivery). If the integrity of the medication is compromised — broken vials, temperature excursion — we will replace the shipment at no cost.</P>

                <H>Returns</H>
                <P>Federal and state law generally prohibit the return of dispensed prescription medications. We cannot accept returns of compounded peptides once they have shipped. If your physician determines you are not a candidate for therapy before compounding begins, we issue a full refund. If you change your mind after compounding has started but before shipment, we may be able to issue a partial credit at our discretion.</P>

                <H>Cancellation</H>
                <P>You may cancel future shipments at any time through your patient portal or by emailing care@nexphoria.com. Cancellations must be received at least 5 business days before the next scheduled fulfillment date to take effect for that cycle.</P>

                <H>International</H>
                <P>We do not currently ship outside the United States. Importing prescription peptides into many countries is illegal and we will not facilitate it.</P>

                <H>Storage</H>
                <P>Upon receipt, refrigerate lyophilized peptide vials at 2-8°C (36-46°F). Once reconstituted with bacteriostatic water, peptides are stable refrigerated for up to 30 days. Do not freeze. Detailed storage instructions are included with every shipment.</P>
              </Section>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </SiteLayout>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1">
      <h2 className="nx-headline text-foreground mb-8" data-testid={`text-legal-section-${title.toLowerCase().replace(/\s/g, "-")}`}>
        {title}
      </h2>
      <div className="space-y-6 max-w-3xl">{children}</div>
    </div>
  );
}

function H({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="font-display text-xl font-semibold text-foreground mt-8 mb-2">{children}</h3>
  );
}

function P({ children }: { children: React.ReactNode }) {
  return <p className="text-foreground/80 leading-relaxed">{children}</p>;
}
