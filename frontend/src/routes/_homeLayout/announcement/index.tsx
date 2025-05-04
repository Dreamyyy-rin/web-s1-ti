import { createFileRoute } from "@tanstack/react-router";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination";

import Footer from "@/components/ui/custom/footer/footer";
import { Button } from "@/components/ui/button";
import { useFetchAnnouncementsPaginated } from "@/features/announcement/hooks/useFetchAnnouncementsPaginated";
import HomeHeading from "@/features/shared/components/homeHeading";
import { useState } from "react";
import AnnouncementCardDisplay from "@/features/announcement/components/announcementCardDisplay";
import AnnouncementSkeletonCardDisplay from "@/features/announcement/components/announcementSkeletonCardDisplay";
import { ChevronLeft, ChevronRight } from "lucide-react";

export const Route = createFileRoute("/_homeLayout/announcement/")({
  component: RouteComponent,
  beforeLoad: () => {
    return {
      title: "Pengumuman",
    };
  },
});

function RouteComponent() {
  {
    /* Data Pengumuman */
  }
  const [pageIndex, setPageIndex] = useState<number>(1);
  const [search, setSearch] = useState<string>("");
  console.log("pageindex:", pageIndex);
  const perPage = 12;

  const { data: announcements, isLoading: isFetchAnnouncementLoading } =
    useFetchAnnouncementsPaginated({
      page: pageIndex,
      per_page: perPage,
      search: search,
    });

  return (
    <div className="relative">
      <HomeHeading title="Pengumuman" />
      {/* Card Pengumuman */}
      <div className="container mx-auto px-8 py-8 ">
        {isFetchAnnouncementLoading ? (
          <AnnouncementSkeletonCardDisplay amount={perPage} />
        ) : (
          <>
            <AnnouncementCardDisplay
              announcements={announcements?.data ?? []}
            />
          </>
        )}
        <div className="flex justify-center  mt-8">
          <Pagination className="items-center">
            <div className="me-4">
              Halaman {pageIndex} dari {announcements?.meta.last_page}
            </div>
            <PaginationContent>
              <PaginationItem>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setPageIndex(pageIndex - 1)}
                  disabled={pageIndex === 1}
                >
                  <ChevronLeft />
                </Button>
              </PaginationItem>
              <PaginationItem>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setPageIndex(pageIndex + 1)}
                  disabled={announcements?.meta.last_page === pageIndex}
                >
                  <ChevronRight />
                </Button>
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
      <Footer />
    </div>
  );
}
