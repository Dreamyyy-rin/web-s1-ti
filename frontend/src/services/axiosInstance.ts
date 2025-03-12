import { ENV } from "@/env";
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
  baseURL: ENV.APP.BACKEND_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosBackendInstance.interceptors.request.use(handleOnSendRequest);
