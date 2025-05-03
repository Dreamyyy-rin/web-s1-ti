import { axiosBackendInstance } from "@/services/axiosInstance";
import { useQuery } from "@tanstack/react-query";
import { AlumniInformation } from "../types/alumniInformation.type";
import { SuccessResponse } from "@/interfaces/responses/successResponse.interface";

function fetchAlumniInformationById(id: string) {
  return axiosBackendInstance.get<SuccessResponse<AlumniInformation>>(`/berita-alumni/${id}`);
}

export function useFetchAlumniInformationById(id: string) {
  return useQuery({
    queryKey: ["alumni-information", id, "fetch"],
    queryFn: async () => {
      const response = await fetchAlumniInformationById(id);
      return response.data ;
    },
  });
}
