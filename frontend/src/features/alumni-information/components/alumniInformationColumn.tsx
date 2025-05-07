import { ColumnDef } from "@tanstack/react-table";
import DatatableDropdown from "@/components/ui/custom/datatable/datatableDropdown";
import React from "react";
import { useNavigate } from "@tanstack/react-router";
import { convertToIndonesianDate, handleAxiosError } from "@/lib/helpers";
import { toast } from "sonner";
import { useDeleteAlumniInformationById } from "../hooks/useDeleteAlumniInformationById";
import { AlumniInformation } from "../types/alumniInformation.type";

const AlumniInformationActionCell = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<"div"> & { data: AlumniInformation }
>(({ data }) => {
  const navigate = useNavigate();
  const { mutate } = useDeleteAlumniInformationById();
  const handleOnClickDetail = () => {
    navigate({
      // TODO: RENAME ALUMNI ROUTER
      to: "/admin/alumni-info/$alumniInfoId",
      params: { alumniInfoId: String(data.id) },
    });
  };
  const handleOnClickEdit = () => {
    navigate({
      to: "/admin/alumni-info/$alumniInfoId/edit",
      params: { alumniInfoId: String(data.id) },
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
    <div className="text-right">
      <DatatableDropdown
        detailFn={handleOnClickDetail}
        editFn={handleOnClickEdit}
        deleteFn={handleOnClickDelete}
      />
    </div>
  );
});

export const alumniInformationColumns: ColumnDef<AlumniInformation>[] = [
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
      const alumniInformation = row.original;
      return <AlumniInformationActionCell data={alumniInformation} />;
    },
  },
];
