import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";

import DashboardLayout from "@/components/layout/DashboardLayout";
import SubmissionHero from "@/components/article/SubmissionHero";
import TextSubmissionForm from "@/components/article/TextSubmissionForm";
import ImageSubmissionForm from "@/components/article/ImageSubmissionForm";
import SubmissionPreview from "@/components/article/SubmissionPreview";
import SubmissionFooter from "@/components/article/SubmissionFooter";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { ROLES } from "@/config/roles";

import {
  getSubmissionById,
  updateSubmission,
} from "@/services/submissionService";

function EditSubmission() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [submission, setSubmission] = useState(null);

  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState([]);
  const [image, setImage] = useState(null);

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  const isImageSubmission =
    category === "Photography" ||
    category === "Paintings";

  useEffect(() => {
    fetchSubmission();
  }, []);

  const fetchSubmission = async () => {
    try {
      setFetching(true);

      const submissionData = await getSubmissionById(id);

      if (
        submissionData.status !== "Pending" &&
        submissionData.status !== "Rejected"
      ) {
        toast.error(
          "This submission can no longer be edited."
        );

        navigate("/student/my-submissions");

        return;
      }

      setSubmission(submissionData);

      setCategory(submissionData.category);
      setTitle(submissionData.title);

      setContent(submissionData.description || "");

      setTags(submissionData.tags || []);

      if (submissionData.image) {
        setImage(submissionData.image);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Unable to load submission."
      );

      navigate("/student/my-submissions");
    } finally {
      setFetching(false);
    }
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

      if (tags.length > 0) {
        formData.append(
          "tags",
          JSON.stringify(tags)
        );
      }

      if (isImageSubmission) {
        if (image instanceof File) {
          formData.append("image", image);
        }
      } else {
        formData.append("description", content);
      }

      await updateSubmission(id, formData);

      toast.success(
        submission.status === "Rejected"
          ? "Submission resubmitted successfully!"
          : "Changes saved successfully!"
      );

      navigate("/student/my-submissions");
    } catch (error) {
      const message =
        error.response?.data?.message ||
        "Failed to update submission.";

      toast.error(message);

      if (
        message.includes("already been reviewed") ||
        message.includes("Cannot be edited")
      ) {
        navigate("/student/my-submissions");
      }
    } finally {
      setLoading(false);
    }
  };  if (fetching) {
    return (
      <DashboardLayout role={ROLES.STUDENT}>
        <div className="flex items-center justify-center py-32">
          <p className="text-lg text-gray-500">
            Loading submission...
          </p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout role={ROLES.STUDENT}>
      <div className="max-w-6xl mx-auto space-y-6">

        {/* Back Button */}

        <Button
          variant="ghost"
          onClick={() => navigate("/student/my-submissions")}
        >
          ← Back
        </Button>

        {/* Hero */}

        <SubmissionHero category={category} />

        {/* Status Banner */}

        {submission?.status === "Rejected" ? (
          <Card className="border-red-200 bg-red-50">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-red-700">
                Previous Feedback
              </h3>

              <p className="mt-2 text-gray-700">
                {submission.feedback ||
                  "Your submission was rejected. Please make the required changes and resubmit."}
              </p>
            </CardContent>
          </Card>
        ) : (
          <Card className="border-yellow-200 bg-yellow-50">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-yellow-700">
                Editing Pending Submission
              </h3>

              <p className="mt-2 text-gray-700">
                You can still make minor changes until a reviewer
                completes the review.
              </p>
            </CardContent>
          </Card>
        )}

        {/* Main Card */}

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
  submitText="Save Changes"
  onSubmit={handleSubmit}
  showDraftButton={false}
/>

          </CardContent>
        </Card>

      </div>
    </DashboardLayout>
  );
}

export default EditSubmission;