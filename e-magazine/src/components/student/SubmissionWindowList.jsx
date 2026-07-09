import {
  FaLock,
  FaUnlock,
  FaClock,
} from "react-icons/fa";

function SubmissionWindowList({ windows }) {
  const formatDate = (date) => {
    if (!date) return "Not Set";

    return new Date(date).toLocaleDateString(
      "en-IN",
      {
        day: "numeric",
        month: "short",
      }
    );
  };

  if (!windows.length) {
    return (
      <p className="text-gray-500">
        No submission windows found.
      </p>
    );
  }

  return (
    <div className="space-y-4">

      {windows.map((window) => {

        const status = !window.configured
          ? {
              icon: <FaClock />,
              color: "text-gray-500",
              text: "Not Configured",
            }
          : window.isOpen
          ? {
              icon: <FaUnlock />,
              color: "text-green-600",
              text: `${window.daysRemaining} day(s) remaining`,
            }
          : {
              icon: <FaLock />,
              color: "text-red-600",
              text: "Submission Closed",
            };

        return (
          <div
            key={window.category}
            className="border rounded-xl p-4 hover:bg-gray-50 transition"
          >

            <div className="flex justify-between items-center">

              <div>

                <h3 className="font-semibold text-lg">
                  {window.category}
                </h3>

                <p className="text-sm text-gray-500">
                  {formatDate(window.openDate)}
                  {"  "}
                  →
                  {"  "}
                  {formatDate(window.closeDate)}
                </p>

              </div>

              <div
                className={`flex items-center gap-2 font-semibold ${status.color}`}
              >

                {status.icon}

                <span>
                  {status.text}
                </span>

              </div>

            </div>

          </div>
        );
      })}
    </div>
  );
}

export default SubmissionWindowList;