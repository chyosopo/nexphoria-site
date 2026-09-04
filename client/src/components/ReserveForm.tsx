/* The reservation (the playbook): a pending medicine or protocol is shown
   with its price ladder, and the action is a reservation at that price,
   captured by email. Same lead sink as the footer (/api/waitlist), with the
   product in `source`. Degrades gracefully on a static host. No billing
   claim is made here: a reservation is a place in line and a locked figure. */
import { useState } from "react";
import { Check } from "lucide-react";
import { F } from "@/lib/typography";
import { track } from "@/lib/analytics";

export function ReserveForm({ slug, kind, price, testId = "reserve" }: { slug: string; kind: "peptide" | "stack"; price?: string; testId?: string }) {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "done" | "invalid" | "err">("idle");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const val = email.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) { setState("invalid"); return; }
    setState("sending");
    track("reserve", { slug, kind });
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: val, source: `reserve:${kind}:${slug}` }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setState("done");
      setEmail("");
    } catch {
      setState("err");
    }
  };

  if (state === "done") {
    return (
      <p className="nx-reserve__done" style={{ fontFamily: F }} data-testid={`${testId}-done`}>
        <Check size={15} strokeWidth={2.5} aria-hidden="true" /> Reserved. We will email you the moment it is available, at the price you saw today.
      </p>
    );
  }
  return (
    <form onSubmit={submit} className="nx-reserve" data-testid={testId} noValidate>
      <label htmlFor={`${testId}-email`} className="sr-only">Email address</label>
      <input
        id={`${testId}-email`}
        type="email"
        inputMode="email"
        autoComplete="email"
        placeholder="you@email.com"
        value={email}
        onChange={(e) => { setEmail(e.target.value); if (state !== "idle") setState("idle"); }}
        className="nx-reserve__input"
        style={{ fontFamily: F }}
        aria-invalid={state === "invalid"}
        aria-describedby={`${testId}-note`}
      />
      <button type="submit" className="nx-cta-cobalt nx-reserve__btn" disabled={state === "sending"} data-testid={`${testId}-submit`}>
        {state === "sending" ? "Reserving" : price ? `Reserve at ${price}` : "Reserve your price"}
      </button>
      <p id={`${testId}-note`} className="nx-reserve__note" style={{ fontFamily: F }} aria-live="polite">
        {state === "invalid"
          ? "Please enter a valid email address."
          : state === "err"
            ? "That did not go through. Please try again in a moment."
            : "Your price is locked at today's figure. One email when it ships; a physician still reviews every order."}
      </p>
    </form>
  );
}
