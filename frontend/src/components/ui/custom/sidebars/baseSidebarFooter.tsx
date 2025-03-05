import { SidebarFooterData } from "@/types/sidebar";
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
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../dropdown-menu";
import { ChevronsUpDown, LogOut } from "lucide-react";
import { Avatar, AvatarFallback } from "../../avatar";
import { Link } from "@tanstack/react-router";
import { Button } from "../../button";
import { useLogout } from "@/features/auth/hooks/useLogout";

const BaseSidebarFooter = React.forwardRef<
  HTMLUListElement,
  React.ComponentPropsWithoutRef<"ul"> & { data: SidebarFooterData }
>(({ data }, ref) => {
  const { isMobile } = useSidebar();

  const { mutate: logout } = useLogout();

  const handleOnClickLogout = () => {
    logout();
  };
  return (
    <SidebarMenu ref={ref}>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild className="focus-visible:ring-0">
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground "
            >
              <Avatar className="h-8 w-8 rounded-lg">
                {/* <AvatarImage src={data.user.avatar} alt={data.user.name} /> */}
                <AvatarFallback className="rounded-lg">
                  {data.user.name?.slice(0, 2)}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">{data.user.name}</span>
                <span className="truncate text-xs">{data.user.email}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  {/* <AvatarImage src={data.user.avatar} alt={data.user.name} /> */}
                  <AvatarFallback className="rounded-lg">
                    {data.user.name?.slice(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">
                    {data.user.name}
                  </span>
                  <span className="truncate text-xs">{data.user.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              {data.items.map((item) => (
                <Link key={item.title} to={item.url}>
                  <DropdownMenuItem key={item.title} className="flex gap-2 p-2">
                    <div className="flex size-6 items-center justify-center rounded-sm">
                      <item.icon className="size-4 shrink-0" />
                    </div>
                    {item.title}
                  </DropdownMenuItem>
                </Link>
              ))}
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem className="p-0">
                <Button
                  variant="ghost"
                  className="w-full justify-start m-0 font-normal flex gap-2 p-2"
                  onClick={handleOnClickLogout}
                >
                  <div className="flex size-6 items-center justify-center rounded-sm">
                    <LogOut className="size-4 shrink-0" />
                  </div>
                  Log out
                </Button>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
});

export default BaseSidebarFooter;
