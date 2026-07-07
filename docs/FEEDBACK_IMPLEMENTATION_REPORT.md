# FEEDBACK_IMPLEMENTATION_REPORT.md

Source: `Website_Feedback_07July2026.docx`. Every point mapped to its
implementation and verification. Status key: ✅ done & verified.

| # | Verbatim feedback | Implementation | Files | Verified |
|---|---|---|---|---|
| 1 | "dropdown stays open… close automatically when the user starts scrolling" | Mega menu closes on scroll, outside-click, Escape, route change; `aria-expanded` intact | `components/layout/Header.tsx` | ✅ Playwright: scroll→closed, Esc→closed, outside-click→closed, aria-expanded=true when open |
| 2 | "20+ should change to Aggregated 30+ Years of Experience" (both sections) | Hero stat 30 + "Aggregated years of experience"; milestone "Aggregated 30+ years"; headline copy reconciled | `content/home.ts`, `home/Sections.tsx`, `home/CredibilitySections.tsx`, `app/clients/page.tsx` | ✅ rendered strings confirmed |
| 3 | "instead of Tool, we can call it as Calculator" | Nav + eyebrow + footer relabelled; anchor `#tools`→`#calculator` | `content/site.ts`, `home/Calculators.tsx`, `layout/Footer.tsx` | ✅ nav shows "Calculator", `#calculator` resolves |
| 4 | "AI section shall we integrate with Chat GPT… nothing urgent now" | Demo kept; interface + future plan documented; **no key, no integration** | `lib/ai/assistant.ts`, `docs/AI_SEARCH_ARCHITECTURE.md` | ✅ no OpenAI dependency added |
| 5 | "Trusted Partner we can keep it… include the Logos… leave it" | Section kept; `ClientMark` renders approved `logoUrl` from R2, monogram placeholder until then | `home/CredibilitySections.tsx`, `ui/ClientMark.tsx` | ✅ R2-ready; no invented logos |
| 6 | "upload documents like Design, PDF, Autocad Drawing… Icon for upload… store the data in specific place" | `FileUpload` (icon, drag-drop, progress, validation, 25 MB) on enquiry + list-property forms; `/api/upload`→R2 `/uploads`; URLs in Mongo | `ui/FileUpload.tsx`, `api/upload/route.ts`, `lib/uploads.ts`, `lib/storage/r2.ts`, `lib/leads.ts`, both forms | ✅ UI present; 503 when R2 absent; enquiry accepts attachments |
| 7 | "City… India Cities and also… Dubai as an option… multi-country" | Dubai added (region Middle East); International reach block; model multi-country ready | `content/locations.ts`, `home/CredibilitySections.tsx` | ✅ Dubai "Opening soon" renders |
| 8 | Contact section — approved India values; "Dubai… Address later" | `site.ts` contact + `offices` directory; India full address, Dubai "Address Coming Soon" | `content/site.ts`, `app/contact/page.tsx`, `home/Sections.tsx` | ✅ all values render (screenshot) |

## Approved contact values applied

- MindCept Consulting, B Wing, Unit 308, 3rd Floor, Nyati Empress, Viman
  Nagar, Pune – 411014, Maharashtra, India
- info@mindcept.in · sales@mindcept.in
- WhatsApp +91 95275 40100 · Mobile +91 95275 40404 · Phone +91 20 4862 6172
- Dubai: "Address Coming Soon" (not fabricated)

## Deliberate non-changes (with reason)

- **No ChatGPT integration** (#4 says "later, nothing urgent").
- **No invented client logos** (#5) — placeholders until approved assets land.
- **Land-services "two decades" copy left as-is** — it's a practice-specific
  claim ("over two decades of expertise in land transactions"), distinct
  from the team's aggregated 30+ years; changing it would misstate one
  practice's tenure.
- **File bytes never stored in the database** — only R2 URLs, per the
  "store in a specific place" intent and the existing storage architecture.
