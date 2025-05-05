import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  PaginationState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../table";
import { cn } from "@/lib/utils";
import { ScrollArea } from "../../scroll-area";
import { Scrollbar } from "@radix-ui/react-scroll-area";
import { DataTablePagination } from "./datatablePagination";
import DatatableViewOptions from "./datatableViewOptions";
import { debounce } from "@/lib/helpers";
import { UseQueryResult } from "@tanstack/react-query";
import { PaginationResponse } from "@/interfaces/responses/paginationRespose.interface";
import { PaginationQueryParams } from "@/interfaces/pagination.interface";
import { Skeleton } from "../../skeleton";

export interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  topToolbarSlot?: React.ReactNode;
  defaultPagination?: DatatablePaginationProps;
  defaultSearch?: string;
  skeletonRows?: number;
  searchPlaceholder?: string;
  fetchFunction: (
    queryParams: PaginationQueryParams,
  ) => UseQueryResult<PaginationResponse<TData>, Error>;
}

export interface DatatablePaginationProps {
  index: number;
  itemPerPage: number;
}

const ServerDataTableComponent = <TData extends object, TValue = unknown>(
  {
    columns,
    className,
    topToolbarSlot,
    defaultPagination,
    defaultSearch,
    skeletonRows,
    fetchFunction,
    searchPlaceholder,
    ...props
  }: React.ComponentPropsWithoutRef<"div"> & DataTableProps<TData, TValue>,
  ref: React.ForwardedRef<HTMLDivElement>,
) => {
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [globalSearch, setGlobalSearch] = useState<string>(defaultSearch ?? "");
  const [delayedSearch, setDelayedSearch] = useState<string>(
    defaultSearch ?? "",
  );
  const [tablePagination, setTablePagination] = useState<PaginationState>({
    pageIndex: defaultPagination?.index ?? 0,
    pageSize: defaultPagination?.itemPerPage ?? 10,
  });

  const debouncedChange = debounce((value: string) => {
    setDelayedSearch(value);
  }, 1000);

  const onGlobalFilterChange = (value: string) => {
    setGlobalSearch(value);
    debouncedChange(value);
  };

  const { data, isLoading } = fetchFunction({
    page: tablePagination.pageIndex + 1,
    per_page: tablePagination.pageSize,
    search: delayedSearch,
  });

  const table = useReactTable({
    get data() {
      return data?.data ?? [];
    },
    get columns() {
      return columns;
    },
    get pageCount() {
      return data ? Math.ceil(data.meta.total / tablePagination.pageSize) : 0;
    },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    globalFilterFn: "includesString",
    onGlobalFilterChange: onGlobalFilterChange,
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: setTablePagination,
    manualPagination: true,
    manualFiltering: true,
    initialState: {
      pagination: {
        pageIndex: defaultPagination?.index ?? tablePagination.pageIndex,
        pageSize: defaultPagination?.itemPerPage ?? tablePagination.pageSize,
      },
    },
    state: {
      get globalFilter() {
        return globalSearch;
      },
      get columnVisibility() {
        return columnVisibility;
      },
      get pagination() {
        return tablePagination;
      },
    },
  });

  return (
    <div ref={ref} {...props} className={cn("rounded-md space-y-2", className)}>
      <DatatableViewOptions table={table} searchPlaceholder={searchPlaceholder}>
        {topToolbarSlot}
      </DatatableViewOptions>
      <ScrollArea className="relative h-full w-full rounded-sm border pe-1">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isLoading ? (
              Array.from({ length: skeletonRows ?? 10 }).map((_, index) =>
                table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={`${headerGroup.id}-${index}`}>
                    {headerGroup.headers.map((header) => {
                      return (
                        <TableCell key={header.id}>
                          <Skeleton className="h-2 my-2 w-full" />
                        </TableCell>
                      );
                    })}
                  </TableRow>
                )),
              )
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Data tidak ditemukan
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <Scrollbar orientation="horizontal" />
      </ScrollArea>
      <DataTablePagination table={table} />
    </div>
  );
};

const ServerDataTable = React.forwardRef(ServerDataTableComponent) as <
  TData extends object,
  TValue = unknown,
>(
  props: React.ComponentPropsWithoutRef<"div"> & DataTableProps<TData, TValue>,
  ref: React.ForwardedRef<HTMLDivElement>,
) => React.ReactElement;

export default ServerDataTable;
