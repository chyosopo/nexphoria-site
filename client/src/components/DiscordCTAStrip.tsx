import { useState } from "react";
import { ExternalLink } from "lucide-react";

export function DiscordCTAStrip() {
  const [email, setEmail] = useState("");

  return (
    <section className="nx-section" style={{ backgroundColor: "var(--nx-bg-cream)" }} data-testid="discord-cta-strip">
      <div className="nx-container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Discord */}
          <div style={{ borderRight: "1px solid var(--nx-border)", paddingRight: "3rem" }} className="border-0 md:border-r pr-0 md:pr-12">
            <p className="nx-eyebrow mb-3">COMMUNITY</p>
            <h3
              style={{
                fontFamily: "'General Sans', system-ui, sans-serif",
                fontSize: "clamp(1.5rem, 2.5vw, 2rem)",
                fontWeight: 500,
                color: "var(--nx-fg)",
                lineHeight: 1.2,
                marginBottom: "1rem",
              }}
            >
              Join the Nexphoria Discord.
            </h3>
            <p style={{ fontFamily: "'General Sans', system-ui, sans-serif", fontSize: "0.9375rem", color: "var(--nx-fg-graphite)", lineHeight: 1.6, marginBottom: "1.5rem" }}>
              Members share lab results, protocol experience, and real outcomes.
              Ask questions, compare protocols, and get support from the community.
            </p>
            <a
              href="https://discord.gg/nexphoria"
              target="_blank"
              rel="noopener noreferrer"
              className="nx-cta-cobalt"
              data-testid="discord-join-button"
            >
              Join the conversation <ExternalLink size={14} />
            </a>
          </div>

          {/* eBook */}
          <div>
            <p className="nx-eyebrow mb-3">FREE GUIDE</p>
            <h3
              style={{
                fontFamily: "'General Sans', system-ui, sans-serif",
                fontSize: "clamp(1.5rem, 2.5vw, 2rem)",
                fontWeight: 500,
                color: "var(--nx-fg)",
                lineHeight: 1.2,
                marginBottom: "0.5rem",
              }}
            >
              The Peptide Field Guide.
            </h3>
            <p style={{ fontFamily: "'General Sans', system-ui, sans-serif", fontSize: "0.9375rem", color: "var(--nx-fg-graphite)", lineHeight: 1.6, marginBottom: "1.5rem" }}>
              64 pages. Every compound we offer — mechanism, outcomes, dosing,
              timeline. Written by our medical team.
            </p>
            <form
              className="flex gap-2"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                className="flex-1 px-4 py-3 rounded-full text-sm border focus:border-blue-500 transition-colors"
                style={{
                  fontFamily: "'General Sans', system-ui, sans-serif",
                  borderColor: "var(--nx-border)",
                  color: "var(--nx-fg)",
                }}
                data-testid="ebook-email-input"
              />
              <button
                type="submit"
                className="nx-cta-cobalt whitespace-nowrap"
                style={{ padding: "0.75rem 1.25rem" }}
                data-testid="ebook-get-button"
              >
                Get the guide
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
