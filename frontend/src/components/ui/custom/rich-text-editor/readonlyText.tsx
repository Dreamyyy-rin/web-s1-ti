import useMinimalTiptapEditor from "../minimal-tiptap/hooks/use-minimal-tiptap";


const ReadonlyText = ({data}: {data: string}) => {
  const editor = useMinimalTiptapEditor({
    value: data,
    editable: false,
  });
  if (!editor) {
    return null;
  }
  return (
    <div className="div">{editor.getText()}</div>
  )
}

export default ReadonlyText