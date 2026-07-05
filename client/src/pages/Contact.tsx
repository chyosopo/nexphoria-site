import { useState } from "react";
import { F } from "@/lib/typography";
import { SiteLayout } from "@/components/SiteLayout";
import { Reveal } from "@/components/Reveal";
import { TrustStrip } from "@/components/EnterprisePatterns";
import { useSeo, webPageJsonLd, breadcrumbJsonLd } from "@/lib/seo";
import { MxHeader, ColoredHeroTile, TileGlyphs } from "@/components/SignatureTile";
import { PillBadge } from "@/components/PillBadge";
import { MessageSquare, Stethoscope, Newspaper, MapPin, Lock, ShieldCheck, Clock, type LucideIcon } from "lucide-react";
import contactCareTeam from "@/assets/brand/contact-care-team.webp";

const contactColumns: {
  eyebrow: string; title: string; Icon: LucideIcon;
  items: { label: string; value: string }[]; note: string;
}[] = [
  {
    eyebrow: "PATIENT SUPPORT",
    title: "Clinical and order questions.",
    Icon: MessageSquare,
    items: [
      { label: "EMAIL", value: "hello@nexphoria.com" },
      { label: "HOURS", value: "Mon–Fri, 9am–6pm ET" },
      { label: "RESPONSE", value: "On business days" },
    ],
    note: "For billing, shipping, order status, and portal access questions.",
  },
  {
    eyebrow: "MEDICAL QUESTIONS",
    title: "Physician portal messaging.",
    Icon: Stethoscope,
    items: [
      { label: "CHANNEL", value: "Secure member portal" },
      { label: "RESPONSE", value: "Reviewed by a physician" },
      { label: "URGENT CARE", value: "Call 911 for medical emergencies" },
    ],
    note: "For questions about your labs, prescription, or protocol adjustments. Use the secure portal — not email — for clinical questions.",
  },
  {
    eyebrow: "PRESS & PARTNERSHIPS",
    title: "Media and business inquiries.",
    Icon: Newspaper,
    items: [
      { label: "EMAIL", value: "press@nexphoria.com" },
      { label: "MAILING ADDRESS", value: "Nexphoria Health, LLC\n800 Third Ave, Suite 1000\nNew York, NY 10022" },
      { label: "PHARMACY LICENSE", value: "Available on request — verified 503A facility" },
    ],
    note: "Media inquiries, research collaborations, and pharmacy partnership discussions.",
  },
];

const reasons = [
  "Select a reason",
  "General inquiry",
  "Clinical / medical question",
  "Order status or shipping",
  "Billing or account",
  "Press or media",
  "Partnership or wholesale",
  "Other",
];

export default function Contact() {
  useSeo({
    title: "Contact Nexphoria — physician questions, protocol support",
    description: "Questions about peptide therapy, your protocol, or how to get started? We answer every message promptly, Monday to Friday. Physician-guided support from a real team.",
    path: "/contact",
    jsonLd: [webPageJsonLd({
      name: "Contact Nexphoria",
      description: "Reach the Nexphoria team for questions about peptide therapy, protocols, or getting started. Response on business days, Mon–Fri.",
      path: "/contact",
    }),
    breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Contact", path: "/contact" }]),
    ],
  });
  const [form, setForm] = useState({ name: "", email: "", phone: "", state: "", reason: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.name && form.email && form.message && form.reason !== reasons[0]) {
      setError("");
      setSubmitted(true);
    } else {
      setError("Please complete your name, email, reason, and message before sending.");
    }
  };

  const labelStyle: React.CSSProperties = {
    fontFamily: F,
    fontSize: "var(--nx-t-xs)",
    fontWeight: 700,
    letterSpacing: "0.14em",
    textTransform: "uppercase" as const,
    color: "var(--nx-fg-muted)",
    display: "block",
    marginBottom: "0.4rem",
  };

  return (
    <SiteLayout navVariant="showcase">
      <main id="main-content" style={{ background: "var(--mx-page-bg)" }}>
        <div className="mx-page">
          <MxHeader
            badge={<PillBadge tone="acid">Get in touch</PillBadge>}
            headline={
              <>
                <span style={{ color: "color-mix(in oklab, var(--nx-fg) 32%, transparent)" }}>Questions?</span><br />
                <span>We're listening.</span>
              </>
            }
            subtitle="Patient support, physician escalation, partnership inquiries, or press. Pick the right door and we'll route you to the right person."
          />

          <div className="mx-grid">
            <ColoredHeroTile
              href="mailto:hello@nexphoria.com"
              tone="sky"
              glyph={TileGlyphs.circle}
              label={<>Patient support<br /><span>Mon–Fri, 9–6 ET</span></>}
              caption="Replies on business days"
              ctaLabel="Message us"
            />
            <ColoredHeroTile
              href="mailto:press@nexphoria.com"
              tone="sage"
              glyph={TileGlyphs.wave}
              label={<>Press & partners<br /><span>media kit</span></>}
              caption="Average reply: 2hrs"
              ctaLabel="Message us"
            />
          </div>
        </div>
      </main>

      {/* ── Trust badge strip — calm quiet credential row (TRUE claims only) ── */}
      <section className="nx-container max-w-screen-xl" style={{ paddingTop: "clamp(2rem,3.4vw,2.8rem)", paddingBottom: "clamp(2rem,3.4vw,2.8rem)" }}>
        <Reveal>
          <TrustStrip testid="contact-trust-strip" />
        </Reveal>
      </section>

      {/* ── Three support columns ── */}
      <section
        className="py-24 md:py-32"
        style={{ backgroundColor: "var(--nx-bg-cream)", borderTop: "1px solid var(--nx-border)" }}
      >
        <div className="nx-container max-w-screen-xl">
          <div
            role="list"
            aria-label="Ways to reach us"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: "1.5px",
              backgroundColor: "var(--nx-border)",
              border: "1.5px solid var(--nx-border)",
            }}
          >
            {contactColumns.map((col, i) => (
              <Reveal key={col.eyebrow} delay={i * 80}>
                <div
                  role="listitem"
                  style={{
                    backgroundColor: "var(--nx-ceramic)",
                    padding: "2.85rem 2.25rem",
                    height: "100%",
                    borderTop: "2px solid var(--nx-cobalt)",
                  }}
                >
                  <span className="nx-icon-circle" aria-hidden style={{ marginBottom: "1.1rem" }}>
                    <col.Icon size={20} strokeWidth={1.9} />
                  </span>
                  <p
                    style={{
                      fontFamily: F,
                      fontSize: "10px",
                      fontWeight: 700,
                      letterSpacing: "0.16em",
                      textTransform: "uppercase",
                      color: "var(--nx-cobalt)",
                      marginBottom: "0.875rem",
                    }}
                  >
                    {col.eyebrow}
                  </p>
                  <h2
                    style={{
                      fontFamily: F,
                      fontWeight: 500,
                      fontSize: "var(--nx-t-xl)",
                      color: "var(--nx-fg)",
                      lineHeight: 1.2,
                      marginBottom: "1.5rem",
                    }}
                  >
                    {col.title}
                  </h2>
                  <ul
                    style={{
                      listStyle: "none",
                      padding: 0,
                      margin: "0 0 1.25rem",
                      display: "flex",
                      flexDirection: "column",
                      gap: "0.875rem",
                    }}
                  >
                    {col.items.map((item) => (
                      <li key={item.label}>
                        <p
                          style={{
                            fontFamily: F,
                            fontSize: "var(--nx-t-xs)",
                            fontWeight: 700,
                            letterSpacing: "0.14em",
                            textTransform: "uppercase",
                            color: "var(--nx-fg-muted)",
                            marginBottom: "2px",
                          }}
                        >
                          {item.label}
                        </p>
                        <p
                          style={{
                            fontFamily: F,
                            fontSize: "var(--nx-t-sm)",
                            fontWeight: 500,
                            color: "var(--nx-fg)",
                            lineHeight: 1.5,
                            whiteSpace: "pre-line",
                          }}
                        >
                          {item.value}
                        </p>
                      </li>
                    ))}
                  </ul>
                  <p
                    style={{
                      fontFamily: F,
                      fontSize: "var(--nx-t-xs)",
                      color: "var(--nx-fg-muted)",
                      lineHeight: 1.5,
                    }}
                  >
                    {col.note}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Coverage strip — location visual + coverage stats ── */}
      <section
        className="py-16 md:py-20"
        style={{ backgroundColor: "var(--nx-bg)", borderTop: "1px solid var(--nx-border)" }}
      >
        <div className="nx-container max-w-screen-xl">
          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr]" style={{ gap: "clamp(1.4rem,3vw,2.4rem)", alignItems: "stretch" }}>
            {/* Stylized location panel — a dot-grid "map" field with a pinned HQ */}
            <Reveal>
              <div
                data-testid="contact-location"
                style={{
                  position: "relative",
                  overflow: "hidden",
                  borderRadius: "var(--nx-r-lg)",
                  border: "1px solid var(--nx-border)",
                  background:
                    "radial-gradient(120% 90% at 80% -10%, color-mix(in srgb, var(--nx-cobalt) 14%, transparent) 0%, transparent 55%), var(--nx-cobalt-soft)",
                  padding: "clamp(1.6rem,4vw,2.6rem)",
                  minHeight: 220,
                }}
              >
                {/* dot-grid map texture */}
                <div
                  aria-hidden
                  style={{
                    position: "absolute",
                    inset: 0,
                    backgroundImage:
                      "radial-gradient(color-mix(in srgb, var(--nx-cobalt) 26%, transparent) 1.2px, transparent 1.2px)",
                    backgroundSize: "22px 22px",
                    maskImage: "linear-gradient(120deg, transparent, #000 60%)",
                    WebkitMaskImage: "linear-gradient(120deg, transparent, #000 60%)",
                    opacity: 0.7,
                  }}
                />
                {/* pinned HQ marker — desktop only; at 390px the pin sat on
                    top of the headline. display lives in classes so the
                    sm:hidden actually wins. */}
                <div aria-hidden className="hidden sm:flex" style={{ position: "absolute", right: "18%", top: "26%", flexDirection: "column", alignItems: "center" }}>
                  <span className="nx-icon-circle" style={{ boxShadow: "var(--nx-e-3)" }}>
                    <MapPin size={20} strokeWidth={2} />
                  </span>
                  <span className="nx-pulse-dot" style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--nx-cobalt)", marginTop: 8 }} />
                </div>
                <div style={{ position: "relative" }}>
                  <p style={{ fontFamily: F, fontSize: "10px", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--nx-cobalt)", marginBottom: "0.6rem" }}>
                    NYC Headquarters · 50-state coverage
                  </p>
                  <p style={{ fontFamily: F, fontWeight: 600, fontSize: "var(--nx-t-xl)", color: "var(--nx-fg)", lineHeight: 1.2, marginBottom: "0.4rem" }}>
                    Nexphoria Health, LLC
                  </p>
                  <p style={{ fontFamily: F, fontSize: "var(--nx-t-sm)", color: "var(--nx-fg-graphite)", lineHeight: 1.6, maxWidth: "24ch" }}>
                    800 Third Ave, Suite 1000 · New York, NY 10022
                  </p>
                </div>
              </div>
            </Reveal>
            {/* Coverage stats */}
            <Reveal delay={80}>
              <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1" style={{ gap: 12, height: "100%" }}>
                {[
                  { label: "States Covered", value: "50" },
                  { label: "Human Review", value: "Every message" },
                  { label: "Physician Availability", value: "Mon–Fri" },
                ].map(({ label, value }) => (
                  <div key={label} className="nx-stat-card" style={{ justifyContent: "center" }}>
                    <span className="nx-stat-num" style={{ fontSize: "clamp(24px, 3vw, 34px)" }}>{value}</span>
                    <span className="nx-stat-lbl">{label}</span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Contact form ── */}
      <section
        className="py-24 md:py-32"
        style={{ backgroundColor: "var(--nx-bg)", borderTop: "1px solid var(--nx-border)" }}
      >
        <div className="nx-container max-w-screen-xl">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr",
              gap: "4rem",
              maxWidth: "840px",
            }}
            className="md:grid-cols-[1fr_2fr]"
          >
            {/* Left label */}
            <Reveal>
              <div>
                <p
                  style={{
                    fontFamily: F,
                    fontSize: "11px",
                    fontWeight: 500,
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: "var(--nx-cobalt)",
                    marginBottom: "1rem",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.75rem",
                  }}
                >
                  <span style={{ display: "inline-block", width: "32px", height: "1px", backgroundColor: "var(--nx-cobalt)" }} />
                  SEND A MESSAGE
                </p>
                <h2
                  style={{
                    fontFamily: F,
                    fontWeight: 500,
                    fontSize: "var(--nx-t-h3)",
                    color: "var(--nx-fg)",
                    lineHeight: 1.15,
                  }}
                >
                  We read every message.
                </h2>
                {/* Trust signals near the form */}
                <ul style={{ listStyle: "none", padding: 0, margin: "1.75rem 0 0", display: "flex", flexDirection: "column", gap: "0.9rem" }}>
                  {[
                    { Icon: Lock, t: "Encrypted in transit and at rest" },
                    { Icon: ShieldCheck, t: "HIPAA-aware handling of your details" },
                    { Icon: Clock, t: "Replies on business days, Mon–Fri ET" },
                  ].map(({ Icon, t }) => (
                    <li key={t} style={{ display: "flex", alignItems: "center", gap: 11 }}>
                      <span className="nx-icon-circle" aria-hidden style={{ width: 34, height: 34 }}><Icon size={16} strokeWidth={1.9} /></span>
                      <span style={{ fontFamily: F, fontSize: "var(--nx-t-sm)", color: "var(--nx-fg-graphite)", lineHeight: 1.4 }}>{t}</span>
                    </li>
                  ))}
                </ul>
                {/* A person answers — the care team, not a queue */}
                <div style={{ marginTop: "1.75rem", borderRadius: "var(--nx-r-md)", overflow: "hidden", border: "1px solid var(--nx-border)", aspectRatio: "3 / 2" }}>
                  <img
                    src={contactCareTeam}
                    alt="A care coordinator with a headset smiles mid-conversation at a warm wood desk"
                    loading="lazy"
                    decoding="async"
                    width={1600}
                    height={1063}
                    style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                  />
                </div>
              </div>
            </Reveal>

            {/* Form */}
            <Reveal delay={80}>
              {submitted ? (
                <div
                  role="status"
                  aria-live="polite"
                  style={{
                    padding: "2.5rem",
                    border: "1px solid var(--nx-border)",
                    borderRadius: "var(--nx-r-sm)",
                    backgroundColor: "var(--nx-bg-cream)",
                  }}
                >
                  <p
                    style={{
                      fontFamily: F,
                      fontSize: "var(--nx-t-xs)",
                      fontWeight: 700,
                      letterSpacing: "0.16em",
                      textTransform: "uppercase",
                      color: "var(--nx-cobalt)",
                      marginBottom: "0.75rem",
                    }}
                  >
                    MESSAGE RECEIVED
                  </p>
                  <p
                    style={{
                      fontFamily: F,
                      fontWeight: 500,
                      fontSize: "var(--nx-t-h3)",
                      color: "var(--nx-fg)",
                      marginBottom: "0.625rem",
                    }}
                  >
                    We're on it.
                  </p>
                  <p
                    style={{
                      fontFamily: F,
                      fontSize: "var(--nx-t-sm)",
                      color: "var(--nx-fg-graphite)",
                      lineHeight: 1.65,
                    }}
                  >
                    We'll respond promptly on business days (Monday through Friday ET). Clinical questions are routed to a physician for review.
                  </p>
                  {form.reason === "Clinical / medical question" && (
                    <p style={{ fontFamily: F, fontSize: "var(--nx-t-xs)", fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--nx-amber)", marginTop: "1rem" }}>
                      Note: For urgent medical concerns, use the secure portal or call 911.
                    </p>
                  )}
                </div>
              ) : (
                <form
                  data-testid="contact-form"
                  onSubmit={handleSubmit}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "1.5rem",
                    padding: "clamp(1.6rem, 3vw, 2.4rem)",
                    borderRadius: "var(--nx-r-lg)",
                    border: "1px solid var(--nx-border)",
                    borderTop: "2px solid var(--nx-cobalt)",
                    backgroundColor: "var(--nx-ceramic)",
                    boxShadow: "var(--nx-e-2)",
                  }}
                >
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                    <div>
                      <label style={labelStyle} htmlFor="contact-name">Name</label>
                      <input
                        id="contact-name"
                        type="text"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        required
                        aria-required="true"
                        aria-invalid={error && !form.name ? true : undefined}
                        aria-describedby="contact-form-error"
                        className="nx-input"
                        data-testid="contact-name-input"
                      />
                    </div>
                    <div>
                      <label style={labelStyle} htmlFor="contact-email">Email</label>
                      <input
                        id="contact-email"
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        required
                        aria-required="true"
                        aria-invalid={error && !form.email ? true : undefined}
                        aria-describedby="contact-form-error"
                        className="nx-input"
                        data-testid="contact-email-input"
                      />
                    </div>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                    <div>
                      <label style={labelStyle} htmlFor="contact-phone">Phone (optional)</label>
                      <input
                        id="contact-phone"
                        type="tel"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        className="nx-input"
                      />
                    </div>
                    <div>
                      <label style={labelStyle} htmlFor="contact-state">State</label>
                      <input
                        id="contact-state"
                        type="text"
                        value={form.state}
                        onChange={(e) => setForm({ ...form, state: e.target.value })}
                        placeholder="e.g. NY"
                        className="nx-input"
                      />
                    </div>
                  </div>

                  <div>
                    <label style={labelStyle} htmlFor="contact-reason">Reason</label>
                    <select
                      id="contact-reason"
                      value={form.reason}
                      onChange={(e) => setForm({ ...form, reason: e.target.value })}
                      required
                      aria-required="true"
                      aria-invalid={error && (!form.reason || form.reason === reasons[0]) ? true : undefined}
                      aria-describedby="contact-form-error"
                      className="nx-input" style={{ cursor: "pointer" }}
                      data-testid="contact-subject-select"
                    >
                      {reasons.map((r) => (
                        <option key={r} value={r} disabled={r === reasons[0]}>
                          {r}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label style={labelStyle} htmlFor="contact-message">Message</label>
                    <textarea
                      id="contact-message"
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      required
                      aria-required="true"
                      aria-invalid={error && !form.message ? true : undefined}
                      aria-describedby="contact-form-error"
                      rows={5}
                      className="nx-input" style={{ resize: "none" }}
                      data-testid="contact-message-input"
                    />
                  </div>

                  {/* Screen-reader + visual validation feedback */}
                  <div id="contact-form-error" aria-live="polite" role="alert" data-testid="contact-form-error">
                    {error && (
                      <p
                        style={{
                          fontFamily: F,
                          fontSize: "var(--nx-t-sm)",
                          color: "var(--nx-danger)",
                          margin: 0,
                        }}
                      >
                        {error}
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    data-testid="contact-submit-button"
                    className="nx-cta-cobalt"
                    style={{
                      justifyContent: "center",
                      color: "var(--nx-ceramic)",
                      fontSize: "var(--nx-t-xs)",
                      fontWeight: 700,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      padding: "0.875rem 2rem",
                      alignSelf: "flex-start",
                    }}
                  >
                    SEND MESSAGE <span aria-hidden="true">→</span>
                  </button>
                </form>
              )}
            </Reveal>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
