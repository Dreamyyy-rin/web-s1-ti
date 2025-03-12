import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
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

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  topToolbarSlot?: React.ReactNode;
}

const Datatable = <TData extends object, TValue = unknown>(
  {
    columns,
    data,
    className,
    topToolbarSlot,
    ...props
  }: React.ComponentPropsWithoutRef<"div"> & DataTableProps<TData, TValue>,
  ref: React.ForwardedRef<HTMLDivElement>,
) => {

  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    globalFilterFn: "includesString",
    onColumnVisibilityChange: setColumnVisibility,
    initialState: {
      pagination: {
        pageIndex: 0,
        pageSize: 10,
      },
    },
    state: {
      columnVisibility
    }
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

export default React.forwardRef(Datatable) as <
  TData extends object,
  TValue = unknown,
>(
  props: React.ComponentPropsWithoutRef<"div"> & DataTableProps<TData, TValue>,
  ref: React.ForwardedRef<HTMLDivElement>,
) => React.ReactElement;
