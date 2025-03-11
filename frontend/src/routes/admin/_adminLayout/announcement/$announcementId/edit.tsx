import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/admin/_adminLayout/announcement/$announcementId/edit',
)({
  component: RouteComponent,
  beforeLoad: () => {
    return {
      title: "Edit"
    }
  },
})

function RouteComponent() {
  return (
    <div>Hello "/admin/_adminLayout/announcement/$announcementId/edit"!</div>
  )
}
