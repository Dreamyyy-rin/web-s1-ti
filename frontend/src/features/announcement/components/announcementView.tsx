import { EditorContent } from "@tiptap/react";
import { Announcement } from "../types/announcement.type";
import useMinimalTiptapEditor from "@/components/ui/custom/minimal-tiptap/hooks/use-minimal-tiptap";
import { ENV } from "@/env";


const AnnouncementView = ({ data }: { data: Announcement }) => {
  const editor = useMinimalTiptapEditor({
    value: data.isi,
    editable: false,
  });
  if (!editor) {
    return null;
  }

  const url = data.file?.includes("pengumuman_files")
    ? `${ENV.APP.BACKEND_STORAGE_URL}/${data.file}`
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
        {/* <MinimalTiptapEditor value={data.isi} editable={false}  /> */}
      </div>
      {/* <div dangerouslySetInnerHTML={{ __html: editor.getHTML()}}></div> */}
    </div>
  );
};
// );

export default AnnouncementView;
