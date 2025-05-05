import { createFileRoute } from "@tanstack/react-router";

import Footer from "@/components/ui/custom/footer/footer";
import { useFetchAnnouncementsPaginated } from "@/features/announcement/hooks/useFetchAnnouncementsPaginated";
import HomeHeading from "@/features/shared/components/homeHeading";
import { useState } from "react";
import AnnouncementCardDisplay from "@/features/announcement/components/announcementCardDisplay";
import SkeletonCardDisplay from "@/features/shared/components/skeletonCardDisplay";
import PaginationNavigation from "@/features/shared/components/paginationNavigation";
import PaginationNavigationSkeleton from "@/features/shared/components/paginationNavigationSkeleton";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { debounce } from "@/lib/helpers";

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
  const perPage = 12;
  
  const [search, setSearch] = useState<string>("");
  const [delayedSearch, setDelayedSearch] = useState<string>("");

  const debouncedChange = debounce((value: string) => {
    setDelayedSearch(value);
  }, 1000);

  const onInputChange = (value: string) => {
    setSearch(value);
    debouncedChange(value);
  };

  const { data: announcements, isLoading: isFetchAnnouncementLoading } =
    useFetchAnnouncementsPaginated({
      page: pageIndex,
      per_page: perPage,
      search: delayedSearch,
    });


  return (
    <div className="relative">
      <HomeHeading title="Pengumuman" />
      <div className="container mx-auto px-8 py-8 ">
        <div className="relative flex items-center gap-2 w-full mb-7">
          <Search className="absolute mx-2 size-4 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => onInputChange(String(e.target.value))}
            placeholder={"Cari berdasarkan judul..."}
            className="h-8 pl-8"
          />
        </div>
        {isFetchAnnouncementLoading ? (
          <SkeletonCardDisplay amount={perPage} />
        ) : (
          <>
            <AnnouncementCardDisplay
              announcements={announcements?.data ?? []}
            />
          </>
        )}
        <div className="flex justify-center  mt-8">
          {announcements?.meta ? (
            <PaginationNavigation
              pageIndex={pageIndex}
              meta={announcements.meta}
              onPageIndexChange={setPageIndex}
            />
          ) : (
            <PaginationNavigationSkeleton pageIndex={pageIndex} />
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
