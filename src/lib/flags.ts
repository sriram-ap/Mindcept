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
  properties: flag(
    process.env.NEXT_PUBLIC_ENABLE_PROPERTIES ?? process.env.ENABLE_PROPERTIES,
    process.env.NODE_ENV !== "production",
  ),
  /** Live AI search (OpenAI). The demo panel is always available. */
  aiSearch: flag(process.env.ENABLE_AI_SEARCH, false),
  /** Downloadable research reports. */
  reports: flag(process.env.ENABLE_REPORTS, false),
  /** Admin CMS. */
  admin: flag(process.env.ENABLE_ADMIN, false),
} as const;
