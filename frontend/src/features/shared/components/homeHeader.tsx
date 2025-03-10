import { Button } from "@/components/ui/button";
import { BaseHeader } from "@/components/ui/custom/header/baseHeader";
import HeaderProfileDropdown from "@/components/ui/custom/header/headerProfileDropdown";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/stores/auth.store";
import { Link } from "@tanstack/react-router";
import { LogIn } from "lucide-react";

export function HomeHeader() {
  const user = useAuthStore((state) => state.user);

  return (
    <BaseHeader>
      <div className="w-full flex gap-1 justify-between items-center ">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem className="" >
              <Link to="/">
                <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), "bg-transparent")}>
                  Home
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <NavigationMenu className="me-auto">
          {/* <NavigationMenuList>
            <NavigationMenuItem>
              <Link to="/">
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Home
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link to="/">
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  About
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList> */}
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="bg-transparent">Berita</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="flex flex-col gap-1 px-1 py-2 md:w-[250px] lg:w-[300px] ">
                  {/* <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <a
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                    href="/"
                  >
                    <Icons.logo className="h-6 w-6" />
                    <div className="mb-2 mt-4 text-lg font-medium">
                      shadcn/ui
                    </div>
                    <p className="text-sm leading-tight text-muted-foreground">
                      Beautifully designed components built with Radix UI and
                      Tailwind CSS.
                    </p>
                  </a>
                </NavigationMenuLink>
              </li> */}
                  <Link to="/announcement">
                    <NavigationMenuLink
                      className={cn(
                        navigationMenuTriggerStyle(),
                        "w-full justify-start",
                      )}
                    >
                      Pengumuman
                    </NavigationMenuLink>
                  </Link>
                  <Link to="/vacancy">
                    <NavigationMenuLink
                      className={cn(
                        navigationMenuTriggerStyle(),
                        "w-full justify-start",
                      )}
                    >
                      Lowongan Asisten Dosen
                    </NavigationMenuLink>
                  </Link>
                  {/* <ListItem href="/docs" title="Introduction">
                    Re-usable components built using Radix UI and Tailwind CSS.
                  </ListItem>
                  <ListItem href="/docs/installation" title="Installation">
                    How to install dependencies and structure your app.
                  </ListItem>
                  <ListItem
                    href="/docs/primitives/typography"
                    title="Typography"
                  >
                    Styles for headings, paragraphs, lists...etc
                  </ListItem> */}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="bg-transparent">Lainnya</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid gap-1 md:w-[250px] px-1 py-2 lg:w-[300px] ">
                  {/* <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <a
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                    href="/"
                  >
                    <Icons.logo className="h-6 w-6" />
                    <div className="mb-2 mt-4 text-lg font-medium">
                      shadcn/ui
                    </div>
                    <p className="text-sm leading-tight text-muted-foreground">
                      Beautifully designed components built with Radix UI and
                      Tailwind CSS.
                    </p>
                  </a>
                </NavigationMenuLink>
              </li> */}
                  <Link to="/about">
                    <NavigationMenuLink
                      className={cn(
                        navigationMenuTriggerStyle(),
                        "w-full justify-start",
                      )}
                    >
                      Tentang Kami
                    </NavigationMenuLink>
                  </Link>
                  <Link to="/studyProgramProfile">
                    <NavigationMenuLink
                      className={cn(
                        navigationMenuTriggerStyle(),
                        "w-full justify-start",
                      )}
                    >
                      Profil Program Studi
                    </NavigationMenuLink>
                  </Link>
                  <Link to="/studentsAssociationInfo">
                    <NavigationMenuLink
                      className={cn(
                        navigationMenuTriggerStyle(),
                        "w-full justify-start",
                      )}
                    >
                      Profil Himpunan Mahasiswa
                    </NavigationMenuLink>
                  </Link>
                  {/* <ListItem href="/docs" title="Introduction">
                    Re-usable components built using Radix UI and Tailwind CSS.
                  </ListItem>
                  <ListItem href="/docs/installation" title="Installation">
                    How to install dependencies and structure your app.
                  </ListItem>
                  <ListItem
                    href="/docs/primitives/typography"
                    title="Typography"
                  >
                    Styles for headings, paragraphs, lists...etc
                  </ListItem> */}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        {user ? (
          <HeaderProfileDropdown />
        ) : (
          <Link to="/auth/login">
            <Button className="sm:hidden w-4">
              <LogIn />
            </Button>
            <Button className="hidden sm:block">Login</Button>
          </Link>
        )}
      </div>
    </BaseHeader>
  );
}
