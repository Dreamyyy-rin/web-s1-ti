import { axiosBackendInstance } from "@/services/axiosInstance";
import { AnnouncementSchema } from "../types/announcement.schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DEFAULT_ERROR_MESSAGE } from "@/constants/error.constant";
import { useState } from "react";
import { AxiosError } from "axios";
import { ErrorResponse } from "@/types/responses/errorResponse.type";
import { handleAxiosError } from "@/lib/helpers";

interface updateAnnouncementParams {
  id: string;
  data: AnnouncementSchema;
}

function updateAnnouncementById(params: updateAnnouncementParams) {
  return axiosBackendInstance.post(
    `/pengumuman/${params.id}`,
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

export function useUpdateAnnouncement() {
  const queryClient = useQueryClient();
  const [error, setError] = useState(DEFAULT_ERROR_MESSAGE);

  const mutation = useMutation({
    mutationFn: async (params: updateAnnouncementParams) => {
      const response = await updateAnnouncementById(params);
      return response.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["announcement", "fetch"],
      });
      queryClient.invalidateQueries({
        queryKey: ["announcement", variables.id],
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
