import { cn } from "@/lib/utils";
import React from "react";
import { Button } from "../../button";
import { Home, LogOut, User } from "lucide-react";
import { useAuthStore } from "@/stores/auth.store";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../dropdown-menu";
import { Link } from "@tanstack/react-router";
import { useLogout } from "@/features/auth/hooks/useLogout";

const HeaderProfileDropdown = React.forwardRef<
  HTMLButtonElement,
  React.ComponentPropsWithoutRef<"button">
>(({ className, ...props }, ref) => {
  const user = useAuthStore((state) => state.user);

  const { mutate: logout } = useLogout();

  const handleOnClickLogout = () => {
    logout();
  };

  return (
    // <div
    //   ref={ref}
    //   {...props}
    //   className={cn(className, "flex items-center h-4 w-7 m-2 rounded")}
    // >

    <DropdownMenu>
      <DropdownMenuTrigger
        ref={ref}
        {...props}
        className={cn(className, "border p-2")}
        asChild
      >
        <Button variant="ghost">
          <User />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 m-1" >
        <DropdownMenuLabel>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold">
              {user?.name?.split(" ")[0]}
            </span>
            <span className="text-xs font-normal">{user?.email}</span>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <Link to={user?.role === "admin" ? "/admin" : "/auth/login"}>
          <DropdownMenuItem className="cursor-pointer">
            <Button variant="ghost" className=" h-6 p-0 m-0 font-normal ">
              <div className="flex size-6 items-center justify-center rounded-sm">
                <Home className="size-4 shrink-0" />
              </div>
              Akun
            </Button>
          </DropdownMenuItem>
        </Link>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Button
            onClick={handleOnClickLogout}
            variant="ghost"
            className=" h-6 p-0 m-0 font-normal w-full justify-start"
          >
            <div className="flex size-6 items-center justify-center rounded-sm">
              <LogOut className="size-4 shrink-0" />
            </div>
            Log out
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
    // </div>
  );
});

export default HeaderProfileDropdown;
