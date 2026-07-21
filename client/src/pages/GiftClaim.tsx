/* JOB: the sponsor side of a gift ask — someone sent this link asking you
   to cover their protocol or panel. Everything (name, price) is re-derived
   from the catalog by slug; the URL is never trusted for a number. */
import { useMemo } from "react";
import { Link } from "wouter";
import { ArrowRight, ShieldCheck, Stethoscope, RefreshCw } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { useSeo, webPageJsonLd } from "@/lib/seo";
import { usd } from "@/data/stacksCatalog";
import { decodeGiftAsk } from "@/data/gift";
import { track } from "@/lib/analytics";
import { F, S } from "@/lib/typography";

export default function GiftClaim() {
  const ask = useMemo(
    () => (typeof window !== "undefined" ? decodeGiftAsk(window.location.search) : null),
    [],
  );

  useSeo({
    title: ask ? `Cover ${ask.from ? `${ask.from}'s` : "their"} ${ask.item.name} — Nexphoria` : "Gift link — Nexphoria",
    description: "A one-time payment covers their protocol or panel. They still qualify with their own physician; unprescribed gifts are refunded.",
    path: "/gift/claim",
    jsonLd: [webPageJsonLd({ name: "Nexphoria gift link", description: "Cover someone's protocol or panel.", path: "/gift/claim" })],
  });

  if (!ask) {
    return (
      <SiteLayout navVariant="showcase">
        <section className="nx-container" style={{ paddingTop: "clamp(4rem,7vw,6rem)", paddingBottom: "clamp(4rem,7vw,6rem)", maxWidth: 720 }} aria-labelledby="giftclaim-invalid-title">
          <h1 id="giftclaim-invalid-title" style={{ fontFamily: S, fontWeight: 500, fontSize: "clamp(30px,4.4vw,46px)", color: "var(--nx-fg)", lineHeight: 1.1 }}>
            This gift link isn't quite right.
          </h1>
          <p style={{ fontFamily: F, fontSize: "var(--nx-t-body)", lineHeight: 1.6, color: "var(--nx-fg-graphite)", marginTop: "1rem", maxWidth: "52ch" }}>
            It may have been trimmed in transit. Ask the sender to copy it again — or start a gift of your own.
          </p>
          <Link href="/gift" className="nx-cta-cobalt" style={{ marginTop: "1.6rem", display: "inline-flex" }}>
            Go to gifting
          </Link>
        </section>
      </SiteLayout>
    );
  }

  const { item, termLabel, total, from } = ask;
  const whose = from ? `${from}'s` : "their";

  return (
    <SiteLayout navVariant="showcase">
      <section className="relative" style={{ overflow: "hidden" }}>
        <div className="nx-aurora" aria-hidden><i /><i /><i /></div>
        <div className="nx-container relative nx-hero-seq" style={{ paddingTop: "clamp(3.2rem,6.5vw,5.4rem)", paddingBottom: "clamp(2.4rem,4.5vw,3.4rem)", zIndex: 1, maxWidth: 860 }}>
          <p style={{ fontFamily: F, fontSize: "var(--nx-t-xs)", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--nx-cobalt)" }}>
            A gift ask
          </p>
          <h1 style={{ fontFamily: S, fontWeight: 500, fontSize: "clamp(34px,5vw,58px)", lineHeight: 1.07, letterSpacing: "-0.015em", color: "var(--nx-fg)", maxWidth: "20ch", marginTop: "0.9rem" }} data-testid="giftclaim-title">
            {from ? <>{from} asked you to cover <em style={{ color: "var(--nx-cobalt)" }}>{item.name}.</em></> : <>You've been asked to cover <em style={{ color: "var(--nx-cobalt)" }}>{item.name}.</em></>}
          </h1>
          <p style={{ fontFamily: F, fontSize: "var(--nx-t-body)", lineHeight: 1.62, color: "var(--nx-fg-graphite)", maxWidth: "54ch", marginTop: "1rem" }}>
            {item.tagline} One payment covers {whose} {item.kind === "stack" ? "supply, labs, and physician review" : "panel and physician review"} —
            and {from ?? "they"} still {from ? "qualifies" : "qualify"} the normal way: their own intake, their own physician, who can decline.
          </p>

          {/* the ask, priced from the catalog */}
          <div className="nx-glass-tile" style={{ display: "block", marginTop: "1.8rem", padding: "clamp(1.4rem,3vw,2rem)", maxWidth: 560 }} data-testid="giftclaim-card">
            <p style={{ fontFamily: F, fontSize: "var(--nx-t-xs)", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--nx-cobalt)" }}>
              {item.kind === "stack" ? `Protocol · ${termLabel}` : "Bloodwork panel"}
            </p>
            <p style={{ fontFamily: S, fontWeight: 500, fontSize: "var(--nx-t-xl)", color: "var(--nx-fg)", marginTop: 4 }}>{item.name}</p>
            <p style={{ fontFamily: S, fontWeight: 500, fontSize: "clamp(32px,4.4vw,44px)", color: "var(--nx-fg)", marginTop: "0.8rem", lineHeight: 1, fontVariantNumeric: "tabular-nums" }} data-testid="giftclaim-total">
              {usd(total)}
              <span style={{ fontFamily: F, fontSize: "var(--nx-t-sm)", fontWeight: 500, color: "var(--nx-fg-muted)" }}> · one-time</span>
            </p>
            <p style={{ fontFamily: F, fontSize: "var(--nx-t-xs)", color: "var(--nx-fg-muted)", marginTop: "0.6rem" }}>
              Refunded — or applied to what the physician does prescribe — if this isn't.
            </p>
            <div style={{ marginTop: "1.2rem", borderTop: "1px solid var(--nx-border)", paddingTop: "1.1rem" }}>
              <p style={{ fontFamily: F, fontSize: "var(--nx-t-sm)", lineHeight: 1.55, color: "var(--nx-fg-graphite)" }}>
                Gift checkout is concierge for now — one email and we arrange payment and confirmation
                with you directly. Nothing is charged until you confirm with a person.
              </p>
              <a
                href={`mailto:hello@nexphoria.com?subject=${encodeURIComponent(`Covering ${whose} gift: ${item.name} (${termLabel})`)}&body=${encodeURIComponent(
                  `I'd like to cover ${whose} ${item.name} — ${termLabel}, ${usd(total)} one-time.${from ? `\nRequested by: ${from}` : ""}\n\nMy name:\nBest email or phone to reach me:`,
                )}`}
                className="nx-cta-cobalt"
                data-testid="giftclaim-cta"
                style={{ marginTop: "1rem", fontSize: "var(--nx-t-base)", padding: "13px 26px", display: "inline-flex" }}
                onClick={() => track("gift_claim_started", { item: item.slug, term: ask.termKey })}
              >
                Cover this gift
              </a>
            </div>
          </div>

          {/* the three honest facts */}
          <div className="grid grid-cols-1 sm:grid-cols-3" style={{ gap: 12, marginTop: "1.8rem" }}>
            {[
              { Icon: Stethoscope, t: "Their physician decides", d: "Medicine is prescribed from their labs and history — never from a payment." },
              { Icon: ShieldCheck, t: "Their results stay theirs", d: "You'll know the gift landed. Their health data never comes to you." },
              { Icon: RefreshCw, t: "Not prescribed? Returned", d: "The value is applied to what is prescribed, or refunded." },
            ].map(({ Icon, t, d }) => (
              <div key={t} className="nx-glass-card" style={{ padding: "1.2rem 1.1rem" }}>
                <Icon size={18} strokeWidth={1.9} aria-hidden style={{ color: "var(--nx-cobalt)" }} />
                <p style={{ fontFamily: F, fontWeight: 600, fontSize: "var(--nx-t-sm)", color: "var(--nx-fg)", marginTop: "0.5rem" }}>{t}</p>
                <p style={{ fontFamily: F, fontSize: "var(--nx-t-xs)", lineHeight: 1.5, color: "var(--nx-fg-graphite)", marginTop: "0.3rem" }}>{d}</p>
              </div>
            ))}
          </div>

          <p style={{ fontFamily: F, fontSize: "var(--nx-t-sm)", color: "var(--nx-fg-graphite)", marginTop: "1.6rem" }}>
            Want to see what {from ?? "they"}'d be getting?{" "}
            <Link href={item.kind === "stack" ? `/stacks/${item.slug}` : "/bloodwork"} className="nx-text-link" style={{ fontFamily: F, fontWeight: 600 }} data-testid="giftclaim-see-item">
              {item.kind === "stack" ? "See the protocol" : "See the panel"} <ArrowRight size={14} aria-hidden />
            </Link>
          </p>
        </div>
      </section>
    </SiteLayout>
  );
}
