import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_homeLayout/studentsAssociationInfo')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_homeLayout/studentAssociationInfo"!</div>
}
