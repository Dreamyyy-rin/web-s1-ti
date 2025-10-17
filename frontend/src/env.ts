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
    BACKEND_URL: import.meta.env.VITE_APP_BACKEND_URL,
    FRONTEND_URL: import.meta.env.VITE_APP_FRONTEND_URL,
    CHATBOT_URL: import.meta.env.VITE_API_CHATBOT,
    MODE: import.meta.env.VITE_APP_MODE,
    IS_REGISTER_ENABLED:
      String(import.meta.env.VITE_APP_IS_REGISTER_ENABLED).toLowerCase() ===
      "true",
  },
  GOOGLE: {
    CLIENT_ID: import.meta.env.VITE_GOOGLE_CLIENT_ID,
    CLIENT_SECRET: import.meta.env.VITE_GOOGLE_CLIENT_SECRET,
  },
};
