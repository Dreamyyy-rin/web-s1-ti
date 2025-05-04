import AlumniInformationForm from "@/features/alumni-information/components/alumniInformationForm";
import { useFetchAlumniInformationById } from "@/features/alumni-information/hooks/useFetchAlumniInformationById";
import { useUpdateAlumniInformation } from "@/features/alumni-information/hooks/useUpdateAlumniInformationsById";
import { AlumniInformationSchema } from "@/features/alumni-information/types/alumniInformation.schema";
import { handleAxiosError } from "@/lib/helpers";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";

export const Route = createFileRoute(
  "/admin/_adminLayout/alumni-info/$alumniInfoId/edit",
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
  const { mutate: updateAlumniInformationbyId } = useUpdateAlumniInformation();
  const params = Route.useParams();
  const { data, isLoading } = useFetchAlumniInformationById(params.alumniInfoId);
  const onUpdate = async (data: AlumniInformationSchema) => {
    updateAlumniInformationbyId(
      {
        id: params.alumniInfoId,
        data: data,
      },
      {
        onError: (error) => {
          const message = handleAxiosError(error)?.message;
          toast.error("Gagal menyimpan berita alumni", {
            description: message,
          });
        },
        onSuccess: () => {
          toast.success("Berhasil", {
            description: "Berita alumni berhasil disimpan",
          });
          navigate({
            to: "/admin/alumni-info",
          });
        },
      },
    );
  };
  return (
    <div>
      {isLoading ? null : <AlumniInformationForm onSave={onUpdate} data={data} />}
    </div>
  );
}
