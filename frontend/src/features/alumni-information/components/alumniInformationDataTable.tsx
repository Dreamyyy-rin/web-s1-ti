import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Link } from "@tanstack/react-router";
import ServerDataTable, { DatatablePaginationProps } from "@/components/ui/custom/datatable/serverDataTable";
import { useState } from "react";
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
  const [search, setSearch] = useState("");
  const [pagination, setPagination] = useState<DatatablePaginationProps>({
    index: 0,
    itemPerPage: 10,
  });

  const { data, isLoading } = useFetchAlumniInformationsPaginated({
    page: pagination.index + 1,
    per_page: pagination.itemPerPage,
    search: search,
  });

  return (
    <div>
      {isLoading ? null : (
        <ServerDataTable
          columns={alumniInformationColumns}
          data={data? data.data : []}
          topToolbarSlot={<AlumniInformationTopToolbarSlot />}
          search={search}
          pagination={pagination}
          pageCount={data? Math.ceil(data.meta.total / pagination.itemPerPage) : 0}
          onSearchChange={setSearch}
          onPaginationChange={setPagination}
        />
      )}
    </div>
  );
};

export default AlumniInformationDataTable;
