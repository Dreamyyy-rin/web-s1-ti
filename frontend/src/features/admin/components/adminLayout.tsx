import BaseLayoutWithSidebar from "@/components/ui/custom/sidebars/baseLayoutWithSidebar";
import { ENV } from "@/env";
import { SidebarData } from "@/types/sidebar";
import { Briefcase, Megaphone, Rss, Settings } from "lucide-react";
import React from "react";

export const AdminLayout = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div">
>(({ children }, ref) => {

  const data: SidebarData = {
    header: [
      {
        isExternal: false,
        icon: Rss,
        title: "Web S1-TI",
        url: ENV.APP.FRONTEND_URL,
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
          },
          {
            icon: Briefcase,
            title: "Lowongan",
            url: "/admin/vacancy",
          },
        ],
      },
    ],
    footer: {
      user: {
        name: "Admin",
        email: "admin@example.com",
        avatar: null,
      },
      items: [
        {
          title: "Tentang Kami",
          icon: Settings,
          url: "/about",
        },
        // {
        //   title: "Logout",
        //   icon: LogOut,
        //   url: "/logout",
        // },
      ],
    },
  };

  return <BaseLayoutWithSidebar ref={ref} sidebarData={data}>{children}</BaseLayoutWithSidebar>;
});
