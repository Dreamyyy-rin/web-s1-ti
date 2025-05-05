import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { ElementRef } from "react";
import Loader from "./Loader";

const PaginationNavigationSkeleton = React.forwardRef<
  ElementRef<"nav">,
  React.ComponentPropsWithoutRef<"nav"> & {
    pageIndex: number;
  }
>(({ className, pageIndex, ...props }, ref) => {
  return (
    <Pagination className={cn("items-center", className)} ref={ref} {...props}>
      <div className="me-4 flex items-center">
        Halaman {pageIndex} dari &nbsp;
        <Loader size={20}/>
      </div>
      <PaginationContent>
        <PaginationItem>
          <Button variant="outline" size="icon" disabled>
            <ChevronLeft />
          </Button>
        </PaginationItem>
        <PaginationItem>
          <Button variant="outline" size="icon" disabled>
            <ChevronRight />
          </Button>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
});

export default PaginationNavigationSkeleton;
