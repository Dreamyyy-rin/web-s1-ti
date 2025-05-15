import DatatableDropdown from "@/components/ui/custom/datatable/datatableDropdown";
import { handleAxiosError } from "@/lib/helpers";
import { toast } from "sonner";
import { useDeleteAnnouncementById } from "../hooks/useDeleteAnnouncementById";
import { useNavigate } from "@tanstack/react-router";
import { Announcement } from "../types/announcement.type";
import React from "react";

export const AnnouncementActionCell = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<"div"> & { data: Announcement }
>(({ data, ...props }, ref) => {
  const navigate = useNavigate();
  const { mutate } = useDeleteAnnouncementById();
  const handleOnClickDetail = () => {
    navigate({
      to: "/admin/announcement/$announcementId",
      params: { announcementId: String(data.id) },
    });
  };
  const handleOnClickEdit = () => {
    navigate({
      to: "/admin/announcement/$announcementId/edit",
      params: { announcementId: String(data.id) },
    });
  };
  const handleOnClickDelete = () => {
    mutate(
      { id: String(data.id) },
      {
        onSuccess: () => {
          toast.success("Berhasil", {
            description: "Pengumuman berhasil dihapus",
          });
        },
        onError: (error) => {
          const message = handleAxiosError(error)?.message;
          toast.error("Gagal", {
            description: message,
          });
        },
      },
    );
  };
  return (
    <div className="text-right" ref={ref} {...props}>
      <DatatableDropdown
        detailFn={handleOnClickDetail}
        editFn={handleOnClickEdit}
        deleteFn={handleOnClickDelete}
      />
    </div>
  );
});
