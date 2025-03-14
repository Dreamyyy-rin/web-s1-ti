import { createFileRoute } from "@tanstack/react-router";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Content } from "@tiptap/react";
import carousel1 from "@/assets/Carousel1.jpg";
import carousel2 from "@/assets/Carousel2.jpg";
import { Button } from "@/components/ui/button";
// import TextEditor from "@/components/ui/custom/rich-text-editor/textEditor";
import { MinimalTiptapEditor } from "@/components/ui/custom/minimal-tiptap";
import { useState } from "react";
import alfaLogo from "@/assets/alfamartLogo.png";
import ctiLogo from "@/assets/ctiLogo.png";
import puraLogo from "@/assets/puraLogo.png";
import sinarmasLogo from "@/assets/sinarmasLogo.png";
import bcaLogo from "@/assets/bcaLogo.png";
import sertifikat from "@/assets/SERTIFIKAT AKREDITASI S1 TEKNIK INFORMATIKA UNGGUL  2024.pdf";
import sertifikatImage from "@/assets/sertifikatImage.jpg";
import siasatLink from "@/assets/siasatLink.png";
import aitiLink from "@/assets/aitiLink.png";
import libraryLink from "@/assets/libraryLink.png";
import sitaLink from "@/assets/sitaLink.png";
import itexploreLink from "@/assets/itexploreLink.jpg";
import Logo from "@/assets/logoFTI.png";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const Route = createFileRoute("/_homeLayout/")({
  component: Index,
});

function Index() {
  const [content, setContent] = useState<Content>("");

  return (
    <div>
      {/* Carousel */}
      <div className="container mx-auto px-4 py-8">
        <Carousel>
          <CarouselContent>
            <CarouselItem>
              <img
                src={carousel1}
                alt="Image 1"
                className="w-full h-auto max-h-[500px] object-cover"
              />
            </CarouselItem>
            <CarouselItem>
              <img
                src={carousel2}
                alt="Image 2"
                className="w-full h-auto max-h-[500px] object-cover"
              />
            </CarouselItem>
            <CarouselItem>
              <img
                src={carousel1}
                alt="Image 3"
                className="w-full h-auto max-h-[500px] object-cover"
              />
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>

      <div className="flex justify-center gap-4 mt-6">
        <Button className="w-1/3 h-12">Lowongan Asisten Dosen</Button>
        <Button className="w-1/3 h-12">Himpunan</Button>
      </div>

      {/* Bagian Pengumuman */}
      <div className="container mx-auto px-4 py-8">
        {/* Heading Pengumuman */}
        <div className="text-center mt-20">
          <h2 className="text-3xl font-semibold">Pengumuman</h2>
        </div>

        {/* Card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
          {/* Card 1 */}
          <Card className="bg-white rounded-lg shadow-lg overflow-hidden">
            <img
              src={carousel1}
              alt="Pengumuman 1"
              className="w-full h-48 object-cover"
            />
            <CardContent>
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-gray-900">
                  Diskomvision 2024
                </CardTitle>
                <CardDescription className="text-gray-600 mt-2">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </CardDescription>
              </CardHeader>
              <Button className="mt-4" variant="outline" size="sm">
                Read More
              </Button>
            </CardContent>
          </Card>

          {/* Card 2 */}
          <Card className="bg-white rounded-lg shadow-lg overflow-hidden">
            <img
              src={carousel1}
              alt="Pengumuman 2"
              className="w-full h-48 object-cover"
            />
            <CardContent>
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-gray-900">
                  Judul Pengumuman 2
                </CardTitle>
                <CardDescription className="text-gray-600 mt-2">
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat.
                </CardDescription>
              </CardHeader>
              <Button className="mt-4" variant="outline" size="sm">
                Read More
              </Button>
            </CardContent>
          </Card>

          {/* Card 3 */}
          <Card className="bg-white rounded-lg shadow-lg overflow-hidden">
            <img
              src={carousel1}
              alt="Pengumuman 3"
              className="w-full h-48 object-cover"
            />
            <CardContent>
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-gray-900">
                  Judul Pengumuman 3
                </CardTitle>
                <CardDescription className="text-gray-600 mt-2">
                  Duis aute irure dolor in reprehenderit in voluptate velit esse
                  cillum dolore eu fugiat nulla pariatur.
                </CardDescription>
              </CardHeader>
              <Button className="mt-4" variant="outline" size="sm">
                Read More
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Tombol Selengkapnya */}
      <div className="flex justify-center mt-6">
        <Button className="w-1/6">Selengkapnya</Button>
      </div>

      {/* Bagian Kerja Sama */}
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mt-16">
          <h2 className="text-3xl font-semibold">Kerja Sama</h2>
        </div>

        <div className="container mx-auto px-4 mt-6">
          <div className="flex justify-center gap-28 items-center">
            {/* Logo Alfamart */}
            <a
              href="https://www.alfamart.co.id/"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-transform duration-300 transform hover:scale-110 hover:rotate-3"
            >
              <img src={alfaLogo} alt="Alfamart" className="w-32 h-auto" />
            </a>

            {/* Logo CTI Group */}
            <a
              href="https://www.ctigroup.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-transform duration-300 transform hover:scale-110 hover:rotate-3"
            >
              <img src={ctiLogo} alt="CTI Group" className="w-32 h-auto" />
            </a>

            {/* Logo Pura */}
            <a
              href="https://www.pura.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-transform duration-300 transform hover:scale-110 hover:rotate-3"
            >
              <img src={puraLogo} alt="Pura" className="w-32 h-auto" />
            </a>

            {/* Logo Sinarmas */}
            <a
              href="https://www.sinarmas.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-transform duration-300 transform hover:scale-110 hover:rotate-3"
            >
              <img src={sinarmasLogo} alt="Sinarmas" className="w-32 h-auto" />
            </a>

            {/* Logo BCA */}
            <a
              href="https://www.bca.co.id/"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-transform duration-300 transform hover:scale-110 hover:rotate-3"
            >
              <img src={bcaLogo} alt="BCA" className="w-32 h-auto" />
            </a>
          </div>
        </div>
      </div>

      {/*Bagian Profil Singkat*/}
      <div className="container mx-auto px-8 py-8">
        {/* Heading di luar Card */}
        <h2 className="text-3xl font-semibold text-center">
          Teknik Informatika UKSW
        </h2>

        {/* Card untuk Deskripsi dan Video */}
        <div className="flex items-center mt-8 space-x-8">
          {/* Deskripsi */}
          <div className="flex-1">
            <p className="text-lg text-gray-700">
              Program Studi Teknik Informatika UKSW adalah program studi yang
              berfokus pada pengembangan teknologi informasi dan komputer.
            </p>
            <p className="text-lg text-gray-700 mt-4">
              Kami menyediakan pendidikan berkualitas tinggi yang mempersiapkan
              mahasiswa untuk menjadi profesional IT yang kompeten dan inovatif.
            </p>
          </div>

          {/* Video */}
          <div className="flex-1">
            <iframe
              className="w-full h-96 rounded-xl shadow-md"
              src="https://www.youtube.com/embed/8e2l1ULOSjo"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>

      {/*Bagian Akreditasi*/}
      <div className="container mx-auto px-4 py-8">
        {/* Heading Sertifikasi */}
        <div className="text-center">
          <h2 className="text-3xl font-semibold">Akreditasi Program Studi</h2>
        </div>

        {/* Deskripsi Sertifikasi */}
        <div className="flex flex-col md:flex-row mt-8 items-center justify-between">
          <div className="md:w-2/3 p-4 text-gray-800 dark:text-white">
            <p>
              Berdasarkan Keputusan LAM INFOKOM No.
              086/SK/LAM-INFOKOM/Ak/S/VIII/2024 menyatakan bahwa Program Studi
              Teknik Informatika pada Program Sarjana Universitas Kristen Satya
              Wacana, Kota Salatiga, memenuhi syarat peringkat AKREDITASI
              UNGGUL.
            </p>
            <p className="mt-4">
              Sertifikat Akreditasi Program Studi ini berlaku sejak tanggal 5
              Agustus 2024 sampai dengan 5 Agustus 2029.
            </p>
          </div>

          {/* Gambar Sertifikat yang Dapat Diklik */}
          <div className="md:w-1/3 p-4">
            <a href={sertifikat} target="_blank" rel="noopener noreferrer">
              <img
                src={sertifikatImage}
                alt="Sertifikat Akreditasi"
                className="w-full h-auto rounded-lg shadow-md hover:scale-105 transition-transform duration-300"
              />
            </a>
          </div>
        </div>
      </div>

      {/*Bagian Layanan Kampus*/}
      <div className="container mx-auto px-4 py-8">
        {/* Heading Layanan Kampus */}
        <div className="text-center">
          <h2 className="text-3xl font-semibold">Layanan Kampus</h2>
        </div>

        {/* Gambar Layanan Kampus */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-1">
          {/* Gambar 1 */}
          <div className="w-full p-4">
            <a
              href="https://siasat.uksw.edu"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={siasatLink}
                alt="Layanan 1"
                className="w-full h-auto rounded-lg shadow-md hover:scale-105 transition-transform duration-300"
              />
            </a>
          </div>

          {/* Gambar 2 */}
          <div className="w-full p-4">
            <a
              href="http://online.fti.uksw.edu"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={sitaLink}
                alt="Layanan 2"
                className="w-full h-auto rounded-lg shadow-md hover:scale-105 transition-transform duration-300"
              />
            </a>
          </div>

          {/* Gambar 3 */}
          <div className="w-full p-4">
            <a
              href="https://ejournal.uksw.edu/itexplore"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={itexploreLink}
                alt="Layanan 3"
                className="w-full h-auto rounded-lg shadow-md hover:scale-105 transition-transform duration-300"
              />
            </a>
          </div>

          {/* Gambar 4 */}
          <div className="w-full p-4">
            <a
              href="https://library.uksw.edu"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={libraryLink}
                alt="Layanan 4"
                className="w-full h-auto rounded-lg shadow-md hover:scale-105 transition-transform duration-300"
              />
            </a>
          </div>

          {/* Gambar 5 */}
          <div className="w-full p-4">
            <a
              href="https://ejournal.uksw.edu/aiti"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={aitiLink}
                alt="Layanan 5"
                className="w-full h-auto rounded-lg shadow-md hover:scale-105 transition-transform duration-300"
              />
            </a>
          </div>
        </div>
      </div>

      {/*Bagian Footer*/}
      <div className="bg-blue-900 text-white py-6 mt-16">
        <div className="container mx-auto flex justify-between items-center">
          {/* Kolom kiri: Logo dan alamat */}
          <div className="flex items-center space-x-4">
            <img src={Logo} alt="Logo" className="w-20 h-auto" />
            <div>
              <h3 className="text-xl font-bold">
                Fakultas Teknologi Informasi
              </h3>
              <p className="text-sm">
                Gedung Fakultas Teknologi Informasi, Kampus III Universitas
                Kristen Satya Wacana
              </p>
              <p className="text-sm">
                Jl. Dr. O. Notohamidjojo, Blotongan, Sidorejo, Kota Salatiga,
                50715, Indonesia
              </p>
              <a href="mailto:fti@uksw.edu" className="text-sm text-blue-400">
                fti@uksw.edu
              </a>
            </div>
          </div>

          {/* Kolom kanan: Link ke sumber daya universitas */}
          <div className="space-y-2 text-right">
            <h4 className="text-lg font-semibold">University Resources</h4>
            <ul className="space-y-1 text-sm">
              <li>
                <a href="https://www.uksw.edu/" className="text-blue-400">
                  Website Universitas Kristen Satya Wacana
                </a>
              </li>
              <li>
                <a href="https://sia.uksw.edu/" className="text-blue-400">
                  Sistem Informasi Akademik Satya Wacana
                </a>
              </li>
              <li>
                <a
                  href="https://www.uksw.edu/library"
                  className="text-blue-400"
                >
                  Perpustakaan Universitas
                </a>
              </li>
              <li>
                <a
                  href="https://www.uksw.edu/flexible-learning"
                  className="text-blue-400"
                >
                  Flexible Learning UKSW
                </a>
              </li>
              <li>
                <a href="https://journal.uksw.edu/" className="text-blue-400">
                  Jurnal AITI Fakultas Teknologi Informasi
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="text-center text-sm mt-6">
          <p>
            &copy; 2023 Fakultas Teknologi Informasi Universitas Kristen Satya
            Wacana
          </p>
        </div>
      </div>
    </div>
  );
}
