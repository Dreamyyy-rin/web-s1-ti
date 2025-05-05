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
    ? `${ENV.APP.BACKEND_URL}/files/${data.file}`
    : data.file;

  return (
    <div className="flex flex-col items-center justify-center w-full px-4 py-6 max-w-5xl mx-auto">
      {" "}
      <div className="flex flex-col items-center justify-center w-full mb-6">
        {url && (
          <img
            src={url}
            alt="announcement"
            className="w-full h-96 object-cover rounded-lg shadow-lg"
          />
        )}
      </div>
      <div className="text-4xl font-bold mb-4 w-full max-w-5xl">
        {data.judul}
      </div>
      <div className="text-sm text-gray-500 mb-4 w-full max-w-5xl">{`oleh: ${data.user.name}`}</div>
      <div className="w-full max-w-5xl px-4">
        <EditorContent
          editor={editor}
          className="minimal-tiptap-editor space-y-2 text-justify"
        />
      </div>
    </div>
  );
};

export default AnnouncementView;
