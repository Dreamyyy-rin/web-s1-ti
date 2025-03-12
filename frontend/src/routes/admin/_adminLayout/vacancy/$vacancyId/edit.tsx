import VacancyForm from "@/features/vacancy/components/vacancyForm";
import { useFetchVacancyById } from "@/features/vacancy/hooks/useFetchVacancyById";
import { useUpdateVacancyById } from "@/features/vacancy/hooks/useUpdateVacancyById";
import { VacancySchema } from "@/features/vacancy/types/vacancy.schema";
import { handleAxiosError } from "@/lib/helpers";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";

export const Route = createFileRoute(
  "/admin/_adminLayout/vacancy/$vacancyId/edit",
)({
  component: RouteComponent,
  beforeLoad: () => {
    return {
      title: "Edit",
    };
  },
});

function RouteComponent() {
  const navigate = useNavigate();
  const { mutate: updateAnnouncementbyId } = useUpdateVacancyById();
  const params = Route.useParams();
  const { data, isLoading } = useFetchVacancyById(params.vacancyId);
  const onUpdate = async (data: VacancySchema) => {
    updateAnnouncementbyId(
      {
        id: params.vacancyId,
        data: data,
      },
      {
        onError: (error) => {
          const message = handleAxiosError(error)?.message;
          toast.error("Gagal menambahkan lowongan", {
            description: message,
          });
        },
        onSuccess: () => {
          toast.success("Berhasil", {
            description: "Lowongan berhasil disimpan",
          });
          navigate({
            to: "/admin/vacancy",
          });
        },
      },
    );
  };
  return (
    <div>
      {isLoading ? null : <VacancyForm onSave={onUpdate} data={data} />}
    </div>
  );
}
