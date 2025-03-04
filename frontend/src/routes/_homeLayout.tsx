import { HomeHeader } from "@/features/shared/components/homeHeader";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_homeLayout")({
  component: RouteComponent,
});

function RouteComponent() {

  return (
    <>
      <div className="flex flex-col min-h-[calc(100vh-144px)] mt-16">
        <HomeHeader />
        <Outlet />
      </div>
    </>
  );
}
