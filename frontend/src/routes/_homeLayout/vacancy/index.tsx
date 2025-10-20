import { createFileRoute } from "@tanstack/react-router";
import Footer from "@/components/ui/custom/footer/footer";
import gambar from "@/assets/Carousel1.png";
import { useState } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useFetchVacanciesPaginated } from "@/features/vacancy/hooks/useFetchVacanciesPaginated";
import { Vacancy } from "@/features/vacancy/types/vacancy.type";
import VacancyView from "@/features/vacancy/components/vacancyView";
import ReadonlyText from "@/components/ui/custom/rich-text-editor/readonlyText";
import { Chatbot } from "@/components/ui/custom/chatbot";

export const Route = createFileRoute("/_homeLayout/vacancy/")({
  component: RouteComponent,
});

function RouteComponent() {
  const [selectedVacancy, setSelectedVacancy] = useState<Vacancy | null>(null);

  const { data: jobList, isLoading } = useFetchVacanciesPaginated();
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
        <h1 className="text-white text-5xl font-semibold">
          Lowongan Asisten Dosen
        </h1>
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
                  href="/vacancy"
                  className="text-secondary dark:text-white"
                >
                  Lowongan Asisten Dosen
                </BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Side - Daftar Lowongan (Card List) */}
          <div className="space-y-4">
            {isLoading ? (
              <>Loading...</>
            ) : (
              jobList?.data?.map((job, index) => (
                <Card
                  key={index}
                  onClick={() => setSelectedVacancy(job)} // Menampilkan deskripsi berdasarkan lowongan yang dipilih
                  className="cursor-pointer hover:shadow-xl transition duration-300"
                >
                  <CardHeader>
                    <CardTitle>{job.judul}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>
                      <ReadonlyText data={job.deskripsi} maxlength={100} />
                    </CardDescription>{" "}
                    {/* Preview */}
                  </CardContent>
                </Card>
              ))
            )}
          </div>

          {/* Right Side - Deskripsi Lowongan (Card Detail) */}
          {selectedVacancy && (
            <div>
              <Card className="shadow-lg p-2">
                <VacancyView data={selectedVacancy} />
              </Card>
            </div>
          )}
        </div>
      </div>

      {/*Bagian Footer*/}
      <Footer />
      
      {/* Floating Chatbot */}
      <Chatbot />
    </div>
  );
}
