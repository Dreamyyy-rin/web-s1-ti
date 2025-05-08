import { axiosBackendInstance } from "@/services/axiosInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DEFAULT_ERROR_MESSAGE } from "@/constants/error.constant";
import { useState } from "react";
import { AxiosError } from "axios";
import { ErrorResponse } from "@/interfaces/responses/errorResponse.interface";
import { handleAxiosError } from "@/lib/helpers";
import { AdminSchema } from "../types/admin.schema";

interface updateAdminParams {
  id: string;
  data: AdminSchema;
}

function updateAdminById(params: updateAdminParams) {
  return axiosBackendInstance.post(`/admin/${params.id}`, {
    name: params.data.name,
    email: params.data.email,
    password: params.data.password,
    password_confirmation: params.data.password_confirmation,
  });
}

export function useUpdateAdmin() {
  const queryClient = useQueryClient();
  const [error, setError] = useState(DEFAULT_ERROR_MESSAGE);

  const mutation = useMutation({
    mutationFn: async (params: updateAdminParams) => {
      const response = await updateAdminById(params);
      return response.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["admin", "fetch"],
      });
      queryClient.invalidateQueries({
        queryKey: ["admin", variables.id],
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
