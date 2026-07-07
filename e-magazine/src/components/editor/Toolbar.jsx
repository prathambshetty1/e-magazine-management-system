import {
  FaBold,
  FaItalic,
  FaListUl,
  FaListOl,
  FaQuoteLeft,
  FaUndo,
  FaRedo,
  FaHeading,
} from "react-icons/fa";

function Toolbar({ editor }) {
  if (!editor) return null;

  const Button = ({ onClick, active, children }) => (
    <button
      type="button"
      onClick={onClick}
      className={`p-2 rounded-lg transition ${
        active
          ? "bg-emerald-500 text-white"
          : "hover:bg-slate-200"
      }`}
    >
      {children}
    </button>
  );

  return (
    <div className="flex flex-wrap items-center gap-2 border-b p-3 bg-slate-50">

      <Button
        active={editor.isActive("bold")}
        onClick={() => editor.chain().focus().toggleBold().run()}
      >
        <FaBold />
      </Button>

      <Button
        active={editor.isActive("italic")}
        onClick={() => editor.chain().focus().toggleItalic().run()}
      >
        <FaItalic />
      </Button>

      <Button
        active={editor.isActive("heading", { level: 1 })}
        onClick={() =>
          editor.chain().focus().toggleHeading({ level: 1 }).run()
        }
      >
        <FaHeading />
      </Button>

      <Button
        active={editor.isActive("bulletList")}
        onClick={() => editor.chain().focus().toggleBulletList().run()}
      >
        <FaListUl />
      </Button>

      <Button
        active={editor.isActive("orderedList")}
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
      >
        <FaListOl />
      </Button>

      <Button
        active={editor.isActive("blockquote")}
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
      >
        <FaQuoteLeft />
      </Button>

      <Button
        onClick={() => editor.chain().focus().undo().run()}
      >
        <FaUndo />
      </Button>

      <Button
        onClick={() => editor.chain().focus().redo().run()}
      >
        <FaRedo />
      </Button>

    </div>
  );
}

export default Toolbar;