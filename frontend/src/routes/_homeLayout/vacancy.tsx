import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_homeLayout/vacancy')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_homeLayout/vacancy"!</div>
}
