import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_homeLayout/about')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/about"!</div>
}
