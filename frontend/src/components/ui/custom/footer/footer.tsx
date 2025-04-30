import React from "react";
import Logo from "@/assets/logoFTI.png";

const Footer: React.FC = () => {
  return (
    <div className="bg-blue-900 text-white py-6 mt-16">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        {/* Kolom kiri: Logo dan alamat */}
        <div className="flex flex-col md:flex-row items-center text-center md:text-left md:space-x-4 order-2 md:order-1">
          <img src={Logo} alt="Logo" className="w-20 h-auto mb-7 md:mb-0" />
          <div>
            <h3 className="text-xl font-bold">Fakultas Teknologi Informasi</h3>
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
        <div className="space-y-2 text-center md:text-right order-1 md:order-2 mb-7 md:mb-0">
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
              <a href="https://www.uksw.edu/library" className="text-blue-400">
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
          &copy; {new Date().getFullYear()} Fakultas Teknologi Informasi
          Universitas Kristen Satya Wacana
        </p>
      </div>
    </div>
  );
};

export default Footer;
