import { Button } from "@/components/ui/button";
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
    <Button
      variant="outline"
      size="icon"
      className={cn("px-2", className)}
      ref={ref}
      {...props}
      onClick={() => setTheme(theme === "light" ? "dark" : theme === "dark" ? "system" : "light")}
    >
      {theme === "dark" ? (
        <MoonIcon className="h-4 w-4" />
      ) : theme == "light" ? (
        <SunIcon className="h-4 w-4" />
      ) : (
        <SunMoonIcon className="h-4 w-4" />
      )}
    </Button>
  );
});

export default ThemeToggleButton;
