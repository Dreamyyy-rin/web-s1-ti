import { axiosBackendInstance } from "@/services/axiosInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { handleAxiosError } from "@/lib/helpers";
import { ErrorResponse } from "@/interfaces/responses/errorResponse.interface";
import { AxiosError } from "axios";
import { DEFAULT_ERROR_MESSAGE } from "@/constants/error.constant";
import { AdminSchema } from "../types/admin.schema";

function createAdmin(data: AdminSchema) {
  return axiosBackendInstance.post("/admin", {
    name: data.name,
    email: data.email,
    password: data.password,
    password_confirmation: data.password_confirmation,
  });
}

export function useCreateAdmin() {
  const queryClient = useQueryClient();
  const [error, setError] = useState(DEFAULT_ERROR_MESSAGE);

  const mutation = useMutation({
    mutationFn: async (data: AdminSchema) => {
      const response = await createAdmin(data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["admin", "fetch"],
      });
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      const message = handleAxiosError(error)?.message;
      if (message) {
        setError(message);
      }
    },
  });

  return {
    ...mutation,
    error,
  };
}
