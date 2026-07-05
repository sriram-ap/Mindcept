# RESUME_PROMPT.md

Paste the following into a new Claude Code session on the
`sriram-ap/Mindcept` repository to continue exactly from this state:

---

Continue developing the MindCept Consulting website (real estate advisory,
mindceptconsulting.com). Do NOT restart or regenerate anything.

Read these first, in order:
1. HANDOVER.md — where work stopped and deployment steps
2. GAP_ANALYSIS.md — the binding strategy decision (real estate advisory
   vision; Context.md's consulting narrative was superseded)
3. MASTER_PLAN.md + TODO.md — the roadmap and priorities
4. docs/ARCHITECTURE.md — content-layer architecture rules

State: Milestone 1 is complete and verified on branch
`claude/strategy-alignment-gap-analysis-d6zpk2` (build/lint/typecheck pass;
23 prerendered routes; lead API tested). Nothing is deployed yet.

Do next, in this order:
1. If Vercel/GitHub auth is available: merge to main, import to Vercel Hobby
   (team srirampadmanaban-3026s-projects), set
   NEXT_PUBLIC_SITE_URL=https://mindceptconsulting.com, deploy, verify.
   Never fabricate a deployment.
2. Work through TODO.md "Critical" then "High" — the property listings
   module is the biggest outstanding business feature (spec: client doc §4
   in docs/CLIENT_REQUIREMENTS.txt; follow the content-layer pattern in
   docs/ARCHITECTURE.md).
3. Keep all copy consistent with the real estate advisory brand
   ("Where Strategy Meets Space") — brand tokens in src/app/globals.css.

Rules: preserve existing components and architecture; content belongs in
src/content/ (never hardcoded in components); every page must serve lead
generation, trust, authority or conversion; npm run build && npm run lint
&& npm run typecheck must pass before committing.

---
