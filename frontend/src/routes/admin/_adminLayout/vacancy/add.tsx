import VacancyForm from "@/features/vacancy/components/vacancyForm";
import { useCreateVacancy } from "@/features/vacancy/hooks/useCreateVacancy";
import { VacancySchema } from "@/features/vacancy/types/vacancy.schema";
import { handleAxiosError } from "@/lib/helpers";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/_adminLayout/vacancy/add")({
  component: RouteComponent,
  beforeLoad: () => {
    return {
      title: "Tambah",
    };
  },
});

function RouteComponent() {
  const navigate = useNavigate();
  const { mutate } = useCreateVacancy();

  const onCreate = async (data: VacancySchema) => {
    mutate(data, {
      onError: (error) => {
        const message = handleAxiosError(error)?.message;
        toast.error("Gagal menambahkan lowongan", {
          description: message,
        });
      },
      onSuccess: () => {
        toast.success("Berhasil ", {
          description: "Lowongan berhasil dibuat",
        });
        navigate({
          to: "/admin/vacancy",
        });
      },
    });
  };

  return (
    <div>
      <VacancyForm onSave={onCreate} />
    </div>
  );
}
