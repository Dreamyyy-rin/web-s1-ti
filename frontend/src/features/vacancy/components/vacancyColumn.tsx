import { ColumnDef } from "@tanstack/react-table";
import { convertToIndonesianDate } from "@/lib/helpers";
import { Vacancy } from "../types/vacancy.type";
import { VacancyActionCell } from "./vacancyActionCell";



export const vacancyColumns: ColumnDef<Vacancy>[] = [
  {
    id: "title",
    accessorKey: "judul",
    header: () => <div className="text-start">Judul</div>,
    cell: ({ row }) => {
      const title = String(row.getValue("title"));
      return <div className="text-start font-medium">{title}</div>;
    },
  },
  {
    id: "last_updated",
    accessorKey: "updated_at",
    header: () => <div className="text-start">Terakhir Diperbarui</div>,
    cell: ({ row }) => {
      const lastUpdated = String(row.getValue("last_updated"));
      const formattedDate = convertToIndonesianDate(new Date(lastUpdated));
      return <div className="text-start font-medium">{formattedDate}</div>;
    },
  },
  {
    id: "actions",
    enableHiding: false,
    header: () => <div className="text-right">Aksi</div>,
    cell: ({ row }) => {
      const vacancy = row.original;
      return <VacancyActionCell data={vacancy} />;
    },
  },
];
