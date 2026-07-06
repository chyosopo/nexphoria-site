/* JOB: consult-scheduling side door; reached from contact and footer only. */
/* ═══ BOOKING — physician consultation scheduling ═══
   The intake (/assessment) remains the canonical funnel entrance; this page
   serves visitors who arrive holding a consult link. External scheduler
   links are plain <a> tags (wouter Link would SPA-route them into the 404).
   Tokens only; bank voice. */
import { Link } from "wouter";
import { CalendarClock, ArrowRight } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { Reveal } from "@/components/Reveal";
import { useSeo, webPageJsonLd, breadcrumbJsonLd } from "@/lib/seo";
import { F, S } from "@/lib/typography";

export default function Booking() {
  useSeo({
    title: "Book a consultation — Nexphoria",
    description:
      "Schedule a consultation to discuss your goals and bloodwork with the medical team. Physician review decides every protocol.",
    jsonLd: [
      webPageJsonLd({ name: "Book a consultation", description: "Schedule a Nexphoria consultation.", path: "/booking" }),
      breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Booking", path: "/booking" }]),
    ],
  });
  return (
    <SiteLayout navVariant="showcase">
      <section className="relative" style={{ overflow: "hidden" }}>
        <div className="nx-aurora" aria-hidden><i /><i /><i /></div>
        <div className="nx-container relative" style={{ paddingTop: "clamp(3.5rem,7vw,6rem)", paddingBottom: "clamp(3.5rem,7vw,6rem)", zIndex: 1, maxWidth: 780 }}>
          <Reveal>
            <p style={{ fontFamily: F, fontSize: 11, fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--nx-cobalt)", display: "inline-flex", alignItems: "center", gap: 8 }}>
              <CalendarClock size={14} strokeWidth={2} aria-hidden /> Consultation
            </p>
            <h1 style={{ fontFamily: S, fontWeight: 500, fontSize: "clamp(34px,5vw,54px)", lineHeight: 1.06, letterSpacing: "-0.015em", color: "var(--nx-fg)", marginTop: "0.8rem", maxWidth: "18ch" }}>
              Schedule a consultation.
            </h1>
            <p style={{ fontFamily: F, fontSize: "var(--nx-t-body)", lineHeight: 1.65, color: "var(--nx-fg-graphite)", maxWidth: "56ch", marginTop: "1rem" }}>
              A conversation about your goals, your history, and your bloodwork — with the
              medical team that reads them. A consultation informs your protocol; a licensed
              physician decides it.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: "1.8rem" }}>
              <a
                href="https://calendly.com/chiya/consult"
                target="_blank"
                rel="noopener noreferrer"
                className="nx-cta-cobalt"
                style={{ fontSize: "var(--nx-t-base)", padding: "14px 26px" }}
                data-testid="booking-calendly"
              >
                Book a time <ArrowRight size={16} strokeWidth={2.2} aria-hidden />
              </a>
              <Link
                href="/assessment"
                className="nx-cta-ghost"
                style={{ fontSize: "var(--nx-t-base)", padding: "14px 26px" }}
                data-testid="booking-intake"
              >
                Or begin your intake first
              </Link>
            </div>
            <p style={{ fontFamily: F, fontSize: "var(--nx-t-xs)", lineHeight: 1.6, color: "var(--nx-fg-muted)", marginTop: "1.2rem", maxWidth: "56ch" }}>
              Consultations do not guarantee a prescription. Physician review of your intake
              and baseline bloodwork decides whether a protocol is appropriate.
            </p>
          </Reveal>
        </div>
      </section>
    </SiteLayout>
  );
}
