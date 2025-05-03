import { axiosBackendInstance } from "@/services/axiosInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DEFAULT_ERROR_MESSAGE } from "@/constants/error.constant";
import { useState } from "react";
import { AxiosError } from "axios";
import { ErrorResponse } from "@/interfaces/responses/errorResponse.interface";
import { handleAxiosError } from "@/lib/helpers";
import { AlumniInformationSchema } from "../types/alumniInformation.schema";

interface updateAlumnniInformationParams {
  id: string;
  data: AlumniInformationSchema;
}

function updateAlumniInformationById(params: updateAlumnniInformationParams) {
  return axiosBackendInstance.post(
    `/berita-alumni/${params.id}`,
    {
      judul: params.data.title,
      isi: params.data.content,
      file: params.data.file,
    },
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );
}

export function useUpdateAlumniInformation() {
  const queryClient = useQueryClient();
  const [error, setError] = useState(DEFAULT_ERROR_MESSAGE);

  const mutation = useMutation({
    mutationFn: async (params: updateAlumnniInformationParams) => {
      const response = await updateAlumniInformationById(params);
      return response.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["alumni-information", "fetch"],
      });
      queryClient.invalidateQueries({
        queryKey: ["alumni-information", variables.id],
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
