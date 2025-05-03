import AlumniInformationView from "@/features/alumni-information/components/alumniInformationView";
import { useFetchAlumniInformationById } from "@/features/alumni-information/hooks/useFetchAlumniInformationById";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/admin/_adminLayout/alumni-info/$alumniId/",
)({
  component: RouteComponent,
  beforeLoad: () => {
    return {
      title: "Detail",
    };
  },
});

function RouteComponent() {
  const params = Route.useParams();
  const { data, isLoading } = useFetchAlumniInformationById(params.alumniId);

  return (
    <div>
      {isLoading ? null : !data ? null : <AlumniInformationView data={data} />}
    </div>
  );
}
