import { axiosBackendInstance } from "@/services/axiosInstance";
import { useQuery } from "@tanstack/react-query";
import { PaginationQueryParams } from "@/interfaces/pagination.interface";
import { PaginationResponse } from "@/interfaces/responses/paginationRespose.interface";
import { User } from "@/features/user/types/user.type";

function fetchAdminsPaginated(queryParams: PaginationQueryParams) {
  return axiosBackendInstance.get<PaginationResponse<User>>("/admin", { params: queryParams });
}

export function useFetchAdminsPaginated(
  queryParams: PaginationQueryParams = {}
) {
  return useQuery({
    queryKey: ["admin", "fetch", "pagination", queryParams],
    queryFn: async () => {
      const response = await fetchAdminsPaginated(queryParams);
      return response.data;
    },
  });
}
