import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_homeLayout/studyProgramProfile')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_homeLayout/studyProgramProfile"!</div>
}
