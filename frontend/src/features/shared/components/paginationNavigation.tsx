import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination";
import { PaginationResponseMeta } from "@/interfaces/responses/paginationRespose.interface";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { ElementRef } from "react";

const PaginationNavigation = React.forwardRef<
  ElementRef<"nav">,
  React.ComponentPropsWithoutRef<"nav"> & {
    meta: PaginationResponseMeta;
    pageIndex: number;
    onPageIndexChange: (pageIndex: number) => void;
  }
>(({ className, meta, pageIndex, onPageIndexChange, ...props }, ref) => {
  return (
    <Pagination className={cn("items-center", className)} ref={ref} {...props}>
      <div className="me-4 flex items-center">
        Halaman {pageIndex} dari {meta.last_page}
      </div>
      <PaginationContent>
        <PaginationItem>
          <Button
            variant="outline"
            size="icon"
            onClick={() => onPageIndexChange(pageIndex - 1)}
            disabled={pageIndex === 1}
          >
            <ChevronLeft />
          </Button>
        </PaginationItem>
        <PaginationItem>
          <Button
            variant="outline"
            size="icon"
            onClick={() => onPageIndexChange(pageIndex + 1)}
            disabled={meta.last_page === pageIndex}
          >
            <ChevronRight />
          </Button>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
});

export default PaginationNavigation;
