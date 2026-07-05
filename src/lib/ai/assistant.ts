/**
 * AI assistant interface — the seam for the production AI search integration.
 *
 * The launch build answers from curated content (src/content/home.ts). When
 * the OpenAI integration ships (POST_LAUNCH_BACKLOG.md), implement this
 * interface with a server route that combines the LLM with MindCept's live
 * inventory and market data; the UI in components/home/AISearch.tsx should
 * not need structural changes.
 */

export interface AssistantQuery {
  question: string;
}

export interface AssistantAnswer {
  text: string;
  /** Optional follow-up actions, e.g. links to services or listings. */
  actions?: { label: string; href: string }[];
}

export interface Assistant {
  ask(query: AssistantQuery): Promise<AssistantAnswer>;
}
