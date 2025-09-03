import { BaseHeader } from "@/components/ui/custom/header/baseHeader";

export function HomeHeader() {
  return (
    <BaseHeader
      body={[
        {
          title: "Home",
          content: "/",
        },
        {
          title: "Berita",
          content: [
            {
              title: "Pengumuman",
              url: "/announcement",
            },
            {
              title: "Berita Alumni",
              url: "/alumni-info",
            },
            {
              title: "Lowongan Asisten Dosen",
              url: "/vacancy",
            },
          ],
        },
        {
          title: "Dosen",
          content: "/lecturer",
        },
        {
          title: "Lainnya",
          content: [
            {
              title: "Profil Program Studi",
              url: "/studyProgramProfile",
            },
            {
              title: "Profil Himpunan Mahasiswa",
              url: "/studentsAssociationInfo",
            },
          ],
        },
      ]}
    />
  );
}
