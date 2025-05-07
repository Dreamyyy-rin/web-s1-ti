import { SidebarHeaderItemData } from "@/interfaces/sidebar.interface";
import React from "react";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "../../sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../../dropdown-menu";
import { ChevronsUpDown } from "lucide-react";
import { Link } from "@tanstack/react-router";

const BaseSidebarHeader = React.forwardRef<
  HTMLUListElement,
  React.ComponentPropsWithoutRef<"ul"> & { data: Array<SidebarHeaderItemData> }
>(({ data }, ref) => {
  const { isMobile } = useSidebar();

  const [activeTeam, setActiveTeam] = React.useState(data[0]);

  if (!activeTeam) {
    return null;
  }

  return (
    <SidebarMenu ref={ref}>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger className="focus-visible:ring-0" asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                <activeTeam.icon className="size-4" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">
                  {activeTeam.title}
                </span>
                {/* <span className="truncate text-xs">{activeTeam.plan}</span> */}
              </div>
              <ChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            align="start"
            side={isMobile ? "bottom" : "right"}
            sideOffset={4}
          >
            <DropdownMenuLabel className="text-xs text-muted-foreground">
              UKSW
            </DropdownMenuLabel>
            {data.map((item, index) => (
              <DropdownMenuItem
                key={index}
                onClick={() => setActiveTeam(item)}
                className=""
                asChild
              >
                {item.isExternal ? (
                  <a
                    href={item.url}
                    className="flex flex-row items-center justify-start rounded-sm"
                  >
                    <item.icon className="size-4 shrink-0" />
                    <div className="">{item.title}</div>
                  </a>
                ) : (
                  <Link
                    to={item.url}
                    className="flex gap-2 p-2 flex-row items-center justify-start rounded-sm"
                  >
                    <item.icon className="size-4 shrink-0" />
                    <div className="">{item.title}</div>
                  </Link>
                )}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
});

export default BaseSidebarHeader;
