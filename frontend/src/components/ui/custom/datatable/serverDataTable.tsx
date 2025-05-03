import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  OnChangeFn,
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

export interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  topToolbarSlot?: React.ReactNode;
  pagination: DatatablePaginationProps;
  search: string;
  pageCount: number;
  onSearchChange: React.Dispatch<React.SetStateAction<string>>;
  onPaginationChange: React.Dispatch<
    React.SetStateAction<DatatablePaginationProps>
  >;
}

export interface DatatablePaginationProps {
  index: number;
  itemPerPage: number;
}

const ServerDataTableComponent = <TData extends object, TValue = unknown>(
  {
    columns,
    data,
    className,
    topToolbarSlot,
    search,
    onSearchChange,
    pagination,
    onPaginationChange,
    pageCount,
    ...props
  }: React.ComponentPropsWithoutRef<"div"> & DataTableProps<TData, TValue>,
  ref: React.ForwardedRef<HTMLDivElement>,
) => {
  const onReactTablePaginationChange: OnChangeFn<PaginationState> = (
    updaterOrValue,
  ) => {
    const next =
      typeof updaterOrValue == "function"
        ? updaterOrValue({
            pageIndex: pagination.index,
            pageSize: pagination.itemPerPage,
          })
        : updaterOrValue;
    onPaginationChange({
      index: next.pageIndex,
      itemPerPage: next.pageSize,
    });
  };

  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  // const [globalSearch, setGlobalSearch] = useState<string>(search ?? "")
  // const [tablePagination, setTablePagination] = useState<PaginationState>({
  //   pageIndex: pagination?.pageIndex ?? 0,
  //   pageSize: pagination?.pageSize ?? 10,
  // })
  // setTablePagination({})

  const table = useReactTable({
    get data() {
      return data;
    },
    get columns() {
      return columns;
    },
    get pageCount() {
      return pageCount;
    },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    globalFilterFn: "includesString",
    onGlobalFilterChange: onSearchChange,
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: onReactTablePaginationChange,
    manualPagination: true,
    manualFiltering: true,
    initialState: {
      pagination: {
        pageIndex: 0,
        pageSize: 10,
      },
    },
    state: {
      get globalFilter() {
        return search;
      },
      get columnVisibility() {
        return columnVisibility;
      },
      get pagination() {
        if (!pagination)
          return undefined; //Maybe this is for automatic pagination later
        else {
          return {
            pageIndex: pagination.index,
            pageSize: pagination.itemPerPage,
          };
        }
      },
    },
  });

  return (
    <div ref={ref} {...props} className={cn("rounded-md space-y-2", className)}>
      <DatatableViewOptions table={table}>
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
            {table.getRowModel().rows?.length ? (
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
