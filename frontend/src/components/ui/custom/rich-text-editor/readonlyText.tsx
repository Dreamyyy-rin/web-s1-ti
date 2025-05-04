import useMinimalTiptapEditor from "../minimal-tiptap/hooks/use-minimal-tiptap";


const ReadonlyText = ({data, maxlength}: {data: string, maxlength?: number}) => {
  const editor = useMinimalTiptapEditor({
    value: data,
    editable: false,
  });
  if (!editor) {
    return null;
  }
  const text = editor.getText()
  const displayText = maxlength && text.length > maxlength ? `${text.substring(0, maxlength)}...` : text
  return (
    <div className="div">{displayText}</div>
  )
}

export default ReadonlyText