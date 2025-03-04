import { Outlet } from "@tanstack/react-router";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/adminLayout")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <div className="flex flex-col min-h-[calc(100vh-144px)] mt-16">
        <Outlet />
      </div>
    </>
  );
}
