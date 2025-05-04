import { createFileRoute } from "@tanstack/react-router";
import AlumniInformationView from "@/features/alumni-information/components/alumniInformationView";
import { useFetchAlumniInformationById } from "@/features/alumni-information/hooks/useFetchAlumniInformationById";

export const Route = createFileRoute(
  "/_homeLayout/alumni-info/$alumniInfoId/"
)({
  component: RouteComponent,
});

function RouteComponent() {
  const params = Route.useParams();
  const { data, isLoading } = useFetchAlumniInformationById(
    params.beritaAlumniId
  );

  return (
    <div className="relative">
      {/* <HomeHeading title="Detail Pengumuman" /> */}
      <div className="p-4">
        {isLoading ? null : !data ? null : (
          <AlumniInformationView data={data} />
        )}
      </div>
    </div>
  );
}
