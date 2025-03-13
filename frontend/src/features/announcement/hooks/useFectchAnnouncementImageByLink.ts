import { axiosBackendInstance } from "@/services/axiosInstance";
import { useQuery } from "@tanstack/react-query";

function fetchAnnouncementImageByLink(link: string) {
  return axiosBackendInstance.get(`/files/${link}`, { responseType: "blob" });
}

export function useFetchAnnouncementImageByLink(link: string) {
  return useQuery({
    queryKey: ["announcement", link, "fetch", "image"],
    queryFn: async (): Promise<File> => {
      const filename = link.split("/").pop() || "announcement-image";
      const response = await fetchAnnouncementImageByLink(link);
      const blob = response.data;
      const fileExtension =
        link.split(".").pop() ||
        response.headers["content-type"]?.split("/").pop() ||
        "jpg";
      const file = new File([blob], filename || `image.${fileExtension}`, {
        type: blob.type,
      });
      return file;
    },
  });
}
