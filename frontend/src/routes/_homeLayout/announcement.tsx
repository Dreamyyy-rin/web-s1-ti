import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

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
import gambar from "@/assets/Carousel1.jpg";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/_homeLayout/announcement")({
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
  const announcements = [
    {
      title: "Judul Pengumuman 1",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      imageUrl: gambar, // Ganti dengan path gambar yang sesuai
      link: "/announcement/1",
    },
    {
      title: "Judul Pengumuman 2",
      description:
        "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      imageUrl: gambar, // Ganti dengan path gambar yang sesuai
      link: "/announcement/2",
    },
    {
      title: "Judul Pengumuman 3",
      description:
        "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
      imageUrl: gambar, // Ganti dengan path gambar yang sesuai
      link: "/announcement/3",
    },
    {
      title: "Judul Pengumuman 4",
      description:
        "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      imageUrl: gambar, // Ganti dengan path gambar yang sesuai
      link: "/announcement/4",
    },
    {
      title: "Judul Pengumuman 5",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      imageUrl: gambar, // Ganti dengan path gambar yang sesuai
      link: "/announcement/5",
    },
    {
      title: "Judul Pengumuman 6",
      description:
        "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      imageUrl: gambar, // Ganti dengan path gambar yang sesuai
      link: "/announcement/6",
    },
  ];
  return (
    <div className="relative">
      {/* Header */}
      <div className="w-full h-[300px]">
        {" "}
        <img
          src={gambar}
          alt="Fakultas Teknologi Informasi"
          className="w-full h-full object-cover rounded-md"
        />
      </div>

      {/* Overlay untuk Heading dan Breadcrumb */}
      <div className="absolute top-0 left-0 w-full h-[300px] bg-black bg-opacity-40 flex flex-col justify-center items-start px-6">
        <h1 className="text-white text-5xl font-semibold">Pengumuman</h1>
        {/* Breadcrumb */}
        <div className="mt-2">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink
                  href="/"
                  className="text-secondary dark:text-white"
                >
                  Home
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="text-white " />
              <BreadcrumbItem>
                <BreadcrumbLink
                  href="/announcement"
                  className="text-secondary dark:text-white"
                >
                  Pengumuman
                </BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      {/* Card Pengumuman */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {announcements.map((announcement, index) => (
            <Card key={index} className="shadow-lg rounded-md">
              {/* Gunakan img di dalam CardHeader */}
              <CardHeader className="p-0">
                <img
                  src={announcement.imageUrl}
                  alt={announcement.title}
                  className="w-full h-[200px] object-cover rounded-t-md"
                />
              </CardHeader>
              <CardContent className="p-4">
                <CardTitle className="text-xl font-semibold">
                  {announcement.title}
                </CardTitle>
                <CardDescription className="text-gray-600 mt-2">
                  {announcement.description}
                </CardDescription>
              </CardContent>
              <CardFooter className="p-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => (window.location.href = announcement.link)}
                >
                  Baca Selengkapnya
                </Button>
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
