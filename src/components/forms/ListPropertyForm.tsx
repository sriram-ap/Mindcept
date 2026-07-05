"use client";

import { useState } from "react";
import { listingSchema } from "@/lib/leads";

type Status = "idle" | "submitting" | "success" | "error";

/** "List your property" form for owners, developers and channel partners. */
export function ListPropertyForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    const parsed = listingSchema.safeParse({ kind: "listing", ...data });
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
        body: JSON.stringify(parsed.data),
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
        className="rounded-card border border-ember/40 bg-white/5 p-8 text-center"
      >
        <p className="font-display text-xl font-semibold text-ember-bright">
          Property received!
        </p>
        <p className="mt-2 text-sm text-white/70">
          Thanks — our team will review your listing and get in touch shortly.
        </p>
      </div>
    );
  }

  const inputClass =
    "mt-1 w-full rounded-lg border border-white/20 bg-white/5 px-3 py-2.5 text-sm text-white placeholder:text-white/40 focus:border-ember focus:outline-none";
  const labelClass = "block text-xs font-medium text-white/70";
  const errClass = "mt-1 text-xs text-red-400";

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-4">
      <p className="text-sm text-white/70">
        Share the details and our team will respond within one business day.
      </p>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="lp-type" className={labelClass}>Property type *</label>
          <select id="lp-type" name="propertyType" className={inputClass} defaultValue="Industrial">
            {["Industrial", "Warehouse", "Land", "Commercial / Office", "Retail", "Other"].map(
              (t) => (
                <option key={t} value={t} className="text-ink">
                  {t}
                </option>
              ),
            )}
          </select>
        </div>
        <div>
          <label htmlFor="lp-for" className={labelClass}>Listing for *</label>
          <select id="lp-for" name="listingFor" className={inputClass} defaultValue="Lease">
            {["Lease", "Sale", "Lease or Sale"].map((t) => (
              <option key={t} value={t} className="text-ink">
                {t}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="lp-loc" className={labelClass}>City / location *</label>
          <input id="lp-loc" name="location" required className={inputClass} aria-invalid={!!errors.location} />
          {errors.location ? <p className={errClass}>{errors.location}</p> : null}
        </div>
        <div className="grid grid-cols-[1fr_auto] gap-2">
          <div>
            <label htmlFor="lp-area" className={labelClass}>Area *</label>
            <input id="lp-area" name="area" type="number" min="0" required className={inputClass} aria-invalid={!!errors.area} />
            {errors.area ? <p className={errClass}>{errors.area}</p> : null}
          </div>
          <div>
            <label htmlFor="lp-unit" className={labelClass}>Unit</label>
            <select id="lp-unit" name="areaUnit" className={inputClass} defaultValue="sq ft">
              {["sq ft", "acres", "sq m"].map((u) => (
                <option key={u} value={u} className="text-ink">
                  {u}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div>
        <label htmlFor="lp-price" className={labelClass}>Expected price / rent</label>
        <input id="lp-price" name="expectedPrice" className={inputClass} />
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <label htmlFor="lp-name" className={labelClass}>Your name *</label>
          <input id="lp-name" name="name" autoComplete="name" required className={inputClass} aria-invalid={!!errors.name} />
          {errors.name ? <p className={errClass}>{errors.name}</p> : null}
        </div>
        <div>
          <label htmlFor="lp-mobile" className={labelClass}>Mobile *</label>
          <input id="lp-mobile" name="mobile" type="tel" autoComplete="tel" required className={inputClass} aria-invalid={!!errors.mobile} />
          {errors.mobile ? <p className={errClass}>{errors.mobile}</p> : null}
        </div>
        <div>
          <label htmlFor="lp-email" className={labelClass}>Email *</label>
          <input id="lp-email" name="email" type="email" autoComplete="email" required className={inputClass} aria-invalid={!!errors.email} />
          {errors.email ? <p className={errClass}>{errors.email}</p> : null}
        </div>
      </div>

      <div>
        <label htmlFor="lp-details" className={labelClass}>Property details</label>
        <textarea id="lp-details" name="details" rows={3} className={inputClass} />
        <p className="mt-1 text-xs text-white/50">
          Have photos or a brochure? You can share them once we connect.
        </p>
      </div>

      {status === "error" ? (
        <p role="alert" className="text-sm text-red-400">
          We could not submit your listing. Please try again, or reach us on WhatsApp / phone.
        </p>
      ) : null}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full rounded-full bg-ember px-6 py-3 text-sm font-semibold text-ink transition-colors hover:bg-ember-bright disabled:opacity-60"
      >
        {status === "submitting" ? "Submitting…" : "Submit property →"}
      </button>
      <p className="text-xs text-white/50">
        By submitting, you agree to be contacted by Mindcept Consulting LLP.
      </p>
    </form>
  );
}
