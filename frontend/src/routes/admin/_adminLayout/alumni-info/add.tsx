import AlumniInformationForm from "@/features/alumni-information/components/alumniInformationForm";
import { useCreateAlumniInformation } from "@/features/alumni-information/hooks/useCreateAlumniInformation";
import { AlumniInformationSchema } from "@/features/alumni-information/types/alumniInformation.schema";
import { handleAxiosError } from "@/lib/helpers";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/_adminLayout/alumni-info/add")({
  component: RouteComponent,
  beforeLoad: () => {
    return {
      title: "Tambah",
    };
  },
});

function RouteComponent() {
  const navigate = useNavigate();
  const { mutate } = useCreateAlumniInformation();

  const onCreate = async (data: AlumniInformationSchema) => {
    mutate(data, {
      onError: (error) => {
        const message = handleAxiosError(error)?.message;
        toast.error("Gagal menambahkan berita alumni", {
          description: message,
        });
      },
      onSuccess: () => {
        toast.success("Berhasil ", {
          description: "Berita Alumni berhasil dibuat",
        });
        navigate({
          to: "/admin/alumni-info",
        });
      },
    });
  };

  return (
    <div>
      <AlumniInformationForm onSave={onCreate} />
    </div>
  );
}
