import { ENV } from "@/env";
import { axiosBackendInstance } from "@/services/axiosInstance";
import { ErrorResponse } from "@/types/responses/errorResponse.type";
import { AxiosError } from "axios";

export function handleAxiosError(
  error: AxiosError<ErrorResponse>,
): ErrorResponse | null {
  if (!error.response) {
    return null;
  }
  if (error.response.status >= 500) {
    return {
      ...error.response.data,
      message: "Server mengalami kesalahan, silakan coba lagi",
    };
  }
  return error.response.data;
}

export function convertToIndonesianDate(date: Date): string {
  return date
    .toLocaleString("id-ID", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      timeZone: "Asia/Jakarta",
    })
    .replace(/\./g, ":");
}

export const getUrlFromFile = (
  file: File,
  callback?: (url: string) => void,
) => {
  const reader = new FileReader();
  reader.onload = (e: ProgressEvent<FileReader>) => {
    // setUrl(e.target?.result as string);
    if (callback) {
      callback(e.target?.result as string);
    }
  };
  reader.readAsDataURL(file);
};

export async function fetchFileFromUrl(url: string): Promise<File> {
  const filename = url.split("/").pop() || "announcement-image";
  const response = await axiosBackendInstance.get(
    `${ENV.APP.BACKEND_URL}/files/${url}`,
    {
      responseType: "blob",
    },
  );
  const blob = response.data;
  const fileExtension =
    url.split(".").pop() ||
    response.headers["content-type"]?.split("/").pop() ||
    "jpg";
  const file = new File([blob], filename || `image.${fileExtension}`, {
    type: blob.type,
  });
  return file
}
