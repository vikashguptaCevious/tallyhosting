/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_WEBSITE_URL: string
  readonly VITE_CUSTOMER_PORTAL_URL: string
  readonly VITE_PARTNER_PORTAL_URL: string
  readonly VITE_API_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
