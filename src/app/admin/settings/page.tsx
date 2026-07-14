import { ThemeSwitcher } from "@/components/theme/ThemeSwitcher";
import { flags } from "@/lib/flags";

/**
 * Settings — site configuration. Hosts the internal theme studio (behind
 * flags.themeStudio): theme switching is an internal preview tool only and
 * is never exposed on the public site.
 */
export default function AdminSettingsPage() {
  const flagRows: [string, boolean][] = [
    ["properties", flags.properties],
    ["aiSearch", flags.aiSearch],
    ["reports", flags.reports],
    ["admin", flags.admin],
    ["themeStudio", flags.themeStudio],
  ];

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-ink">
        Settings
      </h1>
      <p className="mt-2 max-w-xl text-sm text-muted">
        Site configuration, feature flags and integrations.
      </p>

      {flags.themeStudio ? (
        <section className="mt-10">
          <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-ember-deep">
            Theme studio · internal preview
          </h2>
          <p className="mt-2 max-w-md text-sm text-muted">
            Previews alternate design-token sets in this browser only. The
            public site always presents the corporate Mindcept identity.
          </p>
          <div className="mt-4">
            <ThemeSwitcher />
          </div>
        </section>
      ) : null}

      <section className="mt-10">
        <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-ember-deep">
          Feature flags
        </h2>
        <ul className="mt-4 max-w-md space-y-2">
          {flagRows.map(([name, on]) => (
            <li
              key={name}
              className="flex items-center justify-between rounded-card border border-line bg-card px-4 py-3"
            >
              <span className="font-mono text-xs text-ink/80">{name}</span>
              <span
                className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${
                  on ? "bg-jewel/10 text-jewel" : "bg-line/60 text-muted"
                }`}
              >
                {on ? "enabled" : "disabled"}
              </span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
