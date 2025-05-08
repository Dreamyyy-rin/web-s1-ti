import AdminForm from "@/features/admin/components/adminForm";
import { useCreateAdmin } from "@/features/admin/hooks/useCreateAdmin";
import { AdminSchema } from "@/features/admin/types/admin.schema";
import { handleAxiosError } from "@/lib/helpers";
import { useNavigate } from "@tanstack/react-router";
import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/_adminLayout/admin-account/add")({
  component: RouteComponent,
  beforeLoad: () => {
    return {
      title: "Tambah",
    };
  },
});

function RouteComponent() {
  const navigate = useNavigate();

  const { mutate: create } = useCreateAdmin();

  const onSubmit = async (data: AdminSchema) => {
    create(data, {
      onSuccess: () => {
        toast.success("Berhasil", {
          description: `Admin baru berhasil dibuat`,
        });
        navigate({ to: "/admin/admin-account" });
      },
      onError: (error) => {
        const message = handleAxiosError(error)?.message;
        toast.error("Gagal", {
          description: message ?? "Terjadi kesalahan yang tidak diketahui",
        });
      },
    });
  };

  return (
    <div>
      <AdminForm onSave={onSubmit} />
    </div>
  );
}
