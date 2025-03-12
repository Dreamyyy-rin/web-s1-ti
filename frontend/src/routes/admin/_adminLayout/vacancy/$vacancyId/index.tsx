import VacancyView from '@/features/vacancy/components/vacancyView';
import { useFetchVacancyById } from '@/features/vacancy/hooks/useFetchVacancyById';
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/_adminLayout/vacancy/$vacancyId/')(
  {
    component: RouteComponent,
    beforeLoad: () => {
      return {
        title: "Detail",
      };
    },
  },
)

function RouteComponent() {
  const params = Route.useParams();
  const { data, isLoading } = useFetchVacancyById(params.vacancyId);

  return (
    <div>
      {isLoading ? null : !data ? null : <VacancyView data={data} />}
    </div>
  );
}
