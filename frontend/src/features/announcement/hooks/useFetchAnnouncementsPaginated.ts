import { axiosBackendInstance } from "@/services/axiosInstance";
import { useQuery } from "@tanstack/react-query";
import { Announcement } from "../types/announcement.type";
import { PaginationQueryParams } from "@/interfaces/pagination.interface";
import { PaginationResponse } from "@/interfaces/responses/paginationRespose.interface";

function fetchAnnouncementsPaginated(queryParams: PaginationQueryParams) {
  return axiosBackendInstance.get<PaginationResponse<Announcement>>("/pengumuman", { params: queryParams });
}

export function useFetchAnnouncementsPaginated(
  queryParams: PaginationQueryParams = {}
) {
  return useQuery({
    queryKey: ["announcement", "fetch", "pagination", queryParams],
    queryFn: async () => {
      const response = await fetchAnnouncementsPaginated(queryParams);
      return response.data;
    },
  });
}
