import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/_adminLayout/announcement')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/admin/_adminLayout/announcement"!</div>
}
