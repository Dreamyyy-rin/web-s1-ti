import AdminForm from '@/features/admin/components/adminForm';
import { useFetchAdminById } from '@/features/admin/hooks/useFetchAdminById';
import { useUpdateAdmin } from '@/features/admin/hooks/useUpdateAdminById';
import { AdminSchema } from '@/features/admin/types/admin.schema';
import { handleAxiosError } from '@/lib/helpers';
import { useNavigate } from '@tanstack/react-router';
import { createFileRoute } from '@tanstack/react-router'
import { toast } from 'sonner';

export const Route = createFileRoute(
  '/admin/_adminLayout/admin-account/$adminId/edit',
)({
  component: RouteComponent,
  beforeLoad: () => {
    return {
      title: "Edit",
    };
  },
})

function RouteComponent() {
  const navigate = useNavigate();
  const { mutate: updateAdminById } = useUpdateAdmin();
  const params = Route.useParams();
  const { data, isLoading } = useFetchAdminById(params.adminId);
  const onUpdate = async (data: AdminSchema) => {
    updateAdminById(
      {
        id: params.adminId,
        data: data,
      },
      {
        onError: (error) => {
          const message = handleAxiosError(error)?.message;
          toast.error("Gagal menyimpan admin", {
            description: message,
          });
        },
        onSuccess: () => {
          toast.success("Berhasil", {
            description: "admin berhasil disimpan",
          });
          navigate({
            to: "/admin/admin-account",
          });
        },
      },
    );
  };
  return (
    <div>
      {isLoading ? null : <AdminForm onSave={onUpdate} data={data} />}
    </div>
  );
}
