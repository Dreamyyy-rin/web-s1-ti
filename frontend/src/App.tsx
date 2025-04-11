import { Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { ThemeProvider } from "./components/theme-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "./components/ui/tooltip";
import { Toaster } from "./components/ui/sonner";
import { useMobileDevice } from "./hooks/use-mobile-device";
import { useLoaderStore } from "./stores/loader.store";
import { ENV } from "./env";
// import { checkEnv } from "./env";

const queryClient = new QueryClient();

export function App() {
  // checkEnv()
  const { isMobileDevice } = useMobileDevice();
  const isGeneralLoading = useLoaderStore((state) => state.isGeneralLoading);
  return (
    <>
      <GoogleOAuthProvider clientId={ENV.GOOGLE.CLIENT_ID}>
        <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
          <QueryClientProvider client={queryClient}>
            <TooltipProvider>
              {!isMobileDevice && (
                <div className="fixed top-0 z-[100] h-1 w-full overflow-hidden bg-transparent">
                  {isGeneralLoading && (
                    <div className="progress-bar-fill z-[101] h-full w-full rounded-full bg-foreground"></div>
                  )}
                </div>
              )}
              <Outlet />
              <Toaster />
            </TooltipProvider>
          </QueryClientProvider>
          {ENV.APP.MODE === "development" && <TanStackRouterDevtools />}
        </ThemeProvider>
      </GoogleOAuthProvider>
    </>
  );
}

export default App;
