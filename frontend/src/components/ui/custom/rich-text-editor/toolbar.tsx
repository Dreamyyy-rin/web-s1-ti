import { useCurrentEditor } from "@tiptap/react";
import { Button } from "../../button";
import { Bold, Italic, Strikethrough } from "lucide-react";

const Toolbar = () => {
  const { editor } = useCurrentEditor();
  if (!editor) return null;
  return (
    <div>
      <Button
        variant="outline"
        size="icon"
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={editor.isActive('bold')? "bg-muted" : ""}
      >
        <Bold />
      </Button>
      <Button
        variant="outline"
        size="icon"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={editor.isActive('italic')? "bg-muted" : ""}
      >
        <Italic />
      </Button>
      <Button
        variant="outline"
        size="icon"
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
        className={editor.isActive('strike')? "bg-primar" : ""}
      >
        <Strikethrough />
      </Button>
    </div>
  );
};

export default Toolbar;
