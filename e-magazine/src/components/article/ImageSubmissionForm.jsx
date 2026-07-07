import ImageUploader from "./ImageUploader";

function ImageSubmissionForm({
  title,
  setTitle,
  image,
  setImage,
}) {
  return (
    <div className="space-y-8">

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

      <div>

        <label className="font-semibold">
          Upload Image
        </label>

        <ImageUploader
          image={image}
          setImage={setImage}
        />

      </div>

    </div>
  );
}

export default ImageSubmissionForm;