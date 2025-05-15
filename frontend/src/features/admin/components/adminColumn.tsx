import { User } from "@/features/user/types/user.type";
import { ColumnDef } from "@tanstack/react-table";
import { AdminActionCell } from "./adminActionCell";


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
