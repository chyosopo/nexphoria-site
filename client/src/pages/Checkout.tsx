import { useState } from "react";
import { Link } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { ArrowLeft, Check, Shield, Stethoscope, Truck } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { useCart, formatUSD } from "@/contexts/CartProvider";
import { stacks } from "@/data/stacks";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

/* Local form schema — server validates on submit via insertCheckoutSchema */
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

export default function Checkout() {
  const { lines, subtotal, totalSavings, itemCount, clear } = useCart();
  const { toast } = useToast();
  const [submittedId, setSubmittedId] = useState<number | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
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
      queryClient.invalidateQueries({ queryKey: ["/api/checkout"] });
      clear();
      toast({ title: "Submitted for physician review", description: "We'll be in touch in 24–48 hours." });
    },
    onError: (err: Error) => {
      toast({ title: "Submission failed", description: err.message, variant: "destructive" });
    },
  });

  const onSubmit = (values: FormValues) => mutation.mutate(values);

  /* ─── Success screen ─── */
  if (submittedId !== null) {
    return (
      <SiteLayout variant="gate">
        <div style={{ background: "var(--nx-bg)", minHeight: "100vh", paddingTop: 96 }}>
          <div className="nx-container py-16 md:py-24 max-w-2xl">
            <div className="text-center">
              <div
                className="inline-flex p-5 rounded-full mb-6"
                style={{ background: "var(--nx-bg-cream)", color: "#8B5A2B" }}
              >
                <Check size={32} strokeWidth={1.5} />
              </div>
              <div
                className="text-[11px] uppercase tracking-[0.22em] mb-3"
                style={{ fontFamily: "'DM Mono', monospace", color: "#8B5A2B" }}
              >
                Submission #{submittedId.toString().padStart(5, "0")}
              </div>
              <h1
                className="text-4xl md:text-5xl mb-5"
                style={{ fontFamily: "'Fraunces', serif", color: "#0A0A0A", fontWeight: 500 }}
              >
                Submitted for <em style={{ fontStyle: "italic" }}>physician review</em>
              </h1>
              <p
                className="text-base mb-8 max-w-lg mx-auto"
                style={{ fontFamily: "'Inter', sans-serif", color: "#4A4A4A", lineHeight: 1.7 }}
              >
                Your cart and intake are now with our physician team. You'll receive an email within 24–48 hours
                with either an approval (and final payment link) or a request for additional information.
              </p>
              <div
                className="text-left p-6 mb-8 max-w-md mx-auto"
                style={{ background: "var(--nx-bg-cream)", border: "1px solid var(--nx-border)" }}
              >
                <div
                  className="text-[10px] uppercase tracking-[0.2em] mb-3"
                  style={{ fontFamily: "'DM Mono', monospace", color: "#8B5A2B" }}
                >
                  What happens next
                </div>
                <ul
                  className="space-y-2 text-sm list-none p-0"
                  style={{ fontFamily: "'Inter', sans-serif", color: "#4A4A4A", lineHeight: 1.6 }}
                >
                  <li>→ Physician reviews intake + cart (24–48 hours)</li>
                  <li>→ You'll receive a secure approval link by email</li>
                  <li>→ Bloodwork ordered to your nearest LabCorp</li>
                  <li>→ Compounded shipment in cold-chain packaging</li>
                </ul>
              </div>
              <Link href="/women">
                <a
                  className="inline-flex items-center gap-2 px-6 py-3 transition-colors hover:bg-black/5"
                  style={{
                    color: "#0A0A0A",
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.875rem",
                    border: "1px solid var(--nx-border)",
                  }}
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
            <h1
              className="text-3xl mb-4"
              style={{ fontFamily: "'Fraunces', serif", color: "#0A0A0A", fontWeight: 500 }}
            >
              Your cart is empty
            </h1>
            <p
              className="text-base mb-6"
              style={{ fontFamily: "'Inter', sans-serif", color: "#4A4A4A" }}
            >
              Add a peptide or curated stack before checkout.
            </p>
            <Link href="/stacks">
              <a
                className="inline-block px-6 py-3"
                style={{
                  background: "#0A0A0A",
                  color: "#FAF7F0",
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.875rem",
                }}
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
        <div className="nx-container py-12 md:py-16">
          {/* Breadcrumb */}
          <Link href="/cart">
            <a
              className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.15em] mb-6 hover:underline"
              style={{ fontFamily: "'DM Mono', monospace", color: "#6B6B6B" }}
              data-testid="link-back-to-cart"
            >
              <ArrowLeft size={12} /> Back to cart
            </a>
          </Link>

          {/* Header */}
          <div className="mb-10 max-w-2xl">
            <div
              className="text-[11px] uppercase tracking-[0.22em] mb-3"
              style={{ fontFamily: "'DM Mono', monospace", color: "#8B5A2B" }}
            >
              Checkout · Intake
            </div>
            <h1
              className="text-4xl md:text-5xl mb-3"
              style={{ fontFamily: "'Fraunces', serif", color: "#0A0A0A", fontWeight: 500 }}
            >
              Submit for <em style={{ fontStyle: "italic" }}>physician review</em>
            </h1>
            <p
              className="text-base"
              style={{ fontFamily: "'Inter', sans-serif", color: "#4A4A4A", lineHeight: 1.65 }}
            >
              Every order is reviewed by a licensed physician before it ships. The questions below help us flag
              contraindications and recommend monitoring. No card is charged today.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-10 lg:gap-16 items-start">
            {/* Form */}
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">
              {/* About you */}
              <Section title="About you" eyebrow="Step 01">
                <Row>
                  <Field label="Full name" error={errors.name?.message}>
                    <input
                      {...form.register("name")}
                      type="text"
                      className="nx-input"
                      data-testid="input-name"
                      autoComplete="name"
                    />
                  </Field>
                  <Field label="Email" error={errors.email?.message}>
                    <input
                      {...form.register("email")}
                      type="email"
                      className="nx-input"
                      data-testid="input-email"
                      autoComplete="email"
                    />
                  </Field>
                </Row>
                <Row>
                  <Field label="Age" error={errors.age?.message}>
                    <input
                      {...form.register("age", { valueAsNumber: true })}
                      type="number"
                      min={18}
                      max={110}
                      className="nx-input max-w-[120px]"
                      data-testid="input-age"
                    />
                  </Field>
                </Row>
              </Section>

              {/* Health screening */}
              <Section title="Health screening" eyebrow="Step 02">
                <p
                  className="text-sm mb-5 max-w-xl"
                  style={{ fontFamily: "'Inter', sans-serif", color: "#6B6B6B", lineHeight: 1.6 }}
                >
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
                  <Field
                    label="Known allergies"
                    helper="Optional — preservatives, latex, peptide-class reactions, or N/A"
                    error={errors.allergies?.message}
                  >
                    <input
                      {...form.register("allergies")}
                      type="text"
                      placeholder="None known"
                      className="nx-input"
                      data-testid="input-allergies"
                    />
                  </Field>
                </div>
              </Section>

              {/* Shipping */}
              <Section title="Shipping" eyebrow="Step 03">
                <p
                  className="text-sm mb-5 max-w-xl"
                  style={{ fontFamily: "'Inter', sans-serif", color: "#6B6B6B", lineHeight: 1.6 }}
                >
                  Cold-chain shipped overnight after physician approval. We currently ship to all US states except
                  LA, AK, and HI.
                </p>
                <Field label="Street address" error={errors.shippingAddress?.message}>
                  <input
                    {...form.register("shippingAddress")}
                    type="text"
                    className="nx-input"
                    data-testid="input-address"
                    autoComplete="street-address"
                  />
                </Field>
                <div className="grid grid-cols-2 md:grid-cols-[1fr_120px_140px] gap-4 mt-4">
                  <Field label="City" error={errors.city?.message}>
                    <input
                      {...form.register("city")}
                      type="text"
                      className="nx-input"
                      data-testid="input-city"
                      autoComplete="address-level2"
                    />
                  </Field>
                  <Field label="State" error={errors.state?.message}>
                    <input
                      {...form.register("state")}
                      type="text"
                      maxLength={2}
                      placeholder="NY"
                      className="nx-input uppercase"
                      data-testid="input-state"
                      autoComplete="address-level1"
                    />
                  </Field>
                  <Field label="ZIP" error={errors.zip?.message}>
                    <input
                      {...form.register("zip")}
                      type="text"
                      className="nx-input"
                      data-testid="input-zip"
                      autoComplete="postal-code"
                    />
                  </Field>
                </div>
              </Section>

              {/* Submit */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={mutation.isPending}
                  className="w-full md:w-auto px-8 py-4 transition-all disabled:opacity-60"
                  style={{
                    background: "#0A0A0A",
                    color: "#FAF7F0",
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.9375rem",
                    fontWeight: 500,
                    letterSpacing: "0.02em",
                  }}
                  data-testid="button-submit-checkout"
                >
                  {mutation.isPending ? "Submitting…" : "Submit for physician approval →"}
                </button>
                <p
                  className="text-xs mt-3 max-w-md"
                  style={{ fontFamily: "'Inter', sans-serif", color: "#6B6B6B" }}
                >
                  By submitting, you consent to physician review and HIPAA-aligned data handling. No payment is
                  collected today — final invoice is sent after approval.
                </p>
                {Object.keys(errors).length > 0 ? (
                  <div
                    className="mt-4 p-3 text-sm"
                    style={{
                      background: "#FBEAE5",
                      border: "1px solid #E2B6AB",
                      color: "#8B2E1A",
                      fontFamily: "'Inter', sans-serif",
                    }}
                    data-testid="text-form-errors"
                  >
                    Please review the highlighted fields above.
                  </div>
                ) : null}
              </div>
            </form>

            {/* Order summary */}
            <aside
              className="lg:sticky lg:top-24 p-7"
              style={{ background: "var(--nx-bg-cream)", border: "1px solid var(--nx-border)" }}
            >
              <div
                className="text-[10px] uppercase tracking-[0.2em] mb-4 pb-3"
                style={{
                  fontFamily: "'DM Mono', monospace",
                  color: "#8B5A2B",
                  borderBottom: "1px solid var(--nx-border)",
                }}
              >
                Your order · {itemCount}
              </div>

              <ul className="list-none p-0 space-y-3 mb-4">
                {lines.map((line) => {
                  const stack = line.type === "stack" ? stacks.find((s) => s.slug === line.slug) : null;
                  return (
                    <li
                      key={`${line.type}-${line.slug}`}
                      className="pb-3"
                      style={{ borderBottom: "1px solid var(--nx-border)" }}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <div
                            className="text-[9px] uppercase tracking-[0.2em] mb-0.5"
                            style={{
                              fontFamily: "'DM Mono', monospace",
                              color: line.type === "stack" ? "#8B5A2B" : "#6B6B6B",
                            }}
                          >
                            {line.type === "stack" ? "Stack" : "Single"} · qty {line.qty} · {line.cadenceLabel}
                          </div>
                          <div
                            className="text-sm leading-tight"
                            style={{
                              fontFamily: "'Inter', sans-serif",
                              color: "#0A0A0A",
                              fontWeight: 500,
                            }}
                          >
                            {line.name}
                          </div>
                          {stack ? (
                            <div
                              className="text-[10px] mt-0.5"
                              style={{
                                fontFamily: "'DM Mono', monospace",
                                color: "#6B6B6B",
                                letterSpacing: "0.05em",
                              }}
                            >
                              {stack.peptides.length} peptides
                            </div>
                          ) : null}
                          {line.savings && line.savings > 0 ? (
                            <div
                              className="text-[10px] mt-1"
                              style={{
                                fontFamily: "'DM Mono', monospace",
                                color: "#8B5A2B",
                                letterSpacing: "0.05em",
                              }}
                            >
                              −{formatUSD(line.savings)} saved
                            </div>
                          ) : null}
                        </div>
                        <div
                          className="text-sm flex-shrink-0"
                          style={{ fontFamily: "'DM Mono', monospace", color: "#0A0A0A" }}
                        >
                          {formatUSD(line.lineTotal)}
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>

              {totalSavings > 0 ? (
                <div className="flex items-baseline justify-between py-1.5">
                  <span
                    className="text-xs uppercase tracking-[0.15em]"
                    style={{ fontFamily: "'DM Mono', monospace", color: "#8B5A2B" }}
                  >
                    Stack savings
                  </span>
                  <span
                    className="text-sm"
                    style={{ fontFamily: "'DM Mono', monospace", color: "#8B5A2B" }}
                  >
                    −{formatUSD(totalSavings)}
                  </span>
                </div>
              ) : null}

              <div
                className="flex items-baseline justify-between mt-3 pt-3"
                style={{ borderTop: "1px solid var(--nx-border)" }}
              >
                <span
                  className="text-sm uppercase tracking-[0.12em]"
                  style={{ fontFamily: "'DM Mono', monospace", color: "#0A0A0A" }}
                >
                  Total · monthly
                </span>
                <span
                  className="text-2xl"
                  style={{
                    fontFamily: "'Fraunces', serif",
                    color: "#0A0A0A",
                    fontWeight: 500,
                  }}
                  data-testid="text-checkout-total"
                >
                  {formatUSD(subtotal)}
                </span>
              </div>

              {/* Trust marks */}
              <div
                className="mt-6 pt-6 space-y-3"
                style={{ borderTop: "1px solid var(--nx-border)" }}
              >
                <TrustRow icon={<Stethoscope size={14} />} text="US-licensed physician review on every order" />
                <TrustRow icon={<Shield size={14} />} text="HIPAA-aligned data handling · 256-bit encryption" />
                <TrustRow icon={<Truck size={14} />} text="Cold-chain shipping · third-party COA on every batch" />
              </div>
            </aside>
          </div>
        </div>
      </div>
    </SiteLayout>
  );
}

/* ─── UI helpers ─── */

function Section({ title, eyebrow, children }: { title: string; eyebrow: string; children: React.ReactNode }) {
  return (
    <section>
      <div
        className="text-[10px] uppercase tracking-[0.22em] mb-1"
        style={{ fontFamily: "'DM Mono', monospace", color: "#8B5A2B" }}
      >
        {eyebrow}
      </div>
      <h2
        className="text-2xl mb-5"
        style={{ fontFamily: "'Fraunces', serif", color: "#0A0A0A", fontWeight: 500 }}
      >
        {title}
      </h2>
      {children}
    </section>
  );
}

function Row({ children }: { children: React.ReactNode }) {
  return <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-4">{children}</div>;
}

function Field({
  label,
  helper,
  error,
  children,
}: {
  label: string;
  helper?: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span
        className="block text-[11px] uppercase tracking-[0.15em] mb-1.5"
        style={{ fontFamily: "'DM Mono', monospace", color: "#4A4A4A" }}
      >
        {label}
      </span>
      {helper ? (
        <span
          className="block text-xs mb-2"
          style={{ fontFamily: "'Inter', sans-serif", color: "#6B6B6B" }}
        >
          {helper}
        </span>
      ) : null}
      {children}
      {error ? (
        <span
          className="block text-xs mt-1.5"
          style={{ fontFamily: "'Inter', sans-serif", color: "#8B2E1A" }}
        >
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
    <label
      className="block p-4 cursor-pointer transition-colors hover:bg-black/5"
      style={{ background: "#fff", border: "1px solid var(--nx-border)" }}
    >
      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          className="mt-1 accent-[#0A0A0A]"
          data-testid={testId}
          {...rest}
        />
        <div className="flex-1">
          <div
            className="text-sm"
            style={{ fontFamily: "'Inter', sans-serif", color: "#0A0A0A", fontWeight: 500 }}
          >
            {label}
          </div>
          {helper ? (
            <div
              className="text-xs mt-1"
              style={{ fontFamily: "'Inter', sans-serif", color: "#6B6B6B", lineHeight: 1.5 }}
            >
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
    <div
      className="flex items-start gap-2.5 text-xs"
      style={{ fontFamily: "'Inter', sans-serif", color: "#4A4A4A", lineHeight: 1.5 }}
    >
      <span style={{ color: "#8B5A2B", marginTop: 1 }}>{icon}</span>
      <span>{text}</span>
    </div>
  );
}
