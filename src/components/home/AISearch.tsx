"use client";

import { useState } from "react";
import { aiPrompts, aiReplies } from "@/content/home";
import { SectionHeading } from "@/components/ui/SectionHeading";

/**
 * AI search demo. Answers are curated content for launch; the interface in
 * src/lib/ai/assistant.ts is the seam for the production OpenAI integration
 * (see POST_LAUNCH_BACKLOG.md).
 */
export function AISearch() {
  const [query, setQuery] = useState("");
  const [answer, setAnswer] = useState<string | null>(null);

  const ask = (q: string) => {
    const trimmed = q.trim();
    if (!trimmed) return;
    setAnswer(aiReplies[trimmed] ?? aiReplies.default);
  };

  return (
    <section className="bg-slate py-20 text-white sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          dark
          eyebrow="AI Search"
          title="Ask MindCept AI."
          lead="Describe what you need in plain language. Our AI assistant surfaces the right space, market data and advisory — instantly."
        />

        <div className="mt-10 max-w-3xl">
          <div className="flex gap-2">
            <label htmlFor="ai-input" className="sr-only">
              Describe your requirement
            </label>
            <input
              id="ai-input"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") ask(query);
              }}
              placeholder="e.g. Grade-A warehousing near Bhiwandi"
              className="w-full rounded-full border border-white/20 bg-white/5 px-5 py-3 text-sm text-white placeholder:text-white/40 focus:border-ember focus:outline-none"
            />
            <button
              type="button"
              onClick={() => ask(query)}
              className="rounded-full bg-ember px-6 py-3 text-sm font-semibold text-ink transition-colors hover:bg-ember-bright"
            >
              Ask
            </button>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {aiPrompts.map((prompt) => (
              <button
                key={prompt}
                type="button"
                onClick={() => {
                  setQuery(prompt);
                  ask(prompt);
                }}
                className="rounded-full border border-white/20 px-4 py-1.5 text-xs text-white/75 transition-colors hover:border-ember hover:text-ember-bright"
              >
                {prompt}
              </button>
            ))}
          </div>

          {answer ? (
            <div
              role="status"
              className="mt-6 rounded-card border border-white/15 bg-white/5 p-6"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-ember-bright">
                MindCept AI
              </p>
              <p className="mt-3 text-sm leading-relaxed text-white/80">{answer}</p>
              <p className="mt-4 text-xs text-white/40">
                Demo preview. In production this connects to live inventory and
                market data.
              </p>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
