import { SiteLayout } from "@/components/SiteLayout";
import { MxHeader } from "@/components/MaximusTile";
import { PillBadge } from "@/components/PillBadge";
import { Reveal } from "@/components/Reveal";
import { StartIntakeButton } from "@/components/StartIntakeButton";
import { FAQAccordion } from "@/components/FAQAccordion";
import { useSeo, webPageJsonLd, orgJsonLd, breadcrumbJsonLd, howToJsonLd } from "@/lib/seo";
import {
  ClipboardList,
  Stethoscope,
  FlaskConical,
  Truck,
  Snowflake,
  PackageCheck,
  Thermometer,
  PenLine,
  CalendarClock,
  Activity,
  ChevronRight,
} from "lucide-react";

// Editorial images
import editorialPrescription from "@/assets/brand/editorial-prescription.webp";
import editorialBloodwork from "@/assets/brand/editorial-bloodwork.webp";
import lifestyleCompoundingRoom from "@/assets/brand/lifestyle-compounding-room.webp";
import lifestyleShippingPackage from "@/assets/brand/lifestyle-shipping-package.webp";
import lifestyleLabVials from "@/assets/brand/lifestyle-lab-vials.webp";
import lifestylePharmacyShelf from "@/assets/brand/lifestyle-pharmacy-shelf.webp";
import editorialPharmacy from "@/assets/brand/editorial-pharmacy.webp";
import heroHowItWorks from "@/assets/brand/hero-howitworks.webp";
import mdPhoto from "@/assets/brand/physicians/md-1.webp";

// ─── Shared style helpers ──────────────────────────────────────────────────

const eyebrow: React.CSSProperties = {
  fontFamily: "'General Sans', system-ui, sans-serif",
  fontSize: "11px",
  fontWeight: 500,
  letterSpacing: "0.18em",
  textTransform: "uppercase",
  color: "var(--nx-cobalt)",
  marginBottom: "1rem",
  display: "flex",
  alignItems: "center",
  gap: "0.75rem",
};

const eyebrowRule = (
  <span style={{ display: "inline-block", width: "32px", height: "1px", backgroundColor: "var(--nx-cobalt)" }} />
);

const sectionHeading: React.CSSProperties = {
  fontFamily: "'General Sans', system-ui, sans-serif",
  fontWeight: 500,
  
  fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)",
  color: "var(--nx-fg)",
  lineHeight: 1.12,
  marginBottom: "1.25rem",
};

const bodyCopy: React.CSSProperties = {
  fontFamily: "'General Sans', system-ui, sans-serif",
  fontSize: "1.0625rem",
  color: "#4A4A4A",
  lineHeight: 1.7,
};

const monoCaption: React.CSSProperties = {
  fontFamily: "'General Sans', system-ui, sans-serif",
  fontSize: "10px",
  fontWeight: 500,
  letterSpacing: "0.12em",
  textTransform: "uppercase",
  color: "var(--nx-fg-muted)",
};

// ─── Data ────────────────────────────────────────────────────────────────────

const KPIS = [
  { label: "Avg consult", value: "15 min" },
  { label: "Pharmacy turnaround", value: "24–48h" },
  { label: "Shipping", value: "Cold-chain" },
  { label: "Monitoring", value: "Quarterly recalibration" },
];

const STEPS = [
  {
    num: "01",
    icon: ClipboardList,
    sub: "INTAKE & BLOODWORK",
    title: "Intake & bloodwork.",
    detail:
      "Complete a 12-minute structured questionnaire covering your goals, medical history, current medications, and lifestyle. An at-home lab kit is shipped the same day — or routed to a Quest Diagnostics site near you. Responses are passed through algorithmic safety checks that flag contraindications before a physician ever sees your file.",
    timeline: "~12 minutes + at-home lab kit",
    image: editorialPrescription,
    imageAlt: "Patient completing structured medical intake",
  },
  {
    num: "02",
    icon: Stethoscope,
    sub: "PHYSICIAN REVIEW",
    title: "Physician review.",
    detail:
      "A board-certified MD licensed in your state reviews your complete laboratory panel and medical history, then designs a protocol calibrated to your physiology. Review is completed within 24–48 hours. If a requested protocol is clinically inappropriate, the physician declines it or proposes a modified one. Physician discretion is final.",
    timeline: "24–48 hours",
    image: editorialBloodwork,
    imageAlt: "Physician reviewing patient laboratory results",
  },
  {
    num: "03",
    icon: FlaskConical,
    sub: "PHARMACY COMPOUNDING",
    title: "Pharmacy compounding.",
    detail:
      "Approved protocols are compounded by a 503A-licensed US pharmacy under USP <797> sterile compounding standards and 503A regulatory oversight. Every batch is tested for identity, potency, and sterility prior to release. Packaging is cold-chain configured for temperature-sensitive peptides.",
    timeline: "3–5 business days",
    image: lifestyleCompoundingRoom,
    imageAlt: "Pharmacist working in 503A sterile compounding cleanroom",
  },
  {
    num: "04",
    icon: Truck,
    sub: "COLD-CHAIN DELIVERY",
    title: "Cold-chain delivery.",
    detail:
      "Your protocol ships in a refrigerated, insulated box via 2-day carrier, signature required on delivery. A temperature logger travels with every shipment. Included with every active protocol: quarterly Quest labs, physician check-ins after each draw, and dose adjustments based on measured biomarker change.",
    timeline: "2-day refrigerated · signature required",
    image: lifestyleShippingPackage,
    imageAlt: "Nexphoria cold-chain shipping package prepared for delivery",
  },
];

const INTAKE_TILES = [
  { tag: "Q: GOALS", label: "Clinical objective", desc: "Metabolic · recovery · longevity · performance" },
  { tag: "Q: MEDICAL HISTORY", label: "Conditions & screening", desc: "Contraindication flags reviewed before prescribing" },
  { tag: "Q: BLOODWORK", label: "Lab panel", desc: "38-biomarker Quest panel — at-home or in-lab" },
  { tag: "Q: LIFESTYLE", label: "Sleep · activity · diet", desc: "Context that calibrates dose and cadence" },
];

const PHARMACY_GRID = [
  { img: lifestyleCompoundingRoom, caption: "USP <797> CLEANROOM" },
  { img: lifestyleLabVials, caption: "STERILE VIAL FILLING" },
  { img: editorialPharmacy, caption: "BATCH STERILITY TEST" },
  { img: lifestylePharmacyShelf, caption: "COLD-CHAIN PACK-OUT" },
];

const SHIPPING_TILES = [
  { icon: PackageCheck, label: "Insulated box", desc: "Medical-grade insulation rated for 48h transit" },
  { icon: Snowflake, label: "Ice packs", desc: "Phase-change gel holds 2–8°C end to end" },
  { icon: Thermometer, label: "Temperature logger", desc: "Continuous monitoring travels with every shipment" },
  { icon: PenLine, label: "Signature on delivery", desc: "Chain of custody confirmed at the door" },
];

const HOW_FAQS = [
  {
    category: "PROCESS",
    q: "How fast can I start?",
    a: "The intake takes about 12 minutes and your at-home lab kit ships the same day. Once your bloodwork is returned, a board-certified physician completes review within 24–48 hours. Most patients receive a compounded, cold-chain-shipped protocol within 5–7 business days of returning labs.",
  },
  {
    category: "PROCESS",
    q: "Do I need bloodwork?",
    a: "Yes. A 38-biomarker Quest Diagnostics panel is required before any prescription is issued — no labs, no protocol. This is the clinical minimum for safe dose calibration. You can use an at-home kit we ship you, or visit any of 2,000+ Quest sites nationwide. Labs are included with every active protocol.",
  },
  {
    category: "PROCESS",
    q: "Who are the physicians?",
    a: "Every protocol is reviewed and prescribed by a US board-certified physician licensed in your state of residence at the time of prescription. They review your full lab panel and history before designing a protocol, and they retain final discretion — including the discretion to decline a protocol that is clinically inappropriate for your baseline.",
  },
  {
    category: "PROCESS",
    q: "What if my protocol needs adjusting?",
    a: "Monitoring is the standard, not an add-on. Labs are rerun every 90 days with every active protocol. Your physician adjusts dose and cadence from measured biomarker change — not subjective symptom report. If a marker moves out of range, the protocol changes accordingly at no additional charge.",
  },
  {
    category: "LEGALITY",
    q: "Is this legal?",
    a: "Yes. All protocols are prescribed by US-licensed, board-certified physicians and compounded by licensed 503A compounding pharmacies under USP <797> standards — not overseas suppliers or research-grade powders. Compounding under a valid physician's prescription is standard medical practice for individualized medications in the US.",
  },
  {
    category: "PRICING",
    q: "What's the refund policy?",
    a: "There are no long-term contracts or cancellation fees. You can cancel any time before your protocol is dispensed at no charge. If a physician declines your protocol after review, you are not charged for the prescription. Once a compound is dispensed it cannot be returned for safety reasons, but you can pause or cancel future fills at any time through your member portal.",
  },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function HowItWorks() {
  useSeo({
    title: "How peptide therapy works — intake, physician review, compound, deliver",
    description:
      "12-minute intake. Board-certified physician reviews your bloodwork within 24 hours. Protocol compounded in a USP <797> 503A pharmacy and cold-chain shipped to your door. Four steps from assessment to first dose.",
    path: "/how-it-works",
    jsonLd: [
      webPageJsonLd({
        name: "How Nexphoria Works",
        description: "The four-step Nexphoria clinical process: intake, physician review, 503A compounding, and cold-chain delivery.",
        path: "/how-it-works",
        type: "MedicalWebPage",
      }),
      orgJsonLd(),
      breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "How It Works", path: "/how-it-works" }]),
      howToJsonLd({
        name: "How to start peptide therapy at Nexphoria",
        description: "A four-step physician-supervised process from intake assessment to your first dose, including bloodwork, telehealth consult, and 503A compounding.",
        steps: [
          { name: "Complete the 5-minute intake assessment", text: "Answer questions about your health history, goals, and current medications at nexphoria.pplx.app/#/assessment. No clinic visit required." },
          { name: "Draw Quest Diagnostics labs", text: "A 38-biomarker lab requisition is generated in your member portal. Visit any of 2,500+ Quest Diagnostics locations nationwide." },
          { name: "Physician review and telehealth consultation", text: "A board-certified physician reviews your labs and intake within 24\u201348 hours via the Bask Health telehealth platform. Your protocol is prescribed if clinically appropriate." },
          { name: "Compounding and cold-chain delivery", text: "Your peptides are compounded in a U.S. 503A-licensed sterile pharmacy, batch-tested with a Certificate of Analysis, and shipped cold-chain to your door in 3\u20135 business days." },
        ],
      }),
    ],
  });

  return (
    <SiteLayout navVariant="showcase">
      <main id="main-content" style={{ background: "var(--mx-page-bg)" }}>
        <div className="mx-page">
          <MxHeader
            badge={<PillBadge tone="acid">How it works</PillBadge>}
            headline={<>Your protocol <span style={{ color: "color-mix(in oklab, var(--nx-fg) 32%, transparent)" }}>in your hands</span><br/><span>within seven days.</span></>}
            subtitle="Assessment → physician review → 503A compounding pharmacy → discreet delivery. Every step physician-supervised."
          />

          {/* Editorial hero — the first-shipment unboxing, the moment the process pays off */}
          <figure
            className="relative overflow-hidden"
            style={{ borderRadius: "20px", border: "1px solid var(--nx-border)" }}
            data-testid="hiw-hero-editorial"
          >
            <img
              src={heroHowItWorks}
              alt="Hands open a cream protocol kit at a sunlit table, revealing labeled glass vials in a navy velvet interior"
              className="w-full object-cover"
              style={{ aspectRatio: "21 / 9", minHeight: "320px" }}
              loading="eager"
              decoding="async"
            />
            <div
              aria-hidden
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to top, rgba(10,10,10,0.5) 0%, rgba(10,10,10,0.1) 36%, transparent 58%)",
              }}
            />
            <figcaption className="absolute left-0 right-0 bottom-0 p-6 md:p-10">
              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5">
                <p
                  style={{
                    fontFamily: "'General Sans', system-ui, sans-serif",
                    fontSize: "clamp(1.125rem, 2vw, 1.5rem)",
                    fontWeight: 500,
                    lineHeight: 1.35,
                    color: "#FFFFF3",
                    maxWidth: "36ch",
                    textShadow: "0 1px 12px rgba(10,10,10,0.35)",
                  }}
                >
                  From intake to this box in about seven days — each vial batch-tested, each dose physician-set.
                </p>
                <StartIntakeButton source="hiw-hero" size="lg">
                  Start your assessment
                </StartIntakeButton>
              </div>
            </figcaption>
          </figure>
        </div>
      </main>

      {/* ════════════════ 4-STEP PROCESS ════════════════ */}
      <section
        className="py-20 md:py-28"
        style={{ backgroundColor: "var(--nx-bg)", borderBottom: "1px solid var(--nx-border)" }}
        data-testid="how-process"
      >
        <div className="nx-container max-w-screen-xl">
          <Reveal>
            <p style={eyebrow}>{eyebrowRule}Four steps</p>
            <h2 style={{ ...sectionHeading, maxWidth: "640px", marginBottom: "3.5rem" }}>
              From questionnaire to your first dose.
            </h2>
          </Reveal>

          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            {STEPS.map((step, i) => {
              const isEven = i % 2 === 0;
              const Icon = step.icon;
              return (
                <Reveal key={step.num} delay={i * 40}>
                  <div
                    data-testid={`how-step-${step.num}`}
                    className="how-step-panel"
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr",
                      border: "1px solid var(--nx-border)",
                      borderRadius: "6px",
                      overflow: "hidden",
                      backgroundColor: "#FFFFFF",
                    }}
                  >
                    {/* Image */}
                    <div
                      className={isEven ? "how-step-img md:order-first" : "how-step-img md:order-last"}
                      style={{
                        aspectRatio: "16/10",
                        overflow: "hidden",
                        backgroundColor: "var(--nx-bg-cream)",
                      }}
                    >
                      <img
                        src={step.image}
                        alt={step.imageAlt}
                        loading={i === 0 ? "eager" : "lazy"}
                        decoding="async"
                        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                      />
                    </div>

                    {/* Text */}
                    <div
                      style={{
                        padding: "2.5rem 2.25rem",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: "0.875rem", marginBottom: "1rem" }}>
                        <span
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            justifyContent: "center",
                            width: "44px",
                            height: "44px",
                            borderRadius: "50%",
                            border: "1.5px solid var(--nx-cobalt)",
                            color: "var(--nx-cobalt)",
                            flexShrink: 0,
                          }}
                        >
                          <Icon size={20} strokeWidth={1.75} />
                        </span>
                        <span
                          style={{
                            fontFamily: "'General Sans', system-ui, sans-serif",
                            fontWeight: 300,
                            fontSize: "2.5rem",
                            color: "transparent",
                            WebkitTextStroke: "1px var(--nx-cobalt)",
                            lineHeight: 1,
                            letterSpacing: "-0.02em",
                          }}
                          aria-hidden="true"
                        >
                          {step.num}
                        </span>
                      </div>
                      <p style={{ ...monoCaption, color: "var(--nx-cobalt)", marginBottom: "0.75rem" }}>
                        {step.sub}
                      </p>
                      <h3
                        style={{
                          fontFamily: "'General Sans', system-ui, sans-serif",
                          fontWeight: 500,
                          
                          fontSize: "clamp(1.5rem, 3vw, 2rem)",
                          color: "var(--nx-fg)",
                          lineHeight: 1.15,
                          marginBottom: "1rem",
                        }}
                      >
                        {step.title}
                      </h3>
                      <p style={{ ...bodyCopy, fontSize: "1rem", marginBottom: "1.25rem", maxWidth: "520px" }}>
                        {step.detail}
                      </p>
                      <p style={{ ...monoCaption, display: "flex", alignItems: "center", gap: "0.5rem" }}>
                        <span style={{ display: "inline-block", width: "20px", height: "1px", backgroundColor: "var(--nx-fg-muted)" }} />
                        {step.timeline}
                      </p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ════════════════ INSIDE THE INTAKE ════════════════ */}
      <section
        className="py-20 md:py-28"
        style={{ backgroundColor: "var(--nx-bg-cream)", borderBottom: "1px solid var(--nx-border)" }}
        data-testid="how-inside-intake"
      >
        <div className="nx-container max-w-screen-xl">
          <Reveal>
            <p style={eyebrow}>{eyebrowRule}Your intake</p>
            <h2 style={{ ...sectionHeading, maxWidth: "640px", marginBottom: "0.75rem" }}>
              Four questions that shape your protocol.
            </h2>
            <p style={{ ...bodyCopy, maxWidth: "560px", marginBottom: "3rem" }}>
              The intake is structured, not conversational. Every answer feeds the physician's
              review and the algorithmic safety screen that runs before it.
            </p>
          </Reveal>
          <div
            style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1rem" }}
          >
            {INTAKE_TILES.map((tile, i) => (
              <Reveal key={tile.tag} delay={i * 50}>
                <div
                  data-testid={`how-intake-tile-${i}`}
                  style={{
                    border: "1px solid var(--nx-border)",
                    borderRadius: "6px",
                    backgroundColor: "#FFFFFF",
                    padding: "1.5rem",
                    height: "100%",
                    minHeight: "180px",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  {/* mock screen header bar */}
                  <div
                    style={{
                      display: "flex",
                      gap: "5px",
                      marginBottom: "1.25rem",
                    }}
                    aria-hidden="true"
                  >
                    {[0, 1, 2].map((d) => (
                      <span
                        key={d}
                        style={{
                          width: "7px",
                          height: "7px",
                          borderRadius: "50%",
                          backgroundColor: "var(--nx-border)",
                        }}
                      />
                    ))}
                  </div>
                  <p
                    style={{
                      fontFamily: "'General Sans', system-ui, sans-serif",
                      fontSize: "11px",
                      fontWeight: 700,
                      letterSpacing: "0.08em",
                      color: "var(--nx-cobalt)",
                      marginBottom: "0.75rem",
                    }}
                  >
                    {tile.tag}
                  </p>
                  <p
                    style={{
                      fontFamily: "'General Sans', system-ui, sans-serif",
                      
                      fontWeight: 500,
                      fontSize: "1.25rem",
                      color: "var(--nx-fg)",
                      lineHeight: 1.2,
                      marginBottom: "0.5rem",
                    }}
                  >
                    {tile.label}
                  </p>
                  <p style={{ ...bodyCopy, fontSize: "13px", marginTop: "auto" }}>{tile.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════ MEET YOUR DOCTOR ════════════════ */}
      <section
        className="py-20 md:py-28"
        style={{ backgroundColor: "var(--nx-bg)", borderBottom: "1px solid var(--nx-border)" }}
        data-testid="how-meet-doctor"
      >
        <div className="nx-container max-w-screen-xl">
          <Reveal>
            <p style={eyebrow}>{eyebrowRule}Your physician</p>
            <h2 style={{ ...sectionHeading, maxWidth: "640px", marginBottom: "3rem" }}>
              A named physician — not a checkout flow.
            </h2>
          </Reveal>
          <div
            style={{ display: "grid", gridTemplateColumns: "1fr", gap: "1.5rem", alignItems: "stretch" }}
            className="md:grid-cols-2"
          >
            {/* Doctor card */}
            <Reveal>
              <div
                data-testid="how-doctor-card"
                style={{
                  border: "1px solid var(--nx-border)",
                  borderRadius: "6px",
                  overflow: "hidden",
                  backgroundColor: "#FFFFFF",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div style={{ aspectRatio: "3/2", overflow: "hidden", backgroundColor: "var(--nx-bg-cream)" }}>
                  <img
                    src={mdPhoto}
                    alt="Dr. Sarah Chen, board-certified physician"
                    loading="lazy"
                    style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                  />
                </div>
                <div style={{ padding: "1.75rem 1.75rem 2rem" }}>
                  <p style={{ ...monoCaption, color: "var(--nx-cobalt)", marginBottom: "0.75rem" }}>
                    SAMPLE PHYSICIAN PROFILE
                  </p>
                  <h3
                    style={{
                      fontFamily: "'General Sans', system-ui, sans-serif",
                      fontWeight: 500,
                      fontSize: "1.5rem",
                      color: "var(--nx-fg)",
                      marginBottom: "0.25rem",
                    }}
                  >
                    Dr. Sarah Chen, MD
                  </h3>
                  <p style={{ ...monoCaption, marginBottom: "1rem" }}>
                    ABIM BOARD-CERTIFIED · ENDOCRINOLOGY
                  </p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                    {["12 yrs endocrinology", "NYU Langone", "Licensed NY · CA · TX"].map((t) => (
                      <span
                        key={t}
                        style={{
                          fontFamily: "'General Sans', system-ui, sans-serif",
                          fontSize: "10px",
                          fontWeight: 500,
                          letterSpacing: "0.08em",
                          textTransform: "uppercase",
                          color: "var(--nx-fg)",
                          border: "1px solid var(--nx-border)",
                          borderRadius: "100px",
                          padding: "0.375rem 0.75rem",
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Sample message preview */}
            <Reveal delay={80}>
              <div
                data-testid="how-doctor-message"
                style={{
                  border: "1px solid var(--nx-border)",
                  borderRadius: "6px",
                  backgroundColor: "var(--nx-bg-cream)",
                  padding: "1.75rem",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <p style={{ ...monoCaption, color: "var(--nx-cobalt)", marginBottom: "1.25rem" }}>
                  SAMPLE MESSAGE PREVIEW
                </p>
                <div
                  style={{
                    backgroundColor: "#FFFFFF",
                    border: "1px solid var(--nx-border)",
                    borderRadius: "8px",
                    padding: "1.25rem 1.375rem",
                    marginBottom: "1rem",
                  }}
                >
                  <p style={{ ...monoCaption, marginBottom: "0.625rem" }}>DR. CHEN · DAY 2</p>
                  <p style={{ ...bodyCopy, fontSize: "0.9375rem", lineHeight: 1.65 }}>
                    "I've reviewed your panel. Your IGF-1 sits at the low end of range and your
                    fasting glucose is normal, so I'm comfortable starting a GH-secretagogue
                    protocol at a conservative dose. We'll redraw at 90 days and titrate from there.
                    A few questions before I finalize —"
                  </p>
                </div>
                <div
                  style={{
                    backgroundColor: "var(--nx-fg)",
                    borderRadius: "8px",
                    padding: "1rem 1.25rem",
                    marginLeft: "auto",
                    maxWidth: "78%",
                  }}
                >
                  <p style={{ ...monoCaption, color: "rgba(255,255,255,0.55)", marginBottom: "0.5rem" }}>
                    YOU · DAY 2
                  </p>
                  <p
                    style={{
                      fontFamily: "'General Sans', system-ui, sans-serif",
                      fontSize: "0.9375rem",
                      color: "var(--nx-bg-cream)",
                      lineHeight: 1.55,
                    }}
                  >
                    "Sounds good. Ask away."
                  </p>
                </div>
                <p style={{ ...monoCaption, marginTop: "auto", paddingTop: "1.5rem" }}>
                  Asynchronous messaging — no scheduled calls required.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ════════════════ INSIDE THE PHARMACY ════════════════ */}
      <section
        className="py-20 md:py-28"
        style={{ backgroundColor: "var(--nx-bg-cream)", borderBottom: "1px solid var(--nx-border)" }}
        data-testid="how-inside-pharmacy"
      >
        <div className="nx-container max-w-screen-xl">
          <Reveal>
            <p style={eyebrow}>{eyebrowRule}The pharmacy</p>
            <h2 style={{ ...sectionHeading, maxWidth: "640px", marginBottom: "0.75rem" }}>
              Sterile-compounded to 0.0001g accuracy.
            </h2>
            <p style={{ ...bodyCopy, maxWidth: "560px", marginBottom: "3rem" }}>
              Every compound is sterile-prepared, batch-tested for identity, potency, and sterility,
              then packed for cold-chain transit. Here is what that looks like.
            </p>
          </Reveal>
          <div
            style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1rem" }}
            data-testid="how-pharmacy-grid"
          >
            {PHARMACY_GRID.map((cell, i) => (
              <Reveal key={cell.caption} delay={i * 50}>
                <figure
                  style={{
                    border: "1px solid var(--nx-border)",
                    borderRadius: "6px",
                    overflow: "hidden",
                    backgroundColor: "#FFFFFF",
                    margin: 0,
                  }}
                >
                  <div style={{ aspectRatio: "4/3", overflow: "hidden", backgroundColor: "var(--nx-bg-cream)" }}>
                    <img
                      src={cell.img}
                      alt={cell.caption.toLowerCase()}
                      loading="lazy"
                      style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                    />
                  </div>
                  <figcaption style={{ padding: "0.875rem 1.125rem" }}>
                    <p style={{ ...monoCaption, color: "var(--nx-fg)" }}>{cell.caption}</p>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════ SHIPPING & DELIVERY ════════════════ */}
      <section
        className="py-20 md:py-28"
        style={{ backgroundColor: "var(--nx-bg)", borderBottom: "1px solid var(--nx-border)" }}
        data-testid="how-shipping"
      >
        <div className="nx-container max-w-screen-xl">
          <Reveal>
            <p style={eyebrow}>{eyebrowRule}Cold-chain delivery</p>
            <h2 style={{ ...sectionHeading, maxWidth: "640px", marginBottom: "3rem" }}>
              2°C to 8°C, from cleanroom to your door.
            </h2>
          </Reveal>

          {/* Cold-chain route map */}
          <Reveal>
            <div
              data-testid="how-shipping-route"
              style={{
                border: "1px solid var(--nx-border)",
                borderRadius: "6px",
                backgroundColor: "var(--nx-bg-cream)",
                padding: "2.25rem 2rem",
                marginBottom: "1.5rem",
              }}
            >
              <div
                className="route-line"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "0.5rem",
                  flexWrap: "wrap",
                }}
              >
                {[
                  { node: "Pharmacy", sub: "503A cleanroom" },
                  { node: "Pack-out", sub: "Insulated + logger" },
                  { node: "Carrier", sub: "2-day refrigerated" },
                  { node: "Your door", sub: "Signature required" },
                ].map((s, i, arr) => (
                  <div key={s.node} style={{ display: "flex", alignItems: "center", gap: "0.5rem", flex: 1, minWidth: "120px" }}>
                    <div style={{ textAlign: "center", flex: 1 }}>
                      <span
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                          width: "12px",
                          height: "12px",
                          borderRadius: "50%",
                          backgroundColor: "var(--nx-cobalt)",
                          marginBottom: "0.625rem",
                        }}
                      />
                      <p
                        style={{
                          fontFamily: "'General Sans', system-ui, sans-serif",
                          
                          fontWeight: 500,
                          fontSize: "1.125rem",
                          color: "var(--nx-fg)",
                          marginBottom: "0.25rem",
                        }}
                      >
                        {s.node}
                      </p>
                      <p style={{ ...monoCaption, fontSize: "10px" }}>{s.sub}</p>
                    </div>
                    {i < arr.length - 1 && (
                      <ChevronRight size={16} style={{ color: "var(--nx-fg-muted)", flexShrink: 0 }} />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Shipping tiles */}
          <div
            style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1rem" }}
          >
            {SHIPPING_TILES.map((tile, i) => {
              const Icon = tile.icon;
              return (
                <Reveal key={tile.label} delay={i * 50}>
                  <div
                    data-testid={`how-shipping-tile-${i}`}
                    style={{
                      border: "1px solid var(--nx-border)",
                      borderRadius: "6px",
                      backgroundColor: "#FFFFFF",
                      padding: "1.5rem",
                      height: "100%",
                    }}
                  >
                    <Icon size={22} strokeWidth={1.75} style={{ color: "var(--nx-cobalt)", marginBottom: "1rem" }} />
                    <p
                      style={{
                        fontFamily: "'General Sans', system-ui, sans-serif",
                        
                        fontWeight: 500,
                        fontSize: "1.25rem",
                        color: "var(--nx-fg)",
                        marginBottom: "0.5rem",
                      }}
                    >
                      {tile.label}
                    </p>
                    <p style={{ ...bodyCopy, fontSize: "13px" }}>{tile.desc}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ════════════════ ONGOING CARE ════════════════ */}
      <section
        className="py-20 md:py-28"
        style={{ backgroundColor: "var(--nx-bg-cream)", borderBottom: "1px solid var(--nx-border)" }}
        data-testid="how-ongoing-care"
      >
        <div className="nx-container max-w-screen-xl">
          <Reveal>
            <p style={eyebrow}>{eyebrowRule}Ongoing care</p>
            <h2 style={{ ...sectionHeading, maxWidth: "640px", marginBottom: "0.75rem" }}>
              Monitoring is the standard, not the upsell.
            </h2>
            <p style={{ ...bodyCopy, maxWidth: "600px", marginBottom: "3rem" }}>
              A protocol is a starting hypothesis. What makes it clinical is the loop that follows —
              measure, review, adjust, repeat. Every active protocol includes this at no extra charge.
            </p>
          </Reveal>
          <div
            style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1rem" }}
          >
            {[
              {
                icon: CalendarClock,
                title: "Quarterly check-ins",
                desc: "Your physician reviews your file every 90 days and after each lab draw. Asynchronous through your portal — no scheduled video calls required.",
              },
              {
                icon: Activity,
                title: "Dose adjustments",
                desc: "Dose and cadence are tuned from measured biomarker change, not subjective symptom report. If a marker drifts out of range, the protocol changes.",
              },
              {
                icon: FlaskConical,
                title: "Lab recalibration",
                desc: "Quest labs are rerun every quarter and benchmarked against your own baseline — not a population average. The data, not the marketing, drives the next step.",
              },
            ].map((c, i) => {
              const Icon = c.icon;
              return (
                <Reveal key={c.title} delay={i * 60}>
                  <div
                    data-testid={`how-care-tile-${i}`}
                    style={{
                      border: "1px solid var(--nx-border)",
                      borderRadius: "6px",
                      backgroundColor: "#FFFFFF",
                      padding: "2rem 1.75rem",
                      height: "100%",
                    }}
                  >
                    <span
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "44px",
                        height: "44px",
                        borderRadius: "50%",
                        border: "1.5px solid var(--nx-cobalt)",
                        color: "var(--nx-cobalt)",
                        marginBottom: "1.25rem",
                      }}
                    >
                      <Icon size={20} strokeWidth={1.75} />
                    </span>
                    <h3
                      style={{
                        fontFamily: "'General Sans', system-ui, sans-serif",
                        
                        fontWeight: 500,
                        fontSize: "1.375rem",
                        color: "var(--nx-fg)",
                        marginBottom: "0.75rem",
                      }}
                    >
                      {c.title}
                    </h3>
                    <p style={{ ...bodyCopy, fontSize: "0.9375rem" }}>{c.desc}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ════════════════ COMPARE US ════════════════ */}
      <section
        className="py-20 md:py-28"
        style={{ backgroundColor: "var(--nx-bg)", borderBottom: "1px solid var(--nx-border)" }}
        data-testid="how-compare"
      >
        <div className="nx-container max-w-screen-xl">
          <Reveal>
            <p style={eyebrow}>{eyebrowRule}How we compare</p>
            <h2 style={{ ...sectionHeading, maxWidth: "640px", marginBottom: "0.75rem" }}>
              Bloodwork and physician review. Most platforms skip one.
            </h2>
            <p style={{ ...bodyCopy, maxWidth: "560px", marginBottom: "3rem" }}>
              Most telehealth platforms skip the labs. Most clinics skip the follow-up.
              We built the model that does both — at telehealth speed.
            </p>
          </Reveal>
          <Reveal>
            <div style={{ width: "100%", overflowX: "auto" }}>
              <table
                style={{
                  width: "100%",
                  minWidth: 680,
                  borderCollapse: "separate",
                  borderSpacing: 0,
                  border: "1px solid var(--nx-border)",
                  borderRadius: 6,
                  overflow: "hidden",
                  fontFamily: "'General Sans', system-ui, sans-serif",
                  fontSize: 14,
                }}
                data-testid="how-compare-table"
              >
                <thead>
                  <tr style={{ backgroundColor: "var(--nx-bg-cream)" }}>
                    {["", "Nexphoria", "Typical Telehealth", "Clinic Visit"].map((h, i) => (
                      <th
                        key={i}
                        style={{
                          textAlign: i === 0 ? "left" : "center",
                          padding: "14px 18px",
                          fontFamily: "'General Sans', system-ui, sans-serif",
                          fontSize: 10,
                          fontWeight: 500,
                          letterSpacing: "0.12em",
                          textTransform: "uppercase",
                          color: i === 1 ? "var(--nx-cobalt)" : "var(--nx-fg-muted)",
                          borderBottom: "1px solid var(--nx-border)",
                          borderRight: i < 3 ? "1px solid var(--nx-border)" : "none",
                          backgroundColor: i === 1 ? "var(--nx-cobalt-soft)" : "var(--nx-bg-cream)",
                        }}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    { feature: "Baseline bloodwork required", nexphoria: "38-marker Quest panel", telehealth: "Optional or none", clinic: "Yes, in-office" },
                    { feature: "Physician review", nexphoria: "Board-certified MD, 24–48h", telehealth: "Often NP/PA, async", clinic: "In-person, weeks wait" },
                    { feature: "503A compounding pharmacy", nexphoria: "USP <797>, batch-tested", telehealth: "Varies (some offshore)", clinic: "Referral only" },
                    { feature: "Cold-chain shipping", nexphoria: "2°C–8°C, temp-logged", telehealth: "Rarely", clinic: "In-office dispensing" },
                    { feature: "Quarterly monitoring", nexphoria: "Included, every protocol", telehealth: "Add-on cost", clinic: "Separate appointment" },
                    { feature: "Dose adjustment from labs", nexphoria: "Automatic, no surcharge", telehealth: "Manual, often delayed", clinic: "At follow-up visit" },
                    { feature: "Time to first protocol", nexphoria: "5–7 business days", telehealth: "1–3 days (no labs)", clinic: "4–8 weeks" },
                  ].map((row, i) => (
                    <tr key={row.feature} style={{ backgroundColor: i % 2 === 0 ? "var(--nx-bg)" : "var(--nx-bg-cream)" }}>
                      <td style={{ padding: "14px 18px", fontFamily: "'General Sans', system-ui, sans-serif", fontSize: 13, color: "var(--nx-fg)", fontWeight: 500, borderBottom: "1px solid var(--nx-border)", borderRight: "1px solid var(--nx-border)" }}>
                        {row.feature}
                      </td>
                      <td style={{ padding: "14px 18px", textAlign: "center", fontSize: 13, color: "var(--nx-cobalt)", fontWeight: 600, borderBottom: "1px solid var(--nx-border)", borderRight: "1px solid var(--nx-border)", backgroundColor: "var(--nx-cobalt-soft)" }}>
                        {row.nexphoria}
                      </td>
                      <td style={{ padding: "14px 18px", textAlign: "center", fontSize: 13, color: "#6B6B6B", borderBottom: "1px solid var(--nx-border)", borderRight: "1px solid var(--nx-border)" }}>
                        {row.telehealth}
                      </td>
                      <td style={{ padding: "14px 18px", textAlign: "center", fontSize: 13, color: "#6B6B6B", borderBottom: "1px solid var(--nx-border)" }}>
                        {row.clinic}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ════════════════ WHO WE SERVE ════════════════ */}
      <section
        className="py-20 md:py-28"
        style={{ backgroundColor: "var(--nx-bg-cream)", borderBottom: "1px solid var(--nx-border)" }}
        data-testid="how-who-we-serve"
      >
        <div className="nx-container max-w-screen-xl">
          <Reveal>
            <p style={eyebrow}>{eyebrowRule}Who this is for</p>
            <h2 style={{ ...sectionHeading, maxWidth: "640px", marginBottom: "3rem" }}>
              We are not for everyone. That is not an apology.
            </h2>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "1.5rem" }} className="md:grid-cols-2">
            <Reveal>
              <div
                data-testid="how-we-serve-yes"
                style={{
                  border: "1px solid var(--nx-border)",
                  borderRadius: 6,
                  backgroundColor: "#FFFFFF",
                  padding: "2rem 1.75rem",
                  height: "100%",
                }}
              >
                <p style={{ ...monoCaption, color: "var(--nx-cobalt)", marginBottom: "1.25rem" }}>WHO WE SERVE</p>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.875rem" }}>
                  {[
                    "You want data — bloodwork, not testimonials — to drive every decision.",
                    "You understand that a 12-minute intake and physician review is the beginning of a relationship, not a transaction.",
                    "You are prepared to run labs. No labs, no protocol — that is the rule.",
                    "You want a named physician reviewing your file, not an algorithm approving your cart.",
                    "You are committed to the protocol: inject on schedule, respond to physician messages, return for follow-up labs.",
                    "You are comfortable with the honest reality that some peptides are investigational and outcomes vary.",
                  ].map((item, i) => (
                    <li key={i} style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
                      <span style={{ display: "inline-block", width: 8, height: 8, borderRadius: "50%", backgroundColor: "var(--nx-cobalt)", flexShrink: 0, marginTop: 7 }} />
                      <p style={{ ...bodyCopy, fontSize: "0.9375rem", margin: 0 }}>{item}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
            <Reveal delay={80}>
              <div
                data-testid="how-we-serve-no"
                style={{
                  border: "1px solid var(--nx-border)",
                  borderRadius: 6,
                  backgroundColor: "var(--nx-bg-cream)",
                  padding: "2rem 1.75rem",
                  height: "100%",
                }}
              >
                <p style={{ ...monoCaption, color: "#8B5A2B", marginBottom: "1.25rem" }}>WHO WE ARE NOT FOR</p>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.875rem" }}>
                  {[
                    "Patients who want to self-prescribe based on influencer content.",
                    "Anyone unwilling to complete baseline bloodwork before starting.",
                    "Those seeking a protocol physician review will not support.",
                    "Patients who want to buy research-grade powder and reconstitute at home.",
                    "Anyone looking for a quick fix with no physician oversight or follow-up.",
                  ].map((item, i) => (
                    <li key={i} style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
                      <span style={{ display: "inline-block", width: 8, height: 2, backgroundColor: "#8B5A2B", flexShrink: 0, marginTop: 10 }} />
                      <p style={{ ...bodyCopy, fontSize: "0.9375rem", margin: 0, color: "#6B6B6B" }}>{item}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ════════════════ FAQ ════════════════ */}
      <FAQAccordion items={HOW_FAQS} title="How it works — your questions." showCategories />

      {/* ════════════════ CTA ════════════════ */}
      <section style={{ backgroundColor: "var(--nx-cobalt)", padding: "5rem 0" }} data-testid="how-cta">
        <div className="nx-container max-w-screen-xl text-center">
          <Reveal>
            <p
              style={{
                fontFamily: "'General Sans', system-ui, sans-serif",
                fontSize: "10px",
                fontWeight: 500,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.6)",
                marginBottom: "1rem",
              }}
            >
              Start today
            </p>
            <h2
              style={{
                fontFamily: "'General Sans', system-ui, sans-serif",
                fontWeight: 500,
                fontSize: "clamp(2rem, 4vw, 3.5rem)",
                color: "#FFFFFF",
                lineHeight: 1.1,
                marginBottom: "0.25rem",
              }}
            >
              Twelve minutes now. Your protocol in seven days.
            </h2>
            <h2
              style={{
                fontFamily: "'General Sans', system-ui, sans-serif",
                fontWeight: 500,
                
                fontSize: "clamp(2rem, 4vw, 3.5rem)",
                color: "#FFFFFF",
                lineHeight: 1.1,
                marginBottom: "1.25rem",
              }}
            >
              The physician review takes 24–48 hours.
            </h2>
            <p
              style={{
                fontFamily: "'General Sans', system-ui, sans-serif",
                fontSize: "1.0625rem",
                color: "rgba(255,255,255,0.75)",
                lineHeight: 1.6,
                maxWidth: "480px",
                margin: "0 auto 2.5rem",
              }}
            >
              Quest Diagnostics labs included with every protocol. No contracts. Physician review at
              no additional charge.
            </p>
            <StartIntakeButton productSlug="how-it-works-cta" source="how-it-works" size="xl">
              Start your intake
            </StartIntakeButton>
          </Reveal>
        </div>
      </section>

      <style>{`
        @media (min-width: 768px) {
          .how-step-panel { grid-template-columns: 1fr 1fr !important; }
          .how-step-img { aspect-ratio: auto !important; }
          .how-kpi-strip-grid { grid-template-columns: repeat(4, 1fr) !important; }
          .how-kpi-strip-grid .kpi-cell { border-top: none !important; }
          .how-kpi-strip-grid .kpi-cell-0 { border-left: none !important; }
          .how-kpi-strip-grid .kpi-cell-1,
          .how-kpi-strip-grid .kpi-cell-2,
          .how-kpi-strip-grid .kpi-cell-3 { border-left: 1px solid var(--nx-border) !important; }
        }
      `}</style>
    </SiteLayout>
  );
}
