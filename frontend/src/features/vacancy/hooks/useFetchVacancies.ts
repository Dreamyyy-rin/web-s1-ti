import { axiosBackendInstance } from "@/services/axiosInstance";
import { useQuery } from "@tanstack/react-query";
import { Vacancy } from "../types/vacancy.type";

function fetchVacancies() {
  return axiosBackendInstance.get("/lowongan");
}

export function useFetchVacancies() {
  return useQuery({
    queryKey: ["vacancy", "fetch", "all"],
    queryFn: async () => {
      const response = await fetchVacancies();
      return response.data as Vacancy[];
    },
  });
}
