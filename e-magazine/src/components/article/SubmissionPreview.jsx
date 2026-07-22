import { Card, CardContent } from "@/components/ui/card";

function SubmissionPreview({
  category,
  title,
  content,
  image,
}) {
  const isImageSubmission =
    category === "Photography" ||
    category === "Paintings";

  const previewImage =
    image instanceof File
      ? URL.createObjectURL(image)
      : image;

  return (
    <Card className="rounded-3xl shadow-md h-fit sticky top-8">
      <CardContent className="p-8">
        <h2 className="text-2xl font-bold mb-6">
          Live Preview
        </h2>

        {isImageSubmission ? (
          <div>
            {previewImage ? (
              <img
                src={previewImage}
                alt="Preview"
                className="rounded-xl w-full object-cover mb-6"
              />
            ) : (
              <div className="h-64 rounded-xl border-2 border-dashed flex items-center justify-center text-gray-400">
                Image Preview
              </div>
            )}

            <h3 className="text-2xl font-bold mt-4">
              {title || "Untitled"}
            </h3>
          </div>
        ) : (
          <div>
            <h1 className="text-3xl font-bold mb-6">
              {title || "Untitled"}
            </h1>

            <div
              className="prose max-w-none"
              dangerouslySetInnerHTML={{
                __html:
                  content ||
                  "<p class='text-gray-400'>Start writing...</p>",
              }}
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default SubmissionPreview;