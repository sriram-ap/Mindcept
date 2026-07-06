import { NextResponse } from "next/server";
import { leadSchema } from "@/lib/leads";
import { rateLimit } from "@/lib/rate-limit";

/**
 * Lead-capture endpoint for the enquiry and list-your-property forms.
 *
 * When LEAD_WEBHOOK_URL is set (CRM / Google Apps Script / Zapier), the lead
 * is forwarded there; otherwise it is logged so submissions are never lost
 * silently during the pre-CRM launch window.
 */
export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (!rateLimit(`enquiry:${ip}`).allowed) {
    return NextResponse.json(
      { error: "Too many requests. Please try again in a minute." },
      { status: 429 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  // Honeypot: the hidden "company_website" field is never filled by humans.
  if (
    typeof body === "object" &&
    body !== null &&
    (body as Record<string, unknown>).company_website
  ) {
    return NextResponse.json({ ok: true }); // silently drop bot submissions
  }

  const parsed = leadSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", issues: parsed.error.flatten().fieldErrors },
      { status: 422 },
    );
  }

  const lead = { ...parsed.data, receivedAt: new Date().toISOString() };

  const webhookUrl = process.env.LEAD_WEBHOOK_URL;
  if (webhookUrl) {
    try {
      const res = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(lead),
      });
      if (!res.ok) throw new Error(`Webhook responded ${res.status}`);
    } catch (error) {
      console.error("[enquiry] webhook delivery failed", error, lead);
      return NextResponse.json(
        { error: "We could not submit your enquiry. Please try WhatsApp or call us." },
        { status: 502 },
      );
    }
  } else {
    console.info("[enquiry] lead received (no LEAD_WEBHOOK_URL configured)", lead);
  }

  return NextResponse.json({ ok: true });
}
