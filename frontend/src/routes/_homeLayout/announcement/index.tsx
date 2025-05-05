import { createFileRoute } from "@tanstack/react-router";

import Footer from "@/components/ui/custom/footer/footer";
import { useFetchAnnouncementsPaginated } from "@/features/announcement/hooks/useFetchAnnouncementsPaginated";
import HomeHeading from "@/features/shared/components/homeHeading";
import { useState } from "react";
import AnnouncementCardDisplay from "@/features/announcement/components/announcementCardDisplay";
import SkeletonCardDisplay from "@/features/shared/components/skeletonCardDisplay";
import PaginationNavigation from "@/features/shared/components/paginationNavigation";
import PaginationNavigationSkeleton from "@/features/shared/components/PaginationNavigationSkeleton";

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
  const perPage = 3;

  const { data: announcements, isLoading: isFetchAnnouncementLoading } =
    useFetchAnnouncementsPaginated({
      page: pageIndex,
      per_page: perPage,
      search: search,
    });

  return (
    <div className="relative">
      <HomeHeading title="Pengumuman" />
      <div className="container mx-auto px-8 py-8 ">
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
