import AnnouncementForm from "@/features/announcement/components/announcementForm";
import { useFetchAnnouncementById } from "@/features/announcement/hooks/useFetchAnnouncementById";
import { useUpdateAnnouncement } from "@/features/announcement/hooks/useUpdateAnnouncementById";
import { AnnouncementSchema } from "@/features/announcement/types/announcement.schema";
import { handleAxiosError } from "@/lib/helpers";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";

export const Route = createFileRoute(
  "/admin/_adminLayout/announcement/$announcementId/edit",
)({
  component: RouteComponent,
  beforeLoad: () => {
    return {
      title: "Edit",
    };
  },
});

function RouteComponent() {
  const navigate = useNavigate();
  const { mutate: updateAnnouncementbyId } = useUpdateAnnouncement();
  const params = Route.useParams()
  const { data } = useFetchAnnouncementById(params.announcementId)
  const onUpdate = async (data: AnnouncementSchema) => {
    updateAnnouncementbyId({
      id: params.announcementId,
      data: data,
    }, {
      onError: (error) => {
        const message = handleAxiosError(error)?.message;
        toast.error("Gagal menambahkan pengumuman", {
          description: message,
        });
      },
      onSuccess: () => {
        toast.success("Berhasil", {
          description: "Pengumuman berhasil disimpan",
        });
        navigate({
          to: "/admin/announcement",
        });
      },
    });
  };
  return (
    <div>
      <AnnouncementForm onSave={onUpdate} data={data}  />
    </div>
  );
}
