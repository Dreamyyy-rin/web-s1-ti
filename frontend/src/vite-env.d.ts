/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_APP_BACKEND_URL: string;
  readonly VITE_APP_FRONTEND_URL: string;
  readonly VITE_APP_IS_REGISTER_ENABLED: string;
  readonly VITE_APP_MODE: "development" | "production" | "staging";
  readonly VITE_GOOGLE_CLIENT_ID: string;
  readonly VITE_GOOGLE_CLIENT_SECRET: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
