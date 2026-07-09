function SubmissionWindowCard({ window }) {
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

  const status = !window.configured
    ? {
        text: "Not Configured",
        color: "bg-gray-100 text-gray-700",
      }
    : window.isOpen
    ? {
        text: "Open",
        color: "bg-green-100 text-green-700",
      }
    : {
        text: "Closed",
        color: "bg-red-100 text-red-700",
      };

  return (
    <div className="border rounded-2xl p-5 shadow-sm hover:shadow-md transition">

      <div className="flex justify-between items-center">

        <h3 className="text-xl font-bold">
          {window.category}
        </h3>

        <span
          className={`px-3 py-1 rounded-full text-sm font-semibold ${status.color}`}
        >
          {status.text}
        </span>

      </div>

      <div className="mt-5 space-y-2 text-gray-600">

        <div>
          Opens:
          <span className="font-medium ml-2">
            {formatDate(window.openDate)}
          </span>
        </div>

        <div>
          Closes:
          <span className="font-medium ml-2">
            {formatDate(window.closeDate)}
          </span>
        </div>

      </div>

      {window.isOpen && (
        <div className="mt-5 text-green-600 font-semibold">
          {window.daysRemaining} day(s) remaining
        </div>
      )}

      {!window.configured && (
        <div className="mt-5 text-gray-500">
          Submission window not configured.
        </div>
      )}

    </div>
  );
}

export default SubmissionWindowCard;