/* JOB: route support, press, and clinical questions to the right door. */
/* ═══ CONTACT — the tile grammar (2026-09-05)
   One tile with the address, the email, the phone and the hours; the form
   as a second tile. Every business fact is derived from data/compliance.ts
   so the contact page, the legal pages and the structured data cannot
   disagree. The SMS opt-in beside the phone field is A2P-mandated and
   asserted by audit:a2p (data-testid contact-sms-consent, id contact-sms,
   the consent sentence verbatim from data/messaging.ts). The page's own
   classes live in client/src/styles/support.css. */
import { useState } from "react";
import { Link } from "wouter";
import { smsConsentLabel } from "@/data/messaging";
import { BUSINESS } from "@/data/compliance";
import { F, S } from "@/lib/typography";
import { SiteLayout } from "@/components/SiteLayout";
import { Reveal } from "@/components/Reveal";
import { useSeo, webPageJsonLd, breadcrumbJsonLd } from "@/lib/seo";
import "@/styles/support.css";

const PRESS_EMAIL = "press@nexphoria.com";

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
    title: "Contact Nexphoria: physician questions, protocol support",
    description: "Questions about peptide therapy, a protocol, or how to begin. Every message is read by a person and answered on business days, Monday to Friday.",
    path: "/contact",
    jsonLd: [webPageJsonLd({
      name: "Contact Nexphoria",
      description: "Reach the Nexphoria team for questions about peptide therapy, protocols, or getting started. Response on business days, Mon–Fri.",
      path: "/contact",
    }),
    breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Contact", path: "/contact" }]),
    ],
  });
  const [form, setForm] = useState({ name: "", email: "", phone: "", state: "", reason: "", message: "", sms: false });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.name && form.email && form.message && form.reason && form.reason !== reasons[0]) {
      setError("");
      /* No repo-side endpoint: the message goes through the visitor's own
         mail client so it reaches a person, and so nothing (including any
         health details) is ever persisted in this repo. PHI-never-in-repo. */
      const to =
        form.reason === "Press or media" || form.reason === "Partnership or wholesale"
          ? PRESS_EMAIL
          : BUSINESS.email;
      const body = [
        `Name: ${form.name}`,
        `Email: ${form.email}`,
        form.phone ? `Phone: ${form.phone}` : null,
        form.state ? `State: ${form.state}` : null,
        `Reason: ${form.reason}`,
        "",
        form.message,
      ]
        .filter(Boolean)
        .join("\n");
      window.location.href = `mailto:${to}?subject=${encodeURIComponent(
        `[${form.reason}] ${form.name}`,
      )}&body=${encodeURIComponent(body)}`;
      setSubmitted(true);
    } else {
      setError("Please complete your name, email, reason and message before sending.");
    }
  };

  return (
    <SiteLayout navVariant="showcase">
      {/* ── Hero ── */}
      <section className="nx-tilehero" aria-labelledby="contact-title">
        <div className="nx-container" style={{ paddingBottom: "var(--nx-sp-tight)" }}>
          <div className="nx-tilehero__head nx-hero-seq">
            <p className="nx-eyebrow">Contact</p>
            <h1 id="contact-title" className="nx-tilehero__h1" style={{ fontFamily: S }}>Tell us what you need, and the right person answers.</h1>
            <p className="nx-tilehero__sub" style={{ fontFamily: F }}>Patient support, press and partnerships reach a person on a business day. Clinical questions go to the physician through the secure portal.</p>
          </div>
        </div>
      </section>

      {/* ── The facts tile and the form tile ── */}
      <section className="nx-container" aria-label="Ways to reach us" style={{ paddingTop: "var(--nx-sp-tight)" }}>
        <div className="sp-contact">
          {/* The facts: address, email, phone, hours */}
          <Reveal>
            <div className="sp-tile" data-testid="contact-location">
              <p className="sp-tile__eyebrow">Where to find us</p>
              <h2 className="sp-tile__t">{BUSINESS.entity}</h2>
              <p className="sp-tile__b">Write, call, or send the form, and a person replies on a business day.</p>
              <dl className="sp-facts">
                <div>
                  <dt>Email</dt>
                  <dd>
                    <a href={`mailto:${BUSINESS.email}`} data-testid="contact-email-link">{BUSINESS.email}</a>
                    <small>Orders, billing, shipping and the portal.</small>
                  </dd>
                </div>
                <div>
                  <dt>Phone</dt>
                  <dd>
                    <a href={`tel:${BUSINESS.phoneE164}`} data-testid="contact-phone-link">{BUSINESS.phone}</a>
                    <small>Monday to Friday, 9am to 6pm ET.</small>
                  </dd>
                </div>
                <div>
                  <dt>Address</dt>
                  <dd>{BUSINESS.entity}<br />{BUSINESS.address}</dd>
                </div>
                <div>
                  <dt>Press and partnerships</dt>
                  <dd>
                    <a href={`mailto:${PRESS_EMAIL}`}>{PRESS_EMAIL}</a>
                    <small>Media, research collaborations and pharmacy partnerships.</small>
                  </dd>
                </div>
                <div>
                  <dt>Clinical questions</dt>
                  <dd>Questions about your results, a prescription or a dose go to the physician through the secure portal. In an emergency, call 911.</dd>
                </div>
              </dl>
            </div>
          </Reveal>

          {/* The form */}
          <Reveal delay={60}>
            <div className="sp-tile">
              <p className="sp-tile__eyebrow">Send a message</p>
              <h2 className="sp-tile__t">Write to us here, and a person reads it.</h2>
              <p className="sp-tile__b">The form opens a message in your own mail app, addressed to the right inbox, and you press send.</p>

              {submitted ? (
                <div role="status" aria-live="polite" className="sp-sent" data-testid="contact-sent">
                  <p className="sp-tile__eyebrow">One more step</p>
                  <p className="sp-tile__t">Check your mail app.</p>
                  <p className="sp-tile__b">
                    A message to our team is open in your mail app, ready to send. Replies come on business days, Monday to Friday ET. If your mail app did not open, email{" "}
                    <a href={`mailto:${BUSINESS.email}`} style={{ color: "var(--nx-cobalt-ink)", fontWeight: 600 }}>{BUSINESS.email}</a>.
                  </p>
                  {form.reason === "Clinical / medical question" && (
                    <p className="sp-tile__b" style={{ fontWeight: 600, color: "var(--nx-fg)" }}>
                      For urgent medical concerns, use the secure portal or call 911.
                    </p>
                  )}
                </div>
              ) : (
                <form data-testid="contact-form" onSubmit={handleSubmit} className="sp-form" noValidate>
                  <div className="sp-fields-2">
                    <label className="nx-field" htmlFor="contact-name">
                      <span className="nx-field__l" style={{ fontFamily: F }}>Name</span>
                      <input
                        id="contact-name"
                        type="text"
                        autoComplete="name"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        required
                        aria-required="true"
                        aria-invalid={error && !form.name ? true : undefined}
                        aria-describedby="contact-form-error"
                        className="nx-input"
                        data-testid="contact-name-input"
                      />
                    </label>
                    <label className="nx-field" htmlFor="contact-email">
                      <span className="nx-field__l" style={{ fontFamily: F }}>Email</span>
                      <input
                        id="contact-email"
                        type="email"
                        autoComplete="email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        required
                        aria-required="true"
                        aria-invalid={error && !form.email ? true : undefined}
                        aria-describedby="contact-form-error"
                        className="nx-input"
                        data-testid="contact-email-input"
                      />
                    </label>
                  </div>

                  <div className="sp-fields-2">
                    <label className="nx-field" htmlFor="contact-phone">
                      <span className="nx-field__l" style={{ fontFamily: F }}>Phone (optional)</span>
                      <input
                        id="contact-phone"
                        type="tel"
                        autoComplete="tel"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        className="nx-input"
                      />
                    </label>
                    <label className="nx-field" htmlFor="contact-state">
                      <span className="nx-field__l" style={{ fontFamily: F }}>State (optional)</span>
                      <input
                        id="contact-state"
                        type="text"
                        autoComplete="address-level1"
                        value={form.state}
                        onChange={(e) => setForm({ ...form, state: e.target.value })}
                        placeholder="e.g. NY"
                        className="nx-input"
                      />
                    </label>
                  </div>

                  {/* SMS OPT-IN — required on every surface that collects a
                      mobile number. A2P campaign review checks the site for a
                      visible, unchecked opt-in with the disclosure in the
                      label. Optional by rule: messaging consent may not be a
                      condition of anything, so this never gates submission. */}
                  <label htmlFor="contact-sms" data-testid="contact-sms-consent" className="sp-consent">
                    <input
                      id="contact-sms"
                      type="checkbox"
                      checked={form.sms}
                      onChange={(e) => setForm({ ...form, sms: e.target.checked })}
                    />
                    <span>
                      {smsConsentLabel()}{" "}
                      <Link href="/legal/messaging">Messaging Terms</Link>
                      {" · "}
                      <Link href="/legal/privacy">Privacy Policy</Link>
                    </span>
                  </label>

                  <label className="nx-field" htmlFor="contact-reason">
                    <span className="nx-field__l" style={{ fontFamily: F }}>Reason</span>
                    <select
                      id="contact-reason"
                      value={form.reason || reasons[0]}
                      onChange={(e) => setForm({ ...form, reason: e.target.value })}
                      required
                      aria-required="true"
                      aria-invalid={error && (!form.reason || form.reason === reasons[0]) ? true : undefined}
                      aria-describedby="contact-form-error"
                      className="nx-input"
                      style={{ cursor: "pointer" }}
                      data-testid="contact-subject-select"
                    >
                      {reasons.map((r) => (
                        <option key={r} value={r} disabled={r === reasons[0]}>
                          {r}
                        </option>
                      ))}
                    </select>
                  </label>

                  <label className="nx-field" htmlFor="contact-message">
                    <span className="nx-field__l" style={{ fontFamily: F }}>Message</span>
                    <textarea
                      id="contact-message"
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      required
                      aria-required="true"
                      aria-invalid={error && !form.message ? true : undefined}
                      aria-describedby="contact-form-error"
                      rows={5}
                      className="nx-input"
                      style={{ resize: "vertical" }}
                      data-testid="contact-message-input"
                    />
                  </label>

                  {/* Screen-reader + visual validation feedback */}
                  <div id="contact-form-error" aria-live="polite" role="alert" data-testid="contact-form-error">
                    {error && <p className="sp-form__error">{error}</p>}
                  </div>

                  <button type="submit" data-testid="contact-submit-button" className="nx-cta-cobalt" style={{ fontFamily: F, fontWeight: 600, fontSize: "var(--nx-t-base)" }}>
                    Send the message
                  </button>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Closer, as one tile ── */}
      <section className="nx-container" style={{ paddingTop: "var(--nx-sp-band)", paddingBottom: "var(--nx-sp-sec)" }} aria-labelledby="contact-closer">
        <div className="nx-closer-tile">
          <div>
            <h2 id="contact-closer" style={{ fontFamily: S, fontSize: "var(--nx-t-h2)", color: "var(--nx-ceramic)", maxWidth: "20ch", margin: 0, textWrap: "balance" }}>The answer is probably already written.</h2>
            <p style={{ fontFamily: F, fontSize: "var(--nx-t-base)", lineHeight: 1.6, color: "color-mix(in srgb, var(--nx-ceramic) 78%, transparent)", maxWidth: "46ch", marginTop: ".8rem" }}>How it works, what it costs, safety, shipping, who is involved. All of it is on the questions page and the five steps.</p>
            <Link href="/faq" className="nx-cta-ceramic" data-testid="contact-faq-link" style={{ fontFamily: F, fontWeight: 600, fontSize: "var(--nx-t-base)", marginTop: "1.6rem" }}>Read the questions</Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
