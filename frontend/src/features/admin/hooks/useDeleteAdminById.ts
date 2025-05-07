import { DEFAULT_ERROR_MESSAGE } from "@/constants/error.constant";
import { handleAxiosError } from "@/lib/helpers";
import { axiosBackendInstance } from "@/services/axiosInstance";
import { ErrorResponse } from "@/interfaces/responses/errorResponse.interface";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useState } from "react";

function deleteAdminById(id: string) {
  return axiosBackendInstance.delete(`/admin/${id}`);
}

export function useDeleteAdminById() {
  const queryClient = useQueryClient();
  const [error, setError] = useState<string>(DEFAULT_ERROR_MESSAGE);

  const mutation = useMutation({
    mutationFn: async ({ id }: { id: string }) => await deleteAdminById(id),
    onError: (error: AxiosError<ErrorResponse>) => {
      const message = handleAxiosError(error)?.message;
      if (message) {
        setError(message);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["admin", "fetch"],
      });
    },
  });

  return {
    ...mutation,
    error,
  };
}
