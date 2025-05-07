import { SidebarData } from "@/interfaces/sidebar.interface";
import React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "../../sidebar";
import BaseSidebarFooter from "./baseSidebarFooter";
import BaseSidebarContent from "./baseSidebarContent";
import BaseSidebarHeader from "./baseSidebarHeader";

const BaseSidebar = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<"div"> & { data: SidebarData }
>(({ data }, ref) => {
  return (
    <Sidebar collapsible="icon" ref={ref}>
      <SidebarHeader>
        <BaseSidebarHeader data={data.header} />
      </SidebarHeader>
      <SidebarContent>
        <BaseSidebarContent data={data.content} user={data.user} />
      </SidebarContent>
      <SidebarFooter>
        <BaseSidebarFooter data={data.footer} user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
});

export default BaseSidebar;
