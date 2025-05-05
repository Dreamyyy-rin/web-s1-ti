import { cn } from "@/lib/utils";
import { Table } from "@tanstack/react-table";
import React from "react";
import { Input } from "../../input";
import { Search, SlidersHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../../dropdown-menu";
import { Button } from "../../button";

const DataTableViewOptions = <TData extends object>(
  {
    table,
    className,
    children,
    searchPlaceholder,
    ...props
  }: React.ComponentPropsWithoutRef<"div"> & {
    table: Table<TData>;
    searchPlaceholder?: string;
  },
  ref: React.ForwardedRef<HTMLDivElement>,
) => {

  const handleOnChange = (value: string) => {
    table.setGlobalFilter(value);
  };
  return (
    <div
      className={cn("flex items-center justify-between gap-2", className)}
      ref={ref}
      {...props}
    >
      <div className="relative flex items-center gap-2 max-w-96">
        <Search className="absolute mx-2 size-4 text-muted-foreground" />
        <Input
          value={table.getState().globalFilter}
          onChange={(e) => handleOnChange(String(e.target.value))}
          placeholder={searchPlaceholder ?? "Cari..."}
          className="h-8 pl-8"
        />
      </div>
      {children}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="flex">
            <SlidersHorizontal className="size-4 md:mr-2" />
            <span className="hidden md:inline">Tampilan</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Tampilkan Kolom</DropdownMenuLabel>
          {table
            .getAllColumns()
            .filter((column) => column.getCanHide())
            .map((column) => {
              return (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  className="capitalize"
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) => column.toggleVisibility(!!value)}
                >
                  {column.id}
                </DropdownMenuCheckboxItem>
              );
            })}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default React.forwardRef(DataTableViewOptions) as <TData extends object>(
  props: React.ComponentPropsWithoutRef<"div"> & { table: Table<TData>, searchPlaceholder?: string },
  ref: React.ForwardedRef<HTMLDivElement>,
) => React.ReactElement;
