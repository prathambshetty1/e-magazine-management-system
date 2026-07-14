import { useState } from "react";
import { toast } from "react-hot-toast";
import SubmissionHero from "./SubmissionHero";
import TextSubmissionForm from "./TextSubmissionForm";
import ImageSubmissionForm from "./ImageSubmissionForm";
import SubmissionPreview from "./SubmissionPreview";
import SubmissionFooter from "./SubmissionFooter";

import { createSubmission } from "@/services/submissionService";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

function SubmissionForm({ category, onBack }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState([]);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const isImageSubmission =
    category === "Photography" ||
    category === "Paintings";

  const submitButtonText = {
    Articles: "Submit Article",
    Poems: "Submit Poem",
    "Short Stories": "Submit Story",
    Photography: "Submit Photograph",
    Paintings: "Submit Painting",
  };

  const handleSubmit = async () => {
  try {
    if (!title.trim()) {
      toast.error("Please enter a title.");
      return;
    }

    if (isImageSubmission && !image) {
      toast.error("Please select an image.");
      return;
    }

    if (!isImageSubmission && !content.trim()) {
      toast.error("Please enter content.");
      return;
    }

    setLoading(true);

    const formData = new FormData();

    formData.append("title", title);
    formData.append("category", category);
    formData.append("isDraft", false);

    if (tags.length > 0) {
      formData.append("tags", JSON.stringify(tags));
    }

    if (isImageSubmission) {
      formData.append("image", image);
    } else {
      formData.append("description", content);
    }

    await createSubmission(formData);

    toast.success("Submission Successful!");

    setTitle("");
    setContent("");
    setTags([]);
    setImage(null);

    onBack();

  } catch (error) {
    console.error(error);

    toast.error(
      error.response?.data?.message ||
      "Submission failed."
    );
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="space-y-6">

      {/* Back Button */}

      <Button
        variant="ghost"
        onClick={onBack}
      >
        ← Back
      </Button>

      {/* Hero */}

      <SubmissionHero category={category} />

      {/* Main Content */}

      <Card className="rounded-3xl shadow-md">

        <CardContent className="p-8">

          <div className="grid xl:grid-cols-2 gap-10">

            {/* Left Side */}

            <div>

              {isImageSubmission ? (

                <ImageSubmissionForm
                  title={title}
                  setTitle={setTitle}
                  image={image}
                  setImage={setImage}
                />

              ) : (

                <TextSubmissionForm
                  title={title}
                  setTitle={setTitle}
                  content={content}
                  setContent={setContent}
                  tags={tags}
                  setTags={setTags}
                />

              )}

            </div>

            {/* Right Side */}

            <SubmissionPreview
              category={category}
              title={title}
              content={content}
              image={image}
            />

          </div>

          {/* Footer */}

          <SubmissionFooter
            loading={loading}
            submitText={submitButtonText[category]}
            onSubmit={handleSubmit}
          />

        </CardContent>

      </Card>

    </div>
  );
}

export default SubmissionForm;