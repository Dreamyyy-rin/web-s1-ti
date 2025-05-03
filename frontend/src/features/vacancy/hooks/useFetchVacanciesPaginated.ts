import { axiosBackendInstance } from "@/services/axiosInstance";
import { useQuery } from "@tanstack/react-query";
import { Vacancy } from "../types/vacancy.type";
import { PaginationResponse } from "@/interfaces/responses/paginationRespose.interface";
import { PaginationQueryParams } from "@/interfaces/pagination.interface";

function fetchVacanciesPaginated(queryParams: PaginationQueryParams) {
  return axiosBackendInstance.get<PaginationResponse<Vacancy>>("/lowongan", {params: queryParams});
}

export function useFetchVacanciesPaginated(queryParams: PaginationQueryParams = {}) {
  return useQuery({
    queryKey: ["vacancy", "fetch", "paginated", queryParams],
    queryFn: async () => {
      const response = await fetchVacanciesPaginated(queryParams);
      return response.data;
    },
  });
}
