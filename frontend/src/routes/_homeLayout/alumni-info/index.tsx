import { createFileRoute } from "@tanstack/react-router";
import Footer from "@/components/ui/custom/footer/footer";
import { useFetchAlumniInformationsPaginated } from "@/features/alumni-information/hooks/useFetchAlumniInformationsPaginated";
import HomeHeading from "@/features/shared/components/homeHeading";
import { useState } from "react";
import SkeletonCardDisplay from "@/features/shared/components/skeletonCardDisplay";
import AlumniInformationCardDisplay from "@/features/alumni-information/components/alumniInformationCardDisplay";
import PaginationNavigation from "@/features/shared/components/paginationNavigation";
import PaginationNavigationSkeleton from "@/features/shared/components/PaginationNavigationSkeleton";
import { debounce } from "@/lib/helpers";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export const Route = createFileRoute("/_homeLayout/alumni-info/")({
  component: RouteComponent,
});

function RouteComponent() {
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

  const { data: alumniInformations, isLoading } =
    useFetchAlumniInformationsPaginated({
      page: pageIndex,
      per_page: perPage,
      search: delayedSearch,
    });

  return (
    <div className="relative">
      <HomeHeading title="Berita Alumni" />
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
