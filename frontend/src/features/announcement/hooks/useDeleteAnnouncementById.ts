import { DEFAULT_ERROR_MESSAGE } from "@/constants/error.constant";
import { handleAxiosError } from "@/lib/helpers";
import { axiosBackendInstance } from "@/services/axiosInstance";
import { ErrorResponse } from "@/types/responses/errorResponse.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useState } from "react";

function deleteAnnoundementById(id: string) {
  return axiosBackendInstance.delete(`/pengumuman/${id}`);
}

export function useDeleteAnnouncementById() {
  const queryClient = useQueryClient();
  const [error, setError] = useState<string>(DEFAULT_ERROR_MESSAGE);

  const mutation = useMutation({
    mutationFn: async ({ id }: { id: string }) =>
      await deleteAnnoundementById(id),
    onError: (error: AxiosError<ErrorResponse>) => {
      const message = handleAxiosError(error)?.message;
      if (message) {
        setError(message);
      }
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["announcement", "fetch"],
      });
      queryClient.invalidateQueries({
        queryKey: ["announcement", variables.id],
      });
    },
  });

  return {
    ...mutation,
    error,
  };
}
