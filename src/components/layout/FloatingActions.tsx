import { site } from "@/content/site";
import { SocialGlyph } from "@/components/ui/SocialIcons";

/** Persistent WhatsApp + click-to-call actions (lead-generation requirement). */
export function FloatingActions() {
  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col gap-3">
      <a
        href={site.whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        className="flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-105"
      >
        <SocialGlyph name="whatsapp" className="h-6 w-6" />
      </a>
      <a
        href={`tel:${site.phonePrimary.replace(/\s/g, "")}`}
        aria-label={`Call us on ${site.phonePrimary}`}
        className="flex h-12 w-12 items-center justify-center rounded-full bg-jewel text-white shadow-lg transition-transform hover:scale-105"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-5 w-5" aria-hidden="true">
          <path
            d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
        </svg>
      </a>
    </div>
  );
}
