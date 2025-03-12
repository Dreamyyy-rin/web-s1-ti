import { ErrorResponse } from "@/types/responses/errorResponse.type";
import { AxiosError } from "axios";

export function handleAxiosError(
  error: AxiosError<ErrorResponse>,
): ErrorResponse | null {
  if (!error.response) {
    return null
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