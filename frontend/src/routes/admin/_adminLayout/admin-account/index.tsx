import AdminDataTable from '@/features/admin/components/adminDataTable'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/_adminLayout/admin-account/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>
    <AdminDataTable/>
  </div>
}
