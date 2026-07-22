/**
 * Centralized environment configuration.
 * Values come from Vite mode files: .env.production | .env.uat | .env.development
 */

function trimTrailingSlash(url: string): string {
  return url.replace(/\/+$/, '')
}

function requiredEnv(name: keyof ImportMetaEnv, value: string | undefined): string {
  const trimmed = value?.trim()
  if (!trimmed) {
    throw new Error(
      `Missing required environment variable: ${name}. ` +
        `Ensure .env.${import.meta.env.MODE} defines it (VITE_ prefix required).`,
    )
  }
  return trimTrailingSlash(trimmed)
}

export const appConfig = {
  /** Current Vite mode: development | uat | production */
  mode: import.meta.env.MODE,

  /** Public marketing site URL for this environment */
  websiteUrl: requiredEnv('VITE_WEBSITE_URL', import.meta.env.VITE_WEBSITE_URL),

  /** Customer Portal login / signup base URL */
  customerPortalUrl: requiredEnv(
    'VITE_CUSTOMER_PORTAL_URL',
    import.meta.env.VITE_CUSTOMER_PORTAL_URL,
  ),

  /** Partner portal URL */
  partnerPortalUrl: requiredEnv(
    'VITE_PARTNER_PORTAL_URL',
    import.meta.env.VITE_PARTNER_PORTAL_URL,
  ),

  /** Optional external API base (empty when using same-origin /api routes) */
  apiUrl: (import.meta.env.VITE_API_URL ?? '').trim().replace(/\/+$/, ''),
} as const

/** Convenience aliases matching deployment naming */
export const CUSTOMER_PORTAL_URL = appConfig.customerPortalUrl
export const WEBSITE_URL = appConfig.websiteUrl
export const PARTNER_PORTAL_URL = appConfig.partnerPortalUrl
export const API_URL = appConfig.apiUrl
