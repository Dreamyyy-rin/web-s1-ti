import { createFileRoute } from "@tanstack/react-router";
import Footer from "@/components/ui/custom/footer/footer";
import gambar from "@/assets/Carousel1.jpg";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const Route = createFileRoute("/_homeLayout/vacancy")({
  component: RouteComponent,
});

function RouteComponent() {
  interface Job {
    title: string;
    description: string;
    period: string;
    location: string;
    quota: string;
    jobDetails: {
      jobDesc: string;
      criteria: string[];
      competencies: string[];
    };
  }

  // State untuk menampilkan lowongan yang dipilih
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  const jobList = [
    {
      title: "Pemrograman Web",
      description:
        "Membantu dosen dalam praktikumnya yang terkait dengan pengajaran pemrograman web. Kriteria: Menguasai HTML, CSS, dan JavaScript.",
      period: "1 Des 2024 - 28 Feb 2025",
      location: "Lab Komputer 1",
      quota: "3 Posisi",
      jobDetails: {
        jobDesc:
          "Membantu dosen dalam praktikumnya yang terkait dengan pengajaran pemrograman web.\n" +
          "Menyediakan materi praktikum.\n" +
          "Melakukan evaluasi tugas mahasiswa.",
        criteria: [
          "IPK minimal 3.00",
          "Menguasai HTML, CSS, dan JavaScript",
          "Memiliki kemampuan komunikasi yang baik",
          "Bertanggung jawab dan disiplin",
        ],
        competencies: ["Web Development", "Problem Solving", "Teaching Skills"],
      },
    },
    {
      title: "Pemrograman Web",
      description:
        "Membantu dosen dalam praktikumnya yang terkait dengan pengajaran pemrograman web. Kriteria: Menguasai HTML, CSS, dan JavaScript.",
      period: "1 Des 2024 - 28 Feb 2025",
      location: "Lab Komputer 1",
      quota: "3 Posisi",
      jobDetails: {
        jobDesc:
          "Membantu dosen dalam praktikumnya yang terkait dengan pengajaran pemrograman web.\n" +
          "Menyediakan materi praktikum.\n" +
          "Melakukan evaluasi tugas mahasiswa.",
        criteria: [
          "IPK minimal 3.00",
          "Menguasai HTML, CSS, dan JavaScript",
          "Memiliki kemampuan komunikasi yang baik",
          "Bertanggung jawab dan disiplin",
        ],
        competencies: ["Web Development", "Problem Solving", "Teaching Skills"],
      },
    },
    {
      title: "Pemrograman Web",
      description:
        "Membantu dosen dalam praktikumnya yang terkait dengan pengajaran pemrograman web. Kriteria: Menguasai HTML, CSS, dan JavaScript.",
      period: "1 Des 2024 - 28 Feb 2025",
      location: "Lab Komputer 1",
      quota: "3 Posisi",
      jobDetails: {
        jobDesc:
          "Membantu dosen dalam praktikumnya yang terkait dengan pengajaran pemrograman web.\n" +
          "Menyediakan materi praktikum.\n" +
          "Melakukan evaluasi tugas mahasiswa.",
        criteria: [
          "IPK minimal 3.00",
          "Menguasai HTML, CSS, dan JavaScript",
          "Memiliki kemampuan komunikasi yang baik",
          "Bertanggung jawab dan disiplin",
        ],
        competencies: ["Web Development", "Problem Solving", "Teaching Skills"],
      },
    },
    {
      title: "Pemrograman Web",
      description:
        "Membantu dosen dalam praktikumnya yang terkait dengan pengajaran pemrograman web. Kriteria: Menguasai HTML, CSS, dan JavaScript.",
      period: "1 Des 2024 - 28 Feb 2025",
      location: "Lab Komputer 1",
      quota: "3 Posisi",
      jobDetails: {
        jobDesc:
          "Membantu dosen dalam praktikumnya yang terkait dengan pengajaran pemrograman web.\n" +
          "Menyediakan materi praktikum.\n" +
          "Melakukan evaluasi tugas mahasiswa.",
        criteria: [
          "IPK minimal 3.00",
          "Menguasai HTML, CSS, dan JavaScript",
          "Memiliki kemampuan komunikasi yang baik",
          "Bertanggung jawab dan disiplin",
        ],
        competencies: ["Web Development", "Problem Solving", "Teaching Skills"],
      },
    },
    {
      title: "Pemrograman Web",
      description:
        "Membantu dosen dalam praktikumnya yang terkait dengan pengajaran pemrograman web. Kriteria: Menguasai HTML, CSS, dan JavaScript.",
      period: "1 Des 2024 - 28 Feb 2025",
      location: "Lab Komputer 1",
      quota: "3 Posisi",
      jobDetails: {
        jobDesc:
          "Membantu dosen dalam praktikumnya yang terkait dengan pengajaran pemrograman web.\n" +
          "Menyediakan materi praktikum.\n" +
          "Melakukan evaluasi tugas mahasiswa.",
        criteria: [
          "IPK minimal 3.00",
          "Menguasai HTML, CSS, dan JavaScript",
          "Memiliki kemampuan komunikasi yang baik",
          "Bertanggung jawab dan disiplin",
        ],
        competencies: ["Web Development", "Problem Solving", "Teaching Skills"],
      },
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
            {jobList.map((job, index) => (
              <Card
                key={index}
                onClick={() => setSelectedJob(job)} // Menampilkan deskripsi berdasarkan lowongan yang dipilih
                className="cursor-pointer hover:shadow-xl transition duration-300"
              >
                <CardHeader>
                  <CardTitle>{job.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    {job.description.substring(0, 100)}...
                  </CardDescription>{" "}
                  {/* Preview */}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Right Side - Deskripsi Lowongan (Card Detail) */}
          {selectedJob && (
            <div>
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle>{selectedJob.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <h2 className="text-xl font-semibold mb-4">
                    Deskripsi Pekerjaan
                  </h2>
                  <CardDescription>
                    <p>{selectedJob.jobDetails.jobDesc}</p>
                  </CardDescription>
                  <h2 className="text-xl font-semibold mt-4">Kriteria</h2>
                  <ul className="list-disc pl-5">
                    {selectedJob.jobDetails.criteria.map((criterion, index) => (
                      <li key={index}>{criterion}</li>
                    ))}
                  </ul>
                  <h2 className="text-xl font-semibold mt-4">
                    Kompetensi yang Dikembangkan
                  </h2>
                  <ul className="list-disc pl-5">
                    {selectedJob.jobDetails.competencies.map(
                      (competency, index) => (
                        <li key={index}>{competency}</li>
                      ),
                    )}
                  </ul>
                  <div className="mt-4">
                    <strong>Periode:</strong> {selectedJob.period}
                    <br />
                    <strong>Lokasi:</strong> {selectedJob.location}
                    <br />
                    <strong>Kuota:</strong> {selectedJob.quota}
                  </div>
                </CardContent>
                <div className="p-4">
                  <Button>Daftar Sekarang</Button>
                </div>
              </Card>
            </div>
          )}
        </div>
      </div>

      {/*Bagian Footer*/}
      <Footer />
    </div>
  );
}
