import { axiosBackendInstance } from "@/services/axiosInstance";
import { useQuery } from "@tanstack/react-query";

function fetchVacanciesById(id: string) {
  return axiosBackendInstance.get(`/lowongan/${id}`);
}

export function useFetchVacancies(id: string) {
  return useQuery({
    queryKey: ["vacancy", id, "fetch"],
    queryFn: async () => {
      const response = await fetchVacanciesById(id);
      return response.data;
    },
  });
}
