import { EditorProvider, Extensions } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";
import React from "react";
import Toolbar from "./Toolbar";

const extensions: Extensions = [StarterKit];

const TextEditor = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<"div"> & { content: string }
>(({ content }) => {
  return (
    <EditorProvider
      extensions={extensions}
      content={content}
      slotBefore={<Toolbar />}
    />
  );
});

export default TextEditor;
