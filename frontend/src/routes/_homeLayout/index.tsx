import { createFileRoute } from "@tanstack/react-router";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../../components/ui/carousel";
import Carousel1 from "../../assets/Carousel1.jpg";
import Carousel2 from "../../assets/Carousel2.jpg";
import Logo from "../../assets/Logo.png";

export const Route = createFileRoute("/_homeLayout/")({
  component: Index,
});

function Index() {
  return (
    <div>
      <Carousel>
        <CarouselContent>
          <CarouselItem>
            <img src={Carousel1} alt="gambar" />
          </CarouselItem>
          <CarouselItem>
            <img src={Carousel2} alt="gambar" />
          </CarouselItem>
          <CarouselItem>
            <img src={Logo} alt="gambar" />
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      <h3>Welcome Home!</h3>
    </div>
  );
}
