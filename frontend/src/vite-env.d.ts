/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_APP_TOKEN_ENCRYPTION_KEY: string
  readonly VITE_APP_USER_ENCRYPTION_KEY: string
  readonly VITE_APP_BACKEND_URL: string
  readonly VITE_APP_FRONTEND_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}