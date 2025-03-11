import { Button } from "@/components/ui/button";
import { Table } from "@tanstack/react-table";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../select";

export function DataTablePagination<TData>({ table }: { table: Table<TData> }) {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-2 ">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} dari&nbsp;
          {table.getFilteredRowModel().rows.length} baris terpilih
        </div>
        <div className="flex items-center gap-2">
          <p className="whitespace-nowrap text-sm font-medium">
            Baris <span className="hidden md:inline">per halaman</span>
          </p>
          <Select
            defaultValue={table.getState().pagination.pageSize.toString()}
            onValueChange={(value) => {
              table.setPageSize(Number(value));
            }}
          >
            <SelectTrigger className="flex h-8 w-[70px]">
              <SelectValue placeholder={table.getState().pagination.pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <SelectItem key={pageSize} value={pageSize.toString()}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center">
          <span>Halaman&nbsp;</span>
          {table.getState().pagination.pageIndex + 1}
          <span>&nbsp;dari&nbsp;</span>
          {table.getPageCount()}
        </div>
        <div className="flex items-center justify-end space-x-2 ">
          <Button
            variant="outline"
            className="hidden lg:flex"
            size="icon"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronsLeft />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronLeft />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <ChevronRight />
          </Button>
          <Button
            variant="outline"
            className="hidden lg:flex"
            size="icon"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            <ChevronsRight />
          </Button>
        </div>
      </div>
    </div>
  );
}
