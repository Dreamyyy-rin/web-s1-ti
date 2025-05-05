import { createFileRoute } from "@tanstack/react-router";
import Footer from "@/components/ui/custom/footer/footer";
import { useFetchAlumniInformationsPaginated } from "@/features/alumni-information/hooks/useFetchAlumniInformationsPaginated";
import HomeHeading from "@/features/shared/components/homeHeading";
import { useState } from "react";
import SkeletonCardDisplay from "@/features/shared/components/skeletonCardDisplay";
import AlumniInformationCardDisplay from "@/features/alumni-information/components/alumniInformationCardDisplay";
import PaginationNavigation from "@/features/shared/components/paginationNavigation";
import PaginationNavigationSkeleton from "@/features/shared/components/PaginationNavigationSkeleton";

export const Route = createFileRoute("/_homeLayout/alumni-info/")({
  component: RouteComponent,
});

function RouteComponent() {
  const [pageIndex, setPageIndex] = useState<number>(1);
  const [search, setSearch] = useState<string>("");
  const perPage = 3;
  const { data: alumniInformations, isLoading } =
    useFetchAlumniInformationsPaginated({
      page: pageIndex,
      per_page: perPage,
      search: search,
    });

  return (
    <div className="relative">
      <HomeHeading title="Pengumuman" />
      <div className="container mx-auto px-8 py-8 ">
        {isLoading ? (
          <SkeletonCardDisplay amount={perPage} />
        ) : (
          <>
            <AlumniInformationCardDisplay
              alumniInformations={alumniInformations?.data ?? []}
            />
          </>
        )}
        <div className="flex justify-center  mt-8">
          {alumniInformations?.meta ? (
            <PaginationNavigation
              pageIndex={pageIndex}
              meta={alumniInformations.meta}
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
