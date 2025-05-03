import { useTheme } from "@/hooks/useTheme";
import { Button } from "../../button";
import { MoonIcon, SunIcon, SunMoonIcon } from "lucide-react";
import React from "react";
import { cn } from "@/lib/utils";
import Logo from "@/assets/Logo.png"; 
import { Link } from "@tanstack/react-router";


export const BaseHeader = React.forwardRef<
  React.ElementRef<"header">,
  React.ComponentPropsWithoutRef<"header">
>(({ children, className, ...props }, ref) => {
  const { theme, setTheme } = useTheme();
  return (
    <header
      ref={ref}
      {...props}
      className={cn(
        "fixed top-0 z-50 h-16 w-full bg-background/50 border-b backdrop-blur-md ",
        className,
      )}
    >
      <div className="mx-auto flex w-full h-full items-center justify-between px-2 gap-2">
      <Link to="/" className="cursor-pointer">
      <img src={Logo} alt="Logo" className="h-12 mr-4" />
      </Link>

        {children}
        <Button
          variant="outline"
          size="icon"
          className="px-2"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          {theme === "dark" ? (
            <MoonIcon className="h-4 w-4" />
          ) :
          theme == "light" ? (
            <SunIcon className="h-4 w-4" />
          ) : (
            <SunMoonIcon className="h-4 w-4" />
          )}
        </Button>
      </div>
    </header>
  );
});
