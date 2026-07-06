"use client";

import { useState } from "react";
import { enquirySchema } from "@/lib/leads";

type Status = "idle" | "submitting" | "success" | "error";

/** Callback-request form — posts to /api/enquiry. */
export function EnquiryForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    const parsed = enquirySchema.safeParse({ kind: "enquiry", ...data });
    if (!parsed.success) {
      const fieldErrors: Record<string, string> = {};
      for (const [field, messages] of Object.entries(
        parsed.error.flatten().fieldErrors,
      )) {
        if (messages?.[0]) fieldErrors[field] = messages[0];
      }
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    setStatus("submitting");
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...parsed.data, company_website: data.company_website }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div
        role="status"
        className="rounded-card border border-jewel/25 bg-jewel/5 p-8 text-center"
      >
        <p className="font-display text-xl font-semibold text-jewel">Thank you!</p>
        <p className="mt-2 text-sm text-muted">
          Your enquiry has been received. Our team will reach out to you shortly.
        </p>
      </div>
    );
  }

  const inputClass =
    "mt-1 w-full rounded-lg border border-line bg-white px-3 py-2.5 text-sm text-ink focus:border-ember focus:outline-none";

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-4">
      <p className="text-sm text-muted">We typically respond within one business day.</p>

      {/* Honeypot — hidden from humans, catnip for bots */}
      <div className="hidden" aria-hidden="true">
        <label>
          Company website
          <input type="text" name="company_website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>


      <div>
        <label htmlFor="enq-name" className="block text-xs font-medium text-muted">
          Full name *
        </label>
        <input id="enq-name" name="name" autoComplete="name" required className={inputClass} aria-invalid={!!errors.name} />
        {errors.name ? <p className="mt-1 text-xs text-red-600">{errors.name}</p> : null}
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="enq-mobile" className="block text-xs font-medium text-muted">
            Mobile number *
          </label>
          <input id="enq-mobile" name="mobile" type="tel" autoComplete="tel" required className={inputClass} aria-invalid={!!errors.mobile} />
          {errors.mobile ? <p className="mt-1 text-xs text-red-600">{errors.mobile}</p> : null}
        </div>
        <div>
          <label htmlFor="enq-email" className="block text-xs font-medium text-muted">
            Email *
          </label>
          <input id="enq-email" name="email" type="email" autoComplete="email" required className={inputClass} aria-invalid={!!errors.email} />
          {errors.email ? <p className="mt-1 text-xs text-red-600">{errors.email}</p> : null}
        </div>
      </div>

      <div>
        <label htmlFor="enq-req" className="block text-xs font-medium text-muted">
          Your requirement *
        </label>
        <textarea id="enq-req" name="requirement" rows={4} required className={inputClass} aria-invalid={!!errors.requirement} />
        {errors.requirement ? (
          <p className="mt-1 text-xs text-red-600">{errors.requirement}</p>
        ) : null}
      </div>

      {status === "error" ? (
        <p role="alert" className="text-sm text-red-600">
          We could not submit your enquiry. Please try again, or reach us on WhatsApp / phone.
        </p>
      ) : null}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full rounded-full bg-jewel px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-jewel/90 disabled:opacity-60"
      >
        {status === "submitting" ? "Submitting…" : "Submit enquiry →"}
      </button>
      <p className="text-xs text-muted">
        By submitting, you agree to be contacted by Mindcept Consulting LLP.
      </p>
    </form>
  );
}
