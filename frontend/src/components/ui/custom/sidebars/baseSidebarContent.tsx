import { SidebarContentData } from "@/interfaces/sidebar.interface";
import React from "react";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../../sidebar";
import { Link, useLocation } from "@tanstack/react-router";

const BaseSidebarContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<"div"> & { data: Array<SidebarContentData> }
>(({ data }, ref) => {
  const { pathname } = useLocation();
  // const [pathname, setPathname] = useState<string>();

  return data.map((service) => (
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
              <Link disabled={pathname.includes(item.url)} to={item.url}>
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
