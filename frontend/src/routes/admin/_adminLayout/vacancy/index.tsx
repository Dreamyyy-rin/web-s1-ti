import VacancyDataTable from "@/features/vacancy/components/vacancyDataTable";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/_adminLayout/vacancy/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <VacancyDataTable />
    </div>
  );
}
