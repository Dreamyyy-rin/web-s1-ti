import { axiosBackendInstance } from "@/services/axiosInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { handleAxiosError } from "@/lib/helpers";
import { ErrorResponse } from "@/types/responses/errorResponse.type";
import { AxiosError } from "axios";
import { DEFAULT_ERROR_MESSAGE } from "@/constants/error.constant";
import { VacancySchema } from "../types/vacancy.schema";

function createVacancy(data: VacancySchema) {
  return axiosBackendInstance.post("/lowongan", {
    judul: data.title,
    deskripsi: data.description,
    link_pendaftaran: data.link_pendaftaran,
    // file: data.file,
  });
}

export function useCreateVacancy() {
  const queryClient = useQueryClient();
  const [error, setError] = useState(DEFAULT_ERROR_MESSAGE);

  const mutation = useMutation({
    mutationFn: async (data: VacancySchema) => {
      const response = await createVacancy(data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["vacancy", "fetch"] });
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
