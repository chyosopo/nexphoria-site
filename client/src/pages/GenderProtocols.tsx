/**
 * /women/protocols and /men/protocols
 */
import { Link } from "wouter";
import { SiteLayout } from "@/components/SiteLayout";
import { FinalCTAStrip } from "@/components/FinalCTAStrip";
import { StartIntakeButton } from "@/components/StartIntakeButton";
import { Reveal } from "@/components/Reveal";
import { useSeo } from "@/lib/seo";

interface Protocol {
  slug: string;
  name: string;
  tagline: string;
  price: string;
  peptides: string;
  duration: string;
  goal: string;
  kpis: string[];
}

const womenProtocols: Protocol[] = [
  {
    slug: "weight-loss",
    name: "Weight Loss Protocol",
    tagline: "Lose weight. Hold the muscle.",
    price: "From $249/mo",
    peptides: "Tirzepatide · Semaglutide",
    duration: "12–24 weeks",
    goal: "Sustainable fat loss with physician oversight",
    kpis: ["Body fat -18–28%", "Waist -3–5 in", "A1C reduction"],
  },
  {
    slug: "skin",
    name: "Skin & Recovery Protocol",
    tagline: "Repair skin, joints, gut.",
    price: "From $199/mo",
    peptides: "GHK-Cu · BPC-157 · TB-500",
    duration: "8–16 weeks",
    goal: "Collagen induction, joint repair, inflammation",
    kpis: ["Skin elasticity +34%", "Wound healing +47%", "Inflammation -38%"],
  },
  {
    slug: "longevity",
    name: "Longevity Protocol",
    tagline: "Live longer. Feel younger.",
    price: "From $299/mo",
    peptides: "NAD+ · MOTS-c · Epitalon",
    duration: "16–24 weeks",
    goal: "Biological age reduction, mitochondrial health",
    kpis: ["Bio age -3.2 yrs", "Deep sleep +28%", "Mitochondrial +22%"],
  },
  {
    slug: "hormones",
    name: "Hormonal Balance Protocol",
    tagline: "Calibrate your cycle.",
    price: "From $229/mo",
    peptides: "Kisspeptin · Selank",
    duration: "12 weeks",
    goal: "Hormonal stability, mood, energy",
    kpis: ["Estradiol optimization", "Mood stability", "Cycle regularity"],
  },
  {
    slug: "hair",
    name: "Hair Protocol",
    tagline: "Restore density. Slow loss.",
    price: "From $179/mo",
    peptides: "GHK-Cu · Sermorelin",
    duration: "16–20 weeks",
    goal: "Follicle density, hair cycle",
    kpis: ["Follicle density +34%", "Hair retention", "Growth activation"],
  },
];

const menProtocols: Protocol[] = [
  {
    slug: "performance",
    name: "Performance & Growth Hormone",
    tagline: "Perform. Recover. Repeat.",
    price: "From $299/mo",
    peptides: "CJC-1295 · Ipamorelin · Tesamorelin",
    duration: "12–20 weeks",
    goal: "IGF-1 elevation, lean mass, VO2 max",
    kpis: ["Lean mass +11.3 lb", "VO2 max +19%", "IGF-1 +47%"],
  },
  {
    slug: "testosterone",
    name: "Testosterone Protocol",
    tagline: "Optimize testosterone. Keep fertility.",
    price: "From $249/mo",
    peptides: "Enclomiphene · Kisspeptin",
    duration: "12–16 weeks",
    goal: "Endogenous testosterone, without suppression",
    kpis: ["Total T +210%", "Libido 8.4/10", "Mood 7.8/10"],
  },
  {
    slug: "weight-loss",
    name: "Weight Loss Protocol",
    tagline: "Lose weight. Hold the muscle.",
    price: "From $249/mo",
    peptides: "Tirzepatide · Semaglutide",
    duration: "12–24 weeks",
    goal: "Body composition, metabolic health",
    kpis: ["Body fat -18%", "Waist -4.3 in", "A1C -1.2 pts"],
  },
  {
    slug: "longevity",
    name: "Longevity Protocol",
    tagline: "Live longer. Feel younger.",
    price: "From $299/mo",
    peptides: "NAD+ · MOTS-c · Epitalon",
    duration: "16–24 weeks",
    goal: "Biological age, mitochondrial health",
    kpis: ["Bio age -3.2 yrs", "Deep sleep +28%", "Energy +22%"],
  },
  {
    slug: "recovery",
    name: "Recovery Protocol",
    tagline: "Repair faster. Train harder.",
    price: "From $199/mo",
    peptides: "BPC-157 · TB-500 · GHK-Cu",
    duration: "8–12 weeks",
    goal: "Tendon, joint, and gut repair",
    kpis: ["Inflammation -38%", "Recovery score +47%", "Injury healing"],
  },
];

interface GenderProtocolsProps {
  gender: "women" | "men";
}

export default function GenderProtocols({ gender }: GenderProtocolsProps) {
  useSeo({
    title: "Protocols | Nexphoria",
    description: "Multi-peptide stacks designed for specific clinical outcomes.",
    path: `/${gender}/protocols`,
  });
  const protocols = gender === "women" ? womenProtocols : menProtocols;
  const eyebrow = gender === "women" ? "NEXPHORIA · FOR WOMEN" : "NEXPHORIA · FOR MEN";
  const heading = gender === "women" ? "Protocols for women." : "Protocols for men.";
  const sub =
    gender === "women"
      ? "Doctor-prescribed, 503A-compounded stacks for the female body. Blood-tested. Tailored to your labs."
      : "Doctor-prescribed, 503A-compounded stacks for the male body. Blood-tested. Tailored to your labs.";

  return (
    <SiteLayout navVariant={gender} footerVariant={gender}>
      {/* Header */}
      <section className="py-16" style={{ backgroundColor: "var(--nx-bg-cream)", borderBottom: "1px solid var(--nx-border)" }}>
        <div className="nx-container">
          <Reveal>
            <p className="nx-eyebrow mb-4">{eyebrow}</p>
            <h1 className="nx-heading mb-3" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>{heading}</h1>
            <p className="nx-body" style={{ maxWidth: "520px" }}>{sub}</p>
          </Reveal>
        </div>
      </section>

      {/* Protocol grid */}
      <section className="nx-section" data-testid={`${gender}-protocols-grid`}>
        <div className="nx-container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {protocols.map((protocol, i) => (
              <Reveal key={protocol.slug} delay={i * 70}>
                <div
                  className="p-6 rounded-2xl flex flex-col gap-4 h-full"
                  style={{ border: "1px solid var(--nx-border)", backgroundColor: "#FFFFFF" }}
                  data-testid={`protocol-card-${protocol.slug}`}
                >
                  <div>
                    <p style={{ fontFamily: "'General Sans', system-ui, sans-serif", fontSize: "9px", fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--nx-cobalt)", marginBottom: "6px" }}>
                      {protocol.peptides}
                    </p>
                    <h2 style={{ fontFamily: "'General Sans', system-ui, sans-serif", fontSize: "1.5rem", fontWeight: 500, color: "var(--nx-fg)", lineHeight: 1.2, marginBottom: "4px" }}>
                      {protocol.name}
                    </h2>
                    <p style={{ fontFamily: "'General Sans', system-ui, sans-serif",  fontSize: "1rem", color: "var(--nx-fg-graphite)" }}>
                      {protocol.tagline}
                    </p>
                  </div>

                  <p style={{ fontFamily: "'General Sans', system-ui, sans-serif", fontSize: "14px", color: "var(--nx-fg-graphite)", lineHeight: 1.6 }}>
                    {protocol.goal}
                  </p>

                  {/* KPIs */}
                  <div className="flex flex-col gap-1">
                    {protocol.kpis.map((kpi) => (
                      <div key={kpi} className="flex items-center gap-2">
                        <div className="w-1 h-1 rounded-full flex-shrink-0" style={{ backgroundColor: "var(--nx-cobalt)" }} />
                        <p style={{ fontFamily: "'General Sans', system-ui, sans-serif", fontSize: "10px", fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--nx-fg-graphite)" }}>
                          {kpi}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-auto pt-4 flex items-center justify-between border-t" style={{ borderColor: "var(--nx-border)" }}>
                    <p style={{ fontFamily: "'General Sans', system-ui, sans-serif", fontSize: "16px", fontWeight: 600, color: "var(--nx-fg)", fontVariantNumeric: "tabular-nums" }}>
                      {protocol.price}
                    </p>
                    <StartIntakeButton productSlug={protocol.slug} source={`${gender}-protocols`} size="sm">
                      Start intake
                    </StartIntakeButton>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <FinalCTAStrip gender={gender} />
    </SiteLayout>
  );
}
