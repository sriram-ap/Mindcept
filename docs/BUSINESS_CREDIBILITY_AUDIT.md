# BUSINESS_CREDIBILITY_AUDIT.md

Date: 2026-07-05. Question audited: *does the site establish who Mindcept
has worked with, where it operates, and at what scale — within the first
two screenfuls — as strongly as mindcept.in?*

Reference evidence: founder-supplied screenshots of mindcept.in (the live
site is unreachable from this environment — network policy).

## Findings (V1.0) → resolution (V1.1)

| Credibility element | V1.0 | V1.1 |
|---|---|---|
| Major clients | Text chips, 8th section | Featured client cards, **2nd section** + /clients page |
| India reach | One "30+ cities" stat | Interactive 10-city map, **3rd section** |
| Team experience | Milestones mid-page | Milestones **4th** + animated hero counters |
| Developer relationships | Implicit | Explicit client categories (IndoSpace, ESR, Amar Builders…) |
| Institutional experience | Name-drops in marquee | Dedicated category + engagement descriptions (Blackstone, Morgan Stanley, Mapletree) |
| Occupier experience | Implicit | Dedicated category (Amazon, IKEA, DHL, Shell…) |
| Warehousing / Industrial / Capital markets | Service pillars only | Reinforced through client engagements + reach blurbs per corridor |

First two screenfuls now answer: *who* (Trusted By, screenful 2), *where*
(Our Reach, screenful 3), *what scale* (hero counters, screenful 1).

## Honest-content rules applied

1. Client engagements are phrased as **team transaction experience**
   (consistent with mindcept.in's own "Team Transaction Experience"
   heading) — not as firm-level endorsements. Founder should review
   per-client wording before launch.
2. **No new metrics were invented.** The requested "institutional
   mandates / industrial projects / warehouse projects" counters need
   founder-supplied figures; the six approved counters (20+ yrs, 12Mn+ sqft,
   2,100+ acres, ₹1,000Cr+, 300+ clients, 30+ cities) are used. Add the new
   figures to `content/home.ts` when available.
3. Logo **images** are not shipped (no approved assets in repo — brand
   logos are trademarks requiring permission). `ClientMark` renders real
   logos the moment `logoUrl` is populated from R2.

## Remaining credibility gaps (tracked in TODO)

Real logo assets · testimonials with attribution · success stories / case
studies · team profiles with photos · downloadable research PDFs ·
international presence imagery (Dubai/Singapore/Sydney per mindcept.in).
