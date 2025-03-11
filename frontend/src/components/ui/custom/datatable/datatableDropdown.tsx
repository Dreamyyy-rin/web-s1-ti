import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../dropdown-menu";
import { Button } from "../../button";
import { Ellipsis, FileSearch, Pencil, Trash } from "lucide-react";
import ConfirmationAlert from "../alert/confirmationAlert";

const DatatableDropdown = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<"div"> & {
    detailFn?: () => void;
    editFn?: () => void;
    deleteFn?: () => void;
  }
>(({ editFn, detailFn, deleteFn }) => {
  return (
    <DropdownMenu >
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="size-8 ">
          <Ellipsis className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Aksi</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {detailFn && (
          <DropdownMenuItem className="flex cursor-pointer items-center">
            <Button
              onClick={detailFn}
              variant="ghost"
              className="flex w-full justify-start h-6  p-0 m-0 font-normal "
            >
              <FileSearch className="size-4" />
              Detail
            </Button>
          </DropdownMenuItem>
        )}
        {editFn && (
          <DropdownMenuItem className="">
            <Button
              onClick={editFn}
              variant="ghost"
              className="flex w-full justify-start h-6  p-0 m-0 font-normal "
            >
              <Pencil className="size-4" />
              Edit
            </Button>
          </DropdownMenuItem>
        )}
        {deleteFn && (
          <DropdownMenuItem asChild className="">
            <ConfirmationAlert onConfirmation={deleteFn}>
              <Button
                variant="ghost"
                className="flex w-full justify-start px-2 py-1.5  m-0 font-normal text-red-700 rounded-sm hover:text-red-700 "
              >
                <Trash className="size-4" />
                Hapus
              </Button>
            </ConfirmationAlert>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
});

export default DatatableDropdown;
