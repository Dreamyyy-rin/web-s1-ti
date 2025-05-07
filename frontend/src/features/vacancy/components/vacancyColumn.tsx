import { ColumnDef } from "@tanstack/react-table";
import DatatableDropdown from "@/components/ui/custom/datatable/datatableDropdown";
import React from "react";
import { useNavigate } from "@tanstack/react-router";
import { convertToIndonesianDate, handleAxiosError } from "@/lib/helpers";
import { toast } from "sonner";
import { Vacancy } from "../types/vacancy.type";
import { useDeleteVacancyById } from "../hooks/useDeleteVacancyById";

const VacancyActionCell = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<"div"> & { data: Vacancy }
>(({ data }) => {
  const navigate = useNavigate();
  const { mutate } = useDeleteVacancyById();
  const handleOnClickDetail = () => {
    navigate({
      to: "/admin/vacancy/$vacancyId",
      params: { vacancyId: String(data.id) },
    });
  };
  const handleOnClickEdit = () => {
    navigate({
      to: "/admin/vacancy/$vacancyId/edit",
      params: { vacancyId: String(data.id) },
    });
  };
  const handleOnClickDelete = () => {
    mutate(
      { id: String(data.id) },
      {
        onSuccess: () => {
          toast.success("Berhasil", {
            description: "Lowongan berhasil dihapus",
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

export const vacancyColumns: ColumnDef<Vacancy>[] = [
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
      const vacancy = row.original;
      return <VacancyActionCell data={vacancy} />;
    },
  },
];
