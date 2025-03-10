import { Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { ThemeProvider } from "./components/theme-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "./components/ui/tooltip";
import { Toaster } from "./components/ui/sonner";
// import { checkEnv } from "./env";

const queryClient = new QueryClient();

export function App() {
  // checkEnv()
  return (
    <>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <Outlet />
          </TooltipProvider>
        </QueryClientProvider>
        <Toaster />
        <TanStackRouterDevtools />
      </ThemeProvider>
    </>
  );
}

export default App;
