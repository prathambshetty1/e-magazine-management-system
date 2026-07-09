import { Button } from "@/components/ui/button";

function SubmissionWindowCard({
  window,
  onEdit,
}) {
  const formatDate = (date) => {
    if (!date) return "Not Set";

    return new Date(date).toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    );
  };

  const status = !window.configured
    ? {
        text: "Not Configured",
        color:
          "bg-gray-100 text-gray-700",
      }
    : window.isOpen
    ? {
        text: "Open",
        color:
          "bg-green-100 text-green-700",
      }
    : {
        text: "Closed",
        color:
          "bg-red-100 text-red-700",
      };

  return (
    <div className="rounded-2xl border bg-white shadow-sm p-6 hover:shadow-lg transition">

      <div className="flex justify-between items-start">

        <div>

          <h2 className="text-2xl font-bold">
            {window.category}
          </h2>

          <span
            className={`inline-block mt-3 px-3 py-1 rounded-full text-sm font-semibold ${status.color}`}
          >
            {status.text}
          </span>

        </div>

      </div>

      <div className="mt-6 space-y-3">

        <div className="flex justify-between">

          <span className="text-gray-500">
            Opens
          </span>

          <span className="font-medium">
            {formatDate(window.openDate)}
          </span>

        </div>

        <div className="flex justify-between">

          <span className="text-gray-500">
            Closes
          </span>

          <span className="font-medium">
            {formatDate(window.closeDate)}
          </span>

        </div>

      </div>

      <Button
        className="w-full mt-8"
        onClick={() => onEdit(window)}
      >
        {window.configured
          ? "Edit Window"
          : "Set Window"}
      </Button>

    </div>
  );
}

export default SubmissionWindowCard;