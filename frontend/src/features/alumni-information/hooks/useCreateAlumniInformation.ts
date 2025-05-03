import { axiosBackendInstance } from "@/services/axiosInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { handleAxiosError } from "@/lib/helpers";
import { ErrorResponse } from "@/interfaces/responses/errorResponse.interface";
import { AxiosError } from "axios";
import { DEFAULT_ERROR_MESSAGE } from "@/constants/error.constant";
import { AlumniInformationSchema } from "../types/alumniInformation.schema";

function createAlumniInformation(data: AlumniInformationSchema) {
  return axiosBackendInstance.post(
    "/berita-alumni",
    {
      judul: data.title,
      isi: data.content,
      file: data.file,
    },
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );
}

export function useCreateAlumniInformation() {
  const queryClient = useQueryClient();
  const [error, setError] = useState(DEFAULT_ERROR_MESSAGE);

  const mutation = useMutation({
    mutationFn: async (data: AlumniInformationSchema) => {
      const response = await createAlumniInformation(data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["alumni-information", "fetch"] });
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
