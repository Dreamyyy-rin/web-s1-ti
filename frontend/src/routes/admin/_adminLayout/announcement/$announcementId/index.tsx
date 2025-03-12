import AnnouncementView from "@/features/announcement/components/announcementView";
import { useFetchAnnouncementById } from "@/features/announcement/hooks/useFetchAnnouncementById";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/admin/_adminLayout/announcement/$announcementId/",
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
  const { data, isLoading } = useFetchAnnouncementById(params.announcementId);

  return (
    <div>
      {isLoading ? null : !data ? null : <AnnouncementView data={data} />}
    </div>
  );
}
