import { ColumnDef } from "@tanstack/react-table";
import { Announcement } from "../types/announcement.type";
import DatatableDropdown from "@/components/ui/custom/datatable/datatableDropdown";
import { useDeleteAnnouncementById } from "../hooks/useDeleteAnnouncementById";
import React from "react";
import { useNavigate } from "@tanstack/react-router";

const AnnouncementActionCell = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<"div"> & { data: Announcement }
>(({ data }) => {
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
    mutate({ id: String(data.id) });
  };
  return (
    <div className="text-right">
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
    id: "content",
    accessorKey: "isi",
    header: () => <div className="text-start">Isi</div>,
    cell: ({ row }) => {
      const content = String(row.getValue("content"));
      return <div className="text-start font-medium">{content}</div>;
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
