import { createFileRoute, Link } from "@tanstack/react-router";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Footer from "@/components/ui/custom/footer/footer";
import { Button } from "@/components/ui/button";
import { useFetchAnnouncementsPaginated } from "@/features/announcement/hooks/useFetchAnnouncementsPaginated";
import { ENV } from "@/env";
import ReadonlyText from "@/components/ui/custom/rich-text-editor/readonlyText";
import HomeHeading from "@/features/shared/components/homeHeading";

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

  const { data: announcements, isLoading } = useFetchAnnouncementsPaginated();

  return (
    <div className="relative">
      <HomeHeading title="Pengumuman" />
      {/* Card Pengumuman */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {isLoading
            ? null
            : announcements?.data.map((announcement, index) => (
                <Card key={index} className="shadow-lg rounded-md">
                  {/* Gunakan img di dalam CardHeader */}
                  <CardHeader className="p-0">
                    <img
                      src={`${ENV.APP.BACKEND_URL}/files/${announcement.file}`}
                      alt={announcement.judul}
                      className="w-full h-[200px] object-cover rounded-t-md"
                    />
                  </CardHeader>
                  <CardContent className="p-4">
                    <CardTitle className="text-xl font-semibold">
                      {announcement.judul}
                    </CardTitle>
                    <CardDescription className="text-gray-600 mt-2">
                      <ReadonlyText data={announcement.isi} />
                    </CardDescription>
                  </CardContent>
                  <CardFooter className="p-4">
                    <Link
                      to={`/announcement/$announcementId`}
                      params={{ announcementId: announcement.id.toString() }}
                    >
                      <Button variant="outline" size="sm">
                        Baca Selengkapnya
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
        </div>

        {/* Pagination Component from Shadcn */}
        <div className="flex justify-center mt-8">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">2</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
      {/*Bagian Footer*/}
      <Footer />
    </div>
  );
}
