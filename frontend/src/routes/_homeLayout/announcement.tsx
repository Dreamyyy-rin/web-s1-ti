import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_homeLayout/announcement')({
  component: RouteComponent,
  beforeLoad: () => {
    return {
      title: "Pengumuman"
    }
  },
})

function RouteComponent() {
  return <div>Hello "/_homeLayout/announcement"!</div>
}
