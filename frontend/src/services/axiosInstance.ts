import { useAuthStore } from "@/stores/auth.store";
import axios, { InternalAxiosRequestConfig } from "axios";

async function handleOnSendRequest(config: InternalAxiosRequestConfig) {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
}

export const axiosBackendInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosBackendInstance.interceptors.request.use(handleOnSendRequest);
