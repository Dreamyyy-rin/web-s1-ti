import { EditorContent, useEditor } from "@tiptap/react";
import React, { useEffect } from "react";
import { Announcement } from "../types/announcement.type";
import useMinimalTiptapEditor from "@/components/ui/custom/minimal-tiptap/hooks/use-minimal-tiptap";

// const AnnouncementView = React.forwardRef<
//   React.ElementRef<"div">,
//   React.ComponentPropsWithoutRef<"div"> & {
//     data: Announcement;
//   }
// >(({ data }) => {

const AnnouncementView = ({ data }: { data: Announcement }) => {
  const editor = useMinimalTiptapEditor(({
    value: data.isi,
    editable: false
  }))
  if (!editor) {
    return null;
  }


  console.log("data diterima: ", data);
  console.log("content data: ", data.isi);

  return (
    <div className="flex flex-col w-full gap-4">
      <div className="text-4xl font-bold">{data.judul}</div>
      <div className="text-sm">oleh: {data.user.name}</div>
      <div className="">
        <EditorContent editor={editor} className="minimal-tiptap-editor space-y-2"  />
        {/* <MinimalTiptapEditor value={data.isi} editable={false}  /> */}
      </div>
      {/* <div dangerouslySetInnerHTML={{ __html: editor.getHTML()}}></div> */}
    </div>
  );
}
// );

export default AnnouncementView;
