import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Link } from "@tanstack/react-router";
import ServerDataTable from "@/components/ui/custom/datatable/serverDataTable";
import { useFetchAdminsPaginated } from "../hooks/userFetchAdminsPaginated";
import { adminColumns } from "./adminColumn";

const AdminTopToolbarSlot = () => {
  return (
    <div className="flex flex-1 items-center justify-end">
      <Link to="/admin/admin-account/add">
        <Button size="sm" className="gap-2">
          <Plus className="size-4" />
          Tambah
        </Button>
      </Link>
    </div>
  );
};

const AdminDataTable = () => {
  return (
    <div>
      <ServerDataTable
        columns={adminColumns}
        topToolbarSlot={<AdminTopToolbarSlot />}
        fetchFunction={useFetchAdminsPaginated}
        searchPlaceholder="Cari nama atau email..."
      />
    </div>
  );
};

export default AdminDataTable;
