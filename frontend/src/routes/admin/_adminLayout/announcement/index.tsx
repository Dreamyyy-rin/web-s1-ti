import AnnouncementDataTable from "@/features/announcement/components/announcementDataTable";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/_adminLayout/announcement/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <AnnouncementDataTable />
    </div>
  );
}
