import { axiosBackendInstance } from "@/services/axiosInstance";
import { useState } from "react";
import { LoginSchema } from "../types/loginSchema.type";
import { useMutation } from "@tanstack/react-query";
import { handleAxiosError } from "@/lib/helpers";
import { AxiosError } from "axios";
import { ErrorResponse } from "@/types/responses/errorResponse.type";

export function login(data: LoginSchema) {
  return axiosBackendInstance.post("/login", data);
}

export function useLogin() {
  const [error, setError] = useState<string | null>(null);

  const mutation = useMutation({
    mutationFn: async (data: LoginSchema) => {
      const response = await login(data)
      return response.data
    },
    onSuccess: (data) => {
      // TODO: SAVE TO AUTH CONTEXT
      console.log("data: ", data);
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      setError(handleAxiosError(error)?.message || "Terjadi kesalahan tidak diketahui");
    },
  });

  return {
    error,
    mutateAsync: mutation.mutateAsync,
    mutate: mutation.mutate,
    isLoading: mutation.isPending,
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
  };
}
