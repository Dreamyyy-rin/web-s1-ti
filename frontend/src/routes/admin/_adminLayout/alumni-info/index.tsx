import AlumniInformationDataTable from "@/features/alumni-information/components/alumniInformationDataTable";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/_adminLayout/alumni-info/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <AlumniInformationDataTable />
    </div>
  );
}
