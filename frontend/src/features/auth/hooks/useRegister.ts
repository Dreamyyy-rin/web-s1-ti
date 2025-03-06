import { axiosBackendInstance } from "@/services/axiosInstance";
import { RegisterSchema } from "../types/registerSchema.type";
import { AxiosError } from "axios";
import { ErrorResponse } from "@/types/responses/errorResponse.type";
import { handleAxiosError } from "@/lib/helpers";
import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "@/stores/auth.store";
import { useState } from "react";

function register(data: RegisterSchema) {
  return axiosBackendInstance.post("/register", data);
}

export function useRegister() {
  const [error, setError] = useState<string>(
    "Terjadi kesalahan yang tidak diketahui",
  );
  const setUser = useAuthStore((state) => state.setUser);

  const mutation = useMutation({
    mutationFn: async (data: RegisterSchema) => {
      const response = await register(data);
      return response.data;
    },
    onSuccess: (data) => {
      setUser({
        email: data.user.email,
        name: data.user.name,
        role: data.user.role,
      });
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      const message = handleAxiosError(error)?.message;
      // console.log("message:", message)
      if (message) {
        setError(message);
      }
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
