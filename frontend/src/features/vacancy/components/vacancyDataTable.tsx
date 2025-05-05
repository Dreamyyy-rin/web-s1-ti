import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useFetchVacanciesPaginated } from "../hooks/useFetchVacanciesPaginated";
import { vacancyColumns } from "./vacancyColumn";
import ServerDataTable from "@/components/ui/custom/datatable/serverDataTable";

const VacancyTopToolbarSlot = () => {
  return (
    <div className="flex flex-1 items-center justify-end">
      <Link to="/admin/vacancy/add">
        <Button size="sm" className="gap-2">
          <Plus className="size-4" />
          Tambah
        </Button>
      </Link>
    </div>
  );
};

const VacancyDataTable = () => {
  return (
    <div>
      <ServerDataTable
        columns={vacancyColumns}
        topToolbarSlot={<VacancyTopToolbarSlot />}
        fetchFunction={useFetchVacanciesPaginated}
        searchPlaceholder="Cari judul..."
      />
    </div>
  );
};

export default VacancyDataTable;
