import { axiosBackendInstance } from "@/services/axiosInstance";
import { useQuery } from "@tanstack/react-query";
import { PaginationQueryParams } from "@/interfaces/pagination.interface";
import { PaginationResponse } from "@/interfaces/responses/paginationRespose.interface";
import { AlumniInformation } from "../types/alumniInformation.type";

function fetchAlumniInformationPaginated(queryParams: PaginationQueryParams) {
  return axiosBackendInstance.get<PaginationResponse<AlumniInformation>>("/berita-alumni", { params: queryParams });
}

export function useFetchAlumniInformationsPaginated(
  queryParams: PaginationQueryParams = {}
) {
  return useQuery({
    queryKey: ["alumni-information", "fetch", "pagination", queryParams],
    queryFn: async () => {
      const response = await fetchAlumniInformationPaginated(queryParams);
      return response.data;
    },
  });
}
