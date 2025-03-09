import { axiosBackendInstance } from "@/services/axiosInstance";
import { useQuery } from "@tanstack/react-query";

function fetchAnnouncementById(id: number) {
  return axiosBackendInstance.get(`/pengumuman/${id}`);
}

export function useFetchAnnouncements(id: number) {
  return useQuery({
    queryKey: ["announcement", id, "fetch"],
    queryFn: async () => {
      const response = await fetchAnnouncementById(id);
      return response.data;
    },
  });
}
