import { useTheme } from "@/hooks/useTheme";
import { Button } from "../../button";
import {
  ChevronDown,
  LogIn,
  Menu,
  MoonIcon,
  SunIcon,
  SunMoonIcon,
} from "lucide-react";
import React from "react";
import { cn } from "@/lib/utils";
import Logo from "@/assets/Logo.png";
import { Link, useLocation } from "@tanstack/react-router";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "../../navigation-menu";
import { useAuthStore } from "@/stores/auth.store";
import HeaderProfileDropdown from "./headerProfileDropdown";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "../../sheet";
import { Collapsible, CollapsibleTrigger } from "../../collapsible";
import { CollapsibleContent } from "@radix-ui/react-collapsible";

export interface HeaderSubContent {
  title: string;
  url: string;
}
export interface HeaderContent {
  title: string;
  content: string | HeaderSubContent[];
}
export interface CustomHeaderProps {
  body: HeaderContent[];
}

export const BaseHeader = React.forwardRef<
  React.ElementRef<"header">,
  React.ComponentPropsWithoutRef<"header"> & CustomHeaderProps
>(({ className, body, ...props }, ref) => {
  const { theme, setTheme } = useTheme();
  const isMobile = useIsMobile();
  const user = useAuthStore((state) => state.user);
  const { pathname } = useLocation();

  return (
    <header
      ref={ref}
      {...props}
      className={cn(
        "fixed top-0 z-50 h-12 md:h-16 w-full bg-background/50 border-b backdrop-blur-md ",
        className,
      )}
    >
      <div className="mx-auto flex w-full h-full items-center justify-between px-2 gap-2">
        {/* <Link to="/" className="cursor-pointer">
        <img src={Logo} alt="Logo" className="h-12 min-w-36 mr-4" />
      </Link> */}
        {/* {children} */}
        {isMobile ? (
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" className="w-9">
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <SheetHeader className="mb-5">
                <Link to="/" className="cursor-pointer">
                  <img src={Logo} alt="Logo" className="h-12 min-w-36 mr-4" />
                </Link>
                {/* <SheetTitle>Informasi S1 TI</SheetTitle> */}
              </SheetHeader>
              {body.map((item) =>
                typeof item.content === "string" ? (
                  <SheetClose asChild>
                    <Link
                      to={item.content}
                      disabled={pathname.includes(item.content)}
                    >
                      <Button
                        variant="ghost"
                        size="default"
                        className="w-full justify-start"
                      >
                        {item.title}
                      </Button>
                    </Link>
                  </SheetClose>
                ) : (
                  <Collapsible>
                    <CollapsibleTrigger asChild>
                      <Button variant="ghost" className="w-full justify-start">
                        {" "}
                        {item.title} <ChevronDown className="ml-auto" />
                      </Button>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="">
                      {item.content.map((subItem) => (
                        <SheetClose asChild>
                          <Link
                            disabled={pathname.includes(subItem.url)}
                            to={subItem.url}
                            className="ps-5"
                          >
                            <Button
                              variant="ghost"
                              size="sm"
                              className="w-full justify-start"
                            >
                              {subItem.title}
                            </Button>
                          </Link>
                        </SheetClose>
                      ))}
                    </CollapsibleContent>
                  </Collapsible>
                ),
              )}
            </SheetContent>
          </Sheet>
        ) : (
          <>
            <Link to="/" className="cursor-pointer">
              <img src={Logo} alt="Logo" className="h-12 min-w-36 mr-4" />
            </Link>
            <div className="w-full flex gap-1 justify-between items-center ">
              <NavigationMenu>
                <NavigationMenuList>
                  {body.map((item) => (
                    <NavigationMenuItem>
                      {typeof item.content === "string" ? (
                        <NavigationMenuLink asChild>
                          <Link
                            to={item.content}
                            className={cn(
                              navigationMenuTriggerStyle(),
                              "bg-transparent",
                            )}
                          >
                            {item.title}
                          </Link>
                        </NavigationMenuLink>
                      ) : (
                        <>
                          <NavigationMenuTrigger className="bg-transparent">
                            {item.title}
                          </NavigationMenuTrigger>
                          <NavigationMenuContent>
                            <ul className="flex flex-col gap-1 px-1 py-2 md:w-[250px] lg:w-[300px] ">
                              {item.content.map((subItem) => (
                                <NavigationMenuLink asChild>
                                  <Link
                                    to={subItem.url}
                                    className={cn(
                                      navigationMenuTriggerStyle(),
                                      "w-full justify-start",
                                    )}
                                  >
                                    {subItem.title}
                                  </Link>
                                </NavigationMenuLink>
                              ))}
                            </ul>
                          </NavigationMenuContent>
                        </>
                      )}
                    </NavigationMenuItem>
                  ))}
                </NavigationMenuList>
              </NavigationMenu>
            </div>
          </>
        )}
        {user ? (
          <HeaderProfileDropdown className="ms-auto" />
        ) : (
          <Link to="/auth/login">
            <Button className="sm:hidden w-4">
              <LogIn />
            </Button>
            <Button className="hidden sm:block">Login</Button>
          </Link>
        )}
        <Button
          variant="outline"
          size="icon"
          className="px-2"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          {theme === "dark" ? (
            <MoonIcon className="h-4 w-4" />
          ) : theme == "light" ? (
            <SunIcon className="h-4 w-4" />
          ) : (
            <SunMoonIcon className="h-4 w-4" />
          )}
        </Button>
      </div>
    </header>
  );
});
