import { axiosBackendInstance } from "@/services/axiosInstance";
import { useQuery } from "@tanstack/react-query";
import { SuccessResponse } from "@/interfaces/responses/successResponse.interface";
import { User } from "@/features/user/types/user.type";

function fetchAdminById(id: string) {
  return axiosBackendInstance.get<SuccessResponse<User>>(`/admin/${id}`);
}

export function useFetchAdminById(id: string) {
  return useQuery({
    queryKey: ["admin", id, "fetch"],
    queryFn: async () => {
      const response = await fetchAdminById(id);
      return response.data ;
    },
  });
}
