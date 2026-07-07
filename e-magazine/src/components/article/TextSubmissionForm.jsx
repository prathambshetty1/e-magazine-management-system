import RichTextEditor from "../editor/RichTextEditor";
import TagInput from "./TagInput";

function TextSubmissionForm({
  title,
  setTitle,
  content,
  setContent,
  tags,
  setTags,
}) {
  return (
    <div className="space-y-8">

      {/* Title */}

      <div>

        <label className="font-semibold">
          Title
        </label>

        <input
          className="w-full border rounded-lg p-3 mt-2"
          placeholder="Enter title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

      </div>

      {/* Tags */}

      <div>

        <label className="font-semibold">
          Tags
        </label>

        <TagInput
          tags={tags}
          setTags={setTags}
        />

      </div>

      {/* Editor */}

      <div>

        <label className="font-semibold">
          Content
        </label>

        <RichTextEditor
          content={content}
          setContent={setContent}
        />

      </div>

    </div>
  );
}

export default TextSubmissionForm;