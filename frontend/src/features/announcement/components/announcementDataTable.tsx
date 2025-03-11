import { useEffect } from "react";
import { useFetchAnnouncements } from "../hooks/useFetchAnnouncements";
import Datatable from "@/components/ui/custom/datatable/datatable";
import { announcementColumns } from "./announcementColumn";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Link } from "@tanstack/react-router";

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
  const { data, isLoading } = useFetchAnnouncements();

  useEffect(() => {
    console.log("data: ", data);
  }, [data]);

  return (
    <div>
      {isLoading ? null : (
        <Datatable
          columns={announcementColumns}
          data={data}
          topToolbarSlot={<AnnouncementTopToolbarSlot />}
        />
      )}
    </div>
  );
};

export default AnnouncementDataTable;
