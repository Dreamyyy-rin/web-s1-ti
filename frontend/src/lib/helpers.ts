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
