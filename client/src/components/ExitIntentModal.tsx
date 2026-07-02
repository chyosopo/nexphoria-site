import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * ExitIntentModal — fires ONCE per session when the pointer leaves toward the
 * top of the viewport (classic exit-intent trigger). Captures the visitor's
 * email into /api/waitlist as a "last-chance" lead. Suppressed on mobile
 * (unreliable trigger) and on the Assessment / Gate routes (where the user is
 * already deep in-funnel).
 */

const SEEN_KEY_MEMORY: { seen: boolean } = { seen: false };

function isMobile() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(max-width: 767px)").matches || "ontouchstart" in window;
}

function currentPath() {
  if (typeof window === "undefined") return "/";
  return window.location.hash.replace(/^#/, "") || "/";
}

export function ExitIntentModal() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "done" | "err">("idle");

  useEffect(() => {
    if (isMobile()) return;
    if (SEEN_KEY_MEMORY.seen) return;
    const path = currentPath();
    if (path.startsWith("/assessment") || path === "/") return;

    const onMouseOut = (e: MouseEvent) => {
      if (SEEN_KEY_MEMORY.seen) return;
      // Trigger only if cursor exits upward through the top edge
      if (e.clientY <= 0 && e.relatedTarget === null) {
        SEEN_KEY_MEMORY.seen = true;
        setOpen(true);
      }
    };

    // Give the visitor a moment before arming
    const armTimer = setTimeout(() => {
      document.addEventListener("mouseout", onMouseOut);
    }, 15000);

    return () => {
      clearTimeout(armTimer);
      document.removeEventListener("mouseout", onMouseOut);
    };
  }, []);

  const submit = async () => {
    const val = email.trim();
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRe.test(val)) {
      setState("err");
      return;
    }
    setState("sending");
    try {
      await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: val, source: `exit-intent:${currentPath()}` }),
      });
      setState("done");
    } catch {
      setState("err");
    }
  };

  const close = () => setOpen(false);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="exit-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={close}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 200,
              backgroundColor: "rgba(0,0,0,0.55)",
              backdropFilter: "blur(4px)",
            }}
            data-testid="exit-intent-backdrop"
          />
          <motion.div
            key="exit-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="exit-intent-title"
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
            style={{
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: 201,
              width: "min(460px, calc(100vw - 32px))",
              backgroundColor: "var(--nx-bg-cream, #FFFFF3)",
              borderRadius: "6px",
              boxShadow: "0 40px 80px -20px rgba(0,0,0,0.35)",
              padding: "36px 32px 28px",
              border: "1px solid var(--nx-border)",
            }}
            data-testid="exit-intent-modal"
          >
            <button
              type="button"
              onClick={close}
              aria-label="Close"
              data-testid="exit-intent-close"
              style={{
                position: "absolute",
                top: 12,
                right: 12,
                width: 32,
                height: 32,
                borderRadius: "50%",
                border: "none",
                backgroundColor: "transparent",
                cursor: "pointer",
                color: "var(--nx-fg-muted)",
                fontSize: 18,
                lineHeight: 1,
              }}
            >
              ×
            </button>

            <p
              style={{
                fontFamily: "'General Sans', system-ui, sans-serif",
                fontSize: 9,
                fontWeight: 500,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "var(--nx-cobalt)",
                marginBottom: 14,
              }}
            >
              Before you go
            </p>

            <h2
              id="exit-intent-title"
              style={{
                fontFamily: "'General Sans', system-ui, sans-serif",
                fontWeight: 500,
                fontSize: "1.75rem",
                lineHeight: 1.15,
                color: "var(--nx-fg)",
                marginBottom: 10,
              }}
            >
              Save your spot on the pharmacy list.
            </h2>

            <p
              style={{
                fontFamily: "'General Sans', system-ui, sans-serif",
                fontSize: "0.9375rem",
                color: "var(--nx-fg-muted)",
                lineHeight: 1.55,
                marginBottom: 20,
              }}
            >
              We&rsquo;ll email you when your peptide protocol is ready to prescribe.
              Physician-reviewed, state-licensed compounding, no commitment.
            </p>

            {state === "done" ? (
              <div
                style={{
                  padding: "14px 16px",
                  borderRadius: 4,
                  backgroundColor: "rgba(198, 241, 132, 0.18)",
                  border: "1px solid var(--nx-acid, #c6f184)",
                  fontFamily: "'General Sans', system-ui, sans-serif",
                  fontSize: "0.9375rem",
                  color: "var(--nx-fg)",
                }}
                data-testid="exit-intent-success"
              >
                You&rsquo;re on the list. Check your inbox for what happens next.
              </div>
            ) : (
              <>
                <div style={{ display: "flex", gap: 8 }}>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (state === "err") setState("idle");
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") submit();
                    }}
                    placeholder="you@example.com"
                    data-testid="exit-intent-email"
                    style={{
                      flex: 1,
                      padding: "0.75rem 1rem",
                      borderRadius: 4,
                      border: state === "err" ? "1px solid #c0392b" : "1px solid var(--nx-border)",
                      fontFamily: "'General Sans', system-ui, sans-serif",
                      fontSize: "0.9375rem",
                      backgroundColor: "#FFFFFF",
                      color: "var(--nx-fg)",
                      outline: "none",
                    }}
                    autoFocus
                  />
                  <button
                    type="button"
                    onClick={submit}
                    disabled={state === "sending"}
                    data-testid="exit-intent-submit"
                    style={{
                      padding: "0 1.25rem",
                      borderRadius: 4,
                      border: "none",
                      backgroundColor: "var(--nx-fg)",
                      color: "var(--nx-bg-cream, #FFFFF3)",
                      fontFamily: "'General Sans', system-ui, sans-serif",
                      fontSize: 11,
                      fontWeight: 600,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      cursor: state === "sending" ? "wait" : "pointer",
                      opacity: state === "sending" ? 0.7 : 1,
                    }}
                  >
                    {state === "sending" ? "…" : "Notify me"}
                  </button>
                </div>
                {state === "err" && (
                  <p
                    style={{
                      marginTop: 8,
                      fontFamily: "'General Sans', system-ui, sans-serif",
                      fontSize: 12,
                      color: "#c0392b",
                    }}
                  >
                    Please enter a valid email.
                  </p>
                )}
                <p
                  style={{
                    marginTop: 14,
                    fontFamily: "'General Sans', system-ui, sans-serif",
                    fontSize: 11,
                    color: "var(--nx-fg-muted)",
                    lineHeight: 1.5,
                  }}
                >
                  No spam. Unsubscribe anytime.
                </p>
              </>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
