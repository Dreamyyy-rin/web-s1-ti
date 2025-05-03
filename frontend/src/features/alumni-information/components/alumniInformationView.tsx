import { EditorContent } from "@tiptap/react";
import useMinimalTiptapEditor from "@/components/ui/custom/minimal-tiptap/hooks/use-minimal-tiptap";
import { ENV } from "@/env";
import { AlumniInformation } from "../types/alumniInformation.type";


const AlumniInformationView = ({ data }: { data: AlumniInformation }) => {
  const editor = useMinimalTiptapEditor({
    value: data.isi,
    editable: false,
  });
  if (!editor) {
    return null;
  }

  const url = data.file?.includes("berita_alumni_files")
    ? `${ENV.APP.BACKEND_URL}/files/${data.file}`
    : data.file;

  return (
    <div className="flex flex-col w-full gap-4">
      <div className="flex flex-col items-center justify-center w-full cursor-pointer">
        <div className=" ">
          {url && (
            <img
              src={url}
              alt="announcement"
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
    </div>
  );
};

export default AlumniInformationView;
