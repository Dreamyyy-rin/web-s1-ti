import { SidebarContentData } from "@/interfaces/sidebar.interface";
import React from "react";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "../../sidebar";
import { Link, useLocation } from "@tanstack/react-router";
import { StoreUser } from "@/stores/auth.store";

const BaseSidebarContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<"div"> & {
    data: Array<SidebarContentData>;
    user?: StoreUser | null;
  }
>(({ data, user }, ref) => {
  const { pathname } = useLocation();
  const { setOpenMobile } = useSidebar();

  const checkUserRole = (
    currentRole: string,
    permittedRoles: string,
  ): boolean => {
    const roles = permittedRoles.split(",").map((role) => role.trim());
    return roles.includes(currentRole);
  };

  let restrictedData: SidebarContentData[] = [];
  if (user) {
    for (const service of data) {
      const filteredService: SidebarContentData = {
        title: service.title,
        items: service.items.filter((item) =>
          checkUserRole(user.role, item.role),
        ),
      };
      if (filteredService.items.length <= 0) {
        continue;
      }
      restrictedData.push(filteredService);
    }
  } else {
    restrictedData = data;
  }

  return restrictedData.map((service) => (
    <SidebarGroup key={service.title} ref={ref}>
      <SidebarGroupLabel>{service.title}</SidebarGroupLabel>
      <SidebarMenu>
        {service.items.map((item) => (
          <SidebarMenuItem key={item.title}>
            <SidebarMenuButton
              asChild
              className={
                pathname.includes(item.url)
                  ? "bg-foreground  text-background hover:bg-foreground hover:text-background opacity-100 aria-disabled:opacity-100 disabled:opacity-100"
                  : ""
              }
            >
              <Link
                disabled={pathname.includes(item.url)}
                to={item.url}
                onClick={() => setOpenMobile(false)}
              >
                <item.icon className="" />
                <span>{item.title}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  ));
});

export default BaseSidebarContent;
