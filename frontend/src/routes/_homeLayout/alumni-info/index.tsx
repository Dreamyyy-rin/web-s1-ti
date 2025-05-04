import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_homeLayout/alumni-info/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_homeLayout/alumni-info/"!</div>
}
