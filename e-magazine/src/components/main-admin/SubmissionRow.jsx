import { useState } from "react";

import { Button } from "@/components/ui/button";

import SubmissionPreviewDialog from "./SubmissionPreviewDialog";

function SubmissionRow({ submission }) {
  const [open, setOpen] = useState(false);

  const isImage =
    submission.category === "Photography" ||
    submission.category === "Paintings";

  const statusColor = {
    Pending:
      "bg-yellow-100 text-yellow-700",

    Approved:
      "bg-green-100 text-green-700",

    Rejected:
      "bg-red-100 text-red-700",

    Published:
      "bg-blue-100 text-blue-700",
  };

  return (
    <>
      <tr className="border-t hover:bg-slate-50 transition">

        <td className="p-4">

          {isImage ? (

            <img
              src={submission.image}
              alt={submission.title}
              className="w-16 h-16 rounded-lg object-cover"
            />

          ) : (

            <div className="w-16 h-16 rounded-lg bg-slate-100 flex items-center justify-center text-3xl">

              📝

            </div>

          )}

        </td>

        <td className="p-4 font-semibold">
          {submission.title}
        </td>

        <td className="p-4">

          <div>

            <p className="font-medium">

              {submission.student.name}

            </p>

            <p className="text-xs text-gray-500">

              {submission.student.usn}

            </p>

          </div>

        </td>

        <td className="p-4">
          {submission.category}
        </td>

        <td className="p-4">
          {new Date(
            submission.createdAt
          ).toLocaleDateString()}
        </td>

        <td className="p-4">

          <span
            className={`px-3 py-1 rounded-full text-sm font-semibold ${statusColor[submission.status]}`}
          >
            {submission.status}
          </span>

        </td>

        <td className="p-4">

          {submission.reviewedBy
            ? submission.reviewedBy.name
            : "-"}

        </td>

        <td className="p-4 text-center">

          <Button
            variant="outline"
            onClick={() =>
              setOpen(true)
            }
          >
            View
          </Button>

        </td>

      </tr>

      <SubmissionPreviewDialog
        open={open}
        onOpenChange={setOpen}
        submission={submission}
      />
    </>
  );
}

export default SubmissionRow;