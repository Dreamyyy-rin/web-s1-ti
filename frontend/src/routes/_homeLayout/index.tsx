import { createFileRoute } from '@tanstack/react-router'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import carousel1 from "@/assets/Carousel1.jpg";
import carousel2 from "@/assets/Carousel2.jpg";
import { Button } from "@/components/ui/button";



export const Route = createFileRoute('/_homeLayout/')({
  component: Index,
});

function Index() {
  return (
    <div>
      <Carousel>
        <CarouselContent>
          <CarouselItem>
            <img
              src={carousel1}
              alt="Image 1"
              className="w-full h-auto max-h-[500px] object-cover"
            />
          </CarouselItem>
          <CarouselItem>
            <img
              src={carousel2}
              alt="Image 2"
              className="w-full h-auto max-h-[500px] object-cover"
            />
          </CarouselItem>
          <CarouselItem>
            <img
              src={carousel1}
              alt="Image 3"
              className="w-full h-auto max-h-[500px] object-cover"
            />
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>

      <div className="flex justify-center gap-4 mt-6"> {/* Menggunakan gap untuk jarak antar tombol */}
        <Button className="w-1/3">Tombol Aksi 1</Button>
        <Button className="w-1/3">Tombol Aksi 2</Button>
      </div>

    </div>
  );
}
