# AI_SEARCH_ARCHITECTURE.md

Status (V1.2): **demo only — no ChatGPT/OpenAI integration, no API key.**
Per feedback ("shall we integrate with Chat GPT… we can do it later
nothing urgent now"), this documents the future path without building it.

## Today

`components/home/AISearch.tsx` answers from curated content
(`content/home.ts` → `aiReplies`). The seam is `lib/ai/assistant.ts`:

```ts
interface Assistant { ask(q: AssistantQuery): Promise<AssistantAnswer>; }
```

The UI already consumes this shape, so swapping the implementation needs no
UI restructure.

## Future integration (when approved)

```
Browser (AISearch UI)
  → POST /api/search            ← new route, rate-limited
    → retrieval (MongoDB):      properties, services, reports, research,
                                 insights, clients, locations, FAQ
    → optional LLM (OpenAI):    re-rank + compose an answer from retrieved
                                 context (RAG — grounded, no hallucinated
                                 inventory)
  ← AssistantAnswer { text, actions[] }
```

### Steps to enable

1. Add `OPENAI_API_KEY` (server-only) + `ENABLE_AI_SEARCH=1`.
2. Implement `Assistant` in `lib/ai/openai-assistant.ts` (dynamic import of
   the OpenAI SDK, server-only — mirrors how R2's AWS SDK is isolated).
3. Add `/api/search`: retrieve from repositories, build context, call the
   model with a strict "answer only from provided MindCept data" system
   prompt, return `AssistantAnswer`.
4. Point `AISearch.tsx` at `/api/search` behind `flags.aiSearch`; keep the
   curated demo as the fallback when the flag is off.

### Guardrails (design intent)

- **Grounded**: answers only from MindCept's own inventory/market data
  (RAG), never free-form generation — protects credibility.
- **Flag-gated**: `ENABLE_AI_SEARCH` off in production until reviewed.
- **Cost-controlled**: rate-limited route + short context windows.
- **No secrets client-side**: key stays in the server route.

No code, dependency, or key is added in V1.2.
