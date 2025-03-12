import Datatable from "@/components/ui/custom/datatable/datatable";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useFetchVacancies } from "../hooks/useFetchVacancies";
import { vacancyColumns } from "./vacancyColumn";

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
  const { data, isLoading } = useFetchVacancies();

  return (
    <div>
      {isLoading ? null : (
        <Datatable
          columns={vacancyColumns}
          data={data}
          topToolbarSlot={<VacancyTopToolbarSlot />}
        />
      )}
    </div>
  );
};

export default VacancyDataTable;
