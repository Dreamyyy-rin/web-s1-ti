import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/_adminLayout/vacancy')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/admin/vacancy"!</div>
}
