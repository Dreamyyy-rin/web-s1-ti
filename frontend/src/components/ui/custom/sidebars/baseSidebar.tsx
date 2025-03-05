import { SidebarData } from "@/types/sidebar";
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
        <BaseSidebarContent data={data.content} />
      </SidebarContent>
      <SidebarFooter >
        <BaseSidebarFooter data={data.footer}  />
      </SidebarFooter>
    </Sidebar>
  );
});

export default BaseSidebar;
