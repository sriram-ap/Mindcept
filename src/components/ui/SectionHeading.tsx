import { Reveal } from "@/components/ui/Reveal";

/** Eyebrow + title + optional lead paragraph, used to open every section. */
export function SectionHeading({
  eyebrow,
  title,
  lead,
  dark = false,
  id,
}: {
  eyebrow: string;
  title: string;
  lead?: string;
  dark?: boolean;
  id?: string;
}) {
  return (
    <Reveal className="max-w-3xl">
      <p
        id={id}
        className={`text-xs font-semibold uppercase tracking-[0.2em] ${
          dark ? "text-ember-bright" : "text-ember-deep"
        }`}
      >
        {eyebrow}
      </p>
      <h2
        className={`mt-3 font-display text-3xl font-semibold tracking-tight sm:text-4xl ${
          dark ? "text-white" : "text-ink"
        }`}
      >
        {title}
      </h2>
      {lead ? (
        <p
          className={`mt-4 text-base leading-relaxed sm:text-lg ${
            dark ? "text-muted-dark" : "text-muted"
          }`}
        >
          {lead}
        </p>
      ) : null}
    </Reveal>
  );
}
