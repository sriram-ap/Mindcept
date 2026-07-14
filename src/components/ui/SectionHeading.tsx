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
        className={`text-[11px] font-semibold uppercase tracking-[0.28em] ${
          dark ? "text-ember-bright" : "text-ember-deep"
        }`}
      >
        {eyebrow}
      </p>
      <h2
        className={`mt-4 font-serif text-[2rem] font-medium leading-[1.1] tracking-tight sm:text-[2.75rem] ${
          dark ? "text-white" : "text-ink"
        }`}
      >
        {title}
      </h2>
      {lead ? (
        <p
          className={`mt-5 text-base leading-relaxed sm:text-lg ${
            dark ? "text-muted-dark" : "text-muted"
          }`}
        >
          {lead}
        </p>
      ) : null}
    </Reveal>
  );
}
