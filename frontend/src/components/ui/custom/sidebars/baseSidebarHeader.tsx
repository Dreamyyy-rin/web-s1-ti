import { SidebarHeaderItemData } from "@/types/sidebar";
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
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "../../dropdown-menu";
import { ChevronsUpDown } from "lucide-react";

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
              Teams
            </DropdownMenuLabel>
            {data.map((item, index) => (
              <DropdownMenuItem
                key={item.title}
                onClick={() => setActiveTeam(item)}
                className="gap-2 p-2"
              >
                <div className="flex size-6 items-center justify-center rounded-sm">
                  <item.icon className="size-4 shrink-0" />
                </div>
                {item.title}
                <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
});

export default BaseSidebarHeader;
