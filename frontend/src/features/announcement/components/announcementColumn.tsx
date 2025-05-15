import { ColumnDef } from "@tanstack/react-table";
import { Announcement } from "../types/announcement.type";
import { convertToIndonesianDate,  } from "@/lib/helpers";
import { AnnouncementActionCell } from "./announcementActionCell";



export const announcementColumns: ColumnDef<Announcement>[] = [
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
      const announcement = row.original;
      return <AnnouncementActionCell data={announcement} />;
    },
  },
];
