import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import React from "react";

const AnnouncementSkeletonCardDisplay = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div"> & { amount: number }
>(({ className, amount, ...props }, ref) => {
  return (
    <div
      ref={ref}
      {...props}
      className={cn("flex flex-wrap justify-evenly  -mx-2 ", className)}
    >
      {Array.from({ length: amount }).map((_, index) => (
        <div className="w-full  md:w-1/2 xl:w-1/3 px-2 pb-4" key={index}>
          <Card className=" bg-white rounded-lg shadow-lg overflow-hidden h-full flex-initial flex flex-col ">
            <Skeleton className="w-full h-48 object-cover" />
            <CardHeader className="">
              <CardTitle className="text-xl font-semibold text-gray-900 flex">
                <Skeleton className="w-64 h-4 flex-initial" />
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
              <div className="flex flex-row gap-2">
                <Skeleton className="w-1/3 flex-none h-2" />
                <Skeleton className="flex-auto h-2" />
              </div>
              <div className="flex flex-row gap-2">
                <Skeleton className="w-2/3 flex-none h-2" />
                <Skeleton className=" flex-auto h-2" />
              </div>
              <div className="flex flex-row gap-2">
                <Skeleton className="w-1/2 flex-none h-2" />
                <Skeleton className=" flex-auto h-2" />
              </div>
            </CardContent>
            <CardFooter className="flex-auto items-end">
              <Skeleton className="h-8 w-32 rounded-sm px-3 text-xs" />
            </CardFooter>
          </Card>
        </div>
      ))}
    </div>
  );
});

export default AnnouncementSkeletonCardDisplay;
