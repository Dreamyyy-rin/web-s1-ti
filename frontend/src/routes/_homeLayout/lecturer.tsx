import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_homeLayout/lecturer')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div className='w-full h-full text-center pt-48 text-5xl'> {">"}:(</div>
}
