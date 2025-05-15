import DatatableDropdown from "@/components/ui/custom/datatable/datatableDropdown";
import { handleAxiosError } from "@/lib/helpers";
import { toast } from "sonner";
import { useDeleteAdminById } from "../hooks/useDeleteAdminById";
import { useNavigate } from "@tanstack/react-router";
import React from "react";
import { User } from "@/features/user/types/user.type";

export const AdminActionCell = React.forwardRef<
HTMLDivElement,
React.ComponentPropsWithoutRef<"div"> & { data: User }
>(({ data , ...props}, ref) => {
const { mutate } = useDeleteAdminById();
const navigate = useNavigate();

const handleOnClickEdit = () => {
  navigate({
    to: "/admin/admin-account/$adminId/edit",
    params: { adminId: String(data.id) },
  });
};

const handleOnClickDelete = () => {
  mutate(
    { id: String(data.id) },
    {
      onSuccess: () => {
        toast.success("Berhasil", {
          description: "Admin berhasil dihapus",
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
  <div ref={ref} {...props}>
    <DatatableDropdown
      deleteFn={handleOnClickDelete}
      editFn={handleOnClickEdit}
    />
  </div>
);
});