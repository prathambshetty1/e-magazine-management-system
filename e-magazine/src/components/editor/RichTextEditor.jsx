import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

import Toolbar from "./Toolbar";

function RichTextEditor({ content, setContent }) {
  const editor = useEditor({
    extensions: [StarterKit],

    content,

    onUpdate({ editor }) {
      setContent(editor.getHTML());
    },
  });

  if (!editor) return null;

  return (
    <div className="border rounded-xl overflow-hidden bg-white">

      <Toolbar editor={editor} />

      <EditorContent
        editor={editor}
        className="min-h-[350px] p-5 focus:outline-none"
      />

    </div>
  );
}

export default RichTextEditor;