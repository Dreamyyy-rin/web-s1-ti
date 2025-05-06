import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "@/hooks/useTheme";
import { cn } from "@/lib/utils";
import { MoonIcon, SunIcon, SunMoonIcon } from "lucide-react";
import React from "react";

const ThemeToggleButton = React.forwardRef<
  HTMLButtonElement,
  React.ComponentPropsWithoutRef<"button">
>(({ className, ...props }, ref) => {
  const { theme, setTheme } = useTheme();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className={cn("px-2", className)}
          ref={ref}
          {...props}
          onClick={() =>
            setTheme(
              theme === "light"
                ? "dark"
                : theme === "dark"
                  ? "system"
                  : "light",
            )
          }
        >
          {theme === "dark" ? (
            <MoonIcon className="h-4 w-4" />
          ) : theme == "light" ? (
            <SunIcon className="h-4 w-4" />
          ) : (
            <SunMoonIcon className="h-4 w-4" />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="min-w-20"
        onCloseAutoFocus={(e) => e.preventDefault()}
      >
        <DropdownMenuItem onClick={() => setTheme("light")} className="justify-end">
          <span>Light</span>
          <SunIcon className="h-4 w-4" />
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")} className="justify-end">
          <span>Dark</span>
          <MoonIcon className="h-4 w-4" />
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")} className="justify-end">
          <span>System</span>
          <SunMoonIcon className="h-4 w-4" />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
});

export default ThemeToggleButton;
