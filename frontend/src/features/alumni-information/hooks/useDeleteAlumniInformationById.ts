import { DEFAULT_ERROR_MESSAGE } from "@/constants/error.constant";
import { handleAxiosError } from "@/lib/helpers";
import { axiosBackendInstance } from "@/services/axiosInstance";
import { ErrorResponse } from "@/interfaces/responses/errorResponse.interface";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useState } from "react";

function deleteAlumniInformationById(id: string) {
  return axiosBackendInstance.delete(`/berita-alumni/${id}`);
}

export function useDeleteAlumniInformationById() {
  const queryClient = useQueryClient();
  const [error, setError] = useState<string>(DEFAULT_ERROR_MESSAGE);

  const mutation = useMutation({
    mutationFn: async ({ id }: { id: string }) =>
      await deleteAlumniInformationById(id),
    onError: (error: AxiosError<ErrorResponse>) => {
      const message = handleAxiosError(error)?.message;
      if (message) {
        setError(message);
      }
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["alumni-information", "fetch"],
      });
      queryClient.invalidateQueries({
        queryKey: ["alumni-information", variables.id],
      });
    },
  });

  return {
    ...mutation,
    error,
  };
}
