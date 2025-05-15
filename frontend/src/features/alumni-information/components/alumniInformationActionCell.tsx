import { useNavigate } from "@tanstack/react-router";
import { useDeleteAlumniInformationById } from "../hooks/useDeleteAlumniInformationById";
import { AlumniInformation } from "../types/alumniInformation.type";
import { toast } from "sonner";
import { handleAxiosError } from "@/lib/helpers";
import DatatableDropdown from "@/components/ui/custom/datatable/datatableDropdown";
import React from "react";

export const AlumniInformationActionCell =  React.forwardRef<
HTMLDivElement,
React.ComponentPropsWithoutRef<"div"> & { data: AlumniInformation }
>(({ data , ...props}, ref) => {
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
    <div className="text-right" {...props} ref={ref}>
      <DatatableDropdown
        detailFn={handleOnClickDetail}
        editFn={handleOnClickEdit}
        deleteFn={handleOnClickDelete}
      />
    </div>
  );
});