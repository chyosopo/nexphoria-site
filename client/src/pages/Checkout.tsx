import { track } from "@/lib/analytics";
import { useState, useEffect } from "react";
import { Link } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { ArrowLeft, Check, Shield, Stethoscope, Truck } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { Reveal } from "@/components/Reveal";
import { useSeo } from "@/lib/seo";
import { useCart, formatUSD } from "@/contexts/CartProvider";
import { stacks } from "@/data/stacks";
import { isGLP1Excluded, getStack } from "@/data/stacksCatalog";
import { getSolo } from "@/data/soloCatalog";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { FONT } from "@/lib/typography";

/* Local form schema — server validates on submit via insertCheckoutSchema.
   DO NOT change these fields — checkout schema is locked. */
const formSchema = z.object({
  name: z.string().min(2, "Enter your full name"),
  email: z.string().email("Enter a valid email"),
  age: z.coerce.number().int().min(18, "Must be 18+").max(110),
  cardiacHistory: z.boolean(),
  diabetic: z.boolean(),
  hormonalRx: z.boolean(),
  allergies: z.string().optional(),
  shippingAddress: z.string().min(4, "Enter your shipping address"),
  city: z.string().min(1, "City required"),
  state: z.string().length(2, "Use 2-letter state code"),
  zip: z.string().min(5, "Enter a valid zip").max(10),
});
type FormValues = z.infer<typeof formSchema>;

const STEPS = ["Address", "Billing", "Review"] as const;

export default function Checkout() {
  useSeo({ title: "Secure intake — Nexphoria", description: "Submit your information for physician review. No charge until a licensed physician approves your protocol." });
  const { lines, subtotal, totalSavings, itemCount, clear } = useCart();

  /* ─── GLP-1 state gate (defense-in-depth: PDPs already gate; this enforces at checkout) ─── */
  const cartHasGLP1 = lines.some((l) => getSolo(l.slug)?.gated || getStack(l.slug)?.gated);

  const { toast } = useToast();
  const [submittedId, setSubmittedId] = useState<number | null>(null);
  const [step, setStep] = useState(0); // 0 Address, 1 Payment, 2 Review

  // Checkout is a private transactional page — noindex
  useEffect(() => {
    document.title = "Checkout | Nexphoria";
    let metaRobots = document.head.querySelector<HTMLMetaElement>('meta[name="robots"]');
    if (!metaRobots) {
      metaRobots = document.createElement("meta");
      metaRobots.setAttribute("name", "robots");
      document.head.appendChild(metaRobots);
    }
    metaRobots.setAttribute("content", "noindex, nofollow");
    return () => {
      metaRobots?.setAttribute("content", "index, follow, max-image-preview:large");
    };
  }, []);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    mode: "onTouched",
    defaultValues: {
      name: "",
      email: "",
      age: 30,
      cardiacHistory: false,
      diabetic: false,
      hormonalRx: false,
      allergies: "",
      shippingAddress: "",
      city: "",
      state: "",
      zip: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (values: FormValues) => {
      return apiRequest<{ ok: boolean; id: number; message: string }>("/api/checkout", {
        method: "POST",
        body: JSON.stringify({
          ...values,
          age: Number(values.age),
          state: values.state.toUpperCase(),
          allergies: values.allergies || null,
          cartJson: JSON.stringify(lines.map((l) => ({ slug: l.slug, type: l.type, qty: l.qty }))),
          subtotal,
        }),
      });
    },
    onSuccess: (data) => {
      setSubmittedId(data.id);
      track("checkout_submitted", { id: data.id });
      queryClient.invalidateQueries({ queryKey: ["/api/checkout"] });
      clear();
      toast({ title: "Submitted for physician review", description: "We'll be in touch upon review." });
    },
    onError: (err: Error) => {
      toast({ title: "Submission failed", description: err.message, variant: "destructive" });
    },
  });

  const enteredState = form.watch("state") || "";
  const glp1Blocked = cartHasGLP1 && enteredState.length === 2 && isGLP1Excluded(enteredState);

  const onSubmit = (values: FormValues) => {
    if (glp1Blocked) return; // hard stop — server will also validate
    mutation.mutate(values);
  };

  /* Advance the step indicator after validating the current step's fields */
  const goNext = async () => {
    let fields: (keyof FormValues)[] = [];
    if (step === 0) fields = ["name", "email", "age", "shippingAddress", "city", "state", "zip"];
    const ok = fields.length ? await form.trigger(fields) : true;
    if (ok && step === 0 && glp1Blocked) return; // notice below the address explains why
    if (ok) setStep((s) => { const n = Math.min(s + 1, 2); track("checkout_step", { step: n }); return n; });
  };

  /* ─── Success screen (intake-complete confirmation) ─── */
  if (submittedId !== null) {
    return (
      <SiteLayout variant="gate">
        <div style={{ background: "var(--nx-bg)", minHeight: "100vh", paddingTop: 96 }}>
          <div className="nx-container py-16 md:py-24 max-w-2xl">
            <div className="text-center">
              <div className="inline-flex p-5 rounded-full mb-6" style={{ background: "var(--nx-bg-cream)", color: "var(--nx-success)" }}>
                <Check size={32} strokeWidth={1.5} />
              </div>
              <div className="text-[11px] uppercase tracking-[0.22em] mb-3" style={{ fontFamily: FONT, color: "var(--nx-amber)" }}>
                Submission #{submittedId.toString().padStart(5, "0")}
              </div>
              <h1
                className="text-4xl md:text-5xl mb-5"
                style={{ fontFamily: FONT, color: "var(--nx-fg)", fontWeight: 600, letterSpacing: "-0.02em" }}
              >
                Intake complete
              </h1>
              <p
                className="text-base mb-8 max-w-lg mx-auto"
                style={{ fontFamily: FONT, color: "var(--nx-fg-graphite)", lineHeight: 1.7 }}
              >
                Your cart and intake are now with our physician team. You'll receive an email by a licensed physician
                with either an approval and final payment link, or a request for additional information.
              </p>

              {/* Progress: complete */}
              <div className="max-w-md mx-auto mb-8">
                <StepBar current={3} labels={[...STEPS, "Physician"]} />
              </div>

              <div
                className="text-left p-6 mb-8 max-w-md mx-auto"
                style={{ background: "var(--nx-bg-cream)", border: "1px solid var(--nx-border)", borderRadius: "var(--nx-r-md)" }}
              >
                <div className="text-[10px] uppercase tracking-[0.2em] mb-3" style={{ fontFamily: FONT, color: "var(--nx-amber)" }}>
                  What happens next
                </div>
                <ul className="space-y-2.5 text-sm list-none p-0" style={{ fontFamily: FONT, color: "var(--nx-fg-graphite)", lineHeight: 1.6 }}>
                  {[
                    "Physician reviews intake and cart",
                    "You receive a secure approval link by email",
                    "Bloodwork ordered to your nearest partner laboratory",
                    "Compounded shipment sent in cold-chain packaging",
                  ].map((t, i) => (
                    <li key={i} className="flex gap-2.5 items-start">
                      <span style={{ color: "var(--nx-amber)", fontWeight: 600, fontSize: 11, marginTop: 2 }}>{String(i + 1).padStart(2, "0")}</span>
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <Link asChild href="/">
                <a
                  className="inline-flex items-center gap-2 px-6 py-3 transition-colors hover:bg-black/5"
                  style={{ color: "var(--nx-fg)", fontFamily: FONT, fontSize: "0.875rem", border: "1px solid var(--nx-border)", borderRadius: "var(--nx-r-md)" }}
                  data-testid="link-back-home"
                >
                  <ArrowLeft size={14} /> Back to Nexphoria
                </a>
              </Link>
            </div>
          </div>
        </div>
      </SiteLayout>
    );
  }

  /* ─── Empty cart guard ─── */
  if (lines.length === 0) {
    return (
      <SiteLayout variant="gate">
        <div style={{ background: "var(--nx-bg)", minHeight: "100vh", paddingTop: 96 }}>
          <div className="nx-container py-20 max-w-md text-center">
            <h1 className="text-3xl mb-4" style={{ fontFamily: FONT, color: "var(--nx-fg)", fontWeight: 600 }}>
              Your cart is empty
            </h1>
            <p className="text-base mb-6" style={{ fontFamily: FONT, color: "var(--nx-fg-graphite)" }}>
              Add a peptide or curated stack before checkout.
            </p>
            <Link asChild href="/stacks">
              <a
                className="inline-block px-6 py-3"
                style={{ background: "var(--nx-fg)", color: "var(--nx-bg)", fontFamily: FONT, fontSize: "0.875rem", borderRadius: "var(--nx-r-md)" }}
                data-testid="link-empty-checkout-stacks"
              >
                Browse stacks
              </a>
            </Link>
          </div>
        </div>
      </SiteLayout>
    );
  }

  /* ─── Form ─── */
  const errors = form.formState.errors;

  return (
    <SiteLayout variant="gate">
      <div style={{ background: "var(--nx-bg)", minHeight: "100vh", paddingTop: 96 }}>
        <div className="nx-container nx-section-y">
          {/* Breadcrumb */}
          <Link asChild href="/cart">
            <a
              className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.15em] mb-6 hover:underline"
              style={{ fontFamily: FONT, color: "var(--nx-fg-graphite)" }}
              data-testid="link-back-to-cart"
            >
              <ArrowLeft size={12} /> Back to cart
            </a>
          </Link>

          {/* Header + progress indicator */}
          <div className="mb-8 max-w-2xl">
            <div className="text-[11px] uppercase tracking-[0.22em] mb-3" style={{ fontFamily: FONT, color: "var(--nx-amber)" }}>
              Checkout
            </div>
            <h1
              className="text-4xl md:text-5xl mb-3"
              style={{ fontFamily: FONT, color: "var(--nx-fg)", fontWeight: 600, letterSpacing: "-0.02em" }}
            >
              Submit for physician review
            </h1>
            <p className="text-base" style={{ fontFamily: FONT, color: "var(--nx-fg-graphite)", lineHeight: 1.65 }}>
              Every order is reviewed by a licensed physician before it ships. No card is charged today.
            </p>
          </div>

          <div className="mb-10 max-w-xl">
            <StepBar current={step} labels={[...STEPS]} onStep={(i) => i < step && setStep(i)} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-10 lg:gap-16 items-start">
            {/* Form */}
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">
              {/* STEP 1 — ADDRESS + about you */}
              {step === 0 && (
                <>
                  <Section title="Where should we ship?" eyebrow="Step 01 · Address">
                    <p className="text-sm mb-5 max-w-xl" style={{ fontFamily: FONT, color: "var(--nx-fg-graphite)", lineHeight: 1.6 }}>
                      Cold-chain shipped overnight after physician approval. We ship to all US states except LA, AK, and HI.
                    </p>
                    <Row>
                      <Field label="Full name" error={errors.name?.message}>
                        <input {...form.register("name")} type="text" className="nx-input" data-testid="input-name" autoComplete="name" />
                      </Field>
                      <Field label="Email" error={errors.email?.message}>
                        <input {...form.register("email")} type="email" className="nx-input" data-testid="input-email" autoComplete="email" />
                      </Field>
                    </Row>
                    <Field label="Street address" error={errors.shippingAddress?.message}>
                      <input {...form.register("shippingAddress")} type="text" className="nx-input" data-testid="input-address" autoComplete="street-address" />
                    </Field>
                    <div className="grid grid-cols-2 md:grid-cols-[1fr_120px_140px] gap-4 mt-4">
                      <Field label="City" error={errors.city?.message}>
                        <input {...form.register("city")} type="text" className="nx-input" data-testid="input-city" autoComplete="address-level2" />
                      </Field>
                      <Field label="State" error={errors.state?.message}>
                        <input {...form.register("state")} type="text" maxLength={2} placeholder="NY" className="nx-input uppercase" data-testid="input-state" autoComplete="address-level1" />
                      </Field>
                      <Field label="ZIP" error={errors.zip?.message}>
                        <input {...form.register("zip")} type="text" className="nx-input" data-testid="input-zip" autoComplete="postal-code" />
                      </Field>
                    </div>
                    {glp1Blocked && (
                      <div
                        role="alert"
                        data-testid="notice-glp1-state"
                        className="mt-4 p-4 rounded-lg"
                        style={{ background: "var(--nx-bg-cream)", border: "1px solid var(--nx-border)", fontFamily: FONT }}
                      >
                        <div className="text-sm font-semibold mb-1" style={{ color: "var(--nx-fg)" }}>
                          Not available in {enteredState.toUpperCase()}
                        </div>
                        <p className="text-sm" style={{ color: "var(--nx-fg-graphite)", lineHeight: 1.6 }}>
                          One or more items in your order involve GLP-1 therapy, which we do not currently
                          offer in your state. Remove those items to continue, or{" "}
                          <Link href="/contact" style={{ color: "var(--nx-cobalt)", textDecoration: "underline" }}>
                            contact our clinical team
                          </Link>{" "}
                          about alternatives.
                        </p>
                      </div>
                    )}
                    <div className="mt-4">
                      <Field label="Age" error={errors.age?.message}>
                        <input {...form.register("age", { valueAsNumber: true })} type="number" min={18} max={110} className="nx-input max-w-[120px]" data-testid="input-age" />
                      </Field>
                    </div>
                  </Section>

                  <StepNav>
                    <PrimaryBtn onClick={goNext} testId="button-step-payment">Continue to payment →</PrimaryBtn>
                  </StepNav>
                </>
              )}

              {/* STEP 2 — BILLING (deferred: no card is collected until a physician approves) */}
              {step === 1 && (
                <>
                  <Section title="Billing" eyebrow="Step 02 · Billing">
                    <div
                      className="flex items-start gap-3 p-4 mb-6"
                      style={{ background: "var(--nx-bg-cream)", border: "1px solid var(--nx-border)", borderRadius: "var(--nx-r-md)" }}
                      data-testid="notice-deferred-billing"
                    >
                      <Stethoscope size={16} style={{ color: "var(--nx-success)", flexShrink: 0, marginTop: 2 }} />
                      <div>
                        <p className="text-sm font-semibold mb-1" style={{ fontFamily: FONT, color: "var(--nx-fg)" }}>
                          Physician review comes first — no card is collected today.
                        </p>
                        <p className="text-sm" style={{ fontFamily: FONT, color: "var(--nx-fg-graphite)", lineHeight: 1.6 }}>
                          When you submit, your intake and cart go to a US-licensed physician. If your protocol is
                          approved, you'll receive a secure payment link from Bask Health, our telehealth billing
                          partner, to complete checkout. You are never charged before a physician approves.
                        </p>
                      </div>
                    </div>

                    <p className="text-[10px] uppercase tracking-[0.2em] mb-3" style={{ fontFamily: FONT, color: "var(--nx-amber)" }}>
                      How billing works
                    </p>
                    <ol className="list-none p-0 space-y-3">
                      {[
                        "Submit your intake and cart for physician review — free, no card required.",
                        "A US-licensed physician reviews your protocol after you submit.",
                        "On approval, a secure payment link is emailed to you.",
                        "You complete payment through our PCI-compliant billing partner; your order then ships cold-chain.",
                      ].map((t, i) => (
                        <li
                          key={i}
                          className="flex gap-3 items-start text-sm"
                          style={{ fontFamily: FONT, color: "var(--nx-fg-graphite)", lineHeight: 1.6 }}
                        >
                          <span
                            className="inline-flex items-center justify-center flex-shrink-0"
                            style={{ width: 22, height: 22, borderRadius: 999, background: "var(--nx-fg)", color: "var(--nx-bg)", fontSize: 11, fontWeight: 600, marginTop: 1 }}
                          >
                            {i + 1}
                          </span>
                          <span>{t}</span>
                        </li>
                      ))}
                    </ol>
                  </Section>

                  <StepNav>
                    <GhostBtn onClick={() => setStep(0)} testId="button-step-back-address">← Back</GhostBtn>
                    <PrimaryBtn onClick={() => setStep(2)} testId="button-step-review">Continue to review →</PrimaryBtn>
                  </StepNav>
                </>
              )}

              {/* STEP 3 — REVIEW (health screening + confirm) */}
              {step === 2 && (
                <>
                  <Section title="Health screening" eyebrow="Step 03 · Review">
                    <p className="text-sm mb-5 max-w-xl" style={{ fontFamily: FONT, color: "var(--nx-fg-graphite)", lineHeight: 1.6 }}>
                      Answer honestly — this informs physician approval and is covered by HIPAA-aligned data handling.
                    </p>
                    <div className="space-y-3">
                      <YesNoField
                        label="History of cardiac events, stroke, or untreated hypertension"
                        helper="Includes prior MI, stent, arrhythmia under treatment, or BP > 160/100 untreated."
                        {...form.register("cardiacHistory")}
                        testId="checkbox-cardiac"
                      />
                      <YesNoField
                        label="Type 1 or 2 diabetes (currently treated)"
                        helper="Includes insulin, metformin, GLP-1 agonist, or SGLT2 inhibitor."
                        {...form.register("diabetic")}
                        testId="checkbox-diabetic"
                      />
                      <YesNoField
                        label="Currently taking hormonal medication"
                        helper="HRT, TRT, oral contraceptives, thyroid hormone, or active oncology Rx."
                        {...form.register("hormonalRx")}
                        testId="checkbox-hormonal"
                      />
                    </div>
                    <div className="mt-5">
                      <Field label="Known allergies" helper="Optional — preservatives, latex, peptide-class reactions, or N/A" error={errors.allergies?.message}>
                        <input {...form.register("allergies")} type="text" placeholder="None known" className="nx-input" data-testid="input-allergies" />
                      </Field>
                    </div>
                  </Section>

                  {/* Order recap */}
                  <div className="pt-2">
                    <p className="text-[10px] uppercase tracking-[0.2em] mb-3" style={{ fontFamily: FONT, color: "var(--nx-amber)" }}>Confirm your order</p>
                    <div style={{ border: "1px solid var(--nx-border)", borderRadius: "var(--nx-r-md)", overflow: "hidden" }}>
                      {lines.map((line) => (
                        <div
                          key={`${line.type}-${line.slug}`}
                          className="flex items-center justify-between px-4 py-3"
                          style={{ borderBottom: "1px solid var(--nx-border)", background: "var(--nx-ceramic)" }}
                        >
                          <span className="text-sm" style={{ fontFamily: FONT, color: "var(--nx-fg)" }}>
                            {line.name} <span style={{ color: "var(--nx-fg-muted)" }}>· {line.cadenceLabel} · qty {line.qty}</span>
                          </span>
                          <span className="text-sm" style={{ fontFamily: FONT, color: "var(--nx-fg)", fontWeight: 500 }}>{formatUSD(line.lineTotal)}</span>
                        </div>
                      ))}
                      <div className="flex items-center justify-between px-4 py-3" style={{ background: "var(--nx-bg-cream)" }}>
                        <span className="text-sm uppercase tracking-[0.12em]" style={{ fontFamily: FONT, color: "var(--nx-fg)" }}>Total · monthly</span>
                        <span className="text-lg" style={{ fontFamily: FONT, color: "var(--nx-fg)", fontWeight: 600 }}>{formatUSD(subtotal)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Submit */}
                  <div className="pt-2">
                    <div className="flex flex-wrap gap-3">
                      <GhostBtn onClick={() => setStep(1)} testId="button-step-back-payment">← Back</GhostBtn>
                      <button
                        type="submit"
                        disabled={mutation.isPending}
                        className="nx-cta-cobalt disabled:opacity-60"
                        data-testid="button-submit-checkout"
                      >
                        {mutation.isPending ? "Submitting…" : "Submit for physician approval →"}
                      </button>
                    </div>
                    <p className="text-xs mt-3 max-w-md" style={{ fontFamily: FONT, color: "var(--nx-fg-graphite)" }}>
                      By submitting, you consent to physician review and HIPAA-aligned data handling. No payment is collected today — final invoice is sent after approval.
                    </p>
                    {Object.keys(errors).length > 0 ? (
                      <button
                        type="button"
                        onClick={() => setStep(0)}
                        className="mt-4 block w-full text-left p-3 text-sm"
                        style={{ background: "#E5EFFB", border: "1px solid #ABC4E2", color: "#1A4D8B", fontFamily: FONT, borderRadius: "var(--nx-r-md)" }}
                        data-testid="text-form-errors"
                      >
                        Some address fields need attention. Tap to review Step 01.
                      </button>
                    ) : null}
                  </div>
                </>
              )}
            </form>

            {/* Order summary — sticky right rail */}
            <aside
              className="lg:sticky lg:top-24 p-7"
              style={{ background: "var(--nx-bg-cream)", border: "1px solid var(--nx-border)", borderRadius: "var(--nx-r-lg)" }}
            >
              <Reveal delay={80}>
              <div
                className="text-[10px] uppercase tracking-[0.2em] mb-4 pb-3"
                style={{ fontFamily: FONT, color: "var(--nx-amber)", borderBottom: "1px solid var(--nx-border)" }}
              >
                Your order · {itemCount}
              </div>

              <ul className="list-none p-0 space-y-3 mb-4">
                {lines.map((line) => {
                  const stack = line.type === "stack" ? stacks.find((s) => s.slug === line.slug) : null;
                  return (
                    <li key={`${line.type}-${line.slug}`} className="pb-3" style={{ borderBottom: "1px solid var(--nx-border)" }}>
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <div className="text-[9px] uppercase tracking-[0.2em] mb-0.5" style={{ fontFamily: FONT, color: line.type === "stack" ? "var(--nx-amber)" : "var(--nx-fg-graphite)" }}>
                            {line.type === "stack" ? "Stack" : "Single"} · qty {line.qty} · {line.cadenceLabel}
                          </div>
                          <div className="text-sm leading-tight" style={{ fontFamily: FONT, color: "var(--nx-fg)", fontWeight: 500 }}>
                            {line.name}
                          </div>
                          {stack ? (
                            <div className="text-[10px] mt-0.5" style={{ fontFamily: FONT, color: "var(--nx-fg-graphite)", letterSpacing: "0.05em" }}>
                              {stack.peptides.length} peptides
                            </div>
                          ) : null}
                          {line.savings && line.savings > 0 ? (
                            <div className="text-[10px] mt-1" style={{ fontFamily: FONT, color: "var(--nx-amber)", letterSpacing: "0.05em" }}>
                              −{formatUSD(line.savings)} saved
                            </div>
                          ) : null}
                        </div>
                        <div className="text-sm flex-shrink-0" style={{ fontFamily: FONT, color: "var(--nx-fg)" }}>
                          {formatUSD(line.lineTotal)}
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>

              {totalSavings > 0 ? (
                <div className="flex items-baseline justify-between py-1.5">
                  <span className="text-xs uppercase tracking-[0.15em]" style={{ fontFamily: FONT, color: "var(--nx-amber)" }}>Stack savings</span>
                  <span className="text-sm" style={{ fontFamily: FONT, color: "var(--nx-amber)" }}>−{formatUSD(totalSavings)}</span>
                </div>
              ) : null}

              <div className="flex items-baseline justify-between mt-3 pt-3" style={{ borderTop: "1px solid var(--nx-border)" }}>
                <span className="text-sm uppercase tracking-[0.12em]" style={{ fontFamily: FONT, color: "var(--nx-fg)" }}>Total · monthly</span>
                <span className="text-2xl" style={{ fontFamily: FONT, color: "var(--nx-fg)", fontWeight: 600 }} data-testid="text-checkout-total">
                  {formatUSD(subtotal)}
                </span>
              </div>

              {/* Trust marks */}
              <div className="mt-6 pt-6 space-y-3" style={{ borderTop: "1px solid var(--nx-border)" }}>
                <TrustRow icon={<Stethoscope size={14} />} text="US-licensed physician review on every order" />
                <TrustRow icon={<Shield size={14} />} text="HIPAA-aligned data handling · 256-bit encryption" />
                <TrustRow icon={<Truck size={14} />} text="Cold-chain shipping · third-party COA on every batch" />
                <TrustRow icon={<Check size={14} />} text="The consultation carries no charge. You pay only if prescribed." />
                <TrustRow icon={<Shield size={14} />} text="503A-licensed US compounding pharmacy" />
              </div>

              <div className="mt-5 pt-5 text-[11px]" style={{ borderTop: "1px solid var(--nx-border)", fontFamily: FONT, color: "var(--nx-fg-graphite)", lineHeight: 1.6 }}>
                <p>No payment collected today. Final pricing confirmed after physician approval; our billing partner handles all payment processing.</p>
              </div>
              </Reveal>
            </aside>
          </div>
        </div>
      </div>
    </SiteLayout>
  );
}

/* ─── UI helpers ─── */

function StepBar({ current, labels, onStep }: { current: number; labels: readonly string[]; onStep?: (i: number) => void }) {
  return (
    <div className="flex items-center">
      {labels.map((label, i) => {
        const done = i < current;
        const active = i === current;
        const clickable = !!onStep && done;
        return (
          <div key={label} className="flex items-center" style={{ flex: i === labels.length - 1 ? "0 0 auto" : "1 1 auto" }}>
            <button
              type="button"
              onClick={() => clickable && onStep?.(i)}
              className="flex items-center gap-2"
              style={{ cursor: clickable ? "pointer" : "default", background: "none", border: "none", padding: 0 }}
              data-testid={`button-step-indicator-${i}`}
              aria-current={active ? "step" : undefined}
            >
              <span
                className="inline-flex items-center justify-center text-[11px]"
                style={{
                  width: 26,
                  height: 26,
                  borderRadius: 999,
                  fontFamily: FONT,
                  fontWeight: 600,
                  background: done ? "var(--nx-amber)" : active ? "var(--nx-fg)" : "transparent",
                  color: done || active ? "var(--nx-bg)" : "var(--nx-fg-muted)",
                  border: done || active ? "none" : "1px solid var(--nx-border)",
                  flexShrink: 0,
                }}
              >
                {done ? <Check size={13} /> : i + 1}
              </span>
              <span
                className="text-[11px] uppercase tracking-[0.14em] hidden sm:inline"
                style={{ fontFamily: FONT, color: active ? "var(--nx-fg)" : done ? "var(--nx-fg-graphite)" : "var(--nx-fg-muted)", fontWeight: active ? 600 : 500 }}
              >
                {label}
              </span>
            </button>
            {i < labels.length - 1 && (
              <span
                className="mx-3"
                style={{ flex: 1, height: 1, minWidth: 20, background: done ? "var(--nx-amber)" : "var(--nx-border)" }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

function StepNav({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-wrap gap-3 pt-2">{children}</div>;
}

function PrimaryBtn({ children, onClick, testId }: { children: React.ReactNode; onClick: () => void; testId: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="nx-cta-cobalt"
      data-testid={testId}
    >
      {children}
    </button>
  );
}

function GhostBtn({ children, onClick, testId }: { children: React.ReactNode; onClick: () => void; testId: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="px-6 py-4 transition-colors hover:bg-black/5"
      style={{ color: "var(--nx-fg)", fontFamily: FONT, fontSize: "0.9375rem", fontWeight: 500, border: "1px solid var(--nx-border)", borderRadius: "var(--nx-r-md)" }}
      data-testid={testId}
    >
      {children}
    </button>
  );
}

function Section({ title, eyebrow, children }: { title: string; eyebrow: string; children: React.ReactNode }) {
  return (
    <Reveal>
      <section>
        <div className="text-[10px] uppercase tracking-[0.22em] mb-1" style={{ fontFamily: FONT, color: "var(--nx-amber)" }}>
          {eyebrow}
        </div>
        <h2 className="text-2xl mb-5" style={{ fontFamily: FONT, color: "var(--nx-fg)", fontWeight: 600, letterSpacing: "-0.01em" }}>
          {title}
        </h2>
        {children}
      </section>
    </Reveal>
  );
}

function Row({ children }: { children: React.ReactNode }) {
  return <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-4">{children}</div>;
}

function Field({ label, helper, error, children }: { label: string; helper?: string; error?: string; children: React.ReactNode }) {
  return (
    <label className={error ? "block nx-field-error" : "block"}>
      <span className="block text-[11px] uppercase tracking-[0.15em] mb-1.5" style={{ fontFamily: FONT, color: "var(--nx-fg-graphite)" }}>
        {label}
      </span>
      {helper ? (
        <span className="block text-xs mb-2" style={{ fontFamily: FONT, color: "var(--nx-fg-graphite)" }}>
          {helper}
        </span>
      ) : null}
      {children}
      {error ? (
        <span role="alert" className="block text-xs mt-1.5" style={{ fontFamily: FONT, color: "var(--nx-danger)", fontWeight: 600 }}>
          {error}
        </span>
      ) : null}
    </label>
  );
}

// React Hook Form `register` returns a non-React ref; spread it normally
const YesNoField = ({
  label,
  helper,
  testId,
  ...rest
}: {
  label: string;
  helper?: string;
  testId: string;
} & React.InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <label className="block p-4 cursor-pointer transition-colors hover:bg-black/5" style={{ background: "var(--nx-ceramic)", border: "1px solid var(--nx-border)", borderRadius: "var(--nx-r-md)" }}>
      <div className="flex items-start gap-3">
        <input type="checkbox" className="mt-1 accent-[var(--nx-fg)]" data-testid={testId} {...rest} />
        <div className="flex-1">
          <div className="text-sm" style={{ fontFamily: FONT, color: "var(--nx-fg)", fontWeight: 500 }}>
            {label}
          </div>
          {helper ? (
            <div className="text-xs mt-1" style={{ fontFamily: FONT, color: "var(--nx-fg-graphite)", lineHeight: 1.5 }}>
              {helper}
            </div>
          ) : null}
        </div>
      </div>
    </label>
  );
};

function TrustRow({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="flex items-start gap-2.5 text-xs" style={{ fontFamily: FONT, color: "var(--nx-fg-graphite)", lineHeight: 1.5 }}>
      <span style={{ color: "var(--nx-amber)", marginTop: 1 }}>{icon}</span>
      <span>{text}</span>
    </div>
  );
}
