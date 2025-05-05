import React from "react";
import { Announcement } from "../types/announcement.type";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ENV } from "@/env";
import ReadonlyText from "@/components/ui/custom/rich-text-editor/readonlyText";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

const AnnouncementCardDisplay = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div"> & { announcements: Announcement[] }
>(({ className, announcements, ...props }, ref) => {
  return (
    <div className={cn("flex flex-wrap justify-evenly -mx-2", className)} ref={ref} {...props}>
      {announcements.length <= 0 ? (
        <div className="w-full flex items-center justify-center">
          <p className="text-muted-foreground">Belum ada pengumuman nih, tunggu info lebih lanjut ya!</p>
        </div>
      ) : (
        announcements.map((announcement) => (
          <div
            className="w-full  md:w-1/2 xl:w-1/3 px-2 pb-4"
            key={announcement.id}
        >
          <Card className=" bg-background rounded-lg shadow-lg overflow-hidden h-full flex flex-col">
            <img
              src={`${ENV.APP.BACKEND_URL}/files/${announcement.file}`}
              alt={announcement.judul}
              className="w-full h-48 object-cover object-top rounded-t-md"
            />
            <CardHeader className="">
              <CardTitle className="text-xl font-semibold">
                {announcement.judul}
              </CardTitle>
            </CardHeader>
            <CardContent className="">
              <ReadonlyText maxlength={100} data={announcement.isi} />
            </CardContent>
            <CardFooter className="flex-auto items-end">
              <Link
                to={`/announcement/$announcementId`}
                params={{ announcementId: announcement.id.toString() }}
              >
                <Button className="" variant="outline" size="sm">
                  Baca Selengkapnya
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
      )))}
    </div>
  );
});

export default AnnouncementCardDisplay;
