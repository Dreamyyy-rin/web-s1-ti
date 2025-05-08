import BaseLayoutWithSidebar from "@/components/ui/custom/sidebars/baseLayoutWithSidebar";
import { useAuthStore } from "@/stores/auth.store";
import { SidebarData } from "@/interfaces/sidebar.interface";
import { Briefcase, Megaphone, Rss, UserCog, Users } from "lucide-react";
import React from "react";

export const AdminLayout = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div">
>(({ children }, ref) => {
  const user = useAuthStore((state) => state.user);

  const data: SidebarData = {
    header: [
      {
        isExternal: false,
        icon: Rss,
        title: "Web S1-TI",
        url: "/",
      },
    ],
    content: [
      {
        title: "Menu Utama",
        items: [
          {
            icon: Megaphone,
            title: "Pengumuman",
            url: "/admin/announcement",
            role: "admin,superadmin"
          },
          {
            icon: Users,
            title: "Berita Alumni",
            url: "/admin/alumni-info",
            role: "admin,superadmin"
          },
          {
            icon: Briefcase,
            title: "Lowongan",
            url: "/admin/vacancy",
            role: "admin,superadmin"
          },
        ],
      },
      {
        title: "Manajemen",
        items: [
          {
            icon: UserCog,
            title: "Akun Admin",
            url: "/admin/admin-account",
            role: "superadmin"
          },
        ],
      },
    ],
    footer: {
      items: [
        // {
        //   title: "Tentang Kami",
        //   icon: Settings,
        //   url: "/about",
        // },
        // {
        //   title: "Logout",
        //   icon: LogOut,
        //   url: "/logout",
        // },
      ],
    },
    user: user
  };

  return (
    <BaseLayoutWithSidebar ref={ref} sidebarData={data}>
      {children}
    </BaseLayoutWithSidebar>
  );
});
