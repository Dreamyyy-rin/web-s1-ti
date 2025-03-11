import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/admin/_adminLayout/announcement/$announcementId/',
)({
  component: RouteComponent,
  beforeLoad: () => {
    return {
      title: "Detail"
    }
  },
})

function RouteComponent() {
  return <div>Hello "/admin/_adminLayout/announcement/$announcementId/"!</div>
}
