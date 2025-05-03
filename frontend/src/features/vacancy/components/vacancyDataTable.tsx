import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useFetchVacanciesPaginated } from "../hooks/useFetchVacanciesPaginated";
import { vacancyColumns } from "./vacancyColumn";
import { useState } from "react";
import ServerDataTable, {
  DatatablePaginationProps,
} from "@/components/ui/custom/datatable/serverDataTable";

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
// TODO: ADD LOADING TO ALL DATA TABLE
const VacancyDataTable = () => {
  const [search, setSearch] = useState("");
  const [pagination, setPagination] = useState<DatatablePaginationProps>({
    index: 0,
    itemPerPage: 10,
  });

  const { data, isLoading } = useFetchVacanciesPaginated({
    page: pagination.index + 1,
    per_page: pagination.itemPerPage,
    search: search,
  });

  return (
    <div>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <ServerDataTable
          columns={vacancyColumns}
          data={data? data.data : []}
          topToolbarSlot={<VacancyTopToolbarSlot />}
          pagination={pagination}
          search={search}
          pageCount={data ? Math.ceil(data.meta.total / data.meta.per_page) : 0}
          onSearchChange={setSearch}
          onPaginationChange={(value) => {
            setPagination(value);
          }}
        />
      )}
    </div>
  );
};

export default VacancyDataTable;
