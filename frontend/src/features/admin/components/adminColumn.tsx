import DatatableDropdown from "@/components/ui/custom/datatable/datatableDropdown";
import React from "react";
import { useDeleteAdminById } from "../hooks/useDeleteAdminById";
import { toast } from "sonner";
import { handleAxiosError } from "@/lib/helpers";
import { User } from "@/features/user/types/user.type";
import { ColumnDef } from "@tanstack/react-table";
import { useNavigate } from "@tanstack/react-router";

const AdminActionCell = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<"div"> & { data: User }
>(({ data }) => {
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
    <div>
      <DatatableDropdown
        deleteFn={handleOnClickDelete}
        editFn={handleOnClickEdit}
      />
    </div>
  );
});

export const adminColumns: ColumnDef<User>[] = [
  {
    id: "name",
    accessorKey: "name",
    header: () => <div className="text-start">Nama</div>,
    cell: ({ row }) => {
      const name = String(row.getValue("name"));
      return <div className="text-start font-medium">{name}</div>;
    },
  },
  {
    id: "email",
    accessorKey: "email",
    header: () => <div className="text-start">Nama</div>,
    cell: ({ row }) => {
      const email = String(row.getValue("email"));
      return <div className="text-start font-medium">{email}</div>;
    },
  },
  {
    id: "actions",
    enableHiding: false,
    header: () => <div className="text-start">Aksi</div>,
    cell: ({ row }) => {
      const admin = row.original;
      return <AdminActionCell data={admin} />;
    },
  },
];
