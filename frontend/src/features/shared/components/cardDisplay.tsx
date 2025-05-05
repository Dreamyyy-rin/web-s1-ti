import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ENV } from "@/env";
import { cn } from "@/lib/utils";
import { Link } from "@tanstack/react-router";
import React from "react";

const SkeletonCardDisplay = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => {
  return (
    <Card className={cn("bg-background rounded-lg shadow-lg overflow-hidden h-full flex flex-col", className)} ref={ref} {...props}>
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
  );
});

export default SkeletonCardDisplay;
