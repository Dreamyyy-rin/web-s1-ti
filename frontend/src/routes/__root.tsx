import App from "@/App";
import { useLoaderStore } from "@/stores/loader.store";
import { createRootRouteWithContext } from "@tanstack/react-router";

interface RouteContext{
  title: string;
}

export const Route = createRootRouteWithContext<RouteContext>()({
  component: App,
  beforeLoad: async () => {
    const setPageLoading = useLoaderStore.getState().setPageLoading;
    setPageLoading(true);
  },
  loader: async () => {
    const setPageLoading = useLoaderStore.getState().setPageLoading;
    setPageLoading(false);
  },
});
