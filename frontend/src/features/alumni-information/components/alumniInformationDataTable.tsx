import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Link } from "@tanstack/react-router";
import ServerDataTable from "@/components/ui/custom/datatable/serverDataTable";
import { useFetchAlumniInformationsPaginated } from "../hooks/useFetchAlumniInformationsPaginated";
import { alumniInformationColumns } from "./alumniInformationColumn";

const AlumniInformationTopToolbarSlot = () => {
  return (
    <div className="flex flex-1 items-center justify-end">
      <Link to="/admin/alumni-info/add">
        <Button size="sm" className="gap-2">
          <Plus className="size-4" />
          Tambah
        </Button>
      </Link>
    </div>
  );
};

const AlumniInformationDataTable = () => {
  return (
    <div>
      <ServerDataTable
        columns={alumniInformationColumns}
        topToolbarSlot={<AlumniInformationTopToolbarSlot />}
        fetchFunction={useFetchAlumniInformationsPaginated}
        searchPlaceholder="Cari judul..."
      />
    </div>
  );
};

export default AlumniInformationDataTable;
