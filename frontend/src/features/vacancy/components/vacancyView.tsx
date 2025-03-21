import { EditorContent } from "@tiptap/react";
import useMinimalTiptapEditor from "@/components/ui/custom/minimal-tiptap/hooks/use-minimal-tiptap";
import { ENV } from "@/env";
import { Vacancy } from "../types/vacancy.type";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";


const VacancyView = ({ data }: { data: Vacancy }) => {
  const editor = useMinimalTiptapEditor({
    value: data.deskripsi,
    editable: false,
  });
  
  useEffect(() => {
    if (editor) {
      editor.commands.setContent(data.deskripsi);
    }
  }, [data.deskripsi, editor]);
  
  if (!editor) {
    return null;
  }
  console.log("data.file : ", data.file)

  const url = data.file?.includes("lowongan_files")
    ? `${ENV.APP.BACKEND_URL}/files/${data.file}`
    : data.file;

  return (
    <div className="flex flex-col w-full gap-4">
      <div className="flex flex-col items-center justify-center w-full cursor-pointer">
        <div className=" ">
          {url && (
            <img
              src={url}
              alt="lowongan"
              className=""
            />
          )}
        </div>
      </div>
      <div className="text-4xl font-bold">{data.judul}</div>
      <div className="text-sm">oleh: {data.user.name}</div>
      <div className="">
        <EditorContent
          editor={editor}
          className="minimal-tiptap-editor space-y-2"
        />
      </div>
      <div className="w-full">
        <a href={data.link_pendaftaran} target="_blank" className="w-full">
          <Button className="w-full">Daftar Sekarang</Button>
        </a>
      </div>
    </div>
  );
};

export default VacancyView;
