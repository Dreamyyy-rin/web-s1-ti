import { useFetchAnnouncementsPaginated } from "../hooks/useFetchAnnouncementsPaginated";
import { announcementColumns } from "./announcementColumn";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Link } from "@tanstack/react-router";
import ServerDataTable from "@/components/ui/custom/datatable/serverDataTable";

const AnnouncementTopToolbarSlot = () => {
  return (
    <div className="flex flex-1 items-center justify-end">
      <Link to="/admin/announcement/add">
        <Button size="sm" className="gap-2">
          <Plus className="size-4" />
          Tambah
        </Button>
      </Link>
    </div>
  );
};

const AnnouncementDataTable = () => {
  return (
    <div>
      <ServerDataTable
        columns={announcementColumns}
        topToolbarSlot={<AnnouncementTopToolbarSlot />}
        fetchFunction={useFetchAnnouncementsPaginated}
        searchPlaceholder="Cari judul..."
      />
    </div>
  );
};

export default AnnouncementDataTable;
