/**
 * Feature flags — production exposes only finished features.
 * Flags read env at build time; static pages regenerate on redeploy.
 */

function flag(value: string | undefined, defaultValue: boolean): boolean {
  if (value === undefined || value === "") return defaultValue;
  return value === "1" || value.toLowerCase() === "true";
}

export const flags = {
  /**
   * Property platform (/properties). Off in production until live inventory
   * is approved. NEXT_PUBLIC_ variant so nav links resolve identically in
   * client bundles; set BOTH to the same value when enabling.
   */
  /* V2 POC: on by default (demo listings ship with the build); set the env
     vars to "0" to hide the platform. */
  properties: flag(
    process.env.NEXT_PUBLIC_ENABLE_PROPERTIES ?? process.env.ENABLE_PROPERTIES,
    true,
  ),
  /** Live AI search (OpenAI). The demo panel is always available. */
  aiSearch: flag(process.env.ENABLE_AI_SEARCH, false),
  /** Downloadable research reports. */
  reports: flag(process.env.ENABLE_REPORTS, false),
  /** Admin CMS. */
  admin: flag(process.env.ENABLE_ADMIN, false),
  /**
   * Theme studio inside /admin/settings. Public visitors never see theme
   * switching — it exists only behind this flag, for internal preview.
   */
  themeStudio: flag(process.env.NEXT_PUBLIC_ENABLE_THEME_STUDIO, true),
} as const;
