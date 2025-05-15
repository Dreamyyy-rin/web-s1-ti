import {
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import gambar from "@/assets/Carousel1.jpg";
import { Link } from "@tanstack/react-router";

const HomeHeading = ({ title }: { title: string }) => {
  return (
    <>
      {/* Header */}
      <div className="w-full h-[300px]">
        <img
          src={gambar}
          alt="Fakultas Teknologi Informasi"
          className="w-full h-full object-cover rounded-md"
        />
      </div>

      {/* Overlay untuk Heading dan Breadcrumb */}
      <div className="absolute top-0 left-0 w-full h-[300px] bg-black bg-opacity-40 flex flex-col justify-center items-start px-6">
        <h1 className="text-white text-5xl font-semibold">{title}</h1>
        {/* Breadcrumb */}
        <div className="mt-2">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild className="text-white">
                  <Link to="/">Home</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="text-white " />
              <BreadcrumbItem>
                <BreadcrumbLink className="text-white">{title}</BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>
    </>
  );
};

export default HomeHeading;
