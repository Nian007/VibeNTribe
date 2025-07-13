/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string
  readonly VITE_LINKEDIN_CLIENT_ID: string
  readonly VITE_LINKEDIN_REDIRECT_URI: string
  readonly VITE_WHATSAPP_ACCESS_TOKEN: string
  readonly VITE_WHATSAPP_PHONE_NUMBER_ID: string
  readonly VITE_SUPABASE_URL: string
  readonly VITE_SUPABASE_ANON_KEY: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}