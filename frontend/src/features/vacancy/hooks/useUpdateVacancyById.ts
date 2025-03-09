import { axiosBackendInstance } from "@/services/axiosInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DEFAULT_ERROR_MESSAGE } from "@/constants/error.constant";
import { useState } from "react";
import { AxiosError } from "axios";
import { ErrorResponse } from "@/types/responses/errorResponse.type";
import { handleAxiosError } from "@/lib/helpers";
import { VacancySchema } from "../types/vacancy.schema";

interface updateVacancyParams {
  id: number;
  data: VacancySchema;
}

function updateVacancyById(params: updateVacancyParams) {
  return axiosBackendInstance.post(`/lowongan/${params.id}`, {
    judul: params.data.title,
    deskripsi: params.data.description,
    link_pendaftaran: params.data.link_pendaftaran,
    // file: data.file,
  });
}

export function useUpdateVacancyById() {
  const queryClient = useQueryClient();
  const [error, setError] = useState(DEFAULT_ERROR_MESSAGE);

  const mutation = useMutation({
    mutationFn: async (params: updateVacancyParams) => {
      const response = await updateVacancyById(params);
      return response.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["vacancy", "fetch"],
      });
      queryClient.invalidateQueries({
        queryKey: ["vacancy", variables.id],
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
