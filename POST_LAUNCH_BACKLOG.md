# POST_LAUNCH_BACKLOG.md

Items intentionally deferred so they would not delay launch. Each is
architecturally prepared for (see docs/ARCHITECTURE.md "Future modules").

| Item | Why deferred | Prepared seam |
|---|---|---|
| Property listings module + filters | Largest remaining build; needs property data/photos from founder | Content-layer pattern; plan in ARCHITECTURE.md |
| Admin CMS (properties, blogs, leads; MongoDB) | Requires backend + auth; not needed for launch leads | Content types map to CMS schemas |
| Live AI search (OpenAI) | Prototype itself ships it as a demo; needs API key + inventory data | `src/lib/ai/assistant.ts` interface |
| GA4 / GTM / Meta Pixel / Conversion API | Needs account IDs from founder | Env slots in `.env.example` |
| CRM integration | Needs CRM choice | Single webhook seam in `/api/enquiry` |
| Blog + headless CMS | Thought-leadership cadence, not launch | Typed content layer |
| Real client logos & testimonials | Assets + permission pending | Marquee/testimonial sections swap in place |
| Research PDF library + gated downloads | Reports not yet supplied | Insights structure exists |
| Newsletter subscription | Needs ESP choice | Form pattern reusable |
| Unit/E2E test suites | CI covers lint/type/build for launch | Zod schemas isolated for testing |
| Framer Motion / advanced animation | CSS reveals match prototype today | Reveal component swap |
| OG image generation | Nice-to-have | Next.js `opengraph-image` convention |
