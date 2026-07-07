import { useState } from "react";
import { FaTimes } from "react-icons/fa";

function TagInput({ tags, setTags }) {
  const [input, setInput] = useState("");

  const addTag = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();

      const value = input.trim();

      if (!value) return;
      if (tags.includes(value)) return;

      setTags([...tags, value]);
      setInput("");
    }
  };

  const removeTag = (tag) => {
    setTags(tags.filter((t) => t !== tag));
  };

  return (
    <div className="space-y-3">
      <input
        type="text"
        placeholder="Press Enter to add tags"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={addTag}
        className="w-full rounded-lg border p-3"
      />

      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <div
            key={tag}
            className="flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1 text-sm text-emerald-700"
          >
            {tag}

            <button
              type="button"
              onClick={() => removeTag(tag)}
            >
              <FaTimes size={12} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TagInput;