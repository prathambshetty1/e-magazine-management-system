import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

import ImagePreviewDialog from "@/components/department-admin/ImagePreviewDialog";
function SubmissionPreviewDialog({
  open,
  onOpenChange,
  submission,
}) {
  const [previewOpen, setPreviewOpen] = useState(false);

  if (!submission) return null;

  const isImageSubmission =
    submission.category === "Photography" ||
    submission.category === "Paintings";

  const statusColor = {
    Pending: "bg-yellow-100 text-yellow-700",
    Approved: "bg-green-100 text-green-700",
    Rejected: "bg-red-100 text-red-700",
    Published: "bg-blue-100 text-blue-700",
  };

  return (
    <>
      <Dialog
        open={open}
        onOpenChange={onOpenChange}
      >
        <DialogContent className="!max-w-[1500px] w-[95vw] h-[90vh] overflow-hidden">

          <DialogHeader>

            <DialogTitle className="text-3xl">
              Submission Details
            </DialogTitle>

          </DialogHeader>

          <div className="grid grid-cols-3 gap-8 h-full">

            {/* LEFT SIDE */}

            <div className="col-span-2 h-full">

              {isImageSubmission ? (

                <img
                  src={submission.image}
                  alt={submission.title}
                  onClick={() =>
                    setPreviewOpen(true)
                  }
                  className="
                    w-full
                    h-[72vh]
                    object-contain
                    rounded-xl
                    border
                    cursor-pointer
                    hover:scale-[1.01]
                    transition
                  "
                />

              ) : (

                <div
                  className="
                    border
                    rounded-xl
                    p-6
                    h-[72vh]
                    overflow-y-auto
                    whitespace-pre-wrap
                    text-[15px]
                    leading-7
                  "
                >
                  {submission.description}
                </div>

              )}

            </div>

            {/* RIGHT SIDE */}

            <div className="border rounded-xl p-6 overflow-y-auto">

              <h2 className="text-3xl font-bold">
                {submission.title}
              </h2>

              <p className="text-gray-500 mt-2">
                {submission.category}
              </p>

              <hr className="my-6" />

              <div className="space-y-5">

                <div>
                  <p className="text-gray-500">
                    Student
                  </p>

                  <p className="font-semibold">
                    {submission.student.name}
                  </p>
                </div>

                <div>
                  <p className="text-gray-500">
                    USN
                  </p>

                  <p className="font-semibold">
                    {submission.student.usn}
                  </p>
                </div>

                <div>
                  <p className="text-gray-500">
                    Email
                  </p>

                  <p className="font-semibold break-all">
                    {submission.student.email}
                  </p>
                </div>

                <div>
                  <p className="text-gray-500">
                    Submitted On
                  </p>

                  <p className="font-semibold">
                    {new Date(
                      submission.createdAt
                    ).toLocaleString()}
                  </p>
                </div>

                <div>
                  <p className="text-gray-500">
                    Status
                  </p>

                  <span
                    className={`inline-block mt-2 px-3 py-1 rounded-full font-semibold ${statusColor[submission.status]}`}
                  >
                    {submission.status}
                  </span>
                </div>

                {submission.reviewedBy && (
                  <div>
                    <p className="text-gray-500">
                      Reviewed By
                    </p>

                    <p className="font-semibold">
                      {submission.reviewedBy.name}
                    </p>
                  </div>
                )}

                {submission.reviewedAt && (
                  <div>
                    <p className="text-gray-500">
                      Reviewed On
                    </p>

                    <p className="font-semibold">
                      {new Date(
                        submission.reviewedAt
                      ).toLocaleString()}
                    </p>
                  </div>
                )}

                {submission.feedback && (
                  <div className="bg-red-50 border border-red-200 rounded-xl p-4">

                    <p className="font-semibold text-red-600">
                      Feedback
                    </p>

                    <p className="mt-2 whitespace-pre-wrap">
                      {submission.feedback}
                    </p>

                  </div>
                )}

              </div>

              <Button
                className="w-full mt-8"
                onClick={() =>
                  onOpenChange(false)
                }
              >
                Close
              </Button>

            </div>

          </div>

        </DialogContent>

      </Dialog>

      <ImagePreviewDialog
        open={previewOpen}
        onOpenChange={setPreviewOpen}
        image={submission.image}
        title={submission.title}
      />
    </>
  );
}

export default SubmissionPreviewDialog;