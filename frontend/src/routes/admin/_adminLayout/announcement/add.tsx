import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/admin/_adminLayout/announcement/add',
)({
  component: RouteComponent,
  beforeLoad: () => {
    return {
      title: "Tambah"
    }
  },
})

function RouteComponent() {
  return (
    <div>Hello "/admin/_adminLayout/announcement/$announcementId/add"!</div>
  )
}
