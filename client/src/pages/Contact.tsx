import { useState } from "react";
import { SiteLayout } from "@/components/SiteLayout";
import { Reveal } from "@/components/Reveal";
import { useSeo, webPageJsonLd } from "@/lib/seo";
import { HeroTile, MxHeader, ColoredHeroTile, TileGlyphs } from "@/components/SignatureTile";
import { PillBadge } from "@/components/PillBadge";

const contactColumns = [
  {
    eyebrow: "PATIENT SUPPORT",
    title: "Clinical and order questions.",
    items: [
      { label: "EMAIL", value: "hello@nexphoria.com" },
      { label: "HOURS", value: "Mon–Fri, 9am–6pm ET" },
      { label: "RESPONSE", value: "Within 24 hours on business days" },
    ],
    note: "For billing, shipping, order status, and portal access questions.",
  },
  {
    eyebrow: "MEDICAL QUESTIONS",
    title: "Physician portal messaging.",
    items: [
      { label: "CHANNEL", value: "Secure member portal" },
      { label: "RESPONSE", value: "Physician within 48 hours" },
      { label: "URGENT CARE", value: "Call 911 for medical emergencies" },
    ],
    note: "For questions about your labs, prescription, or protocol adjustments. Use the secure portal — not email — for clinical questions.",
  },
  {
    eyebrow: "PRESS & PARTNERSHIPS",
    title: "Media and business inquiries.",
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
    description: "Questions about peptide therapy, your protocol, or how to get started? We answer every message within 24 hours, Monday to Friday. Physician-guided support from a real team.",
    path: "/contact",
    jsonLd: [webPageJsonLd({
      name: "Contact Nexphoria",
      description: "Reach the Nexphoria team for questions about peptide therapy, protocols, or getting started. 24-hour response, Mon–Fri.",
      path: "/contact",
    })],
  });
  const [form, setForm] = useState({ name: "", email: "", phone: "", state: "", reason: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.name && form.email && form.message && form.reason !== reasons[0]) {
      setSubmitted(true);
    }
  };

  const inputStyle: React.CSSProperties = {
    fontFamily: "'General Sans', system-ui, sans-serif",
    fontSize: "14px",
    padding: "0.875rem 1.125rem",
    border: "1px solid var(--nx-border)",
    borderRadius: "4px",
    backgroundColor: "#FFFFFF",
    color: "var(--nx-fg)",
    width: "100%",
    outline: "none",
    appearance: "none" as React.CSSProperties["appearance"],
  };

  const labelStyle: React.CSSProperties = {
    fontFamily: "'General Sans', system-ui, sans-serif",
    fontSize: "9px",
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
              href="mailto:support@nexphoria.com"
              tone="sky"
              glyph={TileGlyphs.circle}
              label={<>Patient support<br /><span>24/7 available</span></>}
              caption="Average reply: 2hrs"
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

      {/* ── Three support columns ── */}
      <section
        className="py-24 md:py-32"
        style={{ backgroundColor: "var(--nx-bg-cream)", borderTop: "1px solid var(--nx-border)" }}
      >
        <div className="nx-container max-w-screen-xl">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
              gap: "1.5px",
              backgroundColor: "var(--nx-border)",
              border: "1.5px solid var(--nx-border)",
            }}
          >
            {contactColumns.map((col, i) => (
              <Reveal key={col.eyebrow} delay={i * 80}>
                <div
                  style={{
                    backgroundColor: "#FFFFFF",
                    padding: "2.5rem 2rem",
                    height: "100%",
                  }}
                >
                  <p
                    style={{
                      fontFamily: "'General Sans', system-ui, sans-serif",
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
                      fontFamily: "'General Sans', system-ui, sans-serif",
                      
                      fontWeight: 500,
                      fontSize: "1.375rem",
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
                            fontFamily: "'General Sans', system-ui, sans-serif",
                            fontSize: "8px",
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
                            fontFamily: "'General Sans', system-ui, sans-serif",
                            fontSize: "14px",
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
                      fontFamily: "'General Sans', system-ui, sans-serif",
                      fontSize: "12px",
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

      {/* ── Coverage strip ── */}
      <section
        className="py-10 md:py-12"
        style={{ backgroundColor: "var(--nx-bg)", borderTop: "1px solid var(--nx-border)" }}
      >
        <div className="nx-container max-w-screen-xl">
          <Reveal>
            <div
              style={{ display: "flex", flexWrap: "wrap", gap: "2.5rem", alignItems: "center", justifyContent: "space-between" }}
            >
              <div>
                <p style={{ fontFamily: "'General Sans', system-ui, sans-serif", fontSize: "10px", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--nx-cobalt)", marginBottom: "0.5rem" }}>
                  NYC HEADQUARTERS · 50-STATE COVERAGE
                </p>
                <p style={{ fontFamily: "'General Sans', system-ui, sans-serif",  fontWeight: 500, fontSize: "1.375rem", color: "var(--nx-fg)", lineHeight: 1.2, marginBottom: "0.5rem" }}>
                  Nexphoria Health, LLC
                </p>
                <p style={{ fontFamily: "'General Sans', system-ui, sans-serif", fontSize: "14px", color: "var(--nx-fg-graphite)", lineHeight: 1.6 }}>
                  800 Third Ave, Suite 1000 · New York, NY 10022
                </p>
              </div>
              <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
                {[
                  { label: "States Covered", value: "50" },
                  { label: "Response Time", value: "24 hrs" },
                  { label: "Physician Availability", value: "Mon–Fri" },
                ].map(({ label, value }) => (
                  <div key={label} style={{ textAlign: "center" }}>
                    <p style={{ fontFamily: "'General Sans', system-ui, sans-serif", fontSize: "2rem", fontWeight: 500, color: "var(--nx-fg)", lineHeight: 1 }}>{value}</p>
                    <p style={{ fontFamily: "'General Sans', system-ui, sans-serif", fontSize: "9px", fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--nx-fg-muted)", marginTop: "4px" }}>{label}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
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
                  }}
                >
                  <span style={{ display: "inline-block", width: "32px", height: "1px", backgroundColor: "var(--nx-cobalt)" }} />
                  SEND A MESSAGE
                </p>
                <h2
                  style={{
                    fontFamily: "'General Sans', system-ui, sans-serif",
                    
                    fontWeight: 500,
                    fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
                    color: "var(--nx-fg)",
                    lineHeight: 1.15,
                  }}
                >
                  We read every message.
                </h2>
              </div>
            </Reveal>

            {/* Form */}
            <Reveal delay={80}>
              {submitted ? (
                <div
                  style={{
                    padding: "2.5rem",
                    border: "1px solid var(--nx-border)",
                    borderRadius: "4px",
                    backgroundColor: "var(--nx-bg-cream)",
                  }}
                >
                  <p
                    style={{
                      fontFamily: "'General Sans', system-ui, sans-serif",
                      fontSize: "9px",
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
                      fontFamily: "'General Sans', system-ui, sans-serif",
                      
                      fontWeight: 500,
                      fontSize: "1.5rem",
                      color: "var(--nx-fg)",
                      marginBottom: "0.625rem",
                    }}
                  >
                    We're on it.
                  </p>
                  <p
                    style={{
                      fontFamily: "'General Sans', system-ui, sans-serif",
                      fontSize: "14px",
                      color: "var(--nx-fg-graphite)",
                      lineHeight: 1.65,
                    }}
                  >
                    We'll respond within 24 hours on business days (Monday through Friday ET). Clinical questions are routed to a physician within 48 hours.
                  </p>
                  {form.reason === "Clinical / medical question" && (
                    <p style={{ fontFamily: "'General Sans', system-ui, sans-serif", fontSize: "9px", fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--nx-amber)", marginTop: "1rem" }}>
                      Note: For urgent medical concerns, use the secure portal or call 911.
                    </p>
                  )}
                </div>
              ) : (
                <form
                  data-testid="contact-form"
                  onSubmit={handleSubmit}
                  style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}
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
                        style={inputStyle}
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
                        style={inputStyle}
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
                        style={inputStyle}
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
                        style={inputStyle}
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
                      style={{ ...inputStyle, cursor: "pointer" }}
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
                      rows={5}
                      style={{ ...inputStyle, resize: "none" }}
                      data-testid="contact-message-input"
                    />
                  </div>

                  <button
                    type="submit"
                    data-testid="contact-submit-button"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "0.5rem",
                      backgroundColor: "var(--nx-cobalt)",
                      color: "#FFFFFF",
                      fontFamily: "'General Sans', system-ui, sans-serif",
                      fontSize: "12px",
                      fontWeight: 700,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      padding: "0.875rem 2rem",
                      borderRadius: "100px",
                      border: "none",
                      cursor: "pointer",
                      alignSelf: "flex-start",
                    }}
                  >
                    SEND MESSAGE →
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
