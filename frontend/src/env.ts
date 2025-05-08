export function checkEnv() {
  Object.keys(import.meta.env).forEach((key) => {
    // console.log("ENV: ", import.meta.env[key] )
    if (key.startsWith("VITE") && !import.meta.env[key]) {
      throw new Error(`env is incomplete.`);
    }
  });
}

export const ENV = {
  APP: {
    TOKEN_ENCRYPTION_KEY: import.meta.env.VITE_APP_TOKEN_ENCRYPTION_KEY,
    USER_ENCRYPTION_KEY: import.meta.env.VITE_APP_USER_ENCRYPTION_KEY,
    BACKEND_URL: import.meta.env.VITE_APP_BACKEND_URL,
    FRONTEND_URL: import.meta.env.VITE_APP_FRONTEND_URL,
    BACKEND_STORAGE_URL: import.meta.env.VITE_APP_BACKEND_STORAGE_URL,
    MODE: import.meta.env.VITE_APP_MODE,
    IS_REGISTER_ENABLED: String(import.meta.env.VITE_APP_IS_REGISTER_ENABLED).toLowerCase() === "true",
  },
  GOOGLE: {
    CLIENT_ID: import.meta.env.VITE_GOOGLE_CLIENT_ID,
    CLIENT_SECRET: import.meta.env.VITE_GOOGLE_CLIENT_SECRET,
  },
};
