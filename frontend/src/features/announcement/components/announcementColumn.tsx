import { ColumnDef } from "@tanstack/react-table";
import { Announcement } from "../types/announcement.type";
import DatatableDropdown from "@/components/ui/custom/datatable/datatableDropdown";
import { useDeleteAnnouncementById } from "../hooks/useDeleteAnnouncementById";
import React from "react";
import { useNavigate } from "@tanstack/react-router";
import { convertToIndonesianDate, handleAxiosError } from "@/lib/helpers";
import { toast } from "sonner";

const AnnouncementActionCell = React.forwardRef<
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
          toast.success("Gagal", {
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

export const announcementColumns: ColumnDef<Announcement>[] = [
  {
    id: "title",
    accessorKey: "judul",
    header: () => <div className="text-start">Judul</div>,
    cell: ({ row }) => {
      const title = String(row.getValue("title"));
      return <div className="text-start font-medium">{title}</div>;
    },
  },
  {
    id: "last_updated",
    accessorKey: "updated_at",
    header: () => <div className="text-start">Terakhir Diperbarui</div>,
    cell: ({ row }) => {
      const lastUpdated = String(row.getValue("last_updated"));
      const formattedDate = convertToIndonesianDate(new Date(lastUpdated));
      return <div className="text-start font-medium">{formattedDate}</div>;
    },
  },
  {
    id: "actions",
    enableHiding: false,
    header: () => <div className="text-right">Aksi</div>,
    cell: ({ row }) => {
      const announcement = row.original;
      return <AnnouncementActionCell data={announcement} />;
    },
  },
];
