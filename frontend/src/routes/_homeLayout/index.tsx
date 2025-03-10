import { createFileRoute } from "@tanstack/react-router";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  // CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Content } from "@tiptap/react";
import carousel1 from "@/assets/Carousel1.jpg";
import carousel2 from "@/assets/Carousel2.jpg";
import { Button } from "@/components/ui/button";
// import TextEditor from "@/components/ui/custom/rich-text-editor/textEditor";
import { MinimalTiptapEditor } from "@/components/ui/custom/minimal-tiptap";
import { useState } from "react";

export const Route = createFileRoute("/_homeLayout/")({
  component: Index,
});

function Index() {
  const [content, setContent] = useState<Content>("");


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
        {/* <CarouselNext /> */}
        <CarouselPrevious />
      </Carousel>

      <div className="flex justify-center gap-4 mt-6">
        {" "}
        <Button className="w-1/3">Tombol Aksi 1</Button>
        <Button className="w-1/3">Tombol Aksi 2</Button>
      </div>

      <div className=" m-2">
      </div>

      <div className="m-3">
        <MinimalTiptapEditor
          className=""
          value={content}
          onChange={setContent}
          output="html"
          placeholder="Masukkan deskripsi"
          autofocus={true}
          editable={true}
          editorContentClassName="p-3 "
        ></MinimalTiptapEditor>
      </div>

      <div className="mt-52">
      </div>
    </div>
  );
}
