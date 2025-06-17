import { createFileRoute } from "@tanstack/react-router";
import gambar from "@/assets/Carousel1.png";
import Footer from "@/components/ui/custom/footer/footer";
import sertifikatImage from "@/assets/sertifikatImage.jpg";
import sertifikat from "@/assets/SERTIFIKAT AKREDITASI S1 TEKNIK INFORMATIKA UNGGUL  2024.pdf";
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

export const Route = createFileRoute("/_homeLayout/studyProgramProfile")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="relative">
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
        <h1 className="text-white text-5xl font-semibold">
          Profil Program Studi
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
              <BreadcrumbSeparator className="text-white" />
              <BreadcrumbItem>
                <BreadcrumbLink
                  href="/announcement"
                  className="text-secondary dark:text-white"
                >
                  Profil Program Studi
                </BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      {/* Section Sejarah Program Studi */}
      <div className="my-10 px-6">
        <h2 className="text-3xl font-semibold mb-6">Sejarah Program Studi</h2>
        <Card>
          <CardContent className="flex justify-center items-center p-6">
            <CardDescription>
              Program Studi Teknik Informatika di Universitas Kristen Satya
              Wacana didirikan dengan tujuan untuk memenuhi kebutuhan dunia
              industri akan profesional IT yang berkualitas. Sejak awal
              berdirinya, program studi ini telah berfokus pada pengembangan
              kemampuan praktikal dan teori dalam bidang teknologi informasi.
              Dengan kurikulum yang terus diperbarui dan fasilitas yang memadai,
              program studi ini bertujuan untuk menghasilkan lulusan yang siap
              menghadapi perkembangan teknologi yang cepat di dunia digital.
            </CardDescription>
          </CardContent>
        </Card>
      </div>

      {/* Section Akreditasi */}
      <div className="my-10 px-6">
        <h2 className="text-3xl font-semibold mb-4">
          Akreditasi Program Studi
        </h2>
        <Card>
          <CardContent className="flex items-center justify-between">
            {/* Deskripsi Akreditasi di sebelah kiri */}
            <div className="flex-1 mr-4">
              <CardTitle>Dokumen Akreditasi</CardTitle>
              <CardDescription>
                Berdasarkan Keputusan LAM INFOKOM No.
                086/SK/LAM-INFOKOM/Ak/S/VIII/2024, Program Studi Teknik
                Informatika UKSW telah mendapatkan status:
                <br />
                <br />
                Klik pada gambar sertifikat untuk melihat versi PDF lengkap.
              </CardDescription>
            </div>

            {/* Gambar Sertifikat Akreditasi di sebelah kanan */}
            <div className="flex-shrink-0 w-[350px] h-auto ml-4">
              <a href={sertifikat} target="_blank" rel="noopener noreferrer">
                <img
                  src={sertifikatImage}
                  alt="Sertifikat Akreditasi"
                  className="w-full h-auto rounded-lg shadow-md hover:scale-105 transition-transform duration-300"
                />
              </a>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Section Visi dan Misi */}
      <div className="my-10 px-6">
        <h2 className="text-3xl font-semibold mb-6">Visi dan Misi</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Card untuk Visi */}
          <Card>
            <CardHeader>
              <CardTitle>Visi</CardTitle>
            </CardHeader>
            <CardContent>
              Menjadi program studi Teknik Informatika terkemuka di Indonesia
              yang menghasilkan lulusan berkualitas tinggi, inovatif, dan
              berkompeten dalam pengembangan dan penerapan teknologi informasi
              untuk kemajuan masyarakat dan industri.
            </CardContent>
          </Card>

          {/* Card untuk Misi */}
          <Card>
            <CardHeader>
              <CardTitle>Misi</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5">
                <li>
                  Menyelenggarakan pendidikan berkualitas tinggi di bidang
                  Teknik Informatika.
                </li>
                <li>
                  Melakukan penelitian dan pengembangan teknologi informasi yang
                  bermanfaat.
                </li>
                <li>
                  Menjalin kerjasama dengan industri dan masyarakat dalam
                  penerapan teknologi informasi.
                </li>
                <li>
                  Mengembangkan karakter mahasiswa yang berkualitas dan
                  profesional.
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
