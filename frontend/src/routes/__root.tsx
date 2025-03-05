import App from "@/App";
import { createRootRouteWithContext } from "@tanstack/react-router";

interface RouteContext{
  title: string;
}

export const Route = createRootRouteWithContext<RouteContext>()({
  component: App,
});
