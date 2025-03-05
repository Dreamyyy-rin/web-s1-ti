import { AdminLayout } from "@/features/admin/components/adminLayout";
import { Outlet } from "@tanstack/react-router";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/_adminLayout")({
  component: RouteComponent,
  beforeLoad: () => {
    return {
      title: "Admin"
    }
  },
});

function RouteComponent() {
  return (
    <AdminLayout>
      <Outlet />
    </AdminLayout>
  );
}
