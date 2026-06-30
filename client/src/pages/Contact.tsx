import { useState } from "react";
import { SiteLayout } from "@/components/SiteLayout";
import { Reveal } from "@/components/Reveal";
import { useSeo } from "@/lib/seo";

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
      { label: "PHARMACY LICENSE", value: "NY-503A-XXXXXX" },
    ],
    note: "Media inquiries, research collaborations, and pharmacy partnership discussions.",
  },
];

const reasons = [
  "Select a reason",
  "Clinical question",
  "Order status",
  "Billing",
  "Press",
  "Other",
];

export default function Contact() {
  useSeo({
    title: "Contact | Nexphoria",
    description: "We answer in 24 hours, Monday-Friday.",
    path: "/contact",
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
    fontFamily: "'Inter Tight', sans-serif",
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
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: "9px",
    fontWeight: 700,
    letterSpacing: "0.14em",
    textTransform: "uppercase" as const,
    color: "var(--nx-fg-muted)",
    display: "block",
    marginBottom: "0.4rem",
  };

  return (
    <SiteLayout navVariant="gate">
      {/* ── Hero ── */}
      <section
        className="py-32 md:py-40"
        style={{ backgroundColor: "var(--nx-bg)", borderBottom: "1px solid var(--nx-border)" }}
      >
        <div className="nx-container max-w-screen-xl">
          <Reveal>
            <p
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "11px",
                fontWeight: 500,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "var(--nx-cobalt)",
                marginBottom: "1.25rem",
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
              }}
            >
              <span style={{ display: "inline-block", width: "32px", height: "1px", backgroundColor: "var(--nx-cobalt)" }} />
              CONTACT
            </p>
            <h1
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontWeight: 500,
                fontSize: "clamp(3rem, 6vw, 5rem)",
                color: "var(--nx-fg)",
                lineHeight: 1.05,
                marginBottom: "0.5rem",
              }}
            >
              We answer in 24 hours,
            </h1>
            <h1
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontWeight: 500,
                fontStyle: "italic",
                fontSize: "clamp(3rem, 6vw, 5rem)",
                color: "var(--nx-fg)",
                lineHeight: 1.05,
                marginBottom: "1.5rem",
              }}
            >
              Monday through Friday.
            </h1>
            <p
              style={{
                fontFamily: "'Inter Tight', sans-serif",
                fontSize: "clamp(1rem, 2vw, 1.0625rem)",
                color: "#4A4A4A",
                lineHeight: 1.65,
                maxWidth: "560px",
              }}
            >
              For clinical questions about your protocol or laboratory results, use the
              secure messaging channel in your member portal — your physician responds
              there within 48 hours. For everything else, use the form below.
            </p>
          </Reveal>
        </div>
      </section>

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
                      fontFamily: "'JetBrains Mono', monospace",
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
                      fontFamily: "'Playfair Display', Georgia, serif",
                      fontStyle: "italic",
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
                            fontFamily: "'JetBrains Mono', monospace",
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
                            fontFamily: "'Inter Tight', sans-serif",
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
                      fontFamily: "'Inter Tight', sans-serif",
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
                    fontFamily: "'JetBrains Mono', monospace",
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
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontStyle: "italic",
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
                    textAlign: "center",
                    backgroundColor: "var(--nx-bg-cream)",
                  }}
                >
                  <p
                    style={{
                      fontFamily: "'Playfair Display', Georgia, serif",
                      fontStyle: "italic",
                      fontWeight: 500,
                      fontSize: "1.5rem",
                      color: "var(--nx-fg)",
                      marginBottom: "0.75rem",
                    }}
                  >
                    Message received.
                  </p>
                  <p
                    style={{
                      fontFamily: "'Inter Tight', sans-serif",
                      fontSize: "14px",
                      color: "#4A4A4A",
                    }}
                  >
                    We'll respond within 24 hours on business days, Monday through Friday.
                  </p>
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
                      fontFamily: "'Inter Tight', sans-serif",
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
