import { useState } from "react";
import { toast } from "react-hot-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

import {
  approveSubmission,
  rejectSubmission,
} from "@/services/adminService";

import ImagePreviewDialog from "./ImagePreviewDialog";

function InfoRow({ label, value }) {
  return (
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="font-semibold break-all">{value}</p>
    </div>
  );
}

function ReviewDialog({
  open,
  onOpenChange,
  submission,
  onApproved,
}) {
  const [loading, setLoading] = useState(false);
  const [showReject, setShowReject] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [previewOpen, setPreviewOpen] =
    useState(false);

  if (!submission) return null;

  const isImageSubmission =
    submission.category === "Photography" ||
    submission.category === "Paintings";

  const handleApprove = async () => {
    try {
      setLoading(true);

      await approveSubmission(submission._id);

      toast.success("Submission Approved!");

      onOpenChange(false);

      onApproved?.();

    } catch (err) {
      console.error(err);

      toast.error(
        err.response?.data?.message ||
          "Approval failed."
      );

    } finally {
      setLoading(false);
    }
  };

  const handleReject = async () => {

    if (!feedback.trim()) {
      toast.error("Feedback is required.");
      return;
    }

    try {

      setLoading(true);

      await rejectSubmission(
        submission._id,
        feedback
      );

      toast.error("Submission Rejected!");

      setFeedback("");
      setShowReject(false);

      onOpenChange(false);

      onApproved?.();

    } catch (err) {

      console.error(err);

      toast.error(
        err.response?.data?.message ||
          "Rejection failed."
      );

    } finally {

      setLoading(false);

    }

  };

  return (
    <>
      <Dialog
        open={open}
        onOpenChange={onOpenChange}
      >
        <DialogContent className="!max-w-[1400px] w-[95vw] max-h-[95vh] overflow-y-auto">

          <DialogHeader>

            <DialogTitle className="text-3xl">
              Review Submission
            </DialogTitle>

          </DialogHeader>

          <div className="flex gap-8 mt-4">

            {/* IMAGE */}

            <div className="flex-1">

              {isImageSubmission ? (

                <div
                  onClick={() =>
                    setPreviewOpen(true)
                  }
                  className="cursor-zoom-in group relative"
                >

                  <img
                    src={submission.image}
                    alt={submission.title}
                    className="w-full h-[700px] object-contain rounded-xl border bg-slate-100"
                  />

                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition rounded-xl flex items-center justify-center">

                    <span className="text-white text-xl font-semibold">
                      Click to View Fullscreen
                    </span>

                  </div>

                </div>

              ) : (

                <div className="border rounded-xl p-6 h-[700px] overflow-y-auto whitespace-pre-wrap leading-8 text-lg">

                  {submission.description}

                </div>

              )}

            </div>

            {/* DETAILS */}

            <div className="w-[420px] border rounded-xl p-6 shadow-sm bg-white space-y-5 flex-shrink-0">

              <div>

                <h2 className="text-3xl font-bold">
                  {submission.title}
                </h2>

                <p className="text-lg text-gray-500 mt-2">
                  {submission.category}
                </p>

              </div>

              <hr />

              <InfoRow
                label="Student"
                value={submission.student.name}
              />

              <InfoRow
                label="USN"
                value={submission.student.usn}
              />

              <InfoRow
                label="Email"
                value={submission.student.email}
              />

              <InfoRow
                label="Submitted On"
                value={new Date(
                  submission.createdAt
                ).toLocaleString()}
              />

              <div>

                <p className="text-sm text-gray-500">
                  Status
                </p>

                <span className="inline-flex mt-2 px-4 py-2 rounded-full bg-yellow-100 text-yellow-700 font-semibold">
                  Pending
                </span>

              </div>

              <div className="flex gap-4 pt-6">

                <Button
                  className="flex-1 bg-green-600 hover:bg-green-700"
                  disabled={loading}
                  onClick={handleApprove}
                >
                  {loading
                    ? "Approving..."
                    : "Approve"}
                </Button>

                <Button
                  variant="destructive"
                  className="flex-1"
                  onClick={() =>
                    setShowReject(true)
                  }
                >
                  Reject
                </Button>

              </div>
                            {showReject && (

                <div className="border rounded-xl bg-red-50 p-5 space-y-4">

                  <h3 className="text-xl font-semibold text-red-600">
                    Reject Submission
                  </h3>

                  <p className="text-sm text-gray-600">
                    Provide feedback so the student knows what needs to be improved before resubmitting.
                  </p>

                  <textarea
                    rows={5}
                    value={feedback}
                    onChange={(e) =>
                      setFeedback(e.target.value)
                    }
                    placeholder="Enter feedback..."
                    className="w-full rounded-lg border p-3 resize-none focus:outline-none focus:ring-2 focus:ring-red-400"
                  />

                  <div className="flex justify-end gap-3">

                    <Button
                      variant="outline"
                      onClick={() => {
                        setShowReject(false);
                        setFeedback("");
                      }}
                    >
                      Cancel
                    </Button>

                    <Button
                      variant="destructive"
                      disabled={loading}
                      onClick={handleReject}
                    >
                      {loading
                        ? "Rejecting..."
                        : "Reject Submission"}
                    </Button>

                  </div>

                </div>

              )}

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

export default ReviewDialog;