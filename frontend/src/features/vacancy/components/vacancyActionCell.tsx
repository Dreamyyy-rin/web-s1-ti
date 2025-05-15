import DatatableDropdown from "@/components/ui/custom/datatable/datatableDropdown";
import { handleAxiosError } from "@/lib/helpers";
import { toast } from "sonner";
import { useDeleteVacancyById } from "../hooks/useDeleteVacancyById";
import { useNavigate } from "@tanstack/react-router";
import { Vacancy } from "../types/vacancy.type";
import React from "react";

export const VacancyActionCell = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<"div"> & { data: Vacancy }
>(({ data, ...props }, ref) => {
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
    <div className="text-right" ref={ref} {...props}>
      <DatatableDropdown
        detailFn={handleOnClickDetail}
        editFn={handleOnClickEdit}
        deleteFn={handleOnClickDelete}
      />
    </div>
  );
});
