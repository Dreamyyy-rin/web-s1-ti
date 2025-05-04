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
import { useFetchAlumniInformationsPaginated } from "@/features/alumni-information/hooks/useFetchAlumniInformationsPaginated";
import { ENV } from "@/env";
import ReadonlyText from "@/components/ui/custom/rich-text-editor/readonlyText";
import HomeHeading from "@/features/shared/components/homeHeading";

export const Route = createFileRoute("/_homeLayout/beritaAlumni/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { data: alumni, isLoading } = useFetchAlumniInformationsPaginated();
  return (
    <div className="relative">
      <HomeHeading title="Berita Alumni" />
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {isLoading
            ? null
            : alumni?.data.map((alumni, index) => (
                <Card key={index} className="shadow-lg rounded-md">
                  <CardHeader className="p-0">
                    <img
                      src={`${ENV.APP.BACKEND_URL}/files/${alumni.file}`}
                      alt={alumni.judul}
                      className="w-full h-[200px] object-cover rounded-t-md"
                    />
                  </CardHeader>
                  <CardContent>
                    <CardTitle>{alumni.judul}</CardTitle>
                    <CardDescription>
                      <ReadonlyText data={alumni.isi} />
                    </CardDescription>
                  </CardContent>
                  <CardFooter className="p-4">
                    <Link
                      to={`/beritaAlumni/$beritaAlumniId`}
                      params={{ beritaAlumniId: alumni.id.toString() }}
                    >
                      <Button variant="outline" size="sm">
                        Baca Selengkapnya
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
        </div>

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
      <Footer />
    </div>
  );
}
