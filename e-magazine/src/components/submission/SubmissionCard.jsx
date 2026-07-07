import {
  FaNewspaper,
  FaFeatherAlt,
  FaBookOpen,
  FaCamera,
  FaPalette,
} from "react-icons/fa";

import StatusBadge from "./StatusBadge";

const icons = {
  Articles: <FaNewspaper />,
  Poems: <FaFeatherAlt />,
  "Short Stories": <FaBookOpen />,
  Photography: <FaCamera />,
  Paintings: <FaPalette />,
};

function SubmissionCard({ submission }) {
  return (
    <div className="border rounded-2xl p-6 hover:shadow-lg transition">

      <div className="flex justify-between">

        <div>

          <div className="flex items-center gap-3">

            <div className="text-2xl text-emerald-600">
              {icons[submission.category]}
            </div>

            <div>

              <h2 className="text-xl font-bold">
                {submission.title}
              </h2>

              <p className="text-gray-500">
                {submission.category}
              </p>

            </div>

          </div>

        </div>

        <StatusBadge
          status={submission.status}
        />

      </div>

      <div className="mt-5 text-sm text-gray-500">

        Submitted on{" "}
        {new Date(
          submission.createdAt
        ).toLocaleDateString()}

      </div>

    </div>
  );
}

export default SubmissionCard;