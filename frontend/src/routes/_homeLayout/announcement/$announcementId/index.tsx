import AnnouncementView from "@/features/announcement/components/announcementView";
import { useFetchAnnouncementById } from "@/features/announcement/hooks/useFetchAnnouncementById";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_homeLayout/announcement/$announcementId/",
)({
  component: RouteComponent,
});

function RouteComponent() {
  const params = Route.useParams();
  const { data, isLoading } = useFetchAnnouncementById(params.announcementId);

  return (
    <div className="relative">
      {/* <HomeHeading title="Detail Pengumuman" /> */}
      <div className="p-4">
        {isLoading ? null : !data ? null : <AnnouncementView data={data} />}
      </div>
    </div>
  );
}
