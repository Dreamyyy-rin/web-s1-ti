import { DEFAULT_ERROR_MESSAGE } from "@/constants/error.constant";
import { handleAxiosError } from "@/lib/helpers";
import { axiosBackendInstance } from "@/services/axiosInstance";
import { ErrorResponse } from "@/interfaces/responses/errorResponse.interface";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useState } from "react";

function deleteVacancyById(id: string) {
  return axiosBackendInstance.delete(`/lowongan/${id}`);
}

export function useDeleteVacancyById() {
  const queryClient = useQueryClient();
  const [error, setError] = useState<string>(DEFAULT_ERROR_MESSAGE);

  const mutation = useMutation({
    mutationFn: async ({ id }: { id: string }) => await deleteVacancyById(id),
    onError: (error: AxiosError<ErrorResponse>) => {
      const message = handleAxiosError(error)?.message;
      if (message) {
        setError(message);
      }
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["vacancy", "fetch"],
      });
      queryClient.invalidateQueries({
        queryKey: ["vacancy", variables.id],
      });
    },
  });

  return {
    ...mutation,
    error,
  };
}
