import {
  FaNewspaper,
  FaFeatherAlt,
  FaBookOpen,
  FaCamera,
  FaPalette,
  FaCommentDots,
  FaEdit,
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";

import StatusBadge from "./StatusBadge";

const icons = {
  Articles: <FaNewspaper />,
  Poems: <FaFeatherAlt />,
  "Short Stories": <FaBookOpen />,
  Photography: <FaCamera />,
  Paintings: <FaPalette />,
};

function SubmissionCard({ submission }) {
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/student/edit-submission/${submission._id}`);
  };

  return (
    <div className="border rounded-2xl p-6 bg-white hover:shadow-lg transition">

      {/* Header */}
      <div className="flex justify-between items-start">

        <div className="flex gap-4">

          <div className="text-3xl text-emerald-600 mt-1">
            {icons[submission.category]}
          </div>

          <div>

            <h2 className="text-2xl font-bold">
              {submission.title}
            </h2>

            <p className="text-gray-500">
              {submission.category}
            </p>

          </div>

        </div>

        <StatusBadge status={submission.status} />

      </div>

      {/* Date */}

      <div className="mt-5 text-sm text-gray-500">
        Submitted on{" "}
        {new Date(submission.createdAt).toLocaleDateString()}
      </div>

      {/* Feedback */}

      {submission.status === "Rejected" &&
        submission.feedback && (

          <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-5">

            <div className="flex items-center gap-2 text-red-600 font-semibold">

              <FaCommentDots />

              <span>
                Feedback from Department Admin
              </span>

            </div>

            <p className="mt-3 whitespace-pre-wrap text-gray-700">
              {submission.feedback}
            </p>

          </div>

      )}

      {/* Actions */}

      {(submission.status === "Pending" ||
        submission.status === "Rejected") && (

        <div className="mt-6 flex justify-end">

          <button
            onClick={handleEdit}
            className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-white hover:bg-emerald-700 transition"
          >
            <FaEdit />

            {submission.status === "Pending"
              ? "Edit Draft"
              : "Edit & Resubmit"}
          </button>

        </div>

      )}

    </div>
  );
}

export default SubmissionCard;