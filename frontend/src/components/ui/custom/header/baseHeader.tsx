import { Button } from "../../button";
import { ChevronDown, LogIn, Menu } from "lucide-react";
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
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../../sheet";
import { Collapsible, CollapsibleTrigger } from "../../collapsible";
import { CollapsibleContent } from "@radix-ui/react-collapsible";
import ThemeToggleButton from "@/features/shared/components/themeToggleButton";

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
              <div className="flex flex-col h-full">
                <SheetHeader className="mb-5">
                  <SheetTitle asChild>
                    <Link to="/" className="cursor-pointer">
                      <img
                        src={Logo}
                        alt="Logo"
                        className="h-12 min-w-36 mr-4"
                      />
                    </Link>
                  </SheetTitle>
                  {/* <SheetTitle>Informasi S1 TI</SheetTitle> */}
                </SheetHeader>
                {body.map((item, index) =>
                  typeof item.content === "string" ? (
                    <SheetClose asChild key={item.title}>
                      <Link to={item.content}>
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
                    <Collapsible key={index}>
                      <CollapsibleTrigger asChild>
                        <Button
                          variant="ghost"
                          className="w-full justify-start"
                        >
                          {" "}
                          {item.title} <ChevronDown className="ml-auto" />
                        </Button>
                      </CollapsibleTrigger>
                      <CollapsibleContent className="">
                        {item.content.map((subItem) => (
                          <SheetClose asChild key={subItem.title}>
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
                <SheetDescription className="mt-auto text-lg text-foreground">Informasi S1TI</SheetDescription>
              </div>
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
                    <NavigationMenuItem key={item.title}>
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
                                <NavigationMenuLink asChild key={subItem.title}>
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
          <Link to="/auth/login" className="ms-auto">
            <Button className="sm:hidden w-4 ">
              <LogIn />
            </Button>
            <Button className="hidden sm:block">Login</Button>
          </Link>
        )}
        {/* i remove this because buggy */}
        {/* <ThemeToggleButton /> */}
      </div>
    </header>
  );
});
