import { axiosBackendInstance } from "@/services/axiosInstance";
import { useQuery } from "@tanstack/react-query";
import { Announcement } from "../types/announcement.type";

function fetchAnnouncementById(id: string) {
  return axiosBackendInstance.get(`/pengumuman/${id}`);
}

export function useFetchAnnouncementById(id: string) {
  return useQuery({
    queryKey: ["announcement", id, "fetch"],
    queryFn: async () => {
      const response = await fetchAnnouncementById(id);
      return response.data as Announcement;
    },
  });
}
