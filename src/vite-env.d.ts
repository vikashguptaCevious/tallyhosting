/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_WEBSITE_URL: string
  readonly VITE_CUSTOMER_PORTAL_URL: string
  readonly VITE_PARTNER_PORTAL_URL: string
  readonly VITE_API_URL: string
  /** Optional absolute URL of the Bitrix lead endpoint; unset means same origin */
  readonly VITE_BITRIX_LEAD_URL?: string
  /** Cevious Cloud public API base — must end with /api/v1 (no trailing slash) */
  readonly VITE_CEVIOUS_API_BASE: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
