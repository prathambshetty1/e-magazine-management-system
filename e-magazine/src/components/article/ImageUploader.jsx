import { useRef } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";

function ImageUploader({ image, setImage }) {
  const inputRef = useRef();

  const handleImage = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setImage(file);
  };

  return (
    <div
      onClick={() => inputRef.current.click()}
      className="border-2 border-dashed rounded-xl p-8 text-center cursor-pointer hover:border-emerald-500 transition"
    >
      <FaCloudUploadAlt
        size={40}
        className="mx-auto text-emerald-500"
      />

      <p className="mt-3 font-medium">
        Click to upload cover image
      </p>

      <p className="text-sm text-gray-500">
        PNG, JPG or JPEG
      </p>

      <input
        type="file"
        hidden
        ref={inputRef}
        accept="image/*"
        onChange={handleImage}
      />

      {image && (
        <img
          src={URL.createObjectURL(image)}
          alt="Preview"
          className="mt-6 rounded-xl max-h-64 mx-auto"
        />
      )}
    </div>
  );
}

export default ImageUploader;