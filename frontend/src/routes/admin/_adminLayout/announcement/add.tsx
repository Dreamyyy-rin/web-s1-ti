import AnnouncementForm from "@/features/announcement/components/announcementForm";
import { useCreateAnnouncement } from "@/features/announcement/hooks/useCreateAnnouncement";
import { AnnouncementSchema } from "@/features/announcement/types/announcement.schema";
import { handleAxiosError } from "@/lib/helpers";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/_adminLayout/announcement/add")({
  component: RouteComponent,
  beforeLoad: () => {
    return {
      title: "Tambah",
    };
  },
});

function RouteComponent() {
  const navigate = useNavigate();
  const { mutate } = useCreateAnnouncement();

  const onCreate = async (data: AnnouncementSchema) => {
    mutate(data, {
      onError: (error) => {
        const message = handleAxiosError(error)?.message;
        toast.error("Gagal menambahkan pengumuman", {
          description: message,
        });
      },
      onSuccess: () => {
        toast.success("Berhasil ", {
          description: "Pengumuman berhasil dibuat",
        });
        navigate({
          to: "/admin/announcement",
        });
      },
    });
  };

  return (
    <div>
      <AnnouncementForm onSave={onCreate} />
    </div>
  );
}
