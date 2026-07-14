"use client";

import { useState } from "react";
import { enquirySchema } from "@/lib/leads";
import { CITIES } from "@/components/layout/HeaderControls";
import { FileUpload, type UploadedAttachment } from "@/components/ui/FileUpload";

type Status = "idle" | "submitting" | "success" | "error";

const ENQUIRY_TYPES = ["Buy", "Lease", "Sell / List", "Advisory", "Investment"];
const PROPERTY_TYPES = [
  "Industrial",
  "Warehouse",
  "Land",
  "Commercial / Office",
  "Retail",
  "Residential",
];
const TRANSACTION_TYPES = ["Lease", "Purchase", "Sale", "Investment"];
const BUDGETS = [
  "Under ₹1 Cr",
  "₹1–5 Cr",
  "₹5–25 Cr",
  "₹25–100 Cr",
  "₹100 Cr+",
];
const AREAS = [
  "Under 10,000 sq ft",
  "10,000–50,000 sq ft",
  "50,000–1,00,000 sq ft",
  "1,00,000 sq ft+",
  "1–5 acres",
  "5+ acres",
];
const LEAD_SOURCES = [
  "Referral",
  "Website",
  "LinkedIn",
  "Event / Conference",
  "Existing client",
  "Other",
];

/**
 * Callback-request form — posts to /api/enquiry. The executive dropdowns
 * (enquiry type, property, transaction, city, budget, area, lead source)
 * are composed into the schema's `requirement` field on submit, so the
 * lead API contract and Zod validation stay exactly as they were.
 */
export function EnquiryForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [attachments, setAttachments] = useState<UploadedAttachment[]>([]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(
      new FormData(form).entries(),
    ) as Record<string, string>;

    // Fold the structured selections into the requirement string so the
    // API receives them without any schema/contract change.
    const facts = [
      ["Enquiry type", data.enquiryType],
      ["Property type", data.propertyType],
      ["Transaction", data.transactionType],
      ["City", data.city],
      ["Budget", data.budget],
      ["Area", data.area],
      ["Lead source", data.leadSource],
    ]
      .filter(([, v]) => v)
      .map(([k, v]) => `${k}: ${v}`)
      .join(" · ");
    const requirement = [facts, data.requirement?.trim()]
      .filter(Boolean)
      .join("\n\n");

    const parsed = enquirySchema.safeParse({
      kind: "enquiry",
      name: data.name,
      mobile: data.mobile,
      email: data.email,
      requirement,
      attachments: attachments.map((a) => a.url),
    });
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
        body: JSON.stringify({
          ...parsed.data,
          company_website: data.company_website,
        }),
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
        className="rounded-2xl border border-jewel/25 bg-jewel/5 p-8 text-center"
      >
        <p className="font-serif text-2xl font-medium text-jewel">Thank you.</p>
        <p className="mt-2 text-sm text-muted">
          Your enquiry has been received. Our advisory desk will be in touch
          within one business day.
        </p>
      </div>
    );
  }

  const fieldClass =
    "mt-1 w-full rounded-lg border border-line bg-card px-3 py-2.5 text-sm text-ink focus:border-ember focus:outline-none";
  const labelClass = "block text-xs font-medium text-muted";

  const Select = ({
    id,
    name,
    label,
    options,
    placeholder,
  }: {
    id: string;
    name: string;
    label: string;
    options: string[];
    placeholder: string;
  }) => (
    <div>
      <label htmlFor={id} className={labelClass}>
        {label}
      </label>
      <select id={id} name={name} defaultValue="" className={fieldClass}>
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </div>
  );

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-4">
      <p className="text-sm text-muted">
        We typically respond within one business day.
      </p>

      {/* Honeypot — hidden from humans, catnip for bots */}
      <div className="hidden" aria-hidden="true">
        <label>
          Company website
          <input type="text" name="company_website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Select id="enq-type" name="enquiryType" label="Enquiry type" placeholder="Select…" options={ENQUIRY_TYPES} />
        <Select id="enq-ptype" name="propertyType" label="Property type" placeholder="Select…" options={PROPERTY_TYPES} />
        <Select id="enq-txn" name="transactionType" label="Transaction type" placeholder="Select…" options={TRANSACTION_TYPES} />
        <Select id="enq-city" name="city" label="City" placeholder="Select…" options={[...CITIES]} />
        <Select id="enq-budget" name="budget" label="Budget" placeholder="Select…" options={BUDGETS} />
        <Select id="enq-area" name="area" label="Area requirement" placeholder="Select…" options={AREAS} />
      </div>

      <div>
        <label htmlFor="enq-req" className={labelClass}>
          Your requirement *
        </label>
        <textarea id="enq-req" name="requirement" rows={3} required className={fieldClass} aria-invalid={!!errors.requirement} />
        {errors.requirement ? (
          <p className="mt-1 text-xs text-red-600">{errors.requirement}</p>
        ) : null}
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="sm:col-span-1">
          <label htmlFor="enq-name" className={labelClass}>
            Full name *
          </label>
          <input id="enq-name" name="name" autoComplete="name" required className={fieldClass} aria-invalid={!!errors.name} />
          {errors.name ? <p className="mt-1 text-xs text-red-600">{errors.name}</p> : null}
        </div>
        <div>
          <label htmlFor="enq-mobile" className={labelClass}>
            Mobile *
          </label>
          <input id="enq-mobile" name="mobile" type="tel" autoComplete="tel" required className={fieldClass} aria-invalid={!!errors.mobile} />
          {errors.mobile ? <p className="mt-1 text-xs text-red-600">{errors.mobile}</p> : null}
        </div>
        <div>
          <label htmlFor="enq-email" className={labelClass}>
            Email *
          </label>
          <input id="enq-email" name="email" type="email" autoComplete="email" required className={fieldClass} aria-invalid={!!errors.email} />
          {errors.email ? <p className="mt-1 text-xs text-red-600">{errors.email}</p> : null}
        </div>
      </div>

      <Select
        id="enq-source"
        name="leadSource"
        label="How did you hear about us?"
        placeholder="Select…"
        options={LEAD_SOURCES}
      />

      <FileUpload onChange={setAttachments} />

      {status === "error" ? (
        <p role="alert" className="text-sm text-red-600">
          We could not submit your enquiry. Please try again, or reach us on
          WhatsApp / phone.
        </p>
      ) : null}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full rounded-full bg-ember px-6 py-3.5 text-sm font-semibold text-on-accent transition-colors hover:bg-ember-bright disabled:opacity-60"
      >
        {status === "submitting" ? "Submitting…" : "Submit enquiry →"}
      </button>
      <p className="text-xs text-muted">
        By submitting, you agree to be contacted by Mindcept Consulting LLP.
      </p>
    </form>
  );
}
