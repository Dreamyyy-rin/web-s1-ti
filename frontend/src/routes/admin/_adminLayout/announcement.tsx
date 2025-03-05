import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/_adminLayout/announcement')({
  component: RouteComponent, 
  beforeLoad: () => {
    return {
      title: "Pengumuman"
    }
  },
})

function RouteComponent() {
  return <div>Hello "/admin/_adminLayout/announcement"!</div>
}
