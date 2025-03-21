import { axiosBackendInstance } from "@/services/axiosInstance";
import { useQuery } from "@tanstack/react-query";
import { Announcement } from "../types/announcement.type";

function fetchAnnouncements() {
  return axiosBackendInstance.get("/pengumuman");
}

export function useFetchAnnouncements() {
  return useQuery({
    queryKey: ["announcement", "fetch", "all"],
    queryFn: async () => {
      const response = await fetchAnnouncements();
      return response.data as Announcement[];
    },
  });
}
