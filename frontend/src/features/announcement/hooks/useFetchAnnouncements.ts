import { axiosBackendInstance } from "@/services/axiosInstance";
import { useQuery } from "@tanstack/react-query";

function fetchAnnouncements() {
  return axiosBackendInstance.get("/pengumuman");
}

export function useFetchAnnouncements() {
  return useQuery({
    queryKey: ["announcement", "fetch", "all"],
    queryFn: async () => {
      const response = await fetchAnnouncements();
      return response.data;
    },
  });
}
