import { createFileRoute } from "@tanstack/react-router";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Footer from "@/components/ui/custom/footer/footer";
import gambar from "@/assets/Carousel1.jpg";

export const Route = createFileRoute("/_homeLayout/studentsAssociationInfo")({
  component: RouteComponent,
});

function RouteComponent() {
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
        <h1 className="text-white text-5xl font-semibold">Himpunan</h1>
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
                  Himpunan
                </BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      {/*Bagian Footer*/}
      <Footer />
    </div>
  );
}
