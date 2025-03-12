import { axiosBackendInstance } from "@/services/axiosInstance";
import { AnnouncementSchema } from "../types/announcement.schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { handleAxiosError } from "@/lib/helpers";
import { ErrorResponse } from "@/types/responses/errorResponse.type";
import { AxiosError } from "axios";
import { DEFAULT_ERROR_MESSAGE } from "@/constants/error.constant";

function createAnnouncement(data: AnnouncementSchema) {
  console.log("data to send: ", data)
  return axiosBackendInstance.post(
    "/pengumuman",
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

export function useCreateAnnouncement() {
  const queryClient = useQueryClient();
  const [error, setError] = useState(DEFAULT_ERROR_MESSAGE);

  const mutation = useMutation({
    mutationFn: async (data: AnnouncementSchema) => {
      const response = await createAnnouncement(data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["announcement", "fetch"] });
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
